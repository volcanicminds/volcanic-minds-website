<template>
	<div v-if="headerData" class="bg-raisin-black header-container top-0 z3">
		<WrapperContainer class="flex items-center px3 py2">
			<div v-if="headerData.data.logo" class="flex flex-auto">
				<NuxtLink :to="localePath('/')" class="logo">
					<WrapperPrismicImage
						:field="headerData.data.logo"
						:size="50"
						resize-by-height
						class="contain position-left col-12 h100"
					/>
				</NuxtLink>
			</div>

			<NavigationMenu class="xs-hide sm-hide" />

			<div v-click-outside="() => (isLanguageSelectorOpened = false)" class="relative">
				<div
					class="country-flag country-flag-current cursor-pointer p2"
					:class="currentLanguage"
					role="button"
					tabindex="0"
					:aria-label="headerData.data.language_choose_label"
					@click="isLanguageSelectorOpened = true"
				/>
				<div
					v-show="alternateLanguages && isLanguageSelectorOpened"
					class="country-flag-dropdown absolute bg-raisin-black-2 px2"
				>
					<PrismicLink
						v-for="alternateLang in alternateLanguages.results"
						:key="alternateLang.id"
						:field="{ ...alternateLang, link_type: 'Document' }"
						class="block country-flag my2"
						:class="alternateLang.lang"
						:aria-label="alternateLang.lang === 'en' ? 'English' : alternateLang.lang === 'de' ? 'Deutsch' : 'Italiano'"
						role="button"
						@click.native="isLanguageSelectorOpened = false"
					/>
				</div>
			</div>
			<font-awesome-icon
				:icon="['fas', 'bars']"
				class="md-hide lg-hide fa-xl cursor-pointer ml2"
				:title="headerData.data.open_sidebar_label || 'Open sidebar'"
				role="button"
				@click="openSidebar"
			/>
		</WrapperContainer>

		<RainbowBar />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickOutside from 'vue-click-outside'
export default Vue.extend({
	directives: {
		ClickOutside
	},
	data: (): { isLanguageSelectorOpened: boolean } => ({
		isLanguageSelectorOpened: false
	}),
	computed: {
		alternateLanguages(): any {
			return this.$store.state.prismic.alternateLanguages
		},
		currentLanguage(): any {
			return this.$store.state.prismic.currentLanguage
		},
		headerData(): any {
			return this.$store.state.prismic.header
		}
	},
	methods: {
		openSidebar(): void {
			this.$store.commit('prismic/setIsSidebarOpened', true)
			if (process.client) {
				document.body.style.overflow = 'hidden'
			}
		}
	}
})
</script>

<style lang="stylus" scoped>
.header-container
	position sticky
	.logo
		width 130px
		height 50px
	@media (max-width: 52em)
		.logo
			width 80px
			height 30px

	.country-flag
		width 20px
		height 20px
		background-size 20px 20px
		background-repeat no-repeat
		background-position center
		&.it-it
			background-image url('~/assets/images/it-it.png')
		&.de
			background-image url('~/assets/images/de-de.png')
		&.en
			background-image url('~/assets/images/en-eu.png')
	.country-flag-dropdown
		border-radius 10px
		top 32px
		left -10px
</style>
