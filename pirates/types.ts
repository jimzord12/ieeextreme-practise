import { MapTile } from "./classes/tile.js";

// This type is required by the template and should NOT be removed/changed.
export type StdinInput = {
  inputStdin: string;
  inputCursor: number;
};

export interface IArchipelagoMap {
  islands: IIsland[];
  seas: ISea[];
  mapSize: MapSize;
  map: IMapTile[][];
}

export interface MyNode {
  next: MyNode[] | IIsland[] | ISea[] | null;
  prev: MyNode | IIsland | ISea | null;
  self: IIsland | ISea;
}

export type MapRow = MapTile[];

export interface MapSize {
  rows: number;
  columns: number;
  totalTiles: number;
}

export interface IMapTile {
  pos: MapPotision;
  type: MapTileType;
}

export interface LandTile extends MapTile {
  type: "land";
}

export interface SeaTile extends MapTile {
  type: "water";
}

export interface IIsland {
  id: number;
  tiles: MapTile[];
  connectedTo: Set<number>;
  type: string;
  size: number;
}

export interface ISea {
  id: number;
  tiles: MapTile[];
  connectedTo: Set<number>;
  type: string;
  size: number;
}

export type MapTileType = "water" | "land";

export interface MapPotision {
  row: number;
  column: number;
}

export type Query = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
