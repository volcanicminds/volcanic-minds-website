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
		const code = (typeof locale === 'string' ? locale : locale?.code) ?? 'en'
		const path = ctx.switchLocalePath(code)
		const langCode = code.includes('-') ? code.split('-')[0] : code

		return {
			rel: 'alternate',
			hreflang: langCode,
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
		inLanguage: getNormalizedLanguage(ctx),
		itemListElement
	}
}

export const getNormalizedLanguage = (ctx: any) => {
	const code = ctx.$i18n.locale || 'en'
	return code.includes('-') ? code.split('-')[0] : code
}

export const getOrganizationSchema = (ctx: any) => {
	const schema = { ...ctx.$constants.schemaOrganization }
	const logoField = ctx.$store.state.prismic.header?.data?.logo

	if (logoField && logoField.url) {
		const size = 50
		schema.logo = logoField.url.includes('.svg') ? logoField.url : `${logoField.url}&h=${size}&fit=max`
	}

	return schema
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
