<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embed = DME.render(`
    *italics*\\
    **bold**\\
    ~~strikethrough~~\\
    __underline__\\
    \`inline code\`
\`\`\`
code block
\`\`\`
    > quote
    > can be multiline

    [not a rickroll](https://www.youtube.com/watch?v=dQw4w9WgXcQ click me!)
  `, { html: true })[0];

  onMount(() => {
    for (const e of root.querySelectorAll('.trim')) {
      e.innerHTML = e.innerHTML.trim();
      hljs.highlightElement(e);
    }
  });
</script>


<Base>
<div class="text" slot="text" bind:this={root}>
  <h3>Discord Styling</h3>
  <p>If you've been using discord for a while, you're probably familiar with the way you style text in messages:</p>
  <pre class="language-md"><code class="trim">
*italics*
**bold**
~~strikethrough~~
__underline__
`inline code`
```
code block
```
&gt; quote
&gt; can be multiline
  </code></pre>
  <h4>Masked Links</h4>
  <p>Embeds and webhook messages allow for one more special syntax, masked links. You can give a link custom text, and a custom tooltip when hovering over it:</p>
  <pre class="language-md"><code class="trim">
[not a rickroll](https://www.youtube.com/watch?v=dQw4w9WgXcQ 'click me!')
  </code></pre>
</div>
<div class="embed" slot="embed">
  <Embed {embed}/>
</div>
</Base>


<style>
  .text, .embed {
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    overflow-y: auto;
  }

  @media screen and (max-width: 540px) {
    .text, .embed {
      overflow: visible;
    }
  }
</style>