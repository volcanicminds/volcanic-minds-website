<template>
	<span />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	beforeCreate() {
		this.$router.push('/404')
	}
})
</script>
