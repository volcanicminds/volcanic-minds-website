<template>
	<div>
		<WrapperPrismicLink v-if="slice.primary.prova_link && slice.primary.testo" :link="slice.primary.prova_link">{{
			slice.primary.testo
		}}</WrapperPrismicLink>
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
