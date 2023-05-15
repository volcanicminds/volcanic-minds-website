<template>
	<p>Loading Prismic preview...</p>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mounted(): void {
		// @ts-ignore
		this.$prismic.preview()
	}
})
</script>
