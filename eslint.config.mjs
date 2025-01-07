import antfuEslintConfig from '@antfu/eslint-config'
import nuxtEslintConfig from './.nuxt/eslint.config.mjs'

export default nuxtEslintConfig(
	antfuEslintConfig({
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
		],
	}),
	{
		rules: {
			'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'style/arrow-parens': ['error', 'always'],
			'no-console': 'warn',
			'curly': ['error', 'all'],
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
)
