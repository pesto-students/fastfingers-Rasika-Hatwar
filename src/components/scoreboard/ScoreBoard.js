import React from "react";
import "./scoreboard.css";
import { formatTime } from "../../data/utils";

export default function ScoreBoard(props) {
  const data = JSON.parse(window.sessionStorage.getItem("scoreBoard")) || [];
  return (
    <div className={"scoreBoard"}>
      SCORE BOARD
      {data.map((game) => {
        return (
          <div className={"scores"}>
            {game.hasHighScore && (
              <div className={"highScore"}>PERSONAL BEST</div>
            )}
            <div className={"gameNameWithScore"}>
              Game {game.gameCount} : {formatTime(game.score)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
