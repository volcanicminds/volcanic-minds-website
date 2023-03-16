<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer class="center">
			<PrismicLink
				:field="slice.primary.link"
				class="btn btn-primary uppercase"
				:class="slice.primary.size === 'regular' ? '' : 'btn-big'"
				>{{ slice.primary.label }}</PrismicLink
			>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'CallToAction'
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

<style lang="stylus" scoped></style>
