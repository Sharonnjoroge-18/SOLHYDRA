import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI, paymentsAPI } from '../api';
import './checkoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]').map(item => ({
    ...item,
    quantity: item.qty ?? item.quantity ?? 1,
  }))
  const cartDiscount = JSON.parse(localStorage.getItem('cartDiscount') || '0')
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - cartDiscount;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cartItems.length) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const createdOrderIds = [];

      for (const item of cartItems) {
        const payload = {
          ...formData,
          product_id: item.id ?? item.product_id,
          product: item.id ?? item.product_id,
          quantity: item.quantity ?? item.qty ?? 1,
        };
        console.log('Creating order payload:', payload, 'cart item:', item);

        const order = await ordersAPI.create(payload);

        console.log('Order created:', order);
        const orderId = order?.id ?? order?._id ?? order?.order_id ?? order?.orderId;
        if (!orderId) {
          console.error('Create order response:', order);
          throw new Error('Order creation failed: missing order ID');
        }

        createdOrderIds.push(orderId);
      }

      const orderId = createdOrderIds[0];
      console.log('Created orderId:', orderId);

      try {
        const payment = await paymentsAPI.initiate(orderId);
        console.log('Payment initiation response:', payment);
        if (payment?.authorization_url) {
          const authUrl = payment.authorization_url;
          const finalUrl = /^https?:\/\//i.test(authUrl)
            ? authUrl
            : new URL(
                authUrl,
                import.meta.env.VITE_API_BASE_URL || 'https://hydra-backend-production-4f57.up.railway.app'
              ).href;

          console.log('Redirecting to payment URL:', finalUrl);
          window.location.href = finalUrl;
          return;
        }
        if (payment?.message) {
          throw new Error(payment.message);
        }
      } catch (paymentError) {
        console.error('Payment initiation failed:', paymentError?.response?.data || paymentError);
        setError(
          paymentError?.response?.data?.detail ||
          paymentError?.response?.data?.message ||
          paymentError?.message ||
          'Payment redirection failed. Your order was created, but payment could not be completed automatically.'
        );
        localStorage.removeItem('cartItems');
        return;
      }

      localStorage.removeItem('cartItems');
      alert('Order placed successfully. We could not complete payment redirection automatically.');
      navigate('/');
    } catch (err) {
      console.error('Checkout error:', err?.response?.data || err);
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err.message ||
        'Failed to process checkout. Please try again.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <button className="checkout-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="checkout-title">
        Checkout
      </h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="checkout-summary-item">
            <span>{item.name} x {item.quantity}</span>
            <span>Ksh {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="checkout-total">
          <span>Total Amount:</span>
          <span>Ksh {total.toLocaleString()}</span>
        </div>
      </div>

      {error && (
        <div className="checkout-error">
          {error}
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            type="tel"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
            placeholder="+254 700 000 000"
            required
          />
        </div>

        <button
          type="submit"
          className="checkout-submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>

      <button
        className="checkout-secondary"
        onClick={() => navigate('/cart')}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default CheckoutPage;
