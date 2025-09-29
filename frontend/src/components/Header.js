import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { user, logout } = useAuth();
    const { getItemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (





        AI Dress Mart




    Home


    Shop




    {
        user ? (
            <>






            </>
        ) : (

            Login

        )
    }



    {
        getItemCount() > 0 && (

            { getItemCount() }

        )
    }
            
          
        
      
    
  );
};

export default Header;