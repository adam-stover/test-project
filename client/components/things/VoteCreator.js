import React, { useState } from 'react';

const VoteCreator = (props) => {
  const [vote, setVote] = useState(null);

  const handleClick = async () => {
    if (!vote) return;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        user_id: props.userId,
        thing_id: props.thingId,
        vote: (vote === 'nay') ? 0 : 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await fetch('/api/votes', options);
      const result = await res.json();
      if (result._id) props.setVotes([...props.votes, result])
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setVote(e.target.value);
  }

  return (
    <span>
      <label htmlFor="yay">Yay</label>
      <input type="radio" name={props.name} value="yay" checked={vote==="yay"} onChange={handleChange} id="yay" />
      <label htmlFor="nay">Nay</label>
      <input type="radio" name={props.name} value="nay" checked={vote==="nay"} onChange={handleChange} id="nay" />
      <button onClick={() => handleClick()}>Submit vote</button>
    </span>
)}

export default VoteCreator;
