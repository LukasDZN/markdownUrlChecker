content script DOM vs tab DOM
Content script console can't access tab DOM and vice versa, but in script it can?

Same script runs in two different instances at once. One as a script for the tab and one as a script within popup.html

Source: https://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts
- Website script (within <script> tag)
- Injected scripts (via this method in a Content script) - Full access to all properties in the page. No access to any of the chrome.* APIs. Injected scripts behave as if they were included by the page itself, and are not connected to the extension in any way.
- Content script
- Background script (service worker)

Updated:
https://www.freecodecamp.org/news/chrome-extension-message-passing-essentials/
Popup Script - Local JavaScript file for the extension DOM
Background Script - Provides persistence and handles background events
Content Script - Scripts that run in isolation in the context of the web page
Injected Script - Scripts that are programmatically injected into the web page

Background scripts can access all the WebExtension JavaScript APIs, but they can't directly access the content of web pages. So if your extension needs to do that, you need content scripts.

Just like the scripts loaded by normal web pages, content scripts can read and modify the content of their pages using the standard DOM APIs.

Content scripts can only access a small subset of the WebExtension APIs, but they can communicate with background scripts using a messaging system, and thereby indirectly access the WebExtension APIs.







https://redmine.tribepayments.com/issues/76516 -> need to update description







Double universe, jungle and sea life with neon animals by Alphonse Mucha at Salvador Dali painting
Mystic jungle landscape with neon jellyfish and silhouettes in fog walking towards a floating island



Young white man showing peace sign, Gta vice city, gta 5 cover art, borderlands style, celshading, symmetric highly detailed eyes, trending on artstation, by rhads, andreas rocha, rossdraws, makoto shinkai, laurie greasley, lois van baarle, ilya kuvshinov and greg rutkowski, "breaking bad" or "better call saul"








Service workers are a specialized kind of web worker.

On a typical web page (or extension background page), the global execution context for JavaScript is of type Window. This object exposes the capabilities that web developers are used to working with: window, element, IndexedDB, cookie, localStorage, etc.

The global scope for service worker is significantly more limited and doesn't have many of these features. Most notably, service workers don't have access to the DOM. Workers no longer provide XMLHttpRequest, but instead support the more modern fetch().



Tai Ingrida siuo atveju daro ir grammar review ir technical review.
















If no alerts are active - service worker will go idle. Awake service worker upon adding a new alert.


Will the background worker persist as long as it has an alert to keep checking on? If yes, then only need to awake once a new alert is added. If not, then need to find ways to awake it.
https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/66618269#66618269
Alarms should wake up the worker


https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
Nope, JavaScript/EcmaScript don't support named parameters. Sorry. – 
Alternative: myFunction({ param1 : 70, param2 : 175});


- For public release - Add domainName setting to storage.local
	- const isCurrentTabARedminePage = <-- in popup.js regex validation

Scrollbar design

Test cases:
- Packed vs unpacked extensions (essentially prod. version behavior)
- Test on different browsers
- Try first-time install on a different machine
- Open multiple windows
- Look for errors / service worker falling asleep / edge use cases
- Check code for possible error handling


Packing an extension
https://stackoverflow.com/questions/5208408/install-chrome-extension-as-external-extensions

- Uploading an extension to google store -> is the code closed source? How to release updates? Other general information from blogs?
When and how often to chrome extensions get to update?


Potential release - when? Release to the company as a chrome extension on the store, with automatic updates. Because of that - a bit longer to finalize, add configuration for other clients







Task ID
Field
Value


if domain name not configured -> display logo.
Need a base domain name for work colleagues -> if a fetch request upon install fails - request domain name. But response must not be not allowed (vpn might not be active).


Turn items into table elements
CSS sizing - settings page should not change window size.
	- Scrollbar is adding extra 20 pixels. Scrollbar should be within body or something.
Slider position needs to be tracked.
	- Setting change should rebuild a settings object. If it is different than the original object -> clicking save will overwrite the settings.



Finalize user analytics
Read domain name in background.js -> if none specified, open settings module, prevent closing unless domain name is saved.
	- [REJECTED] Provide domain name for tribe users.
Add OS notifications (there should be code for it already)
Add comments
Add alerts for Redmine queries
	- not empty or more than X items (to get notified of bottlenecks)
Implement date field checking
Rewrite description
Test new user installation on multiple devices, pc shutdown, etc.
Assignee - Lukas Dzenkauskas turns in to -> << Me >> and never triggers.
Alert compare regex is not working properly sometimes, find edge cases
[DONE] Alerts displayed as a table
[DONE] Highlighted icon indicator (badge) -> when is it supposed to be on?
[DONE] Unify font type
[DONE] Implement 'not empty' trigger
[DONE] Save settings
[DONE] Add regex validation for settings input
[DONE] Retrieve and display settings
[DONE] Set slider position programatically
[DONE] Button css
[DONE] Redesign settings page
[DONE] UI -> professional, modern, trustworthy, aligned with redmine - something to sell.

If the service worker is 'asleep' and I click to view it within extension developer tab, thus awakening it, it will not do anything - no function will be running. Then the extension needs to be restarted in order to start working again.
Then it falls asleep again, because no action is taking place.
If extension is restarted -> everything works properly again.

Viewing popup.js console, then minimizing it for a few minutes, then adding an alert that would trigger, results in not triggering. Meaning that the service worker is asleep.
Although in extensions view, the worker seems to go to sleep and awake periodically.

Does it need to keep sending requests otherwise it falls asleep?




You can view extesion's source code and even remove the paywall. 
Need to make it hard enough to not be worth it. Also, only developers would do this.
https://www.youtube.com/watch?v=PRRWdnUQeqY

Best you can do is mimify, add your credentials to the code, add a disclaimer, and hope no one steals it.


Google form submitting using API:
https://theconfuzedsourcecode.wordpress.com/2019/11/11/you-may-restfully-submit-to-your-google-forms/
Edit form:
https://docs.google.com/forms/d/105JpznjiZZcPBnbhOP3mGuPZZ3xKhbhojkoLPsKpWTQ/edit#responses
View result sheet:
https://docs.google.com/spreadsheets/d/1wd9wn2qSwoDGb23daatX-q73BnBz-leXb58li983bvQ/edit?resourcekey#gid=368816566





.activeAlertDelete {
    background-color: white;
    color: rgb(212 138 62);
    outline: solid 1px #ffffff;
    font-size: 0.85rem;
    /* font-weight: bold;


.flex-container-createAlert {
    display: flex;
    /* justify-content: space-between; */
    padding: 0.7rem 1rem;
    /* background-image: linear-gradient(62deg, #fcd5be 0%, #dee1fc 100%); */
    background-color: white;
    border-radius: 4px;
    margin-bottom: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 1px 3px 1px;
    outline: green;
}




Chrome extension check why page is not openned
Check commited cardframe changes
Recalculate charcs  / words on load example and clear button click, also zoom out (parent px, all other should be rem)
A function for building an object from markdown text:


// Add a did you mean (get the last piece of URL, and if it's unique, try to find a valid link), or try to find the longest valid link starting from the end, and suggest options for beginning. If the name of the final item is correct (aka it exists, then the only question is whether there already exist another valid path to it.)

Write code and send to Dziugas.


			
1 on 1 meeting with Laura in 2 weeks. Chrome extension, chrome theme, CI/CD tool for internal link checking, tampermonkey templates might be done.
Bring raspberry to the office? More reliable internet, no need to connect to VPN, Laura or someone else can reset it.

Sort by selected header level -> this should be a multi-select.









// Goal is internal link checking, not sorting (yet), so newlines are less relevant


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







# Header1

header text1

## sub-header1

sub-header text1

## sub-header2

sub-header text2


Each header has:
- OPTIONAL text (or doesn't have it)
- Sub-headers

Headers have an order. Perhaps arrays are better.
There are 6 header levels, more must not count.



Remove google login and mongodb - make it completely open in local area network.
Close port on router.
Disable raspberry port opening.

Now it's just down itself. Not even SSH works - why? Try local ip ssh?




Delete github history
Upload to npm package site
Begin coding the object builder with regex.


There can be a ### heading right aftr # 
