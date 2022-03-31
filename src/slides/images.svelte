<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embeds = DME.render(`
    ![](https://leaf.moe/assets/og.png)
    
    # Content
    This is content

    Images inside text ![](https://leaf.moe/assets/sayuleaf.png) split the text
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
  <h3>Images</h3>
  <p>You can also add images to your embeds:</p>
  <pre class="language-md"><code class="trim">
![](https://leaf.moe/assets/og.png)
  </code></pre>
  <p>Additional content gets placed in a new embed automatically:</p>
  <pre class="language-md"><code class="trim">
# Content
This is content
  </code></pre>
  <p>Placing images inside text splits the text into separate paragraphs at the image, it is currently not possible to render images inline with the text.</p>
  <pre class="language-md"><code class="trim">
Images inside text ![](https://leaf.moe/assets/sayuleaf.png) split the text
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