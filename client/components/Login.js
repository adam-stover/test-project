import React, { useState, useEffect } from 'react';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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
    .then(result => {
      if (result === 'success') props.setIsAuthenticated(true);
      console.log(result);
    })
    .catch(error => console.error(error));
  }

  return (
    <div>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button onClick={() => handleClick()}>Login</button>
    </div>
  );
}

export default Login;
