const convertHeaderTitleToInternalLink = (headerTitle: string): string => {
	return headerTitle.replace('#', '').trim().replace(' ', '-')
}

export default convertHeaderTitleToInternalLink