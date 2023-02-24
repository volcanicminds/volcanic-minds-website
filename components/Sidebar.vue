<template>
	<Transition name="sidebar">
		<div v-if="isSidebarOpened" class="fixed z4 col-12 h100 bg-raisin-black left-0 top-0">
			<WrapperContainer class="py3">
				<font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl cursor-pointer" @click="closeSidebar" />
				<div class="py3 center">
					<NuxtLink to="/documents/VolcanicMinds-pitch.pdf" target="_blank" external class="block my2 h2"
						>Scopri di pi&ugrave;</NuxtLink
					>
				</div>
			</WrapperContainer>
		</div>
	</Transition>
</template>

<script>
export default {
	computed: {
		isSidebarOpened() {
			return this.$store.state.prismic.isSidebarOpened
		}
	},
	methods: {
		closeSidebar() {
			this.$store.commit('prismic/setIsSidebarOpened', false)
		}
	}
}
</script>

<style lang="stylus" scoped>
.sidebar-enter-active
.sidebar-leave-active
	transition opacity 0.5s ease

.sidebar-enter
.sidebar-leave-to
	opacity 0
</style>
