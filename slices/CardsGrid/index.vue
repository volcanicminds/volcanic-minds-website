<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<div class="center">
				<div v-if="slice.primary.title" class="h2 font-thin">{{ slice.primary.title }}</div>
				<div v-if="slice.primary.subtitle" class="h1">{{ slice.primary.subtitle }}</div>
			</div>

			<div class="cards-container mt2">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="card p3">
					<font-awesome-icon v-if="item.card_icon" :icon="item.card_icon" class="fa-2xl" />
					<p v-if="item.card_title" class="h2 mb0">{{ item.card_title }}</p>
					<p v-if="item.card_description" class="mb0">{{ item.card_description }}</p>
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
		border-radius 10px
</style>
