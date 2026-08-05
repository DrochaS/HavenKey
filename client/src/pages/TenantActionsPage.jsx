import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TenantActionsPage({ user, property }) {
  const navigate = useNavigate();

  return (
    <div className="page tenant-actions-page">
      <header className="page-header">
        <h1>Tenant Actions</h1>
        <p>Manage rent payments and maintenance requests for your current residence.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Current Lease</div>
          <div className="stat-number">{property?.title || 'No active lease found'}</div>
          <div className="stat-trend">{property?.address || 'Please check your lease details.'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Monthly Rent</div>
          <div className="stat-number">KSh {Number(property?.price || 0).toLocaleString()}</div>
          <div className="stat-trend">Due by the 1st of every month</div>
        </div>
      </div>

      <div className="actions-grid" style={{ marginTop: '2rem' }}>
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => alert('Rent payment flow will open here.')}>Pay Rent</button>
        <button className="btn-secondary" style={{ width: '100%' }} onClick={() => alert('Maintenance request form will open here.')}>Request Maintenance</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button className="btn-link" onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
}
