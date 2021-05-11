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
    // Just loop through all the chunks and stringify them.
    for (const chunk of data) {
        result += `${stringify(chunk)},`
    }
    return `${result.substr(0, result.length - 1)}]`
}

const fromObject = (data) => {
    let result = '{'
    let keys = Object.keys(data)
    // Just loop through all the keys and stringify them.
    for (const key of keys) {
        result += `${stringify(key)}:${stringify(data[key])},`
    }
    return `${result.substr(0, result.length - 1)}}`
}

const stringify = (data) => {
    let result = ''
    if (typeof data === 'string') {
        result += fromString(data)
    } else if (typeof data === 'number') {
        result += fromNumber(data)
    } else if (data instanceof Array) {
        result += fromArray(data)
    } else if (data === true || data === false) {
        result += data ? `true` : `false`
    } else if (data == null) {
        result += fromNull()
    } else if (data instanceof Object) {
        result += fromObject(data)
    }
    return result
}

// Test and compare!
const a = ['haha', null, true, ['hey', {
    key: 'value'
}]]

console.log('JS:\n', stringify(a))
console.log('Native:\n', JSON.stringify(a))

module.exports = {
    stringify: stringify
}
