import { MapTile } from "./classes/tile";

export interface IArchipelagoMap {
  islands: IIsland[];
  seas: ISea[];
  mapSize: MapSize;
  map: IMapTile[][];
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
  landTiles: IMapTile[];
  connectedTo: ISea[];
}

export interface ISea {
  waterTiles: IMapTile[];
  connectedTo: IIsland[];
}

export type MapTileType = "water" | "land";

export interface MapPotision {
  row: number;
  column: number;
}
