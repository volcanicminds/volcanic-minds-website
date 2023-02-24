module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/no-v-html': 'off',
		'no-console': 'off',
		'@typescript-eslint/no-unused-vars': 'off'
	}
}
