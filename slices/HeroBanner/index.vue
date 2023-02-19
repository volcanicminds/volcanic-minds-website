<template>
	<div>
		<!-- <PrismicLink v-if="slice.primary.prova_link" :field="slice.primary.prova_link">LINK</PrismicLink> -->
		<NuxtLink :to="cacca">cane</NuxtLink>
	</div>
</template>

<script lang="ts">
import * as prismicH from '@prismicio/helpers'
export default {
	name: 'HeroBanner'
}
</script>

<script setup lang="ts">
const props = defineProps({
	slice: {
		type: Object,
		required: true
	}
})
const cacca = prismicH.asLink(props.slice.primary.prova_link)
</script>
