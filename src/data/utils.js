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
