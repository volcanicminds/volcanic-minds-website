<template>
	<NuxtLink v-if="link.link_type === 'Document'" :to="prismicH.asLink(link)">
		<slot />
	</NuxtLink>
	<a v-else :href="link.url" :target="link.target || undefined">
		<slot />
	</a>
</template>

<script setup lang="ts">
import * as prismicH from '@prismicio/helpers'
withDefaults(
	defineProps<{
		link: any
	}>(),
	{}
)
</script>
