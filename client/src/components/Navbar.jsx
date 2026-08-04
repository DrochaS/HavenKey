import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">HavenKey</div>
      <div className="navbar-links">
        <Link to="/">Properties</Link>
        <Link to="/leases">Leases</Link>
      </div>
    </nav>
  );
}
