import fs from 'fs';
import parseStringToCreateInternalLinksArray from './helper/parseStringToCreateInternalLinksArray.js';
import { recursiveAllPossibleInHrefLinksArrayBuilding } from './helper/recursiveAllPossibleInHrefLinksArrayBuilding.js';
import parseStringForHeaderArrayOfObjects from './helper/parseStringForHeaderArrayOfObjects.js';
import raiseWarningsForInvalidInternalLinks from './helper/raiseWarningsForInvalidInternalLinks.js';

const inputFolderName = 'input';
let fileCount = 0;
let fileWithErrorCount = 0;
fs.readdirSync(inputFolderName).forEach((filename) => {
    const iterator = () => {
        if (!filename.endsWith('.md')) {
            return;
        }
        const markdownString: string = fs.readFileSync(`./${inputFolderName}/${filename}`, {
            encoding: 'utf8',
            flag: 'r'
        });
        const internalLinkArray: Array<string> =
            parseStringToCreateInternalLinksArray(markdownString);
        const headerArrayOfObjects: any = parseStringForHeaderArrayOfObjects(markdownString);
        const allPossibleInternalLinksArray: any =
            recursiveAllPossibleInHrefLinksArrayBuilding(headerArrayOfObjects);
        const warningArray: Array<string> = raiseWarningsForInvalidInternalLinks(
            internalLinkArray,
            allPossibleInternalLinksArray
        );
        if (warningArray.length !== 0) {
            const prettyArray = JSON.stringify(warningArray, null, 2).replace(/\\/g, '');
            const resultString = `Filename: "${filename}"\nWarning array:\n${prettyArray}`;
            const outlineSymbols = '-'.repeat(150);
            const output = '\n' + outlineSymbols + '\n' + resultString + '\n' + outlineSymbols;
            console.log(output);
            fileWithErrorCount++;
            if (process.argv[2] === 'exportTrue') {
                fs.writeFileSync(
                    `./output/${filename.replace('.md', '')}_output.json`,
                    prettyArray
                );
            }
        }
        fileCount++;
    };
    iterator();
});
const resultString = `Results: ${fileCount} files were checked, ${fileWithErrorCount} had warnings.`;
const outlineSymbols = '='.repeat(resultString.length);
console.log('\n' + outlineSymbols + '\n' + resultString + '\n' + outlineSymbols + '\n');
