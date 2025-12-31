export const minifyDocument = (document: any) => {
	if (!document) return null
	return {
		uid: document.uid,
		tags: document.tags,
		alternate_languages: document.alternate_languages,
		first_publication_date: document.first_publication_date,
		last_publication_date: document.last_publication_date,
		data: {
			title: document.data?.title,
			seo_title: document.data?.seo_title,
			seo_description: document.data?.seo_description,
			og_title: document.data?.og_title,
			og_description: document.data?.og_description,
			og_image: document.data?.og_image,
			slices: document.data?.slices,
			show_breadcrumb: document.data?.show_breadcrumb,
			schema_org_type: document.data?.schema_org_type,
			is_article: document.data?.is_article,
			section: document.data?.section,
			preview_image: document.data?.preview_image,
			publication_date: document.data?.publication_date,
			latest_revision_date: document.data?.latest_revision_date,
			publication_date_sort: document.data?.publication_date_sort,
			latest_revision_date_sort: document.data?.latest_revision_date_sort,
			proficiency_level: document.data?.proficiency_level
		}
	}
}
