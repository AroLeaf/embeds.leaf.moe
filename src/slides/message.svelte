<script>
  import DME from 'discord-markdown-embeds';
  import { onMount } from 'svelte';

  import Base from './base.svelte';
  import Chat from '../components/discord/chat.svelte';

  let root;



  const messages = [
    DME.render(`
---
content: This is a message
---
    `, { html: true }).messages()[0],
    DME.render(`
---
content: Hi, my name is Leaf!
username: Leaf
avatar_url: https://leaf.moe/assets/sayuleaf.png
---
    `, { html: true }).messages()[0],
  ];

  onMount(() => {
    for (const e of root.querySelectorAll('.trim')) {
      e.innerHTML = e.innerHTML.trim();
      hljs.highlightElement(e);
    }
  });
</script>


<Base>
<div class="text" slot="text" bind:this={root}>
  <h3>Message Content</h3>
  <p>You can also change things outside of the embeds, for example, message content:</p>
  <pre class="language-yaml"><code class="trim">
---
content: This is a message
---
  </code></pre>
  <h4>User</h4>
  <p>You can also change the username and avatar the webhook will send the message with:</p>
  <pre class="language-yaml"><code class="trim">
---
content: Hi, my name is Leaf!
username: Leaf
avatar_url: https://leaf.moe/assets/sayuleaf.png
---
  </code></pre>
</div>
<div class="embeds" slot="embed">
  <Chat {messages}/>
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