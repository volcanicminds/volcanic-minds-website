<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:padding-top="slice.primary.padding_top || false"
		:padding-bottom="slice.primary.padding_bottom || false"
		:enable-bg="slice.primary.enable_bg || false"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.title ? true : false"
	>
		<WrapperContainer>
			<div v-if="slice.primary.section_title" class="h2 font-thin mb1 center">{{ slice.primary.section_title }}</div>
			<h2 v-if="slice.primary.section_subtitle" class="h1 mt0 mb4 center">{{ slice.primary.section_subtitle }}</h2>
			<div class="grid-container">
				<div class="title mb3 sm-mb0">
					<h2 v-if="slice.primary.title" class="h1 mt0 mb2">{{ slice.primary.title }}</h2>
					<RainbowBar />
				</div>
				<div class="partners-container">
					<component
						:is="item.link && item.link.url ? 'PrismicLink' : 'div'"
						v-for="(item, i) in slice.items"
						:key="`slice-item-${i}`"
						:field="item.link && item.link"
						class="flex items-center no-underline"
					>
						<WrapperPrismicImage
							:field="item.logo"
							:size="25"
							resize-by-height
							class="contain partners-image flex-none"
						/>
						<h3 v-if="item.name" class="h2 m0 font-light ml1 nowrap truncate">{{ item.name }}</h3>
					</component>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Partners'
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
.grid-container
	@media (min-width: 40em)
		display grid
		grid-gap 50px
		grid-template-columns 25% auto
	.title
		max-width 300px

	.partners
		&-container
			display grid
			grid-template-columns repeat(auto-fit, minmax(250px, 1fr))
			grid-gap 40px 10px

		&-image
			width 25px
			height 25px
</style>
