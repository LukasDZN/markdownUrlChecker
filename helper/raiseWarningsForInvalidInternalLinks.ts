const raiseWarningsForInvalidInternalLinks = (
    existingInternalLinksArray: Array<string>,
    allPossibleInternalLinksArray: Array<string>
) => {
    const warningArray: Array<string> = [];
    existingInternalLinksArray.forEach((existingInternalLink) => {
        if (allPossibleInternalLinksArray.includes(existingInternalLink) === false) {
            const warningString = `WARNING: Internal link "(${existingInternalLink})" is not valid. Such header name and/or header nesting order does not exist.`;
            // console.log(warningString);
            warningArray.push(warningString);
        }
    });
    return warningArray;
};
export default raiseWarningsForInvalidInternalLinks;
