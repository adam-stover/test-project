import React, { useState, useEffect } from 'react';
import MainContainer from './MainContainer';
import Header from '../components/Header';

export const actions = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure',
  LOGOUT: 'logout',
};

const initialState = {
  isAuthenticated: false,
  id: null,
  username: '',
  isLoading: false,
  isError: false,
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actions.SUCCESS:
      return {
        ...payload,
        isLoading: false,
        isError: false,
      }
    case actions.FAILURE:
      console.error(payload);
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actions.LOGOUT:
      return {
        ...initialState,
      };
    default:
      throw new Error('Unhandled userReducer action');
  }
};

export const UserContext = React.createContext(null);

const App = () => {
  const [userData, dispatch] = useReducer(userReducer, initialState);
  const [currentView, setCurrentView] = useState('login');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    };
    dispatch({ type: actions.REQUEST });
    try {
      const res = await fetch('/api/logout', options);
      if (res.status === 200) {
        dispatch({ type: actions.LOGOUT });
        setCurrentView('login');
      }
    } catch (err) {
      dispatch({ type: actions.FAILURE, payload: err });
    }
  }

  useEffect(() => {
    const checkData = async () => {
      dispatch({ type: actions.REQUEST });
      try {
        const res = await fetch('/api/check');
        const result = await res.json();
        if (result.isLoggedIn === true) {
          setUser({
            isAuthenticated: true,
            id: result.user._id,
            username: result.user.username,
          });
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
    <UserContext.Provider value={{...user, setUser}}>
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
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
      />
    </UserContext.Provider>
  )
}

export default App;
