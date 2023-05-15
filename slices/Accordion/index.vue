<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<WrapperContainer>
			<div class="center mb4">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>
			<div v-for="(item, i) in slice.items" :key="`accordion-${i}`" class="my2">
				<div
					class="cursor-pointer flex items-center justify-between"
					role="button"
					@click="openAccordion(`accordion-${i}`)"
				>
					<h3 class="my0 h2 mr2">{{ item.title }}</h3>
					<div class="accordion-toggle items-center justify-center flex flex-none">
						<font-awesome-icon :icon="['fas', isOpened === `accordion-${i}` ? 'minus' : 'plus']" />
					</div>
				</div>
				<PrismicRichText v-show="isOpened === `accordion-${i}`" :field="item.description" />
				<div v-if="i < slice.items.length - 1" class="my3 separator" />
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
	name: 'Accordion'
}
</script>

<script setup lang="ts">
const isOpened = ref('')

defineProps({
	slice: {
		type: Object,
		required: true
	}
})

function openAccordion(accordion: string): void {
	if (accordion === isOpened.value) {
		isOpened.value = ''
	} else {
		isOpened.value = accordion
	}
}
</script>

<style lang="stylus" scoped>
.accordion-toggle
	border 1px solid var(--cultured)
	border-radius 100%
	width 25px
	height 25px

.separator
	background var(--cultured-opaque)
	height 1px
</style>
