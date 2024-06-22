<script lang="ts">
	import NoResult from '$lib/NoResult.svelte';
	import Search from '$lib/Search.svelte';
	import store from '$lib/store.svelte';
	import { pipe } from 'effect';
	import * as A from 'effect/Array';
	import * as O from 'effect/Option';

	let no = (word: string) =>
		pipe(
			A.findFirstIndex(store.wordlist, (w) => w === word),
			O.map((n) => n + 1),
			O.getOrElse(() => NaN)
		);
</script>

<div class="flex flex-grow flex-col">
	<Search />
	<NoResult />
	<ul class="">
		{#each store.wordlistFiltered as word (word)}
			<li
				class="flex flex-row items-end justify-center gap-4 border-t-2 border-dashed px-6 py-4 text-2xl text-gray-600 last:border-b-2 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 md:text-4xl"
			>
				<span class="text-xl text-gray-400 dark:text-gray-500 md:text-3xl">#{no(word)}</span>
				{word}
			</li>
		{/each}
	</ul>
</div>
