export interface IHexagon {
  x: number;
  y: number;
  radius: number;
  side: number;
  isActivated: boolean;
  getRadius(hexagonEdge: number): number;
  activate(): void;
}
