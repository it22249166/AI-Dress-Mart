// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { createOrder } from '../services/api';
// import { toast } from 'react-toastify';

// const Checkout = () => {
//     const navigate = useNavigate();
//     const { cart, getTotal, clearCart } = useCart();
//     const { user } = useAuth();

//     const [formData, setFormData] = useState({
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: '',
//         paymentMethod: 'card',
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!user) {
//             toast.error('Please login to place an order');
//             navigate('/login');
//             return;
//         }

//         if (cart.length === 0) {
//             toast.error('Your cart is empty');
//             navigate('/cart');
//             return;
//         }

//         setLoading(true);

//         try {
//             const subtotal = getTotal();
//             const shipping = subtotal > 100 ? 0 : 10;
//             const tax = subtotal * 0.1;
//             const total = subtotal + shipping + tax;

//             const orderData = {
//                 orderItems: cart.map((item) => ({
//                     product: item._id,
//                     name: item.name,
//                     quantity: item.quantity,
//                     size: item.size,
//                     price: item.price,
//                     image: item.images?.[0]?.url || '',
//                 })),
//                 shippingAddress: {
//                     street: formData.street,
//                     city: formData.city,
//                     state: formData.state,
//                     zipCode: formData.zipCode,
//                     country: formData.country,
//                 },
//                 paymentMethod: formData.paymentMethod,
//                 itemsPrice: subtotal,
//                 taxPrice: tax,
//                 shippingPrice: shipping,
//                 totalPrice: total,
//             };

//             await createOrder(orderData);
//             toast.success('Order placed successfully!');
//             clearCart();
//             navigate('/profile');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to place order');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (cart.length === 0) {
//         navigate('/cart');
//         return null;
//     }

//     return (
//         <div className="checkout-page">
//             <h2>Checkout</h2>

//             {/* Checkout Form */}
//             <form onSubmit={handleSubmit} className="checkout-form">
//                 <h3>Shipping Information</h3>

//                 <input
//                     type="text"
//                     name="street"
//                     placeholder="Street Address"
//                     value={formData.street}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="state"
//                     placeholder="State"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="zipCode"
//                     placeholder="ZIP Code"
//                     value={formData.zipCode}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="country"
//                     placeholder="Country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                 />

//                 <h3>Payment Method</h3>
//                 <select
//                     name="paymentMethod"
//                     value={formData.paymentMethod}
//                     onChange={handleChange}
//                 >
//                     <option value="card">Credit / Debit Card</option>
//                     <option value="paypal">PayPal</option>
//                     <option value="cod">Cash on Delivery</option>
//                 </select>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Placing Order...' : 'Place Order'}
//                 </button>
//             </form>

//             {/* Order Summary */}
//             <div className="order-summary">
//                 <h3>Order Summary</h3>
//                 {cart.map((item) => (
//                     <div key={item._id} className="order-item">
//                         <span role="img" aria-label="dress">👗</span> {item.name} <br />
//                         Size: {item.size} × {item.quantity}
//                         <strong> ${(item.price * item.quantity).toFixed(2)}</strong>
//                     </div>
//                 ))}

//                 <p>Subtotal: ${getTotal().toFixed(2)}</p>
//                 <p>Shipping: {getTotal() > 100 ? 'FREE' : '$10.00'}</p>
//                 <p>Tax: ${(getTotal() * 0.1).toFixed(2)}</p>
//                 <h4>
//                     Total: $
//                     {(getTotal() * 1.1 + (getTotal() > 100 ? 0 : 10)).toFixed(2)}
//                 </h4>
//             </div>
//         </div>
//     );
// };

// export default Checkout;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';
import { Truck, CreditCard, MapPin, Loader2, ShoppingBag } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getTotal, clearCart } = useCart();
    const { user } = useAuth();

    // Calculate totals once
    const subtotal = getTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + shipping + tax;

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
        // ... (Submit logic remains the same)
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
                totalPrice: finalTotal,
            };

            await createOrder(orderData);
            toast.success('Order placed successfully! Check your email for confirmation.');
            clearCart();
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    // Input field component for cleaner forms
    const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
        />
    );


    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
                    Secure Checkout
                </h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
                    {/* Checkout Form - Shipping and Payment */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Shipping Information */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <MapPin className='w-6 h-6 text-indigo-500' /> Shipping Information
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <InputField name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />
                                <InputField name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                                <InputField name="state" placeholder="State / Province" value={formData.state} onChange={handleChange} />
                                <InputField name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleChange} />
                                <div className='sm:col-span-2'>
                                    <InputField name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <CreditCard className='w-6 h-6 text-indigo-500' /> Payment Method
                            </h2>
                            <div className="space-y-3">
                                {['card', 'paypal', 'cod'].map((method) => (
                                    <label key={method} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleChange}
                                            className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-3 text-lg font-medium text-gray-800 capitalize">
                                            {method === 'card' ? 'Credit / Debit Card' : method === 'cod' ? 'Cash on Delivery' : method}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || cart.length === 0}
                            className="w-full btn-primary bg-green-600 hover:bg-green-700 text-white text-xl py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order...</>
                            ) : (
                                `Pay $${finalTotal.toFixed(2)} & Place Order`
                            )}
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 sticky lg:top-8 border border-indigo-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3 flex items-center gap-2">
                                <ShoppingBag className='w-5 h-5 text-pink-500' /> Your Order
                            </h2>
                            
                            {/* Item List */}
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0">
                                        <span className='text-gray-700'>
                                            {item.name} (Size: {item.size}) <span className='text-gray-500'>×{item.quantity}</span>
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-6 border-t pt-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax ({taxRate * 100}%)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between text-2xl font-extrabold border-t pt-4">
                                <span>Total Payable</span>
                                <span className="text-indigo-600">${finalTotal.toFixed(2)}</span>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;