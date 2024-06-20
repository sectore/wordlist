<script lang="ts">
	import store from '../../store/store.svelte';
</script>

<div class="flex flex-grow flex-col overflow-y-scroll">
	<div class="form-control">
		<input type="text" placeholder="Search" class="input input-bordered md:w-auto" />
	</div>
	<div class="grid grid-cols-4 gap-4 py-6">
		{#each store.selectedWordlist as word, i (word)}
			<div class="card card-bordered bg-base-100 shadow-md">
				<div class="card-body">
					<p class="text-md text-gray-400">#{i + 1}</p>
					<h2 class="text-4xl text-gray-600">{word}</h2>
				</div>
			</div>
		{/each}
	</div>
</div>
