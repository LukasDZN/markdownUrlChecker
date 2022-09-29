import fs from "fs";
import parseStringToCreateInternalLinksArray from "../helper/parseStringToCreateInternalLinksArray"
import convertHeaderTitleToInternalLink from "../helper/convertHeaderTitleToInternalLink"
import recursiveAllPossibleInHrefLinksArrayBuilding from "../helper/recursiveAllPossibleInHrefLinksArrayBuilding"
// import headerArrayOfObjects from "../helper/headerArrayOfObjects"

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

	// Expected header object

	// Expected allPossibleInternalLinks
	// it('', recursiveAllPossibleInHrefLinksArrayBuilding(markdownString)

	// Expected warnings thrown
	// const warningsArray = [
	// 	'WARNING in line 32: Internal link "#test--test)" is not valid. Such header name and/or header nesting order does not exist.'
	// ]

})
