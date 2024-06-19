<script lang="ts">
	import { page } from '$app/stores';
	import { BookType, Languages, LayoutGrid, Rows4, Shuffle } from 'lucide-svelte';
	import { PATHS as P } from './store/const';

	const isPath = (path: string) => $page.url.pathname === path;
</script>

<header class="navbar px-4">
	<div class="flex-1 items-baseline">
		<h1 class="pr-1 text-4xl text-gray-600">bip39</h1>
		<h3 class="text text-base text-gray-500">word list</h3>
	</div>
	<div class="flex-none gap-4">
		<div class="flex flex-row items-center gap-3 text-gray-600">
			<a href="/" class="hover:text-gray-800" title="grid view" class:text-gray-900={isPath(P.HOME)}>
				<LayoutGrid strokeWidth={isPath(P.HOME) ? 1.2 : 1} />
			</a>
			<a href="/list" class="hover:text-gray-800" title="list view" class:text-gray-900={isPath(P.LIST)}>
				<Rows4 strokeWidth={isPath(P.LIST) ? 1.2 : 1} />
			</a>
			<a href="/random" class="hover:text-gray-800" title="typewriter" class:text-gray-900={isPath(P.RANDOM)}>
				<BookType strokeWidth={isPath(P.RANDOM) ? 1.2 : 1} />
			</a>
      <span class="border-r border-gray-400 pl-3 mr-3">&nbsp;</span>
      <div class="dropdown">
        <div tabindex="0" role="button" class=""><Languages strokeWidth={1.2} /></div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
		</div>
	</div>
</header>
