<template>
	<section class="lang-switcher">
		<nuxt-link v-for="altLang in altLangs.results" :key="altLang.id" :to="altLang.url" class="block">
			<span>{{ altLang.lang }}</span>
		</nuxt-link>
	</section>
</template>

<script setup lang="ts">
defineProps({
	altLangs: {
		type: Object,
		required: true
	}
})
</script>
