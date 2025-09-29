import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, TrendingUp } from 'lucide-react';
import { getProducts, getRecommendations } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ChatBot from '../components/ChatBot';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart } = useCart();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, cart]);

    const fetchData = async () => {
        try {
            // Fetch featured products
            const { data: productsData } = await getProducts({ sort: 'rating' });
            setFeaturedProducts(productsData.data.filter(p => p.isFeatured).slice(0, 3));

            // Fetch AI recommendations if user is logged in
            if (user) {
                try {
                    const { data: recsData } = await getRecommendations({
                        cartItems: cart,
                        preferences: user.preferences,
                    });
                    setRecommendations(recsData.data.slice(0, 3));
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            } else {
                // Show top-rated products for non-logged-in users
                setRecommendations(productsData.data.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page space-y-12">
            {/* Hero Section */}
            <section className="hero text-center py-12">
                <h1 className="text-4xl font-bold">Welcome to AI Dress Mart</h1>
                <p className="text-lg text-gray-600">Your Personal AI Fashion Assistant</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="btn-primary text-lg mt-4 px-6 py-2"
                >
                    Start Shopping with AI
                </button>
            </section>

            {/* Features */}
            <section className="features grid md:grid-cols-3 gap-6 text-center">
                <div>
                    <Sparkles className="mx-auto w-8 h-8 text-indigo-500" />
                    <h3 className="font-semibold">AI Recommendations</h3>
                    <p>Get personalized dress suggestions powered by advanced AI technology</p>
                </div>
                <div>
                    <MessageCircle className="mx-auto w-8 h-8 text-indigo-500" />
                    <h3 className="font-semibold">Fashion Assistant</h3>
                    <p>Chat with our AI stylist for instant fashion advice and tips</p>
                </div>
                <div>
                    <TrendingUp className="mx-auto w-8 h-8 text-indigo-500" />
                    <h3 className="font-semibold">Smart Search</h3>
                    <p>Find your perfect dress with intelligent filters and search</p>
                </div>
            </section>

            {/* AI Recommendations */}
            {recommendations.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">
                        {user ? 'AI Picks for You' : 'Top Rated Dresses'}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {recommendations.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Featured Collection</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-500">Loading amazing dresses...</p>
            )}

            {/* Chatbot */}
            <ChatBot />
        </div>
    );
};

export default Home;