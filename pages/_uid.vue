<template>
	<div class="flex-auto">
		<Breadcrumbs v-if="document.data.show_breadcrumb && document.data.title" :current-page="document.data.title" />
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'
import { components } from '~/slices'

@Component({
	// @ts-ignore
	async asyncData({ $prismic, params, error, i18n, store }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('first_level_page', params.uid, { lang })

		let altLangs = {}
		if (document && document.alternate_languages.length) {
			const alternateIds = document.alternate_languages.map((lang: { id: any }) => lang.id)
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
						publisher: {
							'@type': 'Organization',
							name: 'Volcanic Minds',
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
				}
			]
		}
	}
}
</script>
