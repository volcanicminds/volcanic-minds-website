<template>
	<div class="flex-auto">
		<slice-zone :components="components" :slices="document.data.slices" />
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error }) {
		const document = await $prismic.api.getByUID('homepage', 'homepage')
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

<style lang="stylus" scoped>
.bkg-image
	object-fit cover
	z-index -1

h1
	line-height 54px
	font-size 75px
	@media screen and (min-width: 40em)
		line-height 71px
		font-size 100px
	.font-thin
		font-size 54px
		@media screen and (min-width: 40em)
			font-size 71px
.description
	font-size 25px
	font-weight 300

.carousel-image
	object-fit contain
	height 100px
	width 200px
</style>
