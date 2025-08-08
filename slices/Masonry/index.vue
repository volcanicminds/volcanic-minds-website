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

			<div class="masonry-wall">
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
							'is-link': item.card_link && !item.card_link.isBroken && item.card_link.url
						}
					]"
				>
					<div v-if="item.card_image" class="work-card__image-container">
						<WrapperPrismicImage :field="item.card_image" :size="1200" class="work-card__image" />
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

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'PortfolioMasonry'
})
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})
</script>

<style lang="stylus" scoped>
$breakpoint-md = 1024px

.portfolio-container
	width 100%
	max-width 1536px
	margin-left auto
	margin-right auto
	padding-left 1rem
	padding-right 1rem

.masonry-wall
	display grid
	gap 1rem
	grid-template-columns repeat(4, 1fr)
	grid-auto-rows 250px

.work-card
	position relative
	grid-column span 1
	grid-row span 1
	border-radius 12px
	overflow hidden
	box-shadow 0 4px 6px rgba(0, 0, 0, 0.1)
	transition all 0.3s ease-in-out

	&.is-link
		cursor pointer
		&:hover
			transform translateY(-5px)
			box-shadow 0 10px 15px rgba(0, 0, 0, 0.1)
			.work-card__image
				transform scale(1.05)

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
	width 100%
	height 100%
	object-fit cover
	transition transform 0.4s ease

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
		min-height 300px

	.work-card__content
		opacity 1
</style>
