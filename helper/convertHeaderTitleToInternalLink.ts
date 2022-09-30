const convertHeaderTitleToInternalLink = (headerTitle: string): string => {
	return headerTitle.trim().replace(/[\W_]+/g, ' ').replace(/ /g, '-').toLowerCase()
}

export default convertHeaderTitleToInternalLink