# Kati ⚡

**Extremely fast JSON serializer and deserializer**

## Installation

```js
~ npm install kati
```

## Usage

```js
const kati = require('kati')

const serialized = kati.stringify({
  hello: 'world',
  array: ['Hey!', 3.14],
})

console.log('Serialized: ' + stringified)

const deserialized = kati.parse(serialized)

console.log('Deserialized: ' + deserialized)
```

## Going faster

You can serialize types seperately by using `stringify.from(Array/Object/String/Number/Null/Boolean)`

```js
const kati = require('kati')

// fromObject is faster
const serialized = kati.stringify.fromObject({
  hello: 'world',
  array: ['Hey!', 3.14],
})

console.log('Serialized: ' + stringified)

const deserialized = kati.parse(serialized)

console.log('Deserialized: ' + deserialized)
```

## Benchmarks

**Array**

![Array](https://cdn.discordapp.com/attachments/824688703431508000/878306417126277150/3bf86f82-3762-42af-a6a8-b82194daaa7a.png)

**Object**

![Object](https://cdn.discordapp.com/attachments/824688703431508000/878306633871163452/8e8ef901-929a-445e-84f6-d421924c0844.png)

**String**

![String](https://cdn.discordapp.com/attachments/824688703431508000/878306889409101894/24d11570-4f1d-494b-9820-ac2491774a5c.png)

**Number**

![Number](https://cdn.discordapp.com/attachments/824688703431508000/878306975740469248/4b0f8daa-93cd-437c-bb5c-b4ae4d7b4959.png)

**Boolean**

![Boolean](https://cdn.discordapp.com/attachments/824688703431508000/878307128249548870/a0c56b4c-b7a9-4629-9168-883087103491.png)

**Null**

![Null](https://cdn.discordapp.com/attachments/824688703431508000/878307066358431744/603fb997-74e1-4a02-8039-cd069bcf2232.png)
