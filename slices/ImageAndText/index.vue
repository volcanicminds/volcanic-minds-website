<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		css-class="bg-raisin-black-2 py4"
	>
		<WrapperContainer class="flex flex-wrap" :class="slice.primary.reverse ? 'row-reverse' : ''">
			<div class="col-12 md-col-5 flex items-center justify-center">
				<WrapperPrismicImage :field="slice.primary.image" :size="1000" class="col-12 h100 cover" />
			</div>
			<div
				class="col-12 md-col-7 flex flex-column justify-center py2 md-py0 px0"
				:class="slice.primary.reverse ? 'md-pr2' : 'md-pl2'"
			>
				<div class="h1">{{ slice.primary.title }}</div>
				<div class="h3 red-pigment">{{ slice.primary.subtitle }}</div>
				<PrismicRichText :field="slice.primary.description" wrapper="div" />
				<div
					v-if="slice.primary.cta_link && !slice.primary.cta_link.isBroken && slice.primary.cta_text"
					class="center mt2"
				>
					<PrismicLink :field="slice.primary.cta_link" class="btn btn-primary mb4">{{
						slice.primary.cta_text
					}}</PrismicLink>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'ImageAndText'
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
