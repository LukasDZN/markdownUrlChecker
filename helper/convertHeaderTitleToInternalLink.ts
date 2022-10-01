const convertHeaderTitleToInternalLink = (headerTitle: string): string => {
    return headerTitle
        .replace(/[^\w_\s]+/gm, '')  // Delete any non-word and non-space characters
        .replace(/\s{2,}/g, ' ')
        .trim()
        .replace(/ /g, '-')
        .toLowerCase();
};

export default convertHeaderTitleToInternalLink;
