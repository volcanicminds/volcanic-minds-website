export const seoTitle = 'Volcanic Minds | Smart, Fast, Efficient'
export const seoDescription =
	'Volcanic Minds è la Digital Experience Company e Software House di Torino specializzata in sviluppo software custom, architetture Cloud, SaaS e integrazione di Intelligenza Artificiale per Enterprise e Startup.'
export const seoSiteName = 'Volcanic Minds'
export const seoImageUrl = '/open-graph.png'
export const logo = '/logo.png'
export const author = 'Volcanic Minds'
export const schemaOrgType = 'WebPage'

export const ogTitle = 'Volcanic Minds | Smart, Fast, Efficient'
export const ogDescription =
	'Trasformiamo le sfide di business in soluzioni digitali. Sviluppo Web, AI, Cloud Architecture e Design Strategy per accelerare la tua crescita.'

export const schemaOrganization = {
	'@type': 'ProfessionalService',
	name: 'Volcanic Minds',
	image:
		'https://images.prismic.io/volcanic-website/3ca43570-29b0-47c7-8205-06ca7537fd03_Volcanic+Minds.png?auto=compress,format',
	'@id': 'https://volcanicminds.com/#organization',
	url: 'https://volcanicminds.com',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Corso Vinzaglio 24',
		addressLocality: 'Torino',
		postalCode: '10121',
		addressCountry: 'IT'
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 45.06837,
		longitude: 7.66863
	},
	sameAs: [
		'https://www.linkedin.com/company/volcanic-minds',
		'https://github.com/volcanicminds',
		'https://playbook.volcanicminds.com'
	]
}

export const defaultKnowsAbout = [
	'Software Engineering',
	'Artificial Intelligence (AI)',
	'Cloud Native Architecture',
	'SaaS Development',
	'Generative AI',
	'Digital Transformation',
	'RAG (Retrieval-Augmented Generation)',
	'UX/UI Design'
]

export const defaultMakesOffer = [
	{
		'@type': 'Offer',
		itemOffered: {
			'@type': 'Service',
			name: 'Sviluppo Software Custom',
			description: 'Realizzazione di piattaforme enterprise e applicazioni web su misura.'
		}
	},
	{
		'@type': 'Offer',
		itemOffered: {
			'@type': 'Service',
			name: 'Integrazione AI & Data Intelligence',
			description: 'Sviluppo di agenti AI, sistemi RAG e automazione processi aziendali.'
		}
	},
	{
		'@type': 'Offer',
		itemOffered: {
			'@type': 'Service',
			name: 'Digital Factory',
			description: 'Sviluppo frontend, backend e architetture cloud scalabili.'
		}
	}
]
