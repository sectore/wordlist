<script lang="ts">
	import store from '$lib/store.svelte';
	import { validIndex, validWord } from './utils';
	import * as S from 'effect/String';
	import * as O from 'effect/Option';

	let filterValue = $state('');
	const isError: boolean = $derived.by(
		() =>
			!S.isEmpty(filterValue) &&
			O.isNone(validIndex(filterValue)) &&
			O.isNone(validWord(filterValue, store.wordlist))
	);

	const onchange = (e: Event & { currentTarget: HTMLInputElement }) => {
		// set filter value
		filterValue = e.currentTarget.value;
		// update store
		store.filter = S.isEmpty(filterValue) ? O.none() : O.some(filterValue);
	};
</script>

<div class="form-control flex items-center py-20">
	<input
		type="text"
		value={filterValue}
		placeholder="filter by # or words"
		class="input input-lg w-1/3 rounded-xl bg-gray-200 text-2xl placeholder:text-gray-400"
		maxlength="8"
		class:text-red-300={isError}
		class:input-error={isError}
		oninput={onchange}
	/>
	{#if isError}
		<p class="pt-2 text-sm text-red-400">Invalid input! Enter word positions or valid words only</p>
	{/if}
</div>
