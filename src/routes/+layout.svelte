<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import type { WordListType } from '$lib/types';
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
	import store from '$lib/store.svelte';
	import '../app.css';
	import { pipe, Option as O, String as S } from 'effect';

	let { children } = $props();

	export const hasSlug = (slug: string, t: WordListType) =>
		pipe(
			slug,
			O.liftPredicate(S.isNonEmpty),
			O.map((s) => S.Equivalence(s, t)),
			O.getOrElse(() => false)
		);

	onNavigate(async (nav) => {
		const slug = nav?.to?.params?.['slug'] || '';
		if (hasSlug(slug, 'bip39')) {
			store.setWordlistType('bip39');
		} else if (hasSlug(slug, 'slip39')) {
			store.setWordlistType('slip39');
		} else {
			// nothing
		}
	});
</script>

<div class="container mx-auto flex min-h-screen flex-col px-4 pt-4 text-gray-600">
	<Header />
	{@render children()}
	<Footer />
</div>

<style></style>
