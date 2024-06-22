<script lang="ts">
	import store from '$lib/store.svelte';
	import { validIndex, validWord } from './utils';
	import * as S from 'effect/String';
	import * as O from 'effect/Option';
	import { Search, X } from 'lucide-svelte';
	import { pipe } from 'effect';

	let filterValue = $derived.by(() =>
		pipe(
			store.filter,
			O.getOrElse(() => '')
		)
	);
	const isError: boolean = $derived.by(
		() =>
			!S.isEmpty(filterValue) &&
			O.isNone(validIndex(filterValue)) &&
			O.isNone(validWord(filterValue, store.wordlist))
	);

	const onchange = (e: Event & { currentTarget: HTMLInputElement }) => {
		// set filter value
		const value = e.currentTarget.value;
		// update store
		store.filter = S.isEmpty(value) ? O.none() : O.some(value);
	};
</script>

<div class="flex flex-col py-20">
	<div class="flex justify-center">
		<label
			class="input input-md flex items-center gap-0 border-none bg-gray-200 p-1 text-gray-600 dark:bg-gray-700 dark:text-gray-300 md:p-4"
		>
			<Search class="mx-2 h-5 w-5 text-gray-400 md:mx-0 md:h-6 md:w-6" />
			<input
				type="text"
				value={filterValue}
				placeholder="filter by word or position"
				class=" py-20 text-lg md:input-lg placeholder:text-gray-400 dark:placeholder:text-gray-500 md:text-2xl"
				maxlength="8"
				class:text-red-400={isError}
				oninput={onchange}
			/>
			<X
				class="mx-2 h-5 w-5 cursor-pointer text-gray-400 md:mx-0 md:h-6 md:w-6 {O.isSome(
					store.filter
				)
					? 'opacity-1'
					: 'opacity-0'}"
				onclick={() => (store.filter = O.none())}
			/>
		</label>
	</div>
	{#if !isError}
		<p class="mt-5 text-center text-sm uppercase text-gray-400 dark:text-gray-400">
			<span class="text-5xl font-bold">{store.wordlistFiltered.length}</span><br /> word{store
				.wordlistFiltered.length > 1
				? 's'
				: ''}
		</p>
	{/if}
</div>
