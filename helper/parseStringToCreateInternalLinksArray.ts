// Find all internal links within text
const parseStringToCreateInternalLinksArray = (markdownString: string) => {
    const internalLinksArrayWithRegexGroups = [...markdownString.matchAll(/\[.+?\]\((.+?)\)/g)]
    let internalLinksArray = Array()
    internalLinksArrayWithRegexGroups.map(arrayItem => internalLinksArray.push(arrayItem[1]))
    if (!internalLinksArray) { return new Array() }
    return internalLinksArray
}

export default parseStringToCreateInternalLinksArray