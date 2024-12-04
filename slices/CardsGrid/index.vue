<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<WrapperContainer>
			<div class="center">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
			</div>

			<div class="cards-container mt3">
				<component
					:is="item.cta_link && !item.cta_link.isBroken && item.cta_link.url ? 'PrismicLink' : 'div'"
					v-for="(item, i) in slice.items"
					:key="`slice-item-${i}`"
					:aria-label="item.cta_accessible_text ? item.cta_accessible_text : undefined"
					:field="item.cta_link && !item.cta_link.isBroken && item.cta_link.url ? item.cta_link : undefined"
					class="card relative overflow-hidden bg-shark no-underline"
				>
					<div class="flex flex-column relative z1 h100" :class="slice.primary.center_card_content ? 'center' : ''">
						<div class="card-image-container overflow-hidden">
							<WrapperPrismicImage
								v-if="item.card_image"
								:field="item.card_image"
								:size="1000"
								class="col-12 h100 zoom-on-hover cover"
							/>
						</div>
						<div class="flex flex-column flex-auto p3">
							<div>
								<font-awesome-icon v-if="item.card_icon" :icon="item.card_icon" class="fa-2xl mb3" />
							</div>
							<div v-if="item.publication_date" class="flex items-center publication-container mb1">
								<font-awesome-icon icon="calendar" class="publication-calendar" />
								<span class="publication-date">{{ item.publication_date }}</span>
							</div>
							<div v-if="item.card_title" class="h2">{{ item.card_title }}</div>
							<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="mb-auto" />
							<div v-if="item.cta_link && !item.cta_link.isBroken && item.cta_link.url" class="mt2 right-align">
								<div class="btn btn-primary card-link flex-column justify-center">
									<font-awesome-icon :icon="['fas', 'arrow-right']" size="xl" />
								</div>
							</div>
						</div>
					</div>
					<WrapperPrismicImage
						v-if="item.background"
						:field="item.background"
						:size="500"
						class="zoom-on-hover absolute cover left-0 top-0 col-12 h100 blur-2"
					/>
				</component>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'CardsGrid'
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
.cards-container
	display grid
	grid-template-columns repeat(auto-fit, minmax(230px, 1fr))
	grid-gap 15px
	.card
		border-radius 40px 10px
		*
			word-wrap break-word
		.card-image-container
			max-height 200px
		.publication-container
			gap 7px
			.publication-calendar
				font-size 14px
			.publication-date
				font-size 14px
		.card-link
			border-radius 50%
			display inline-flex
			width 46px
			height 46px
		.zoom-on-hover
			transition all 0.4s

		&:hover
			.zoom-on-hover
				transform scale(1.05)
</style>
