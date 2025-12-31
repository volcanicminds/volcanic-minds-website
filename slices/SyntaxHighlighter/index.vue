<template>
	<WrapperSlice
		v-if="slice.primary.code"
		:margin-top="slice.primary.margin_top || false"
		:margin-bottom="slice.primary.margin_bottom || false"
		:enable-observer="slice.primary.enable_animation || false"
	>
		<WrapperContainer>
			<pre>
				<div 
					class="overflow-auto p2 code-container" 
					:style="{ maxHeight: `${slice.primary.max_height}px` }"
				>
					<code 
						:class="`language-${slice.primary.language}`" 
						v-html="highlightedCode"
					></code>
				</div>
			</pre>
		</WrapperContainer>
	</WrapperSlice>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
	name: 'SyntaxHighlighter'
})
</script>

<script setup lang="ts">
const props = defineProps({
	slice: {
		type: Object,
		required: true
	}
})

const hljsCore = ref<any>(null)

onMounted(async () => {
	import('highlight.js/styles/monokai.css')

	const [hljs, javascript, typescript] = await Promise.all([
		import('highlight.js/lib/core'),
		import('highlight.js/lib/languages/javascript'),
		import('highlight.js/lib/languages/typescript')
	])

	hljs.default.registerLanguage('javascript', javascript.default)
	hljs.default.registerLanguage('typescript', typescript.default)
	hljsCore.value = hljs.default
})

const highlightedCode = computed(() => {
	const code = props.slice.primary.code || ''
	const lang = props.slice.primary.language || 'javascript'
	if (!hljsCore.value) {
		return code
	}

	return hljsCore.value.highlight(code, { language: lang }).value
})
</script>

<style lang="stylus" scoped>
pre
	background #282c34
	box-shadow 7px 7px 15px 0 #0000004d
	border-radius 15px
	.code-container
		line-height 1.3
		font-size 0.8em
</style>
