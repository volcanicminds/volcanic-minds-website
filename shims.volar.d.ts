import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import WrapperCard from './components/wrapper/Card.vue'
import WrapperContainer from './components/wrapper/Container.vue'

declare module 'vue' {
	interface GlobalComponents {
		Footer: typeof Footer
		Header: typeof Header
		Sidebar: typeof Sidebar
		WrapperCard: typeof WrapperCard
		WrapperContainer: typeof WrapperContainer
	}
}
