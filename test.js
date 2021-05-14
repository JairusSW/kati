// Here's the tests! It runs the stringify() function and makes sure it matches. If not, it'll throw an error.
// Loll, my nephew contributed to the string tests. Firetrucks, Airplanes, and Humvees... Haha!

const kati = require('./')

const serializedArray = kati.stringify(['firstName', 'Jairus', 'lastName', 'Tanaka', 'age', 14])

console.log('Serialized Array: ', serializedArray)

if (serializedArray !== '["firstName","Jairus","lastName","Tanaka","age",14]') throw new Error('Array Didn\'t Pass The Tests.')

const serializedObject = kati.stringify({
    firstName: 'Jairus',
    lastName: 'Tanaka',
    age: 14
})

console.log('Serialized Object: ', serializedObject)

if (serializedObject !== '{"firstName":"Jairus","lastName":"Tanaka","age":14}') throw new Error('Object Didn\'t Pass The Tests.')

const serializedString = kati.stringify('HelloWorldFireTrucksAirplanesHumveesAndCode.')

console.log('Serialized String: ', serializedString)

if (serializedString !== '"HelloWorldFireTrucksAirplanesHumveesAndCode."') throw new Error('String Didn\'t Pass The Tests.')

const serializedNumber = kati.stringify(3.14598)

console.log('Serialized Number: ', serializedNumber)

if (serializedNumber !== '3.14598') throw new Error('Number Didn\'t Pass The Tests.')

console.log('\nAll tests completed!')