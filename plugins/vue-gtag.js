import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
	enabled: process.env.NODE_ENV === 'production',
	config: { id: 'G-7F4GLM9RZL' }
})
