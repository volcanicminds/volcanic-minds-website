export const state = () => ({
	alternateLanguages: []
})

export const mutations = {
	setAlternateLanguages(state, alternateLanguages) {
		state.alternateLanguages = alternateLanguages
	}
}

export const actions = {
	load(store, altLangs) {
		store.commit('setAlternateLanguages', altLangs)
	}
}
