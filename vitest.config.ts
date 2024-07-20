import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig(
	mergeConfig(
		viteConfig,
		defineConfig({
			test: {
				include: ['src/**/*.{test,test.svelte,spec}.{js,ts}'],
				environment: 'jsdom'
			}
		})
	)
);
