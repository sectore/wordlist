<script lang="ts">
	import NoResult from '$lib/NoResult.svelte';
	import Search from '$lib/Search.svelte';
	import store from '$lib/store.svelte';
</script>

<div class="flex flex-grow flex-col overflow-y-scroll">
	<Search />
	<NoResult />
	<div class="grid grid-cols-2 gap-4 py-6 xl:grid-cols-4">
		{#each store.wordlistFiltered as word, i (word)}
			<div
				class="card border border-gray-100 shadow-md hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
			>
				<div class="card-body">
					<p class="text-lg text-gray-400 dark:text-gray-400">#{i + 1}</p>
					<h2 class="text-4xl text-gray-600 dark:text-gray-300">{word}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
