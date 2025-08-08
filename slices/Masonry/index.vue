<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
		<!-- MODIFICA: Rimossa la classe "max-width-5" e aggiunta "portfolio-container" per un controllo personalizzato della larghezza -->
		<WrapperContainer class="portfolio-container">
			<!-- Sezione Intestazione -->
			<div class="center mb3">
				<div v-if="slice.primary.title" class="h2 font-thin mb1">{{ slice.primary.title }}</div>
				<h2 v-if="slice.primary.subtitle" class="h1 m0">{{ slice.primary.subtitle }}</h2>
				<PrismicRichText v-if="slice.primary.description" class="m0" :field="slice.primary.description" />
			</div>

			<!-- Masonry Wall -->
			<div class="masonry-wall">
				<component
					:is="item.card_link && !item.card_link.isBroken && item.card_link.url ? 'PrismicLink' : 'div'"
					v-for="(item, i) in slice.items"
					:key="`work-item-${i}`"
					:field="item.card_link && !item.card_link.isBroken && item.card_link.url ? item.card_link : undefined"
					:aria-label="item.card_link_alternative_text ? item.card_link_alternative_text : 'Visualizza il lavoro'"
					class="work-card no-underline"
					:class="{ 'is-link': item.card_link && !item.card_link.isBroken && item.card_link.url }"
				>
					<!-- Immagine in primo piano -->
					<div v-if="item.card_image" class="work-card__image-container">
						<WrapperPrismicImage :field="item.card_image" :size="800" class="work-card__image" />
					</div>

					<!-- Contenuto testuale della card -->
					<div class="work-card__content p2">
						<component :is="slice.primary.seo_enable ? 'h3' : 'div'" v-if="item.card_title" class="h3 m0 mb1">
							{{ item.card_title }}
						</component>
						<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="m0" />
					</div>

					<!-- CTA (Call to Action) opzionale per il link -->
					<div
						v-if="item.card_link && !item.card_link.isBroken && item.card_link.url"
						class="work-card__cta p2 right-align"
					>
						<span class="bold">Scopri di più</span>
						<font-awesome-icon :icon="['fas', 'arrow-right']" class="ml1" />
					</div>
				</component>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	// Nome del componente aggiornato per maggiore chiarezza
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
// Breakpoints per il design responsivo
$breakpoint-sm = 640px
$breakpoint-md = 1024px
$breakpoint-lg = 1280px

// MODIFICA: Nuova classe per il contenitore principale
.portfolio-container
	// Occupa tutta la larghezza disponibile...
	width 100%
	// ...fino a un massimo di 1536px.
	max-width 1536px
	// Centra il contenitore quando la larghezza dello schermo è maggiore di max-width.
	margin-left auto
	margin-right auto
	// Aggiunge un po' di padding laterale per evitare che il contenuto tocchi i bordi
	// su schermi più piccoli di 1536px.
	padding-left 1.5rem
	padding-right 1.5rem


.masonry-wall
	// Mobile-first: una colonna di default
	column-count 1
	column-gap 1.5rem

	// Due colonne su schermi medi (tablet)
	@media (min-width: $breakpoint-sm)
		column-count 2

	// Tre colonne su schermi grandi (desktop)
	@media (min-width: $breakpoint-md)
		column-count 3

	// Quattro colonne su schermi molto grandi
	@media (min-width: $breakpoint-lg)
		column-count 4

.work-card
	display inline-block
	width 100%
	margin-bottom 1.5rem
	background-color #fff
	color #000
	border-radius 12px
	overflow hidden
	box-shadow 0 4px 6px rgba(0, 0, 0, 0.1)
	transition all 0.3s ease-in-out
	break-inside avoid

	&.is-link
		cursor pointer
		&:hover
			transform translateY(-5px)
			box-shadow 0 10px 15px rgba(0, 0, 0, 0.1)
			.work-card__cta
				color #007bff
			.work-card__image
				transform scale(1.03)

.work-card__image-container
	overflow hidden

.work-card__image
	display block
	width 100%
	height auto
	transition transform 0.4s ease

.work-card__content
	// Stile gestito da classi utility

.work-card__cta
	display flex
	align-items center
	justify-content flex-end
	font-size 0.9em
	transition color 0.3s ease
	color #666
</style>
