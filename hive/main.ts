import { exit } from "process";
import { askQuestion } from "../utils/utils";
import { Hexagon } from "./classes/hexagon";
import { Hive } from "./classes/hive";

const hiveCreation = async (): Promise<Hive> => {
  const hive: Hive = Hive.getInstance();

  // ✨ Uncomment this after testing
  // const hiveSize = await askQuestion("How big should the hive be? eg. 3 3: ");
  // const [rows, columns] = hiveSize.split(" ").map(Number);

  // 🧪 For Testing
  const rows = 3;
  const columns = 3;

  // Create the Hive by adding rows
  for (let i = 0; i < rows; i++) {
    hive.addRow(columns);
  }

  console.log("");
  console.log("-----------------------------");
  console.log("[Hive Creation] - The Hive: ", hive);

  return hive;
};

const hiveActivation = async (hive: Hive) => {
  console.log("");
  console.log("-----------------------------");
  console.log("[Hive Activation] - Hive Rows Amount: ", hive.rows.length);

  // 🧪 For Testing
  const rowsWithHexagonsToActivate = [
    ["0", "1", "0"],
    ["0", "1"],
    ["0", "0", "0"],
  ];

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
  console.log("[Hive Activation] - Final Form: ", hive);
  console.log("");

  hive.activatedHexagons.forEach((hexagon) => {
    console.log("");

    console.log(
      `[Hive Activation] - Activated Hexagon: (${hexagon.hivePos.row} ${hexagon.hivePos.col})`
    );
    console.log("");
  });
};

const main = async () => {
  const hive = await hiveCreation();
  await hiveActivation(hive);
  exit();
};

main();
