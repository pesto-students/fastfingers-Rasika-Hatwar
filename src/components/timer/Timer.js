import React, { useState, useEffect } from "react";
import ProtoTypes from "prop-types";
import "./timer.css";
import { newFormatTime } from "../../data/utils";
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timerInterval = "";

export default function Timer({ timeLimit, handleQuitGame }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [stroke, setStroke] = useState("283 283");
  useEffect(() => {
    timePassed = 0;
    setTimeLeft(timeLimit);
  }, [timeLimit]);
  useEffect(() => {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timePassed += 100;
        setTimeLeft(timeLimit - timePassed);
        const strokeValue =
          calculateTimeFraction(timeLeft, timeLimit) * FULL_DASH_ARRAY;
        setStroke(`${strokeValue} ${FULL_DASH_ARRAY}`);
      } else if (timeLeft === 0) {
        handleQuitGame();
        clearInterval(timerInterval);
      }
    }, 100);
    return () => clearInterval(timerInterval);
  }, [handleQuitGame, timeLeft, timeLimit]);
  function calculateTimeFraction(remainingTime, totalTimeLimit) {
    const rawTimeFraction = remainingTime / totalTimeLimit;
    return rawTimeFraction - (1 / totalTimeLimit) * (1 - rawTimeFraction);
  }
  return (
    <div className="base-timer">
      <svg className="base-timer__svg" viewBox="0 0 100 100">
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={stroke}
            className="base-timer__path-remaining info"
            d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
          ></path>
        </g>
      </svg>
      <span className="base-timer__label">{newFormatTime(timeLeft)}</span>
    </div>
  );
}
Timer.protoTypes = {
  timeLimit: ProtoTypes.number.isRequired,
  handleQuitGame: ProtoTypes.func.isRequired,
};
