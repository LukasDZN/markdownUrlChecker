import fs from 'fs';
import { headerObject } from './interfaces';
import parseStringToCreateInternalLinksArray from './helper/parseStringToCreateInternalLinksArray';
import convertHeaderTitleToInternalLink from './helper/convertHeaderTitleToInternalLink';
import recursiveAllPossibleInHrefLinksArrayBuilding from './helper/recursiveAllPossibleInHrefLinksArrayBuilding';
import parseStringForHeaderArrayOfObjects from './helper/parseStringForHeaderArrayOfObjects';
import raiseWarningsForInvalidInternalLinks from './helper/raiseWarningsForInvalidInternalLinks';

// Input relative file path

// const inputFolderName = 'input';
// fs.readdirSync(inputFolderName).forEach((filename) => {
//     const markdownString: string = fs.readFileSync(`./${inputFolderName}/${filename}.md`, {
//         encoding: 'utf8',
//         flag: 'r'
//     });

//     const internalLinkArray: Array<string> = parseStringToCreateInternalLinksArray(markdownString);
//     const headerArrayOfObjects: any = parseStringForHeaderArrayOfObjects(markdownString);
//     const allPossibleInternalLinksArray: any =
//         recursiveAllPossibleInHrefLinksArrayBuilding(headerArrayOfObjects);
//     const warningArray: Array<string> = raiseWarningsForInvalidInternalLinks(
//         internalLinkArray,
//         allPossibleInternalLinksArray
//     );
//     console.log(warningArray);
// });
