import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = useSelector((state) => state.auth.token);

  return !token ? <Outlet /> : <Navigate to="/notes" replace />;
};

export default PublicRoute;
