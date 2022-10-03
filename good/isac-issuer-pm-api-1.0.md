PROGRAM MANAGER API MANUAL
===========================

# Overview
## Notations

| Notation |    Meaning     |
|----------|----------------|
| M        | Mandatory      |
| O        | Optional       |
| C        | Conditional    |
| -        | Not applicable |

## Value Type Explained

| Notation  |             Meaning             |
|-----------|---------------------------------|
| Not blank | Not empty, not null, isset      |
| A         | Alphabetic chars only           |
| N         | Only numbers                    |
| NS        | Numeric with symbols value      |
| AN        | Alphanumeric value              |
| ANS       | Alphanumeric with symbols value |
| [1,2,3]   | Possible values: 1 or 2 or 3    |
| [1-3]     | Range from 1 to 3               |
| LIST      | List of values                  |
| OBJ       | Object with properties          |
| -         | Not applicable                  |

## Definitions

`Scheme` - payment network (Mastercard, VISA, UPI, etc);

`Platform` - any of ISAAC processors parts, modules, operations;

`Client` - service, TAI API user.

# Api methods
## Create New Card
### Request

|        Field name         | M |   Type    | Length |                                                                                                                   Description                                                                                                                   |
|---------------------------|---|-----------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key                | M | AN        | 20     |                                                                                                                                                                                                                                                 |
| access_api_id             | M | AN        |        |                                                                                                                                                                                                                                                 |
| access_api_key            | M | AN        |        |                                                                                                                                                                                                                                                 |
| action                    | M | AN        |        | Fixed “createCard”                                                                                                                                                                                                                              |
| api_version               | M | NS        |        | Fixed “1.0”                                                                                                                                                                                                                                     |
| card_program_id           | M | N         |        |                                                                                                                                                                                                                                                 |
| card_currency_ison        | O | N \| LIST | 3      | If not provided currency ison will be set by program’s default currency. If LIST provided account for each currency will be created and assigned to the card. First currency from the LIST will be marked as default currency for the card.     |
|                           |   |           |        | Note: if card_account_id provided, card_currency_ison must be empty.                                                                                                                                                                            |
| card_country_ison         | M | N         | 3      |                                                                                                                                                                                                                                                 |
| card_virtual              | M | [0,1]     |        | 0 - physical, 1 - virtual                                                                                                                                                                                                                       |
| card_reference_id         | O | AN        | 1-20   | Reference ID in client’s system.                                                                                                                                                                                                                |
| card_name_line_3          | M | ANS       | 3-26   |                                                                                                                                                                                                                                                 |
| card_name_line_4          | O | ANS       | 2-50   |                                                                                                                                                                                                                                                 |
| card_product_id           | O | N         | 1-20   | If not provided default card product id will be set by program.                                                                                                                                                                                 |
| card_fee_group_id         | O | N         | 1-20   | If not provided default fee group id will be set by program.                                                                                                                                                                                    |
| card_limit_group_id       | O | N         | 1-20   | If not provided default limit group id will be set by program.                                                                                                                                                                                  |
| card_usage_group_id       | O | N         | 1-20   | If not provided default card usage group id will be set by program.                                                                                                                                                                             |
| card_design_id            | O | N         | 1-20   | If not provided default card design id will be set by program.                                                                                                                                                                                  |
| card_account_id           | O | N \| LIST | 1-20   | If not provided new account(s) will be created for provided currency(ies), overwise card will be assigned to the account(s).                                                                                                                    |
|                           |   |           |        | Note: if card_currency_ison is provided, card_account_id must be empty.                                                                                                                                                                         |
| card_account_owner_id     | C | N \| LIST | 1-20   | Card holder id(s) of the account(s) provided in the card_account_id field. Mandatory if card_account_id is provided. If card_account_id is a LIST then a LIST should be provided of the account owners for each account maintaining same order. |
| card_thermal_line_1       | O | ANS       | 1-50   | Text for thermal line1.                                                                                                                                                                                                                         |
| card_thermal_line_2       | O | ANS       | 1-50   | Text for thermal line2.                                                                                                                                                                                                                         |
| cardholder_id             | O | N         | 1-20   | If not provided new cardholder will be registered otherwise existing cardholder will be assigned.                                                                                                                                               |
| cardholder_title          | O | ANS       | 1-7    | Optional if cardholder_id isn’t provided.                                                                                                                                                                                                       |
| cardholder_first_name     | C | ANS       | 1-50   | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_last_name      | C | ANS       | 1-50   | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_address_line_1 | C | ANS       | 1-100  | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_address_line_2 | O | ANS       | 1-100  | Optional if cardholder_id isn’t provided.                                                                                                                                                                                                       |
| cardholder_address_line_3 | O | ANS       | 1-100  | Optional if cardholder_id isn’t provided.                                                                                                                                                                                                       |
| cardholder_address_line_4 | O | ANS       | 1-100  | Optional if cardholder_id isn’t provided.                                                                                                                                                                                                       |
| cardholder_country_ison   | C | N         | 3      | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_zipcode        | C | ANS       | 1-9    | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_city           | C | ANS       | 1-50   | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| cardholder_state          | O | ANS       | 1-50   |                                                                                                                                                                                                                                                 |
| cardholder_phone_number   | C | N         | 6-15   | Mandatory if cardholder_id isn’t provided.                                                                                                                                                                                                      |
| delivery_title            | O | ANS       | 1-7    | Will be ignored for virtual cards.                                                                                                                                                                                                              |
| delivery_first_name       | C | ANS       | 1-50   | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_last_name        | C | ANS       | 1-50   | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_address_line_1   | C | ANS       | 1-100  | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_address_line_2   | O | ANS       | 1-100  | Will be ignored for virtual cards.                                                                                                                                                                                                              |
| delivery_address_line_3   | O | ANS       | 1-100  | Will be ignored for virtual cards.                                                                                                                                                                                                              |
| delivery_address_line_4   | O | ANS       | 1-100  | Will be ignored for virtual cards.                                                                                                                                                                                                              |
| delivery_country_ison     | C | N         | 3      | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_zipcode          | C | ANS       | 1-9    | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_city             | C | ANS       | 1-50   | Mandatory for physical card order.                                                                                                                                                                                                              |
| delivery_state            | O | ANS       | 1-50   |                                                                                                                                                                                                                                                 |
| order_shipping_method     | C | N         | 1-20   | Mandatory for physical card order.                                                                                                                                                                                                              |
| order_delivery_code       | O | AN        | 1-10   | Will be ignored for virtual cards.                                                                                                                                                                                                              |
| order_fulfil_1            | O | AN        | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                    |
| order_fulfil_2            | O | AN        | 1-10   | Additional fulfillment parameter, possible values must be agreed separately.                                                                                                                                                                    |
| order_language            | O | A         | 3      | Language for carrier content.                                                                                                                                                                                                                   |
| bulk_address_line_1       | C | ANS       | 1-100  | Mandatory for bulk orders (order_delivery_code is provided).                                                                                                                                                                                    |
| bulk_address_line_2       | O | ANS       | 1-100  | Used only for bulk orders.                                                                                                                                                                                                                      |
| bulk_address_line_3       | O | ANS       | 1-100  | Used only for bulk orders.                                                                                                                                                                                                                      |
| bulk_address_line_4       | O | ANS       | 1-100  | Used only for bulk orders.                                                                                                                                                                                                                      |
| bulk_country_ison         | C | N         | 3      | Mandatory for bulk orders (order_delivery_code is provided).                                                                                                                                                                                    |
| bulk_zipcode              | C | ANS       | 1-9    | Mandatory for bulk orders (order_delivery_code is provided).                                                                                                                                                                                    |
| bulk_city                 | C | ANS       | 1-50   | Mandatory for bulk orders (order_delivery_code is provided).                                                                                                                                                                                    |
| bulk_state                | O | ANS       | 1-50   |                                                                                                                                                                                                                                                 |

### Response


|        Field name         | M | Type |                                             Description                                              |
|---------------------------|---|------|------------------------------------------------------------------------------------------------------|
| status                    | M | A    | success / error                                                                                      |
| data                      | C | OBJ  | Response data object. Mandatory if status = success                                                  |
| data / card_id            | M | N    | Card id.                                                                                             |
| data / card_request_id    | M | N    | Card number id                                                                                       |
| data / cardholder_id      | M | N    | Cardholder id.                                                                                       |
| data / card_account_id    | M | N    | Default card account id.                                                                             |
| data / pan                | O | N    | Permanent account number. Agreeable, can be plain/masked/encrypted/absent.                           |
| data / pin                | O | N    | Pin code. Agreeable, can be plain/encrypted/absent. Note: For virtual card this field will be empty. |
| data / cvc2               | O | N    | Card verification code 2. Agreeable, can be plain/encrypted/absent.                                  |
| data / expiration         | O | OBJ  | Expiration date object. Agreeable, can be present or absent.                                         |
| data / expiration / year  | M | N    | Card expiration year.                                                                                |
| data / expiration / month | M | N    | Card expiration month.                                                                               |
| status_code               | C | N    | Error code. Mandatory if status = error.                                                             |
| message                   | C | ANS  | Error message. Mandatory if status = error.                                                          |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "createCard",
    "api_version": "1.0",
    "card_program_id": 1,
    "card_currency_ison": "826",
    "card_country_ison": "826",
    "card_virtual": 0,
    "card_reference_id": "123456",
    "card_name_line_3": "John",
    "card_name_line_4": "Smith",
    "card_product_id": "1",
    "card_fee_group_id": "1",
    "card_limit_group_id": "1",
    "card_usage_group_id": "1",
    "card_design_id": "1",
    "cardholder_title": "Mr",
    "cardholder_first_name": "John",
    "cardholder_last_name": "Smith",
    "cardholder_address_line_1": "Bridge St",
    "cardholder_country_ison": 826,
    "cardholder_zipcode": "SW1A 2PW",
    "cardholder_city": "Westminster",
    "cardholder_state": "London",
    "cardholder_phone_number": "142544544",
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
    "bulk_state": "London"
}
```


### Response simple

```json
{
    "status": "success",
    "data": {
        "card_id": "123528",
        "card_request_id": "123528",
        "card_holder_id": "206",
        "card_account_id": "206",
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

## Activate Card


### Request


|      Field name       | M | Type |   Length   |          Description          |
|-----------------------|---|------|------------|-------------------------------|
| access_key            | M | AN   | 20         |                               |
| access_api_id         | M | AN   |            |                               |
| access_api_key        | M | AN   |            |                               |
| action                | M | AN   |            | Fixed “activateCard”          |
| api_version           | M | NS   |            | Fixed “1.0”                   |
| card_id               | M | N    | 1-20       |                               |
| card_pan              | O | N    | 16-19      | If present will be validated. |
| card_cvc2             | O | N    | 3          | If present will be validated. |
| card_expiration_year  | O | N    | 4          | If present will be validated. |
| card_expiration_month | O | N    | 2          | If present will be validated. |
| card_request_id       | O | N    | 1-20       | If present will be validated. |

### Response

| Field name  | M | Type |                                Description                                |
|-------------|---|------|---------------------------------------------------------------------------|
| status      | M | A    | success / error.                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call. |
| status_code | C | N    | Error code. Mandatory if status = error.                                  |
| message     | C | ANS  | Error message. Mandatory if status = error.                               |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "activateCard",
    "api_version": "1.0",
    "card_id": "123528",
    "card_pan": "5500010020001056",
    "card_cvc2": "075",
    "card_expiration_year": "2021",
    "card_expiration_month": "09"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Change Card Status
### Request


|   Field name   | M | Type | Length |                                                                                          Description                                                                                           |
|----------------|---|------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| access_key     | M | AN   | 20     |                                                                                                                                                                                                |
| access_api_id  | M | AN   |        |                                                                                                                                                                                                |
| access_api_key | M | AN   |        |                                                                                                                                                                                                |
| action         | M | AN   |        | Fixed “changeCardStatus”                                                                                                                                                                       |
| api_version    | M | NS   |        | Fixed “1.0”                                                                                                                                                                                    |
| card_id        | M | N    | 1-20   |                                                                                                                                                                                                |
| status         | M | A    | 1      | [Appendix E](#appendix-e-card-status) Note: Card status can be changed only if card was activated by calling `ActivateCard` method. <br> Blocked card status "B" is final and can't be undone. |

### Response

| Field name  | M | Type |                                Description                                |
|-------------|---|------|---------------------------------------------------------------------------|
| status      | M | A    | success / error.                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call. |
| status_code | C | N    | Error code. Mandatory if status = error.                                  |
| message     | C | ANS  | Error message. Mandatory if status = error.                               |

### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "changeCardStatus",
    "api_version": "1.0",
    "card_id": "123528",
    "status": "T"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Get Card Status
### Request

|   Field name   | M | Type |   Length    |      Description      |
|----------------|---|------|-------------|-----------------------|
| access_key     | M | AN   | 20          |                       |
| access_api_id  | M | AN   |             |                       |
| access_api_key | M | AN   |             |                       |
| action         | M | AN   |             | Fixed “getCardStatus” |
| api_version    | M | NS   |             | Fixed “1.0”           |
| card_id        | M | N    | 1-20        |                       |

### Response

|     Field name     | M | Type |                     Description                      |
|--------------------|---|------|------------------------------------------------------|
| status             | M | A    | success / error.                                     |
| data               | C | OBJ  | Response data object. Mandatory if status = success. |
| data / card_status | M | A    | Card status. [Appendix E](#appendix-e-card-status)   |
| status_code        | C | N    | Error code. Mandatory if status = error.             |
| message            | C | ANS  | Error message. Mandatory if status = error.          |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardStatus",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response sample

```json
{
    "status": "success",
        "data": {
            "card_status": "T"
        }
}
```

## Load
### Request


|    Field name    | M | Type | Length |                                Description                                |
|------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key       | M | AN   | 20     |                                                                           |
| access_api_id    | M | AN   |        |                                                                           |
| access_api_key   | M | AN   |        |                                                                           |
| action           | M | AN   |        | Fixed “load”                                                              |
| api_version      | M | NS   |        | Fixed “1.0”                                                               |
| card_id          | M | N    | 1-20   |                                                                           |
| amount           | M | N    | 1-15   | Amount in minor currency units. (i.e. 500 for 5.00USD; 215 for 2.15 EUR). |
| currency_ison    | M | N    | 3      |                                                                           |
| reference_number | O | AN   | 1-20   |                                                                           |
| description      | O | AN   | 37     |                                                                           |
| load_type        | O | N    | 1-11   | [Appendix C](#appendix-c-load-type)                                       |
| load_source      | O | N    | 1-11   | [Appendix B](#appendix-b-load-source)                                     |

### Response

|        Field name        | M | Type |                     Description                      |
|--------------------------|---|------|------------------------------------------------------|
| status                   | M | A    | success / error                                      |
| data                     | C | OBJ  | Response data object. Mandatory if status = success. |
| data / transaction_id    | M | N    | Transaction id.                                      |
| data / available_balance | M | N    | Available card balance.                              |
| data / settled_balance   | M | N    | Settled card balance.                                |
| status_code              | C | N    | Error code. Mandatory if status = error.             |
| message                  | C | ANS  | Error message. Mandatory if status = error.          |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "load",
    "api_version": "1.0",
    "card_id": "123528",
    "amount": "500",
    "currency_ison": "826",
    "reference_number": "123528",
    "description": "Money Load",
    "load_type": "0",
    "load_source": "0"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "transaction_id": "15476455061537",
        "available_balance": 500,
        "settled_balance": 500
    }
}
```

## Unload
### Request


|    Field name    | M | Type | Length |                                Description                                |
|------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key       | M | AN   | 20     |                                                                           |
| access_api_id    | M | AN   |        |                                                                           |
| access_api_key   | M | AN   |        |                                                                           |
| action           | M | AN   |        | Fixed “unload”                                                            |
| api_version      | M | NS   |        | Fixed “1.0”                                                               |
| card_id          | M | N    | 1-20   |                                                                           |
| amount           | M | N    | 1-15   | Amount in minor currency units. (i.e. 500 for 5.00USD; 215 for 2.15 EUR). |
| currency_ison    | M | N    | 3      |                                                                           |
| description      | O | AN   | 37     |                                                                           |
| reference_number | O | AN   | 1-20   |                                                                           |
| load_type        | O | N    | 1-11   | [Appendix C](#appendix-c-load-type)                                       |
| load_source      | O | N    | 1-11   | [Appendix B](#appendix-b-load-source)                                     |

### Response

|        Field name        | M | Type |                     Description                      |
|--------------------------|---|------|------------------------------------------------------|
| status                   | M | A    | success / error.                                     |
| data                     | C | OBJ  | Response data object. Mandatory if status = success. |
| data / transaction_id    | M | N    | Transaction id.                                      |
| data / available_balance | M | N    | Available card balance.                              |
| data / settled_balance   | M | N    | Settled card balance.                                |
| status_code              | C | N    | Error code. Mandatory if status = error.             |
| message                  | C | ANS  | Error message. Mandatory if status = error.          |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "unload",
    "api_version": "1.0",
    "card_id": "123528",
    "amount": "500",
    "currency_ison": "826",
    "reference_number": "123528",
    "description": "Money Unload",
    "load_type": "0",
    "load_source": "0"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "transaction_id": "15476463126878",
        "available_balance": 500,
        "settled_balance": 500
    }
}
```

## Credit Adjustment

### Request


|    Field name    | M | Type | Length |                                Description                                |
|------------------|---|------|--------|---------------------------------------------------------------------------|
| access_key       | M | AN   | 20     |                                                                           |
| access_api_id    | M | AN   |        |                                                                           |
| access_api_key   | M | AN   |        |                                                                           |
| action           | M | AN   |        | Fixed “creditAdjustment”                                                  |
| api_version      | M | NS   |        | Fixed “1.0”                                                               |
| card_id          | M | N    | 1-20   |                                                                           |
| amount           | M | N    | 1-15   | Amount in minor currency units. (i.e. 500 for 5.00USD; 215 for 2.15 EUR). |
| description      | O | AN   | 37     |                                                                           |
| currency_ison    | M | N    | 3      |                                                                           |
| reference_number | O | AN   | 1-20   |                                                                           |

### Response


|        Field name        | M | Type |                     Description                     |
|--------------------------|---|------|-----------------------------------------------------|
| status                   | M | A    | success / error                                     |
| data                     | C | OBJ  | Response data object. Mandatory if status = success |
| data / transaction_id    | M | N    | Transaction id                                      |
| data / available_balance | M | N    | Available card balance                              |
| data / settled_balance   | M | N    | Settled card balance                                |
| status_code              | C | N    | Error code. Mandatory if status = error             |
| message                  | C | ANS  | Error message. Mandatory if status = error          |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "creditAdjustment",
    "api_version": "1.0",
    "card_id": "123528",
    "amount": "500",
    "currency_ison": "826",
    "reference_number": "123528",
    "description": "Credit Adjustment"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "transaction_id": "15476463906007",
        "available_balance": 1000,
        "settled_balance": 1000
    }
}
```

## Debit Adjustment
### Request


|    Field name    | M | Type | Length |                               Description                                |
|------------------|---|------|--------|--------------------------------------------------------------------------|
| access_key       | M | AN   | 20     |                                                                          |
| access_api_id    | M | AN   |        |                                                                          |
| access_api_key   | M | AN   |        |                                                                          |
| action           | M | AN   |        | Fixed “debitAdjustment”                                                  |
| api_version      | M | NS   |        | Fixed “1.0”                                                              |
| card_id          | M | N    | 1-20   |                                                                          |
| amount           | M | N    | 1-15   | Amount in minor currency units. (i.e. 500 for 5.00USD; 215 for 2.15 EUR) |
| currency_ison    | M | N    | 3      |                                                                          |
| description      | O | AN   | 37     |                                                                          |
| reference_number | O | AN   | 1-20   |                                                                          |

### Response


|        Field name        | M | Type |            Description                              |
|--------------------------|---|------|-----------------------------------------------------|
| status                   | M | A    | success / error                                     |
| data                     | C | OBJ  | Response data object. Mandatory if status = success |
| data / transaction_id    | M | N    | Transaction id                                      |
| data / available_balance | M | N    | Available card balance                              |
| data / settled_balance   | M | N    | Settled card balance                                |
| status_code              | C | N    | Error code. Mandatory if status = error             |
| message                  | C | ANS  | Error message. Mandatory if status = error          |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "debitAdjustment",
    "api_version": "1.0",
    "card_id": "123528",
    "amount": "500",
    "currency_ison": "826",
    "reference_number": "123528",
    "description": "Debit Adjustment"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "transaction_id": "15476465713077",
        "available_balance": 500,
        "settled_balance": 500
    }
}
```

## Get Card Accounts
### Request


|   Field name   | M | Type | Length |       Description       |
|----------------|---|------|--------|-------------------------|
| access_key     | M | AN   | 20     |                         |
| access_api_id  | M | AN   |        |                         |
| access_api_key | M | AN   |        |                         |
| action         | M | AN   |        | Fixed “getCardAccounts” |
| api_version    | M | NS   |        | Fixed “1.0”             |
| card_id        | M | N    | 1-20   |                         |

### Response

|        Field name        | M | Type |                               Description                                |
|--------------------------|---|------|--------------------------------------------------------------------------|
| status                   | M | A    | success / error                                                          |
| data                     | C | OBJ  | Response data object. Mandatory if status = success                      |
| data / id                | M | N    | Account id                                                               |
| data / cardholder_id     | M | N    | Account owner id                                                         |
| data / currency_ison     | M | N    | Account currency ison                                                    |
| data / available_balance | M | N    | Available card balance                                                   |
| data / settled_balance   | M | N    | Settled card balance                                                     |
| data / reserved_balance  | M | N    | Reserved balance. Funds suspended by processor till dispute is resolved. |
| data / account_status    | M | A    | Account status. [Appendix D](#appendix-d-account-status)                 |
| data / date_updated      | M | N    | Unix timestamp of last account activity.                                 |
| status_code              | C | N    | Error code. Mandatory if status = error                                  |
| message                  | C | ANS  | Error message. Mandatory if status = error                               |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardAccounts",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "id": "206",
            "cardholder_id": "206",
            "currency_ison": "826",
            "available_balance": "500",
            "settled_balance": "500",
            "reserved_balance": "0",
            "account_status": "A",
            "date_updated": 1547649491
        }
    ]
}
```

## Get Cardholder Accounts
### Request

|   Field name   | M | Type | Length |          Description          |
|----------------|---|------|--------|-------------------------------|
| access_key     | M | AN   | 20     |                               |
| access_api_id  | M | AN   |        |                               |
| access_api_key | M | AN   |        |                               |
| action         | M | AN   |        | Fixed “getCardholderAccounts” |
| api_version    | M | NS   |        | Fixed “1.0”                   |
| cardholder_id  | M | N    | 1-20   |                               |

### Response

|        Field name        | M | Type |                               Description                                |
|--------------------------|---|------|--------------------------------------------------------------------------|
| status                   | M | A    | success / error                                                          |
| data                     | C | LIST | Response data object list. Mandatory if status = success                 |
| data / id                | M | N    | Account id                                                               |
| data / cardholder_id     | M | N    | Account owner id                                                         |
| data / currency_ison     | M | N    | Account currency ison                                                    |
| data / available_balance | M | N    | Available card balance                                                   |
| data / settled_balance   | M | N    | Settled card balance                                                     |
| data / reserved_balance  | M | N    | Reserved balance. Funds suspended by processor till dispute is resolved. |
| data / account_status    | M | A    | [Appendix D](#appendix-d-account-status)                                 |
| data / date_updated      | M | N    | Unix timestamp of last account activity.                                 |
| status_code              | C | N    | Error code. Mandatory if status = error                                  |
| message                  | C | ANS  | Error message. Mandatory if status = error                               |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardholderAccounts",
    "api_version": "1.0",
    "cardholder_id": "206"
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "id": "206",
            "cardholder_id": "206",
            "currency_ison": "826",
            "available_balance": "500",
            "settled_balance": "500",
            "reserved_balance": "0",
            "account_status": "A",
            "date_updated": 1547649491
        }
    ]
}
```

## Change Account Status
### Request


|   Field name   | M | Type | Length |               Description                |
|----------------|---|------|--------|------------------------------------------|
| access_key     | M | AN   | 20     |                                          |
| access_api_id  | M | AN   |        |                                          |
| access_api_key | M | AN   |        |                                          |
| action         | M | AN   |        | Fixed “changeAccountStatus”              |
| api_version    | M | NS   |        | Fixed “1.0”                              |
| account_id     | M | N    | 1-20   |                                          |
| account_status | M | S    | 1      | [Appendix D](#appendix-d-account-status) |

### Response


| Field name  | M | Type |                               Description                                |
|-------------|---|------|--------------------------------------------------------------------------|
| status      | M | A    | success / error                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call |
| status_code | C | N    | Error code. Mandatory if status = error                                  |
| message     | C | ANS  | Error message. Mandatory if status = error                               |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "changeAccountStatus",
    "api_version": "1.0",
    "account_id": "206",
    "account_status": "R"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Get Pin
### Request

|   Field name   | M | Type | Length |  Description   |
|----------------|---|------|--------|----------------|
| access_key     | M | AN   | 20     |                |
| access_api_id  | M | AN   |        |                |
| access_api_key | M | AN   |        |                |
| action         | M | AN   |        | Fixed “getPin” |
| api_version    | M | NS   |        | Fixed “1.0”    |
| card_id        | M | N    | 1-20   |                |

### Response

| Field name  | M | Type |                     Description                     |
|-------------|---|------|-----------------------------------------------------|
| status      | M | A    | success / error                                     |
| data        | C | OBJ  | Response data object. Mandatory if status = success |
| data / pin  | M | N    | Card pin code. Agreeable, can be plain/encrypted    |
| status_code | C | N    | Error code. Mandatory if status = error             |
| message     | C | ANS  | Error message. Mandatory if status = error          |

### Request sample

```json
{

"access_key": "1a1a1a1a1a1a1aa1",
"access_api_id": " pm_api_id123",
"access_api_key": "1a1a1a1a1a1a1aa1a1a1",
"action": "getPin",
"api_version": "1.0",
"card_id": "123528"

}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "pin": "1234"
    }
}
```

## Set Pin


### Request

|   Field name   | M | Type | Length |  Description   |
|----------------|---|------|--------|----------------|
| access_key     | M | AN   | 20     |                |
| access_api_id  | M | AN   |        |                |
| access_api_key | M | AN   |        |                |
| action         | M | AN   |        | Fixed “setPin” |
| api_version    | M | NS   |        | Fixed “1.0”    |
| card_id        | M | N    | 1-20   |                |
| pin            | M | N    | 4      |                |

### Response

| Field name  | M | Type |                               Description                                |
|-------------|---|------|--------------------------------------------------------------------------|
| status      | M | A    | success / error                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call |
| status_code | C | N    | Error code. Mandatory if status = error                                  |
| message     | C | ANS  | Error message. Mandatory if status = error                               |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "setPin",
    "api_version": "1.0",
    "card_id": "123528",
    "pin": "1234"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Unblock Pin

### Request

|   Field name   | M | Type | Length |    Description     |
|----------------|---|------|--------|--------------------|
| access_key     | M | AN   | 20     |                    |
| access_api_id  | M | AN   |        |                    |
| access_api_key | M | AN   |        |                    |
| action         | M | AN   |        | Fixed “unblockPin” |
| api_version    | M | NS   |        | Fixed “1.0”        |
| card_id        | M | N    | 1-20   |                    |

### Response

| Field name  | M | Type |                               Description                                |
|-------------|---|------|--------------------------------------------------------------------------|
| status      | M | A    | success / error                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call |
| status_code | C | N    | Error code. Mandatory if status = error                                  |
| message     | C | ANS  | Error message. Mandatory if status = error                               |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "unblockPin",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Get Card Number
### Request

|   Field name   | M | Type | Length |      Description      |
|----------------|---|------|--------|-----------------------|
| access_key     | M | AN   | 20     |                       |
| access_api_id  | M | AN   |        |                       |
| access_api_key | M | AN   |        |                       |
| action         | M | AN   |        | Fixed “getCardNumber” |
| api_version    | M | NS   |        | Fixed “1.0”           |
| card_id        | M | N    | 1-20   |                       |

### Response

| Field name  | M | Type |                              Description                              |
|-------------|---|------|-----------------------------------------------------------------------|
| status      | M | A    | success / error                                                       |
| data        | C | OBJ  | Response data object. Mandatory if status = success.                  |
| data / pan  | M | N    | Card primary account number. Agreeable, can be plain/masked/encrypted |
| status_code | C | N    | Error code. Mandatory if status = error                               |
| message     | C | ANS  | Error message. Mandatory if status = error                            |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardNumber",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "pan": "1234567891234567"
    }
}
```

## Assign Card To Fees Group
### Request

|   Field name   | M | Type | Length |          Description          |
|----------------|---|------|--------|-------------------------------|
| access_key     | M | AN   | 20     |                               |
| access_api_id  | M | AN   |        |                               |
| access_api_key | M | AN   |        |                               |
| action         | M | AN   |        | Fixed “assignCardToFeesGroup” |
| api_version    | M | NS   |        | Fixed “1.0”                   |
| card_id        | M | N    | 1-20   |                               |
| fees_group_id  | M | N    | 1-20   |                               |

### Response

| Field name  | M | Type |                               Description                                |
|-------------|---|------|--------------------------------------------------------------------------|
| status      | M | A    | success / error                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call |
| status_code | C | N    | Error code. Mandatory if status = error                                  |
| message     | C | ANS  | Error message. Mandatory if status = error                               |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "assignCardToFeesGroup",
    "api_version": "1.0",
    "card_id": "123528",
    "fees_group_id": "1"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Assign Card To Limits Group
### Request

|   Field name    | M | Type | Length |           Description           |
|-----------------|---|------|--------|---------------------------------|
| access_key      | M | AN   | 20     |                                 |
| access_api_id   | M | AN   |        |                                 |
| access_api_key  | M | AN   |        |                                 |
| action          | M | AN   |        | Fixed “assignCardToLimitsGroup” |
| api_version     | M | NS   |        | Fixed “1.0”                     |
| card_id         | M | N    | 1-20   |                                 |
| limits_group_id | M | N    | 1-20   |                                 |

### Response

| Field name  | M | Type |                               Description                                |
|-------------|---|------|--------------------------------------------------------------------------|
| status      | M | A    | success / error                                                          |
| data        | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call |
| status_code | C | N    | Error code. Mandatory if status = error                                  |
| message     | C | ANS  | Error message. Mandatory if status = error                               |



### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "assignCardToLimitsGroup",
    "api_version": "1.0",
    "card_id": "123528",
    "limits_group_id": "1"
}
```

### Response sample

```json
{
    "status": "success",
    "data": []
}
```

## Get Card Activity
### Request

|   Field name   | M | Type | Length |                         Description                         |
|----------------|---|------|--------|-------------------------------------------------------------|
| access_key     | M | AN   | 20     |                                                             |
| access_api_id  | M | AN   |        |                                                             |
| access_api_key | M | AN   |        |                                                             |
| action         | M | AN   |        | Fixed “getCardsActivity”                                    |
| api_version    | M | NS   |        | Fixed “1.0”                                                 |
| card_id        | O | N    | 1-20   | If not provided returns all program manager cards’ activity |
| date_from      | M | N    | 11     | Unix timestamp                                              |
| date_to        | M | N    | 11     | Unix timestamp                                              |
| paginator      | M | OBJ  |        | Paginator data object                                       |
| item_count     | M | N    | 1-11   | Item per page. Max 100.                                     |
| offset         | M | N    | 1-11   | Index of the first item                                     |

### Response

|            Field name             | M | Type |                                 Description                                                                                                                      |
|-----------------------------------|---|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                            | M | A    | success / error                                                                                                                                                  |
| data                              | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call                                                                                         |
| data / authorize_id               | M | N    |                                                                                                                                                                  |
| data / proc_code                  | M | N    |                                                                                                                                                                  |
| data / authorize_type             | M | N    | [Appendix F](#appendix-f--authorization-types)                                                                                                                   |
| data / card_present               | M | N    | 0 - card not present, 1 - card present                                                                                                                           |
| data / card_id                    | M | N    |                                                                                                                                                                  |
| data / trans_link                 | M | ANS  |                                                                                                                                                                  |
| data / transmission_date          | M | NS   | Example.: 2018-11-15                                                                                                                                             |
| data / transmission_time          | M | N    | Unix timestamp                                                                                                                                                   |
| data / billing_amount             | M | N    |                                                                                                                                                                  |
| data / billing_currency_ison      | M | N    |                                                                                                                                                                  |
| data / billing_conversion_rate    | M | N    |                                                                                                                                                                  |
| data / cardholder_amount          | M | N    |                                                                                                                                                                  |
| data / cardholder_currency_ison   | M | N    |                                                                                                                                                                  |
| data / stan                       | M | N    | System Trace Audit Number                                                                                                                                        |
| data / transaction_amount         | M | N    |                                                                                                                                                                  |
| data / transaction_currency_ison  | M | N    |                                                                                                                                                                  |
| data / transaction_fee_amount     | M | N    |                                                                                                                                                                  |
| data / auth_code                  | C | AN   | Authorization ID Response                                                                                                                                        |
| data / response_code              | M | AN   |                                                                                                                                                                  |
| data / transaction_local_time     | C | AN   | Transaction time from scheme (format: YYMMDDHHIISS) , example: 181114181211                                                                                      |
| data / retrieval_reference_number | C | AN   |                                                                                                                                                                  |
| data / country_ison               | C | N    |                                                                                                                                                                  |
| data / mcc                        | C | N    | Merchant category code                                                                                                                                           |
| data / merchant_name              | C | ANS  | Card acceptor name and location                                                                                                                                  |
| data / merchant_id                | C | ANS  | Card acceptor identification code                                                                                                                                |
| data / terminal_id                | C | ANS  | Card acceptor terminal identification                                                                                                                            |
| data / acquirer_id                | M | ANS  | Acquiring Institution ID                                                                                                                                         |
| data / forwarder_id               | C | ANS  | Forwarding Institution ID                                                                                                                                        |
| data / pos_data                   | C | ANS  | Point-of-Service (POS) Data                                                                                                                                      |
| data / pos_entry_mode             | C | ANS  | Point-of-Service (POS) Entry Mode                                                                                                                                |
| data / pos_condition_code         | C | ANS  | Point-of-Service (POS) Condition Code                                                                                                                            |
| data / reversal                   | M | N    | 1 - reversal, 0 - not reversal                                                                                                                                   |
| data / note                       | C | ANS  |                                                                                                                                                                  |
| data / trace_id                   | C | ANS  |                                                                                                                                                                  |
| data / trace_number               | C | ANS  |                                                                                                                                                                  |
| data / actual                     | M | N    | 1 - actual, 0 - not actual                                                                                                                                       |
| data / advice_reason_code         | C | N    |                                                                                                                                                                  |
| data / advice_detail_code         | C | N    |                                                                                                                                                                  |
| data / cashback_amount            | C | N    |                                                                                                                                                                  |
| data / transaction_type           | C | N    | [Appendix G](#appendix-g-transaction-types)                                                                                                                      |
| data / entry_mode_type            | C | N    | [Appendix H](#appendix-h-entry-mode-type)                                                                                                                        |
| data / pad_cumulative_amount      | C | N    | Calculated padding amount based on the existing padding config. It will be returned if padding is configured and was triggered with that particular transaction. |
| paginator                         | M | OBJ  |                                                                                                                                                                  |
| data / total_items_count          | M | N    |                                                                                                                                                                  |
| status_code                       | C | N    | Error code. Mandatory if status = error                                                                                                                          |
| message                           | C | ANS  | Error message. Mandatory if status = error                                                                                                                       |



### Request

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardsActivity",
    "api_version": "1.0",
    "card_id": "123528",
    "date_from": "1546304400",
    "date_to": "1547649027",
    "paginator":{
        "item_count":1,
        "offset":0
    }
}
```

### Response

```json
{
    "status": "success",
    "data": [
        {
            "authorize_id": "15472213500541",
            "proc_code": "000000",
            "authorize_type": "AP",
            "card_present": "0",
            "card_id": "123528",
            "trans_link": "385586000000MCCA00016000016190111123471",
            "transmission_date": "2019-01-11",
            "transmission_time": "1547221346",
            "billing_amount": "-12",
            "billing_currency_ison": "840",
            "billing_conversion_rate": "1.152945",
            "cardholder_amount": "-12",
            "cardholder_currency_ison": "840",
            "stan": "000016",
            "transaction_amount": "-10",
            "transaction_currency_ison": "978",
            "transaction_fee_amount": "0",
            "auth_code": "385586",
            "response_code": "01",
            "transaction_local_time": "",
            "retrieval_reference_number": "011100000016",
            "country_ison": "076",
            "mcc": "1520",
            "merchant_name": "mer11 Transaction des London BRA",
            "merchant_id": "SHP000000000014",
            "terminal_id": "pa1bra ",
            "acquirer_id": "019780",
            "forwarder_id": "200567",
            "pos_data": "1025104006000076902101234",
            "pos_entry_mode": "810",
            "pos_condition_code": null,
            "reversal": "0",
            "note": "Original billing amount: -12;",
            "trace_id": null,
            "trace_number": "MCCA000160114",
            "actual": "1",
            "advice_reason_code": null,
            "advice_detail_code": null,
            "cashback_amount": "0",
            "transaction_type": "2",
            "entry_mode_type": "3",
            "pad_cumulative_amount": null
        }
    ],
    "paginator": {
        "total_items_count": 2
    }
}
```

## Get Financial Authorizes

### Request

|   Field name   | M | Type | Length |                         Description                         |
|----------------|---|------|--------|-------------------------------------------------------------|
| access_key     | M | AN   | 20     |                                                             |
| access_api_id  | M | AN   |        |                                                             |
| access_api_key | M | AN   |        |                                                             |
| action         | M | AN   |        | Fixed “getFinancialAuthorizes”                              |
| api_version    | M | NS   |        | Fixed “1.0”                                                 |
| card_id        | O | N    | 1-20   | If not provided returns all program manager cards’ activity |
| date_from      | M | N    | 11     | Unix timestamp                                              |
| date_to        | M | N    | 11     | Unix timestamp                                              |
| paginator      | M | OBJ  |        | Paginator data object                                       |
| item_count     | M | N    | 1-11   | Items per page. Max 100.                                    |
| offset         | M | N    | 1-11   | Index of the first item                                     |

### Response

|            Field name            | M | Type |                                 Description                                 |
|----------------------------------|---|------|-----------------------------------------------------------------------------|
| status                           | M | A    | success / error                                                             |
| data                             | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call    |
| data / authorizes_id             | M | N    |                                                                             |
| data / proc_code                 | M | N    |                                                                             |
| data / card_id                   | M | N    |                                                                             |
| data / trans_link                | M | ANS  |                                                                             |
| data / transmission_date         | M | NS   | Example.: 2018-11-15                                                        |
| data / transmission_time         | M | N    | Unix timestamp                                                              |
| data / billing_amount            | M | N    |                                                                             |
| data / billing_currency_ison     | M | N    |                                                                             |
| data / billing_conversion_rate   | M | N    |                                                                             |
| data / cardholder_amount         | M | N    |                                                                             |
| data / cardholder_currency_ison  | M | N    |                                                                             |
| data / transaction_amount        | M | N    |                                                                             |
| data / transaction_currency_ison | M | N    |                                                                             |
| data / transaction_fee_amount    | M | N    |                                                                             |
| data / auth_code                 | C | AN   | Authorization ID Response                                                   |
| data / transaction_local_time    | C | AN   | Transaction time from scheme (format: YYMMDDHHIISS) , example: 181114181211 |
| data / mcc                       | C | N    | Merchant category code                                                      |
| data / cashback_amount           | C | N    |                                                                             |
| data / transaction_type          | C | N    | [Appendix G](#appendix-g-transaction-types)                                 |
| data / entry_mode_type           | C | N    | [Appendix H](#appendix-h-entry-mode-type)                                   |
| data / merchant_name             | C | ANS  | Card acceptor name and location                                             |
| data / merchant_id               | C | ANS  | Card acceptor identification code                                           |
| data / terminal_id               | C | ANS  | Card acceptor terminal identification                                       |
| data / acquirer_id               | M | ANS  | Acquiring Institution ID                                                    |
| data / country_ison              | C | N    |                                                                             |
| data / pos_data                  | C | ANS  | Point-of-Service (POS) Data. First authorize                                |
| data / pos_entry_mode            | C | ANS  | Point-of-Service (POS) Entry Mode. First authorize                          |
| data / note                      | C | ANS  |                                                                             |
| data / date_valid                | C | NS   | Example: 2018-12-17                                                         |
| data / response_code             | M | AN   |                                                                             |
| data / card_present              | C | N    | 0 - card not present, 1 - card present                                      |
| paginator                        | M | OBJ  |                                                                             |
| data / total\_ items_count       | M | N    |                                                                             |
| status_code                      | C | N    | Error code. Mandatory if status = error                                     |
| message                          | C | ANS  | Error message. Mandatory if status = error                                  |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getFinancialAuthorizes",
    "api_version": "1.0",
    "card_id": "123528",
    "date_from": "1546304400",
    "date_to": "1547649027",
    "paginator":{
        "item_count":1,
        "offset":0
    }
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "authorizes_id": "15472213500600",
            "proc_code": "000000",
            "card_id": "123528",
            "trans_link": "385586000000MCCA00016000016190111123471",
            "transmission_date": "2019-01-11",
            "transmission_time": "1547221346",
            "billing_amount": "-12",
            "billing_currency_ison": "840",
            "billing_conversion_rate": "1.152945",
            "cardholder_amount": "-12",
            "cardholder_currency_ison": "840",
            "transaction_amount": "-10",
            "transaction_currency_ison": "978",
            "transaction_fee_amount": "0",
            "auth_code": "385586",
            "transaction_local_time": "",
            "mcc": "1520",
            "cashback_amount": "0",
            "transaction_type": "2",
            "entry_mode_type": "3",
            "merchant_name": "mer11 Transaction des London BRA",
            "merchant_id": "SHP000000000014",
            "terminal_id": "pa1bra ",
            "acquirer_id": "019780",
            "country_ison": "076",
            "pos_data": "1025104006000076902101234",
            "pos_entry_mode": "810",
            "note": null,
            "date_valid": "2019-02-10",
            "card_present": "0"
        }
    ],
    "paginator": {
        "total_items_count": 3
    }
}
```

## Get Transactions

### Request

|   Field name   | M | Type | Length |                        Description                         |
|----------------|---|------|--------|------------------------------------------------------------|
| access_key     | M | AN   | 20     |                                                            |
| access_api_id  | M | AN   |        |                                                            |
| access_api_key | M | AN   |        |                                                            |
| action         | M | AN   |        | Fixed “getTransactions”                                    |
| api_version    | M | NS   |        | Fixed “1.0”                                                |
| card_id        | O | N    | 1-20   | If not provided returns all program manager cards activity |
| account_id     | O | N    | 1-20   | If not provided returns all program manager cards activity |
| date_from      | C | N    | 11     | If transaction ID not provided, Unix timestamp must be provided.         |
| date_to        | C | N    | 11     | If transaction ID not provided, Unix timestamp must be provided.         |
| transaction_id | C | N    | 20     | If date from and date to not provided, transaction ID must be provided.  |
| paginator      | M | OBJ  |        | Paginator data object                                      |
| item_count     | M | N    | 1-11   | Item per page. Max 100.                                    |
| offset         | M | N    | 1-11   | Index of the first item                                    |

### Response

|               Field name                | M | Type |                                 Description                                 |
|-----------------------------------------|---|------|-----------------------------------------------------------------------------|
| status                                  | M | A    | success / error                                                             |
| data                                    | C | OBJ  | Response data object. Mandatory if status = success. Empty for this call    |
| data / transaction_id                   | M | N    |                                                                             |
| data / mti                              | M | N    | Message type identifier                                                     |
| data / card_id                          | M | N    |                                                                             |
| data / account_id                       | M | N    |                                                                             |
| data / proc_code                        | M | N    |                                                                             |
| data / transaction_amount               | C | N    |                                                                             |
| data / transaction_currency_ison        | C | N    |                                                                             |
| data / reconciliation_amount            | C | N    |                                                                             |
| data / reconciliation_currency_ison     | C | N    |                                                                             |
| data / interchange_rate_designator      | C | N    |                                                                             |
| data / cardholder_billing_amount        | C | N    |                                                                             |
| data / cardholder_billing_currency_ison | C | N    |                                                                             |
| data / transaction_original_amount      | C | N    |                                                                             |
| data / reconciliation_original_amount   | C | N    |                                                                             |
| data / transaction_local_time           | C | AN   | Transaction time from scheme (format: YYMMDDHHIISS) , example: 181114181211 |
| data / settlement_date                  | C | N    | Example: 181207                                                             |
| data / reconciliation_date              | C | N    | Example: 181207                                                             |
| data / pos_entry_mode                   | C | ANS  | Point-of-Service (POS) Entry Mode.                                          |
| data / function_code                    | C | N    |                                                                             |
| data / mcc                              | C | N    | Merchant category code                                                      |
| data / acquirer_bin                     | C | N    | Acquiring Institution Bin                                                   |
| data / trans_link                       | M | ANS  |                                                                             |
| data / acquirer_processing_date         | C | AN   |                                                                             |
| data / acquirer_id                      | C | ANS  | Acquiring Institution ID                                                    |
| data / forwarder_id                     | C | ANS  | Forwarding Institution ID                                                   |
| data / merchant_terminal_id             | C | ANS  | Card acceptor terminal identification                                       |
| data / merchant_name                    | C | ANS  | Card acceptor name and location                                             |
| data / merchant_id                      | C | ANS  | Card acceptor identification code                                           |
| data / merchant_state                   | C | ANS  |                                                                             |
| data / merchant_country                 | C | ANS  | Alpha 3 code                                                                |
| data / cardholder_amount                | C | N    |                                                                             |
| data / cardholder_currency_ison         | C | N    |                                                                             |
| data / transaction_log_id               | C | N    |                                                                             |
| data / reason_code                      | C | NS   |                                                                             |
| data / auth_code                        | C | AN   | Authorization ID Response                                                   |
| data / retrieval_reference_number       | C | AN   |                                                                             |
| data / additional_data                  | C | ANS  |                                                                             |
| data / transaction_fee_amount           | C | N    | Mastercard fees are in renconciliation currency, Visa and UnionPay in holder billing currency. |
| data / parent_transaction_id            | C | N    |                                                                             |
| data / load_type                        | C | N    | [Appendix C](#appendix-c-load-type)                                         |
| data / load_source                      | C | N    | [Appendix B](#appendix-b-load-source)                                       |
| data / reference_number                 | C | ANS  |                                                                             |
| data / transaction_type                 | M | N    | [Appendix G](#appendix-g-transaction-types)                                 |
| data / entry_mode_type                  | M | N    | [Appendix H](#appendix-h-entry-mode-type)                                   |
| paginator                               | M | OBJ  |                                                                             |
| data / total\_ items_count              | M | N    |                                                                             |
| status_code                             | C | N    | Error code. Mandatory if status = error                                     |
| message                                 | C | ANS  | Error message. Mandatory if status = error                                  |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getTransactions",
    "api_version": "1.0",
    "card_id": "123528",
    "account_id": "123528",
    "date_from": "1546304400",
    "date_to": "1547649027",
    "transaction_id": "15472143331066",
    "paginator":{
        "item_count":1,
        "offset":0
    }
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "transaction_id": "15472143331066",
            "mti": "LOCL",
            "card_id": "123528",
            "account_id": "123528",
            "proc_code": "CU0000",
            "transaction_amount": "-10000",
            "transaction_currency_ison": "840",
            "reconciliation_amount": null,
            "reconciliation_currency_ison": null,
            "reconciliation_conversion_rate": null,
            "interchange_rate_designator": "75",
            "cardholder_billing_amount": "-10000",
            "cardholder_billing_currency_ison": "840",
            "transaction_original_amount": "0",
            "reconciliation_original_amount": "0",
            "transaction_local_time": null,
            "settlement_date": "190111",
            "reconciliation_date": null,
            "pos_entry_mode": null,
            "function_code": null,
            "mcc": null,
            "acquirer_bin": null,
            "trans_link": "1547214333123471CU0000TRANS5C389DFD1636C",
            "acquirer_processing_date": null,
            "acquirer_id": null,
            "forwarder_id": null,
            "merchant_terminal_id": null,
            "merchant_name": "UNLOAD",
            "merchant_id": null,
            "merchant_state": null,
            "merchant_country": null,
            "cardholder_amount": "-10000",
            "cardholder_currency_ison": "840",
            "transaction_log_id": null,
            "reason_code": null,
            "auth_code": null,
            "retrieval_reference_number": null,
            "additional_data": null,
            "transaction_fee_amount": "0",
            "parent_transaction_id": null,
            "load_type": null,
            "load_source": null,
            "reference_number": null,
            "entry_mode_type": "0",
            "transaction_type": "1"
        }
    ],
    "paginator": {
        "total_items_count": 6
    }
}
```

## Get Card Details


### Request

|   Field name   | M | Type | Length |      Description       |
|----------------|---|------|--------|------------------------|
| access_key     | M | AN   | 20     |                        |
| access_api_id  | M | AN   |        |                        |
| access_api_key | M | AN   |        |                        |
| action         | M | AN   |        | Fixed “getCardDetails” |
| api_version    | M | NS   |        | Fixed “1.0”            |
| card_id        | M | N    | 1-20   |                        |

### Response

|             Field name             | M | Type |                     Description                      |
|------------------------------------|---|------|------------------------------------------------------|
| status                             | M | A    | success / error                                      |
| data                               | C | OBJ  | Response data object. Mandatory if status = success. |
| data / card_id                     | M | N    | Card Id                                              |
| data / reference_number            | C | ANS  |                                                      |
| data / cardholder_id               | M | N    | Cardholder id                                        |
| data / primary_account_id          | M | N    | Primary card account id                              |
| data / virtual                     | M | N    | 0 - physical, 1 - virtual                            |
| data / program_id                  | M | N    |                                                      |
| data / invalid_pin_tries           | M | N    |                                                      |
| data / invalid_pin_tries_max_limit | M | N    |                                                      |
| data / product_id                  | M | N    |                                                      |
| data / sub_product_id              | M | N    |                                                      |
| data / fees_group_id               | C | N    |                                                      |
| data / limits_group_id             | C | N    |                                                      |
| data / usages_group_id             | C | N    |                                                      |
| data / status                      | M | N    | [Appendix E](#appendix-e-card-status)                |
| data / pin_status                  | M | N    | 0 - ok, 1 - blocked                                  |
| data / default_currency_ison       | M | N    |                                                      |
| data / country_ison                | M | N    |                                                      |
| data / service_code                | M | N    |                                                      |
| data / card_design_id              | M | N    |                                                      |
| data / name_line_3                 | C | ANS  |                                                      |
| data / name_line_4                 | C | ANS  |                                                      |
| data / expiry_month                | M | N    | Agreeable, can be present or absent                  |
| data / expiry_year                 | M | N    | Agreeable, can be present or absent                  |
| status_code                        | C | N    | Error code. Mandatory if status = error              |
| message                            | C | ANS  | Error message. Mandatory if status = error           |


### Request

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCardDetails",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response

```json
{
    "status": "success",
    "data": {
        "card_id": 123528,
        "reference_number": "123456",
        "cardholder_id": 206,
        "primary_account_id": 206,
        "virtual": 0,
        "program_id": 1,
        "invalid_pin_tries": 0,
        "invalid_pin_tries_max_limit": 5,
        "product_id": 1,
        "sub_product_id": 1,
        "fees_group_id": 1,
        "limits_group_id": 1,
        "usages_group_id": 1,
        "status": "A",
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

## Get CVC 2

### Request

|   Field name   | M | Type | Length |   Description   |
|----------------|---|------|--------|-----------------|
| access_key     | M | AN   | 20     |                 |
| access_api_id  | M | AN   |        |                 |
| access_api_key | M | AN   |        |                 |
| action         | M | AN   |        | Fixed “getCvc2” |
| api_version    | M | NS   |        | Fixed “1.0”     |
| card_id        | M | N    | 1-20   |                 |

### Response

| Field name  | M | Type |                            Description                             |
|-------------|---|------|--------------------------------------------------------------------|
| status      | M | A    | success / error                                                    |
| data        | C | OBJ  | Response data object. Mandatory if status = success                |
| data / cvc2 | M | N    | Card verification code 2. Agreeable, can be plain/encrypted/absent |
| status_code | C | N    | Error code. Mandatory if status = error                            |
| message     | C | ANS  | Error message. Mandatory if status = error                         |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getCvc2",
    "api_version": "1.0",
    "card_id": "123528"
}
```

### Response sample

```json
{
    "status": "success",
    "data": {
        "cvc2": "075"
    }
}
```

## Get Limits Groups

### Request

|   Field name   | M | Type | Length |              Description              |
|----------------|---|------|--------|---------------------------------------|
| access_key     | M | AN   | 20     |                                       |
| access_api_id  | M | AN   |        |                                       |
| access_api_key | M | AN   |        |                                       |
| action         | M | AN   |        | Fixed “getLimitsGroups”               |
| api_version    | M | NS   |        | Fixed “1.0”                           |
| limit_type     | M | N    | 1      | [Appendix I](#appendix-i-limit-types) |
| program_id     | O | N    | [1-20] |                                       |

### Response

| Field name  | M | Type |                       Description                        |
|-------------|---|------|----------------------------------------------------------|
| status      | M | A    | success / error                                          |
| data        | C | LIST | Response data object list. Mandatory if status = success |
| data / id   | M | N    | Limit group id                                           |
| data / name | M | ANS  | Limit group name                                         |
| status_code | C | N    | Error code. Mandatory if status = error                  |
| message     | C | ANS  | Error message. Mandatory if status = error               |


### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getLimitsGroups",
    "api_version": "1.0",
    "limit_type": "1",
    "program_id": "1"
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "id": 2,
            "name": "Test Corporate Standard limits group"
        },
        {
            "id": 3,
            "name": "Test Corporate highest limit group"
        }
    ]
}
```

## Get Fees Groups

### Request

|   Field name   | M | Type | Length |      Description      |
|----------------|---|------|--------|-----------------------|
| access_key     | M | AN   | 20     |                       |
| access_api_id  | M | AN   |        |                       |
| access_api_key | M | AN   |        |                       |
| action         | M | AN   |        | Fixed “getFeesGroups” |
| api_version    | M | NS   |        | Fixed “1.0”           |
| program_id     | O | N    | [1-20] |                       |

### Response

| Field name  | M | Type |                       Description                        |
|-------------|---|------|----------------------------------------------------------|
| status      | M | A    | success / error                                          |
| data        | C | LIST | Response data object list. Mandatory if status = success |
| data / id   | M | N    | Fees group id                                            |
| data / name | M | ANS  | Fees group name                                          |
| status_code | C | N    | Error code. Mandatory if status = error                  |
| message     | C | ANS  | Error message. Mandatory if status = error               |

### Request sample

```json
{
    "access_key": "1a1a1a1a1a1a1aa1",
    "access_api_id": " pm_api_id123",
    "access_api_key": "1a1a1a1a1a1a1aa1a1a1",
    "action": "getFeesGroups",
    "api_version": "1.0",
    "program_id": "1"
}
```

### Response sample

```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Test fee group"
        }
    ]
}
```

# Appendix A: Error Codes

| Code |                                                                     Description                                                                      |
|------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 001  | Incorrect card provided                                                                                                                              |
| 002  | Incorrect amount provided                                                                                                                            |
| 003  | Incorrect currency provided                                                                                                                          |
| 004  | Insufficient funds                                                                                                                                   |
| 005  | Incorrect program provided                                                                                                                           |
| 006  | Incorrect API key provided                                                                                                                           |
| 007  | Date not provided                                                                                                                                    |
| 008  | Provider Id must be provided                                                                                                                         |
| 009  | Incorrect method provided                                                                                                                            |
| 010  | Card already exists                                                                                                                                  |
| 011  | Card number not provided                                                                                                                             |
| 012  | Nameline not provided                                                                                                                                |
| 013  | Expiry month not provided                                                                                                                            |
| 014  | Expiry year not provided                                                                                                                             |
| 016  | CVV not provided                                                                                                                                     |
| 017  | PIN not provided                                                                                                                                     |
| 018  | First name not provided                                                                                                                              |
| 019  | Last name not provided                                                                                                                               |
| 020  | Address line 1 not provided                                                                                                                          |
| 021  | ZIP code not provided                                                                                                                                |
| 022  | City not provided                                                                                                                                    |
| 023  | Country not provided                                                                                                                                 |
| 024  | Default program currency is not set                                                                                                                  |
| 025  | Currencies rates is not provided                                                                                                                     |
| 026  | Status not provided                                                                                                                                  |
| 027  | Duplicate unique value. (trans_code, program_id, mcc_low and mcc_high)                                                                               |
| 028  | Fee save failed                                                                                                                                      |
| 029  | Can not delete fee                                                                                                                                   |
| 030  | Selected invalid fees group                                                                                                                          |
| 031  | Selected invalid trans code                                                                                                                          |
| 032  | Can not delete limitation group                                                                                                                      |
| 033  | Selected invalid limitation group                                                                                                                    |
| 034  | Selected invalid period                                                                                                                              |
| 035  | Selected invalid opt type                                                                                                                            |
| 036  | Selected invalid type                                                                                                                                |
| 037  | Can not delete limitation                                                                                                                            |
| 038  | That limitation already exists                                                                                                                       |
| 039  | There are active limitations                                                                                                                         |
| 040  | Limit exceeded                                                                                                                                       |
| 041  | Can not delete program                                                                                                                               |
| 042  | Transaction with the same reference already exists                                                                                                   |
| 043  | Trans code is not provided                                                                                                                           |
| 044  | MCC low is not provided                                                                                                                              |
| 045  | Can not delete pad(s)                                                                                                                                |
| 046  | Card type not provided                                                                                                                               |
| 047  | Program configuration error                                                                                                                          |
| 048  | Card virtual status not provided                                                                                                                     |
| 049  | State not provided                                                                                                                                   |
| 050  | Incorrect shipping method                                                                                                                            |
| 051  | Product configuration error                                                                                                                          |
| 052  | Card processor error                                                                                                                                 |
| 053  | Delivery address line not provided                                                                                                                   |
| 055  | Delivery city not provided                                                                                                                           |
| 057  | Delivery country not provided                                                                                                                        |
| 056  | Delivery state not provided                                                                                                                          |
| 054  | Delivery ZIP code not provided                                                                                                                       |
| 058  | Limits group external Id must be provided                                                                                                            |
| 059  | Limits group Id must be provided                                                                                                                     |
| 060  | Limit group not found                                                                                                                                |
| 061  | Limit name must be provided                                                                                                                          |
| 062  | Limit count must be provided                                                                                                                         |
| 063  | Limit duration must be provided                                                                                                                      |
| 064  | Limit type must be provided                                                                                                                          |
| 065  | Country id must be numeric                                                                                                                           |
| 066  | Incorrect mcc provided                                                                                                                               |
| 067  | Limit not found                                                                                                                                      |
| 068  | mmc high must be bigger than mmc low                                                                                                                 |
| 069  | Parameter fees group Id is missing.                                                                                                                  |
| 070  | Unknown error please refresh the page and try again.                                                                                                 |
| 071  | Scheme not provided.                                                                                                                                 |
| 072  | Invalid card pin provided.                                                                                                                           |
| 073  | Group with assigned data cannot be deleted.                                                                                                          |
| 074  | Program name not provided.                                                                                                                           |
| 075  | Default currency not provided.                                                                                                                       |
| 076  | Default limits group not provided.                                                                                                                   |
| 077  | Default fees group not provided.                                                                                                                     |
| 078  | Scheme not provided.                                                                                                                                 |
| 079  | Card design not provided.                                                                                                                            |
| 080  | Cards provider not provided.                                                                                                                         |
| 081  | Cards purpose not provided.                                                                                                                          |
| 082  | Cards issuer not provided.                                                                                                                           |
| 083  | Program not found.                                                                                                                                   |
| 084  | Can’t delete program with cards.                                                                                                                     |
| 085  | Program contact type required.                                                                                                                       |
| 086  | Fees group not found.                                                                                                                                |
| 087  | Limit tx type not found.                                                                                                                             |
| 088  | Program card type not provided.                                                                                                                      |
| 089  | Program must be marked as virtual or not virtual.                                                                                                    |
| 090  | Cards product is required.                                                                                                                           |
| 091  | Cards product not found.                                                                                                                             |
| 098  | Cards sub product not found.                                                                                                                         |
| 092  | Cards product name is required.                                                                                                                      |
| 093  | Cards product ID is required.                                                                                                                        |
| 094  | Card sub product ID is required.                                                                                                                     |
| 095  | Card sub product countries ID is required.                                                                                                           |
| 096  | GPS product ID is required.                                                                                                                          |
| 097  | Card sub product is required.                                                                                                                        |
| 106  | Is virtual attribute is required.                                                                                                                    |
| 099  | GPS sub product must be unique.                                                                                                                      |
| 105  | Card sub product must be unique.                                                                                                                     |
| 100  | Processing error                                                                                                                                     |
| 101  | Parameter "name" is missing.                                                                                                                         |
| 102  | Parameter "name" is missing.                                                                                                                         |
| 103  | Card purpose not found.                                                                                                                              |
| 104  | Scheme not found.                                                                                                                                    |
| 107  | Cards printer not provided.                                                                                                                          |
| 108  | Incorrect card program provided                                                                                                                      |
| 109  | Incorrect card product bin range                                                                                                                     |
| 110  | Incorrect card sub product bin range                                                                                                                 |
| 111  | Title is too long                                                                                                                                    |
| 112  | Can’t create card with this bin range                                                                                                                |
| 113  | Cards printer name is required.                                                                                                                      |
| 114  | CVV service code is required.                                                                                                                        |
| 115  | Invalid printer code                                                                                                                                 |
| 116  | Invalid printer id                                                                                                                                   |
| 117  | Invalid shipping method id                                                                                                                           |
| 118  | Missing parameters                                                                                                                                   |
| 119  | Delivery address change is restricted                                                                                                                |
| 120  | Title not provided                                                                                                                                   |
| 121  | Card id not provided                                                                                                                                 |
| 122  | Shipping name not provided                                                                                                                           |
| 123  | Clients not provided                                                                                                                                 |
| 124  | Name not provided                                                                                                                                    |
| 125  | Tag not provided                                                                                                                                     |
| 126  | Incorrect card issuer provided                                                                                                                       |
| 127  | Design code not provided                                                                                                                             |
| 128  | Default usages group not provided.                                                                                                                   |
| 129  | Usage group not found                                                                                                                                |
| 130  | Parameter name is missing.                                                                                                                           |
| 131  | Parameter system usages is missing.                                                                                                                  |
| 132  | Parameter usages is missing.                                                                                                                         |
| 133  | Parameter group id is missing.                                                                                                                       |
| 134  | Card usage not found                                                                                                                                 |
| 135  | Unknown usage id                                                                                                                                     |
| 136  | Parameter name is missing.                                                                                                                           |
| 137  | Parameter bitmap type is missing.                                                                                                                    |
| 138  | Bitmap type is unknown.                                                                                                                              |
| 139  | Parameter client id is missing.                                                                                                                      |
| 140  | Parameter methods is missing.                                                                                                                        |
| 141  | Do not have permission to access requested API method.                                                                                               |
| 142  | Provided client ID does not exist.                                                                                                                   |
| 143  | Bin range is already in use                                                                                                                          |
| 144  | Parameter name is missing.                                                                                                                           |
| 145  | Parameter api id is missing.                                                                                                                         |
| 146  | Parameter api key is missing.                                                                                                                        |
| 147  | Client already exists                                                                                                                                |
| 148  | Client not found                                                                                                                                     |
| 149  | Unknown country provided                                                                                                                             |
| 150  | Parameter region is missing.                                                                                                                         |
| 151  | Parameter country is missing.                                                                                                                        |
| 152  | Parameter system is missing.                                                                                                                         |
| 153  | Parameter region id is missing.                                                                                                                      |
| 166  | HSM keys type is not provided.                                                                                                                       |
| 167  | HSM keys type id is not provided.                                                                                                                    |
| 168  | HSM keys type is not found.                                                                                                                          |
| 169  | HSM keys type is in use with keys. Cannot delete.                                                                                                    |
| 154  | HSM keys type is in use with keys sets. Cannot delete.                                                                                               |
| 155  | HSM keys name is not provided.                                                                                                                       |
| 156  | HSM keys key is not provided.                                                                                                                        |
| 157  | HSM key is not found.                                                                                                                                |
| 158  | HSM key ID is not provided.                                                                                                                          |
| 159  | HSM key cannot be removed, because it is used in key set.                                                                                            |
| 162  | HSM key set cannot be saved.                                                                                                                         |
| 163  | HSM key set ID is not provided.                                                                                                                      |
| 160  | HSM key set name is not provided.                                                                                                                    |
| 161  | HSM key set type is not provided.                                                                                                                    |
| 164  | HSM key set is in use and cannot be deleted.                                                                                                         |
| 165  | Parameter name is missing.                                                                                                                           |
| 170  | This Key Type already exists.                                                                                                                        |
| 171  | Cards product country ISON is required.                                                                                                              |
| 172  | Limit region type is not provided.                                                                                                                   |
| 173  | Parameter bin from is missing.                                                                                                                       |
| 174  | Parameter bin to is missing.                                                                                                                         |
| 175  | Sub product bin range is already in use                                                                                                              |
| 176  | Card or product key set is not provided.                                                                                                             |
| 177  | Default sub product currency is not set                                                                                                              |
| 178  | Sub product is not found by selected card country                                                                                                    |
| 179  | HSM Key or HSM Type is not provided                                                                                                                  |
| 180  | More than one key found. Cannot determine correct key without using index.                                                                           |
| 181  | Action failed. No keys has been found in card keyset.                                                                                                |
| 182  | PIN change/unblock failed. PVKI is not found on the card until first transaction.                                                                    |
| 183  | Phone number not provided.                                                                                                                           |
| 184  | Cards not found                                                                                                                                       |
| 185  | No data set.                                                                                                                                         |
| 186  | Can not prepare file save location.                                                                                                                  |
| 187  | Incorrect card design provided                                                                                                                       |
| 188  | Card design configuration error                                                                                                                      |
| 189  | Phone number is not valid                                                                                                                            |
| 190  | Transaction date imported from is not set                                                                                                            |
| 191  | Transaction date imported to is not set                                                                                                              |
| 192  | Transaction ID is not provided                                                                                                                       |
| 193  | Transaction is not found                                                                                                                             |
| 194  | Dispute reason is not provided                                                                                                                       |
| 195  | Dispute function code is not provided                                                                                                                |
| 196  | Dispute amount type is not provided                                                                                                                  |
| 197  | Dispute amount is not provided                                                                                                                       |
| 198  | Dispute currency is not provided                                                                                                                     |
| 199  | Dispute amount or amount type is incorrect                                                                                                           |
| 200  | Dispute currency is incorrect                                                                                                                        |
| 201  | Dispute amount is higher than transaction amount                                                                                                     |
| 202  | Dispute reason code is not provided                                                                                                                  |
| 203  | Can not create dispute for dispute transaction                                                                                                       |
| 204  | Parameter card number hash is missing.                                                                                                               |
| 205  | Parameter acquirer bin is missing.                                                                                                                   |
| 206  | Parameter trace id is missing.                                                                                                                       |
| 207  | Billing amount is not provided                                                                                                                       |
| 208  | Billing currency ison is not provided                                                                                                                |
| 209  | Trace number is not provided                                                                                                                         |
| 210  | Card has not been found                                                                                                                              |
| 211  | Operations limit has been reached. Transaction cancelled.                                                                                            |
| 212  | Load amount limit has been reached. Transaction cancelled.                                                                                           |
| 213  | Load transaction failed.                                                                                                                             |
| 214  | Unload amount limit has been reached. Transaction cancelled.                                                                                         |
| 215  | Unload transaction failed.                                                                                                                           |
| 216  | Insufficient funds.                                                                                                                                  |
| 217  | Card is not active.                                                                                                                                  |
| 218  | Dispute status is not provided                                                                                                                       |
| 219  | Dispute stage id is not provided                                                                                                                     |
| 220  | Dispute masked pan is not provided                                                                                                                   |
| 221  | Dispute card number hash is not provided                                                                                                             |
| 222  | Dispute trace id is not provided                                                                                                                     |
| 223  | Dispute acquirer bin is not provided                                                                                                                 |
| 224  | Dispute main transaction id is not provided                                                                                                          |
| 225  | Dispute event id is not provided                                                                                                                     |
| 226  | Dispute MTI is not provided                                                                                                                          |
| 227  | Transaction already has dispute case                                                                                                                 |
| 228  | Dispute id is not provided                                                                                                                           |
| 229  | Incorrect dispute status                                                                                                                             |
| 230  | Incorrect dispute stage                                                                                                                              |
| 231  | Dispute not found                                                                                                                                    |
| 232  | Client ID is not provided                                                                                                                            |
| 233  | Product ID is not provided                                                                                                                           |
| 234  | API ID is not provided                                                                                                                               |
| 235  | Stand in is not provided                                                                                                                             |
| 236  | External decision is not provided                                                                                                                    |
| 237  | Authorization notification is not provided                                                                                                           |
| 238  | Transaction notification is not provided                                                                                                             |
| 239  | Active is not provided                                                                                                                               |
| 240  | Callback URL is not provided                                                                                                                         |
| 241  | Product reference is not provided                                                                                                                    |
| 242  | Delivery code too long                                                                                                                               |
| 243  | Fulfil 1 value too long                                                                                                                              |
| 244  | Fulfil 2 value too long                                                                                                                              |
| 245  | Product reference is not provided or is too long                                                                                                     |
| 246  | Carrier logo ID is not provided or is too long                                                                                                       |
| 247  | Image ID is not provided or is too long                                                                                                              |
| 248  | Logo front ID is not provided or is too long                                                                                                         |
| 249  | Logo back ID is not provided or is too long                                                                                                          |
| 250  | Parameter client credentials id is missing.                                                                                                          |
| 251  | Provided client credentials ID does not exist.                                                                                                       |
| 252  | Client credential already exists.                                                                                                                    |
| 253  | Parameter is system is missing.                                                                                                                      |
| 254  | Client credentials not found                                                                                                                         |
| 255  | Dispute system due date is not provided                                                                                                              |
| 256  | Dispute scheme id is not provided                                                                                                                    |
| 257  | Unknown dispute scheme id is provided                                                                                                                |
| 258  | Can not update card balance                                                                                                                          |
| 259  | Personalization file date from is not set                                                                                                            |
| 260  | Personalization file date to is not set                                                                                                              |
| 261  | Personalization file id is not provided                                                                                                              |
| 262  | Personalization file not found                                                                                                                       |
| 263  | TAI endpoint not found                                                                                                                               |
| 264  | TAI endpoint ID is not provided                                                                                                                      |
| 265  | Reserved for future                                                                                                                                  |
| 266  | Reserved for future                                                                                                                                  |
| 267  | ACS file date from is not set                                                                                                                        |
| 268  | ACS file date to is not set                                                                                                                          |
| 269  | ACS file id is not provided                                                                                                                          |
| 270  | ACS file not found                                                                                                                                   |
| 271  | Card product is not provided                                                                                                                         |
| 272  | MCC high is not provided                                                                                                                             |
| 273  | Amount is not provided                                                                                                                               |
| 274  | Percent is not provided                                                                                                                              |
| 275  | Currency is not provided                                                                                                                             |
| 276  | Pad not found                                                                                                                                        |
| 277  | Pad id is not provided                                                                                                                               |
| 278  | Actual authorize date from is not set                                                                                                                |
| 279  | Actual authorize date to is not set                                                                                                                  |
| 280  | MCC low only integer value allowed                                                                                                                   |
| 281  | MCC high only integer value allowed                                                                                                                  |
| 282  | Pad amount only integer value allowed                                                                                                                |
| 283  | Pad percent only integer value allowed                                                                                                               |
| 284  | TAI endpoint has TAI notifications                                                                                                                   |
| 285  | Authorize date from is not set                                                                                                                       |
| 286  | Authorize date to is not set                                                                                                                         |
| 287  | Transaction id only integer value allowed                                                                                                            |
| 288  | Transaction proc code only string value allowed                                                                                                      |
| 289  | Transaction amount transaction only integer value allowed                                                                                            |
| 290  | Transaction amount reconciliation only integer value allowed                                                                                         |
| 291  | Transaction amount holder billing only integer value allowed                                                                                         |
| 292  | Transaction currency transaction ison only string value allowed                                                                                      |
| 293  | Transaction currency reconciliation ison only string value allowed                                                                                   |
| 294  | Transaction currency holder billing ison only string value allowed                                                                                   |
| 295  | Transaction function code only integer value allowed                                                                                                 |
| 296  | Transaction mti only string value allowed                                                                                                            |
| 297  | Transaction mcc only integer value allowed                                                                                                           |
| 298  | Transaction trace id only string value allowed                                                                                                       |
| 299  | Transaction ipm files id only integer value allowed                                                                                                  |
| 300  | Transaction schemes id only integer value allowed                                                                                                    |
| 301  | Transaction cards id only integer value allowed                                                                                                      |
| 302  | Transaction holder amount only integer value allowed                                                                                                 |
| 303  | Transaction holder currency ison only string value allowed                                                                                           |
| 304  | Transaction proc code incorrect value length                                                                                                         |
| 305  | Transaction currency transaction ison incorrect value length                                                                                         |
| 306  | Transaction currency reconciliation ison incorrect value length                                                                                      |
| 307  | Transaction currency holder billing ison incorrect value length                                                                                      |
| 308  | Transaction holder currency ison incorrect value length                                                                                              |
| 309  | Transaction function code incorrect value length                                                                                                     |
| 310  | Transaction mti incorrect value length                                                                                                               |
| 311  | Transaction mcc incorrect value length                                                                                                               |
| 312  | Transaction trace id incorrect value length                                                                                                          |
| 313  | Timeout after milliseconds not provided                                                                                                              |
| 314  | Raw message send not provided                                                                                                                        |
| 315  | Dispute status only string value allowed                                                                                                             |
| 316  | Dispute status value is too long                                                                                                                     |
| 317  | Dispute stage id only integer value allowed                                                                                                          |
| 318  | Dispute main transaction id only integer value allowed                                                                                               |
| 319  | Dispute amount type only integer value allowed                                                                                                       |
| 320  | Dispute event id only integer value allowed                                                                                                          |
| 321  | Incorrect dispute reason code provided                                                                                                               |
| 322  | Dispute mti only string value allowed                                                                                                                |
| 323  | Dispute mti value is too long                                                                                                                        |
| 324  | Dispute function code only integer value allowed                                                                                                     |
| 325  | Dispute scheme id only integer value allowed                                                                                                         |
| 326  | Dispute amount only numeric value allowed                                                                                                            |
| 327  | Currency ison only numeric value allowed                                                                                                             |
| 328  | Currency ison must be three characters long                                                                                                          |
| 329  | Dispute amount must be greater than nil                                                                                                              |
| 330  | Dispute dispute id only integer value allowed                                                                                                        |
| 331  | Can not revert this transaction                                                                                                                      |
| 332  | Can not find main transaction                                                                                                                        |
| 333  | Transaction card number hash only string value allowed                                                                                               |
| 334  | Transaction card number hash incorrect value length                                                                                                  |
| 335  | Transaction acquirer bin only integer value allowed                                                                                                  |
| 336  | Transaction acquirer bin incorrect value length                                                                                                      |
| 337  | De proc code is not provided                                                                                                                         |
| 338  | Mcc low incorrect value, minimum value 1                                                                                                             |
| 339  | Can not create another reversal for this transaction                                                                                                 |
| 340  | Transaction is not processed                                                                                                                         |
| 341  | Parent transaction not found                                                                                                                         |
| 342  | Card printer personalization file format is invalid                                                                                                  |
| 343  | Mcc low incorrect value, maximum value 9999                                                                                                          |
| 344  | Mcc high incorrect value, minimum value 1                                                                                                            |
| 345  | Mcc high incorrect value, maximum value 9999                                                                                                         |
| 346  | Pad amount incorrect value length                                                                                                                    |
| 347  | Pad percent incorrect value length                                                                                                                   |
| 348  | Transaction type not found                                                                                                                           |
| 349  | Currency not found                                                                                                                                   |
| 350  | Dispute retrieval document code is not provided                                                                                                      |
| 351  | Dispute retrieval document code only integer value allowed                                                                                           |
| 352  | Limit configuration for this group already exists                                                                                                    |
| 353  | When region type is All Regions then Holder Region, Transaction Region and Transaction Country values should be 0.                                   |
| 354  | When region type is Domestic then Holder Region, Transaction Region and Transaction Country values should be 0 or more.                              |
| 355  | When region type is International then Holder Region and Transaction Region is 0, but Transaction Country values should be 0 or more.                |
| 356  | When region type is International Within Region then Holder Region and Transaction Region values should be 0 or more, but Transaction Country is 0.  |
| 357  | When region type is International Outside Region then Holder Region and Transaction Region values should be 0 or more, but Transaction Country is 0. |
| 358  | Invalid transaction country Ison                                                                                                                     |
| 359  | Invalid holder country Ison                                                                                                                          |
| 360  | Invalid holder currency Ison                                                                                                                         |
| 361  | Holder region is not valid                                                                                                                           |
| 362  | Transaction region is not valid                                                                                                                      |
| 363  | Fees merge not provided                                                                                                                              |
| 364  | Blend in FX not provided                                                                                                                             |
| 365  | Can not create dispute by fee transaction                                                                                                            |
| 366  | Account to card not found                                                                                                                            |
| 367  | Account not found                                                                                                                                    |
| 368  | Invalid title provided                                                                                                                               |
| 369  | Invalid first name provided                                                                                                                          |
| 370  | Invalid last name provided                                                                                                                           |
| 371  | Invalid address line 1 provided                                                                                                                      |
| 372  | Invalid address line 2 provided                                                                                                                      |
| 373  | Invalid address line 3 provided                                                                                                                      |
| 374  | Invalid address line 4 provided                                                                                                                      |
| 375  | Invalid zip code provided                                                                                                                            |
| 376  | Invalid city provided                                                                                                                                |
| 377  | Invalid state provided                                                                                                                               |
| 378  | Invalid phone number provided                                                                                                                        |
| 379  | First name is too long                                                                                                                               |
| 380  | Last name is too long                                                                                                                                |
| 381  | Address line 1 is too long                                                                                                                           |
| 382  | Address line 2 is too long                                                                                                                           |
| 383  | Address line 3 is too long                                                                                                                           |
| 384  | Address line 4 is too long                                                                                                                           |
| 385  | Zip code is too long                                                                                                                                 |
| 386  | City is too long                                                                                                                                     |
| 387  | State is too long                                                                                                                                    |
| 388  | Phone number is too long                                                                                                                             |
| 389  | Address line 2 is not provided                                                                                                                       |
| 390  | Address line 3 is not provided                                                                                                                       |
| 391  | Address line 4 is not provided                                                                                                                       |
| 392  | country_ison must be three characters long                                                                                                           |
| 393  | Country not found                                                                                                                                    |
| 394  | Delivery title is too long                                                                                                                           |
| 395  | Invalid delivery title provided                                                                                                                      |
| 396  | Delivery first name is not provided                                                                                                                  |
| 397  | Delivery first name is too long                                                                                                                      |
| 398  | Invalid delivery first name provided                                                                                                                 |
| 399  | Delivery last name is not provided                                                                                                                   |
| 400  | Delivery last name is too long                                                                                                                       |
| 401  | Invalid delivery last name provided                                                                                                                  |
| 402  | Delivery address line 1 is not provided                                                                                                              |
| 403  | Delivery address line 1 is too long                                                                                                                  |
| 404  | Invalid delivery address line 1 provided                                                                                                             |
| 405  | Delivery address line 2 is too long                                                                                                                  |
| 406  | Invalid delivery address line 2 provided                                                                                                             |
| 407  | Delivery address line 3 is too long                                                                                                                  |
| 408  | Invalid delivery address line 3 provided                                                                                                             |
| 409  | Delivery address line 4 is too long                                                                                                                  |
| 410  | Invalid delivery address line 4 provided                                                                                                             |
| 411  | Delivery zip code is not provided                                                                                                                    |
| 412  | Delivery zip code is too long                                                                                                                        |
| 413  | Invalid delivery zip code provided                                                                                                                   |
| 414  | Delivery city is too long                                                                                                                            |
| 415  | Invalid delivery city provided                                                                                                                       |
| 416  | Delivery state is too long                                                                                                                           |
| 417  | Invalid delivery state provided                                                                                                                      |
| 418  | Invalid delivery shipping method provided                                                                                                            |
| 419  | Delivery shipping method not found                                                                                                                   |
| 420  | Original transaction amount is not provided                                                                                                          |
| 421  | Original transaction amount only integer value allowed                                                                                               |
| 422  | Reserved for future                                                                                                                                  |
| 423  | Issuer not found                                                                                                                                     |
| 424  | Issuer business id not provided                                                                                                                      |
| 425  | Issuer invalid business id provided                                                                                                                  |
| 426  | Issuer business name not provided                                                                                                                    |
| 427  | Issuer not provided                                                                                                                                  |
| 428  | Provided Issuer name to long                                                                                                                         |
| 429  | Invalid Issuer name provided                                                                                                                         |
| 430  | Effective from is not provided                                                                                                                       |
| 431  | Effective to is not provided                                                                                                                         |
| 432  | Effective from only integer value allowed                                                                                                            |
| 433  | Effective to only integer value allowed                                                                                                              |
| 434  | Effective from can not be greater than effective to                                                                                                  |
| 435  | Card reference id is too long                                                                                                                        |
| 436  | Invalid card reference id provided                                                                                                                   |
| 437  | Holder country not found                                                                                                                             |
| 438  | Bulk address line 1 not provided                                                                                                                     |
| 439  | Bulk address line 1 too long                                                                                                                         |
| 440  | Invalid bulk address line 1 provided                                                                                                                 |
| 441  | Bulk address line 2 too long                                                                                                                         |
| 442  | Invalid bulk address line 2 provided                                                                                                                 |
| 443  | Bulk address line 3 too long                                                                                                                         |
| 444  | Invalid bulk address line 3 provided                                                                                                                 |
| 445  | Bulk address line 4 too long                                                                                                                         |
| 446  | Invalid bulk address line 3 provided                                                                                                                 |
| 447  | Bulk address country ison not provided                                                                                                               |
| 448  | Bulk address country ison too long                                                                                                                   |
| 449  | Invalid bulk address country ison provided                                                                                                           |
| 450  | Bulk address country not found                                                                                                                       |
| 451  | Bulk zip code not provided                                                                                                                           |
| 452  | Bulk zip code too long                                                                                                                               |
| 453  | Invalid bulk zip code provided                                                                                                                       |
| 454  | Bulk city not provided                                                                                                                               |
| 455  | Bulk city is too long                                                                                                                                |
| 456  | Invalid bulk city provided                                                                                                                           |
| 457  | Bulk state not provided                                                                                                                              |
| 458  | Bulk state is too long                                                                                                                               |
| 459  | Invalid bulk state provided                                                                                                                          |
| 460  | Holder not found                                                                                                                                     |
| 461  | Holder id not provided                                                                                                                               |
| 462  | Holder id only integer value allowed                                                                                                                 |
| 463  | Card id only integer value allowed                                                                                                                   |
| 464  | Card name line 3 too short                                                                                                                           |
| 465  | Card name line 3 is too long                                                                                                                         |
| 466  | Invalid card name line 3 provided                                                                                                                    |
| 467  | Card name line 4 is too short                                                                                                                        |
| 468  | Card name line 4 is too long                                                                                                                         |
| 469  | Invalid card name line 4 provided                                                                                                                    |
| 470  | Invalid order delivery code provided                                                                                                                 |
| 471  | Invalid order fulfil 1 provided                                                                                                                      |
| 472  | Invalid order fulfil 2 provided                                                                                                                      |
| 473  | Holder country not provided                                                                                                                          |
| 474  | Provided program do not have option provided in card virtual                                                                                         |
| 475  | API version is invalid                                                                                                                               |
| 476  | Account id not provided                                                                                                                              |
| 477  | Account id only integer value allowed                                                                                                                |
| 478  | Account status not provided                                                                                                                          |
| 479  | Account status only string value allowed                                                                                                             |
| 480  | Account status is too long                                                                                                                           |
| 481  | Incorrect account status                                                                                                                             |
| 482  | Card ID is not provided                                                                                                                              |
| 483  | Incorrect value provided for card virtual                                                                                                            |
| 484  | Card nameline 3 not provided                                                                                                                         |
| 485  | Card product id too long                                                                                                                             |
| 486  | Card product id must be numeric                                                                                                                      |
| 487  | Card fee group id must be numeric                                                                                                                    |
| 488  | Card fee group id too long                                                                                                                           |
| 489  | Card limit group id must be numeric                                                                                                                  |
| 490  | Card limit group id too long                                                                                                                         |
| 491  | Card usage group id must be numeric                                                                                                                  |
| 492  | Card usage group id too long                                                                                                                         |
| 493  | Card usage group id must be numeric                                                                                                                  |
| 494  | Card design id too long                                                                                                                              |
| 495  | Card design not found                                                                                                                                |
| 496  | Account id must be numeric                                                                                                                           |
| 497  | Account id too long                                                                                                                                  |
| 498  | Account owner id must be numeric                                                                                                                     |
| 499  | Account owner id too long                                                                                                                            |
| 500  | Account owner not found                                                                                                                              |
| 501  | Account owner id not provided                                                                                                                        |
| 502  | Holder id too long                                                                                                                                   |
| 503  | Holder title is too long                                                                                                                             |
| 504  | Invalid holder title provided                                                                                                                        |
| 505  | Holder first name not provided                                                                                                                       |
| 506  | Holder first name is too long                                                                                                                        |
| 507  | Invalid holder first name provided                                                                                                                   |
| 508  | Holder last name not provided                                                                                                                        |
| 509  | Holder last name is too long                                                                                                                         |
| 510  | Invalid holder last name provided                                                                                                                    |
| 511  | Holder address line 1 not provided                                                                                                                   |
| 512  | Holder address line 1 is too long                                                                                                                    |
| 513  | Invalid holder address line 1 provided                                                                                                               |
| 514  | Holder address line 2 is too long                                                                                                                    |
| 515  | Invalid holder address line 2 provided                                                                                                               |
| 516  | Holder address line 3 is too long                                                                                                                    |
| 517  | Invalid holder address line 3 provided                                                                                                               |
| 518  | Holder address line 4 is too long                                                                                                                    |
| 519  | Invalid holder address line 4 provided                                                                                                               |
| 520  | Holder zip code not provided                                                                                                                         |
| 521  | Holder zip code is too long                                                                                                                          |
| 522  | Invalid Holder zip code provided                                                                                                                     |
| 523  | Holder city not provided                                                                                                                             |
| 524  | Holder city is too long                                                                                                                              |
| 525  | Invalid holder city provided                                                                                                                         |
| 526  | Holder state not provided                                                                                                                            |
| 527  | Holder state is too long                                                                                                                             |
| 528  | Invalid holder state provided                                                                                                                        |
| 529  | Holder phone number not provided                                                                                                                     |
| 530  | Invalid holder phone number provided                                                                                                                 |
| 531  | Delivery country ison must be three characters long                                                                                                  |
| 532  | Delivery country not found                                                                                                                           |
| 533  | Order language only alphabetic characters                                                                                                            |
| 534  | Order language must be three characters long                                                                                                         |
| 535  | Invalid card pan provided                                                                                                                            |
| 536  | Invalid card cvc2 provided                                                                                                                           |
| 537  | Invalid card expiration year provided                                                                                                                |
| 538  | Invalid card expiration month provided                                                                                                               |
| 539  | Account blocked                                                                                                                                      |
| 540  | Billing amount only integer value allowed                                                                                                            |
| 541  | Billing amount incorrect value length                                                                                                                |
| 542  | Load type is not provided                                                                                                                            |
| 543  | Load source is not provided                                                                                                                          |
| 544  | Load type only integer value allowed                                                                                                                 |
| 545  | Load source only integer value allowed                                                                                                               |
| 546  | Load type incorrect value length                                                                                                                     |
| 547  | Load source incorrect value length                                                                                                                   |
| 548  | Incorrect Country Count value provided                                                                                                               |
| 549  | Amount Currency is mandatory when Amount higher than 0                                                                                               |
| 550  | Invalid Amount Currency provided                                                                                                                     |
| 551  | Card is already activated                                                                                                                            |
| 552  | Card is not activated, status change to active is not permitted.                                                                                     |
| 553  | Card is blocked, status change is not permitted.                                                                                                     |
| 554  | Card status cannot be changed to the current status.                                                                                                 |
| 555  | Billing amount cannot be less than 1                                                                                                                 |
| 556  | Schemes id not provided or invalid                                                                                                                   |
| 557  | Duplicate unique value. (type, scheme id)                                                                                                            |
| 558  | Provided number of accounts ids and account owners ids do not match                                                                                  |
| 559  | Only one account allowed per currency                                                                                                                |
| 560  | Card currency must be empty then account provided                                                                                                    |
| 561  | Program and account currency do not match                                                                                                            |
| 562  | Duplicate card currency ison value provided                                                                                                          |
| 563  | Load type is incorrect                                                                                                                               |
| 564  | Load source is incorrect                                                                                                                             |
| 565  | Balance amount overflow                                                                                                                              |
| 566  | Client ID only integer value allowed                                                                                                                 |
| 567  | Client ID too long                                                                                                                                   |
| 568  | API ID too long                                                                                                                                      |
| 569  | Pan return type not provided                                                                                                                         |
| 570  | Invalid pan return type provided                                                                                                                     |
| 571  | Pin return type not provided                                                                                                                         |
| 572  | Invalid pin return type provided                                                                                                                     |
| 573  | Cvc2 return type not provided                                                                                                                        |
| 574  | Invalid cvc2 return type provided                                                                                                                    |
| 575  | Card expiration date return type provided                                                                                                            |
| 576  | Invalid card expiration date return type provided                                                                                                    |
| 577  | HSM key set keys contains invalid values. Only integers allowed.                                                                                     |
| 578  | Reference number is too long.                                                                                                                        |
| 579  | Invalid reference number provided                                                                                                                    |
| 580  | Paginator data not provided                                                                                                                          |
| 581  | Paginator limit not provided                                                                                                                         |
| 582  | Paginator limit must be numeric                                                                                                                      |
| 583  | Paginator offset not provided                                                                                                                        |
| 584  | Paginator offset must be numeric                                                                                                                     |
| 584  | Paginator limit cannot be bigger than 100                                                                                                            |
| 586  | Paginator limit must be at least 1                                                                                                                   |
| 587  | Date from must be numeric unix timestamp                                                                                                             |
| 588  | Date to must be numeric unix timestamp                                                                                                               |
| 589  | Paginator must contain limit(items count) and offset                                                                                                 |
| 590  | Data encryption key is not provided                                                                                                                  |
| 591  | Invalid data encryption key provided                                                                                                                 |
| 592  | Data encryption key should be 32 symbols                                                                                                             |
| 593  | Invalid data return type provided                                                                                                                    |
| 594  | Bypass instant notification option is not provided                                                                                                   |
| 595  | Limits group name is too short                                                                                                                       |
| 596  | Limits group name is too long                                                                                                                        |
| 597  | Invalid limits group name provided                                                                                                                   |
| 598  | Region not found                                                                                                                                     |
| 599  | Region cannot be removed, because it is used in fees                                                                                                 |
| 600  | Region cannot be removed, because it is used in limits                                                                                               |
| 601  | Region cannot be removed, because it is used in card fees                                                                                            |
| 602  | Region cannot be removed, because it is used in card limits                                                                                          |
| 603  | Fee group cannot be removed, because it is used in cards                                                                                             |
| 604  | Fee group cannot be removed, because it is used in fees                                                                                              |
| 605  | Fee group cannot be removed, because it is used in programs                                                                                          |
| 606  | Auto conversion parameter is required                                                                                                                |
| 607  | Cannot edit program with cards                                                                                                                       |
| 608  | Program id must be numeric                                                                                                                           |
| 609  | Program id too long                                                                                                                                  |
| 610  | Cannot edit card product with cards                                                                                                                  |
| 611  | Cannot delete card product with cards                                                                                                                |
| 612  | Card sub product id must be numeric                                                                                                                  |
| 613  | Card sub product id too long                                                                                                                         |
| 614  | Cannot edit card sub product with cards                                                                                                              |
| 615  | Cannot delete card sub product with cards                                                                                                            |
| 616  | Bin range id must be numeric                                                                                                                         |
| 617  | Bin range id too long                                                                                                                                |
| 618  | Bin range not found                                                                                                                                  |
| 619  | Cannot edit bin range with cards                                                                                                                     |
| 620  | Card id too long                                                                                                                                     |
| 621  | Limit type option is not provided                                                                                                                    |
| 622  | Limit type must be numeric                                                                                                                           |
| 623  | Limit type is too long                                                                                                                               |
| 624  | Invalid limit type provided                                                                                                                          |
| 625  | Fee title only string value allowed                                                                                                                  |
| 626  | Fee title is too long                                                                                                                                |
| 627  | Transaction type not provided                                                                                                                        |
| 628  | Entry mode not provided                                                                                                                              |
| 629  | Mcc low is not provided                                                                                                                              |
| 630  | Mcc high is not provided                                                                                                                             |
| 631  | Fee fixed price only numeric value allowed                                                                                                           |
| 632  | Fee percent price only numeric value allowed                                                                                                         |
| 633  | Currency ison is not provided                                                                                                                        |
| 634  | Country ison is not provided                                                                                                                         |
| 635  | Region id only integer value allowed                                                                                                                 |
| 636  | Fee min amount only integer value allowed                                                                                                            |
| 637  | Fee max amount only integer value allowed                                                                                                            |
| 638  | Blacklist source type id is not provided                                                                                                             |
| 639  | Blacklist source type id only integer value allowed                                                                                                  |
| 640  | Blacklist source type id not found                                                                                                                   |
| 641  | Blacklist by source, source value is not provided                                                                                                    |
| 642  | Blacklist by source, source value only string value allowed                                                                                          |
| 643  | Blacklist by source, is report fraud is not provided                                                                                                 |
| 644  | Blacklist by source, is report fraud only bool value allowed                                                                                         |
| 645  | Blacklist by source, is report fraud not found                                                                                                       |
| 646  | Blacklist by source, date created only integer value allowed                                                                                         |
| 647  | Blacklist by source, date updated only integer value allowed                                                                                         |
| 648  | Blacklist by source, id not found                                                                                                                    |
| 649  | Blacklist by source, record not found                                                                                                                |
| 650  | Blacklist by source, record already exists                                                                                                           |
| 651  | Mcc high should be higher value than mcc low                                                                                                         |
| 652  | Only one country id or region id should be provided                                                                                                  |
| 653  | Invalid fee title provided                                                                                                                           |
| 654  | Description is too long                                                                                                                              |
| 655  | Invalid description provided                                                                                                                         |
| 656  | Log history id not provided                                                                                                                          |
| 657  | Log history not found                                                                                                                                |
| 658  | Date from not provided                                                                                                                               |
| 659  | Date to not provided                                                                                                                                 |
| 660  | Cannot delete card product, it has assigned card sub product                                                                                         |
| 661  | Incorrect user bit map provided                                                                                                                      |
| 9999 | Unknown error.                                                                                                                                       |

# Appendix B: Load Source

| ID |           Source            |                                   Description                                   |
|----|-----------------------------|---------------------------------------------------------------------------------|
| 0  | Unknown                     | Partner system does not know the source of the funds                            |
| 1  | Internal Account            | Funds are transferred from Tribe held account                                   |
| 2  | Internal Card               | Funds are transferred from Tribe held card                                      |
| 3  | Debit Card                  | External Debit Card Load via partners Gateway                                   |
| 4  | Credit Card                 | External Credit Card Load via partners Gateway                                  |
| 5  | Bank Transfer               | External Bank Transfer to partners Bank Account                                 |
| 6  | Cash                        | External load of cash to the account                                            |
| 7  | Unload to repatriate        | Used to unload funds and return them to external customer account               |
| 8  | Unload to partner account   | Used to unload funds to cover costs not covered by fees held eslewhere          |
| 9  | PayPal                      | External PayPal load via parterns Gateway                                       |
| 10 | Poli                        | External Poli load via parterns Gateway                                         |
| 11 | Payeer                      | External Payer load via parterns Gateway                                        |
| 12 | EPG Ideal                   | External EPG Ideal load via parterns Gateway                                    |
| 13 | OKPay                       | External OKPay load via parterns Gateway                                        |
| 14 | Qiwi                        | External Qiwi load via parterns Gateway                                         |
| 15 | Sofort                      | External Sofort load via parterns Gateway                                       |
| 16 | Astropay                    | External Astropay load via parterns Gateway                                     |
| 17 | Skrill                      | External Skrill load via parterns Gateway                                       |
| 18 | Neteller                    | External Neteller load via parterns Gateway                                     |
| 19 | EcoPayz                     | External EcoPayz load via parterns Gateway                                      |
| 20 | Bitcoin                     | Crypto Load via Bitcoin                                                         |
| 21 | BitcoinCash                 | Crypto Load via BitcoinCash                                                     |
| 22 | Etherium                    | Crypto Load via Etherium                                                        |
| 23 | Litecoin                    | Crypto Load via Litecoin                                                        |
| 24 | Ripple                      | Crypto Load via Ripple                                                          |
| 25 | Customer Account            | Internal load from Customer account to another account held at Tribe            |
| 26 | Payouts Account             | Internal load from Payouts account to another account held at Tribe             |
| 27 | Cashback Account            | Internal load from Cashback account to another account held at Tribe            |
| 28 | Office Account              | Internal load from Office account to another account held at Tribe              |
| 29 | Fees and Chargeback Account | Internal load from Fees and Chargeback account to another account held at Tribe |
| 30 | External client Wallet      | External load via client Wallet                                                 |
| 31 | Balance adjustment load from GUI    | Balance adjustment created via admin panel                              |
| 32 | Balance adjustment load from PM API | Balance adjustment created via PM API                                   |
| 33 | Balance adjustment load by system   | Balance adjustment created by system                                    |

# Appendix C: Load Type

| ID |   Type   | Description |
|----|----------|-------------|
| 0  | Unknown  |             |
| 1  | e-Wallet |             |

# Appendix D: Account Status

| ID |     Type     |           Description           |
|----|--------------|---------------------------------|
| A  | Active       |                                 |
| R  | Receive only |                                 |
| P  | Spend only   |                                 |
| S  | Suspended    |                                 |
| B  | Blocked      | Final status for closed account |

# Appendix E: Card Status

| ID | Type          | Description                             |
|:---|:--------------|:----------------------------------------|
| A  | Activated     | Can be changed to: B, T, R, S, L, F, E. |
| B  | Blocked       | Can`t be changed.                       |
| T  | Suspended     | Can be changed to: A, B, R, S, L, F.    |
| R  | Risk          | Can be changed to: A, B, T, S, L, F.    |
| S  | Stolen        | Can be changed to: B.                   |
| L  | Lost          | Can be changed to: A, B, T, R, S, F.    |
| E  | Expired       | Can be changed to: A                    |
| N  | Not activated | Can be changed to: A, B, S.             |
| F  | Fraud         | Can be changed to: A, B, T, R, S, L.    |

# Appendix F : Authorization Types

| Type |    Description     |
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

# Appendix G: Transaction Types

| Type | Name                                              | Operation sign | Description                                                    | MC                                                                   | Visa                                                           | UPI                                                                | API/Internal | EPM |
|------|---------------------------------------------------|----------------|----------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------------|--------------|-----|
| 0    | Unknown                                           | -              | Can’t determine transaction type.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
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

# Appendix H: Entry Mode Type

| Type |        Name        |                       Description                       |
|------|--------------------|---------------------------------------------------------|
| 0    | Irrelevant         | This covers all entry mode types                        |
| 1    | Magstripe          | Card data was read from magnetic stripe.                |
| 2    | Contactless        | Card data was read via contactless interface.           |
| 3    | Ecomm              | Card data was sent via ecommerce/internet website.      |
| 4    | Reserved           | Reserved for future use.                                |
| 5    | Optical code       | Card data was read via optical interface.               |
| 6    | Icc                | Card data was read via chip.                            |
| 7    | Credential on file | Card data was loaded from merchant storage (recurring). |
| 8    | Moto               | Card data was entered manually by operator via phone.   |
| 9    | Manual             | Card data was entered manually.                         |
| 10   | Card present       |                                                         |
| 11   | Card not present   |                                                         |
| 12   | Unknown            | Can’t determine.                                        |

# Appendix I: Limit Types

| Type |     Name      |  Description  |
|------|---------------|---------------|
| 1    | Card limit    | Card limit    |
| 2    | Account limit | Account limit |
| 3    | Holder limit  | Holder limit  |

# Appendix J: Currencies

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
