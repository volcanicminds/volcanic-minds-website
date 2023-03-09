export const state = () => ({
	currentLanguage: '',
	alternateLanguages: {},
	isSidebarOpened: false,
	header: undefined,
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
	setFooter(state, footer) {
		state.footer = footer
	}
}

export const actions = {
	async load(store, { lang, altLangs }) {
		const header = await this.$prismic.api.getSingle('header', { lang })
		const footer = await this.$prismic.api.getSingle('footer', { lang })
		store.commit('setHeader', header)
		store.commit('setFooter', footer)
		store.commit('setCurrentLanguage', lang)
		store.commit('setAlternateLanguages', altLangs)
	}
}
