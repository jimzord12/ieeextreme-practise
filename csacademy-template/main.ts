import { Query, StdinInput } from "./types";
import { nextInt, nextString } from "./utils";

export function main(stdinInput: StdinInput): void {
  // For this template example we will be using the Pirates Challenge: https://csacademy.com/ieeextreme-practice/task/pirates/statement/

  // Parse input for the Pirates challenge
  const N: number = nextInt(stdinInput); // Map rows
  const M: number = nextInt(stdinInput); // Map columns
  const Q: number = nextInt(stdinInput); // Number of queries

  console.log("The Inputs: [N]: ", N);
  console.log("The Inputs: [M]: ", M);
  console.log("The Inputs: [Q]: ", Q);

  const map: string[] = [];
  for (let i = 0; i < N; i++) {
    map.push(nextString(stdinInput));
  }

  console.log("\nMap: ", map);

  const queries: Query[] = [];
  for (let i = 0; i < Q; i++) {
    const x1: number = nextInt(stdinInput);
    const y1: number = nextInt(stdinInput);
    const x2: number = nextInt(stdinInput);
    const y2: number = nextInt(stdinInput);
    queries.push({ x1, y1, x2, y2 });
  }

  // Example output for each query (replace with actual solution logic)
  queries.forEach((query) => {
    console.log(
      `\nQuery from (${query.x1}, ${query.y1}) to (${query.x2}, ${query.y2})`
    );
  });
}
