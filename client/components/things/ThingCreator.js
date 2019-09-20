import React, { useState } from 'react';

const ThingCreator = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = () => {
    if (name === '' || description === '') return;
    fetch('/api/things', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((result) => {
        if (result._id) props.setThings([...props.things, result])
      })
      .catch(error => console.error(error));
  }

  return (
    <div id="creator">
      <div className='generalInput'>
        <label>New Thing: </label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='generalInput addMarginBottom'>
        <label>Description:</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button onClick={() => handleClick()}>Create thing</button>
    </div>
)}

export default ThingCreator;
