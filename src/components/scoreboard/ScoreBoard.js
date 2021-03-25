import React from "react";
import "./scoreboard.css";
import { formatTime } from "../../data/utils";

export default function ScoreBoard(props) {
  const data = JSON.parse(window.sessionStorage.getItem("scoreBoard")) || [];
  return (
    <div className={"scoreBoard"}>
      SCORE BOARD
      {data.map((game, index) => {
        return (
          <div className={"scores"} key={index}>
            {game.isHighScore && (
              <div className={"highScore"}>PERSONAL BEST</div>
            )}
            <div className={"game-details"}>
              Game {index + 1} : {formatTime(game.score)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
