<script lang="ts">
	import { GITHUB_URLS } from '$lib/const';
	import NoResult from '$lib/NoResult.svelte';
	import Search from '$lib/Search.svelte';
	import store from '$lib/store.svelte';
	import { ExternalLink } from 'lucide-svelte';
</script>

<div class="flex flex-grow flex-col">
	<Search />
	<NoResult />
	<ul class="">
		{#each store.wordlistFiltered as { pos, word }}
			<li
				class="flex flex-row items-center justify-center gap-4 border-t-2 border-dashed px-6 py-4 text-2xl text-gray-600 last:border-b-2 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 md:text-4xl"
			>
				<span class="text-gray-400 dark:text-gray-500">#{pos}</span>
				<p class="flex-1 text-center">{word}</p>
				<a
					href={`${GITHUB_URLS[store.wordlistType][store.selectedLang]}#L${pos}`}
					class="text-gray-400 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-300"
				>
					<ExternalLink class="h-6 w-6 text-inherit md:h-8 md:w-8" />
				</a>
			</li>
		{/each}
	</ul>
</div>
