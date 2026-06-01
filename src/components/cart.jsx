import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import solhydra1 from '../images/SolHydra500ml.jpg'
import './cart.css'

const defaultCartItems = [
  { id: 1, name: 'SolHydra 500ml', size: 'Size: 500ml', price: 500, qty: 2 },
  { id: 2, name: 'SolHydra 350ml', size: 'Size: 350ml', price: 350, qty: 1 },
  { id: 3, name: 'SolHydra 12-Pack', size: 'Value Pack • 12x 500ml', price: 5400, qty: 1 },
]

function CartPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cartItems')
    return saved ? JSON.parse(saved) : defaultCartItems
  })
  const [promo, setPromo] = useState('')

  const updateQty = (id, delta) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ))
  }

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = 675
  const total = subtotal - discount

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={solhydra1} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-size">{item.size}</p>
                <p className="item-price">Kes {item.price.toLocaleString()}</p>
              </div>
              <div className="item-actions">
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Kes {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span className="discount">Kes {discount}</span>
          </div>

          <div className="promo-section">
            <label>Promo Code</label>
            <div className="promo-input">
              <input
                type="text"
                placeholder="Enter code"
                value={promo}
                onChange={e => setPromo(e.target.value)}
              />
              <button>Apply</button>
            </div>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span className="total-price">Kes {total.toLocaleString()}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => items.length > 0 && navigate('/checkout')}
            disabled={items.length === 0}
          >
            Proceed to Checkout →
          </button>
          <Link to="/shop" className="continue-btn">Continue Shopping</Link>
          {items.length === 0 && (
            <div className="empty-note">Your cart is empty. Add items before proceeding to checkout.</div>
          )}

          <div className="secure-note">🔒 Secure checkout with payment integration</div>
        </div>
      </div>
    </div>
  )
}

export default CartPage