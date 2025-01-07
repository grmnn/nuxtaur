import type { StorybookConfig } from '@storybook/vue3-vite'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { mergeConfig } from 'vite'

export default {
	core: {
		disableTelemetry: true,
	},
	stories: ['../app/stories/**/*.stories.ts'],
	addons: [
		'@storybook/addon-essentials',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {
			docgen: 'vue-component-meta',
		},
	},
	viteFinal: async (config) => {
		return mergeConfig(config, {
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
				}),
				AutoImport({
					imports: ['vue', '@vueuse/core', 'vue-router', 'pinia'],
					dirs: [
						join(__dirname, '../app/composables/**'),
						join(__dirname, '../app/stores/**'),
					],
					vueTemplate: true,
					dts: false,
				}),
				(await import('@tailwindcss/vite')).default(),
			],
		})
	},
} satisfies StorybookConfig
