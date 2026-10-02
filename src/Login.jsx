
import { useState } from "react";
import { IconLeaf } from "./Icons";
import "./Login.css";        // ← Yeh change karein

export default function Login({ onLogin }) {
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrap">
        {/* LEFT BRAND PANEL */}
        <div className="brand-panel">
          <div className="brand-top">
            <div className="brand-icon"><IconLeaf /></div>
            <h2>CropGen <span>AI</span></h2>
          </div>

          <div className="brand-middle">
            <h1>Welcome back to <span>smarter farming.</span></h1>
            <p>
              Sign in to access AI-powered wheat variety recommendations,
              yield insights and regional data for Sindh.
            </p>
            <div className="brand-features">
              <div className="feature">
                <div className="feature-icon">🌾</div>
                <span>4 Wheat varieties with detailed data</span>
              </div>
              <div className="feature">
                <div className="feature-icon">📈</div>
                <span>Yield &amp; profit estimation tools</span>
              </div>
              <div className="feature">
                <div className="feature-icon">💬</div>
                <span>AI assistant for instant farming advice</span>
              </div>
            </div>
          </div>

          <div className="brand-bottom">
            © 2026 CropGen AI · Smarter Choices. Better Harvests.
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="form-panel">
          <div className="form-head">
            <h2>{tab === "login" ? "Sign in" : "Create account"}</h2>
            <p>
              {tab === "login"
                ? "Welcome back! Please enter your details."
                : "Join CropGen AI and start farming smarter."}
            </p>
          </div>

          <div className="tabs">
            <button
              type="button"
              className={tab === "login" ? "active" : ""}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={tab === "signup" ? "active" : ""}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email address</label>
              <div className="field-input">
                <span className="field-icon">✉</span>
                <input
                  type="email"
                  placeholder="isra@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="field-input">
                <span className="field-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="row-between">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="link">Forgot password?</a>
            </div>

            <button type="submit" className="btn-submit">
              {tab === "login" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <div className="divider">OR CONTINUE WITH</div>

          <div className="social-row">
            <button type="button" className="social-btn">
              <span>G</span> Google
            </button>
            <button type="button" className="social-btn">
              <span>📱</span> Phone
            </button>
          </div>

          <div className="form-footer">
            {tab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href="#switch"
              onClick={(e) => {
                e.preventDefault();
                setTab(tab === "login" ? "signup" : "login");
              }}
            >
              {tab === "login" ? "Create one" : "Sign in"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}