const b = require('benny')

const Kati = require('./')

const Flatted = require('flatted')

const Json5 = require('json5')

const object = {
  hello: 'world',
  answer: 42
}
const array = ['hello', 'world', 'answer', 42]
const number = 3.14
const string = 'helloworldanswer42'
// NOTE: Tiny things, because its geared for small data packets in things such as WebSockets or Networking.\

b.suite(
  'Kati vs. JSON (String)',

  b.add('Kati Serialize', () => {
    Kati.stringify.fromString(string)
  }),

  b.add('JSON Serialize', () => {
    JSON.stringify(string)
  }),

  b.add('Flatted Serialize', () => {
    Flatted.stringify(string)
  }),

  b.add('JSON5 Serialize', () => {
    Json5.stringify(string)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'string', version: '1.0.0' }),
  b.save({ file: 'string', format: 'chart.html' }),
)

b.suite(
    'Kati vs. JSON (Number)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify.fromNumber(number)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(number)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(number)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(number)
    }),
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'number', version: '1.0.0' }),
    b.save({ file: 'number', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Array)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify.fromArray(array)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(array)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(array)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(array)
    }),
   
    b.cycle(),
    b.complete(),
    b.save({ file: 'array', version: '1.0.0' }),
    b.save({ file: 'array', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Object)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify.fromObject(object)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(object)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(object)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(object)
    }),
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'object', version: '1.0.0' }),
    b.save({ file: 'object', format: 'chart.html' }),
  )