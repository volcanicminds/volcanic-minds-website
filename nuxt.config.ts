import * as fs from 'fs'
import { defineNuxtConfig } from '@nuxt/bridge'
import { fromNodeMiddleware, type NodeMiddleware } from 'h3'
import Prismic from '@prismicio/client'
import smConfig from './sm.json'

export default async () => {
	const client = await Prismic.getApi(smConfig.apiEndpoint)
	const locales = client.languages.map((lang) => lang.id)
	const defaultLocale = locales[0]
	return defineNuxtConfig({
		// target: 'static', // https://github.com/nuxt/nuxt/issues/11776
		// Global page headers: https://go.nuxtjs.dev/config-head
		head: {
			title: 'Volcanic Minds',
			htmlAttrs: {
				lang: 'it'
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'description', content: 'Volcanic Minds website' },
				{
					name: 'viewport',
					content: 'height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0'
				},
				{ name: 'theme-color', content: '#3c0557' },
				{ name: 'msapplication-TileColor', content: '#7009a3' }
			],
			link: [
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png?v=2'
				},
				{
					rel: 'shortcut icon',
					href: '/favicon.ico?v=2'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png?v=2'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png?v=2'
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest?v=2'
				},
				{
					rel: 'mask-icon',
					href: '/safari-pinned-tab.svg?v=2',
					color: '#7009a3'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com/',
					crossorigin: true
				},
				{
					rel: 'preload',
					as: 'style',
					href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
				},
				{
					rel: 'stylesheet',
					media: 'print',
					onload: 'this.onload=null;this.removeAttribute("media");',
					href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
				}
			],
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
			'basscss-responsive-margin/css/responsive-margin.css',
			'basscss-responsive-padding/css/responsive-padding.css',
			'@/assets/style/index.styl',
			'@fortawesome/fontawesome-svg-core/styles.css'
		],

		// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
		plugins: ['~/plugins/fontawesome.js'],

		// Auto import components: https://go.nuxtjs.dev/config-components
		components: true,

		// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
		// https://github.com/farnabaz/nuxt-bridge/tree/main
		// '~/modules/generate.js'
		buildModules: ['@nuxtjs/prismic', '~/modules/sitemapGenerator.ts', 'nuxt-compress'],

		// Modules: https://go.nuxtjs.dev/config-modules
		modules: [
			'@nuxtjs/i18n',
			[
				'@nuxtjs/prismic',
				{
					endpoint: smConfig.apiEndpoint || ''
				}
			],
			[
				'@nuxtjs/robots',
				{
					configPath: '~/modules/robotsConfig.ts'
				}
			],
			'@nuxtjs/sitemap'
		],

		i18n: {
			locales,
			defaultLocale,
			detectBrowserLanguage: {
				alwaysRedirect: true
			},
			parsePages: false
		},

		sitemap: {
			i18n: true,
			hostname: process.env.NUXT_SITENAME,
			exclude: process.env.NUXT_PRE_EXCLUDE_PATHS.split(','),
			path: '/sitemapindex.xml'
		},

		// Build Configuration: https://go.nuxtjs.dev/config-build
		build: {
			// https://github.com/nuxt/bridge/issues/708
			// @ts-ignore
			transpile: ['iron-webcrypto', '@prismicio/vue', '@prismicio/helpers']
		},

		prismic: {
			endpoint: smConfig.apiEndpoint,
			modern: true,
			preview: '/preview',
			apiOptions: {
				routes: [
					{
						type: 'homepage',
						path: '/:lang?'
					},
					{
						type: 'first_level_page',
						path: '/:lang?/:uid'
					},
					{
						type: 'second_level_page',
						resolvers: {
							section: 'section'
						},
						path: '/:lang?/:section/:uid'
					}
				]
			}
		},

		loading: {
			color: 'white',
			height: '5px'
		},

		hooks: {
			ready(nuxt) {
				// https://github.com/nuxt/bridge/issues/607
				// translate nuxt 2 hook from @nuxt/webpack-edge to nuxt bridge hook
				nuxt.hook('server:devMiddleware' as any, async (devMiddleware: NodeMiddleware) => {
					await nuxt.callHook('server:devHandler', fromNodeMiddleware(devMiddleware))
				})
			},
			// https://github.com/nuxt-community/sitemap-module/issues/281
			// @ts-ignore
			sitemap: {
				generate: {
					done(nuxtInstance: { options: { generate: { dir: any } } }) {
						fs.copyFileSync(`${nuxtInstance.options.generate.dir}/sitemapindex.xml`, `static/sitemap.xml`)
					}
				}
			}
		}
	})
}
