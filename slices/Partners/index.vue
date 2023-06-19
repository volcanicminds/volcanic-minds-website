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
					<h3 v-if="slice.primary.title" class="h1 mt0 mb2">{{ slice.primary.title }}</h3>
					<RainbowBar />
				</div>
				<div class="partners-container">
					<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="flex items-center">
						<WrapperPrismicImage
							:field="item.logo"
							:size="25"
							resize-by-height
							class="contain partners-image flex-none"
						/>
						<h4 v-if="item.name" class="h4 m0 font-bold ml1 nowrap truncate">{{ item.name }}</h4>
					</div>
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

	.partners
		&-container
			display grid
			grid-template-columns repeat(auto-fit, minmax(150px, 1fr))
			grid-gap 25px

		&-image
			width 25px
			height 25px
</style>
