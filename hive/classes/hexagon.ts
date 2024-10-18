import { Cords, IHexagon, Position } from "../types";

export class Hexagon implements IHexagon {
  public cords: Cords;
  public hivePos: { row: number; col: number };
  public side: number;
  public isActivated: boolean = false;
  public apothem: number;

  constructor(pos: Position, side: number) {
    this.cords = { x: null, y: null };
    this.hivePos = pos;
    this.side = side;
    this.apothem = this.getApothem(side);

    // /// Calculate the x and y cords
    // // Check if its the 1st Hexagon in the Hive
    // if (this.hivePos.row === 0 && this.hivePos.col === 0) {
    //   this.cords.x = 0;
    //   this.cords.y = 0;
    //   return;
    // }

    // // Check if its an odd row
    // if (this.hivePos.row % 2 !== 0) {
    //   this.cords.x = (this.hivePos.col - 1) + (this.side * 3);
    //   this.cords.y = (this.hivePos.row - 1) * (this.apothem * 2);
    //   return;
    // }
  }

  public getApothem = (hexagonSide: number): number => {
    return (hexagonSide * Math.sqrt(3)) / 2;
  };

  public activate = (): void => {
    this.isActivated = true;
  };
}
