/**
 * Generates hreflang alternate links for SEO/GEO localization.
 * pointing 'it' and 'en' locales, and 'x-default' to the 'it' version.
 *
 * @param ctx The Vue component context (this)
 * @returns Array of link objects for Nuxt head()
 */
export const getHreflangLinks = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const locales = ctx.$i18n.locales

	const links = locales.map((locale: any) => {
		const code = typeof locale === 'string' ? locale : locale.code
		const path = ctx.switchLocalePath(code)

		return {
			rel: 'alternate',
			hreflang: code,
			href: `${sitename}${path}`
		}
	})

	// Add x-default pointing to 'it'
	const itPath = ctx.switchLocalePath('it')
	links.push({
		rel: 'alternate',
		hreflang: 'x-default',
		href: `${sitename}${itPath}`
	})

	return links
}
