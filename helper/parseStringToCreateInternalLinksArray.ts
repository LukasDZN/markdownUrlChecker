// Find all internal links within text
const parseStringToCreateInternalLinksArray = (markdownString: string) => {
    const internalLinksArrayWithRegexGroups = [...markdownString.matchAll(/\[.+?\]\((.+?)\)/g)];
    let internalLinksArray = Array();
    internalLinksArrayWithRegexGroups.forEach((arrayItem) => {
        internalLinksArray.push(arrayItem[1]);
        if (arrayItem[1].startsWith('#') === false) {
            console.log(
                `WARNING: Internal link "(${arrayItem[1]})" does not start with "#". Did you mean "(#${arrayItem[1]})"?`
            );
        }
    });
    if (!internalLinksArray) {
        return new Array();
    }
    return internalLinksArray;
};

export default parseStringToCreateInternalLinksArray;
