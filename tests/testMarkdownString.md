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

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Assign to limit rule group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignAccountToLimitRuleGroup`                                     |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| account_id           | M | N    | 1-20   |                                                                           |
| limit_group_id       | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignAccountToLimitRuleGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "account_id": 206,
    "limit_group_id": 1
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                 |
|-------------|---|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                        |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                      |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                 |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignAccountToLimitRuleGroup_-_Error_codes data-header-separator=_ data-filter-by-values=006-009-059-060-139-141-367-475-496-807-1271-1279-1280-1438-1439-1440-1449-1671-1737-1894-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Assign to fee rule group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignAccountToFeeRuleGroup`                                       |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| account_id           | M | N    | 1-20   |                                                                           |
| fee_group_id         | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignAccountToFeeRuleGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "account_id": 206,
    "fee_group_id": 1
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                          |
|-------------|---|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                 |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                               |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                          |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignAccountToFeeRuleGroup_-_Error_codes data-header-separator=_ data-filter-by-values=006-009-069-086-139-141-367-475-496-913-1271-1279-1280-1438-1439-1440-1449-1671-1737-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                         |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

## Card

### Activate

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter             | M | Type | Length | Description                                                               |
|-----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key            | M | AN   | 20     |                                                                           |
| access_api_id         | M | AN   |        |                                                                           |
| access_api_key        | M | AN   |        |                                                                           |
| action                | M | AN   |        | Fixed `activateCard`                                                      |
| api_version           | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id  | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id               | M | N    | 1-20   |                                                                           |
| card_request_id       | O | N    | 1-20   | If present, it will be validated.                                         |
| card_pan              | O | N    | 16-19  | If present, it will be validated.                                         |
| card_cvc2             | O | N    | 3      | If present, it will be validated.                                         |
| card_expiration_year  | O | N    | 4      | If present, it will be validated.                                         |
| card_expiration_month | O | N    | 2      | If present, it will be validated.                                         |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "activateCard",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "card_pan": "5500010020001056",
    "card_cvc2": "075",
    "card_expiration_year": "2021",
    "card_expiration_month": "09"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                |
|-------------|---|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                       |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                     |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=activateCard_-_Error_codes data-header-separator=_ data-filter-by-values=535-536-537-538-551-809-820-821-1435-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                               |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Assign to fee group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignCardToFeesGroup`                                             |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| fees_group_id        | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignCardToFeesGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "fees_group_id": "1"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                          |
|-------------|---|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                 |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                               |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                          |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignCardToFeesGroup_-_Error_codes data-header-separator=_ data-filter-by-values=069-086-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-913-1692-1693-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                         |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Assign to limit group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignCardToLimitsGroup`                                           |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| limits_group_id      | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignCardToLimitsGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "limits_group_id": "1"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                |
|-------------|---|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                       |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                     |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignCardToLimitsGroup_-_Error_codes data-header-separator=_ data-filter-by-values=060-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-059-489-490-1691-2101-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                               |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Assign to usage group

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `assignCardToUsageGroup`                                            |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| usages_group_id      | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignCardToUsageGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "usages_group_id": "1"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                          |
|-------------|---|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                 |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                               |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                          |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignCardToUsageGroup_-_Error_codes data-header-separator=_ data-filter-by-values=129-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-133-491-492-1694-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                         |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
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
| action               | M | AN   |        | Fixed `assignCardToRiskRuleGroup`                                         |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| risk_rules_group_id  | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "assignCardToRiskRuleGroup",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "risk_rules_group_id": "1"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                  |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                         |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                       |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                  |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=assignCardToRiskRuleGroup_-_Error_codes data-header-separator=_ data-filter-by-values=1165-1166-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                 |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Change scheme account updates status

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter      | M | Type  | Length | Description                                                            |
|----------------|---|-------|--------|------------------------------------------------------------------------|
| access_key     | M | AN    | 20     |                                                                        |
| access_api_id  | M | AN    |        |                                                                        |
| access_api_key | M | AN    |        |                                                                        |
| action         | M | AN    |        | Fixed: `changeCardSchemeAccountUpdatesStatus`                          |
| api_version    | M | NS    |        | Fixed: `1.1`                                                           |
| card_id        | M | N     | 1-20   |                                                                        |
| participating  | M | [0,1] | 1      | `1` if participating in the 'Scheme Account Updates' service, else `0` |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeCardSchemeAccountUpdatesStatus",
    "api_version": "1.1",
    "cards_id": 123528,
    "participating": 0
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                                   |
|-------------|---|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                          |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                                        |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                                   |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=changeCardSchemeAccountUpdatesStatus_-_Error_codes data-header-separator=_ data-filter-by-values=210-463-482-1303-1441-1442-1450-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                                  |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Change status

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                                                                                                                                                                             |
|----------------------|---|------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                                                                                                                                                                         |
| access_api_id        | M | AN   |        |                                                                                                                                                                                                                         |
| access_api_key       | M | AN   |        |                                                                                                                                                                                                                         |
| action               | M | AN   |        | Fixed: `changeCardStatus`                                                                                                                                                                                               |
| api_version          | M | NS   |        | Fixed: `1.1`                                                                                                                                                                                                            |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                                                                                                                               |
| card_id              | M | N    | 1-20   |                                                                                                                                                                                                                         |
| status               | M | A    | 1      | [`Card Status`](#appendix--enum--card-status) Note: The only way to change card status from "Not active" to "Active" is to use the `activateCard` API call. <br> Blocked card status "B" is final and cannot be undone. |
| reason_code          | O | N    | 1-20   | [`Status change reason code`](#appendix--enum--status-change-reason-code)                                                                                                                                               |
| note                 | O | ANS  | 1-255  | A short description which explains why card status has been changed.                                                                                                                                                    |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeCardStatus",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "status": "T",
    "reason_code": 13,
    "note": "Card has been suspended"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                  |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                         |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                       |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                  |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=changeCardStatus_-_Error_codes data-header-separator=_ data-filter-by-values=026-1531-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-1580-1915-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                 |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Create

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter                            | M | Type     | Length | Description                                                                                                                                                                                                                                                                                                                                                 |
|--------------------------------------|---|----------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key                           | M | AN       | 20     |                                                                                                                                                                                                                                                                                                                                                             |
| access_api_id                        | M | AN       |        |                                                                                                                                                                                                                                                                                                                                                             |
| access_api_key                       | M | AN       |        |                                                                                                                                                                                                                                                                                                                                                             |
| action                               | M | AN       |        | Fixed `createCard`                                                                                                                                                                                                                                                                                                                                          |
| api_version                          | M | NS       |        | Fixed `1.1`                                                                                                                                                                                                                                                                                                                                                 |
| request_reference_id                 | O | ANS      | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                                                                                                                                                                                                                                                                   |
| card_program_id                      | M | N        |        |                                                                                                                                                                                                                                                                                                                                                             |
| card_currency_ison                   | O | EXT-LIST | 3      | If not provided, the [`currency ISON`](#appendix--enum--currency) will be set by program's default currency. If LIST is provided, an account for each currency will be created and assigned to the card. First currency from the LIST will be marked as default currency for the card. <br> Note: if account_id provided, card_currency_ison must be empty. |
| card_country_ison                    | M | N        | 3      |                                                                                                                                                                                                                                                                                                                                                             |
| card_virtual                         | M | [0,1]    |        | `0` - physical, `1` - virtual.                                                                                                                                                                                                                                                                                                                              |
| card_reference_id                    | O | AN       | 1-50   | Reference ID in the client's system.                                                                                                                                                                                                                                                                                                                        |
| card_name_line_3                     | M | ANS      | 3-26   | Card emboss name line 1. Allowed symbols are combined of `1` from [`Default charsets`](#appendix--enum--default-charsets) and `Emboss` additional charset field which can be selected on the program                                                                                                                                                        |
| card_name_line_4                     | O | ANS      | 3-50   | Card emboss name line 2. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Emboss` additional charset field which can be selected on the program                                                                                                                                                        |
| track_data_first_name                | O | ANS      | 1-26   | Used to override default card chip name generation. Chip name is combined with `track_data_last_name`. Combined length cannot exceed 26 characters. Charset `1` used from [`Default charsets`](#appendix--enum--default-charsets)                                                                                                                           |
| track_data_last_name                 | O | ANS      | 1-26   | Used to override default card chip name generation. Chip name is combined with `track_data_first_name`. Combined length cannot exceed 26 characters Charset `1` used from [`Default charsets`](#appendix--enum--default-charsets)                                                                                                                           |
| card_product_id                      | O | N        | 1-20   | If not provided, the default card product ID will be set by the program.                                                                                                                                                                                                                                                                                    |
| card_fee_group_id                    | O | N        | 1-20   | If not provided, the default fee group ID will be set by the program.                                                                                                                                                                                                                                                                                       |
| card_limit_group_id                  | O | N        | 1-20   | If not provided, the default limit group ID will be set by the program.                                                                                                                                                                                                                                                                                     |
| card_validity_period                 | O | N        | 1-300  | If not provided, the default validity period (months) will be set by the program.                                                                                                                                                                                                                                                                           |
| account_limit_group_id               | O | N        | 1-20   | If not provided, the default limit group ID will be set by the program. Note: if the program does not have an account limit group, it will not be set.                                                                                                                                                                                                      |
| holder_limit_group_id                | O | N        | 1-20   | If not provided, the default limit group ID will be set by the program. Note: if the program does not have a holder limit group, it will not be set.                                                                                                                                                                                                        |
| card_usage_group_id                  | O | N        | 1-20   | If not provided, the default card usage group ID will be set by the program.                                                                                                                                                                                                                                                                                |
| card_design_id                       | O | N        | 1-20   | If not provided, the default card design ID will be set by the program.                                                                                                                                                                                                                                                                                     |
| card_pin                             | O | N        | 4      | Provided value cannot be all the same or sequential digits. If not provided, a random PIN will be generated.                                                                                                                                                                                                                                                |
| account_id                           | O | EXT-LIST | 1-20   | If not provided, new account(-s) will be created for provided currency(-ies), overwise, the card will be assigned to the account(-s). <br> Note: if `card_currency_ison` is provided, then `account_id` must be empty.                                                                                                                                      |
| account_owner_id                     | C | EXT-LIST | 1-20   | Holder id(-s) of the account(-s) provided in the account_id field. Mandatory if `account_id` is provided. If `account_id` is a `LIST`, then a `LIST` of the account owners for each account should be provided while maintaining the same order.                                                                                                            |
| card_thermal_line_1                  | O | ANS      | 1-50   | Text for thermal line1.                                                                                                                                                                                                                                                                                                                                     |
| card_thermal_line_2                  | O | ANS      | 1-50   | Text for thermal line2.                                                                                                                                                                                                                                                                                                                                     |
| holder_id                            | O | N        | 1-20   | If not provided, a new holder will be registered, otherwise an existing holder will be assigned.                                                                                                                                                                                                                                                            |
| holder_title                         | O | ANS      | 1-7    | Optional if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                     |
| holder_type                          | O | N        | 1      | `0` - personal, `1` - business. Default value: `0`                                                                                                                                                                                                                                                                                                          |
| holder_access_level                  | O | N        | 0-1000 | If not provided, the default value will be set by the program.                                                                                                                                                                                                                                                                                              |
| holder_business_name                 | C | ANS      | 1-50   | Mandatory if holder_type = `1`                                                                                                                                                                                                                                                                                                                              |
| holder_first_name                    | C | AS       | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `1` from [`Default charsets`](#appendix--enum--default-charsets) and `Holder` additional charset field which can be selected on the program                                                                                                                                        |
| holder_last_name                     | C | AS       | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `1` from [`Default charsets`](#appendix--enum--default-charsets) and `Holder` additional charset field which can be selected on the program                                                                                                                                        |
| holder_address_line_1                | C | ANS      | 1-100  | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                       |
| holder_address_line_2                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                        |
| holder_address_line_3                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                        |
| holder_address_line_4                | O | ANS      | 1-100  | Optional if `holder_id` isn't provided. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                        |
| holder_country_ison                  | C | N        | 3      | Mandatory if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                    |
| holder_zipcode                       | C | ANS      | 1-9    | Mandatory if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                    |
| holder_city                          | C | ANS      | 1-50   | Mandatory if `holder_id` isn't provided. Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                       |
| holder_state                         | O | ANS      | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                                                |
| holder_phone_number                  | C | N        | 6-15   | Mandatory if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                    |
| holder_email                         | O | ANS      | 6-100  | Optional if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                     |
| holder_date_of_birth                 | O | ANS      | 10     | Optional if `holder_id` isn't provided. Format: `Y-m-d`, example: `2020-06-24`. Can not be a future date.                                                                                                                                                                                                                                                   |
| holder_ip_address                    | O | ANS      | 7-15   | Optional if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                     |
| holder_industry_id                   | O | N        | 4      | [`Industry ID`](#appendix--enum--industry-id)                                                                                                                                                                                                                                                                                                               |
| holder_date_of_company_incorporation | O | ANS      | 10     | Format: `Y-m-d`, example: `2020-06-24`. Can not be a future date.                                                                                                                                                                                                                                                                                           |
| holder_locale                        | O | AS       | 1-15   | [`Language code identifiers`](#appendix--enum--language-code)                                                                                                                                                                                                                                                                                               |
| delivery_title                       | O | ANS      | 1-7    | Ignored for virtual cards.                                                                                                                                                                                                                                                                                                                                  |
| delivery_first_name                  | C | AS       | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                           |
| delivery_last_name                   | C | AS       | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                           |
| delivery_address_line_1              | C | ANS      | 1-100  | Mandatory for a physical card order. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                           |
| delivery_address_line_2              | O | ANS      | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| delivery_address_line_3              | O | ANS      | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| delivery_address_line_4              | O | ANS      | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| delivery_country_ison                | C | N        | 3      | Mandatory for a physical card order.                                                                                                                                                                                                                                                                                                                        |
| delivery_zipcode                     | C | ANS      | 1-9    | Mandatory for a physical card order.                                                                                                                                                                                                                                                                                                                        |
| delivery_city                        | C | ANS      | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                           |
| delivery_state                       | O | ANS      | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                                                |
| order_shipping_method                | C | N        | 1-20   | Shipping method ID. Mandatory for a physical card order.                                                                                                                                                                                                                                                                                                    |
| order_delivery_code                  | O | AN       | 1-10   | Delivery code used for grouping bulk orders. Used when a group of cards has to be sent to a specific address. Optional for physical cards.                                                                                                                                                                                                                  |
| order_fulfil_1                       | O | AN       | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                                                                                                                                |
| order_fulfil_2                       | O | AN       | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                                                                                                                                |
| order_language                       | O | A        | 3      | Language for carrier content.                                                                                                                                                                                                                                                                                                                               |
| bulk_address_line_1                  | C | ANS      | 1-100  | Mandatory for bulk orders (`order_delivery_code` is provided). Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                 |
| bulk_address_line_2                  | O | ANS      | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| bulk_address_line_3                  | O | ANS      | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| bulk_address_line_4                  | O | ANS      | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                     |
| bulk_country_ison                    | C | N        | 3      | Mandatory for bulk orders (`order_delivery_code` is provided).                                                                                                                                                                                                                                                                                              |
| bulk_zipcode                         | C | ANS      | 1-9    | Mandatory for bulk orders (`order_delivery_code` is provided).                                                                                                                                                                                                                                                                                              |
| bulk_city                            | C | ANS      | 1-50   | Mandatory for bulk orders (`order_delivery_code` is provided). Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                 |
| bulk_state                           | O | ANS      | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program                                                                                                                                                                                |
| kyc_completion_level                 | O | N        | 1      | Optional if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                     |
| kyc_document_expiration_date         | O | ANS      | 10     | Optional if `holder_id` isn't provided.                                                                                                                                                                                                                                                                                                                     |
| risk_rules_group_id                  | O | N        | 1-20   | If not provided, the default risk rules group ID will be set by the program.                                                                                                                                                                                                                                                                                |
| acs_password                         | O | AN       | 6-128  | If not provided, the default password will be generated.                                                                                                                                                                                                                                                                                                    |
| acs_auth_method                      | O | AN       | 1-20   | [`ACS authentication method`](#appendix--enum--acs-authentication-method). If not provided, the default value will be set by the program.                                                                                                                                                                                                                   |
| acs_external_client_integration_id   | C | N        | 1-20   | Required if `acs_auth_method` = 3, 4, or 5, and the default ACS external client integration is not defined.                                                                                                                                                                                                                                                 |
| auto_conversion                      | O | N        | 1      | Enable/disable auto conversion (if not provided, the default value will be set by the program).                                                                                                                                                                                                                                                             |
| access_level                         | O | N        | 0-1000 | If not provided, the default value will be set by the program.                                                                                                                                                                                                                                                                                              |
| additional_charset_id                | O | N        | 1-10   | Additional charset allows to use additional symbols for specified fields.                                                                                                                                                                                                                                                                                   |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "createCard",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_program_id": 1,
    "card_currency_ison": "826",
    "card_country_ison": "826",
    "card_virtual": 0,
    "card_reference_id": "123456",
    "card_name_line_3": "John Smith",
    "card_name_line_4": null,
    "card_product_id": "1",
    "card_fee_group_id": "1",
    "card_limit_group_id": "1",
    "account_limit_group_id": 6,
    "holder_limit_group_id": 10,
    "card_usage_group_id": "1",
    "card_design_id": "1",
    "card_pin": "5522",
    "holder_access_level": "0",
    "holder_title": "Mr",
    "holder_first_name": "John",
    "holder_last_name": "Smith",
    "holder_address_line_1": "Bridge St",
    "holder_country_ison": 826,
    "holder_zipcode": "SW1A 2PW",
    "holder_city": "Westminster",
    "holder_state": "London",
    "holder_phone_number": "142544544",
    "holder_email": "email@email.com",
    "holder_date_of_birth": "1989-10-10",
    "holder_ip_address": "8.8.8.8",
    "holder_industry_id": null,
    "holder_date_of_company_incorporation": null,
    "holder_locale": "en_US",
    "delivery_title": "Mr",
    "delivery_first_name": "John",
    "delivery_last_name": "Smith",
    "delivery_address_line_1": "Bridge St",
    "delivery_country_ison": 826,
    "delivery_zipcode": "SW1A 2PW",
    "delivery_city": "Westminster",
    "delivery_state": "London",
    "order_shipping_method": "1",
    "order_delivery_code": "14",
    "order_language": "ENG",
    "bulk_address_line_1": "Bridge St",
    "bulk_country_ison": "826",
    "bulk_zipcode": "SW1A 2PW",
    "bulk_city": "Westminster",
    "bulk_state": "London",
    "kyc_completion_level": 0,
    "kyc_document_expiration_date": "2019-06-05",
    "risk_rules_group_id": "1",
    "acs_password": "0rF0Bh",
    "acs_auth_method": 1,
    "auto_conversion": "0",
    "access_level": "0"
}
```

#### Response

| Parameter                 | M | Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|---------------------------|---|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                    | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| duplicated                | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| data                      | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| data / card_id            | M | N    | Card ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| data / card_request_id    | M | N    | Card number ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data / holder_id          | M | N    | Holder ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| data / account_id         | M | N    | Default account ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| data / pan                | O | N    | Primary account number. Agreeable, can be plain/masked/encrypted/absent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| data / pin                | O | N    | PIN code. Agreeable, can be plain/encrypted/absent. Note: For virtual card this field will be empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| data / cvc2               | O | N    | Card verification code 2. Agreeable, can be plain/encrypted/absent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| data / expiration         | O | OBJ  | Expiration date object. Agreeable, can be present or absent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| data / expiration / year  | M | N    | Card expiration year.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| data / expiration / month | M | N    | Card expiration month.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| data / acs_password       | M | AN   | ACS password.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| status_code               | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=createCard_-_Error_codes data-header-separator=_ data-filter-by-values=005-023-048-060-072-083-086-091-129-162-187-188-242-243-244-359-392-435-436-437-460-462-464-465-466-467-468-469-470-471-472-473-474-483-484-485-486-487-488-489-490-491-492-493-494-495-502-503-504-505-506-507-508-509-510-511-512-513-514-515-516-517-518-519-520-521-522-523-524-525-527-528-529-530-558-560-618-786-807-808-873-938-940-941-1089-1090-1091-1093-1095-1096-1097-1098-1099-1108-1109-1125-1166-1238-1239-1316-1443-1444-1445-1448-1489-1508-1509-1510-1514-1515-1518-1519-1520-1521-1524-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1645-1646-1647-1648-1649-1671-1675-1679-1680-1683-1684-1685-1686-1687-1690-1714-1815-000-9999 } Mandatory if status = `error`.      |
| message                   | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": {
        "card_id": 123528,
        "card_request_id": 123,
        "holder_id": 206,
        "account_id": 206,
        "pan": "1234567891234567",
        "pin": "1234",
        "cvc2": "075",
        "expiration": {
            "year": "2021",
            "month": "09"
        },
        "acs_password": "0rF0Bh"
    }
}
```

### Get CVC2

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getCvc2`                                                           |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getCvc2",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                           |
|-------------|---|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                  |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                 |
| data / cvc2 | M | N    | Card verification code 2. Agreeable, can be plain/encrypted/absent.                                                                                                                                                                                                   |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getCVC2_-_Error_codes data-header-separator=_ data-filter-by-values=121-210-463-620-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                          |

```json
{
    "status": "success",
    "data": {
        "cvc2": "075"
    }
}
```

### Get details

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getCardDetails`                                                    |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value will be used from the client's credentials.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getCardDetails",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter                          | M | Type | Description                                                                                                                                                                                                                                                                      |
|------------------------------------|---|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                             | M | A    | `success` or `error`                                                                                                                                                                                                                                                             |
| data                               | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                            |
| data / card_id                     | M | N    | Card ID.                                                                                                                                                                                                                                                                         |
| data / reference_number            | C | ANS  |                                                                                                                                                                                                                                                                                  |
| data / holder_id                   | M | N    | Holder ID.                                                                                                                                                                                                                                                                       |
| data / primary_account_id          | M | N    | Primary account ID.                                                                                                                                                                                                                                                              |
| data / virtual                     | M | N    | `0` - physical, `1` - virtual.                                                                                                                                                                                                                                                   |
| data / access_level                | M | N    |                                                                                                                                                                                                                                                                                  |
| data / program_id                  | M | N    |                                                                                                                                                                                                                                                                                  |
| data / invalid_pin_tries           | M | N    |                                                                                                                                                                                                                                                                                  |
| data / invalid_pin_tries_max_limit | M | N    |                                                                                                                                                                                                                                                                                  |
| data / product_id                  | M | N    |                                                                                                                                                                                                                                                                                  |
| data / sub_product_id              | M | N    |                                                                                                                                                                                                                                                                                  |
| data / fees_group_id               | C | N    |                                                                                                                                                                                                                                                                                  |
| data / limits_group_id             | C | N    |                                                                                                                                                                                                                                                                                  |
| data / usages_group_id             | C | N    |                                                                                                                                                                                                                                                                                  |
| data / risk_group_id               | C | N    |                                                                                                                                                                                                                                                                                  |
| data / status                      | M | A    | [`Card Status`](#appendix--enum--card-status)                                                                                                                                                                                                                                    |
| data / status_change_reason_code   | O | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)                                                                                                                                                                                                        |
| data / status_change_note          | O | ANS  |                                                                                                                                                                                                                                                                                  |
| data / pin_status                  | M | N    | `0` - ok, `1` - blocked.                                                                                                                                                                                                                                                         |
| data / default_currency_ison       | M | N    | [`Currency ISON`](#appendix--enum--currency)                                                                                                                                                                                                                                     |
| data / country_ison                | M | N    |                                                                                                                                                                                                                                                                                  |
| data / service_code                | M | N    |                                                                                                                                                                                                                                                                                  |
| data / card_design_id              | M | N    |                                                                                                                                                                                                                                                                                  |
| data / name_line_3                 | C | ANS  |                                                                                                                                                                                                                                                                                  |
| data / name_line_4                 | C | ANS  |                                                                                                                                                                                                                                                                                  |
| data / expiry_month                | M | N    | Agreeable, can be present or absent.                                                                                                                                                                                                                                             |
| data / expiry_year                 | M | N    | Agreeable, can be present or absent.                                                                                                                                                                                                                                             |
| status_code                        | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getCardDetails_-_Error_codes data-header-separator=_ data-filter-by-values=210-463-482-593-620-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message                            | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                     |

```json
{
    "status": "success",
    "data": {
        "card_id": 123528,
        "reference_number": 123456,
        "holder_id": 206,
        "primary_account_id": 206,
        "virtual": 0,
        "access_level": 0,
        "program_id": 1,
        "invalid_pin_tries": 0,
        "invalid_pin_tries_max_limit": 5,
        "product_id": 1,
        "sub_product_id": 1,
        "fees_group_id": 1,
        "limits_group_id": 1,
        "usages_group_id": 1,
        "status": "A",
        "status_change_reason_code": null,
        "status_change_note": null,
        "pin_status": 0,
        "default_currency_ison": "826",
        "country_ison": "826",
        "service_code": "201",
        "card_design_id": 1,
        "name_line_3": "John",
        "name_line_4": "Smith",
        "expiry_month": "2021",
        "expiry_year": "09"
    }
}
```

### Get number

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getCardNumber`                                                     |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getCardNumber",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                         |
|-------------|---|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                               |
| data / pan  | M | N    | Card primary account number. Agreeable, can be plain/masked/encrypted.                                                                                                                                                                                                              |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getCardNumber_-_Error_codes data-header-separator=_ data-filter-by-values=210-463-482-590-593-620-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                        |

```json
{
    "status": "success",
    "data": {
        "pan": "1234567891234567"
    }
}
```

### Get pin

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getPin`                                                            |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getPin",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                  |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                         |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                        |
| data / pin  | M | N    | Card PIN code. Agreeable, can be plain/encrypted.                                                                                                                                                                                                                            |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getPin_-_Error_codes data-header-separator=_ data-filter-by-values=210-463-482-590-593-620-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                 |

```json
{
    "status": "success",
    "data": {
        "pin": "1234"
    }
}
```

### Get status

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getCardStatus`                                                     |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getCardStatus",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": "123528"
}
```

#### Response

| Parameter          | M | Type | Description                                                                                                                                                                                                                                                                 |
|--------------------|---|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status             | M | A    | `success` or `error`                                                                                                                                                                                                                                                        |
| data               | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                       |
| data / card_status | M | A    | [`Card Status`](#appendix--enum--card-status)                                                                                                                                                                                                                               |
| data / reason_code | O | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)                                                                                                                                                                                                   |
| data / note        | O | ANS  |                                                                                                                                                                                                                                                                             |
| status_code        | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getCardStatus_-_Error_codes data-header-separator=_ data-filter-by-values=210-463-482-620-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message            | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                |

```json
{
    "status": "success",
    "data": {
        "card_status": "T",
        "reason_code": 13,
        "note": "Card has been suspended"
    }
}
```

### Reissue

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter               | M | Type | Length | Description                                                                                                                                                                                                                                                                                |
|-------------------------|---|------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key              | M | AN   | 20     |                                                                                                                                                                                                                                                                                            |
| access_api_id           | M | AN   |        |                                                                                                                                                                                                                                                                                            |
| access_api_key          | M | AN   |        |                                                                                                                                                                                                                                                                                            |
| action                  | M | AN   |        | Fixed `reissueCard`                                                                                                                                                                                                                                                                        |
| api_version             | M | NS   |        | Fixed `1.1`                                                                                                                                                                                                                                                                                |
| request_reference_id    | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                                                                                                                                                                                                  |
| card_id                 | M | N    |        |                                                                                                                                                                                                                                                                                            |
| generate_new_pan        | O | N    | 1      | `0` - keep the initial card number. `1` - generate a new card number. Default value: `0`                                                                                                                                                                                                   |
| generate_new_pin        | O | N    | 1      | `0` - keep previous PIN. `1` - generate a new card PIN. Default value: `1`. When switching the card from virtual to physical, value must be - 1.                                                                                                                                           |
| virtual                 | O | N    | 1      | `0` - physical, `1` - virtual. If the card's original type changes, the card will be converted as well.                                                                                                                                                                                    |
| card_pin                | O | N    | 4      | Will be ignored if new PIN generating is not enabled. If `card_pin` value is provided, PIN will be applied to the card, otherwise if value is not provided - a random PIN will be generated.                                                                                               |
| card_program_id         | C | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is mandatory.                                                                                                                                                                                        |
| card_fee_group_id       | O | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is optional.                                                                                                                                                                                         |
| card_limit_group_id     | O | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is optional.                                                                                                                                                                                         |
| card_usage_group_id     | O | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is optional.                                                                                                                                                                                         |
| card_design_id          | O | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is optional.                                                                                                                                                                                         |
| risk_rules_group_id     | O | N    | 20     | If the card type is changed from virtual to physical (or vice versa), then this field is optional.                                                                                                                                                                                         |
| card_name_line_3        | M | ANS  | 3-26   | Card emboss name line 1. Allowed symbols are combined of `1` from [`Default charsets`](#appendix--enum--default-charsets) and `Emboss` additional charset field which can be selected on the program.                                                                                      |
| card_name_line_4        | O | ANS  | 2-50   | Card emboss name line 2. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Emboss` additional charset field which can be selected on the program.                                                                                      |
| track_data_first_name   | O | ANS  | 1-26   | Used to override default card chip name generation. Chip name is combined with `track_data_last_name`. Combined length cannot exceed 26 characters. Charset `1` used from [`Default charsets`](#appendix--enum--default-charsets)                                                          |
| track_data_last_name    | O | ANS  | 1-26   | Used to override default card chip name generation. Chip name is combined with `track_data_first_name`. Combined length cannot exceed 26 characters. Charset `1` used from [`Default charsets`](#appendix--enum--default-charsets)                                                         |
| delivery_title          | O | ANS  | 1-7    | Ignored for virtual cards.                                                                                                                                                                                                                                                                 |
| delivery_first_name     | C | AS   | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                         |
| delivery_last_name      | C | AS   | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `2` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                         |
| delivery_address_line_1 | C | ANS  | 1-100  | Mandatory for a physical card order. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                         |
| delivery_address_line_2 | O | ANS  | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| delivery_address_line_3 | O | ANS  | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| delivery_address_line_4 | O | ANS  | 1-100  | Ignored for virtual cards. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| delivery_country_ison   | C | N    | 3      | Mandatory for a physical card order.                                                                                                                                                                                                                                                       |
| delivery_zipcode        | C | ANS  | 1-9    | Mandatory for a physical card order.                                                                                                                                                                                                                                                       |
| delivery_city           | C | ANS  | 1-50   | Mandatory for a physical card order. Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                         |
| delivery_state          | O | ANS  | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                                              |
| order_shipping_method   | C | N    | 1-20   | Mandatory for a physical card order.                                                                                                                                                                                                                                                       |
| order_delivery_code     | O | AN   | 1-10   | Ignored for virtual cards.                                                                                                                                                                                                                                                                 |
| order_fulfil_1          | O | AN   | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                                                               |
| order_fulfil_2          | O | AN   | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                                                               |
| order_language          | O | A    | 3      | Language for carrier content.                                                                                                                                                                                                                                                              |
| bulk_address_line_1     | C | ANS  | 1-100  | Mandatory for bulk orders (`order_delivery_code` is provided). Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                               |
| bulk_address_line_2     | O | ANS  | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| bulk_address_line_3     | O | ANS  | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| bulk_address_line_4     | O | ANS  | 1-100  | Used only for bulk orders. Allowed symbols are combined of `4` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                   |
| bulk_country_ison       | C | N    | 3      | Mandatory for bulk orders (`order_delivery_code` is provided).                                                                                                                                                                                                                             |
| bulk_zipcode            | C | ANS  | 1-9    | Mandatory for bulk orders (`order_delivery_code` is provided).                                                                                                                                                                                                                             |
| bulk_city               | C | ANS  | 1-50   | Mandatory for bulk orders (`order_delivery_code` is provided). Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                               |
| bulk_state              | O | ANS  | 1-50   | Allowed symbols are combined of `6` from [`Default charsets`](#appendix--enum--default-charsets) and `Address` additional charset field which can be selected on the program.                                                                                                              |
| auto_conversion         | O | N    | 1      | Enable/disable auto conversion (if not provided and the new program is not provided as well, the value will be left as the originally set card value, otherwise if the value is not provided, but the new program is provided, the value will be validated with the program's permission). |
| access_level            | O | N    | 0-1000 | If not provided, the default value will be set by the program.                                                                                                                                                                                                                             |
| card_thermal_line_1     | O | ANS  | 0-50   | Text for thermal line1.                                                                                                                                                                                                                                                                    |
| card_thermal_line_2     | O | ANS  | 0-50   | Text for thermal line2.                                                                                                                                                                                                                                                                    |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "reissueCard",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": 1,
    "generate_new_pan": 0,
    "generate_new_pin": 1,
    "virtual": 1,
    "card_pin": "2573",
    "card_name_line_3": "John Smith",
    "card_name_line_4": null,
    "delivery_title": "Mr",
    "delivery_first_name": "John",
    "delivery_last_name": "Smith",
    "delivery_address_line_1": "Bridge St",
    "delivery_country_ison": 826,
    "delivery_zipcode": "SW1A 2PW",
    "delivery_city": "Westminster",
    "delivery_state": "London",
    "order_shipping_method": "1",
    "order_delivery_code": "14",
    "order_language": "ENG",
    "bulk_address_line_1": "Bridge St",
    "bulk_country_ison": "826",
    "bulk_zipcode": "SW1A 2PW",
    "bulk_city": "Westminster",
    "bulk_state": "London",
    "auto_conversion": "0",
    "access_level": "0",
    "card_thermal_line_1": "thermal line one"
}
```

#### Response

| Parameter                 | M | Type | Description                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------|---|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                    | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                                                                              |
| duplicated                | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                                                                                            |
| data                      | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                                                                                                             |
| data / card_id            | M | N    | Card ID.                                                                                                                                                                                                                                                                                                                                                          |
| data / holder_id          | M | N    | Holder ID.                                                                                                                                                                                                                                                                                                                                                        |
| data / account_id         | M | N    | Default account ID.                                                                                                                                                                                                                                                                                                                                               |
| data / card_request_id    | M | N    | Card number ID.                                                                                                                                                                                                                                                                                                                                                   |
| data / pan                | O | N    | Primary account number. Agreeable, can be plain/masked/encrypted/absent.                                                                                                                                                                                                                                                                                          |
| data / pin                | O | N    | PIN code. Agreeable, can be plain/encrypted/absent. Note: For a virtual card this field will be empty.                                                                                                                                                                                                                                                            |
| data / cvc2               | O | N    | Card verification code 2. Agreeable, can be plain/encrypted/absent.                                                                                                                                                                                                                                                                                               |
| data / expiration         | O | OBJ  | Expiration date object. Agreeable, can be present or absent.                                                                                                                                                                                                                                                                                                      |
| data / expiration / year  | M | N    | Card expiration year.                                                                                                                                                                                                                                                                                                                                             |
| data / expiration / month | M | N    | Card expiration month.                                                                                                                                                                                                                                                                                                                                            |
| status_code               | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=reissueCard_-_Error_codes data-header-separator=_ data-filter-by-values=005-242-243-244-464-465-466-467-468-469-470-471-472-484-806-873-1286-1288-1289-1317-1489-1508-1509-1510-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-1681-000-9999 } Mandatory if status = `error`. |
| message                   | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                                                                                      |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": {
        "card_id": 123528,
        "holder_id": 206,
        "account_id": 206,
        "card_request_id": 1,
        "pan": "1234567891234567",
        "pin": "1234",
        "cvc2": "075",
        "expiration": {
            "year": "2021",
            "month": "09"
        }
    }
}
```

### Set pin

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `setPin`                                                            |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| pin                  | M | N    | 4      | Cannot be all the same digits or all sequential digits.                   |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "setPin",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528",
    "pin": "1234"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                     |
|-------------|---|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                            |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                     |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=setPin_-_Error_codes data-header-separator=_ data-filter-by-values=017-072-182-1264-1489-1514-1515-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                    |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Unblock pin

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `unblockPin`                                                        |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "unblockPin",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": "123528"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                       |
|-------------|---|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                              |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                            |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                       |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=unblockPin_-_Error_codes data-header-separator=_ data-filter-by-values=182-1265-1489-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                      |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```
### Get design

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getDesign`                                                         |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| program_id           | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getDesign",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "program_id": "1"
}
```

#### Response

| Parameter               | M | Type | Description                                                                                                                                                                                                                                                |
|-------------------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                  | M | A    | `success` or `error`                                                                                                                                                                                                                                       |
| data                    | C | OBJ  | Response data object list. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                           |
| data / card_design_id   | M | N    | Card design ID.                                                                                                                                                                                                                                            |
| data / card_design_name | M | ANS  | Card design name.                                                                                                                                                                                                                                          |
| status_code             | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getDesign_-_Error_codes data-header-separator=_ data-filter-by-values=083-670-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message                 | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                               |

```json
{
    "status": "success",
    "data": [
        {
            "card_design_id": 2,
            "name": "First card design"
        },
        {
            "card_design_id": 3,
            "name": "Second card design"
        }
    ]
}
```

### Get ACS password

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed `getCardAcsPassword`                                                |
| api_version          | M | NS   |        | Fixed `1.1`                                                               |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| access_level         | O | N    | 0-1000 | If not provided, the value from the client's credentials will be used.    |
| card_id              | M | N    | 1-20   |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "getCardAcsPassword",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "access_level": 0,
    "card_id": 123528
}
```

#### Response
| Parameter           | M | Type | Description                                                                                                                                                                                                                                                                      |
|---------------------|---|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status              | M | A    | `success` or `error`                                                                                                                                                                                                                                                             |
| data                | C | OBJ  | Response data object. Mandatory if status = `success`                                                                                                                                                                                                                            |
| data / acs_password | M | AN   | ACS password. Agreeable, can be plain/encrypted/absent.                                                                                                                                                                                                                          |
| status_code         | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=getCardAcsPassword_-_Error_codes data-header-separator=_ data-filter-by-values=482-463-620-210-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1663-1671-000-9999 } Mandatory if status = `error`. |
| message             | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                     |

```json
{
    "status": "success",
    "data": {
        "acs_password": "0rF0Bh"
    }
}
```

### Change ACS password

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter            | M | Type | Length | Description                                                               |
|----------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key           | M | AN   | 20     |                                                                           |
| access_api_id        | M | AN   |        |                                                                           |
| access_api_key       | M | AN   |        |                                                                           |
| action               | M | AN   |        | Fixed: `changeCardAcsPassword`                                            |
| api_version          | M | NS   |        | Fixed: `1.1`                                                              |
| request_reference_id | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens. |
| card_id              | M | N    | 1-20   |                                                                           |
| acs_password         | M | AN   | 6-128  |                                                                           |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeCardAcsPassword",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": 123528,
    "acs_password": "0rF0Bh"
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                        |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                               |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                             |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                        |
| status_code | C | N    | [`Possible error codes`](#appendix--enum--error-code){data-header=changeCardAcsPassword_-_Error_codes data-header-separator=_ data-filter-by-values=1443-1448-1444-1445-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                       |

```json
{
    "status": "success",
    "duplicated": 0,
    "data": []
}
```

### Change ACS authentication method

| URL  | Method | Header | Body            |
|------|--------|--------|-----------------|
| /api | POST   | empty  | \{request data} |

#### Request

| Parameter                          | M | Type | Length | Description                                                                                                 |
|------------------------------------|---|------|--------|-------------------------------------------------------------------------------------------------------------|
| access_key                         | M | AN   | 20     |                                                                                                             |
| access_api_id                      | M | AN   |        |                                                                                                             |
| access_api_key                     | M | AN   |        |                                                                                                             |
| action                             | M | AN   |        | Fixed: `changeCardAcsAuthMethod`                                                                            |
| api_version                        | M | NS   |        | Fixed: `1.1`                                                                                                |
| request_reference_id               | O | ANS  | 10-255 | Unique request identifier. Can contain only letters, numbers and hyphens.                                   |
| card_id                            | M | N    | 1-20   |                                                                                                             |
| acs_auth_method                    | M | N    | 1-20   | [`ACS authentication method`](#appendix--enum--acs-authentication-method)                                   |
| acs_external_client_integration_id | C | N    | 1-20   | Required if `acs_auth_method` = 3, 4, or 5, and the default ACS external client integration is not defined. |

```json
{
    "access_key": "%YOUR_ACCESS_KEY%",
    "access_api_id": "%YOUR_API_ID%",
    "access_api_key": "%YOUR_ACCESS_API_KEY%",
    "action": "changeCardAcsAuthMethod",
    "api_version": "1.1",
    "request_reference_id": "a54sdfdsFSDf87cvzxcv321",
    "card_id": 123528,
    "acs_auth_method": 1
}
```

#### Response

| Parameter   | M | Type | Description                                                                                                                                                                                                                                                                                          |
|-------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status      | M | A    | `success` or `error`                                                                                                                                                                                                                                                                                 |
| duplicated  | M | N    | `1` - request is duplicated, `0` - request is not duplicated. When duplicated = `1`, and the original request processing has finished, the original request response will be returned.                                                                                                               |
| data        | C | OBJ  | Response data object. Mandatory if status = `success`. Empty for this call.                                                                                                                                                                                                                          |
| status_code | C | N    | [`Possible error codes.`](#appendix--enum--error-code){data-header=changeCardAcsAuthMethod_-_Error_codes data-header-separator=_ data-filter-by-values=1443-1448-1444-1445-1438-1449-006-139-1439-1440-141-1734-475-009-1279-1280-1271-1671-2089-2090-2109-000-9999 } Mandatory if status = `error`. |
| message     | C | ANS  | Error message. Mandatory if status = `error`                                                                                                                                                                                                                                                         |

```json
{
    "status": "success",
    "data": [],
    "duplicated": 0
}
```