import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, TrendingUp, Star } from 'lucide-react';
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
                        preferences: user.preferences
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

        {/* Hero Section */ }
      
        
          
            Welcome to AI Dress Mart
          
          
            Your Personal AI Fashion Assistant

        < button
    onClick = {() => navigate('/shop')}
className = "btn-primary text-lg"
    >
    Start Shopping with AI
          
        

        {/* Features */ }
        
          
            
            AI Recommendations
            
              Get personalized dress suggestions powered by advanced AI technology
            
          
          
            
            Fashion Assistant
            
              Chat with our AI stylist for instant fashion advice and tips
            
          
          
            
            Smart Search
            
              Find your perfect dress with intelligent filters and search




{/* AI Recommendations */ }
{
    recommendations.length > 0 && (



        { user? 'AI Picks for You': 'Top Rated Dresses' }
            
            
              {
        recommendations.map((product) => (
                
              ))
    }
            
          
        )
}

{/* Featured Products */ }
{
    featuredProducts.length > 0 && (



        Featured Collection


    {
        featuredProducts.map((product) => (
                
              ))
    }
            
          
        )
}

{
    loading && (


        Loading amazing dresses...
          
        )
}
      

      
    
  );
};

export default Home;