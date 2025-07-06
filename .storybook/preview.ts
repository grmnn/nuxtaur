import type { Preview } from '@storybook/vue3-vite'
import type { App } from 'vue'
import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import { themes } from 'storybook/theming'

import '../app/assets/styles/app.css'
import './storybook.css'

const pinia = createPinia()

setup((app: App) => {
	app.use(pinia)

	app.component('NuxtLink', {
		props: {
			to: {
				type: String,
				required: true,
			},
		},
		methods: {
			log() {
				console.info('link target', this.to)
			},
		},
		template: '<a @click="log"><slot></slot></a>',
	})
})

export default {
	decorators: [
		(story) => ({
			components: { story },
			template: '<div class="flex justify-center"><story /></div>',
		}),
	],
	parameters: {
		docs: {
			theme: themes.dark,
		},
	},
	tags: ['autodocs'],
} satisfies Preview
