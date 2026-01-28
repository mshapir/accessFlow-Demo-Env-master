import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../utils/mockData';
import { useCart } from '../contexts/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate('/products')} className="back-button">
          ← Back to Products
        </button>

        {showSuccess && (
          <div className="alert alert-success">
            Added {quantity} {quantity === 1 ? 'item' : 'items'} to cart!
          </div>
        )}

        <div className="product-details">
          <div className="product-image-large">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info-large">
            <div className="product-category-badge">{product.category}</div>
            <h1>{product.name}</h1>
            
            <div className="product-rating-large">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-value">{product.rating}</span>
            </div>

            <p className="product-price-large">${product.price.toFixed(2)}</p>

            <p className="product-description">{product.description}</p>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                  Add to Cart
                </button>
              </div>
            )}

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>High quality materials</li>
                <li>1-year warranty</li>
                <li>Free shipping on orders over $50</li>
                <li>Easy returns within 30 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
