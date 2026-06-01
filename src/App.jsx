import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import SignUp from './components/signup';
import HydrationCalculator from './components/hydrationcalculator';
import Footer from './components/footer';
import Navbar from './components/navbar';
import CartPage from './components/cart';
import ProductPage from './components/shop';
import CheckoutPage from './components/checkoutPage';
import './App.css';

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hydrationcalculator" element={<HydrationCalculator />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop" element={<ProductPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <CheckoutPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
