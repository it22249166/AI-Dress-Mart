import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (product.sizes && product.sizes.length > 0) {
            addToCart(product, product.sizes[0]);
        } else {
            toast.error('Please select a size');
        }
    };

    return (
        <div
            onClick={() => navigate(`/product/${product._id}`)}
            className="card cursor-pointer group"
        >

            {product.images && product.images[0] ? (

            ): (
          
            👗
          
        )}
            {product.isNewArrival && (

                New

            )}
            {product.isFeatured && (

                Featured

            )}



            {product.name}
            {product.description}



            {product.rating}
            ({product.numReviews} reviews)



            ${product.price}






            {product.sizes && product.sizes.slice(0, 4).map((size, index) => (

                { size }

            ))}



            );
};

            export default ProductCard;