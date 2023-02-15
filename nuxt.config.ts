import { defineNuxtConfig } from '@nuxt/bridge'
import { fromNodeMiddleware, type NodeMiddleware } from 'h3'
import smConfig from './sm.json'

export default defineNuxtConfig({
	bridge: {
		meta: true
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
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		script: [
			{
				type: 'text/javascript',
				async: true,
				defer: true,
				src: 'https://static.cdn.prismic.io/prismic.js?new=true&repo=volcanic-website'
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'normalize.css',
		'basscss/css/basscss.min.css',
		'basscss-btn/css/btn.css',
		'basscss-btn-sizes/css/btn-sizes.css',
		'basscss-btn-outline/css/btn-outline.css',
		'basscss-btn-primary/css/btn-primary.css',
		'@/assets/style/index.styl',
		'@fortawesome/fontawesome-svg-core/styles.css'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/fontawesome.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ['@nuxtjs/prismic'],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		[
			'@nuxtjs/prismic',
			{
				endpoint: smConfig.apiEndpoint || ''
			}
		]
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['@unhead', 'iron-webcrypto']
	},

	prismic: {
		endpoint: smConfig.apiEndpoint,
		modern: true,
		preview: '/preview'
	},

	hooks: {
		ready(nuxt) {
			// https://github.com/nuxt/bridge/issues/607
			// translate nuxt 2 hook from @nuxt/webpack-edge to nuxt bridge hook
			nuxt.hook('server:devMiddleware' as any, async (devMiddleware: NodeMiddleware) => {
				await nuxt.callHook('server:devHandler', fromNodeMiddleware(devMiddleware))
			})
		}
	}
})
