import React, { useState } from 'react';
import useFormInput from '../../hooks/useFormInput';

const ThingForm = ({ setThings }) => {
  const { value:name, bind:bindName, reset:resetName } = useFormInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useFormInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || description === '') return;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setIsLoading(true);
    fetch('/api/things', options)
      .then(res => res.json())
      .then(result => {
        if (result._id) setThings(oldThings => [...oldThings, result]);
        else console.log('failed to create thing');
      })
      .then(() => {
        resetName();
        resetDescription();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <div id="creator">
      <form onSubmit={handleSubmit}>
        <label className='generalInput'>
          New Thing:
          <input type="text" name="name" {...bindName} autoFocus required />
        </label>
        <label className='generalInput addMarginBottom'>
          Description:
          <input type="text" name="description" {...bindDescription} required />
        </label>
        <button type="submit">Create thing</button>
        {isLoading && (
          <div>Creating thing...</div>
        )}
      </form>
    </div>
)}

export default ThingForm;
