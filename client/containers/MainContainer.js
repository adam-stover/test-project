import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ThingContainer from './ThingContainer';

const MainContainer = ({
    currentView, setCurrentView,
    isAuthenticated, setIsAuthenticated,
    setUser, user,
  }) => (
  <div>
    {isAuthenticated ? (
      <ThingContainer userId={user._id} />
    ) : currentView === 'login' ? (
      <Login
        setIsAuthenticated={setIsAuthenticated}
        setCurrentView={setCurrentView}
        setUser={setUser}
      />
    ) : <Signup
        setIsAuthenticated={setIsAuthenticated}
        setCurrentView={setCurrentView}
        setUser={setUser}
    />}
  </div>
);

export default MainContainer;
