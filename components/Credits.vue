<template>
	<WrapperContainer class="mt4">
		<h2 v-if="tags.length" class="h4">
			Tag:
			<span v-for="(tag, i) in tags" :key="i" class="tag bg-cultured raisin-black font-bold ml1 uppercase">{{
				tag
			}}</span>
		</h2>
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
	font-size 12px
	padding 3px 6px

.date
	font-size 16px
</style>
