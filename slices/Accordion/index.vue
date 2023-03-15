<template>
	<WrapperSlice :margin-top="slice.primary.margin_top || false" :margin-bottom="slice.primary.margin_bottom || false">
		<WrapperContainer>
			<div v-for="(item, i) in slice.items" :key="`accordion-${i}`" class="my2">
				<div class="cursor-pointer flex items-center justify-between" @click="openAccordion(`accordion-${i}`)">
					<p class="h2 m0">{{ item.title }}</p>
					<div class="accordion-toggle items-center justify-center flex">
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

function openAccordion(accordion) {
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
