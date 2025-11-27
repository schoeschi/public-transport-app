// svelte.config.js

// 1. Change the import to adapter-static
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// 2. Change the adapter to adapter-static
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see the
			// adapter's documentation for details
			pages: 'build',
			assets: 'build',
			fallback: undefined, // Add '200.html' or similar if needed for your hosting platform
			precompress: false,
			strict: true
		})
	}
};

export default config;
