<script>
  import Author from './author.svelte';
  import Title from './title.svelte';
  import Description from './description.svelte';
  import Fields from './fields.svelte';
  import Image from './image.svelte';
  import Footer from './footer.svelte';
  import Thumbnail from './thumbnail.svelte';

  export let embed;
</script>


<div class="embed" style={embed.color?`border-color:#${embed.color.toString(16)}`:""}>
  <div class="grid">
    <div class="content">
      {#if embed.author}
        <Author {embed}/>
      {/if}
      {#if embed.title}
        <Title {embed}/>
      {/if}
      {#if embed.description}
        <Description {embed}/>
      {/if}
      {#if embed.fields?.length}
        <Fields {embed}/>
      {/if}
    </div>
    {#if embed.thumbnail}
      <Thumbnail {embed}/>
    {/if}
  </div>
  {#if embed.image}
    <Image {embed}/>
  {/if}
  {#if embed.footer || embed.timestamp}
    <Footer {embed}/>
  {/if}
</div>


<style>
  .embed {
    width: fit-content;
    max-width: 432px;
    border-radius: 4px;
    border-left: 4px solid var(--background-tertiary);
    background: var(--background-secondary);
    padding: 8px 16px 16px 12px;
  }

  .grid {
    display: grid;
    /* grid-template-columns: minmax(400px, 1fr) auto; */
  }
</style>