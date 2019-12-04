import React, { useState, useContext } from 'react';
import useFormInput from '../hooks/useFormInput';
import { UserContext, actions } from '../containers/App';

const UserForm = ({ endpoint }) => {
  const { value:username, bind:bindUsername } = useFormInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useFormInput('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const uri = `/api/${endpoint}`;
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
    fetch(uri, options)
      .then(res => res.json())
      .then(result => {
        setIsLoading(false);
        if (result.isLoggedIn) {
          setResult('Success! Loading...');
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
        }
      })
      .catch(console.error)
  };

  const buttonText = endpoint === 'login' ? 'Login' : 'Signup';

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" {...bindUsername} autoFocus required />
        </label>
        <label>
          Password
          <input type="password" name="password" {...bindPassword} required />
        </label>
        <button type="submit">{buttonText}</button>
      </form>
      {isLoading ? (
        <div>Submitting...</div>
      ) : result}
    </div>
  );
}

export default UserForm;
