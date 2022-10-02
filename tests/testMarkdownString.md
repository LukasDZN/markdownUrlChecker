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
| currency_ison                        | M | N        | 3      | Account [`currency ISON`](#appendix--enum--currencyy)                                                                                                                                                                  |
| account_status                       | M | A        | 1      | [`Account status`](appendix--enum--account-status)                                                                                                                                                                   |
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

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `changeAccountStatus`                                               |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| account_id           | M | N    | 1-20   |                                                                           |
| account_status       | M | S    | 1      | [`Account status`](#appendix--enum--account-status)                       |
| reason_code          | O | N    | 1-20   | [`Status change reason code`](#appendix--enum--status-change-reason-code) |
| note                 | O | ANS  | 1-255  | A short description which explains why account status has been changed.   |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeAccountStatus",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "account_id": "206",
    "account_status": "R",
    "reason_code": 3,
    "note": "Customer decision"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                          |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                 |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                               |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                          |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=changeStatus_-_Error_codes data-header-separator=_ data-filter-by-values=367-476-477-367-478-479-480-481-1489-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-1580-1920-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                         |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Change program

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                                                         |
|----------------------|---|------|--------|-----------------------------------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                                                     |
| access_api_id        | M | AN   |        |                                                                                                     |
| access_api_key       | M | AN   |        |                                                                                                     |
| action               | M | AN   |        | Fixed `changeAccountProgramId`                                                                      |
| api_version          | M | NS   |        | Fixed `1.1`                                                                                         |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                           |
| account_id           | M | N    | 1-20   |                                                                                                     |
| account_program_id   | M | N    | 1-20   | Should be the new Program ID and must be a valid account program assigned to the Programme Manager. |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeAccountProgramId",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "account_id": 206,
    "account_program_id": 503
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                     |
|-------------|---|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                            |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                     |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=changeAccountProgramId_-_Error_codes data-header-separator=_ data-filter-by-values=60-83-367-476-477-497-609-670-1489-1583-2017-2030-2031-9999} Mandatory if status = `error` |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                    |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Get

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                                                                            |
|----------------------|---|------|--------|------------------------------------------------------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                                                                        |
| access_api_id        | M | AN   |        |                                                                                                                        |
| access_api_key       | M | AN   |        |                                                                                                                        |
| action               | M | AN   |        | Fixed `getAccounts`                                                                                                    |
| api_version          | M | NS   |        | Fixed `1.1`                                                                                                            |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                              |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used. Access level can impact the returned list size. |
| card_id              | C | N    | 1-20   | Required if account ID is empty.                                                                                       |
| account_id           | C | N    | 1-20   | Required if card ID is empty.                                                                                          |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getAccounts",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter                        | M | Type | Description                                                                                                                                                                                                                                                                             |
|----------------------------------|---|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                           | M | A    | `success` or `error`                                                                                                                                                                                                                                                                    |
| data                             | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                                   |
| data / id                        | M | N    | Account ID.                                                                                                                                                                                                                                                                             |
| data / holder_id                 | M | N    | Account owner ID.                                                                                                                                                                                                                                                                       |
| data / currency_ison             | M | N    | Account [`currency ISON`](#appendix--enum--currency)                                                                                                                                                                                                                                    |
| data / available_balance         | M | N    | Available card balance.                                                                                                                                                                                                                                                                 |
| data / settled_balance           | M | N    | Settled card balance.                                                                                                                                                                                                                                                                   |
| data / reserved_balance          | M | N    | Reserved balance. Funds suspended by the processor until the dispute is resolved.                                                                                                                                                                                                       |
| data / account_status            | M | A    | [`Account status`](#appendix--enum--account-status)                                                                                                                                                                                                                                     |
| data / status_change_reason_code | O | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)                                                                                                                                                                                                               |
| data / status_change_note        | O | ANS  |                                                                                                                                                                                                                                                                                         |
| data / date_updated              | M | N    | Unix timestamp of last account activity.                                                                                                                                                                                                                                                |
| data / program_id                | M | N    | Program ID.                                                                                                                                                                                                                                                                             |
| data / limit_group_id            | M | N    | Limit group ID or `null` if group is not set.                                                                                                                                                                                                                                           |
| data / fee_group_id              | M | N    | Fee group ID.                                                                                                                                                                                                                                                                           |
| data / risk_group_id             | M | N    | Risk group ID.                                                                                                                                                                                                                                                                          |
| status_code                      | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getAccounts_-_Error_codes data-header-separator=_ data-filter-by-values=210-366-367-463-496-1276-1277-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message                          | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                            |

```json
{
    "status": "success",
    "data": [
        {
            "id": 206,
            "holder_id": 206,
            "currency_ison": "826",
            "available_balance": "500",
            "settled_balance": "500",
            "reserved_balance": "0",
            "account_status": "A",
            "status_change_reason_code": null,
            "status_change_note": null,
            "date_updated": 1547649491,
            "program_id": 1,
            "limit_group_id": 1,
            "fee_group_id": 1
        }
    ]
}
```

### Assign to risk rule group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignAccountToRiskRuleGroup`                                      |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| account_id           | M | N    | 1-20   |                                                                           |
| risk_rule_group_id   | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignAccountToRiskRuleGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "account_id": 206,
    "risk_rule_group_id": 1
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                   |
|-------------|---|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                          |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                        |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                   |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignAccountToRiskRuleGroup_-_Error_codes data-header-separator=_ data-filter-by-values=006-009-139-141-367-475-496-1165-1271-1279-1280-1438-1439-1440-1449-1671-1695-1737-1893-1900-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                  |

# Appendix

## Version guide

| Update type   | Notation | Compatibility            | Description                                                                                                                                       |
|---------------|----------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Major version | X.1.1    | Breaking API changes     | A major update that will most likely affect the client's integration and therefore must be reviewed. Resets the minor and patch versions to zero. |
| Minor version | 1.X.1    | Non-backwards compatible | Minor changes that might affect the client's integration and therefore must be reviewed.                                                          |
| Patch         | 1.1.X    | Backwards compatible     | Minor changes that will not affect the client's integration - reviewing is not necessary.                                                         |

## Changelog

| Version | Date               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.2.86  | June 8, 2022       | <!-- dme --> Added a new method `cancelOutboundTransaction`. Added new error codes: 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, and 2362.                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.85  | June 6, 2022       | <!-- dme --> Added a new `External payment transaction type` type `Outbound cancelation`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.84  | June 6, 2022       | <!-- dme --> Added new external payment transaction status codes `Should not pay` and `Settled through suspense account`                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.83  | June 3, 2022       | <!-- lis --> Added `additional_charset_id` parameter to methods: `createCard`, `createAccount`, `updateExternalPaymentAddress`, and `assignExternalPaymentAddress`                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.82  | May 31, 2022       | <!-- dme --> Added a new request parameter `epm_transaction_type` and a new error code `1802` to `getExternalPaymentTransactions` methods.                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.81  | May 25, 2022       | <!-- dme --> Added a new external payment transaction status code `Required data is missing`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.80  | May 23, 2022       | <!-- dme --> Added new response parameters "available_balance", "settled_balance", and "balance" to `transferToExternalPayment` and `processOpenBankingPayment` methods.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.79  | March 25, 2022     | <!-- mak --> Updated method `getExternalPaymentTransactions`. Added new response parameter `additional_note`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.78  | March 21, 2022     | <!-- lis --> Added new ACS authentication method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.77  | February 18, 2022  | <!-- fba --> Added thermal line parameters to `reissueCard` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.76  | January 28, 2022   | <!-- sas --> Added new method `updateAddress`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.75  | January 20, 2022   | <!-- dme --> Updated `Transaction code` list. Added new records: `Dispute credit adjustment` and `Dispute debit adjustment`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.74  | January 3, 2022    | <!-- fba --> Added currency table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.73  | December 14, 2021  | <!-- lis --> Added methods `getTokenizationCardMetadata` , `getCardToken`, `getCardTokens`, and `changeCardTokenStatus`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.72  | December 8, 2021   | <!-- lis --> Updated `acs_external_client_integration_id` parameter description.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.71  | December 1, 2021   | <!-- ksa --> Updated `holder_date_of_company_incorporation` and `holder_date_of_birth` validation for methods: `createAccount`, `createCard`, `createHolder`, `updateHolder`. Future date is no longer available.                                                                                                                                                                                                                                                                                                                                      |
| 1.2.70  | December 1, 2021   | <!-- lis --> Updated method `changeCardAcsAuthMethod`. Parameters `acs_auth_method` and `acs_external_client_integration_id` format changed from AN to N.                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.69  | November 16, 2021  | <!-- sas --> Added a new request parameter `epm_address_id` to the `processOpenBankingPayment` method. The `sender_iban ` parameter requirement in the `getOpenBankingPaymentById` method was changed from mandatory to optional.                                                                                                                                                                                                                                                                                                                      |
| 1.2.68  | November 12, 2021  | <!-- ksa --> Added a new error code 2101 to `assignCardToLimitsGroup` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.67  | November 5, 2021   | <!-- sas --> Updated method "registerOpenBankingToken". Parameter `expiration_date` format changed from "2021-09-01" to "2005-08-15T15:52:01+0000".                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.66  | October 11, 2021   | <!-- lis --> Added new method `changeCardAcsAuthMethod`. Added request parameters `acs_auth_method` and `acs_external_client_integration_id` to `createCard` method.                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.65  | October 8, 2021    | <!-- dme --> Updated `Transaction code` list. Added new records: `P2P debit funds transfer` and `P2P credit funds transfer`                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.64  | August 16, 2021    | <!-- sas --> Updated method "registerOpenBankingToken". Parameter `token` length changed from `128` to `255`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.63  | August 20, 2021    | <!-- aj --> Added 'Try it Now' functionality to each API action (an ability to send API request to Demo environment directly from web browser).                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.62  | August 12, 2021    | <!-- mak --> Added new method `resetLimitsSequenceCount`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.61  | August 03, 2021    | <!-- mij --> Added `additional_charset_id` in `createHolder` and `updateHolder`. Added description with charsets used through out the system.                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.60  | August 02, 2021    | <!-- mak --> Parameter `reason_code` type changed from N to NS in `getTransactions` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.59  | July 31, 2021      | <!-- dme --> Added a new request parameter `balance_adjustment_type` and a new error code `2015` to `creditAdjustment` and `debitAdjustment` methods.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.58  | July 27, 2021      | <!-- sas --> Added new action `changeAccountProgramId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.58  | July 31, 2021      | <!-- dme --> Added a new request parameter `balance_adjustment_type` and a new error code `2015` to `creditAdjustment` and `debitAdjustment` methods.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.57  | July 26, 2021      | <!-- sas --> Added new method `directCreditReturn`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.56  | June 28, 2021      | <!-- vr --> Added new external payment transaction status codes: "Rejected by risk processor" and "Hold by risk processor". Added new external payment transaction statuses: "Pending in risk" and "Hold in risk".                                                                                                                                                                                                                                                                                                                                     |
| 1.2.55  | June 22, 2021      | <!-- dme --> Added new error code (141) to `assignExternalPaymentAddress`, `assignExternalPaymentAddressForSpecialAccount`, `getExternalPaymentAddress`, `changeExternalPaymentAddressStatus`, `cancelExternalPaymentMandate`, `transferToExternalPayment`, `directDebitReturn` and `changeDDExternalPaymentStatus`, methods.                                                                                                                                                                                                                          |
| 1.2.54  | June 16, 2021      | <!-- sas --> Added request parameter `epm_addresses` to `registerOpenBankingToken` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.53  | June 14, 2021      | <!-- dme --> Updated `External payment inbound return message code` list. Removed `0`, updated `5` and `6`, added `7`, `8`, `9` and `10` ID's.                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.52  | June 14, 2021      | <!-- dme --> Updated card status change. Can be changed from Not activated (N) to Stolen (S).                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.51  | June 14, 2021      | <!-- dme --> Added a new error code 1922 to "inboundReturn" method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.49  | June 11, 2021      | <!-- mak --> Updated method "getTransactions". Added new response parameters "interchange_rate_designator",                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.48  | May 26, 2021       | <!-- sas --> Added new error codes to  "Assign address to account" and "Assign address to special account"                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.47  | April 30, 2021     | <!-- lis --> Added request parameters `reason_code` and `note` to `changeCardStatus`, `changeAccountStatus`, `changeExternalPaymentAddressStatus` methods. Added response parameters `reason_code` and `note` to `getCardStatus` method. Added response parameters `status_change_reason_code` and `status_change_note` to `getCardDetails`, `getAccounts`, `getExternalPaymentAddress`, `getAccountExternalPaymentAddresses` methods. Added response parameter `status` to `getExternalPaymentAddress`, `getAccountExternalPaymentAddresses` methods. |
| 1.2.46  | May 17, 2021       | <!-- dme --> Updated `Transaction type` list. Added new records: `74`, `75` and `76`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.45  | May 17, 2021       | <!-- eb --> Updated description of field transaction_fee in getTransactions method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.44  | May 7, 2021        | <!-- vr --> Added new error code to "load" and "unload" method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.43  | May 5, 2021        | <!-- vr --> Added new error code to "createAccount" method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.42  | April 29, 2021     | <!-- lis --> Renamed method `scaConfirm` to `authenticationConfirm`. Added new request parameter `oob_auth_method` to `authenticationConfirm` method.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.41  | April 20, 2021     | <!-- sas --> Added new methods `getOpenBankingPaymentById` and `processOpenBankingPayment`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.40  | April 20, 2021     | <!-- vr --> Added new error code to "transferToExternalPayment" method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.39  | April 15, 2021     | <!-- eb --> Added a new transaction types "P2P credit cash deposit", "P2P debit cash deposit", "P2P credit merchant payment" and "P2P debit merchant payment".                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.38  | April 2, 2021      | <!-- mka --> Added `Signature` to security check bitmap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.37  | March 24, 2021     | <!-- lis --> Added new method `scaConfirm`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.36  | March 8, 2021      | <!-- mka --> Added new methods `assignAccountToRiskRuleGroup`, `assignAccountToLimitRuleGroup`, `assignAccountToFeeRuleGroup`. Added new response parameter `risk_group_id` to methods: `getAccounts`, `getCardDetails`, `getHolderAccounts`                                                                                                                                                                                                                                                                                                           |
| 1.2.35  | February 20, 2021  | <!-- mla --> Added new load sources "Balance adjustment load from GUI", "Balance adjustment load from PM API" and "Balance adjustment load by system"                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.34  | February 17, 2021  | <!-- dme --> Added new external payment transaction status codes: "External payment mandate status validation failed" and "Risk check failed".                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.33  | February 3, 2021   | <!-- sas --> Added new method `registerOpenBankingToken`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.32  | January 27, 2021   | <!-- dme --> Updated `destination_account_number` length in `transferToExternalPayment` method.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.31  | January 12, 2021   | <!-- mka --> Updated methods "getCardsActivity", "getFinancialAuthorizes". Added new response parameters "settlement_amount", "settlement_currency_ison", "settlement_conversion_rate". <br> Updated method "getTransactions". Added new response parameter "reconciliation_conversion_rate".                                                                                                                                                                                                                                                          |
| 1.2.30  | January 8, 2021    | <!-- mla --> Updated method "getTransactions". Added new response parameters "base_conversion_rate", "holder_conversion_rate" and "is_conversion_fee_blended". <br> Updated method "getFinancialAuthorizes" by adding new response parameters "base_conversion_rate", "holder_conversion_rate" and "is_conversion_fee_blended".                                                                                                                                                                                                                        |
| 1.2.29  | January 7, 2021    | <!-- eb --> Added new method "getTransactionCounters"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.28  | December 29, 2020  | <!-- eb --> Updated method "inboundReturn" and "transferToExternalPayment". Added new response parameter "trans_link".                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.27  | December 14, 2020  | <!-- dme --> Updated method "getExternalPaymentTransactions". Added new response parameters "transaction_identifier" and "end_to_end_identifier".                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.26  | December 7, 2020   | <!-- dme --> Updated `External payment transaction type` list. Updated ID `3`                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.25  | November 20, 2020  | <!-- mka --> Updated method "transferToExternalPayment". Added a new parameter "schemes".                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.24  | November 24, 2020  | <!-- dme --> Updated `External payment transaction type` list. Added new records: `8`, `9` and `10`                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.23  | November 24, 2020  | <!-- dme --> Updated `Transaction type` list. Updated ID `65`, added new records: `66`, `67`, `68` and `69`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.22  | November 24, 2020  | <!-- dme --> Added new method `createCustomFee`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.21  | November 24, 2020  | <!-- dme --> Added new method `directDebitReturn`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.20  | November 24, 2020  | <!-- dme --> Updated method `getFailedNotificationsCount`. Added a new conditional response parameter `first_failed_notification_date`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.19  | November 24, 2020  | <!-- dme --> Updated methods `transferToExternalPayment`. Added a new validation error code 1771.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.18  | November 24, 2020  | <!-- dme --> Updated methods `transferToExternalPayment` and `inboundReturn`. Added a new conditional response parameter `transaction_id`                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.17  | November 24, 2020  | <!-- dme --> Updated method `changeExternalPaymentAddressStatus`. Added a new validation error code 1772.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.16  | November 24, 2020  | <!-- dme --> Updated method `changeDDExternalPaymentStatus`. Added a new mandatory request parameter `reason` and added a new validation error codes: 1785, 1786 and 1787.                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.15  | November 24, 2020  | <!-- dme --> Updated method `cancelExternalPaymentMandate`. Added a new mandatory request parameter `reason` and added a new validation error codes: 1773 and 1774.                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.14  | November 24, 2020  | <!-- dme --> Updated methods `createAccount`, `createHolder`, `updateHolder` and `createCard`. Added a new optional request parameter `holder_locale` and added a new validation error code 1815.                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.13  | November 18, 2020  | <!-- dme --> Updated method `transferToExternalPayment`. Added a new validation error code: 1820.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.12  | September 25, 2020 | <!-- dme --> Updated method `getExternalPaymentTransactions` response parameters: `tx_type`, `status`, `status_code`, `settlement_amount`, `instructed_amount` and `account_type` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                 |
| 1.2.11  | September 25, 2020 | <!-- dme --> Updated method `getTransactions` response parameters: `transaction_amount`, `reconciliation_amount`, `holder_billing_amount`, `transaction_original_amount`, `reconciliation_original_amount`, `transaction_log_id`, `reason_code`, `transaction_fee_amount`, `parent_transaction_id`, `load_type`, `load_source`, `entry_mode_type_id`, `transaction_type`, `suspicious`, `transaction_fee`, `holder_amount` and `holder_currency_ison` cast types (from string to integer).                                                             |
| 1.2.10  | September 25, 2020 | <!-- dme --> Updated method `getFinancialAuthorizes` response parameters: `transmission_time`, `billing_amount`, `billing_conversion_rate`, `transaction_amount`, `transaction_fee_amount`, `cashback_amount`, `transaction_type`, `entry_mode_type`, `suspicious`, `card_present`, `currency_convertion_fee`, `transaction_fee` and `holder_amount` cast types (from string to integer).                                                                                                                                                              |
| 1.2.09  | September 25, 2020 | <!-- dme --> Updated method `getCardsActivity` response parameters: `card_present`, `transmission_time`, `billing_amount`, `billing_conversion_rate`, `holder_amount`, `transaction_amount`, `transaction_fee_amount`, `reversal`, `actual`, `cashback_amount`, `transaction_type`, `entry_mode_type`, `pad_cumulative_amount`, `suspicious`, `transaction_fee` and `currency_conversion_fee` cast types (from string to integer).                                                                                                                     |
| 1.2.08  | September 25, 2020 | <!-- dme --> Updated method `getLimitsStatus` response parameters: `original_count`, `count`, `original_amount`, `amount`, `original_country_count`, `country_count`, `duration`, `transaction_type_id`, `entry_mode_type_id`, `mcc_low` and `mcc_high` cast types (from string to integer).                                                                                                                                                                                                                                                           |
| 1.2.07  | September 25, 2020 | <!-- dme --> Updated method `getLimits` response parameters: `count`, `amount`, `country_count`, `duration`, `transaction_type_id`, `entry_mode_type_id`, `mcc_low` and `mcc_high` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                |
| 1.2.06  | September 25, 2020 | <!-- dme --> Updated method `getHolder` response parameters: `holder_type`, `phone_number`, `kyc_completion_level` and `industry_id` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.05  | September 25, 2020 | <!-- dme --> Updated method `getCardFees` response parameters: `mcc_low`, `mcc_high`, `fixed_price`, `percent_price`, `min_amount` and `max_amount` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.04  | September 25, 2020 | <!-- dme --> Updated methods `assignExternalPaymentAddress`, `assignExternalPaymentAddressForSpecialAccount`, `getExternalPaymentAddress` and `getAccountExternalPaymentAddresses` responses parameters `active`, `direct_credit_enabled`, `direct_debit_enabled`, `inbound_enabled` and `outbound_enabled` cast types (from boolean to integer).                                                                                                                                                                                                      |
| 1.2.03  | September 25, 2020 | <!-- dme --> Updated method `getDesign` response parameters `card_design_id` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.02  | September 25, 2020 | <!-- dme --> Updated method `reissueCard` response parameters: `card_holder_id` renamed to `holder_id` and `card_account_id` renamed to `account_id`                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.01  | September 25, 2020 | <!-- dme --> Updated method `getCardDetails` response parameters `reference_number` cast types (from integer to string).                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.00  | September 25, 2020 | <!-- dme --> Updated methods `getAccounts` and `getHolderAccounts` responses parameters `available_balance`, `settled_balance` and `reserved_balance` cast types (from string to integer).                                                                                                                                                                                                                                                                                                                                                             |

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
| AI   | Incremental        |
| AIM  | Instalment         |
| APC  | Preferred customer |
| AR   | Recurring          |
| ADC  | Delayed charges    |
| ANS  | No show            |
| AD   | Authorize advice   |
| ARF  | Refund             |
| R0   | Reversal 400       |
| R2   | Reversal 420       |
| AFT  | Account Funding    |

### Card status

| ID | Type          | Description                             |
|----|---------------|-----------------------------------------|
| A  | Activated     | Can be changed to: B, T, R, S, L, F, E. |
| B  | Blocked       | Can't be changed.                       |
| T  | Suspended     | Can be changed to: A, B, R, S, L, F.    |
| R  | Risk          | Can be changed to: A, B, T, S, L, F.    |
| S  | Stolen        | Can be changed to: B.                   |
| L  | Lost          | Can be changed to: A, B, T, R, S, F.    |
| E  | Expired       | Can be changed to: A, B.                |
| N  | Not activated | Can be changed to: A, B, S.             |
| F  | Fraud         | Can be changed to: A, B, T, R, S, L.    |

### Card token status

| ID | Type        |
|----|-------------|
| A  | Active      |
| N  | Not active  |
| I  | Deactivated |
| S  | Suspended   |
| D  | Deleted     |
| R  | Replacement |

### Card token type

| ID | Type                 |
|----|----------------------|
| 1  | Secure element       |
| 2  | Host card emulation  |
| 3  | Card on file         |
| 4  | E-commerce           |
| 5  | QR code              |
| 6  | Cloud-based payments |

### ECI indicator

#### Mastercard

##### Position 1-2

| Value | Description                                                                                                      |
|-------|------------------------------------------------------------------------------------------------------------------|
| 21    | Channel encryption; cardholder certificate not used (this is the preferred value for Mastercard ® SecureCode TM) |
| 22    | Masterpass-generated transaction                                                                                 |
| 24    | Digital Secure Remote Payment transaction                                                                        |
| 91    | No security protocol; cardholder certificate not used                                                            |

##### Position 3

| Value | Description                                                                                                                                                                      |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0     | UCAF data collection is not supported by the merchant or a SecureCode merchant has chosen not to undertake SecureCode on this transaction                                        |
| 1     | UCAF data collection is supported by the merchant, and UCAF data must be present (DE 48, subelement 43 must be present and contain an attempt AAV for Mastercard SecureCode)     |
| 2     | UCAF data collection is supported by the merchant, and UCAF data must be present (DE 48, subelement 43 must contain a fully authenticated AAV)                                   |
| 3     | UCAF data collection is supported by the merchant, and UCAF (Mastercard assigned Static Accountholder Authentication Value) data must be present.                                |
| 4     | Merchant has chosen to share authentication data within authorization; UCAF data collection not supported                                                                        |
| 5     | Issuer Risk Based Decisioning                                                                                                                                                    |
| 6     | Merchant Risk Based Decisioning                                                                                                                                                  |
| 7     | Partial shipment or recurring payment (DE 48, subelement 43 not required). Liability will depend on the original UCAF values provided and matching with the initial transaction. |
| 8     | Reserved for future use                                                                                                                                                          |
| 9     | Reserved for future use                                                                                                                                                          |

#### UnionPay

| value | Description                                                                                                                          |
|-------|--------------------------------------------------------------------------------------------------------------------------------------|
| 00    | Not applicable                                                                                                                       |
| 01    | Conduct UnionPay safe entry mode authentication, and check if cardholder security information was input successfully.                |
| 03    | Conduct the certification of Issuer SAA direct authentication authorization, and the SAA authentication authorization is successful. |
| 05    | Conduct the authentication of Issuer SA direct status verification, and the cardholder status verification is successful.            |
| 06    | Tried to conduct the Issuer direct status verification.                                                                              |
| 07    | Failed CUPSecure safe authentication, but adopted the security technology of channel.                                                |
| 08    | Failed CUPSecure safe authentication, and did not adopt the security technology of encryption.                                       |
| 09    | Issuer Authentication Mode in card-no-present CAT transactions.                                                                      |
| 10    | Issuer Non-Authentication Mode in card-no-present CAT transactions.                                                                  |

#### Visa

| Value | Description                                                                                                                                     |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| 00    | Not applicable                                                                                                                                  |
| 01    | Mail/Phone Order (MOTO)                                                                                                                         |
| 02    | Recurring transaction                                                                                                                           |
| 03    | Installment payment                                                                                                                             |
| 04    | Unknown classification/other mail order                                                                                                         |
| 05    | Secure electronic commerce transaction                                                                                                          |
| 06    | Non-authenticated security transaction at a 3-D Secure-capable merchant, and merchant attempted to authenticate the cardholder using 3-D Secure |
| 07    | Non-authenticated Security Transaction                                                                                                          |
| 08    | Non-secure transaction                                                                                                                          |
| 09    | Reserved                                                                                                                                        |

### Entry mode type

| Type | Name               | Description                                                   |
|------|--------------------|---------------------------------------------------------------|
| 0    | Irrelevant         | This covers all entry mode types                              |
| 1    | Magstripe          | Card data was read from a magnetic stripe.                    |
| 2    | Contactless        | Card data was read via a contactless interface.               |
| 3    | Ecomm              | Card data was sent via e-commerce/internet website.           |
| 4    | Reserved           | Reserved for future use.                                      |
| 5    | Optical code       | Card data was read via an optical interface.                  |
| 6    | Icc                | Card data was read via a chip.                                |
| 7    | Credential on file | Card data was loaded from the merchant's storage (recurring). |
| 8    | Moto               | Card data was entered manually by an operator via a phone.    |
| 9    | Manual             | Card data was entered manually.                               |
| 10   | Card present       |                                                               |
| 11   | Card not present   |                                                               |
| 12   | Unknown            | Can't determine entry mode type.                              |

### Error code

| Code | Description                                                                                                                                         |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 9999 | Unknown error                                                                                                                                       |
| 001  | Incorrect card provided                                                                                                                             |
| 002  | Incorrect amount provided                                                                                                                           |
| 003  | Incorrect currency provided                                                                                                                         |
| 004  | Insufficient funds                                                                                                                                  |
| 005  | Incorrect program provided                                                                                                                          |
| 006  | Incorrect API key provided                                                                                                                          |
| 007  | Date not provided                                                                                                                                   |
| 008  | Provider ID must be provided                                                                                                                        |
| 009  | Incorrect method provided                                                                                                                           |
| 010  | Card already exists                                                                                                                                 |
| 011  | Card number not provided                                                                                                                            |
| 012  | Name line not provided                                                                                                                              |
| 013  | Expiry month not provided                                                                                                                           |
| 014  | Expiry year not provided                                                                                                                            |
| 016  | CVV not provided                                                                                                                                    |
| 017  | PIN not provided                                                                                                                                    |
| 018  | First name not provided                                                                                                                             |
| 019  | Last name not provided                                                                                                                              |
| 020  | Address line 1 not provided                                                                                                                         |
| 021  | ZIP code not provided                                                                                                                               |
| 022  | City not provided                                                                                                                                   |
| 023  | Country not provided                                                                                                                                |
| 024  | Default program currency is not set                                                                                                                 |
| 025  | Currencies rates is not provided                                                                                                                    |
| 026  | Status not provided                                                                                                                                 |
| 027  | Duplicate unique value (`trans_code`, `program_id`, `mcc_low` and `mcc_high`)                                                                       |
| 028  | Fee save failed                                                                                                                                     |
| 029  | Can not delete fee                                                                                                                                  |
| 030  | Selected invalid fee group                                                                                                                          |
| 031  | Selected invalid trans code                                                                                                                         |
| 032  | Can not delete limitation group                                                                                                                     |
| 033  | Selected invalid limitation group                                                                                                                   |
| 034  | Selected invalid period                                                                                                                             |
| 035  | Selected invalid opt type                                                                                                                           |
| 036  | Selected invalid type                                                                                                                               |
| 037  | Can not delete limitation                                                                                                                           |
| 038  | That limitation already exists                                                                                                                      |
| 039  | There are active limitations                                                                                                                        |
| 040  | Limit exceeded                                                                                                                                      |
| 041  | Can not delete program                                                                                                                              |
| 042  | Transaction with the same reference already exists                                                                                                  |
| 043  | Trans code is not provided                                                                                                                          |
| 044  | MCC low is not provided                                                                                                                             |
| 045  | Can not delete pad(s)                                                                                                                               |
| 046  | Card type not provided                                                                                                                              |
| 047  | Program configuration error                                                                                                                         |
| 048  | Card virtual status not provided                                                                                                                    |
| 049  | State not provided                                                                                                                                  |
| 050  | Incorrect shipping method                                                                                                                           |
| 051  | Product configuration error                                                                                                                         |
| 052  | Card processor error                                                                                                                                |
| 053  | Delivery address line not provided                                                                                                                  |
| 055  | Delivery city not provided                                                                                                                          |
| 057  | Delivery country not provided                                                                                                                       |
| 056  | Delivery state not provided                                                                                                                         |
| 054  | Delivery ZIP code not provided                                                                                                                      |
| 058  | Limit group external ID must be provided                                                                                                            |
| 059  | Limit group ID must be provided                                                                                                                     |
| 060  | Limit group not found                                                                                                                               |
| 061  | Limit name must be provided                                                                                                                         |
| 062  | Limit count must be provided                                                                                                                        |
| 063  | Limit duration must be provided                                                                                                                     |
| 064  | Limit type must be provided                                                                                                                         |
| 065  | Country ID must be numeric                                                                                                                          |
| 066  | Incorrect mcc provided                                                                                                                              |
| 067  | Limit not found                                                                                                                                     |
| 068  | MCC high must be bigger than MCC low                                                                                                                |
| 069  | Parameter fee group ID is missing                                                                                                                   |
| 070  | Unknown error please refresh the page and try again                                                                                                 |
| 071  | Scheme not provided                                                                                                                                 |
| 072  | Invalid card PIN provided                                                                                                                           |
| 073  | Group with assigned data cannot be deleted                                                                                                          |
| 074  | Program name not provided                                                                                                                           |
| 075  | Default currency not provided                                                                                                                       |
| 076  | Default limit group not provided                                                                                                                    |
| 077  | Default fee group not provided                                                                                                                      |
| 078  | Scheme not provided                                                                                                                                 |
| 079  | Card design not provided                                                                                                                            |
| 080  | Cards provider not provided                                                                                                                         |
| 081  | Cards purpose not provided                                                                                                                          |
| 082  | Cards issuer not provided                                                                                                                           |
| 083  | Program not found                                                                                                                                   |
| 084  | Can't delete program with cards                                                                                                                     |
| 085  | Program contact type required                                                                                                                       |
| 086  | Fee group not found                                                                                                                                 |
| 087  | Limit tx type not found                                                                                                                             |
| 088  | Program card type not provided                                                                                                                      |
| 089  | Program must be marked as virtual or not virtual                                                                                                    |
| 090  | Cards product is required                                                                                                                           |
| 091  | Cards product not found                                                                                                                             |
| 098  | Cards sub product not found                                                                                                                         |
| 092  | Cards product name is required                                                                                                                      |
| 093  | Cards product ID is required                                                                                                                        |
| 094  | Card sub product ID is required                                                                                                                     |
| 095  | Card sub product countries ID is required                                                                                                           |
| 096  | GPS product ID is required                                                                                                                          |
| 097  | Card sub product is required                                                                                                                        |
| 106  | Is virtual attribute is required                                                                                                                    |
| 099  | GPS sub product must be unique                                                                                                                      |
| 105  | Card sub product must be unique                                                                                                                     |
| 100  | Processing error                                                                                                                                    |
| 101  | Parameter `name` is missing                                                                                                                         |
| 102  | Parameter `name` is missing                                                                                                                         |
| 103  | Card purpose not found                                                                                                                              |
| 104  | Scheme not found                                                                                                                                    |
| 107  | Cards printer not provided                                                                                                                          |
| 108  | Incorrect card program provided                                                                                                                     |
| 109  | Incorrect card product bin range                                                                                                                    |
| 110  | Incorrect card sub product bin range                                                                                                                |
| 111  | Title is too long                                                                                                                                   |
| 112  | Can't create card with this bin range                                                                                                               |
| 113  | Cards printer name is required                                                                                                                      |
| 114  | CVV service code is required                                                                                                                        |
| 115  | Invalid printer code                                                                                                                                |
| 116  | Invalid printer ID                                                                                                                                  |
| 117  | Invalid shipping method ID                                                                                                                          |
| 118  | Missing parameters                                                                                                                                  |
| 119  | Delivery address change is restricted                                                                                                               |
| 120  | Title not provided                                                                                                                                  |
| 121  | Card ID not provided                                                                                                                                |
| 122  | Shipping name not provided                                                                                                                          |
| 123  | Clients not provided                                                                                                                                |
| 124  | Name not provided                                                                                                                                   |
| 125  | Tag not provided                                                                                                                                    |
| 126  | Incorrect card issuer provided                                                                                                                      |
| 127  | Design code not provided                                                                                                                            |
| 128  | Default usages group not provided                                                                                                                   |
| 129  | Usage group not found                                                                                                                               |
| 130  | Parameter `name` is missing                                                                                                                         |
| 131  | Parameter `system usages` is missing                                                                                                                |
| 132  | Parameter `usages` is missing                                                                                                                       |
| 133  | Parameter `group id` is missing                                                                                                                     |
| 134  | `Card usage` not found                                                                                                                              |
| 135  | Unknown usage ID                                                                                                                                    |
| 136  | Parameter name is missing                                                                                                                           |
| 137  | Parameter bitmap type is missing                                                                                                                    |
| 138  | Bitmap type is unknown                                                                                                                              |
| 139  | Parameter client ID is missing                                                                                                                      |
| 140  | Parameter methods is missing                                                                                                                        |
| 141  | Do not have permission to access requested API method                                                                                               |
| 142  | Provided client ID does not exist                                                                                                                   |
| 143  | Bin range is already in use                                                                                                                         |
| 144  | Parameter name is missing                                                                                                                           |
| 145  | Parameter API ID is missing                                                                                                                         |
| 146  | Parameter API key is missing                                                                                                                        |
| 147  | Client already exists                                                                                                                               |
| 148  | Client not found                                                                                                                                    |
| 149  | Unknown country provided                                                                                                                            |
| 150  | Parameter region is missing                                                                                                                         |
| 151  | Parameter country is missing                                                                                                                        |
| 152  | Parameter system is missing                                                                                                                         |
| 153  | Parameter region ID is missing                                                                                                                      |
| 166  | HSM keys type is not provided                                                                                                                       |
| 167  | HSM keys type ID is not provided                                                                                                                    |
| 168  | HSM keys type is not found                                                                                                                          |
| 169  | HSM keys type is in use with keys. Cannot delete                                                                                                    |
| 154  | HSM keys type is in use with keys sets. Cannot delete                                                                                               |
| 155  | HSM keys name is not provided                                                                                                                       |
| 156  | HSM keys key is not provided                                                                                                                        |
| 157  | HSM key is not found                                                                                                                                |
| 158  | HSM key ID is not provided                                                                                                                          |
| 159  | HSM key cannot be removed, because it is used in key set                                                                                            |
| 162  | HSM key set cannot be saved                                                                                                                         |
| 163  | HSM key set ID is not provided                                                                                                                      |
| 160  | HSM key set name is not provided                                                                                                                    |
| 161  | HSM key set type is not provided                                                                                                                    |
| 164  | HSM key set is in use and cannot be deleted                                                                                                         |
| 165  | Parameter name is missing                                                                                                                           |
| 170  | This Key Type already exists                                                                                                                        |
| 171  | Cards product country ISON is required                                                                                                              |
| 172  | Limit region type is not provided                                                                                                                   |
| 173  | Parameter bin from is missing                                                                                                                       |
| 174  | Parameter bin to is missing                                                                                                                         |
| 175  | Sub product bin range is already in use                                                                                                             |
| 176  | Card or product key set is not provided                                                                                                             |
| 177  | Default sub product currency is not set                                                                                                             |
| 178  | Sub product is not found by selected card country                                                                                                   |
| 179  | HSM Key or HSM Type is not provided                                                                                                                 |
| 180  | More than one key found. Cannot determine correct key without using index                                                                           |
| 181  | Action failed. No keys has been found in card keyset                                                                                                |
| 182  | PIN change/unblock failed. PVKI is not found on the card until first transaction                                                                    |
| 183  | Phone number not provided                                                                                                                           |
| 184  | Cards not found                                                                                                                                     |
| 185  | No data set                                                                                                                                         |
| 186  | Can not prepare file save location                                                                                                                  |
| 187  | Incorrect card design provided                                                                                                                      |
| 188  | Card design configuration error                                                                                                                     |
| 189  | Phone number is not valid                                                                                                                           |
| 190  | Transaction date imported from is not set                                                                                                           |
| 191  | Transaction date imported to is not set                                                                                                             |
| 192  | Transaction ID is not provided                                                                                                                      |
| 193  | Transaction is not found                                                                                                                            |
| 194  | Dispute reason is not provided                                                                                                                      |
| 195  | Dispute function code is not provided                                                                                                               |
| 196  | Dispute amount type is not provided                                                                                                                 |
| 197  | Dispute amount is not provided                                                                                                                      |
| 198  | Dispute currency is not provided                                                                                                                    |
| 199  | Dispute amount or amount type is incorrect                                                                                                          |
| 200  | Dispute currency is incorrect                                                                                                                       |
| 201  | Dispute amount is higher than transaction amount                                                                                                    |
| 202  | Dispute reason code is not provided                                                                                                                 |
| 203  | Can not create dispute for dispute transaction                                                                                                      |
| 204  | Parameter card number hash is missing                                                                                                               |
| 205  | Parameter acquirer bin is missing                                                                                                                   |
| 206  | Parameter trace ID is missing                                                                                                                       |
| 207  | Billing amount is not provided                                                                                                                      |
| 208  | Billing currency ison is not provided                                                                                                               |
| 209  | Trace number is not provided                                                                                                                        |
| 210  | Card has not been found                                                                                                                             |
| 211  | Operations limit has been reached. Transaction cancelled                                                                                            |
| 212  | Load amount limit has been reached. Transaction cancelled                                                                                           |
| 213  | Load transaction failed                                                                                                                             |
| 214  | Unload amount limit has been reached. Transaction cancelled                                                                                         |
| 215  | Unload transaction failed                                                                                                                           |
| 216  | Insufficient funds                                                                                                                                  |
| 217  | Card is not active                                                                                                                                  |
| 218  | Dispute status is not provided                                                                                                                      |
| 219  | Dispute stage ID is not provided                                                                                                                    |
| 220  | Dispute masked pan is not provided                                                                                                                  |
| 221  | Dispute card number hash is not provided                                                                                                            |
| 222  | Dispute trace ID is not provided                                                                                                                    |
| 223  | Dispute acquirer bin is not provided                                                                                                                |
| 224  | Dispute main transaction ID is not provided                                                                                                         |
| 225  | Dispute event ID is not provided                                                                                                                    |
| 226  | Dispute MTI is not provided                                                                                                                         |
| 227  | Transaction already has dispute case                                                                                                                |
| 228  | Dispute ID is not provided                                                                                                                          |
| 229  | Incorrect dispute status                                                                                                                            |
| 230  | Incorrect dispute stage                                                                                                                             |
| 231  | Dispute not found                                                                                                                                   |
| 232  | Client ID is not provided                                                                                                                           |
| 233  | Product ID is not provided                                                                                                                          |
| 234  | API ID is not provided                                                                                                                              |
| 235  | Stand in is not provided                                                                                                                            |
| 236  | External decision is not provided                                                                                                                   |
| 237  | Authorization notification is not provided                                                                                                          |
| 238  | Transaction notification is not provided                                                                                                            |
| 239  | Active is not provided                                                                                                                              |
| 240  | Callback URL is not provided                                                                                                                        |
| 241  | Product reference is not provided                                                                                                                   |
| 242  | Delivery code too long                                                                                                                              |
| 243  | Fulfil 1 value too long                                                                                                                             |
| 244  | Fulfil 2 value too long                                                                                                                             |
| 245  | Product reference is not provided or is too long                                                                                                    |
| 246  | Carrier logo ID is not provided or is too long                                                                                                      |
| 247  | Image ID is not provided or is too long                                                                                                             |
| 248  | Logo front ID is not provided or is too long                                                                                                        |
| 249  | Logo back ID is not provided or is too long                                                                                                         |
| 250  | Parameter client credentials ID is missing                                                                                                          |
| 251  | Provided client credentials ID does not exist                                                                                                       |
| 252  | Client credential already exists                                                                                                                    |
| 253  | Parameter is system is missing                                                                                                                      |
| 254  | Client credentials not found                                                                                                                        |
| 255  | Dispute system due date is not provided                                                                                                             |
| 256  | Dispute scheme ID is not provided                                                                                                                   |
| 257  | Unknown dispute scheme ID is provided                                                                                                               |
| 258  | Can not update card balance                                                                                                                         |
| 259  | Personalization file date from is not set                                                                                                           |
| 260  | Personalization file date to is not set                                                                                                             |
| 261  | Personalization file ID is not provided                                                                                                             |
| 262  | Personalization file not found                                                                                                                      |
| 263  | TAI endpoint not found                                                                                                                              |
| 264  | TAI endpoint ID is not provided                                                                                                                     |
| 265  | Minimum allowed value for timeout after milliseconds is 1                                                                                           |
| 266  | Maximum allowed value for timeout after milliseconds is 60000                                                                                       |
| 267  | ACS file date from is not set                                                                                                                       |
| 268  | ACS file date to is not set                                                                                                                         |
| 269  | ACS file ID is not provided                                                                                                                         |
| 270  | ACS file not found                                                                                                                                  |
| 271  | Card product is not provided                                                                                                                        |
| 272  | MCC high is not provided                                                                                                                            |
| 273  | Amount is not provided                                                                                                                              |
| 274  | Percent is not provided                                                                                                                             |
| 275  | Pad amount currency is not provided                                                                                                                 |
| 276  | Pad not found                                                                                                                                       |
| 277  | Pad ID is not provided                                                                                                                              |
| 278  | Actual authorize date from is not set                                                                                                               |
| 279  | Actual authorize date to is not set                                                                                                                 |
| 280  | MCC low only integer value allowed                                                                                                                  |
| 281  | MCC high only integer value allowed                                                                                                                 |
| 282  | Pad amount only integer value allowed                                                                                                               |
| 283  | Pad percent only integer value allowed                                                                                                              |
| 284  | TAI endpoint has TAI notifications                                                                                                                  |
| 285  | Authorize date from is not set                                                                                                                      |
| 286  | Authorize date to is not set                                                                                                                        |
| 287  | Transaction ID only integer value allowed                                                                                                           |
| 288  | Transaction proc code only string value allowed                                                                                                     |
| 289  | Transaction amount transaction only integer value allowed                                                                                           |
| 290  | Transaction amount reconciliation only integer value allowed                                                                                        |
| 291  | Transaction amount holder billing only integer value allowed                                                                                        |
| 292  | Transaction currency transaction ison only string value allowed                                                                                     |
| 293  | Transaction currency reconciliation ison only string value allowed                                                                                  |
| 294  | Transaction currency holder billing ison only string value allowed                                                                                  |
| 295  | Transaction function code only integer value allowed                                                                                                |
| 296  | Transaction mti only string value allowed                                                                                                           |
| 297  | Transaction mcc only integer value allowed                                                                                                          |
| 298  | Transaction trace ID only string value allowed                                                                                                      |
| 299  | Transaction ipm files ID only integer value allowed                                                                                                 |
| 300  | Transaction schemes ID only integer value allowed                                                                                                   |
| 301  | Transaction cards ID only integer value allowed                                                                                                     |
| 302  | Transaction holder amount only integer value allowed                                                                                                |
| 303  | Transaction holder currency ison only string value allowed                                                                                          |
| 304  | Transaction proc code incorrect value length                                                                                                        |
| 305  | Transaction currency transaction ison incorrect value length                                                                                        |
| 306  | Transaction currency reconciliation ison incorrect value length                                                                                     |
| 307  | Transaction currency holder billing ison incorrect value length                                                                                     |
| 308  | Transaction holder currency ison incorrect value length                                                                                             |
| 309  | Transaction function code incorrect value length                                                                                                    |
| 310  | Transaction mti incorrect value length                                                                                                              |
| 311  | Transaction mcc incorrect value length                                                                                                              |
| 312  | Transaction trace ID incorrect value length                                                                                                         |
| 313  | Timeout after milliseconds not provided                                                                                                             |
| 314  | Raw message send not provided                                                                                                                       |
| 315  | Dispute status only string value allowed                                                                                                            |
| 316  | Dispute status value is too long                                                                                                                    |
| 317  | Dispute stage ID only integer value allowed                                                                                                         |
| 318  | Dispute main transaction ID only integer value allowed                                                                                              |
| 319  | Dispute amount type only integer value allowed                                                                                                      |
| 320  | Dispute event ID only integer value allowed                                                                                                         |
| 321  | Incorrect dispute reason code provided                                                                                                              |
| 322  | Dispute mti only string value allowed                                                                                                               |
| 323  | Dispute mti value is too long                                                                                                                       |
| 324  | Dispute function code only integer value allowed                                                                                                    |
| 325  | Dispute scheme ID only integer value allowed                                                                                                        |
| 326  | Dispute amount only numeric value allowed                                                                                                           |
| 327  | Currency ison only numeric value allowed                                                                                                            |
| 328  | Currency ison must be three characters long                                                                                                         |
| 329  | Dispute amount must be greater than nil                                                                                                             |
| 330  | Dispute dispute ID only integer value allowed                                                                                                       |
| 331  | Can not revert this transaction                                                                                                                     |
| 332  | Can not find main transaction                                                                                                                       |
| 333  | Transaction card number hash only string value allowed                                                                                              |
| 334  | Transaction card number hash incorrect value length                                                                                                 |
| 335  | Transaction acquirer bin only integer value allowed                                                                                                 |
| 336  | Transaction acquirer bin incorrect value length                                                                                                     |
| 337  | De proc code is not provided                                                                                                                        |
| 338  | Mcc low incorrect value, minimum value 1                                                                                                            |
| 339  | Can not create another reversal for this transaction                                                                                                |
| 340  | Transaction is not processed                                                                                                                        |
| 341  | Parent transaction not found                                                                                                                        |
| 342  | Card printer personalization file format is invalid                                                                                                 |
| 343  | Mcc low incorrect value, maximum value 9999                                                                                                         |
| 344  | Mcc high incorrect value, minimum value 1                                                                                                           |
| 345  | Mcc high incorrect value, maximum value 9999                                                                                                        |
| 346  | Pad amount incorrect value length                                                                                                                   |
| 347  | Pad percent incorrect value length                                                                                                                  |
| 348  | Transaction type not found                                                                                                                          |
| 349  | Currency not found                                                                                                                                  |
| 350  | Dispute retrieval document code is not provided                                                                                                     |
| 351  | Dispute retrieval document code only integer value allowed                                                                                          |
| 352  | Limit configuration for this group already exists                                                                                                   |
| 353  | When region type is All Regions then Holder Region, Transaction Region and Transaction Country values should be 0                                   |
| 354  | When region type is Domestic then Holder Region, Transaction Region and Transaction Country values should be 0 or more                              |
| 355  | When region type is International then Holder Region and Transaction Region is 0, but Transaction Country values should be 0 or more                |
| 356  | When region type is International Within Region then Holder Region and Transaction Region values should be 0 or more, but Transaction Country is 0  |
| 357  | When region type is International Outside Region then Holder Region and Transaction Region values should be 0 or more, but Transaction Country is 0 |
| 358  | Invalid transaction country Ison                                                                                                                    |
| 359  | Invalid holder country Ison                                                                                                                         |
| 360  | Invalid holder currency Ison                                                                                                                        |
| 361  | Holder region is not valid                                                                                                                          |
| 362  | Transaction region is not valid                                                                                                                     |
| 363  | Fees merge not provided                                                                                                                             |
| 364  | Blend in FX not provided                                                                                                                            |
| 365  | Can not create dispute by fee transaction                                                                                                           |
| 366  | Account to card not found                                                                                                                           |
| 367  | Account not found                                                                                                                                   |
| 368  | Invalid title provided                                                                                                                              |
| 369  | Invalid first name provided                                                                                                                         |
| 370  | Invalid last name provided                                                                                                                          |
| 371  | Invalid address line 1 provided                                                                                                                     |
| 372  | Invalid address line 2 provided                                                                                                                     |
| 373  | Invalid address line 3 provided                                                                                                                     |
| 374  | Invalid address line 4 provided                                                                                                                     |
| 375  | Invalid zip code provided                                                                                                                           |
| 376  | Invalid city provided                                                                                                                               |
| 377  | Invalid state provided                                                                                                                              |
| 378  | Invalid phone number provided                                                                                                                       |
| 379  | First name is too long                                                                                                                              |
| 380  | Last name is too long                                                                                                                               |
| 381  | Address line 1 is too long                                                                                                                          |
| 382  | Address line 2 is too long                                                                                                                          |
| 383  | Address line 3 is too long                                                                                                                          |
| 384  | Address line 4 is too long                                                                                                                          |
| 385  | Zip code is too long                                                                                                                                |
| 386  | City is too long                                                                                                                                    |
| 387  | State is too long                                                                                                                                   |
| 388  | Phone number is too long                                                                                                                            |
| 389  | Address line 2 is not provided                                                                                                                      |
| 390  | Address line 3 is not provided                                                                                                                      |
| 391  | Address line 4 is not provided                                                                                                                      |
| 392  | country_ison must be three characters long                                                                                                          |
| 393  | Country not found                                                                                                                                   |
| 394  | Delivery title is too long                                                                                                                          |
| 395  | Invalid delivery title provided                                                                                                                     |
| 396  | Delivery first name is not provided                                                                                                                 |
| 397  | Delivery first name is too long                                                                                                                     |
| 398  | Invalid delivery first name provided                                                                                                                |
| 399  | Delivery last name is not provided                                                                                                                  |
| 400  | Delivery last name is too long                                                                                                                      |
| 401  | Invalid delivery last name provided                                                                                                                 |
| 402  | Delivery address line 1 is not provided                                                                                                             |
| 403  | Delivery address line 1 is too long                                                                                                                 |
| 404  | Invalid delivery address line 1 provided                                                                                                            |
| 405  | Delivery address line 2 is too long                                                                                                                 |
| 406  | Invalid delivery address line 2 provided                                                                                                            |
| 407  | Delivery address line 3 is too long                                                                                                                 |
| 408  | Invalid delivery address line 3 provided                                                                                                            |
| 409  | Delivery address line 4 is too long                                                                                                                 |
| 410  | Invalid delivery address line 4 provided                                                                                                            |
| 411  | Delivery zip code is not provided                                                                                                                   |
| 412  | Delivery zip code is too long                                                                                                                       |
| 413  | Invalid delivery zip code provided                                                                                                                  |
| 414  | Delivery city is too long                                                                                                                           |
| 415  | Invalid delivery city provided                                                                                                                      |
| 416  | Delivery state is too long                                                                                                                          |
| 417  | Invalid delivery state provided                                                                                                                     |
| 418  | Invalid delivery shipping method provided                                                                                                           |
| 419  | Delivery shipping method not found                                                                                                                  |
| 420  | Original transaction amount is not provided                                                                                                         |
| 421  | Original transaction amount only integer value allowed                                                                                              |
| 422  | Reserved for future                                                                                                                                 |
| 423  | Issuer not found                                                                                                                                    |
| 424  | Issuer business ID not provided                                                                                                                     |
| 425  | Issuer invalid business ID provided                                                                                                                 |
| 426  | Issuer business name not provided                                                                                                                   |
| 427  | Issuer not provided                                                                                                                                 |
| 428  | Provided Issuer name to long                                                                                                                        |
| 429  | Invalid Issuer name provided                                                                                                                        |
| 430  | Effective from is not provided                                                                                                                      |
| 431  | Effective to is not provided                                                                                                                        |
| 432  | Effective from only integer value allowed                                                                                                           |
| 433  | Effective to only integer value allowed                                                                                                             |
| 434  | Effective from can not be greater than effective to                                                                                                 |
| 435  | Card reference ID is too long                                                                                                                       |
| 436  | Invalid card reference ID provided                                                                                                                  |
| 437  | Holder country not found                                                                                                                            |
| 438  | Bulk address line 1 not provided                                                                                                                    |
| 439  | Bulk address line 1 too long                                                                                                                        |
| 440  | Invalid bulk address line 1 provided                                                                                                                |
| 441  | Bulk address line 2 too long                                                                                                                        |
| 442  | Invalid bulk address line 2 provided                                                                                                                |
| 443  | Bulk address line 3 too long                                                                                                                        |
| 444  | Invalid bulk address line 3 provided                                                                                                                |
| 445  | Bulk address line 4 too long                                                                                                                        |
| 446  | Invalid bulk address line 3 provided                                                                                                                |
| 447  | Bulk address country ison not provided                                                                                                              |
| 448  | Bulk address country ison too long                                                                                                                  |
| 449  | Invalid bulk address country ison provided                                                                                                          |
| 450  | Bulk address country not found                                                                                                                      |
| 451  | Bulk zip code not provided                                                                                                                          |
| 452  | Bulk zip code too long                                                                                                                              |
| 453  | Invalid bulk zip code provided                                                                                                                      |
| 454  | Bulk city not provided                                                                                                                              |
| 455  | Bulk city is too long                                                                                                                               |
| 456  | Invalid bulk city provided                                                                                                                          |
| 457  | Bulk state not provided                                                                                                                             |
| 458  | Bulk state is too long                                                                                                                              |
| 459  | Invalid bulk state provided                                                                                                                         |
| 460  | Holder not found                                                                                                                                    |
| 461  | Holder ID not provided                                                                                                                              |
| 462  | Holder ID only integer value allowed                                                                                                                |
| 463  | Card ID only integer value allowed                                                                                                                  |
| 464  | Card name line 3 too short                                                                                                                          |
| 465  | Card name line 3 is too long                                                                                                                        |
| 466  | Invalid card name line 3 provided                                                                                                                   |
| 467  | Card name line 4 is too short                                                                                                                       |
| 468  | Card name line 4 is too long                                                                                                                        |
| 469  | Invalid card name line 4 provided                                                                                                                   |
| 470  | Invalid order delivery code provided                                                                                                                |
| 471  | Invalid order fulfil 1 provided                                                                                                                     |
| 472  | Invalid order fulfil 2 provided                                                                                                                     |
| 473  | Holder country not provided                                                                                                                         |
| 474  | Provided program do not have option provided in card virtual                                                                                        |
| 475  | API version is invalid                                                                                                                              |
| 476  | Account ID not provided                                                                                                                             |
| 477  | Account ID only integer value allowed                                                                                                               |
| 478  | Account status not provided                                                                                                                         |
| 479  | Account status only string value allowed                                                                                                            |
| 480  | Account status is too long                                                                                                                          |
| 481  | Incorrect account status                                                                                                                            |
| 482  | Card ID is not provided                                                                                                                             |
| 483  | Incorrect value provided for card virtual                                                                                                           |
| 484  | Card name line 3 not provided                                                                                                                       |
| 485  | Card product ID too long                                                                                                                            |
| 486  | Card product ID must be numeric                                                                                                                     |
| 487  | Card fee group ID must be numeric                                                                                                                   |
| 488  | Card fee group ID too long                                                                                                                          |
| 489  | Card limit group ID must be numeric                                                                                                                 |
| 490  | Card limit group ID too long                                                                                                                        |
| 491  | Card usage group ID must be numeric                                                                                                                 |
| 492  | Card usage group ID too long                                                                                                                        |
| 493  | Card usage group ID must be numeric                                                                                                                 |
| 494  | Card design ID too long                                                                                                                             |
| 495  | Card design not found                                                                                                                               |
| 496  | Account ID must be numeric                                                                                                                          |
| 497  | Account ID too long                                                                                                                                 |
| 498  | Account owner ID must be numeric                                                                                                                    |
| 499  | Account owner ID too long                                                                                                                           |
| 500  | Account owner not found                                                                                                                             |
| 501  | Account owner ID not provided                                                                                                                       |
| 502  | Holder ID too long                                                                                                                                  |
| 503  | Holder title is too long                                                                                                                            |
| 504  | Invalid holder title provided                                                                                                                       |
| 505  | Holder first name not provided                                                                                                                      |
| 506  | Holder first name is too long                                                                                                                       |
| 507  | Invalid holder first name provided                                                                                                                  |
| 508  | Holder last name not provided                                                                                                                       |
| 509  | Holder last name is too long                                                                                                                        |
| 510  | Invalid holder last name provided                                                                                                                   |
| 511  | Holder address line 1 not provided                                                                                                                  |
| 512  | Holder address line 1 is too long                                                                                                                   |
| 513  | Invalid holder address line 1 provided                                                                                                              |
| 514  | Holder address line 2 is too long                                                                                                                   |
| 515  | Invalid holder address line 2 provided                                                                                                              |
| 516  | Holder address line 3 is too long                                                                                                                   |
| 517  | Invalid holder address line 3 provided                                                                                                              |
| 518  | Holder address line 4 is too long                                                                                                                   |
| 519  | Invalid holder address line 4 provided                                                                                                              |
| 520  | Holder zip code not provided                                                                                                                        |
| 521  | Holder zip code is too long                                                                                                                         |
| 522  | Invalid holder zip code provided                                                                                                                    |
| 523  | Holder city not provided                                                                                                                            |
| 524  | Holder city is too long                                                                                                                             |
| 525  | Invalid holder city provided                                                                                                                        |
| 526  | Holder state not provided                                                                                                                           |
| 527  | Holder state is too long                                                                                                                            |
| 528  | Invalid holder state provided                                                                                                                       |
| 529  | Holder phone number not provided                                                                                                                    |
| 530  | Invalid holder phone number provided                                                                                                                |
| 531  | Delivery country ison must be three characters long                                                                                                 |
| 532  | Delivery country not found                                                                                                                          |
| 533  | Order language only alphabetic characters                                                                                                           |
| 534  | Order language must be three characters long                                                                                                        |
| 535  | Invalid card pan provided                                                                                                                           |
| 536  | Invalid card cvc2 provided                                                                                                                          |
| 537  | Invalid card expiration year provided                                                                                                               |
| 538  | Invalid card expiration month provided                                                                                                              |
| 539  | Account blocked                                                                                                                                     |
| 540  | Billing amount only integer value allowed                                                                                                           |
| 541  | Billing amount incorrect value length                                                                                                               |
| 542  | Load type is not provided                                                                                                                           |
| 543  | Load source is not provided                                                                                                                         |
| 544  | Load type only integer value allowed                                                                                                                |
| 545  | Load source only integer value allowed                                                                                                              |
| 546  | Load type incorrect value length                                                                                                                    |
| 547  | Load source incorrect value length                                                                                                                  |
| 548  | Incorrect Country Count value provided                                                                                                              |
| 549  | Amount Currency is mandatory when Amount higher than 0                                                                                              |
| 550  | Invalid Amount Currency provided                                                                                                                    |
| 551  | Card is already activated                                                                                                                           |
| 552  | Reserved for future                                                                                                                                 |
| 553  | Reserved for future                                                                                                                                 |
| 554  | Card status cannot be changed to the current status.                                                                                                |
| 555  | Billing amount cannot be less than 1                                                                                                                |
| 556  | Schemes ID not provided or invalid                                                                                                                  |
| 557  | Duplicate unique value (type, scheme id)                                                                                                            |
| 558  | Provided number of accounts ids and account owners ids do not match                                                                                 |
| 559  | Only one account allowed per currency                                                                                                               |
| 560  | Card currency must be empty then account provided                                                                                                   |
| 561  | Program and account currency do not match                                                                                                           |
| 562  | Duplicate card currency ison value provided                                                                                                         |
| 563  | Load type is incorrect                                                                                                                              |
| 564  | Load source is incorrect                                                                                                                            |
| 565  | Balance amount overflow                                                                                                                             |
| 566  | Client ID only integer value allowed                                                                                                                |
| 567  | Client ID too long                                                                                                                                  |
| 568  | API ID too long                                                                                                                                     |
| 569  | Pan return type not provided                                                                                                                        |
| 570  | Invalid pan return type provided                                                                                                                    |
| 571  | PIN return type not provided                                                                                                                        |
| 572  | Invalid PIN return type provided                                                                                                                    |
| 573  | Cvc2 return type not provided                                                                                                                       |
| 574  | Invalid cvc2 return type provided                                                                                                                   |
| 575  | Card expiration date return type provided                                                                                                           |
| 576  | Invalid card expiration date return type provided                                                                                                   |
| 577  | HSM key set keys contains invalid values. Only integers allowed                                                                                     |
| 578  | Reference number is too long                                                                                                                        |
| 579  | Invalid reference number provided                                                                                                                   |
| 580  | Paginator data not provided                                                                                                                         |
| 581  | Paginator limit not provided                                                                                                                        |
| 582  | Paginator limit must be numeric                                                                                                                     |
| 583  | Paginator offset not provided                                                                                                                       |
| 584  | Paginator offset must be numeric                                                                                                                    |
| 584  | Paginator limit cannot be bigger than 100                                                                                                           |
| 586  | Paginator limit must be at least 1                                                                                                                  |
| 587  | Date from must be numeric unix timestamp                                                                                                            |
| 588  | Date to must be numeric unix timestamp                                                                                                              |
| 589  | Paginator must contain limit(items count) and offset                                                                                                |
| 590  | Data encryption key is not provided                                                                                                                 |
| 591  | Invalid data encryption key provided                                                                                                                |
| 592  | Data encryption key should be 32 symbols                                                                                                            |
| 593  | Invalid data return type provided                                                                                                                   |
| 594  | Bypass instant notification option is not provided                                                                                                  |
| 595  | Limit group name is too short                                                                                                                       |
| 596  | Limit group name is too long                                                                                                                        |
| 597  | Invalid limit group name provided                                                                                                                   |
| 598  | Region not found                                                                                                                                    |
| 599  | Region cannot be removed, because it is used in fee                                                                                                 |
| 600  | Region cannot be removed, because it is used in limit                                                                                               |
| 601  | Region cannot be removed, because it is used in card fee                                                                                            |
| 602  | Region cannot be removed, because it is used in card limit                                                                                          |
| 603  | Fee group cannot be removed, because it is used in cards                                                                                            |
| 604  | Fee group cannot be removed, because it is used in fee                                                                                              |
| 605  | Fee group cannot be removed, because it is used in programs                                                                                         |
| 606  | Auto conversion parameter is required                                                                                                               |
| 607  | Cannot edit program with cards                                                                                                                      |
| 608  | Program ID must be numeric                                                                                                                          |
| 609  | Program ID too long                                                                                                                                 |
| 610  | Cannot edit card product with cards                                                                                                                 |
| 611  | Cannot delete card product with cards                                                                                                               |
| 612  | Card sub product ID must be numeric                                                                                                                 |
| 613  | Card sub product ID too long                                                                                                                        |
| 614  | Cannot edit card sub product with cards                                                                                                             |
| 615  | Cannot delete card sub product with cards                                                                                                           |
| 616  | Bin range ID must be numeric                                                                                                                        |
| 617  | Bin range ID too long                                                                                                                               |
| 618  | Bin range not found                                                                                                                                 |
| 619  | Cannot edit bin range with cards                                                                                                                    |
| 620  | Card ID too long                                                                                                                                    |
| 621  | Limit type option is not provided                                                                                                                   |
| 622  | Limit type must be numeric                                                                                                                          |
| 623  | Limit type is too long                                                                                                                              |
| 624  | Invalid limit type provided                                                                                                                         |
| 625  | Fee title only string value allowed                                                                                                                 |
| 626  | Fee title is too long                                                                                                                               |
| 627  | Transaction type not provided                                                                                                                       |
| 628  | Entry mode not provided                                                                                                                             |
| 629  | Mcc low is not provided                                                                                                                             |
| 630  | Mcc high is not provided                                                                                                                            |
| 631  | Fee fixed price only numeric value allowed                                                                                                          |
| 632  | Fee percent price only numeric value allowed                                                                                                        |
| 633  | Currency ison is not provided                                                                                                                       |
| 634  | Country ison is not provided                                                                                                                        |
| 635  | Region ID only integer value allowed                                                                                                                |
| 636  | Fee min amount only integer value allowed                                                                                                           |
| 637  | Fee max amount only integer value allowed                                                                                                           |
| 638  | Blacklist source type ID is not provided                                                                                                            |
| 639  | Blacklist source type ID only integer value allowed                                                                                                 |
| 640  | Blacklist source type ID not found                                                                                                                  |
| 641  | Blacklist by source, source value is not provided                                                                                                   |
| 642  | Blacklist by source, source value only string value allowed                                                                                         |
| 643  | Blacklist by source, is report fraud is not provided                                                                                                |
| 644  | Blacklist by source, is report fraud only bool value allowed                                                                                        |
| 645  | Blacklist by source, is report fraud not found                                                                                                      |
| 646  | Blacklist by source, date created only integer value allowed                                                                                        |
| 647  | Blacklist by source, date updated only integer value allowed                                                                                        |
| 648  | Blacklist by source, id not found                                                                                                                   |
| 649  | Blacklist by source, record not found                                                                                                               |
| 650  | Blacklist by source, record already exists                                                                                                          |
| 651  | Mcc high should be higher value than mcc low                                                                                                        |
| 652  | Only one country ID or region ID should be provided                                                                                                 |
| 653  | Invalid fee title provided                                                                                                                          |
| 654  | Description is too long                                                                                                                             |
| 655  | Invalid description provided                                                                                                                        |
| 656  | Log history ID not provided                                                                                                                         |
| 657  | Log history not found                                                                                                                               |
| 658  | Date from not provided                                                                                                                              |
| 659  | Date to not provided                                                                                                                                |
| 660  | Cannot delete card product, it has assigned card sub product                                                                                        |
| 661  | Incorrect user bit map provided                                                                                                                     |
| 662  | Bin range already exists with this ID                                                                                                               |
| 663  | Bin range ID not provided                                                                                                                           |
| 664  | Card product already exists with this ID                                                                                                            |
| 665  | Duplicate unique value transaction type, program, mcc low, mcc high and currency ison                                                               |
| 666  | Pad already exists with this ID                                                                                                                     |
| 667  | Issuer ID not provided                                                                                                                              |
| 668  | Pad ID too long                                                                                                                                     |
| 669  | Pad ID must be numeric                                                                                                                              |
| 670  | Program ID not provided                                                                                                                             |
| 671  | Limit group and Card ID cannot have limit. You must choose one or the other                                                                         |
| 672  | Card design printer info not provided                                                                                                               |
| 673  | Card design printer info tag is too long                                                                                                            |
| 674  | Invalid card design printer info tag provided                                                                                                       |
| 675  | Card printer not found                                                                                                                              |
| 676  | Card design printer info product reference is too long                                                                                              |
| 677  | Card design printer info is default not provided                                                                                                    |
| 678  | Invalid card design printer info is default provided                                                                                                |
| 679  | Card design ID not provided                                                                                                                         |
| 680  | Default card printer info not provided                                                                                                              |
| 681  | Only one default card printer info can be provided                                                                                                  |
| 682  | Cannot delete bin range with card products                                                                                                          |
| 683  | Card design name is already taken                                                                                                                   |
| 684  | Card printer name is already taken                                                                                                                  |
| 685  | Printer and Scheme to the card design can be assigned only once                                                                                     |
| 686  | Blacklist by source, response code only string value allowed                                                                                        |
| 687  | Blacklist by source, response code incorrect value length                                                                                           |
| 688  | Authorize processing code only string value allowed                                                                                                 |
| 689  | Authorize processing code incorrect value length                                                                                                    |
| 690  | Authorize MTI only string value allowed                                                                                                             |
| 691  | Authorize MTI incorrect value length                                                                                                                |
| 692  | Authorize type only string value allowed                                                                                                            |
| 693  | Authorize type incorrect value length                                                                                                               |
| 694  | Authorize cards ID only integer value allowed                                                                                                       |
| 695  | Authorize transaction date and time only integer value allowed                                                                                      |
| 696  | Authorize transaction amount only integer value allowed                                                                                             |
| 697  | Authorize transaction currency ison only string value allowed                                                                                       |
| 698  | Authorize transaction currency ison incorrect value length                                                                                          |
| 699  | Authorize status code only string value allowed                                                                                                     |
| 700  | Authorize status code incorrect value length                                                                                                        |
| 701  | Authorize country ison only string value allowed                                                                                                    |
| 702  | Authorize country ison incorrect value length                                                                                                       |
| 703  | Authorize MCC code only integer value allowed                                                                                                       |
| 704  | Authorize transaction type ID only integer value allowed                                                                                            |
| 705  | Authorize entry mode type ID only integer value allowed                                                                                             |
| 706  | Authorize date created only integer value allowed                                                                                                   |
| 707  | Authorize ID is not provided                                                                                                                        |
| 708  | Authorize ID only integer value allowed                                                                                                             |
| 709  | Authorize not found                                                                                                                                 |
| 710  | Company client is not provided                                                                                                                      |
| 711  | Cannot assign same scheme and business ID per country multiple times                                                                                |
| 712  | Card printer sftp enabled invalid                                                                                                                   |
| 713  | Card printer sftp username invalid                                                                                                                  |
| 714  | Card printer sftp port invalid                                                                                                                      |
| 715  | Card printer sftp path invalid                                                                                                                      |
| 716  | Card printer sftp host invalid                                                                                                                      |
| 717  | Card number hash only string value allowed                                                                                                          |
| 718  | Card number hash incorrect value length                                                                                                             |
| 719  | Personalization file ID only integer value allowed                                                                                                  |
| 720  | Provided account holder ID and cards id: s, holders ID does not match                                                                              |
| 721  | Skip holder validation value not provided                                                                                                           |
| 722  | Can not unset cards id: s, because it is card primary account ID                                                                                   |
| 723  | Entity for limit has not been detected                                                                                                              |
| 724  | Limit group and Account ID cannot have limit. You must choose one or the other                                                                      |
| 725  | External payment method ID not provided                                                                                                             |
| 726  | External payment method invalid ID provided                                                                                                         |
| 727  | Reserved for future                                                                                                                                 |
| 728  | External payment method name not provided                                                                                                           |
| 729  | External payment method name too long                                                                                                               |
| 730  | External payment method API ID not provided                                                                                                         |
| 731  | External payment method API ID too long                                                                                                             |
| 732  | Reserved for future                                                                                                                                 |
| 733  | External payment method API password too long                                                                                                       |
| 734  | External payment method API url not provided                                                                                                        |
| 735  | External payment method url too long                                                                                                                |
| 736  | External payment not found                                                                                                                          |
| 737  | External payment type ID not provided                                                                                                               |
| 738  | External payment method not found                                                                                                                   |
| 739  | Reserved for future                                                                                                                                 |
| 740  | Cannot assign same currency per external payment method multiple times                                                                              |
| 741  | Fee group name too long                                                                                                                             |
| 742  | External payment address ID not provided                                                                                                            |
| 743  | External payment address ID only integer value allowed                                                                                              |
| 744  | External payment address not found                                                                                                                  |
| 745  | Invalid holder ID provided                                                                                                                          |
| 746  | Reserved for future                                                                                                                                 |
| 747  | Shipping method not found                                                                                                                           |
| 748  | Card printer shipping method not found                                                                                                              |
| 749  | Duplicate unique value card printer and shipping method                                                                                             |
| 750  | Card printer shipping method ID not provided                                                                                                        |
| 751  | Duplicate unique value card printer and printer code                                                                                                |
| 752  | External payment method API url invalid                                                                                                             |
| 753  | External payment method name invalid                                                                                                                |
| 754  | External payments server not exist by provided method API URL                                                                                       |
| 755  | Reserved for future                                                                                                                                 |
| 756  | External payment method not implemented                                                                                                             |
| 757  | External payment address inbound enabled not provided                                                                                               |
| 758  | External payment address inbound enabled only boolean value allowed                                                                                 |
| 759  | External payment address inbound enabled only 0 and 1 values allowed                                                                                |
| 760  | External payment address outbound enabled not provided                                                                                              |
| 761  | External payment address outbound enabled only integer value allowed                                                                                |
| 762  | External payment address outbound enabled only 0 and 1 values allowed                                                                               |
| 763  | Provide client name is too long                                                                                                                     |
| 764  | Provided client name already exists                                                                                                                 |
| 765  | Invalid client name provided                                                                                                                        |
| 766  | Invalid allow country change provided                                                                                                               |
| 767  | Reserved for future                                                                                                                                 |
| 768  | External payment address account number not provided                                                                                                |
| 769  | External payment address account number too long                                                                                                    |
| 770  | External payment address account number invalid                                                                                                     |
| 771  | External payment address account name not provided                                                                                                  |
| 772  | External payment address account name too long                                                                                                      |
| 773  | External payment address account name invalid                                                                                                       |
| 774  | External payment address sort code not provided                                                                                                     |
| 775  | External payment address sort code too long                                                                                                         |
| 776  | External payment address sort code invalid                                                                                                          |
| 777  | Sequence limit reset data cannot be empty                                                                                                           |
| 778  | Sequence limit reset data must be type of array                                                                                                     |
| 779  | External payment transaction failed                                                                                                                 |
| 780  | External payment type notification action not provided                                                                                              |
| 781  | External payment type notification action too long                                                                                                  |
| 782  | External payment type API secret not provided                                                                                                       |
| 783  | External payment type API secret too long                                                                                                           |
| 784  | Duplicate unique value external payment type notification action                                                                                    |
| 785  | Cannot assign same country multiple times with overlapping effective dates                                                                          |
| 786  | Limit account group not found                                                                                                                       |
| 787  | Default limits accounts group not provided                                                                                                          |
| 788  | External payment transaction ID not provided                                                                                                        |
| 789  | External payment transaction ID only integer value allowed                                                                                          |
| 790  | Reserved for future                                                                                                                                 |
| 791  | Reserved for future                                                                                                                                 |
| 792  | Reserved for future                                                                                                                                 |
| 793  | Reserved for future                                                                                                                                 |
| 794  | Reserved for future                                                                                                                                 |
| 795  | Reserved for future                                                                                                                                 |
| 796  | Reserved for future                                                                                                                                 |
| 797  | Reserved for future                                                                                                                                 |
| 798  | Reserved for future                                                                                                                                 |
| 799  | Reserved for future                                                                                                                                 |
| 800  | Reserved for future                                                                                                                                 |
| 801  | Reserved for future                                                                                                                                 |
| 802  | Sequence limit reset data entry mode is invalid                                                                                                     |
| 803  | Reserved for future                                                                                                                                 |
| 804  | Reserved for future                                                                                                                                 |
| 805  | External payment transaction not found                                                                                                              |
| 806  | Card number already exists                                                                                                                          |
| 807  | Account limit group ID must be numeric                                                                                                              |
| 808  | Account limit group ID too long                                                                                                                     |
| 809  | Card number not found                                                                                                                               |
| 810  | Selected currency not supported by card product                                                                                                     |
| 811  | Invalid program name provided                                                                                                                       |
| 812  | A list has to be provided for the card designs                                                                                                      |
| 813  | A list has to be provided for the fees groups                                                                                                       |
| 814  | A list has to be provided for the limits groups                                                                                                     |
| 815  | A list has to be provided for the usage groups                                                                                                      |
| 816  | Card has been expired                                                                                                                               |
| 817  | Reserved for future                                                                                                                                 |
| 818  | Fee transaction failed                                                                                                                              |
| 819  | Transaction failed                                                                                                                                  |
| 820  | Invalid card request ID                                                                                                                             |
| 821  | More than one card number found                                                                                                                     |
| 822  | Card limit has been reached                                                                                                                         |
| 823  | External payment address IBAN not provided                                                                                                          |
| 824  | External payment address IBAN too long                                                                                                              |
| 825  | External payment address IBAN invalid                                                                                                               |
| 826  | Reserved for future                                                                                                                                 |
| 827  | External payment address BIC too long                                                                                                               |
| 828  | External payment address BIC invalid                                                                                                                |
| 829  | Reserved for future                                                                                                                                 |
| 830  | Reserved for future                                                                                                                                 |
| 831  | Reserved for future                                                                                                                                 |
| 832  | Reserved for future                                                                                                                                 |
| 833  | Records limit must be a numeric value                                                                                                               |
| 834  | Last ID must be a numeric value                                                                                                                     |
| 835  | Reserved for future                                                                                                                                 |
| 836  | Reserved for future                                                                                                                                 |
| 837  | Reserved for future                                                                                                                                 |
| 838  | Reserved for future                                                                                                                                 |
| 839  | Item count parameter cannot be less than 1                                                                                                          |
| 840  | Item count parameter cannot be more than 100                                                                                                        |
| 841  | A list has to be provided for the account limits groups                                                                                             |
| 842  | Limit group and Holder ID cannot have limit. You must choose one or the other                                                                       |
| 843  | Reason code not provided                                                                                                                            |
| 844  | Function code not provided                                                                                                                          |
| 845  | Reason code only integer value allowed                                                                                                              |
| 846  | Function code only integer value allowed                                                                                                            |
| 847  | Transaction amount not provided                                                                                                                     |
| 848  | Transaction amount only integer value allowed                                                                                                       |
| 849  | Cards ID not provided                                                                                                                               |
| 850  | Cards ID only integer value allowed                                                                                                                 |
| 851  | Mcc not provided                                                                                                                                    |
| 852  | Mcc only integer value allowed                                                                                                                      |
| 853  | Acquirer ID not provided                                                                                                                            |
| 854  | Acquirer ID only string value allowed                                                                                                               |
| 855  | Forwarder ID not provided                                                                                                                           |
| 856  | Forwarder ID only string value allowed                                                                                                              |
| 857  | Card acceptor terminal ID not provided                                                                                                              |
| 858  | Card acceptor terminal ID only string value allowed                                                                                                 |
| 859  | Fee collection control number not provided                                                                                                          |
| 860  | Fee collection control number only integer value allowed                                                                                            |
| 861  | Original transaction currency code not provided                                                                                                     |
| 862  | Original transaction currency code only integer value allowed                                                                                       |
| 863  | Transaction currency not provided                                                                                                                   |
| 864  | Transaction currency only integer value allowed                                                                                                     |
| 865  | Trace ID not provided                                                                                                                               |
| 866  | Trace ID only string value allowed                                                                                                                  |
| 867  | Transaction destination ID code not provided                                                                                                        |
| 868  | Transaction destination ID code only integer value allowed                                                                                          |
| 869  | Transaction originator ID code not provided                                                                                                         |
| 870  | Transaction originator ID code only integer value allowed                                                                                           |
| 871  | Invalid card ID                                                                                                                                     |
| 872  | Sequence reset entry modes list cannot contain same value as the main entry mode                                                                    |
| 873  | Card number stock is empty                                                                                                                          |
| 874  | Record ID only integer value allowed                                                                                                                |
| 875  | Incorrect Record ID provided                                                                                                                        |
| 876  | Limit group and Record ID cannot have limit. You must choose one or the other.                                                                      |
| 877  | Limit tx type is not provided                                                                                                                       |
| 878  | Limit tx type must be numeric                                                                                                                       |
| 879  | Limit tx type is too long                                                                                                                           |
| 880  | Limit tx type provided is invalid                                                                                                                   |
| 881  | Limit Count must be numeric value if provided                                                                                                       |
| 882  | Sequence limit reset data entry modes must be integer values                                                                                        |
| 883  | Failed to recalculate card account                                                                                                                  |
| 884  | Holder contains invalid information. s                                                                                                             |
| 885  | External payment address direct credit enabled not provided                                                                                         |
| 886  | External payment address direct credit enabled only boolean value allowed                                                                           |
| 887  | External payment address direct credit enabled only 0 and 1 values allowed                                                                          |
| 888  | External payment address direct debit enabled not provided                                                                                          |
| 889  | External payment address direct debit enabled only integer value allowed                                                                            |
| 890  | External payment address direct debit enabled only 0 and 1 values allowed                                                                           |
| 891  | Reserved for future                                                                                                                                 |
| 892  | Primary not provided                                                                                                                                |
| 893  | Invalid value provided for primary                                                                                                                  |
| 894  | Only one primary TAI endpoint can be created                                                                                                        |
| 895  | Invalid value provided for stand in                                                                                                                 |
| 896  | Invalid value provided for internal balance check                                                                                                   |
| 897  | Invalid value provided for authorization notification                                                                                               |
| 898  | Invalid value provided for transaction notification                                                                                                 |
| 899  | Invalid value provided for active                                                                                                                   |
| 900  | Invalid value provided for raw message send                                                                                                         |
| 901  | Invalid value provided for fees merge                                                                                                               |
| 902  | Invalid value provided for blend in FX                                                                                                              |
| 903  | Invalid value provided for bypass instant notification                                                                                              |
| 904  | Reserved for future                                                                                                                                 |
| 905  | Reserved for future                                                                                                                                 |
| 906  | Program ID already exists                                                                                                                           |
| 907  | Minimum allowed value for port is 0                                                                                                                 |
| 908  | Maximum allowed value for port is 65535                                                                                                             |
| 909  | Provided card printer ID already exists                                                                                                             |
| 910  | Integer should be provided for the card printer ID                                                                                                  |
| 911  | Provided card printer ID too long                                                                                                                   |
| 912  | Card printer ID not provided                                                                                                                        |
| 913  | Fee group ID only integer value allowed                                                                                                             |
| 914  | Special account ID is not provided                                                                                                                  |
| 915  | Special account ID only integer value allowed                                                                                                       |
| 916  | Special account not found                                                                                                                           |
| 917  | Special account name is not provided                                                                                                                |
| 918  | Special account name is too long                                                                                                                    |
| 919  | Special account type is not provided                                                                                                                |
| 920  | Special account type only integer value allowed                                                                                                     |
| 921  | Incorrect special account type                                                                                                                      |
| 922  | Can not delete special account with special account transactions                                                                                    |
| 923  | Special account date created only integer value allowed                                                                                             |
| 924  | Special account date updated only integer value allowed                                                                                             |
| 925  | Special account transaction ID is not provided                                                                                                      |
| 926  | Special account transaction ID only integer value allowed                                                                                           |
| 927  | Special account transaction not found                                                                                                               |
| 928  | Special account transaction operation only integer value allowed                                                                                    |
| 929  | Incorrect special account transaction operation                                                                                                     |
| 930  | Special account transaction origin date from only integer value allowed                                                                             |
| 931  | Special account transaction origin date to only integer value allowed                                                                               |
| 932  | Special account transaction date created only integer value allowed                                                                                 |
| 933  | External payments server error. s                                                                                                                  |
| 934  | Special account balance only integer value allowed                                                                                                  |
| 935  | Special account transaction amount only integer value allowed                                                                                       |
| 936  | Reserved for future                                                                                                                                 |
| 937  | Limit duration type unknown                                                                                                                         |
| 938  | Limit holder group not found                                                                                                                        |
| 939  | Default holder limits group not provided                                                                                                            |
| 940  | Holder limit group ID must be numeric                                                                                                               |
| 941  | Holder limit group ID too long                                                                                                                      |
| 942  | Invalid card design printer info provided                                                                                                           |
| 943  | Reserved for future                                                                                                                                 |
| 944  | Reserved for future                                                                                                                                 |
| 945  | Reserved for future                                                                                                                                 |
| 946  | Reserved for future                                                                                                                                 |
| 947  | Special account invalid name provided                                                                                                               |
| 948  | Card ID or account ID must be specified                                                                                                             |
| 949  | Account limits group not provided                                                                                                                   |
| 950  | Holder limits group not provided                                                                                                                    |
| 951  | Reserved for future                                                                                                                                 |
| 952  | Internal host transaction failed                                                                                                                    |
| 953  | Region type not provided                                                                                                                            |
| 954  | Invalid region type provided                                                                                                                        |
| 955  | Reserved for future                                                                                                                                 |
| 956  | Reserved for future                                                                                                                                 |
| 957  | Reserved for future                                                                                                                                 |
| 958  | Reserved for future                                                                                                                                 |
| 959  | Reserved for future                                                                                                                                 |
| 960  | Reserved for future                                                                                                                                 |
| 961  | Reserved for future                                                                                                                                 |
| 962  | Reserved for future                                                                                                                                 |
| 963  | Mandate ID not provided                                                                                                                             |
| 964  | Mandate ID only integer value allowed                                                                                                               |
| 965  | Reserved for future                                                                                                                                 |
| 966  | Reserved for future                                                                                                                                 |
| 967  | API version must be provided                                                                                                                        |
| 968  | Mandate not found                                                                                                                                   |
| 969  | Reserved for future                                                                                                                                 |
| 970  | Reserved for future                                                                                                                                 |
| 971  | Reserved for future                                                                                                                                 |
| 972  | Blacklist by sources ID only integer value allowed                                                                                                  |
| 973  | Personalization file name only string value allowed                                                                                                 |
| 974  | Personalization file is sent only bool value allowed                                                                                                |
| 975  | Printer ID only integer value allowed                                                                                                               |
| 976  | Transaction type ID only integer value allowed                                                                                                      |
| 977  | Invalid TAI endpoint ID provided                                                                                                                    |
| 978  | Callback URL must be string                                                                                                                         |
| 979  | API ID must be string                                                                                                                               |
| 980  | Card reference ID must be string                                                                                                                    |
| 981  | Card number must be string                                                                                                                          |
| 982  | Should pay not provided                                                                                                                             |
| 983  | Should pay only integer value allowed                                                                                                               |
| 984  | Should pay only 0 and 1 values allowed                                                                                                              |
| 985  | Wrong due date                                                                                                                                      |
| 986  | ZPK key ID not provided                                                                                                                             |
| 987  | Invalid ZPK key ID provided                                                                                                                         |
| 988  | Reserved for future                                                                                                                                 |
| 989  | Reserved for future                                                                                                                                 |
| 990  | Reserved for future                                                                                                                                 |
| 991  | Reserved for future                                                                                                                                 |
| 992  | Reserved for future                                                                                                                                 |
| 993  | Reserved for future                                                                                                                                 |
| 994  | Authorize type is not provided                                                                                                                      |
| 995  | Authorize type only integer value allowed                                                                                                           |
| 996  | Incorrect authorize type                                                                                                                            |
| 997  | Transaction type is not provided                                                                                                                    |
| 998  | Transaction type only integer value allowed                                                                                                         |
| 1000 | Incorrect transaction type                                                                                                                          |
| 1001 | Entry mode type is not provided                                                                                                                     |
| 1002 | Entry mode type only integer value allowed                                                                                                          |
| 1003 | Incorrect entry mode type                                                                                                                           |
| 1004 | Scheme ID is not provided                                                                                                                           |
| 1005 | Scheme ID only integer value allowed                                                                                                                |
| 1006 | Incorrect scheme ID                                                                                                                                 |
| 1007 | Expiration date is not provided                                                                                                                     |
| 1008 | Expiration date only string value allowed                                                                                                           |
| 1009 | Incorrect expiration date format                                                                                                                    |
| 1010 | Transaction amount is not provided                                                                                                                  |
| 1011 | Transaction amount only integer value allowed                                                                                                       |
| 1012 | Transaction currency only numeric value allowed                                                                                                     |
| 1013 | Transaction currency must be three characters long                                                                                                  |
| 1014 | Transaction currency is not provided                                                                                                                |
| 1015 | Incorrect transaction currency                                                                                                                      |
| 1016 | Billing amount is not provided                                                                                                                      |
| 1017 | Billing amount only integer value allowed                                                                                                           |
| 1018 | Billing currency only numeric value allowed                                                                                                         |
| 1019 | Billing currency must be three characters long                                                                                                      |
| 1020 | Incorrect billing currency                                                                                                                          |
| 1021 | Billing currency is not provided                                                                                                                    |
| 1022 | Mcc is not provided                                                                                                                                 |
| 1023 | Mcc only numeric value allowed                                                                                                                      |
| 1024 | Incorrect mcc value                                                                                                                                 |
| 1025 | Transaction amount and billing amount must be the same value, because amounts are the same currency                                                 |
| 1026 | Direct debit disabled                                                                                                                               |
| 1027 | Personalization file cards count only integer allowed                                                                                               |
| 1028 | Personalization file products count only integer allowed                                                                                            |
| 1029 | Authorize simulation is off                                                                                                                         |
| 1030 | External payment direct debit is disabled                                                                                                           |
| 1031 | Invalid authorize log type provided                                                                                                                 |
| 1032 | Account attribute not provided                                                                                                                      |
| 1033 | Reserved for future                                                                                                                                 |
| 1034 | Bin not provided                                                                                                                                    |
| 1035 | Bin should be between 1 and 12 digits length                                                                                                        |
| 1036 | Key set ID not provided                                                                                                                             |
| 1037 | Key set ID must be of type integer                                                                                                                  |
| 1038 | Key set does not exist                                                                                                                              |
| 1039 | Bin sponsor must be of type integer                                                                                                                 |
| 1040 | Bin sponsor not provided                                                                                                                            |
| 1041 | Issuer ID must be of type integer                                                                                                                   |
| 1042 | Bin does not exist                                                                                                                                  |
| 1043 | Bin ID should be of type integer                                                                                                                    |
| 1044 | Log transaction error ID not provided                                                                                                               |
| 1045 | Log transaction error ID only integer value allowed                                                                                                 |
| 1046 | Log transaction error not found                                                                                                                     |
| 1047 | Log transaction error status not provided                                                                                                           |
| 1048 | Log transaction error invalid status provided                                                                                                       |
| 1049 | Transaction already processed                                                                                                                       |
| 1050 | Log transaction not found                                                                                                                           |
| 1051 | Transaction reimport failed                                                                                                                         |
| 1052 | IPM file not found                                                                                                                                  |
| 1053 | Cannot reimport transaction, because not processed transaction status is completed                                                                  |
| 1054 | Transaction reimport not implemented for provided scheme                                                                                            |
| 1055 | Cannot reprocess transaction, because not processed transaction status is completed                                                                 |
| 1056 | Assignee not provided                                                                                                                               |
| 1057 | Assignee only integer value allowed                                                                                                                 |
| 1058 | Schemes ID only integer value allowed                                                                                                               |
| 1059 | Status only integer value allowed                                                                                                                   |
| 1060 | Error type only integer value allowed                                                                                                               |
| 1061 | A list has to be provided for the API methods                                                                                                       |
| 1062 | Internal host load transaction card amount limit has been reached                                                                                   |
| 1063 | Internal host load transaction account amount limit has been reached                                                                                |
| 1064 | Internal host load transaction holder amount limit has been reached                                                                                 |
| 1065 | De proc code is not provided                                                                                                                        |
| 1066 | Card acceptor ID is not provided                                                                                                                    |
| 1067 | Transaction receiving ID code is not provided                                                                                                       |
| 1068 | Transaction receiving ID code string allowed                                                                                                        |
| 1069 | Card acceptor ID length is incorrect                                                                                                                |
| 1070 | Acquirer ID length is incorrect                                                                                                                     |
| 1071 | Forwarder ID length is incorrect                                                                                                                    |
| 1072 | Card acceptor terminal ID length is incorrect                                                                                                       |
| 1073 | Transaction destination ID code length is incorrect                                                                                                 |
| 1074 | Transaction originator ID code length is incorrect                                                                                                  |
| 1075 | Transaction receiving institution ID code length is incorrect                                                                                       |
| 1076 | Card acceptor name, address, city, post code length is incorrect                                                                                    |
| 1077 | Card acceptor name, address, city, post code is not provided                                                                                        |
| 1078 | Card acceptor name, address, city, post code must be a string                                                                                       |
| 1079 | Printer key and Issuer is duplicated, but must be unique                                                                                            |
| 1080 | Card type name is not provided                                                                                                                      |
| 1081 | Card type ID is not provided                                                                                                                        |
| 1082 | Card type not found                                                                                                                                 |
| 1083 | Fixed price currency must be provided if fixed price is entered                                                                                     |
| 1084 | External payment type name not provided                                                                                                             |
| 1085 | External payment type name too long                                                                                                                 |
| 1086 | External payment type name invalid                                                                                                                  |
| 1087 | External payment method invalid ID provided                                                                                                         |
| 1088 | External payment type notification action invalid value provided                                                                                    |
| 1089 | Holder email address is invalid                                                                                                                     |
| 1090 | Holder IP address is invalid                                                                                                                        |
| 1091 | Holder date of birth is not a valid date                                                                                                            |
| 1092 | Holder KYC document expiration date is not a valid date                                                                                             |
| 1093 | Holder KYC completion level must be numeric                                                                                                         |
| 1094 | Could not resolve host by provided method API URL                                                                                                   |
| 1095 | Holder email length is invalid                                                                                                                      |
| 1096 | Holder IP length is invalid                                                                                                                         |
| 1097 | Holder birth of date length is invalid                                                                                                              |
| 1098 | KYC expiration date length is invalid                                                                                                               |
| 1099 | KYC completion level length is invalid                                                                                                              |
| 1100 | Parameter name is missing                                                                                                                           |
| 1101 | Scheme not provided                                                                                                                                 |
| 1102 | MCC group not found                                                                                                                                 |
| 1103 | Parameter MCC group ID is missing                                                                                                                   |
| 1104 | Is default attribute is required                                                                                                                    |
| 1105 | Is default only bool value allowed                                                                                                                  |
| 1106 | One special account must be set as default                                                                                                          |
| 1107 | MCC group name too long                                                                                                                             |
| 1108 | Card validity period value must be numeric                                                                                                          |
| 1109 | Card validity period value is not in valid range                                                                                                    |
| 1110 | Cards cannot be the same                                                                                                                            |
| 1111 | Accounts cannot be the same                                                                                                                         |
| 1112 | Shipping method ID is not provided                                                                                                                  |
| 1113 | Shipping method name is not provided                                                                                                                |
| 1114 | Risk merchant configuration name is not provided                                                                                                    |
| 1115 | Risk merchant configuration name must be less than 255 symbols                                                                                      |
| 1116 | Risk merchant configuration does not exists                                                                                                         |
| 1117 | Risk merchant configuration client ID is not provided                                                                                               |
| 1118 | Risk merchant configuration merchant ID is not provided                                                                                             |
| 1119 | Risk merchant configuration merchant ID must be less than 20 symbols                                                                                |
| 1120 | Risk merchant configuration acquirer ID is not provided                                                                                             |
| 1121 | Risk merchant configuration acquirer ID must be less than 20 symbols                                                                                |
| 1122 | Risk merchant configuration terminal ID must be less than 50 symbols                                                                                |
| 1123 | Only one special account with same currency must be selected                                                                                        |
| 1124 | Only one special account must be set as default                                                                                                     |
| 1125 | KYC completion level must be positive                                                                                                               |
| 1126 | Risk Merchant Configuration already exist.                                                                                                          |
| 1127 | Risk merchant configuration name can contain letters, numbers and dash.                                                                             |
| 1128 | External ID only integer value allowed                                                                                                              |
| 1129 | Due date only integer value allowed                                                                                                                 |
| 1132 | Account limit has been reached                                                                                                                      |
| 1133 | Holder limit has been reached                                                                                                                       |
| 1134 | External payment address is not active                                                                                                              |
| 1135 | External payment mandate is not active                                                                                                              |
| 1136 | Pad name string allowed                                                                                                                             |
| 1137 | Pad name incorrect value length                                                                                                                     |
| 1138 | Pad name is not provided                                                                                                                            |
| 1139 | Source card ID only integer value allowed                                                                                                           |
| 1140 | Source card has not been found                                                                                                                      |
| 1141 | Destination card ID only integer value allowed                                                                                                      |
| 1142 | Destination card has not been found                                                                                                                 |
| 1143 | Source account ID must be numeric                                                                                                                   |
| 1144 | Source account not found                                                                                                                            |
| 1145 | Destination account ID must be numeric                                                                                                              |
| 1146 | Destination account not found                                                                                                                       |
| 1147 | Duplicated MCC range                                                                                                                                |
| 1148 | Card delivery data not found                                                                                                                        |
| 1149 | Clients IDs not provided                                                                                                                            |
| 1150 | Entity keys not provided                                                                                                                            |
| 1151 | Entity does not exist                                                                                                                               |
| 1152 | External payment transaction tx type invalid value provided                                                                                         |
| 1152 | External payment transaction tx type invalid value provided                                                                                         |
| 1153 | External payment transaction status invalid value provided                                                                                          |
| 1154 | External payment transaction status code invalid value provided                                                                                     |
| 1155 | External payment type ID only integer value allowed                                                                                                 |
| 1156 | Date created from only integer value allowed                                                                                                        |
| 1157 | Date created to only integer value allowed                                                                                                          |
| 1158 | Card purpose name is not provided                                                                                                                   |
| 1159 | Card purpose ID is not provided                                                                                                                     |
| 1160 | Card purpose not found                                                                                                                              |
| 1161 | Risk rule group name is not provided                                                                                                                |
| 1162 | Risk rule group name is too short                                                                                                                   |
| 1163 | Risk rule group name is too long                                                                                                                    |
| 1164 | Invalid risk rule group name provided                                                                                                               |
| 1165 | Risk rule group ID not provided                                                                                                                     |
| 1166 | Risk rule group not found                                                                                                                           |
| 1167 | Group with assigned risk rules cannot be deleted                                                                                                    |
| 1168 | Cannot deleted risk rules group which is assigned to program                                                                                        |
| 1169 | Risk rule ID not provided                                                                                                                           |
| 1170 | Risk rule is assigned as counter                                                                                                                    |
| 1171 | Risk rule not found                                                                                                                                 |
| 1172 | Risk rule name is not provided                                                                                                                      |
| 1173 | Risk rule name is too short                                                                                                                         |
| 1174 | Risk rule name is too long                                                                                                                          |
| 1175 | Invalid risk rule name provided                                                                                                                     |
| 1176 | Risk rule type not provided                                                                                                                         |
| 1177 | Risk rule type must be numeric                                                                                                                      |
| 1178 | Risk rule type is too long                                                                                                                          |
| 1179 | Invalid risk rule type provided                                                                                                                     |
| 1180 | Risk rule action not provided                                                                                                                       |
| 1181 | Risk rule action must be numeric                                                                                                                    |
| 1182 | Risk rule action is too long                                                                                                                        |
| 1183 | Invalid risk rule action provided                                                                                                                   |
| 1184 | Risk rule transaction amount must be numeric                                                                                                        |
| 1185 | Risk rule transaction amount currency ison must be numeric                                                                                          |
| 1186 | Risk rule transaction amount currency not found                                                                                                     |
| 1187 | Risk rule transaction amount currency is mandatory if transaction amount provided                                                                   |
| 1188 | Risk rule duration amount currency ison must be numeric                                                                                             |
| 1189 | Risk rule duration amount currency ison must be numeric                                                                                             |
| 1190 | Risk rule duration amount currency not found                                                                                                        |
| 1191 | Risk rule duration amount currency is mandatory if duration amount provided                                                                         |
| 1192 | Risk rule count must be numeric                                                                                                                     |
| 1193 | Risk rule duration must be numeric                                                                                                                  |
| 1194 | Unknown risk rule duration type provided                                                                                                            |
| 1195 | Entry mode not found                                                                                                                                |
| 1196 | Both MCC low and high required                                                                                                                      |
| 1197 | MCC high must be higher or equal than MCC low                                                                                                       |
| 1198 | Transaction country not found                                                                                                                       |
| 1199 | Transaction region not found                                                                                                                        |
| 1200 | Invalid risk rule transaction status provided                                                                                                       |
| 1201 | Risk rule transaction status only numeric value allowed                                                                                             |
| 1202 | Risk rule additional counter not found                                                                                                              |
| 1203 | Risk rule additional counter type is too long                                                                                                       |
| 1204 | Risk rule unknown additional counter type                                                                                                           |
| 1205 | Risk rule additional counter effected by must be numeric                                                                                            |
| 1206 | Risk rule additional counter effected by is too long                                                                                                |
| 1207 | Client credential ID is not provided                                                                                                                |
| 1208 | Risk rule transaction amount not provided                                                                                                           |
| 1209 | Risk rule duration amount not provided                                                                                                              |
| 1210 | Risk rule duration not provided                                                                                                                     |
| 1211 | Risk rule additional counter ID not provided                                                                                                        |
| 1212 | Risk rule additional counter type not provided                                                                                                      |
| 1213 | Risk rule additional counter effected by not provided                                                                                               |
| 1214 | API ID already exist. API secret should be the same                                                                                                 |
| 1215 | Reserved for future                                                                                                                                 |
| 1216 | Unknown entity does not exist                                                                                                                       |
| 1217 | Unknown field is empty                                                                                                                              |
| 1219 | Provided transaction amount is too low                                                                                                              |
| 1220 | Provided duration amount is too low                                                                                                                 |
| 1221 | Provided count is too low                                                                                                                           |
| 1222 | Provided duration is too low                                                                                                                        |
| 1223 | Risk rule duration or duration amount is required                                                                                                   |
| 1224 | Risk rule count not provided                                                                                                                        |
| 1225 | Bin is already in use                                                                                                                               |
| 1226 | Program availability not provided                                                                                                                   |
| 1227 | Program acs not provided                                                                                                                            |
| 1228 | Invalid value provided for the risk rule action                                                                                                     |
| 1229 | Cannot assign risk rule action                                                                                                                      |
| 1230 | Risk rule is counter only not provided                                                                                                              |
| 1231 | Risk rule is counter only boolean value allowed                                                                                                     |
| 1232 | FX fee transaction failed                                                                                                                           |
| 1233 | Risk rule code is not provided                                                                                                                      |
| 1234 | Risk rule code is too long                                                                                                                          |
| 1235 | Invalid risk rule code provided                                                                                                                     |
| 1240 | Replacement amount can not be greater or equal than transaction amount                                                                              |
| 1241 | API ID is already used                                                                                                                              |
| 1242 | Can not create partial reversal                                                                                                                     |
| 1243 | Can not create full reversal                                                                                                                        |
| 1244 | Can not revert reversal                                                                                                                             |
| 1245 | TAI config name is not provided                                                                                                                     |
| 1246 | TAI config name is too long                                                                                                                         |
| 1247 | TAI config name invalid                                                                                                                             |
| 1248 | TAI type is not provided                                                                                                                            |
| 1249 | Invalid TAI type value provided                                                                                                                     |
| 1250 | TAI config ID is not provided                                                                                                                       |
| 1251 | Invalid TAI config ID provided                                                                                                                      |
| 1252 | TAI config not found                                                                                                                                |
| 1253 | TAI config has TAI endpoints                                                                                                                        |
| 1254 | TAI config has programs                                                                                                                             |
| 1255 | TAI config has TAI notifications                                                                                                                    |
| 1256 | Paginator offset must be positive number                                                                                                            |
| 1258 | Can not create settlement                                                                                                                           |
| 1259 | Can not revert settlement                                                                                                                           |
| 1260 | Can not settlement reversal                                                                                                                         |
| 1261 | Can not settle settlement                                                                                                                           |
| 1262 | Actual authorize not found                                                                                                                          |
| 1263 | Failed to create settlement                                                                                                                         |
| 1264 | Can not change PIN for virtual cards                                                                                                                |
| 1265 | Can not unblock PIN for virtual cards                                                                                                               |
| 1269 | Carrier type is not provided                                                                                                                        |
| 1270 | Carrier type is too long                                                                                                                            |
| 1271 | Duplicated request                                                                                                                                  |
| 1274 | Authorization type must be numeric                                                                                                                  |
| 1275 | Invalid authorization type provided                                                                                                                 |
| 1278 | Incorrect card status                                                                                                                               |
| 1279 | Reference ID should be between 10 and 255 alphanumeric length                                                                                       |
| 1280 | Reference ID can contain only letters, numbers and dashes                                                                                           |
| 1282 | Risk rule duration type not provided                                                                                                                |
| 1283 | Risk rule duration value too high                                                                                                                   |
| 1284 | Limit duration value too high                                                                                                                       |
| 1285 | Generate new pan attribute is required                                                                                                              |
| 1286 | Generate new pan only boolean value is allowed                                                                                                      |
| 1287 | Is virtual attribute is required                                                                                                                    |
| 1288 | Is virtual only boolean value is allowed                                                                                                            |
| 1289 | New program is not compatible with card. Please choose another program or generate new PAN                                                          |
| 1290 | Risk rule reversed tx included is not provided                                                                                                      |
| 1291 | Risk rule reversed tx included only boolean value allowed                                                                                           |
| 1292 | Card status cannot be changed from s (s) to s (s)                                                                                               |
| 1304 | Risk rule amount must be numeric                                                                                                                    |
| 1305 | Risk rule amount ison must be numeric                                                                                                               |
| 1306 | Risk rule amount currency not found                                                                                                                 |
| 1307 | Risk rule amount currency is mandatory if amount provided                                                                                           |
| 1308 | Risk rule amount is not provided                                                                                                                    |
| 1309 | Risk rule condition type must be numeric                                                                                                            |
| 1310 | Risk rule condition type mandatory if amount provided                                                                                               |
| 1311 | Risk rule condition type is not provided                                                                                                            |
| 1312 | Card country ison must be same as holder country ison                                                                                               |
| 1313 | Risk rule reversed tx included is not provided                                                                                                      |
| 1314 | Risk rule amount ison is not provided                                                                                                               |
| 1318 | Card PAN length is incorrect                                                                                                                        |
| 1319 | A list has to be provided for the authorization risk rule ids                                                                                       |
| 1320 | A list has to be provided for the transaction risk rule ids                                                                                         |
| 1321 | Account suspended                                                                                                                                   |
| 1322 | Account status is receive only                                                                                                                      |
| 1323 | Account status is spend only                                                                                                                        |
| 1324 | External payment inbound is disabled                                                                                                                |
| 1325 | External payment outbound is disabled                                                                                                               |
| 1326 | Reserved for future                                                                                                                                 |
| 1327 | Risk rule response code is not provided                                                                                                             |
| 1328 | Invalid response code provided                                                                                                                      |
| 1329 | File name prefix is not provided                                                                                                                    |
| 1330 | File name prefix is too long                                                                                                                        |
| 1331 | Risk rule value not provided                                                                                                                        |
| 1332 | Load transaction rejected by risk rule                                                                                                              |
| 1334 | Incorrect account type                                                                                                                              |
| 1335 | External payment address already assigned for special account                                                                                       |
| 1336 | Invalid risk rule description provided                                                                                                              |
| 1340 | Risk rule foreign currency tx only is not provided                                                                                                  |
| 1341 | Risk rule foreign currency tx only boolean value allowed                                                                                            |
| 1342 | ACS empty encryption command                                                                                                                        |
| 1343 | ACS encryption failed                                                                                                                               |
| 1359 | Authorize programs ID only integer value allowed                                                                                                    |
| 1360 | Settlements programs ID only integer value allowed                                                                                                  |
| 1361 | Authorize is fraud only bool value allowed                                                                                                          |
| 1362 | Transaction is fraud only bool value allowed                                                                                                        |
| 1364 | Bypass instant notification should be false if stand in is false                                                                                    |
| 1365 | Internal balance check should be false if stand in is false                                                                                         |
| 1366 | Personalization file delivery config name is not provided                                                                                           |
| 1367 | Personalization file delivery config name is too short                                                                                              |
| 1368 | Personalization file delivery config name is too long                                                                                               |
| 1369 | Personalization file delivery config name is invalid                                                                                                |
| 1370 | Personalization file delivery config day is not provided                                                                                            |
| 1371 | Personalization file delivery config hour is not provided                                                                                           |
| 1372 | Personalization file delivery config min cards count must be numeric                                                                                |
| 1373 | Personalization file delivery config min cards count value is too big                                                                               |
| 1374 | Personalization file delivery config max term days must be numeric                                                                                  |
| 1375 | Personalization file delivery config max term days value is too big                                                                                 |
| 1376 | Personalization file delivery config ID is not provided                                                                                             |
| 1377 | Personalization file delivery config ID must be numeric                                                                                             |
| 1378 | Personalization file delivery config ID value is too big                                                                                            |
| 1379 | Personalization file delivery config is not found                                                                                                   |
| 1380 | Can not delete personalization file delivery config. It is already in use                                                                           |
| 1381 | Day is not found                                                                                                                                    |
| 1382 | Hour is not found                                                                                                                                   |
| 1383 | Invalid transaction amount direction provided                                                                                                       |
| 1384 | Transaction amount direction mandatory then transaction amount provided                                                                             |
| 1387 | Threshold data cannot be empty                                                                                                                      |
| 1388 | Threshold only integer value allowed                                                                                                                |
| 1389 | Threshold parameter cannot be more than 100                                                                                                         |
| 1390 | PEP parameter only numeric value allowed                                                                                                            |
| 1391 | Previous sanctions parameter only numeric value allowed                                                                                             |
| 1392 | Current sanctions parameter only numeric value allowed                                                                                              |
| 1393 | Law enforcement parameter only numeric value allowed                                                                                                |
| 1394 | Financial regulator parameter only numeric value allowed                                                                                            |
| 1395 | Insolvency parameter only numeric value allowed                                                                                                     |
| 1396 | Disqualified director parameter only numeric value allowed                                                                                          |
| 1397 | Adverse media parameter only numeric value allowed                                                                                                  |
| 1398 | Forename data cannot be empty                                                                                                                       |
| 1399 | Forename must be string                                                                                                                             |
| 1400 | Middle name must be string                                                                                                                          |
| 1401 | Middle name parameter length is invalid                                                                                                             |
| 1402 | Surname data cannot be empty                                                                                                                        |
| 1403 | Surname must be string                                                                                                                              |
| 1404 | Surname length cannot be more than 100                                                                                                              |
| 1405 | Date of birth parameter is invalid                                                                                                                  |
| 1406 | Year of birth must be numeric                                                                                                                       |
| 1407 | Address length cannot be more than 150                                                                                                              |
| 1408 | Address must be string                                                                                                                              |
| 1409 | City length cannot be more than 150                                                                                                                 |
| 1410 | City must be string                                                                                                                                 |
| 1411 | County length cannot be more than 100                                                                                                               |
| 1412 | County must be string                                                                                                                               |
| 1413 | Postcode length cannot be more than 20                                                                                                              |
| 1414 | Postcode must be string                                                                                                                             |
| 1415 | Country must be numeric                                                                                                                             |
| 1416 | Country length cannot be more than 100                                                                                                              |
| 1417 | Forename length cannot be more than 100                                                                                                             |
| 1418 | Risk merchant configuration setting already exists                                                                                                  |
| 1419 | Risk merchant configuration setting ID not provided                                                                                                 |
| 1420 | Risk merchant configuration setting not found                                                                                                       |
| 1423 | Invalid risk alert originator provided                                                                                                              |
| 1425 | Cannot delete risk merchant configuration because it is in use                                                                                      |
| 1427 | Holders not found                                                                                                                                   |
| 1428 | Card not found                                                                                                                                      |
| 1429 | Holder not found                                                                                                                                    |
| 1430 | Client issuers is not provided                                                                                                                      |
| 1431 | Client issuers only array value allowed                                                                                                             |
| 1432 | Program type is not provided                                                                                                                        |
| 1433 | Program type must be numeric                                                                                                                        |
| 1434 | Invalid program type provided                                                                                                                       |
| 1436 | Program validity period is not provided                                                                                                             |
| 1437 | Program validity value must be numeric                                                                                                              |
| 1438 | Request must be encrypted                                                                                                                           |
| 1439 | Client keys configuration error                                                                                                                     |
| 1440 | Request decryption failed                                                                                                                           |
| 1443 | ACS password must be numeric                                                                                                                        |
| 1444 | ACS password is too long                                                                                                                            |
| 1445 | Invalid ACS password provided                                                                                                                       |
| 1446 | ACS password return type not provided                                                                                                               |
| 1447 | Invalid ACS password return type provided                                                                                                           |
| 1448 | ACS password is too short                                                                                                                           |
| 1449 | Incorrect request format                                                                                                                            |
| 1453 | Card printer SFTP password is too long                                                                                                              |
| 1454 | At least SFTP password or SFTP ssh key must be provided                                                                                             |
| 1455 | Dispute external dispute ID is not provided                                                                                                         |
| 1456 | Dispute external dispute ID only numeric value is allowed                                                                                           |
| 1457 | Dispute external dispute ID is too long                                                                                                             |
| 1458 | SFTP config name not provided                                                                                                                       |
| 1459 | Invalid value provided for SFTP config type                                                                                                         |
| 1460 | SFTP config name invalid                                                                                                                            |
| 1461 | SFTP config host not provided                                                                                                                       |
| 1462 | Invalid value provided for SFTP config host                                                                                                         |
| 1463 | Only integer value allowed for SFTP config port                                                                                                     |
| 1464 | Invalid value provided for SFTP config ID                                                                                                           |
| 1465 | SFTP config ID not provided                                                                                                                         |
| 1466 | SFTP config not found                                                                                                                               |
| 1467 | SFTP configuration name too long                                                                                                                    |
| 1468 | SFTP configuration type not provided                                                                                                                |
| 1469 | SFTP username invalid                                                                                                                               |
| 1470 | SFTP password too long                                                                                                                              |
| 1471 | At least SFTP password or SFTP ssh key must be provided                                                                                             |
| 1472 | Minimum allowed value for port is 0                                                                                                                 |
| 1473 | Maximum allowed value for port is 65535                                                                                                             |
| 1474 | SFTP port not provided                                                                                                                              |
| 1475 | SFTP username not provided                                                                                                                          |
| 1476 | Virtual Card does not have PIN                                                                                                                      |
| 1477 | External payment method invalid external ID provided                                                                                                |
| 1478 | External payment method ID too long                                                                                                                 |
| 1479 | External payment method external ID too long                                                                                                        |
| 1480 | SFTP config path not provided                                                                                                                       |
| 1481 | Invalid value provided for SFTP config host                                                                                                         |
| 1482 | EPM address assign completed notification is not provided                                                                                           |
| 1483 | Invalid value provided for EPM address assign completed notification                                                                                |
| 1484 | EPM address assign failed notification is not provided                                                                                              |
| 1485 | Invalid value provided for EPM address assign failed notification                                                                                   |
| 1486 | SFTP config is in use. Cannot delete                                                                                                                |
| 1487 | Is settled must be numeric                                                                                                                          |
| 1488 | Is settled only 0 and 1 values allowed                                                                                                              |
| 1489 | Something went wrong. Please try again later                                                                                                        |
| 1490 | Failed to encrypt CSV file                                                                                                                          |
| 1491 | Date created from only integer value allowed                                                                                                        |
| 1492 | Date created to only integer value allowed                                                                                                          |
| 1493 | Item count parameter should be between 1 and 100                                                                                                    |
| 1494 | Date range is limited to 48 hours                                                                                                                   |
| 1499 | Personalization file delivery config name is already taken                                                                                          |
| 1500 | Unload transaction rejected by risk rule                                                                                                            |
| 1501 | Internal host unload transaction card amount limit has been reached                                                                                 |
| 1502 | Internal host unload transaction account amount limit has been reached                                                                              |
| 1503 | Internal host unload transaction holder amount limit has been reached                                                                               |
| 1504 | Load FX fee transaction failed                                                                                                                      |
| 1505 | Unload FX fee transaction failed                                                                                                                    |
| 1506 | Request reference not provided                                                                                                                      |
| 1507 | Request reference only integer value allowed                                                                                                        |
| 1508 | Auto conversion must be numeric                                                                                                                     |
| 1509 | Auto conversion only 0 and 1 values allowed                                                                                                         |
| 1510 | Auto conversion is not supported by program                                                                                                         |
| 1511 | Risk rule can be created only as counter                                                                                                            |
| 1512 | Risk rules group assigned to the card cannot be deleted                                                                                             |
| 1513 | Risk rules group assigned to the account cannot be deleted                                                                                          |
| 1514 | All the same digits in PIN are not allowed.                                                                                                         |
| 1515 | All sequential digits in PIN are not allowed.                                                                                                       |
| 1516 | Fee group cannot be removed, because it is used in accounts                                                                                         |
| 1517 | Holder type not provided                                                                                                                            |
| 1518 | Holder type is invalid                                                                                                                              |
| 1519 | Holder business name not provided                                                                                                                   |
| 1520 | Holder business name is invalid                                                                                                                     |
| 1521 | Holder business name is too long                                                                                                                    |
| 1522 | Duplicate account ID value provided                                                                                                                 |
| 1523 | MAPI client validation failed. s                                                                                                                   |
| 1524 | Account ID should be provided when owner ID is provided                                                                                             |
| 1525 | Offset must be numeric                                                                                                                              |
| 1526 | Can not find card design by scheme assigned to product                                                                                              |
| 1527 | Column not found                                                                                                                                    |
| 1528 | A list has to be provided for the columns                                                                                                           |
| 1529 | Risk merchant config setting reason is too long                                                                                                     |
| 1530 | Risk merchant config invalid reason provided                                                                                                        |
| 1531 | Use activate card method to change card status from not activated to activated                                                                      |
| 1532 | Client integration not found                                                                                                                        |
| 1533 | Client integration type integer allowed                                                                                                             |
| 1534 | Client integration type incorrect value length                                                                                                      |
| 1535 | Client integration type is not provided                                                                                                             |
| 1536 | Client integration URL string allowed                                                                                                               |
| 1537 | Client integration URL incorrect value length                                                                                                       |
| 1538 | Client integration URL is not provided                                                                                                              |
| 1539 | Client integration external ID integer allowed                                                                                                      |
| 1540 | Client integration external ID incorrect value length                                                                                               |
| 1541 | Client integration external ID is not provided                                                                                                      |
| 1542 | Client integration config string allowed                                                                                                            |
| 1543 | Client integration config is not provided                                                                                                           |
| 1544 | Client integration config integer allowed                                                                                                           |
| 1545 | Client integration URL invalid                                                                                                                      |
| 1546 | Client integration ID is not provided                                                                                                               |
| 1547 | Client integration invalid type provided                                                                                                            |
| 1549 | Encryption mode is not provided                                                                                                                     |
| 1550 | Encryption mode is invalid                                                                                                                          |
| 1551 | Provided card does not belong to provided account                                                                                                   |
| 1552 | A list has to be provided for the payment methods                                                                                                   |
| 1553 | Client for the integration is not provided                                                                                                          |
| 1554 | Client for the integration is not found                                                                                                             |
| 1555 | Connection problem                                                                                                                                  |
| 1556 | Design code only string allowed                                                                                                                     |
| 1557 | Session ID not provided                                                                                                                             |
| 1558 | Card ID should not be blank                                                                                                                         |
| 1559 | Invalid localization provided                                                                                                                       |
| 1560 | Invalid page provided                                                                                                                               |
| 1561 | Invalid design provided                                                                                                                             |
| 1562 | Default design not found                                                                                                                            |
| 1563 | Default localization translation not found                                                                                                          |
| 1564 | Card frame integration not configured                                                                                                               |
| 1565 | Custom notifications source not provided                                                                                                            |
| 1566 | Custom notifications source only integer value allowed                                                                                              |
| 1567 | Custom notifications source incorrect value length                                                                                                  |
| 1568 | Custom notifications source is incorrect                                                                                                            |
| 1569 | Custom notifications invoked event not provided                                                                                                     |
| 1570 | Custom notifications invoked event is too long                                                                                                      |
| 1571 | Invalid custom notifications invoked event provided                                                                                                 |
| 1572 | Custom notifications payload only array value allowed                                                                                               |
| 1573 | Design code incorrect value length                                                                                                                  |
| 1574 | Generate new card PIN only boolean value is allowed                                                                                                 |
| 1575 | TAI notification ID not provided                                                                                                                    |
| 1576 | TAI notification not found                                                                                                                          |
| 1577 | TAI notification ID only integer value allowed                                                                                                      |
| 1578 | Actual authorize ID only integer value allowed                                                                                                      |
| 1579 | TAI notification is sent only defined values allowed                                                                                                |
| 1580 | Note too long                                                                                                                                       |
| 1581 | Keep directory structure not provided                                                                                                               |
| 1582 | Invalid keep directory structure provided                                                                                                           |
| 1583 | Unable to lock resources. Please retry later                                                                                                       |
| 1584 | Specified transaction type are not allowed for provided limit type                                                                                  |
| 1585 | Logs external aggregated record ID is not provided                                                                                                  |
| 1586 | Log external aggregated entity not provided                                                                                                         |
| 1587 | Account ID s belongs to another company                                                                                                            |
| 1588 | Custom fee transaction failed                                                                                                                       |
| 1589 | Account currency or transaction ID must be specified                                                                                                |
| 1590 | Original transaction ID must be numeric                                                                                                             |
| 1591 | SFTP endpoint must be unique                                                                                                                        |
| 1592 | Fee collection ID not provided                                                                                                                      |
| 1593 | Fee collection ID only integer value allowed                                                                                                        |
| 1594 | Fee collection ID too long                                                                                                                          |
| 1595 | Fee collection has not been found                                                                                                                   |
| 1596 | Date imported from not set                                                                                                                          |
| 1597 | Date imported from only integer value allowed                                                                                                       |
| 1598 | Date imported from too long                                                                                                                         |
| 1599 | Date imported to not set                                                                                                                            |
| 1600 | Date imported to only integer value allowed                                                                                                         |
| 1601 | Date imported to too long                                                                                                                           |
| 1602 | Card ID only integer value allowed                                                                                                                  |
| 1603 | Card ID too long                                                                                                                                    |
| 1604 | Card has not been found                                                                                                                             |
| 1605 | Processing code only string value allowed                                                                                                           |
| 1606 | Processing code too long                                                                                                                            |
| 1607 | Transaction amount only integer value allowed                                                                                                       |
| 1608 | Transaction amount too long                                                                                                                         |
| 1609 | Transaction currency ISON only numeric value allowed                                                                                                |
| 1610 | Transaction currency ISON too short                                                                                                                 |
| 1611 | Transaction currency ISON too long                                                                                                                  |
| 1612 | Reconciliation amount only integer value allowed                                                                                                    |
| 1613 | Reconciliation amount too long                                                                                                                      |
| 1614 | Reconciliation currency ISON only numeric value allowed                                                                                             |
| 1615 | Reconciliation currency ISON too short                                                                                                              |
| 1616 | Reconciliation currency ISON too long                                                                                                               |
| 1617 | Function code only integer value allowed                                                                                                            |
| 1618 | Function code too long                                                                                                                              |
| 1619 | Trace ID only string value allowed                                                                                                                  |
| 1620 | Trace ID too long                                                                                                                                   |
| 1621 | Scheme ID only integer value allowed                                                                                                                |
| 1622 | Scheme ID too long                                                                                                                                  |
| 1623 | Invalid scheme ID provided                                                                                                                          |
| 1624 | Issuer ID only integer value allowed                                                                                                                |
| 1625 | Issuer ID too long                                                                                                                                  |
| 1626 | Issuer has not been found                                                                                                                           |
| 1627 | Invalid clearing file ID provided                                                                                                                   |
| 1628 | Clearing file ID too long                                                                                                                           |
| 1629 | Transaction ID only integer value allowed                                                                                                           |
| 1630 | Transaction ID too long                                                                                                                             |
| 1631 | Authorize ID only integer value allowed                                                                                                             |
| 1632 | Authorize ID too long                                                                                                                               |
| 1633 | Do not have permission to access requested fee collection record                                                                                    |
| 1634 | Invalid record ID                                                                                                                                   |
| 1635 | Invalid log ID                                                                                                                                      |
| 1636 | Not supported entity or action                                                                                                                      |
| 1637 | Invalid date provided                                                                                                                               |
| 1639 | Fee group must be from account program                                                                                                              |
| 1640 | Fee not found                                                                                                                                       |
| 1641 | Amount currency must be specified                                                                                                                   |
| 1642 | Fee currency must by same as transaction currency or amount currency                                                                                |
| 1644 | Access level is not provided                                                                                                                        |
| 1645 | Access level only integer value allowed                                                                                                             |
| 1646 | Access level should be between 0 and 1000                                                                                                           |
| 1647 | Holder access level is not provided                                                                                                                 |
| 1648 | Holder access level only integer value allowed                                                                                                      |
| 1649 | Holder access level should be between 0 and 1000                                                                                                    |
| 1650 | Fee group must be same as account fee group                                                                                                         |
| 1651 | Description should not be blank                                                                                                                     |
| 1652 | Fixed fee not found                                                                                                                                 |
| 1653 | External payment transaction ID too long                                                                                                            |
| 1654 | Reason only numeric value allowed                                                                                                                   |
| 1655 | Reason too long                                                                                                                                     |
| 1656 | Incorrect reason value provided                                                                                                                     |
| 1657 | Reference only string value allowed                                                                                                                 |
| 1658 | Reference too long                                                                                                                                  |
| 1659 | Request reference only string value allowed                                                                                                         |
| 1660 | Request reference too long                                                                                                                          |
| 1661 | Incorrect external payment transaction status                                                                                                       |
| 1662 | This action cannot be completed at the moment                                                                                                       |
| 1663 | Access level too low to get data                                                                                                                    |
| 1664 | Risk score only numeric value allow                                                                                                                 |
| 1665 | Risk score too long                                                                                                                                 |
| 1666 | Incorrect risk score value provided                                                                                                                 |
| 1671 | Encrypted request content is not valid JSON                                                                                                         |
| 1672 | Client design not found                                                                                                                             |
| 1673 | Client translation not found                                                                                                                        |
| 1674 | Default card enroll status required                                                                                                                 |
| 1675 | Invalid date of company incorporation provided                                                                                                      |
| 1676 | Date of company incorporation too short                                                                                                             |
| 1677 | Date of company incorporation too long                                                                                                              |
| 1678 | CVV service code must be three characters long                                                                                                      |
| 1679 | Industry ID only numeric value allowed                                                                                                              |
| 1680 | Incorrect industry ID value provided                                                                                                                |
| 1681 | Invalid Generate New PIN flag provided, when switching card from virtual to physical                                                                |
| 1683 | Card thermal line one too long                                                                                                                      |
| 1684 | Invalid card thermal line one provided                                                                                                              |
| 1685 | Card thermal line two only string value allowed                                                                                                     |
| 1686 | Card thermal line two too long                                                                                                                      |
| 1687 | Invalid card thermal line two provided                                                                                                              |
| 1688 | Authorize expires after must be numeric                                                                                                             |
| 1689 | Authorize expires after value is incorrect                                                                                                          |
| 1690 | Card thermal line one only string value allowed                                                                                                     |
| 1691 | Limit group does not belong to the selected program                                                                                                 |
| 1692 | Fee group ID too long                                                                                                                               |
| 1693 | Fee group does not belong to the selected program                                                                                                   |
| 1694 | Usage group does not belong to the selected program                                                                                                 |
| 1695 | Risk group does not belong to the selected program                                                                                                  |
| 1714 | Date of company incorporation length is invalid                                                                                                     |
| 1715 | Receiver type only numeric value allowed                                                                                                            |
| 1716 | Incorrect receiver type value provided                                                                                                              |
| 1717 | Withdrawal purpose only numeric value allowed                                                                                                       |
| 1718 | Incorrect withdrawal purpose value provided                                                                                                         |
| 1727 | External payment address status not provided                                                                                                        |
| 1728 | External payment address status only string value allowed                                                                                           |
| 1729 | Incorrect external payment address status provided                                                                                                  |
| 1730 | External payment address old status and new status cannot be the same                                                                               |
| 1731 | External payment address status change is in progress                                                                                               |
| 1734 | Permission denied. Check whitelisted IP configuration                                                                                               |
| 1735 | Invalid IP list                                                                                                                                     |
| 1755 | FX fee applying strategy cannot be null                                                                                                             |
| 1736 | FX fee applying strategy must be numeric                                                                                                            |
| 1757 | FX fee applying strategy must be from the list                                                                                                      |
| 1759 | Working hours cannot be null                                                                                                                        |
| 1760 | Working hours must be numeric                                                                                                                       |
| 1761 | Working hours must be from the list                                                                                                                 |
| 1770 | Incorrect EPM address status                                                                                                                        |
| 1771 | External payment direct credit is disabled                                                                                                          |
| 1772 | Failed to change external payment address status                                                                                                    |
| 1773 | Mandate cancel reason not provided                                                                                                                  |
| 1774 | Incorrect mandate cancel reason provided                                                                                                            |
| 1775 | Holder currency must be numeric                                                                                                                     |
| 1776 | Holder currency must be three chars                                                                                                                 |
| 1777 | Holder currency is not provided                                                                                                                     |
| 1778 | Holder currency is not found                                                                                                                        |
| 1779 | Billing currency must be numeric                                                                                                                    |
| 1780 | Billing currency must be three chars                                                                                                                |
| 1781 | Billing currency is not found                                                                                                                       |
| 1782 | Transaction currency must be numeric                                                                                                                |
| 1783 | Transaction currency must be three chars                                                                                                            |
| 1784 | Transaction currency is not found                                                                                                                   |
| 1785 | Direct debit return reason not provided                                                                                                             |
| 1786 | Incorrect direct debit return reason provided                                                                                                       |
| 1787 | Direct debit payment status already changed                                                                                                         |
| 1802 | Incorrect external payment transaction type                                                                                                         |
| 1803 | External payment transaction already returned                                                                                                       |
| 1804 | External payment transaction is older then allowed                                                                                                  |
| 1817 | Invalid external payment scheme ID provided                                                                                                         |
| 1770 | Incorrect EPM address status                                                                                                                        |
| 1810 | account_id, card_id or holder_id must be provided                                                                                                   |
| 1811 | Card not found                                                                                                                                      |
| 1820 | Incorrect sort code length                                                                                                                          |
| 1821 | Endpoint ID must be numeric                                                                                                                         |
| 1822 | Endpoint ID is too long                                                                                                                             |
| 1823 | Client integration ping URL only string value allowed                                                                                               |
| 1824 | Client integration ping URL is too long                                                                                                             |
| 1825 | Invalid client integration ping URL                                                                                                                 |
| 1838 | Open banking consents not provided                                                                                                                  |
| 1839 | Open banking consents array value allowed                                                                                                           |
| 1841 | Token is missing                                                                                                                                    |
| 1842 | Consents is missing                                                                                                                                 |
| 1843 | Consents only array value allowed                                                                                                                   |
| 1844 | Accounts is missing                                                                                                                                 |
| 1845 | Accounts only array value allowed                                                                                                                   |
| 1846 | Account config not found                                                                                                                            |
| 1847 | Invalid consent value                                                                                                                               |
| 1869 | Invalid open banking consent                                                                                                                        |
| 1870 | Open banking token is not provided                                                                                                                  |
| 1871 | Open banking consents is not provided                                                                                                               |
| 1872 | Open banking consents only array value allowed                                                                                                      |
| 1873 | Open banking IBANs is not provided                                                                                                                  |
| 1874 | Open banking IBANs only array value allowed                                                                                                         |
| 1875 | Authentication endpoint name must be unique                                                                                                         |
| 1876 | Authentication endpoint API ID must be unique                                                                                                       |
| 1877 | Open banking token already exists                                                                                                                   |
| 1878 | Open banking expiration date invalid format                                                                                                         |
| 1879 | Open banking expiration date not found                                                                                                              |
| 1881 | Open banking token is too long                                                                                                                      |
| 1882 | Open banking IBANs must be unique                                                                                                                   |
| 1888 | Authentication request ID not provided                                                                                                              |
| 1890 | Confirmation status not provided                                                                                                                    |
| 1891 | Invalid confirmation status provided                                                                                                                |
| 1892 | Authentication request not found                                                                                                                    |
| 1893 | Card account risk rule group ID must be numeric                                                                                                     |
| 1894 | Fee group ID only integer value allowed                                                                                                             |
| 1895 | Open banking payment is already completed                                                                                                           |
| 1895 | Limit group ID only integer value allowed                                                                                                           |
| 1896 | Holder authentication notification is not provided                                                                                                  |
| 1897 | Invalid value provided for holder authentication notification                                                                                       |
| 1900 | Risk rule group ID only integer value allowed                                                                                                       |
| 1902 | Authentication endpoint API key not provided                                                                                                        |
| 1903 | Authentication endpoint API key too long                                                                                                            |
| 1904 | Authentication endpoint API key invalid                                                                                                             |
| 1908 | Load amount is lower than fee                                                                                                                       |
| 1912 | Risk processor is down                                                                                                                              |
| 1913 | Transaction rejected by risk processor. Risk code: s                                                                                               |
| 1914 | Authentication request ID integer allowed                                                                                                           |
| 1916 | OOB authentication method not provided                                                                                                              |
| 1917 | Invalid OOB authentication method provided                                                                                                          |
| 1918 | Provided currency is different from the currency assigned to s account                                                                             |
| 1919 | Card ID s already have an assigned account with the same currency                                                                                  |
| 1920 | Incorrect reason code provided                                                                                                                      |
| 1922 | Sender external payment address data is not provided                                                                                                |
| 1930 | Account and EPM address currencies do not match                                                                                                     |
| 1931 | Special account and EPM address currencies do not match                                                                                             |
| 1953 | Open banking EPM addresses only array allowed                                                                                                       |
| 1954 | Open banking EPM addresses must be unique                                                                                                           |
| 1955 | Transaction ID or transaction date imported from and transaction date imported to must be provided                                                  |
| 1956 | Open banking EPM addresses or IBANs must be provided                                                                                                |
| 1959 | Open banking EPM address must be numeric                                                                                                            |
| 1977 | Invalid card track data first name provided                                                                                                         |
| 1978 | Invalid card track data last name provided                                                                                                          |
| 1979 | Card track data name and last name combined exceeds allowed length                                                                                  |
| 1987 | Card track data name exceeds allowed length                                                                                                         |
| 1988 | Card track last name exceeds allowed length                                                                                                         |
| 1996 | Card track data name and last name combined length too short                                                                                        |
| 2016 | Return reason ID must be numeric                                                                                                                    |
| 2030 | Invalid program ID value                                                                                                                            |
| 2031 | Invalid card account ID value                                                                                                                       |
| 2016 | Return reason ID must be numeric                                                                                                                    |
| 2027 | Limit ID must be integer                                                                                                                            |
| 2028 | Record limit not found                                                                                                                              |
| 2029 | Record limit count update failed                                                                                                                    |
| 2032 | Limit ID not provided                                                                                                                               |
| 2033 | Record not found                                                                                                                                    |
| 2089 | Card ACS authentication method not provided                                                                                                         |
| 2090 | Invalid card ACS authentication method provided                                                                                                     |
| 2109 | Card ACS external client integration ID must be numeric                                                                                             |
| 2110 | Card ACS external client integration cannot be provided for given authentication method                                                             |
| 2101 | Limits group ID is not provided                                                                                                                     |
| 2119 | External ACS provider error: s                                                                                                                     |
| 2120 | Verification value mismatch                                                                                                                         |
| 2121 | Challenge has already been confirmed                                                                                                                |
| 2131 | Update address owner data integer allowed                                                                                                           |
| 2132 | Update address owner data not provided                                                                                                              |
| 2218 | Invalid request.                                                                                                                                    |
| 2219 | Integration account not found.                                                                                                                      |
| 2220 | Amount limit exceeded.                                                                                                                              |
| 2221 | Currency not supported.                                                                                                                             |
| 2222 | Bank account address not found.                                                                                                                     |
| 2223 | Outbound transfers disabled for bank account.                                                                                                       |
| 2224 | Bank account is closed.                                                                                                                             |
| 2225 | Cannot reverse inbound transaction.                                                                                                                 |
| 2226 | Invalid transaction status for return.                                                                                                              |
| 2227 | Only pending direct debit transaction status can be updated.                                                                                        |
| 2228 | Internal system error.                                                                                                                              |
| 2229 | Currency not active.                                                                                                                                |
| 2230 | Client authentication required.                                                                                                                     |
| 2231 | Mandate already cancelled.                                                                                                                          |
| 2232 | IBAN or account number and sort code pair must be provided.                                                                                         |
| 2233 | Only IBAN or only account number and sort code pair must be provided.                                                                               |
| 2234 | IBAN is required.                                                                                                                                   |
| 2235 | Scheme not supported.                                                                                                                               |
| 2236 | Invalid account number.                                                                                                                             |
| 2237 | Functionality not supported.                                                                                                                        |
| 2238 | BIC is required.                                                                                                                                    |
| 2239 | Cannot return outbound transaction.                                                                                                                 |
| 2240 | Not authorized.                                                                                                                                     |
| 2241 | Return reason is not supported by bank provider.                                                                                                    |
| 2242 | Invalid transaction cancel request type.                                                                                                            |
| 2243 | Invalid transaction cancel request status.                                                                                                          |
| 2244 | Transaction cancel not found.                                                                                                                       |
| 2245 | Cancel instruction transaction type is not inbound.                                                                                                 |
| 2246 | Cancel instruction is already expired.                                                                                                              |
| 2247 | Failed to handle request due to not being able to acquire lock.                                                                                     |
| 2248 | Reference field is missing.                                                                                                                         |
| 2249 | Cancel instruction already exists.                                                                                                                  |
| 2250 | Transaction is already returned.                                                                                                                    |
| 2251 | Additional information is required, due to selected reason code.                                                                                    |
| 2252 | Reason originator name is required, due to selected reason code.                                                                                    |
| 2253 | Reason code is required.                                                                                                                            |
| 2254 | You are not allowed to cancel local transfer.                                                                                                       |
| 2255 | Invalid account number or sort code.                                                                                                                |
| 2256 | Payment accepted.                                                                                                                                   |
| 2257 | Payment rejected.                                                                                                                                   |
| 2258 | Debit payment disabled.                                                                                                                             |
| 2259 | Request reference already exists.                                                                                                                   |
| 2260 | Destination details note is invalid. Max 35 characters are allowed.                                                                                 |
| 2261 | All details are empty, please fill in data that you want to update.                                                                                 |
| 2262 | We were unable to get holder data.                                                                                                                  |
| 2263 | Bank account address is not type of business.                                                                                                       |
| 2264 | Bank account address is type of business.                                                                                                           |
| 2265 | Provider not available at this time.                                                                                                                |
| 2267 | Request reference or transaction ID must be provided.                                                                                               |
| 2268 | Notification not found.                                                                                                                             |
| 2269 | Bank account is not valid client account.                                                                                                           |
| 2270 | Mandate service user number and reference is already in use, please use a different reference.                                                      |
| 2271 | Invalid mandate.                                                                                                                                    |
| 2272 | Reason is not supported by bank provider.                                                                                                           |
| 2273 | Destination account name is required.                                                                                                               |
| 2274 | Destination account last name is required.                                                                                                          |
| 2275 | Destination details are required.                                                                                                                   |
| 2276 | Destination details country is required.                                                                                                            |
| 2277 | Destination details city is required.                                                                                                               |
| 2278 | Destination details address is required.                                                                                                            |
| 2279 | Destination details postal code is required.                                                                                                        |
| 2280 | Destination details note is required.                                                                                                               |
| 2281 | Invalid beneficiary.                                                                                                                                |
| 2282 | Email already used.                                                                                                                                 |
| 2283 | Email and mobile already used.                                                                                                                      |
| 2284 | Mobile already used.                                                                                                                                |
| 2285 | Validation error.                                                                                                                                   |
| 2286 | Account holder not found.                                                                                                                           |
| 2287 | Company already registered.                                                                                                                         |
| 2288 | Mandate originator name is too long.                                                                                                                |
| 2289 | Destination bank account address does not support selected payment scheme.                                                                          |
| 2290 | Invalid destination bank account address.                                                                                                           |
| 2291 | Creditor account creation is not complete.                                                                                                          |
| 2292 | Time for direct debit cancellation request has passed.                                                                                              |
| 2293 | Source and target currency matches.                                                                                                                 |
| 2294 | Exchange not found.                                                                                                                                 |
| 2295 | Request reference or bank account address ID must be provided.                                                                                      |
| 2296 | Request could not be sent to bank provider.                                                                                                         |
| 2297 | Account name or holder must be provided.                                                                                                            |
| 2298 | Account name or company must be provided.                                                                                                           |
| 2299 | Invalid API token.                                                                                                                                  |
| 2300 | API token is disabled.                                                                                                                              |
| 2301 | Invalid signature provided.                                                                                                                         |
| 2302 | This value is not a valid datetime.                                                                                                                 |
| 2303 | This value is not a valid date.                                                                                                                     |
| 2304 | This collection should contain less elements.                                                                                                       |
| 2305 | This collection should contain more elements.                                                                                                       |
| 2306 | This field was not expected.                                                                                                                        |
| 2307 | This field is missing.                                                                                                                              |
| 2308 | You must select at most s choices.                                                                                                                 |
| 2309 | You must select at least s choices.                                                                                                                |
| 2310 | One or more of the given values is invalid.                                                                                                         |
| 2311 | This value should be blank.                                                                                                                         |
| 2312 | This value should be a multiple of s.                                                                                                              |
| 2313 | This value is not a valid email address.                                                                                                            |
| 2314 | This value should be equal to s.                                                                                                                   |
| 2315 | This value is not valid.                                                                                                                            |
| 2316 | This value should be greater.                                                                                                                       |
| 2317 | This value should be greater than or equal to s.                                                                                                   |
| 2318 | This is not a valid International Bank Account Number (IBAN).                                                                                       |
| 2319 | This value should be identical to s s.                                                                                                            |
| 2320 | This value is too short.                                                                                                                            |
| 2321 | This value is too long.                                                                                                                             |
| 2322 | This value does not match the expected charset.                                                                                                     |
| 2323 | This value should be less.                                                                                                                          |
| 2324 | This value should be less than or equal to s.                                                                                                      |
| 2325 | This value should not be blank.                                                                                                                     |
| 2326 | This value should not be equal to s.                                                                                                               |
| 2327 | This value should not be identical to s s.                                                                                                        |
| 2328 | This value should not be null.                                                                                                                      |
| 2329 | This value should be a valid number.                                                                                                                |
| 2330 | This value should be smaller.                                                                                                                       |
| 2331 | This value should be bigger.                                                                                                                        |
| 2332 | This value is not a valid time.                                                                                                                     |
| 2333 | Invalid type.                                                                                                                                       |
| 2334 | This is not a valid Business Identifier Code (BIC).                                                                                                 |
| 2352 | Ether epm_request_reference_id or epm_transaction_id must be provided.                                                                              |
| 2353 | Reason is required.                                                                                                                                 |
| 2354 | Additional information only string value allowed.                                                                                                   |
| 2355 | Additional information is too long.                                                                                                                 |
| 2356 | Additional information must be provided.                                                                                                            |
| 2357 | Reason originator name only string value allowed.                                                                                                   |
| 2358 | Reason originator name is too long.                                                                                                                 |
| 2359 | Reason originator must be provided.                                                                                                                 |
| 2360 | EPM transaction is not settled.                                                                                                                     |
| 2361 | EPM transaction cannot be canceled again.                                                                                                           |
| 2362 | EPM transaction return is already processed.                                                                                                        |

Notes:
- `s` - message placeholder to provide more information about an error.

### Limit transaction type

| Type | Name                          | Description                                                    |
|------|-------------------------------|----------------------------------------------------------------|
| 1    | Accumulated per period        | Transaction count or all transactions amount limit per period. |
| 2    | Minimum per transaction       | Minimum amount allowed per transaction.                        |
| 3    | Maximum per transaction       | Maximum amount allowed per transaction.                        |
| 4    | Maximum balance               | Maximum amount allowed in balance.                             |
| 5    | Transactions sequence counter | Maximum amount/count allowed transactions in a row.            |

### Limit type

| Type | Name          | Description                                      |
|------|---------------|--------------------------------------------------|
| 0    | General limit | This limit type only applicable for limit groups |
| 1    | Card limit    |                                                  |
| 2    | Account limit |                                                  |
| 3    | Holder limit  |                                                  |

### Load source

| ID | Source                              | Description                                                                     |
|----|-------------------------------------|---------------------------------------------------------------------------------|
| 0  | Unknown                             | Partner system does not know the source of the funds                            |
| 1  | Internal Account                    | Funds are transferred from Tribe held account                                   |
| 2  | Internal Card                       | Funds are transferred from Tribe held card                                      |
| 3  | Debit Card                          | External Debit Card Load via partner Gateway                                    |
| 4  | Credit Card                         | External Credit Card Load via partner Gateway                                   |
| 5  | Bank Transfer                       | External Bank Transfer to partner Bank Account                                  |
| 6  | Cash                                | External load of cash to the account                                            |
| 7  | Unload to repatriate                | Used to unload funds and return them to external customer account               |
| 8  | Unload to partner account           | Used to unload funds to cover costs not covered by fees held elsewhere          |
| 9  | PayPal                              | External PayPal load via partner Gateway                                        |
| 10 | Poli                                | External Poli load via partner Gateway                                          |
| 11 | Payeer                              | External Payer load via partner Gateway                                         |
| 12 | EPG Ideal                           | External EPG Ideal load via partner Gateway                                     |
| 13 | OKPay                               | External OKPay load via partner Gateway                                         |
| 14 | Qiwi                                | External Qiwi load via partner Gateway                                          |
| 15 | Sofort                              | External Sofort load via partner Gateway                                        |
| 16 | Astropay                            | External Astropay load via partner Gateway                                      |
| 17 | Skrill                              | External Skrill load via partner Gateway                                        |
| 18 | Neteller                            | External Neteller load via partner Gateway                                      |
| 19 | EcoPayz                             | External EcoPayz load via partner Gateway                                       |
| 20 | Bitcoin                             | Crypto Load via Bitcoin                                                         |
| 21 | BitcoinCash                         | Crypto Load via BitcoinCash                                                     |
| 22 | Etherium                            | Crypto Load via Etherium                                                        |
| 23 | Litecoin                            | Crypto Load via Litecoin                                                        |
| 24 | Ripple                              | Crypto Load via Ripple                                                          |
| 25 | Customer Account                    | Internal load from Customer account to another account held at Tribe            |
| 26 | Payouts Account                     | Internal load from Payouts account to another account held at Tribe             |
| 27 | Cashback Account                    | Internal load from Cashback account to another account held at Tribe            |
| 28 | Office Account                      | Internal load from Office account to another account held at Tribe              |
| 29 | Fees and Chargeback Account         | Internal load from Fees and Chargeback account to another account held at Tribe |
| 30 | External client Wallet              | External load via client Wallet                                                 |
| 31 | Balance adjustment load from GUI    | Balance adjustment created via admin panel                                      |
| 32 | Balance adjustment load from PM API | Balance adjustment created via PM API                                           |
| 33 | Balance adjustment load by system   | Balance adjustment created by system                                            |

### Load type

| ID | Type     | Description |
|----|----------|-------------|
| 0  | Unknown  |             |
| 1  | e-Wallet |             |
| 2  | Internal |             |

### Balance adjustment type

| ID | Type                   |
|----|------------------------|
| 1  | Compensation credit    |
| 2  | Debit authority        |
| 3  | Beyond 7 days debit    |
| 4  | Indemnity debit        |
| 5  | Indemnity credit       |
| 6  | Goodwill credit        |
| 7  | Return to source debit |
| 8  | System failure debit   |
| 9  | System failure credit  |
| 10 | Chargeback debit       |
| 11 | Chargeback credit      |

### Region type

| Type | Name                         | Description                                                                  |
|------|------------------------------|------------------------------------------------------------------------------|
| 0    | All regions                  |                                                                              |
| 1    | Domestic                     | Transaction country same as holder country.                                  |
| 2    | International                | International - In specified country.                                        |
| 3    | International within region  | International within region - Holder region not equal to Transaction region. |
| 4    | International outside region | International outside region - Holder region equal to Transaction region.    |

### Transaction type

| Type | Name                                              | Operation sign | Description                                                    | MC                                                                   | Visa                                                           | UPI                                                                | API/Internal | EPM |
|------|---------------------------------------------------|----------------|----------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------------|--------------|-----|
| 0    | Unknown                                           | -              | Can't determine transaction type.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 1    | Load                                              | Credit         | Card load via API.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    | +            |     |
| 2    | Pos                                               | Debit          | Purchase by card.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 3    | Atm                                               | Debit          | ATM withdrawal.                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 4    | Unload                                            | Debit          | Card unload/withdrawal via API.                                |                                                                      |                                                                |                                                                    | +            |     |
| 5    | Credit cheque                                     | Credit         | Credit cheque.                                                 |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 6    | Balance inquiry                                   | -              | Balance inquiry at ATM/POS.                                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 7    | Cashback                                          | Debit          | Cashback at sale point.                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 8    | Cash                                              | Debit          | Cash withdrawal.                                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 9    | Quasi cash                                        | Debit          | Quasi cash operation.                                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 10   | Credit                                            | Credit         | Original credit operation.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 11   | Credit adjustment                                 | Credit         | Credit adjustment via API.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 12   | Refund                                            | Credit         | Refund.                                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 13   | Debit adjustment                                  | Debit          | Debit adjustment via API.                                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 14   | Pin unblock                                       | -              | PIN unblock via ATM.                                           | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 15   | Pin change                                        | -              | PIN Change at ATM.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 16   | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 17   | Pos verification only                             | -              | Pos verification only.                                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 18   | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 19   | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 20   | Money transfer                                    | Debit          | Money transfer operation (UnionPay).                           |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 21   | P2p debit                                         | Debit          | P2P transfer debit part.                                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 22   | P2p credit                                        | Credit         | P2P transfer credit part.                                      |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 23   | Debit cheque                                      | Debit          | Original debit operation.                                      |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 24   | Card activate                                     | -              | Card activate.                                                 |                                                                      |                                                                |                                                                    | +            |     |
| 25   | Pin change API                                    | -              | PIN change via API.                                            |                                                                      |                                                                |                                                                    | +            |     |
| 26   | P2p Debit account to account                      | Debit          | Account funding debit account to account.                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 27   | P2p Credit account to account                     | Credit         | Account funding credit account to account.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 28   | P2p Debit person to person                        | Debit          | Account funding debit person to person.                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 29   | P2p Credit person to person                       | Credit         | Account funding credit person to person.                       | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 30   | P2p debit financial institution                   | Debit          | Account funding debit financial institution.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 31   | P2p credit financial institution                  | Credit         | Account funding credit financial institution.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 32   | P2p debit prepaid card load and top up            | Debit          | Account funding debit prepaid card load and top up.            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 33   | P2p credit prepaid card load and top up           | Credit         | Account funding credit prepaid card load and top up.           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 34   | P2p debit wallet transfer                         | Debit          | Account funding debit wallet transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 35   | P2p credit wallet transfer                        | Credit         | Account funding credit wallet transfer.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 36   | P2p debit card bill pay                           | Debit          | Account funding debit card bill.                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 37   | P2p credit card bill pay                          | Credit         | Account funding credit card bill.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 38   | P2p debit non card bill pay                       | Debit          | Account funding debit non card bill.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 39   | P2p credit non card bill pay                      | Credit         | Account funding credit non card bill.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 40   | P2p debit non online gambling/gaming              | Debit          | Account funding debit non online gambling/gaming.              |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 41   | P2p credit non online gambling/gaming             | Credit         | Account funding credit non online gambling/gaming.             |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 42   | P2p debit online gambling/gaming                  | Debit          | Account funding debit online gambling/gaming.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 43   | P2p credit online gambling/gaming                 | Credit         | Account funding credit online gambling/gaming.                 |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 44   | P2p debit government disbursement and tax refund  | Debit          | Account funding debit government disbursement and tax refund.  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 45   | P2p credit government disbursement and tax refund | Credit         | Account funding credit government disbursement and tax refund. | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 46   | P2p debit loyalty payments                        | Debit          | Account funding debit loyalty payments.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 47   | P2p credit loyalty payments                       | Credit         | Account funding credit loyalty payments.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 48   | P2p debit merchant settlement                     | Debit          | Account funding debit merchant settlement.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 49   | P2p credit merchant settlement                    | Credit         | Account funding credit merchant settlement.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 50   | P2p debit payroll and pensions                    | Debit          | Account funding debit.                                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 51   | P2p credit payroll and pensions                   | Credit         | Account funding credit.                                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 52   | P2p debit b2b supplier payments                   | Debit          | Account funding debit b2b supplier payments.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 53   | P2p credit b2b supplier payments                  | Credit         | Account funding credit b2b supplier payments.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 54   | P2p debit other disbursements                     | Debit          | Account funding debit other disbursements.                     |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 55   | P2p credit other disbursements                    | Credit         | Account funding credit other disbursements.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 56   | Outbound from external payment address            | Debit          | Outbound from external payment address via API.                |                                                                      |                                                                |                                                                    |              | +   |
| 57   | Inbound from external payment address             | Credit         | Inbound from external payment address via API.                 |                                                                      |                                                                |                                                                    |              | +   |
| 58   | Direct debit from external payment address        | Debit          | Direct debit from external payment address via API.            |                                                                      |                                                                |                                                                    |              | +   |
| 59   | Direct credit from external payment address       | Credit         | Direct credit from external payment address via API.           |                                                                      |                                                                |                                                                    |              | +   |
| 60   | P2p credit agent cash out                         | Credit         | Account funding credit agent cash out.                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 61   | P2p debit agent cash out                          | Debit          | Account funding debit agent cash out.                          | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 62   | P2p credit merchant presented qr                  | Credit         | Account funding credit merchant presented qr.                  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 63   | P2p debit merchant presented qr                   | Debit          | Account funding debit merchant presented qr.                   | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 64   | Pin unblock API                                   | -              | PIN unblock via API.                                           |                                                                      |                                                                |                                                                    |              | +   |
| 65   | Inbound return from external payment              | Debit          | Inbound return from external payment.                          |                                                                      |                                                                |                                                                    |              | +   |
| 66   | Outbound return from external payment             | Credit         | Outbound return from external payment.                         |                                                                      |                                                                |                                                                    |              | +   |
| 67   | Direct credit return                              | Debit          | Direct credit return.                                          |                                                                      |                                                                |                                                                    |              | +   |
| 68   | Direct debit return                               | Credit         | Direct debit return.                                           |                                                                      |                                                                |                                                                    |              | +   |
| 69   | Custom fee                                        | Debit          | Custom fee.                                                    |                                                                      |                                                                |                                                                    | +            |     |
| 70   | P2P credit cash deposit                           | Credit         | Account funding credit cash deposit.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 71   | P2P debit cash deposit                            | Debit          | Account funding debit cash deposit.                            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 72   | P2P debit merchant payment                        | Debit          | Account funding debit merchant payment.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 73   | P2P credit merchant payment                       | Credit         | Account funding credit merchant payment.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 74   | First chargeback                                  | \-             | First chargeback.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 75   | Second chargeback                                 | \-             | Second chargeback.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 76   | Retrieval request                                 | \-             | Retrieval request.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 77   | P2P credit funds transfer                         | Credit         | Account funding credit funds transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 78   | P2P debit funds transfer                          | Debit          | Account funding debit funds transfer.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 79   | Dispute credit adjustment                         | Credit         | Dispute credit adjustment via API.                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +            |     |
| 80   | Dispute debit adjustment                          | Debit          | Dispute debit adjustment via API.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +            |     |

### Account type

| ID | Type            |
|----|-----------------|
| 1  | Account         |
| 2  | Special account |

### External payment address assignment state

| ID | Description |
|----|-------------|
| 1  | Pending     |
| 2  | Success     |
| 3  | Error       |

### External payment address status

| Type | Description  |
|------|--------------|
| A    | Active       |
| B    | Blocked      |
| S    | Suspended    |
| P    | Spend only   |
| R    | Receive only |

### External payment transaction type

| ID | Type                 |
|----|----------------------|
| 1  | Outbound             |
| 2  | Inbound              |
| 3  | Outbound return      |
| 4  | Reverse              |
| 5  | Direct debit         |
| 6  | Direct credit        |
| 7  | Inbound debit        |
| 8  | Inbound return       |
| 9  | Direct debit return  |
| 10 | Direct credit return |
| 11 | Outbound cancelation |

### External payment transaction status

| ID | Status                     |
|----|----------------------------|
| 1  | Accepted                   |
| 2  | Rejected                   |
| 3  | Pending                    |
| 4  | Error                      |
| 5  | On hold                    |
| 6  | Operator approval required |
| 7  | Pending in risk            |
| 8  | Hold in risk               |

### External payment transaction status code

| ID | Status code                                       |
|----|---------------------------------------------------|
| 0  | Success                                           |
| 1  | Unknown                                           |
| 2  | Balance validation failed                         |
| 3  | Card limit validation failed                      |
| 4  | Account limit validation failed                   |
| 5  | Holder limit validation failed                    |
| 6  | External server validation failed                 |
| 7  | Unable to deliver transaction to external service |
| 8  | External payment address status validation failed |
| 9  | Account status validation failed                  |
| 10 | External payment mandate status validation failed |
| 11 | Risk check failed                                 |
| 12 | Rejected by risk processor                        |
| 13 | Hold by risk processor                            |
| 14 | Required data is missing                          |
| 15 | Should not pay                                    |
| 16 | Settled through suspense account                  |

#### Manual approval status

| ID | Description   |
|----|---------------|
| 1  | Pending       |
| 2  | Returning     |
| 3  | Completed     |
| 4  | Return failed |

### External payment scheme

| ID | Scheme   | Description           |
|----|----------|-----------------------|
| 0  | UNKNOWN  | Unknown scheme        |
| 1  | TRANSFER | Transfer              |
| 2  | FPS      | Faster payments       |
| 3  | CHAPS    | Chaps scheme          |
| 4  | BACS     | Bacs scheme           |
| 5  | SCT      | SEPA transfer         |
| 6  | SCTI     | SEPA instant transfer |
| 7  | SDD      | SEPA direct debit     |

### External payment inbound return message code

| ID | Description                                |
|----|--------------------------------------------|
| 1  | Incorrect account number                   |
| 2  | Account closed                             |
| 3  | Account blocked                            |
| 4  | Account holder deceased                    |
| 5  | Missing creditor's address                 |
| 6  | Missing debtor's account or identification |
| 7  | Missing debtor's name or address           |
| 8  | Missing creditor's name or address         |
| 9  | Account name mismatch                      |
| 10 | Account transferred                        |

### External payment mandate cancellation reason

| ID | Description                                                                                                           |
|----|-----------------------------------------------------------------------------------------------------------------------|
| 1  | Institution cancelled - refer to payer. Paying bank has cancelled instruction.                                        |
| 2  | Instruction cancelled by payer. Payer has instructed the paying bank to cancel the DirectDebit Instruction (Mandate). |
| 3  | Payer deceased.                                                                                                       |
| 4  | Account closed. Payer has closed their account for an unknown reason.                                                 |

### External payment direct debit return reason

| ID | Description                                 |
|----|---------------------------------------------|
| 1  | Incorrect account number.                   |
| 2  | Account closed.                             |
| 3  | Account blocked.                            |
| 4  | Account holder deceased.                    |
| 5  | Not specified reason by customer.           |
| 6  | Following cancellation request.             |
| 11 | Missing creditor's address.                 |
| 12 | Missing debtor's account or identification. |
| 13 | Missing debtor's name or address.           |
| 14 | Missing creditor's name or address.         |
| 16 | Other reason.                               |
| 18 | Account name mismatch.                      |
| 20 | Account transferred.                        |

### Withdrawal purpose

| ID | Description                                                                                                                                                                                           |
|----|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | Other                                                                                                                                                                                                 |
| 2  | Mobile wallet cash in                                                                                                                                                                                 |
| 3  | Mobile wallet cash out                                                                                                                                                                                |
| 4  | Mobile wallet payments                                                                                                                                                                                |
| 5  | Stored value card cash-in                                                                                                                                                                             |
| 6  | Stored value card cash-out                                                                                                                                                                            |
| 7  | Stored value card payments                                                                                                                                                                            |
| 8  | Equity other than investment fund shares in the related companies abroad                                                                                                                              |
| 9  | Agency Commission                                                                                                                                                                                     |
| 10 | Receipts or payments from personal residents bank account or deposits abroad                                                                                                                          |
| 11 | Allowances                                                                                                                                                                                            |
| 12 | Air transport                                                                                                                                                                                         |
| 13 | Corporate Card Payment                                                                                                                                                                                |
| 14 | Equity for the establishment of new company from residents abroad equity of merger or acquisition of companies abroad from residents and participation to capital increase of related company abroad  |
| 15 | Equity for the establishment of new company in the UAE from residents equity of merger or acquisition of companies in the UAE from n-residents participation to capital increase of related companies |
| 16 | Charitable Contributions                                                                                                                                                                              |
| 17 | Commission                                                                                                                                                                                            |
| 18 | Compensation                                                                                                                                                                                          |
| 19 | Credit Card Payments                                                                                                                                                                                  |
| 20 | Pre-Paid Reloadable and Personalized Debit Card Payments                                                                                                                                              |
| 21 | Dividend Payouts                                                                                                                                                                                      |
| 22 | Dividends on equity not intra group                                                                                                                                                                   |
| 23 | Educational Support                                                                                                                                                                                   |
| 24 | Equated Monthly Instalments                                                                                                                                                                           |
| 25 | End of Service                                                                                                                                                                                        |
| 26 | Family Support                                                                                                                                                                                        |
| 27 | Financial services                                                                                                                                                                                    |
| 28 | Equity other than investment fund shares in related companies in the UAE                                                                                                                              |
| 29 | Goods Bought or Sold                                                                                                                                                                                  |
| 30 | Processing repair and maintenance services on goods                                                                                                                                                   |
| 31 | Government goods and services embassies etc                                                                                                                                                           |
| 32 | Government related income taxes tariffs capital transfers etc                                                                                                                                         |
| 33 | Information services                                                                                                                                                                                  |
| 34 | Intra group dividends                                                                                                                                                                                 |
| 35 | Inter group transfer                                                                                                                                                                                  |
| 36 | Insurance services                                                                                                                                                                                    |
| 37 | Charges for the use of intellectual property royalties                                                                                                                                                |
| 38 | Computer services                                                                                                                                                                                     |
| 39 | Leave Salary                                                                                                                                                                                          |
| 40 | Monetary Claim Reimbursements Medical Insurance or Auto Insurance etc                                                                                                                                 |
| 41 | Own account transfer                                                                                                                                                                                  |
| 42 | Other modes of transport                                                                                                                                                                              |
| 43 | Overtime                                                                                                                                                                                              |
| 44 | Pension                                                                                                                                                                                               |
| 45 | Professional and management consulting services                                                                                                                                                       |
| 46 | POS Merchant Settlement                                                                                                                                                                               |
| 47 | Personal cultural audio visual and recreational services                                                                                                                                              |
| 48 | Research and development services                                                                                                                                                                     |
| 49 | Rent Payments                                                                                                                                                                                         |
| 50 | Salary                                                                                                                                                                                                |
| 51 | Construction                                                                                                                                                                                          |
| 52 | Travel                                                                                                                                                                                                |
| 53 | Sea transport                                                                                                                                                                                         |
| 54 | Salary Advance                                                                                                                                                                                        |
| 55 | Telecommunication services                                                                                                                                                                            |
| 56 | Tickets                                                                                                                                                                                               |
| 57 | Transfer of funds between persons Normal and Juridical                                                                                                                                                |
| 58 | Utility Bill Payments                                                                                                                                                                                 |

### Outbound cancel reason

| ID | Description                         | Additional information is required | Reason originator name is required |
|----|-------------------------------------|------------------------------------|------------------------------------|
| 1  | Duplicate payment                   | No                                 | No                                 |
| 2  | Wrong IBAN                          | Yes                                | Yes                                |
| 3  | Wrong amount                        | Yes                                | Yes                                |
| 4  | Fraudulent original credit transfer | Yes                                | No                                 |
| 5  | Technical problem                   | No                                 | No                                 |
| 6  | Requested by customer               | Yes                                | Yes                                |

### Receiver type

| ID | Description |
|----|-------------|
| 1  | Individual  |
| 2  | Business    |

### Industry ID

| ID | Description                  |
|----|------------------------------|
| 1  | Other                        |
| 2  | Travel services              |
| 3  | Financial services           |
| 4  | Computer services            |
| 5  | Insurance services           |
| 6  | Rental services              |
| 7  | Charities                    |
| 8  | Accountants                  |
| 9  | Trusts                       |
| 10 | Pharmaceutical services      |
| 11 | Gambling/Betting             |
| 12 | Adult services               |
| 13 | Telemarketing services       |
| 14 | Crypto activity              |
| 15 | Foreign exchange             |
| 16 | Retail                       |
| 17 | Healthcare & Social services |
| 18 | Public catering              |

### Default charsets

| ID | Charset regex                              |
|----|--------------------------------------------|
| 1  | ^[0-9a-zA-Z \.\,\&\-\/\'#$()\[\]\\]+$      |
| 2  | ^[a-zA-Z-,.\/ ]+$                          |
| 3  | ^[0-9a-zA-Z]+$                             |
| 4  | ^[0-9a-zA-Z-,.\/ ]+$                       |
| 5  | ^[0-9a-zA-Z\-,.\/\\&!?;:*+ @()[\]{}#\']+$ |
| 6  | ^[0-9a-zA-Z- ]+$                           |

### Key

Keys are unique identifiers that are used to authenticate and authorize requests, encrypt or decrypt messages.

| Parameter           | Description                                                                                                                 |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Access key          | A key which allows access to the API service.                                                                               |
| API ID              | User identification (ID) (equivalent to a username).                                                                        |
| API key             | A key for user authentication (equivalent to a password).                                                                   |
| Data encryption key | A key for encrypting or decrypting a single field (parameter), for example: if PAN is returned as encrypted (configurable). |

### Account holder risk score

| ID | Description |
|----|-------------|
| 1  | Low risk    |
| 2  | Medium risk |
| 3  | High risk   |

### Risk rules actions

| Value                                          | Description                                    |
|------------------------------------------------|------------------------------------------------|
| mark_transaction_as_suspicious                 | Mark transaction as suspicious                 |
| notify_cardholder_by_sending_tais_notification | Notify cardholder by sending TAIs notification |
| change_card_status_to_risk                     | Change card status to risk                     |
| change_account_status_to_suspended             | Change account status to suspended             |
| reject_transaction                             | Reject transaction                             |

### Security check

Possible returned values are *0* or *1*. If the value is *1*, it means that the validation was performed **and** resulted in success.

| Value                        | Description                                     |
|------------------------------|-------------------------------------------------|
| card_expiration_date_present | Card expiration date present.                   |
| online_pin                   | Online PIN.                                     |
| offline_pin                  | Offline PIN.                                    |
| 3_d_secure                   | Account holder authentication value (3DSecure). |
| cvv_2                        | Card verification value.                        |
| magnetic_stripe              | Magnetic stripe.                                |
| chip_data                    | Chip data.                                      |
| avs                          | Holder address.                                 |
| phone_number                 | Phone number (only for UnionPay scheme).        |
| signature                    | Signature.                                      |

### Authentication confirmation status

| ID | Meaning       |
|----|---------------|
| Y  | Verified      |
| N  | Not verified  |
| E  | Expired       |
| L  | Limit reached |
| C  | Canceled      |

### OOB (Out-of-Band) authentication method

It is completed outside of the 3-D Secure flow.

| ID | Meaning                         |
|----|---------------------------------|
| 1  | Static password                 |
| 2  | OTP via SMS                     |
| 3  | OTP via app                     |
| 4  | OTP via email                   |
| 5  | OTP other                       |
| 6  | Push confirmation               |
| 7  | Biometrics                      |
| 8  | Login                           |
| 9  | Hand-held token generators/fobs |
| 99 | Other                           |

### ACS authentication method

| ID | Meaning                                         |
|----|-------------------------------------------------|
| 0  | Static password                                 |
| 1  | OTP via SMS                                     |
| 2  | OTP via SMS and Static password                 |
| 3  | Background authentication via API               |
| 4  | OTP via API                                     |
| 5  | OTP via API and Static password                 |
| 6  | Background authentication via API with fallback |

### Status change reason code

| ID | Meaning                             |
|----|-------------------------------------|
| 1  | Positive review                     |
| 2  | Negative review                     |
| 3  | Customer request                    |
| 4  | Death of an account holder          |
| 5  | Risk check - suspected fraud        |
| 6  | Risk check - compromised account    |
| 7  | Risk check - compromised card       |
| 8  | Risk check - investigation          |
| 9  | Indemnity received                  |
| 10 | Third party notification            |
| 11 | Police request                      |
| 12 | Internal block request              |
| 13 | Suspected identity theft            |
| 14 | Charge back fraud                   |
| 15 | Internal investigations             |
| 16 | Lost or stolen cards                |
| 17 | Suspicious payments                 |
| 18 | Suspected money laundering concerns |
| 19 | Unknown source of funds             |

### Custom notification source

| ID | Source     |
|----|------------|
| 1  | Card frame |

### Card frame pages

| Value        | Description                          |
|--------------|--------------------------------------|
| showCardData | Page for the displaying card details |
| activateCard | Card activation page                 |
| showPin      | Page for the displaying card PIN     |
| setPin       | Page for the card PIN change         |

### Language code

| Value       | Description                                    |
|-------------|------------------------------------------------|
| af_NA       | Afrikaans (Namibia)                            |
| af_ZA       | Afrikaans (South Africa)                       |
| af          | Afrikaans                                      |
| ak_GH       | Akan (Ghana)                                   |
| ak          | Akan                                           |
| sq_AL       | Albanian (Albania)                             |
| sq          | Albanian                                       |
| am_ET       | Amharic (Ethiopia)                             |
| am          | Amharic                                        |
| ar_DZ       | Arabic (Algeria)                               |
| ar_BH       | Arabic (Bahrain)                               |
| ar_EG       | Arabic (Egypt)                                 |
| ar_IQ       | Arabic (Iraq)                                  |
| ar_JO       | Arabic (Jordan)                                |
| ar_KW       | Arabic (Kuwait)                                |
| ar_LB       | Arabic (Lebanon)                               |
| ar_LY       | Arabic (Libya)                                 |
| ar_MA       | Arabic (Morocco)                               |
| ar_OM       | Arabic (Oman)                                  |
| ar_QA       | Arabic (Qatar)                                 |
| ar_SA       | Arabic (Saudi Arabia)                          |
| ar_SD       | Arabic (Sudan)                                 |
| ar_SY       | Arabic (Syria)                                 |
| ar_TN       | Arabic (Tunisia)                               |
| ar_AE       | Arabic (United Arab Emirates)                  |
| ar_YE       | Arabic (Yemen)                                 |
| ar          | Arabic                                         |
| hy_AM       | Armenian (Armenia)                             |
| hy          | Armenian                                       |
| as_IN       | Assamese (India)                               |
| as          | Assamese                                       |
| asa_TZ      | Asu (Tanzania)                                 |
| asa         | Asu                                            |
| az_Cyrl     | Azerbaijani (Cyrillic)                         |
| az_Cyrl_AZ  | Azerbaijani (Cyrillic, Azerbaijan)             |
| az_Latn     | Azerbaijani (Latin)                            |
| az_Latn_AZ  | Azerbaijani (Latin, Azerbaijan)                |
| az          | Azerbaijani                                    |
| bm_ML       | Bambara (Mali)                                 |
| bm          | Bambara                                        |
| eu_ES       | Basque (Spain)                                 |
| eu          | Basque                                         |
| be_BY       | Belarusian (Belarus)                           |
| be          | Belarusian                                     |
| bem_ZM      | Bemba (Zambia)                                 |
| bem         | Bemba                                          |
| bez_TZ      | Bena (Tanzania)                                |
| bez         | Bena                                           |
| bn_BD       | Bengali (Bangladesh)                           |
| bn_IN       | Bengali (India)                                |
| bn          | Bengali                                        |
| bs_BA       | Bosnian (Bosnia and Herzegovina)               |
| bs          | Bosnian                                        |
| bg_BG       | Bulgarian (Bulgaria)                           |
| bg          | Bulgarian                                      |
| my_MM       | Burmese (Myanmar [Burma])                      |
| my          | Burmese                                        |
| yue_Hant_HK | Cantonese (Traditional, Hong Kong SAR China)   |
| ca_ES       | Catalan (Spain)                                |
| ca          | Catalan                                        |
| tzm_Latn    | Central Morocco Tamazight (Latin)              |
| tzm_Latn_MA | Central Morocco Tamazight (Latin, Morocco)     |
| tzm         | Central Morocco Tamazight                      |
| chr_US      | Cherokee (United States)                       |
| chr         | Cherokee                                       |
| cgg_UG      | Chiga (Uganda)                                 |
| cgg         | Chiga                                          |
| zh_Hans     | Chinese (Simplified Han)                       |
| zh_Hans_CN  | Chinese (Simplified Han, China)                |
| zh_Hans_HK  | Chinese (Simplified Han, Hong Kong SAR China)  |
| zh_Hans_MO  | Chinese (Simplified Han, Macau SAR China)      |
| zh_Hans_SG  | Chinese (Simplified Han, Singapore)            |
| zh_CN       | Chinese (Simplified, PRC)                      |
| zh_Hant     | Chinese (Traditional Han)                      |
| zh_Hant_HK  | Chinese (Traditional Han, Hong Kong SAR China) |
| zh_Hant_MO  | Chinese (Traditional Han, Macau SAR China)     |
| zh_Hant_TW  | Chinese (Traditional Han, Taiwan)              |
| zh_TW       | Chinese (Traditional, Taiwan)                  |
| zh          | Chinese                                        |
| kw_GB       | Cornish (United Kingdom)                       |
| kw          | Cornish                                        |
| hr_HR       | Croatian (Croatia)                             |
| hr          | Croatian                                       |
| cs_CZ       | Czech (Czech Republic)                         |
| cs          | Czech                                          |
| da_DK       | Danish (Denmark)                               |
| da          | Danish                                         |
| nl_BE       | Dutch (Belgium)                                |
| nl_NL       | Dutch (Netherlands)                            |
| nl          | Dutch                                          |
| ebu_KE      | Embu (Kenya)                                   |
| ebu         | Embu                                           |
| en_AS       | English (American Samoa)                       |
| en_AU       | English (Australia)                            |
| en_BE       | English (Belgium)                              |
| en_BZ       | English (Belize)                               |
| en_BW       | English (Botswana)                             |
| en_CA       | English (Canada)                               |
| en_GU       | English (Guam)                                 |
| en_HK       | English (Hong Kong SAR China)                  |
| en_IN       | English (India)                                |
| en_IE       | English (Ireland)                              |
| en_IL       | English (Israel)                               |
| en_JM       | English (Jamaica)                              |
| en_MT       | English (Malta)                                |
| en_MH       | English (Marshall Islands)                     |
| en_MU       | English (Mauritius)                            |
| en_NA       | English (Namibia)                              |
| en_NZ       | English (New Zealand)                          |
| en_MP       | English (Northern Mariana Islands)             |
| en_PK       | English (Pakistan)                             |
| en_PH       | English (Philippines)                          |
| en_SG       | English (Singapore)                            |
| en_ZA       | English (South Africa)                         |
| en_TT       | English (Trinidad and Tobago)                  |
| en_UM       | English (U.S. Minor Outlying Islands)          |
| en_VI       | English (U.S. Virgin Islands)                  |
| en_GB       | English (United Kingdom)                       |
| en_US       | English (United States)                        |
| en_ZW       | English (Zimbabwe)                             |
| en          | English                                        |
| eo          | Esperanto                                      |
| et_EE       | Estonian (Estonia)                             |
| et          | Estonian                                       |
| ee_GH       | Ewe (Ghana)                                    |
| ee_TG       | Ewe (Togo)                                     |
| ee          | Ewe                                            |
| fo_FO       | Faroese (Faroe Islands)                        |
| fo          | Faroese                                        |
| fil_PH      | Filipino (Philippines)                         |
| fil         | Filipino                                       |
| fi_FI       | Finnish (Finland)                              |
| fi          | Finnish                                        |
| fr_BE       | French (Belgium)                               |
| fr_BJ       | French (Benin)                                 |
| fr_BF       | French (Burkina Faso)                          |
| fr_BI       | French (Burundi)                               |
| fr_CM       | French (Cameroon)                              |
| fr_CA       | French (Canada)                                |
| fr_CF       | French (Central African Republic)              |
| fr_TD       | French (Chad)                                  |
| fr_KM       | French (Comoros)                               |
| fr_CG       | French (Congo - Brazzaville)                   |
| fr_CD       | French (Congo - Kinshasa)                      |
| fr_CI       | French (Côte d'Ivoire)                         |
| fr_DJ       | French (Djibouti)                              |
| fr_GQ       | French (Equatorial Guinea)                     |
| fr_FR       | French (France)                                |
| fr_GA       | French (Gabon)                                 |
| fr_GP       | French (Guadeloupe)                            |
| fr_GN       | French (Guinea)                                |
| fr_LU       | French (Luxembourg)                            |
| fr_MG       | French (Madagascar)                            |
| fr_ML       | French (Mali)                                  |
| fr_MQ       | French (Martinique)                            |
| fr_MC       | French (Monaco)                                |
| fr_NE       | French (Niger)                                 |
| fr_RW       | French (Rwanda)                                |
| fr_RE       | French (Réunion)                               |
| fr_BL       | French (Saint Barthélemy)                      |
| fr_MF       | French (Saint Martin)                          |
| fr_SN       | French (Senegal)                               |
| fr_CH       | French (Switzerland)                           |
| fr_TG       | French (Togo)                                  |
| fr          | French                                         |
| ff_SN       | Fulah (Senegal)                                |
| ff          | Fulah                                          |
| gl_ES       | Galician (Spain)                               |
| gl          | Galician                                       |
| lg_UG       | Ganda (Uganda)                                 |
| lg          | Ganda                                          |
| ka_GE       | Georgian (Georgia)                             |
| ka          | Georgian                                       |
| de_AT       | German (Austria)                               |
| de_BE       | German (Belgium)                               |
| de_DE       | German (Germany)                               |
| de_LI       | German (Liechtenstein)                         |
| de_LU       | German (Luxembourg)                            |
| de_CH       | German (Switzerland)                           |
| de          | German                                         |
| el_CY       | Greek (Cyprus)                                 |
| el_GR       | Greek (Greece)                                 |
| el          | Greek                                          |
| gu_IN       | Gujarati (India)                               |
| gu          | Gujarati                                       |
| guz_KE      | Gusii (Kenya)                                  |
| guz         | Gusii                                          |
| ha_Latn     | Hausa (Latin)                                  |
| ha_Latn_GH  | Hausa (Latin, Ghana)                           |
| ha_Latn_NE  | Hausa (Latin, Niger)                           |
| ha_Latn_NG  | Hausa (Latin, Nigeria)                         |
| ha          | Hausa                                          |
| haw_US      | Hawaiian (United States)                       |
| haw         | Hawaiian                                       |
| he_IL       | Hebrew (Israel)                                |
| he          | Hebrew                                         |
| hi_IN       | Hindi (India)                                  |
| hi          | Hindi                                          |
| hu_HU       | Hungarian (Hungary)                            |
| hu          | Hungarian                                      |
| is_IS       | Icelandic (Iceland)                            |
| is          | Icelandic                                      |
| ig_NG       | Igbo (Nigeria)                                 |
| ig          | Igbo                                           |
| id_ID       | Indonesian (Indonesia)                         |
| id          | Indonesian                                     |
| ga_IE       | Irish (Ireland)                                |
| ga          | Irish                                          |
| it_IT       | Italian (Italy)                                |
| it_CH       | Italian (Switzerland)                          |
| it          | Italian                                        |
| ja_JP       | Japanese (Japan)                               |
| ja          | Japanese                                       |
| kea_CV      | Kabuverdianu (Cape Verde)                      |
| kea         | Kabuverdianu                                   |
| kab_DZ      | Kabyle (Algeria)                               |
| kab         | Kabyle                                         |
| kl_GL       | Kalaallisut (Greenland)                        |
| kl          | Kalaallisut                                    |
| kln_KE      | Kalenjin (Kenya)                               |
| kln         | Kalenjin                                       |
| kam_KE      | Kamba (Kenya)                                  |
| kam         | Kamba                                          |
| kn_IN       | Kannada (India)                                |
| kn          | Kannada                                        |
| kk_Cyrl     | Kazakh (Cyrillic)                              |
| kk_Cyrl_KZ  | Kazakh (Cyrillic, Kazakhstan)                  |
| kk          | Kazakh                                         |
| km_KH       | Khmer (Cambodia)                               |
| km          | Khmer                                          |
| ki_KE       | Kikuyu (Kenya)                                 |
| ki          | Kikuyu                                         |
| rw_RW       | Kinyarwanda (Rwanda)                           |
| rw          | Kinyarwanda                                    |
| kok_IN      | Konkani (India)                                |
| kok         | Konkani                                        |
| ko_KR       | Korean (South Korea)                           |
| ko          | Korean                                         |
| khq_ML      | Koyra Chiini (Mali)                            |
| khq         | Koyra Chiini                                   |
| ses_ML      | Koyraboro Senni (Mali)                         |
| ses         | Koyraboro Senni                                |
| lag_TZ      | Langi (Tanzania)                               |
| lag         | Langi                                          |
| lv_LV       | Latvian (Latvia)                               |
| lv          | Latvian                                        |
| lt_LT       | Lithuanian (Lithuania)                         |
| lt          | Lithuanian                                     |
| luo_KE      | Luo (Kenya)                                    |
| luo         | Luo                                            |
| luy_KE      | Luyia (Kenya)                                  |
| luy         | Luyia                                          |
| mk_MK       | Macedonian (Macedonia)                         |
| mk          | Macedonian                                     |
| jmc_TZ      | Machame (Tanzania)                             |
| jmc         | Machame                                        |
| kde_TZ      | Makonde (Tanzania)                             |
| kde         | Makonde                                        |
| mg_MG       | Malagasy (Madagascar)                          |
| mg          | Malagasy                                       |
| ms_BN       | Malay (Brunei)                                 |
| ms_MY       | Malay (Malaysia)                               |
| ms          | Malay                                          |
| ml_IN       | Malayalam (India)                              |
| ml          | Malayalam                                      |
| mt_MT       | Maltese (Malta)                                |
| mt          | Maltese                                        |
| gv_GB       | Manx (United Kingdom)                          |
| gv          | Manx                                           |
| mr_IN       | Marathi (India)                                |
| mr          | Marathi                                        |
| mas_KE      | Masai (Kenya)                                  |
| mas_TZ      | Masai (Tanzania)                               |
| mas         | Masai                                          |
| mer_KE      | Meru (Kenya)                                   |
| mer         | Meru                                           |
| mfe_MU      | Morisyen (Mauritius)                           |
| mfe         | Morisyen                                       |
| naq_NA      | Nama (Namibia)                                 |
| naq         | Nama                                           |
| ne_IN       | Nepali (India)                                 |
| ne_NP       | Nepali (Nepal)                                 |
| ne          | Nepali                                         |
| nd_ZW       | North Ndebele (Zimbabwe)                       |
| nd          | North Ndebele                                  |
| nb_NO       | Norwegian Bokmål (Norway)                      |
| nb          | Norwegian Bokmål                               |
| nn_NO       | Norwegian Nynorsk (Norway)                     |
| nn          | Norwegian Nynorsk                              |
| nyn_UG      | Nyankole (Uganda)                              |
| nyn         | Nyankole                                       |
| or_IN       | Oriya (India)                                  |
| or          | Oriya                                          |
| om_ET       | Oromo (Ethiopia)                               |
| om_KE       | Oromo (Kenya)                                  |
| om          | Oromo                                          |
| ps_AF       | Pashto (Afghanistan)                           |
| ps          | Pashto                                         |
| fa_AF       | Persian (Afghanistan)                          |
| fa_IR       | Persian (Iran)                                 |
| fa          | Persian                                        |
| pl_PL       | Polish (Poland)                                |
| pl          | Polish                                         |
| pt_BR       | Portuguese (Brazil)                            |
| pt_GW       | Portuguese (Guinea-Bissau)                     |
| pt_MZ       | Portuguese (Mozambique)                        |
| pt_PT       | Portuguese (Portugal)                          |
| pt          | Portuguese                                     |
| pa_Arab     | Punjabi (Arabic)                               |
| pa_Arab_PK  | Punjabi (Arabic, Pakistan)                     |
| pa_Guru     | Punjabi (Gurmukhi)                             |
| pa_Guru_IN  | Punjabi (Gurmukhi, India)                      |
| pa          | Punjabi                                        |
| ro_MD       | Romanian (Moldova)                             |
| ro_RO       | Romanian (Romania)                             |
| ro          | Romanian                                       |
| rm_CH       | Romansh (Switzerland)                          |
| rm          | Romansh                                        |
| rof_TZ      | Rombo (Tanzania)                               |
| rof         | Rombo                                          |
| ru_MD       | Russian (Moldova)                              |
| ru_RU       | Russian (Russia)                               |
| ru_UA       | Russian (Ukraine)                              |
| ru          | Russian                                        |
| rwk_TZ      | Rwa (Tanzania)                                 |
| rwk         | Rwa                                            |
| saq_KE      | Samburu (Kenya)                                |
| saq         | Samburu                                        |
| sg_CF       | Sango (Central African Republic)               |
| sg          | Sango                                          |
| seh_MZ      | Sena (Mozambique)                              |
| seh         | Sena                                           |
| sr_Cyrl     | Serbian (Cyrillic)                             |
| sr_Cyrl_BA  | Serbian (Cyrillic, Bosnia and Herzegovina)     |
| sr_Cyrl_ME  | Serbian (Cyrillic, Montenegro)                 |
| sr_Cyrl_RS  | Serbian (Cyrillic, Serbia)                     |
| sr_Latn     | Serbian (Latin)                                |
| sr_Latn_BA  | Serbian (Latin, Bosnia and Herzegovina)        |
| sr_Latn_ME  | Serbian (Latin, Montenegro)                    |
| sr_Latn_RS  | Serbian (Latin, Serbia)                        |
| sr          | Serbian                                        |
| sn_ZW       | Shona (Zimbabwe)                               |
| sn          | Shona                                          |
| ii_CN       | Sichuan Yi (China)                             |
| ii          | Sichuan Yi                                     |
| si_LK       | Sinhala (Sri Lanka)                            |
| si          | Sinhala                                        |
| sk_SK       | Slovak (Slovakia)                              |
| sk          | Slovak                                         |
| sl_SI       | Slovenian (Slovenia)                           |
| sl          | Slovenian                                      |
| xog_UG      | Soga (Uganda)                                  |
| xog         | Soga                                           |
| so_DJ       | Somali (Djibouti)                              |
| so_ET       | Somali (Ethiopia)                              |
| so_KE       | Somali (Kenya)                                 |
| so_SO       | Somali (Somalia)                               |
| so          | Somali                                         |
| es_AR       | Spanish (Argentina)                            |
| es_BO       | Spanish (Bolivia)                              |
| es_CL       | Spanish (Chile)                                |
| es_CO       | Spanish (Colombia)                             |
| es_CR       | Spanish (Costa Rica)                           |
| es_DO       | Spanish (Dominican Republic)                   |
| es_EC       | Spanish (Ecuador)                              |
| es_SV       | Spanish (El Salvador)                          |
| es_GQ       | Spanish (Equatorial Guinea)                    |
| es_GT       | Spanish (Guatemala)                            |
| es_HN       | Spanish (Honduras)                             |
| es_419      | Spanish (Latin America)                        |
| es_MX       | Spanish (Mexico)                               |
| es_NI       | Spanish (Nicaragua)                            |
| es_PA       | Spanish (Panama)                               |
| es_PY       | Spanish (Paraguay)                             |
| es_PE       | Spanish (Peru)                                 |
| es_PR       | Spanish (Puerto Rico)                          |
| es_ES       | Spanish (Spain)                                |
| es_US       | Spanish (United States)                        |
| es_UY       | Spanish (Uruguay)                              |
| es_VE       | Spanish (Venezuela)                            |
| es          | Spanish                                        |
| sw_KE       | Swahili (Kenya)                                |
| sw_TZ       | Swahili (Tanzania)                             |
| sw          | Swahili                                        |
| sv_FI       | Swedish (Finland)                              |
| sv_SE       | Swedish (Sweden)                               |
| sv          | Swedish                                        |
| gsw_CH      | Swiss German (Switzerland)                     |
| gsw         | Swiss German                                   |
| shi_Latn    | Tachelhit (Latin)                              |
| shi_Latn_MA | Tachelhit (Latin, Morocco)                     |
| shi_Tfng    | Tachelhit (Tifinagh)                           |
| shi_Tfng_MA | Tachelhit (Tifinagh, Morocco)                  |
| shi         | Tachelhit                                      |
| dav_KE      | Taita (Kenya)                                  |
| dav         | Taita                                          |
| ta_IN       | Tamil (India)                                  |
| ta_LK       | Tamil (Sri Lanka)                              |
| ta          | Tamil                                          |
| te_IN       | Telugu (India)                                 |
| te          | Telugu                                         |
| teo_KE      | Teso (Kenya)                                   |
| teo_UG      | Teso (Uganda)                                  |
| teo         | Teso                                           |
| th_TH       | Thai (Thailand)                                |
| th          | Thai                                           |
| bo_CN       | Tibetan (China)                                |
| bo_IN       | Tibetan (India)                                |
| bo          | Tibetan                                        |
| ti_ER       | Tigrinya (Eritrea)                             |
| ti_ET       | Tigrinya (Ethiopia)                            |
| ti          | Tigrinya                                       |
| to_TO       | Tonga (Tonga)                                  |
| to          | Tonga                                          |
| tr_TR       | Turkish (Turkey)                               |
| tr          | Turkish                                        |
| uk_UA       | Ukrainian (Ukraine)                            |
| uk          | Ukrainian                                      |
| ur_IN       | Urdu (India)                                   |
| ur_PK       | Urdu (Pakistan)                                |
| ur          | Urdu                                           |
| uz_Arab     | Uzbek (Arabic)                                 |
| uz_Arab_AF  | Uzbek (Arabic, Afghanistan)                    |
| uz_Cyrl     | Uzbek (Cyrillic)                               |
| uz_Cyrl_UZ  | Uzbek (Cyrillic, Uzbekistan)                   |
| uz_Latn     | Uzbek (Latin)                                  |
| uz_Latn_UZ  | Uzbek (Latin, Uzbekistan)                      |
| uz          | Uzbek                                          |
| vi_VN       | Vietnamese (Vietnam)                           |
| vi          | Vietnamese                                     |
| vun_TZ      | Vunjo (Tanzania)                               |
| vun         | Vunjo                                          |
| cy_GB       | Welsh (United Kingdom)                         |
| cy          | Welsh                                          |
| yo_NG       | Yoruba (Nigeria)                               |
| yo          | Yoruba                                         |
| zu_ZA       | Zulu (South Africa)                            |
| zu          | Zulu                                           |

### Consent

| Value | Description                        |
|-------|------------------------------------|
| 1     | Allows to review accounts list.    |
| 2     | Allows to check account balance.   |
| 3     | Allow to review accounts payments. |
| 4     | Allow to review payments list.     |
| 5     | Allow to check payment details.    |
| 6     | Allow to initiate payment.         |

### Currency

Minor unit count - represents the number of units used to subdivide a major unit. Because EUR has two minor units and YEN has zero, a value of "525" returned by an API would be 5.25 EUR or 525 YEN.

| ISO numeric | ISO code | Name                         | Minor unit |
|-------------|----------|------------------------------|------------|
| 008         | ALL      | Albania Lek                  | 2          |
| 012         | DZD      | Algeria Dinar                | 2          |
| 032         | ARS      | Argentina Peso               | 2          |
| 036         | AUD      | Australia Dollar             | 2          |
| 044         | BSD      | Bahamas Dollar               | 2          |
| 048         | BHD      | Bahrain Dinar                | 3          |
| 050         | BDT      | Bangladesh Taka              | 2          |
| 051         | AMD      | Armenia Dram                 | 2          |
| 052         | BBD      | Barbados Dollar              | 2          |
| 060         | BMD      | Bermuda Dollar               | 2          |
| 064         | BTN      | Bhutan Ngultrum              | 2          |
| 068         | BOB      | Bolivia Boliviano            | 2          |
| 072         | BWP      | Botswana Pula                | 2          |
| 084         | BZD      | Belize Dollar                | 2          |
| 090         | SBD      | Solomon Islands Dollar       | 2          |
| 096         | BND      | Brunei Darussalam Dollar     | 2          |
| 104         | MMK      | Myanmar (Burma) Kyat         | 2          |
| 108         | BIF      | Burundi Franc                | 0          |
| 116         | KHR      | Cambodia Riel                | 2          |
| 124         | CAD      | Canada Dollar                | 2          |
| 132         | CVE      | Cape Verde Escudo            | 2          |
| 136         | KYD      | Cayman Islands Dollar        | 2          |
| 144         | LKR      | Sri Lanka Rupee              | 2          |
| 152         | CLP      | Chile Peso                   | 0          |
| 156         | CNY      | China Yuan Renminbi          | 2          |
| 170         | COP      | Colombia Peso                | 2          |
| 174         | KMF      | Comoros Franc                | 0          |
| 188         | CRC      | Costa Rica Colon             | 2          |
| 191         | HRK      | Croatia Kuna                 | 2          |
| 192         | CUP      | Cuba Peso                    | 2          |
| 203         | CZK      | Czech Republic Koruna        | 2          |
| 208         | DKK      | Denmark Krone                | 2          |
| 214         | DOP      | Dominican Republic Peso      | 2          |
| 222         | SVC      | El Salvador Colon            | 2          |
| 230         | ETB      | Ethiopia Birr                | 2          |
| 232         | ERN      | Eritrea Nakfa                | 2          |
| 238         | FKP      | Falkland Islands Pound       | 2          |
| 242         | FJD      | Fiji Dollar                  | 2          |
| 262         | DJF      | Djibouti Franc               | 0          |
| 270         | GMD      | Gambia Dalasi                | 2          |
| 292         | GIP      | Gibraltar Pound              | 2          |
| 320         | GTQ      | Guatemala Quetzal            | 2          |
| 324         | GNF      | Guinea Franc                 | 0          |
| 328         | GYD      | Guyana Dollar                | 2          |
| 332         | HTG      | Haiti Gourde                 | 2          |
| 340         | HNL      | Honduras Lempira             | 2          |
| 344         | HKD      | Hong Kong Dollar             | 2          |
| 348         | HUF      | Hungary Forint               | 2          |
| 352         | ISK      | Iceland Krona                | 2          |
| 356         | INR      | India Rupee                  | 2          |
| 360         | IDR      | Indonesia Rupiah             | 2          |
| 364         | IRR      | Iran Rial                    | 2          |
| 368         | IQD      | Iraq Dinar                   | 3          |
| 376         | ILS      | Israel Shekel                | 2          |
| 388         | JMD      | Jamaica Dollar               | 2          |
| 392         | JPY      | Japan Yen                    | 0          |
| 398         | KZT      | Kazakhstan Tenge             | 2          |
| 400         | JOD      | Jordan Dinar                 | 3          |
| 404         | KES      | Kenya Shilling               | 2          |
| 408         | KPW      | Korea (North) Won            | 2          |
| 410         | KRW      | Korea (South) Won            | 0          |
| 414         | KWD      | Kuwait Dinar                 | 3          |
| 417         | KGS      | Kyrgyzstan Som               | 2          |
| 418         | LAK      | Laos Kip                     | 2          |
| 422         | LBP      | Lebanon Pound                | 2          |
| 426         | LSL      | Lesotho Loti                 | 2          |
| 428         | LVL      | Latvia Lat                   | 2          |
| 430         | LRD      | Liberia Dollar               | 2          |
| 434         | LYD      | Libya Dinar                  | 3          |
| 440         | LTL      | Lithuania Litas              | 2          |
| 446         | MOP      | Macau Pataca                 | 2          |
| 454         | MWK      | Malawi Kwacha                | 2          |
| 458         | MYR      | Malaysia Ringgit             | 2          |
| 462         | MVR      | Maldivian Rufiyaa            | 2          |
| 478         | MRO      | Mauritania Ouguiya (old)     | 2          |
| 480         | MUR      | Mauritius Rupee              | 2          |
| 484         | MXN      | Mexico Peso                  | 2          |
| 496         | MNT      | Mongolia Tughrik             | 2          |
| 498         | MDL      | Moldova Leu                  | 2          |
| 504         | MAD      | Morocco Dirham               | 2          |
| 512         | OMR      | Oman Rial                    | 3          |
| 516         | NAD      | Namibia Dollar               | 2          |
| 524         | NPR      | Nepal Rupee                  | 2          |
| 532         | ANG      | Netherlands Antilles Guilder | 2          |
| 533         | AWG      | Aruba Guilder                | 2          |
| 548         | VUV      | Vanuatu Vatu                 | 0          |
| 554         | NZD      | New Zealand Dollar           | 2          |
| 558         | NIO      | Nicaragua Cordoba            | 2          |
| 566         | NGN      | Nigeria Naira                | 2          |
| 578         | NOK      | Norway Krone                 | 2          |
| 586         | PKR      | Pakistan Rupee               | 2          |
| 590         | PAB      | Panama Balboa                | 2          |
| 598         | PGK      | Papua New Guinea Kina        | 2          |
| 600         | PYG      | Paraguay Guarani             | 0          |
| 604         | PEN      | Peru Nuevo Sol               | 2          |
| 608         | PHP      | Philippines Peso             | 2          |
| 634         | QAR      | Qatar Riyal                  | 2          |
| 643         | RUB      | Russia Ruble                 | 2          |
| 646         | RWF      | Rwanda Franc                 | 0          |
| 654         | SHP      | Saint Helena Pound           | 2          |
| 678         | STD      | Sao Tome and Principe Dobra  | 2          |
| 682         | SAR      | Saudi Arabia Riyal           | 2          |
| 690         | SCR      | Seychelles Rupee             | 2          |
| 694         | SLL      | Sierra Leone Leone           | 2          |
| 702         | SGD      | Singapore Dollar             | 2          |
| 704         | VND      | Vietnam Dong                 | 0          |
| 706         | SOS      | Somalia Shilling             | 2          |
| 710         | ZAR      | South Africa Rand            | 2          |
| 728         | SSP      | South Sudanese Pound         | 2          |
| 748         | SZL      | Swaziland Lilangeni          | 2          |
| 752         | SEK      | Sweden Krona                 | 2          |
| 756         | CHF      | Switzerland Franc            | 2          |
| 760         | SYP      | Syria Pound                  | 2          |
| 764         | THB      | Thailand Baht                | 2          |
| 776         | TOP      | Tonga Pa'anga                | 2          |
| 780         | TTD      | Trinidad and Tobago Dollar   | 2          |
| 784         | AED      | United Arab Emirates Dirham  | 2          |
| 788         | TND      | Tunisia Dinar                | 3          |
| 800         | UGX      | Uganda Shilling              | 2          |
| 807         | MKD      | Macedonia Denar              | 2          |
| 818         | EGP      | Egypt Pound                  | 2          |
| 826         | GBP      | United Kingdom Pound         | 2          |
| 834         | TZS      | Tanzania Shilling            | 2          |
| 840         | USD      | United States Dollar         | 2          |
| 858         | UYU      | Uruguay Peso                 | 2          |
| 860         | UZS      | Uzbekistan Som               | 2          |
| 882         | WST      | Samoa Tala                   | 2          |
| 886         | YER      | Yemen Rial                   | 2          |
| 894         | ZMK      | Zambia Kwacha                | 2          |
| 901         | TWD      | Taiwan New Dollar            | 2          |
| 928         | VES      | Venezuela Bolívar Soberano   | 2          |
| 929         | MRU      | Mauritania Ouguiya           | 2          |
| 931         | CUC      | Cuba Convertible Peso        | 2          |
| 932         | ZWD      | Zimbabwe Dollar              | 2          |
| 933         | BYN      | Belarus Ruble                | 2          |
| 934         | TMT      | Turkmenistan Manat           | 2          |
| 936         | GHS      | Ghana Cedi                   | 2          |
| 937         | VEF      | Venezuela Bolivar Fuerte     | 2          |
| 938         | SDG      | Sudan Pound                  | 2          |
| 941         | RSD      | Serbia Dinar                 | 2          |
| 943         | MZN      | Mozambique Metical           | 2          |
| 944         | AZN      | Azerbaijan New Manat         | 2          |
| 946         | RON      | Romania New Leu              | 2          |
| 949         | TRY      | Turkey Lira                  | 2          |
| 950         | XAF      | CFA Franc BEAC               | 0          |
| 951         | XCD      | East Caribbean Dollar        | 2          |
| 952         | XOF      | CFA Franc BCEAO              | 0          |
| 953         | XPF      | CFP Franc                    | 0          |
| 967         | ZMW      | Zambian Kwacha               | 2          |
| 968         | SRD      | Suriname Dollar              | 2          |
| 969         | MGA      | Madagascar Ariary            | 2          |
| 971         | AFN      | Afghanistan Afghani          | 2          |
| 972         | TJS      | Tajikistan Somoni            | 2          |
| 973         | AOA      | Angola Kwanza                | 2          |
| 974         | BYR      | Belarus Ruble(-2016)         | 0          |
| 975         | BGN      | Bulgaria Lev                 | 2          |
| 976         | CDF      | Congo/Kinshasa Franc         | 2          |
| 977         | BAM      | Convertible Mark             | 2          |
| 978         | EUR      | Euro                         | 2          |
| 980         | UAH      | Ukraine Hryvna               | 2          |
| 981         | GEL      | Georgia Lari                 | 2          |
| 985         | PLN      | Poland Zloty                 | 2          |
| 986         | BRL      | Brazil Real                  | 2          |

## Security

### Authentication

In order to encrypt request and response you should set these parameters to the header.

**Request header**

| Parameter        | M | Type | Length   | Description                                                                 |
|------------------|---|------|----------|-----------------------------------------------------------------------------|
| x-access-key     | C | AN   | 50       | Mandatory if x-encryption = 1                                               |
| x-access-api-id  | C | AN   | 50       | Mandatory if x-encryption = 1                                               |
| x-access-api-key | C | AN   | 50       | Mandatory if x-encryption = 1                                               |
| x-api-version    | C | AN   | 1-3      | Fixed `1.2`, mandatory if x-encryption = 1                                  |
| x-sign           | C | AN   | 1-65,535 | "secret" encrypted with client's private key, mandatory if x-encryption = 1 |
| x-encryption     | C | N    | 1        | 1 - encrypted, 0 - not encrypted. Mandatory in production environment.      |

If MODE 2 (encrypt with RSA public key) is configured, brandName public key should be used for encryption.

**Response header**

| Parameter | M | Type | Length   | Description                                                                          |
|-----------|---|------|----------|--------------------------------------------------------------------------------------|
| x-sign    | C | AN   | 1-65,535 | "secret" encrypted with brandName private key, mandatory if request was encrypted. |

If MODE 2 (encrypt with RSA public key) mode configured, client's public key is used for encryption.

### Cryptography

When x-encryption is set to 1, request and response will be encrypted.

Some clients do not have a possibility to encrypt by using private keys. For these cases MODE 2 (encrypt with RSA public key) configuration is implemented.

Request message should be encrypted by using a random secret (x-sign in header) which is then encrypted with client's private key (or brandName public key if MODE 2 is configured).

Response message will be encrypted with a newly generated secret (x-sign in header), which is then encrypted with brandName private key (or client's public key if MODE 2 is configured).

Encrypted request/response body should be plain text.

RSA key generation example:

- Key type: RSA
- Key length: 4096
- Algorithm: sha512

```bash
// Generate Private Key
$ openssl req -nodes -newkey rsa:4096 -keyout private.key -out private.csr -sha512

// Extract Public Key from previously generated Private Key
$ openssl rsa -in private.key -pubout > public.key
```

![Encryption scheme](pm_api_encryption.png){.w100 .my}

#### Cryptography examples using PHP

**Encryption algorithm in PHP (MODE 1 - encrypt with RSA private key):**

```php
function encryptSecret(string $secret, string $privateKey): string
{
    openssl_private_encrypt($secret, $encryptedData, $privateKey);

    return base64_encode($encryptedData);
}

function encryptContent(string $content, string $secret): string
{
    $iv = bin2hex(random_bytes(8));
    $encryptedData = openssl_encrypt($content, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);

    return $iv.base64_encode($encryptedData);
}

// usage
$secret = 'RandomString32CharactersLength12'; // 32 characters
$sign = encryptSecret($secret, $privateKey); // add to the request header as 'x-sign'
$content = '{"param":"test"}';
$encryptedContent = encryptContent($content, $secret); // set this to be the request body
```

**Decryption algorithm in PHP (MODE 1 - encrypt with RSA private key):**

```php
function decryptSecret(string $sign, string $publicKey): string
{
    openssl_public_decrypt(base64_decode($sign), $secret, $publicKey);

    return $secret;
}

function decryptContent(string $encryptedContent, string $secret): string
{
    $iv = substr($encryptedContent, 0, 16);
    $encryptedData = base64_decode(substr($encryptedContent, 16));

    return openssl_decrypt($encryptedData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
}

// usage
$decryptedSecret = decryptSecret($sign, $publicKey);
$decryptedContent = decryptContent($encryptedContent, $secret);
```

**Encryption algorithm in PHP (MODE 2 - encrypt with RSA public key):**

```php
function encryptSecret(string $secret, string $publicKey): string
{
    openssl_public_encrypt($secret, $encryptedData, $publicKey);

    return base64_encode($encryptedData);
}

function encryptContent(string $content, string $secret): string
{
    $iv = bin2hex(random_bytes(8));
    $encryptedData = openssl_encrypt($content, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);

    return $iv.base64_encode($encryptedData);
}

// usage
$secret = 'RandomString32CharactersLength12'; // 32 characters
$sign = encryptSecret($secret, $publicKey); // add to the request header as 'x-sign'
$content = '{"param":"test"}';
$encryptedContent = encryptContent($content, $secret); // set this to be the request body
```

**Decryption algorithm in PHP (MODE 2 - encrypt with RSA public key):**

```php
function decryptSecret(string $sign, string $privateKey): string
{
    openssl_private_decrypt(base64_decode($sign), $secret, $privateKey);

    return $secret;
}

function decryptContent(string $encryptedContent, string $secret): string
{
    $iv = substr($encryptedContent, 0, 16);
    $encryptedData = base64_decode(substr($encryptedContent, 16));

    return openssl_decrypt($encryptedData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
}

// usage
$decryptedSecret = decryptSecret($sign, $privateKey);
$decryptedContent = decryptContent($encryptedContent, $secret);
```

#### Cryptography examples using C#

**Note:** Examples require BouncyCastle.NetCore library.

**Encryption algorithm in C# (MODE 1 - encrypt with RSA private key)**

```csharp
static string EncryptSecret(string secret, string privateKey)
{
    var encryptEngine = new Pkcs1Encoding(new RsaEngine());
    using (var reader = new StringReader(privateKey))
    {
        encryptEngine.Init(true, (AsymmetricKeyParameter)new PemReader(reader).ReadObject());
    }

    var data = Encoding.UTF8.GetBytes(secret);
    var encryptedData = encryptEngine.ProcessBlock(data, 0, data.Length);

    return Convert.ToBase64String(encryptedData);
}

static string EncryptContent(string content, string secret)
{
    var iv = Hex.Encode(new SecureRandom().GenerateSeed(8));

    var cipher = CipherUtilities.GetCipher("AES/CBC/PKCS7PADDING");
    var keyParam = new KeyParameter(Encoding.UTF8.GetBytes(secret));
    var keyParamWithIv = new ParametersWithIV(keyParam, iv, 0, 16);
    cipher.Init(true, keyParamWithIv);

    var encryptedData = cipher.DoFinal(Encoding.UTF8.GetBytes(content));

    return Encoding.UTF8.GetString(iv) + Convert.ToBase64String(encryptedData);
}

// usage
string secret = "RandomString32CharactersLength12"; // 32 characters
string sign = EncryptSecret(secret, privateKey); // add to the request header as 'x-sign'
string content = "{\"param\":\"test\"}";
string encryptedContent = EncryptContent(content, secret); // set this to be the request body
```

**Decryption algorithm in C# (MODE 1 - encrypt with RSA private key)**

```csharp
static string DecryptSecret(string sign, string publicKey)
{
    var decryptEngine = new Pkcs1Encoding(new RsaEngine());
    using (var reader = new StringReader(publicKey))
    {
        decryptEngine.Init(false, (AsymmetricKeyParameter)new PemReader(reader).ReadObject());
    }

    var data = Convert.FromBase64String(sign);
    var decryptedData = decryptEngine.ProcessBlock(data, 0, data.Length);

    return Encoding.UTF8.GetString(decryptedData);
}

static string DecryptContent(string encryptedContent, string secret)
{
    var iv = Encoding.UTF8.GetBytes(encryptedContent.Substring(0, 16));
    var encryptedData = Convert.FromBase64String(encryptedContent.Substring(16));

    var cipher = CipherUtilities.GetCipher("AES/CBC/PKCS7PADDING");
    var keyParam = new KeyParameter(Encoding.UTF8.GetBytes(secret));
    var keyParamWithIv = new ParametersWithIV(keyParam, iv, 0, 16);
    cipher.Init(false, keyParamWithIv);

    var data = cipher.DoFinal(encryptedData);

    return Encoding.UTF8.GetString(data);
}

// usage
string decryptedSecret = DecryptSecret(sign, publicKey);
string decryptedContent = DecryptContent(encryptedContent, secret);
```

**Encryption algorithm in C# (MODE 2 - encrypt with RSA public key)**

```csharp
static string EncryptSecret(string secret, string publicKey)
{
    var encryptEngine = new Pkcs1Encoding(new RsaEngine());
    using (var reader = new StringReader(publicKey))
    {
        encryptEngine.Init(true, (AsymmetricKeyParameter)new PemReader(reader).ReadObject());
    }

    var data = Encoding.UTF8.GetBytes(secret);
    var encryptedData = encryptEngine.ProcessBlock(data, 0, data.Length);

    return Convert.ToBase64String(encryptedData);
}

static string EncryptContent(string content, string secret)
{
    var iv = Hex.Encode(new SecureRandom().GenerateSeed(8));

    var cipher = CipherUtilities.GetCipher("AES/CBC/PKCS7PADDING");
    var keyParam = new KeyParameter(Encoding.UTF8.GetBytes(secret));
    var keyParamWithIv = new ParametersWithIV(keyParam, iv, 0, 16);
    cipher.Init(true, keyParamWithIv);

    var encryptedData = cipher.DoFinal(Encoding.UTF8.GetBytes(content));

    return Encoding.UTF8.GetString(iv) + Convert.ToBase64String(encryptedData);
}

string secret = "RandomString32CharactersLength12"; // 32 characters
string sign = EncryptSecret(secret, publicKey); // add to the request header as 'x-sign'
string content = "{\"param\":\"test\"}";
string encryptedContent = EncryptContent(content, secret); // set this to be the request body
```

**Decryption algorithm in C# (MODE 2 - encrypt with RSA public key)**

```csharp
static string DecryptSecret(string sign, string privateKey)
{
    var decryptEngine = new Pkcs1Encoding(new RsaEngine());
    using (var reader = new StringReader(privateKey))
    {
        decryptEngine.Init(false, (AsymmetricKeyParameter)new PemReader(reader).ReadObject());
    }

    var data = Convert.FromBase64String(sign);
    var decryptedData = decryptEngine.ProcessBlock(data, 0, data.Length);

    return Encoding.UTF8.GetString(decryptedData);
}

static string DecryptContent(string encryptedContent, string secret)
{
    var iv = Encoding.UTF8.GetBytes(encryptedContent.Substring(0, 16));
    var encryptedData = Convert.FromBase64String(encryptedContent.Substring(16));

    var cipher = CipherUtilities.GetCipher("AES/CBC/PKCS7PADDING");
    var keyParam = new KeyParameter(Encoding.UTF8.GetBytes(secret));
    var keyParamWithIv = new ParametersWithIV(keyParam, iv, 0, 16);
    cipher.Init(false, keyParamWithIv);

    var data = cipher.DoFinal(encryptedData);

    return Encoding.UTF8.GetString(data);
}

// usage
string decryptedSecret = DecryptSecret(sign, privateKey);
string decryptedContent = DecryptContent(encryptedContent, secret);
```

## Notation

### Parameter requirement

| Notation | Meaning        |
|----------|----------------|
| M        | Mandatory      |
| O        | Optional       |
| C        | Conditional    |
| -        | Not applicable |

### Value type

| Notation  | Meaning                                                                    |
|-----------|----------------------------------------------------------------------------|
| Not blank | Not empty, not null, isset.                                                |
| A         | Alphabetic chars only.                                                     |
| N         | Only numbers.                                                              |
| NS        | Numeric with symbols value.                                                |
| AN        | Alphanumeric value.                                                        |
| AS        | Alphabetic with symbols value.                                             |
| ANS       | Alphanumeric with symbols value.                                           |
| [1,2,3]   | Possible values: 1 or 2 or 3.                                              |
| [1-3]     | Range from 1 to 3.                                                         |
| LIST      | List of values.                                                            |
| EXT-LIST  | List of values. Possible formats: 1. ['840', '978'] 2. '840,878', 3. '840' |
| OBJ       | Object with properties.                                                    |
| -         | Not applicable.                                                            |
