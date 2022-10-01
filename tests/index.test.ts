import fs from 'fs';
import { headerObject } from '../interfaces';
import parseStringToCreateInternalLinksArray from '../helper/parseStringToCreateInternalLinksArray';
import convertHeaderTitleToInternalLink from '../helper/convertHeaderTitleToInternalLink';
import recursiveAllPossibleInHrefLinksArrayBuilding from '../helper/recursiveAllPossibleInHrefLinksArrayBuilding';
import parseStringForHeaderArrayOfObjects from '../helper/parseStringForHeaderArrayOfObjects';
import raiseWarningsForInvalidInternalLinks from '../helper/raiseWarningsForInvalidInternalLinks'

// Documentation: https://jestjs.io/docs/using-matchers
// toBe for primitives like strings, numbers or booleans for everything else use toEqual // https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest
// .toMatchObject / .toStrictEqual
// it.only -> to run only the specified test

describe('mainTestGroup', () => {
    const markdownString: string = fs.readFileSync('./tests/testMarkdownString.md', {
        encoding: 'utf8',
        flag: 'r'
    });
    const internalLinkArray: Array<string> = parseStringToCreateInternalLinksArray(markdownString);
    const resultHeaderArrayOfObjects: any = parseStringForHeaderArrayOfObjects(markdownString);
    const resultAllPossibleInternalLinksArray: any = recursiveAllPossibleInHrefLinksArrayBuilding(resultHeaderArrayOfObjects)




    it('Markdown string file type is string.', () => {
        expect(typeof markdownString).toBe('string');
    });





    it('Parse markdown string file for internal links.', () => {
        const expectedArray: Array<string> = [
            '#appendix--security',
            '#appendix--changelog',
            '#appendix--version-guide',
            '#appendix--enum--currency',
            '#appendix--enum--account-status',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--default-charsets',
            '#appendix--enum--industry-id',
            '#appendix--enum--language-code',
            '#appendix--enum--error-code',
            '#appendix--enum--account-status',
            '#appendix--enum--status-change-reason-code',
            '#appendix--enum--error-code',
            '#appendix--enum--error-code',
            '#appendix--enum--currency',
            '#appendix--enum--account-status',
            '#appendix--enum--status-change-reason-code',
            '#appendix--enum--error-code',
            '#appendix--enum--error-code'
        ];
        expect(internalLinkArray?.sort()).toEqual(expectedArray.sort());
    });

    it('Header object created.', () => {
        const expectedHeaderArrayOfObjects = [
            {
                headerTitle: '# Introduction',
                headerContentText: 'teest\r\ntt\r\n\r\ne\r\n\r',
                childHeadersArrayOfObjects: [
                    {
                        headerTitle: '## Security',
                        headerContentText: '',
                        childHeadersArrayOfObjects: []
                    },
                    {
                        headerTitle: '## Version',
                        headerContentText: '',
                        childHeadersArrayOfObjects: []
                    }
                ]
            },
            {
                headerTitle: '# Actions',
                headerContentText: 'something\r\n\r',
                childHeadersArrayOfObjects: [
                    {
                        headerTitle: '## Account',
                        headerContentText:
                            '### Create\r\n\r\n| URL  | Method | Header | Body            |\r\n|------|--------|--------|-----------------|\r\n| /api | POST   | empty  | \\{request data} |\r\n\r',
                        childHeadersArrayOfObjects: [
                            {
                                headerTitle: '### Change status',
                                headerContentText:
                                    '| URL  | Method | Header | Body            |\r\n|------|--------|--------|-----------------|\r\n| /api | POST   | empty  | \\{request data} |\r\n\r',
                                childHeadersArrayOfObjects: [
                                    {
                                        headerTitle: '#### Request',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    },
                                    {
                                        headerTitle: '#### Response',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    }
                                ]
                            },
                            {
                                headerTitle: '### Change program',
                                headerContentText:
                                    '| URL  | Method | Header | Body            |\r\n|------|--------|--------|-----------------|\r\n| /api | POST   | empty  | \\{request data} |\r\n\r',
                                childHeadersArrayOfObjects: [
                                    {
                                        headerTitle: '#### Request',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    },
                                    {
                                        headerTitle: '#### Response',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    }
                                ]
                            },
                            {
                                headerTitle: '### Get',
                                headerContentText:
                                    '| URL  | Method | Header | Body            |\r\n|------|--------|--------|-----------------|\r\n| /api | POST   | empty  | \\{request data} |\r\n\r',
                                childHeadersArrayOfObjects: [
                                    {
                                        headerTitle: '#### Request',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    },
                                    {
                                        headerTitle: '#### Response',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    }
                                ]
                            },
                            {
                                headerTitle: '### Assign to risk rule group',
                                headerContentText:
                                    '| URL  | Method | Header | Body            |\r\n|------|--------|--------|-----------------|\r\n| /api | POST   | empty  | \\{request data} |\r\n\r',
                                childHeadersArrayOfObjects: [
                                    {
                                        headerTitle: '#### Request',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    },
                                    {
                                        headerTitle: '#### Response',
                                        headerContentText: '',
                                        childHeadersArrayOfObjects: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        expect(resultHeaderArrayOfObjects?.sort()).toEqual(expectedHeaderArrayOfObjects.sort())
    });




    it('Header title converted to internal link.', () => {
        const testStringsRawAndResult = [
            ['# Foo', 'foo'],
            ['## Foo fee', 'foo-fee'],

            // PM API: #### Transaction not permitted to issuer/cardholder
            [' ##  Foo Fee / Fa ', 'foo-fee-fa'],
            [' ##  Foo Fee      Fa ', 'foo-fee-fa'],
            ['    ##  Foo Fee/Fa', 'foo-feefa'],
            ['    ##  Foo Fee/  &Fa', 'foo-fee-fa'],

            ['# Get CVC2 ', 'get-cvc2']
        ];

        const expectedArray = Array();
        testStringsRawAndResult.map((arrayElement) => {
            expectedArray.push(arrayElement[1]);
        });

        const resultArray = Array();
        testStringsRawAndResult.forEach((arrayElement) => {
            const processedString = convertHeaderTitleToInternalLink(arrayElement[0]);
            resultArray.push(processedString);
        });

        expect(resultArray.sort()).toEqual(expectedArray.sort());
    });

    it('Array of all possible internal links created.', () => {
        // const expectedArray: Array<string> = [
        //     ''
        // ]
        // console.log(resultAllPossibleInternalLinksArray)
        // expect(resultArray.sort()).toEqual(expectedArray.sort());
    })





    // it('Raise warnings for invalid internal links.', () => {
    //     const expectedWarningArray: Array<string> = [
    //         'WARNING: Internal link "(#test--test)" is not valid. Such header name and/or header nesting order does not exist.',
    //     ]
    //     const resultWarningArray: Array<string> = raiseWarningsForInvalidInternalLinks(internalLinkArray, resultAllPossibleInternalLinksArray)
    //     console.log(resultWarningArray)
    //     // expect(resultWarningArray.sort()).toEqual(expectedWarningArray.sort());
    // })

    // How it works
    // 1. [DONE 01/10/2022] Parser creates an object from markdown.
    // 2. [IN-PROGRESS] Another parser creates an array with all possible valid urls
    // 3. [DONE 01/10/2022] Get all existing internal links from the doc
    // 4. [PENDING] Compare them against a list of valid possible links - throw errors and suggestions. 

});
