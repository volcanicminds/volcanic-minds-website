<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<WrapperContainer class="max-width-5">
			<div class="center">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
				<PrismicRichText v-if="slice.primary.description" class="m0" :field="slice.primary.description" />
			</div>

			<div class="cards-container mt3">
				<component
					:is="item.card_link && !item.card_link.isBroken && item.card_link.url ? 'PrismicLink' : 'div'"
					v-for="(item, i) in slice.items"
					:key="`slice-item-${i}`"
					:aria-label="item.card_link_alternative_text ? item.card_link_alternative_text : undefined"
					:field="item.card_link && !item.card_link.isBroken && item.card_link.url ? item.card_link : undefined"
					class="card relative overflow-hidden bg-shark no-underline"
				>
					<div class="flex flex-column relative z1 h100">
						<div class="flex flex-column flex-auto p3">
							<component :is="slice.primary.seo_enable ? 'h3' : 'div'" v-if="item.card_title" class="h2 m0">{{
								item.card_title
							}}</component>
							<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="mb-auto" />
							<div v-if="item.card_link && !item.card_link.isBroken && item.card_link.url" class="mt2 right-align">
								<div class="btn btn-primary card-link flex-column justify-center">
									<font-awesome-icon :icon="['fas', 'arrow-right']" size="xl" />
								</div>
							</div>
						</div>
					</div>
					<WrapperPrismicImage
						v-if="item.card_image"
						:field="item.card_image"
						:size="500"
						class="zoom-on-hover absolute cover left-0 top-0 col-12 h100"
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
