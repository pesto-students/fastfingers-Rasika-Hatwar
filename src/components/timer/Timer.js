import React, { useState, useEffect } from "react";
import "./timer.css";

const FULL_DASH_ARRAY = 283;
let passedTime = 0;

export default function Timer({ timeLimit, handleQuitGame }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [stroke, setStroke] = useState("283 283");

  useEffect(() => {
    passedTime = 0;
    if (timeLimit < 2) setTimeLeft(2);
    else setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        passedTime = passedTime + 1;
        const newTimeLeft = timeLeft < 1 ? 0 : timeLeft - 1;
        setTimeLeft(newTimeLeft);
        const strokeValue =
          calculateTimeFraction(newTimeLeft, timeLimit) * FULL_DASH_ARRAY;
        console.log("STROKE VALUE", strokeValue);
        setStroke(`${strokeValue} 283`);
      } else if (timeLeft === 0) {
        handleQuitGame(0);
        clearInterval(timerInterval);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (time) => {
    console.log(time, "time format");
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  function calculateTimeFraction(remainingTime, totalTimeLimit) {
    console.log("remainingTime, totalTimeLimit", remainingTime, totalTimeLimit);
    const rawTimeFraction = remainingTime / totalTimeLimit;
    let rawTime =
      rawTimeFraction - (1 / totalTimeLimit) * (1 - rawTimeFraction);
    console.log(rawTime, "RAW TIME");
    return rawTime < 0 ? 0 : rawTime;
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
      <span className="base-timer__label">{formatTime(timeLeft)}</span>
    </div>
  );
}
