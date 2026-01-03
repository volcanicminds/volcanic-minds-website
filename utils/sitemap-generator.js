/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const prismicModule = require('@prismicio/client')
// Try getting createClient from named or default
const createClient = prismicModule.createClient || prismicModule.default?.createClient || prismicModule.client

const smConfig = require('../slicemachine.config.json')

// Helper to ensure we have a fetch polyfill if needed in Node context
// Nuxt gen usually provides it, but being safe.
if (!global.fetch) {
	global.fetch = require('node-fetch')
}

const SITE_URL = process.env.NUXT_SITENAME || 'https://volcanicminds.com'

async function generateSitemap() {
	console.log('🗺️  Starting custom Sitemap generation...')
	// Legacy Client support (v2/v3)
	const createClient = prismicModule.client

	if (!createClient) {
		throw new Error('Could not find client factory in @prismicio/client')
	}

	const client = createClient(smConfig.apiEndpoint)

	try {
		// 1. Fetch all documents (Legacy Pagination)
		const docs = []
		let page = 1
		let totalPages = 1

		while (page <= totalPages) {
			const response = await client.query([], {
				pageSize: 100,
				page,
				lang: '*'
			})
			docs.push(...response.results)
			totalPages = response.total_pages
			page++
		}

		console.log(`ℹ️  Fetched ${docs.length} documents.`)

		// 2. Group by type and Process
		// We need to group by "Logical Page" (e.g. "Services" page exists in IT and EN)
		// We'll map by UID (or some unique key) to group translations.
		// For First/Second level pages, UID is shared across languages usually (Prismic standard).
		// Insights are 'second_level_page' but inside 'insights' folder conceptually.

		const pagesMap = new Map()

		// Initial Static Pages (Home, etc if not in Prismic, but Home is usually Prismic)
		// Assuming Home is 'homepage' type.
		// Let's iterate docs and build the map.

		docs.forEach((doc) => {
			// Exclusion Logic
			if (['404', 'thank-you'].includes(doc.uid)) return

			let key = doc.uid
			const type = doc.type
			let url = ''
			let priority = 0.5 // Default

			// Determine URL and Grouping Key
			if (type === 'homepage') {
				key = '__homepage__'
				url = doc.lang === 'it-it' ? '/' : `/${doc.lang.slice(0, 2)}`
				priority = 10 // Highest priority (sorting weight)
			} else if (type === 'first_level_page') {
				// e.g. /services, /about-us
				url = doc.lang === 'it-it' ? `/${doc.uid}` : `/${doc.lang.slice(0, 2)}/${doc.uid}`

				// Custom priorities for First Level Pages
				const firstLevelPriorities = {
					'about-us': 80,
					portfolio: 70,
					contacts: 60,
					'privacy-policy': 50,
					services: 40
				}
				priority = firstLevelPriorities[doc.uid] || 30
			} else if (type === 'second_level_page') {
				const sectionId = doc.data.section?.id
				const sectionDoc = docs.find((d) => d.id === sectionId)
				const sectionUid = sectionDoc ? sectionDoc.uid : 'unknown'

				if (sectionUid === 'insights') {
					url = doc.lang === 'it-it' ? `/insights/${doc.uid}` : `/${doc.lang.slice(0, 2)}/insights/${doc.uid}`
					if (doc.uid === 'insights') {
						// Main Insights page (if it exists as a doc/uid) - check if this logic holds
						// Usually Insights main page is a 'first_level_page' or similar
						// If this is an article:
						priority = 5 // Articles lowest
					} else {
						priority = 5
					}
				} else {
					// Service details, FAQ, etc.
					url = doc.lang === 'it-it' ? `/${sectionUid}/${doc.uid}` : `/${doc.lang.slice(0, 2)}/${sectionUid}/${doc.uid}`
					if (doc.uid === 'frequently-asked-questions') {
						priority = 10 // FAQ lower than services
					} else {
						priority = 35 // Service sub-pages
					}
				}
			}

			// Special case: Insights main page might be handled differently or as valid uid
			if (url.endsWith('/insights')) {
				priority = 90 // High priority
			}

			if (url) {
				// Normalize key for grouping translations
				const groupKey = type === 'homepage' ? 'home' : `${type}_${key}`

				if (!pagesMap.has(groupKey)) {
					pagesMap.set(groupKey, {
						type,
						uid: key,
						priority,
						alternates: []
					})
				}

				// Clean double slashes
				url = url.replace(/([^:]\/)\/+/g, '$1')
				if (url !== '/' && url.endsWith('/')) url = url.slice(0, -1)

				const entry = pagesMap.get(groupKey)
				const langCode = doc.lang === 'it-it' ? 'it' : doc.lang.slice(0, 2)

				// Extract Images from Document
				const images = []

				// 1. Main Preview Image
				if (doc.data.preview_image && doc.data.preview_image.url) {
					images.push({
						loc: doc.data.preview_image.url.split('?')[0],
						title: doc.data.preview_image.alt || doc.data.title || ''
					})
				}

				// 2. Scan Slices for Images
				if (doc.data.slices) {
					doc.data.slices.forEach((slice) => {
						// ImageAndText
						if (slice.slice_type === 'image_and_text') {
							if (slice.primary.image && slice.primary.image.url) {
								images.push({
									loc: slice.primary.image.url.split('?')[0],
									title: slice.primary.image.alt || slice.primary.title || doc.data.title || ''
								})
							}
						}
						// HeroBanner
						else if (slice.slice_type === 'hero_banner') {
							if (slice.primary.background_image && slice.primary.background_image.url) {
								images.push({
									loc: slice.primary.background_image.url.split('?')[0],
									title: slice.primary.background_image.alt || doc.data.title || ''
								})
							}
						}
						// Masonry
						else if (slice.slice_type === 'masonry') {
							if (slice.items) {
								slice.items.forEach((item) => {
									if (item.card_image && item.card_image.url) {
										images.push({
											loc: item.card_image.url.split('?')[0],
											title: item.card_image.alt || item.card_title || doc.data.title || ''
										})
									}
									// Masonry hover image
									if (item.card_image_hover && item.card_image_hover.url) {
										images.push({
											loc: item.card_image_hover.url.split('?')[0],
											title: item.card_image_hover.alt || doc.data.title || ''
										})
									}
								})
							}
						}
						// CardsGrid
						else if (slice.slice_type === 'cards_grid') {
							if (slice.items) {
								slice.items.forEach((item) => {
									if (item.background && item.background.url) {
										images.push({
											loc: item.background.url.split('?')[0],
											title: item.background.alt || item.card_title || doc.data.title || ''
										})
									}
								})
							}
						}
					})
				}

				// Remove duplicates by URL
				const uniqueImages = []
				const seenUrls = new Set()
				images.forEach((img) => {
					if (!seenUrls.has(img.loc)) {
						seenUrls.add(img.loc)
						uniqueImages.push(img)
					}
				})

				entry.alternates.push({
					lang: langCode,
					url: `${SITE_URL}${url}`,
					lastmod: doc.last_publication_date,
					images: uniqueImages
				})
			}
		})

		// 3. Sort Keys according to requested order
		// Custom Sort Order (Higher Priority First)
		// 1. Home (100) -> Insights (90) -> About (80) -> Portfolio (70) -> Contacts (60) -> Privacy (50) -> Services (40) -> Service Detail (35) -> FAQ (10) -> Articles (5)
		// Note: The previous priority variable was used as a weight. Let's fix the weights to match the list above logic.

		// Re-map priorities based strictly on requested order:
		// 1. Home
		// 2. Insights (Main)
		// 3. About Us
		// 4. Portfolio
		// 5. Contacts
		// 6. Privacy Policy
		// 7. Services (Main)
		// 8. Service Details
		// 9. FAQ
		// 10. Insight Posts

		const getWeight = (group) => {
			const u = group.uid
			const t = group.type
			const mainUrl = (group.alternates[0] && group.alternates[0].url) || ''

			if (t === 'homepage') return 100
			if (mainUrl.endsWith('/insights')) return 90
			if (u === 'about-us') return 80
			if (u === 'portfolio') return 70
			if (u === 'contacts') return 60
			if (u === 'privacy-policy') return 50
			if (u === 'services') return 40

			// Service Details (checking URL structure or type)
			if (t === 'second_level_page' && !mainUrl.includes('/insights/')) {
				if (u === 'frequently-asked-questions') return 20
				return 30
			}

			// Insight Posts
			if (mainUrl.includes('/insights/')) return 10

			return 0
		}

		const sortedGroups = Array.from(pagesMap.values()).sort((a, b) => {
			const wA = getWeight(a)
			const wB = getWeight(b)
			return wB - wA // Descending order of weight
		})

		// 4. Build XML
		let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
		xml +=
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n'

		sortedGroups.forEach((group) => {
			// We need to print a <url> block for EACH alternate as the main loc,
			// plus all alternates inside it.
			// e.g. if we have IT and EN:
			// Block 1: loc = IT, alternates = IT, EN, x-default (EN)
			// Block 2: loc = EN, alternates = IT, EN, x-default (EN)

			// Search for default language (en)
			const defaultLangVariant = group.alternates.find((a) => a.lang === 'en') || group.alternates[0]
			const defaultLangUrl = defaultLangVariant.url

			group.alternates.forEach((mainVariant) => {
				xml += '    <url>\n'
				xml += `        <loc>${mainVariant.url}</loc>\n`

				// Add lastmod if available
				if (mainVariant.lastmod) {
					// Ensure format is compatible (ISO strings usually are)
					// Prismic returns full ISO e.g. 2024-05-12T10:00:00+0000
					// sitemaps usually prefer YYYY-MM-DD or full ISO 8601 with colon in timezone
					const isoDate = mainVariant.lastmod.replace('+0000', '+00:00')
					xml += `        <lastmod>${isoDate}</lastmod>\n`
				}

				group.alternates.forEach((alt) => {
					xml += `        <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />\n`
				})
				// x-default
				xml += `        <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLangUrl}" />\n`

				// Add Images
				if (mainVariant.images && mainVariant.images.length > 0) {
					mainVariant.images.forEach((img) => {
						xml += '        <image:image>\n'
						xml += `            <image:loc>${img.loc}</image:loc>\n`
						if (img.title) {
							// Escape generic characters if needed, mostly handled by js strings but basic XML escape might be safer if titles have special chars
							const safeTitle = img.title
								.replace(/&/g, '&amp;')
								.replace(/</g, '&lt;')
								.replace(/>/g, '&gt;')
								.replace(/"/g, '&quot;')
								.replace(/'/g, '&apos;')
							xml += `            <image:title>${safeTitle}</image:title>\n`
						}
						xml += '        </image:image>\n'
					})
				}

				xml += '    </url>\n'
			})
		})

		xml += '</urlset>'

		// 5. Write File
		const distPath = path.resolve(__dirname, '../static/sitemap.xml')
		fs.writeFileSync(distPath, xml)
		console.log(`✅ Sitemap generated at ${distPath}`)
	} catch (e) {
		console.error('❌ Error generating sitemap:', e)
	}
}

module.exports = generateSitemap
