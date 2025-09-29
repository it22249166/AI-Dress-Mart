import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">Add some beautiful dresses to your cart!</p>
                    <button onClick={() => navigate('/shop')} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={`${item._id}-${item.size}`} className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 flex-shrink-0">
                                        {item.images && item.images[0] ? (
                                            <img
                                                src={item.images[0].url}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-4xl">
                                                👗
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                        <p className="text-gray-600 mb-2">Size: {item.size}</p>
                                        <p className="text-2xl font-bold text-purple-600 mb-4">${item.price}</p>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                                                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item._id, item.size)}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="w-full btn-secondary flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-5 h-5" />
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {getTotal() > 100 ? 'FREE' : '$10.00'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-semibold">${(getTotal() * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-purple-600">
                                            ${(getTotal() * 1.1 + (getTotal() > 100 ? 0 : 10)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {getTotal() < 100 && (
                                <p className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                                    💡 Add ${(100 - getTotal()).toFixed(2)} more to get FREE shipping!
                                </p>
                            )}

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/shop')}
                                className="w-full btn-secondary mt-3"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;