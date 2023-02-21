<template>
	<p>Loading Prismic preview...</p>
</template>

<script lang="ts">
export default {
	mounted() {
		this.$prismic.preview()
	}
}
</script>
