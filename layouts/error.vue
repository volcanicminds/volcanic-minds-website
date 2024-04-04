<template>
	<span />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
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
