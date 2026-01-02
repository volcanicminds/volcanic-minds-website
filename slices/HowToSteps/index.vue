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

			<div class="how-to-steps max-width-3 mx-auto">
				<div v-for="(item, i) in slice.items" :key="`step-${i}`" class="step-item relative pb2">
					<div class="flex items-start cursor-pointer" @click="toggleStep(`step-${i}`)">
						<!-- Step Number -->
						<div class="step-number flex-none flex items-center justify-center mr3 font-bold">
							{{ +i + 1 }}
						</div>

						<div class="flex-auto">
							<!-- Step Title -->
							<h3 class="my0 h3 step-title">{{ item.step_title }}</h3>

							<!-- Step Description (Collapsible) -->
							<div
								v-show="isRichTextFilled(item.step_description) && isStepOpen(`step-${i}`)"
								class="mt2 rich-text-content"
							>
								<PrismicRichText :field="item.step_description" />
							</div>
						</div>
						<!-- Toggle Icon -->
						<div v-if="isRichTextFilled(item.step_description)" class="toggle-icon ml3 flex-none opacity-50">
							<font-awesome-icon :icon="['fas', isStepOpen(`step-${i}`) ? 'chevron-up' : 'chevron-down']" />
						</div>
					</div>

					<!-- Vertical Connector Line (except for last item) -->
					<div v-if="+i < slice.items.length - 1" class="step-connector absolute"></div>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { isRichTextFilled } from '~/utils/prismic'

export default defineComponent({
	name: 'HowToSteps'
})
</script>

<script setup lang="ts">
const openSteps = ref<string[]>([])

defineProps({
	slice: {
		type: Object,
		required: true
	}
})

// Initialize: first step open by default? or all closed?
// Let's open the first one by default.
openSteps.value = ['step-0']

function isStepOpen(id: string): boolean {
	return openSteps.value.includes(id)
}

function toggleStep(id: string): void {
	if (openSteps.value.includes(id)) {
		openSteps.value = openSteps.value.filter((stepId) => stepId !== id)
	} else {
		openSteps.value.push(id) // Allow multiple open? or accordion style?
		// Let's allow multiple open for "How To" context so users can read ahead
	}
}
</script>

<style lang="stylus" scoped>
.step-number
	width 40px
	height 40px
	border-radius 50%
	background var(--primary)
	color var(--white)
	font-size 1.2rem
	z-index 10
	position relative

.step-item
	&:last-child
		padding-bottom 0

.step-connector
	width 2px
	background var(--cultured-opaque)
	top 40px
	bottom 0
	left 19px // Center of 40px circle
	z-index 0

.step-title
	line-height 1.2
	padding-top 6px

.toggle-icon
	line-height 40px
</style>
