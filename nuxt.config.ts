import Prismic from '@prismicio/client'
import smConfig from './sm.json'

export default async () => {
	const client = await Prismic.getApi(smConfig.apiEndpoint)
	const locales = client.languages.map((lang) => lang.id)
	const defaultLocale = locales[0]

	// Robots
	const robots = [] as Array<{}>
	robots.push({ UserAgent: '*' })
	const excludePaths = process.env.NUXT_PRE_EXCLUDE_PATHS!.split(',')
	excludePaths.forEach((path) => robots.push({ Disallow: path }))
	robots.push({
		Sitemap: `${process.env.NUXT_SITENAME}/sitemap.xml`
	})

	return {
		server: {
			host: '0.0.0.0' // default: localhost
		},
		target: 'static',

		// Global page headers: https://go.nuxtjs.dev/config-head
		head: {
			title: 'Volcanic Minds | Smart, Fast, Efficient',
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'description',
					hid: 'description',
					content:
						'Siamo una società specializzata in soluzioni tailor-made e servizi quality-driven. Usa le nostre competenze digitali per affrontare i tuoi progetti.'
				},
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

		generate: { fallback: '404.html' },

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
		plugins: ['~/plugins/fontawesome.js', '~/plugins/constants'],

		// Auto import components: https://go.nuxtjs.dev/config-components
		components: true,

		// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
		buildModules: ['@nuxtjs/prismic', '@nuxt/typescript-build', '~/modules/sitemapGenerator.ts', 'nuxt-compress'],

		// Modules: https://go.nuxtjs.dev/config-modules
		modules: [
			'@nuxtjs/i18n',
			[
				'@nuxtjs/prismic',
				{
					endpoint: smConfig.apiEndpoint || ''
				}
			],
			['@nuxtjs/robots', robots],
			'@nuxtjs/sitemap'
		],

		i18n: {
			// locales,
			locales: ['it-it'],
			defaultLocale,
			detectBrowserLanguage: {
				alwaysRedirect: true
			},
			parsePages: false
		},

		sitemap: {
			i18n: true,
			hostname: process.env.NUXT_SITENAME,
			exclude: process.env.NUXT_PRE_EXCLUDE_PATHS!.split(',')
		},

		// Build Configuration: https://go.nuxtjs.dev/config-build
		build: {
			transpile: ['vue-intersect']
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

		loading: '~/components/Loading.vue',

		typescript: {
			typeCheck: {
				eslint: {
					files: './**/*.{ts,js,vue}'
				}
			}
		}
	}
}
