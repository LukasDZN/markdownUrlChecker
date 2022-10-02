import fs from 'fs';
import { headerObject } from './interfaces.js';
import parseStringToCreateInternalLinksArray from './helper/parseStringToCreateInternalLinksArray.js';
import { recursiveAllPossibleInHrefLinksArrayBuilding } from './helper/recursiveAllPossibleInHrefLinksArrayBuilding.js';
import parseStringForHeaderArrayOfObjects from './helper/parseStringForHeaderArrayOfObjects.js';
import raiseWarningsForInvalidInternalLinks from './helper/raiseWarningsForInvalidInternalLinks.js';

const inputFolderName = 'input';
fs.readdirSync(inputFolderName).forEach((filename) => {
    const markdownString: string = fs.readFileSync(`./${inputFolderName}/${filename}`, {
        encoding: 'utf8',
        flag: 'r'
    });

    const internalLinkArray: Array<string> = parseStringToCreateInternalLinksArray(markdownString);
    const headerArrayOfObjects: any = parseStringForHeaderArrayOfObjects(markdownString);
    const allPossibleInternalLinksArray: any =
        recursiveAllPossibleInHrefLinksArrayBuilding(headerArrayOfObjects);
    const warningArray: Array<string> = raiseWarningsForInvalidInternalLinks(
        internalLinkArray,
        allPossibleInternalLinksArray
    );
    console.log(warningArray);
});
