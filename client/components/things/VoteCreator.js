import React, { useState } from 'react';

const VoteCreator = ({ name, thingId, submitVote }) => {
  const [vote, setVote] = useState(null);

  const handleClick = () => {
    if (!vote) return;
    submitVote(vote, thingId);
  }

  const handleChange = (e) => {
    setVote(e.target.value);
  }

  return (
    <span>
      <label htmlFor="yay">Yay</label>
      <input type="radio" name={name} value="yay" checked={vote==="yay"} onChange={handleChange} id="yay" />
      <label htmlFor="nay">Nay</label>
      <input type="radio" name={name} value="nay" checked={vote==="nay"} onChange={handleChange} id="nay" />
      <button onClick={() => handleClick()}>Submit vote</button>
    </span>
)}

export default VoteCreator;
