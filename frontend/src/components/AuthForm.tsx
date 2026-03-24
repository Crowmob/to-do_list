import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AuthActions } from "../constants/constants";

type AuthFormProps = {
    isLoading: boolean;
    handleAuth: (username: string, password: string) => void;
    errorMessage: string;
    action: string;
}

const AuthForm = (props: AuthFormProps) => {
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.handleAuth(username, password)
    }

    return (
        <form onSubmit={handleSubmit}>
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
                type="password"
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
                {props.errorMessage}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <Button 
                    type="submit" 
                    disabled={props.isLoading} 
                    variant="contained" 
                    sx={{ width: "90%", backgroundColor: "#CC9A82" }} 
                >
                    {props.action === AuthActions.LOGIN ? t("login") : props.action === AuthActions.REGISTER && t("register")}
                </Button>
            </Box>
        </form>
    )
}

export default AuthForm;