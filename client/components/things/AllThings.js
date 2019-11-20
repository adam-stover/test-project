import React, { useMemo, useContext } from 'react';
import OneThing from './OneThing';
import { UserContext } from '../../containers/App';

const AllThings = ({ things, setThings, votes, setVotes }) => {
  const { userData } = useContext(UserContext);

  const deleteThing = (id) => {
    const url = `/api/things/${id}`;
    const options = {
      method: 'DELETE',
    };
    setThings(oldThings => oldThings.filter(thing => thing._id !== id));
    fetch(url, options)
      .catch(console.error);
  }

  const submitVote = (vote, thingId) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        user_id: userData.id,
        thing_id: thingId,
        vote: (vote === 'nay') ? 0 : 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/api/votes', options)
      .then(res => res.json())
      .then(result => {
        if (result._id) setVotes(oldVotes => [...oldVotes, result]);
      })
      .catch(console.error);
  }

  const resetVote = (thingId) => {
    const url = `/api/votes?user=${userData.id}&thing=${thingId}`;
    const options = {
      method: 'DELETE',
    };
    setVotes(oldVotes => oldVotes.filter(vote => (
      vote.user_id !== userData.id || vote.thing_id !== thingId
    )));
    fetch(url, options)
      .catch(console.error);
  }

  const mapped = useMemo(() => {
    const CONFIDENCE = (votes.length / things.length);
    const PRIOR = 0.5;
    return things.map(thing => {
      const totalVotes = votes.filter(vote => vote.thing_id === thing._id);
      const yesVotes = totalVotes.reduce((sum, vote) => sum + vote.vote, 0);
      const posterior = Math.round(100 * ((CONFIDENCE * PRIOR + yesVotes) / (CONFIDENCE + totalVotes.length)));
      const didUserVote = totalVotes.some(vote => vote.user_id === userData.id);
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
  }, [things, votes, userData.id]);

  return (
    <div className="container">
      {mapped}
    </div>
  );
};

export default AllThings;
