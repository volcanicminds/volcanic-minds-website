<template>
	<Transition name="sidebar">
		<div v-if="isSidebarOpened" class="fixed z4 col-12 h100 bg-raisin-black left-0 top-0">
			<WrapperContainer class="py3">
				<div class="right">
					<font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl cursor-pointer" @click="closeSidebar" />
				</div>
				<div class="py3 center">
					<template v-if="headerData">
						<template v-for="(link, i) in headerData.data.links">
							<PrismicLink :key="i" class="block my2 h2" :field="link.link_url">{{ link.link_title }}</PrismicLink>
						</template>
					</template>
				</div>
			</WrapperContainer>
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
		}
	},
	methods: {
		closeSidebar() {
			this.$store.commit('prismic/setIsSidebarOpened', false)
		}
	}
})
</script>

<style lang="stylus" scoped>
.sidebar-enter-active
.sidebar-leave-active
	transition all 0.4s

.sidebar-enter
.sidebar-leave-to
	opacity 0
</style>
