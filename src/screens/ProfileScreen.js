import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUserInfo } from '../actions/userActions';
import '../styles/ProfileScreen.css';

const Profile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  const [addressesVisible, setAddressesVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (user.token) {
      dispatch(getUserInfo(user.token));
    }
  }, [user.token]);

  const toggleAddresses = () => {
    setAddressesVisible(!addressesVisible);
  };

  const toggleOrders = () => {
    setOrdersVisible(!ordersVisible);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusClass = (status) => {
    return status === 'pending' ? 'status-pending' : 'status-delivered';
  };

  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/users/address', newAddress, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getUserInfo(user.token));
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };

  return (
   
    <div className="profile-container">
    <h1 className="profile-title">Profile</h1>
    <div className="profile-details">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
    <div className="profile-section">
      <button className="btn btn-blue" onClick={toggleAddresses}>
        {addressesVisible ? 'Hide Addresses' : 'View Addresses'}
      </button>
      {addressesVisible && (
        <div className="addresses-container">
          {user.address && user.address.length > 0 ? (
            <div className="addresses-grid">
              {user.address.map((address, index) => (
                <div key={index} className="address-card">
                  <p>{address.address}, {address.city}, {address.postalCode}, {address.country}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No addresses found. Please add a new address.</p>
          )}
          <div className="add-new-address">
            <button className="btn btn-green" onClick={() => setModalIsOpen(true)}>
              Add New Address
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="profile-section">
      <button className="btn btn-blue" onClick={toggleOrders}>
        {ordersVisible ? 'Hide Orders' : 'View Orders'}
      </button>
      {ordersVisible && (
        <div className="orders-container">
          {user.orders.length > 0 ? (
            user.orders.map((order) => (
              <div key={order._id} className="order-card">
      <h3>Order #{order._id}</h3>
      <div className="order-details">
        <div className="detail-item"><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</div>
        <div className="detail-item"><strong>Payment Method:</strong> {order.paymentMethod}</div>
        <div className="detail-item"><strong>Total Price:</strong> ${order.totalPrice}</div>
        <div className={`detail-item ${getStatusClass(order.status)}`}><strong>Status:</strong> {order.status}</div>
      </div>
      <h4>Order Items:</h4>
      <div className="order-items">
        {order.orderItems.map((item) => (
          <div key={item.product._id} className="order-item">
            <p><strong>{item.product.name}</strong> - Quantity: {item.qty}</p>
          </div>
        ))}
      </div>
    </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>

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

export default Profile;
