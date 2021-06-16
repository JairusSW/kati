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
    return '[]'
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
  return data.substr(1, data.length - 2);
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
  const result = [];
  let lastPos = 1;
  let chunk;
  for (let i = 0; i < data.length; i++) {
    chunk = data[i];
    if (chunk === ",") {
      result.push(parse(data.slice(lastPos, i)));
      lastPos = i + 1;
    }
  }
  result.push(parse(data.slice(lastPos, data.length - 1)));
  return result;
};

// {"hello":"world","haha":"baba"}

const toObject = (data) => {
  const result = {};
  const arr = data.substr(1, data.length - 2);
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
    return toArray(data);
  } else if (first === "{") {
    return toObject(data);
  } else if (data === "true" || data === "false") {
    return toBoolean(data);
  } else if (data === "null") {
    return null;
  } else {
    return toNumber(data);
  }
}

parse.toString = toString;

parse.toArray = toArray;

parse.toObject = toObject;

parse.toBoolean = toBoolean;

parse.toNumber = toNumber;

module.exports = {
  stringify: stringify,
  parse: parse,
};
