import React from "react";
import "./dashboard.css";

export default function TargetWord({ targetWord, userInput }) {
  let content = targetWord.split("").map((char, i) => {
    let color = "white";
    if (i < userInput.length) {
      color = char === userInput[i] ? "#54ba18" : "#445298";
    }
    return (
      <span key={i} style={{ color: color }}>
        {char}
      </span>
    );
  });
  return <p className="random-word">{content}</p>;
}
