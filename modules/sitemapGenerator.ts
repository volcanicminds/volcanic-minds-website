import { Module } from '@nuxt/types'

const sitemapGenerator: Module = function () {
	this.nuxt.hook('generate:done', async (context: any) => {
		const routesToExclude: string[] = process.env.EXCLUDE_PATHS ? process.env.EXCLUDE_PATHS.split(',') : []
		const allRoutes: string[] = await Array.from(context.generatedRoutes)
		const routes: string[] = await allRoutes.filter((route: string) => !routesToExclude.includes(route))
		this.nuxt.options.sitemap.routes = await [...routes]
	})
}

export default sitemapGenerator
