import { type } from "os";
import {
  IArchipelagoMap,
  IIsland,
  ISea,
  LandTile,
  MapPotision,
  MapRow,
  MapSize,
  MapTileType,
  SeaTile,
} from "../types";
import { MapTile } from "./tile";

export class ArchipelagoMap implements IArchipelagoMap {
  public islands: IIsland[] = [];
  public seas: ISea[] = [];
  public mapSize: MapSize = { rows: 0, columns: 0, totalTiles: 0 };
  public map: MapRow[] = [];
  public allLandTiles: LandTile[] = [];
  public allSeaTiles: SeaTile[] = [];
  private static directions = [
    { row: 0, column: -1 }, // left
    { row: 0, column: 1 }, // right
    { row: -1, column: 0 }, // up
    { row: 1, column: 0 }, // down
    { row: 1, column: 1 }, // down-right
    { row: 1, column: -1 }, // down-left
    { row: -1, column: 1 }, // up-right
    { row: -1, column: -1 }, // up-left
  ];

  public constructor(rows: number, columns: number) {
    this.mapSize = { rows, columns, totalTiles: rows * columns };

    // this.map = this.generateMap();
  }

  public generateMap(mapSymbols: string): void {
    const rows = mapSymbols.split("\n");

    rows.forEach((rowSymbols, rowIndex) => {
      this.map.push(this.generateMapRow(rowSymbols, rowIndex));
    });

    this.map = rows.map((rowSymbols, rowIndex) =>
      this.generateMapRow(rowSymbols, rowIndex)
    );
  }

  public generateMapRow(rowSymbols: string, rowIndex: number): MapRow {
    const tiles = rowSymbols.split("");

    const mapRow = tiles.map((tileSymbol, column) => {
      const type = tileSymbol === "O" ? "land" : "water";
      const tile = new MapTile({ row: rowIndex, column }, type);

      if (type === "land") {
        this.allLandTiles.push(tile as LandTile);
      } else {
        this.allSeaTiles.push(tile as SeaTile);
      }

      return tile;
    });

    this.map.push(mapRow);
    return mapRow;
  }

  public createTheIslands(): void {
    const islands: IIsland[] = [];
    const uncheckedTiles = new Set<MapTile>(this.allLandTiles);

    while (uncheckedTiles.size > 0) {
      const nextTile = uncheckedTiles.values().next().value;
      if (!nextTile) break;

      const { tiles } = this.findConnectedTiles(nextTile);

      if (tiles.length === 0) continue;

      const island = {
        landTiles: tiles,
        connectedTo: [],
      };

      islands.push(island);
      tiles.forEach((tile) => uncheckedTiles.delete(tile));
    }

    this.islands = islands;
  }

  public craeteTheSeas(): void {
    const seas: ISea[] = [];
    const uncheckedTiles = new Set<MapTile>(this.allSeaTiles);

    while (uncheckedTiles.size > 0) {
      const nextTile = uncheckedTiles.values().next().value;
      if (!nextTile) break;

      const { tiles } = this.findConnectedTiles(nextTile);

      if (tiles.length === 0) continue;

      const sea = {
        waterTiles: tiles,
        connectedTo: [],
      };

      seas.push(sea);
      tiles.forEach((tile) => uncheckedTiles.delete(tile));
    }

    this.seas = seas;
  }

  private findConnectedTiles(startingTile: MapTile): {
    tiles: MapTile[];
    type: MapTileType;
  } {
    const checkedTiles = new Set<MapTile>();
    const connectedTiles = new Set<MapTile>();
    const uncheckedTiles = new Set<MapTile>();
    let currentTile: MapTile = startingTile as MapTile;

    const neighbours = this.findConnectedNeighbours(currentTile);
    neighbours.forEach((nbr) => uncheckedTiles.add(nbr));
    checkedTiles.add(currentTile);
    connectedTiles.add(currentTile);

    let i = 0;
    while (uncheckedTiles.size > 0 || i < 10) {
      uncheckedTiles.forEach((t) => {
        uncheckedTiles.delete(t);
        checkedTiles.add(t);
        connectedTiles.add(t);

        this.findConnectedNeighbours(t).forEach((nbr) => {
          if (checkedTiles.has(nbr)) return;
          uncheckedTiles.add(nbr);
        });
      });

      const nextTile = uncheckedTiles.values().next().value;
      if (!nextTile) break;
      currentTile = nextTile;
      i++;
    }

    console.log("");
    console.log("1. findConnectedTiles: Unchecked Tiles: ", uncheckedTiles);
    console.log("2. findConnectedTiles: Checked Tiles: ", checkedTiles);
    console.log("3. findConnectedTiles: Connected Tiles: ", connectedTiles);
    console.log("4. findConnectedTiles: Next Tile: ", currentTile);
    console.log("");

    if (connectedTiles.size < 2) return { tiles: [], type: "land" };

    return {
      tiles: Array.from(connectedTiles),
      type: currentTile.type,
    };
  }

  private findConnectedNeighbours(tile: MapTile): MapTile[] {
    const connectedNeighbours: MapTile[] = [];
    const { row: tileRow, column: tileCol } = tile.pos;

    for (let index = 0; index < ArchipelagoMap.directions.length; index++) {
      const { row: y, column: x } = ArchipelagoMap.directions[index];
      const xCord = tileCol + x;
      const yCord = tileRow + y;

      if (xCord < 0 || xCord >= this.mapSize.columns) continue;
      if (yCord < 0 || yCord >= this.mapSize.rows) continue;

      const neighbour = this.map[tileRow + y][tileCol + x];

      if (!neighbour || JSON.stringify(neighbour) === JSON.stringify(tile))
        continue;

      console.log("\nCurrent: ", tile);
      console.log("Neighbour: ", neighbour);

      if (tile.type === neighbour.type && tile.isConnectedWith(neighbour)) {
        console.log("Neighbour PASSED: ", neighbour);
        connectedNeighbours.push(neighbour);
      }
    }

    console.log("Finished");
    return connectedNeighbours;
  }
}
