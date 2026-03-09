import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

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
                    <Link to="/login" style={{ textDecoration: "none" }}>
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

                    <Link to="/register" style={{ textDecoration: "none" }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;