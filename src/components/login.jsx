import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit =  (e) => {
   e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Please fill in all fields.");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    const executeLogin = async () => {
      try {
        setLoading(true);
        await login(email, password);
        navigate("/shop");
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to log in. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    executeLogin();
    };

    return (
        <div className="login-page">
            <div className="form-container">
                <h2 className="form-title">Log In</h2>
                <p className="form-subtitle">Welcome back.Please enter your credentials.</p>

                {error && <p className="error">{error}</p>}

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
                        <label className="checkbox-label">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember Me 
                        </label>

                        <Link to="/forgot-password" className="forgot-link">
                            Forgot Password?
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