<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:css-class="slice.primary.enable_bg ? 'py4' : ''"
	>
		<WrapperContainer>
			<div class="center">
				<div v-if="slice.primary.subtitle" class="h2 font-thin">{{ slice.primary.subtitle }}</div>
				<component :is="slice.primary.seo_enable ? 'h2' : 'div'" v-if="slice.primary.title" class="h1 mt0">{{
					slice.primary.title
				}}</component>
			</div>
			<div class="stats-container">
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="center stats-item">
					<component :is="slice.primary.seo_enable ? 'h3' : 'span'" class="font-size-inherit m0">
						<div v-if="item.data" class="h1 red-pigment">{{ item.data }}</div>
						<div v-if="item.description" class="h3">{{ item.description }}</div>
					</component>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Statistics'
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
.stats
	&-container
		display grid
		grid-template-columns repeat(auto-fit, minmax(140px, 1fr))
		@media (min-width: 40em)
			grid-template-columns repeat(auto-fit, minmax(190px, 1fr))
		grid-gap 25px
	&-item
		.h1
			font-size 1.8em
			@media (min-width: 40em)
				font-size 2em
			background var(--rainbow-gradient)
			-webkit-background-clip text
			-webkit-text-fill-color transparent
</style>
