<template>
	<Transition name="sidebar">
		<div v-if="isSidebarOpened" class="fixed z2 col-12 h100 bg-raisin-black left-0 top-0">
			<WrapperContainer class="py3">
				<font-awesome-icon
					:icon="['fas', 'xmark']"
					class="fa-xl cursor-pointer"
					@click="isSidebarOpened = !isSidebarOpened"
				/>
				<div class="py3 center">
					<NuxtLink to="/prenota-appuntamento" class="block my2 h2">Prenota un appuntamento</NuxtLink>
					<NuxtLink to="/documents/VolcanicMinds-pitch.pdf" target="_blank" external class="block my2 h2"
						>Scopri di pi&ugrave;</NuxtLink
					>
				</div>
			</WrapperContainer>
		</div>
	</Transition>
</template>

<script setup lang="ts">
const isSidebarOpened = useState('isSidebarOpened', () => false)

watch(isSidebarOpened, (newValue, _oldValue) => {
	if (newValue) {
		document.body.classList.add('overflow-hidden')
	} else {
		document.body.classList.remove('overflow-hidden')
	}
})
</script>

<style lang="stylus" scoped>
.sidebar-enter-active
.sidebar-leave-active
	transition opacity 0.5s ease

.sidebar-enter-from
.sidebar-leave-to
	opacity 0
</style>
