import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	// Config for GitHub pages
	// https://kit.svelte.dev/docs/adapter-static#github-pages
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		// base path - needed for GH pages
		// https://svelte.dev/docs/kit/configuration#paths
		paths: {
			base: '/wordlist'
		}
	}
};

export default config;
