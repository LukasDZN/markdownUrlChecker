// First, identify regex (it will be used recursively)
// Build an object while re-using the function
// That's it

// (?!\n#) -> works, but includes newline
// ^#[\s\S]+?\n#


// Because now, it doesn't match from ## to another ## but rather from ## to ###:

// ## dsa

// ### fds

// ### dadas

// ## asd


const parseStringForHeaderArrayOfObjects = (initialMarkdownString: string) => {

    const headerArrayOfObjects = Array()
    const headerDenominator = '#'

    const recursiveParser = (markdownString = initialMarkdownString, headerLevelNumber: number = 1) => {
        let headerLevelHashtags = headerDenominator.repeat(headerLevelNumber)
        const newHeaderLevel = headerLevelNumber + 1
        if (headerLevelNumber > 7 && markdownString === '' && markdownString === null && markdownString === undefined && markdownString === false) { 
            console.log('> Parsing finished.')
            return headerArrayOfObjects
        }
        
        // Create an array of matches
        const headerStringRegex = new RegExp(`^${headerLevelHashtags}[\s\S]+?\n${headerLevelHashtags}`, 'g')
        const headerStringArray: Array<string> = [...markdownString.matchAll(headerStringRegex)]

        const headerTextContent = ''  // anything between the first header and any other level header
        const childHeaderRegex = ''  // everything that's not the previous two

        headerStringArray.forEach(matchedString => {
            const headerContentText = matchedString[1].match(headerTextContent)
            const childHeadersString = matchedString[1].match(childHeaderRegex)
            const headerObject = {
                headerTitle: matchedString.split('\n')[0],  // first line of the string
                headerContentText: headerContentText,
                childHeadersArrayOfObjects: recursiveParser(childHeadersString, newHeaderLevel)  // call itself
            }
            headerArrayOfObjects.push(headerObject)
        })
        return headerArrayOfObjects
    }
    recursiveParser()
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