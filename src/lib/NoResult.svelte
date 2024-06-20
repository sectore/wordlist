<script lang="ts">
	import store from '$lib/store.svelte';
	import { Angry } from 'lucide-svelte';
</script>

{#if !store.wordlistFiltered.length}
	<div
		class="flex flex-grow items-center justify-center text-6xl font-semibold uppercase text-gray-300"
	>
		No result <Angry class="ml-3 h-12 w-12" strokeWidth={2.5} />
	</div>
{/if}
