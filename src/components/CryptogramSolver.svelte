<script>
  import { createEventDispatcher } from 'svelte';
  import { alphabet, splitQuote } from '@/js/quotes.js';
  import { log } from '@/js/utils.js';
  import { autofillEnabled } from '@/js/store';

  import Word from './Word.svelte';
  import ReplacementTable from './ReplacementTable.svelte';

  /** @typedef {import('@/js/quotes.js').EncryptedQuote} EncryptedQuote */

  /** @type {EncryptedQuote | null} */
  export let problem = null;

  const dispatch = createEventDispatcher();

  /** @type {string | null}*/
  let replacement = null; // stores the actual sentence instead of replacement alphabet

  /** @type {(replacement: { from: string, to: string, index: number }) => void} */
  const replace = ({ from, to, index }) => {
      if (!replacement) return;
      if ((to.length !== 1 || !/[a-zA-Z]/.test(to)) && to !== 'BACKSPACE') return;
      const newReplacement = [...replacement];
      if (index >= newReplacement.length) return;
      if (index < 0) return;
      newReplacement[index] = to === 'BACKSPACE' ? '\u200B' : to;
      if (autofillEnabled) // replace all instances of `from` to `to`
        for (let i = 0; i < newReplacement.length; i++)
          if (newReplacement[i] === from) newReplacement[i] = to;
      replacement = newReplacement.join('');
    };

  /** @type {(replacement: string | null, problem: EncryptedQuote | null) => boolean} */
  const isCorrect = (replacement, problem) => {
    if (!problem) return false;
    if (!replacement) return false;
    return replacement === problem.plaintext;
  };

  /** @type {(replacement: string | null, ciphertext: string) => number[]} */
  const getProgress = (replacement, ciphertext) => {
      const result = [...ciphertext].map((ch) => { // space: -1, alphabet: 1, '\u200B': 0, non-alphabet: -2
          if (ch == ' ') return -1;
          else if (alphabet.includes(ch)) return 1;
          else if (ch == '\u200B') return 0;
          else return [-2][0]; // returns -2, but makes typescript happy
      });

      return result;
  }

  /** @type {(e: CustomEvent<any>) => void} */
  const handleReplace = (e) => replace(e.detail);

  /** @type {(ciphertext: string|undefined) => string|undefined}*/
  const emptyReplacement = (ciphertext) => {
      if (!ciphertext) return;
      const result = [...ciphertext].map((ch) => 
          alphabet.includes(ch) ? '\u200B' : ch
      );
      return result.join('');
  }

  $: problem, (replacement = emptyReplacement(problem?.ciphertext) ?? '');
  $: words = splitQuote(problem?.ciphertext ?? '');
  $: userwords = splitQuote(replacement ?? '');
  $: solved = isCorrect(replacement, problem);
  $: if (solved) {
    dispatch('solved');
  }
  $: dispatch('progress', {
    progress: getProgress(replacement, problem?.ciphertext ?? ''),
  });

  $: log('problem:', problem, 'replacement', replacement);
</script>

{#if problem}
  <p>Solve this quote by {problem.author}</p>
  {#if problem.hint}
    <p>HINT: The first word is {problem.hint}</p>
  {/if}
  <div class="cryptogram" class:solved>
    {#each words as word, index}
      <Word
        word={word}
        replacement={userwords[index]}
        disabled={solved}
        on:replace={handleReplace}
        on:error
      />
    {/each}
  </div>
  <ReplacementTable
    replacement = {replacement ?? ''}
    quote={problem.ciphertext}
    disabled={solved}
    on:replace={handleReplace}
    on:error
  />
{/if}

<style>
  p {
    margin: 0 0 0.5rem 0;
  }

  .cryptogram {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .solved {
    color: var(--solved-text-color);
  }
</style>
