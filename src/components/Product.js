import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Product.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
    toast.success("Product Added to Cart!!")
  };

  const handleBuyNow = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product">
       <Link to = {`/product/${product._id}`} state={{ product }}>
      <img src="https://placehold.co/600x400" alt={product.name} className="product-image" />
       </Link>
       <div className="product-info">
        <div className="product-name">
          <h3>{product.name}</h3>
        </div>
        <p className="product-price">${product.price}</p>
        <div className="product-buttons">
          <button onClick={addToCartHandler} className="btn add-to-cart">Add to Cart</button>
          <button className="btn buy-now">
          <Link to = {`/product/${product._id}`} className='btn buy-now' state={{ product }} style={{textDecoration : 'none'}}>
          Buy Now
       </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
