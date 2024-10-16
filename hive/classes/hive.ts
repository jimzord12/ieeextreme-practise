import { Hexagon } from "./hexagon";

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
}
