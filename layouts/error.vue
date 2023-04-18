<template>
	<span />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	beforeCreate() {
		const currentLanguage = this.$store.state.prismic.currentLanguage
		if (currentLanguage === 'it-it') {
			this.$router.push('/404')
		} else {
			this.$router.push(`/${currentLanguage}/404`)
		}
	}
})
</script>
