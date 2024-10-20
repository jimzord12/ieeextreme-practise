import { Cords, IHexagon, Position } from "../types";
import { getDistance2D } from "../utils";

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
  }

  public getApothem = (hexagonSide: number): number => {
    return (hexagonSide * Math.sqrt(3)) / 2;
  };

  public activate = (): void => {
    this.isActivated = true;
  };

  isNeighbourWith = (otherHexagon: Hexagon) => {
    if (this.cords.x === null || this.cords.y === null) {
      throw new Error(
        `isNeighbourWith -> This hexagon: (${this.hivePos.row}, ${this.hivePos.col}) cords are null`
      );
    }

    if (otherHexagon.cords.x === null || otherHexagon.cords.y === null) {
      throw new Error(
        `isNeighbourWith -> Other hexagons: (${otherHexagon.hivePos.row}, ${otherHexagon.hivePos.col}):  cords are null`
      );
    }

    const distance = getDistance2D(
      this.cords.x,
      this.cords.y,
      otherHexagon.cords.x,
      otherHexagon.cords.y
    );

    return distance <= this.apothem * 2;
  };
}
