import { Fridge, StdinInput, Substance } from "./types.js";
import { hasCommonTemp, nextInt } from "./utils.js";

const checkAndPutToFridge = (s: Substance, f1: Fridge, f2: Fridge) => {
  // if the 1st fridge is empty, put the substance in it
  if (f1.substances.length === 0) {
    f1.substances.push(s);
    f1.lowTemp = s.lowTemp;
    f1.highTemp = s.highTemp;
    return 1;
  }

  // Check if the substance can be put in the 1st fridge
  if (hasCommonTemp(f1, s)) {
    f1.substances.push(s);
    f1.lowTemp = Math.max(f1.lowTemp, s.lowTemp);
    f1.highTemp = Math.min(f1.highTemp, s.highTemp);
    return 1;
  }

  // if the 2nd fridge is empty, put the substance in it
  if (f2.substances.length === 0) {
    f2.substances.push(s);
    f2.lowTemp = s.lowTemp;
    f2.highTemp = s.highTemp;
    return 1;
  }

  // Check if the substance can be put in the 2nd fridge
  if (hasCommonTemp(f2, s)) {
    f2.substances.push(s);
    f2.lowTemp = Math.max(f2.lowTemp, s.lowTemp);
    f2.highTemp = Math.min(f2.highTemp, s.highTemp);
    return 1;
  }

  // if the substance can't be put in any fridge, return -1

  // console.log("The substance can't be put in any fridge: ", s);
  return -1;
};

export function main(stdinInput: StdinInput): void {
  // For this template, the Pirates Challenge will be used as an example: https://csacademy.com/ieeextreme-practice/task/pirates/statement/

  // The whole main()'s body should be replaced with the actual solution logic.

  // Parse input for the challenge
  const N: number = nextInt(stdinInput); // Number of substances

  if (N > 100 || N <= 0) {
    console.log(-1);
    return;
  }

  const substances: Substance[] = [];

  // console.log("The Inputs: [M]: ", M);
  // console.log("The Inputs: [Q]: ", Q);

  // Parse the strings containing symbols that represent the types of map tiles.
  for (let i = 0; i < N; i++) {
    const s_low: number = nextInt(stdinInput);
    const s_high: number = nextInt(stdinInput);

    if (s_low < -100 || s_low > 100 || s_high < -100 || s_high > 100) {
      console.log(-1);
      return;
    }

    substances.push({ lowTemp: s_low, highTemp: s_high });
  }

  const fidge1: Fridge = { substances: [], lowTemp: 0, highTemp: 0 };
  const fidge2: Fridge = { substances: [], lowTemp: 0, highTemp: 0 };
  let cannotStore: boolean = false;

  substances.every((substance) => {
    cannotStore = checkAndPutToFridge(substance, fidge1, fidge2) === -1;
    // console.log("\n\nFridge 1: ", fidge1);
    // console.log("Fridge 2: ", fidge2);
    // console.log("Cannot Store: ", cannotStore);
    // console.log("Substance: ", substance);
    return !cannotStore;
  });

  if (cannotStore) {
    console.log(-1);
    return;
  }

  if (fidge2.substances.length === 0) {
    console.log(`${fidge1.lowTemp} ${fidge1.lowTemp}`);
  } else {
    console.log(`${fidge1.lowTemp} ${fidge2.lowTemp}`);
  }
}
// main({ inputStdin: "2\n10 12\n20 24\n", inputCursor: 0 });
// main({ inputStdin: "4\n-54 -40\n-50 -42\n36 77\n49 100\n", inputCursor: 0 });

// 4
// -54 -40
// -50 -42
// 36 77
// 49 100

// main({ inputStdin: "3\n-10 10\n-5 5\n0 5\n", inputCursor: 0 });
// main({ inputStdin: "1\n-10 10", inputCursor: 0 });

// 3
// -10 -5
// 0 5
// 10 15

// 3
// -10 10
// -5 5
// 0 5

// 2
// -50 -30
// 30 50
