<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<lite-youtube :videoid="slice.primary.video_id" :videotitle="slice.primary.video_title" autoload nocookie>
				<a class="lite-youtube-fallback" :href="`https://www.youtube.com/watch?v=${slice.primary.video_id}`">{{
					slice.primary.video_title
				}}</a>
				<WrapperPrismicImage
					v-if="slice.primary.video_preview"
					is-img-slot
					:field="slice.primary.video_preview"
					:size="2000"
				/>
			</lite-youtube>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
	name: 'YoutubeEmbed'
})
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})
onMounted(() => {
	if (process.client) {
		import('@justinribeiro/lite-youtube')
	}
})
</script>

<style lang="stylus" scoped>
lite-youtube
	--lite-youtube-frame-shadow-visible no

.lite-youtube-fallback
	aspect-ratio 16 / 9
	display flex
	justify-content center
	align-items center
	flex-direction column
	gap 1em
	padding 1em
	background-color #000
	color #fff
	text-decoration none

	&::before
		display block
		content ''
		border solid transparent
		border-width 2em 0 2em 3em
		border-left-color red

	&:hover::before
		border-left-color #fff

	&:focus
		outline 2px solid red
</style>
