import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProperties } from './hooks/useProperties';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';
import LeasesPage from './pages/LeasesPage';
import TenantActionsPage from './pages/TenantActionsPage';
import EditPropertyPage from './pages/EditPropertyPage';

export default function App() {
  const { currentUser, loginRole, setLoginRole, login, logout } = useAuth();
  const { properties, leases, totalRevenue } = useProperties();

  if (!currentUser) {
    return <LoginForm loginRole={loginRole} setLoginRole={setLoginRole} onLogin={login} />;
  }

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} logout={logout} />
      <main className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              currentUser.role === 'landlord' ? (
                <LandlordDashboard properties={properties} leases={leases} totalRevenue={totalRevenue} />
              ) : (
                <TenantDashboard user={currentUser} property={properties[0]} />
              )
            }
          />
          <Route path="/leases" element={<LeasesPage />} />
          <Route path="/tenant-actions" element={<TenantActionsPage user={currentUser} property={properties[0]} />} />
          <Route path="/edit-property/:id" element={<EditPropertyPage properties={properties} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}