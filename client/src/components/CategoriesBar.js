import React from 'react';
import './CategoriesBar.css';

// We'll use the main categories you provided.
const categories = [
    'All',
    'Academics & Study',
    'Dorm & Housing',
    'Kitchen & Food',
    'Personal Care',
    'Clothing & Accessories',
    'Electronics',
    'Other'
];

// This component will receive the currently selected category and a function to change it.
const CategoriesBar = ({ selectedCategory, onSelectCategory }) => {
    return (
        <nav className="categories-navbar">
            <ul className="categories-list">
                {categories.map(category => (
                    <li
                        key={category}
                        className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoriesBar;