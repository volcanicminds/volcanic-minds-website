import { asText, isRichTextFilled } from '~/utils/prismic'

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

// ---------------------------------------------------------------------------------------------------------------------
// Constants for Schema.org Strategies
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Headquarters Address (Torino)
 */
const COMPANY_ADDRESS = {
	streetAddress: 'Corso Vinzaglio 24',
	addressLocality: 'Torino',
	postalCode: '10121',
	addressRegion: 'TO',
	addressCountry: 'IT'
}

/**
 * Headquarters Geo Coordinates (Torino)
 */
const COMPANY_GEO = {
	latitude: 45.06837,
	longitude: 7.66866
}

const OPENING_HOURS_SPECIFICATION = {
	'@type': 'OpeningHoursSpecification',
	dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	opens: '09:00',
	closes: '18:00'
}

const SAME_AS_SOCIALS = ['https://www.linkedin.com/company/volcanicminds/', 'https://www.facebook.com/volcanicminds']

const AREA_SERVED_LOCAL = [
	{
		'@type': 'City',
		name: 'Torino',
		sameAs: 'https://it.wikipedia.org/wiki/Torino'
	},
	{
		'@type': 'AdministrativeArea',
		name: 'Piemonte',
		sameAs: 'https://it.wikipedia.org/wiki/Piemonte'
	}
]

const AREA_SERVED_NORTH_ITALY = [
	{
		'@type': 'AdministrativeArea',
		name: 'Lombardia',
		sameAs: 'https://it.wikipedia.org/wiki/Lombardia'
	},
	{
		'@type': 'AdministrativeArea',
		name: 'Veneto',
		sameAs: 'https://it.wikipedia.org/wiki/Veneto'
	},
	{
		'@type': 'AdministrativeArea',
		name: 'Emilia-Romagna',
		sameAs: 'https://it.wikipedia.org/wiki/Emilia-Romagna'
	},
	{
		'@type': 'AdministrativeArea',
		name: 'Liguria',
		sameAs: 'https://it.wikipedia.org/wiki/Liguria'
	},
	{
		'@type': 'AdministrativeArea',
		name: "Valle d'Aosta",
		sameAs: 'https://it.wikipedia.org/wiki/Valle_d%27Aosta'
	}
]

const AREA_SERVED_ITALY = {
	'@type': 'Country',
	name: 'Italy',
	sameAs: 'https://en.wikipedia.org/wiki/Italy'
}

// ---------------------------------------------------------------------------------------------------------------------
// Factory Methods
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Generates the specific Company Schema based on the selected strategy.
 *
 * Strategies:
 * - LandingLocalPage (Default): ProfessionalService for Torino (HQ).
 * - LandingNorthItalyPage: ProfessionalService for North Italy coverage.
 * - LandingEuropePage: Organization for European coverage.
 */
export const getCompanySchema = (ctx: any, type = 'LandingLocalPage') => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const logoUrl = ctx.$store.state.prismic.header?.data?.logo?.url || `${sitename}/logo.png`

	// 1. LandingEuropePage (Organization)
	if (type === 'LandingEuropePage') {
		return {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Volcanic Minds',
			alternateName: 'Volcanic Minds - Nearshore Software Partner',
			url: `${sitename}/en/`,
			logo: logoUrl,
			description:
				'Italian Software House providing custom software development, AI integration, and mobile app services for European companies. High-quality engineering with EU time zone alignment.',
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'Corso Vinzaglio 24',
				addressLocality: 'Turin',
				postalCode: '10121',
				addressCountry: 'IT'
			},
			contactPoint: {
				'@type': 'ContactPoint',
				telephone: '+39 011 XXXXXXX',
				contactType: 'sales',
				areaServed: {
					'@type': 'Continent',
					name: 'Europe',
					sameAs: 'https://en.wikipedia.org/wiki/Europe'
				},
				availableLanguage: ['English', 'Italian']
			},
			areaServed: {
				'@type': 'Continent',
				name: 'Europe'
			}
		}
	}

	// 1.5 LandingItalyPage (ProfessionalService - Country Coverage)
	if (type === 'LandingItalyPage') {
		return {
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			name: 'Volcanic Minds - Sviluppo Software Italia',
			image: logoUrl,
			url: `${sitename}${ctx.$route.path}`,
			telephone: '+39 011 XXXXXXX',
			description:
				'Partner tecnologico per lo sviluppo di software su misura e soluzioni AI per aziende in tutta Italia. Operatività remota e in loco.',
			address: {
				'@type': 'PostalAddress',
				...COMPANY_ADDRESS
			},
			areaServed: AREA_SERVED_ITALY,
			priceRange: '$$'
		}
	}

	// 2. LandingNorthItalyPage (ProfessionalService - Area Coverage)
	if (type === 'LandingNorthItalyPage') {
		return {
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			name: 'Volcanic Minds - Sviluppo Software Nord Italia',
			image: logoUrl,
			url: `${sitename}${ctx.$route.path}`,
			telephone: '+39 011 XXXXXXX',
			description:
				'Partner tecnologico per lo sviluppo di software su misura e soluzioni AI per aziende in Lombardia, Veneto ed Emilia-Romagna. Operatività remota e in loco.',
			address: {
				'@type': 'PostalAddress',
				...COMPANY_ADDRESS
			},
			areaServed: AREA_SERVED_NORTH_ITALY,
			priceRange: '$$'
		}
	}

	// 3. Default: LandingLocalPage (ProfessionalService - HQ Torino)
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Volcanic Minds',
		image: logoUrl,
		'@id': `${sitename}/#localbusiness`,
		url: sitename,
		telephone: '+39 011 XXXXXXX',
		priceRange: '$$',
		description:
			'Software House a Torino specializzata in sviluppo software custom, Web App, Mobile e soluzioni di Intelligenza Artificiale per le aziende.',
		address: {
			'@type': 'PostalAddress',
			...COMPANY_ADDRESS
		},
		geo: {
			'@type': 'GeoCoordinates',
			...COMPANY_GEO
		},
		openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
		areaServed: AREA_SERVED_LOCAL,
		sameAs: SAME_AS_SOCIALS
	}
}

/**
 * Generates the FAQPage Schema from a list of items.
 * Handles validation internally.
 */

export const getFAQSchema = (ctx: any, items: any[]) => {
	if (!items || !Array.isArray(items)) return null

	const validItems = items.filter((item: any) => item.title && isRichTextFilled(item.description))

	if (validItems.length === 0) return null

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		inLanguage: getNormalizedLanguage(ctx),
		mainEntity: validItems.map((item: any) => ({
			'@type': 'Question',
			name: item.title,
			acceptedAnswer: {
				'@type': 'Answer',
				text: asText(item.description)
			}
		}))
	}
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
