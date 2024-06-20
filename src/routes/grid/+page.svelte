<script lang="ts">
	import NoResult from '$lib/NoResult.svelte';
	import Search from '$lib/Search.svelte';
	import store from '$lib/store.svelte';
</script>

<div class="flex flex-grow flex-col overflow-y-scroll">
	<Search />
	<NoResult />
	<div class="grid grid-cols-4 gap-4 py-6">
		{#each store.wordlistFiltered as word, i (word)}
			<div class="card card-bordered bg-base-100 shadow-md">
				<div class="card-body">
					<p class="text-md text-gray-400">#{i + 1}</p>
					<h2 class="text-4xl text-gray-600">{word}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
