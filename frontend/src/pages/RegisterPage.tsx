import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useRegisterMutation } from "../api/apiAuth";
import type { AppDispatch } from "../store/store";
import { setToken } from "../store/slices/authSlice";
import { RegexPatterns, Routes } from "../constants/constants";

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [register, { isLoading }] = useRegisterMutation();

    const handleRegister = async () => {
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
                    const data = error.data as { error: string };
                    setErrorMessage(data.error);
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
                <TextField
                    variant="outlined"
                    onChange={(e) => {setUsername(e.target.value)}}
                    placeholder={t("username").toUpperCase()}
                    sx={{
                        input: {
                            color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "5px 45px 45px 5px",
                            "& fieldset": {
                                borderWidth: "3px"
                            },
                            "&:hover fieldset": {
                                borderColor: "#A77C64",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#82492E",
                            },
                            "& input::placeholder": {
                                color: "lightgray",
                                opacity: 1
                            }
                        },
                        p: 1,
                        width: "90%",
                        textColor: "lightgray"
                    }}
                />
                <TextField
                    variant="outlined"
                    onChange={(e) => {setPassword(e.target.value)}}
                    placeholder={t("password").toUpperCase()}
                    sx={{
                        input: {
                            color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "5px 45px 45px 5px",
                            "& fieldset": {
                                borderWidth: "3px"
                            },
                            "&:hover fieldset": {
                                borderColor: "#A77C64",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#82492E",
                            },
                            "& input::placeholder": {
                                color: "lightgray",
                                opacity: 1
                            }
                        },
                        p: 1,
                        width: "90%"
                    }}
                />

                <Typography variant="body2" color="error" sx={{ p: 1, textAlign: "center" }}>
                    {errorMessage}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <Button disabled={isLoading} variant="contained" sx={{ width: "90%", backgroundColor: "#CC9A82" }} onClick={handleRegister}>
                        {t("register")}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterPage;