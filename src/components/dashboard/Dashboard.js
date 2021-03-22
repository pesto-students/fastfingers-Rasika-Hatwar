import React, { useEffect, useState } from "react";
import "./style.css";
import Profile from "../profile/Profile";
import Timer from "../timer/Timer";
import { EASY_ARRAY } from "../../data/utils";
import { MEDIUM_ARRAY } from "../../data/utils";
import { HARD_ARRAY } from "../../data/utils";

export default function Dashboard({
  userName,
  difficultyLevel,
  difficultyFactor,
}) {
  console.log(difficultyLevel, "difficultyLevel");
  const [item, setItem] = useState("");
  const [level, setLevel] = useState(difficultyLevel);
  const [factor, setFactor] = useState(difficultyFactor);
  const [timeLimit, setTimeLimit] = useState(2);
  const [timeLeft, setTimeLeft] = useState();
  const [quitGame, setQuitGame] = useState(false);

  const [score, setScore] = useState({
    seconds: 0,
    minutes: 0,
  });

  const itemShow = () => {
    let newWord = "";

    if (level === "EASY") {
      newWord = EASY_ARRAY[Math.floor(Math.random() * EASY_ARRAY.length)];
    } else if (level === "MEDIUM") {
      newWord = MEDIUM_ARRAY[Math.floor(Math.random() * MEDIUM_ARRAY.length)];
    } else {
      if (level === "HARD") {
        newWord = HARD_ARRAY[Math.floor(Math.random() * HARD_ARRAY.length)];
      }
    }
    setItem(newWord);
    setTimeLimit(newWord.length / parseFloat(factor));
  };

  useEffect(() => {
    itemShow();
  }, [level, timeLeft]);

  const incrementFactor = () => {
    setFactor((prevState) => parseFloat(prevState) + 0.01);
    console.log("factor", factor);
    setTimeLimit(item.length / parseInt(factor));
    console.log("limit", timeLimit);
    if (parseFloat(factor) >= 1.5 && parseFloat(factor) < 2) setLevel("MEDIUM");
    if (parseFloat(factor) >= 2) setLevel("HARD");
  };

  const checkUserInput = (e) => {
    console.log("on change called");
    if (e.target.value === item) {
      itemShow();
      e.target.value = "";
      incrementFactor();
    }
  };

  const handleQuitGame = (value) => {
    setTimeLeft(value);
    setQuitGame(true);
    console.log("quitGame", quitGame);
    setScore(0.45);
  };
  const restartGame = () => {
    setQuitGame(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDrection: "row",
        margin: "10px",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <div className="column">
        <Profile userName={userName} difficultyLevel={difficultyLevel} />
        <h3 className="top-details">SCOREBOARD</h3>
        <h3 className="top-details">QUIT GAME</h3>
      </div>

      {!quitGame && (
        <div className="middle-section column">
          <div className="random-word">{item}</div>
          <Timer timeLimit={timeLimit} handleQuitGame={handleQuitGame} />
          <input
            className="word-input"
            type="text"
            name="userInput"
            onChange={checkUserInput}
          ></input>
        </div>
      )}

      {quitGame && (
        <div className="score-section middle-section column">
          <div className="scoretitle">SCORE : GAME 1</div>
          <div claasName="score">2:17</div>
          <div className="scoretitle">New High Score</div>
          <div className="top-details">
            <button onClick={restartGame}>PLAY AGAIN</button>
          </div>
        </div>
      )}
      <div className="right-section top-details column">
        <div>fast fingers</div>
        <div>
          SCORE:
          {score.minutes < 10 ? "0" + score.minutes : score.minutes} :
          {score.seconds < 10 ? "0" + score.seconds : score.seconds}
        </div>
      </div>
    </div>
  );
}
