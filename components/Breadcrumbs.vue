<template>
	<WrapperContainer class="breadcrumbs-container relative z1 flex items-center">
		<NuxtLink :to="localePath('/')" class="no-underline">Home</NuxtLink>
		<font-awesome-icon :icon="['fas', 'chevron-right']" class="mx1" size="xs" />
		<template v-if="section && section.data.title">
			<NuxtLink :to="section.url" class="no-underline">{{ section.data.title }}</NuxtLink>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mx1" size="xs" />
		</template>
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
		section: undefined
	}
)
</script>

<style lang="stylus" scoped>
.breadcrumbs-container
	height 65px
	margin-bottom -65px
</style>
