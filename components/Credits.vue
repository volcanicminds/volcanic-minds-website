<template>
	<WrapperContainer class="mt4">
		<div class="flex items-center mb2">
			<h5 class="my0 h4 mr1">Tag:</h5>
			<span v-for="(tag, i) in tags" :key="i" class="p1 tag bg-shark font-bold mr1 uppercase">{{ tag }}</span>
		</div>
		<p v-if="publicationDate" class="m0 date">{{ publicationDateLabel }}: {{ publicationDate }}</p>
		<p v-if="latestRevisionDate" class="m0 date">{{ latestRevisionDateLabel }}: {{ latestRevisionDate }}</p>
	</WrapperContainer>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		tags: Array<string>
		publicationDate: any
		publicationDateLabel: any
		latestRevisionDate: any
		latestRevisionDateLabel: any
	}>(),
	{}
)
</script>

<style lang="stylus" scoped>
.tag
	border-radius 4px
	font-size 14px

.date
	font-size 16px
</style>
