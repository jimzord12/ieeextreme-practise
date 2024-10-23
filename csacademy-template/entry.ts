import readline from "readline";
import { StdinInput } from "./types";
import { main } from "./main";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const stdinInput: StdinInput = {
  inputStdin: "",
  inputCursor: 0,
};

// Reading the input from the standard input
rl.on("line", (input: string) => {
  stdinInput.inputStdin += input + "\n";
});

// Main function that is called after reading the input
rl.on("close", () => {
  main(stdinInput);
});
