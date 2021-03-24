import React, { useState, useEffect } from "react";
import "./timer.css";
import { newFormatTime } from "../../data/utils";
import ProtoTypes from "prop-types";

const FULL_DASH_ARRAY = 283;
export default function Timer({ timeLimit, handleQuitGame }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [stroke, setStroke] = useState("283 283");
  useEffect(() => {
    if (timeLimit < 2) setTimeLeft(2);
    else setTimeLeft(timeLimit);
  }, [timeLimit]);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        const newTimeLeft = timeLeft < 1 ? 0 : timeLeft - 100;
        setTimeLeft(newTimeLeft);
        const strokeValue =
          calculateTimeFraction(newTimeLeft, timeLimit) * FULL_DASH_ARRAY;
        console.log("STROKE VALUE", strokeValue);
        setStroke(`${strokeValue} 283`);
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

  Timer.protoTypes = {
    timeLimit: ProtoTypes.number.isRequired,
    handleQuitGame: ProtoTypes.func.isRequired,
  };
}
