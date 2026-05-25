import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shop.css';
import solhydra from '../images/SolHydra 200ml.jpg';

const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [activeTab, setActiveTab] = useState('Ingredients');

  const sizes = ['250ml', '500ml', '1L'];
  const tabs = ['Ingredients', 'Benefits', 'Nutrition Facts', 'How to Use'];

  const ingredients = [
    { name: 'Sodium', desc: 'Helps maintain fluid balance and supports nerve function.' },
    { name: 'Potassium', desc: 'Essential for muscle function and heart health.' },
    { name: 'Magnesium', desc: 'Supports energy production and bone health.' },
    { name: 'Calcium', desc: 'Vital for strong bones and teeth.' },
    { name: 'Natural Flavoring', desc: 'Provides a refreshing taste without artificial additives.' },
    { name: 'Purified Water', desc: 'Clean, filtered water for optimal hydration.' },
  ];

  const reviews = [
    { name: 'Sara', rating: 5, comment: 'Amazing product! Keeps me hydrated all day and tastes great. Highly recommend!', verified: true },
    { name: 'John', rating: 5, comment: 'Best electrolyte drink I have tried. Will definitely buy again.', verified: true },
  ];

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={solhydra} alt="SolHydra" />
          </div>
          <div className="thumbnails">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="thumbnail">
                <img src={solhydra} alt={`thumb-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="review-count">(120 Reviews)</span>
          </div>
          <h1 className="product-title">SolHydra 500ml</h1>
          <div className="price-section">
            <span className="price">KES490</span>
            <span className="old-price">KES 550</span>
            <span className="badge">Save 11%</span>
          </div>
          <p className="description">
            Perfect for daily hydration in hot climates, SolHydra 500ml delivers clean electrolytes,
            anti-sugar minerals, and therapeutic ingredients. Ideal for commuters, workshops, and
            staying mentally aware.
          </p>

          <div className="size-section">
            <label>Size</label>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={() => navigate('/cart')}>
              Add to Cart
            </button>
            <button className="buy-now">Buy Now</button>
          </div>

          <div className="features">
            <div className="feature">🚚 Free Delivery in 24 hrs</div>
            <div className="feature">💧 100% Clean Label</div>
            <div className="feature">🌿 Reusable Packaging</div>
            <div className="feature">🇰🇪 Made in Kenya</div>
          </div>
        </div>
      </div>

      <div className="tabs-section">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content" id="ingredients">
          <div className="ingredients-grid">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient-card">
                <div className="ingredient-icon">🧪</div>
                <h3>{ing.name}</h3>
                <p>{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-summary">
          <div className="rating-overview">
            <div className="rating-number">5.0</div>
            <div className="stars-large">★★★★★</div>
            <div className="total-reviews">Based on 120 reviews</div>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="rating-bar">
                <span>{star}</span>
                <div className="bar"><div className="fill" style={{ width: star === 5 ? '100%' : '0%' }}></div></div>
                <span>{star === 5 ? '120' : '0'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-list">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <div className="reviewer">
                  <div className="avatar">{review.name[0]}</div>
                  <div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>
                {review.verified && <span className="verified">✓ Verified Buyer</span>}
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;