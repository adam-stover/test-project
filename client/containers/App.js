import React, { useReducer, useEffect } from 'react';
import MainContainer from './MainContainer';
import Header from '../components/Header';

export const actions = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SWITCH_VIEW: 'switch-view',
};

const initialState = {
  isAuthenticated: false,
  id: null,
  username: '',
  currentView: 'login',
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.LOGIN:
      return {
        ...payload,
        currentView: 'things',
      }
    case actions.LOGOUT:
      return {
        ...initialState,
      };
    case actions.SWITCH_VIEW:
      return {
        ...state,
        currentView: payload,
      };
    default:
      throw new Error('Unhandled userReducer action');
  }
};

export const UserContext = React.createContext(null);

const App = () => {
  const [userData, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const checkData = () => {
      fetch('/api/check')
        .then(res => res.json())
        .then(result => {
          if (result.isLoggedIn === true) dispatch({
            type: actions.LOGIN,
            payload: {
              isAuthenticated: true,
              id: result.user._id,
              username: result.user.username,
            },
          });
        })
        .catch(console.error);
    }
    checkData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, dispatch }}>
      <Header />
      <div id="welcome">
        <strong>Hello {userData.username || 'stranger'}. Welcome to the voting of things.</strong>
      </div>
      <MainContainer />
    </UserContext.Provider>
  )
}

export default App;
