import React, { useState, useContext, useEffect, useRef } from 'react';
import useFormInput from '../hooks/useFormInput';
import { UserContext, actions } from '../containers/App';

const Login = () => {
  const { value:username, bind:bindUsername, reset:resetUsername } = useFormInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useFormInput('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const usernameElement = useRef(null);

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    usernameElement.current.blur();
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
    resetPassword();
    fetch('/api/login', options)
      .then(res => res.json())
      .then(result => {
        setIsLoading(false);
        if (result.isLoggedIn) {
          setResult('Successfully logged in! Loading...');
          dispatch({
            type: actions.LOGIN,
            payload: {
              isAuthenticated: true,
              id: result.user._id,
              username,
            },
          });
        } else {
          setResult(result.message);
          usernameElement.current.focus();
        }
      })
      .catch(console.error)
  };

  useEffect(() => {
    usernameElement.current.focus();
    return () => usernameElement.current.blur();
  }, []);

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input ref={usernameElement} type="text" name="username" {...bindUsername} required />
        </label>
        <label>
          Password
          <input type="password" name="password" {...bindPassword} required />
        </label>
        <button type="submit">Login</button>
      </form>
      {isLoading ? (
        <div>Logging in...</div>
      ) : result}
    </div>
  );
}

export default Login;
