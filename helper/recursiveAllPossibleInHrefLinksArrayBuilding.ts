import { headerObject } from '../interfaces';
import convertHeaderTitleToInternalLink from './convertHeaderTitleToInternalLink';

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

export default recursiveAllPossibleInHrefLinksArrayBuilding;
