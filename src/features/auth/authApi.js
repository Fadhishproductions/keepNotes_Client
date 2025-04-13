import { baseApi } from "../../services/baseApi";

 
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Register
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // 🔐 Login (normal)
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // 🔁 Refresh token
    refreshToken: builder.query({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'GET',
      }),
    }),

    // 🚪 Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // 🔐 Google OAuth
    googleLogin: builder.mutation({
      query: (token) => ({
        url: '/auth/google',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenQuery,
  useLogoutUserMutation,
  useGoogleLoginMutation,
} = authApi;
