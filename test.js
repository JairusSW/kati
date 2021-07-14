const kati = require('./')

const str = 'Hello World "_"'

const num = 1234567890

const bool = true

const arr = ["Hello", "World", [3.14,["Dinosaurs",["Are", "Awesome"]],"🦕"]]

const obj = {
  hello: 'world',
  haha: arr,
  ho: num,
  boo: bool
}

console.log(`Encode String: `, kati.stringify(str))

console.log(`Decode String: `, kati.parse(kati.stringify(str)))

console.log(`Encode Number: `, kati.stringify(num))

console.log(`Decode Number: `, kati.parse(kati.stringify(num)))

console.log(`Encode Boolean `, kati.stringify(bool))

console.log(`Decode Boolean `, kati.parse(kati.stringify(bool)))

console.log(`Encode Array `, kati.stringify(arr))

console.log(`Decode Array `, kati.parse(kati.stringify(arr)))

console.log(`Encode Object `, kati.stringify(obj))

console.log(`Decode Object `, kati.parse(kati.stringify(obj)))
