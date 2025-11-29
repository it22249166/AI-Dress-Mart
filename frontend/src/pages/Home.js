// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Sparkles, MessageCircle, TrendingUp } from 'lucide-react';
// import { getProducts, getRecommendations } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import ProductCard from '../components/ProductCard';
// import ChatBot from '../components/ChatBot';

// const Home = () => {
//     const navigate = useNavigate();
//     const { user } = useAuth();
//     const { cart } = useCart();
//     const [featuredProducts, setFeaturedProducts] = useState([]);
//     const [recommendations, setRecommendations] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user, cart]);

//     const fetchData = async () => {
//         try {
//             // Fetch featured products
//             const { data: productsData } = await getProducts({ sort: 'rating' });
//             setFeaturedProducts(productsData.data.filter(p => p.isFeatured).slice(0, 3));

//             // Fetch AI recommendations if user is logged in
//             if (user) {
//                 try {
//                     const { data: recsData } = await getRecommendations({
//                         cartItems: cart,
//                         preferences: user.preferences,
//                     });
//                     setRecommendations(recsData.data.slice(0, 3));
//                 } catch (error) {
//                     console.error('Error fetching recommendations:', error);
//                 }
//             } else {
//                 // Show top-rated products for non-logged-in users
//                 setRecommendations(productsData.data.slice(0, 3));
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="home-page space-y-12">
//             {/* Hero Section */}
//             <section className="hero text-center py-12">
//                 <h1 className="text-4xl font-bold">Welcome to AI Dress Mart</h1>
//                 <p className="text-lg text-gray-600">Your Personal AI Fashion Assistant</p>
//                 <button
//                     onClick={() => navigate('/shop')}
//                     className="btn-primary text-lg mt-4 px-6 py-2"
//                 >
//                     Start Shopping with AI
//                 </button>
//             </section>

//             {/* Features */}
//             <section className="features grid md:grid-cols-3 gap-6 text-center">
//                 <div>
//                     <Sparkles className="mx-auto w-8 h-8 text-indigo-500" />
//                     <h3 className="font-semibold">AI Recommendations</h3>
//                     <p>Get personalized dress suggestions powered by advanced AI technology</p>
//                 </div>
//                 <div>
//                     <MessageCircle className="mx-auto w-8 h-8 text-indigo-500" />
//                     <h3 className="font-semibold">Fashion Assistant</h3>
//                     <p>Chat with our AI stylist for instant fashion advice and tips</p>
//                 </div>
//                 <div>
//                     <TrendingUp className="mx-auto w-8 h-8 text-indigo-500" />
//                     <h3 className="font-semibold">Smart Search</h3>
//                     <p>Find your perfect dress with intelligent filters and search</p>
//                 </div>
//             </section>

//             {/* AI Recommendations */}
//             {recommendations.length > 0 && (
//                 <section>
//                     <h2 className="text-2xl font-bold mb-4">
//                         {user ? 'AI Picks for You' : 'Top Rated Dresses'}
//                     </h2>
//                     <div className="grid md:grid-cols-3 gap-6">
//                         {recommendations.map(product => (
//                             <ProductCard key={product._id} product={product} />
//                         ))}
//                     </div>
//                 </section>
//             )}

//             {/* Featured Products */}
//             {featuredProducts.length > 0 && (
//                 <section>
//                     <h2 className="text-2xl font-bold mb-4">Featured Collection</h2>
//                     <div className="grid md:grid-cols-3 gap-6">
//                         {featuredProducts.map(product => (
//                             <ProductCard key={product._id} product={product} />
//                         ))}
//                     </div>
//                 </section>
//             )}

//             {/* Loading */}
//             {loading && (
//                 <p className="text-center text-gray-500">Loading amazing dresses...</p>
//             )}

//             {/* Chatbot */}
//             <ChatBot />
//         </div>
//     );
// };

// export default Home;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Updated icons for a more visual appeal
import { Zap, MessageCircle, ShoppingBag, Heart } from 'lucide-react'; 
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
        // ... (fetchData logic remains the same)
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

    // New component/function for a visually distinct Hero Banner
    const HeroBanner = () => (
        <section className="relative h-96 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            {/* Background image placeholder for visual appeal */}
            <div className="absolute inset-0 bg-cover bg-center opacity-70" 
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1549298492-35805d76d6ec')"}}> 
                 
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full bg-indigo-900/40 text-white p-8">
                <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-shadow-lg">
                    AI Dress Mart
                </h1>
                <p className="text-xl font-light mb-6">
                    Find your perfect look, **effortlessly styled by AI.**
                </p>
                <button
                    onClick={() => navigate('/shop')}
                    className="bg-pink-500 hover:bg-pink-600 transition duration-300 text-white font-bold text-lg px-8 py-3 rounded-full shadow-xl transform hover:scale-105"
                >
                    Shop Now
                </button>
            </div>
        </section>
    );

    // New component/function for Enhanced Features Display
    const EnhancedFeatures = () => (
        <section className="py-10 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                The Future of Fashion Shopping
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center px-4">
                <FeatureCard icon={Zap} title="Hyper-Personalized" description="AI learns your style and preferences for unmatched suggestions." color="text-indigo-500" />
                <FeatureCard icon={MessageCircle} title="Live AI Styling" description="Instant fashion advice and outfit pairing with our intelligent chatbot." color="text-pink-500" />
                <FeatureCard icon={ShoppingBag} title="Smart Catalog" description="Intelligent search and filtering helps you find any item in seconds." color="text-green-500" />
                <FeatureCard icon={Heart} title="Wishlist & Tracking" description="Save your favorites and track trends tailored just for you." color="text-red-500" />
            </div>
        </section>
    );

    const FeatureCard = ({ icon: Icon, title, description, color }) => (
        <div className="p-6 border border-gray-100 rounded-lg hover:shadow-xl transition duration-300">
            <Icon className={`mx-auto w-10 h-10 mb-3 ${color} transform hover:scale-110 transition`} />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );


    return (
        <div className="home-page space-y-16 py-8">
            <HeroBanner /> 

            <EnhancedFeatures />

            {/* AI Recommendations Section - Use a clearer card layout */}
            {recommendations.length > 0 && (
                <section className="bg-indigo-50 p-8 rounded-xl shadow-inner">
                    <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-indigo-200">
                        <Zap className="inline-block w-6 h-6 mr-2 text-indigo-600" /> 
                        {user ? '**AI Picks for You**' : '**Top Rated Styles**'}
                    </h2>
                    {loading ? (
                        <p className="text-center text-indigo-600">Calculating your perfect match...</p>
                    ) : (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {recommendations.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Featured Products Section - Use a more standard/clean layout */}
            {featuredProducts.length > 0 && (
                <section className="px-4">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Featured Collection
                    </h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Loading/Fallback */}
            {loading && !recommendations.length && !featuredProducts.length && (
                <p className="text-center text-xl text-gray-500 py-12">Loading amazing dresses...</p>
            )}

            {/* Chatbot remains */}
            <ChatBot />
        </div>
    );
};

export default Home;