import React, { useState, useEffect } from 'react';
import MainContainer from './MainContainer';

const App = () => {
  const [user, setUser] = useState({ });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const res = await fetch('/api/logout', options);
      console.log(res.status);
      if (res.status === 200) {
        setUser({ });
        setCurrentView('login');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }

  useEffect(() => {
    const checkData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await fetch('/api/check');
        const result = await res.json();
        if (result.isLoggedIn === true) {
          setUser(result.user);
          setIsAuthenticated(result.isLoggedIn);
          setCurrentView('things');
        }
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    checkData();
  }, []);

  return (
    <div>
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <div id="welcome">
        <strong>Hello {user.username || 'stranger'}. Welcome to the voting of things.</strong>
      </div>
      {isError && <div>Oh dear we have an error</div>}
      {isLoading && (
        <div>Loading...</div>
      )}
      <MainContainer
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}

export default App;
