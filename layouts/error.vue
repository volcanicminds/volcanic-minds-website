<template>
	<p>Pagina non trovata</p>
</template>

<script>
export default {
	mounted() {
		this.$router.push('/404')
	}
}
</script>
