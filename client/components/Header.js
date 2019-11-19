import React from 'react';

const Header = ({ currentView, isAuthenticated, setCurrentView, handleLogout }) => (
  <nav><p>is it worth or nah</p>
    {currentView !== 'login' && isAuthenticated === false
      && <button onClick={() => setCurrentView('login')}>Login</button>}
    {currentView !== 'signup' && isAuthenticated === false
      && <button onClick={() => setCurrentView('signup')}>Signup</button>}
    {isAuthenticated === true && currentView !== 'things'
      && <button onClick={() => setCurrentView('things')}>View Things</button>}
    {isAuthenticated === true
      && <button onClick={() => handleLogout()}>Logout</button>}
  </nav>
);

export default Header;
