import { StdinInput } from "./types.js";
import { hashTable, nextInt, nextString } from "./utils.js";
import { forEach, has, reverse } from "lodash";

export function main(stdinInput: StdinInput): void {
  const N = nextInt(stdinInput);

  if (N < 1 || N > 2000) console.log(0);
  const A: Set<number> = new Set();
  const B: Set<number> = new Set();

  for (let i = 0; i < 2; i++) {
    const amount_of_restrictions_per_row = nextInt(stdinInput);
    for (let j = 0; j < amount_of_restrictions_per_row; j++) {
      if (i === 0) A.add(nextInt(stdinInput));
      else B.add(nextInt(stdinInput));
    }
  }
  const table = createIncreasingTable(N);

  findRootNode(table, A, B);

  const checkedTablesHashes: Set<string> = new Set([hashTable(table)]);
  // let queque: number[][] = [];
  let current = table;

  for (let i = 0; i < N - 1; i++) {
    let a = current[0][i + 1];
    let b = current[1][i];

    // console.log(`(${i}) - ${a} - ${b}`);
    if (A.has(a) || B.has(b)) continue;

    current[0][i + 1] = b;
    current[1][i] = a;

    const hash = hashTable(current);

    // console.log(`(${i}) - ${hash} - ${current}`);

    if (!checkedTablesHashes.has(hash)) {
      checkedTablesHashes.add(hash);
    }
  }

  console.log(checkedTablesHashes.size);
}

const findRootNode = (table: number[][], A: Set<number>, B: Set<number>) => {
  A.forEach((value) => {
    if (!table[0].includes(value)) {
      table[0].push(value);
      table[0].sort((a, b) => a - b);
      const elToRemove = findElementToRemoveForFirstRow(table[0], A);
      table[0].splice(table[0].indexOf(elToRemove!), 1);
      table[0].reverse();
      table[1].push(elToRemove!);
      table[1].sort((a, b) => a - b);
      table[1].splice(table[1].indexOf(value), 1);
    }
  });

  B.forEach((value, index) => {
    if (!table[1].includes(value)) {
      table[1].push(value);
      table[1].sort((a, b) => a - b);
      const elToRemove = findElementToRemoveForSecondRow(table[1], B);
      table[1].splice(table[1].indexOf(elToRemove!), 1);
      table[0].push(elToRemove!);
      table[0].sort((a, b) => a - b);
      table[0].splice(table[0].indexOf(value), 1);
    }
  });
};

const findElementToRemoveForFirstRow = (row: number[], A: Set<number>) => {
  // const selectedEl = row[insertedIndex];
  let toBeRemoved;

  row.reverse().every((el, i) => {
    if (A.has(el)) return true;
    if (!A.has(el)) {
      toBeRemoved = el;
      return false;
    }
  });

  return toBeRemoved;
};

const findElementToRemoveForSecondRow = (row: number[], B: Set<number>) => {
  let toBeRemoved;

  row.every((el, i) => {
    if (B.has(el)) return true;
    if (!B.has(el)) {
      toBeRemoved = el;
      return false;
    }
  });

  return toBeRemoved;
};

const createIncreasingTable = (cols: number) => {
  const row2 = new Array(cols * 2).fill(0).map((_, i) => i + 1);
  const row1 = row2.splice(0, row2.length / 2);
  return [row1, row2];
};
