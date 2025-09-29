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
        paymentMethod: 'card'
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
                orderItems: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    size: item.size,
                    price: item.price,
                    image: item.images?.[0]?.url || ''
                })),
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total
            };

            const { data } = await createOrder(orderData);
            toast.success('Order placed successfully!');
            clearCart();
            navigate(`/profile`);
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


        Checkout

        
          {/* Checkout Form */ }
          
            
              Shipping Information

              
                
                  Street Address





    City




    State
                    
                  
                

                
                  
                    ZIP Code




    Country
                    
                  
                

                
                  Payment Method

    Credit / Debit Card
    PayPal
                    Cash on Delivery





    { loading ? 'Placing Order...' : 'Place Order' }




    {/* Order Summary */ }
          
            
              Order Summary


    { cart.map((item) => (
                  
                    
                      👗


{ item.name }

Size: { item.size } × { item.quantity }
                      
                      
                        ${ (item.price * item.quantity).toFixed(2) }
                      
                    
                  
                ))}




Subtotal
                  ${ getTotal().toFixed(2) }


Shipping

{ getTotal() > 100 ? 'FREE' : '$10.00' }



Tax
                  ${ (getTotal() * 0.1).toFixed(2) }



Total
                    
                      ${ (getTotal() * 1.1 + (getTotal() > 100 ? 0 : 10)).toFixed(2) }
                    
                  
                
              
            
          
        
      
    
  );
};

export default Checkout;