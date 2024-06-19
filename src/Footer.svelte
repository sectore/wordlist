<script lang="ts">
	import { Github, Heart } from 'lucide-svelte';
</script>

<footer class="mt-20 w-full items-center p-4 text-gray-400 dark:text-gray-400">
	<aside class="flex flex-col gap-2 items-center text-xs md:text-sm">
		<p class="flex justify-center">
			Open Source at <a
				href="https://github.com/BitcoinBeachTravemuende/bip39-word-list"
				class="ml-1 inline-block underline"
			>
				Github</a
			>.
		</p>
		<p class="flex justify-center">
			Made with
			<!-- <span class="mx-1 text-orange-400">♥</span> -->
			<span class="mx-1 text-orange-400">
				<Heart fill="currentColor" strokeWidth={0} />
			</span> in Travemünde.
		</p>
	</aside>
</footer>
