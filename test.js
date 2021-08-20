const kati = require('./')

const str = 'Hello World "_"'

const num = 3.14

const bool = true

const arr = [
  'Hello',
  'Dinosaur',
  { type: 'sauropod' },
  [3.14, ['Dinosaurs', ['Are', 'Awesome']], '🦕'],
]

const obj = {
  hello: 'world',
  haha: 'baba',
  hoho: ['ha!', 'hoo', ['heh', 'rar'], arr],
  ha: 'ba',
}

console.log(`Encode String: `, kati.stringify(str))

console.log(`Decode String: `, kati.parse(kati.stringify(str)))

console.log(`Encode Number: `, kati.stringify(num))

console.log(`Decode Number: `, kati.parse(kati.stringify(num)))

console.log(`Encode Boolean `, kati.stringify(bool))

console.log(`Decode Boolean `, kati.parse(kati.stringify(bool)))

console.log(`Encode Array `, kati.stringify(arr))

console.log(`Decode Array `, kati.stringify(kati.parse(kati.stringify(arr))))

console.log(`Encode Object `, kati.stringify(obj))

console.log(`Decode Object `, kati.stringify(kati.parse(kati.stringify(obj))))
