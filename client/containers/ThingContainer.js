import React, { useState, useEffect } from 'react';
import ThingCreator from '../components/things/ThingCreator';
import AllThings from '../components/things/AllThings';


const ThingContainer = (props) => {
  const [things, setThings] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getThings = async () => {
      try {
        const res = await fetch('/api/things');
        const result = await res.json();
        setThings(result);
      } catch (err) {
        console.error(err);
      }
    }
    const getVotes = async () => {
      try {
        const res = await fetch('/api/votes');
        const result = await res.json();
        setVotes(result);
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

  return (
    <div>
      {isError && <div>Oh dear we have an error</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : <div>
        <p id="totals">Total Things: {things.length} Total Votes: {votes.length}</p>
        <ThingCreator things={things} setThings={setThings} />
        <AllThings userId={props.userId} things={things} votes={votes} setVotes={setVotes} />
      </div>}
    </div>
)};

export default ThingContainer;
