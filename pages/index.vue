<template>
	<div class="flex-auto">
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, error, i18n, store }) {
		const lang = i18n.locale
		const document = await $prismic.api.getByUID('homepage', 'homepage', { lang })

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

<script setup>
useHead({
	title: 'Volcanic Minds • Home',
	meta: [
		{
			name: 'description',
			content:
				'Volcanic Minds è una digital experience company. La nostra passione? Realizzare il miglior prodotto per i nostri partner.'
		}
	]
})
</script>
