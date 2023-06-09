<template>
	<div :style="`height: ${height}px`" class="bg-rainbow-gradient" />
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		height?: number
	}>(),
	{
		height: 5
	}
)
</script>
