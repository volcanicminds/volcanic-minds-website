<template>
	<div>
		<Breadcrumbs :section="section" :current-page="document.data.title" />
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error }) {
		const document = await $prismic.api.getByUID('second_level_page', params.uid)
		const section = await $prismic.api.getByUID('first_level_page', document.data.section.uid)
		if (document && section) {
			return { document, section }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: function () {
		return { components }
	}
}
</script>
