import React from "react";
import { useTranslation } from "react-i18next";
{
  /*import Courses from "../../media/icons/book_2.svg"
import Professors from "../../media/icons/school.svg"
import Students from "../../media/icons/boy.svg"
import Unrelated from "../../media/icons/emoji_objects.svg"
import Memes from "../../media/icons/celebration.svg"
import Jobs from "../../media/icons/work.svg"*/
}
import "./CategoryDropdown.css";

const CategoryDropdown = ({ onSelectCategory }) => {
  const { t } = useTranslation();

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
        <option value="">{t("selectCategory")}</option>
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
