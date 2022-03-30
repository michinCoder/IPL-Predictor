import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import "../CSS-Files/Vote.css";

import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { UserContext } from "../context/UserContext";

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
  padding: 1em 2em;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

const Vote = () => {

  const context = useContext(UserContext);
  console.log(localStorage.getItem("token"));

  const [matchNum, setMatchNum] = useState();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [selection, setSelection] = useState("");

  const [userSelect, setUserSelect] = useState({
    matchNumber: 0,
    selectTeam: "team1",
  });
  
// to get the info of match names and number
  useEffect(() => {
    const usersCollectionRef = collection(db, "matchData");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      const teams = [];
      data.docs.map((doc) => (
        teams.push(doc.data())
      ));
      setMatchNum(teams[0].MatchNum);
      setTeam1(teams[0].Team1.value);
      setTeam2(teams[0].Team2.value);
    };

    getUsers();
  }, []);

  // to select one of the radio option
  const HandleSelectChange = event =>{
    // console.log(event.target.value);
    setSelection(event.target.value);
  }

  //saving the data to DB on submit
  const FormSubmitHandle = () =>{
    setUserSelect({matchNumber: matchNum, selectTeam: selection});
    // console.log(userSelect);
  }
  

  return (
    <Container>
      <FormContainer onSubmit={FormSubmitHandle}>
        <FormHeading>Match Number: {matchNum}</FormHeading>
        <FormButtons>
          <div className="wrapper">
            <input
              type="radio"
              name="Team"
              value="team1"
              id="option-1"
              onChange={HandleSelectChange}
              // checked={userSelect.selectTeam === "team1"}
            />
            <input
              type="radio"
              name="Team"
              value="team2"
              id="option-2"
              onChange={HandleSelectChange}
              // checked={userSelect.selectTeam === "team2"}
            />
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
