const b = require('benny')

const Kati = require('./')

const Flatted = require('flatted')

const Yaml = require('yaml')

const Json5 = require('json5')

const examples = {
    string: 'HelloWorldFireTruck',
    number: 1234567890.0987654321,
    array: ['HelloWorldFireTruck', 1234567890.0987654321],
    object: {
        '0': 'HelloWorldFireTruck'
    }
}

b.suite(
  'Kati vs. JSON (String)',

  b.add('Kati Serialize', () => {
    Kati.stringify(examples.string)
  }),

  b.add('JSON Serialize', () => {
    JSON.stringify(examples.string)
  }),

  b.add('Flatted Serialize', () => {
    Flatted.stringify(examples.string)
  }),

  b.add('JSON5 Serialize', () => {
    Json5.stringify(examples.string)
  }),

  b.add('YAML Serialize', () => {
    Yaml.stringify(examples.string)
  }),


  b.cycle(),
  b.complete(),
  b.save({ file: 'string', version: '1.0.0' }),
  b.save({ file: 'string', format: 'chart.html' }),
)

b.suite(
    'Kati vs. JSON (Number)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify(examples.number)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(examples.number)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(examples.number)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(examples.number)
    }),
  
    b.add('YAML Serialize', () => {
      Yaml.stringify(examples.number)
    }),
  
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'number', version: '1.0.0' }),
    b.save({ file: 'number', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Null)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify(null)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(null)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(null)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(null)
    }),
  
    b.add('YAML Serialize', () => {
      Yaml.stringify(null)
    }),
  
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'null', version: '1.0.0' }),
    b.save({ file: 'null', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Boolean)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify(true)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(true)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(true)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(true)
    }),
  
    b.add('YAML Serialize', () => {
      Yaml.stringify(true)
    }),
  
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'boolean', version: '1.0.0' }),
    b.save({ file: 'boolean', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Array)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify(examples.array)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(examples.array)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(examples.array)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(examples.array)
    }),
  
    b.add('YAML Serialize', () => {
      Yaml.stringify(examples.array)
    }),
  
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'array', version: '1.0.0' }),
    b.save({ file: 'array', format: 'chart.html' }),
  )

  b.suite(
    'Kati vs. JSON (Object)',
  
    b.add('Kati Serialize', () => {
      Kati.stringify(examples.object)
    }),
  
    b.add('JSON Serialize', () => {
      JSON.stringify(examples.object)
    }),
  
    b.add('Flatted Serialize', () => {
      Flatted.stringify(examples.object)
    }),
  
    b.add('JSON5 Serialize', () => {
      Json5.stringify(examples.object)
    }),
  
    b.add('YAML Serialize', () => {
      Yaml.stringify(examples.object)
    }),
  
  
    b.cycle(),
    b.complete(),
    b.save({ file: 'object', version: '1.0.0' }),
    b.save({ file: 'object', format: 'chart.html' }),
  )