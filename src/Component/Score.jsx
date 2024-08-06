import React from "react";
import "./GameMainPage.css"; // Import the CSS file

export default function Score({ score,chance }) {
  return (
    <div id="scoreContainer">
      <div className="score-left">
        <h3>User Score: {score.userScore}</h3>
        <h3>Computer Score: {score.computerScore}</h3>
        <h3>Draw Match: {score.draw}</h3>
      </div>
      <div className="score-right">
        <table>
          <thead>
            <tr>
              <th>User Chance Remain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chance}</td> {/* Example number, you can dynamically set this */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
