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
- Much faster than fast-json-stringify (except object)

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

![Array](https://cdn.discordapp.com/attachments/809588495425208320/842895724223922176/Zt0A6Pz5DJ3BTkPVNVFa3n8m18FsVTiGAqPv4piAIQAACEIAABCAAAQikS4AAkq62zAwCEIAABCAAAQhAAALqCBBA1ElCQRCAAAQ.png)

**Serialize Object**

![Object](https://cdn.discordapp.com/attachments/809588495425208320/842896091276116019/KTeocqR0TX8AAAAASUVORK5CYII.png)

**Serialize String**

![String](https://cdn.discordapp.com/attachments/809588495425208320/842896048530915348/PKXfr1QK94gAAAABJRU5ErkJggg.png)

**Serialize Number**

![Number](https://cdn.discordapp.com/attachments/809588495425208320/842895971121233920/wfRateBRDUwKgAAAABJRU5ErkJggg.png)