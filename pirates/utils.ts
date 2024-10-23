export const getDistance2D = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return result;
};

export const roundTo = (n: number, digits: number = 0) => {
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
};
