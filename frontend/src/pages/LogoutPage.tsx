import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store";
import { clearToken } from "../store/slices/authSlice";
import { useLogoutMutation } from "../api/apiAuth";
import { Routes } from "../constants/constants";


const LogoutPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [logout, { isLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        dispatch(clearToken());
        await logout();
        navigate(Routes.LOGIN);
        window.location.reload();
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <Box sx={{ backgroundColor: "#D4AF9F", width: "400px", borderRadius: "10px" }}>
                <Typography variant="h5" component="div" sx={{ p: 2, textAlign: "center", color: "white" }}>
                    {t("logout").toUpperCase()}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <Button disabled={isLoading} variant="contained" sx={{ width: "90%", backgroundColor: "#CC9A82" }} onClick={handleLogout}>
                        { t("logout") }
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LogoutPage;