<template>
	<div v-if="footerData" class="bg-raisin-black" role="contentinfo" aria-label="Footer">
		<WrapperContainer class="py3">
			<div class="flex flex-column items-center">
				<WrapperPrismicImage v-if="footerData.data.logo" :field="footerData.data.logo" :size="200" />
				<div v-if="footerData.data.icon_links" class="flex social-links-container mt3">
					<template v-for="(link, i) in footerData.data.icon_links">
						<PrismicLink
							v-if="link.icon"
							:key="i"
							:field="link.link"
							:title="link.alt_text || undefined"
							:aria-label="
								link.link?.url && link.link.link_type === 'Web'
									? commonTranslationsData.data.open_in_new_tab
									: undefined
							"
						>
							<font-awesome-icon :icon="link.icon" size="2xl" />
						</PrismicLink>
					</template>
				</div>
			</div>

			<div v-if="footerData.data.text_links" class="center md-px4 mt3">
				<template v-for="(textLink, index) in footerData.data.text_links">
					<PrismicLink
						:key="index"
						:field="textLink.link"
						class="footer-data no-underline"
						:aria-label="
							textLink.link?.url && textLink.link.link_type === 'Web'
								? commonTranslationsData.data.open_in_new_tab
								: undefined
						"
						>{{ textLink.text }}</PrismicLink
					>
					{{ index < footerData.data.text_links.length - 1 ? ' &#8226; ' : '' }}
				</template>
			</div>
			<div v-if="footerData.data.company_data" class="center md-px4 mt3">
				<PrismicRichText :field="footerData.data.company_data" wrapper="div" class="footer-data" />
			</div>
		</WrapperContainer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		footerData(): any {
			return this.$store.state.prismic.footer
		},
		commonTranslationsData(): any {
			return this.$store.state.prismic.commonTranslations
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
