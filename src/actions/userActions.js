import axios from 'axios';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
     USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,GET_USER_INFO } from '../constants/userConstants';

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:3001/api/users', { name, email, password }, config);
   
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post('http://localhost:3001/api/users/login', { email, password }, config);
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const getUserInfo = (token) => async (dispatch) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
    };

    const { data } = await axios.get('http://localhost:3001/api/users/info', config);

    dispatch({type : GET_USER_INFO , payload : data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
  };
  
