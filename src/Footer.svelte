<script lang="ts">
	import { Heart } from 'lucide-svelte';
</script>

<footer class="mt-20 w-full items-center p-4 text-gray-400 dark:text-gray-400">
	<aside class="flex flex-col items-center gap-2 text-xs">
		<p>
			Open Source at <a
				href="https://github.com/BitcoinBeachTravemuende/bip39-word-list"
				class="ml-1 inline-block underline"
			>
				Github</a
			>.
		</p>
		<p class="flex justify-center">
			Made with
			<span class="mx-1 text-orange-400">
				<Heart fill="currentColor" strokeWidth={0} size={18} />
			</span> in Travemünde.
		</p>
	</aside>
</footer>
