import React, { useEffect, useState } from 'react';
import { fetchLeases } from '../api';

export default function LeasesPage() {
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    fetchLeases().then(setLeases).catch(console.error);
  }, []);

  return (
    <div className="page leases-page">
      <header className="page-header">
        <h1>Active Lease Agreements</h1>
      </header>

      {leases.length === 0 ? (
        <p>No active leases found.</p>
      ) : (
        <table className="leases-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Tenant</th>
              <th>Rent</th>
              <th>Term</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => (
              <tr key={lease.id}>
                <td>{lease.property_title}</td>
                <td>{lease.tenant_name}</td>
                <td>${lease.monthly_rent}</td>
                <td>{lease.start_date} to {lease.end_date}</td>
                <td>{lease.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
