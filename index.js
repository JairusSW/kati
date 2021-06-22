const stripWhite = require('condense-whitespace')

// Stringify function
// Pre-alloc in memory. (faster)
const nullVal = `null`;
// Precompile regular expressions
const reQuote = /\"/g;
// Much faster if functions are split up by types.
function fromString(data) {
  // Catch a bug.
  if (data.includes(`"`)) {
    // Need replaceAll. Figure this out later.
    return `"${data.replace(reQuote, '\\"')}"`;
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
  // Just loop through all the chunks and stringify them.
  const lastChunk = data.pop();
  // Woww. For...of loop (with pop) made things four times faster!
  let chunk;
  let i = 0;
  for (; i < data.length; i++) {
    chunk = data[i];
    result += `${stringify(chunk)},`;
  }

  result += `${stringify(lastChunk)}]`;
  // += is (slightly) faster than array.push/join!
  return result;
};

const fromObject = (data) => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return "{}";
  }
  let result = "{";
  const lastKey = keys.pop();
  // Just loop through all the keys and stringify them.
  let key;
  for (key of keys) {
    // Iterate through all but the last. (To keep the commas clean)
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
    (obj.length >= 0 && obj.splice instanceof Function)
  );
}

stringify.fromObject = fromObject;

stringify.fromArray = fromArray;

stringify.fromNumber = fromNumber;

stringify.fromString = fromString;

stringify.fromBoolean = (data) => {
  return data ? `true` : `false`;
};

stringify.fromNull = (data) => {
  return nullVal;
};

// Parse

const toString = (data) => {
  return data.slice(1, data.length - 1);
};

const toNumber = (data) => {
  return data * 1;
};

const toBoolean = (data) => {
  if (data === "true") return true;
  return false;
};

// ["haha","baba",3.14]

const toArray = (data) => {
  console.log('Data: ', data);
  let pos = 0;
  // 0 = Normal
  // 1 = Subarray
  const result = [];
  let lastPos = 0;
  let depth = 0;
  let foundDepth = 0;
  let chunk;
  for (let i = 0; i < data.length; i++) {
    chunk = data[i];
    if (chunk === "[") depth++
    if (chunk === "]") foundDepth++;
    if (pos === 0 && chunk === "[") {
      pos = 1;
      lastPos = i;
    } else if (pos === 1 && chunk === "]") {
      if (foundDepth < depth) pos = 1;
      if (foundDepth === depth) {
        console.log("Got an array!", data.slice(lastPos, i+1));
        result.push(parse(data.slice(lastPos, i+1)))
        pos = 0;
        lastPos = i+1
      }
    } else if (chunk === "," && pos === 0) {
      console.log('General Chunk: ', data.slice(lastPos, i))
      result.push(parse(data.slice(lastPos, i)))
      lastPos = i+1
    }
  }
  const trailingChunk = data.slice(lastPos, data.length)
  if (trailingChunk) result.push(parse(trailingChunk))
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
  data = stripWhite(data)
  const first = data[0];
  if (first === '"') {
    return toString(data);
  } else if (first === "[") {
    return JSON.parse(data)//toArray(data.slice(1, data.length - 1));
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

parse.toString = toString;

parse.toArray = JSON.parse;

parse.toObject = JSON.parse;

parse.toBoolean = toBoolean;

parse.toNumber = toNumber;

module.exports = {
  stringify: stringify,
  parse: JSON.parse,
};