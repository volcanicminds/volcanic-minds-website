<template>
	<div class="global-container flex flex-column">
		<Sidebar />
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	head() {
		return {
			link: [
				{
					hid: 'canonical',
					rel: 'canonical',
					href: `${process.env.NUXT_SITENAME}${this.$nuxt.$route.path}`
				}
			]
		}
	},
	watch: {
		$route() {
			this.closeSidebar()
		}
	},
	mounted() {
		window.addEventListener('resize', this.onResize)
	},
	destroyed() {
		window.removeEventListener('resize', this.onResize)
	},
	methods: {
		closeSidebar() {
			this.$store.commit('prismic/setIsSidebarOpened', false)
			if (process.client) {
				document.body.style.overflow = 'visible'
			}
		},
		onResize() {
			window.innerWidth > 831 && this.closeSidebar()
		}
	}
})
</script>

<style lang="stylus" scoped>
.main-container
	flex-shrink 0
</style>
