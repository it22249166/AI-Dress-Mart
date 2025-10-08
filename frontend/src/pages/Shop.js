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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // Backend returns { success: true, data: [...] }
      const safeProducts = data?.data ?? [];
      setProducts(safeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // fallback if API fails
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="shop-page space-y-8">
      <h1 className="text-3xl font-bold text-center">Shop All Dresses</h1>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, color, or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
          />
        </form>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary flex items-center gap-2 px-4 py-2"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {showFilters && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading dresses...</p>
      ) : products.length > 0 ? (
        <>
          <p className="text-gray-600">{products.length} dresses found</p>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No dresses found. <br />
          Try adjusting your filters or search query.
        </p>
      )}

      <ChatBot />
    </div>
  );
};

export default Shop;