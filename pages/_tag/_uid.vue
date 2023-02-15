<template>
	<p>PROVA2</p>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error }) {
		const document = await $prismic.api.getByUID('second_level_page', params.uid)
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
