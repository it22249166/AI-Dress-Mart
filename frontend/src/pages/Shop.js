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

import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, X } from "lucide-react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ChatBot from "../components/ChatBot";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const defaultFilters = {
    category: "all",
    size: "all",
    minPrice: 0,
    maxPrice: 500,
    sort: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  /* ---------------- Fetch Products ---------------- */

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        ...(filters.category !== "all" && { category: filters.category }),
        ...(filters.size !== "all" && { size: filters.size }),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        ...(filters.sort && { sort: filters.sort }),
        ...(searchQuery && { search: searchQuery }),
      };

      const { data } = await getProducts(params);
      setProducts(data?.data ?? []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  /* ---------------- Debounced Search ---------------- */

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 400); // debounce 400ms

    return () => clearTimeout(delay);
  }, [fetchProducts]);

  /* ---------------- Handlers ---------------- */

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearAll = () => {
    setFilters(defaultFilters);
    setSearchQuery("");
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false); // auto-close on mobile
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.size !== "all" ||
    filters.minPrice !== 0 ||
    filters.maxPrice !== 500 ||
    filters.sort ||
    searchQuery;

  /* ---------------- UI ---------------- */

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        The Complete Dress Catalog
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div
          className={`lg:w-1/4 ${showFilters ? "block" : "hidden"
            } lg:block`}
        >
          <div className="lg:sticky lg:top-24 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-bold">Refine Your Style</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                <X />
              </button>
            </div>

            <Filters
              filters={filters}
              setFilters={applyFilters}
            />
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 space-y-6">

          {/* Sticky Search Header */}
          <div className="sticky top-0 bg-white z-20 pb-4">
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search dresses, colors, fabrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-4 text-gray-500 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 border rounded-xl"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>

            {/* Results + Clear All */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-medium text-gray-700">
                {loading ? "Loading..." : `${products.length} dresses found`}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-xl">
              <p className="text-2xl font-semibold mb-2">
                No Dresses Found 😔
              </p>
              <p className="text-gray-500">
                Try adjusting filters or clearing your search.
              </p>

              <button
                onClick={handleClearAll}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Shop;