<template>
	<div>
		<NuxtLink to="/">Home</NuxtLink> /
		<template v-if="section && section.data.title"
			><NuxtLink :to="section.url">{{ section.data.title }}</NuxtLink> /</template
		>
		<span>{{ currentPage }}</span>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		section?: {
			url: string
			data: {
				title: string
			}
		}
		currentPage: string
	}>(),
	{
		section: null
	}
)
</script>
