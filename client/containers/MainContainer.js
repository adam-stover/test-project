import React, { useContext } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ThingContainer from './ThingContainer';
import UserContext from './App';

const MainContainer = ({
  currentView, setCurrentView,
}) => {
  const user = useContext(UserContext);
  return (
    <div>
      {user.isAuthenticated ? (
        <ThingContainer userId={user.id} />
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
};

export default MainContainer;
