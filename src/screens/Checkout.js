import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../styles/OrderSummary.css';
import { getUserInfo } from '../actions/userActions';
import { removeCartData } from '../actions/cartActions';
import { toast } from 'react-toastify';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const user = userInfo;

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleAddressChange = (index) => {
    
    setSelectedAddressIndex(parseInt(index));
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://mern-ecom-zyjy.onrender.com/api/users/address', newAddress, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      dispatch(getUserInfo(user.token));
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };

  const handleOrderSubmit = async () => {
    const orderData = {
      orderItems: cartItems,
      shippingAddressId: user.address[selectedAddressIndex]._id,
      paymentMethod,
      itemsPrice: calculateItemsPrice(cartItems),
      taxPrice: calculateTaxPrice(cartItems),
      shippingPrice: calculateShippingPrice(cartItems),
      totalPrice: calculateTotalPrice(cartItems),
    };

    try {
      await axios.post(
        'https://mern-ecom-zyjy.onrender.com/api/orders',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(removeCartData())
      toast.success('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  const calculateItemsPrice = (items) => {
    return parseFloat(items?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
  };

  const calculateTaxPrice = (items) => {
    const itemsPrice = calculateItemsPrice(items);
    return parseFloat((0.1 * itemsPrice).toFixed(2));
  };

  const calculateShippingPrice = (items) => {
    return items?.length > 0 ? 0 : 0;
  };

  const calculateTotalPrice = (items) => {
    const itemsPrice = calculateItemsPrice(items);
    const taxPrice = calculateTaxPrice(items);
    const shippingPrice = calculateShippingPrice(items);
    return parseFloat((itemsPrice + taxPrice + shippingPrice).toFixed(2));
  };

  return (
   
    <div className="checkout-container">
    <h1 className="checkout-title">Checkout</h1>
    {cartItems && cartItems.length <= 0 ? (
      <div> No Products in User Cart</div>
    ) : (
      <div className="checkout-content">
        <div className="checkout-column left-column">
          <h2>Select Shipping Address</h2>
          <div className="address-selection">
            {user.address && user.address.length > 0 ? (
              user.address.map((address, index) => (
                <div
                  key={index}
                  className={`address-card ${selectedAddressIndex === index ? 'selected' : ''}`}
                  onClick={() => handleAddressChange(index)}
                >
                  <p>{address.address}, {address.city}, {address.postalCode}, {address.country}</p>
                </div>
              ))
            ) : (
              <p>No addresses found. Please add a new address.</p>
            )}
          </div>
          <div className="add-new-address">
            <button onClick={() => setModalIsOpen(true)}>
              Add New Address
            </button>
          </div>
          <h2>Select Payment Method</h2>
          <div className="payment-method-selection">
              <div
                className={`payment-method-card ${paymentMethod === 'Prepaid' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Prepaid')}
              >
                <div><i className="fas fa-credit-card"></i></div>
                <p>Prepaid</p>
              </div>
              <div
                className={`payment-method-card ${paymentMethod === 'COD' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('COD')}
              >
                <div><i class="fa-solid fa-money-bill-wave"></i></div>
                <p>Cash on Delivery (COD)</p>
              </div>
            </div>
        </div>
        <div className="checkout-column right-column">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Items:</span>
            <span>${calculateItemsPrice(cartItems)}</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>${calculateTaxPrice(cartItems)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>${calculateShippingPrice(cartItems)}</span>
          </div>
          <div className="summary-item">
            <span>Total:</span>
            <span>${calculateTotalPrice(cartItems)}</span>
          </div>
          <button onClick={handleOrderSubmit} className="confirm-order-button">
            Confirm Order
          </button>
        </div>
      </div>
    )}

    {modalIsOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
          <h2>Add New Address</h2>
          <form className="new-address-form" onSubmit={handleNewAddressSubmit}>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={newAddress.address}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={newAddress.country}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <button type="submit">Add Address</button>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default Checkout;
