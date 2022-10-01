const parseStringForHeaderArrayOfObjects = (initialMarkdownString: string) => {

    const headerArrayOfObjects = Array()
    const headerDelimiter = '#'

    const recursiveParser = (markdownString = initialMarkdownString, headerLevelNumber: number = 1) => {

        if (headerLevelNumber > 7 && markdownString === '' && markdownString === null && markdownString === undefined && markdownString === false) { 
            console.log('> Parsing finished.')
            return headerArrayOfObjects
        }

        const headerLevelHashtags = headerDelimiter.repeat(headerLevelNumber)
        const newHeaderLevel = headerLevelNumber + 1
        
        // Match whole parent header (no newlines on top/bottom)
        const headerStringRegex = new RegExp(`^${headerLevelHashtags}\s[\s\S]+?(?=\n${headerLevelHashtags}\s|$(?![\r\n]))`, 'g')  // Regex explanation: match header, then any character or newline, stop when there's either a same level header delimiter or the end of the document
        const headerStringArray = [...markdownString.matchAll(headerStringRegex)]

        const headerTitleRegex = new RegExp(`^${headerLevelHashtags}\s.+?(?=\n)`, 'i')  // Regex explanation: match header up until a newline, stop if there's a newline
        const headerContentTextRegex = new RegExp(`(?<![\r\n])^[\s\S]+?(?=\n${headerDelimiter})`)  // Regex explanation: All text from beginning of document, stop if there's a newline with header delimiter

        headerStringArray.forEach(headerString => {

            const headerStringIterator = () => {
                // Title
                const headerTitleArray = headerString[1].match(headerTitleRegex)
                if (headerTitleArray === null) { 
                    console.log('> headerTitleArray is null')
                    return '' 
                }
                const headerTitle = headerTitleArray[0]
                // Content
                const headerStringWithoutHeaderTitle = headerString[1].replace(headerTitle, '').trim()
                const headerContentTextArray = headerStringWithoutHeaderTitle.match(headerContentTextRegex)
                if (headerContentTextArray === null) { 
                    console.log('> headerContentTextArray is null')
                    return '' 
                }
                const headerContentText = headerContentTextArray[0]
                // Content for children
                const childHeadersString = headerStringWithoutHeaderTitle.replace(headerContentText, '').trim()

                // Final object
                const headerObject = {
                    headerTitle: headerTitle,
                    headerContentText: headerContentText,
                    childHeadersArrayOfObjects: recursiveParser(childHeadersString, newHeaderLevel)  // call itself
                }
                return headerObject
            }

            const headerObject = headerStringIterator()
            if (headerObject !== '') {
                headerArrayOfObjects.push(headerObject)
            }

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