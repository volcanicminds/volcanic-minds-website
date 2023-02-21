export const state = () => ({
	currentLanguage: '',
	alternateLanguages: {}
})

export const mutations = {
	setAlternateLanguages(state, alternateLanguages) {
		state.alternateLanguages = alternateLanguages
	},
	setCurrentLanguage(state, currentLanguage) {
		state.currentLanguage = currentLanguage
	}
}

export const actions = {
	load(store, { lang, altLangs }) {
		store.commit('setCurrentLanguage', lang)
		store.commit('setAlternateLanguages', altLangs)
	}
}
