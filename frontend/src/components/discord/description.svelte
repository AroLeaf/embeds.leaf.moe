<script>
  export let embed;
</script>


<div class="description">
  {@html embed.description}
</div>


<style>
  .description {
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

  :global(.mention) {
    background-color: #404675;
    padding: 4px 2px 0px;
    border-radius: 3px;
  }
  :global(.mention:hover) {
    background-color: #5865f2;
  }

  :global(:is(ul, ol)) {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
  }

  :global(.emoji) {
    object-fit: contain;
    width: 1.375em;
    height: 1.375em;
    vertical-align: bottom;
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