// First, identify regex (it will be used recursively)
// Build an object while re-using the function
// tHat's it

// // Identify header object
// const headerString: Array<string> = markdownString.match(//g)
// // Get header object title
// const headerTitleRegex =  ''  // simply the first line? 
// // Get header object text
// const headerTextContent = ''  // between two #
// // Get header object child headers
// const childHeaderRegex = ''







// (?!\n#) -> works, but includes newline
// ^#[\s\S]+?\n#

let headerLevelHashtags = '#'
const headerStringRegex = `^${headerLevelHashtags}[\s\S]+?\n${headerLevelHashtags}`
// const headerString: Array<string> = markdownString.match(//g)


// JS will need to dynamically specify how many # it should match.

// Because now, it doesn't match from ## to another ## but rather from ## to ###:

// ## dsa

// ### fds

// ### dadas

// ## asd








const parseStringForHeaderArrayOfObjects = (string: string) => {
    // ...
}

// Expected result:
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

// export default parseStringForHeaderArrayOfObjects