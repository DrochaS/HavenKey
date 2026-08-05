import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandlordDashboard({ properties, leases, totalRevenue }) {
  const [activeTab, setActiveTab] = useState('properties');
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Landlord Overview</h1>
        <p className="page-subtitle">Manage listings, track tenant leases, and monitor active revenue.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Monthly Revenue</div>
          <div className="stat-number">KSh {totalRevenue.toLocaleString()}</div>
          <div className="stat-trend">↑ 12% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Properties</div>
          <div className="stat-number">{properties.length} Units</div>
          <div className="stat-trend">100% Occupancy Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Leases</div>
          <div className="stat-number">{leases.length} Agreements</div>
          <div className="stat-trend">All payments up to date</div>
        </div>
      </div>

      <div className="section-bar" style={{ marginTop: '2rem' }}>
        <div className="nav-tabs" style={{ background: 'transparent' }}>
          <button className={`nav-btn ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
            Listings
          </button>
          <button className={`nav-btn ${activeTab === 'leases' ? 'active' : ''}`} onClick={() => setActiveTab('leases')}>
            Lease Agreements
          </button>
        </div>
        {activeTab === 'properties' && <button className="btn-primary">+ Add Property</button>}
      </div>

      {activeTab === 'properties' ? (
        <div className="properties-grid">
          {properties.map((item) => (
            <div key={item.id} className="property-card">
              <div className="card-image-wrap">
                <img src={item.image_url} alt={item.title} className="card-image" />
                <span className="card-tag">{item.city}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-location">📍 {item.address}</p>
                <div className="card-footer">
                  <div>
                    <span className="card-price-amount">KSh {Number(item?.price || 0).toLocaleString()}</span>
                    <span className="card-price-period"> / mo</span>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                    onClick={() => navigate(`/edit-property/${item.id}`)}
                  >
                    Edit Listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-card">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Tenant Name</th>
                  <th>Rent Rate</th>
                  <th>Lease Term</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leases.map((lease) => (
                  <tr key={lease.id}>
                    <td style={{ fontWeight: 600 }}>{lease.property_title}</td>
                    <td>{lease.tenant_name}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>KSh {Number(lease?.monthly_rent || 0).toLocaleString()}/mo</td>
                    <td style={{ color: 'var(--text-muted)' }}>{lease.start_date} to {lease.end_date}</td>
                    <td><span className={`status-badge ${lease.status}`}>{lease.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}