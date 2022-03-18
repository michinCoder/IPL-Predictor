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
      const players = []
     const data2 = data.docs.map((doc)=>{
      //  console.log(doc.data())
       const player = Object.assign(doc.data())
       players.push(player)
       SetUsers(players)
     })
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
        </thead>
        <tbody>
        {users.map((user,index)=>{
          return (
            <tr key={index}>
            <td>{index+1}</td>
            <td>{user.email}</td>
            <td>{user.score}</td>
            <td>{user.total}</td>
          </tr>
          )
        })}
     
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
