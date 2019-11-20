import React, { useContext } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ThingContainer from './ThingContainer';
import { UserContext } from './App';

const MainContainer = () => {
  const { userData } = useContext(UserContext);
  return (
    <div>
      {userData.isAuthenticated ? (
        <ThingContainer />
      ) : userData.currentView === 'login' ? (
        <Login />
      ) : <Signup />}
    </div>
  );
}

export default MainContainer;
