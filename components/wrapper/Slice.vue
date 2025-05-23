<template>
	<Observer @isVisible.once="isSliceVisible = true">
		<component
			:is="isSection ? 'section' : 'div'"
			:class="[
				cssClass,
				marginTop && 'mt4',
				marginBottom && 'mb4',
				paddingTop && 'pt4',
				paddingBottom && 'pb4',
				enableBg && 'bg-shark',
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
		paddingTop?: boolean
		paddingBottom?: boolean
		enableBg?: boolean
		cssClass?: string
		enableObserver?: boolean
		isSection?: boolean
	}>(),
	{
		cssClass: '',
		isSection: false,
		paddingTop: false,
		paddingBottom: false,
		enableBg: false
	}
)

const isSliceVisible = ref(false)
</script>
