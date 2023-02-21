<template>
	<div class="global-container flex flex-column">
		<Sidebar />
		<Header />
		<div class="col-12 flex-auto flex flex-column main-container">
			<nuxt />
		</div>
		<Footer />
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const isSidebarOpened = useState('isSidebarOpened')
watch(
	() => route.query,
	() => closeSidebar()
)
onMounted(() => {
	window.addEventListener('resize', windowResize)
})
onUnmounted(() => {
	window.removeEventListener('resize', windowResize)
})
function windowResize(e: any) {
	e.target.window.innerWidth > 831 && closeSidebar()
}

function closeSidebar() {
	isSidebarOpened.value = false
}
</script>

<style lang="stylus" scoped>
.main-container
	flex-shrink 0
</style>
