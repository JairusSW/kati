const kati = require('./')

const str = 'Hello World "_"'

const num = 3.14

const bool = true

const arr = ["Hello", "Dinosaur", { type: 'sauropod' }, [3.14, ["Dinosaurs", ["Are", "Awesome"]], "🦕"]]
  
const obj = {
  hello: 'world',
  haha: arr,
  ho: num,
  boo: bool
}

console.log(`Encode String: `, kati.stringify(str))

console.log(`Decode String: `, kati.parse(`"Hello World \"_\""`))

console.log(`Encode Number: `, kati.stringify(num))

console.log(`Decode Number: `, kati.parse(`3.14`))

console.log(`Encode Boolean `, kati.stringify(bool))

console.log(`Decode Boolean `, kati.parse(`true`))

console.log(`Encode Array `, kati.stringify(arr))

console.log(`Decode Array `, kati.parse(`["Hello","Dinosaur",{"type":"sauropod"},[3.14,["Dinosaurs",["Are","Awesome"]],"🦕"]]`))

console.log(`Encode Object `, kati.stringify(obj))

console.log(`Decode Object `, kati.parse(kati.stringify(obj)))
