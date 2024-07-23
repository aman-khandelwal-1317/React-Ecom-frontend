import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import '../styles/Home.css';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [category, setCategory] = useState('');


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="home-screen">
    <div className="home-screen-filter">
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>

        {products &&
          [...new Set(products.map((product) => product.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
      </select>
    </div>
    <div className="home-screen-products">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default HomeScreen;
