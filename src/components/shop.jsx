import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shop.css';
import solhydra200 from '../images/SolHydra 200ml.jpg';
import solhydra500 from '../images/SolHydra500ml.jpg';
import solhydra350 from '../images/SolHydra350ml.jpg';
import { IconBase } from 'react-icons';
import { productsAPI } from '../api';

// Global Data Configurations
const sizes = ['200ml', '350ml', '500ml'];
const packVariants = ['6-Pack', '24-Pack'];

const productPrices = {
  '200ml_6-Pack': 1200,
  '200ml_24-Pack': 4580,
  
  '350ml_6-Pack': 1500,
  '350ml_24-Pack': 5680,
  
  '500ml_6-Pack': 1800,
  '500ml_24-Pack': 6370,
};

const productImageMap = {
  '200ml': solhydra200,
  '350ml': solhydra350,
  '500ml': solhydra500,
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [selectedPack, setSelectedPack] = useState('6-Pack');
  const [activeTab, setActiveTab] = useState('Ingredients');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);

  const tabs = ['Ingredients', 'Benefits', 'Nutrition Facts', 'How to Use'];

  const ingredients = [
    { name: 'Sodium', icon: '💧', desc: 'Helps maintain fluid balance and supports nerve function.' },
    { name: 'Potassium', icon: '⚡', desc: 'Essential for muscle function and heart health.' },
    { name: 'Magnesium', icon: '🧲', desc: 'Supports energy production and bone health.' },
    { name: 'Calcium', icon: '🥛', desc: 'Vital for strong bones and teeth.' },
    { name: 'Natural Flavoring', icon: '🍋', desc: 'Provides a refreshing taste without artificial additives.' },
    { name: 'Purified Water', icon: '✨', desc: 'Clean, filtered water for optimal hydration.' },
  ];

  const benefits = [
    { name: 'Balanced Formula', desc: 'Our electrolyte ratio mirrors what your body loses through daily sweat on hot climates-not during intense exercise.' },
    { name: 'Low Sugar', desc: '0-2g per serving means you can drink it daily without health concerns. Most drinks have 20-30g sugar-that is 5-7 teaspoons.' },
    { name: 'Fast Absorption', desc: 'Ionized formula enhances absorption, getting electrolytes into your system faster when you need them most.' },
    { name: 'Daily Safe', desc: 'Clean label with no artificial additives means its safe for everyday consuption-from morning commute to evening workout.' },
  ];

  const nutritionFacts = [
    { name: 'Physical Symptoms ', desc: 'Muscles cramps, weaknesss, fatigue, dizziness, irregular heartbeat and headaches. These often get mistaken for "just being tired".' },
    { name: 'Mental Symptoms', desc: 'Confusion, difficulty concentrating, brain fog and mood changes. Dehydration affects cognitive function significantly.' },
    { name: 'Digestive Issues', desc: 'Nausea, vomiting, constipation or diarrhea. Your digestive systems relies on proper electrolyte balance.' },
    { name: 'Long-Term Effects', desc: 'Chronic mild dehydration can lead to kidney problems, reduced physical performne nd decreased productivity.' },
  ];

  const howToUse = [
    { step: 1, title: 'Shake before opening',        desc: 'Gently swirl the bottle to mix any settled minerals back into solution for full effectiveness.' },
    { step: 2, title: 'Drink one bottle per session', desc: 'One 500ml bottle covers one activity session or replaces fluids lost during a commute in hot weather.' },
    { step: 3, title: 'Best during or after activity', desc: 'Drink before, during, or after physical activity or long commutes.' },
    { step: 4, title: 'Refrigerate after opening',   desc: 'Store in the fridge after opening and consume within 24 hours for best taste and freshness.' },
    { step: 5, title: 'Enjoy!', desc: 'Sip and savor the refreshing taste of SolHydra!' },
  ];

  const [reviews, setReviews] = useState([
    { name: 'Rose', rating: 5, comment: 'Amazing product! Keeps me hydrated all day and tastes great. Highly recommend!', verified: true },
    { name: 'Ese', rating: 5, comment: 'Best electrolyte drink I have tried. Will definitely buy again.', verified: true },
  ]);

  const saveCartItem = async (destination) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemName = `SolHydra ${selectedSize} ${selectedPack}`;
    const lookupKey = `${selectedSize}_${selectedPack}`;
    
    let itemPrice = productPrices[lookupKey] || 1800;
    let backendProductId = null;

    try {
      const products = await productsAPI.getAll();
      console.log("=== LIVE RAILWAY DATABASE PRODUCTS ===", products);

      if (Array.isArray(products)) {
        const found = products.find((p) => {
          const dbName = (p.name || p.title || '').toString().toLowerCase();
          // Strips dashes to reliably check variant options across different styling structures
          const cleanPack = selectedPack.toLowerCase().replace('-', '');
          const cleanDbName = dbName.replace('-', '');

          return dbName.includes('hydra') && 
                 dbName.includes(selectedSize.toLowerCase()) && 
                 cleanDbName.includes(cleanPack);
        });

        if (found) {
          backendProductId = found.id || found._id || found.product_id;
          if (found.price || found.amount) {
            itemPrice = Number(found.price || found.amount);
          }
          console.log(`Resolved live data for ${lookupKey} -> ID: ${backendProductId}, Price: KES ${itemPrice}`);
        }
      }
    } catch (e) {
      console.error('Failed to fetch products from API', e);
    }

    if (!backendProductId) {
      console.error(`Could not resolve a database product match for config: ${lookupKey}`);
      alert(`Product selection mismatch: '${itemName}' is not registered in your live Railway database.`);
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === backendProductId && item.size === selectedSize && item.pack === selectedPack
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex] = {
        ...cartItems[existingItemIndex],
        qty: cartItems[existingItemIndex].qty + quantity,
        price: itemPrice,
      };
    } else {
      cartItems.push({
        id: backendProductId,
        name: itemName,
        size: selectedSize,
        pack: selectedPack,
        price: itemPrice,
        qty: quantity,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate(destination);
  };

  const addToCart = async () => {
    await saveCartItem('/cart');
  };

  const buyNow = async () => {
    await saveCartItem('/checkout');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Ingredients':
        return (
          <div className="ingredients-grid">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient-card">
                <div className="icon-circle-badge">
                  <span className="ingredient-text-icon">{ing.icon}</span>
                </div>
                <h3>{ing.name}</h3>
                <p>{ing.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'Benefits':
        return (
          <div className="benefits-tab-wrapper">
            <h2 className="benefits-main-title">How SolHydra Helps</h2>
            <p className="benefits-subtitle">
              SolHydra is scientifically formulated with the optimal ratio of electrolytes to support daily hydration in hot climates. 
              Unlike sugary sports drinks designed for athletes, we focus on everyday wellness with clean, transparent ingredients.
            </p>
            <div className="benefits-layout-grid">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="benefit-layout-card">
                  <h3>{benefit.name}</h3>
                  <p>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Nutrition Facts':
        return (
          <div className="nutrition-tab-wrapper">
            <div className="nutrition-dyk-banner">
              <h2>💡 Did You Know?</h2>
              <p>
                In hot climates, you can lose up to 2-3 liters of sweat per hour during physical activity—that's not just water, it's electrolytes 
                too. Without replenishing them, even drinking lots of water won't fully rehydrate you.
              </p>
            </div>
            <div className="nutrition-content-card">
              <h2 className="nutrition-main-title">Signs of Electrolyte Imbalance</h2>
              <div className="nutrition-layout-grid">
                {nutritionFacts.map((fact, idx) => (
                  <div key={idx} className="nutrition-layout-card">
                    <h3>{fact.name}</h3>
                    <p>{fact.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'How to Use':
        return (
          <div className="how-to-use-wrapper">
            <div className="how-to-use-list">
              {howToUse.map((item, idx) => (
                <div key={idx} className="how-to-use-card">
                  <div className="step-badge-circle">{item.step}</div>
                  <div className="step-content-text">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ); 
      default:
        return null;
    }
  };

  const handleSubmitReview = () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    setReviews(prev => [
      { ...newReview, verified: false },
      ...prev,
    ]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const currentPriceKey = `${selectedSize}_${selectedPack}`;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={productImageMap[selectedSize]} alt={`SolHydra ${selectedSize}`} />
          </div>
          <div className="thumbnails">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="thumbnail">
                <img src={productImageMap[selectedSize]} alt={`thumb-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="review-count">(120 Reviews)</span>
          </div>
          <h1 className="product-title">SolHydra {selectedSize} ({selectedPack})</h1>
          <div className="price-section">
            <span className="price">KES {productPrices[currentPriceKey]}</span>
            <span className="badge">Bulk Save</span>
          </div>
          <p className="description">
            Perfect for daily hydration in hot climates, SolHydra deliver clean electrolytes,
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

          <div className="pack-section" style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Pack Options</label>
            <div className="pack-options" style={{ display: 'flex', gap: '10px' }}>
              {packVariants.map((pack) => (
                <button
                  key={pack}
                  className={`size-btn ${selectedPack === pack ? 'active' : ''}`}
                  onClick={() => setSelectedPack(pack)}
                >
                  {pack}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section" style={{ marginTop: '20px' }}>
            <label>Quantity</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={buyNow}>Buy Now</button>
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
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <button
            className="add-review-btn"
            onClick={() => setShowReviewForm(prev => !prev)}
          >
            {showReviewForm ? '✕ Cancel' : '+ Add Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="review-form-card">
            <h3>Write a Review</h3>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Amina"
                value={newReview.name}
                onChange={e => setNewReview(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="star-picker">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star-pick ${star <= (hoverRating || newReview.rating) ? 'active' : ''}`}
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea
                placeholder="Share your experience with SolHydra..."
                rows={4}
                value={newReview.comment}
                onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              />
            </div>
            <button className="submit-review-btn" onClick={handleSubmitReview}>
              Submit Review
            </button>
          </div>
        )}

        <div className="reviews-summary">
          <div className="rating-overview">
            <div className="rating-number">
              {reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '5.0'}
            </div>
            <div className="stars-large">★★★★★</div>
            <div className="total-reviews">Based on {reviews.length} reviews</div>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct   = reviews.length ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="rating-bar">
                  <span>{star}</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
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
                    <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  </div>
                </div>
                {review.verified ? <span className="verified">✓ Verified Buyer</span> : <span className="unverified">Unverified</span>}
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