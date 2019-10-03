import React, { useState } from 'react';
import useFormInput from '../hooks/useFormInput';

const Login = (props) => {
  const { value:username, bind:bindUsername, reset:resetUsername } = useFormInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useFormInput('');
  const [loginResult, setLoginResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (username === '' || password === '') return;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', options);
      const result = await res.json();
      setIsLoading(false);
      resetUsername();
      resetPassword();
      if (result.isLoggedIn) {
        setLoginResult('Successfully logged in! Loading...');
        props.setUser(result.user);
        props.setIsAuthenticated(true);
        props.setCurrentView('things');
      } else setLoginResult(result.message);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }

  return (
    <div>
      <div>
        <label>Username</label>
        <input type="text" name="username" {...bindUsername} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" {...bindPassword} required />
      </div>
      <button onClick={() => handleSubmit()}>Login</button>
      {isLoading ? (
        <div>Logging in...</div>
      ) : loginResult}
    </div>
  );
}

export default Login;
