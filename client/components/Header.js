import React, { useContext } from 'react';
import { UserContext, actions } from '../containers/App';

const Header = () => {
  const { userData, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/api/logout', options)
      .then(res => {
        if (res.status === 200) dispatch({ type: actions.LOGOUT });
      })
      .catch(console.error)
  }

  return (
    <nav><p>is it worth or nah</p>
      {userData.currentView !== 'login' && userData.isAuthenticated === false
        && <button onClick={() => dispatch({ type: actions.SWITCH_VIEW, payload: 'login' })}>
            Login
          </button>}
      {userData.currentView !== 'signup' && userData.isAuthenticated === false
        && <button onClick={() => dispatch({ type: actions.SWITCH_VIEW, payload: 'signup' })}>
            Signup
          </button>}
      {userData.isAuthenticated === true && userData.currentView !== 'things'
        && <button onClick={() => dispatch({ type: actions.SWITCH_VIEW, payload: 'things' })}>
            View Things
          </button>}
      {userData.isAuthenticated === true
        && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Header;
