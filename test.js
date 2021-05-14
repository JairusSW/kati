const kati = require('./')

const serialized = kati.stringify({
    haha: 'mama',
    gaga: [{a:['haha']}]
})

console.log('Serialized: ', serialized)

const deserialized = kati.parse(serialized)

console.log('Deserialized: ', deserialized)