<script lang="ts">
	import { page } from '$app/stores';
	import { AlignJustify, LayoutGrid, Moon, Repeat2, Sun } from 'lucide-svelte';
	import store, { PATHS as P, lang, type LANG } from '$lib/store.svelte';
	import T from '$lib/theme.svelte';

	const isPath = (path: string) => $page.url.pathname === path;
</script>

<header class="flex w-full items-center justify-center px-4 md:flex-row md:justify-normal">
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
	<h1
		class="hidden flex-1 justify-center text-4xl uppercase text-gray-600 dark:text-gray-200 md:flex"
	>
		<span class="hidden md:block">bip39 word list</span>
	</h1>

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
<div class="mt-3 flex flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
	<h1
		class="flex flex-1 justify-center pt-10 text-4xl uppercase text-gray-600 dark:text-gray-200 md:hidden"
	>
		bip39 word list
	</h1>
	<p class="text-xs uppercase">
		in {lang.length} languages
	</p>
	<select
		class="select select-ghost btn-sm select-md bg-gray-200 text-gray-600 md:select-xs dark:bg-gray-600 dark:text-gray-400"
		onchange={(e: Event & { currentTarget: HTMLSelectElement }) => store.selectedLang = e.currentTarget.value as LANG}
	>
		{#each lang as l (l)}
			<option class="text-gray-600 dark:text-gray-400" selected={store.selectedLang === l} value={l}
				>{l.toUpperCase()}</option
			>
		{/each}
	</select>
</div>
