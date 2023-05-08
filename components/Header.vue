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

			<!-- https://moderncss.dev/css-only-accessible-dropdown-navigation-menu/ -->
			<nav v-if="navigationMenuData" :aria-label="navigationMenuData.data.aria_label" class="xs-hide sm-hide">
				<ul class="m0 p0">
					<template v-for="(firstLevel, i) in navigationMenuData.data.slices">
						<template v-if="firstLevel.primary.link_title">
							<li v-if="Object.keys(firstLevel.items).length" :key="i" class="inline-block dropdown relative p0">
								<button
									type="button"
									class="px2 border-none font-light dropdown__title cursor-pointer"
									aria-expanded="false"
									:aria-controls="`sweets-dropdown-${i}`"
								>
									{{ firstLevel.primary.link_title }}
								</button>
								<ul :id="`sweets-dropdown-${i}`" class="dropdown__menu absolute bg-raisin-black-2 p0 center">
									<template v-for="(secondLevel, j) in firstLevel.items">
										<li :key="i + j" class="px3 py1">
											<PrismicLink
												v-if="secondLevel.link_url && secondLevel.link_title"
												class="py2 xs-hide sm-hide no-underline dropdown__menu_link"
												:field="secondLevel.link_url"
												>{{ secondLevel.link_title }}</PrismicLink
											>
										</li>
									</template>
								</ul>
							</li>
							<li
								v-else-if="firstLevel.primary.link_url && !firstLevel.primary.hide_on_desktop"
								:key="i"
								class="inline-block p0"
							>
								<PrismicLink class="px2 no-underline" :field="firstLevel.primary.link_url">{{
									firstLevel.primary.link_title
								}}</PrismicLink>
							</li>
						</template>
					</template>
				</ul>
			</nav>

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
	data() {
		return {
			isLanguageSelectorOpened: false
		}
	},
	computed: {
		alternateLanguages() {
			return this.$store.state.prismic.alternateLanguages
		},
		currentLanguage() {
			return this.$store.state.prismic.currentLanguage
		},
		headerData() {
			return this.$store.state.prismic.header
		},
		navigationMenuData() {
			return this.$store.state.prismic.navigationMenu
		}
	},
	methods: {
		openSidebar() {
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

	ul
		list-style none

		.dropdown
			&:hover > .dropdown__menu
			&:focus-within > .dropdown__menu
				visibility visible
				opacity 1
				display block
				transform rotateX(0) translateX(-50%)
			&__menu
				left 50%
				top 35px
				transform rotateX(-90deg) translateX(-50%)
				transform-origin top center
				transition 280ms all 120ms ease-out
				opacity 0.3
				visibility hidden
				border-radius 10px
				&_link
					white-space nowrap
			&__title
				background transparent
				color var(--cultured)
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
