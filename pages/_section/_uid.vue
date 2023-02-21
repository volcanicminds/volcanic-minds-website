<template>
	<div class="flex-auto">
		<Breadcrumbs
			v-if="document.data.show_breadcrumb && document.data.title"
			:section="section"
			:current-page="document.data.title"
		/>
		<LangSwitcher v-if="altLangs" :alt-langs="altLangs" />
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error, i18n }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('second_level_page', params.uid, { lang })
		const section = await $prismic.api.getByUID('first_level_page', document.data.section.uid)

		let altLangs = null
		if (document.alternate_languages.length) {
			const alternateIds = document.alternate_languages.map((lang) => lang.id)
			altLangs = await $prismic.api.query($prismic.predicate.in('document.id', alternateIds), { lang: '*' })
		}

		if (document && section) {
			return { document, section, altLangs }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: function () {
		return { components }
	}
}
</script>
