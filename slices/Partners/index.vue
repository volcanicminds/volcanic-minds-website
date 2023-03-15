<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer class="grid-container">
			<div class="title">
				<p class="h1 mt0 mb2">{{ slice.primary.title }}</p>
				<RainbowBar />
			</div>
			<div class="partners-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="flex items-center">
					<WrapperPrismicImage :field="item.logo" :size="40" resize-by-height class="mr2" />
					<span v-if="item.name" class="h3 font-regular">{{ item.name }}</span>
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
	display grid
	grid-gap 50px
	grid-template-columns 25% auto
.title
	max-width 300px

.partners-container
	display grid
	grid-template-columns repeat(auto-fit, minmax(170px, 1fr))
	grid-gap 25px
</style>
