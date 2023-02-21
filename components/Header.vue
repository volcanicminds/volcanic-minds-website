<template>
	<div class="bg-raisin-black header-container top-0 z3">
		<WrapperContainer class="flex items-center px3 py2">
			<div class="flex-auto">
				<NuxtLink :to="localePath('/')"
					><img loading="lazy" class="logo" src="../assets/images/logo/logo-dark.png" height="50" alt="Logo"
				/></NuxtLink>
			</div>
			<NuxtLink to="/prenota-appuntamento" class="px2 xs-hide sm-hide">Prenota un appuntamento</NuxtLink>
			<NuxtLink to="/documents/VolcanicMinds-pitch.pdf" target="_blank" external class="px2 pr0 xs-hide sm-hide"
				>Scopri di pi&ugrave;</NuxtLink
			>
			<font-awesome-icon
				:icon="['fas', 'bars']"
				class="md-hide lg-hide fa-xl cursor-pointer"
				@click="isSidebarOpened = true"
			/>
			<div class="relative">
				<div class="country-flag country-flag-current cursor-pointer p2" :class="currentLanguage" />
				<template v-if="alternateLanguages">
					<div class="country-flag-dropdown absolute bg-raisin-black-2 px1">
						<WrapperPrismicLink
							v-for="alternateLang in alternateLanguages.results"
							:key="alternateLang.id"
							:link="alternateLang"
							class="block country-flag my1"
							:class="alternateLang.lang"
							aria-label="Scegli lingua"
						/>
					</div>
				</template>
			</div>
		</WrapperContainer>

		<RainbowBar />
	</div>
</template>

<script lang="ts">
export default {
	computed: {
		alternateLanguages() {
			return this.$store.state.prismic.alternateLanguages
		},
		currentLanguage() {
			return this.$store.state.prismic.currentLanguage
		}
	}
}
</script>

<script setup lang="ts">
const isSidebarOpened = useState('isSidebarOpened')
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
	.country-flag-current:hover + .country-flag-dropdown
		display block
	.country-flag-dropdown
		display none
		border-radius 10px
		top 32px
		left -1px
		&:hover
			display block
</style>
