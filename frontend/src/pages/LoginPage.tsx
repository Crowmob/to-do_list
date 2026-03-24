import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../api/apiAuth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store";
import { setToken } from "../store/slices/authSlice";
import { AuthActions, RegexPatterns, Routes } from "../constants/constants";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) {
            setErrorMessage(t("fillAllFields"));
            return;
        }
        else if (!RegexPatterns.USERNAME.test(username) || !RegexPatterns.PASSWORD.test(password)) {
            setErrorMessage(t("invalidCredentials"));
            return;
        }
        else {
            setErrorMessage("");
        }
        try {
            const data = await login({ username, password }).unwrap();
            dispatch(setToken(data.token));
            navigate(Routes.HOME);
            window.location.reload();
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError;

            if ("status" in error ) {
                if (error.status === 401 || error.status === 404) {
                    setErrorMessage(t("invalidCredentials"));
                }
            }
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <Box sx={{ backgroundColor: "#D4AF9F", width: "400px", borderRadius: "10px" }}>
                <Typography variant="h5" component="div" sx={{ p: 2, textAlign: "center", color: "white" }}>
                    {t("login").toUpperCase()}
                </Typography>
                <AuthForm isLoading={isLoading} handleAuth={handleLogin} errorMessage={errorMessage} action={AuthActions.LOGIN}/>
            </Box>
        </Box>
    )
}

export default LoginPage;