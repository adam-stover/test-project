import React, { useState } from 'react';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupResult, setSignupResult] = useState('');
  
  const handleClick = () => {
    if (username === '' || password === '') return;
    fetch('/api/signup', {
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
      console.log(`Signup: ${result}`);
      if (result.isLoggedIn) {
        setSignupResult('Successfully signed up!');
        props.setIsAuthenticated(true);
        props.setCurrentView('things');
        props.setUser(result.user);
      } else setSignupResult(result.message);
    })
    .catch(error => console.error(error));
  }

  return (
    <div>Signup
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button onClick={() => handleClick()}>Signup</button>
      {signupResult}
    </div>
  );
}

export default Signup;
