import { Hexagon } from "./classes/hexagon.js";

export const getDistance2D = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  // console.log(`getDistance2D -> x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`);
  const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  // console.log("getDistance2D -> Result: ", result);
  return result;
};

export const roundTo = (n: number, digits: number = 0) => {
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
};
