<template>
	<p>ciao</p>
</template>

<script lang="ts">
export default {
	name: 'Accordion'
}
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})
</script>
