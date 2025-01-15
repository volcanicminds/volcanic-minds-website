<template>
	<WrapperSlice
		v-if="slice.primary.code"
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<pre><div class="overflow-auto p1 code-container" :style="{ maxHeight: `${slice.primary.max_height}px` }"><code :class="`language-${slice.primary.language}`" v-html="hljs.highlight(slice.primary.code, { language: slice.primary.language }).value"></code></div></pre>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)

export default defineComponent({
	name: 'SyntaxHighlighter'
})
</script>

<script setup lang="ts">
defineProps({
	slice: {
		type: Object,
		required: true
	}
})
</script>

<style lang="stylus" scoped>
pre
	background #282c34
	box-shadow 7px 7px 15px 0 #0000004d
	.code-container
		line-height 1.3
		font-size 0.8em
</style>
