<script>
  export let embed;
</script>


<div class="description">
  {@html embed.description}
</div>


<style>
  .description {
    white-space: pre-line;
    min-width: 0;
    margin-top: 8px;
    font-size: 14px;
  }

  :global(blockquote) {
    position: relative;
    padding-left: 16px;
    margin: 0px;
  }
  :global(blockquote::before) {
    content: '';
    background-color: var(--interactive-muted);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    border-radius: 4px;
  }
  
  :global(.description pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(.description code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(.description pre code) {
    background-color: var(--background-tertiary);
    border: none;
    display: block;
    padding: 7px;
    border-radius: 4px;
  }
</style>