<script>
  export let slides = [];
  let idx = 0;

  function set(i) {
    idx = Math.max(0, Math.min(slides.length-1, i));
  }

  function left() { set(idx-1) }
  function right() { set(idx+1) }
</script>


<div class="slides">
  <svelte:component this={slides[idx]}/>
  <div class="buttons">
    <div class="button" on:click={left}><svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg></div>
    {#each slides as _, i }
      <span class="circle" class:active={i==idx} on:click={() => set(i)}></span>
    {/each}
    <div class="button" on:click={right}><svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg></div>
  </div>
</div>


<style>
  .slides {
    max-width: 1024px;
    width: 100%;
    height: 75vh;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
  }

  .buttons {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 16px;
  }

  .circle {
    display: inline-block;
    background-color: var(--interactive-normal);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: .15s;
    cursor: pointer;
  }
  .circle:hover {
    background-color: var(--interactive-hover);
  }
  .circle.active {
    background-color: var(--interactive-active);
  }

  .button {
    color: var(--interactive-normal);
    transition: .15s;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .button:hover {
    color: var(--interactive-hover);
  }
  .button:active {
    color: var(--interactive-active);
  }

  @media screen and (max-width: 540px) {
    .slides {
      height: 90vh;
    }
  }
</style>