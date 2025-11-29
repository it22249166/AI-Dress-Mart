// import React, { useState, useEffect } from 'react';
// import { Search, Filter } from 'lucide-react';
// import { getProducts } from '../services/api';
// import ProductCard from '../components/ProductCard';
// import Filters from '../components/Filters';
// import ChatBot from '../components/ChatBot';

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     category: 'all',
//     size: 'all',
//     minPrice: 0,
//     maxPrice: 500,
//     sort: ''
//   });

//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         ...(filters.category !== 'all' && { category: filters.category }),
//         ...(filters.size !== 'all' && { size: filters.size }),
//         minPrice: filters.minPrice,
//         maxPrice: filters.maxPrice,
//         ...(filters.sort && { sort: filters.sort }),
//         ...(searchQuery && { search: searchQuery })
//       };

//       const { data } = await getProducts(params);

//       // Backend returns { success: true, data: [...] }
//       const safeProducts = data?.data ?? [];
//       setProducts(safeProducts);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]); // fallback if API fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchProducts();
//   };

//   return (
//     <div className="shop-page space-y-8">
//       <h1 className="text-3xl font-bold text-center">Shop All Dresses</h1>

//       <div className="flex flex-col md:flex-row items-center gap-4">
//         <form onSubmit={handleSearch} className="relative flex-1">
//           <Search className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name, color, or style..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
//           />
//         </form>

//         <button
//           type="button"
//           onClick={() => setShowFilters(!showFilters)}
//           className="btn-secondary flex items-center gap-2 px-4 py-2"
//         >
//           <Filter size={18} />
//           Filters
//         </button>
//       </div>

//       {showFilters && (
//         <Filters
//           filters={filters}
//           setFilters={setFilters}
//           onClose={() => setShowFilters(false)}
//         />
//       )}

//       {loading ? (
//         <p className="text-center text-gray-500">Loading dresses...</p>
//       ) : products.length > 0 ? (
//         <>
//           <p className="text-gray-600">{products.length} dresses found</p>
//           <div className="grid md:grid-cols-3 gap-6 mt-4">
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-gray-500">
//           No dresses found. <br />
//           Try adjusting your filters or search query.
//         </p>
//       )}

//       <ChatBot />
//     </div>
//   );
// };

// export default Shop;



import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Search, Filter, X } from 'lucide-react'; // Added X icon
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

  // Wrap fetchProducts in useCallback to memoize and prevent unnecessary re-runs
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.size !== 'all' && { size: filters.size }),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        ...(filters.sort && { sort: filters.sort }),
        // Pass searchQuery directly, but only trigger fetch on search submit/filters change
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
  }, [filters, searchQuery]); // Dependency array includes filters and searchQuery for full sync

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Use fetchProducts as dependency

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(); // Trigger fetch with current state
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchProducts(); // Trigger fetch after clearing
  }

  // A function to apply filters and fetch products
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    // fetchProducts will run via useEffect because filters state changed
  }
  
  // New: Render Active Filters
  const ActiveFilterPill = ({ keyName, value, onRemove }) => (
    <span className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
      **{keyName}**: {value}
      <button onClick={onRemove} className="ml-2 text-purple-500 hover:text-purple-900">
        <X size={14} />
      </button>
    </span>
  );


  return (
    <div className="shop-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        The Complete Dress Catalog
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar/Mobile Filter Toggle */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-20 bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-bold">Refine Your Style</h2>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>
            {/* The Filters component should now use applyFilters to update and trigger fetching */}
            <Filters
              filters={filters}
              setFilters={applyFilters}
              onClose={() => setShowFilters(false)} // This might not be needed if filters are applied instantly
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Search Bar & Filter Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <form onSubmit={handleSearch} className="relative flex-1 w-full">
              <Search className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, color, style, or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-4 text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </form>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-200"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Active Filters Display */}
          <div className="flex flex-wrap items-center">
            {filters.category !== 'all' && <ActiveFilterPill keyName="Category" value={filters.category} onRemove={() => setFilters(f => ({...f, category: 'all'}))} />}
            {filters.size !== 'all' && <ActiveFilterPill keyName="Size" value={filters.size} onRemove={() => setFilters(f => ({...f, size: 'all'}))} />}
            {filters.sort && <ActiveFilterPill keyName="Sort" value={filters.sort} onRemove={() => setFilters(f => ({...f, sort: ''}))} />}
            {filters.minPrice > 0 && <ActiveFilterPill keyName="Min Price" value={`$${filters.minPrice}`} onRemove={() => setFilters(f => ({...f, minPrice: 0}))} />}
            {filters.maxPrice < 500 && <ActiveFilterPill keyName="Max Price" value={`$${filters.maxPrice}`} onRemove={() => setFilters(f => ({...f, maxPrice: 500}))} />}
            {searchQuery && <ActiveFilterPill keyName="Search" value={searchQuery} onRemove={handleClearSearch} />}
          </div>

          {/* Results Count and Products */}
          {loading ? (
            <p className="text-center text-xl text-indigo-500 py-12">Fetching the latest styles...</p>
          ) : products.length > 0 ? (
            <>
              <p className="text-xl font-medium text-gray-700">
                **{products.length}** dresses found
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-2xl font-semibold text-gray-600 mb-2">
                Oops! No Dresses Found 😔
              </p>
              <p className="text-gray-500">
                Try adjusting your filters, clearing your search query, or check out our **AI Picks for You** on the home page!
              </p>
            </div>
          )}
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Shop;