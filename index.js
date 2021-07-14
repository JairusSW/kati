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
  let i = 0;
  for (; i < data.length - 1; i++) {
    chunk = data[i];
    result += `${stringify(chunk)},`;
  }

  result += `${stringify(lastChunk)}]`;
  return result;
};

const fromObject = (data) => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return "{}";
  }
  let result = "{";
  const lastKey = keys[keys.length - 1];
  let key;
  for (let i = 0; i < keys.length - 1; i++) {
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
    (obj.length >= 0 && obj.splice instanceof Function)
  );
}

// Parse

const toString = (data) => {
  return data.slice(1, data.length - 1).replace(escapedToQuoteRegex, '"');
};

const toNumber = (data) => {
  return data * 1;
};

const toBoolean = (data) => {
  if (data[0] == "t") return true;
  return false;
};

const toArray = (data) => {
  console.log("Data: ", data);
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
    if (chunk === "[") depth++;
    if (chunk === "]") foundDepth++;
    if (pos === 0 && chunk === "[") {
      pos = 1;
      lastPos = i;
    }
    if (pos === 1 && chunk === "]") {
      if (foundDepth === depth) {
        console.log("Got an array!", data.slice(lastPos, i + 1));
        result.push(parse(data.slice(lastPos, i + 1)));
        pos = 0;
        lastPos = i + 2;
      }
    }
    if (chunk === "," && pos === 0) {
      const a = data.slice(lastPos, i)
      if (a) {
        console.log("General Chunk: ", data.slice(lastPos, i));
        result.push(parse(a));
        lastPos = i + 1;
      }
    }
  }
  const trailingChunk = data.slice(lastPos, data.length);
  console.log('Trailing: ', trailingChunk)
  if (trailingChunk) result.push(parse(trailingChunk));
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

module.exports = {
  stringify: stringify,
  parse: JSON.parse,
};
