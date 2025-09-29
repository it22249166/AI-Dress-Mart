import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'card',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            toast.error('Your cart is empty');
            navigate('/cart');
            return;
        }

        setLoading(true);

        try {
            const subtotal = getTotal();
            const shipping = subtotal > 100 ? 0 : 10;
            const tax = subtotal * 0.1;
            const total = subtotal + shipping + tax;

            const orderData = {
                orderItems: cart.map((item) => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    size: item.size,
                    price: item.price,
                    image: item.images?.[0]?.url || '',
                })),
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total,
            };

            await createOrder(orderData);
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="checkout-form">
                <h3>Shipping Information</h3>

                <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />

                <h3>Payment Method</h3>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="card">Credit / Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cod">Cash on Delivery</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>

            {/* Order Summary */}
            <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.map((item) => (
                    <div key={item._id} className="order-item">
                        <span role="img" aria-label="dress">👗</span> {item.name} <br />
                        Size: {item.size} × {item.quantity}
                        <strong> ${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                ))}

                <p>Subtotal: ${getTotal().toFixed(2)}</p>
                <p>Shipping: {getTotal() > 100 ? 'FREE' : '$10.00'}</p>
                <p>Tax: ${(getTotal() * 0.1).toFixed(2)}</p>
                <h4>
                    Total: $
                    {(getTotal() * 1.1 + (getTotal() > 100 ? 0 : 10)).toFixed(2)}
                </h4>
            </div>
        </div>
    );
};

export default Checkout;