import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { RootState } from "../store/store";
import { Routes } from "../constants/constants";

type PrivateRouteProps = {
    children: ReactNode;
    authRequired: boolean;
};

const PrivateRoute = ({ children, authRequired }: PrivateRouteProps) => {
    const token = useSelector((state: RootState) => state.auth.token);

    return authRequired ? (token ? children : <Navigate to={Routes.LOGIN} replace />) : (!token ? children : <Navigate to={Routes.HOME} replace />)
}

export default PrivateRoute;