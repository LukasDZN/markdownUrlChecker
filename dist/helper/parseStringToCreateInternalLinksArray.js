// Find all internal links within text
const parseStringToCreateInternalLinksArray = (markdownString) => {
    const internalLinksArrayWithRegexGroups = [...markdownString.matchAll(/\[.+?\]\((.+?)\)/g)];
    let internalLinksArray = Array();
    internalLinksArrayWithRegexGroups.forEach((arrayItem) => {
        const internalLink = arrayItem[1];
        if (internalLink.startsWith('%') === false &&
            internalLink.endsWith('.png') === false &&
            internalLink.endsWith('.jpg') === false &&
            internalLink.endsWith('.jpeg') === false &&
            internalLink.endsWith('.svg') === false) {
            internalLinksArray.push(internalLink);
            if (internalLink.startsWith('#') === false) {
                console.log(`WARNING: Internal link "(${arrayItem[1]})" does not start with "#". Did you mean "(#${arrayItem[1]})"?`);
            }
        }
    });
    if (!internalLinksArray) {
        return new Array();
    }
    return internalLinksArray;
};
export default parseStringToCreateInternalLinksArray;
