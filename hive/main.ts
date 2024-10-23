import { Hive } from "./classes/hive.js";
import { HiveOperation } from "./types.js";
import console from "console";

const modes = {
  easy: {
    grid: {
      rows: 3,
      columns: 3,
    },
    activatedHexagons: [
      ["0", "1", "0"],
      ["0", "1"],
      ["0", "0", "0"],
    ],
    operations: ["a 1 3", "k 2 2", "k 2 1", "a 3 1", "k 3 1"],
  },
  hard: {
    grid: {
      rows: 5,
      columns: 5,
    },
    activatedHexagons: [
      ["0", "1", "0", "0", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
      ["1", "0", "1", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    operations: [
      "a 2 1",
      "k 2 1",
      "k 1 2",
      "k 3 4",
      "k 4 1",
      "k 5 5",
      "a 3 3",
      "k 3 3",
    ],
  },
};

type ModeType = typeof modes.easy | typeof modes.hard;

const selectMode = (mode: string): ModeType => {
  if (mode === "easy") {
    return modes.easy;
  } else {
    return modes.hard;
  }
};

const hiveCreation = async (mode: typeof modes.easy): Promise<Hive> => {
  const hive: Hive = Hive.getInstance();

  // ✨ Uncomment this after testing
  // const hiveSize = await askQuestion("How big should the hive be? eg. 3 3: ");
  // const [rows, columns] = hiveSize.split(" ").map(Number);

  // 🧪 For Testing
  // const rows = 3; // Easy Mode
  // const columns = 3; // Easy Mode

  const rows = mode.grid.rows;
  const columns = mode.grid.columns;

  // const rows = 5; // Hard Mode
  // const columns = 5; // Hard Mode

  // Create the Hive by adding rows
  for (let i = 0; i < rows; i++) {
    hive.addRow(columns);
  }

  hive.calcCordsForHexagons();

  console.log("");
  console.log("-----------------------------");
  console.log("[Hive Creation] - The Hive: ", hive);

  // hive.rows.forEach((row, rowIndex) => {
  //   row.forEach((hexagon, colIndex) => {
  //     console.log("");

  //     console.log(`(${rowIndex + 1}, ${colIndex + 1})`, "Hexagon: ", hexagon);
  //     console.log("");
  //   });
  // });

  return hive;
};

const hiveActivation = async (hive: Hive, mode: typeof modes.easy) => {
  console.log("");
  console.log("-----------------------------");
  console.log("[Hive Activation] - Hive Rows Amount: ", hive.rows.length);

  // // 🧪 For Testing
  // const rowsWithHexagonsToActivate = [
  //   ["0", "1", "0"],
  //   ["0", "1"],
  //   ["0", "0", "0"],
  // ]; // Easy Moded

  const rowsWithHexagonsToActivate = mode.activatedHexagons;

  // const rowsWithHexagonsToActivate = [
  //   ["0", "1", "0", "0", "0"],
  //   ["0", "1", "0", "0"],
  //   ["0", "0", "0", "1", "1"],
  //   ["1", "0", "1", "0"],
  //   ["0", "0", "0", "1", "1"],
  // ]; // Hard Mode

  for (let i = 0; i < hive.rows.length; i++) {
    // ✨ Uncomment this after testing
    // const hexagonsToActivate = (
    //   await askQuestion("Hexagon Activaton (eg. 0 1 0): ")
    // ).split(" ");

    // ✨ Uncomment this after testing
    // hive.rows[i].forEach((hexagon, index) => {
    //   if (Number(hexagonsToActivate[index]) === 1)
    //     hive.activateHexagon(hexagon);
    // });

    // 🧪 For Testing
    hive.rows[i].forEach((hexagon, index) => {
      if (Number(rowsWithHexagonsToActivate[i][index]) === 1)
        // console.log("Hexagon: ", hexagon);
        hive.activateHexagon(hexagon);
    });
  }

  console.log("");
  console.log("-----------------------------");
  console.log(
    "[Hive Activation] - Active Hexagons: ",
    hive.activatedHexagons.map((hex) => hex.hivePos)
  );
  console.log("");

  // hive.activatedHexagons.forEach((hexagon) => {
  //   console.log("");

  //   console.log(
  //     `[Hive Activation] - Activated Hexagon: (${hexagon.hivePos.row} ${hexagon.hivePos.col})`
  //   );
  //   console.log("");
  // });
};

const hiveOperations = async (hive: Hive, mode: typeof modes.easy) => {
  console.log("");
  console.log("-----------------------------");

  // ✨ Uncomment this after testing
  // const amountOfOps = Number(await askQuestion("Amount of Operations: "));

  const operations = [];

  // 🧪 For Testing
  // const operationsToRun = ["a 1 3", "k 2 2", "k 2 1", "a 3 1", "k 3 1"]; // Easy Mode
  const operationsToRun = mode.operations;
  // const operationsToRun = [
  //   "a 2 1",
  //   "k 2 1",
  //   // "k 1 2",
  //   // "k 3 4",
  //   // "k 4 1",
  //   // "k 5 5",
  //   // "a 3 3",
  //   // "k 3 3",
  // ]; // Easy Mode

  console.log("[Hive Operations] - Total Operations: ", operationsToRun.length);

  for (let i = 0; i < operationsToRun.length; i++) {
    const operationInfo = operationsToRun[i];

    const [type, row, col] = operationInfo.split(" ");
    const op: HiveOperation = {
      type: type === "a" ? "hex activation" : "get perimeter",
      pos: { row: Number(row), col: Number(col) },
    };

    operations.push(op);
    console.log(`Operation (${i + 1}/${operationsToRun.length}):`);
    console.log(
      `   Type: ${type === "a" ? "hex activation" : "get perimeter"}`
    );
    console.log(`   Cell: (row: ${row}, col: ${col})`);
    console.log("");
  }

  const operationResults: number[] = [];

  operations.forEach((op) => {
    const result = hive.execOperation(op);
    operationResults.push(result);
  });

  const operationsAndResults = operations.map((op, index) => {
    return {
      ...op,
      result: operationResults[index],
    };
  });

  console.log("");
  console.log("");
  console.table(operationsAndResults.filter((op) => op.result !== -1));

  // ✨ Uncomment this after testing
  // for (let i = 0; i < amountOfOps; i++) {
  //   const operationInfo = await askQuestion(`Operation ${i + 1} (eg. a 1 2): `);

  //   const [type, row, col] = operationInfo.split(" ");
  //   const op: HiveOperation = {
  //     type: type === "a" ? "hex activation" : "get perimeter",
  //     pos: { row: Number(row), col: Number(col) },
  //   };

  //   operations.push(op);
  //   console.log(`Operation (${i + 1}/${amountOfOps}):`);
  //   console.log(`   Type: ${type} ${row} ${col}`);
  //   console.log(`   Cell: (row: ${row}, col: ${col})`);
  //   console.log("");
  // }
};

const main = async (modeType: "easy" | "hard") => {
  try {
    const mode = selectMode(modeType);
    const hive = await hiveCreation(mode); // Create the Hive
    await hiveActivation(hive, mode); // Activate same of the Hive's Hexagons
    await hiveOperations(hive, mode); // Run the querries
  } catch (error) {
    console.error("Error: ", error);
  }
};

(async () => {
  await main("easy");
  Hive.resetInstance();
  await main("hard");
})();
