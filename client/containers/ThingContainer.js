import React, { useState, useEffect } from 'react';
import ThingCreator from '../components/things/ThingCreator';
import AllThings from '../components/things/AllThings';

const ThingContainer = () => {
  const [things, setThings] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const getThings = async () => {
      try {
        let syncedThings = await fetch('/api/things');
        syncedThings = await syncedThings.json();
        setThings(syncedThings);
      } catch (err) {
        console.error(err);
      }
    };
    const getVotes = async () => {
      try {
        let syncedVotes = await fetch('/api/votes');
        syncedVotes = await syncedVotes.json();
        setVotes(syncedVotes);
      } catch (err) {
        console.error(err);
      }
    };
    const getThingsAndVotes = () => {
      setIsLoading(true);
      setIsError(false);
      Promise.all([getThings(), getVotes()])
        .catch(err => {
          setIsError(true);
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    };
    getThingsAndVotes();
  }, []);

  const createThing = (name, description) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setIsCreating(true);
    fetch('/api/things', options)
      .then(res => res.json())
      .then(result => {
        if (result._id) setThings(oldThings => [...oldThings, result]);
      })
      .catch(console.error)
      .finally(() => setIsCreating(false));
  }

  const deleteThing = (id) => {
    const url = `/api/things/${id}`;
    const options = {
      method: 'DELETE',
    };
    setThings(oldThings => oldThings.filter(thing => thing._id !== id));
    fetch(url, options)
      .catch(console.error);
  }

  return (
    <div>
      {isError && <div>Oh dear we have an error</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : <div>
        <p id="totals">Total Things: {things.length} Total Votes: {votes.length}</p>
        <ThingCreator createThing={createThing} isLoading={isCreating}/>
        <AllThings things={things} votes={votes} setVotes={setVotes} deleteThing={deleteThing}/>
      </div>}
    </div>
)};

export default ThingContainer;
