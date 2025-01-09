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
		display flex
		justify-content center
		img
			max-width 100%

	.text-big &
		font-size 1.1em
		font-weight 300
		@media (min-width: 40em)
			font-size 1.3em

	.text-small &
		font-size 0.8em
</style>
