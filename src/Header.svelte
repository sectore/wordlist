<script lang="ts">
	import { page } from '$app/stores';
	import { BookType, LayoutGrid, Rows4, Sun } from 'lucide-svelte';
	import store, { PATHS as P, lang, type LANG } from '$lib/store.svelte';

	const isPath = (path: string) => $page.url.pathname === path;
</script>

<header class="navbar px-4">
	<div class="flex flex-row items-center gap-3 text-gray-600">
		<a
			href={P.HOME}
			class="hover:text-gray-800"
			title="typewriter"
			class:text-gray-900={isPath(P.HOME)}
		>
			<BookType strokeWidth={isPath(P.HOME) ? 1.2 : 1} />
		</a>
		<a
			href={P.GRID}
			class="hover:text-gray-800"
			title="grid view"
			class:text-gray-900={isPath(P.GRID)}
		>
			<LayoutGrid strokeWidth={isPath(P.GRID) ? 1.2 : 1} />
		</a>
		<a
			href={P.LIST}
			class="hover:text-gray-800"
			title="list view"
			class:text-gray-900={isPath(P.LIST)}
		>
			<Rows4 strokeWidth={isPath(P.LIST) ? 1.2 : 1} />
		</a>
	</div>
	<div class="flex flex-1 items-center justify-center gap-1">
		<p class="text-lg uppercase text-gray-400">
			<span class="font-bold">bip39 word list</span> in {lang.length} languages:
		</p>
		<select
			class="select select-ghost btn-sm select-sm ml-2 bg-gray-200 text-gray-500"
			onchange={(e: Event & { currentTarget: HTMLSelectElement }) => store.selectedLang = e.currentTarget.value as LANG}
		>
			{#each lang as l (l)}
				<option class="text-gray-600" selected={store.selectedLang === l} value={l}
					>{l.toUpperCase()}</option
				>
			{/each}
		</select>
	</div>
	<div class="flex-none"><Sun strokeWidth={1.5} /></div>
</header>
