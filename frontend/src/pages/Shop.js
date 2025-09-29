import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import ChatBot from '../components/ChatBot';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: 'all',
        size: 'all',
        minPrice: 0,
        maxPrice: 500,
        sort: ''
    });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                ...(filters.category !== 'all' && { category: filters.category }),
                ...(filters.size !== 'all' && { size: filters.size }),
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                ...(filters.sort && { sort: filters.sort }),
                ...(searchQuery && { search: searchQuery })
            };

            const { data } = await getProducts(params);
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (


        Shop All Dresses

    {/* Search and Filter Bar */ }




    <input
        type="text"
        placeholder="Search by name, color, or style..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
    />


    Search

        < button
    type = "button"
    onClick = {() => setShowFilters(!showFilters)}
className = "btn-secondary flex items-center gap-2"
    >

    Filters



{/* Filters Panel */ }
{
    showFilters && (
        <Filters
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
        />
    )
}


{/* Products Grid */ }
{
    loading ? (


        Loading dresses...
          
        ) : products.length > 0 ? (
        <>
            {products.length} dresses found

            {products.map((product) => (
                
              ))}

        </>
    ) : (

        No dresses found
            Try adjusting your filters or search query
          
        )
}
      

      
    
  );
};

export default Shop;