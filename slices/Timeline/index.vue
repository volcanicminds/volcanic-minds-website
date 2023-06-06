<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.title ? true : false"
	>
		<WrapperContainer>
			<div class="center mb3">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>
			<div class="center relative timeline">
				<div class="absolute timeline-line bg-rainbow-gradient left-0 right-0 mx-auto mt1 top-0" />
				<div v-for="(item, i) in slice.items" :key="`timeline-${i}`" class="mb2 md-mb4 timeline-container items-center">
					<div
						class="timeline-number z1 relative bg-rainbow-gradient flex justify-center items-center m-auto flex-none"
					>
						<span class="font-black h1">{{ item.number }}</span>
					</div>
					<div class="timeline-card relative left-align p3 pt4 md-px4 md-py3">
						<p class="h2 m0">{{ item.title }}</p>
						<PrismicRichText
							v-if="item.content.length && item.content[0].text !== ''"
							:field="item.content"
							wrapper="div"
						/>
					</div>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
export default {
	name: 'Timeline'
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

<style lang="stylus">
.timeline
	&-line
		width 5px
		height calc(100% - 200px)
	&-container
		@media (min-width: 52em)
			display inline-flex
		&:nth-child(odd)
			flex-direction row-reverse
			.timeline-card
				@media (min-width: 52em)
					right -40px
					padding-right 4rem
		&:nth-child(even)
			.timeline-card
				@media (min-width: 52em)
					left -40px
					padding-left 4rem
		&:last-child
			margin-bottom 0

	&-number
		border-radius 50%
		box-shadow var(--neu-shadow-1)
		@media (min-width: 52em)
			width 80px
			height 80px
		@media (max-width: 51.99em)
			width 60px
			height 60px
	&-card
		background linear-gradient(145deg, #23232a, #2a2a32)
		box-shadow var(--neu-shadow-1)
		border-radius 40px 10px
		@media (max-width: 51.99em)
			top -30px
</style>
