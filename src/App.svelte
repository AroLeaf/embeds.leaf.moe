<script>
	import { writable } from 'svelte/store';

	import Chat from './components/discord/chat.svelte';
	import Inputs from './components/inputs.svelte';
	
	const messages = writable([]);
</script>


<main>
	<Inputs {messages}/>
	<Chat messages={$messages}/>
</main>


<style>
	main {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: minmax(512px, 1fr);
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