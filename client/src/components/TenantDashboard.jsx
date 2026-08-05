import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TenantDashboard({ user, property }) {
  const navigate = useNavigate();
  if (!property) {
    return (
      <div className="loading-state">
        <p>Loading your lease details…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome Back, {user.name}</h1>
        <p className="page-subtitle">Here is the current status of your active lease agreement.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Monthly Rent Due</div>
          <div className="stat-number">KSh {Number(property?.price || 0).toLocaleString()}</div>
          <div className="stat-trend" style={{ color: 'var(--primary)' }}>Due: 1st of every month</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Lease Status</div>
          <div className="stat-number" style={{ fontSize: '1.5rem', marginTop: '0.8rem' }}>
            <span className="status-badge active">Active & Paid</span>
          </div>
          <div className="stat-trend">Valid until Dec 31, 2026</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Property Manager</div>
          <div className="stat-number" style={{ fontSize: '1.3rem', marginTop: '0.6rem' }}>HavenKey Admin</div>
          <div className="stat-trend">📞 +254 700 000 000</div>
        </div>
      </div>

      <div className="table-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>My Rented Residence</h2>
        <div className="property-card" style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
          <div className="card-image-wrap" style={{ width: '40%', height: 'auto' }}>
            <img src={property.image_url} alt="My Residence" className="card-image" />
          </div>
          <div className="card-body" style={{ flex: 1 }}>
            <h3 className="card-title" style={{ fontSize: '1.5rem' }}>{property.title}</h3>
            <p className="card-location" style={{ fontSize: '1rem' }}>📍 {property.address}, Nairobi</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Includes 2 Bedrooms, Executive Finishings, Fast Fiber WiFi, and 24/7 Security.
            </p>
            <button className="btn-primary" style={{ padding: '0.75rem 1.5rem' }} onClick={() => navigate('/tenant-actions')}>
              Pay Rent / Request Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}