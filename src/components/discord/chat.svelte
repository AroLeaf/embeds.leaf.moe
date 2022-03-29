<script>
  import { afterUpdate } from 'svelte';
  import Message from './message.svelte';

  export let messages;
  export let user;

  afterUpdate(() => {
		setTimeout(() => {
			hljs.highlightAll();
		}, 0);
	});
</script>


<div class="chat">
  {#each messages as message}
    <Message message={message} user={user}/>
  {/each}
</div>


<style>
  .chat {
    background-color: var(--background-primary);
    padding: 8px 0px;
    border-radius: 8px;
  }

  @media screen and (max-width: 768px) {
    .chat {
      min-width: none;
    }
  }
</style>