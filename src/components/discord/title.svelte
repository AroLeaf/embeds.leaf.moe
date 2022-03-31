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
    color: var(--header-primary);
  }

  :global(.title pre) {
    white-space: pre-wrap;
    display: block;
    margin-top: 6px;
  }

  :global(.title code) {
    background-color: var(--background-tertiary);
    padding: 2.72px;
    font-size: 14px;
  }

  :global(.title pre code) {
    display: block;
    padding: 7px;
    border-radius: 4px;
  }
</style>