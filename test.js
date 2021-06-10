// Here's the tests! It runs the stringify() function and makes sure it matches. If not, it'll throw an error.
// Loll, my nephew contributed to the string tests. Firetrucks, Airplanes, and Humvees... Haha!

const kati = require('./')

const encoded = kati.stringify({
    firstName: 'Jairus',
    lastName: 'Tanaka',
    age: 14,
    nicknames: ['Churro', 'Burrito']
})

console.log('Encoded: \n', encoded)

const decoded = kati.parse(encoded)

console.log('Decoded: \n', decoded)