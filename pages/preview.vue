<template>
	<p>Loading Prismic preview...</p>
</template>

<script>
export default {
	mounted() {
		this.$prismic.preview()
	}
}
</script>
