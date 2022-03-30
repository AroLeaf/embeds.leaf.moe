<script>
  export let embed;

  $: text = embed.author.name || '';
</script>


<div class="author">
  {#if embed.author.icon_url}
    <img src={embed.author.icon_url} alt="">
  {/if}
  {#if embed.author.url}
    <a href={embed.author.url}>{text}</a>
  {:else}
    {text}
  {/if}
</div>


<style>
  .author {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
    color: var(--header-primary);
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }

  a {
    color: var(--header-primary);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>