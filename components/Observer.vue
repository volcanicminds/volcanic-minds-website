<template>
	<Intersect :threshold="[0.25]" @enter="$emit('isVisible')">
		<slot />
	</Intersect>
</template>

<script setup lang="ts">
import Intersect from 'vue-intersect'
</script>
