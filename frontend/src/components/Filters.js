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


        Filters
        {
        onClose && (
          
            
          
        )
    }



    {/* Category Filter */ }

    Category
        < select
    value = { filters.category || 'all' }
    onChange = {(e) => setFilters({ ...filters, category: e.target.value })}
className = "input-field"
    >
{
    categories.map((cat) => (

        { cat.label }

    ))
}



{/* Size Filter */ }

Size

{
    sizes.map((size) => (
        <button
            key={size}
            onClick={() => setFilters({ ...filters, size: filters.size === size ? 'all' : size })}
            className={`py-2 px-4 rounded-lg border-2 transition ${filters.size === size
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600'
                }`}
        >
            {size}
              
            ))}



            {/* Price Range */}


            Price Range: ${filters.minPrice || 0} - ${filters.maxPrice || 500}


            <input
                type="range"
                min="0"
                max="500"
                value={filters.maxPrice || 500}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full"
            />



            {/* Sort By */}

            Sort By
            <select
                value={filters.sort || ''}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="input-field"
            >
                Latest
                Price: Low to High
                Price: High to Low
                Highest Rated



                {/* Clear Filters */}
                <button
                    onClick={() => setFilters({ category: 'all', size: 'all', minPrice: 0, maxPrice: 500, sort: '' })}
                    className="w-full btn-secondary"
                >
                    Clear All Filters



                    );
};

                    export default Filters;