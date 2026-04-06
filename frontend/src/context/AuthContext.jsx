import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('xplore_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Also get user role and approval status from token optionally, or get from login response
                setUser(decoded);
            } catch (err) {
                localStorage.removeItem('xplore_token');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('xplore_token', token);
        const decoded = jwtDecode(token);
        // Assuming your standard response or decoded token has these
        setUser({ ...decoded, ...userData });
        if (userData.role === 'admin') navigate('/admin');
        else navigate('/employee');
    };

    const logout = () => {
        localStorage.removeItem('xplore_token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
