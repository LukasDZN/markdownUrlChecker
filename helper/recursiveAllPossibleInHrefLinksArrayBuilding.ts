import { headerObject } from '../interfaces'
import convertHeaderTitleToInternalLink from "./convertHeaderTitleToInternalLink"

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

const recursiveAllPossibleInHrefLinksArrayBuilding = (levelXHeadersArrayOfObjects: Array<headerObject>) => {
    const allPossibleInternalLinks: Array<string> = []
    const levelXHeadersArrayOfObjectsPassedDown: Array<headerObject> = levelXHeadersArrayOfObjects
    // const recursiveAllPossibleInHrefLinksArrayBuilding = (levelXHeadersArrayOfObjectsPassedDown: Array<headerObject>, headerLevel: number = 1) => {
    //     if (levelXHeadersArrayOfObjectsPassedDown.length !== 0 && headerLevel < 7) {
    //         const newHeaderLevel = headerLevel + 1
    //         levelXHeadersArrayOfObjectsPassedDown.forEach(headerObject => {
    //             allPossibleInternalLinks.push(headerLevel === 1 ? '#' : '--' + convertHeaderTitleToInternalLink(headerObject.headerTitle))
    //             headerObject.childHeadersArrayOfObjects.forEach(childHeadersArrayOfObject => {
    //                 recursiveAllPossibleInHrefLinksArrayBuilding(childHeadersArrayOfObject, newHeaderLevel)
    //             })
    //         })
    //     }
    // }
    // recursiveAllPossibleInHrefLinksArrayBuilding(levelXHeadersArrayOfObjectsPassedDown)
    // console.log(allPossibleInternalLinks)
}

export default recursiveAllPossibleInHrefLinksArrayBuilding