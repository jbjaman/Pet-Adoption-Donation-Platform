
import UseAdmin from '../Hooks/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuthor from '../Hooks/UseAuthor';

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuthor();
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <progress className='progress w-full'></progress>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute; 