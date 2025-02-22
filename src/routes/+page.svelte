<script lang="ts">
	import { goto } from '$app/navigation';
	import store from '$lib/store.svelte';

	// To continue with `WordListType` an user used before
	// re-direct to it
	$effect(() => {
		console.log('Effect redirect');
		goto(`/wordlist/${store.wordlistType}`);
	});
</script>
