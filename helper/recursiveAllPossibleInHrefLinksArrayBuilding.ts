import { headerObject } from '../interfaces';

const convertHeaderTitleToInternalLink = (headerTitle: string): string => {
    return headerTitle
        .replace(/[^\w_\s]+/gm, '')  // Delete any non-word and non-space characters
        .replace(/\s{2,}/g, ' ')
        .trim()
        .replace(/ /g, '-')
        .toLowerCase();
};

const recursiveAllPossibleInHrefLinksArrayBuilding = (
    initialLevelXHeadersArrayOfObjects: Array<headerObject>
) => {
    const allPossibleInternalLinks: Array<string> = [];

    const iterator = (
        // levelXHeadersArrayOfObjects: Array<headerObject>,
        levelXHeadersArrayOfObjects: Array<any>,
        headerLevel: number = 1,
        parentInternalLinkString: string = ''
    ) => {
        if (
            Array.isArray(levelXHeadersArrayOfObjects) === true &&
            levelXHeadersArrayOfObjects.length === 0 &&
            headerLevel > 6
        ) {
            return '';
        }
        const newHeaderLevel = headerLevel + 1;

        levelXHeadersArrayOfObjects.forEach((headerObject) => {
            const currentHeaderLevelInternalLink =
                headerLevel === 1
                    ? '#' + convertHeaderTitleToInternalLink(headerObject.headerTitle)
                    : '--' + convertHeaderTitleToInternalLink(headerObject.headerTitle);

            const fullCurrentHeaderLevelInternalLink =
                parentInternalLinkString + currentHeaderLevelInternalLink;
            allPossibleInternalLinks.push(fullCurrentHeaderLevelInternalLink);

            iterator(
                headerObject.childHeadersArrayOfObjects,
                newHeaderLevel,
                fullCurrentHeaderLevelInternalLink
            );
        });
    };

    // Initialize
    iterator(initialLevelXHeadersArrayOfObjects);
    return allPossibleInternalLinks;
};

export { convertHeaderTitleToInternalLink, recursiveAllPossibleInHrefLinksArrayBuilding };
