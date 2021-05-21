// Welcome to the source code!
// You might ask 'What is kati'? Well, kati is a subset of JSON that trades off extra features (ex. Date Serialization) for insane performance.
// How is it so fast? It is fast mostly because it is straight-forward, allows almost no if-statementsss (in the type serializers), and has benches for everything.
// How to contribute? If you have any performance improvements, please post a pull request (or contact me).
// Btw, this was made by a kid! Haha! (Along with a a few performance tips from contributors) 😉
// Its MIT, so feel free to make your own custom ports or transpile it to another language!
// Have a great time exploring! (If ya have a Q, just contact me!)

// TODO
// - Port as-string-sink to JavaScript
// - Add SIMD-like parser
// - Make Kati the god of JSON
// - Increase performance.
// - Optimize for node/v8 version
// - Test in browser (v8/mozilla)

function isArrayish(obj) {
    if (!obj) {
        return false;
    }

    return obj instanceof Array || Array.isArray(obj) ||
        (obj.length >= 0 && obj.splice instanceof Function);
}

// Woww! Added ~4,000,000 ops/s instead of Array.isArray!!! 🤑

// Here we go... Performance first! (I like putting emotes in my code, haha!) 🔥

// Pre-alloc in memory. (faster)
const nullVal = `null`
// Precompile regular expressions
const reQuote = /\"/g;
// Much faster if functions are split up by types.
function fromString(data) {
    // Catch a bug.
    if (data.includes(`"`)) {
        // Need replaceAll. Figure this out later.
        return `"${data.replace(reQuote, '\\"')}"`
    }
    return `"${data}"`
}

function fromNumber(data) {
    return `${data}`
}

const fromArray = (data) => {
    const len = data.length - 1
    if( len === -1 ) {
     return '[]'   
    }
    
    let result = '['
    // Just loop through all the chunks and stringify them.
    const lastChunk = data.pop()
    // Woww. For...of loop (with pop) made things four times faster!
    let chunk
    // Pre-compile chunk. Faster.
    for (chunk of data) {
        result += `${stringify(chunk)},`
    }

    result += `${stringify(lastChunk)}]`
    // += is (slightly) faster than array.push/join!
    // For another language, there is a project called as-string-sink which provides string concat that is ~3,000x faster than JS.
    // Wonder if it could be ported to JS...
    return result
}

const fromObject = (data) => {
    const keys = Object.keys(data)
    const len = keys.length - 1
    if (len === -1) {
     return '{}'   
    }
    let result = '{'
    const lastKey = keys.pop()
    // Just loop through all the keys and stringify them.
    let key
    for (key of keys) {
        // Iterate through all but the last. (To keep the commas clean)
        result += `${stringify(key)}:${stringify(data[key])},`
    }
    result += `${stringify(lastKey)}:${stringify(data[lastKey])}}`

    return result
}

function stringify(data) {
    let result = ''
    if (typeof data === 'string') {
        result += fromString(data)
    } else if (Number.isFinite(data)) {
        result += fromNumber(data)
    } else if (isArrayish(data)) {
        result += fromArray(data)
    } else if (data === true || data === false) {
        result += data ? `true` : `false`
    } else if (data instanceof Object) {
        result += fromObject(data)
    } else {
        result += nullVal
    }

    return result
}

stringify.fromObject = fromObject

stringify.fromArray = fromArray

stringify.fromNumber = fromNumber

stringify.fromString = fromString

stringify.fromBoolean = (data) => { return data ? `true` : `false` }

stringify.fromNull = (data) => { return nullVal }

module.exports = {
    stringify: stringify,
    parse: JSON.parse
}
