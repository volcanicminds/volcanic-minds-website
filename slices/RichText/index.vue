<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer :class="slice.primary.big_text ? 'big-text' : ''">
			<PrismicRichText
				:field="slice.primary.text"
				class="rich-text"
				:class="
					slice.primary.text_align === 'Center' ? 'center' : slice.primary.text_align === 'Right' ? 'right-align' : ''
				"
			/>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'RichText'
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
.big-text
	.rich-text
		font-size 20px
		font-weight 300
		@media (min-width: 40em)
			font-size 25px
</style>
