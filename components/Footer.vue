<template>
	<div v-if="footerData" class="bg-raisin-black">
		<WrapperContainer class="center py3">
			<div class="flex justify-center social-links-container">
				<template v-for="(link, i) in footerData.data.links">
					<PrismicLink :key="i" :field="link.link">
						<font-awesome-icon :icon="link.icon" size="2xl" />
					</PrismicLink>
				</template>
			</div>
			<PrismicRichText :field="footerData.data.company_data" wrapper="p" />
		</WrapperContainer>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		footerData() {
			return this.$store.state.prismic.footer
		}
	}
})
</script>

<style lang="stylus" scoped>
.social-links-container
	gap 40px
	@media screen and (min-width: 40em)
		gap 60px
</style>
