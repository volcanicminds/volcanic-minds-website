<template>
	<div v-if="headerData" class="bg-raisin-black header-container top-0 z3">
		<WrapperContainer class="flex items-center px3 py2">
			<div v-if="headerData.data.logo" class="flex-auto">
				<NuxtLink :to="localePath('/')" class="flex">
					<WrapperPrismicImage :field="headerData.data.logo" :size="50" resize-by-height class="logo" />
				</NuxtLink>
			</div>
			<template v-for="(link, i) in headerData.data.links">
				<PrismicLink v-if="!link.hide_on_desktop" :key="i" class="px2 pr0 xs-hide sm-hide" :field="link.link_url">{{
					link.link_title
				}}</PrismicLink>
			</template>

			<div v-click-outside="() => (isLanguageSelectorOpened = false)" class="relative">
				<div
					class="country-flag country-flag-current cursor-pointer p2"
					:class="currentLanguage"
					@click="isLanguageSelectorOpened = true"
				/>
				<div
					v-if="alternateLanguages && isLanguageSelectorOpened"
					class="country-flag-dropdown absolute bg-raisin-black-2 px2"
				>
					<PrismicLink
						v-for="alternateLang in alternateLanguages.results"
						:key="alternateLang.id"
						:field="{ ...alternateLang, link_type: 'Document' }"
						class="block country-flag my2"
						:class="alternateLang.lang"
						aria-label="Scegli lingua"
					/>
				</div>
			</div>
			<font-awesome-icon
				:icon="['fas', 'bars']"
				class="md-hide lg-hide fa-xl cursor-pointer ml2"
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
	@media (max-width: 40em)
		.logo
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
