<template>
	<div class="bg-raisin-black header-container top-0 z4">
		<WrapperContainer class="flex items-center px3 py2">
			<div class="flex-auto">
				<NuxtLink to="/"
					><img loading="lazy" class="logo" src="../assets/images/logo/logo-dark.png" height="50" alt="Logo"
				/></NuxtLink>
			</div>
			<NuxtLink to="/prenota-appuntamento" class="px2 xs-hide sm-hide">Prenota un appuntamento</NuxtLink>
			<NuxtLink to="/documents/VolcanicMinds-pitch.pdf" target="_blank" external class="px2 pr0 xs-hide sm-hide"
				>Scopri di pi&ugrave;</NuxtLink
			>
			<font-awesome-icon
				:icon="['fas', 'bars']"
				class="md-hide lg-hide fa-xl cursor-pointer"
				@click="isSidebarOpened = true"
			/>
		</WrapperContainer>
		<RainbowBar />
	</div>
</template>

<script setup lang="ts">
const isSidebarOpened = useState('isSidebarOpened')
</script>

<style lang="stylus" scoped>
.header-container
	position sticky
	@media screen and (max-width: 40em)
		.logo
			height 30px
</style>
