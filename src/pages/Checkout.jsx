import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/FormInput';
import { validateForm } from '../utils/validation';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>
          <div className="empty-message">
            <p>Your cart is empty. Add items before checking out.</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      fullName: { required: true, label: 'Full Name' },
      email: { required: true, email: true, label: 'Email' },
      phone: { required: true, phone: true, label: 'Phone' },
      address: { required: true, label: 'Address' },
      city: { required: true, label: 'City' },
      state: { required: true, label: 'State' },
      zipCode: { required: true, zipCode: true, label: 'Zip Code' },
      cardNumber: { required: true, label: 'Card Number' },
      cardExpiry: { required: true, label: 'Expiry Date' },
      cardCVV: { required: true, label: 'CVV' },
    };

    const validation = validateForm(formData, validationRules);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const order = {
        items: cartItems,
        total: getCartTotal() + (getCartTotal() > 50 ? 0 : 5.99) + getCartTotal() * 0.08,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      };

      if (user) {
        addOrder(order);
      }

      clearCart();
      setIsProcessing(false);
      navigate('/checkout-success');
    }, 2000);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <section className="form-section">
              <h2>Shipping Information</h2>
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
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
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="1234567890"
                required
              />
              <FormInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                required
              />
              <div className="form-row">
                <FormInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />
                <FormInput
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                  required
                />
                <FormInput
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={errors.zipCode}
                  placeholder="12345"
                  required
                />
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Information</h2>
              <FormInput
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="form-row">
                <FormInput
                  label="Expiry Date"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  error={errors.cardExpiry}
                  placeholder="MM/YY"
                  required
                />
                <FormInput
                  label="CVV"
                  name="cardCVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                  error={errors.cardCVV}
                  placeholder="123"
                  required
                />
              </div>
            </section>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isProcessing}
              style={{ width: '100%' }}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{getCartTotal() > 50 ? 'FREE' : '$5.99'}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>
                  ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 5.99) + getCartTotal() * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
