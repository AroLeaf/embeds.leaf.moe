<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embeds = DME.render(`
---
color:
  - 0x44cc22
  - '#ffffff'
---
# Green embed 🍃

![](https://i.ibb.co/ZgFsw9d/unknown.jpg)

# White embed
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
  <h3>Frontmater</h3>
  <p>Frontmatter is not officially part of markdown, but is often used to add extra data to markdown files, and is often written in a language called YAML.</p>
  <br>
  <h4>Embed Color</h4>
  <p>Colors start with <code>0x</code> or <code>#</code>, but since <code>#</code> starts a comment in YAML, you'll have to surround it in quotation marks.</p>
  <pre class="language-yaml"><code class="trim">
---
color: 0x44cc22
---
# Green embed 🍃
  </code></pre>
  <p>You can also give different embeds different colors. If there are more embeds than colors, it will start at the first color again.</p>
  <pre class="language-yaml"><code class="trim">
---
color: 
  - 0x44cc22
  - '#ffffff'
---
# White embed
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