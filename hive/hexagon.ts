import { IHexagon } from "./types";

export class Hexagon implements IHexagon {
  public x: number;
  public y: number;
  public radius: number;
  public side: number;
  public isActivated: boolean = false;

  constructor(x: number, y: number, side: number) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.radius = this.getRadius(side);
  }

  public getRadius = (hexagonEdge: number): number => {
    return (Math.pow(hexagonEdge, 2) / 4) * Math.sqrt(3);
  };

  public activate = (): void => {
    this.isActivated = true;
  };
}
