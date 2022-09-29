import { headerObject } from '../interfaces'
import convertHeaderTitleToInternalLink from "../helper/convertHeaderTitleToInternalLink"

const recursiveAllPossibleInternalLinksArrayBuilding = (levelXHeadersArrayOfObjects: Array<headerObject>) => {
    const allPossibleInternalLinks: Array<string> = []

    const levelXHeadersArrayOfObjectsPassedDown: Array<headerObject> = levelXHeadersArrayOfObjects

    const recursiveAllPossibleInternalLinksArrayBuilding = (levelXHeadersArrayOfObjectsPassedDown: Array<headerObject>, headerLevel: number = 1) => {
        if (levelXHeadersArrayOfObjectsPassedDown.length !== 0 && headerLevel < 7) {
            const newHeaderLevel = headerLevel + 1
            levelXHeadersArrayOfObjectsPassedDown.forEach(headerObject => {
                allPossibleInternalLinks.push(headerLevel === 1 ? '#' : '--' + convertHeaderTitleToInternalLink(headerObject.headerTitle))
                headerObject.childHeadersArrayOfObjects.forEach(childHeadersArrayOfObject => {
                    recursiveAllPossibleInternalLinksArrayBuilding(childHeadersArrayOfObject, newHeaderLevel)
                })
            })
        }
    }
    recursiveAllPossibleInternalLinksArrayBuilding(levelXHeadersArrayOfObjectsPassedDown)

    console.log(allPossibleInternalLinks)
}

export default recursiveAllPossibleInternalLinksArrayBuilding