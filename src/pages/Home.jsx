import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    setLoading(true);
    fetch(
      `https://62a9b693ec36bf40bdbd0ffb.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const showSkeletons = () => [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClick={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? showSkeletons()
          : items.map(({ id, title, price, types, sizes, imageUrl }) => (
              <PizzaBlock
                key={id}
                title={title}
                price={price}
                types={types}
                sizes={sizes}
                imageUrl={imageUrl}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
