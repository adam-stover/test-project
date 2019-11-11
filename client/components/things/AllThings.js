import React, { useMemo } from 'react';
import OneThing from './OneThing';

const AllThings = ({ userId, things, votes, deleteThing, submitVote, resetVote }) => {
  const CONFIDENCE = (votes.length / things.length);
  const PRIOR = 0.5;

  const mapped = useMemo(() => {
    return things.map(thing => {
      const totalVotes = votes.filter(vote => vote.thing_id === thing._id);
      const yesVotes = totalVotes.reduce((sum, vote) => sum + vote.vote, 0);
      const posterior = Math.round(100 * ((CONFIDENCE * PRIOR + yesVotes) / (CONFIDENCE + totalVotes.length)));
      const didUserVote = totalVotes.some(vote => vote.user_id === userId);
      return <OneThing
        key={thing._id}
        thing={thing}
        score={totalVotes.length ? posterior : '?'}
        didUserVote={didUserVote}
        numVotes={totalVotes.length}
        submitVote={submitVote}
        resetVote={resetVote}
        deleteThing={deleteThing}
      />
    });
  }, [things, votes]);

  return (
    <div className="container">
      {mapped}
    </div>
  );
};

export default AllThings;
