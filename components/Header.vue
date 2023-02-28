<template>
	<div class="bg-raisin-black header-container top-0 z3">
		<WrapperContainer class="flex items-center px3 py2">
			<div class="flex-auto">
				<NuxtLink :to="localePath('/')"
					><img loading="lazy" class="logo" src="../assets/images/logo/logo-dark.png" height="50" alt="Logo"
				/></NuxtLink>
			</div>
			<template v-if="headerData">
				<template v-for="(link, i) in headerData.data.links">
					<PrismicLink :key="i" class="px2 pr0 xs-hide sm-hide" :field="link.link_url">{{
						link.link_title
					}}</PrismicLink>
				</template>
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
		}
	}
})
</script>

<style lang="stylus" scoped>
.header-container
	position sticky
	@media screen and (max-width: 40em)
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
		&.de-de
			background-image url('~/assets/images/de-de.png')
		&.en-eu
			background-image url('~/assets/images/en-eu.png')
	.country-flag-dropdown
		border-radius 10px
		top 32px
		left -10px
</style>
