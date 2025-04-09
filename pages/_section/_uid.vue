<template>
	<div class="flex-auto">
		<Breadcrumbs
			v-if="document.data.show_breadcrumb && document.data.title"
			:section="section"
			:current-page="document.data.title"
		/>
		<slice-zone :components="components" :slices="document.data.slices" />
		<Credits
			v-if="document.tags.length || document.data.publication_date || document.data.latest_revision_date"
			:tags="document.tags"
			:publication-date="document.data.publication_date"
			:publication-date-label="document.data.publication_date_label"
			:latest-revision-date="document.data.latest_revision_date"
			:latest-revision-date-label="document.data.latest_revision_date_label"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { components } from '~/slices'

@Component({
	// @ts-ignore
	async asyncData({ $prismic, params, error, i18n, store }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('second_level_page', params.uid, { lang })

		let section = null
		if (document) {
			section = await $prismic.api.getByUID('first_level_page', document.data.section.uid, { lang })
		}

		let altLangs = {}
		if (document && document.alternate_languages.length) {
			const alternateIds = document.alternate_languages.map((lang) => lang.id)
			altLangs = await $prismic.api.query($prismic.predicate.in('document.id', alternateIds), { lang: '*' })
		}
		await store.dispatch('prismic/load', { lang, altLangs })

		// Get all ArticlesGrid slices
		const slices = document.data.slices
		const articlesGridSlices = slices.filter((slice: { slice_type: string }) => slice.slice_type === 'articles_grid')

		const youtubeSlice = document.data.slices.find(
			(slice: { slice_type: string }) => slice.slice_type === 'youtube_embed'
		)

		if (
			// process.env.NODE_ENV === 'production' &&
			process.env.YOUTUBE_API_KEY &&
			youtubeSlice
		) {
			const videoId = youtubeSlice.primary.video_id
			if (videoId) {
				try {
					// URL creation
					const url = new URL('https://www.googleapis.com/youtube/v3/videos')
					url.searchParams.append('id', videoId)
					url.searchParams.append('key', process.env.YOUTUBE_API_KEY)
					url.searchParams.append('part', 'snippet,contentDetails,statistics')

					// Fetching video details
					const res = await fetch(url.toString())

					// Error handling
					if (!res.ok) {
						throw new Error(`Errore nella risposta: ${res.statusText}`)
					}

					// Parsing JSON response
					const jsonResponse = await res.json()

					// Check if the response contains items
					const videoData = jsonResponse?.items?.[0]
					if (videoData) {
						const durationISO = videoData?.contentDetails?.duration
						youtubeSlice.primary.video_duration = durationISO ? parseISODuration(durationISO) : undefined

						youtubeSlice.primary.video_title = videoData?.snippet?.title
						youtubeSlice.primary.video_publishedAt = videoData?.snippet?.publishedAt
						youtubeSlice.primary.video_viewCount = videoData?.statistics?.viewCount

						const description = videoData?.snippet?.description
						youtubeSlice.primary.video_description = description
							? description.length > 150
								? description.substring(0, 150) + '...'
								: description
							: undefined
						youtubeSlice.primary.video_keywords = description
							.match(/#[\w-]+/g) // find hashtags like #keyword1
							?.map((tag: string) => tag.slice(1)) // remove #
							.join(', ')
					} else {
						console.error('Video data not found in the response')
					}
				} catch (err) {
					console.error('Error during YouTube video details retrieve:', err)
				}
			}
		}

		function parseISODuration(iso: string) {
			if (!iso) return undefined

			const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
			const match = regex.exec(iso)

			if (!match) return undefined

			const [, h, m, s] = match
			const pad = (n: string | number) => String(n).padStart(2, '0')

			// String construction
			let duration = 'PT'
			if (h) duration += `${pad(h)}H`
			if (m) duration += `${pad(m)}M`
			if (s) duration += `${pad(s)}S`

			// If no minutes or seconds, return undefined
			return duration === 'PT' ? undefined : duration
		}

		if (articlesGridSlices.length > 0) {
			for (const slice of articlesGridSlices) {
				if (slice.variation === 'default') {
					// Handle default variant: Fetch articles based on provided UIDs
					const articleUIDs = slice.items.map((item: any) => item.article.uid)

					// Get articles data from Prismic
					if (articleUIDs.length > 0) {
						const articlesResponse = await $prismic.api.query(
							[
								$prismic.predicates.at('document.type', 'second_level_page'),
								$prismic.predicates.in('my.second_level_page.uid', articleUIDs)
							],
							{ lang }
						)

						// Add articles data to slice
						slice.items = slice.items.map((item: any) => {
							const articleData = articlesResponse.results.find(
								(article: { uid: any }) => article.uid === item.article.uid
							)
							return {
								...item,
								article: articleData || item.article
							}
						})
					}
				} else if (slice.variation === 'allArticles') {
					// Handle allArticles variant: Fetch all articles with is_article set to true
					const articlesResponse = await $prismic.api.query(
						[
							$prismic.predicates.at('document.type', 'second_level_page'),
							$prismic.predicates.at('my.second_level_page.is_article', true)
						],
						{
							lang,
							orderings: '[my.second_level_page.publication_date_sort desc]' // descending date ordering
						}
					)

					// Replace slice items with the fetched articles
					slice.items = articlesResponse.results.map((article: any) => ({
						article
					}))
				}
			}
		}

		if (document && section) {
			return { document, section, youtubeSlice }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	}
})
export default class PageComponent extends Vue {
	document!: any
	$constants!: any
	section!: any
	youtubeSlice!: any

	@Provide() components = components

	// https://jankal.dev/blog/typing-the-nuxt-head-method/
	head(): {
		title: any
		meta: (
			| { hid: string; name: string; content: any; property?: undefined }
			| { hid: string; property: string; content: any; name?: undefined }
		)[]
		htmlAttrs: { lang: string }
		script: { type: string; json: any }[]
	} {
		return {
			title: this.document.data.seo_title || this.$constants.seoTitle,
			meta: [
				...(this.document.data.no_index ? [{ hid: 'robots', name: 'robots', content: 'noindex, nofollow' }] : []),
				{
					hid: 'description',
					name: 'description',
					content: this.document.data.seo_description || this.$constants.seoDescription
				},
				{
					hid: 'og-site_name',
					property: 'og:site_name',
					content: this.$constants.seoSiteName
				},
				{ hid: 'og-type', property: 'og:type', content: 'website' },
				{
					hid: 'og-title',
					property: 'og:title',
					content: this.document.data.seo_title || this.$constants.seoTitle
				},
				{
					hid: 'og-desc',
					property: 'og:description',
					content: this.document.data.seo_description || this.$constants.seoDescription
				},
				{
					hid: 'og-image',
					property: 'og:image',
					content: this.document.data.og_image
						? this.document.data.og_image.url
						: `${process.env.NUXT_SITENAME}${this.$constants.seoImageUrl}`
				},
				{
					hid: 'og-url',
					property: 'og:url',
					content: `${process.env.NUXT_SITENAME}${this.$nuxt.$route.path}`
				},
				{ hid: 't-type', name: 'twitter:card', content: 'summary_large_image' }
			],
			htmlAttrs: {
				lang: this.$i18n.locale
			},
			script: [
				{
					type: 'application/ld+json',
					json: {
						'@context': 'https://schema.org',
						'@type': this.document.data.schema_org_type,
						headline: this.document.data.seo_title || this.$constants.seoTitle,
						description: this.document.data.seo_description || this.$constants.seoDescription,
						datePublished: this.document.data.publication_date_sort
							? dayjs(this.document.data.publication_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
							: undefined,
						dateModified: this.document.data.latest_revision_date_sort
							? dayjs(this.document.data.latest_revision_date_sort).format('YYYY-MM-DDTHH:mm:ss[Z]')
							: undefined,
						author: ['Article', 'BlogPosting', 'NewsArticle'].includes(this.document.data.schema_org_type)
							? {
									'@type': 'Organization',
									url: process.env.NUXT_SITENAME,
									name: this.$constants.author,
									logo: {
										'@type': 'ImageObject',
										url: `${process.env.NUXT_SITENAME}${this.$constants.logo}`,
										width: 192,
										height: 192
									}
								}
							: undefined,
						publisher: {
							'@type': 'Organization',
							name: this.$constants.author,
							logo: {
								'@type': 'ImageObject',
								url: `${process.env.NUXT_SITENAME}${this.$constants.logo}`,
								width: 192,
								height: 192
							}
						},
						image: this.document.data.og_image?.url
							? {
									'@type': 'ImageObject',
									url: this.document.data.og_image.url,
									width: this.document.data.og_image.dimensions.width,
									height: this.document.data.og_image.dimensions.height
								}
							: {
									'@type': 'ImageObject',
									url: `${process.env.NUXT_SITENAME}${this.$constants.seoImageUrl}`,
									width: 1200,
									height: 630
								},
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': `${process.env.NUXT_SITENAME}${this.$nuxt.$route.path}`
						},
						inLanguage: this.$i18n.locale
					}
				},
				...(this.youtubeSlice
					? [
							{
								type: 'application/ld+json',
								json: {
									'@context': 'https://schema.org',
									'@type': 'VideoObject',
									name: this.youtubeSlice.primary.video_title,
									description: this.youtubeSlice.primary.video_description,
									thumbnailUrl: `https://i.ytimg.com/vi/${this.youtubeSlice.primary.video_id}/hqdefault.jpg`,
									uploadDate: this.youtubeSlice.primary.video_publishedAt,
									embedUrl: `https://www.youtube.com/embed/${this.youtubeSlice.primary.video_id}`,
									duration: this.youtubeSlice.primary.video_duration,
									publisher: {
										'@type': 'Organization',
										name: this.$constants.author,
										logo: {
											'@type': 'ImageObject',
											url: `${process.env.NUXT_SITENAME}${this.$constants.logo}`,
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
										userInteractionCount: this.youtubeSlice.primary.video_viewCount
									},
									keywords: this.youtubeSlice.primary.video_keywords,
									contentUrl: `https://www.youtube.com/watch?v=${this.youtubeSlice.primary.video_id}`,
									mainEntityOfPage: {
										'@type': 'WebPage',
										'@id': `${process.env.NUXT_SITENAME}${this.$nuxt.$route.path}`,
										headline: this.document.data.seo_title || this.$constants.seoTitle,
										description: this.document.data.seo_description || this.$constants.seoDescription
									}
								}
							}
						]
					: [])
			]
		}
	}
}
</script>
