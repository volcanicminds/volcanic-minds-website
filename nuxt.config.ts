import Prismic from '@prismicio/client'
import smConfig from './slicemachine.config.json'

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
				{ name: 'apple-mobile-web-app-title', content: 'Volcanic Minds' }
			],
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon-96x96.png?v=3',
					sizes: '96x96'
				},
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/favicon.svg?v=3'
				},
				{
					rel: 'shortcut icon',
					href: '/favicon.ico?v=3'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png?v=3'
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest?v=3'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com/',
					crossorigin: 'anonymous'
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
				process.env.NODE_ENV === 'production'
					? {
							defer: true,
							'data-domain': 'volcanicminds.com',
							src: 'https://plausible.io/js/script.js'
						}
					: {},
				{
					async: true,
					defer: true,
					src: 'https://static.cdn.prismic.io/prismic.js?new=true&repo=volcanic-website'
				}
			]
		},

		env: {
			NUXT_SITENAME: process.env.NUXT_SITENAME
		},

		generate: { fallback: '404.html', routes: ['/thank-you'] },

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
			'@fortawesome/fontawesome-svg-core/styles.css',
			'highlight.js/styles/monokai.css'
		],

		// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
		plugins: ['~/plugins/fontawesome.js', '~/plugins/constants'],

		// Auto import components: https://go.nuxtjs.dev/config-components
		components: true,

		// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
		buildModules: ['@nuxtjs/prismic', '@nuxt/typescript-build', 'nuxt-compress'],

		// Modules: https://go.nuxtjs.dev/config-modules
		modules: [
			'@nuxtjs/i18n',
			[
				'@nuxtjs/prismic',
				{
					endpoint: smConfig.apiEndpoint || ''
				}
			],
			['@nuxtjs/robots', robots]
		],

		i18n: {
			locales,
			defaultLocale,
			detectBrowserLanguage: false,
			parsePages: false
		},

		// Build Configuration: https://go.nuxtjs.dev/config-build
		build: {
			transpile: ['vue-intersect', '@justinribeiro/lite-youtube']
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
		},

		vue: {
			config: {
				ignoredElements: ['lite-youtube']
			}
		}
	}
}
