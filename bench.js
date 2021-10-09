const b = require('benny')

const kati = require('./')

const object = {
  hello: 'world',
}

const array = ['hello', 'world']
const number = 3.14
const string = 'helloworld'
const obj = `{"hello":"world"}`
const arr = `["hello","world"]`
const num = `3.14`
const str = `"helloworld"`
const nul = 'null'
const bool = 'true'

b.suite(
  'Kati vs. JSON (Object)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(object)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(object)
  }),

  b.add('Kati Parse', () => {
    kati.parse(obj)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(obj)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'object', version: '1.0.0' }),
  b.save({ file: 'object', format: 'chart.html' })
)

b.suite(
  'Kati vs. JSON (Array)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(array)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(array)
  }),

  b.add('Kati Parse', () => {
    kati.parse(arr)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(arr)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'array', version: '1.0.0' }),
  b.save({ file: 'array', format: 'chart.html' })
)

b.suite(
  'Kati vs. JSON (String)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(string)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(string)
  }),

  b.add('Kati Parse', () => {
    kati.parse(str)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(str)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'string', version: '1.0.0' }),
  b.save({ file: 'string', format: 'chart.html' })
)

b.suite(
  'Kati vs. JSON (Number)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(number)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(number)
  }),

  b.add('Kati Parse', () => {
    kati.parse(num)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(num)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'number', version: '1.0.0' }),
  b.save({ file: 'number', format: 'chart.html' })
)

b.suite(
  'Kati vs. JSON (Boolean)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(true)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(true)
  }),

  b.add('Kati Parse', () => {
    kati.parse(bool)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(bool)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'boolean', version: '1.0.0' }),
  b.save({ file: 'boolean', format: 'chart.html' })
)

b.suite(
  'Kati vs. JSON (Null)',
  b.add(`Kati Serialize`, () => {
    kati.stringify(null)
  }),

  b.add(`JSON Serialize`, () => {
    JSON.stringify(null)
  }),

  b.add('Kati Parse', () => {
    kati.parse(nul)
  }),

  b.add('JSON Parse', () => {
    JSON.parse(nul)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'null', version: '1.0.0' }),
  b.save({ file: 'null', format: 'chart.html' })
)