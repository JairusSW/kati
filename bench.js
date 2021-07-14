const b = require("benny");

const Kati = require("./");

const Flatted = require("flatted");

const Json5 = require("json5");

const object = {
  hello: "world",
  answer: 42,
};
const array = ["hello", "world"];
const number = 3.14;
const string = "helloworld";

const obj = `{"hello":"world","answer":42}`;
const arr = `["hello","world","answer",42]`;
const num = `3.14`;
const str = `"helloworldanswer42"`;
// NOTE: Tiny things, because its geared for small data packets in things such as WebSockets or Networking.\

b.suite(
  "Kati vs. JSON (Array)",

  /*b.add('Kati Serialize', () => {
    Kati.stringify.fromArray(array)
  }),

  b.add('JSON Serialize', () => {
    JSON.stringify(array)
  }),*/

  b.add("Kati Parse", () => {
    Kati.parse(arr);
  }),

  b.add("JSON Parse", () => {
    JSON.parse(arr);
  }),
  b.cycle(),
  b.complete(),
  b.save({ file: "array", version: "1.0.0" }),
  b.save({ file: "array", format: "chart.html" })
),

  b.suite(
    "Kati vs. JSON (Object)",
    b.add('Kati Serialize', () => {
      Kati.stringify(object)
    }),

    b.add('JSON Serialize', () => {
      JSON.stringify(object)
    }),
    b.add("Kati Parse", () => {
      Kati.parse(obj);
    }),

    b.add("JSON Parse", () => {
      JSON.parse(obj);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "object", version: "1.0.0" }),
    b.save({ file: "object", format: "chart.html" })
  ),

  b.suite(
    "Kati vs. JSON (String)",

    b.add('Kati Serialize', () => {
      Kati.stringify(string)
    }),

    b.add('JSON Serialize', () => {
      JSON.stringify(string)
    }),

    b.add("Kati Parse", () => {
      Kati.parse(str);
    }),

    b.add("JSON Parse", () => {
      JSON.parse(str);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "string", version: "1.0.0" }),
    b.save({ file: "string", format: "chart.html" })
  ),

  b.suite(
    "Kati vs. JSON (Number)",

    b.add('Kati Serialize', () => {
      Kati.stringify(number)
    }),

    b.add('JSON Serialize', () => {
      JSON.stringify(number)
    }),

    b.add("Kati Parse", () => {
      Kati.parse(num);
    }),

    b.add("JSON Parse", () => {
      JSON.parse(num);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "number", version: "1.0.0" }),
    b.save({ file: "number", format: "chart.html" })
  )