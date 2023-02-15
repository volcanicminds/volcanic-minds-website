<template>
	<div class="bg-raisin-black-2">
		<WrapperContainer class="center py3">
			<div class="flex justify-center social-links-container">
				<NuxtLink external target="_blank" aria-label="Send email" to="mailto:info@volcanicminds.com">
					<img loading="lazy" class="social-logo" src="../assets/images/icons/email.png" alt="Email" />
				</NuxtLink>
				<NuxtLink
					external
					target="_blank"
					aria-label="Follow us on LinkedIn"
					to="https://www.linkedin.com/company/volcanic-minds"
				>
					<img loading="lazy" class="social-logo" src="../assets/images/icons/linkedin.png" alt="LinkedIn" />
				</NuxtLink>
				<NuxtLink
					external
					target="_blank"
					aria-label="Follow us on Instagram"
					to="https://www.instagram.com/volcanic_minds/"
				>
					<img loading="lazy" class="social-logo" src="../assets/images/icons/instagram.png" alt="Instagram" />
				</NuxtLink>
			</div>
			<p class="mb0">
				<small
					>Volcanic Minds S.r.l. - Corso Vinzaglio 24, 10121 Torino (TO) - P. Iva 127<span></span>543<span
					></span>300<span></span>12</small
				>
			</p>
		</WrapperContainer>
	</div>
</template>

<style lang="stylus" scoped>
.social-links-container
	gap 40px
	@media screen and (min-width: 40em)
		gap 60px
	.social-logo
		height 30px
		@media screen and (min-width: 40em)
			height 45px
</style>
