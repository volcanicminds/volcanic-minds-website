<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<lite-youtube :videoid="slice.primary.video_id"></lite-youtube>
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

<style lang="stylus" scoped></style>
