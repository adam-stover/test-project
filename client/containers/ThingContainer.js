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
    }
    const getVotes = async () => {
      try {
        let syncedVotes = await fetch('/api/votes');
        syncedVotes = await syncedVotes.json();
        setVotes(syncedVotes);
      } catch (err) {
        console.error(err);
      }
    }
    const getThingsAndVotes = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        await Promise.all([getThings(), getVotes()]);
      } catch (err) {
        setIsError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getThingsAndVotes();
  }, []);

  const createThing = async (name, description) => {
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
    try {
      let result = await fetch('/api/things', options);
      result = await result.json();
      if (result._id) setThings([...things, result]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  }

  const deleteThing = async (id) => {
    const url = `/api/things/${id}`;
    const options = {
      method: 'DELETE',
    };
    const newThings = [...things];
    setThings(newThings.filter(thing => thing._id !== id));
    try {
      const res = await fetch(url, options);
      if (res.status === 200) {
        console.log('successfully deleted');
      }
    } catch (err) {
      console.error(err);
    }
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
