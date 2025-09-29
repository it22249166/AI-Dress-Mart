import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, quantity = 1) => {
        const existingItem = cart.find(
            item => item._id === product._id && item.size === size
        );

        if (existingItem) {
            setCart(cart.map(item =>
                item._id === product._id && item.size === size
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
            toast.info('Cart updated');
        } else {
            setCart([...cart, { ...product, size, quantity }]);
            toast.success('Added to cart!');
        }
    };

    const removeFromCart = (productId, size) => {
        setCart(cart.filter(item => !(item._id === productId && item.size === size)));
        toast.info('Removed from cart');
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity === 0) {
            removeFromCart(productId, size);
        } else {
            setCart(cart.map(item =>
                item._id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            ));
        }
    };

    const clearCart = () => {
        setCart([]);
        toast.success('Cart cleared');
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
    };

    return { children };