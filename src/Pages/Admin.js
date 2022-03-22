import React, { useContext, useState } from "react";
import styled from "styled-components";

//importing react-select for select tag
import Select from "react-select";

import {db} from "../config/firebaseConfig";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import {UserContext} from '../context/UserContext'

const Form = styled.form`
  width: 100vw;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const options = [
  { value: "Chennai Super Kings", label: "Chennai Super Kings" },
  { value: "Delhi Capitals", label: "Delhi Capitals" },
  { value: "Gujarat Titans", label: "Gujarat Titans" },
  { value: "Kolkata Knight Riders", label: "Kolkata Knight Riders" },
  { value: "Lucknow Super Giants", label: "Lucknow Super Giants" },
  { value: "Mumbai Indians", label: "Mumbai Indians" },
  { value: "Punjab Kings", label: "Punjab Kings" },
  { value: "Rajasthan Royals", label: "Rajasthan Royals" },
  { value: "Royal Challengers Bangalore", label: "Royal Challengers Bangalore" },
  { value: "Sunrisers Hyderabad", label: "Sunrisers Hyderabad" },
];

const Admin = () => {
  const [matchNum, setMatchNum] = useState("");
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  
  const context = useContext(UserContext)
  

  const usersCollectionRef = collection(db, "matchData");
  const SaveMatchData = ()=>{
   
      context.setUser({MatchNum: matchNum, Team1: team1, Team2: team2})
      const createUser = async () => {
        await addDoc(usersCollectionRef, { MatchNum: matchNum, Team1: team1, Team2: team2 });
      };
      createUser(); 
      setMatchNum("");
      setTeam1(null);
      setTeam2(null); 
    }

  const submitHandler = (e) => {
    e.preventDefault();
    SaveMatchData();    
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="form-row align-items-center">
        <h5 className="card-title">Select today's match</h5>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Match Number
          </label>
          <input
            type="input"
            name="matchNum"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="000"
            value={matchNum}
            onChange={(e) => setMatchNum(e.target.value)}
          />
        </div>

        <div className="col-auto my-1" style={{ marginTop: "2em" }}>
          <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
            Team 1:
          </label>
          <Select
            className="custom-select mr-sm-2" id="inlineFormCustomSelect"
            defaultValue={team1}
            onChange={setTeam1}
            options={options}
          />
        </div>

        <div className="col-auto my-1" style={{ marginTop: "2em" }}>
          <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
            Team 2:
          </label>
          <Select
            className="custom-select mr-sm-2" id="inlineFormCustomSelect"
            defaultValue={team2}
            onChange={setTeam2}
            options={options}
          />
        </div>

        <div
          className="col-auto my-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "1em" }}
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Admin;
