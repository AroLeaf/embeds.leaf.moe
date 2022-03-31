<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embeds = DME.render(`
---
author:
  name: Leaf
  icon_url: https://leaf.moe/assets/sayuleaf.png
  url: https://leaf.moe
footer:
  text: I'm at the bottom!
  icon_url: https://leaf.moe/assets/sayuleaf.png
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
  <h3>Author & Footer</h3>
  <p>The author and footer of a document are written almost the same. The easiest is just text:</p>
  <pre class="language-yaml"><code class="trim">
---
author: Leaf
footer: I'm at the bottom!
---
  </code></pre>
  <h4>Adding Images</h4>
  <p>If you want to add images, you'll have to write a little more:</p>
  <pre class="language-yaml"><code class="trim">
---
author:
  name: Leaf
  icon_url: https://leaf.moe/assets/sayuleaf.png
  url: https://leaf.moe
footer:
  text: I'm at the bottom!
  icon_url: https://leaf.moe/assets/sayuleaf.png
---
  </code></pre>
  <h4>All Embeds</h4>
  <p>To make an author or footer show up in all embeds, set <code>all</code> to <code>true</code>:</p>
  <pre class="language-yaml"><code class="trim">
---
author:
  name: Leaf
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