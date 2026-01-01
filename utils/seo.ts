import dayjs from 'dayjs'
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

const PRICE_RANGE = '€€-€€€'

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

const getNormalizedLanguage = (ctx: any) => {
	const code = ctx.$i18n.locale || 'en'
	return code.includes('-') ? code.split('-')[0] : code
}

const getOrganizationSchema = (ctx: any) => {
	const schema = { ...ctx.$constants.schemaOrganization }
	const logoField = ctx.$store.state.prismic.header?.data?.logo

	if (logoField && logoField.url) {
		const size = 50
		schema.logo = logoField.url.includes('.svg') ? logoField.url : `${logoField.url}&h=${size}&fit=max`
	}

	return schema
}

const getWebPageSchema = (ctx: any) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		...getOrganizationSchema(ctx),
		'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}#organization`,
		url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`,
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale],
		description:
			ctx.document.data.seo_description ||
			ctx.$constants.seoDescription ||
			ctx.$constants.schemaOrganization.description,
		headline: ctx.document.data.seo_title || ctx.$constants.seoTitle,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`
		},
		knowsAbout: ctx.$constants.defaultKnowsAbout,
		makesOffer: ctx.$constants.defaultMakesOffer[ctx.$i18n.locale],
		inLanguage: getNormalizedLanguage(ctx)
	}
}

const getHomePageSchema = (ctx: any) => {
	return {
		'@context': 'https://schema.org',
		...getOrganizationSchema(ctx),
		'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}#organization`,
		url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`,
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale],
		description:
			ctx.document.data.seo_description ||
			ctx.$constants.seoDescription ||
			ctx.$constants.schemaOrganization.description,
		knowsAbout: ctx.$constants.defaultKnowsAbout,
		makesOffer: ctx.$constants.defaultMakesOffer[ctx.$i18n.locale],
		inLanguage: getNormalizedLanguage(ctx),
		priceRange: PRICE_RANGE
	}
}

const getServiceSchema = (ctx: any) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		inLanguage: getNormalizedLanguage(ctx),
		serviceType: ctx.document.data.title,
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		provider: getOrganizationSchema(ctx),
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Servizi Volcanic Minds'
		}
	}
}

const getLandingPageSchema = (ctx: any, type = 'LandingLocalPage') => {
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
				...COMPANY_ADDRESS
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
			name: 'Volcanic Minds',
			alternateName: 'Volcanic Minds - Sviluppo Software Italia',
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
			priceRange: PRICE_RANGE
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
			priceRange: PRICE_RANGE
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
		priceRange: PRICE_RANGE,
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

const getFAQPageSchema = (ctx: any, items: any[]) => {
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

const getAboutPageSchema = (ctx: any) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		mainEntity: ctx.$constants.schemaOrganization,
		...getOrganizationSchema(ctx),
		'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}#organization`,
		url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`,
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale],
		description:
			ctx.document.data.seo_description ||
			ctx.$constants.seoDescription ||
			ctx.$constants.schemaOrganization.description,
		headline: ctx.document.data.seo_title || ctx.$constants.seoTitle,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`
		},
		knowsAbout: ctx.$constants.defaultKnowsAbout,
		makesOffer: ctx.$constants.defaultMakesOffer[ctx.$i18n.locale],
		inLanguage: getNormalizedLanguage(ctx)
	}
}

const getArticleSchema = (ctx: any, type = 'TechArticle') => {
	return {
		'@context': 'https://schema.org',
		'@type': type,
		inLanguage: getNormalizedLanguage(ctx),
		headline: ctx.document.data.title,
		image: ctx.document.data.og_image?.url ? [ctx.document.data.og_image.url] : [],
		datePublished:
			ctx.document.data.publication_date ||
			(ctx.document.data.publication_date_sort
				? dayjs(ctx.document.data.publication_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
				: undefined),
		dateModified:
			ctx.document.data.latest_revision_date ||
			(ctx.document.data.latest_revision_date_sort
				? dayjs(ctx.document.data.latest_revision_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
				: undefined),
		proficiencyLevel: ctx.document.data.proficiency_level || 'Expert',
		author: {
			'@type': 'Organization',
			name: 'Volcanic Minds Team',
			url: 'https://volcanicminds.com'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Volcanic Minds',
			logo: {
				'@type': 'ImageObject',
				url: `${process.env.NUXT_SITENAME}${ctx.$constants.logo}`
			}
		},
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		about: ctx.document.tags // Use Prismic tags as "about"
	}
}

const getCollectionPageSchema = (ctx: any) => {
	const articlesGridSlice = ctx.document.data.slices.find(
		(slice: { slice_type: string }) => slice.slice_type === 'articles_grid'
	)
	const itemListElement: any[] = []
	if (articlesGridSlice && articlesGridSlice.items) {
		itemListElement.push(
			...articlesGridSlice.items.map((item: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}insights/${item.article.uid}`
			}))
		)
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		inLanguage: getNormalizedLanguage(ctx),
		headline: ctx.document.data.title,
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement
		}
	}
}

const getContactPageSchema = (ctx: any) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		mainEntity: {
			'@type': 'Organization',
			...getOrganizationSchema(ctx),
			contactPoint: ctx.$constants.contactPoints
		},
		...getOrganizationSchema(ctx),
		'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}#organization`,
		url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`,
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale],
		description:
			ctx.document.data.seo_description ||
			ctx.$constants.seoDescription ||
			ctx.$constants.schemaOrganization.description,
		headline: ctx.document.data.seo_title || ctx.$constants.seoTitle,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale)}`
		},
		knowsAbout: ctx.$constants.defaultKnowsAbout,
		makesOffer: ctx.$constants.defaultMakesOffer[ctx.$i18n.locale],
		inLanguage: getNormalizedLanguage(ctx)
	}
}

const _getCompanySchema = (ctx: any, type = 'WebPage', items?: any[]) => {
	if (type.startsWith('Landing')) {
		return getLandingPageSchema(ctx, type)
	}

	if (['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'].includes(type)) {
		return getArticleSchema(ctx, type)
	}

	if (type === 'CollectionPage') {
		return getCollectionPageSchema(ctx)
	}

	if (type === 'Service') {
		return getServiceSchema(ctx)
	}

	if (type === 'AboutPage') {
		return getAboutPageSchema(ctx)
	}

	if (type === 'ContactPage') {
		return getContactPageSchema(ctx)
	}

	if (type === 'FAQPage' && items) {
		return getFAQPageSchema(ctx, items)
	}

	if (type === 'HomePage') {
		return getHomePageSchema(ctx)
	}

	return getWebPageSchema(ctx)
}

export const getCompanySchema = (ctx: any, type = 'WebPage', items?: any[]) => {
	const jsonLd = _getCompanySchema(ctx, type, items)
	console.log(jsonLd)
	return jsonLd
}
