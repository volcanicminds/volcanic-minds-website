<template>
	<WrapperContainer class="py2">
		<NuxtLink :to="localePath('/')">Home</NuxtLink> /
		<template v-if="section && section.data.title"
			><NuxtLink :to="section.url">{{ section.data.title }}</NuxtLink> /</template
		>
		<span>{{ currentPage }}</span>
	</WrapperContainer>
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
