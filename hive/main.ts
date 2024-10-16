import { exit } from "process";
import { askQuestion } from "../utils/utils";
import { Hexagon } from "./classes/hexagon";
import { Hive } from "./classes/hive";

const hiveCreation = async () => {
  const hive: Hive = Hive.getInstance();

  const hiveSize = await askQuestion("How big should the hive be? eg. 3 3: ");
  const [rows, columns] = hiveSize.split(" ").map(Number);
  const evenColumnsAmount = columns - 1;

  for (let i = 0; i < rows; i++) {
    hive.rows.push([]);
    if (i % 2 !== 0) {
      // Mona
      for (let j = 0; j < evenColumnsAmount; j++) {
        hive.rows[i].push(new Hexagon(i + 1, j + 1, 1));
        hive.totalHexagons++;
      }
    } else {
      // Zyga
      for (let j = 0; j < columns; j++) {
        hive.rows[i].push(new Hexagon(i + 1, j + 1, 1));
        hive.totalHexagons++;
      }
    }
  }

  console.log("The Hive: ", hive);

  return hive;
};

const hiveActivation = async (hive: Hive) => {
  const hexagonsToActivate: string[] = [];

  console.log("Hive Activation - Hive Rows Amount: ", hive.rows.length);

  for (let i = 0; i < hive.rows.length; i++) {
    const hexagonsToActivate = (await askQuestion("Nigga eg. 0 1 0: ")).split(
      " "
    );

    // we are looping each row
    hive.rows[i].forEach((hexagon, index) => {
      if (Number(hexagonsToActivate[index]) === 1) hexagon.activate();
      hive.activatedHexagons.push(hexagon);
    });
  }
};

const main = async () => {
  const hive = await hiveCreation();
  await hiveActivation(hive);
  console.log("#2 - The Hive: ", hive);

  exit();
};
main();
