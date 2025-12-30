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

	// Add x-default pointing to 'en'
	const enPath = ctx.switchLocalePath('en')
	links.push({
		rel: 'alternate',
		hreflang: 'x-default',
		href: `${sitename}${enPath}`
	})

	return links
}

export const getBreadcrumbSchema = (ctx: any, document: any, section?: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'

	const itemListElement = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: `${sitename}${ctx.localePath('/')}`
		}
	]

	if (section && section.data?.title) {
		itemListElement.push({
			'@type': 'ListItem',
			position: itemListElement.length + 1,
			name: section.data.title,
			item: `${sitename}${section.url}`
		})
	}

	if (document && document.data?.title) {
		itemListElement.push({
			'@type': 'ListItem',
			position: itemListElement.length + 1,
			name: document.data.title,
			item: `${sitename}${ctx.$nuxt.$route.path}`
		})
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement
	}
}

export const getLCPPreloadLink = (document: any) => {
	if (!document?.data?.slices) return null

	const heroSlice = document.data.slices.find((slice: any) => slice.slice_type === 'hero_banner')

	if (heroSlice?.primary?.background_image?.url) {
		const imageUrl = heroSlice.primary.background_image.url
		const size = 500
		const preloadUrl = imageUrl.includes('.svg') ? imageUrl : `${imageUrl}&w=${size}&fit=max`

		return {
			rel: 'preload',
			as: 'image',
			href: preloadUrl,
			fetchpriority: 'high'
		}
	}

	return null
}
