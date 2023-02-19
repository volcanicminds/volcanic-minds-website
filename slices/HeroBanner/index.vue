<template>
	<div>
		<NuxtLink v-if="slice.primary.prova_link" :to="prismicH.asLink(slice.primary.prova_link)"> CIAO </NuxtLink>
		<p v-if="slice.primary.testo">{{ slice.primary.testo }}</p>
		<PrismicImage v-if="slice.primary.immagine" :field="slice.primary.immagine"></PrismicImage>
		<p v-if="slice.primary.richtext" v-html="prismicH.asHTML(slice.primary.richtext)" />
	</div>
</template>

<script lang="ts">
// https://prismic.io/docs/technical-reference/prismicio-vue?version=v2
// https://prismic.io/docs/technical-reference/prismicio-helpers
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
