export const seoTitle = 'Volcanic Minds | Smart, Fast, Efficient'
export const seoDescription =
	'Software House Torino e partner innovativo. Sviluppiamo SaaS, software custom e soluzioni Enterprise. Integriamo Cloud Native e Agenti AI per massimizzare il ROI.'
export const seoSiteName = 'Volcanic Minds'
export const seoImageUrl = '/open-graph.png'
export const logo = '/logo.png'
export const author = 'Volcanic Minds'
export const schemaOrgType = 'WebPage'

export const ogTitle = 'Volcanic Minds | Smart, Fast, Efficient'
export const ogDescription =
	"Più che fornitori, partner per l'innovazione. Sviluppiamo Software, SaaS e Soluzioni AI Enterprise unendo ingegneria Cloud Native e Design UX/UI accessibili per far scalare il tuo business."

const address = {
	'@type': 'PostalAddress',
	streetAddress: 'Corso Vinzaglio 24',
	addressLocality: 'Torino',
	postalCode: '10121',
	addressCountry: 'IT'
}

const geo = {
	'@type': 'GeoCoordinates',
	latitude: 45.06837,
	longitude: 7.66863
}

export const areaServed = {
	it: [
		{ '@type': 'City', name: 'Torino' },
		{ '@type': 'City', name: 'Milano' },
		{ '@type': 'AdministrativeArea', name: 'Piemonte' },
		{ '@type': 'AdministrativeArea', name: 'Lombardia' },
		{ '@type': 'AdministrativeArea', name: 'Liguria' },
		{ '@type': 'AdministrativeArea', name: "Valle d'Aosta" },
		{ '@type': 'AdministrativeArea', name: 'Veneto' },
		{ '@type': 'AdministrativeArea', name: 'Trentino-Alto Adige' },
		{ '@type': 'AdministrativeArea', name: 'Emilia-Romagna' },
		{ '@type': 'AdministrativeArea', name: 'Toscana' },
		{ '@type': 'Country', name: 'Italia' },
		{ '@type': 'Continent', name: 'Europa' }
	],
	en: [
		{ '@type': 'Country', name: 'Italy' },
		{ '@type': 'Country', name: 'Switzerland' },
		{ '@type': 'Country', name: 'Germany' },
		{ '@type': 'Country', name: 'Austria' },
		{ '@type': 'Country', name: 'France' },
		{ '@type': 'Country', name: 'United Kingdom' },
		{ '@type': 'Country', name: 'Ireland' },
		{ '@type': 'Country', name: 'Sweden' },
		{ '@type': 'Country', name: 'Norway' },
		{ '@type': 'Country', name: 'Denmark' },
		{ '@type': 'Country', name: 'Netherlands' },
		{ '@type': 'Country', name: 'United States' },
		{ '@type': 'Country', name: 'United Arab Emirates' },
		{ '@type': 'Continent', name: 'Europe' },
		{ '@type': 'Continent', name: 'North America' }
	]
}

export const contactPoints = [
	{
		'@type': 'ContactPoint',
		contactType: 'sales',
		email: 'info@volcanicminds.com',
		areaServed: 'Worldwide',
		availableLanguage: ['English', 'Italian']
	},
	{
		'@type': 'ContactPoint',
		contactType: 'hr',
		email: 'hr@volcanicminds.com',
		areaServed: 'Worldwide',
		availableLanguage: ['English', 'Italian']
	},
	{
		'@type': 'ContactPoint',
		contactType: 'partnership',
		email: 'partner@volcanicminds.com',
		areaServed: 'Worldwide',
		availableLanguage: ['English', 'Italian']
	},
	{
		'@type': 'ContactPoint',
		contactType: 'sponsorship',
		email: 'sponsor@volcanicminds.com',
		areaServed: 'Italy',
		availableLanguage: ['English', 'Italian']
	}
]

export const schemaOrganization = {
	'@type': 'ProfessionalService',
	name: 'Volcanic Minds',
	image:
		'https://images.prismic.io/volcanic-website/3ca43570-29b0-47c7-8205-06ca7537fd03_Volcanic+Minds.png?auto=compress,format',
	'@id': 'https://volcanicminds.com/#organization',
	url: 'https://volcanicminds.com',
	priceRange: '€€-€€€',
	address,
	geo,
	areaServed: areaServed.it,
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

export const defaultMakesOffer = {
	it: [
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
				name: 'Integrazione AI e Data Intelligence',
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
	],
	en: [
		{
			'@type': 'Offer',
			itemOffered: {
				'@type': 'Service',
				name: 'Custom Software Development',
				description: 'Building enterprise platforms and custom web applications.'
			}
		},
		{
			'@type': 'Offer',
			itemOffered: {
				'@type': 'Service',
				name: 'AI Integration & Data Intelligence',
				description: 'Development of AI agents, RAG systems, and business process automation.'
			}
		},
		{
			'@type': 'Offer',
			itemOffered: {
				'@type': 'Service',
				name: 'Digital Factory',
				description: 'Frontend, backend development, and scalable cloud architectures.'
			}
		}
	]
}
