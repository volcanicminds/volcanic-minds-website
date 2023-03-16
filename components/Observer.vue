<template>
	<intersect @enter.once="$emit('isVisible')">
		<slot />
	</intersect>
</template>

<script setup lang="ts">
import Intersect from 'vue-intersect'
</script>
