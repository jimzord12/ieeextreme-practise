import { map } from "lodash";
import { ArchipelagoMap } from "./classes/map";

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

  for (let i = 0; i < rows; i++) {
    const rowSymbols = restOfInput[i];
    archipelagoMap.generateMapRow(rowSymbols, i);
  }

  console.log("#2 Archipelago Map: ", archipelagoMap);

  const querryData = restOfInput.slice(4, undefined);
  console.log("querryData: ", querryData);
};

const input =
  "4 12 2\nOOOOO~~OOOOO\nO~~OO~OO~~~O\nOO~OO~~O~O~O\nOOOOOO~OOOOO\n2 2 3 11\n4 7 3 9";
const expectedOutput = "2\n1";

main(input);
