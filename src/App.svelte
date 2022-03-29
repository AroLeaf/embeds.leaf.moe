<script>
	import { writable } from 'svelte/store';

	import Chat from './components/discord/chat.svelte';
	import Inputs from './components/inputs.svelte';
	
	const messages = writable([]);

	const user = {
		name: 'Leaf',
		image: 'https://cdn.discordapp.com/avatars/659488296820408355/df8fc8988aa62fd7c1ca1826c5efd92d.png',
		color: '#4c2',
	}
</script>


<main>
	<Inputs {messages}/>
	<Chat messages={$messages} user={user}/>
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