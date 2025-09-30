import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { getProduct, getSimilarProducts, createReview } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import ChatBot from '../components/ChatBot';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        fetchProductDetails();
        fetchSimilarProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const { data } = await getProduct(id);
            setProduct(data.data);
            if (data.data.sizes && data.data.sizes.length > 0) {
                setSelectedSize(data.data.sizes[0]);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Product not found');
            navigate('/shop');
        } finally {
            setLoading(false);
        }
    };

    const fetchSimilarProducts = async () => {
        try {
            const { data } = await getSimilarProducts(id);
            setSimilarProducts(data.data);
        } catch (error) {
            console.error('Error fetching similar products:', error);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        addToCart(product, selectedSize, quantity);
        toast.success('Added to cart');
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to submit a review');
            navigate('/login');
            return;
        }

        setSubmittingReview(true);
        try {
            await createReview(id, { rating: reviewRating, comment: reviewComment });
            toast.success('Review submitted successfully!');
            setReviewComment('');
            setReviewRating(5);
            fetchProductDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return <p className="text-center py-10">Loading product details...</p>;
    }

    if (!product) return null;

    return (
        <div className="product-detail-page space-y-10">
            {/* Product Section */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    {product.images && product.images[0] ? (
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full rounded-lg shadow"
                        />
                    ) : (
                        <div className="bg-gray-200 w-full h-80 flex items-center justify-center">
                            <span>No image</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                        <Star className="text-yellow-400" />
                        <span>{product.rating?.toFixed(1) || 'No rating'}</span>
                    </div>
                    <p className="text-xl font-semibold mt-4">${product.price}</p>

                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mt-4">
                            <label className="font-medium">Size:</label>
                            <div className="flex gap-2 mt-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1 border rounded ${selectedSize === size
                                                ? 'bg-indigo-600 text-white'
                                                : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mt-4">
                        <label className="font-medium">Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="ml-2 w-20 border rounded px-2 py-1"
                        />
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="btn-primary flex items-center gap-2"
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </button>
                        <button className="btn-secondary flex items-center gap-2">
                            <Heart size={18} /> Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {product.reviews.map((review) => (
                            <div key={review._id} className="border p-3 rounded">
                                <div className="flex items-center gap-2">
                                    <Star className="text-yellow-400" />
                                    <span>{review.rating}</span>
                                </div>
                                <p className="mt-1">{review.comment}</p>
                                <p className="text-sm text-gray-500">
                                    By {review.user?.name || 'Anonymous'}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}

                {/* Review Form */}
                <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                    <div>
                        <label className="block">Rating:</label>
                        <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            className="border rounded px-2 py-1"
                        >
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full border rounded p-2"
                    />
                    <button
                        type="submit"
                        disabled={submittingReview}
                        className="btn-primary"
                    >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </section>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {similarProducts.map((sp) => (
                            <ProductCard key={sp._id} product={sp} />
                        ))}
                    </div>
                </section>
            )}

            {/* Chatbot */}
            <ChatBot />
        </div>
    );
};

export default ProductDetails;