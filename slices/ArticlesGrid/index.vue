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
				<PrismicLink
					v-for="(item, index) in slice.items"
					:key="index"
					:field="item.article"
					:aria-label="slice.primary.cta_accessible_text ? slice.primary.cta_accessible_text : undefined"
					class="card relative overflow-hidden bg-shark no-underline"
				>
					<div class="flex flex-column relative z1 h100" :class="slice.primary.center_card_content ? 'center' : ''">
						<div class="card-image-container overflow-hidden">
							<WrapperPrismicImage
								:field="item.article.data.preview_image"
								:size="1000"
								class="col-12 h100 zoom-on-hover cover"
							/>
						</div>
						<div class="flex flex-column flex-auto p3">
							<div v-if="item.article.data.title" class="h2 mb-auto">{{ item.article.data.title }}</div>
							<div v-if="item.article.data.publication_date" class="flex items-center publication-container mt2">
								<font-awesome-icon icon="calendar" class="publication-calendar" />
								<span class="publication-date">{{ item.article.data.publication_date }}</span>
							</div>
							<div v-if="item.article.tags.length" class="flex flex-wrap items-center mt1">
								<div
									v-for="(tag, i) in item.article.tags"
									:key="`tag-${i}`"
									class="flex tag bg-cultured raisin-black font-bold mr1 mb1 uppercase"
								>
									{{ tag }}
								</div>
							</div>
						</div>
					</div>
				</PrismicLink>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'
export default defineComponent({
	name: 'ArticlesGrid'
})
</script>

<script setup lang="ts">
const props = defineProps({
	slice: {
		type: Object,
		required: true
	}
})

// interface Article {
// 	id: string
// 	uid: string
// 	data: {
// 		title: string
// 		preview_image: any
// 		publication_date: string
// 	}
// 	tags: string[]
// }

// const articles = ref<Article[]>([])
// const error = ref<null | { statusCode: number; message: string }>(null)

// const loadArticles = async ($prismic: any, slice: any) => {
// 	try {
// 		// Get article UIDs from slide
// 		const articleUIDs = slice.items.map((item: any) => item.article.uid)

// 		if (articleUIDs.length > 0) {
// 			const articlePromises = articleUIDs.map(async (uid: string) => {
// 				// Get articles by UIDs
// 				const articleResponse = await $prismic.api.query([
// 					$prismic.predicates.at('document.type', 'second_level_page'),
// 					$prismic.predicates.at('my.second_level_page.uid', uid)
// 				])

// 				if (articleResponse?.results && articleResponse.results.length) {
// 					return articleResponse.results[0] as Article
// 				}

// 				return null
// 			})

// 			// Wait all results
// 			articles.value = (await Promise.all(articlePromises)).filter(Boolean)
// 		}
// 	} catch (e) {
// 		error.value = {
// 			statusCode: 500,
// 			message: 'An error occurred while fetching articles'
// 		}
// 	}
// }

// onMounted(() => {
// 	const instance = getCurrentInstance()
// 	// @ts-ignore
// 	const $prismic = instance?.proxy?.$prismic

// 	if ($prismic && props.slice) {
// 		loadArticles($prismic, props.slice)
// 	} else {
// 		error.value = {
// 			statusCode: 500,
// 			message: 'Prismic client not found'
// 		}
// 	}
// })
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
			height 200px
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
		.tag
			border-radius 4px
			font-size 12px
			padding 3px 6px

		&:hover
			.zoom-on-hover
				transform scale(1.05)
</style>
