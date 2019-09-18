import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import AllThings from './things/AllThings';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    fetch('/api/check')
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ul>
        <li onClick={() => setCurrentView('login')}>Login</li>
        <li onClick={() => setCurrentView('signup')}>Signup</li>
        <li onClick={() => setCurrentView('things')}>View Things</li>
      </ul>
      {currentView === 'login' && isAuthenticated === false && <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}
      {currentView === 'signup' && isAuthenticated === false && <Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}
      {currentView === 'things' && isAuthenticated === true && <AllThings />}
    </div>
  )
}

export default App;
