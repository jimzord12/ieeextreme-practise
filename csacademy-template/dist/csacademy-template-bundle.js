"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// csacademy-template/entry.ts
var import_readline = __toESM(require("readline"));

// csacademy-template/utils.ts
var isWhitespace = (character) => " 	\n\r\v".includes(character);
var clearWhitespaces = (stdinInput2) => {
  while (stdinInput2.inputCursor < stdinInput2.inputStdin.length && isWhitespace(stdinInput2.inputStdin[stdinInput2.inputCursor])) {
    stdinInput2.inputCursor++;
  }
};
var nextString = (stdinInput2) => {
  clearWhitespaces(stdinInput2);
  let nextString2 = "";
  while (stdinInput2.inputCursor < stdinInput2.inputStdin.length && !isWhitespace(stdinInput2.inputStdin[stdinInput2.inputCursor])) {
    nextString2 += stdinInput2.inputStdin[stdinInput2.inputCursor++];
  }
  return nextString2;
};
var nextInt = (stdinInput2) => parseInt(nextString(stdinInput2), 10);

// csacademy-template/main.ts
function main(stdinInput2) {
  const N = nextInt(stdinInput2);
  const M = nextInt(stdinInput2);
  const Q = nextInt(stdinInput2);
  console.log("The Inputs: [N]: ", N);
  console.log("The Inputs: [M]: ", M);
  console.log("The Inputs: [Q]: ", Q);
  const map = [];
  for (let i = 0; i < N; i++) {
    map.push(nextString(stdinInput2));
  }
  console.log("\nMap: ", map);
  const queries = [];
  for (let i = 0; i < Q; i++) {
    const x1 = nextInt(stdinInput2);
    const y1 = nextInt(stdinInput2);
    const x2 = nextInt(stdinInput2);
    const y2 = nextInt(stdinInput2);
    queries.push({ x1, y1, x2, y2 });
  }
  queries.forEach((query) => {
    console.log(
      `
Query from (${query.x1}, ${query.y1}) to (${query.x2}, ${query.y2})`
    );
  });
}

// csacademy-template/entry.ts
var rl = import_readline.default.createInterface({
  input: process.stdin,
  output: process.stdout
});
var stdinInput = {
  inputStdin: "",
  inputCursor: 0
};
rl.on("line", (input) => {
  stdinInput.inputStdin += input + "\n";
});
rl.on("close", () => {
  main(stdinInput);
});
//# sourceMappingURL=csacademy-template-bundle.js.map
