<template>
	<!-- https://moderncss.dev/css-only-accessible-dropdown-navigation-menu/ -->
	<nav v-if="navigationMenuData" :aria-label="navigationMenuData.data.aria_label">
		<ul class="m0 p0 flex flex-column items-center">
			<template v-for="(firstLevel, i) in navigationMenuData.data.slices">
				<template v-if="firstLevel.primary.link_title">
					<li
						v-if="Object.keys(firstLevel.items).length"
						:key="i"
						class="dropdown relative p0"
						:class="isMobile ? 'sidebar-link' : 'inline-block xs-hide sm-hide'"
					>
						<button
							type="button"
							class="border-none font-light dropdown__title cursor-pointer flex items-center"
							:class="isMobile ? 'h2 font-light' : ''"
							aria-expanded="false"
							:aria-controls="`dropdown-${i}`"
						>
							{{ firstLevel.primary.link_title
							}}<font-awesome-icon class="open-icon relative ml1" :icon="['fas', 'angle-down']" size="2xs" />
						</button>
						<ul :id="`dropdown-${i}`" class="dropdown__menu absolute px3 gradient-bg">
							<li class="dropdown-bg bg-shark m-auto absolute col-12 h100 left-0 top-0 right-0 bottom-0">&nbsp;</li>
							<template v-for="(secondLevel, j) in firstLevel.items">
								<li :key="i + j" class="my2 relative">
									<PrismicLink
										v-if="secondLevel.link_url && secondLevel.link_title"
										class="no-underline"
										:field="secondLevel.link_url"
										:class="isMobile ? 'h2 font-light' : ''"
										@click.native="closeSidebar"
										>{{ secondLevel.link_title }}</PrismicLink
									>
								</li>
							</template>
						</ul>
					</li>
					<li
						v-else-if="firstLevel.primary.link_url && !firstLevel.primary.hide_on_desktop"
						:key="i"
						class="p0"
						:class="isMobile ? 'sidebar-link' : 'inline-block xs-hide sm-hide'"
					>
						<PrismicLink
							class="no-underline"
							:field="firstLevel.primary.link_url"
							:class="isMobile ? 'h2 font-light' : ''"
							@click.native="closeSidebar"
							>{{ firstLevel.primary.link_title }}</PrismicLink
						>
					</li>
				</template>
			</template>
			<LanguageSelector v-if="!isMobile" />
		</ul>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	// TODO: understand why Composition API props won't work with Options API computed
	props: {
		isMobile: Boolean
	},
	computed: {
		navigationMenuData(): any {
			return this.$store.state.prismic.navigationMenu
		}
	},
	methods: {
		closeSidebar(): void {
			this.$store.commit('prismic/setIsSidebarOpened', false)
			if (process.client) {
				document.body.style.overflow = 'visible'
			}
		}
	}
})
</script>

<style lang="stylus" scoped>
>>> ul
	list-style none
	gap 25px
	@media (min-width: 52em)
		flex-direction row

	.sidebar-link
		.gradient-bg
			box-shadow var(--neu-shadow-2)

	.dropdown
		&:hover
		&:focus-within
			> .dropdown__menu
			> .dropdown__menu
				visibility visible
				opacity 1
				display block
				transform rotateX(0) translateX(-50%)
			.open-icon
				transform rotateX(180deg)
		&__menu
			left 50%
			top 35px
			transform rotateX(-90deg) translateX(-50%)
			transform-origin top center
			transition 280ms all 120ms ease-out
			opacity 0.3
			visibility hidden
			border-radius 20px 5px
			width 250px
			&.gradient-bg
				background var(--rainbow-gradient)
			.dropdown-bg
				width calc(100% - 6px)
				height calc(100% - 6px)
				border-radius 18px 5px
		&.sidebar-link
			.dropdown__menu
				max-width 100vw
		&__title
			background-color transparent
			color var(--cultured)
			.open-icon
				transition 280ms all 120ms ease-out
				top 1px
</style>
