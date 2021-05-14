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

![Array](https://cdn.discordapp.com/attachments/809147202470805555/842826806444556288/1aVwAAAABJRU5ErkJggg.png)

**Serialize Object**

![Object](https://cdn.discordapp.com/attachments/809147202470805555/842827073672183808/MA0Kga64MzYAAAAASUVORK5CYII.png)

**Serialize String**

![String](https://cdn.discordapp.com/attachments/809147202470805555/842826982856589333/wGMRlQn3PzgAwAAAABJRU5ErkJggg.png)

**Serialize Number**

![Number](https://cdn.discordapp.com/attachments/809147202470805555/842827340551684116/Z7qXkIKp3MEAAAAASUVORK5CYII.png)