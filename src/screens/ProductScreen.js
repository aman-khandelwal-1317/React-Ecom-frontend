import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import '../styles/ProductScreen.css';
import { toast } from 'react-toastify';

const ProductScreen = (props) => {
  const  {state}  = useLocation()
  const product = state?.product;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="product-screen">Product not found</div>;
  }


  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    toast.success("Product Added to Cart!!")
  };

  // const buyNowHandler = () => {
  //   if (!userInfo) {
  //     navigate('/login');
  //   } else {
  //     navigate('/order-summary', { state: { product, quantity } });
  //   }
  // };

  return (
    <div className="product-screen">
    <div className="product-details-container">
      <div className="product-images">
        <img src="https://placehold.co/600x400" alt={product.name} className="main-image" />
        <div className="thumbnail-images">
          <img src="https://placehold.co/600x400" alt={product.name} className="thumbnail-image" />
          {/* Add more thumbnail images if available */}
        </div>
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <div className="rating">
          <span className="rating-score">3.7</span>
          <span className="rating-count">(101910 Ratings, 19972 Reviews)</span>
        </div>
        <p className="delivery">Free delivery</p>
        <div className="select-size">
          <label>Select Size</label>
          <div className="size-options">Free Size</div>
        </div>

        <div className="quantity">
          <label>Quantity</label>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="product-details">
          <h3>Product Details</h3>
          <p>{product.description}</p>
          {/* Add more details if available */}
        </div>
        <div className="action-buttons">
          <button 
            className="btn add-to-cart" 
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          <button className="btn buy-now"  onClick={addToCartHandler}>Buy Now</button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default ProductScreen;
