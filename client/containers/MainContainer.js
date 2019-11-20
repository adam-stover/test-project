import React, { useContext } from 'react';
import UserForm from '../components/UserForm';
import ThingContainer from './ThingContainer';
import { UserContext } from './App';

const MainContainer = () => {
  const { userData } = useContext(UserContext);
  return (
    <div>
      {(userData.isAuthenticated
        ? <ThingContainer />
        : <UserForm endpoint={userData.currentView} />
      )}
    </div>
  );
}

export default MainContainer;
