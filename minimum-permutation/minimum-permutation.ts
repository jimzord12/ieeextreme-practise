import { askQuestion, closeReadline } from "../utils/utils";

let array: number[] = [];
let set: Set<number> = new Set<number>();

const main = async () => {
  try {
    const sizeInput = await askQuestion(
      "Please a size for the <Array> and then for the <Set>. E.g: 3 2: "
    );
    const [arrSize, setSize] = sizeInput.split(" ").map(Number);
    console.log(`Array Size: ${arrSize}, Set Size: ${setSize}`);

    if (isNaN(arrSize) || isNaN(setSize)) {
      console.error(
        "Invalid sizes entered. Please enter two numbers separated by a space."
      );
      closeReadline();
      return;
    }

    const arrInput = await askQuestion(
      "Please enter the Elements for the ARRAY. E.g: 3 1 5: "
    );
    array = arrInput.split(" ").map(Number);
    console.log(`The Array: ${array}`);

    if (array.length !== arrSize) {
      console.error("Invalid number of elements entered for the array.");
      closeReadline();
      return;
    }

    const setInput = await askQuestion(
      "Please enter the Elements for the SET. E.g: 4 2: "
    );
    set = new Set(setInput.split(" ").map(Number));
    console.log(`The Set Size: ${set.size} | Set Values: ${Array.from(set)}`);

    if (set.size !== setSize) {
      console.error("Invalid number of elements entered for the set.");
      closeReadline();
      return;
    }

    minPermutation(array, set);
    closeReadline();
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
