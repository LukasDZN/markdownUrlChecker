import { headerObject } from '../interfaces';
import convertHeaderTitleToInternalLink from './convertHeaderTitleToInternalLink';

// It should read this:
// const headerArrayOfObjects = [
//         {
//             headerTitle: "# something",
//             headerContentText: "some text",
//             childHeadersArrayOfObjects: [
//                 {
//                     headerTitle: "## something2",
//                     headerContentText: "some text",
//                     childHeadersArrayOfObjects: [
//                         {...},
//                         {...}
//                     ]
//                 }
//             ]
//         }
// ]

// The point is to get all possible combinations
// Or make a function that checks whether a combination is available? -> Chosen solution.
    // Might be hard to build an internal link on-demand
        // Given an example: "#appendix--enum--default-charsets"
        // It's difficult to search for "###  Default char/sets", and the search has to begin from "#appendix--enum--default-charsets".
            // The texts are not too long to make all possible combinations.

// Each parent and their child are a valid internal link

const recursiveAllPossibleInHrefLinksArrayBuilding = (
    initialLevelXHeadersArrayOfObjects: Array<headerObject>
) => {

    const allPossibleInternalLinks: Array<string> = [];
    






    const iterator = (
        // levelXHeadersArrayOfObjects: Array<headerObject>,
        levelXHeadersArrayOfObjects: Array<any>,
        headerLevel: number = 1
    ) => {


        if (levelXHeadersArrayOfObjects.length === 0 && headerLevel > 6) {
            return '';
        }


        const newHeaderLevel = headerLevel + 1;












        levelXHeadersArrayOfObjects.forEach((headerObject) => {

            const currentHeaderLevelInternalLink = headerLevel === 1
                ? '#'
                : '--' + convertHeaderTitleToInternalLink(headerObject.headerTitle)

            allPossibleInternalLinks.push(currentHeaderLevelInternalLink);


            headerObject.childHeadersArrayOfObjects.forEach((childHeadersArrayOfObject: Array<headerObject>) => {
                iterator(
                    childHeadersArrayOfObject,
                    newHeaderLevel
                );
            });


        });





    };










    // Initialize
    iterator(initialLevelXHeadersArrayOfObjects);


    console.log(allPossibleInternalLinks);

};

export default recursiveAllPossibleInHrefLinksArrayBuilding;
