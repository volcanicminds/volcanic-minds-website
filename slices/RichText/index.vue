<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer
			:class="
				slice.primary.text_size === 'Grande' ? 'text-big' : slice.primary.text_size === 'Piccola' ? 'text-small' : ''
			"
		>
			<PrismicRichText
				:field="slice.primary.text"
				class="rich-text"
				role="heading"
				aria-level="2"
				:class="
					slice.primary.text_align === 'Center' ? 'center' : slice.primary.text_align === 'Right' ? 'right-align' : ''
				"
			/>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'RichText'
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
.rich-text
	>>> p.block-img
		img
			max-width 100%
			display flex
			justify-self center
	>>> [data-oembed-type='link']
		img
			max-width 100%

.text-big
	.rich-text
		font-size 1.1em
		font-weight 300
		@media (min-width: 40em)
			font-size 1.3em

.text-small
	.rich-text
		font-size 0.8em
</style>
