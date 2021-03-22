import React, { useState } from "react";
import "./style.css";
import keyboard from "../../assets/keyboard.svg";
import playbutton from "../../assets/Icon-play.svg";
import Dashboard from "../dashboard/Dashboard";

export default function LoginForm() {
  const [state, setState] = useState({
    userName: "",
    difficultyLevel: "EASY",
    difficultyFactor: 1,
    startGame: false,
    errorMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let tempFactor = 1;
    if (value === "EASY") {
      tempFactor = 1;
    } else if (value === "MEDIUM") {
      tempFactor = 1.5;
    } else if (value === "HARD") {
      tempFactor = 2;
    }
    setState({ ...state, [name]: value, difficultyFactor: tempFactor });
  };

  const showDashboard = () => {
    if (state.userName) {
      setState({ ...state, startGame: true });
    } else {
      setState({ ...state, errorMessage: "Please enter user name" });
    }
  };

  const {
    userName,
    difficultyLevel,
    difficultyFactor,
    startGame,
    errorMessage,
  } = state;
  return (
    <div style={{ display: "flex", flex: 1 }}>
      {!startGame && (
        <div className="login-container">
          <img src={keyboard} alt="KeyBoard" width="235px" height="137px" />
          <div className="app-title"> fast fingers</div>
          <div className="subTitle">
            <div className="line"></div>
            <div className="subtitle-text">the ultimate typing game</div>
            <div className="line"></div>
          </div>
          <input
            className="name-input"
            type="text"
            name="userName"
            placeholder="type your name"
            onChange={handleChange}
          ></input>
          <select
            className="select-input"
            name="difficultyLevel"
            onChange={handleChange}
          >
            <option value="EASY"> EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
          {!userName && errorMessage && (
            <div class="subtitle-text">{errorMessage}</div>
          )}
          <div className="start-game subTitle" onClick={showDashboard}>
            <img src={playbutton} alt="Start" />
            <h3 className="subtitle-text">START GAME</h3>
          </div>
        </div>
      )}
      {startGame && (
        <Dashboard
          userName={userName}
          difficultyLevel={difficultyLevel}
          difficultyFactor={difficultyFactor}
        />
      )}
    </div>
  );
}
