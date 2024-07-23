import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_LOCAL_STORAGE, INCREASE_QUANTITY, DECREASE_QUANTITY,ORDER_SUCCESSFUL} from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  var { data } = await axios.get(`https://mern-ecom-zyjy.onrender.com/api/products/${id}`);

  data = data.product

  const cartItem = {
    product: id,
    name: data.name,
    image: data.image,
    price: data.price,
    quantity
  };

  dispatch({
    type: CART_ADD_ITEM,
    payload: cartItem
  });

  const { cart: { cartItems } } = getState();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  const { cart: { cartItems } } = getState();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const increaseQuantity = (productId) => (dispatch, getState) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: productId,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const decreaseQuantity = (productId) => (dispatch, getState) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: productId,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const saveCartToLocalStorage = (cartItems) => (dispatch) => {
  dispatch({
    type: CART_SAVE_LOCAL_STORAGE,
    payload: cartItems
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeCartData = () => (dispatch) => {
  localStorage.removeItem('cartItems');
  dispatch({ type: ORDER_SUCCESSFUL });
};