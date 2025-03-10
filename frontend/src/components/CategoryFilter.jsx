import React from 'react';

function CategoryFilter({ categories, category, handleCategoryChange }) {
    return (
        <div>
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryFilter;
<option value="">All Categories</option>