#!/usr/bin/env node

let array: number[] = [];
let set: Set<number> = new Set<number>();

const main = async () => {
  try {
    // Read all input at once from stdin
    const input = await new Promise<string>((resolve) => {
      let data = "";
      process.stdin.on("data", (chunk) => {
        data += chunk;
      });
      process.stdin.on("end", () => resolve(data));
    });

    // Split input into lines
    const [sizeInput, arrInput, setInput] = input.trim().split("\n");

    // Process the sizes
    const [arrSize, setSize] = sizeInput.split(" ").map(Number);
    console.log(`Array Size: ${arrSize}, Set Size: ${setSize}`);

    const array = arrInput.split(" ").map(Number);
    console.log(`The Array: ${array}`);

    const set = new Set(setInput.split(" ").map(Number));
    console.log(`The Set Size: ${set.size} | Set Values: ${Array.from(set)}`);

    if (array.length === arrSize && set.size === setSize) {
      minPermutation(array, set);
    }
  } catch (error) {
    console.error("An error occurred while processing the input.", error);
  }
};

export const minPermutation = (arr: number[], set: Set<number>): number[] => {
  const sortedSet = Array.from(set).sort();
  const tempArr = [...arr];

  sortedSet.forEach((setEl, i) => {
    for (const [arrIndex, arrEl] of tempArr.entries()) {
      if (setEl < arrEl) {
        tempArr.splice(arrIndex, 0, setEl);

        break;
      }
    }
  });

  console.log("Result: ", tempArr);
  return tempArr;
};

main();
