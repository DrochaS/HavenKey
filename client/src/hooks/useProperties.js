import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5555';

export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    // Fetch properties and leases from Flask API
    Promise.all([
      fetch(`${BASE_URL}/properties`).then((res) => res.json()),
      fetch(`${BASE_URL}/leases`).then((res) => res.json()),
    ])
      .then(([propertiesData, leasesData]) => {
        setProperties(propertiesData || []);
        setLeases(leasesData || []);
      })
      .catch((err) => console.error('Error connecting to Flask:', err));
  }, []);

  // Calculate total revenue from active leases
  const totalRevenue = leases.reduce((sum, lease) => sum + Number(lease.rent || 0), 0);

  return { properties, leases, totalRevenue };
}