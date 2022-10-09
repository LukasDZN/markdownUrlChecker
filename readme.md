# Introduction

This Node JS script parses .md files within "input" directory and prints out an array of broken URLs that were found.

## General concept

The URL checker works by:

1. Finding internal markdown links via regex (e.g. [`Some title`](#Title--sub-title--sub-sub-title) 
2. Then, parsing the whole .md document and recursively building a headerObject, which is then used to create an array of all possible valid internal links.
3. Comparing the two arrays. If there's an item in the array from point 3. that is not found within point 2., then an alert is raised.
