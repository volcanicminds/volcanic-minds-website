<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:css-class="`py4${slice.primary.enable_bg ? ' bg-shark' : ''}`"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<WrapperContainer class="flex flex-wrap" :class="slice.primary.reverse ? 'row-reverse' : ''">
			<div class="col-12 md-col-5 flex items-center justify-center mb3 md-mb0">
				<div class="gradient-bg flex h100 col-12">
					<WrapperPrismicImage :field="slice.primary.image" :size="1000" class="col-12 h100 cover" />
				</div>
			</div>
			<div class="col-12 md-col-7 flex flex-column justify-center" :class="slice.primary.reverse ? 'md-pr4' : 'md-pl4'">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 mb1 mt0">{{ slice.primary.subtitle }}</h2>
				<PrismicRichText :field="slice.primary.description" wrapper="div" />
				<div
					v-if="slice.primary.cta_link && !slice.primary.cta_link.isBroken && slice.primary.cta_text"
					class="center mt2"
				>
					<PrismicLink
						:field="slice.primary.cta_link"
						class="btn btn-primary mb4"
						:aria-label="
							slice.primary.cta_accessible_text &&
							slice.primary.cta_link &&
							slice.primary.cta_link.target &&
							slice.primary.cta_link.target === '_blank'
								? slice.primary.cta_accessible_text
								: undefined
						"
						>{{ slice.primary.cta_text }}</PrismicLink
					>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'ImageAndText'
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
.gradient-bg
	box-shadow var(--neu-shadow-2)
	background var(--rainbow-gradient)
	border-radius 40px 10px
	padding 4px
	@media (max-width: 52em)
		max-height 250px
	img
		border-radius 37px 6px
</style>
