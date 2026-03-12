import { configureStore } from "@reduxjs/toolkit";

import { apiAuth } from "../api/apiAuth";
import { apiTasks } from "../api/apiTasks";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiTasks.reducerPath]: apiTasks.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuth.middleware, apiTasks.middleware),
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;