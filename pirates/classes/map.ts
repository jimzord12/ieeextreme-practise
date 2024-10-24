import {
  IArchipelagoMap,
  IIsland,
  ISea,
  LandTile,
  MapPotision,
  MapRow,
  MapSize,
  MapTileType,
  MyNode,
  SeaTile,
} from "../types.js";
import { MapTile } from "./tile.js";

export class ArchipelagoMap implements IArchipelagoMap {
  public islands: IIsland[] = [];
  public seas: ISea[] = [];
  public mapSize: MapSize = { rows: 0, columns: 0, totalTiles: 0 };
  public map: MapRow[] = [];
  public allLandTiles: LandTile[] = [];
  public allSeaTiles: SeaTile[] = [];
  public allNodes = new Set<MyNode>();
  public currentId = 0;
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
  public piratesTile: SeaTile | null = null;
  public treasureTile: SeaTile | null = null;

  public constructor(rows: number, columns: number) {
    this.mapSize = { rows, columns, totalTiles: rows * columns };

    // this.map = this.generateMap();
  }

  public setPiratesTile(tile: SeaTile) {
    this.piratesTile = tile;
  }

  public setTreasureTile(tile: SeaTile) {
    this.treasureTile = tile;
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
      const tile = new MapTile({ row: rowIndex, column: column + 1 }, type);

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
      console.log("\n1 - Unchecked Tiles: ", uncheckedTiles.size);
      const nextTile = uncheckedTiles.values().next().value;
      if (!nextTile) break;

      const { tiles } = this.findConnectedTiles(nextTile);

      if (tiles.length === 0) continue;

      const island = {
        id: ++this.currentId,
        tiles: tiles,
        connectedTo: new Set<number>(),
        type: "island",
        size: tiles.length,
      };

      islands.push(island);
      tiles.forEach((tile) => uncheckedTiles.delete(tile));
      // console.log("2 - Unchecked Tiles: ", uncheckedTiles.size);
    }

    this.islands = islands;
    islands.forEach((island, index) => {
      // console.log(`The Island ${index + 1}: `, island.tiles.length);
    });
    // console.log("Total Land Tiles: ", this.allLandTiles.length);
  }

  public createTheSeas(): void {
    const seas: ISea[] = [];
    const uncheckedTiles = new Set<MapTile>(this.allSeaTiles);

    while (uncheckedTiles.size > 0) {
      // console.log("\n(Seas) 1 - Unchecked Tiles: ", uncheckedTiles.size);
      const nextTile = uncheckedTiles.values().next().value;
      if (!nextTile) break;

      const { tiles } = this.findConnectedTiles(nextTile);

      if (tiles.length === 0) continue;

      const sea = {
        id: ++this.currentId,
        tiles: tiles,
        connectedTo: new Set<number>(),
        type: "sea",
        size: tiles.length,
      };

      seas.push(sea);
      tiles.forEach((tile) => uncheckedTiles.delete(tile));
      // console.log("(Seas) 2 - Unchecked Tiles: ", uncheckedTiles.size);
    }

    this.seas = seas;
    seas.forEach((sea, index) => {
      // console.log(`The sea ${index + 1}: `, sea.tiles.length);
    });
    // console.log("Total Water Tiles: ", this.allSeaTiles.length);
  }

  private findConnectedTiles(startingTile: MapTile): {
    tiles: MapTile[];
    type: MapTileType;
  } {
    const checkedTiles = new Set<MapTile>();
    const connectedTiles = new Set<MapTile>();
    const uncheckedTiles = new Set<MapTile>();
    let currentTile: MapTile = startingTile;

    const neighbours = this.findConnectedNeighbours(currentTile);
    // console.log("\nStarting Tile: ", startingTile.pos);
    // console.log("\nStarting Neighbours: ", neighbours.length);
    neighbours.forEach((nbr) => uncheckedTiles.add(nbr));
    checkedTiles.add(currentTile);
    connectedTiles.add(currentTile);

    let i = 0;
    while (uncheckedTiles.size > 0) {
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

    // console.log("");
    // console.log("1. findConnectedTiles: Unchecked Tiles: ", uncheckedTiles);
    // console.log("2. findConnectedTiles: Checked Tiles: ", checkedTiles);
    // console.log("3. findConnectedTiles: Connected Tiles: ", connectedTiles);
    // console.log("4. findConnectedTiles: Next Tile: ", currentTile);
    // console.log("");

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
      const xCord = tileCol + x - 1;
      const yCord = tileRow + y - 1;

      if (xCord < 0 || xCord >= this.mapSize.columns) continue;
      if (yCord < 0 || yCord >= this.mapSize.rows) continue;

      const neighbour = this.map[yCord][xCord];

      if (
        neighbour.pos.row === tile.pos.row &&
        neighbour.pos.column === tile.pos.column
      )
        continue;

      // console.log("\nCurrent: ", tile);
      // console.log("Neighbour: ", neighbour);

      if (tile.type === neighbour.type) {
        // console.log("Neighbour PASSED: ", neighbour);
        connectedNeighbours.push(neighbour);
      }
    }

    // console.log("Finished");
    return connectedNeighbours;
  }

  isConnectedWith(groupA: IIsland | ISea, groupB: IIsland | ISea): boolean {
    return groupA.connectedTo.has(groupB.id);
  }

  public find_islands_and_seas_connections(): void {
    this.islands.forEach((island) => {
      island.tiles.forEach((landTile) => {
        this.seas.some((sea) => {
          const _isConnected = landTile.isConnectedWithGroup(sea);
          if (_isConnected) {
            island.connectedTo.add(sea.id);
            return true;
          }
        });
      });
    });

    this.seas.forEach((sea) => {
      sea.tiles.forEach((seaTile) => {
        this.islands.some((island) => {
          // if (island.connectedTo.has(sea.id)) return true;

          const _isConnected = seaTile.isConnectedWithGroup(island);
          if (_isConnected) {
            sea.connectedTo.add(island.id);
            return true;
          }
        });
      });
    });
  }

  findPiratesSea(): ISea {
    if (this.piratesTile === null) throw new Error("Pirates' Tile is null");
    const sea = this.seas.find((sea) =>
      sea.tiles.some(
        (tile) =>
          tile.pos.row === this.piratesTile?.pos.row &&
          tile.pos.column === this.piratesTile?.pos.column
      )
    );
    if (sea === undefined) throw new Error(`Pirates' Sea not founds`);
    return sea;
  }

  findTreasureSea(): ISea {
    const sea = this.seas.find((sea) =>
      sea.tiles.some(
        (tile) =>
          tile.pos.row === this.treasureTile?.pos.row &&
          tile.pos.column === this.treasureTile?.pos.column
      )
    );
    if (sea === undefined) throw new Error("Treasure's Sea not founds");
    return sea;
  }

  private isTileConnectedWithGrp(tile: MapTile, grp: IIsland | ISea) {
    return grp.tiles.some((grpTile) => tile.isConnectedWith(grpTile));
  }

  private findConnectedGrps(grp: IIsland | ISea): IIsland[] | ISea[] {
    const connected = new Set<IIsland | ISea>();

    if (grp.type === "island") {
      grp.tiles.forEach((t) => {
        this.seas.forEach((s) => {
          if (this.isTileConnectedWithGrp(t, s) && !connected.has(s))
            connected.add(s);
        });
      });
    }

    if (grp.type === "sea") {
      grp.tiles.forEach((t) => {
        this.islands.forEach((i) => {
          if (this.isTileConnectedWithGrp(t, i) && !connected.has(i))
            connected.add(i);
        });
      });
    }

    return Array.from(connected);
  }

  public createNodes(
    grp: IIsland | ISea,
    prev: IIsland | ISea | null,
    visited: Set<number>
  ) {
    // If the group has already been visited, return early to avoid infinite recursion
    if (visited.has(grp.id)) {
      return;
    }

    // Mark this group as visited
    visited.add(grp.id);

    console.log("Current Grp ID: ", grp.id);

    const connectedGrps = this.findConnectedGrps(grp);
    console.log("ConnectedGrps before filter: ", connectedGrps);
    const filteredGrps = connectedGrps.filter((g) => {
      console.log("\n******************************************");
      console.log("Target Group ID: ", g.id);
      console.log("Target Group's PREV ID: ", prev?.id);
      console.log("Is True: ", !visited.has(g.id) && prev?.id !== g.id);

      return !visited.has(g.id) && prev?.id !== g.id;
    });

    console.log("\nConnected Groups: ", filteredGrps);
    this.allNodes.add({
      prev: prev,
      next: filteredGrps.length === 0 ? null : filteredGrps,
      self: grp,
    });

    filteredGrps.forEach((g) => this.createNodes(g, grp, visited));
  }

  public enhanceNodes() {
    this.allNodes.forEach((node) => {
      const { next, prev } = node;
      const newNextNodes: MyNode[] = [];

      if (next) {
        next.forEach((n) => {
          const nextNode = this.findNodeFromGrp(n as IIsland | ISea);
          if (nextNode) {
            newNextNodes.push(nextNode);
          }
        });

        node.next = newNextNodes;
      }

      if (prev) {
        const prevNode = this.findNodeFromGrp(prev as IIsland | ISea);
        if (prevNode) {
          node.prev = prevNode;
        }
      }
    });
  }

  private findNodeFromGrp(grp: IIsland | ISea): MyNode | undefined {
    return Array.from(this.allNodes).find((node) => node.self.id === grp.id);
  }

  // public convertMapTilesToNodes() {}
}

// Current:  MapTile { pos: { row: 3, column: 7 }, type: 'water' }
// Neighbour PASSED:  MapTile { pos: { row: 3, column: 9 }, type: 'water' }
