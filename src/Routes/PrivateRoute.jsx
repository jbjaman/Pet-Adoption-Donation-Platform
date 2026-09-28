
import UseAuthor from "../Hooks/UseAuthor";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuthor();
    const location = useLocation();
    if (loading) {
        return <progress className="progress w-full"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ form: location }} replace></Navigate>
};

export default PrivateRoute;