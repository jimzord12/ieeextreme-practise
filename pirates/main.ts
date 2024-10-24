import { ArchipelagoMap } from "./classes/map.js";
import { Query, StdinInput } from "./types.js";
import { nextInt, nextString } from "./utils.js";

export const main = async (stdinInput: StdinInput) => {
  console.log("Welcome to the Pirates Code Challenge!\n");
  console.log("The Stdin Input:\n", stdinInput);

  // Parse input for the challenge
  const rows: number = nextInt(stdinInput); // Map rows
  const cols: number = nextInt(stdinInput); // Map columns
  const querriesNum: number = nextInt(stdinInput); // Number of queries

  const archipelagoMap = new ArchipelagoMap(rows, cols);
  // console.log("#1 Archipelago Map: ", archipelagoMap);

  // Parse the strings containing symbols that represent the types of map tiles.
  // Generate the map, one row at a time.
  for (let i = 1; i < rows + 1; i++) {
    const rowSymbols = nextString(stdinInput);
    archipelagoMap.generateMapRow(rowSymbols, i);
  }

  // Just logging the map
  archipelagoMap.map.forEach((row, i) => {
    // console.log(`(${i + 1}) - Row: `, row);
  });

  const querries: Query[] = [];

  // Parse the queries
  for (let i = 0; i < querriesNum; i++) {
    const x1: number = nextInt(stdinInput);
    const y1: number = nextInt(stdinInput);
    const x2: number = nextInt(stdinInput);
    const y2: number = nextInt(stdinInput);
    querries.push({ x1, y1, x2, y2 });
  }

  // console.log("Querries: ", querries);

  archipelagoMap.createTheIslands();
  archipelagoMap.createTheSeas();

  archipelagoMap.islands.forEach((island, i) => {
    // console.log(`Island ${i}: `, island);
    // console.log(island.landTiles);
  });

  archipelagoMap.seas.forEach((sea, i) => {
    // console.log(`Sea ${i}: `, sea);
    // console.log(sea.waterTiles);
  });
};

// const input =
//   "4 12 2\nOOOOO~~OOOOO\nO~~OO~OO~~~O\nOO~OO~~O~O~O\nOOOOOO~OOOOO\n2 2 3 11\n4 7 3 9";
// const expectedOutput = "2\n1";
main({
  inputCursor: 0,
  inputStdin:
    "4 12 2\nOOOOO~~OOOOO\nO~~OO~OO~~~O\nOO~OO~~O~O~O\nOOOOOO~OOOOO\n2 2 3 11\n4 7 3 9",
});
