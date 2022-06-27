import React, { useState, useEffect, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    setLoading(true);
    fetch(
      `https://62a9b693ec36bf40bdbd0ffb.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const showSkeletons = () => [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const filtered = items.filter((item) => {
    if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  });
  const showPizzas = () =>
    filtered.map(({ id, title, price, types, sizes, imageUrl }) => (
      <PizzaBlock
        key={id}
        title={title}
        price={price}
        types={types}
        sizes={sizes}
        imageUrl={imageUrl}
      />
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClick={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? showSkeletons() : showPizzas()}</div>
      <Pagination onChangePage={(i) => setCurrentPage(i)} />
    </div>
  );
};

export default Home;
