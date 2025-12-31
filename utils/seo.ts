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

	if (section && section.data && (section.data.title || section.data.seo_title)) {
		itemListElement.push({
			'@type': 'ListItem',
			position: 2,
			name: section.data.title || section.data.seo_title || section.data.og_title || 'Sezione',
			item: `${sitename}${section.url}`
		})
	}

	if (document && document.data && (document.data.title || document.data.seo_title)) {
		itemListElement.push({
			'@type': 'ListItem',
			position: itemListElement.length + 1,
			name: document.data.title || document.data.seo_title || document.data.og_title,
			item: `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
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
		if (imageUrl.includes('.svg')) {
			return {
				rel: 'preload',
				as: 'image',
				href: imageUrl,
				fetchpriority: 'high'
			}
		}

		// Logic sync with WrapperPrismicImage.vue
		const size = 500 // Hero background default size
		const widths = [375, 640, 828, 1080, 1200, 1920, 2048]
		const sizes = '100vw'

		const getSrc = (w: number) => {
			const baseUrl = imageUrl + (imageUrl.includes('?') ? '' : '?') + '&auto=format,compress&fit=max'
			return `${baseUrl}&w=${w}`
		}

		const targetWidths = size < 1200 ? widths.filter((w) => w <= size * 2) : widths
		const srcset = targetWidths.map((w) => `${getSrc(w)} ${w}w`).join(', ')

		return {
			rel: 'preload',
			as: 'image',
			href: getSrc(size),
			imagesrcset: srcset,
			imagesizes: sizes,
			fetchpriority: 'high'
		}
	}

	return null
}
