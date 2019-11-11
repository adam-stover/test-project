import React, { memo } from 'react';
import VoteCreator from './VoteCreator';

const OneThing = ({ thing, score, numVotes, didUserVote, submitVote, deleteThing, resetVote }) => {
  const handleDelete = () => {
    deleteThing(thing._id);
  }

  const handleReset = () => {
    resetVote(thing._id);
  }

  return (
    <div className="box">
      <span><strong>{thing.thing}</strong></span>
      <p>{thing.description}</p>
      <p>Score: {score} (Total Votes: {numVotes})</p>
      {didUserVote
        ? <button onClick={handleReset}>Reset Vote</button>
        : <VoteCreator name={thing.thing} thingId={thing._id} submitVote={submitVote} />}
      <button onClick={handleDelete}>Delete</button>
    </div>
)}

export default memo(OneThing);
