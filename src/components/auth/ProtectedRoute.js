import { Navigate, useLocation } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
        // Only show error if trying to access protected route directly
        // and not during logout/login process
        if (!location.state?.from && location.pathname !== '/home') {
            toast.error('Vui lòng đăng nhập để tiếp tục');
        }
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute; 