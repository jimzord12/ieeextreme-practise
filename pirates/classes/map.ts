import {
  IArchipelagoMap,
  Island,
  MapPotision,
  MapRow,
  MapSize,
  MapTile,
  MapTileType,
  Sea,
} from "../types";

export class ArchipelagoMap implements IArchipelagoMap {
  public islands: Island[] = [];
  public seas: Sea[] = [];
  public mapSize: MapSize = { rows: 0, columns: 0, totalTiles: 0 };
  public map: MapRow[] = [];

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
    const tiles = rowSymbols.split(" ");

    const mapRow = tiles.map((tileSymbol, column) => ({
      pos: { row: rowIndex, column },
      type: tileSymbol === "o" ? "land" : ("water" as MapTileType),
    }));

    this.map.push(mapRow);
    return mapRow;
  }
}
