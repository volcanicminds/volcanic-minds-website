<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.title ? true : false"
	>
		<WrapperContainer>
			<div class="center mb3">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>
			<div class="center relative timeline">
				<TimelineSection v-for="(item, i) in slice.items" :key="`timeline-${i}`" :section="item" :enable-line="i > 0" />
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'Timeline'
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
