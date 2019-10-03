import React, { memo } from 'react';
import VoteCreator from './VoteCreator';

const OneThing = (props) => {
  const didUserVote = props.votesForThisThing.some(vote => vote.user_id === props.userId);
  return (
    <div className="box">
      <p><strong>{props.thing.thing}</strong></p>
      <p>{props.thing.description}</p>
      <p>Score: {props.score} (Total Votes: {props.votesForThisThing.length})</p>
      {didUserVote
        || <VoteCreator userId={props.userId} name={props.thing.thing} thingId={props.thing._id} votes={props.votes} setVotes={props.setVotes} />}
    </div>
)}

export default memo(OneThing);
