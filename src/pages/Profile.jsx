import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/FormInput';
import { validateForm } from '../utils/validation';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, deleteAccount } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const validationRules = {
      name: { required: true, label: 'Name' },
      email: { required: true, email: true, label: 'Email' },
    };

    const validation = validateForm(formData, validationRules);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      updateProfile(formData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setErrors({});
  };

  const handleDelete = () => {
    deleteAccount();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="profile-layout">
          <div className="profile-card">
            <h2>Profile Information</h2>
            
            {!isEditing ? (
              <div className="profile-view">
                <div className="profile-field">
                  <label>Name</label>
                  <p>{user?.name}</p>
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="profile-field">
                  <label>Member Since</label>
                  <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="profile-edit">
                <FormInput
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                
                <div className="button-group">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="profile-card">
            <h2>Order History</h2>
            {user?.orders && user.orders.length > 0 ? (
              <div className="orders-list">
                {user.orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="order-items">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                    <p className="order-total">${order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">No orders yet</p>
            )}
          </div>

          <div className="profile-card danger-zone">
            <h2>Danger Zone</h2>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-danger"
              >
                Delete Account
              </button>
            ) : (
              <div className="delete-confirm">
                <p className="confirm-message">Are you absolutely sure?</p>
                <div className="button-group">
                  <button onClick={handleDelete} className="btn btn-danger">
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
