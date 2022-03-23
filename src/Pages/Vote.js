import React, { useEffect, useState } from "react";
import styled from "styled-components";
import '../CSS-Files/Vote.css'

import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Container = styled.div`
  width: 100vw;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.form`
  width: 50%;
  // background-color: white;
  padding: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const FormHeading = styled.h3`
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
`;
const FormButtons = styled.div`
  margin: 1em 0;
`;
const FormSubmit = styled.button`
  background-color: #0069d9;
  border: 0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 15px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 0.9em;
  margin: 5px;
  padding: 1em 2em ;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

const Vote = () => {
  const [matchNum, setMatchNum] = useState("{ Not defined }");
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [userSelect, setUserSelect] = useState(team1);

  const onChangeHandler = (e) =>{
    setUserSelect(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    const usersCollectionRef = collection(db, "matchData");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      const players = [];
      const data2 = data.docs.map((doc) => {
        //  console.log(doc.data())
        players.push(doc.data());
      });
      setMatchNum(players[0].MatchNum);
      setTeam1(players[0].Team1.value);
      setTeam2(players[0].Team2.value);
    };

    getUsers();
  }, []);

  return (
    <Container>
      <FormContainer onSubmit={onChangeHandler}>
        <FormHeading>Match Number: {matchNum}</FormHeading>
        <FormButtons>
          <div className="wrapper">
            <input type="radio" name="select" id="option-1" defaultChecked />
            <input type="radio" name="select" id="option-2" />
            <label htmlFor="option-1" className="option option-1">
              <div className="dot"></div>
              <span>{team1}</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <div className="dot"></div>
              <span>{team2}</span>
            </label>
          </div>
        </FormButtons>
        <FormSubmit>SUBMIT</FormSubmit>
      </FormContainer>
    </Container>
  );
};

export default Vote;