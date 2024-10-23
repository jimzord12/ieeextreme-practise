import { StdinInput } from "./types";

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

export {
  isWhitespace,
  clearWhitespaces,
  nextString,
  nextInt,
  nextFloat,
  nextChar,
};
