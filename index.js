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
  if (len === -1) {
    return '[]'
  }

  let result = '['
  // Just loop through all the chunks and stringify them.
  const lastChunk = data.pop()
  // Woww. For...of loop (with pop) made things four times faster!
  let chunk
  let i = 0
  for (; i < data.length; i++) {
    chunk = data[i]
    result += `${stringify(chunk)},`
  }

  result += `${stringify(lastChunk)}]`
  // += is (slightly) faster than array.push/join!
  return result
}

const fromObject = (data) => {
  const keys = Object.keys(data)
  if (keys.length === 1) {
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
  if (typeof data === 'string') {
    return fromString(data)
  } else if (Number.isFinite(data)) {
    return fromNumber(data)
  } else if (isArrayish(data)) {
    return fromArray(data)
  } else if (data instanceof Object) {
    return fromObject(data)
  } else if (data === true || data === false ) {
    return data ? `true` : `false`
  } else {
    return nullVal
  }

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