import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRegisterMutation } from "../api/apiAuth";
import type { AppDispatch } from "../store/store";
import { setToken } from "../store/slices/authSlice";
import { AuthActions, RegexPatterns, Routes } from "../constants/constants";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [register, { isLoading }] = useRegisterMutation();

    const handleRegister = async (username: string, password: string) => {
        if (!username || !password) {
            setErrorMessage(t("fillAllFields"));
            return;
        }
        if (!RegexPatterns.USERNAME.test(username)) {
            setErrorMessage(t("invalidUsername"));
            return;
        }
        if (!RegexPatterns.PASSWORD.test(password)) {
            setErrorMessage(t("invalidPassword"));
            return;
        }
        else {
            setErrorMessage("");
        }
        try {
            const data = await register({ username, password }).unwrap();
            dispatch(setToken(data.token));
            navigate(Routes.HOME);
            window.location.reload();
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError;

            if ("status" in error ) {
                if (error.status === 409) {
                    setErrorMessage(t("userAlreadyExists"));
                }
            }
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <Box sx={{ backgroundColor: "#D4AF9F", width: "400px", borderRadius: "10px" }}>
                <Typography variant="h5" component="div" sx={{ p: 2, textAlign: "center", color: "white" }}>
                    {t("registration").toUpperCase()}
                </Typography>
                
                <AuthForm isLoading={isLoading} handleAuth={handleRegister} errorMessage={errorMessage} action={AuthActions.REGISTER}/>
            </Box>
        </Box>
    )
}

export default RegisterPage;