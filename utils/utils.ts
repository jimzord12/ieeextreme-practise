import readline from "readline";

// Create an interface for reading input and writing output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function to ask questions using Promises
export const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

export const closeReadline = () => {
  rl.close();
};
