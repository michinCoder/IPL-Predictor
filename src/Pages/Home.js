import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";

import { db } from "../config/firebaseConfig";
import {
  collection,
  getDocs
} from "firebase/firestore";

function Home() {

  const [users,SetUsers] = useState([])

  useEffect(() => {
  const usersCollectionRef = collection(db, "users");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // const players = []
    //  const data2 = data.docs.map((doc)=>{
    //    const player = Object.assign(doc.data())
    //    players.push(player)
    //    SetUsers(players)
    //  })
    const players = []
    const data2 = data.docs.map((doc)=>{
    //  console.log(doc.data())
     players.push(doc.data())
    })
    // console.log(players)
    SetUsers(players)
    };
    
    getUsers();
  }, []);

  return (
    <div className="main">
      <h2 className="heading">Leaderboard</h2>
      <Table className="table">
        <thead>
      
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
            <th>Total</th>
          </tr>
          {users.map((user,i)=>{
            return(
              <tr key={i}>
              <td>{i+1}</td>
              <td>{user.email}</td>
              <td>{user.score}</td>
              <td>{user.total}</td>

              </tr>
            )
          })}
         
        </thead>
        <tbody>
    
     
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
