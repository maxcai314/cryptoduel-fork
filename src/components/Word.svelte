<script>
  import { alphabet } from '@/js/quotes.js';
  import { getDuplicates } from '@/js/utils.js';

  import ReplacementCharacter from './ReplacementCharacter.svelte';

  export let word = ''; // the unencrypted word
  export let replacement = ''; // stores the actual sentence instead of replacement alphabet

  export let disabled = false;

  /** @type {(word: string, replacement: string) => Array<string | null>} */
  const replaceChars = (word, replacement) => 
    [...word].map((ch, index) => {
      if (!alphabet.includes(ch)) return null;
      if (replacement[index] === '\u200B') return '';
      return replacement[index];
    }); // null if char is not alphabetic, '' if no replacement, char if replacement

  $: replacedChars = replaceChars(word, replacement);
  $: duplicateReplacements = getDuplicates(replacement);
</script>

<div class="word">
  {#each word as ch, i}
    {@const replacement = replacedChars[i]}
    {@const duplicate =
      replacement !== '' && duplicateReplacements.has(replacement)}
    <div class="plain-encrypt-pair" class:duplicate>
      <div class="cipher-letter">{ch}</div>
      <ReplacementCharacter
        {replacement}
        {disabled}
        ogchar={word[i]}
        on:error
        on:replace
      />
    </div>
  {/each}
</div>

<style>
  .word {
    display: flex;
    flex-direction: row;
    gap: 0;
  }

  .plain-encrypt-pair {
    display: flex;
    flex-direction: column;
    max-width: 1.5rem;
    width: 1rem;
    gap: 0.25rem;
    position: relative;
  }

  .cipher-letter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
    padding: 0;
    width: 1rem;
  }

  .duplicate {
    background-color: var(--red);
  }
</style>
