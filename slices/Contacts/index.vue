<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		css-class="bg-raisin-black-2 py4 relative overflow-hidden"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperPrismicImage :field="slice.primary.background_1" :size="1000" class="absolute bottom-0 left-0 bg-image" />
		<WrapperPrismicImage :field="slice.primary.background_2" :size="1000" class="absolute top-0 right-0 bg-image" />
		<WrapperContainer class="relative center">
			<div class="flex flex-wrap justify-center faces-container">
				<div v-for="(face, i) in slice.items" :key="i" class="faces-image overflow-hidden mb2">
					<WrapperPrismicImage :field="face.face" :size="1000" class="h100 col-12 cover" />
				</div>
			</div>
			<p v-if="slice.primary.title" class="h1 mt0">{{ slice.primary.title }}</p>
			<PrismicRichText v-if="slice.primary.text" :field="slice.primary.text" />
			<PrismicLink
				v-if="slice.primary.button_label"
				:field="slice.primary.button_link"
				class="btn btn-primary btn-big uppercase mb4"
				>{{ slice.primary.button_label }}</PrismicLink
			>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'Contacts'
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
.bg-image
	max-width 40%
	max-height 100%
	filter blur(15px)

.faces
	&-container
		gap 10px
	&-image
		width 70px
		height 70px
		border-radius 50%
		border 2px solid var(--cultured)
</style>
