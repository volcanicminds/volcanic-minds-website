<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		css-class="bg-raisin-black-2 py4"
	>
		<WrapperContainer>
			<div class="center">
				<div v-if="slice.primary.title" class="h2 font-thin">{{ slice.primary.title }}</div>
				<PrismicRichText v-if="slice.primary.subtitle[0].text !== ''" :field="slice.primary.subtitle" class="h1" />
			</div>
			<div class="stats-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="center stats-item">
					<div v-if="item.data" class="h1 red-pigment">{{ item.data }}</div>
					<div v-if="item.description" class="h3">{{ item.description }}</div>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'Statistics'
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
.stats
	&-container
		display grid
		grid-template-columns repeat(auto-fit, minmax(140px, 1fr))
		@media (min-width: 40em)
			grid-template-columns repeat(auto-fit, minmax(190px, 1fr))
		grid-gap 25px
	&-item
		.h1
			font-size 1.3em
			@media (min-width: 40em)
				font-size 2.1em
			background var(--rainbow-gradient)
			-webkit-background-clip text
			-webkit-text-fill-color transparent
</style>
