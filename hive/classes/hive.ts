import { Cords, Position } from "../types";
import { Hexagon } from "./hexagon";

type Row = Hexagon[];

export class Hive {
  static instance: Hive;
  public rows: Row[] = [];
  public totalHexagons: number = 0;
  public activatedHexagons: Hexagon[] = [];
  private currentReferenceHexagon: Hexagon | null = null;

  private constructor() {
    Hive.instance = this;
  }

  static getInstance = (): Hive => {
    if (!Hive.instance) {
      Hive.instance = new Hive();
    }

    return Hive.instance;
  };

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

    console.log("[Add Row]: Is Odd: ", isOdd);

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
    Hive.instance.rows.forEach((row, rowIndex) => {
      row.forEach((hexagon) => {
        if (
          !this.currentReferenceHexagon ||
          this.currentReferenceHexagon.cords.x === null ||
          this.currentReferenceHexagon.cords.y === null
        )
          throw new Error(
            "class Hexagon -> calcCordsForHexagons -> Hive.instance.rows.forEach: Reference Hexagon cords are null"
          );

        // /// Calculate the x and y cords
        // Check if its the 1st Hexagon in the Hive
        if (hexagon.hivePos.row === 0 && hexagon.hivePos.col === 0) {
          hexagon.cords.x = 0;
          hexagon.cords.y = 0;
          this.currentReferenceHexagon = hexagon;
          return;
        }

        // Check if it belongs to an odd row
        if (hexagon.hivePos.row % 2 !== 0) {
          this.calcCordsForOddRow(hexagon);

          // Make the 1st Hexagon in the next odd row the new reference hexagon
          if (
            hexagon.hivePos.row - this.currentReferenceHexagon.hivePos.row ===
            1
          ) {
            this.currentReferenceHexagon = hexagon;
          }
          return;
        } else {
          //it belongs to an even row
          this.calcCordsForEvenRow(hexagon);
        }
      });
    });
  };

  private calcCordsForOddRow = (hexagon: Hexagon): void => {
    if (
      !this.currentReferenceHexagon ||
      this.currentReferenceHexagon.cords.x === null ||
      this.currentReferenceHexagon.cords.y === null
    )
      throw new Error(
        "class Hexagon -> calcCordsForOddRow: Reference Hexagon cords are null"
      );

    hexagon.cords.x =
      this.currentReferenceHexagon.cords.x + 2 * hexagon.apothem;
    hexagon.cords.y = this.currentReferenceHexagon.cords.y;
  };

  private calcCordsForEvenRow = (hexagon: Hexagon): void => {
    if (
      this.currentReferenceHexagon === null ||
      this.currentReferenceHexagon.cords.x === null ||
      this.currentReferenceHexagon.cords.y === null
    )
      throw new Error(
        "class Hexagon -> calcCordsForEvenRow: Reference Hexagon cords are null"
      );

    // First calc K
    const k: Cords = { x: 0, y: 0 };
    k.x = this.currentReferenceHexagon.cords.x;
    k.y = 1.5 * hexagon.side + this.currentReferenceHexagon.cords.y;

    // Then calc the x and y cords
    hexagon.cords.x = k.x + hexagon.apothem;
    hexagon.cords.y = k.y;
  };
}
