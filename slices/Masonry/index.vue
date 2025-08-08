<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
		:enable-bg="slice.primary.enable_bg || false"
		:is-section="slice.primary.subtitle ? true : false"
	>
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
					:class="[
						`work-card--${item.card_size || 'default'}`, // --> MODIFICA CHIAVE: Aggiunge la classe di dimensione
						{ 'is-link': item.card_link && !item.card_link.isBroken && item.card_link.url }
					]"
				>
					<!-- Contenitore interno per gestire il flexbox e lo stretch dell'immagine -->
					<div class="work-card__inner">
						<!-- Immagine in primo piano -->
						<div v-if="item.card_image" class="work-card__image-container">
							<WrapperPrismicImage :field="item.card_image" :size="1200" class="work-card__image" />
						</div>

						<!-- Contenuto testuale della card -->
						<div class="work-card__content p2">
							<component :is="slice.primary.seo_enable ? 'h3' : 'div'" v-if="item.card_title" class="h3 m0 mb1">
								{{ item.card_title }}
							</component>
							<PrismicRichText v-if="item.card_desc" :field="item.card_desc" class="m0" />
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
// Breakpoint per il collasso in modalità mobile
$breakpoint-md = 1024px

.portfolio-container
	width 100%
	max-width 1536px
	margin-left auto
	margin-right auto
	padding-left 1rem
	padding-right 1rem

// --- NUOVA GRIGLIA CON PESI DINAMICI ---
.masonry-wall
	display grid
	gap 1rem

	// Definiamo una griglia di base. Es: 4 colonne su desktop.
	// La griglia si adatterà in base a quante colonne un elemento occupa (span).
	grid-template-columns repeat(4, 1fr)

	// Definiamo un'altezza di riga di base.
	// Questo è FONDAMENTALE per far funzionare lo span verticale (grid-row).
	// Ogni card occuperà un multiplo di questa altezza.
	grid-auto-rows 250px // Puoi aggiustare questo valore per cambiare l'altezza base

// Stile base della Card
.work-card
	// Per default, ogni card occupa 1 cella di colonna e 1 di riga
	grid-column span 1
	grid-row span 1

	background-color #fff
	color #000
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

// --- CLASSI DI DIMENSIONE DINAMICHE ---
// Queste classi vengono aggiunte in base alla scelta fatta in Prismic

.work-card--wide
	grid-column span 2 // Occupa 2 colonne

.work-card--tall
	grid-row span 2 // Occupa 2 righe

.work-card--large
	grid-column span 2 // Occupa 2 colonne
	grid-row span 2 // E 2 righe

// Struttura interna per far sì che l'immagine si adatti allo spazio
.work-card__inner
	display flex
	flex-direction column
	width 100%
	height 100% // Fondamentale: fa sì che il contenuto riempia tutta l'area della griglia

.work-card__image-container
	flex-shrink 0 // Impedisce all'immagine di restringersi
	overflow hidden

.work-card__image
	width 100%
	height 100%
	object-fit cover // Importantissimo: adatta l'immagine a riempire lo spazio senza distorcerla
	transition transform 0.4s ease

.work-card__content
	flex-grow 1 // Fa sì che la sezione testo occupi lo spazio rimanente


// --- RESPONSIVITÀ PER MOBILE ---
// Sotto i 1024px, tutto torna ad essere una singola colonna
@media (max-width: $breakpoint-md - 1px)
	.masonry-wall
		// Passiamo a una singola colonna
		grid-template-columns 1fr
		// L'altezza delle righe diventa automatica in base al contenuto
		grid-auto-rows auto

	// Annulliamo TUTTI gli span personalizzati su mobile
	.work-card
	.work-card--wide
	.work-card--tall
	.work-card--large
		grid-column span 1
		grid-row span 1
</style>
