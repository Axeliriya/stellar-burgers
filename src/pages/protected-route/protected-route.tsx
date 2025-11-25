import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsAuthChecked,
  selectUserLoading
} from '../../services/slices/user/user-slice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isLoading = useSelector(selectUserLoading);
  const location = useLocation();

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
