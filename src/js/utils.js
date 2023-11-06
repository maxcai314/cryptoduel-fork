/** @type {(...args: any[]) => any} */
export const log = (...args) => !process.env.PRODUCTION && console.log(...args);

/** @type {(num: number) => string} */
const padTime = (num) => `${Math.floor(num)}`.padStart(2, '0');

/** @type {(ms: number) => string} */
export const fmtTime = (ms) => {
  const hours = padTime(ms / 60000 / 60);
  const minutes = padTime((ms / 60000) % 60);
  const seconds = padTime((ms % 60000) / 1000);
  if (hours !== '00') {
    return `${hours}:${minutes}:${seconds}`.replace(/^0+/g, '');
  }
  if (minutes !== '00') {
    return `${minutes}:${seconds}`.replace(/^0+/g, '');
  }
  return `00:${seconds}`;
};

/** @type {(ms: number) => Promise<void>} */
export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * @template T
 * @param {string} str
 * @returns {Set<T>}
 */
export const getDuplicates = (str) => {
  const duplicates = new Set();
  /** @type {typeof duplicates} */
  const visited = new Set();

  str.split('').forEach((entry) => {
    if (visited.has(entry)) {
      duplicates.add(entry);
    }
    visited.add(entry);
  });

  return duplicates;
};

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {T}
 */
export const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * @template T
 * @param {Iterable<T>} it
 * @returns {Map<T, number>}
 */
export const getCounts = (it) => {
  const count = new Map();
  for (const item of it) {
    count.set(item, (count.has(item) ? count.get(item) : 0) + 1);
  }
  return count;
};
