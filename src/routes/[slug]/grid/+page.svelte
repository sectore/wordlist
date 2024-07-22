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
	<div class="grid grid-cols-2 gap-4 xl:grid-cols-4">
		{#each store.wordlistFiltered as { pos, word }}
			<div
				class="card border border-gray-100 shadow-md hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
			>
				<div class="card-body">
					<div class="flex items-center text-gray-400 dark:text-gray-500">
						<p class="flex-1 text-xl md:text-2xl">#{pos}</p>
						<a
							href={`${GITHUB_URLS[store.wordlistType][store.selectedLang]}#L${pos}`}
							class="hover:text-gray-600 hover:dark:text-gray-300"
						>
							<ExternalLink class="h-6 w-6 text-inherit md:h-7 md:w-7" />
						</a>
					</div>
					<h2 class="text-2xl text-gray-600 dark:text-gray-300 md:text-4xl">{word}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
