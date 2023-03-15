import Breadcrumbs from './components/Breadcrumbs.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Loading from './components/Loading.vue'
import RainbowBar from './components/RainbowBar.vue'
import Sidebar from './components/Sidebar.vue'
import WrapperCard from './components/wrapper/Card.vue'
import WrapperContainer from './components/wrapper/Container.vue'
import WrapperPrismicImage from './components/wrapper/PrismicImage.vue'
import WrapperSlice from './components/wrapper/Slice.vue'

declare module 'vue' {
	interface GlobalComponents {
		Breadcrumbs: typeof Breadcrumbs
		Footer: typeof Footer
		Header: typeof Header
		Loading: typeof Loading
		RainbowBar: typeof RainbowBar
		Sidebar: typeof Sidebar
		WrapperCard: typeof WrapperCard
		WrapperContainer: typeof WrapperContainer
		WrapperPrismicImage: typeof WrapperPrismicImage
		WrapperSlice: typeof WrapperSlice
	}
}
