<template>
	<div class="flex-auto">
		<Breadcrumbs
			v-if="document.data.show_breadcrumb && document.data.title"
			:section="section"
			:current-page="document.data.title"
		/>
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { components } from '~/slices'

export default Vue.extend({
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

		if (document && section) {
			return { document, section }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: function () {
		return { components }
	},
	head() {
		return {
			title: this.document.data.title,
			meta: [
				{
					name: 'description',
					content:
						'Volcanic Minds è una digital experience company. La nostra passione? Realizzare il miglior prodotto per i nostri partner.'
				}
				// {
				// 	hid: 'description',
				// 	name: 'description',
				// 	content: this.document.data.seodescription || this.$constants.seoDescription
				// }
				// {
				// 	hid: 'og-site_name',
				// 	property: 'og:site_name',
				// 	content: this.document.data.ogsitename || this.$constants.ogSiteName
				// },
				// { hid: 'og-type', property: 'og:type', content: 'website' },
				// {
				// 	hid: 'og-title',
				// 	property: 'og:title',
				// 	content: this.document.data.ogtitle || this.$constants.ogTitle
				// },
				// {
				// 	hid: 'og-desc',
				// 	property: 'og:description',
				// 	content: this.document.data.ogdescription || this.$constants.ogDescription
				// },
				// {
				// 	hid: 'og-image',
				// 	property: 'og:image',
				// 	content:
				// 		this.document.data.ogimage.url ||
				// 		`${process.env.NUXT_ENV_BUILD === 'production' ? this.$constants.prodUrl : this.$constants.devUrl}${
				// 			this.$constants.ogImageUrl
				// 		}`
				// },
				// {
				// 	hid: 'og-url',
				// 	property: 'og:url',
				// 	content: `${process.env.NUXT_ENV_BUILD === 'production' ? this.$constants.prodUrl : this.$constants.devUrl}${
				// 		this.$nuxt.$route.path
				// 	}`
				// },
				// { hid: 't-type', name: 'twitter:card', content: 'summary_large_image' }
			],
			htmlAttrs: {
				lang: this.$i18n.locale
			}
		}
	}
})
</script>
