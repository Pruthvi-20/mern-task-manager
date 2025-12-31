import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    // Block manual access to login/register
    if (!location.state?.fromApp) {
        return <Navigate to="/" replace />;
    }

    // If logged in, never show public pages
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};
