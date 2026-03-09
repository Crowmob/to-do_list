import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <Box sx={{ backgroundColor: "#D4AF9F", width: "400px", borderRadius: "10px" }}>
                <Typography variant="h5" component="div" sx={{ p: 2, textAlign: "center", color: "white" }}>
                    {t("login").toUpperCase()}
                </Typography>
                <TextField
                    variant="outlined"
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
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <Button variant="contained" sx={{ width: "90%", backgroundColor: "#CC9A82" }}>
                        { t("login") }
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm;