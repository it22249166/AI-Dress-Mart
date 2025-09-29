import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginAPI, register as registerAPI, getMe } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await getMe();
                setUser(data);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const { data } = await loginAPI({ email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await registerAPI({ name, email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.info('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return { children };
};