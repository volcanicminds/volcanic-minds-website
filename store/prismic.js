export const state = () => ({
	currentLanguage: '',
	alternateLanguages: {},
	isSidebarOpened: false,
	header: {}
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
	}
}

export const actions = {
	async load(store, { lang, altLangs }) {
		const header = await this.$prismic.api.getSingle('header', { lang })
		store.commit('setHeader', header)
		store.commit('setCurrentLanguage', lang)
		store.commit('setAlternateLanguages', altLangs)
	}
}
