import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => {
  const user = useSelector((state) => state.auth.user);


  return (
    <header
      style={{
        padding: '10px 20px',
        background: '#222',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/notes" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        📝 KeepNotes
      </Link>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user.name}</span>
          <LogoutButton/>
        </div>
      ) : (
        <div>
          <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
