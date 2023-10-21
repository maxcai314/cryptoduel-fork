/**
 * Utilities with logic specific to cryptoduel
 */

import { choose, fmtTime } from './utils.js';
import { congratulationTitles, isHivemindBrain } from './constants.js';
import { alphabet } from '@/js/quotes.js';

/** @typedef {import('./quotes.js').EncryptedQuote} EncryptedQuote */

/** @type {(gp: EncryptedQuote | null) => number[]} */
export const getEmptyProgress = (gp) =>
  gp === null ? [] : [...gp.ciphertext].map((ch) => {
    if (ch == ' ') return -1;
    else if (!alphabet.includes(ch)) return -2;
    else return 0;
  });

/** @type {(timeTaken: number) => string} */
export const getCongratulationsMessage = (timeTaken) => {
  return `You solved the quote in ${fmtTime(timeTaken)}!`;
};

/** @type {() => string} */
export const getCongratulationsTitle = () => choose(congratulationTitles);

/** @type {(id: string) => string} */
export const getJoinLink = (id) =>
  isHivemindBrain
    ? `${window.location.href}?game=${encodeURIComponent(id)}`
    : window.location.href;
