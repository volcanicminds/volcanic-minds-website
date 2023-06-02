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
				<div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="card p3 relative overflow-hidden">
					<div class="flex flex-column relative z1 h100" :class="slice.primary.center_card_content ? 'center' : ''">
						<div>
							<font-awesome-icon v-if="item.card_icon" :icon="item.card_icon" class="fa-2xl mb3" />
						</div>
						<div v-if="item.card_title" class="h2">{{ item.card_title }}</div>
						<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="mb-auto" />
						<div v-if="item.cta_link && !item.cta_link.isBroken && item.cta_link.url" class="mt2 right-align">
							<PrismicLink
								:field="item.cta_link"
								class="btn btn-primary card-link flex-column justify-center"
								:aria-label="item.cta_accessible_text ? item.cta_accessible_text : undefined"
							>
								<font-awesome-icon :icon="['fas', 'arrow-right']" size="xl" />
							</PrismicLink>
						</div>
					</div>
					<WrapperPrismicImage
						v-if="item.background"
						:field="item.background"
						:size="500"
						class="card-bg absolute cover left-0 top-0 col-12 h100 blur-2"
					/>
				</div>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
		background-color var(--raisin-black-2)
		border-radius 40px 10px
		*
			word-wrap break-word
		.card-link
			border-radius 50%
			display inline-flex
			width 46px
			height 46px

		.card-bg
			transition all 0.4s

		&:hover
			.card-bg
				transform scale(1.15)
</style>
