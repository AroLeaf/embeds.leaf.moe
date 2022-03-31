<script>
	import { writable } from 'svelte/store';

	import Chat from './components/discord/chat.svelte';
	import Inputs from './components/inputs.svelte';
	import Modal from './components/modal.svelte';
	import Slides from './components/slides.svelte';

	import Intro from './slides/intro.svelte';
	import Titles from './slides/titles.svelte';
	import Images from './slides/images.svelte';
	import Color from './slides/color.svelte';
	import AuthorFooter from './slides/author_footer.svelte';
	import Thumbnail from './slides/thumbnail.svelte';
	import Message from './slides/message.svelte';

	const slides = [
		Intro,
		Titles,
		Images,
		Color,
		AuthorFooter,
		Thumbnail,
		Message,
	];
	
	const messages = writable([]);
</script>


<main>
	<Inputs {messages}/>
	<Chat messages={$messages}/>
	<Modal id="help-modal">
		<Slides {slides}/>
	</Modal>
</main>


<style>
	main {
		position: relative;
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