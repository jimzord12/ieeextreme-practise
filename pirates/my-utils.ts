export const getDistance2D = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return result;
};

