<template>
	<WrapperSlice
		css-class="relative py4 overflow-hidden hero"
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		is-section
		role="main"
	>
		<WrapperContainer class="relative z1">
			<PrismicRichText
				v-if="slice.primary.title.length && slice.primary.title[0].text !== ''"
				class="hero-title"
				:class="slice.primary.title_mb ? 'mb-title' : 'mb0'"
				:field="slice.primary.title"
				wrapper="h1"
			/>
			<PrismicRichText
				v-if="slice.primary.subtitle.length && slice.primary.subtitle[0].text !== ''"
				class="hero-subtitle"
				:field="slice.primary.subtitle"
				wrapper="h2"
			/>
			<div
				v-if="slice.primary.cta_link && !slice.primary.cta_link.isBroken && slice.primary.cta_text"
				class="center mt4"
			>
				<PrismicLink :field="slice.primary.cta_link" class="btn btn-primary btn-big mb4 uppercase">{{
					slice.primary.cta_text
				}}</PrismicLink>
			</div>
		</WrapperContainer>
		<WrapperPrismicImage
			:field="slice.primary.background_image"
			:size="500"
			class="cover absolute col-12 h100 left-0 top-0"
			:class="slice.primary.background_image_blur ? 'blur-4' : ''"
			:lazy="false"
		/>
		<div class="fade-overlay absolute col-12 h100 left-0 top-0" />
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'HeroBanner'
})
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
.mb-title
	margin-bottom 3rem
.hero
	&-title
		margin-top 0
		font-weight 200
		font-size 2.4em
		line-height 1.07
		word-wrap break-word
		@media (min-width: 52em)
			font-size 2.8em
		>>> strong
			font-weight 800
			@media (min-width: 52em)
				font-size 0.9em
		>>> p
			margin 0
	&-subtitle
		font-weight inherit
		font-size 1.15em
		line-height 1.2
		@media (min-width: 52em)
			font-size 1.35em
		>>> strong
			font-weight 600

	.fade-overlay
		box-shadow 0px -300px 200px -100px var(--raisin-black) inset
</style>
