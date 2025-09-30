import React from 'react';
import { X } from 'lucide-react';

const Filters = ({ filters, setFilters, onClose }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'casual', label: 'Casual' },
    { value: 'evening', label: 'Evening' },
    { value: 'cocktail', label: 'Cocktail' },
    { value: 'professional', label: 'Professional' },
    { value: 'formal', label: 'Formal' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="filters-container p-4 bg-white rounded-lg shadow-lg space-y-4">
      {/* Close Button */}
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">
          <X size={20} />
        </button>
      )}

      {/* Category Filter */}
      <div>
        <label className="font-semibold">Category</label>
        <select
          value={filters.category || 'all'}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="input-field w-full mt-1 p-2 border rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Size Filter */}
      <div>
        <label className="font-semibold">Size</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                setFilters({ ...filters, size: filters.size === size ? 'all' : size })
              }
              className={`py-2 px-4 rounded-lg border-2 transition ${
                filters.size === size
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="font-semibold">
          Price Range: ${filters.minPrice || 0} - ${filters.maxPrice || 500}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.maxPrice || 500}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
          }
          className="w-full mt-2"
        />
      </div>

      {/* Sort By */}
      <div>
        <label className="font-semibold">Sort By</label>
        <select
          value={filters.sort || ''}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="input-field w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">Latest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="highestRated">Highest Rated</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() =>
          setFilters({
            category: 'all',
            size: 'all',
            minPrice: 0,
            maxPrice: 500,
            sort: '',
          })
        }
        className="w-full mt-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default Filters;