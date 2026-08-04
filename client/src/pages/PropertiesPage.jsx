import React, { useEffect, useState } from 'react';
import { fetchProperties, fetchAnalytics } from '../api';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchProperties().then(setProperties).catch(console.error);
    fetchAnalytics().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="page properties-page">
      <header className="page-header">
        <h1>Managed Properties</h1>
      </header>

      {metrics && (
        <section className="analytics-cards">
          <article className="card">
            <h2>Active Monthly Revenue</h2>
            <p>${Number(metrics?.total_monthly_revenue || 0).toLocaleString()}</p>
          </article>
          <article className="card">
            <h2>Active Leases</h2>
            <p>{metrics.active_leases_count}</p>
          </article>
          <article className="card">
            <h2>Total Portfolio Units</h2>
            <p>{metrics.total_properties_count}</p>
          </article>
        </section>
      )}

      <section className="properties-list">
        {properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <article key={property.id} className="property-card">
                {property.image_url && (
                  <img
                    className="property-image"
                    src={property.image_url}
                    alt={property.title}
                  />
                )}
                <div className="property-details">
                  <h3>{property.title}</h3>
                  <p>{property.address}, {property.city}</p>
                  <p className="property-price">${property.price} / mo</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
