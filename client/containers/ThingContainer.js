import React, { useState, useEffect } from 'react';
import ThingCreator from '../components/things/ThingCreator';
import AllThings from '../components/things/AllThings';


const ThingContainer = (props) => {
  const [things, setThings] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch('/api/things')
      .then(res => res.json())
      .then(result => setThings(result))
      .catch(error => console.error(error));
    fetch('/api/votes')
      .then(res => res.json())
      .then(result => setVotes(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <p id="totals">Total Things: {things.length} Total Votes: {votes.length}</p>
      <ThingCreator things={things} setThings={setThings} />
      {things.length
        && <AllThings userId={props.userId} things={things} votes={votes} setVotes={setVotes} />}
    </div>
)};

export default ThingContainer;
