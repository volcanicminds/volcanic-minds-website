<template>
	<div class="global-container flex flex-column">
		<Sidebar />
		<Header />
		<div class="col-12 flex-auto flex flex-column main-container">
			<nuxt />
		</div>
		<Footer />
	</div>
</template>

<script lang="ts">
export default {
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
		},
		onResize() {
			window.innerWidth > 831 && this.closeSidebar()
		}
	}
}
</script>

<style lang="stylus" scoped>
.main-container
	flex-shrink 0
</style>
