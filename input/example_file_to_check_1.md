<!--
 # Introduction
 ## Using documentation
 ## API
 ### Overview
 Learn about the ISAAC Program manager API endpoints and operations.

 Scheme - payment network (Mastercard, VISA, UPI, External Payment, Internal
 Payment, etc);
 Platform - any of ISAAC processor's parts, modules, operations;
 Client - service, TAI API user.

 ### Common workflows
  -->
# Introduction

teest
tt

e

## Security

**Please make sure to read the appendix [`Security`](#appendix--security) before proceeding to use this API.**

## Version

To see the current version and details of recent changes, please see the [`Changelog`](#appendix--changelog)

%brandName% reserves the right to append Conditional 'C' and/or Optional 'O' fields without prior notice. The client's system/application should be prepared to accept the appended fields. All such changes will be Backward Compatible and shouldn't change the application logic.

All Backward Incompatible changes (related to the mandatory 'M' field) will be introduced ONLY with a new PM API [`version release`](#appendix--version-guide)

# Actions

something

## Account

### Create

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter                            | M | Type     | Length | Description                                                                                                                                                                                                           |
|--------------------------------------|---|----------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key                           | M | AN       | 20     |                                                                                                                                                                                                                       |
| access_api_id                        | M | AN       |        |                                                                                                                                                                                                                       |
| access_api_key                       | M | AN       |        |                                                                                                                                                                                                                       |
| action                               | M | AN       |        | Fixed `createAccount`                                                                                                                                                                                                 |
| api_version                          | M | NS       |        | Fixed `1.1`                                                                                                                                                                                                           |
| request_reference_id                 | O | ANS      | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                                                                                                                             |
| currency_ison                        | M | N        | 3      | Account [`currency ISON`](#appendix--enum--currency)                                                                                                                                                                  |
| account_status                       | M | A        | 1      | [`Account status`](#appendix--enum--account-status)                                                                                                                                                                   |
| access_level                         | O | N        | 0-1000 | If not provided, the default value will be set by the program.                                                                                                                                                        |
| program_id                           | M | N        | 1-20   | Program ID.                                                                                                                                                                                                           |
| risk_rules_group_id                  | O | N        | 1-20   | If not provided, the risk rule group ID will be set by the program.                                                                                                                                                   |
| fee_group_id                         | O | N        | 1-20   | If not provided, the fee group ID will be set by the program.                                                                                                                                                         |
| cards                                | O | EXT-LIST | -      | A list of cards IDs                                                                                                                                                                                                   |
| limit_group_id                       | O | N        | 1-20   | If not provided, the limit group ID will be set by the program.                                                                                                                                                       |
| skip_holder_validation               | M | [0,1]    | 1      | If the value is 0 - Card and Holder validation will be performed. If the value is 1, any Card can be assigned to the Holder.                                                                                          |
| holder_id                            | O | N        | 1-20   | If not provided a new holder will be registered, otherwise an existing holder will be assigned.                                                                                                                       |
| holder_title                         | O | ANS      | 1-7    | Optional if `holder_id` isn't provided.                                                                                                                                                                               |
| holder_type                          | O | N        | 1      | `0` - personal, `1` - business. Default value: `0`                                                                                                                                                                    |
| holder_access_level                  | O | N        | 0-1000 | If not provided the default value will be set by the program.                                                                                                                                                         |
| holder_business_name                 | C | ANS      | 1-50   | Mandatory if holder_type = `1`                                                                                                                                                                                        |
| holder_first_name                    | C | AS       | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Holder` additional charset field which can be selected on the program  |
| holder_last_name                     | C | AS       | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Holder` additional charset field which can be selected on the program  |
| holder_address_line_1                | C | ANS      | 1-100  | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program |
| holder_address_line_2                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program  |
| holder_address_line_3                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program  |
| holder_address_line_4                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program  |
| holder_country_ison                  | C | N        | 3      | Mandatory if `holder_id` isn't provided.                                                                                                                                                                              |
| holder_zipcode                       | C | ANS      | 1-9    | Mandatory if `holder_id` isn't provided.                                                                                                                                                                              |
| holder_city                          | C | ANS      | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program |
| holder_state                         | O | ANS      | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                          |
| holder_phone_number                  | C | N        | 6-15   | Mandatory if `holder_id` isn't provided.                                                                                                                                                                              |
| holder_email                         | O | ANS      | 6-100  | Optional if `holder_id` isn't provided.                                                                                                                                                                               |
| holder_date_of_birth                 | O | ANS      | 10     | Optional if `holder_id` isn't provided. Format: `Y-m-d`, example: `2020-06-24`. Can not be a future date.                                                                                                             |
| holder_ip_address                    | O | ANS      | 7-15   | Optional if `holder_id` isn't provided.                                                                                                                                                                               |
| holder_limit_group_id                | O | N        | 1-20   | If not provided, the default limit group ID will be set by the program. Note: if the program does not have a holder limit group it will not be set.                                                                   |
| holder_industry_id                   | O | N        | 4      | [`Industry ID`](#appendix--enum--industry-id)                                                                                                                                                                         |
| holder_date_of_company_incorporation | O | ANS      | 10     | Format: `Y-m-d`, example: `2020-06-24`. Can not be a future date.                                                                                                                                                     |
| holder_locale                        | O | AS       | 1-15   | [`Language code identifiers`](#appendix--enum--language-code)                                                                                                                                                         |
| kyc_completion_level                 | O | N        | 1      | Optional if `holder_id` isn't provided.                                                                                                                                                                               |
| kyc_document_expiration_date         | O | ANS      | 10     | Optional if `holder_id` isn't provided.                                                                                                                                                                               |
| additional_charset_id                | O | N        | 1-10   | Additional charset allows to use additional symbols for specified fields.                                                                                                                                             |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "createAccount",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "currency_ison": "840",
    "account_status": "A",
    "access_level": "0",
    "program_id": 1,
    "fee_group_id": 1,
    "cards": [],
    "limit_group_id": 6,
    "skip_holder_validation": 0,
    "holder_id": 1,
    "holder_access_level": "0",
    "holder_title": "Mr",
    "holder_first_name": "John",
    "holder_last_name": "Smith",
    "holder_address_line_1": "Bridge St",
    "holder_address_line_2": "London",
    "holder_address_line_3": "United Kingdom",
    "holder_address_line_4": "Europe",
    "holder_country_ison": "440",
    "holder_zipcode": "12345",
    "holder_city": "City",
    "holder_state": "State",
    "holder_phone_number": "142544544",
    "holder_email": "email@email.com",
    "holder_date_of_birth": "1989-10-10",
    "holder_ip_address": "8.8.8.8",
    "holder_limit_group_id": 10,
    "holder_industry_id": null,
    "holder_date_of_company_incorporation": null,
    "holder_locale": "en_US",
    "kyc_completion_level": 0,
    "kyc_document_expiration_date": "2019-05-26"
}
```

#### Response

| Parameter        | M | Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|------------------|---|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status           | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| duplicated       | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has been finished, the original request response will be returned.                                                                                                                                                                                                                                                                                                                                                 |
| data             | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| data / id        | M | N    | Account ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| data / holder_id | M | N    | Account owner ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| status_code      | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=createAccount_-_Error_codes data-header-separator=_ data-filter-by-values=005-100-359-437-460-462-473-502-503-504-505-506-507-508-509-510-511-512-513-514-515-516-517-518-519-520-521-522-523-524-525-527-528-529-530-938-940-941-1089-1090-1093-1095-1096-1097-1098-1099-1125-1489-1518-1519-1520-1521-1438-1449-006-139-1439-1440-141-475-009-1279-1280-1271-1645-1646-1647-1648-1649-1671-1675-1676-1677-1679-1680-1815-1919-000-9999 } Mandatory if status = `error`. |
| message          | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": {
        "id": 223,
        "holder_id": 200
    }
}
```

### Change status

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |