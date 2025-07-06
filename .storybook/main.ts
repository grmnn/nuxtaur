import type { StorybookConfig } from '@storybook/vue3-vite'
import type { Plugin } from 'vite'
import fs from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { mergeConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function DynamicComponentResolver(name: string) {
	if (name.startsWith('Lazy')) {
		const componentName = name.replace('Lazy', '')
		const segments = componentName.match(/[A-Z][a-z]+/g) || []
		const directories = segments.slice(0, -1).map((s) => s.toLowerCase())
		const path = [...directories, `${componentName}.vue`].join('/')

		const file = resolve(__dirname, `../app/components/${path}`)
		if (fs.existsSync(file)) {
			return file
		}
	}
}

export default {
	stories: ['../app/stories/**/*.stories.ts'],
	features: {
		backgrounds: false,
		measure: false,
		outline: false,
	},
	framework: {
		name: '@storybook/vue3-vite',
		options: {
			docgen: 'vue-component-meta',
		},
	},
	viteFinal: async (config) => {
		const mergedConfig = mergeConfig(config, {
			resolve: {
				alias: {
					'@': join(__dirname, '../app/'),
				},
			},
			plugins: [
				vue(),
				Components({
					dirs: ['app/components'],
					dts: false,
					resolvers: [
						DynamicComponentResolver,
					],
				}),
				AutoImport({
					imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
					dirs: [
						join(__dirname, '../app/composables/**'),
						join(__dirname, '../app/stores/**'),
						join(__dirname, '../app/utils/**'),
						join(__dirname, './mocks/**'),
					],
					vueTemplate: true,
					dts: false,
				}),
				tailwindcss(),
			],
		})

		/*
		 * Reorder plugins to ensure 'storybook:vue-component-meta-plugin' is last
		 * This is a workaround for a bug in storybook where the plugin is not loaded correctly
		 * See the following issue / discussion:
		 * https://github.com/storybookjs/storybook/discussions/28817
		 * https://github.com/storybookjs/storybook/issues/29494
		 */

		const pluginIndex = (mergedConfig.plugins as Plugin[]).findIndex((plugin) => plugin?.name === 'storybook:vue-component-meta-plugin')
		if (pluginIndex !== -1) {
			const plugin = mergedConfig.plugins[pluginIndex]
			mergedConfig.plugins.splice(pluginIndex, 1)
			mergedConfig.plugins.push(plugin)
		}

		return mergedConfig
	},
} satisfies StorybookConfig
