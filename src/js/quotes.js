import {alphabet} from './constants.js';

export { alphabet } from './constants.js';

/** @typedef {{ author: string, text: string }} Quote */
/** @typedef {Quote & {
  plaintext: string, ciphertext: string, start: number, hint?: string
}} EncryptedQuote */

export const getQuoteGenerator = () => {
  return async () => {
//    const quotes = await fetch("./quotes/funny.json").then((res) => res.json()).then(shuffleArray);
    const quotes = await fetch(`./quotes/${Math.floor(Math.random() * 3)}.json`).then((res) => res.json()).then(shuffleArray);

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return {author: quote.quoteAuthor, text: cleanUpText(quote.quoteText)};
  };
};

/**
 * @template T
 * @param {Array<T>} arr
 * @returns {Array<T>}
 */
const shuffleArray = (arr) =>
  arr
    .map((a) => /** @type {[number, T]} */ ([Math.random(), a]))
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

/** @type {() => string[]} */
const generateRandomEncryption = () => {
  const encMap = shuffleArray([...Array(26).keys()]);
  if (encMap.some((x, i) => x === i)) return generateRandomEncryption();
  return encMap.map((i) => alphabet[i]);
};

/** @type {(quote: Quote) => EncryptedQuote} */
export const toAristocratCipher = (quote) => {
  const plaintext = quote.text.toUpperCase();
  const encryptionAlphabet = generateRandomEncryption();
  const ciphertext = [...plaintext]
    .map((char) => encryptionAlphabet[alphabet.indexOf(char)] ?? char)
    .join('');

  return {
    ...quote,
    plaintext,
    ciphertext,
    start: Date.now(),
    hint: splitQuote(plaintext)[0],
  };
};

/** @type {(text: string) => string} */
const patristify = (text) => {
  const alphabetChars = [...text].filter((c) => alphabet.includes(c)).join('');
  return [...Array(alphabetChars.length).keys()]
    .filter((i) => i % 5 === 0)
    .map((i) => alphabetChars.slice(i, i + 5))
    .join(' ');
};

/** @type {(quote: EncryptedQuote) => EncryptedQuote} */
export const toPatristocratCipher = (quote) => ({
  ...quote,
  plaintext: patristify(quote.plaintext),
  ciphertext: patristify(quote.ciphertext),
});

/** @type {(text: string) => string[]} */
export const splitQuote = (text) => [...text.split(/\s+/g)];

/** @type {(text: string) => string} */
// eslint-disable-next-line no-control-regex
const cleanUpText = (text) => text.replace(/[^\x00-\x7F]+/g, ''); // ascii-only
