const stripWhite = require('condense-whitespace')

const nullVal = `null`;

const quoteToEscapedRegex = /\"/g;

const escapedToQuoteRegex = /\\"/g;

function fromString(data) {
  if (data.includes(`"`)) {
    return `"${data.replace(quoteToEscapedRegex, '\\"')}"`;
  }
  return `"${data}"`;
}

function fromNumber(data) {
  return `${data}`;
}

const fromArray = (data) => {
  if (data.length === 0) {
    return "[]";
  }

  let result = "[";
  const lastChunk = data[data.length - 1];
  let chunk;
  let i = 0 | 0;
  for (; i < (data.length - 1) | 0; i++) {
    chunk = data[i];
    result += `${stringify(chunk)},`;
  }

  result += `${stringify(lastChunk)}]`;
  return result;
};

const fromObject = (data) => {
  const keys = Object.keys(data);
  if (keys.length | 0 === 0 | 0) {
    return "{}";
  }
  let result = "{";
  const lastKey = keys[(keys.length - 1) | 0];
  let key;
  for (let i = 0 | 0; i < (keys.length - 1) | 0; i++) {
    key = keys[i]
    result += `${stringify(key)}:${stringify(data[key])},`;
  }
  result += `${stringify(lastKey)}:${stringify(data[lastKey])}}`;

  return result;
};

function stringify(data) {
  if (typeof data === "string") {
    return fromString(data);
  } else if (Number.isFinite(data)) {
    return fromNumber(data);
  } else if (isArrayish(data)) {
    return fromArray(data);
  } else if (data instanceof Object) {
    return fromObject(data);
  } else if (data === true || data === false) {
    return data ? `true` : `false`;
  } else {
    return nullVal;
  }
}

function isArrayish(obj) {
  if (!obj) {
    return false;
  }

  return (
    obj instanceof Array ||
    Array.isArray(obj) ||
    ((obj.length) | 0 >= 0 | 0 && obj.splice instanceof Function)
  );
}

// Parse

const toString = (data) => {
  return data.slice(1 | 0, (data.length - 1) | 0).trim().replace(escapedToQuoteRegex, '"');
};

const toNumber = (data) => {
  return data * 1;
};

const toBoolean = (data) => {
  if (data[0 | 0] == "t") return true;
  return false;
};

const toArray = (data) => {
  let result = []
  let lastPos = -1 | 0;
  let char;
  let depth = 0 | 0;
  let fdepth = 0 | 0;
  let instr = false;
  for (let i = 0 | 0; i < (data.length - 1) | 0; i++) {
    char = data[i];
    // This ignores [ and ] if they are inside a string.
    if (data[(i - 1) | 0] != "\\" && char == "\"")
      instr = (instr ? false : true);
    // This gets the depth of the array/object
    if (instr === false && (char === "[" || char === "{")) depth++;
    if (instr === false && (char === "]" || char === "}")) fdepth++;
    // If the depth and found depth are equal, that is an array. Push it.
    if (instr === false && depth > 0 && depth === fdepth) {
      result.push(parse(data.slice((lastPos + 1) | 0, (i + 1) | 0)))
      // Reset the depth
      depth = 0 | 0;
      fdepth = 0 | 0;
      // Set new lastPos
      i++
      lastPos = i | 0;
    }
    if (instr === false && char === "," && depth === 0) {
      if (data.slice((lastPos + 1) | 0, (i) | 0) != null) result.push(parse(data.slice((lastPos + 1) | 0, i | 0)));
      lastPos = i | 0;
    }
  }

  const trailingChunk = data.slice((lastPos + 1) | 0, data.length | 0)
  if (trailingChunk != null) result.push(parse(trailingChunk))
  // Return the final array
  return result;
};

// {"hello":"world","haha":"baba"}

const toObject = (data) => {
  const result = {};
  const arr = data.slice(1, data.length - 1);
  let pos = 0;
  // 0 = start
  // 1 = key
  // 2 = value
  let lastPosition = 0;
  let key;
  for (let i = 0; i < arr.length; i++) {
    if (pos === 0 && arr[i] === `:`) {
      key = parse(arr.slice(lastPosition, i));
      lastPosition = i + 1;
      pos = 1;
    } else if (pos === 1 && arr[i] === `,`) {
      result[key] = parse(arr.slice(lastPosition, i));
      lastPosition = i + 1;
      pos = 0;
    }
  }
  result[key] = parse(arr.slice(lastPosition, arr.length));
  return result;
};

function parse(data) {
  data = removeJSONWhitespace(data)
  const first = data[0];
  if (first === '"') {
    return toString(data);
  } else if (first === "[") {
    return toArray(data.slice(1, data.length - 1));
  } else if (first === "{") {
    return JSON.parse(data)//toObject(data);
  } else if (data === "true" || data === "false") {
    return toBoolean(data);
  } else if (data === "null") {
    return null;
  } else {
    return toNumber(data);
  }
}

function removeJSONWhitespace(data) {
  let result = []
  // The | 0 lets the optimizer know that this is (probably) an unsigned integer
  let i = data.length | 0
  // 0 = off
  // 1 = on
  // Numbers are faster in JS than bools
  let char
  while (i--) {
    // Assign character to `char` variable.
    // It helps to pre-define a variable.
    char = data[i]
    if (char != " ") result.unshift(char)
  }
  return result.join('')
}

module.exports = {
  stringify: stringify,
  parse: JSON.parse,
};
