<template>
	<WrapperSlice
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer class="center">
			<div v-if="slice.primary.title" class="mb2">
				<div class="h2 m0">{{ slice.primary.title }}</div>
			</div>
			<div class="flex flex-wrap social-sharing justify-center">
				<button class="btn linkedin" @click="shareOn('linkedin')">
					<font-awesome-icon :icon="['fab', 'linkedin-in']" size="sm" />
				</button>
				<button class="btn twitter" @click="shareOn('twitter')">
					<font-awesome-icon :icon="['fab', 'x-twitter']" size="sm" />
				</button>
				<button class="btn facebook" @click="shareOn('facebook')">
					<font-awesome-icon :icon="['fab', 'facebook-f']" size="sm" />
				</button>
			</div>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
	name: 'SocialShare'
})
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})

// Get URL from client
const pageUrl = computed(() => (process.client ? encodeURIComponent(window.location.href) : ''))

// Custom text
const tweetText = encodeURIComponent("Dai un'occhiata a questo articolo!")

const shareOn = (platform: string) => {
	let shareUrl = ''

	switch (platform) {
		case 'facebook':
			shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl.value}`
			break
		case 'twitter':
			shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl.value}&text=${tweetText}`
			break
		case 'linkedin':
			shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl.value}`
			break
	}

	if (shareUrl) {
		window.open(shareUrl, '_blank', 'width=600,height=400')
	}
}
</script>

<style lang="stylus" scoped>
.social-sharing
	gap 10px

.facebook
	background-color #1877F2

.twitter
	background-color black

.linkedin
	background-color #0077B5

.btn:hover
	opacity 0.8
</style>
