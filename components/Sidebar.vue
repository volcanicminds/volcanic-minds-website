<template>
	<Transition name="sidebar">
		<div
			v-if="isSidebarOpened && headerData"
			class="fixed z4 col-12 h100 bg-raisin-black left-0 top-0 flex flex-column"
		>
			<WrapperContainer class="pt3 pb2">
				<div class="right">
					<font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl cursor-pointer" @click="closeSidebar" />
				</div>
			</WrapperContainer>
			<WrapperContainer v-if="headerData.data.links" class="py2 flex-auto overflow-auto center">
				<template v-for="(link, i) in headerData.data.links">
					<PrismicLink :key="i" class="block my2 h2 font-light" :field="link.link_url" @click.native="closeSidebar">{{
						link.link_title
					}}</PrismicLink>
				</template>
			</WrapperContainer>
			<div class="flex flex-column items-center py3">
				<WrapperPrismicImage
					v-if="footerData.data.logo"
					:field="footerData.data.logo"
					:size="150"
					class="footer-logo mb3"
				/>
				<div v-if="footerData.data.icon_links" class="flex social-links-container">
					<template v-for="(link, i) in footerData.data.icon_links">
						<PrismicLink v-if="link.icon" :key="i" :field="link.link" :aria-label="link.alt_text">
							<font-awesome-icon :icon="link.icon" size="2xl" />
						</PrismicLink>
					</template>
				</div>
			</div>
			<RainbowBar />
		</div>
	</Transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		isSidebarOpened() {
			return this.$store.state.prismic.isSidebarOpened
		},
		headerData() {
			return this.$store.state.prismic.header
		},
		footerData() {
			return this.$store.state.prismic.footer
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
.social-links-container
	gap 30px

.footer-logo
	@media screen and (orientation: landscape)
		display none
.sidebar-enter-active
.sidebar-leave-active
	transition all 0.4s

.sidebar-enter
.sidebar-leave-to
	transform translateX(100%)
</style>
