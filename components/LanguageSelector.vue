<template>
	<li class="dropdown relative p0 inline-block">
		<button
			type="button"
			class="border-none relative dropdown__title flex items-center cursor-pointer p0"
			aria-expanded="false"
			aria-controls="language-selector"
			:aria-label="headerData.data.language_choose_label"
		>
			<div class="country-flag country-flag-current" :class="currentLanguage" />
			<font-awesome-icon
				v-if="Object.keys(alternateLanguages).length"
				class="open-icon relative ml1"
				:icon="['fas', 'angle-down']"
				size="2xs"
			/>
		</button>

		<ul v-if="alternateLanguages" id="language-selector" class="dropdown__menu absolute px2 gradient-bg">
			<li class="dropdown-bg bg-shark m-auto absolute col-12 h100 left-0 top-0 right-0 bottom-0">&nbsp;</li>
			<li v-for="alternateLang in alternateLanguages.results" :key="alternateLang.id" class="my2 relative">
				<PrismicLink
					:field="{ ...alternateLang, link_type: 'Document' }"
					class="block country-flag"
					:class="alternateLang.lang"
					:aria-label="
						alternateLang.lang === 'en'
							? commonTranslationsData.data.view_english_site
							: commonTranslationsData.data.view_italian_site
					"
					role="button"
					@click.native="handleDropdownClick"
				/>
			</li>
		</ul>
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		alternateLanguages(): any {
			return this.$store.state.prismic.alternateLanguages
		},
		currentLanguage(): any {
			return this.$store.state.prismic.currentLanguage
		},
		headerData(): any {
			return this.$store.state.prismic.header
		},
		commonTranslationsData(): any {
			return this.$store.state.prismic.commonTranslations
		}
	},
	methods: {
		handleDropdownClick(e: any): void {
			e.target.blur()
		}
	}
})
</script>

<style lang="stylus" scoped>
.dropdown
	.country-flag
		width 20px
		height 20px
		background-size 20px 20px
		background-repeat no-repeat
		background-position center
		&.it-it
			background-image url('~/assets/images/it-it.png')
		&.en
			background-image url('~/assets/images/en-eu.png')
	.dropdown__menu
		left 10px
		width unset
</style>
