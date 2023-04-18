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
				:aria-label="
					slice.primary.accessible_label &&
					slice.primary.link &&
					slice.primary.link.target &&
					slice.primary.link.target === '_blank'
						? slice.primary.accessible_label
						: undefined
				"
				>{{ slice.primary.label }}</PrismicLink
			>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'CallToAction'
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

<style lang="stylus" scoped></style>
