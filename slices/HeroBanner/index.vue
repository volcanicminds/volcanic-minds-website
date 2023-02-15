<template>
	<div>
		<PrismicLink v-if="slice.primary.prova_link" :field="slice.primary.prova_link">LINK</PrismicLink>
	</div>
</template>

<script lang="ts">
export default {
	name: 'HeroBanner'
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
