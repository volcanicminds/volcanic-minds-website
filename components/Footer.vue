<template>
	<div v-if="footerData" class="bg-raisin-black" role="contentinfo" aria-label="Footer">
		<WrapperContainer class="py3">
			<div class="flex flex-column items-center">
				<WrapperPrismicImage v-if="footerData.data.logo" :field="footerData.data.logo" :size="200" />
				<div v-if="footerData.data.icon_links" class="flex social-links-container mt3">
					<template v-for="(link, i) in footerData.data.icon_links">
						<PrismicLink v-if="link.icon" :key="i" :field="link.link" :aria-label="link.alt_text">
							<font-awesome-icon :icon="link.icon" size="2xl" />
						</PrismicLink>
					</template>
				</div>
			</div>

			<div v-if="footerData.data.text_links" class="center md-px4 mt3">
				<PrismicLink
					v-for="(textLink, index) in footerData.data.text_links"
					:key="index"
					:field="textLink.link"
					class="footer-data no-underline"
					:aria-label="
						textLink.link && textLink.link.target && textLink.link.target === '_blank' ? openInNewTabLabel : ''
					"
					>{{ textLink.text }}{{ index < footerData.data.text_links.length - 1 ? ' &#8226; ' : '' }}</PrismicLink
				>
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
		},
		openInNewTabLabel() {
			return this.$store.state.prismic.genericSettings.data.open_in_new_tab_label
		}
	}
})
</script>

<style lang="stylus" scoped>
.social-links-container
	gap 30px

.footer-data
	font-size 0.9rem
</style>
