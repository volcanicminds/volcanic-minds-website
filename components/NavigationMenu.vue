<template>
	<!-- https://moderncss.dev/css-only-accessible-dropdown-navigation-menu/ -->
	<nav v-if="navigationMenuData" :aria-label="navigationMenuData.data.aria_label">
		<ul class="m0 p0">
			<template v-for="(firstLevel, i) in navigationMenuData.data.slices">
				<template v-if="firstLevel.primary.link_title">
					<li
						v-if="Object.keys(firstLevel.items).length"
						:key="i"
						class="dropdown relative p0"
						:class="isMobile ? 'sidebar-link' : 'inline-block'"
					>
						<button
							type="button"
							class="px2 border-none font-light dropdown__title cursor-pointer"
							:class="isMobile ? 'h2 font-light' : ''"
							aria-expanded="false"
							:aria-controls="`dropdown-${i}`"
						>
							{{ firstLevel.primary.link_title
							}}<font-awesome-icon class="open-icon relative mr1" :icon="['fas', 'angle-down']" size="2xs" />
						</button>
						<ul :id="`dropdown-${i}`" class="dropdown__menu absolute bg-raisin-black-2 px0 py1 center">
							<template v-for="(secondLevel, j) in firstLevel.items">
								<li :key="i + j" class="px3 my1">
									<PrismicLink
										v-if="secondLevel.link_url && secondLevel.link_title"
										class="py2 no-underline dropdown__menu_link"
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
						:class="isMobile ? 'sidebar-link' : 'inline-block'"
					>
						<PrismicLink
							class="px2 no-underline"
							:field="firstLevel.primary.link_url"
							:class="isMobile ? 'h2 font-light' : ''"
							@click.native="closeSidebar"
							>{{ firstLevel.primary.link_title }}</PrismicLink
						>
					</li>
				</template>
			</template>
		</ul>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	// TODO: undestand why Composition API props won't work with Options API computed
	props: {
		isMobile: Boolean
	},
	computed: {
		navigationMenuData() {
			return this.$store.state.prismic.navigationMenu
		}
	},
	methods: {
		closeSidebar() {
			this.$store.commit('prismic/setIsSidebarOpened', false)
			if (process.client) {
				document.body.style.overflow = 'visible'
			}
		}
	}
})
</script>

<style lang="stylus" scoped>
ul
	list-style none

	.sidebar-link
		margin-top 24px
		margin-bottom 24px

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
			border-radius 10px
			&_link
				white-space nowrap
		&__title
			background transparent
			color var(--cultured)
			.open-icon
				transition 280ms all 120ms ease-out
				top 4px
				left 5px
</style>
