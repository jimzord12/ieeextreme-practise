import { exit } from "process";
import { askQuestion } from "../utils/utils";
import { Hexagon } from "./hexagon";

const hiveCreation = async () => {
  const hive: Hexagon[][] = [];

  const hiveSize = await askQuestion("How big should the hive be? eg. 3 3: ");
  const [rows, columns] = hiveSize.split(" ");

  for (let i = 0; i < Number(rows); i++) {
    hive.push([]);
    if (i % 2 !== 0) {
      // Mona
      for (let j = 0; j < Number(columns) - 1; j++) {
        hive[i].push(new Hexagon(i, j, 1));
      }
    } else {
      // Zyga
      for (let j = 0; j < Number(columns); j++) {
        hive[i].push(new Hexagon(i, j, 1));
      }
    }
  }

  console.log("The Hive: ", hive);

  return hive;
};

const hiveActivation = async (hive: Hexagon[][]) => {
  const hexagonsToActivate: string[] = [];

  console.log("Hive Activation - Hive Length: ", hive.length);

  for (let i = 0; i < hive.length; i++) {
    const hexagonsToActivate = (await askQuestion("Nigga eg. 0 1 0: ")).split(
      " "
    );

    // we are looping each row
    hive[i].forEach((hexagon, index) => {
      if (Number(hexagonsToActivate[index]) === 1) hexagon.activate();
    });
  }
};

const main = async () => {
  const hive = await hiveCreation();
  await hiveActivation(hive);
  console.log("The Hive: ", hive);

  exit();
};
main();
