import { createHash } from "crypto";
import { StdinInput } from "./types.js";

const isWhitespace = (character: string): boolean =>
  " \t\n\r\v".includes(character);

const clearWhitespaces = (stdinInput: StdinInput): void => {
  while (
    stdinInput.inputCursor < stdinInput.inputStdin.length &&
    isWhitespace(stdinInput.inputStdin[stdinInput.inputCursor])
  ) {
    stdinInput.inputCursor++;
  }
};

const nextString = (stdinInput: StdinInput): string => {
  clearWhitespaces(stdinInput);
  let nextString = "";
  while (
    stdinInput.inputCursor < stdinInput.inputStdin.length &&
    !isWhitespace(stdinInput.inputStdin[stdinInput.inputCursor])
  ) {
    nextString += stdinInput.inputStdin[stdinInput.inputCursor++];
  }
  return nextString;
};

const nextInt = (stdinInput: StdinInput): number =>
  parseInt(nextString(stdinInput), 10);

const nextFloat = (stdinInput: StdinInput): number =>
  parseFloat(nextString(stdinInput));

const nextChar = (stdinInput: StdinInput): string => {
  clearWhitespaces(stdinInput);
  return stdinInput.inputCursor < stdinInput.inputStdin.length
    ? stdinInput.inputStdin[stdinInput.inputCursor++]
    : "\0";
};

export const roundTo = (n: number, digits: number = 0) => {
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
};

export const hashTable = (table: number[][]) => {
  const hash = createHash("md5");
  return hash.update(table.flat().join("")).digest("hex");
};

export {
  isWhitespace,
  clearWhitespaces,
  nextString,
  nextInt,
  nextFloat,
  nextChar,
};
