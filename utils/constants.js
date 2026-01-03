const companyName = 'Volcanic Minds'

export const seoTitle = 'Volcanic Minds | Smart, Fast, Efficient'
export const seoDescription =
	'Software House Torino e partner innovativo. Sviluppiamo SaaS, software custom e soluzioni Enterprise. Integriamo Cloud Native e Agenti AI per massimizzare il ROI.'
export const seoSiteName = companyName
export const seoImageUrl = '/open-graph.png'
export const logo = '/logo.png'
export const author = companyName
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
		{ '@type': 'City', name: 'Lugano' },
		{ '@type': 'City', name: 'Padova' },
		{ '@type': 'City', name: 'Bologna' },
		{ '@type': 'City', name: 'Aosta' },
		{ '@type': 'City', name: 'Trento' },
		{ '@type': 'City', name: 'Verona' },
		{ '@type': 'AdministrativeArea', name: 'Piemonte' },
		{ '@type': 'AdministrativeArea', name: 'Lombardia' },
		{ '@type': 'AdministrativeArea', name: 'Canton Ticino' },
		{ '@type': 'AdministrativeArea', name: 'Canton Grigioni' },
		{ '@type': 'AdministrativeArea', name: 'Veneto' },
		{ '@type': 'AdministrativeArea', name: 'Emilia-Romagna' },
		{ '@type': 'AdministrativeArea', name: "Valle d'Aosta" },
		{ '@type': 'AdministrativeArea', name: 'Trentino-Alto Adige' },
		{ '@type': 'AdministrativeArea', name: 'Toscana' },
		{ '@type': 'AdministrativeArea', name: 'Liguria' },
		{ '@type': 'Country', name: 'Italia' },
		{ '@type': 'Country', name: 'Svizzera' }
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
	name: companyName,
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
		name: companyName,
		alternateName: 'Volcanic Minds - Nearshore Software Partner',
		description:
			'Italian Software House providing custom software development, AI integration, and mobile app services for European companies. High-quality engineering with EU time zone alignment.'
	},
	LandingItalyPage: {
		name: companyName,
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
			name: companyName,
			description:
				'Software House a Torino specializzata in sviluppo software custom, Web App, Mobile e soluzioni di Intelligenza Artificiale per le aziende.'
		},
		en: {
			name: companyName,
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
	LandingItalyPage: [
		{ '@type': 'AdministrativeArea', name: 'Abruzzo', sameAs: 'https://it.wikipedia.org/wiki/Abruzzo' },
		{ '@type': 'AdministrativeArea', name: 'Basilicata', sameAs: 'https://it.wikipedia.org/wiki/Basilicata' },
		{ '@type': 'AdministrativeArea', name: 'Calabria', sameAs: 'https://it.wikipedia.org/wiki/Calabria' },
		{ '@type': 'AdministrativeArea', name: 'Campania', sameAs: 'https://it.wikipedia.org/wiki/Campania' },
		{ '@type': 'AdministrativeArea', name: 'Emilia-Romagna', sameAs: 'https://it.wikipedia.org/wiki/Emilia-Romagna' },
		{
			'@type': 'AdministrativeArea',
			name: 'Friuli-Venezia Giulia',
			sameAs: 'https://it.wikipedia.org/wiki/Friuli-Venezia_Giulia'
		},
		{ '@type': 'AdministrativeArea', name: 'Lazio', sameAs: 'https://it.wikipedia.org/wiki/Lazio' },
		{ '@type': 'AdministrativeArea', name: 'Liguria', sameAs: 'https://it.wikipedia.org/wiki/Liguria' },
		{ '@type': 'AdministrativeArea', name: 'Lombardia', sameAs: 'https://it.wikipedia.org/wiki/Lombardia' },
		{ '@type': 'AdministrativeArea', name: 'Marche', sameAs: 'https://it.wikipedia.org/wiki/Marche' },
		{ '@type': 'AdministrativeArea', name: 'Molise', sameAs: 'https://it.wikipedia.org/wiki/Molise' },
		{ '@type': 'AdministrativeArea', name: 'Piemonte', sameAs: 'https://it.wikipedia.org/wiki/Piemonte' },
		{ '@type': 'AdministrativeArea', name: 'Puglia', sameAs: 'https://it.wikipedia.org/wiki/Puglia' },
		{ '@type': 'AdministrativeArea', name: 'Sardegna', sameAs: 'https://it.wikipedia.org/wiki/Sardegna' },
		{ '@type': 'AdministrativeArea', name: 'Sicilia', sameAs: 'https://it.wikipedia.org/wiki/Sicilia' },
		{ '@type': 'AdministrativeArea', name: 'Toscana', sameAs: 'https://it.wikipedia.org/wiki/Toscana' },
		{
			'@type': 'AdministrativeArea',
			name: 'Trentino-Alto Adige',
			sameAs: 'https://it.wikipedia.org/wiki/Trentino-Alto_Adige'
		},
		{ '@type': 'AdministrativeArea', name: 'Umbria', sameAs: 'https://it.wikipedia.org/wiki/Umbria' },
		{ '@type': 'AdministrativeArea', name: "Valle d'Aosta", sameAs: 'https://it.wikipedia.org/wiki/Valle_d%27Aosta' },
		{ '@type': 'AdministrativeArea', name: 'Veneto', sameAs: 'https://it.wikipedia.org/wiki/Veneto' },
		{ '@type': 'Country', name: 'Italy', sameAs: 'https://en.wikipedia.org/wiki/Italy' }
	],
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
	'https://linkedin.com/company/volcanic-minds',
	'https://github.com/volcanicminds',
	'https://youtube.com/@volcanicminds'
]

export const REVIEWS_DATA = {
	ratingValue: '5.0',
	ratingCount: '6',
	reviewCount: '2',
	bestRating: '5',
	worstRating: '1'
}

export const TAG_TO_WIKIDATA = {
	// AI & ML
	AI: 'https://www.wikidata.org/wiki/Q11660',
	'ArtificiaI Intelligence': 'https://www.wikidata.org/wiki/Q11660',
	'Machine Learning': 'https://www.wikidata.org/wiki/Q2539',
	'Generative AI': 'https://www.wikidata.org/wiki/Q107597532',
	LLM: 'https://www.wikidata.org/wiki/Q105634596',
	RAG: 'https://www.wikidata.org/wiki/Q120501650', // Retrieval-augmented generation
	'Natural Language Processing': 'https://www.wikidata.org/wiki/Q30642',

	// Cloud & DevOps
	Cloud: 'https://www.wikidata.org/wiki/Q483639',
	'Cloud Native': 'https://www.wikidata.org/wiki/Q5135688',
	DevOps: 'https://www.wikidata.org/wiki/Q3025536',
	Kubernetes: 'https://www.wikidata.org/wiki/Q19363934',
	Docker: 'https://www.wikidata.org/wiki/Q16926947',
	AWS: 'https://www.wikidata.org/wiki/Q469855',

	// Software Engineering
	'Software Architecture': 'https://www.wikidata.org/wiki/Q179836',
	Microservices: 'https://www.wikidata.org/wiki/Q17624131',
	'Web Development': 'https://www.wikidata.org/wiki/Q386276',
	SaaS: 'https://www.wikidata.org/wiki/Q465225',
	'Vue.js': 'https://www.wikidata.org/wiki/Q16688536',
	Nuxt: 'https://www.wikidata.org/wiki/Q59385623',
	TypeScript: 'https://www.wikidata.org/wiki/Q933390',
	JavaScript: 'https://www.wikidata.org/wiki/Q288',

	// Business & Management
	'Digital Transformation': 'https://www.wikidata.org/wiki/Q5276067',
	Startup: 'https://www.wikidata.org/wiki/Q192931',
	Enterprise: 'https://www.wikidata.org/wiki/Q6881511',
	Management: 'https://www.wikidata.org/wiki/Q2920921'
}

export const TECH_AUTHOR = {
	'@type': 'Person',
	name: 'Davide Morra',
	jobTitle: 'CEO & Founder',
	url: 'https://volcanicminds.com',
	sameAs: ['https://www.linkedin.com/in/dmorra', 'https://github.com/mrddter', 'https://morra.in']
}

export const ORG_AUTHOR = {
	'@type': 'Organization',
	name: 'Volcanic Minds Team',
	url: 'https://volcanicminds.com',
	logo: {
		'@type': 'ImageObject',
		url: logo
	}
}

export const SOFTWARE_APPS_DEFAULTS = {
	'it-it': {
		operatingSystem: 'Any',
		applicationCategory: 'BusinessApplication',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR',
			availability: 'https://schema.org/OnlineOnly',
			description: 'Richiesta preventivo senza costi aggiuntivi'
		}
	},
	en: {
		operatingSystem: 'Any',
		applicationCategory: 'BusinessApplication',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR',
			availability: 'https://schema.org/OnlineOnly',
			description: 'Contact for pricing without additional costs'
		}
	}
}
