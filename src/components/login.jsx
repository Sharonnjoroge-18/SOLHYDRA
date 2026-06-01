import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (trimmedPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      try {
        setLoading(true);
        console.log("Logging in", { email: trimmedEmail, from });
        await login(trimmedEmail, trimmedPassword);
        console.log("Login successful, navigating to", from);
        navigate(from, { replace: true });
      } catch (err) {
        console.error("Login error:", err?.response?.data || err);
        setError(
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to log in. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="login-page">
            <div className="form-container">
                <h2 className="form-title">Log In</h2>
                <p className="form-subtitle">Welcome back.Please enter your credentials.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="input-field"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                className="input-field"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    </div>

                    <div className="options-row">
                        <Link to="/forgot-password" className="forgot-link">
                            <span className="forgot-text">Forgot Password?</span>
                        </Link>
                    </div>


                    <button type="submit" disabled={loading} className="log-in-button">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="footer-text">
                    Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};
export default Login;