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
            toast.success(`${product.name} added to cart!`);
        } else {
            toast.error('Please select a size');
        }
    };

    return (
        <div
            onClick={() => navigate(`/product/${product._id}`)}
            className="card cursor-pointer group border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
            {/* Product Image */}
            <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
                {product.images && product.images[0] ? (
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-6xl">👗</span>
                )}

                {/* Badges */}
                {product.isNewArrival && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                        New
                    </span>
                )}
                {product.isFeatured && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 text-xs rounded">
                        Featured
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} />
                    <span>{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="font-bold text-purple-600 text-lg">${product.price}</div>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {product.sizes.slice(0, 4).map((size, index) => (
                            <span
                                key={index}
                                className="border px-2 py-1 text-sm rounded hover:bg-purple-600 hover:text-white transition"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                )}

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={16} /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;