<script lang="ts">
	import store from '$lib/store.svelte';
	import { Angry } from 'lucide-svelte';

	const iconSize = 'h-8 w-8 md:h-12 w-12';
</script>

{#if !store.wordlistFiltered.length}
	<div
		class="flex flex-grow items-center justify-center text-4xl uppercase text-gray-300 md:text-6xl"
	>
		<Angry class="mr-3 {iconSize}" strokeWidth={2.1} /> No result <Angry
			class="ml-3 {iconSize}"
			strokeWidth={2.1}
		/>
	</div>
{/if}
