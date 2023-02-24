<template>
	<SliceSimulator v-slot="{ slices }" :state="state">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>

<script setup lang="ts">
import { SliceSimulator } from '@prismicio/slice-simulator-vue'
import { ref } from 'vue'
import { components } from '~/slices'

const state = ref({})
</script>
