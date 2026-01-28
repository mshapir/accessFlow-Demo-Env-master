import React from 'react';
import { Link } from 'react-router-dom';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          
          <div className="success-info">
            <p>A confirmation email has been sent to your email address.</p>
            <p>You can track your order in your profile page.</p>
          </div>

          <div className="success-actions">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/profile" className="btn btn-outline">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
