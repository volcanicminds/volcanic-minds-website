import Breadcrumbs from './components/Breadcrumbs.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import Loading from './components/Loading.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import Observer from './components/Observer.vue'
import RainbowBar from './components/RainbowBar.vue'
import Sidebar from './components/Sidebar.vue'
import TimelineSection from './components/TimelineSection.vue'
import WrapperContainer from './components/wrapper/Container.vue'
import WrapperPrismicImage from './components/wrapper/PrismicImage.vue'
import WrapperSlice from './components/wrapper/Slice.vue'

declare module 'vue' {
	export interface GlobalComponents {
		Breadcrumbs: typeof Breadcrumbs
		Footer: typeof Footer
		Header: typeof Header
		LanguageSelector: typeof LanguageSelector
		Loading: typeof Loading
		NavigationMenu: typeof NavigationMenu
		Observer: typeof Observer
		RainbowBar: typeof RainbowBar
		Sidebar: typeof Sidebar
		TimelineSection: typeof TimelineSection
		WrapperContainer: typeof WrapperContainer
		WrapperPrismicImage: typeof WrapperPrismicImage
		WrapperSlice: typeof WrapperSlice
	}
}

export {}
