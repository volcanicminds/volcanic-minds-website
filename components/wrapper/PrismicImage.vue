<template>
	<img
		v-if="Object.keys(field).length"
		:slot="isImgSlot ? 'image' : undefined"
		:loading="lazy ? 'lazy' : 'eager'"
		:src="getPrismicImageSrc(size)"
		:srcset="getPrismicImageSrcset()"
		:sizes="sizes"
		:alt="field.alt || 'image'"
		:fetchpriority="fetchpriority"
	/>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		resizeByHeight?: boolean
		size?: number
		field: any
		lazy?: boolean
		isImgSlot?: boolean
		widths?: number[]
		sizes?: string
		fetchpriority?: 'high' | 'low' | 'auto'
	}>(),
	{
		resizeByHeight: false,
		size: 1300,
		lazy: true,
		isImgSlot: false,
		widths: () => [375, 640, 828, 1080, 1200, 1920, 2048],
		sizes: '100vw',
		fetchpriority: 'auto'
	}
)

function getPrismicImageSrc(w?: number): any {
	if (!props.field.url) return ''
	if (props.field.url.includes('.svg')) {
		return props.field.url
	}

	const baseUrl = props.field.url + (props.field.url.includes('?') ? '' : '?') + '&auto=format,compress&fit=max'

	if (props.resizeByHeight) {
		return baseUrl + `&h=${w || props.size}`
	}
	return baseUrl + `&w=${w || props.size}`
}

function getPrismicImageSrcset(): string | undefined {
	if (!props.field.url || props.field.url.includes('.svg')) {
		return undefined
	}

	// Se l'immagine è volutamente piccola (come nell'Hero), limitiamo il srcset alla dimensione richiesta
	const targetWidths = props.size < 1200 ? props.widths.filter((w) => w <= props.size * 2) : props.widths

	return targetWidths.map((w) => `${getPrismicImageSrc(w)} ${w}w`).join(', ')
}
</script>
