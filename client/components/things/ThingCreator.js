import React from 'react';
import useFormInput from '../../hooks/useFormInput';

const ThingCreator = ({ createThing, isLoading }) => {
  const { value:name, bind:bindName, reset:resetName } = useFormInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useFormInput('');

  const handleSubmit = async () => {
    if (name === '' || description === '') return;
    await createThing(name, description);
    resetName();
    resetDescription();
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
      <button onClick={() => handleSubmit()}>Create thing</button>
      {isLoading && (
        <div>Creating thing...</div>
      )}
    </div>
)}

export default ThingCreator;
