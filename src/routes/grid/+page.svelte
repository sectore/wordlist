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

<div class="flex flex-grow flex-col overflow-y-scroll">
	<Search />
	<NoResult />
	<div class="grid grid-cols-2 gap-4 xl:grid-cols-4">
		{#each store.wordlistFiltered as word (word)}
			<div
				class="card border border-gray-100 shadow-md hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
			>
				<div class="card-body">
					<p class="text-base text-gray-400 dark:text-gray-400 md:text-lg">#{no(word)}</p>
					<h2 class="text-2xl text-gray-600 dark:text-gray-300 md:text-4xl">{word}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
