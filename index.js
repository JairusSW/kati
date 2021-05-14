// What is this? This is a JSON-like serializer that is both heavily optimized and hand-tuned.
// It is made for simplicity and performance which means less overhead and less checks. 
// Shoutout to me (lol) and a few contributors who offered performance improvements and features!
// Anyways, have a great time exploring kati!
// If you find a performance boost or a holdup in this code, PLEASE open up a pull request! 😉

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

function fromArray(data) {
    let result = '['
    const len = data.length - 1
    // Just loop through all the chunks and stringify them.
    for (let i = 0; i < len; i++) {
        const chunk = data[i]
        result += `${stringify(chunk)},`
    }
    result += `${stringify(data[len])}]`

    return result
}

function fromObject(data) {
    let result = '{'
    const keys = Object.keys(data)
    const len = keys.length - 1
    const lastKey = keys[len]
    // Just loop through all the keys and stringify them.
    for (let i = 0; i < len; i++) {
        const key = keys[i]
        // Iterate through all but the last. (To keep the commas clean)
        result += `${stringify(key)}:${stringify(data[key])},`
    }
    result += `${stringify(lastKey)}:${stringify(data[lastKey])}}`

    return result
}

function stringify (data) {
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