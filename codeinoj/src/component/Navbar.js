import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/auth/authState';
import { getProfile, getAdmin, delSession } from '../service/api';
import SpinnerLoader from './SpinnerLoader';



const Navbar = () => {
  const navigate = useNavigate();
  const { user , loading } = useAuth();
  const { isLoggedIn , logout } = useAuth();
  const navbarCollapseRef = useRef(null);

 


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Error while logout:", err);
    }
  };

  
  

  const handleProfilePage = async (e) => {
    e.preventDefault();
    try {
      const response = await getProfile();
     // console.log("response profile : ", response);
      if (response.success) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error while checking authentication:', err);
    }
  };

  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await getAdmin();
     // console.log("response profile : ", response);
      if (response.success) {
        navigate('/admin');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error while checking authentication:', err);
    }
  };

  const handleNavLinkClick = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  if (loading) {
    // You can return a loading spinner or null while loading
    return <div><SpinnerLoader/></div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AlgoArena</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText" ref={navbarCollapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/problemset" onClick={handleNavLinkClick}>Problems</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={e => { handleProfilePage(e); handleNavLinkClick(); }}>Profile</Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" onClick={e => { handleAdmin(e); handleNavLinkClick(); }}>Admin</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={handleNavLinkClick}>Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" onClick={e => { handleProfilePage(e); handleNavLinkClick(); }}>{user.firstname}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={e => { handleLogout(e); handleNavLinkClick(); }}>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
