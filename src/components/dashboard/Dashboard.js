import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Profile from "../profile/Profile";
import Timer from "../timer/Timer";
import TargetWord from "../dashboard/TargetWord";
import { EASY_ARRAY } from "../../data/utils";
import { MEDIUM_ARRAY } from "../../data/utils";
import { HARD_ARRAY } from "../../data/utils";
import { formatTime } from "../../data/utils";
import ScoreBoard from "../scoreboard/ScoreBoard";
import ReloadIcon from "../../assets/Reload.svg";
import CrossIcon from "../../assets/Icon-cross.svg";
import LoginForm from "../login/LoginForm";

let currentScore = 0;
export default function Dashboard({
  userName,
  difficultyLevel,
  difficultyFactor,
}) {
  console.log(difficultyLevel, "difficultyLevel");
  const [item, setItem] = useState("");
  const [level, setLevel] = useState(difficultyLevel);
  const [factor, setFactor] = useState(difficultyFactor);
  const [timeLimit, setTimeLimit] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [quitGame, setQuitGame] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const [score, setScore] = useState(0);

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
    setTimeLimit(Math.round(newWord.length / parseFloat(factor)));
    setUserInput("");
  };

  useEffect(() => {
    itemShow();

    const scoreCount = setInterval(() => {
      if (!quitGame) {
        currentScore = currentScore + 1;
        setScore(currentScore);
      } else if (quitGame) clearTimeout(scoreCount);
    }, 1000);

    return () => {
      clearInterval(scoreCount);
    };
  }, [quitGame]);

  const checkUserInput = (e) => {
    setUserInput(e.target.value);
    if (e.target.value === item) {
      itemShow();
      e.target.value = "";
      setFactor((prevState) => parseFloat(prevState) + 0.01);
      if (parseFloat(factor) >= 1.5 && parseFloat(factor) < 2)
        setLevel("MEDIUM");
      if (parseFloat(factor) >= 2) setLevel("HARD");
    }
  };

  const handleQuitGame = () => {
    const sessionStorage = window.sessionStorage;
    let data = JSON.parse(window.sessionStorage.getItem("scoreBoard")) || [];
    const currentGame = {
      score: score,
      hasHighScore: false,
    };
    for (let i = 0; i < data.length; i++) {
      if (data[i].hasHighScore && data[i].score < currentGame.score) {
        currentGame["hasHighScore"] = true;
        data[i]["hasHighScore"] = false;
      }
    }
    console.log(data.length, "data length");
    if (data.length === 0) {
      currentGame.hasHighScore = true;
    }
    if (data.length === 8) {
      data.shift();
    }
    data.push(currentGame);
    sessionStorage.setItem("scoreBoard", JSON.stringify(data));
    setQuitGame(true);
    setGameCount((prevState) => prevState + 1);
  };
  const restartGame = () => {
    setQuitGame(false);
  };
  const renderLoginForm = () => {
    setShowLogin(true);
  };

  return (
    <>
      {showLogin && <LoginForm />}
      {!showLogin && (
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            margin: "10px",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <div className="column">
            <Profile userName={userName} difficultyLevel={difficultyLevel} />
            {/* {!quitGame &&  */}
            <ScoreBoard />
            {/* } */}

            {quitGame ? (
              <span className="top-details" onClick={renderLoginForm}>
                QUIT GAME
              </span>
            ) : (
              <button className="stop-btn" onClick={handleQuitGame}>
                <img src={CrossIcon} alt="" width="50px" height="50px" />
                <span className="top-details">STOP GAME</span>
              </button>
            )}
          </div>

          {!quitGame && (
            <div className="middle-section column">
              <TargetWord targetWord={item} userInput={userInput} />
              <Timer
                timeLimit={timeLimit * 1000}
                handleQuitGame={handleQuitGame}
              />
              <input
                className="word-input"
                type="text"
                value={userInput}
                onChange={checkUserInput}
              ></input>
            </div>
          )}

          {quitGame && (
            <div className="score-section middle-section column">
              <div className="scoretitle">SCORE : GAME {gameCount}</div>
              <div className="score">{formatTime(score)}</div>
              <div className="scoretitle">New High Score</div>
              <button className="replay-btn" onClick={restartGame}>
                <img src={ReloadIcon} alt="" width="50px" height="50px" />
                <span className="top-details">PLAY AGAIN</span>
              </button>
            </div>
          )}
          <div className="right-section top-details column">
            <div>fast fingers</div>
            {/* {!quitGame && ( */}
            <div className="top-details">SCORE: {formatTime(score)}</div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
}
