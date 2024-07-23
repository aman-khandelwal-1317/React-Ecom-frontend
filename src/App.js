import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomeScreen from './screens/HomeScreen';
 import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthRoute from './components/AuthRoute';
import Checkout from './screens/Checkout';

const App = () => {
  return (
    <>
       <Header />
      <main className="py-3">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />}  />
            <Route path="/cart" element={<CartScreen />} />
            <Route
            path="/login"
            element={
              <PrivateRoute>
                <LoginScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <RegisterScreen />
              </PrivateRoute>
            }
          />

<Route
            path="checkout"
            element={
              <AuthRoute>
                <Checkout />
              </AuthRoute>
            }
          />

<Route
            path="/profile"
            element={
              <AuthRoute>
                <ProfileScreen />
              </AuthRoute>
            }
          />

          </Routes>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
