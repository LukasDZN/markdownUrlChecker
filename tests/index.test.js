import fs from "fs";

describe('mainTestGroup', () => {

	it('Test markdown string file type is string.', () => {
		// Get test markdown string
		const string = fs.readFileSync('./testMarkdownString.md', {encoding:'utf8', flag:'r'})
		expect(typeOf(string)).toBe('string')
	})

	// Expected header object

	// Expected allPossibleInternalLinks

	// Expected warnings thrown
	// const warningsArray = [
	// 	'WARNING in line 32: Internal link "[`test`](#test--test)" is not valid. Such header name and/or header nesting order does not exist.'
	// ]

})
