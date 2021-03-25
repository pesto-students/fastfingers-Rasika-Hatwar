import dictionary from "./dictionary.json";

const data = dictionary;
export const EASY_ARRAY = data.filter((word) => word.length <= 4);
export const MEDIUM_ARRAY = data.filter(
  (word) => word.length >= 5 && word.length <= 8
);
export const HARD_ARRAY = data.filter((word) => word.length > 8);

export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export function newFormatTime(time) {
  let seconds = Math.floor(time / 1000);
  let miliseconds = (time % 1000) / 10;
  return `${seconds < 10 ? `0${seconds}` : seconds}:${
    miliseconds < 10 ? `0${miliseconds}` : miliseconds
  }`;
}
