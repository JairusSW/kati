// Here's the tests! It runs the stringify() function and makes sure it matches. If not, it'll throw an error.
// Loll, my nephew contributed to the string tests. Firetrucks, Airplanes, and Humvees... Haha!

const kati = require('./')

const encoded = kati.stringify([['haha', 'baba']])

console.log('Encoded: \n', encoded)

const decoded = kati.parse(encoded)

console.log('Decoded: \n', decoded)

/*

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
      }
    } else if (chunk === "," && pos === 0) {
      console.log('General Chunk: ', data.slice(lastPos, i))
      result.push(parse(data.slice(lastPos, i)))
      lastPos = i+1
    }
  }
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
    return JSON.parse(data)//toArray(data.slice(1, data.length - 1));
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
*/