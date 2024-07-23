// src/pages/CartSummary.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveCartToLocalStorage, increaseQuantity, decreaseQuantity, removeFromCart } from '../actions/cartActions';
import "../styles/Cart.css";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cart?.cartItems?.length === 0 && savedCartItems.length > 0) {
      dispatch(saveCartToLocalStorage(savedCartItems));
    }
    setCartItems(savedCartItems);
  }, [cart, dispatch]);

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const increaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQty = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="shopping-cart">
    <div className="breadcrumb">
      <Link to="/">Home</Link> / <span>Shopping cart</span>
    </div>
    <h1>Shopping Cart</h1>
    <div className="cart-content">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product}>
              <td>
                <div className="cart-item">
                  <img src="https://placehold.co/600x400" alt={item.name} className="cart-item-image" />
                  <div>
                    <Link to={`/product/${item.product}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <button onClick={() => removeItem(item.product)} className="remove-button">
                      Remove
                    </button>
                  </div>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="cart-item-quantity">
                  <button onClick={() => decreaseQty(item.product)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.product)}>+</button>
                </div>
              </td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="checkout-button">
          CHECKOUT
        </Link>
      </div>
    </div>
  </div>
  );
}

export default CartScreen;

