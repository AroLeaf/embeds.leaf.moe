<script>
  export let embed;
</script>


<div class="title">
  {#if embed.url}
    <a href={embed.url}>{@html embed.title}</a>
  {:else}
    {@html embed.title}
  {/if}
</div>


<style>
  .title {
    margin-top: 8px;
    font-weight: 600;
  }

  :global(pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(pre code) {
    display: block;
    padding: 7px;
    border-radius: 4px;
  }
</style>