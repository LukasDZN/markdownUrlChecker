import { headerObject } from '../interfaces'

const parseStringForHeaderArrayOfObjects = (initialMarkdownString: string) => {

    const headerDelimiter = '#'

    const recursiveParser = (markdownString = initialMarkdownString, headerLevelNumber: number = 1) => {

        if (headerLevelNumber > 6) { 
            console.log('> Parsing finished.')
            return
        }

        const recursiveParserArray: Array<any> = []

        const headerLevelHashtags = headerDelimiter.repeat(headerLevelNumber)
        const newHeaderLevel = headerLevelNumber + 1
        
        // Match whole parent header (no newlines on top/bottom)
        const headerStringRegex = new RegExp(`^${headerLevelHashtags}\\s[\\s\\S]+?(?=\\n${headerLevelHashtags}\\s|$(?![\\r\\n]))`, 'gmi')  // Regex explanation: match header, then any character or newline, stop when there's either a same level header delimiter or the end of the document
        const headerStringArray = [...markdownString.matchAll(headerStringRegex)]

        // Match parent sub-categories
        const headerTitleRegex = new RegExp(`^${headerLevelHashtags}\\s.+`, 'mi')  // Regex explanation: match header up until a newline
        const headerContentTextRegex = new RegExp(`(?<![\\r\\n])^[\\s\\S]+?(?=\\n${headerDelimiter})`, 'mi')  // Regex explanation: All text from beginning of document, stop if there's a newline with header delimiter

        // For each parent
        headerStringArray.forEach(headerString => {

            const headerStringIterator = () => {
                // Title
                const headerTitleArray = headerString[0].match(headerTitleRegex)
                if (headerTitleArray === null) { 
                    console.log('CRITICAL ERROR: headerTitleArray is null')
                    return '' 
                }
                const headerTitle = headerTitleArray[0]
                // Content
                const headerStringWithoutHeaderTitle = headerString[0].replace(headerTitle, '').trim()
                let headerContentTextArray = headerStringWithoutHeaderTitle.match(headerContentTextRegex)
                if (headerContentTextArray === null) { 
                    // console.log('WARNING: headerContentTextArray is null')  // these will be many
                    headerContentTextArray = ['']
                }
                const headerContentText = headerContentTextArray[0]
                // Content for children
                const childHeadersString = headerStringWithoutHeaderTitle.replace(headerContentText, '').trim()
                // Final object
                const headerObject = {
                    headerTitle: headerTitle,
                    headerContentText: headerContentText,
                    childHeadersArrayOfObjects: childHeadersString === '' ? '' : recursiveParser(childHeadersString, newHeaderLevel)  // call itself
                }
                return headerObject
            }
            recursiveParserArray.push(headerStringIterator())
        })
        return recursiveParserArray
    }
    // Initialize
    const headerArrayOfObjects = recursiveParser()
    // console.log(JSON.stringify(headerArrayOfObjects, null, 2))
    return headerArrayOfObjects
}
export default parseStringForHeaderArrayOfObjects