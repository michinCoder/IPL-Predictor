import React, { useEffect, useState } from "react";

import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Vote = () => {
  const [matchNum, setMatchNum] = useState('{ Not defined }');
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  useEffect(() => {
    const usersCollectionRef = collection(db, "matchData");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      const players = [];
      const data2 = data.docs.map((doc) => {
        //  console.log(doc.data())
        players.push(doc.data());
      });
      console.log(players)
      setMatchNum(players[0].MatchNum);
      setTeam1(players[0].Team1.value);
      setTeam2(players[0].Team2.value);
    };

    getUsers();
  }, []);

  const Teams = {
    matchNum: 1,
    Team1: "Mumbai Indians",
    Team2: "Chennai Super Kings",
  };
  return (
    <div className="card d-flex p-2">
      <div className="card-header text-center h3">
        Match No. {matchNum}
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: "2em", fontSize: "1.5em", margin: "5em 1em" }}
        >
          {team1}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: "2em", fontSize: "1.5em", margin: "5em 1em" }}
        >
          {team2}
        </button>
      </div>
    </div>
  );
};

export default Vote;
