import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
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
            fetchProductDetails(); // Refresh product data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
      
        
      
    );
    }

    if (!product) return null;

    return (


        {/* Product Details */ }
        
          
            {/* Product Image */ }

    {
        product.images && product.images[0] ? (
            <img# AI Dress Mart - Complete MERN Stack Project
