import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { clearAuth, setCredentials } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API}/api`,
    credentials: 'include', // For sending cookies (refresh token)
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    // If token is expired and unauthorized
    if (result?.error?.status === 401) {
      console.log('Access token expired. Attempting refresh...');
  
      // Attempt refresh
      const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);
  
      if (refreshResult?.data?.token) {
        //  Store new token
        api.dispatch(setCredentials({ token: refreshResult.data.token, user: api.getState().auth.user }));
  
        // Retry original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        //  Logout user if refresh fails
        api.dispatch(clearAuth());
      }
    }
  
    return result;
  };

  export const baseApi = createApi({
     baseQuery : baseQueryWithReauth,
     endpoints:()=>({}),
  })