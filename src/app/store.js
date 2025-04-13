import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { baseApi } from '../services/baseApi'
 export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
        auth:authReducer
    },
    middleware:(getDefaultMiddleware)=>
         getDefaultMiddleware().concat(baseApi.middleware)
})