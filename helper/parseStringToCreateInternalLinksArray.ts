// Find all internal links within text
const parseStringToCreateInternalLinksArray = (markdownString: string) => {
    const internalLinksArray: Array<string> = markdownString.match(/\[.+\]\(.+\)/g)
    if (!!internalLinksArray) { return new Array() }
    return internalLinksArray
}

export default parseStringToCreateInternalLinksArray