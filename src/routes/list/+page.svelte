<script lang="ts">
	import store from '../../store/store.svelte';
</script>

<div class="flex flex-grow flex-col overflow-y-scroll">
	<div class="form-control">
		<input type="text" placeholder="Search" class="input input-bordered md:w-auto" />
	</div>
	<ul class="">
		{#each store.selectedWordlist as word, i (word)}
			<li
				class="flex flex-row gap-4 border-b-2 border-dashed px-6 py-4 text-3xl text-gray-600 last:border-b-0"
			>
				<span class="text-gray-400">#{i + 1}</span>
				{word}
			</li>
		{/each}
	</ul>
</div>
