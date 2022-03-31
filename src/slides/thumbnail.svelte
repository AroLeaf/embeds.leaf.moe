<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embeds = DME.render(`
---
thumbnail:
  url: https://leaf.moe/assets/sayuleaf.png
  all: true
---
# An embed

![](https://i.ibb.co/ZgFsw9d/unknown.jpg)

# Another embed
  `, { html: true });

  onMount(() => {
    for (const e of root.querySelectorAll('.trim')) {
      e.innerHTML = e.innerHTML.trim();
      hljs.highlightElement(e);
    }
  });
</script>


<Base>
<div class="text" slot="text" bind:this={root}>
  <h3>Thumbnails</h3>
  <p>Adding a thumbnail works similar to authors and footers:</p>
  <pre class="language-yaml"><code class="trim">
---
thumbnail: https://leaf.moe/assets/sayuleaf.png
---
  </code></pre>
  <p>Including being able to add it to all embeds:</p>
  <pre class="language-yaml"><code class="trim">
---
thumbnail: 
  url: https://leaf.moe/assets/sayuleaf.png
  all: true
---
  </code></pre>
</div>
<div class="embeds" slot="embed">
  {#each embeds as embed}
    <Embed {embed}/>
  {/each}
</div>
</Base>


<style>
  .text, .embeds {
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    overflow-y: auto;
  }

  .embeds {
    display: flex;
    gap: 4px;
    flex-direction: column;
    justify-items: start;
  }

  @media screen and (max-width: 540px) {
    .text, .embeds {
      overflow: visible;
    }
  }
</style>