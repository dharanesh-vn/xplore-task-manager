import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Xplore Tasks</Link>
            </div>
            <div className="navbar-menu">
                {user ? (
                    <>
                        <span className="navbar-user">
                            Welcome, {user.name} ({user.role})
                        </span>
                        <button onClick={logout} className="btn-secondary">
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="navbar-auth-links">
                        <Link to="/" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
