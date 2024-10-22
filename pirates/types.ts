export interface IArchipelagoMap {
  islands: Island[];
  seas: Sea[];
  mapSize: MapSize;
  map: MapTile[][];
}

export type MapRow = MapTile[];

export interface MapSize {
  rows: number;
  columns: number;
  totalTiles: number;
}

export interface MapTile {
  pos: MapPotision;
  type: MapTileType;
}

export interface Island {
  landTiles: MapTile[];
  connectedTo: Sea[];
}

export interface Sea {
  waterTiles: MapTile[];
  connectedTo: Island[];
}

export type MapTileType = "water" | "land" | "unknown";

export interface MapPotision {
  row: number;
  column: number;
}
