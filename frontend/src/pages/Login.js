import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const success = await login(formData.email, formData.password);
        if (success) {
            navigate('/');
        }

        setLoading(false);
    };

    return (



        Welcome Back
          Login to your AI Dress Mart account




    Email




    Password




    { loading ? 'Logging in...' : 'Login' }
          
        

        
          Don't have an account?{' '}
          
            Register here
          
        
      
    
  );
};

export default Login;