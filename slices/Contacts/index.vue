<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-bg="slice.primary.enable_bg || false"
		css-class="py4 relative overflow-hidden"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.title ? true : false"
	>
		<WrapperPrismicImage
			:field="slice.primary.background_1"
			:size="500"
			class="absolute bottom-0 left-0 bg-image contain position-bottom-left"
		/>
		<WrapperPrismicImage
			:field="slice.primary.background_2"
			:size="500"
			class="absolute top-0 right-0 bg-image contain position-top-right"
		/>
		<WrapperContainer class="center relative">
			<div v-if="slice.items.length" class="flex flex-wrap justify-center faces-container mb3">
				<div v-for="(face, i) in slice.items" :key="i" class="faces-image overflow-hidden">
					<WrapperPrismicImage :field="face.face" :size="500" class="h100 col-12 cover" />
				</div>
			</div>
			<h2 v-if="slice.primary.title" class="h1 mt0 mb2">{{ slice.primary.title }}</h2>
			<PrismicRichText v-if="isRichTextFilled(slice.primary.text)" :field="slice.primary.text" class="mb2" />
			<div
				v-if="slice.primary.button_label && slice.primary.button_link"
				:class="slice.items.length || slice.primary.title || slice.primary.text ? 'mt2' : ''"
			>
				<PrismicLink :field="slice.primary.button_link" class="btn btn-primary btn-big uppercase">{{
					slice.primary.button_label
				}}</PrismicLink>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isRichTextFilled } from '~/utils/prismic'
export default defineComponent({
	name: 'Contacts'
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
.bg-image
	width 80%
	height 80%
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
