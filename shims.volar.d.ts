import Breadcrumbs from './components/Breadcrumbs.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Loading from './components/Loading.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import Observer from './components/Observer.vue'
import RainbowBar from './components/RainbowBar.vue'
import Sidebar from './components/Sidebar.vue'
import WrapperContainer from './components/wrapper/Container.vue'
import WrapperPrismicImage from './components/wrapper/PrismicImage.vue'
import WrapperSlice from './components/wrapper/Slice.vue'

declare module 'vue' {
	interface GlobalComponents {
		Breadcrumbs: typeof Breadcrumbs
		Footer: typeof Footer
		Header: typeof Header
		Loading: typeof Loading
		NavigationMenu: typeof NavigationMenu
		Observer: typeof Observer
		RainbowBar: typeof RainbowBar
		Sidebar: typeof Sidebar
		WrapperContainer: typeof WrapperContainer
		WrapperPrismicImage: typeof WrapperPrismicImage
		WrapperSlice: typeof WrapperSlice
	}
}
