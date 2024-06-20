<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import store from '$lib/store.svelte';
	import { pipe } from 'effect';
	import { findFirstIndex } from 'effect/Array';
	import { getOrElse } from 'effect/Option';
	let noVisible = $state(false);
	let wordIndex = $state(0);
	let no = $derived.by(() => {
		const w = store.wordlistRandomizable[wordIndex];
		return pipe(
			findFirstIndex(store.wordlist, (wv) => wv === w),
			getOrElse(() => -2),
			(n) => n + 1
		);
	});
</script>

<div class="flex flex-grow flex-col items-center">
	<div class="flex flex-grow flex-col items-center justify-center">
		<div class="flex flex-row items-baseline">
			<h3
				class="mr-1 text-5xl text-gray-400 transition-opacity duration-150"
				class:opacity-0={!noVisible}
				class:opacity-100={noVisible}
			>
				#{no}
			</h3>
			<span class="text-sm uppercase text-gray-400"
				>of <span class="font-bold">{store.wordlistRandomizable.length}</span> words</span
			>
		</div>
		<div class="py-4 text-9xl">
			<TypeWriter
				texts={store.wordlistRandomizable}
				blinksBetweenTexts={0}
				typeSpeed={30}
				deleteSpeed={30}
				ontypestart={(i: number) => {
        noVisible = true
        wordIndex = i;
      }}
				ondeleteend={() => {
					noVisible = false;
				}}
			/>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer">
				<input
					type="checkbox"
					checked={store.randomize}
					class="checkbox checkbox-sm"
					onchange={(e: Event & { currentTarget: HTMLInputElement }) => store.randomize = e.currentTarget.checked}
				/>
				<span class="label-text ml-2 uppercase text-gray-400">Randomize</span>
			</label>
		</div>
	</div>
</div>
