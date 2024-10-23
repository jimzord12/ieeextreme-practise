import { ConnectedHexagon, Cords, HiveOperation, Position } from "../types.js";
import { roundTo } from "../utils.js";
import { Hexagon } from "./hexagon.js";
import { cloneDeep } from "lodash-es";

type Row = Hexagon[];

export class Hive {
  static instance: Hive;
  public rows: Row[] = [];
  public totalHexagons: number = 0;
  public activatedHexagons: Hexagon[] = [];

  private constructor() {
    Hive.instance = this;
  }

  static getInstance = (): Hive => {
    if (!Hive.instance) {
      Hive.instance = new Hive();
    }

    return Hive.instance;
  };

  static resetInstance() {
    Hive.instance.rows = [];
    Hive.instance.totalHexagons = 0;
    Hive.instance.activatedHexagons = [];
  }

  public calcTotalHexagons = (): number => {
    let total = 0;

    Hive.instance?.rows.forEach((row) => {
      row.forEach(() => {
        total++;
      });
    });

    Hive.instance.totalHexagons = total;
    return total;
  };

  public addRow = (amountOfHexagons: number): void => {
    const row: Row = [];
    Hive.instance.rows.push(row);
    const isOdd = Hive.instance.rows.length % 2 !== 0;

    // console.log("[Add Row]: Is Odd: ", isOdd);

    // Check if its the 1st Row
    if (Hive.instance.rows.length === 0) {
      for (let i = 0; i < amountOfHexagons; i++) {
        row.push(new Hexagon({ row: 1, col: i + 1 }, 1));
      }
    }

    // Check if its an odd row
    if (isOdd) {
      for (let i = 0; i < amountOfHexagons; i++) {
        row.push(
          new Hexagon({ row: Hive.instance.rows.length, col: i + 1 }, 1)
        );
        this.totalHexagons++;
      }
    }

    // Check if its an even row
    if (!isOdd) {
      for (let i = 0; i < amountOfHexagons - 1; i++) {
        row.push(
          new Hexagon({ row: Hive.instance.rows.length, col: i + 1 }, 1)
        );
        this.totalHexagons++;
      }
    }
  };

  public activateHexagon = (hexagon: Hexagon): void => {
    Hive.instance.rows[hexagon.hivePos.row - 1][
      hexagon.hivePos.col - 1
    ].activate();
    Hive.instance.activatedHexagons.push(
      Hive.instance.rows[hexagon.hivePos.row - 1][hexagon.hivePos.col - 1]
    );
  };

  public calcCordsForHexagons = (): void => {
    Hive.instance.rows.forEach((row) => {
      row.forEach((hexagon) => {
        // Check if it belongs to an odd row
        if (hexagon.hivePos.row % 2 !== 0) {
          this.calcCordsForOddRow(hexagon);
        } else {
          //it belongs to an even row
          this.calcCordsForEvenRow(hexagon);
        }
      });
    });
  };

  private calcCordsForOddRow = (hexagon: Hexagon): void => {
    const x = (hexagon.hivePos.col - 1) * (2 * hexagon.apothem);
    hexagon.cords.x = roundTo(x, 3);

    const y = (hexagon.hivePos.row - 1) * (1.5 * hexagon.side);
    hexagon.cords.y = roundTo(y, 3);
  };

  private calcCordsForEvenRow = (hexagon: Hexagon): void => {
    const x =
      (hexagon.hivePos.col - 1) * (2 * hexagon.apothem) + hexagon.apothem;
    hexagon.cords.x = roundTo(x, 3);

    const y = (hexagon.hivePos.row - 1) * (1.5 * hexagon.side);
    hexagon.cords.y = roundTo(y, 3);
  };

  public execOperation(op: HiveOperation): number {
    if (op.type === "hex activation") {
      this.activateHexagon(Hive.instance.rows[op.pos.row - 1][op.pos.col - 1]);
      return -1;
    } else if (op.type === "get perimeter") {
      const targetHex = Hive.instance.rows[op.pos.row - 1][op.pos.col - 1];
      const connectedHexagons = this.getActiveConnectedHexagons(targetHex);
      const perimeter = this.getPerimeter(connectedHexagons);
      // console.log(
      //   `[Hive Operations] - Perimeter for Cell(${op.pos.row}, ${op.pos.col}): ${perimeter}`
      // );
      return perimeter;
    } else {
      throw new Error("execOperation -> Invalid Operation Type");
    }
  }

  public getActiveNeighbours(currentHex: Hexagon): Hexagon[] {
    const neighbours: Hexagon[] = [];

    // Step 1: Find all the neighbours
    this.activatedHexagons
      .filter(
        (actHex) =>
          !(
            actHex.hivePos.row === currentHex.hivePos.row &&
            actHex.hivePos.col === currentHex.hivePos.col
          )
      )
      .forEach((activatedHex) => {
        if (currentHex.isNeighbourWith(activatedHex)) {
          neighbours.push(activatedHex);
        }
      });

    // console.log("");
    // console.log("[getActiveNeighbours]: Target Hexagon: ", currentHex.hivePos);
    // console.log(
    //   "[getActiveNeighbours]: Its Neighbours: ",
    //   neighbours.map((hex) => hex.hivePos)
    // );
    // console.log("");

    return neighbours;
  }

  public getActiveConnectedHexagons(targetHex: Hexagon): ConnectedHexagon[] {
    if (targetHex.isActivated === false) return [];

    const unchecked: Set<Hexagon> = new Set();
    const checked: Set<Hexagon> = new Set();
    const connected: ConnectedHexagon[] = [];
    let current: Hexagon;

    // Initial Hexagon
    current = targetHex;
    const activeNeighbours = this.getActiveNeighbours(current);
    checked.add(current);
    activeNeighbours.forEach((hex) => unchecked.add(hex));
    connected.push({ ...cloneDeep(current), connectedTo: activeNeighbours });

    // console.log("            -=== INITIAL LOOKUP ===-");
    // console.log(
    //   `******************  (${current.hivePos.row}, ${current.hivePos.col})  *********************`
    // );
    // console.log("");

    // console.table({
    //   initialHexagon: current.hivePos,
    //   activeNeighbours: activeNeighbours.map((hex) => hex.hivePos),
    // });

    let i = 0;
    while (unchecked.size > 0) {
      const nextHexagon = unchecked.values().next().value;
      if (nextHexagon === undefined) {
        // console.log("Unchecked is empty");
        continue;
      }

      current = nextHexagon;
      unchecked.delete(current);
      checked.add(current);

      const activeNeighbours = this.getActiveNeighbours(current);
      activeNeighbours.forEach((hex) => {
        if (!checked.has(hex)) {
          unchecked.add(hex);
        }
      });

      connected.push({ ...current, connectedTo: activeNeighbours });

      // console.log("            -=== NESTED LOOKUP ===-");
      // console.log(
      //   `******************  (${current.hivePos.row}, ${current.hivePos.col})  *********************`
      // );
      // console.log("");
      // console.table({
      //   iteration: i,
      //   unchecked: Array.from(unchecked).map((hex) => hex.hivePos),
      //   checked: Array.from(checked).map((hex) => hex.hivePos),
      //   current: current.hivePos,
      //   activeNeighbours: activeNeighbours.map((hex) => hex.hivePos),
      // });

      i++;
    }

    return connected;
  }

  public getPerimeter = (allConnectedHexagon: ConnectedHexagon[]): number => {
    // console.log("");
    // console.log("--------------------------------------------");
    // console.log(
    //   "4. All Connected Hexagons: ",
    //   allConnectedHexagon.map((hex) => hex.hivePos)
    // );
    // console.log("--------------------------------------------");
    // console.log("");

    if (allConnectedHexagon.length === 0) {
      return 0;
    }

    if (allConnectedHexagon.length === 1) {
      return this.rows[0][0].side * 6;
    }

    return allConnectedHexagon.reduce((acc, hexagon) => {
      // console.log("5. Hexagon: ", hexagon.hivePos);
      // console.log("5. connectedTo: ", hexagon.connectedTo.length);
      // console.log("--------------------------------------------");
      // console.log("");
      return acc + (6 - hexagon.connectedTo.length);
    }, 0);
  };
}
