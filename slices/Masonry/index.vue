<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, onUnmounted } from 'vue'

export default defineComponent({
	name: 'PortfolioMasonry'
})
</script>

<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<WrapperContainer class="portfolio-container">
			<div class="center mb3">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
				<PrismicRichText v-if="slice.primary.description" class="m0" :field="slice.primary.description" />
			</div>

			<div ref="masonryWallRef" class="masonry-wall" :class="`layout--${slice.primary.layout_style || 'default'}`">
				<component
					:is="item.card_link && !item.card_link.isBroken && item.card_link.url ? 'PrismicLink' : 'div'"
					v-for="(item, i) in slice.items"
					:key="`work-item-${i}`"
					:field="item.card_link && !item.card_link.isBroken && item.card_link.url ? item.card_link : undefined"
					:aria-label="item.card_link_alternative_text ? item.card_link_alternative_text : 'Visualizza il lavoro'"
					class="work-card no-underline"
					:class="[
						`work-card--${item.card_size || 'default'}`,
						{
							'text-on-hover': item.show_text_on_hover,
							'is-link': item.card_link && !item.card_link.isBroken && item.card_link.url,
							'has-hover-image': item.card_image_hover && item.card_image_hover.url
						}
					]"
				>
					<div class="work-card__image-container">
						<WrapperPrismicImage
							v-if="item.card_image"
							:field="item.card_image"
							:size="1200"
							class="work-card__image work-card__image--default"
						/>
						<WrapperPrismicImage
							v-if="item.card_image_hover && item.card_image_hover.url"
							:field="item.card_image_hover"
							:size="1200"
							class="work-card__image work-card__image--hover"
						/>
					</div>

					<div v-if="item.card_title || item.card_desc" class="work-card__content">
						<div class="work-card__content-inner p2">
							<component :is="slice.primary.seo_enable ? 'h3' : 'div'" v-if="item.card_title" class="h3 m0 mb1">
								{{ item.card_title }}
							</component>
							<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="m0 card-description" />
						</div>
					</div>
				</component>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})

const masonryWallRef = ref<HTMLElement | null>(null)

const updateCornerClasses = () => {
	const container = masonryWallRef.value
	if (!container || getComputedStyle(container).getPropertyValue('display') !== 'grid') {
		return
	}

	const cards = Array.from(container.children) as HTMLElement[]
	if (cards.length === 0) return

	cards.forEach((card) => {
		card.classList.remove('is-top-left', 'is-top-right', 'is-bottom-left', 'is-bottom-right')
	})

	const positions = cards.map((card) => card.getBoundingClientRect())
	const minTop = Math.min(...positions.map((p) => p.top))
	const maxBottom = Math.max(...positions.map((p) => p.bottom))
	const minLeft = Math.min(...positions.map((p) => p.left))
	const maxRight = Math.max(...positions.map((p) => p.right))

	cards.forEach((card, index) => {
		const pos = positions[index]
		if (pos.top === minTop && pos.left === minLeft) card.classList.add('is-top-left')
		if (pos.top === minTop && pos.right === maxRight) card.classList.add('is-top-right')
		if (pos.bottom === maxBottom && pos.left === minLeft) card.classList.add('is-bottom-left')
		if (pos.bottom === maxBottom && pos.right === maxRight) card.classList.add('is-bottom-right')
	})
}

onMounted(() => {
	updateCornerClasses()
	window.addEventListener('resize', updateCornerClasses)
})

onUpdated(() => {
	updateCornerClasses()
})

onUnmounted(() => {
	window.removeEventListener('resize', updateCornerClasses)
})
</script>

<style lang="stylus" scoped>
$breakpoint-md = 1024px

.portfolio-container
	width 100%
	max-width 1380px
	margin-left auto
	margin-right auto
	padding-left 1rem
	padding-right 1rem

.masonry-wall
	display grid
	grid-template-columns repeat(4, 1fr)
	grid-auto-rows 223px

.masonry-wall.layout--default
	gap 1rem

.masonry-wall.layout--spaced-compact
	gap 0.5rem

.masonry-wall.layout--compact
	gap 0

.work-card
	position relative
	grid-column span 1
	grid-row span 1
	overflow hidden
	box-shadow 0 4px 6px rgba(0, 0, 0, 0.1)
	transition all 0.3s ease-in-out

.layout--default .work-card
	border-radius 12px

.layout--compact .work-card
.layout--spaced-compact .work-card
	border-radius 0

.layout--compact .work-card.is-top-left
.layout--spaced-compact .work-card.is-top-left
	border-top-left-radius 12px

.layout--compact .work-card.is-top-right
.layout--spaced-compact .work-card.is-top-right
	border-top-right-radius 12px

.layout--compact .work-card.is-bottom-left
.layout--spaced-compact .work-card.is-bottom-left
	border-bottom-left-radius 12px

.layout--compact .work-card.is-bottom-right
.layout--spaced-compact .work-card.is-bottom-right
	border-bottom-right-radius 12px

.work-card.is-link
	cursor pointer
	&:hover
		transform translateY(-5px)
		box-shadow 0 10px 15px rgba(0, 0, 0, 0.1)

.work-card--wide
	grid-column span 2

.work-card--tall
	grid-row span 2

.work-card--large
	grid-column span 2
	grid-row span 2

.work-card__image-container
	position absolute
	top 0
	left 0
	width 100%
	height 100%

.work-card__image
	position absolute
	top 0
	left 0
	width 100%
	height 100%
	object-fit cover
	transition all 0.4s ease

.work-card__image--hover
	opacity 0

.work-card.has-hover-image:hover .work-card__image--hover
	opacity 1

.work-card:not(.has-hover-image):hover .work-card__image--default
	transform scale(1.05)

.work-card__content
	position absolute
	bottom 0
	left 0
	width 100%
	height 100%
	display flex
	flex-direction column
	justify-content flex-end
	color white
	background linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 70%)
	transition opacity 0.3s ease-in-out

.card-description
	display -webkit-box
	-webkit-box-orient vertical
	-webkit-line-clamp 2
	overflow hidden

.work-card.text-on-hover
	.work-card__content
		opacity 0
	&:hover
		.work-card__content
			opacity 1

@media (max-width: $breakpoint-md - 1px)
	.masonry-wall
		grid-template-columns 1fr
		grid-auto-rows auto

	.work-card
	.work-card--wide
	.work-card--tall
	.work-card--large
		grid-column span 1
		grid-row span 1
		min-height 400px

	.work-card__content
		opacity 1
</style>
