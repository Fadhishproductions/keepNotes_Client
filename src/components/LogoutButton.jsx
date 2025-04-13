import { useDispatch } from 'react-redux';
import { clearAuth } from '../features/auth/authSlice';
import { useLogoutUserMutation } from '../features/auth/authApi';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(clearAuth());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
