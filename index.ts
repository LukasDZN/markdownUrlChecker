// Goal is internal link checking, not sorting (yet), so newlines are less relevant

import { headerObject } from './interfaces'
import parseStringToCreateInternalLinksArray from "./helper/parseStringToCreateInternalLinksArray"
import convertHeaderTitleToInternalLink from "./helper/convertHeaderTitleToInternalLink"
import recursiveAllPossibleInternalLinksArrayBuilding from "./helper/recursiveAllPossibleInternalLinksArrayBuilding"

// """
// ## My header

// text
// <newline>
// """

// // Try to read all .md files
// open ./public/docs/../.. 
// read all .md files

// OR 
// detect .md files that have been changed
// parse those files




// Which methods will I need? For internal link checking for example (include this with markdown header sorter)
    // Most efficient way of comparing?
        // Build an array of possible internal links and check if it's in array?
        // Deconstruct each link some--fee-fo--loo to "# some", "## fee fo", "### loo" - however, this is minimized, the header title could be "## fee fo" or ##Fee Fo ", so it's better to normalize it and not de-normalize it. Include only raw data in the object. Add methods to process the data.
// Simply select using regex?
// Make it more robust - headers can have either a newline before/after it or not.
// Setting to either have or not have newlines before/after headers, as the collected data is raw and the output is formatted. 

// Build an object with methods such as:
// myObject.levelOneHeaders()  // returns an array

// Will I be able to:
// - Get all possible URLs
// - Sort by selected level
// - Sort everything







