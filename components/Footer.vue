<template>
	<div v-if="footerData" class="bg-raisin-black">
		<WrapperContainer class="py3">
			<div class="flex flex-column items-center">
				<WrapperPrismicImage v-if="footerData.data.logo" :field="footerData.data.logo" :size="200" />
				<div v-if="footerData.data.links" class="flex social-links-container mt3">
					<template v-for="(link, i) in footerData.data.links">
						<PrismicLink :key="i" :field="link.link" :aria-label="link.alt_text">
							<font-awesome-icon :icon="link.icon" size="2xl" />
						</PrismicLink>
					</template>
				</div>
			</div>
			<div v-if="footerData.data.site_data" class="center md-px4 mt3">
				<PrismicRichText :field="footerData.data.site_data" wrapper="div" class="footer-data" />
			</div>
			<div v-if="footerData.data.company_data" class="center md-px4 mt3">
				<PrismicRichText :field="footerData.data.company_data" wrapper="div" class="footer-data" />
			</div>
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
	gap 30px

.footer-data
	font-size 14px
</style>
