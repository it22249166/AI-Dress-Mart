import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  // Provide default values to prevent crashing
  const { user, logout } = useAuth() || {};
  const { getItemCount } = useCart() || { getItemCount: () => 0 };
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-600">
        <Link to="/">AI Dress Mart</Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <Link to="/shop" className="hover:text-purple-600">Shop</Link>

        {/* Login / Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="hover:text-purple-600">Login</Link>
        )}

        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart" className="flex items-center">
            <ShoppingCart size={24} />
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getItemCount()}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;