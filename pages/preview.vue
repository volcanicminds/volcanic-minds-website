<template>
	<p>Loading Prismic preview...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	mounted(): void {
		// @ts-ignore
		this.$prismic.preview()
	}
})
</script>
