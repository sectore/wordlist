<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import store from '$lib/store.svelte';
	import { pipe, Effect as E } from 'effect';
	import { getOrElse } from 'effect/Option';
	import * as A from 'effect/Array';
	import * as O from 'effect/Option';
	import * as B from 'effect/Boolean';
	import { shuffle } from 'effect/Random';

	let noVisible = $state(false);
	let currentWord = $state('');
	let wordlistTypeable = $derived.by(() =>
		pipe(
			store.randomize,
			B.match({
				onFalse: () => store.wordlist,
				// randomize wordlist
				onTrue: () => pipe(store.wordlist, shuffle, E.map(A.fromIterable), E.runSync)
			}),
			A.map(({ word }) => word)
		)
	);

	let no = $derived.by(() =>
		pipe(
			A.findFirst(store.wordlist, ({ word }) => word === currentWord),
			O.map(({ pos }) => `${pos}`),
			getOrElse(() => '?')
		)
	);
</script>

<div class="flex flex-grow flex-col items-center">
	<div class="flex flex-grow flex-col items-center justify-center">
		<div class="flex flex-row items-baseline">
			<h3
				class="mr-1 text-3xl text-gray-400 transition-opacity duration-150 dark:text-gray-400 md:text-5xl"
				class:opacity-0={!noVisible}
				class:opacity-100={noVisible}
			>
				#{no}
			</h3>
			<span class="text-sm uppercase text-gray-400 dark:text-gray-400"
				>of <span class="font-bold">{wordlistTypeable.length}</span> words</span
			>
		</div>
		<div class="py-4 text-6xl text-gray-600 dark:text-gray-300 md:text-8xl xl:text-9xl">
			<TypeWriter
				texts={wordlistTypeable}
				blinksBetweenTexts={0}
				typeSpeed={30}
				deleteSpeed={30}
				ontypestart={(i: number) => {
        noVisible = true
        currentWord = wordlistTypeable[i];
      }}
				ondeleteend={() => {
					noVisible = false;
				}}
			/>
		</div>
		<div class="form-control">
			<label class="group label cursor-pointer">
				<input
					type="checkbox"
					checked={store.randomize}
					class="checkbox checkbox-sm border-gray-400 group-hover:border-gray-600 dark:border-gray-400 group-hover:dark:border-gray-200"
					onchange={(e: Event & { currentTarget: HTMLInputElement }) => store.randomize = e.currentTarget.checked}
				/>
				<span
					class="label-text ml-2 uppercase text-gray-400 group-hover:text-gray-600 dark:text-gray-400 group-hover:dark:text-gray-200"
					>Randomize</span
				>
			</label>
		</div>
	</div>
</div>
