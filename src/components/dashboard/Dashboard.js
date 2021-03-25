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

    const newTime = Math.ceil(newWord.length / factor) * 1000;
    setItem(newWord);
    setTimeLimit(newTime < 2000 ? 2000 : newTime);
    setUserInput("");
  };

  useEffect(() => {
    itemShow();
    const scoreCount = setInterval(() => {
      if (!quitGame) {
        currentScore = currentScore + 1;
        setScore(currentScore);
      } else if (quitGame) {
        clearTimeout(scoreCount);
        setScore(0);
      }
    }, 1000);

    return () => {
      clearInterval(scoreCount);
    };
  }, [quitGame]);

  const checkUserInput = (e) => {
    setUserInput(e.target.value);

    if (e.target.value.toLocaleLowerCase() === item.toLocaleLowerCase()) {
      itemShow();
      setFactor((prevState) => parseFloat(prevState) + 0.01);
      if (parseFloat(factor) >= 1.5 && parseFloat(factor) < 2)
        setLevel("MEDIUM");
      if (parseFloat(factor) >= 2) setLevel("HARD");
    }
  };

  const handleQuitGame = () => {
    setScore(0);
    const sessionStorage = window.sessionStorage;
    let data = JSON.parse(window.sessionStorage.getItem("scoreBoard")) || [];
    const currentGame = {
      userName: userName,
      score: score,
      isHighScore: false,
      gameCount: gameCount,
    };

    if (data.length === 0) {
      currentGame.isHighScore = true;
    }
    if (data.length === 8) {
      data.shift();
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].isHighScore && data[i].score < currentGame.score) {
        currentGame["isHighScore"] = true;
        data[i]["isHighScore"] = false;
      }
    }
    data.push(currentGame);
    sessionStorage.setItem("scoreBoard", JSON.stringify(data));
    setQuitGame(true);
    setGameCount(gameCount + 1);
    //setGameCount((prevState) => prevState + 1);
  };
  const restartGame = () => {
    setQuitGame(false);
    setScore(0);
    currentScore = 0;
    setUserInput("");
  };
  const renderLoginForm = () => {
    setScore(0);
    currentScore = 0;
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
            margin: "15px",
            padding: "15px",
            justifyContent: "space-between",
          }}
        >
          <div className="column">
            <Profile userName={userName} difficultyLevel={difficultyLevel} />
            {!quitGame && <ScoreBoard />}
            {!quitGame && (
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
                timeLimit={timeLimit}
                key={item}
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
              <div className="score-title">SCORE : GAME {gameCount}</div>
              <div className="score">{formatTime(currentScore)}</div>
              <div>New Score</div>
              <button className="replay-btn" onClick={restartGame}>
                <img src={ReloadIcon} alt="" width="50px" height="50px" />
                <span className="top-details">PLAY AGAIN</span>
              </button>
              {quitGame && (
                <span
                  className="top-details quit-text"
                  onClick={renderLoginForm}
                >
                  QUIT GAME
                </span>
              )}
            </div>
          )}
          <div className="right-section top-details column">
            <div>fast fingers</div>
            {!quitGame && (
              <div className="top-details">SCORE: {formatTime(score)}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
