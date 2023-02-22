export default [
	{ UserAgent: '*' },
	{ Disallow: '/preview' },
	{ Disallow: '/de-de/preview' },
	{ Disallow: '/en-eu/preview' },
	{ Disallow: '/slice-simulator' },
	{ Disallow: '/de-de/slice-simulator' },
	{ Disallow: '/en-eu/slice-simulator' },
	{ BlankLine: true },
	{ Comment: 'Custom sitemap' },
	{ Sitemap: (req) => `https://${req.headers.host}/VMsitemap.xml` }
]
