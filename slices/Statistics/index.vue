<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer>
			<div class="stats-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="center stats-item">
					<p v-if="item.data" class="h1 red-pigment m0">{{ item.data }}</p>
					<p v-if="item.description" class="h3 m0">{{ item.description }}</p>
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
		grid-template-columns repeat(auto-fit, minmax(170px, 1fr))
		grid-gap 25px
	&-item
		.h1
			font-size 40px
			background var(--rainbow-gradient)
			-webkit-background-clip text
			-webkit-text-fill-color transparent
</style>
