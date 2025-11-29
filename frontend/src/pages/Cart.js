// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//     const navigate = useNavigate();
//     const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

//     if (cart.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
//                     <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
//                     <p className="text-gray-600 mb-6">Add some beautiful dresses to your cart!</p>
//                     <button onClick={() => navigate('/shop')} className="btn-primary">
//                         Continue Shopping
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.map((item) => (
//                             <div key={`${item._id}-${item.size}`} className="bg-white rounded-lg shadow-lg p-6">
//                                 <div className="flex gap-6">
//                                     {/* Product Image */}
//                                     <div className="w-32 h-32 flex-shrink-0">
//                                         {item.images && item.images[0] ? (
//                                             <img
//                                                 src={item.images[0].url}
//                                                 alt={item.name}
//                                                 className="w-full h-full object-cover rounded-lg"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-4xl">
//                                                 👗
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Product Details */}
//                                     <div className="flex-1">
//                                         <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
//                                         <p className="text-gray-600 mb-2">Size: {item.size}</p>
//                                         <p className="text-2xl font-bold text-purple-600 mb-4">${item.price}</p>

//                                         <div className="flex items-center gap-4">
//                                             {/* Quantity Controls */}
//                                             <div className="flex items-center gap-2">
//                                                 <button
//                                                     onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
//                                                     className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="w-12 text-center font-semibold">{item.quantity}</span>
//                                                 <button
//                                                     onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
//                                                     className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>

//                                             {/* Remove Button */}
//                                             <button
//                                                 onClick={() => removeFromCart(item._id, item.size)}
//                                                 className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
//                                             >
//                                                 <Trash2 className="w-5 h-5" />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     {/* Subtotal */}
//                                     <div className="text-right">
//                                         <p className="text-sm text-gray-600 mb-1">Subtotal</p>
//                                         <p className="text-2xl font-bold text-gray-800">
//                                             ${(item.price * item.quantity).toFixed(2)}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         <button
//                             onClick={clearCart}
//                             className="w-full btn-secondary flex items-center justify-center gap-2"
//                         >
//                             <Trash2 className="w-5 h-5" />
//                             Clear Cart
//                         </button>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

//                             <div className="space-y-4 mb-6">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Subtotal</span>
//                                     <span className="font-semibold">${getTotal().toFixed(2)}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Shipping</span>
//                                     <span className="font-semibold">
//                                         {getTotal() > 100 ? 'FREE' : '$10.00'}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Tax (10%)</span>
//                                     <span className="font-semibold">${(getTotal() * 0.1).toFixed(2)}</span>
//                                 </div>
//                                 <div className="border-t pt-4">
//                                     <div className="flex justify-between text-xl font-bold">
//                                         <span>Total</span>
//                                         <span className="text-purple-600">
//                                             ${(getTotal() * 1.1 + (getTotal() > 100 ? 0 : 10)).toFixed(2)}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {getTotal() < 100 && (
//                                 <p className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
//                                     💡 Add ${(100 - getTotal()).toFixed(2)} more to get FREE shipping!
//                                 </p>
//                             )}

//                             <button
//                                 onClick={() => navigate('/checkout')}
//                                 className="w-full btn-primary"
//                             >
//                                 Proceed to Checkout
//                             </button>

//                             <button
//                                 onClick={() => navigate('/shop')}
//                                 className="w-full btn-secondary mt-3"
//                             >
//                                 Continue Shopping
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    
    // Calculate final totals including conditional shipping
    const subtotal = getTotal();
    const shipping = subtotal > 100 ? 0 : 10.00; // Use a float for consistency
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + shipping + tax;
    const freeShippingRemaining = 100 - subtotal;


    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center py-16">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                    <ShoppingBag className="w-20 h-20 mx-auto text-indigo-500 mb-4 bg-indigo-50 p-3 rounded-full" />
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-6">
                        No styles selected yet. Find your perfect look!
                    </p>
                    <button 
                        onClick={() => navigate('/shop')} 
                        className="btn-primary flex items-center mx-auto gap-2"
                    >
                        Start Shopping <ArrowRight className='w-5 h-5'/>
                    </button>
                </div>
            </div>
        );
    }

    // Cart Item Component (Refactored for cleaner JSX)
    const CartItem = ({ item }) => (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    {item.images && item.images[0] ? (
                        <img
                            src={item.images[0].url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-pink-100 rounded-lg flex items-center justify-center text-4xl">
                            👗
                        </div>
                    )}
                </div>

                {/* Product Details & Controls */}
                <div className="flex-1 min-w-0">
                    <h3 
                        className="text-lg font-bold text-gray-900 hover:text-indigo-600 cursor-pointer"
                        onClick={() => navigate(`/product/${item._id}`)}
                    >
                        {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Size: **{item.size}**</p>
                    <p className="text-xl font-extrabold text-pink-600 mt-2">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-4 mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                                className="p-2 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                className="p-2 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeFromCart(item._id, item.size)}
                            className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Subtotal */}
                <div className="sm:text-right w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Price</p>
                    <p className="text-2xl font-extrabold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
                    Your Shopping Bag ({cart.length} Items)
                </h1>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <CartItem key={`${item._id}-${item.size}`} item={item} />
                        ))}

                        <button
                            onClick={clearCart}
                            className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-red-50 transition flex items-center justify-center gap-2 mt-4"
                        >
                            <Trash2 className="w-5 h-5" />
                            Clear All Items
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 sticky lg:top-8 border border-indigo-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Estimated Tax (10%)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping Estimate</span>
                                    <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                
                                <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                                    <div className="flex justify-between text-2xl font-extrabold">
                                        <span>Order Total</span>
                                        <span className="text-indigo-600">
                                            ${finalTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {subtotal < 100 && (
                                <p className="text-sm text-center text-gray-700 mb-4 p-3 bg-pink-100 rounded-lg font-medium border border-pink-200">
                                    💡 You're just **${freeShippingRemaining.toFixed(2)}** away from **FREE Shipping**!
                                </p>
                            )}

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 rounded-xl transition shadow-md"
                            >
                                Secure Checkout
                            </button>

                            <button
                                onClick={() => navigate('/shop')}
                                className="w-full mt-3 py-3 text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
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