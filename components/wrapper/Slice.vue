<template>
	<Observer @isVisible.once="isSliceVisible = true">
		<component
			:is="isSection ? 'section' : 'div'"
			:class="[
				cssClass,
				marginTop && 'mt4',
				marginBottom && 'mb4',
				enableObserver && 'opacity-animate',
				enableObserver && !isSliceVisible && 'opacity-animate-off'
			]"
		>
			<slot />
		</component>
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
		isSection?: boolean
	}>(),
	{
		cssClass: '',
		isSection: false
	}
)

const isSliceVisible = ref(false)
</script>
