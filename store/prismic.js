export const state = () => ({
	currentLanguage: '',
	alternateLanguages: {},
	isSidebarOpened: false,
	header: undefined,
	commonTranslations: undefined,
	navigationMenu: undefined,
	footer: undefined
})

export const mutations = {
	setAlternateLanguages(state, alternateLanguages) {
		state.alternateLanguages = alternateLanguages
	},
	setCurrentLanguage(state, currentLanguage) {
		state.currentLanguage = currentLanguage
	},
	setIsSidebarOpened(state, isSidebarOpened) {
		state.isSidebarOpened = isSidebarOpened
	},
	setHeader(state, header) {
		state.header = header
	},
	setCommonTranslations(state, commonTranslations) {
		state.commonTranslations = commonTranslations
	},
	setNavigationMenu(state, navigationMenu) {
		state.navigationMenu = navigationMenu
	},
	setFooter(state, footer) {
		state.footer = footer
	}
}

export const actions = {
	async load(store, { lang, altLangs }) {
		const header = await this.$prismic.api.getSingle('header', { lang })
		const navigationMenu = await this.$prismic.api.getSingle('navigation_menu', { lang })
		const commonTranslations = await this.$prismic.api.getSingle('common_translations', { lang })
		const footer = await this.$prismic.api.getSingle('footer', { lang })
		store.commit('setHeader', header)
		store.commit('setNavigationMenu', navigationMenu)
		store.commit('setCommonTranslations', commonTranslations)
		store.commit('setFooter', footer)
		store.commit('setCurrentLanguage', lang)
		store.commit('setAlternateLanguages', altLangs)
	}
}
