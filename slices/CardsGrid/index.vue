<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer>
			<div class="h2 font-thin">{{ slice.primary.title }}</div>
			<div class="h1 red-pigment">{{ slice.primary.subtitle }}</div>

			<div class="flex-wrap cards-container mt2">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="card p3">
					<WrapperPrismicImage :field="item.card_image" :size="1000" class="col-12 h100 cover" />
					<p class="h2 mb0">{{ item.card_title }}</p>
					<p>{{ item.card_description }}</p>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'CardsGrid'
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
.cards-container
	display grid
	grid-template-columns repeat(auto-fit, minmax(230px, 1fr))
	grid-gap 15px
	.card
		background-color #292937
		border-radius 10px
		img
			width 20px
			height 20px
</style>
