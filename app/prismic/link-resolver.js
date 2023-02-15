export default function (doc) {
	switch (doc.type) {
		case 'homepage':
			return '/'
		case 'first_level_page':
			return `/${doc.uid}`
		case 'second_level_page':
			return `/${doc.tags[0]}/${doc.uid}`
	}
}
