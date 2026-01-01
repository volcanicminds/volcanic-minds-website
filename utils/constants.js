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
	'it-it': [
		{ '@type': 'City', name: 'Torino' },
		{ '@type': 'City', name: 'Milano' },
		{ '@type': 'City', name: 'Bologna' },
		{ '@type': 'City', name: 'Verona' },
		{ '@type': 'City', name: 'Padova' },
		{ '@type': 'City', name: 'Brescia' },
		{ '@type': 'City', name: 'Genova' },
		{ '@type': 'City', name: 'Trento' },
		{ '@type': 'City', name: 'Aosta' },
		{ '@type': 'City', name: 'Lugano' },
		{ '@type': 'AdministrativeArea', name: 'Piemonte' },
		{ '@type': 'AdministrativeArea', name: 'Lombardia' },
		{ '@type': 'AdministrativeArea', name: 'Liguria' },
		{ '@type': 'AdministrativeArea', name: "Valle d'Aosta" },
		{ '@type': 'AdministrativeArea', name: 'Veneto' },
		{ '@type': 'AdministrativeArea', name: 'Trentino-Alto Adige' },
		{ '@type': 'AdministrativeArea', name: 'Emilia-Romagna' },
		{ '@type': 'AdministrativeArea', name: 'Toscana' },
		{ '@type': 'AdministrativeArea', name: 'Canton Ticino' },
		{ '@type': 'AdministrativeArea', name: 'Canton Grigioni' },
		{ '@type': 'Country', name: 'Italia' },
		{ '@type': 'Country', name: 'Svizzera' },
		{ '@type': 'Country', name: 'Monaco' },
		{ '@type': 'Country', name: 'San Marino' },
		{ '@type': 'Country', name: 'Città del Vaticano' },
		{ '@type': 'Continent', name: 'Europa' }
	],
	en: [
		{ '@type': 'City', name: 'Zurich' },
		{ '@type': 'City', name: 'Geneva' },
		{ '@type': 'City', name: 'London' },
		{ '@type': 'City', name: 'Munich' },
		{ '@type': 'City', name: 'Dubai' },
		{ '@type': 'City', name: 'Frankfurt' },
		{ '@type': 'City', name: 'Paris' },
		{ '@type': 'City', name: 'Boston' },
		{ '@type': 'Country', name: 'Luxembourg' },
		{ '@type': 'Country', name: 'Switzerland' },
		{ '@type': 'Country', name: 'United Kingdom' },
		{ '@type': 'Country', name: 'Norway' },
		{ '@type': 'Country', name: 'Sweden' },
		{ '@type': 'Country', name: 'Denmark' },
		{ '@type': 'Country', name: 'Netherlands' },
		{ '@type': 'Country', name: 'Germany' },
		{ '@type': 'Country', name: 'Qatar' },
		{ '@type': 'Country', name: 'Ireland' },
		{ '@type': 'Country', name: 'Austria' },
		{ '@type': 'Country', name: 'France' },
		{ '@type': 'Country', name: 'United Arab Emirates' },
		{ '@type': 'Country', name: 'Canada' },
		{ '@type': 'Country', name: 'United States' },
		{ '@type': 'Country', name: 'Italy' },
		{ '@type': 'Continent', name: 'Europe' }
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
	'@type': 'LocalBusiness',
	name: 'Volcanic Minds',
	image:
		'https://images.prismic.io/volcanic-website/3ca43570-29b0-47c7-8205-06ca7537fd03_Volcanic+Minds.png?auto=compress,format',
	'@id': 'https://volcanicminds.com/#organization',
	url: 'https://volcanicminds.com',
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
	'it-it': [
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

export const landingPageDetails = {
	LandingEuropePage: {
		name: 'Volcanic Minds',
		alternateName: 'Volcanic Minds - Nearshore Software Partner',
		description:
			'Italian Software House providing custom software development, AI integration, and mobile app services for European companies. High-quality engineering with EU time zone alignment.'
	},
	LandingItalyPage: {
		name: 'Volcanic Minds',
		alternateName: 'Volcanic Minds - Sviluppo Software Italia',
		description:
			'Partner tecnologico per lo sviluppo di software su misura e soluzioni AI per aziende in tutta Italia. Operatività remota e in loco.'
	},
	LandingNorthItalyPage: {
		name: 'Volcanic Minds - Sviluppo Software Nord Italia',
		description:
			'Partner tecnologico per lo sviluppo di software su misura e soluzioni AI per aziende in Lombardia, Veneto ed Emilia-Romagna. Operatività remota e in loco.'
	},
	LandingLocalPage: {
		it: {
			name: 'Volcanic Minds',
			description:
				'Software House a Torino specializzata in sviluppo software custom, Web App, Mobile e soluzioni di Intelligenza Artificiale per le aziende.'
		},
		en: {
			name: 'Volcanic Minds',
			description:
				'Software House based in Turin, specialized in Custom Software Development, Web Apps, Mobile, and Enterprise AI solutions.'
		}
	}
}

export const AREA_SERVED_MAPS = {
	LandingLocalPage: [
		{ '@type': 'City', name: 'Torino', sameAs: 'https://it.wikipedia.org/wiki/Torino' },
		{ '@type': 'AdministrativeArea', name: 'Piemonte', sameAs: 'https://it.wikipedia.org/wiki/Piemonte' }
	],
	LandingItalyPage: {
		'@type': 'Country',
		name: 'Italy',
		sameAs: 'https://en.wikipedia.org/wiki/Italy'
	},
	LandingNorthItalyPage: [
		{ '@type': 'AdministrativeArea', name: 'Lombardia', sameAs: 'https://it.wikipedia.org/wiki/Lombardia' },
		{ '@type': 'AdministrativeArea', name: 'Veneto', sameAs: 'https://it.wikipedia.org/wiki/Veneto' },
		{ '@type': 'AdministrativeArea', name: 'Emilia-Romagna', sameAs: 'https://it.wikipedia.org/wiki/Emilia-Romagna' },
		{ '@type': 'AdministrativeArea', name: 'Liguria', sameAs: 'https://it.wikipedia.org/wiki/Liguria' },
		{ '@type': 'AdministrativeArea', name: "Valle d'Aosta", sameAs: 'https://it.wikipedia.org/wiki/Valle_d%27Aosta' }
	],
	LandingEuropePage: {
		'@type': 'Continent',
		name: 'Europe',
		sameAs: 'https://en.wikipedia.org/wiki/Europe'
	}
}

export const OPENING_HOURS_SPECIFICATION = {
	'@type': 'OpeningHoursSpecification',
	dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	opens: '09:00',
	closes: '18:00'
}

export const SAME_AS_SOCIALS = [
	'https://www.linkedin.com/company/volcanicminds/',
	'https://www.facebook.com/volcanicminds'
]
