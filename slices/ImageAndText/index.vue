<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer class="flex" :class="slice.primary.reverse ? 'row-reverse' : ''">
			<div class="col-12 md-col-6 flex items-center justify-center">
				<WrapperPrismicImage :field="slice.primary.image" :size="1000" class="col-12 h100 cover" />
			</div>
			<div class="col-12 md-col-6 flex flex-column justify-center" :class="slice.primary.reverse ? 'pr2' : 'pl2'">
				<div class="h1">{{ slice.primary.title }}</div>
				<div class="h3">{{ slice.primary.subtitle }}</div>
				<PrismicRichText :field="slice.primary.description" wrapper="div" />
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
