import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = () => {
    const loggedIn = localStorage.getItem("token");
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
