import fs from "fs";
import parseStringToCreateInternalLinksArray from "../helper/parseStringToCreateInternalLinksArray"
import convertHeaderTitleToInternalLink from "../helper/convertHeaderTitleToInternalLink"
import recursiveAllPossibleInHrefLinksArrayBuilding from "../helper/recursiveAllPossibleInHrefLinksArrayBuilding"
// import parseStringForHeaderArrayOfObjects from "../helper/parseStringForHeaderArrayOfObjects"

// Documentation: https://jestjs.io/docs/using-matchers
// toBe for primitives like strings, numbers or booleans for everything else use toEqual // https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest

describe('mainTestGroup', () => {

	const markdownString: string = fs.readFileSync('./tests/testMarkdownString.md', {encoding:'utf8', flag:'r'})

	it('Markdown string file type is string.', () => {
		expect(typeof markdownString).toBe('string')
	})

	it('Parse markdown string file for internal links', () => {
		const internalLinkArray = parseStringToCreateInternalLinksArray(markdownString)
		const expectedArray: Array<string> = [
			"#appendix--security",
			"#appendix--changelog",
			"#appendix--version-guide",
			"#appendix--enum--currency",
			"#appendix--enum--account-status",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--default-charsets",
			"#appendix--enum--industry-id",
			"#appendix--enum--language-code",
			"#appendix--enum--error-code",
			"#appendix--enum--account-status",
			"#appendix--enum--status-change-reason-code",
			"#appendix--enum--error-code",
			"#appendix--enum--error-code",
			"#appendix--enum--currency",
			"#appendix--enum--account-status",
			"#appendix--enum--status-change-reason-code",
			"#appendix--enum--error-code",
			"#appendix--enum--error-code"
		]
		expect(internalLinkArray?.sort()).toEqual(expectedArray.sort())
	})
	// Raise warning if internal link does not have a # in the list above ^

	// Expected header object
	it('Header object created', () => {
		// const expectedHeaderArrayOfObjects = Array(
		// 	{
		// 		headerTitle: "# Introduction",
		// 		headerContentText: "some text",
		// 		childHeadersArrayOfObjects: [
		// 			{
		// 				headerTitle: "## something2",
		// 				headerContentText: "some text",
		// 				childHeadersArrayOfObjects: [
							
		// 				]
		// 			}
		// 		]
		// 	}	
		// )
		const resultHeaderArrayOfObjects = parseStringForHeaderArrayOfObjects(markdownString)
		console.log(resultHeaderArrayOfObjects)
		// expect(resultHeaderArrayOfObjects).toMatchObject(expectedHeaderArrayOfObjects)  // Or  .toStrictEqual
	})

	// convertHeaderTitleToInternalLink
	it('Header title converted to internal link.', () => {
		const testStringsRawAndResult = [
			["# Foo", "foo"],
			["## Foo fee", "foo-fee"],

			// PM API: #### Transaction not permitted to issuer/cardholder
			[" ##  Foo Fee / Fa", "foo-fee-fa"], 
			[" ##  Foo Fee/Fa", "foo-feefa"],

			["# Get CVC2 ", "get-cvc2"]
		]

		const expectedArray = Array()
		testStringsRawAndResult.map(arrayElement => {
			expectedArray.push(arrayElement[1])
		})

		const resultArray = Array()
		testStringsRawAndResult.forEach(arrayElement => {
			const processedString = convertHeaderTitleToInternalLink(arrayElement[1])
			resultArray.push(processedString)
		})

		expect(resultArray.sort()).toEqual(expectedArray.sort())
	})

	// Expected allPossibleInternalLinks
	// it('', recursiveAllPossibleInHrefLinksArrayBuilding(markdownString)

	// Expected warnings thrown
	// const warningsArray = [
	// 	'WARNING in line 32: Internal link "#test--test)" is not valid. Such header name and/or header nesting order does not exist.'
	// ]

})
