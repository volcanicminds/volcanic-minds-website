<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer class="grid-container">
			<div class="title mb3 sm-mb0">
				<p class="h1 mt0 mb2">{{ slice.primary.title }}</p>
				<RainbowBar />
			</div>
			<div class="partners-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="flex items-center">
					<WrapperPrismicImage :field="item.logo" :size="30" />
					<span v-if="item.name" class="h4 font-regular partner-name">{{ item.name }}</span>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'Partners'
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
.grid-container
	@media (min-width: 40em)
		display grid
		grid-gap 50px
		grid-template-columns 25% auto
	.title
		max-width 300px

	.partners-container
		display grid
		grid-template-columns repeat(auto-fit, minmax(120px, 1fr))
		@media (min-width: 40em)
			grid-template-columns repeat(auto-fit, minmax(170px, 1fr))
		grid-gap 25px
		.partner-name
			background var(--raisin-black-2)
			padding 6px 12px
			border-radius 6px
			margin-left 10px
</style>
