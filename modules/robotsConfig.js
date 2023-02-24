const robots = []
robots.push({ UserAgent: '*' })

const excludePaths = process.env.NUXT_PRE_EXCLUDE_PATHS.split(',')
excludePaths.forEach((path) => robots.push({ Disallow: path }))

robots.push({ BlankLine: true })
robots.push({ Comment: 'Custom sitemap' })
robots.push({
	Sitemap: `${process.env.NUXT_SITENAME}/sitemap.xml`
})

export default robots
