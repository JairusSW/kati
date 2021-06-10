const benchmark = require("benchmark");

const suite = new benchmark.Suite();

const kati = require('.')

const obj = {
  hello: "world",
  answer: 42,
};
const arr = ["hello", "world", "answer", 42];
const num = 3.14;
const str = "helloworldanswer42";

suite.add('Array', () => {
    kati.stringify.fromArray(arr)
})

suite.add('Number', () => {
    kati.stringify.fromNumber(num)
})

suite.add('String', () => {
    kati.stringify.fromString(str)
})

suite.add('Object', () => {
    kati.stringify.fromObject(obj)
})

suite.on('cycle', (cycle) => {
    console.log(cycle.target.toString())
})

suite.run()