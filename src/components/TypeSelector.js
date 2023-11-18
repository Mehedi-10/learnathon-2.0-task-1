import React from 'react';

const TypeSelector = ({ types, selectedCategory, onCategoryChange }) => {
  return (
    <select value={selectedCategory} onChange={onCategoryChange}>
      <option value="">All</option>
      {types.map((type) => (
        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
      ))}
    </select>
  );
};

export default TypeSelector;
