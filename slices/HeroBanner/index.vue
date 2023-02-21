<template>
	<div class="relative pb4 md-py4 overflow-hidden hero">
		<WrapperContainer class="relative z1">
			<h1 class="mt2 md-mt4 mb0 hero-title" v-html="prismicH.asHTML(slice.primary.title)" />
			<div class="hero-subtitle" v-html="prismicH.asHTML(slice.primary.subtitle)" />
			<div class="center mt2">
				<WrapperPrismicLink
					v-if="slice.primary.cta_link && slice.primary.cta_text"
					:link="slice.primary.cta_link"
					class="btn btn-primary btn-big mb4"
					>{{ slice.primary.cta_text }}</WrapperPrismicLink
				>
			</div>
		</WrapperContainer>
		<PrismicImage
			:field="slice.primary.background_image"
			class="cover absolute col-12 h100 left-0 top-0"
			:class="slice.primary.background_image_blur ? 'blur' : ''"
		/>
		<div class="fade-overlay absolute col-12 h100 left-0 top-0" />
	</div>
</template>

<script lang="ts">
import * as prismicH from '@prismicio/helpers'
export default {
	name: 'HeroBanner'
}
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})
</script>

<style lang="stylus" scoped>
.hero
	&-title
		font-weight 100
		font-size 80px
		line-height 80px
		>>> p
			margin 0
	&-subtitle
		font-size 25px
		>>> strong
			font-weight 700
			color var(--red-pigment)

	>>> img
		&.blur
			filter blur(10px) brightness(0.5)

	.fade-overlay
		box-shadow 0px -350px 200px -100px var(--raisin-black) inset
</style>
