<template>
	<div class="flex-auto">
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'
import { components } from '~/slices'

@Component({
	// @ts-ignore
	async asyncData({ $prismic, error, i18n, store }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('homepage', 'homepage', { lang })

		let altLangs = {}
		if (document && document.alternate_languages.length) {
			const alternateIds = document.alternate_languages.map((lang) => lang.id)
			altLangs = await $prismic.api.query($prismic.predicate.in('document.id', alternateIds), { lang: '*' })
		}
		await store.dispatch('prismic/load', { lang, altLangs })

		// Get all ArticlesGrid slices
		const slices = document.data.slices
		const articlesGridSlices = slices.filter((slice: { slice_type: string }) => slice.slice_type === 'articles_grid')

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

		if (document) {
			return { document }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	}
})
export default class PageComponent extends Vue {
	document!: any
	$constants!: any

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
					content:
						this.document.data.og_title ||
						this.$constants.ogTitle ||
						this.document.data.seo_title ||
						this.$constants.seoTitle
				},
				{
					hid: 'og-desc',
					property: 'og:description',
					content:
						this.document.data.og_description ||
						this.$constants.ogDescription ||
						this.document.data.seo_description ||
						this.$constants.seoDescription
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
						...this.$constants.schemaOrganization,
						'@id': `${process.env.NUXT_SITENAME}${this.$i18n.locale === 'it' ? '' : '/en'}#organization`,
						url: `${process.env.NUXT_SITENAME}${this.$i18n.locale === 'it' ? '' : '/en'}`,
						areaServed: this.$i18n.locale === 'it' ? this.$constants.areaServedIT : this.$constants.areaServedEN,
						description:
							this.document.data.seo_description ||
							this.$constants.seoDescription ||
							this.$constants.schemaOrganization.description,
						knowsAbout: this.$constants.defaultKnowsAbout,
						makesOffer:
							this.$i18n.locale === 'it' ? this.$constants.defaultMakesOfferIT : this.$constants.defaultMakesOfferEN
					}
				}
			]
		}
	}
}
</script>
