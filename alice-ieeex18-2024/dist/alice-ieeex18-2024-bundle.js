"use strict";
var __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __copyProps = (e, t, n, r) => {
    if ((t && "object" == typeof t) || "function" == typeof t)
      for (let o of __getOwnPropNames(t))
        __hasOwnProp.call(e, o) ||
          o === n ||
          __defProp(e, o, {
            get: () => t[o],
            enumerable: !(r = __getOwnPropDesc(t, o)) || r.enumerable,
          });
    return e;
  },
  __toESM = (e, t, n) => (
    (n = null != e ? __create(__getProtoOf(e)) : {}),
    __copyProps(
      !t && e && e.__esModule
        ? n
        : __defProp(n, "default", { value: e, enumerable: !0 }),
      e
    )
  ),
  import_readline = __toESM(require("readline"), 1),
  import_crypto = require("crypto"),
  isWhitespace = (e) => " \t\n\r\v".includes(e),
  clearWhitespaces = (e) => {
    for (
      ;
      e.inputCursor < e.inputStdin.length &&
      isWhitespace(e.inputStdin[e.inputCursor]);

    )
      e.inputCursor++;
  },
  nextString = (e) => {
    clearWhitespaces(e);
    let t = "";
    for (
      ;
      e.inputCursor < e.inputStdin.length &&
      !isWhitespace(e.inputStdin[e.inputCursor]);

    )
      t += e.inputStdin[e.inputCursor++];
    return t;
  },
  nextInt = (e) => parseInt(nextString(e), 10),
  hashTable = (e) =>
    (0, import_crypto.createHash)("md5")
      .update(e.flat().join(""))
      .digest("hex");
function main(e) {
  const t = nextInt(e);
  (t < 1 || t > 2e3) && console.log(0);
  const n = new Set(),
    r = new Set();
  for (let t = 0; t < 2; t++) {
    const o = nextInt(e);
    for (let s = 0; s < o; s++) 0 === t ? n.add(nextInt(e)) : r.add(nextInt(e));
  }
  const o = createIncreasingTable(t);
  findRootNode(o, n, r);
  const s = new Set([hashTable(o)]);
  let i = o;
  for (let e = 0; e < t - 1; e++) {
    let t = i[0][e + 1],
      o = i[1][e];
    if (n.has(t) || r.has(o)) continue;
    (i[0][e + 1] = o), (i[1][e] = t);
    const p = hashTable(i);
    s.has(p) || s.add(p);
  }
  console.log(s.size);
}
var findRootNode = (e, t, n) => {
    t.forEach((n) => {
      if (!e[0].includes(n)) {
        e[0].push(n), e[0].sort((e, t) => e - t);
        const r = findElementToRemoveForFirstRow(e[0], t);
        e[0].splice(e[0].indexOf(r), 1),
          e[0].reverse(),
          e[1].push(r),
          e[1].sort((e, t) => e - t),
          e[1].splice(e[1].indexOf(n), 1);
      }
    }),
      n.forEach((t, r) => {
        if (!e[1].includes(t)) {
          e[1].push(t), e[1].sort((e, t) => e - t);
          const r = findElementToRemoveForSecondRow(e[1], n);
          e[1].splice(e[1].indexOf(r), 1),
            e[0].push(r),
            e[0].sort((e, t) => e - t),
            e[0].splice(e[0].indexOf(t), 1);
        }
      });
  },
  findElementToRemoveForFirstRow = (e, t) => {
    let n;
    return (
      e
        .reverse()
        .every((e, r) => !!t.has(e) || (t.has(e) ? void 0 : ((n = e), !1))),
      n
    );
  },
  findElementToRemoveForSecondRow = (e, t) => {
    let n;
    return (
      e.every((e, r) => !!t.has(e) || (t.has(e) ? void 0 : ((n = e), !1))), n
    );
  },
  createIncreasingTable = (e) => {
    const t = new Array(2 * e).fill(0).map((e, t) => t + 1);
    return [t.splice(0, t.length / 2), t];
  },
  rl = import_readline.default.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  stdinInput = { inputStdin: "", inputCursor: 0 };
rl.on("line", (e) => {
  stdinInput.inputStdin += e + "\n";
}),
  rl.on("close", () => {
    main(stdinInput);
  });
