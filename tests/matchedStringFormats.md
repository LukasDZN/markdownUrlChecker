something

## Enum

### Account status

| ID | Type         | Description                      |
|----|--------------|----------------------------------|
| A  | Active       |                                  |
| R  | Receive only |                                  |
| P  | Spend only   |                                  |
| S  | Suspended    |                                  |
| B  | Blocked      | Final status for closed account. |

### Authorization type

| Type | Description        |
|------|--------------------|
| AN   | Normal authorize   |
| AP   | Pre authorize      |
| AF   | Final authorize    |













// Do not include any newlines before or after - regex must be able to:
1. Match strings with least formatting applied.
2. Then build the content and apply formatting options, such as:
    - Include newline before headerTitle
    - Include newline after headerTitle
    - Include newline before headerContentText
    - Include newline after headerContentText
    - Include newline before childHeadersString
    - Include newline after childHeadersString



headerTitle = "# Introduction"




headerContentText = "this is some

teeeeexxxxtt

also some text more"




childHeadersString = "## Security

**Please make sure to read the appendix [`Security`](#appendix--security) before proceeding to use this API.**

## Version

To see the current version and details of recent changes, please see the [`Changelog`](#appendix--changelog)

%brandName% reserves the right to append Conditional 'C' and/or Optional 'O' fields without prior notice. The client's system/application should be prepared to accept the appended fields. All such changes will be Backward Compatible and shouldn't change the application logic.

All Backward Incompatible changes (related to the mandatory 'M' field) will be introduced ONLY with a new PM API [`version release`](#appendix--version-guide)

# Actions

## Account

### Create

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |"














