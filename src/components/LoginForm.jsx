import React, { useState } from 'react';

export default function LoginForm({ loginRole, setLoginRole, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <div className="brand-logo">
            Haven<span className="logo-accent">Key</span>
          </div>
          <p className="auth-subtitle">Property & Lease Management Portal</p>
        </div>

        {/* Role Segmented Controller */}
        <div className="role-tab-group">
          <button
            type="button"
            className={`role-tab ${loginRole === 'landlord' ? 'active' : ''}`}
            onClick={() => setLoginRole('landlord')}
          >
            🛡️ Landlord / Admin
          </button>
          <button
            type="button"
            className={`role-tab ${loginRole === 'tenant' ? 'active' : ''}`}
            onClick={() => setLoginRole('tenant')}
          >
            🔑 Tenant Portal
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder={loginRole === 'landlord' ? 'landlord@havenkey.co.ke' : 'tenant@gmail.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn-primary btn-block">
            Sign In as {loginRole === 'landlord' ? 'Landlord' : 'Tenant'}
          </button>
        </form>
      </div>
    </div>
  );
}