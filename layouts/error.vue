<template>
	<p>Pagina non trovata</p>
</template>

<script setup lang="ts">
const router = useRouter()
router.push({ path: '/404' })
</script>
