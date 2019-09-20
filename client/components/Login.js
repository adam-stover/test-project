import React, { useState } from 'react';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');
  
  const handleClick = () => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((result) => {
        if (result.isLoggedIn) {
          setLoginResult('Successfully logged in!');
          props.setIsAuthenticated(true);
          props.setCurrentView('things');
          props.setUser(result.user);
        } else setLoginResult(result.message);
      })
      .catch(error => console.error(error));
  }

  return (
    <div>Login
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button onClick={() => handleClick()}>Login</button>
      {loginResult}
    </div>
  );
}

export default Login;
