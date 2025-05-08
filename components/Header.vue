<template>
	<div v-if="headerData" class="bg-raisin-black-95 header-container top-0 z3">
		<WrapperContainer class="flex items-center px3 py2">
			<div v-if="headerData.data.logo" class="flex flex-auto">
				<NuxtLink :to="localePath('/')" class="logo" title="Home">
					<WrapperPrismicImage
						:field="headerData.data.logo"
						:size="50"
						resize-by-height
						class="contain position-left col-12 h100"
					/>
				</NuxtLink>
			</div>

			<NavigationMenu />

			<font-awesome-icon
				:icon="['fas', 'bars']"
				class="md-hide lg-hide fa-xl cursor-pointer ml3"
				:title="headerData.data.open_sidebar_label || 'Open sidebar'"
				role="button"
				@click="openSidebar"
			/>
		</WrapperContainer>

		<RainbowBar :height="3" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		headerData(): any {
			return this.$store.state.prismic.header
		}
	},
	methods: {
		openSidebar(): void {
			this.$store.commit('prismic/setIsSidebarOpened', true)
			if (process.client) {
				document.body.style.overflow = 'hidden'
			}
		}
	}
})
</script>

<style lang="stylus" scoped>
.header-container
	position sticky
	backdrop-filter blur(5px)
	.logo
		width 130px
		height 50px
	@media (max-width: 52em)
		.logo
			width 80px
			height 30px
</style>
