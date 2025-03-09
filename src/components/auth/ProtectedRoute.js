import { Navigate, useLocation } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
        toast.error('Vui lòng đăng nhập để tiếp tục');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute; 