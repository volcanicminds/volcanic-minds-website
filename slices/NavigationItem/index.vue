<template>
	<section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
		Placeholder component for navigation_menu (variation: {{ slice.variation }}) Slices
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'NavigationItem'
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
