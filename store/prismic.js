export const state = () => ({
	currentLanguage: '',
	alternateLanguages: {},
	isSidebarOpened: false
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
	}
}

export const actions = {
	load(store, { lang, altLangs }) {
		store.commit('setCurrentLanguage', lang)
		store.commit('setAlternateLanguages', altLangs)
	}
}
