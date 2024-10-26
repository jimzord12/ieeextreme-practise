"use strict";
var __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __copyProps = (e, t, n, o) => {
    if ((t && "object" == typeof t) || "function" == typeof t)
      for (let p of __getOwnPropNames(t))
        __hasOwnProp.call(e, p) ||
          p === n ||
          __defProp(e, p, {
            get: () => t[p],
            enumerable: !(o = __getOwnPropDesc(t, p)) || o.enumerable,
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
  hasCommonTemp = (e, t) => e.lowTemp <= t.highTemp && e.highTemp >= t.lowTemp,
  checkAndPutToFridge = (e, t, n) =>
    0 === t.substances.length
      ? (t.substances.push(e),
        (t.lowTemp = e.lowTemp),
        (t.highTemp = e.highTemp),
        1)
      : hasCommonTemp(t, e)
      ? (t.substances.push(e),
        (t.lowTemp = Math.max(t.lowTemp, e.lowTemp)),
        (t.highTemp = Math.min(t.highTemp, e.highTemp)),
        1)
      : 0 === n.substances.length
      ? (n.substances.push(e),
        (n.lowTemp = e.lowTemp),
        (n.highTemp = e.highTemp),
        1)
      : hasCommonTemp(n, e)
      ? (n.substances.push(e),
        (n.lowTemp = Math.max(n.lowTemp, e.lowTemp)),
        (n.highTemp = Math.min(n.highTemp, e.highTemp)),
        1)
      : -1;
function main(e) {
  const t = nextInt(e);
  if (t > 100 || t <= 0) return void console.log(-1);
  const n = [];
  for (let o = 0; o < t; o++) {
    const t = nextInt(e),
      o = nextInt(e);
    if (t < -100 || t > 100 || o < -100 || o > 100) return void console.log(-1);
    n.push({ lowTemp: t, highTemp: o });
  }
  const o = { substances: [], lowTemp: 0, highTemp: 0 },
    p = { substances: [], lowTemp: 0, highTemp: 0 };
  let s = !1;
  n.every((e) => ((s = -1 === checkAndPutToFridge(e, o, p)), !s)),
    s
      ? console.log(-1)
      : 0 === p.substances.length
      ? console.log(`${o.lowTemp} ${o.lowTemp}`)
      : console.log(`${o.lowTemp} ${p.lowTemp}`);
}
var rl = import_readline.default.createInterface({
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
