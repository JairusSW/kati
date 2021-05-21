// TODO: Handle circular data

// Pre-alloc in memory. (faster)
const nullVal = `null`
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

const fromArray = (data) => {
    const len = data.length - 1
    if( len === -1 ) {
     return '[]'   
    }
    
    let result = '['
    // Just loop through all the chunks and stringify them.
    for (let i = 0; i < len; i++) {
        const chunk = data[i]
        result += `${stringify(chunk)},`
    }
    result += `${stringify(data[len])}]`

    return result
}

const fromObject = (data) => {
    const keys = Object.keys(data)
    const len = keys.length - 1
    if( len === -1 ) {
     return '{}'   
    }
    let result = '{'
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
    } else if (data instanceof Object) {
        result += fromObject(data)
    } else {
        result += nullVal
    }

    return result
}

module.exports = {
    stringify: stringify,
    parse: JSON.parse
}
