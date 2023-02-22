const robots = []
robots.push({ UserAgent: '*' })

const excludePaths = process.env.EXCLUDE_PATHS.split(',')
excludePaths.forEach((path) => robots.push({ Disallow: path }))

robots.push({ BlankLine: true })
robots.push({ Comment: 'Custom sitemap' })
robots.push({
	Sitemap: `${process.env.SITENAME}/sitemap.xml`
})

export default robots
