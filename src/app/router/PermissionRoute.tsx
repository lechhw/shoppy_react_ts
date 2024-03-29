import useUserStore from '../../entities/user/UserStore';
import { Navigate, Outlet } from 'react-router';

interface OwnProps {
    requireAdmin?: boolean;
}

const PermissionRoute = ({ requireAdmin }: OwnProps) => {
    const userState = useUserStore((state) => state.user);
    return requireAdmin && userState?.isAdmin ? <Outlet /> : userState?.uid ? <Outlet /> : <Navigate to="/" replace />;
};

export default PermissionRoute;
