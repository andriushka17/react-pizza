import React from 'react';

const Categories = ({ value, onClick }) => {
  const setActiveCategory = (index) => {
    onClick(index);
  };

  const categories = ['Все', 'Мясныe', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
