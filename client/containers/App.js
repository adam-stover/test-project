import React, { useState, useEffect } from "react";
import Login from '../components/Login';
import Signup from '../components/Signup';
import ThingContainer from './ThingContainer';

const App = () => {
  const [user, setUser] = useState({ });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(false);
          setCurrentView('login');
          setUser({ });
        }
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetch('/api/check')
    .then(res => res.json())
    .then(result => {
      console.log(result);
      setIsAuthenticated(result.isLoggedIn);
      if (result.isLoggedIn === true) {
        setUser(result.user);
        setCurrentView('things');
      }
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
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
      <div id="welcome">
        <strong>Hello {user.username || 'stranger'}</strong>
      </div>
      {currentView === 'login' && isAuthenticated === false
        && <Login setIsAuthenticated={setIsAuthenticated} setCurrentView={setCurrentView} setUser={setUser} />}
      {currentView === 'signup' && isAuthenticated === false
        && <Signup setIsAuthenticated={setIsAuthenticated} setCurrentView={setCurrentView} setUser={setUser} />}
      {currentView === 'things' && isAuthenticated === true
        && <ThingContainer userId={user._id} />}
    </div>
  )
}

export default App;
