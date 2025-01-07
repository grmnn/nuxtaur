export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
			title: 'nuxtau',
		},
	},
	compatibilityDate: '2024-08-12',
	css: [
		'@/assets/styles/fonts/geist.css',
		'@/assets/styles/app.css',
	],
	devtools: { enabled: false },
	eslint: {
		config: {
			standalone: false,
		},
	},
	experimental: {
		typedPages: true,
	},
	future: {
		compatibilityVersion: 4,
	},
	modules: ['@nuxt/eslint', '@pinia/nuxt', '@vueuse/nuxt'],
	postcss: {
		plugins: {
			'@tailwindcss/postcss': {},
		},
	},
	typescript: {
		strict: true,
	},

	ssr: false,
	vite: {
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			strictPort: true,
			watch: {
				ignored: ['**/src-tauri/**'],
			},
		},
	},

	hooks: {
		// Needed for HMR on Android
		// @see https://github.com/nuxt/nuxt/issues/27558
		'vite:extendConfig': (config) => {
			const server = config.server ??= {}
			const watch = server.watch ??= {}

			Object.assign(server, {
				port: 3000,
				strictPort: true,
			})

			watch.ignored = Array.isArray(watch.ignored) ? [...watch.ignored, '**/src-tauri/**'] : ['**/src-tauri/**']
		},
	},
})
