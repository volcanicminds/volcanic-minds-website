<template>
	<Transition name="sidebar">
		<div
			v-if="isSidebarOpened && headerData"
			class="fixed z4 col-12 h100 bg-raisin-black left-0 top-0 flex flex-column"
		>
			<WrapperContainer class="pt3 pb2">
				<div class="right">
					<font-awesome-icon
						:icon="['fas', 'xmark']"
						class="fa-xl cursor-pointer"
						:title="headerData.data.close_sidebar_label || 'Close sidebar'"
						role="button"
						@click="closeSidebar"
					/>
				</div>
			</WrapperContainer>
			<WrapperContainer class="py2 flex-auto overflow-auto center">
				<NavigationMenu is-mobile />
			</WrapperContainer>
			<div class="flex flex-column items-center py3">
				<NuxtLink :to="localePath('/')" title="Home" @click.native="closeSidebar">
					<WrapperPrismicImage
						v-if="footerData.data.logo"
						:field="footerData.data.logo"
						:size="150"
						class="footer-logo mb3"
					/>
				</NuxtLink>
				<div v-if="footerData.data.icon_links" class="flex social-links-container">
					<template v-for="(link, i) in footerData.data.icon_links">
						<PrismicLink v-if="link.icon" :key="i" :field="link.link" :aria-label="link.alt_text">
							<font-awesome-icon :icon="link.icon" size="2xl" class="social-link" />
						</PrismicLink>
					</template>
				</div>
			</div>
			<!-- <RainbowBar /> -->
		</div>
	</Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		isSidebarOpened(): any {
			return this.$store.state.prismic.isSidebarOpened
		},
		headerData(): any {
			return this.$store.state.prismic.header
		},
		footerData(): any {
			return this.$store.state.prismic.footer
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
.social-links-container
	gap 30px

@media screen and (orientation: landscape)
	.footer-logo
		display none
.sidebar-enter-active
.sidebar-leave-active
	transition all 0.4s

.sidebar-enter
.sidebar-leave-to
	transform translateX(100%)
</style>
