<script context="module">
  /** @type {Set<string>} */
  const focusedKeys = new Set();
</script>

<script>
  import { subscribeToKeyboard } from '@/js/actions.js';
  import { isAndroid, Errors } from '@/js/constants.js';
  import { focusedKey as focusedKey, needsKeyboardEntry } from '@/js/store.js';
  import { replaceableElement } from '@/js/use.js';
  import { createEventDispatcher, onMount } from 'svelte';

  export let replacement = ['', null][0];
  export let disabled = false;
  export let ogchar = '';
  export let disableUnderline = false;
  export let tag = 'div';

  let focused = false;

  $: replacement_ = replacement;
  $: if (replacement_ !== replacement) {
    replacement_ = replacement;
  }

  const handleFocus = () => {
    focusedKeys.add(ogchar);
    focusedKey.set(ogchar);
    focused = true;
  };

  const handleBlur = () => {
    focusedKeys.delete(ogchar);
    focusedKey.set(focusedKeys.size === 1 ? [...focusedKeys][0] : null);
    focused = false;
  };

  const dispatch = createEventDispatcher();

  onMount(() =>
    subscribeToKeyboard((char) => {
      if (!focused) return;
      if (ogchar === char && ogchar !== '') {
        dispatch('error', {
          id: Errors.NO_SELF_DECODE,
          msg: 'Letters cannot decode to themselves',
        });
        return;
      }

      let index = 0; // todo: acutally figure this out
      dispatch('replace', {
        from: ogchar,
        to: char,
        index: index,
      });
    })
  );

  $: if (focused && disabled) focused = false;
  $: if (focused && isAndroid) needsKeyboardEntry.set(true);
  $: if (!focused && isAndroid) needsKeyboardEntry.set(false);
</script>

<svelte:element
  this={tag}
  class="decrypted-letter"
  class:empty={replacement === ''}
  class:focused-char={$focusedKey === ogchar}
  class:non-alphabetic={replacement === null}
  class:enable-underline={!disableUnderline}
  class:disabled
>
  {#if isAndroid}
    <div
      class="decrypted-letter-input"
      tabindex={disabled ? -1 : 0}
      on:focus={handleFocus}
      on:blur={handleBlur}
    >
      {replacement_}
    </div>
  {:else}
    <input
      class="decrypted-letter-input"
      type="text"
      maxlength={1}
      bind:value={replacement_}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {disabled}
      use:replaceableElement={{ ogchar, disabled, dispatch }}
    />
  {/if}
</svelte:element>

<style>
  .decrypted-letter {
    --underline-color: var(--grey);
    width: 1rem;
    height: 1.2rem;
  }

  .decrypted-letter {
    position: relative;
  }

  div.decrypted-letter-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .decrypted-letter-input {
    border: none;
    border-radius: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    text-align: center;
    caret-color: transparent;
    font-family: monospace;
  }

  :not(.disabled).focused-char .decrypted-letter-input {
    cursor: pointer;
    background-color: var(--focused-char-color);
  }

  :not(.disabled) .decrypted-letter-input:hover {
    cursor: pointer;
    background-color: var(--hovered-letter-color);
  }

  :not(.disabled) .decrypted-letter-input:focus {
    background-color: var(--selected-letter-color);
    outline: none;
  }

  .non-alphabetic {
    display: none !important;
  }

  .enable-underline.empty::before {
    content: '-';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--underline-color);
    pointer-events: none;
  }

  .enable-underline.empty:focus-within,
  .enable-underline.focused-char {
    --underline-color: white;
  }

  ::selection {
    background-color: transparent;
  }
</style>
