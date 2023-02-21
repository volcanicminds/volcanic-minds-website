<template>
	<div class="flex-auto">
		<Breadcrumbs v-if="document.data.show_breadcrumb && document.data.title" :current-page="document.data.title" />
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error }) {
		const document = await $prismic.api.getByUID('first_level_page', params.uid)
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
