import { RichText } from 'prismic-dom'

export const asText = (field: any): string => {
	if (!field) return ''
	return RichText.asText(field)
}

export const isRichTextFilled = (field: any): boolean => {
	if (!field) return false
	if (!Array.isArray(field)) return false
	return field.length > 0 && !!asText(field).trim()
}
