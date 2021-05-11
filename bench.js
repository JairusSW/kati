const b = require('benny')

const fjs = require('./index')

let testString = 'HelloWorldHahaBabaLorumIpsumILikeFireTrucksIdkHA!ISx28$@#)$!@#!$#)(F{}{F{}WF|:":>>>:""S:{F:}W|F:>W:>?>>WOEFJWEIOF!)(@#'

let testNumber = 3.14159

let testNull = null

let testArray = ['Hello World!', 0.23918290323, null, true]

let testObject = {
    0: 'Hello World!',
    1: 0.23918290323,
    2: null,
    3: testArray
}

b.suite(
  'JSON vs. FastJSON (Array)',

  b.add('FastJSON Stringify (array)', () => {
    fjs.stringify(testArray)
  }),

  b.add('JSON Stringify (array)', () => {
    JSON.stringify(testArray)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'array', version: '1.0.0' }),
  b.save({ file: 'array', format: 'chart.html' }),
)

b.suite(
  'JSON vs. FastJSON (Object)',

  b.add('FastJSON Stringify (object)', () => {
    fjs.stringify(testObject)
  }),

  b.add('JSON Stringify (object)', () => {
    JSON.stringify(testObject)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'object', version: '1.0.0' }),
  b.save({ file: 'object', format: 'chart.html' }),
)

b.suite(
  'JSON vs. FastJSON (String)',

  b.add('FastJSON Stringify (string)', () => {
    fjs.stringify(testString)
  }),

  b.add('JSON Stringify (string)', () => {
    JSON.stringify(testString)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'string', version: '1.0.0' }),
  b.save({ file: 'string', format: 'chart.html' }),
)