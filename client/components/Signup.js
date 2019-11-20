import React, { useState, useContext, useEffect, useRef } from 'react';
import useFormInput from '../hooks/useFormInput';
import { UserContext, actions } from '../containers/App';

const Signup = () => {
  const { value:username, bind:bindUsername, reset:resetUsername } = useFormInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useFormInput('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const usernameElement = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    fetch('/api/signup', options)
      .then(res => res.json())
      .then(result => {
        resetUsername();
        resetPassword();
        if (result.isLoggedIn) {
          setResult('Successfully signed up!');
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
  }

  useEffect(() => {
    usernameElement.current.focus();
    return () => usernameElement.current.blur();
  }, []);

  return (
    <div id="signup">
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input ref={usernameElement} type="text" name="username" {...bindUsername} required />
        </label>
        <label>
          Password
          <input type="password" name="password" {...bindPassword} required />
        </label>
        <button type="submit">Signup</button>
      </form>
      {isLoading ? (
        <div>Signing up...</div>
      ) : result}
    </div>
  );
};

export default Signup;
