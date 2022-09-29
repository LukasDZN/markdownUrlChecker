// Goal is internal link checking, not sorting (yet), so newlines are less relevant

import { headerObject } from './interfaces.js'

// """
// ## My header

// text
// <newline>
// """

// // Read all .md files
// open ./public/docs/../.. 
// read all .md files

// OR 
// detect .md files that have been changed
// parse those files

// Find all internal links within text
// const string = JSON.stringify(input)  // No need if parsed from file. For testing stringifying text using online tool: https://www.freeformatter.com/json-escape.html#before-output
const parseStringToCreateInternalLinksArray = (markdownString: string) => {
    return markdownString.match(/\[.+\]\(.+\)/g)
}

// // Identify header object
// const mainRegex = ''

// // Get header object title
// const headerTitleRegex =  ''  // simply the first line? 
// // Get header object text
// const headerTextContent = ''  // between two #
// // Get header object child headers
// const childHeaderRegex = ''

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
// Which methods will I need? For internal link checking for example (include this with markdown header sorter)
    // Most efficient way of comparing?
        // Build an array of possible internal links and check if it's in array?
        // Deconstruct each link some--fee-fo--loo to "# some", "## fee fo", "### loo" - however, this is minimized, the header title could be "## fee fo" or ##Fee Fo ", so it's better to normalize it and not de-normalize it. Include only raw data in the object. Add methods to process the data.
// Simply select using regex?
// Make it more robust - headers can have either a newline before/after it or not.
// Setting to either have or not have newlines before/after headers, as the collected data is raw and the output is formatted. 

// Build an object with methods such as:
// myObject.levelOneHeaders()  // returns an array

// Will I be able to:
// - Get all possible URLs
// - Sort by selected level
// - Sort everything

const convertHeaderTitleToInternalLink = (headerTitle: string): string => {
	return headerTitle.replace('#', '').trim().replace(' ', '-')
} 

// Basic idea
// markdownObject.LevelOneHeaders.forEach(levelOneHeader => {
// 	if (levelOneHeader) {
// 		allPossibleInternalLinks.push('#' + convertHeaderTitleToInternalLink(levelOneHeader))
// 		levelOneHeader.levelTwoHeaders.forEach(levelTwoHeader => {
// 			allPossibleInternalLinks.push('--' + convertHeaderTitleToInternalLink(levelOneHeader))
// 			levelTwoHeader.levelThreeHeaders.forEach(levelThreeHeader => {
// 				...	
// 			})
// 		})
// 	}
	
// })

const allPossibleInternalLinks: Array<string> = []
			
// const recursiveAllPossibleInternalLinksArrayBuilding = (levelXHeadersArrayOfObjects: Array<headerObject>, headerLevel: number = 1) => {

// 	if (levelXHeadersArrayOfObjects.length !== 0 && headerLevel < 7) {
	
// 		const newHeaderLevel = headerLevel + 1
		
// 		levelXHeadersArrayOfObjects.forEach(headerObject: headerObject) {
// 			allPossibleInternalLinks.push(headerLevel === 1 ? '#' : '--' + convertHeaderTitleToInternalLink(headerObject.headerTitle))
// 			headerObject.childHeadersArrayOfObjects.forEach(childHeadersArrayOfObjects => {
// 				recursiveAllPossibleInternalLinksArrayBuilding(childHeadersArrayOfObjects, newHeaderLevel)
// 			})
// 		}
	
// 	}
// }

console.log(allPossibleInternalLinks)

