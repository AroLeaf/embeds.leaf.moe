<div class="slide">
  <slot name="text"></slot>
  <slot name="embed"></slot>
</div>


<style>
  .slide {
    height: auto;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  :global(.slide pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(.slide code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(.slide pre code) {
    background: var(--background-secondary);
    border: 1px solid var(--background-tertiary);
    display: block;
    padding: 7px;
    border-radius: 4px;
  }

  @media screen and (max-width: 540px) {
    .slide {
      grid-template-columns: 1fr;
      overflow-y: auto;
    }
  }
</style>