<template>
	<Observer @isVisible.once="isSliceVisible = true">
		<div
			class="mb2 md-mb4 timeline-container md-flex items-center opacity-animate relative"
			:class="isSliceVisible ? '' : 'opacity-animate-off'"
		>
			<div v-if="enableLine" class="absolute timeline-line bg-rainbow-gradient left-0 right-0 mx-auto" />
			<div class="timeline-number z1 relative bg-rainbow-gradient flex justify-center items-center m-auto flex-none">
				<span class="font-black h1">{{ section.number }}</span>
			</div>
			<div class="timeline-card relative flex-auto left-align p3 pt4 md-px4 md-py3">
				<h3 class="h2 m0">{{ section.title }}</h3>
				<PrismicRichText
					v-if="section.content.length && section.content[0].text !== ''"
					:field="section.content"
					wrapper="div"
				/>
			</div>
		</div>
	</Observer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
	section: {
		type: Object,
		required: true
	},
	enableLine: {
		type: Boolean,
		required: true
	}
})

const isSliceVisible = ref(false)
</script>

<style lang="stylus" scoped>
$spacing = 30px
.timeline
	&-line
		width 5px
		top 'calc(calc(1rem + %s) * -1)' % $spacing
		height 'calc(1rem + %s)' % $spacing
		@media (min-width: 52em)
			top -4rem
			height 4rem
	&-container
		&:nth-child(even)
			flex-direction row-reverse
			.timeline-card
				@media (min-width: 52em)
					right -40px
					padding-right 4rem
		&:nth-child(odd)
			.timeline-card
				@media (min-width: 52em)
					left -40px
					padding-left 4rem
		&:last-child
			margin-bottom 0

	&-number
		border-radius 50%
		box-shadow var(--neu-shadow-1)
		width 60px
		height 60px
		@media (min-width: 52em)
			width 80px
			height 80px
	&-card
		background linear-gradient(145deg, #23232a, #2a2a32)
		box-shadow var(--neu-shadow-1)
		border-radius 40px 10px
		@media (max-width: 51.99em)
			top 'calc(%s * -1)' % $spacing
</style>
