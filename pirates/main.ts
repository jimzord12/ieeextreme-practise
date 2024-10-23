import { ArchipelagoMap } from "./classes/map.js";

const main = async (input: string) => {
  console.log("Welcome to the Pirates Code Challenge!\n");
  console.log("The Input:\n", input);

  const [mapSize_and_NumOfQuerries, ...restOfInput] = input.split("\n");
  console.log("\n\n", mapSize_and_NumOfQuerries, restOfInput);
  const [rows, cols, numOfQuerries] = mapSize_and_NumOfQuerries
    .split(" ")
    .map(Number);

  console.log(
    "Rows: ",
    rows,
    "Cols: ",
    cols,
    "Num of Querries: ",
    numOfQuerries
  );

  const archipelagoMap = new ArchipelagoMap(rows, cols);
  console.log("#1 Archipelago Map: ", archipelagoMap);

  for (let i = 1; i < rows + 1; i++) {
    const rowSymbols = restOfInput[i];
    archipelagoMap.generateMapRow(rowSymbols, i);
  }

  archipelagoMap.map.forEach((row, i) => {
    console.log(`(${i}) - Row: `, row);
  });

  const querryData = restOfInput.slice(4, undefined);
  console.log("querryData: ", querryData);

  archipelagoMap.createTheIslands();
  archipelagoMap.craeteTheSeas();

  archipelagoMap.islands.forEach((island, i) => {
    console.log(`Island ${i}: `, island);
  });

  archipelagoMap.seas.forEach((sea, i) => {
    console.log(`Sea ${i}: `, sea);
  });
};

const input =
  "4 12 2\nOOOOO~~OOOOO\nO~~OO~OO~~~O\nOO~OO~~O~O~O\nOOOOOO~OOOOO\n2 2 3 11\n4 7 3 9";
const expectedOutput = "2\n1";

main(input);
