import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
	bridge: {
		meta: true,
		vite: true
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'volcanic-website-prismic',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'normalize.css',
		'basscss/css/basscss.min.css',
		'basscss-btn/css/btn.css',
		'basscss-btn-sizes/css/btn-sizes.css',
		'basscss-btn-outline/css/btn-outline.css',
		'basscss-btn-primary/css/btn-primary.css',
		'@/assets/style/index.styl'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ['@nuxtjs/prismic'],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	prismic: {
		preview: '/preview'
	}
})
