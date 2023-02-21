<template>
	<div class="card p4 my4">
		<slot />
	</div>
</template>

<style scoped>
.card {
	border-radius: 50px;
	background: linear-gradient(145deg, #1b1b20, #202027);
	box-shadow: 20px 20px 60px #1a1a1f, -20px -20px 60px #232329;
}
</style>
