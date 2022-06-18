import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://62a9b693ec36bf40bdbd0ffb.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const showSkeletons = () => [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
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
    </>
  );
};

export default Home;
