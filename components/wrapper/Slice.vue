<template>
	<section :class="`${cssClass}${marginTop ? ' mt4' : ''}${marginBottom ? ' mb4' : ''}`">
		<slot />
	</section>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		marginTop: boolean
		marginBottom: boolean
		cssClass?: string
	}>(),
	{
		marginTop: false,
		marginBottom: false,
		cssClass: ''
	}
)
</script>
