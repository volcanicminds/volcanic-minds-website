<template>
	<div class="flex-auto">
		<Breadcrumbs v-if="document.data.show_breadcrumb && document.data.title" :current-page="document.data.title" />
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error, i18n, store }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('first_level_page', params.uid, { lang })

		let altLangs = {}
		if (document && document.alternate_languages.length) {
			const alternateIds = document.alternate_languages.map((lang) => lang.id)
			altLangs = await $prismic.api.query($prismic.predicate.in('document.id', alternateIds), { lang: '*' })
		}
		await store.dispatch('prismic/load', { lang, altLangs })

		if (document) {
			return { document }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: function () {
		return { components }
	}
}
</script>
