<template>
	<div v-if="footerData" class="bg-raisin-black">
		<WrapperContainer class="py3">
			<div class="flex flex-wrap items-center">
				<div class="flex flex-column items-center">
					<WrapperPrismicImage :field="footerData.data.logo" :size="200" />
					<div class="flex social-links-container mt2">
						<template v-for="(link, i) in footerData.data.links">
							<PrismicLink :key="i" :field="link.link">
								<font-awesome-icon :icon="link.icon" size="2xl" />
							</PrismicLink>
						</template>
					</div>
				</div>
				<PrismicRichText
					:field="footerData.data.company_data"
					wrapper="div"
					class="right-align flex-auto company-data"
				/>
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

.company-data
	font-size 14px
</style>
