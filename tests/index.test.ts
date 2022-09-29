import fs from "fs";
import parseStringToCreateInternalLinksArray from "../helper/parseStringToCreateInternalLinksArray"
import convertHeaderTitleToInternalLink from "../helper/convertHeaderTitleToInternalLink"
import recursiveAllPossibleInternalLinksArrayBuilding from "../helper/recursiveAllPossibleInternalLinksArrayBuilding"
import headerArrayOfObjects from "../helper/headerArrayOfObjects"

// Documentation: https://jestjs.io/docs/using-matchers
// toBe for primitives like strings, numbers or booleans for everything else use toEqual // https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest

describe('mainTestGroup', () => {

	it('Markdown string file type is string.', () => {
		// Get test markdown string
		const markdownString: string = fs.readFileSync('./tests/testMarkdownString.md', {encoding:'utf8', flag:'r'})
		expect(typeof markdownString).toBe('string')
	})

	it('Parse markdown string file for internal links', () => {
		const markdownString: string = fs.readFileSync('./tests/testMarkdownString.md', {encoding:'utf8', flag:'r'})
		const internalLinkArray = parseStringToCreateInternalLinksArray(markdownString)
		const expectedArray: Array<string> = [
			"[`Security`](#appendix--security)",
			"[`Changelog`](#appendix--changelog)",
			"[`version release`](#appendix--version-guide)",
			"[`currency ISON`](#appendix--enum--currency)",
			"[`Account status`](#appendix--enum--account-status)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Default charsets`](#appendix--enum--default-charsets)",
			"[`Industry ID`](#appendix--enum--industry-id)",
			"[`Language code identifiers`](#appendix--enum--language-code)",
			"[`Possible error codes`](#appendix--enum--error-code)",
			"[`Account status`](#appendix--enum--account-status)",
			"[`Status change reason code`](#appendix--enum--status-change-reason-code)",
			"[`Possible error codes`](#appendix--enum--error-code)",
			"[`Possible error codes`](#appendix--enum--error-code)",
			"[`currency ISON`](#appendix--enum--currency)",
			"[`Account status`](#appendix--enum--account-status)",
			"[`Status change reason code`](#appendix--enum--status-change-reason-code)",
			"[`Possible error codes`](#appendix--enum--error-code)",
			"[`Possible error codes`](#appendix--enum--error-code)"
		]
		expect(internalLinkArray?.sort()).toEqual(expectedArray.sort())
	})

	// Expected header object

	// Expected allPossibleInternalLinks

	// Expected warnings thrown
	// const warningsArray = [
	// 	'WARNING in line 32: Internal link "[`test`](#test--test)" is not valid. Such header name and/or header nesting order does not exist.'
	// ]

})
