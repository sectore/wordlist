<script lang="ts">
	import { page } from '$app/stores';
	import { AlignJustify, LayoutGrid, Moon, Repeat2, Sun } from 'lucide-svelte';
	import { SUB_PATH } from '$lib/const';
	import store from '$lib/store.svelte';
	import { type LANG } from '$lib/types';
	import { getFullPath } from '$lib/utils';
	import T from '$lib/theme.svelte';

	const isSubPath = (subPath: SUB_PATH) => $page.url.pathname.endsWith(subPath);

	const isBip39 = $derived(store.wordlistType === 'bip39');
	const isSlip39 = $derived(store.wordlistType === 'slip39');

	const langLabel = $derived.by(() => {
		const l = store.languages.length;
		return `${l} language${l > 1 ? 's' : ''}`;
	});
</script>

<header class="flex w-full items-center justify-center md:flex-row md:justify-normal">
	<div class="flex w-full gap-2 text-gray-600 dark:text-gray-300">
		<a
			href={getFullPath(store.wordlistType, SUB_PATH.HOME)}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 {isSubPath(
				SUB_PATH.HOME
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="typewriter"
		>
			<Repeat2 strokeWidth={isSubPath(SUB_PATH.HOME) ? 1.2 : 1} />
		</a>
		<a
			href={getFullPath(store.wordlistType, SUB_PATH.GRID)}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 {isSubPath(
				SUB_PATH.GRID
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="grid view"
		>
			<LayoutGrid strokeWidth={isSubPath(SUB_PATH.GRID) ? 1.2 : 1} />
		</a>
		<a
			href={getFullPath(store.wordlistType, SUB_PATH.LIST)}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100 {isSubPath(
				SUB_PATH.LIST
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="list view"
		>
			<AlignJustify strokeWidth={isSubPath(SUB_PATH.LIST) ? 1.2 : 1} />
		</a>
	</div>

	<div
		class="ml-2 flex-none cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 md:ml-20"
	>
		{#if T.theme === 'dark'}
			<Sun strokeWidth={1.5} onclick={() => T.setTheme('light')} />
		{:else}
			<Moon strokeWidth={1.5} onclick={() => T.setTheme('dark')} />
		{/if}
	</div>
</header>
<div
	class="mt-5 flex flex-col items-center justify-center gap-1 pt-10 text-gray-500 dark:text-gray-400"
>
	<h1
		class={`mb-10 flex justify-center text-3xl uppercase text-gray-700 dark:text-gray-300 md:text-4xl`}
	>
		<a
			class="ease mr-4 border-b-8 border-transparent font-bold text-gray-400 hover:border-gray-800 hover:text-gray-800 dark:text-gray-400 dark:hover:border-gray-50 dark:hover:text-gray-50 {isBip39
				? ' !border-gray-800 text-gray-600 dark:!border-gray-50 dark:text-gray-50'
				: ''}"
			class:dark:text-gray-100={isBip39}
			class:border-gray-800={isBip39}
			class:dark:border-gray-100={isBip39}
			class:border-gray-600={isBip39}
			href={$page.url.pathname.replace('slip39', 'bip39')}>BIP-39</a
		>

		<a
			class="ease ml-4 border-b-8 border-transparent font-bold text-gray-400 hover:border-gray-800 hover:text-gray-800 dark:text-gray-400 dark:hover:border-gray-50 dark:hover:text-gray-50 {isSlip39
				? ' !border-gray-800 text-gray-600 dark:!border-gray-50 dark:text-gray-50'
				: ''}"
			href={$page.url.pathname.replace('bip39', 'slip39')}>SLIP-39</a
		>
	</h1>
	<p class="text-xs uppercase">
		{langLabel}
	</p>
	<select
		class="select select-ghost btn-sm select-xs bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400"
		onchange={(e: Event & { currentTarget: HTMLSelectElement }) =>
			(store.selectedLang = e.currentTarget.value as LANG)}
	>
		{#each store.languages as l (l)}
			<option class="text-gray-600 dark:text-gray-400" selected={store.selectedLang === l} value={l}
				>{l.toUpperCase()}</option
			>
		{/each}
	</select>
</div>
