const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchProperties() {
  const res = await fetch(`${API_BASE}/properties`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function fetchLeases() {
  const res = await fetch(`${API_BASE}/leases`);
  if (!res.ok) throw new Error('Failed to fetch leases');
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics/revenue`);
  if (!res.ok) throw new Error('Failed to fetch revenue analytics');
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}
