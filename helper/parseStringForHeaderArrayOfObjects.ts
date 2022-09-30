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