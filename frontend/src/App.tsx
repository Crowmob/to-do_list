import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"

import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useGetMeQuery } from "./api/apiAuth"
import type { AppDispatch } from "./store/store"
import { setAuthChecked, setToken } from "./store/slices/authSlice"
import LogoutPage from "./pages/LogoutPage"
import { Routes as AppRoutes } from "./constants/constants.ts"
import PrivateRoute from "./components/PrivateRoute.tsx"

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: token, error, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (token && !isLoading && !error) {
      dispatch(setToken(token));
    } else if (!isLoading && error) {
      dispatch(setAuthChecked());
    }
  }, [token, error, isLoading, dispatch, navigate]);

  return (
    <>
      <Header />
      <Routes>
         <Route path={AppRoutes.HOME} element={<HomePage />} />
         <Route path={AppRoutes.LOGIN} element={<PrivateRoute authRequired={false}><LoginPage /></PrivateRoute>} />
         <Route path={AppRoutes.REGISTER} element={<PrivateRoute authRequired={false}><RegisterPage /></PrivateRoute>} />
         <Route path={AppRoutes.LOGOUT} element={<PrivateRoute authRequired={true}><LogoutPage /></PrivateRoute>} />  
      </Routes>
    </>
  )
}

export default App
