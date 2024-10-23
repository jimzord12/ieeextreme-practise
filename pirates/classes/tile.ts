import { IMapTile, MapPotision, MapTileType } from "../types";

export class MapTile implements IMapTile {
  public pos: MapPotision;
  public type: MapTileType;

  public constructor(pos: MapPotision, type: MapTileType) {
    this.pos = pos;
    this.type = type;
  }

  public get isLand(): boolean {
    return this.type === "land";
  }

  public get isWater(): boolean {
    return this.type === "water";
  }

  public isConnectedWith(comparisonTile: MapTile): boolean {
    return (
      this.isConnectedHorizontally(comparisonTile) ||
      this.isConnectedVertically(comparisonTile) ||
      this.isConnectedDiagonally(comparisonTile)
    );
  }

  private isConnectedHorizontally(comparisonTile: MapTile): boolean {
    return (
      this.pos.row === comparisonTile.pos.row &&
      (this.pos.column === comparisonTile.pos.column + 1 ||
        this.pos.column === comparisonTile.pos.column - 1)
    );
  }

  private isConnectedVertically(comparisonTile: MapTile): boolean {
    return (
      this.pos.column === comparisonTile.pos.column &&
      (this.pos.row === comparisonTile.pos.row + 1 ||
        this.pos.row === comparisonTile.pos.row - 1)
    );
  }

  private isConnectedDiagonally(comparisonTile: MapTile): boolean {
    return (
      (this.pos.row === comparisonTile.pos.row + 1 &&
        this.pos.column === comparisonTile.pos.column + 1) ||
      (this.pos.row === comparisonTile.pos.row - 1 &&
        this.pos.column === comparisonTile.pos.column - 1) ||
      (this.pos.row === comparisonTile.pos.row + 1 &&
        this.pos.column === comparisonTile.pos.column - 1) ||
      (this.pos.row === comparisonTile.pos.row - 1 &&
        this.pos.column === comparisonTile.pos.column + 1)
    );
  }
}
