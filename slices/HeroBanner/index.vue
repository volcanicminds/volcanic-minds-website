<template>
	<div class="relative py4 overflow-hidden hero">
		<WrapperContainer class="relative z1">
			<PrismicRichText class="mt2 mb0 hero-title" :field="slice.primary.title" wrapper="h1" />
			<PrismicRichText class="hero-subtitle" :field="slice.primary.subtitle" wrapper="div" />
			<div
				v-if="slice.primary.cta_link && !slice.primary.cta_link.isBroken && slice.primary.cta_text"
				class="center mt2"
			>
				<PrismicLink :field="slice.primary.cta_link" class="btn btn-primary btn-big mb4 uppercase">{{
					slice.primary.cta_text
				}}</PrismicLink>
			</div>
		</WrapperContainer>
		<WrapperPrismicImage
			:field="slice.primary.background_image"
			:size="1000"
			class="cover absolute col-12 h100 left-0 top-0"
			:class="slice.primary.background_image_blur ? 'blur' : ''"
		/>
		<div class="fade-overlay absolute col-12 h100 left-0 top-0" />
	</div>
</template>

<script lang="ts">
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
		font-size 50px
		line-height 50px
		@media (min-width: 52em)
			font-size 80px
			line-height 80px
		>>> p
			margin 0
	&-subtitle
		font-size 20px
		@media (min-width: 52em)
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
