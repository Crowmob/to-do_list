import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    isAuthChecked: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    isAuthChecked: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
        },
        setAuthChecked: (state) => {
            state.isAuthChecked = true;
            state.isAuthenticated = false;
        },
        clearToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setToken, clearToken, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;