<template>
	<Observer @isVisible="isSliceVisible = true">
		<section
			:class="[
				cssClass,
				marginTop && 'mt4',
				marginBottom && 'mb4',
				enableObserver && 'opacity-animate',
				enableObserver && !isSliceVisible && 'opacity-animate-off'
			]"
		>
			<slot />
		</section>
	</Observer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
	defineProps<{
		marginTop: boolean
		marginBottom: boolean
		cssClass?: string
		enableObserver: boolean
	}>(),
	{
		cssClass: ''
	}
)

const isSliceVisible = ref(false)
</script>
