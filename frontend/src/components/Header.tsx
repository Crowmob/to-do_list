import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LanguageComponent from "./LanguageComponent";
import type { RootState } from "../store/store.ts";
import { Routes } from "../constants/constants.ts";

const Header = () => {
    const { t } = useTranslation();
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#D4AF9F" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography 
                        variant="h6" 
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            cursor: "pointer",
                            transition: "0.2s",
                            pr: 1,
                            "&:hover": {
                                color: "#f5e6df",
                            }
                        }}
                    >
                        Todo List
                    </Typography>
                </Link>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {!token ? (
                        <>
                            <Link to={ Routes.LOGIN } style={{ textDecoration: "none" }}>
                                <Typography
                                    sx={{
                                        color: "white",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                        pr: 1,
                                        "&:hover": {
                                            color: "#f5e6df",
                                        }
                                    }}
                                >
                                    {t("login").toUpperCase()}
                                </Typography>
                            </Link>

                            /

                            <Link to={ Routes.REGISTER } style={{ textDecoration: "none" }}>
                                <Typography
                                    sx={{
                                        color: "white",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                        pl: 1,
                                        "&:hover": {
                                            color: "#f5e6df",
                                        }
                                    }}
                                >
                                    {t("register").toUpperCase()}
                                </Typography>
                            </Link>
                        </>
                    ) : (
                        <Link to={ Routes.LOGOUT } style={{ textDecoration: "none" }}>
                            <Typography
                                sx={{
                                    color: "white",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "0.2s",
                                    pl: 1,
                                    "&:hover": {
                                        color: "#f5e6df",
                                    }
                                }}
                            >
                                {t("logout").toUpperCase()}
                            </Typography>
                        </Link>
                    )}
                    <LanguageComponent />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;