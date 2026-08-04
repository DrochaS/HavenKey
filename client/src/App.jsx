import React from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { useProperties } from './hooks/useProperties';
import LoginForm from './components/LoginForm';
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';

export default function App() {
  const { currentUser, loginRole, setLoginRole, login, logout } = useAuth();
  const { properties, leases, totalRevenue } = useProperties();

  if (!currentUser) {
    return <LoginForm loginRole={loginRole} setLoginRole={setLoginRole} onLogin={login} />;
  }

  const isLandlord = currentUser.role?.toLowerCase() === 'landlord';

  return (
    <div>
      <header className="navbar">
        <div className="brand">Haven<span>Key</span></div>
        <div className="user-badge">
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{currentUser.name}</div>
            <span className="user-role-tag">{currentUser.role}</span>
          </div>
          <button className="btn-logout" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <main className="main-container">
        {isLandlord ? (
          <LandlordDashboard properties={properties} leases={leases} totalRevenue={totalRevenue} />
        ) : (
          <TenantDashboard user={currentUser} property={properties[0] || {}} />
        )}
      </main>
    </div>
  );
}