import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartItemCount = cartItems?.length;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          MyShop
        </Link>
        <nav className="nav">
          <Link to="/cart" className="nav-link">
            Cart ({cartItemCount})
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={logoutHandler} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
