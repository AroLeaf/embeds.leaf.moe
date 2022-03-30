<script>
	import { writable } from 'svelte/store';

	import Chat from './components/discord/chat.svelte';
	import Inputs from './components/inputs.svelte';
	
	const messages = writable([]);

	$: user = {
		username: $messages[0]?.username || 'webhook',
		avatar_url: $messages[0]?.avatar_url || 'https://cdn.discordapp.com/embed/avatars/1.png',
	}
</script>


<main>
	<Inputs {messages}/>
	<Chat messages={$messages} {user}/>
</main>


<style>
	main {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 16px;
		max-width: 1024px;
		margin: 0px auto;
		padding: 64px;
	}

	@media screen and (max-width: 768px) {
		main {
			grid-template-columns: 1fr;
			grid-template-rows: 512px auto;
		}
	}
</style>