import React from "react";
import "./CategoryDropdown.css"

const CategoryDropdown = ({ onSelectCategory }) => {
  const handleSelect = (event) => {
    const selectedCategory = event.target.value;
    onSelectCategory(selectedCategory);
  };

  const categories = [
    "Courses",
    "Professors",
    "Students",
    "Unrelated",
    "Memes",
    "Jobs",
  ];

  return (
    <div className="category-dropdown">
      <select id="category" onChange={handleSelect} className="category">
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
