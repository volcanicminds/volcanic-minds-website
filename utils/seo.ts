import dayjs from 'dayjs'
import { asText, isRichTextFilled } from '~/utils/prismic'
import {
	AREA_SERVED_MAPS,
	ORG_AUTHOR,
	TECH_AUTHOR,
	defaultKnowsAbout,
	landingPageDetails,
	OPENING_HOURS_SPECIFICATION,
	REVIEWS_DATA,
	SAME_AS_SOCIALS,
	SOFTWARE_APPS_DEFAULTS,
	TAG_TO_WIKIDATA
} from '~/utils/constants'

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

/**
 * --- INTERNAL GENERATORS ---
 * Not exported to enforce usage of the main Graph Composer
 */

const getNormalizedLanguage = (ctx: any) => {
	const code = ctx.$i18n.locale || 'en'
	return code.includes('-') ? code.split('-')[0] : code
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

const _getPageImage = (ctx: any) => {
	if (ctx.document.data.og_image?.url) {
		return ctx.document.data.og_image.url
	}

	if (ctx.document.data.slices) {
		const heroSlice = ctx.document.data.slices.find((slice: any) => slice.slice_type === 'hero_banner')
		if (heroSlice?.primary?.background_image?.url) {
			return heroSlice.primary.background_image.url
		}
	}
	return undefined
}

const _getBreadcrumbNode = (ctx: any, document: any, section?: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const homePath = `${sitename}${ctx.localePath('/')}`.replace(/\/$/, '')

	// Do not generate Breadcrumb for Homepage
	if (currentPath === homePath) return null

	const itemListElement = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: homePath
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
			item: currentPath
		})
	}

	return {
		'@type': 'BreadcrumbList',
		'@id': `${currentPath}/#breadcrumb`,
		itemListElement
	}
}

const _getOrganizationNode = (ctx: any, type: string) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const logoUrl = ctx.$store.state.prismic.header?.data?.logo?.url || `${sitename}/logo.png`
	const identityId = `${sitename}/#identity`
	const lang = getNormalizedLanguage(ctx)

	// Default LocalBusiness (LandingLocalPage and generic pages)
	// Supports IT/EN localization
	const localDetails = landingPageDetails.LandingLocalPage[lang] || landingPageDetails.LandingLocalPage.it

	// Base ProfessionalService Schema
	const baseOrg = {
		'@type': 'ProfessionalService',
		'@id': identityId,
		name: localDetails?.name || 'Volcanic Minds',
		url: sitename,
		image: [
			'https://volcanicminds.com/web-app-manifest-512x512.png',
			'https://volcanicminds.com/open-graph.png',
			'https://volcanicminds.com/logo-light.png'
		],
		logo: {
			'@type': 'ImageObject',
			url: logoUrl
		},
		additionalType: [
			'https://www.wikidata.org/wiki/Q1668024', // Computer software company
			'https://www.wikidata.org/wiki/Q5302303' // Software development
		],
		knowsAbout: defaultKnowsAbout,
		email: 'info@volcanicminds.com',
		// telephone: '+39 011 XXXXXXX',
		priceRange: PRICE_RANGE,
		description:
			localDetails?.description ||
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
		sameAs: SAME_AS_SOCIALS,
		areaServed: AREA_SERVED_MAPS.LandingLocalPage,
		aggregateRating: {
			'@type': 'AggregateRating',
			...REVIEWS_DATA
		}
	}

	// Dynamic Overrides based on Landing Page Type
	if (type === 'LandingEuropePage') {
		return {
			...baseOrg,
			'@type': 'Organization',
			name: landingPageDetails.LandingEuropePage.name,
			alternateName: landingPageDetails.LandingEuropePage.alternateName,
			description: landingPageDetails.LandingEuropePage.description,
			contactPoint: {
				'@type': 'ContactPoint',
				// telephone: '+39 011 XXXXXXX',
				email: 'info@volcanicminds.com',
				contactType: 'sales',
				areaServed: {
					'@type': 'Continent',
					name: 'Europe',
					sameAs: 'https://en.wikipedia.org/wiki/Europe'
				},
				availableLanguage: ['English', 'Italian']
			},
			areaServed: AREA_SERVED_MAPS.LandingEuropePage
		}
	}

	if (type === 'LandingItalyPage') {
		return {
			...baseOrg,
			name: landingPageDetails.LandingItalyPage.name,
			alternateName: landingPageDetails.LandingItalyPage.alternateName,
			description: landingPageDetails.LandingItalyPage.description,
			areaServed: AREA_SERVED_MAPS.LandingItalyPage
		}
	}

	if (type === 'LandingNorthItalyPage') {
		return {
			...baseOrg,
			name: landingPageDetails.LandingNorthItalyPage.name,
			description: landingPageDetails.LandingNorthItalyPage.description,
			areaServed: AREA_SERVED_MAPS.LandingNorthItalyPage
		}
	}

	// Default LocalBusiness (LandingLocalPage and generic pages)
	return baseOrg
}

const SERVICES_CATALOG = {
	'it-it': 'Servizi Volcanic Minds',
	en: 'Services Volcanic Minds'
}

const SERVICES_CATALOG_ITEMS = {
	'it-it': [
		{
			name: 'Design Strategy',
			description: 'Scopri il potenziale del tuo prodotto con il nostro metodo personalizzato',
			path: '/services/design-strategy'
		},
		{
			name: 'Digital Factory',
			description: 'Sviluppo Software Custom, Modernizzazione Applicativa e Cloud Native Development.',
			path: '/services/digital-factory'
		},
		{
			name: 'Project Leading',
			description: 'Gestione tecnica dei fornitori, Project Management Agile e supervisione architetturale.',
			path: '/services/project-leading'
		}
	],
	en: [
		{
			name: 'Design Strategy',
			description: "Unlock your product's potential with our custom method",
			path: '/services/design-strategy'
		},
		{
			name: 'Digital Factory',
			description: 'Custom Software Development, Application Modernization and Cloud Native Development.',
			path: '/services/digital-factory'
		},
		{
			name: 'Project Leading',
			description: 'Technical Vendor Management, Agile Project Management and Architectural Oversight.',
			path: '/services/project-leading'
		}
	]
}

const _getServiceNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const identityId = `${sitename}/#identity`

	const serviceNode: any = {
		'@type': 'Service',
		'@id': `${currentPath}/#service`,
		name: ctx.document.data.title,
		serviceType:
			ctx.document.data.service_type ||
			ctx.document.data.og_title ||
			ctx.document.data.seo_title ||
			ctx.document.data.title ||
			'Service',
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		provider: { '@id': identityId },
		areaServed: ctx.$constants.areaServed[ctx.$i18n.locale]
	}

	if (
		ctx.document.uid === 'services' ||
		ctx.$nuxt.$route.path.endsWith('/services') ||
		ctx.$nuxt.$route.path.endsWith('/services/')
	) {
		const locale = ctx.$i18n.locale === 'it-it' ? 'it-it' : 'en'
		const catalogItems = SERVICES_CATALOG_ITEMS[locale] || SERVICES_CATALOG_ITEMS.en
		serviceNode.hasOfferCatalog = {
			'@type': 'OfferCatalog',
			name: SERVICES_CATALOG[locale]
		}

		serviceNode.hasOfferCatalog.itemListElement = catalogItems.map((item: any) => ({
			'@type': 'Offer',
			itemOffered: {
				'@type': 'Service',
				name: item.name,
				description: item.description,
				url: `${sitename}${ctx.localePath(item.path).replace(/\/$/, '')}`
			}
		}))
	}

	return serviceNode
}

const _getWebPageNode = (ctx: any, document: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.switchLocalePath(ctx.$i18n.locale)}`.replace(/\/$/, '')
	const identityId = `${sitename}/#identity`

	const homePath = `${sitename}${ctx.localePath('/')}`.replace(/\/$/, '')
	const isHome = currentPath === homePath

	const webpageNode: any = {
		'@type': 'WebPage',
		'@id': `${currentPath}/#webpage`,
		url: currentPath,
		name: document.data.seo_title || document.data.title || ctx.$constants.seoTitle,
		description:
			document.data.seo_description || ctx.$constants.seoDescription || ctx.$constants.schemaOrganization.description,
		image: _getPageImage(ctx),
		inLanguage: getNormalizedLanguage(ctx),
		isPartOf: { '@id': `${sitename}/#website` },
		about: { '@id': identityId },
		publisher: { '@id': identityId }
	}

	if (!isHome) {
		webpageNode.breadcrumb = { '@id': `${currentPath}/#breadcrumb` }
	}

	return webpageNode
}

const _getArticleNode = (ctx: any, type = 'TechArticle') => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const identityId = `${sitename}/#identity`

	let authorNode: any = ORG_AUTHOR
	if (type === 'TechArticle') {
		authorNode = TECH_AUTHOR
	}

	const mentions: any[] = []
	if (ctx.document.tags && Array.isArray(ctx.document.tags)) {
		ctx.document.tags.forEach((tag: string) => {
			if (TAG_TO_WIKIDATA[tag]) {
				mentions.push({
					'@type': 'Thing',
					name: tag,
					sameAs: TAG_TO_WIKIDATA[tag]
				})
			}
		})
	}

	const articleNode: any = {
		'@type': type,
		'@id': `${currentPath}/#article`,
		headline: ctx.document.data.title,
		image: ctx.document.data.og_image?.url ? [ctx.document.data.og_image.url] : [],
		datePublished: ctx.document.data.publication_date_sort
			? dayjs(ctx.document.data.publication_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
			: undefined,
		dateModified: ctx.document.data.latest_revision_date_sort
			? dayjs(ctx.document.data.latest_revision_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
			: undefined,
		author: authorNode,
		publisher: { '@id': identityId },
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		about: ctx.document.tags,
		mainEntityOfPage: { '@id': `${currentPath}/#webpage` }
	}

	// Inject Mentions if any
	if (mentions.length > 0) {
		articleNode.mentions = mentions
	}

	// Only TechArticle supports proficiencyLevel
	if (type === 'TechArticle') {
		articleNode.proficiencyLevel = ctx.document.data.proficiency_level || 'Expert'
	}

	return articleNode
}

const _getFAQNode = (ctx: any, items: any[]) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')

	if (!items || !Array.isArray(items)) return null
	const validItems = items.filter((item: any) => item.title && isRichTextFilled(item.description))
	if (validItems.length === 0) return null

	return {
		'@type': 'FAQPage',
		'@id': `${currentPath}/#faq`,
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

const _getCollectionPageNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')

	const articlesGridSlice = ctx.document.data.slices.find(
		(slice: { slice_type: string }) => slice.slice_type === 'articles_grid'
	)
	const itemListElement: any[] = []
	if (articlesGridSlice && articlesGridSlice.items) {
		itemListElement.push(
			...articlesGridSlice.items.map((item: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				url: `${process.env.NUXT_SITENAME}${ctx.switchLocalePath(ctx.$i18n.locale).replace(/\/$/, '')}/${item.article.uid}`
			}))
		)
	}

	return {
		'@type': 'CollectionPage',
		'@id': `${currentPath}/#collection`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement
		}
	}
}

const _getAboutPageNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const identityId = `${sitename}/#identity`

	return {
		'@type': 'AboutPage',
		'@id': `${currentPath}/#aboutpage`,
		mainEntity: { '@id': identityId }
	}
}

const _getContactPageNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const identityId = `${sitename}/#identity`

	return {
		'@type': 'ContactPage',
		'@id': `${currentPath}/#contactpage`,
		mainEntity: { '@id': identityId }
	}
}

const _getVideoObjectNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')
	const videoSlice = ctx.youtubeSlice

	if (!videoSlice?.primary?.video_id) return null

	return {
		'@type': 'VideoObject',
		'@id': `${currentPath}/#video`,
		name: videoSlice.primary.video_title,
		description: videoSlice.primary.video_description,
		thumbnailUrl: `https://i.ytimg.com/vi/${videoSlice.primary.video_id}/hqdefault.jpg`,
		uploadDate: videoSlice.primary.video_publishedAt,
		embedUrl: `https://www.youtube.com/embed/${videoSlice.primary.video_id}`,
		duration: videoSlice.primary.video_duration,
		publisher: {
			'@type': 'Organization',
			name: ctx.$constants.author || 'Volcanic Minds',
			logo: {
				'@type': 'ImageObject',
				url: `${sitename}${ctx.$constants.logo || '/logo.png'}`,
				width: 192,
				height: 192
			}
		},
		interactionStatistic: {
			'@type': 'InteractionCounter',
			interactionType: {
				'@type': 'UseAction',
				name: 'ViewAction'
			},
			userInteractionCount: videoSlice.primary.video_viewCount
		},
		keywords: videoSlice.primary.video_keywords,
		contentUrl: `https://www.youtube.com/watch?v=${videoSlice.primary.video_id}`,
		mainEntityOfPage: { '@id': `${currentPath}/#webpage` }
	}
}

const _getSoftwareApplicationNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')

	return {
		'@type': 'SoftwareApplication',
		'@id': `${currentPath}/#software`,
		name: ctx.document.data.title,
		description: ctx.document.data.seo_description || ctx.$constants.seoDescription,
		image: ctx.document.data.og_image?.url,
		url: currentPath,
		...SOFTWARE_APPS_DEFAULTS[ctx.$i18n.locale],
		currentLine: ctx.document.uid === 'volcano-sdk' ? 'Volcano SDK 1.0' : undefined // Example of dynamic override
	}
}

const _getHowToNode = (ctx: any) => {
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	const currentPath = `${sitename}${ctx.$nuxt.$route.path}`.replace(/\/$/, '')

	// Find the HowToSteps slice
	const howToSlice = ctx.document.data.slices?.find(
		(slice: { slice_type: string }) => slice.slice_type === 'how_to_steps'
	)

	if (!howToSlice || !howToSlice.items || howToSlice.items.length === 0) return null

	const steps = howToSlice.items.map((item: any, index: number) => ({
		'@type': 'HowToStep',
		position: index + 1,
		name: item.step_title || `Step ${index + 1}`,
		text: asText(item.step_description),
		url: `${currentPath}/#step${index + 1}`
	}))

	return {
		'@type': 'HowTo',
		'@id': `${currentPath}/#howto`,
		name: howToSlice.primary.title || ctx.document.data.title,
		description: howToSlice.primary.subtitle || ctx.document.data.seo_description,
		step: steps
	}
}

/**
 * Constructs the Link Graph based on page type.
 */
export const getCompanySchema = (ctx: any, type = 'WebPage', faqItems?: any[]) => {
	const graph: any[] = []

	// 1. Organization / Main Node (Always present)
	const orgNode = _getOrganizationNode(ctx, type)
	graph.push(orgNode)

	// 2. WebSite Node (Static, always present context)
	const sitename = process.env.NUXT_SITENAME || 'https://volcanicminds.com'
	graph.push({
		'@type': 'WebSite',
		'@id': `${sitename}/#website`,
		url: sitename,
		name: 'Volcanic Minds',
		publisher: { '@id': `${sitename}/#identity` }
	})

	// 3. WebPage Node (Always present)
	const webPageNode: any = _getWebPageNode(ctx, ctx.document)
	graph.push(webPageNode)

	// 4. Breadcrumb Node
	// Pass ctx.section if available (for Level 2 pages)
	const breadcrumbNode = _getBreadcrumbNode(ctx, ctx.document, ctx.section)
	if (breadcrumbNode) {
		graph.push(breadcrumbNode)
	}

	// 5. Specific Type Nodes (Service, Article, FAQ, etc.)
	if (['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'].includes(type)) {
		const articleNode = _getArticleNode(ctx, type)
		// Link WebPage -> Article
		webPageNode.mainEntity = { '@id': articleNode['@id'] }
		graph.push(articleNode)
	} else if (type === 'Service') {
		const serviceNode = _getServiceNode(ctx)
		// Link WebPage -> Service
		webPageNode.mainEntity = { '@id': serviceNode['@id'] }
		graph.push(serviceNode)
	} else if (type === 'CollectionPage') {
		const collectionNode = _getCollectionPageNode(ctx)
		webPageNode.mainEntity = { '@id': collectionNode['@id'] }
		graph.push(collectionNode)
	} else if (type === 'AboutPage') {
		const aboutNode = _getAboutPageNode(ctx)
		Object.assign(webPageNode, aboutNode)
	} else if (type === 'ContactPage') {
		const contactNode = _getContactPageNode(ctx)
		Object.assign(webPageNode, contactNode)
	} else if (type === 'SoftwareApplication') {
		const softwareNode = _getSoftwareApplicationNode(ctx)
		webPageNode.mainEntity = { '@id': softwareNode['@id'] }
		graph.push(softwareNode)
	}

	// 6. FAQ Logic (Can accompany any page type)
	if (type === 'FAQPage' && faqItems) {
		const faqNode = _getFAQNode(ctx, faqItems)
		if (faqNode) {
			// FAQ is often auxiliary, but if it's an FAQPage it's main
			webPageNode.mainEntity = { '@id': faqNode['@id'] }
			graph.push(faqNode)
		}
	} else if (faqItems && faqItems.length > 0) {
		// If page is NOT FAQPage but has FAQ items (e.g. Service with FAQs)
		const faqNode = _getFAQNode(ctx, faqItems)
		if (faqNode) {
			webPageNode.hasPart = { '@id': faqNode['@id'] }
			graph.push(faqNode)
		}
	}

	// 7. HowTo Logic
	const howToNode = _getHowToNode(ctx)
	if (howToNode) {
		webPageNode.hasPart = webPageNode.hasPart
			? [].concat(webPageNode.hasPart, { '@id': howToNode['@id'] } as any)
			: { '@id': howToNode['@id'] }
		graph.push(howToNode)
	}

	// 8. VideoObject Logic (If youtubeSlice is present on context)
	if (ctx.youtubeSlice) {
		const videoNode = _getVideoObjectNode(ctx)
		if (videoNode) {
			// Video is usually part of the page content
			webPageNode.hasPart = webPageNode.hasPart
				? [].concat(webPageNode.hasPart, { '@id': videoNode['@id'] } as any)
				: { '@id': videoNode['@id'] }
			graph.push(videoNode)
		}
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': graph
	}

	return jsonLd
}

// Keep export for LCP Preload if unrelated to schema
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
