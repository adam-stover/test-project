import React, { useState } from 'react';

const VoteCreator = (props) => {
  const [vote, setVote] = useState(null);
  const handleClick = () => {
    if (!vote) return;
    fetch('/api/votes', {
      method: 'POST',
      body: JSON.stringify({
        user_id: props.userId,
        thing_id: props.thingId,
        vote: (vote === 'nay') ? 0 : 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((result) => {
        if (result._id) props.setVotes([...props.votes, result])
      })
      .catch(error => console.error(error));
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
