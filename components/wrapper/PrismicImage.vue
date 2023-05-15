<template>
	<img
		v-if="Object.keys(field).length"
		:loading="lazy ? 'lazy' : 'eager'"
		:src="getPrismicImageSrc()"
		:srcset="getPrismicImageSrcset()"
		:alt="field.alt || 'image'"
	/>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		resizeByHeight?: boolean
		size?: number
		field: any
		lazy?: boolean
	}>(),
	{
		resizeByHeight: false,
		size: 1300,
		lazy: true
	}
)

function getPrismicImageSrc(): any {
	if (props.field.url.includes('.svg')) {
		return props.field.url // do not perform any modifications on SVG files, due to Prismic security check
	}
	if (props.resizeByHeight) {
		return props.field.url + `&h=${props.size}` + '&fit=max'
	}
	return props.field.url + `&w=${props.size}` + '&fit=max'
}

function getPrismicImageSrcset(): string | undefined {
	if (props.field.url.includes('.svg')) {
		return undefined // if file is SVG, provide no srcset
	}
	return getPrismicImageSrc() + '&dpr=1 1x,' + getPrismicImageSrc() + '&dpr=2 2x,' + getPrismicImageSrc() + '&dpr=3 3x'
}
</script>
