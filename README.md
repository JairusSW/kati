# Kati
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
    array: ['Hey!', 3.14]
})
console.log('Serialized: ' + stringified)
const deserialized = kati.parse(serialized)
console.log('Deserialized: ' + deserialized)
```

## Benchmarks
**Kati is pretty much the God, lol.**

**Serialize Array**

![Array](https://cdn.discordapp.com/attachments/809147202470805555/842097163692933140/H4BojIFIvPeOAAAAAElFTkSuQmCC.png)

**Serialize Object**

![Object](https://cdn.discordapp.com/attachments/809147202470805555/842097497744998410/P2B05hncP9AAAAAElFTkSuQmCC.png)

**Serialize String**

![String](https://cdn.discordapp.com/attachments/809147202470805555/842097619080970240/eK1QGGD6vugeQZZfzlV9Cledu8zdpB0bryWX2DsjiPVNFFbXn8m18FoVTiGAiPv4piAIQAACEIAABCAAAQjES4AAEq2zAwCEIAAB.png)

**Serialize Number**

![Number](https://cdn.discordapp.com/attachments/809147202470805555/842097795883597862/R7oRZPPdHYAAAAASUVORK5CYII.png)

**Serialize Boolean**

![Boolean](https://cdn.discordapp.com/attachments/809147202470805555/842097927760642048/YbwEcro3SzwAAAAASUVORK5CYII.png)

**Serialize Null**

![Null](https://cdn.discordapp.com/attachments/809147202470805555/842097927760642048/YbwEcro3SzwAAAAASUVORK5CYII.png)

Don't believe it? Run the bench!