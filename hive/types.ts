export interface Cords {
  x: number | null;
  y: number | null;
}

export interface Position {
  row: number;
  col: number;
}

export interface IHexagon {
  cords: Cords;
  hivePos: Position;
  apothem: number;
  side: number;
  isActivated: boolean;
  getApothem(hexagonSide: number): number;
  activate(): void;
}
