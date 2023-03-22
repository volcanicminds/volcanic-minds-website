<template>
	<p>Loading Prismic preview...</p>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mounted() {
		this.$prismic.preview()
	}
})
</script>
