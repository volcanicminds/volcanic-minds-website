<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer class="grid-container">
			<div class="title mb3 sm-mb0">
				<div class="h1 mb2">{{ slice.primary.title }}</div>
				<RainbowBar />
			</div>
			<div class="partners-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="flex items-center">
					<WrapperPrismicImage :field="item.logo" :size="25" />
					<span v-if="item.name" class="h4 font-bold ml1 nowrap">{{ item.name }}</span>
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
		grid-template-columns repeat(auto-fit, minmax(150px, 1fr))
		grid-gap 25px
</style>
