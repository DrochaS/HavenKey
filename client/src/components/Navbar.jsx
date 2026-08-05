import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">HavenKey</div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/leases">Leases</Link>
        {currentUser?.role === 'tenant' && <Link to="/tenant-actions">Actions</Link>}
      </div>
      <div className="navbar-user">
        <span>{currentUser?.name || 'Guest'}</span>
        <button className="btn-logout" onClick={logout}>Sign Out</button>
      </div>
    </nav>
  );
}
