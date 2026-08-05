import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPropertyPage({ properties }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((item) => String(item.id) === String(id));

  if (!property) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Edit Property</h1>
        </header>
        <p>Sorry, this property could not be found.</p>
        <button className="btn-primary" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Edit Property</h1>
        <p>Update details for {property.title}.</p>
      </header>

      <div className="property-card">
        <div className="property-details">
          <h2>{property.title}</h2>
          <p>{property.address}, {property.city}</p>
          <p>Current rent: KSh {Number(property.price || 0).toLocaleString()}</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button className="btn-primary" onClick={() => alert('Property edit flow is not implemented yet.')}>Open Edit Form</button>
        <button className="btn-link" onClick={() => navigate(-1)} style={{ marginLeft: '1rem' }}>Back</button>
      </div>
    </div>
  );
}
