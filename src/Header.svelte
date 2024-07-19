<script lang="ts">
	import { page } from '$app/stores';
	import { AlignJustify, LayoutGrid, Moon, Repeat2, Sun } from 'lucide-svelte';
	import store, { PATHS as P } from '$lib/store.svelte';
	import { languages, type LANG } from '$lib/types';
	import T from '$lib/theme.svelte';

	const isPath = (path: string) => $page.url.pathname === path;
</script>

{#snippet headline(clazz)}
	<h1 class={`flex-1 justify-center text-4xl uppercase text-gray-700 dark:text-gray-300 ${clazz}`}>
		<a
			class="mr-2 font-bold text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-50"
			href="https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md">BIP-39</a
		> word list
	</h1>
{/snippet}

<header class="flex w-full items-center justify-center md:flex-row md:justify-normal">
	<div class="flex gap-2 text-gray-600 dark:text-gray-300">
		<a
			href={P.HOME}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 {isPath(
				P.HOME
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="typewriter"
		>
			<Repeat2 strokeWidth={isPath(P.HOME) ? 1.2 : 1} />
		</a>
		<a
			href={P.GRID}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 {isPath(
				P.GRID
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="grid view"
		>
			<LayoutGrid strokeWidth={isPath(P.GRID) ? 1.2 : 1} />
		</a>
		<a
			href={P.LIST}
			class="rounded-md p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-100 {isPath(
				P.LIST
			)
				? 'cursor-default !bg-gray-200 text-gray-900 dark:!bg-gray-600 dark:text-gray-100'
				: ''}"
			title="list view"
		>
			<AlignJustify strokeWidth={isPath(P.LIST) ? 1.2 : 1} />
		</a>
	</div>

	{@render headline('hidden md:flex')}

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
<div class="mt-5 flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
	{@render headline('flex md:hidden pt-10')}
	<p class="text-xs uppercase">
		{languages.length} languages
	</p>
	<select
		class="select select-ghost btn-sm select-xs bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400"
		onchange={(e: Event & { currentTarget: HTMLSelectElement }) =>
			(store.selectedLang = e.currentTarget.value as LANG)}
	>
		{#each languages as l (l)}
			<option class="text-gray-600 dark:text-gray-400" selected={store.selectedLang === l} value={l}
				>{l.toUpperCase()}</option
			>
		{/each}
	</select>
</div>
