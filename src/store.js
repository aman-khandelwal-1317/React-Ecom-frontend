import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({

  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  productList: productListReducer,
  cart: cartReducer,
  
  // Add other reducers here
});

let userInfoFromStorage = null;
let cartItemsFromStorage = null;

const getUserInfo = () => {
  userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  return userInfoFromStorage;
} 

const getCartInfo = () => {
  
   cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

  return cartItemsFromStorage;

}



const initialState = {
  userLogin: { userInfo: getUserInfo()},
  cart: { cartItems: getCartInfo() },
};


const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
