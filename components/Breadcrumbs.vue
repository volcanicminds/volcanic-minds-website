<template>
	<WrapperContainer
		class="breadcrumbs-container relative z1 flex items-center"
		role="navigation"
		aria-label="Breadcrumb"
	>
		<NuxtLink :to="localePath('/')" class="no-underline nowrap">Home</NuxtLink>
		<font-awesome-icon :icon="['fas', 'chevron-right']" class="mx1" size="xs" />
		<template v-if="section && section.data.title">
			<NuxtLink :to="section.url" class="no-underline nowrap">{{ section.data.title }}</NuxtLink>
			<font-awesome-icon :icon="['fas', 'chevron-right']" class="mx1" size="xs" />
		</template>
		<span class="truncate">{{ currentPage }}</span>
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
	> a
		white-space nowrap
		text-overflow ellipsis
</style>
