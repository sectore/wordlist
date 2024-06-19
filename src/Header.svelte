<script lang="ts">
	import { page } from '$app/stores';
	import { BookType, LayoutGrid, Rows4 } from 'lucide-svelte';
	import { PATHS as P, lang } from './store/const';
	import store from './store/store.svelte';

	const isPath = (path: string) => $page.url.pathname === path;

	let openLang = $state(false);
</script>

<header class="navbar px-4">
	<div class="flex-1 items-baseline">
		<h1 class="pr-1 text-4xl text-gray-600">bip39</h1>
		<h3 class="text text-base text-gray-500">word list</h3>
	</div>
	<div class="flex-none gap-4">
		<div class="flex flex-row items-center gap-3 text-gray-600">
			<a
				href="/"
				class="hover:text-gray-800"
				title="grid view"
				class:text-gray-900={isPath(P.HOME)}
			>
				<LayoutGrid strokeWidth={isPath(P.HOME) ? 1.2 : 1} />
			</a>
			<a
				href="/list"
				class="hover:text-gray-800"
				title="list view"
				class:text-gray-900={isPath(P.LIST)}
			>
				<Rows4 strokeWidth={isPath(P.LIST) ? 1.2 : 1} />
			</a>
			<a
				href="/random"
				class="hover:text-gray-800"
				title="typewriter"
				class:text-gray-900={isPath(P.RANDOM)}
			>
				<BookType strokeWidth={isPath(P.RANDOM) ? 1.2 : 1} />
			</a>
			<span class="mr-3 border-r border-gray-400 pl-3">&nbsp;</span>
			<div class="dropdown" class:dropdown-open={openLang}>
				<button
					class=""
					onclick={() => {
						openLang = true;
					}}>{store.selectedLang.toUpperCase()}</button
				>
				<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
					{#each lang as l (l)}
						<li>
							<button
								class="btn-ghost"
								onclick={(e) => {
									e.preventDefault();
									openLang = false;
									store.selectedLang = l;
								}}
							>
								{l.toUpperCase()}</button
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</header>
