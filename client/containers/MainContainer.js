import React, { useContext } from 'react';
import Form from '../components/Form';
import ThingContainer from './ThingContainer';
import { UserContext } from './App';

const MainContainer = () => {
  const { userData } = useContext(UserContext);
  return (
    <div>
      {(userData.isAuthenticated
        ? <ThingContainer />
        : <Form endpoint={userData.currentView} />
      )}
    </div>
  );
}

export default MainContainer;
