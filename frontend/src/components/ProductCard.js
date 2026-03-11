import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { getProductImageUrl } from '../utils/productImages';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const imageUrl = getProductImageUrl(product);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

    useEffect(() => {
        setSelectedSize(product.sizes?.[0] || '');
    }, [product]);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (selectedSize) {
            addToCart(product, selectedSize);
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
                {imageUrl ? (
                    <img
                        src={imageUrl}
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
                    <div className="mt-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Size
                        </label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-purple-600 focus:outline-none"
                        >
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
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
