// TODO: Handle circular data

// Precompile regular expressions
const reQuote = /\"/g;
// Much faster if functions are split up by types.
const fromString = (data) => {
    // Catch a bug.
    if (data.includes(`"`)) {
        // Need replaceAll. Figure this out later.
        return `"${data.replace(reQuote, '\\"')}"`
    }
    return `"${data}"`
}

const fromNumber = (data) => {
    return `${data}`
}

const fromNull = () => {
    return `null`
}

const fromArray = (data) => {
    let result = '['
    let chunk
    const len = data.length - 1
    // Just loop through all the chunks and stringify them.
    for (let i = 0; i <= data.length; i++) {
        chunk = data[i]
        if (i === len) return result += `${stringify(chunk)}]`
        result += `${stringify(chunk)},`
    }
    return result
}

const fromObject = (data) => {
    let result = '{'
    let keys = Object.keys(data)
    const len = keys.length - 1
    // Just loop through all the keys and stringify them.
    for (let i = 0; i <= keys.length; i++) {
        const key = keys[i]
        const value = data[key]
        if (i === len) return result += `${stringify(key)}:${stringify(value)}}`
        result += `${stringify(key)}:${stringify(value)},`
    }
    return result
}

const stringify = (data) => {
    let result = ''
    if (typeof data === 'string') {
        result += fromString(data)
    } else if (Number.isFinite(data)) {
        result += fromNumber(data)
    } else if (data instanceof Array) {
        result += fromArray(data)
    } else if (data === true || data === false) {
        result += data ? `true` : `false`
    } else if (data == null) {
        result += fromNull()
    } else if (data instanceof Object) {
        result += fromObject(data)
    } else {
        return `null`
    }

    return result
}

module.exports = {
    stringify: stringify,
    parse: JSON.parse
}