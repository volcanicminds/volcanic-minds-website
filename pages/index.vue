<template>
	<div>
		<slice-zone :components="components" :slices="document.data.slices" />
		<div class="relative">
			<img class="bkg-image absolute top-0 col-12 left-0 h100" src="../assets/images/background.png" alt="Background" />
			<WrapperContainer class="py4">
				<h1 class="uppercase mt2"><span class="font-thin">Volcanic</span><br />Minds</h1>
				<p class="description">
					Siamo una
					<span class="bold red-pigment">digital experience company</span>.<br />
					La nostra passione? Realizzare il miglior prodotto per i nostri partner.<br />
				</p>

				<div class="center mt2 mb2">
					<NuxtLink to="/documents/VolcanicMinds-pitch.pdf" class="btn btn-primary btn-big" target="_blank" external
						>SCOPRI DI PI&Ugrave;</NuxtLink
					>
				</div>
			</WrapperContainer>
		</div>
		<WrapperContainer>
			<WrapperCard class="left-align">
				<p class="h2 mt0">ciao</p>
				<p class="m0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
			</WrapperCard>
		</WrapperContainer>
	</div>
</template>

<script>
import { components } from '~/slices'

export default {
	async asyncData({ $prismic, params, error }) {
		const document = await $prismic.api.getByUID('homepage', 'homepage')
		if (document) {
			return { document }
		} else {
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	data: function () {
		return { components }
	}
}
</script>

<script setup>
useHead({
	title: 'Volcanic Minds • Home',
	meta: [
		{
			name: 'description',
			content:
				'Volcanic Minds è una digital experience company. La nostra passione? Realizzare il miglior prodotto per i nostri partner.'
		}
	]
})
</script>

<style lang="stylus" scoped>
.bkg-image
	object-fit cover
	z-index -1

h1
	line-height 54px
	font-size 75px
	@media screen and (min-width: 40em)
		line-height 71px
		font-size 100px
	.font-thin
		font-size 54px
		@media screen and (min-width: 40em)
			font-size 71px
.description
	font-size 25px
	font-weight 300

.carousel-image
	object-fit contain
	height 100px
	width 200px
</style>
