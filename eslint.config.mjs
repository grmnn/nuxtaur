import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	antfu({
		css: true,
		stylistic: {
			indent: 'tab',
			semi: false,
			quotes: 'single',
		},
		typescript: true,
		vue: true,
		ignores: [
			'src-tauri/gen/**',
			'src-tauri/target/**',
			'src-tauri/**/*.rs',
		],
	}),
	{
		rules: {
			'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'style/arrow-parens': ['error', 'always'],
			'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 1,
					},
					multiline: {
						max: 1,
					},
				},
			],
			'vue/html-self-closing': ['error', {
				html: {
					void: 'any',
					normal: 'never',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			}],
		},
	},
	{
		files: ['**/*.css'],
		languageOptions: {
			parser: format.parserPlain,
		},
		plugins: {
			format,
		},
		rules: {
			'format/prettier': [
				'error',
				{
					parser: 'css',
					tabWidth: 2,
					printWidth: 200,
					useTabs: true,
				},
			],
		},
	},
)
