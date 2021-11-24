import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import HealthFusionLogo from '../../assets/health_fusion_logo.png';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
    };
    let username;
    if (Auth.loggedIn()) {
      username = Auth.getProfile().data;
    } else {
      username = "";
    }

  return (
    <header className="bg-secondary mb-4 py-2 align-center header">
      <div className="container flex-row justify-space-between-lg justify-center align-center header-content">
        <Link to="/" className={"header-link"}>
          <img src={HealthFusionLogo} alt="" height={150}/>
          <h1>Health Fusion</h1>
        </Link>

        <nav className="text-center">
        {Auth.loggedIn() ? (
                      <>
                          <Link to="/profile">{username.username}</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
