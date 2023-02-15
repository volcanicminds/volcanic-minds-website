import WrapperContainer from './components/wrapper/Container.vue'
import WrapperCard from './components/wrapper/Card.vue'

declare module 'vue' {
	interface GlobalComponents {
		WrapperContainer: typeof WrapperContainer
		WrapperCard: typeof WrapperCard
	}
}
