// https://dev.to/gaisinskii/sitemap-for-dynamic-routes-in-nuxtjs-4b96

import { Module } from '@nuxt/types'

const sitemapGenerator: Module = function () {
	this.nuxt.hook('generate:done', async (context: any) => {
		const routesToExclude: string[] = process.env.NUXT_POST_EXCLUDE_PATHS
			? process.env.NUXT_POST_EXCLUDE_PATHS.split(',')
			: []
		const allRoutes: string[] = await Array.from(context.generatedRoutes)
		const routes: string[] = await allRoutes.filter((route: string) => !routesToExclude.includes(route))
		this.nuxt.options.sitemap.routes = await [...routes]
	})
}

export default sitemapGenerator
