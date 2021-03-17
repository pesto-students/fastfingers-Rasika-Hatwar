import React  , {useState, useEffect}from 'react'
import  './timer.css'


export default function Timer ({wordItem,difficultyFactor}) {
    // const TIME_LIMIT = (wordItem.length) / parseFloat(difficultyFactor)
    // const [timeLimit, setTimeLimit] = useState(TIME_LIMIT)
    const TIME_LIMIT = 2;
    const [passedTime, setSecondsPassed] = useState(0);
    const [ timeLeft,setTimeLeft] = useState(TIME_LIMIT);


    useEffect(()=>{
        const timerInterval = setInterval(() => {
            setSecondsPassed(passedTime => passedTime + 1)
            setTimeLeft(TIME_LIMIT - passedTime);
            formatTime(timeLeft);
          }, 1000); 
          return () => clearInterval(timerInterval);
    })

     const formatTime = (time) =>
      {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
      }

      const COLOR_CODES = {
        info: {
          color: "white"
        }
      };
      
      let remainingPathColor = COLOR_CODES.info.color;
         
      
    return(
        <div className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" >
                <g className="base-timer__circle">
                <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    className={`base-timer__path-remaining ${remainingPathColor}`}
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
                ></path>
                </g>
            </svg>
            <span className="base-timer__label">
                {formatTime(timeLeft)}
            </span>
        </div>
    )}