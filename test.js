const kati = require('kati')

const a = ['haha', null, true, ['hey', {
    key: 'value',
    4: 1234,
    6: false
}]]

console.log('Kati:\n', kati.stringify(a))

console.log('JSON:\n', JSON.stringify(a))