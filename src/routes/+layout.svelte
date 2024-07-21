<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { WordListTypeLiteralSchema } from '$lib/types';
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
	import store from '$lib/store.svelte';
	import '../app.css';
	import * as SC from '@effect/schema/Schema';

	let { children } = $props();

	// Handle changes of `slug` (`WordListType`)
	onNavigate(async (nav) => {
		const slugTo = nav?.to?.params?.['slug'];
		const slugFrom = nav?.from?.params?.['slug'];

		if (slugTo !== slugFrom) {
			// Supported numbers of languages are different for different `WordListType` -> switch always back to `en`
			store.selectedLang = 'en';
			// (unsafe) transform `slugTo` to `WordListType`
			const slug = SC.decodeUnknownSync(WordListTypeLiteralSchema)(slugTo);
			store.setWordlistType(slug);
		}
	});
</script>

<div class="container mx-auto flex min-h-screen flex-col px-4 pt-4 text-gray-600">
	<Header />
	{@render children()}
	<Footer />
</div>

<style></style>
