<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:is-section="slice.primary.title ? true : false"
	>
		<WrapperContainer>
			<div class="center mb4">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>

			<div
				ref="containerRef"
				class="logo-showcase relative overflow-hidden"
				:class="[layoutClass, { 'mask-edges': isScrolling }]"
			>
				<!-- Wrapper div to handle grid wrapping vs track behavior -->
				<div
					class="track flex items-center"
					:class="[{ 'animate-scroll': isScrolling }, alignmentClass]"
					:style="scrollStyle"
				>
					<!-- Original Items -->
					<div class="items-group flex items-center" :class="{ 'flex-wrap': isGrid }">
						<component
							:is="item.link && item.link.url ? 'PrismicLink' : 'div'"
							v-for="(item, i) in slice.items"
							:key="`logo-${i}`"
							:field="item.link?.url ? item.link : undefined"
							class="logo-item flex-none mx3 block my2"
							:title="item.name"
						>
							<WrapperPrismicImage
								:field="item.logo"
								resize-by-height
								class="logo-image block"
								:class="logoSizeClass"
								:alt="item.name || item.logo.alt || 'Partner logo'"
							/>
						</component>
					</div>

					<!-- Duplicate Items for Seamless Scroll (Only show if scrolling and NOT Grid) -->
					<!-- Grid mode never scrolls continuously in this implementation, it wraps -->
					<div v-if="isScrolling && !isGrid" class="items-group flex items-center" aria-hidden="true">
						<component
							:is="item.link && item.link.url ? 'PrismicLink' : 'div'"
							v-for="(item, i) in slice.items"
							:key="`logo-dup-${i}`"
							:field="item.link?.url ? item.link : undefined"
							class="logo-item flex-none mx3 block my2"
							tabindex="-1"
						>
							<WrapperPrismicImage
								:field="item.logo"
								resize-by-height
								class="logo-image block"
								:class="logoSizeClass"
								:alt="item.name || item.logo.alt || 'Partner logo'"
							/>
						</component>
					</div>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick, watch } from 'vue'

export default defineComponent({
	name: 'LogoShowcase'
})
</script>

<script setup lang="ts">
const props = defineProps({
	slice: {
		type: Object,
		required: true
	}
})

const containerRef = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const windowWidth = ref(0) // Track window width for mobile logic

const isGrid = computed(() => {
	// If Mobile (< 768px), force Single Row behavior (so no wrapping grid)
	// User Requirement: "Wrap in mobile should behave like Single Row"
	if (windowWidth.value < 768) return false
	return props.slice.primary.layout_mode === 'Grid (Wrap)'
})

const autoScrollEnabled = computed(() => props.slice.primary.auto_scroll || false)

const layoutClass = computed(() => {
	if (isGrid.value) return 'flex-wrap'
	return 'nowrap'
})

const alignmentClass = computed(() => {
	// If scrolling, we usually want left align (start of track)
	// But the track itself moves.
	if (isScrolling.value) return ''

	switch (props.slice.primary.alignment) {
		case 'Left':
			return 'justify-start'
		case 'Center':
			return 'justify-center'
		default:
			return 'justify-center'
	}
})

const logoSizeClass = computed(() => {
	// Default is 'Small (60px)' if not set
	const size = props.slice.primary.logo_size
	if (size === 'Normal (85px)') return 'size-normal'
	return 'size-small'
})

const scrollDuration = computed(() => {
	const baseSpeed = 20
	const speedMultiplier =
		{
			Slow: 2,
			Medium: 1,
			Fast: 0.5
		}[props.slice.primary.scroll_speed || 'Medium'] || 1

	return `${baseSpeed * speedMultiplier * (props.slice.items.length / 5)}s`
})

const scrollStyle = computed(() => {
	if (!isScrolling.value) return {}
	return {
		animationDuration: scrollDuration.value
	}
})

function updateWidth() {
	if (typeof window !== 'undefined') {
		windowWidth.value = window.innerWidth
	}
	checkScroll()
}

function checkScroll() {
	if (isGrid.value) {
		// In desktop Grid mode, we do NOT scroll. We wrap.
		// "se wrap configurato su due righe... non fa nulla, tutto statico" (unless overflow, later feature)
		isScrolling.value = false
		return
	}

	// Single Row logic (or Mobile fallback)
	if (!containerRef.value) {
		isScrolling.value = false
		return
	}

	// Logic: If content > container, scroll if enabled.
	// If AutoScroll is FALSE, user wants "limita a 3 e stop" on mobile?
	// Actually "limita a 3" might effectively mean overflow: hidden without scrollbar?
	// Standard overflow behavior:
	// If auto_scroll=true => animate
	// If auto_scroll=false => static (might cut off items)

	if (!autoScrollEnabled.value) {
		isScrolling.value = false
		return
	}

	const container = containerRef.value
	// We need to measure the items-group width
	const group = container.querySelector('.items-group') as HTMLElement
	if (group) {
		// Reset animation to measure correctly
		const trackWidth = group.scrollWidth
		const containerWidth = container.clientWidth

		// Allow scroll if content is wider
		if (trackWidth > containerWidth) {
			isScrolling.value = true
		} else {
			isScrolling.value = false
		}
	}
}

onMounted(() => {
	updateWidth()
	window.addEventListener('resize', updateWidth)
})

watch(
	() => props.slice,
	() => {
		nextTick(checkScroll)
	},
	{ deep: true }
)
</script>

<style lang="stylus" scoped>
.logo-showcase
	width 100%

	&.mask-edges
		mask-image linear-gradient(to right, transparent, black 10%, black 90%, transparent)
		-webkit-mask-image linear-gradient(to right, transparent, black 10%, black 90%, transparent)

.track
	width 100%
	/* If using flex-wrap on items-group, track should stretch or fit */

	/* Single Row Mode styles */
	.logo-showcase.nowrap &
		width max-content

	/* Grid Mode: Alignment applies to track or items-group? */
	/* We apply alignmentClass to track. If track justifies center, items center. */

.items-group
	/* Important for Grid wrapping */
	&.flex-wrap
		flex-wrap wrap
		justify-content inherit /* Inherit alignment from track */
		width 100%

.logo-item
	max-width 180px
	min-width 80px

	.logo-image
		width auto
		object-fit contain
		filter grayscale(100%)
		opacity 0.7
		transition all 0.3s ease

		&.size-small
			max-height 60px

		&.size-normal
			max-height 85px

		&:hover
			filter grayscale(0)
			opacity 1

.animate-scroll
	animation scroll linear infinite
	/* Ensure flex-wrap is OFF during scroll */
	flex-wrap nowrap !important

	.items-group
		flex-wrap nowrap !important

@keyframes scroll
	0%
		transform translateX(0)
	100%
		transform translateX(-50%)
</style>
