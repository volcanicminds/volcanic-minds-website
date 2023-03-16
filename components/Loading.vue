<template>
	<Transition name="loading">
		<div
			v-if="loading"
			class="loading-page top-0 left-0 col-12 h100 fixed flex flex-column items-center justify-center"
		>
			<img loading="lazy" class="logo" src="~/assets/images/logo/logo-dark.png" height="50" alt="Logo" />
			<div class="spinner mt3" />
		</div>
	</Transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data: () => ({
		loading: false
	}),
	methods: {
		start() {
			this.loading = true
		},
		finish() {
			setTimeout(() => (this.loading = false), 800)
		}
	}
})
</script>

<style lang="stylus" scoped>
.loading-page
	background var(--raisin-black)
	z-index 9999
	backdrop-filter blur(5px)
	.spinner
		width 30px
		background var(--rainbow-gradient)
		height 30px
		border-radius 50%
		animation pulse-animation 2s infinite
.loading-enter-active
.loading-leave-active
	transition all 0.4s

.loading-enter
.loading-leave-to
	opacity 0

@keyframes pulse-animation
	0%
		box-shadow 0 0 0 0px rgba(255, 255, 255, 0.2)
	100%
		box-shadow 0 0 0 20px rgba(255, 255, 255, 0)
</style>
