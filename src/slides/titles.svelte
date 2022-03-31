<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Embed from '../components/discord/embed.svelte';

  let root;

  const embed = DME.render(`
    # My Embed
    Hello, this is my embed

    # My field
    This is a field
    
    #-Left
    I'm on the left

    #-Right
    I'm on the right
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
  <h3>Markdown</h3>
  <p>
    The syntax discord uses for styling messages, is a modified version of a standard called markdown.
    It is often used to generate webpages from a simpler syntax than html.<br>
    This website adds missing features from markdown to discord, so you can write embeds in markdown.
  </p>
  <br>
  <h4>Titles</h4>
  <p>The first feature is titles. They automatically get assigned to either the embed title, or a field title, depending on where in the embed they are placed.</p>
  <pre class="language-md"><code class="trim">
# My Embed
Hello, this is my embed

# My field
This is a field
  </code></pre>
  <p>It is also possible to create inline fields:</p>
  <pre class="language-md"><code class="trim">
#-Left
I'm on the left

#-Right
I'm on the right
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