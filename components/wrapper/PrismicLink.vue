<template>
	<NuxtLink v-if="link.link_type === 'Document' && !link.isBroken" :to="prismicH.asLink(link)">
		<slot />
	</NuxtLink>
	<a v-else-if="!link.isBroken" :href="link.url" :target="link.target || undefined">
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
