# Kati ⚡
**Extremely fast JSON serializer and deserializer**

## Installation

```js
~ npm install kati
```

## Features
- Extremely fast 🔥
- Works in the browser 🍻
- Works with JSON 🚀

## Usage

```js
const kati = require('kati')

const serialized = kati.stringify({
    hello: 'world',
    array: ['Hey!', 3.14]
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
    array: ['Hey!', 3.14]
})

console.log('Serialized: ' + stringified)

const deserialized = kati.parse(serialized)

console.log('Deserialized: ' + deserialized)
```

## Benchmarks

**Serialize Array**

![Array](https://cdn.discordapp.com/attachments/809147202470805555/842097163692933140/H4BojIFIvPeOAAAAAElFTkSuQmCC.png)

**Serialize Object**

![Object](https://cdn.discordapp.com/attachments/809147202470805555/842097497744998410/P2B05hncP9AAAAAElFTkSuQmCC.png)

**Serialize String**

![String](https://cdn.discordapp.com/attachments/809147202470805555/842097619080970240/eK1QGGD6vugeQZZfzlV9Cledu8zdpB0bryWX2DsjiPVNFFbXn8m18FoVTiGAiPv4piAIQAACEIAABCAAAQjES4AAEq2zAwCEIAAB.png)