<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer>
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
.rich-text
	font-size 25px
</style>
