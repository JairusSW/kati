const b = require("benny");

const Kati = require("./");

const Flatted = require("flatted");

const Json5 = require("json5");

const val = '-ha'
const object = {
  i1: `ha`,
  i2: `ha`,
  i3: `ha`,
  i4: `ha`,
  i5: `ha`,
  i6: `ha`,
  i7: `ha`,
  i8: `ha`,
  i9: `ha`,
  i10: `ha`,
  i11: `ha`,
  i12: `ha`,
  i13: `ha`,
  i14: `ha`,
  i15: `ha`,
  i16: `ha`,
  i17: `ha`,
  i18: `ha`,
  i19: `ha`,
  i20: `ha`,
  i21: `ha`,
  i22: `ha`,
  i23: `ha`,
  i24: `ha`,
  i25: `ha`,
  i26: `ha`,
  i27: `ha`,
  i28: `ha`,
  i29: `ha`,
  i30: `ha`,
  i31: `ha`,
};
//Try using string addition vs t
const array = ["hello", "world"];
const number = 3.14;
const string = "helloworld";

const obj = `{"hello":"world"}`;
const arr = `["hello","world"]`;
const num = `3.14`;
const str = `"helloworld"`;
// NOTE: Tiny things, because its geared for small data packets in things such as WebSockets or Networking.\

b.suite(
  "Kati vs. JSON (Object)",
  b.add(`Kati Serialize`, () => {
    Kati.stringify(object)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(object)
  }),
  // Just focus on stringifying
  /*b.add("Kati Parse", () => {
    Kati.parse(obj);
  }),

  b.add("JSON Parse", () => {
    JSON.parse(obj);
  }),*/

  b.cycle(),
  b.complete(),
  b.save({ file: "object", version: "1.0.0" }),
  b.save({ file: "object", format: "chart.html" })
)