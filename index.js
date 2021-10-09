const quote = '"'
const rbracket = ']'
const comma = ','
const nullVal = 'null'
const quoteToEscapedRegex = /\"/g
const escapedToQuoteRegex = /\\\"/g
const quoteCode = '"'.charCodeAt(0) | 0
const commaCode = ','.charCodeAt(0) | 0
const rbracketCode = ']'.charCodeAt(0) | 0
const lbracketCode = '['.charCodeAt(0) | 0
const rcbracketCode = '}'.charCodeAt(0)
const lcbracketCode = '{'.charCodeAt(0) | 0
const colonCode = ':'.charCodeAt(0) | 0
const fwd_slashCode = '/'.charCodeAt(0) | 0
const t_charCode = 't'.charCodeAt(0) | 0
const f_charCode = 't'.charCodeAt(0) | 0
const nCode = 'n'.charCodeAt(0) | 0

function fromString(data) {
  if (data.includes(`"`)) {
    return `"${data.replace(quoteToEscapedRegex, '\\"')}"`
  }
  return `"${data}"`
}

function fromNumber(data) {
  return `${data}`
}

function fromArray(data) {
  const len = (data.length - 1) | 0
  if (len === -1) {
    return '[]'
  }
  let result = '['
  const lastChunk = data[len]
  for (let i = 0 | 0; i < (len); i++) {
    result += stringify(data[i]) + comma
  }
  result += stringify(lastChunk) + rbracket
  return result
}

function fromObject(data) {
  const keys = Object.keys(data)
  if (keys.length === 0) {
    return '{}'
  }
  let result = '{'
  const lastKey = keys[(keys.length - 1)]
  let key
  for (let i = 0 | 0; (i < keys.length - 1) | 0; i++) {
    key = keys[i]
    result += fromString(key) + ':' + stringify(data[key]) + ','
  }
  result += fromString(lastKey) + ':' + stringify(data[lastKey]) + '}'
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
  } else if (data === true || data === false) {
    return data ? `true` : `false`
  } else {
    return nullVal
  }
}

function isArrayish(obj) {
  if (obj == null) {
    return false
  }
  return (
    obj instanceof Array ||
    Array.isArray(obj) ||
    (obj.length | (0 >= 0) | 0 && obj.splice instanceof Function)
  )
}

// Parse

function parse(data) {
  const firstChar = data.charCodeAt(0)
  if (firstChar === quoteCode) {
    return parseString(data)
  } else if (firstChar === t_charCode) {
    return true
  } else if (firstChar === f_charCode) {
    return false
  } else if (firstChar === lbracketCode) {
    return parseArray(data)
  } else if (firstChar === lcbracketCode) {
    return parseObject(data)
  } else if (firstChar === nCode) {
    return null
  } else {
    return parseNumber(data)
  }
}

function parseString(data) {
  return data.slice(1, data.length - 1).replace(escapedToQuoteRegex, quote)
}

function parseNumber(data) {
  return data * 1
}

function parseArray(data) {
  const result = new Array()
  if (data.length === 2) return result
  let lastPos = 0 | 0
  let char = 0 | 0
  let depth = 0 | 0
  let fdepth = 0 | 0
  let instr = false
  let i = 1 | 0
  // for (; (i < data.length - 1) | 0; i++) {
  do {
    char = data.charCodeAt(i)
    // This ignores [ and ] if they are inside a string.
    if (char === quoteCode && data.charCodeAt((i - 1)) !== fwd_slashCode) {
      if (instr === true) {
        instr = false
      } else if (instr === false) {
        instr = true
      }
    }
    if (instr === false) {
      if (char === commaCode && depth === 0) {
        //console.log('Normal chunk: ' + data.slice(lastPos + 1, i))
        result.push(parse(data.slice((lastPos + 1), i).trim()))
        lastPos = i
      } else if (char === lbracketCode) depth++
      else if (char === rbracketCode) fdepth++
      else if (depth !== 0 && depth === fdepth) {
        //console.log('Deep chunk: ' + data.slice(lastPos + 1, i))
        result.push(parse(data.slice((lastPos + 1), i).trim()))
        // Reset the depth
        depth = 0
        fdepth = 0
        // Set new lastPos
        lastPos = i
      }
    }
    i++
  } while (i < (data.length - 1))
  //console.log('Last chunk: ' + data.slice(lastPos + 1, data.length - 1).trim())
  result.push(parse(data.slice((lastPos + 1), (data.length - 1)).trim()))
  return result
}

function parseObject(data) {
  //console.log('Data ' + data)
  const len = (data.length - 1) | 0
  const result = {}
  let lastPos = 1 | 0
  let key = ''
  let instr = 0 | 0
  let char = 0 | 0
  let depth = 0 | 0
  let fdepth = 0 | 0
  for (let i = 1 | 0; i < len; i++) {
    char = data.charCodeAt(i)
    if (char === quoteCode && data.charCodeAt(i - 1) !== fwd_slashCode)
      instr = !instr
    else if ((instr === 0) | 0) {
      if (char === lcbracketCode || char === lbracketCode) depth++
      if (char === rcbracketCode || char === rbracketCode) fdepth++
    }
    if (depth !== 0 && depth === fdepth) {
      //console.log(`Deep: ${data.slice(lastPos + 1, i + 1).trim()}`)
      result[key] = parse(data.slice(lastPos + 1, i + 1).trim())
      // Reset the depth
      depth = 0
      fdepth = 0
      // Set new lastPos
      lastPos = (i + 1)
    }
    if (depth === 0) {
      if (char === colonCode) {
        //console.log(`Key: ${data.slice(lastPos + 1, i - 1).trim()}`)
        key = data.slice(lastPos + 1, i - 1).trim()
        lastPos = i
      } else if (char === commaCode) {
        //console.log(`Value: ${data.slice(lastPos + 1, i).trim()}`)
        if (i - lastPos > 0)
          result[key] = parse(data.slice(lastPos + 1, i).trim())
        lastPos = (i + 1)
      }
    }
  }
  //console.log(`Trailing: ${data.slice(lastPos + 1, len).trim()}`)
  if (len - lastPos > 0)
    result[key] = parse(data.slice(lastPos + 1, len).trim())
  return result
}


const str = 'Hello World "_"'

const num = 3.14

const bool = true

const arr = [
  'Hello',
  'Dinosaur',
  { type: 'sauropod' },
  [3.14, ['Dinosaurs', ['Are', 'Awesome']], '🦕'],
]

const obj = {
  hello: 'world',
  haha: 'baba',
  hoho: ['ha!', 'hoo', ['heh', 'rar'], arr],
  ha: 'ba',
}

console.log(`Encode String: `, stringify(str))

console.log(`Decode String: `, parse(stringify(str)))

console.log(`Encode Number: `, stringify(num))

console.log(`Decode Number: `, parse(stringify(num)))

console.log(`Encode Boolean `, stringify(bool))

console.log(`Decode Boolean `, parse(stringify(bool)))

console.log(`Encode Array `, stringify(arr))

console.log(`Decode Array `, stringify(parse(stringify(arr))))

console.log(`Encode Object `, stringify(obj))

console.log(`Decode Object `, stringify(parse(stringify(obj))))
