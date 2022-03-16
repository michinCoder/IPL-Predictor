import React from "react";
import { Table } from "react-bootstrap";

function Home() {
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
          <tr>
            <td>1</td>
            <td>Pratik</td>
            <td>15</td>
            <td>25</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Pratik</td>
            <td>15</td>
            <td>25</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Pratik</td>
            <td>15</td>
            <td>25</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
