import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page, saving the location they were trying to access
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
