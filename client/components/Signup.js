import React, { useState } from 'react';
import useFormInput from '../hooks/useFormInput';

const Signup = (props) => {
  const { value:username, bind:bindUsername, reset:resetUsername } = useFormInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useFormInput('');
  const [signupResult, setSignupResult] = useState('');
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
      const res = await fetch('/api/signup', options);
      const result = await res.json();
      setIsLoading(false);
      resetUsername();
      resetPassword();
      if (result.isLoggedIn) {
        setSignupResult('Successfully signed up!');
        props.setUser(result.user);
        props.setIsAuthenticated(true);
        props.setCurrentView('things');
      } else setSignupResult(result.message);
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
      <button onClick={() => handleSubmit()}>Signup</button>
      {isLoading ? (
        <div>Logging in...</div>
      ) : signupResult}
    </div>
  );
}

export default Signup;
