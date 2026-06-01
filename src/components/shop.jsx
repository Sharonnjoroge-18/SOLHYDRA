import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shop.css';
import solhydra200 from '../images/SolHydra 200ml.jpg';
import solhydra500 from '../images/SolHydra500ml.jpg';
import solhydra350 from '../images/SolHydra350ml.jpg';
import { IconBase } from 'react-icons';


const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [activeTab, setActiveTab] = useState('Ingredients');

  const sizes = ['200ml', '500ml', '350ml'];

  const productPrices = {
    '200ml': 360,
    '500ml': 490,
    '350ml': 420,
  };

  const productImageMap = {
    '200ml': solhydra200,
    '500ml': solhydra500,
    '350ml': solhydra350,
  };
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
    { name: 'Low Sugar', desc: '0-2g per serving means you can drink it daily without health concerns.Most drinks have 20-30g sugar-that is 5-7 teaspoons.' },
    { name: 'Fast Absorption', desc: 'Ionized formula enhances absorption,getting electrolytes into your system faster when you need them most.' },
    { name: 'Daily Safe', desc: 'Clean label with no artificial additives means its safe for everyday consuption-from morning commute to evening workout.' },
  ];
    const nutritionFacts = [

    { name: 'Physical Symptoms ', desc: 'Muscles cramps, weaknesss, fatigue, dizziness, irregular heartbeat and headaches.These often get mistaken for "just being tired".' },
    { name: 'Mental Symptoms', desc: 'Confusion, difficulty concentrating, brain fog and mood changes.Dehydration affects cognitive function significantly.' },
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

  const reviews = [
    { name: 'Rose', rating: 5, comment: 'Amazing product! Keeps me hydrated all day and tastes great. Highly recommend!', verified: true },
    { name: 'Ese', rating: 5, comment: 'Best electrolyte drink I have tried. Will definitely buy again.', verified: true },
  ];
  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemId = selectedSize === '500ml' ? 1 : selectedSize === '350ml' ? 2 : 3;
    const itemName = `SolHydra ${selectedSize}`;
    const itemPrice = productPrices[selectedSize] || 490;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === itemId && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex] = {
        ...cartItems[existingItemIndex],
        qty: cartItems[existingItemIndex].qty + quantity,
      };
    } else {
      cartItems.push({
        id: itemId,
        name: itemName,
        size: selectedSize,
        price: itemPrice,
        qty: quantity,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
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
            {/* Bright Blue Informational Banner */}
            <div className="nutrition-dyk-banner">
              <h2>💡 Did You Know?</h2>
              <p>
                In hot climates, you can lose up to 2-3 liters of sweat per hour during physical activity—that's not just water, it's electrolytes 
                too. Without replenishing them, even drinking lots of water won't fully rehydrate you.
              </p>
            </div>

            {/* Inner Content Main Card Panel */}
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
                  {/* Circular Step Number Badge */}
                  <div className="step-badge-circle">
                    {item.step}
                  </div>
                  
                  {/* Text Content Group */}
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
            <button className="add-to-cart" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={() => navigate('/checkout')}>Buy Now</button>
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
        <div className="tab-content" >
          {renderTabContent()}
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