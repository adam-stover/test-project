import React, { useState, useEffect } from 'react';
import AllThings from '../components/things/AllThings';
import ThingForm from '../components/things/ThingForm';

const getThings = () => (
  new Promise((resolve, reject) => {
    fetch('/api/things')
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  })
);
const getVotes = () => (
  new Promise((resolve, reject) => {
    fetch('/api/votes')
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  })
);

const ThingContainer = () => {
  const [things, setThings] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsLoading(true);
      setIsError(false);
      Promise.all([
        getThings().then(res => setThings(res)),
        getVotes().then(res => setVotes(res)),
      ])
        .catch(err => {
          setIsError(true);
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    };
    sync();
  }, []);

  return (
    <div>
      {isError && <div>Oh dear we have an error</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : <div>
        <p id="totals">Total Things: {things.length} Total Votes: {votes.length}</p>
        <ThingForm setThings={setThings}/>
        <AllThings things={things} setThings={setThings} votes={votes} setVotes={setVotes} />
      </div>}
    </div>
)};

export default ThingContainer;
