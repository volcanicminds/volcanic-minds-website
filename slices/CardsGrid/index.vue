<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<div class="center">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>

			<div class="cards-container mt3">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="card p3">
					<font-awesome-icon v-if="item.card_icon" :icon="item.card_icon" class="fa-2xl" />
					<div v-if="item.card_title" class="h2 mt3 mb2">{{ item.card_title }}</div>
					<PrismicRichText v-if="item.card_desc" :field="item.card_desc" />
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'CardsGrid'
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
.cards-container
	display grid
	grid-template-columns repeat(auto-fit, minmax(230px, 1fr))
	grid-gap 15px
	.card
		background-color var(--raisin-black-2)
		border-radius 40px 10px
		*
			word-wrap break-word
</style>
