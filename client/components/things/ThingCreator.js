import React, { useEffect, useRef } from 'react';
import useFormInput from '../../hooks/useFormInput';

const ThingCreator = ({ createThing, isLoading }) => {
  const { value:name, bind:bindName, reset:resetName } = useFormInput('');
  const { value:description, bind:bindDescription, reset:resetDescription } = useFormInput('');
  const inputElement = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputElement.current.blur();
    if (name === '' || description === '') return;
    await createThing(name, description);
    resetName();
    resetDescription();
    inputElement.current.focus();
  };

  useEffect(() => {
    inputElement.current.focus();
    return () => inputElement.current.blur();
  }, []);

  return (
    <div id="creator">
      <form onSubmit={handleSubmit}>
        <label className='generalInput'>
          New Thing:
          <input ref={inputElement} type="text" name="name" {...bindName} required />
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

export default ThingCreator;
