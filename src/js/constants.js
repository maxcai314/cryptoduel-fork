/** @typedef {{ id: Errors, msg: string }} Error */

export const external = {
  // @ts-ignore
  Peer: window.Peer,
};

/** @enum {number} */
export const Messages = {
  INIT_STATE: 0,
  NEW_PROBLEM: 1,
  UPDATE_SERVER_STATE: 2,
  UPDATE_CLIENT_STATE: 3,
};

export const hivemindBrain = new URLSearchParams(location.search).get('game');
export const isHivemindBrain = hivemindBrain === null;
export const isAndroid = window.navigator.userAgent.includes('Android');

/** @enum {string} */
export const Errors = {
  NO_SELF_DECODE: 'no-self-decode',
};

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// random strings to keep track of
export const noshow = 'dontshow';
export const firstlaunch = 'has-launched';
export const cryptogramCharacterLabel = 'Cryptogram character';
export const occurencesCharacterLabel = 'Occurences of character';
export const replacementCharacterLabel = 'Replacement for character';

export const congratulationTitles = [
  'Congratulations!',
  'Let\'s gooo',
  'what took you so long?',
  'I knew you could do it',
  'What a speedy boi',
  'wow that\'s hot',
  'Sheeesh',
  "who do you think you are?",
  ":skull: :skull: :skull:",
  'You finished as fast as an MIT boy',
  'what does lilbro think he\'s doing?',
  'Vroom vroom',
  'You just broke the sound barrier',
  "Are you 30k mph, cause you're faster than escape velocity",
  'Too smart, too fast',
  'ZHOOOOOM',
  'wait what',
  'but how',
  'you solved it!',
  'Haha cryptogram go brrr',
  "CMU for life??",
  'Most speedy cryptonerd',
  'I *c* you',
  "nerd emoji",
  'You spend too much time on these puzzles, touch grass',
  'is that on god???',
  'for real???',
  'You\'re faster than bullet chess fr',
  'Quite e-e-e-legaaant',
  'Codebusters best event??',
  'Speedy and steady wins the race',
  "You're almost as fast as C",
  'Are you JIT compiled, cause that was a massive speedup',
  'That took you so little time, spacetime became just space',
  'You going so fast, you escaped a black hole',
  'what is bud doing',
  'alright buddy',
  '+10 points',
  'same!',
  'lmao',
  'nice one',
  'nice one buddy',
  'what is bro doing',
  'bro thinks he\'s hikaru',
  'chill bro',
  'hey don\'t call me buddy, buddy',
  'so profound',
  'you\'re so smart!!',
  'zamn',
  'that was saucy',
  'too good',
  'too good for real',
  'no cap on god',
  'fr!',
  'you finished!',
  'Ok and?',
  'ok but where are your friends?',
  'get a social life',
  'get a life bozo',
  'ur cracked',
  'cracked for real',
  "bro's cracked",
  'too good',
  'skill issue',
  'skilled',
  'bro is magnus carlsen',
  'getting there',
];
