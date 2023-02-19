<template>
	<div>
		<WrapperPrismicLink :link="slice.primary.prova_link">{{ slice.primary.prova_link }}</WrapperPrismicLink>
		<p v-if="slice.primary.testo">{{ slice.primary.testo }}</p>
		<PrismicImage v-if="slice.primary.immagine" :field="slice.primary.immagine"></PrismicImage>
		<p v-if="slice.primary.richtext" v-html="prismicH.asHTML(slice.primary.richtext)" />
	</div>
</template>

<script lang="ts">
import * as prismicH from '@prismicio/helpers'
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
