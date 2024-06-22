<script lang="ts">
	import NoResult from '$lib/NoResult.svelte';
	import Search from '$lib/Search.svelte';
	import store from '$lib/store.svelte';
</script>

<div class="flex flex-grow flex-col overflow-y-scroll">
	<Search />
	<NoResult />
	<ul class="">
		{#each store.wordlistFiltered as word, i (word)}
			<li
				class="flex flex-row items-end justify-center gap-4 border-t-2 border-dashed px-6 py-4 text-2xl text-gray-600 last:border-b-2 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 md:text-4xl"
			>
				<span class="text-xl text-gray-400 dark:text-gray-500 md:text-3xl">#{i + 1}</span>
				{word}
			</li>
		{/each}
	</ul>
</div>
