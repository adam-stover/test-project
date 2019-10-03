import React, { useState } from 'react';
import useFormInput from '../../hooks/useFormInput';

const ThingCreator = (props) => {
  const { value:name, bind:bindName, reset:resetName } = useFormInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useFormInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    try {
      const res = await fetch('/api/things', options);
      const result = await res.json();
      setIsLoading(false);
      resetName();
      resetDescription();
      if (result._id) props.setThings([...props.things, result]);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }

  return (
    <div id="creator">
      <div className='generalInput'>
        <label>New Thing: </label>
        <input type="text" name="name" {...bindName} />
      </div>
      <div className='generalInput addMarginBottom'>
        <label>Description:</label>
        <input type="text" name="description" {...bindDescription} />
      </div>
      <button onClick={(e) => handleSubmit(e)}>Create thing</button>
      {isLoading && (
        <div>Creating thing...</div>
      )}
    </div>
)}

export default ThingCreator;
