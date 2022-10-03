# Introduction
## Description

 @todo
## Security

-   Api-Token header with token value returned from login requests is required for each non public requests

# Actions

## Account

### Get all

Get all user accounts

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/get-all |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| accounts        | N   | [`Account`](#appendix--type--account)[]                           |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "accounts": [
            {
                "id": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                },
                "balance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "outstandingFees": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "status": {
                    "id": 1,
                    "name": "Normal"
                },
                "primary": true,
                "type": {
                    "id": 1,
                    "name": "Personal"
                },
                "accountGroup": {
                    "id": 123,
                    "name": "Default account group"
                },
                "accountProgram": {
                    "id": 123,
                    "name": "Default account program"
                },
                "cardAutoFund": {
                    "enabled": false,
                    "accountId": 123,
                    "cardId": 123
                },
                "name": "Account name",
                "customName": true,
                "enabled": false
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Activity

Get account transactions

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/account/activity |


#### Request

| Parameter   |  M  | Type       | Length | Description |
| ----------- | --- | ---------- | ------ | ----------- |
| accountsIds | N   | Collection |        |             |


```json
{
    "accountsIds": "[2471019, 2767524]"
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| transactions | N   | [`Transaction`](#appendix--type--transaction)[] |        |             |
| allLoaded    | N   | bool                                            |        |             |
| startBalance | N   | null &#124; [`Money`](#appendix--type--money)   |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactions": [
            {
                "id": "",
                "dateTime": "",
                "sender": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "recipient": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "instructedAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "description": "",
                "fee": true,
                "pre": true,
                "pending": false,
                "rejected": false,
                "restricted": true,
                "reversal": false,
                "refund": false,
                "hasRefund": true,
                "errorCode": "",
                "microtime": "",
                "errorMessage": "",
                "reason": "",
                "receiver": ""
            }
        ],
        "allLoaded": true,
        "startBalance": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Last activity

Get last user transactions

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/last-activity |


#### Request

| Parameter            |  M  | Type               | Length | Description |
| -------------------- | --- | ------------------ | ------ | ----------- |
| accountsCurrencyCode | N   | null &#124; string |        |             |
| maxReturnCount       | N   | null &#124; int    |        |             |


```json
{
    "accountsCurrencyCode": "USD",
    "maxReturnCount": 10
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| transactions | N   | [`Transaction`](#appendix--type--transaction)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactions": [
            {
                "id": "",
                "dateTime": "",
                "sender": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "recipient": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "instructedAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "description": "",
                "fee": false,
                "pre": true,
                "pending": true,
                "rejected": false,
                "restricted": true,
                "reversal": true,
                "refund": true,
                "hasRefund": false,
                "errorCode": "",
                "microtime": "",
                "errorMessage": "",
                "reason": "",
                "receiver": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get creation fee

Get account creation fee price

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/get-creation-fee |


#### Request

No parameters need

#### Response

| Parameter               |  M  | Type       | Length | Description |
| ----------------------- | --- | ---------- | ------ | ----------- |
| currencyCode            | N   | string     |        |             |
| additional              | N   | string     |        |             |
| otherCurrency           | N   | string     |        |             |
| accountsCurrenciesCodes | N   | Collection |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencyCode": "USD",
        "additional": "10.55",
        "otherCurrency": "20.55",
        "accountsCurrenciesCodes": "['USD','EUR']"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get for payment links

Get available accounts for payment links

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/get-for-payment-links |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| method    | Y   | string |        |             |


```json
{
    "method": "paypal"
}
```

#### Response

| Parameter |  M  | Type                                    | Length | Description |
| --------- | --- | --------------------------------------- | ------ | ----------- |
| accounts  | N   | [`Account`](#appendix--type--account)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "accounts": [
            {
                "id": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                },
                "balance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "outstandingFees": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "status": {
                    "id": 1,
                    "name": "Normal"
                },
                "primary": false,
                "type": {
                    "id": 1,
                    "name": "Personal"
                },
                "accountGroup": {
                    "id": 123,
                    "name": "Default account group"
                },
                "accountProgram": {
                    "id": 123,
                    "name": "Default account program"
                },
                "cardAutoFund": {
                    "enabled": true,
                    "accountId": 123,
                    "cardId": 123
                },
                "name": "Account name",
                "customName": false,
                "enabled": false
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create

Create new account

| URL                                            |
| ---------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/create |


#### Request

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| currencyCode | Y   | string             | 3      |             |
| name         | N   | null &#124; string | 60     |             |


```json
{
    "currencyCode": "USD",
    "name": ""
}
```

#### Response

| Parameter |  M  | Type                                  | Length | Description |
| --------- | --- | ------------------------------------- | ------ | ----------- |
| account   | N   | [`Account`](#appendix--type--account) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "account": {
            "id": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            },
            "balance": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                }
            },
            "outstandingFees": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                }
            },
            "status": {
                "id": 1,
                "name": "Normal"
            },
            "primary": true,
            "type": {
                "id": 1,
                "name": "Personal"
            },
            "accountGroup": {
                "id": 123,
                "name": "Default account group"
            },
            "accountProgram": {
                "id": 123,
                "name": "Default account program"
            },
            "cardAutoFund": {
                "enabled": false,
                "accountId": 123,
                "cardId": 123
            },
            "name": "Account name",
            "customName": false,
            "enabled": false
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Set as primary

Set account as primary

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/account/set-as-primary |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| accountId | Y   | int  |        |             |


```json
{
    "accountId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Suspend

Suspend account

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/suspend |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| accountId | Y   | int  |        |             |


```json
{
    "accountId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Unsuspend

Unsuspend account

| URL                                               |
| ------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/unsuspend |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| accountId | Y   | int  |        |             |


```json
{
    "accountId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Auto fund card

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/account/auto-fund-card |


#### Request

| Parameter |  M  | Type            | Length | Description |
| --------- | --- | --------------- | ------ | ----------- |
| accountId | Y   | int             |        |             |
| cardId    | N   | null &#124; int |        |             |
| enabled   | Y   | bool            |        |             |


```json
{
    "accountId": 123,
    "cardId": 123,
    "enabled": true
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get account balances by period

Get account balances by period

| URL                                                                    |
| ---------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/get-account-balances-by-period |


#### Request

| Parameter |  M  | Type   | Length | Description         |
| --------- | --- | ------ | ------ | ------------------- |
| period    | Y   | string |        | 1H, 24H, 1W, 1M, 1Y |
| accountId | Y   | int    |        |                     |


```json
{
    "period": "1H",
    "accountId": 123
}
```

#### Response

| Parameter             |  M  | Type                                                              | Length | Description |
| --------------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| account               | N   | [`Account`](#appendix--type--account)                             |        |             |
| accountBalanceByDates | N   | [`AccountBalanceByDate`](#appendix--type--accountbalancebydate)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "account": {
            "id": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            },
            "balance": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                }
            },
            "outstandingFees": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                }
            },
            "status": {
                "id": 1,
                "name": "Normal"
            },
            "primary": false,
            "type": {
                "id": 1,
                "name": "Personal"
            },
            "accountGroup": {
                "id": 123,
                "name": "Default account group"
            },
            "accountProgram": {
                "id": 123,
                "name": "Default account program"
            },
            "cardAutoFund": {
                "enabled": false,
                "accountId": 123,
                "cardId": 123
            },
            "name": "Account name",
            "customName": true,
            "enabled": true
        },
        "accountBalanceByDates": [
            {
                "date": "2010-10-10 10:10",
                "balance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "outstandingBalance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                }
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Change account name

Change account name

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/change-account-name |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| accountId | Y   | int    |        |             |
| name      | Y   | string |        |             |


```json
{
    "accountId": 123,
    "name": "Salary account"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get account withdrawal to bank limits

Get accounts withdrawal limits

| URL                                                                           |
| ----------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/get-account-withdrawal-to-bank-limits |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                | Length | Description                    |
| ---------- | --- | ----------------------------------- | ------ | ------------------------------ |
| minAmounts | N   | [`Money`](#appendix--type--money)[] |        | Returns array of Money objects |
| maxAmounts | N   | [`Money`](#appendix--type--money)[] |        | Returns array of Money objects |


```json
{
    "minAmounts": [
        {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    ],
    "maxAmounts": [
        {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Disable

Get accounts withdrawal limits

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/account/disable |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| accountId | Y   | int  |        |             |


```json
{
    "accountId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Advertisements

### Get advertisement

Gets advertisement

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/advertisements/get-advertisement |


#### Request

| Parameter |  M  | Type   | Length | Description     |
| --------- | --- | ------ | ------ | --------------- |
| platform  | Y   | string |        | desktop, mobile |


```json
{
    "platform": "desktop"
}
```

#### Response

| Parameter     |  M  | Type                                                          | Length | Description |
| ------------- | --- | ------------------------------------------------------------- | ------ | ----------- |
| advertisement | N   | null &#124; [`Advertisement`](#appendix--type--advertisement) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "advertisement": {
            "id": 123,
            "header": "Title",
            "body": "Text",
            "display": 1
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Mark as seen

Marks advertisement as seen

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/advertisements/mark-as-seen |


#### Request

| Parameter       |  M  | Type | Length | Description |
| --------------- | --- | ---- | ------ | ----------- |
| advertisementId | Y   | int  |        |             |


```json
{
    "advertisementId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Bank account

### Get all

Get all user bank accounts

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/bankaccount/get-all |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| bankAccounts    | N   | [`BankAccount`](#appendix--type--bankaccount)[]                   |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "bankAccounts": [
            {
                "id": "",
                "fullNameOnBankAccount": "",
                "iban": "",
                "swift": "",
                "branchCode": "",
                "bankName": "",
                "bankAddress": "",
                "bankCity": "",
                "bankState": "",
                "bankCountry": {
                    "id": "",
                    "name": "",
                    "alphaTwoCode": "",
                    "alphaThreeCode": "",
                    "phoneCode": "",
                    "prohibited": true,
                    "highRisk": false,
                    "enabled": false,
                    "risk": "",
                    "regions": [
                        {
                            "id": "",
                            "name": "",
                            "shortName": ""
                        }
                    ]
                },
                "bankContactPhone": "",
                "correspondingBankSwift": "",
                "correspondingBankName": "",
                "correspondingBankCity": "",
                "correspondingBankCurrencyCode": "",
                "enabled": false,
                "primary": false,
                "status": {
                    "id": "",
                    "name": ""
                }
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create

Create new bank account

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/bankaccount/create |


#### Request

| Parameter                     |  M  | Type               | Length | Description |
| ----------------------------- | --- | ------------------ | ------ | ----------- |
| fullNameOnBankAccount         | Y   | string             | 35     |             |
| iban                          | Y   | null &#124; string | 35     |             |
| swift                         | Y   | null &#124; string | 11     |             |
| branchCode                    | N   | null &#124; string | 20     |             |
| bankName                      | Y   | string             | 35     |             |
| bankAddress                   | Y   | string             | 35     |             |
| bankCity                      | Y   | null &#124; string | 20     |             |
| bankState                     | N   | null &#124; string | 20     |             |
| bankCountryCode               | Y   | null &#124; string |        |             |
| bankContactPhone              | N   | null &#124; string | 30     |             |
| correspondingBankSwift        | N   | null &#124; string | 11     |             |
| correspondingBankName         | N   | null &#124; string | 35     |             |
| correspondingBankCity         | N   | null &#124; string | 20     |             |
| correspondingBankCurrencyCode | N   | null &#124; string | 3      |             |
| primary                       | N   | bool               |        |             |


```json
{
    "fullNameOnBankAccount": "John doe",
    "iban": "DE89370400440532013000",
    "swift": "",
    "branchCode": "",
    "bankName": "Commerzbank",
    "bankAddress": "",
    "bankCity": "",
    "bankState": "",
    "bankCountryCode": "",
    "bankContactPhone": "",
    "correspondingBankSwift": "",
    "correspondingBankName": "",
    "correspondingBankCity": "",
    "correspondingBankCurrencyCode": "",
    "primary": true
}
```

#### Response

| Parameter   |  M  | Type                                          | Length | Description |
| ----------- | --- | --------------------------------------------- | ------ | ----------- |
| bankAccount | N   | [`BankAccount`](#appendix--type--bankaccount) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "bankAccount": {
            "id": "",
            "fullNameOnBankAccount": "",
            "iban": "",
            "swift": "",
            "branchCode": "",
            "bankName": "",
            "bankAddress": "",
            "bankCity": "",
            "bankState": "",
            "bankCountry": {
                "id": "",
                "name": "",
                "alphaTwoCode": "",
                "alphaThreeCode": "",
                "phoneCode": "",
                "prohibited": true,
                "highRisk": true,
                "enabled": true,
                "risk": "",
                "regions": [
                    {
                        "id": "",
                        "name": "",
                        "shortName": ""
                    }
                ]
            },
            "bankContactPhone": "",
            "correspondingBankSwift": "",
            "correspondingBankName": "",
            "correspondingBankCity": "",
            "correspondingBankCurrencyCode": "",
            "enabled": true,
            "primary": true,
            "status": {
                "id": "",
                "name": ""
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update

Update bank account

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/bankaccount/update |


#### Request

| Parameter                     |  M  | Type               | Length | Description |
| ----------------------------- | --- | ------------------ | ------ | ----------- |
| id                            | Y   | int                |        |             |
| fullNameOnBankAccount         | Y   | string             | 35     |             |
| iban                          | Y   | null &#124; string | 35     |             |
| swift                         | Y   | null &#124; string | 11     |             |
| branchCode                    | N   | null &#124; string | 20     |             |
| bankName                      | Y   | string             | 35     |             |
| bankAddress                   | Y   | string             | 35     |             |
| bankCity                      | Y   | null &#124; string | 20     |             |
| bankState                     | N   | null &#124; string | 20     |             |
| bankCountryCode               | Y   | null &#124; string |        |             |
| bankContactPhone              | N   | null &#124; string | 30     |             |
| correspondingBankSwift        | N   | null &#124; string | 11     |             |
| correspondingBankName         | N   | null &#124; string | 35     |             |
| correspondingBankCity         | N   | null &#124; string | 20     |             |
| correspondingBankCurrencyCode | N   | null &#124; string | 3      |             |
| primary                       | N   | bool               |        |             |


```json
{
    "id": "",
    "fullNameOnBankAccount": "John doe",
    "iban": "DE89370400440532013000",
    "swift": "",
    "branchCode": "",
    "bankName": "Commerzbank",
    "bankAddress": "",
    "bankCity": "",
    "bankState": "",
    "bankCountryCode": "",
    "bankContactPhone": "",
    "correspondingBankSwift": "",
    "correspondingBankName": "",
    "correspondingBankCity": "",
    "correspondingBankCurrencyCode": "",
    "primary": false
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Mark as primary

Mark bank account as primary

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/bankaccount/mark-as-primary |


#### Request

| Parameter     |  M  | Type | Length | Description |
| ------------- | --- | ---- | ------ | ----------- |
| bankAccountId | Y   | int  |        |             |


```json
{
    "bankAccountId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete

Delete bank account

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/bankaccount/delete |


#### Request

| Parameter     |  M  | Type | Length | Description |
| ------------- | --- | ---- | ------ | ----------- |
| bankAccountId | Y   | int  |        |             |


```json
{
    "bankAccountId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Card

### Get all

Returns user cards

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-all |


#### Request

| Parameter |  M  | Type                                      | Length | Description |
| --------- | --- | ----------------------------------------- | ------ | ----------- |
| paginator | N   | [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| cards           | N   | [`Card`](#appendix--type--card)[]                     |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "cards": [
            {
                "id": "",
                "scheme": "",
                "number": "",
                "referenceId": "",
                "pinBlocked": true,
                "status": {
                    "id": "",
                    "name": ""
                },
                "virtual": false,
                "renewable": false,
                "hidden": false,
                "bulkCard": true,
                "accounts": [
                    {
                        "id": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": true
                        },
                        "balance": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": false
                            }
                        },
                        "outstandingFees": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": false
                            }
                        },
                        "status": {
                            "id": 1,
                            "name": "Normal"
                        },
                        "primary": false,
                        "type": {
                            "id": 1,
                            "name": "Personal"
                        },
                        "accountGroup": {
                            "id": 123,
                            "name": "Default account group"
                        },
                        "accountProgram": {
                            "id": 123,
                            "name": "Default account program"
                        },
                        "cardAutoFund": {
                            "enabled": true,
                            "accountId": 123,
                            "cardId": 123
                        },
                        "name": "Account name",
                        "customName": true,
                        "enabled": false
                    }
                ],
                "nameOnCard": "",
                "nameOnCardLineTwo": "",
                "expiryYear": "",
                "expiryMonth": "",
                "balances": [
                    {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": true
                        }
                    }
                ],
                "outstandingFees": [
                    {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    }
                ],
                "balancesSum": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "cardsDesign": {
                    "id": "",
                    "name": "",
                    "frontImgUrl": "",
                    "backImgUrl": "",
                    "styleProperties": ""
                }
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Activity

Return user card transactions

| URL                                           |
| --------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/activity |


#### Request

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| cardId       | Y   | int                |        |             |
| currencyCode | N   | null &#124; string | 3      |             |


```json
{
    "cardId": 123,
    "currencyCode": "USD"
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| transactions | N   | [`Transaction`](#appendix--type--transaction)[] |        |             |
| allLoaded    | N   | bool                                            |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactions": [
            {
                "id": "",
                "dateTime": "",
                "sender": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "recipient": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "instructedAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "description": "",
                "fee": true,
                "pre": false,
                "pending": false,
                "rejected": true,
                "restricted": false,
                "reversal": true,
                "refund": true,
                "hasRefund": false,
                "errorCode": "",
                "microtime": "",
                "errorMessage": "",
                "reason": "",
                "receiver": ""
            }
        ],
        "allLoaded": false
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get sensitive data

Returns sensitive card data for active cards, like number etc

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-sensitive-data |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| number    | N   | string |        |             |
| cvv       | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "number": "",
        "cvv": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Unblock

Unblocks card

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/unblock |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Block

Block request

| URL                                        |
| ------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/card/block |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Activate

Activates card

| URL                                           |
| --------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/activate |


#### Request

| Parameter      |  M  | Type                                                    | Length | Description                                                                                                                                                                                         |
| -------------- | --- | ------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cardId         | Y   | int                                                     |        |                                                                                                                                                                                                     |
| number         | Y   | string                                                  | 19     |                                                                                                                                                                                                     |
| cvv            | Y   | string                                                  | 4      | CVV code placed at the back of card is used for verification process. 3 digits CVV code is used for VISA, MasterCard and Discovery branded cards. 4 digits CVV code is used for AMEX branded cards. |
| cardHolderInfo | N   | null &#124; [`CardHolder`](#appendix--type--cardholder) |        |                                                                                                                                                                                                     |


```json
{
    "cardId": 123,
    "number": "4111111111111111",
    "cvv": "123",
    "cardHolderInfo": {
        "firstName": "",
        "lastName": "",
        "passportNo": "",
        "dateOfBirth": "",
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "postal": "",
        "countryId": ""
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Renew

Marks card for automatical renewal

| URL                                        |
| ------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/card/renew |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Request pin

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/card/request-pin |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Set pin

Sets new card pin

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/set-pin |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| cardId    | Y   | int    |        |             |
| pin       | Y   | string |        |             |


```json
{
    "cardId": 123,
    "pin": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete

Deletes card

| URL                                         |
| ------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/delete |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Unblock pin

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/card/unblock-pin |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get available card order brands

Get card order data

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-available-card-order-brands |


#### Request

No parameters need

#### Response

Get possible card brands to order.

| Parameter          |  M  | Type                                                      | Length | Description |
| ------------------ | --- | --------------------------------------------------------- | ------ | ----------- |
| cardBrands         | N   | [`CardBrand`](#appendix--type--cardbrand)[]               |        |             |
| virtualTypeBrands  | N   | [`CardBrand`](#appendix--type--cardbrand)[]               |        |             |
| physicalTypeBrands | N   | [`CardBrand`](#appendix--type--cardbrand)[]               |        |             |
| canOrderCard       | N   | bool                                                      |        |             |
| restriction        | N   | null &#124; [`Restriction`](#appendix--type--restriction) |        |             |


```json
{
    "cardBrands": [
        {
            "id": 1,
            "name": "MasterCard",
            "key": "MC",
            "active": false
        }
    ],
    "virtualTypeBrands": [
        {
            "id": 1,
            "name": "MasterCard",
            "key": "MC",
            "active": true
        }
    ],
    "physicalTypeBrands": [
        {
            "id": 1,
            "name": "MasterCard",
            "key": "MC",
            "active": true
        }
    ],
    "canOrderCard": true,
    "restriction": {
        "message": "You are not able to make this transfer",
        "messageCode": "YOU_ARE_NOT_ALLOWED_TO_MAKE_THIS_TRANSFER",
        "messageParams": "['method' => 'paypal']"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get order form preparation data

Get card order form preparation data

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-order-form-preparation-data |


#### Request

| Parameter    |  M  | Type   | Length | Description |
| ------------ | --- | ------ | ------ | ----------- |
| virtual      | Y   | bool   |        |             |
| cardBrandKey | Y   | string |        | MC,VISA,CUP |


```json
{
    "virtual": true,
    "cardBrandKey": "MC"
}
```

#### Response

| Parameter                       |  M  | Type                                                                                            | Length | Description |
| ------------------------------- | --- | ----------------------------------------------------------------------------------------------- | ------ | ----------- |
| nameOnCard                      | N   | string                                                                                          |        |             |
| namesOnCardByCardTypes          | N   | [`NameOnCardByExternalProgramCardType`](#appendix--type--nameoncardbyexternalprogramcardtype)[] |        |             |
| canEditNameOnCard               | N   | bool                                                                                            |        |             |
| canEditNameOnCardLineTwo        | N   | bool                                                                                            |        |             |
| currencies                      | N   | [`Currency`](#appendix--type--currency)[]                                                       |        |             |
| accounts                        | N   | [`Account`](#appendix--type--account)[]                                                         |        |             |
| externalCardProgramsByRelations | N   | [`ExternalCardProgramsByRelations`](#appendix--type--externalcardprogramsbyrelations)           |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "nameOnCard": "John Joe",
        "namesOnCardByCardTypes": [
            {
                "externalProgramCardType": 1,
                "nameOnCard": "John Joe"
            }
        ],
        "canEditNameOnCard": false,
        "canEditNameOnCardLineTwo": false,
        "currencies": [
            {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        ],
        "accounts": [
            {
                "id": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                },
                "balance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "outstandingFees": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "status": {
                    "id": 1,
                    "name": "Normal"
                },
                "primary": true,
                "type": {
                    "id": 1,
                    "name": "Personal"
                },
                "accountGroup": {
                    "id": 123,
                    "name": "Default account group"
                },
                "accountProgram": {
                    "id": 123,
                    "name": "Default account program"
                },
                "cardAutoFund": {
                    "enabled": false,
                    "accountId": 123,
                    "cardId": 123
                },
                "name": "Account name",
                "customName": false,
                "enabled": false
            }
        ],
        "externalCardProgramsByRelations": {
            "externalCardProgramsByCurrencies": [
                {
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    },
                    "externalCardPrograms": [
                        {
                            "id": 123456,
                            "title": "Master card physical",
                            "cardProviderId": 111,
                            "cardBrand": {
                                "id": 1,
                                "name": "MasterCard",
                                "key": "MC",
                                "active": true
                            },
                            "externalCardTypeId": 1,
                            "cardOrderLimit": "",
                            "virtual": true
                        }
                    ]
                }
            ],
            "externalCardProgramsByAccounts": [
                {
                    "account": {
                        "id": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        },
                        "balance": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": true
                            }
                        },
                        "outstandingFees": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": false
                            }
                        },
                        "status": {
                            "id": 1,
                            "name": "Normal"
                        },
                        "primary": false,
                        "type": {
                            "id": 1,
                            "name": "Personal"
                        },
                        "accountGroup": {
                            "id": 123,
                            "name": "Default account group"
                        },
                        "accountProgram": {
                            "id": 123,
                            "name": "Default account program"
                        },
                        "cardAutoFund": {
                            "enabled": false,
                            "accountId": 123,
                            "cardId": 123
                        },
                        "name": "Account name",
                        "customName": false,
                        "enabled": false
                    },
                    "externalCardPrograms": [
                        {
                            "id": 123456,
                            "title": "Master card physical",
                            "cardProviderId": 111,
                            "cardBrand": {
                                "id": 1,
                                "name": "MasterCard",
                                "key": "MC",
                                "active": true
                            },
                            "externalCardTypeId": 1,
                            "cardOrderLimit": "",
                            "virtual": true
                        }
                    ]
                }
            ]
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get shipping methods data

Get shipping methods data

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-shipping-methods-data |


#### Request

| Parameter             |  M  | Type               | Length | Description |
| --------------------- | --- | ------------------ | ------ | ----------- |
| externalCardProgramId | Y   | int                |        |             |
| countryId             | Y   | int                |        |             |
| accountId             | Y   | int                |        |             |
| currencyCode          | Y   | null &#124; string | 3      |             |
| virtual               | Y   | bool               |        |             |


```json
{
    "externalCardProgramId": 15445788,
    "countryId": 444,
    "accountId": 123,
    "currencyCode": "EUR",
    "virtual": true
}
```

#### Response

| Parameter             |  M  | Type                                                          | Length | Description |
| --------------------- | --- | ------------------------------------------------------------- | ------ | ----------- |
| shippingMethods       | N   | [`CardShippingMethod`](#appendix--type--cardshippingmethod)[] |        |             |
| virtualCardPrice      | N   | null &#124; [`Money`](#appendix--type--money)                 |        |             |
| physicalCardPrice     | N   | null &#124; [`Money`](#appendix--type--money)                 |        |             |
| showVirtualCardPrice  | N   | bool                                                          |        |             |
| showPhysicalCardPrice | N   | bool                                                          |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "shippingMethods": [
            {
                "id": 123456,
                "cardProviderId": 6,
                "deliveryTime": "1-3",
                "deliveryTimeType": 1,
                "description": "Express Shipping Description",
                "name": "Express Shipping",
                "price": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "resource": "Fees resource",
                "selectPriority": 1
            }
        ],
        "virtualCardPrice": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "physicalCardPrice": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "showVirtualCardPrice": false,
        "showPhysicalCardPrice": false
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Request

Request card

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/request |


#### Request

| Parameter             |  M  | Type                                                                | Length | Description |
| --------------------- | --- | ------------------------------------------------------------------- | ------ | ----------- |
| nameOnCard            | Y   | string                                                              | 27     |             |
| nameOnCardLineTwo     | N   | null &#124; string                                                  | 27     |             |
| accountId             | Y   | int                                                                 |        |             |
| currencyCode          | N   | null &#124; string                                                  | 3      |             |
| externalCardProgramId | Y   | int                                                                 |        |             |
| shippingMethodId      | N   | null &#124; int                                                     |        |             |
| cardHolderAddress     | Y   | [`CardOrderHolderAddress`](#appendix--type--cardorderholderaddress) |        |             |
| virtual               | Y   | bool                                                                |        |             |
| onlyValidate          | Y   | bool                                                                |        |             |


```json
{
    "nameOnCard": "John Joe",
    "nameOnCardLineTwo": "EUR",
    "accountId": "",
    "currencyCode": "EUR",
    "externalCardProgramId": 123,
    "shippingMethodId": 123,
    "cardHolderAddress": {
        "address": "American street 31",
        "addressTwo": "American street 545",
        "city": "London",
        "postal": "EAAA4444",
        "state": "Home state",
        "countryId": 12345
    },
    "virtual": false,
    "onlyValidate": true
}
```

#### Validation Response

| Parameter |  M  | Type                            | Length | Description |
| --------- | --- | ------------------------------- | ------ | ----------- |
| fees      | N   | [`Fee`](#appendix--type--fee)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fees": [
            {
                "description": "Dinner fee",
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                }
            }
        ]
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get card withdrawal limits

Get card withdrawal limits

| URL                                                             |
| --------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-card-withdrawal-limits |


#### Request

| Parameter    |  M  | Type   | Length | Description |
| ------------ | --- | ------ | ------ | ----------- |
| cardId       | Y   | int    |        |             |
| limitTypeKey | Y   | string |        |             |


```json
{
    "cardId": 12345678901234,
    "limitTypeKey": "UNLOAD"
}
```

#### Response

| Parameter  |  M  | Type                                                            | Length | Description |
| ---------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| cardLimits | N   | [`CardWithdrawalLimit`](#appendix--type--cardwithdrawallimit)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "cardLimits": [
            {
                "limitName": "Max transactions number per 24 h",
                "durationValue": 5,
                "durationName": "hour",
                "limitValue": 7,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                },
                "limitTypeKey": "POS"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get card fees

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-card-fees |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

### Get card limits

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/card/get-card-limits |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| cardId    | Y   | int  |        |             |


```json
{
    "cardId": 123
}
```

## Code card

### Get pin key

Get pin key

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/codecard/get-pin-key |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type               | Length | Description |
| --------- | --- | ------------------ | ------ | ----------- |
| pinKey    | N   | null &#124; string |        |             |
| sentBySms | N   | bool               |        |             |


```json
{
    "pinKey": "abc-123",
    "sentBySms": null
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Country

### Get all

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/country/get-all |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter |  M  | Type                                    | Length | Description |
| --------- | --- | --------------------------------------- | ------ | ----------- |
| countries | N   | [`Country`](#appendix--type--country)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "countries": [
            {
                "id": "",
                "name": "",
                "alphaTwoCode": "",
                "alphaThreeCode": "",
                "phoneCode": "",
                "prohibited": false,
                "highRisk": true,
                "enabled": true,
                "risk": "",
                "regions": [
                    {
                        "id": "",
                        "name": "",
                        "shortName": ""
                    }
                ]
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get restricted

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/country/get-restricted |


#### Request

No parameters need

#### Response

| Parameter                  |  M  | Type       | Length | Description |
| -------------------------- | --- | ---------- | ------ | ----------- |
| bankWireLoad               | N   | Collection |        |             |
| bankWireWithdraw           | N   | Collection |        |             |
| paymentRequestLoadBusiness | N   | Collection |        |             |
| paymentRequestLoadPersonal | N   | Collection |        |             |
| paymentRequestWithdraw     | N   | Collection |        |             |
| registrationBusiness       | N   | Collection |        |             |
| registrationPersonal       | N   | Collection |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "bankWireLoad": "",
        "bankWireWithdraw": "",
        "paymentRequestLoadBusiness": "",
        "paymentRequestLoadPersonal": "",
        "paymentRequestWithdraw": "",
        "registrationBusiness": "",
        "registrationPersonal": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Currency

### Get all

Returns all available currencies

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/currency/get-all |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "currencies": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get all active

Get active currencies by type

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-all-active |


#### Request

No parameters need

#### Response

| Parameter              |  M  | Type                                      | Length | Description |
| ---------------------- | --- | ----------------------------------------- | ------ | ----------- |
| account                | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| card                   | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| creditCard             | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| purchaseAccount        | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| bankWireLoad           | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| bankWireWithdraw       | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| paymentRequest         | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| personalPaymentRequest | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| businessPaymentRequest | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| paymentRequestLink     | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| universal              | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| paypalWithdraw         | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| remittanceWithdraw     | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| payeerWithdraw         | N   | [`Currency`](#appendix--type--currency)[] |        |             |
| westernunionWithdraw   | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "account": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "card": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "creditCard": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "purchaseAccount": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "bankWireLoad": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "bankWireWithdraw": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "paymentRequest": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "personalPaymentRequest": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "businessPaymentRequest": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "paymentRequestLink": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "universal": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "paypalWithdraw": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ],
    "remittanceWithdraw": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "payeerWithdraw": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    ],
    "westernunionWithdraw": [
        {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get active

Get active by provided type

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-active |


#### Reqest

| Parameter |  M  | Type               | Length | Description |
| --------- | --- | ------------------ | ------ | ----------- |
| type      | N   | null &#124; string |        |             |


```json
{
    "type": "purchaseaccount"
}
```

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencies": "purchaseaccount"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get registration

Get registration currencies

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-registration |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencies": "purchaseaccount"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get for payment links

Get payments links currencies

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-for-payment-links |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencies": [
            {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get for wires by account

Returns currencies for wires by accounts

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-for-wires-by-account |


#### Request

No parameters need

#### Response

| Parameter        |  M  | Type                                                        | Length | Description |
| ---------------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| bankWireLoad     | N   | [`AccountCurrencies`](#appendix--type--accountcurrencies)[] |        |             |
| bankWireWithdraw | N   | [`AccountCurrencies`](#appendix--type--accountcurrencies)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "bankWireLoad": [
            {
                "accountId": "",
                "currencies": [
                    {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                ]
            }
        ],
        "bankWireWithdraw": [
            {
                "accountId": "",
                "currencies": [
                    {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                ]
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get for account purchase

Return currencies for account purchase

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-for-account-purchase |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencies": "purchaseaccount"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get for bank payment request by account

Returns currencies for bank payment requests by accounts

| URL                                                                              |
| -------------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-for-bank-payment-request-by-account |


#### Request

No parameters need

#### Response

| Parameter                  |  M  | Type                                                                                                                  | Length | Description |
| -------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- | ------ | ----------- |
| bankPaymentRequestLoad     | N   | null &#124; [`BankPaymentRequestAccountCurrenciesByType`](#appendix--type--bankpaymentrequestaccountcurrenciesbytype) |        |             |
| bankPaymentRequestWithdraw | N   | null &#124; [`BankPaymentRequestAccountCurrenciesByType`](#appendix--type--bankpaymentrequestaccountcurrenciesbytype) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "bankPaymentRequestLoad": {
            "personalBankPaymentRequest": [
                {
                    "accountId": "",
                    "currencies": [
                        {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    ]
                }
            ],
            "businessBankPaymentRequest": [
                {
                    "accountId": "",
                    "currencies": [
                        {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    ]
                }
            ]
        },
        "bankPaymentRequestWithdraw": {
            "personalBankPaymentRequest": [
                {
                    "accountId": "",
                    "currencies": [
                        {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": true
                        }
                    ]
                }
            ],
            "businessBankPaymentRequest": [
                {
                    "accountId": "",
                    "currencies": [
                        {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    ]
                }
            ]
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get accounts currencies

Get actual currencies by owned user accounts

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currency/get-accounts-currencies |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                      | Length | Description                                  |
| ---------- | --- | ----------------------------------------- | ------ | -------------------------------------------- |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        | Get actual currencies by owned user accounts |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "currencies": [
            {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Currency rate

### Get crypto

Returns crypto currencies rates

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currencyrate/get-crypto |


#### Request

| Parameter     |  M  | Type       | Length | Description |
| ------------- | --- | ---------- | ------ | ----------- |
| period        | N   | string     |        |             |
| currencyCodes | N   | Collection |        |             |


```json
{
    "period": "",
    "currencyCodes": ""
}
```

#### Response

| Parameter       |  M  | Type                                          | Length | Description |
| --------------- | --- | --------------------------------------------- | ------ | ----------- |
| displayCurrency | N   | [`Currency`](#appendix--type--currency)       |        |             |
| rates           | N   | [`CryptoRate`](#appendix--type--cryptorate)[] |        |             |


```json
{
    "displayCurrency": {
        "id": 144,
        "name": "United States Dollar",
        "code": "USD",
        "ison": 840,
        "multiplier": 100,
        "precision": 2,
        "cryptoCurrency": false
    },
    "rates": [
        {
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            },
            "minRate": "",
            "maxRate": "",
            "currentRate": "",
            "data": [
                {
                    "dateTime": "",
                    "rate": ""
                }
            ]
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get all

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/currencyrate/get-all |


#### Request

| Parameter |  M  | Type                                    | Length | Description |
| --------- | --- | --------------------------------------- | ------ | ----------- |
| date      | N   | [`DateTime`](#appendix--type--datetime) |        |             |


```json
{
    "date": []
}
```

## Document

### Get all

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/document/get-all |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                                            | Length | Description |
| --------- | --- | ----------------------------------------------- | ------ | ----------- |
| documents | N   | [`KycDocument`](#appendix--type--kycdocument)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "documents": [
            {
                "id": "",
                "status": {
                    "id": "",
                    "name": ""
                },
                "type": {
                    "id": "",
                    "name": "",
                    "groupId": ""
                },
                "dateUpdated": "",
                "approvalDate": "",
                "requestDate": "",
                "requestComment": "",
                "file": {
                    "id": "",
                    "name": "",
                    "extension": "",
                    "size": ""
                },
                "bankAccountId": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Upload

Upload request document

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/document/upload |


#### Request

| Parameter  |  M  | Type                                        | Length | Description |
| ---------- | --- | ------------------------------------------- | ------ | ----------- |
| documentId | Y   | int                                         |        |             |
| file       | Y   | [`Base64File`](#appendix--type--base64file) |        |             |


```json
{
    "documentId": "",
    "file": {
        "name": "",
        "content": "",
        "contentType": ""
    }
}
```

#### Response

```json
[]
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Email

### Get email templates for sponsored users

| URL                                                                           |
| ----------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/email/get-email-templates-for-sponsored-users |


#### Request

No parameters need

#### Response

| Parameter      |  M  | Type                                                | Length | Description |
| -------------- | --- | --------------------------------------------------- | ------ | ----------- |
| emailTemplates | N   | [`EmailTemplate`](#appendix--type--emailtemplate)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "emailTemplates": [
            {
                "id": 12345,
                "name": "template_name",
                "title": "Welcome letter",
                "titleTag": "TITLE_TAG",
                "text": "<p>Template content in html<\/p>",
                "textTag": "TEXT_TAG",
                "subject": "Template subject",
                "subjectTag": "SUBJECT_TAG",
                "category": 2,
                "placeholders": "['username']"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send sponsored email

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/email/send-sponsored-email |


#### Request

| Parameter         |  M  | Type               | Length | Description                     |
| ----------------- | --- | ------------------ | ------ | ------------------------------- |
| receivers         | Y   | Collection         |        |                                 |
| subject           | Y   | string             |        |                                 |
| template          | N   | null &#124; string |        |                                 |
| message           | Y   | string             |        |                                 |
| copyToEmail       | N   | null &#124; bool   |        |                                 |
| emailValidateLink | N   | null &#124; string |        |                                 |
| category          | Y   | int                |        | 1 - validate_email, 2 - generic |


```json
{
    "receivers": "['username']",
    "subject": "Email subject",
    "template": "user_register",
    "message": "Email content in html",
    "copyToEmail": true,
    "emailValidateLink": "http:\/\/your-site.com\/auth\/validateemail\/id\/[recipientId]\/key\/[validateKey]",
    "category": 2
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send referral link

Sends email with referral link to provided emails

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/email/send-referral-link |


#### Request

| Parameter    |  M  | Type       | Length | Description |
| ------------ | --- | ---------- | ------ | ----------- |
| emails       | Y   | Collection |        |             |
| referralLink | Y   | string     |        |             |


```json
{
    "emails": "['myemail@gmail.com']",
    "referralLink": ""
}
```

#### Response

| Parameter       |  M  | Type       | Length | Description |
| --------------- | --- | ---------- | ------ | ----------- |
| sendToEmails    | N   | Collection |        |             |
| notSendToEmails | N   | Collection |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "sendToEmails": "",
        "notSendToEmails": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get email

Gets email body

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/email/get-email |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | Y   | int    |        |             |
| userIp    | Y   | string |        |             |


```json
{
    "id": "123456789",
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| emailBody | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "emailBody": "<div><table><tbody><tr><td>Hello,<br> This is email <b>example<\/b><\/td><\/tr><\/tbody><\/table><\/div>"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## External card

### Get all

Get all users external cards

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/externalcard/get-all |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| confirmed | N   | null &#124; bool                                      |        |             |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "confirmed": true,
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| externalCards   | N   | [`ExternalCard`](#appendix--type--externalcard)[]                 |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "externalCards": [
            {
                "id": "",
                "cardNumber": "",
                "nameOnCard": "",
                "status": {
                    "id": "",
                    "name": "",
                    "canVerify": true,
                    "verificationExpired": false,
                    "suspended": false
                },
                "brand": ""
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Can user add without kyc and validated phone

| URL                                                                                       |
| ----------------------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/externalcard/can-user-add-without-kyc-and-validated-phone |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| result    | N   | bool |        |             |


```json
{
    "result": true
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Add

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/externalcard/add |


#### Request

| Parameter                |  M  | Type                                                                      | Length | Description |
| ------------------------ | --- | ------------------------------------------------------------------------- | ------ | ----------- |
| verificationCurrencyCode | Y   | string                                                                    |        |             |
| userIp                   | Y   | string                                                                    |        |             |
| nameOnCard               | Y   | string                                                                    |        |             |
| cardNumber               | Y   | string                                                                    | 19     |             |
| csc                      | Y   | string                                                                    | 4      |             |
| expirationMonth          | Y   | string                                                                    | 2      |             |
| expirationYear           | Y   | string                                                                    | 4      |             |
| cardHolderAddress        | Y   | [`ExternalCardHolderAddress`](#appendix--type--externalcardholderaddress) |        |             |


```json
{
    "verificationCurrencyCode": "",
    "userIp": "",
    "nameOnCard": "",
    "cardNumber": "",
    "csc": "",
    "expirationMonth": "",
    "expirationYear": "",
    "cardHolderAddress": {
        "addressLineOne": "",
        "city": "",
        "postal": "",
        "state": "",
        "countryId": ""
    }
}
```

#### Response

| Parameter    |  M  | Type                                                              | Length | Description |
| ------------ | --- | ----------------------------------------------------------------- | ------ | ----------- |
| s3d          | N   | null &#124; [`ExternalCardS3d`](#appendix--type--externalcards3d) |        |             |
| externalCard | N   | [`ExternalCard`](#appendix--type--externalcard)                   |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "s3d": {
            "md": "",
            "paReq": "",
            "action": ""
        },
        "externalCard": {
            "id": "",
            "cardNumber": "",
            "nameOnCard": "",
            "status": {
                "id": "",
                "name": "",
                "canVerify": false,
                "verificationExpired": true,
                "suspended": true
            },
            "brand": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Add finish s3d

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/externalcard/add-finish-s3d |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| md        | Y   | string |        |             |
| paRes     | Y   | string |        |             |


```json
{
    "md": "",
    "paRes": ""
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| externalCard | N   | [`ExternalCard`](#appendix--type--externalcard) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "externalCard": {
            "id": "",
            "cardNumber": "",
            "nameOnCard": "",
            "status": {
                "id": "",
                "name": "",
                "canVerify": false,
                "verificationExpired": false,
                "suspended": true
            },
            "brand": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Verify

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/externalcard/verify |


#### Request

| Parameter      |  M  | Type   | Length | Description |
| -------------- | --- | ------ | ------ | ----------- |
| externalCardId | Y   | int    |        |             |
| amount         | Y   | string |        |             |


```json
{
    "externalCardId": "",
    "amount": ""
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| externalCard | N   | [`ExternalCard`](#appendix--type--externalcard) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "externalCard": {
            "id": "",
            "cardNumber": "",
            "nameOnCard": "",
            "status": {
                "id": "",
                "name": "",
                "canVerify": true,
                "verificationExpired": false,
                "suspended": false
            },
            "brand": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Faq

### Get faq

| URL                                         |
| ------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/faq/get-faq |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                          | Length | Description |
| --------- | --- | ----------------------------- | ------ | ----------- |
| faq       | N   | [`Faq`](#appendix--type--faq) |        |             |


```json
{
    "faq": {
        "topics": [
            {
                "title": "",
                "icon": "",
                "questionsGroups": [
                    {
                        "title": "",
                        "questions": [
                            {
                                "title": "",
                                "answer": ""
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Filebox

### Save avatar paths

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/filebox/save-avatar-paths |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| avatars   | N   | [`UploadedAvatar`](#appendix--type--uploadedavatar)[] |        |             |


```json
{
    "avatars": [
        {
            "dimensions": "",
            "path": "",
            "size": ""
        }
    ]
}
```

#### Response

| Parameter    |  M  | Type                   | Length | Description |
| ------------ | --- | ---------------------- | ------ | ----------- |
| deletedPaths | N   | null &#124; Collection |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "deletedPaths": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete avatar paths

Delete user profile avatar

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/filebox/delete-avatar-paths |


#### Request

No parameters need

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Iban

### Get all

Returns all IBAN's

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-all |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| ibans           | N   | [`Iban`](#appendix--type--iban)[]                                 |        |             |
| restriction     | N   | null &#124; [`Restriction`](#appendix--type--restriction)         |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "ibans": [
            {
                "id": 15713192584460,
                "internalName": "Internal name",
                "accountId": 8786738,
                "accountName": "Account name",
                "accountAddress": "Nulla St. Mankato Mississippi 96522",
                "accountNumber": "78587946",
                "sortCode": "040059",
                "iban": "GB999999999999999",
                "bic": "SRLGGB2L",
                "currencyCode": "EUR",
                "status": "Active",
                "bankProvider": {
                    "id": 1,
                    "providerCode": "CENTROLINK"
                },
                "bankName": "",
                "bankAddress": ""
            }
        ],
        "restriction": {
            "message": "You are not able to make this transfer",
            "messageCode": "YOU_ARE_NOT_ALLOWED_TO_MAKE_THIS_TRANSFER",
            "messageParams": "['method' => 'paypal']"
        },
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban accounts

Returns all accounts for IBAN creation

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-accounts |


#### Request

No parameters need

#### Response

| Parameter   |  M  | Type                                            | Length | Description |
| ----------- | --- | ----------------------------------------------- | ------ | ----------- |
| accountName | N   | string                                          |        |             |
| accounts    | N   | [`IbanAccount`](#appendix--type--ibanaccount)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "accountName": "UAB Tribe",
        "accounts": [
            {
                "id": 15789164840012,
                "currencyCode": "EUR"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban requests

Returns all IBAN's requests

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-requests |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| ibanRequests    | N   | [`CreateIbanRequest`](#appendix--type--createibanrequest)[]       |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "ibanRequests": [
            {
                "internalName": "Internal name",
                "accountId": 843212,
                "dateOfCompanyIncorporation": "2020-04-13",
                "industryId": 1
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Reject ibans direct debit transfer

Rejects ibans direct debit transfer

| URL                                                                     |
| ----------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/reject-ibans-direct-debit-transfer |


#### Request

| Parameter             |  M  | Type | Length | Description |
| --------------------- | --- | ---- | ------ | ----------- |
| directDebitTransferId | Y   | int  |        |             |


```json
{
    "directDebitTransferId": 88810508
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Cancel iban mandate

Cancels iban mandate

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/cancel-iban-mandate |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| mandateId | Y   | int  |        |             |


```json
{
    "mandateId": 88810508
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban mandates

Returns all iban mandates

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-mandates |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| ibanRequests    | N   | [`CreateIbanRequest`](#appendix--type--createibanrequest)[]       |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "ibanRequests": [
            {
                "internalName": "Internal name",
                "accountId": 843212,
                "dateOfCompanyIncorporation": "2020-04-13",
                "industryId": 1
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban direct debit transfers

Returns all iban direct debit transfers

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-direct-debit-transfers |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter                           |  M  | Type                                                              | Length | Description |
| ----------------------------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| directDebitTransfers                | N   | [`DirectDebitTransfer`](#appendix--type--directdebittransfer)[]   |        |             |
| directDebitTransfersPaginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "directDebitTransfers": [
            {
                "id": 88810508,
                "mandateId": 88810508,
                "iban": "LT484573293586818295",
                "accountId": 88810508,
                "money": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "reference": null,
                "originatorAccName": "Name",
                "originatorAccNumber": "12345",
                "originatorAccSortCode": "ShortName",
                "originatorAccServiceUserNumber": "12345",
                "status": "12345",
                "txIbansStatus": "12345"
            }
        ],
        "directDebitTransfersPaginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create iban

Creates IBAN

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/iban/create-iban |


#### Request

| Parameter                  |  M  | Type                                                | Length | Description                                 |
| -------------------------- | --- | --------------------------------------------------- | ------ | ------------------------------------------- |
| internalName               | N   | null &#124; string                                  | 100    |                                             |
| accountId                  | Y   | int                                                 |        |                                             |
| dateOfCompanyIncorporation | N   | null &#124; [`DateTime`](#appendix--type--datetime) |        | Must be used only for business IBAN create. |
| industryId                 | N   | null &#124; int                                     |        | Must be used only for business IBAN create. |


```json
{
    "internalName": "Internal name",
    "accountId": 843212,
    "dateOfCompanyIncorporation": "2020-04-13",
    "industryId": 1
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban accounts for transfer

Returns all Accounts for IBAN transfer/withdrawal

| URL                                                                 |
| ------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-accounts-for-transfer |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                                                            | Length | Description |
| --------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| accounts  | N   | [`IbanTransferAccount`](#appendix--type--ibantransferaccount)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "accounts": [
            {
                "id": 123123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                },
                "balance": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "status": {
                    "id": 1,
                    "name": "Normal"
                },
                "ibans": [
                    {
                        "id": 15713192584460,
                        "internalName": "Internal name",
                        "accountId": 8786738,
                        "accountName": "Account name",
                        "accountAddress": "Nulla St. Mankato Mississippi 96522",
                        "accountNumber": "78587946",
                        "sortCode": "040059",
                        "iban": "GB999999999999999",
                        "bic": "SRLGGB2L",
                        "currencyCode": "EUR",
                        "status": "Active",
                        "bankProvider": {
                            "id": 1,
                            "providerCode": "CENTROLINK"
                        },
                        "bankName": "",
                        "bankAddress": ""
                    }
                ]
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban transfer purposes

Returns IBAN transfer purposes

| URL                                                             |
| --------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-transfer-purposes |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                                                                                    | Length | Description |
| --------- | --- | --------------------------------------------------------------------------------------- | ------ | ----------- |
| purposes  | N   | [`AcRequestWithdrawDetailsPurpose`](#appendix--type--acrequestwithdrawdetailspurpose)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "purposes": [
            {
                "id": "",
                "purpose": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create iban transfer

Creates IBAN transfer/ withdrawal.

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/create-iban-transfer |


#### Request

| Parameter             |  M  | Type               | Length | Description                                   |
| --------------------- | --- | ------------------ | ------ | --------------------------------------------- |
| sendingAccountId      | Y   | int                |        |                                               |
| ibanFrom              | Y   | string             |        |                                               |
| amount                | Y   | int                |        |                                               |
| currencyCode          | Y   | string             | 3      |                                               |
| receiverName          | Y   | string             | 40     |                                               |
| ibanTo                | N   | null &#124; string | 34     |                                               |
| receiverType          | Y   | int                |        | 1 - individual,2 - business                   |
| receiverAccountNumber | N   | null &#124; string | 26     |                                               |
| receiverSortCode      | N   | null &#124; string | 34     |                                               |
| beneficiaryAddress    | N   | null &#124; string | 70     |                                               |
| beneficiaryPostCode   | N   | null &#124; string | 20     |                                               |
| beneficiaryCity       | N   | null &#124; string | 20     |                                               |
| beneficiaryCountry    | N   | null &#124; int    |        |                                               |
| messageForBeneficiary | N   | null &#124; string | 140    | For ClearBank provider - max 35 characters.   |
| outgoingPurpose       | N   | null &#124; int    |        |                                               |
| industryId            | N   | null &#124; int    |        | Must be used only for business receiver type. |


```json
{
    "sendingAccountId": 812342,
    "ibanFrom": "GB999999999999999",
    "amount": 100,
    "currencyCode": "",
    "receiverName": "John Doe",
    "ibanTo": "GB888888888888888",
    "receiverType": 1,
    "receiverAccountNumber": 41234233,
    "receiverSortCode": 123456,
    "beneficiaryAddress": "Kestucio st. 24",
    "beneficiaryPostCode": 45266,
    "beneficiaryCity": "Kaunas",
    "beneficiaryCountry": 123,
    "messageForBeneficiary": "Salary",
    "outgoingPurpose": 1,
    "industryId": 1
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get iban order fee

Gets IBAN order fee

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-iban-order-fee |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| accountId | Y   | int  |        |             |


```json
{
    "accountId": 843212
}
```

#### Response

| Parameter |  M  | Type                              | Length | Description |
| --------- | --- | --------------------------------- | ------ | ----------- |
| amount    | N   | [`Money`](#appendix--type--money) |        |             |
| active    | N   | bool                              |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "amount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "active": true
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get industries

Get available industries list.

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/get-industries |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| industries | N   | [`Industry`](#appendix--type--industry)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "industries": [
            {
                "id": 1,
                "name": "Travel services"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Suspend iban

Suspend iban via user reuqest

| URL                                               |
| ------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/suspend-iban |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| ibanId    | Y   | int  |        |             |


```json
{
    "ibanId": 1591519841168
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Un suspend iban

Unsuspend iban via user reuqest

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/un-suspend-iban |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| ibanId    | Y   | int  |        |             |


```json
{
    "ibanId": 1591519841168
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Can order iban

Check if user can order IBAN

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/iban/can-order-iban |


#### Request

No parameters need

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Legal agreements

### Get terms and conditions with user agreement status

| URL                                                                                                 |
| --------------------------------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/legalagreements/get-terms-and-conditions-with-user-agreement-status |


#### Request

No parameters need

#### Response

| Parameter            |  M  | Type                                                | Length | Description |
| -------------------- | --- | --------------------------------------------------- | ------ | ----------- |
| termsAndConditionsId | N   | int                                                 |        |             |
| agreed               | N   | bool                                                |        |             |
| changed              | N   | bool                                                |        |             |
| termsAndConditions   | N   | [`LegalAgreement`](#appendix--type--legalagreement) |        |             |


```json
{
    "termsAndConditionsId": "",
    "agreed": false,
    "changed": true,
    "termsAndConditions": {
        "header": "",
        "content": [
            {
                "number": "",
                "title": "",
                "content": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get terms and conditions

| URL                                                                      |
| ------------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/legalagreements/get-terms-and-conditions |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| type      | N   | string |        |             |
| userIp    | Y   | string |        |             |


```json
{
    "type": "",
    "userIp": ""
}
```

#### Response

| Parameter          |  M  | Type                                                | Length | Description |
| ------------------ | --- | --------------------------------------------------- | ------ | ----------- |
| termsAndConditions | N   | [`LegalAgreement`](#appendix--type--legalagreement) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "termsAndConditions": {
            "header": "",
            "content": [
                {
                    "number": "",
                    "title": "",
                    "content": ""
                }
            ]
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Agree to terms and conditions

| URL                                                                           |
| ----------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/legalagreements/agree-to-terms-and-conditions |


#### Request

| Parameter            |  M  | Type | Length | Description |
| -------------------- | --- | ---- | ------ | ----------- |
| termsAndConditionsId | Y   | int  |        |             |


```json
{
    "termsAndConditionsId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get privacy policy

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/legalagreements/get-privacy-policy |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | Y   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter     |  M  | Type                                                | Length | Description |
| ------------- | --- | --------------------------------------------------- | ------ | ----------- |
| privacyPolicy | N   | [`LegalAgreement`](#appendix--type--legalagreement) |        |             |


```json
{
    "privacyPolicy": {
        "header": "",
        "content": [
            {
                "number": "",
                "title": "",
                "content": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send terms and conditions to email

| URL                                                                                |
| ---------------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/legalagreements/send-terms-and-conditions-to-email |


#### Request

No parameters need

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Load

### Bank account to account

| URL                                                          |
| ------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/load/bank-account-to-account |


#### Request

| Parameter          |  M  | Type               | Length | Description |
| ------------------ | --- | ------------------ | ------ | ----------- |
| receivingAccountId | Y   | int                |        |             |
| amount             | Y   | int                |        |             |
| currencyCode       | Y   | string             | 3      |             |
| referenceNumber    | N   | null &#124; string | 40     |             |
| onlyValidate       | Y   | bool               |        |             |
| sendEmail          | N   | bool               |        |             |


```json
{
    "receivingAccountId": 123,
    "amount": 100,
    "currencyCode": "USD",
    "referenceNumber": "",
    "onlyValidate": false,
    "sendEmail": false
}
```

#### Only validate response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| totalAmount     | N   | [`Money`](#appendix--type--money)                     |        |             |
| fee             | N   | [`Money`](#appendix--type--money)                     |        |             |
| referenceNumber | N   | string                                                |        |             |
| bankDetails     | N   | [`LoadBankDetails`](#appendix--type--loadbankdetails) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "referenceNumber": "",
        "bankDetails": {
            "accountName": "",
            "bankName": "",
            "branchAndAddress": "",
            "accountNumber": "",
            "accountAddress": "",
            "iban": "",
            "swift": ""
        }
    }
}
```

#### Response

| Parameter        |  M  | Type                                                  | Length | Description |
| ---------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| amountToTransfer | N   | [`Money`](#appendix--type--money)                     |        |             |
| bankDetails      | N   | [`LoadBankDetails`](#appendix--type--loadbankdetails) |        |             |
| referenceNumber  | N   | string                                                |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "amountToTransfer": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "bankDetails": {
            "accountName": "",
            "bankName": "",
            "branchAndAddress": "",
            "accountNumber": "",
            "accountAddress": "",
            "iban": "",
            "swift": ""
        },
        "referenceNumber": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Crypto to account

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/load/crypto-to-account |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| cryptoCurrencyCode | Y   | string |        |                      |
| receivingAccountId | Y   | int    |        |                      |
| amount             | Y   | int    |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| onlyValidate       | Y   | bool   |        |                      |


```json
{
    "cryptoCurrencyCode": "BTC",
    "receivingAccountId": 123,
    "amount": 100,
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter |  M  | Type                              | Length | Description |
| --------- | --- | --------------------------------- | ------ | ----------- |
| fee       | N   | [`Money`](#appendix--type--money) |        |             |
| amount    | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "amount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

| Parameter        |  M  | Type                              | Length | Description |
| ---------------- | --- | --------------------------------- | ------ | ----------- |
| amountToTransfer | N   | [`Money`](#appendix--type--money) |        |             |
| receivingAddress | N   | string                            |        |             |
| destinationTag   | N   | null &#124; string                |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "amountToTransfer": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "receivingAddress": "",
        "destinationTag": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Crypto to random account

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/crypto-to-random-account |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| cryptoCurrencyCode | Y   | string |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| generateNewAddress | N   | bool   |        |                      |


```json
{
    "cryptoCurrencyCode": "BTC",
    "userIp": "127.0.0.1",
    "generateNewAddress": true
}
```

#### Response

| Parameter        |  M  | Type               | Length | Description |
| ---------------- | --- | ------------------ | ------ | ----------- |
| receivingAddress | N   | string             |        |             |
| destinationTag   | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "receivingAddress": "",
        "destinationTag": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Universal to account

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/universal-to-account |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| paymentMethod      | Y   | string |        |                      |
| receivingAccountId | Y   | int    |        |                      |
| amount             | Y   | int    |        |                      |
| returnUrl          | Y   | string |        |                      |
| cancelUrl          | Y   | string |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| onlyValidate       | Y   | bool   |        |                      |


```json
{
    "paymentMethod": "paypal",
    "receivingAccountId": 123,
    "amount": 100,
    "returnUrl": "",
    "cancelUrl": "",
    "userIp": "127.0.0.1",
    "onlyValidate": true
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Sofort to account

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/load/sofort-to-account |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| sofortId           | Y   | string |        |                      |
| receivingAccountId | Y   | int    |        |                      |
| amount             | Y   | int    |        |                      |
| returnUrl          | Y   | string |        |                      |
| cancelUrl          | Y   | string |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| onlyValidate       | Y   | bool   |        |                      |


```json
{
    "sofortId": "",
    "receivingAccountId": 123,
    "amount": 100,
    "returnUrl": "",
    "cancelUrl": "",
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Qiwi to account

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/qiwi-to-account |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| phone              | Y   | string |        |                      |
| receivingAccountId | Y   | int    |        |                      |
| amount             | Y   | int    |        |                      |
| returnUrl          | Y   | string |        |                      |
| cancelUrl          | Y   | string |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| onlyValidate       | Y   | bool   |        |                      |


```json
{
    "phone": "",
    "receivingAccountId": 123,
    "amount": 100,
    "returnUrl": "",
    "cancelUrl": "",
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### External card to account

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/external-card-to-account |


#### Request

| Parameter             |  M  | Type            | Length | Description          |
| --------------------- | --- | --------------- | ------ | -------------------- |
| sendingExternalCardId | Y   | int             |        |                      |
| cvv                   | N   | string          |        |                      |
| receivingAccountId    | Y   | int             |        |                      |
| amount                | Y   | int             |        |                      |
| currencyCode          | Y   | string          | 3      |                      |
| userIp                | Y   | string          |        | Customer ip address. |
| onlyValidate          | Y   | bool            |        |                      |
| depositCategoryType   | N   | null &#124; int |        |                      |


```json
{
    "sendingExternalCardId": 123,
    "cvv": "",
    "receivingAccountId": 123,
    "amount": 100,
    "currencyCode": "USD",
    "userIp": "127.0.0.1",
    "onlyValidate": true,
    "depositCategoryType": ""
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

| Parameter     |  M  | Type                                                              | Length | Description |
| ------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| transactionId | N   | null &#124; int                                                   |        |             |
| s3d           | N   | null &#124; [`ExternalCardS3d`](#appendix--type--externalcards3d) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactionId": "",
        "s3d": {
            "md": "",
            "paReq": "",
            "action": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### New external card to account

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/new-external-card-to-account |


#### Request

| Parameter           |  M  | Type                                                  | Length | Description          |
| ------------------- | --- | ----------------------------------------------------- | ------ | -------------------- |
| newExternalCard     | N   | [`NewExternalCard`](#appendix--type--newexternalcard) |        |                      |
| receivingAccountId  | Y   | int                                                   |        |                      |
| amount              | Y   | int                                                   |        |                      |
| currencyCode        | Y   | string                                                | 3      |                      |
| userIp              | Y   | string                                                |        | Customer ip address. |
| onlyValidate        | Y   | bool                                                  |        |                      |
| depositCategoryType | N   | null &#124; int                                       |        |                      |


```json
{
    "newExternalCard": {
        "nameOnCard": "",
        "cardNumber": "",
        "csc": "",
        "expirationMonth": "",
        "expirationYear": "",
        "cardHolderAddress": {
            "addressLineOne": "",
            "city": "",
            "postal": "",
            "state": "",
            "countryId": ""
        }
    },
    "receivingAccountId": 123,
    "amount": 100,
    "currencyCode": "USD",
    "userIp": "127.0.0.1",
    "onlyValidate": false,
    "depositCategoryType": ""
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

| Parameter     |  M  | Type                                                              | Length | Description |
| ------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| transactionId | N   | null &#124; int                                                   |        |             |
| s3d           | N   | null &#124; [`ExternalCardS3d`](#appendix--type--externalcards3d) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactionId": "",
        "s3d": {
            "md": "",
            "paReq": "",
            "action": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### External card to account finish

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/external-card-to-account-finish |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| md        | N   | string |        |             |
| pares     | N   | string |        |             |


```json
{
    "md": "",
    "pares": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get external card deposit categories

| URL                                                                       |
| ------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/load/get-external-card-deposit-categories |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                                                            | Length | Description |
| ---------- | --- | ------------------------------------------------------------------------------- | ------ | ----------- |
| categories | N   | [`ExternalCardDepositCategory`](#appendix--type--externalcarddepositcategory)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "categories": [
            {
                "type": "",
                "name": "",
                "assignedAccountsIds": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Message

### Get all

Returns all user messages

| URL                                             |
| ----------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/get-all |


#### Request

| Parameter        |  M  | Type             | Length | Description |
| ---------------- | --- | ---------------- | ------ | ----------- |
| type             | Y   | string           |        |             |
| page             | Y   | int              |        |             |
| itemCountPerPage | N   | int              |        |             |
| permanent        | N   | null &#124; bool |        |             |


```json
{
    "type": "",
    "page": "",
    "itemCountPerPage": "",
    "permanent": false
}
```

#### Response

| Parameter   |  M  | Type                                                  | Length | Description |
| ----------- | --- | ----------------------------------------------------- | ------ | ----------- |
| messages    | N   | [`Message`](#appendix--type--message)[]               |        |             |
| paginator   | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |
| unreadCount | N   | int                                                   |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "messages": [
            {
                "id": "",
                "time": "",
                "subject": "",
                "content": "",
                "sender": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "receiver": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "type": "",
                "read": true,
                "permanent": true,
                "attachments": [
                    {
                        "id": "",
                        "filename": "",
                        "sensitive": false
                    }
                ]
            }
        ],
        "paginator": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        },
        "unreadCount": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### View

Returns user message

| URL                                          |
| -------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/view |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| messageId | Y   | int  |        |             |


```json
{
    "messageId": ""
}
```

#### Response

| Parameter |  M  | Type                                  | Length | Description |
| --------- | --- | ------------------------------------- | ------ | ----------- |
| message   | N   | [`Message`](#appendix--type--message) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "message": {
            "id": "",
            "time": "",
            "subject": "",
            "content": "",
            "sender": {
                "id": "",
                "name": "",
                "type": "",
                "avatar": ""
            },
            "receiver": {
                "id": "",
                "name": "",
                "type": "",
                "avatar": ""
            },
            "type": "",
            "read": false,
            "permanent": false,
            "attachments": [
                {
                    "id": "",
                    "filename": "",
                    "sensitive": true
                }
            ]
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get attachment

Returns message attachment

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/message/get-attachment |


#### Request

| Parameter    |  M  | Type | Length | Description |
| ------------ | --- | ---- | ------ | ----------- |
| attachmentId | Y   | int  |        |             |


```json
{
    "attachmentId": ""
}
```

#### Response

| Parameter  |  M  | Type                                                      | Length | Description |
| ---------- | --- | --------------------------------------------------------- | ------ | ----------- |
| attachment | N   | [`MessageAttachment`](#appendix--type--messageattachment) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "attachment": {
            "id": "",
            "filename": "",
            "contentType": "",
            "bodyBase64": "",
            "sensitive": false
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get departments

Returns available departaments

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/get-departments |


#### Request

No parameters need

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| departaments | N   | [`Departament`](#appendix--type--departament)[] |        |             |


```json
{
    "departaments": [
        {
            "id": "",
            "name": ""
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get departments subjects

Returns departaments subjects

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/get-departments-subjects |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                                                        | Length | Description |
| --------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| subjects  | N   | [`DepartmentSubject`](#appendix--type--departmentsubject)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "subjects": [
            {
                "id": "",
                "name": "",
                "group": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Mark as read

Marks messages as read

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/mark-as-read |


#### Request

| Parameter  |  M  | Type       | Length | Description |
| ---------- | --- | ---------- | ------ | ----------- |
| messageIds | Y   | Collection |        |             |


```json
{
    "messageIds": "[1, 2, 3]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Mark as unread

Marks messages as unread

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/message/mark-as-unread |


#### Request

| Parameter  |  M  | Type       | Length | Description |
| ---------- | --- | ---------- | ------ | ----------- |
| messageIds | Y   | Collection |        |             |


```json
{
    "messageIds": "[1, 2, 3]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send to users

Sends message to support department or another user

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/send-to-users |


#### Request

| Parameter       |  M  | Type                                          | Length | Description |
| --------------- | --- | --------------------------------------------- | ------ | ----------- |
| subject         | Y   | string                                        |        |             |
| content         | Y   | string                                        |        |             |
| recipients      | N   | Collection                                    |        |             |
| attachments     | N   | [`Base64File`](#appendix--type--base64file)[] |        |             |
| sendCopyToEmail | Y   | bool                                          |        |             |


```json
{
    "subject": "",
    "content": "",
    "recipients": "",
    "attachments": [
        {
            "name": "",
            "content": "",
            "contentType": ""
        }
    ],
    "sendCopyToEmail": true
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send to department

Sends message to department

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/send-to-department |


#### Request

| Parameter    |  M  | Type                                          | Length | Description |
| ------------ | --- | --------------------------------------------- | ------ | ----------- |
| subject      | Y   | string                                        |        |             |
| content      | Y   | string                                        |        |             |
| departmentId | Y   | string                                        |        |             |
| attachments  | N   | [`Base64File`](#appendix--type--base64file)[] |        |             |


```json
{
    "subject": "",
    "content": "",
    "departmentId": "",
    "attachments": [
        {
            "name": "",
            "content": "",
            "contentType": ""
        }
    ]
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete

Deletes messages

| URL                                            |
| ---------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/delete |


#### Request

| Parameter  |  M  | Type       | Length | Description |
| ---------- | --- | ---------- | ------ | ----------- |
| messageIds | N   | Collection |        |             |


```json
{
    "messageIds": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update permanent

Update messages permanent status

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/message/update-permanent |


#### Request

| Parameter  |  M  | Type       | Length | Description |
| ---------- | --- | ---------- | ------ | ----------- |
| messageIds | Y   | Collection |        |             |
| permanent  | Y   | bool       |        |             |


```json
{
    "messageIds": "[1, 2, 3]",
    "permanent": true
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Obb

### Authorize

OBB authorization call

| URL                                           |
| --------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/obb/authorize |


#### Request

| Parameter  |  M  | Type   | Length | Description          |
| ---------- | --- | ------ | ------ | -------------------- |
| userIp     | Y   | string |        | Customer ip address. |
| requestUrl | Y   | string |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "requestUrl": "https:\/\/bank.example.com\/redirect_uri=https:\/\/api.example.com\/v1\/callback&state=d73e24b1-099a-4278-b7b6-898ed24dc337&response_type=code&scopes=accounts%20payment.list%20consent%20account.lists%20funds.confirmations&client_id=112011111"
}
```

#### Response

| Parameter             |  M  | Type       | Length | Description                                                                                |
| --------------------- | --- | ---------- | ------ | ------------------------------------------------------------------------------------------ |
| scopes                | N   | Collection |        | account.list,account.balance,account.payments,account.payment,account.details,payment.init |
| tppName               | N   | string     |        |                                                                                            |
| tppRegistrationNumber | N   | string     |        |                                                                                            |
| cancelUrl             | N   | string     |        |                                                                                            |
| requestUrl            | N   | string     |        |                                                                                            |


```json
{
    "scopes": "['account.list']",
    "tppName": "TPP name",
    "tppRegistrationNumber": "UK-145441",
    "cancelUrl": "https:\/\/tpp.example.com\/authorize\/cancel?hash=JFB45sdasdJHNFDD554",
    "requestUrl": "https:\/\/bank.example.com\/redirect_uri=https:\/\/api.example.com\/v1\/callback&state=d73e24b1-099a-4278-b7b6-898ed24dc337&response_type=code&scopes=accounts%20payment.list%20consent%20account.lists%20funds.confirmations&client_id=112011111"
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Consent confirm

OBB consent/payment initiate confirmation

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/obb/consent-confirm |


#### Request

| Parameter  |  M  | Type               | Length | Description                                                                                |
| ---------- | --- | ------------------ | ------ | ------------------------------------------------------------------------------------------ |
| requestUrl | Y   | string             |        |                                                                                            |
| scopes     | Y   | Collection         |        | account.list,account.balance,account.payments,account.payment,account.details,payment.init |
| ibans      | Y   | Collection         |        |                                                                                            |
| cancelUrl  | N   | null &#124; string |        |                                                                                            |


```json
{
    "requestUrl": "https:\/\/bank.example.com\/redirect_uri=https:\/\/api.example.com\/v1\/callback&state=d73e24b1-099a-4278-b7b6-898ed24dc337&response_type=code&scopes=accounts%20payment.list%20consent%20account.lists%20funds.confirmations&client_id=112011111",
    "scopes": "['account.list']",
    "ibans": "['GB999999999999999']",
    "cancelUrl": "https:\/\/tpp.example.com\/authorize\/cancel?hash=JFB45sdasdJHNFDD554"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| callbackUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "callbackUrl": "https:\/\/tpp.example.com\/signed"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get payment confirmation data

Get payment confirmation data

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/obb/get-payment-confirmation-data |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| userIp    | Y   | string |        | Customer ip address. |
| paymentId | Y   | string |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "paymentId": "4GVDD4545DD"
}
```

#### Response

| Parameter             |  M  | Type                              | Length | Description |
| --------------------- | --- | --------------------------------- | ------ | ----------- |
| amount                | N   | [`Money`](#appendix--type--money) |        |             |
| senderIban            | N   | [`Iban`](#appendix--type--iban)   |        |             |
| receiverName          | N   | string                            |        |             |
| receiverIban          | N   | null &#124; string                |        |             |
| receiverAccountNumber | N   | null &#124; string                |        |             |
| receiverSortCode      | N   | null &#124; string                |        |             |
| messageForReceiver    | N   | null &#124; string                |        |             |
| cancelUrl             | N   | null &#124; string                |        |             |


```json
{
    "amount": {
        "amount": 123,
        "currency": {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": true
        }
    },
    "senderIban": {
        "id": 15713192584460,
        "internalName": "Internal name",
        "accountId": 8786738,
        "accountName": "Account name",
        "accountAddress": "Nulla St. Mankato Mississippi 96522",
        "accountNumber": "78587946",
        "sortCode": "040059",
        "iban": "GB999999999999999",
        "bic": "SRLGGB2L",
        "currencyCode": "EUR",
        "status": "Active",
        "bankProvider": {
            "id": 1,
            "providerCode": "CENTROLINK"
        },
        "bankName": "",
        "bankAddress": ""
    },
    "receiverName": "John Joe",
    "receiverIban": "GB999999999999999",
    "receiverAccountNumber": "41234233",
    "receiverSortCode": "123456",
    "messageForReceiver": "Salary",
    "cancelUrl": "https:\/\/tpp.example.com\/payment\/cancel?hash=JFB45sdasdJHNFDD554"
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Payment confirm

Payment confirm

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/obb/payment-confirm |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| userIp    | Y   | string |        | Customer ip address. |
| paymentId | Y   | string |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "paymentId": "4GVDD4545DD"
}
```

#### Response

| Parameter   |  M  | Type               | Length | Description |
| ----------- | --- | ------------------ | ------ | ----------- |
| callbackUrl | N   | null &#124; string |        |             |
| pinKey      | N   | null &#124; string |        |             |
| sentBySms   | N   | bool               |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "callbackUrl": "https:\/\/tpp.example.com\/signed",
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Payment link

### Get links

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/get-links |


#### Request

| Parameter      |  M  | Type                                                  | Length | Description                                                             |
| -------------- | --- | ----------------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| paymentMethod  | Y   | string                                                |        |                                                                         |
| maxReturnCount | N   | null &#124; int                                       |        |                                                                         |
| payerType      | N   | null &#124; int                                       |        | 1 - personal, 2 - business. Only pass this when paymentMethod is 'bank' |
| dateFrom       | N   | null &#124; [`DateTime`](#appendix--type--datetime)   |        |                                                                         |
| dateTo         | N   | null &#124; [`DateTime`](#appendix--type--datetime)   |        |                                                                         |
| currencyCode   | N   | null &#124; string                                    | 3      |                                                                         |
| accountId      | N   | null &#124; int                                       |        |                                                                         |
| paginator      | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |                                                                         |


```json
{
    "paymentMethod": "",
    "maxReturnCount": 10,
    "payerType": 1,
    "dateFrom": "2019-11-13",
    "dateTo": "2019-11-14",
    "currencyCode": "USD",
    "accountId": "123456",
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

### Create

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/create |


#### Request

| Parameter       |  M  | Type               | Length | Description                                                             |
| --------------- | --- | ------------------ | ------ | ----------------------------------------------------------------------- |
| paymentMethod   | Y   | string             |        |                                                                         |
| accountId       | Y   | int                |        |                                                                         |
| amount          | N   | null &#124; int    |        |                                                                         |
| currencyCode    | N   | null &#124; string | 3      |                                                                         |
| description     | N   | null &#124; string | 255    |                                                                         |
| payerType       | N   | null &#124; int    |        | 1 - personal, 2 - business. Only pass this when paymentMethod is 'bank' |
| noExpiration    | N   | null &#124; bool   |        |                                                                         |
| depositCategory | N   | null &#124; int    |        |                                                                         |


```json
{
    "paymentMethod": "bank",
    "accountId": 123456,
    "amount": 100,
    "currencyCode": "USD",
    "description": "Payment for dinner.",
    "payerType": 1,
    "noExpiration": false,
    "depositCategory": 2
}
```

### Disable

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/disable |


#### Request

| Parameter            |  M  | Type | Length | Description |
| -------------------- | --- | ---- | ------ | ----------- |
| paymentRequestLinkId | Y   | int  |        |             |


```json
{
    "paymentRequestLinkId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Enable

| URL                                                |
| -------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/enable |


#### Request

| Parameter            |  M  | Type | Length | Description |
| -------------------- | --- | ---- | ------ | ----------- |
| paymentRequestLinkId | Y   | int  |        |             |


```json
{
    "paymentRequestLinkId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get payment link data

Get payment link data

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/get-payment-link-data |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| referenceNumber | Y   | string |        |             |
| userIp          | N   | string |        |             |


```json
{
    "referenceNumber": "61415809087242913",
    "userIp": ""
}
```

#### Response

| Parameter        |  M  | Type                                          | Length | Description |
| ---------------- | --- | --------------------------------------------- | ------ | ----------- |
| paymentLink      | N   | [`PaymentLink`](#appendix--type--paymentlink) |        |             |
| username         | N   | string                                        |        |             |
| additionalData   | N   | null &#124; string                            |        |             |
| disableAddress   | N   | bool                                          |        |             |
| needConfirmation | N   | bool                                          |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "paymentLink": {
            "id": "",
            "accountId": "",
            "amount": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                }
            },
            "link": "",
            "disabled": true,
            "paymentMethod": "",
            "dateCreated": "",
            "dateExpired": "2019-11-13",
            "oneTimeUse": true,
            "status": ""
        },
        "username": "user123",
        "additionalData": "{address:'streetname132', destinationTag: '214dfd86'}",
        "disableAddress": true,
        "needConfirmation": true
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link

Initiate payment via payment link

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link c c

Initiate credit card payment via payment link

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-c-c |


#### Request

| Parameter           |  M  | Type               | Length | Description |
| ------------------- | --- | ------------------ | ------ | ----------- |
| userIp              | N   | string             |        |             |
| cardHolderFirstName | Y   | string             |        |             |
| cardHolderLastName  | Y   | string             |        |             |
| cardNumber          | Y   | string             | 19     |             |
| csc                 | Y   | string             | 4      |             |
| expirationDateMonth | Y   | string             | 2      |             |
| expirationDateYear  | Y   | string             | 4      |             |
| addressLineOne      | N   | null &#124; string |        |             |
| city                | N   | null &#124; string |        |             |
| postal              | N   | null &#124; string |        |             |
| countryId           | Y   | int                |        |             |
| email               | Y   | string             | 100    |             |
| referenceNumber     | Y   | string             |        |             |
| returnUrl           | Y   | string             |        |             |
| cancelUrl           | Y   | string             |        |             |


```json
{
    "userIp": "",
    "cardHolderFirstName": "John",
    "cardHolderLastName": "Doe",
    "cardNumber": "1234132413241234",
    "csc": "999",
    "expirationDateMonth": "12",
    "expirationDateYear": "2028",
    "addressLineOne": "",
    "city": "",
    "postal": "",
    "countryId": "",
    "email": "name@email.com",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |
| s3d         | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success",
        "s3d": "{<from action='s3durl.com\/confirm'><input value='token'\/><\/form>"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link cc s3d return

| URL                                                                         |
| --------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-cc-s3d-return |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |
| accountId | Y   | int    |        |             |
| linkId    | Y   | int    |        |             |
| md        | Y   | string |        |             |
| paRes     | Y   | string |        |             |


```json
{
    "userIp": "",
    "accountId": "",
    "linkId": "",
    "md": "",
    "paRes": ""
}
```

#### Response

| Parameter  |  M  | Type               | Length | Description |
| ---------- | --- | ------------------ | ------ | ----------- |
| successUrl | N   | null &#124; string |        |             |
| errorUrl   | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "successUrl": "http:\/\/your-site.com\/request\/cc\/success",
        "errorUrl": "http:\/\/your-site.com\/request\/cc\/error"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link ideal

Initiate Ideal payment via payment link

| URL                                                                 |
| ------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-ideal |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| firstName       | Y   | string |        |             |
| lastName        | Y   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "firstName": "John",
    "lastName": "Doe",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link qiwi

Initiate Qiwi payment via payment link

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-qiwi |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| phone           | Y   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "phone": "+3705668484",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link sofort

Initiate Sofort payment via payment link

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-sofort |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| sofortId        | Y   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "sofortId": "8468486",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| redirectUrl | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link crypto

Initiate crypto payment via payment link

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-crypto |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter     |  M  | Type                              | Length | Description |
| ------------- | --- | --------------------------------- | ------ | ----------- |
| amount        | N   | [`Money`](#appendix--type--money) |        |             |
| cryptoAddress | N   | string                            |        |             |
| redirectUrl   | N   | string                            |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "amount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "cryptoAddress": "6984FR875648",
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link ripple

Initiate Ripple payment via payment link

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-ripple |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | N   | string |        |             |
| referenceNumber | Y   | string |        |             |
| returnUrl       | Y   | string |        |             |
| cancelUrl       | Y   | string |        |             |


```json
{
    "userIp": "",
    "referenceNumber": "61415809087242913",
    "returnUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[success]",
    "cancelUrl": "http:\/\/your-site.com\/initiate-payment\/[method]\/[reference]\/[cancel]"
}
```

#### Response

| Parameter      |  M  | Type                              | Length | Description |
| -------------- | --- | --------------------------------- | ------ | ----------- |
| amount         | N   | [`Money`](#appendix--type--money) |        |             |
| cryptoAddress  | N   | string                            |        |             |
| destinationTag | N   | string                            |        |             |
| redirectUrl    | N   | string                            |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "amount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "cryptoAddress": "6984FR875648",
        "destinationTag": "12345678",
        "redirectUrl": "http:\/\/your-site.com\/request\/paypal\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link bank business

Initiate business bank trasfer via payment link

| URL                                                                         |
| --------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-bank-business |


#### Request

| Parameter         |  M  | Type                                                                              | Length | Description |
| ----------------- | --- | --------------------------------------------------------------------------------- | ------ | ----------- |
| userIp            | Y   | string                                                                            |        |             |
| referenceNumber   | Y   | string                                                                            |        |             |
| amount            | Y   | int                                                                               |        |             |
| currencyCode      | Y   | string                                                                            | 3      |             |
| name              | N   | null &#124; string                                                                | 50     |             |
| note              | N   | null &#124; string                                                                | 255    |             |
| description       | N   | null &#124; string                                                                | 255    |             |
| messageToReceiver | N   | null &#124; string                                                                | 255    |             |
| payer             | N   | [`BusinessPayer`](#appendix--type--businesspayer)                                 |        |             |
| bankDetails       | N   | [`BankDetails`](#appendix--type--bankdetails)                                     |        |             |
| recurringTransfer | Y   | bool                                                                              |        |             |
| period            | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod) |        |             |


```json
{
    "userIp": "127.0.0.1",
    "referenceNumber": "61415809087242913",
    "amount": 123456,
    "currencyCode": "USD",
    "name": "Example name",
    "note": "Example note",
    "description": "Example description",
    "messageToReceiver": "Example message to reciever",
    "payer": {
        "businessName": "Bussiness name",
        "businessRegistrationNumber": "Bussiness name",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "recurringTransfer": true,
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link bank personal

Initiate personal bank trasfer via payment link

| URL                                                                         |
| --------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-bank-personal |


#### Request

| Parameter         |  M  | Type                                                                              | Length | Description |
| ----------------- | --- | --------------------------------------------------------------------------------- | ------ | ----------- |
| userIp            | Y   | string                                                                            |        |             |
| referenceNumber   | Y   | string                                                                            |        |             |
| amount            | Y   | int                                                                               |        |             |
| currencyCode      | Y   | string                                                                            | 3      |             |
| name              | N   | null &#124; string                                                                | 50     |             |
| note              | N   | null &#124; string                                                                | 255    |             |
| description       | N   | null &#124; string                                                                | 255    |             |
| messageToReceiver | N   | null &#124; string                                                                | 255    |             |
| payer             | N   | [`PersonalPayer`](#appendix--type--personalpayer)                                 |        |             |
| bankDetails       | N   | [`BankDetails`](#appendix--type--bankdetails)                                     |        |             |
| recurringTransfer | Y   | bool                                                                              |        |             |
| period            | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod) |        |             |


```json
{
    "userIp": "127.0.0.1",
    "referenceNumber": "61415809087242913",
    "amount": 123456,
    "currencyCode": "USD",
    "name": "Example name",
    "note": "Example note",
    "description": "Example description",
    "messageToReceiver": "Example message to reciever",
    "payer": {
        "title": "Big John",
        "firstName": "John Joe",
        "middleName": "John",
        "lastName": "John Joe",
        "gender": "female",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "recurringTransfer": false,
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    }
}
```

#### Response

| Parameter        |  M  | Type               | Length | Description |
| ---------------- | --- | ------------------ | ------ | ----------- |
| referenceNumber  | N   | string             |        |             |
| amount           | N   | string             |        |             |
| currencyCode     | N   | null &#124; string |        |             |
| accountName      | N   | null &#124; string |        |             |
| bankName         | N   | null &#124; string |        |             |
| branchAndAddress | N   | null &#124; string |        |             |
| accountNumber    | N   | null &#124; string |        |             |
| accountAddress   | N   | null &#124; string |        |             |
| iban             | N   | null &#124; string |        |             |
| swift            | N   | null &#124; string |        |             |
| transferStatus   | N   | string             |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referenceNumber": "61415809087242913",
        "amount": 123456,
        "currencyCode": "USD",
        "accountName": "Example account",
        "bankName": "Example bank name",
        "branchAndAddress": "Example branch and address",
        "accountNumber": "123235",
        "accountAddress": "Example address",
        "iban": "Example iban",
        "swift": "Example swift",
        "transferStatus": "paid"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Transfer via link bank confirmation

Confirm bank trasfer via payment link

| URL                                                                             |
| ------------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentlink/transfer-via-link-bank-confirmation |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| userIp          | Y   | string |        |             |
| referenceNumber | Y   | string |        |             |


```json
{
    "userIp": "127.0.0.1",
    "referenceNumber": "61415809087242913"
}
```

#### Response

| Parameter        |  M  | Type               | Length | Description |
| ---------------- | --- | ------------------ | ------ | ----------- |
| referenceNumber  | N   | string             |        |             |
| amount           | N   | null &#124; string |        |             |
| currencyCode     | N   | null &#124; string |        |             |
| accountName      | N   | null &#124; string |        |             |
| bankName         | N   | null &#124; string |        |             |
| branchAndAddress | N   | null &#124; string |        |             |
| accountNumber    | N   | null &#124; string |        |             |
| accountAddress   | N   | null &#124; string |        |             |
| iban             | N   | null &#124; string |        |             |
| swift            | N   | null &#124; string |        |             |
| transferStatus   | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referenceNumber": "61415809087242913",
        "amount": 123456,
        "currencyCode": "USD",
        "accountName": "Example account",
        "bankName": "Example bank name",
        "branchAndAddress": "Example branch and address",
        "accountNumber": "123235",
        "accountAddress": "Example address",
        "iban": "Example iban",
        "swift": "Example swift",
        "transferStatus": "paid"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Payment method

### Get available with restrictions

| URL                                                                           |
| ----------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentmethod/get-available-with-restrictions |


#### Request

No parameters need

#### Response

| Parameter   |  M  | Type                                                        | Length | Description |
| ----------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| load        | N   | [`PaymentMethodGroup`](#appendix--type--paymentmethodgroup) |        |             |
| withdraw    | N   | [`PaymentMethodGroup`](#appendix--type--paymentmethodgroup) |        |             |
| loadViaLink | N   | [`PaymentMethodGroup`](#appendix--type--paymentmethodgroup) |        |             |


```json
{
    "load": {
        "universal": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": true,
                    "phoneVerificationRequired": true,
                    "documentsVerificationRequired": true,
                    "documentsVerificationPending": false,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": false
            }
        ],
        "externalCreditCard": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": false,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": false,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": false
            }
        ],
        "crypto": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": true,
                    "phoneVerificationRequired": true,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": true,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": true
            }
        ]
    },
    "withdraw": {
        "universal": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": true,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": true,
                    "documentsVerificationPending": false,
                    "blockedByIovation": true,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": false
            }
        ],
        "externalCreditCard": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": true,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": true,
                    "documentsVerificationPending": true,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": true
            }
        ],
        "crypto": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": false,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": false,
                    "blockedByIovation": true,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": true
            }
        ]
    },
    "loadViaLink": {
        "universal": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": false,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": false,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": true
            }
        ],
        "externalCreditCard": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": false,
                    "phoneVerificationRequired": false,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": false,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": false
            }
        ],
        "crypto": [
            {
                "name": "",
                "restriction": {
                    "userCountryRestricted": true,
                    "phoneVerificationRequired": true,
                    "documentsVerificationRequired": false,
                    "documentsVerificationPending": false,
                    "blockedByIovation": false,
                    "message": "",
                    "messageCode": "",
                    "messageParams": ""
                },
                "forCryptoAccountsOnly": false
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Payment request

### Get all templates

Returns payment request templates

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/get-all-templates |


#### Request

No parameters need

#### Response

| Parameter         |  M  | Type                                                                                  | Length | Description |
| ----------------- | --- | ------------------------------------------------------------------------------------- | ------ | ----------- |
| loadTemplates     | N   | [`PaymentRequestLoadTemplate`](#appendix--type--paymentrequestloadtemplate)[]         |        |             |
| withdrawTemplates | N   | [`PaymentRequestWithdrawTemplate`](#appendix--type--paymentrequestwithdrawtemplate)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "loadTemplates": [
            {
                "templateId": 123456,
                "templateName": "Example template",
                "templateNote": "Example note",
                "receiverBusinessName": "John Joe",
                "payer": {
                    "type": 1,
                    "title": "Big John",
                    "businessName": "Bussiness name",
                    "businessRegistrationNumber": "Bussiness name",
                    "firstName": "John Joe",
                    "middleName": "John",
                    "lastName": "John Joe",
                    "gender": "female",
                    "email": "email@you.com",
                    "mobile": "+55555477",
                    "address": "Address",
                    "state": "State",
                    "postal": "Postal",
                    "city": "City",
                    "country": {
                        "id": "",
                        "name": "",
                        "alphaTwoCode": "",
                        "alphaThreeCode": "",
                        "phoneCode": "",
                        "prohibited": false,
                        "highRisk": false,
                        "enabled": false,
                        "risk": "",
                        "regions": [
                            {
                                "id": "",
                                "name": "",
                                "shortName": ""
                            }
                        ]
                    },
                    "formData": {
                        "type": 1,
                        "title": "Big John",
                        "businessName": "Bussiness name",
                        "businessRegistrationNumber": "Bussiness name",
                        "firstName": "John Joe",
                        "middleName": "John",
                        "lastName": "John Joe",
                        "gender": "female",
                        "email": "email@you.com",
                        "mobile": "+55555477",
                        "address": "Address",
                        "state": "State",
                        "postal": "Postal",
                        "city": "City",
                        "countryId": 123
                    }
                },
                "bankDetails": {
                    "fullNameOnBankAccount": "Full name",
                    "name": "Bank name",
                    "address": "Bank Address",
                    "city": "Bank city",
                    "iban": "77787877775554",
                    "swift": "XXXX1234",
                    "country": {
                        "id": "",
                        "name": "",
                        "alphaTwoCode": "",
                        "alphaThreeCode": "",
                        "phoneCode": "",
                        "prohibited": false,
                        "highRisk": false,
                        "enabled": false,
                        "risk": "",
                        "regions": [
                            {
                                "id": "",
                                "name": "",
                                "shortName": ""
                            }
                        ]
                    },
                    "formData": {
                        "fullNameOnBankAccount": "Full name",
                        "name": "Bank name",
                        "address": "Bank Address",
                        "city": "Bank city",
                        "iban": "77787877775554",
                        "swift": "XXXX1234",
                        "countryId": 123
                    }
                },
                "account": {
                    "id": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    },
                    "balance": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    },
                    "outstandingFees": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    },
                    "status": {
                        "id": 1,
                        "name": "Normal"
                    },
                    "primary": false,
                    "type": {
                        "id": 1,
                        "name": "Personal"
                    },
                    "accountGroup": {
                        "id": 123,
                        "name": "Default account group"
                    },
                    "accountProgram": {
                        "id": 123,
                        "name": "Default account program"
                    },
                    "cardAutoFund": {
                        "enabled": false,
                        "accountId": 123,
                        "cardId": 123
                    },
                    "name": "Account name",
                    "customName": true,
                    "enabled": false
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "recurringTransfer": true,
                "recurringTransferDescription": "Example description",
                "period": {
                    "dateFrom": "",
                    "dateTo": "",
                    "type": "",
                    "weekday": "",
                    "day": ""
                },
                "type": "mu2m",
                "dateCreated": "2019-11-11"
            }
        ],
        "withdrawTemplates": [
            {
                "templateId": 123456,
                "templateName": "Example template",
                "templateNote": "Example note",
                "messageToReceiver": "For food",
                "payerBusinessName": "John Joe",
                "receiver": {
                    "title": "Big John",
                    "firstName": "John Joe",
                    "middleName": "John",
                    "lastName": "John Joe",
                    "gender": "female",
                    "email": "email@you.com",
                    "mobile": "+55555477",
                    "address": "Address",
                    "state": "State",
                    "postal": "Postal",
                    "city": "City",
                    "country": {
                        "id": "",
                        "name": "",
                        "alphaTwoCode": "",
                        "alphaThreeCode": "",
                        "phoneCode": "",
                        "prohibited": false,
                        "highRisk": true,
                        "enabled": true,
                        "risk": "",
                        "regions": [
                            {
                                "id": "",
                                "name": "",
                                "shortName": ""
                            }
                        ]
                    },
                    "formData": {
                        "title": "Big John",
                        "firstName": "John Joe",
                        "middleName": "John",
                        "lastName": "John Joe",
                        "gender": "female",
                        "email": "email@you.com",
                        "mobile": "+55555477",
                        "address": "Address",
                        "state": "State",
                        "postal": "Postal",
                        "city": "City",
                        "countryId": 123
                    }
                },
                "bankDetails": {
                    "fullNameOnBankAccount": "Full name",
                    "name": "Bank name",
                    "address": "Bank Address",
                    "city": "Bank city",
                    "iban": "77787877775554",
                    "swift": "XXXX1234",
                    "country": {
                        "id": "",
                        "name": "",
                        "alphaTwoCode": "",
                        "alphaThreeCode": "",
                        "phoneCode": "",
                        "prohibited": false,
                        "highRisk": false,
                        "enabled": false,
                        "risk": "",
                        "regions": [
                            {
                                "id": "",
                                "name": "",
                                "shortName": ""
                            }
                        ]
                    },
                    "formData": {
                        "fullNameOnBankAccount": "Full name",
                        "name": "Bank name",
                        "address": "Bank Address",
                        "city": "Bank city",
                        "iban": "77787877775554",
                        "swift": "XXXX1234",
                        "countryId": 123
                    }
                },
                "correspondentBankDetails": {
                    "name": "Bank name",
                    "city": "Bank city",
                    "swift": "XXXX1234",
                    "currencyCode": "EUR"
                },
                "account": {
                    "id": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    },
                    "balance": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    },
                    "outstandingFees": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        }
                    },
                    "status": {
                        "id": 1,
                        "name": "Normal"
                    },
                    "primary": true,
                    "type": {
                        "id": 1,
                        "name": "Personal"
                    },
                    "accountGroup": {
                        "id": 123,
                        "name": "Default account group"
                    },
                    "accountProgram": {
                        "id": 123,
                        "name": "Default account program"
                    },
                    "cardAutoFund": {
                        "enabled": false,
                        "accountId": 123,
                        "cardId": 123
                    },
                    "name": "Account name",
                    "customName": false,
                    "enabled": true
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "recurringTransfer": false,
                "recurringTransferDescription": "Example description",
                "period": {
                    "dateFrom": "",
                    "dateTo": "",
                    "type": "",
                    "weekday": "",
                    "day": ""
                },
                "type": "mm2u",
                "dateCreated": "2019-11-11",
                "bankWithdrawalMethod": {
                    "id": 123456,
                    "name": "Express",
                    "description": "Express method description",
                    "fee": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": true
                        }
                    }
                },
                "bankWithdrawPurpose": {
                    "id": "",
                    "name": ""
                }
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get history

Returns payment request history

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/get-history |


#### Request

| Parameter     |  M  | Type                                                  | Length | Description                 |
| ------------- | --- | ----------------------------------------------------- | ------ | --------------------------- |
| type          | Y   | string                                                |        |                             |
| payerType     | N   | null &#124; int                                       |        | 1 - personal, 2 - business. |
| dateFrom      | N   | null &#124; [`DateTime`](#appendix--type--datetime)   |        |                             |
| dateTo        | N   | null &#124; [`DateTime`](#appendix--type--datetime)   |        |                             |
| currencyCode  | N   | null &#124; string                                    | 3      |                             |
| id            | N   | null &#124; string                                    |        |                             |
| firstName     | N   | null &#124; string                                    |        |                             |
| lastName      | N   | null &#124; string                                    |        |                             |
| companyName   | N   | null &#124; string                                    |        |                             |
| companyNumber | N   | null &#124; string                                    |        |                             |
| email         | N   | null &#124; string                                    |        |                             |
| referenceID   | N   | null &#124; string                                    |        |                             |
| status        | N   | null &#124; string                                    |        |                             |
| paginator     | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |                             |


```json
{
    "type": "",
    "payerType": 1,
    "dateFrom": "2019-11-13",
    "dateTo": "2019-11-14",
    "currencyCode": "USD",
    "id": "123",
    "firstName": "First name",
    "lastName": "Last name",
    "companyName": "Company name",
    "companyNumber": "1234",
    "email": "example@example.com",
    "referenceID": "123",
    "status": "created",
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                              | Length | Description |
| --------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| requests        | N   | [`PaymentRequest`](#appendix--type--paymentrequest)[]             |        |             |
| paginatorResult | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "requests": [
            {
                "id": 123456,
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "template": {
                    "id": 123456,
                    "account": {
                        "id": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        },
                        "balance": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": true
                            }
                        },
                        "outstandingFees": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": true
                            }
                        },
                        "status": {
                            "id": 1,
                            "name": "Normal"
                        },
                        "primary": true,
                        "type": {
                            "id": 1,
                            "name": "Personal"
                        },
                        "accountGroup": {
                            "id": 123,
                            "name": "Default account group"
                        },
                        "accountProgram": {
                            "id": 123,
                            "name": "Default account program"
                        },
                        "cardAutoFund": {
                            "enabled": true,
                            "accountId": 123,
                            "cardId": 123
                        },
                        "name": "Account name",
                        "customName": false,
                        "enabled": false
                    },
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    },
                    "amount": {
                        "amount": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": true
                        }
                    },
                    "businessName": "Business name",
                    "payerDetails": {
                        "type": 1,
                        "title": "Big John",
                        "businessName": "Bussiness name",
                        "businessRegistrationNumber": "Bussiness name",
                        "firstName": "John Joe",
                        "middleName": "John",
                        "lastName": "John Joe",
                        "gender": "female",
                        "email": "email@you.com",
                        "mobile": "+55555477",
                        "address": "Address",
                        "state": "State",
                        "postal": "Postal",
                        "city": "City",
                        "country": {
                            "id": "",
                            "name": "",
                            "alphaTwoCode": "",
                            "alphaThreeCode": "",
                            "phoneCode": "",
                            "prohibited": true,
                            "highRisk": true,
                            "enabled": true,
                            "risk": "",
                            "regions": [
                                {
                                    "id": "",
                                    "name": "",
                                    "shortName": ""
                                }
                            ]
                        },
                        "formData": {
                            "type": 1,
                            "title": "Big John",
                            "businessName": "Bussiness name",
                            "businessRegistrationNumber": "Bussiness name",
                            "firstName": "John Joe",
                            "middleName": "John",
                            "lastName": "John Joe",
                            "gender": "female",
                            "email": "email@you.com",
                            "mobile": "+55555477",
                            "address": "Address",
                            "state": "State",
                            "postal": "Postal",
                            "city": "City",
                            "countryId": 123
                        }
                    },
                    "bankDetails": {
                        "fullNameOnBankAccount": "Full name",
                        "name": "Bank name",
                        "address": "Bank Address",
                        "city": "Bank city",
                        "iban": "77787877775554",
                        "swift": "XXXX1234",
                        "country": {
                            "id": "",
                            "name": "",
                            "alphaTwoCode": "",
                            "alphaThreeCode": "",
                            "phoneCode": "",
                            "prohibited": true,
                            "highRisk": false,
                            "enabled": false,
                            "risk": "",
                            "regions": [
                                {
                                    "id": "",
                                    "name": "",
                                    "shortName": ""
                                }
                            ]
                        },
                        "formData": {
                            "fullNameOnBankAccount": "Full name",
                            "name": "Bank name",
                            "address": "Bank Address",
                            "city": "Bank city",
                            "iban": "77787877775554",
                            "swift": "XXXX1234",
                            "countryId": 123
                        }
                    }
                },
                "payerType": "Personal, Business",
                "status": "Confirmed",
                "date": 123456,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                },
                "referenceNumber": "ABC-EOWLD-786943",
                "creditedAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "proofOfId": "",
                "proofOfAddress": "",
                "fullName": "",
                "requestedBy": ""
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create load

Create load payment request

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/create-load |


#### Request

| Parameter                    |  M  | Type                                                                                      | Length | Description                       |
| ---------------------------- | --- | ----------------------------------------------------------------------------------------- | ------ | --------------------------------- |
| requestType                  | Y   | string                                                                                    |        | execute, template, template_w_req |
| saveAsTemplate               | Y   | bool                                                                                      |        |                                   |
| saveWithAmount               | Y   | bool                                                                                      |        |                                   |
| templateName                 | N   | null &#124; string                                                                        | 50     |                                   |
| templateNote                 | N   | null &#124; string                                                                        | 255    |                                   |
| receiverBusinessName         | N   | null &#124; string                                                                        | 50     |                                   |
| payer                        | Y   | [`PaymentRequestNewPayer`](#appendix--type--paymentrequestnewpayer)                       |        |                                   |
| bankDetails                  | Y   | [`PaymentRequestNewPayerBankDetails`](#appendix--type--paymentrequestnewpayerbankdetails) |        |                                   |
| accountId                    | Y   | int                                                                                       |        |                                   |
| amount                       | N   | null &#124; int                                                                           |        |                                   |
| currencyCode                 | Y   | string                                                                                    | 3      |                                   |
| recurringTransfer            | Y   | bool                                                                                      |        |                                   |
| recurringTransferDescription | N   | null &#124; string                                                                        | 255    |                                   |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)         |        |                                   |


```json
{
    "requestType": "template",
    "saveAsTemplate": false,
    "saveWithAmount": true,
    "templateName": "Example template",
    "templateNote": "Example note",
    "receiverBusinessName": "John Joe",
    "payer": {
        "type": 1,
        "title": "Big John",
        "businessName": "Bussiness name",
        "businessRegistrationNumber": "Bussiness name",
        "firstName": "John Joe",
        "middleName": "John",
        "lastName": "John Joe",
        "gender": "female",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "accountId": 123456,
    "amount": 123456,
    "currencyCode": "USD",
    "recurringTransfer": false,
    "recurringTransferDescription": "Example description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update load

Update load payment request template

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/update-load |


#### Request

| Parameter                    |  M  | Type                                                                                      | Length | Description              |
| ---------------------------- | --- | ----------------------------------------------------------------------------------------- | ------ | ------------------------ |
| templateId                   | Y   | int                                                                                       |        |                          |
| requestType                  | Y   | string                                                                                    |        | template, template_w_req |
| saveAsTemplate               | Y   | bool                                                                                      |        |                          |
| saveWithAmount               | Y   | bool                                                                                      |        |                          |
| templateName                 | N   | null &#124; string                                                                        | 50     |                          |
| templateNote                 | N   | null &#124; string                                                                        | 255    |                          |
| receiverBusinessName         | N   | null &#124; string                                                                        | 50     |                          |
| payer                        | Y   | [`PaymentRequestNewPayer`](#appendix--type--paymentrequestnewpayer)                       |        |                          |
| bankDetails                  | Y   | [`PaymentRequestNewPayerBankDetails`](#appendix--type--paymentrequestnewpayerbankdetails) |        |                          |
| accountId                    | Y   | int                                                                                       |        |                          |
| amount                       | N   | null &#124; int                                                                           |        |                          |
| currencyCode                 | Y   | string                                                                                    | 3      |                          |
| recurringTransfer            | Y   | bool                                                                                      |        |                          |
| recurringTransferDescription | N   | null &#124; string                                                                        | 255    |                          |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)         |        |                          |


```json
{
    "templateId": 123456,
    "requestType": "template",
    "saveAsTemplate": true,
    "saveWithAmount": true,
    "templateName": "Example template",
    "templateNote": "Example note",
    "receiverBusinessName": "John Joe",
    "payer": {
        "type": 1,
        "title": "Big John",
        "businessName": "Bussiness name",
        "businessRegistrationNumber": "Bussiness name",
        "firstName": "John Joe",
        "middleName": "John",
        "lastName": "John Joe",
        "gender": "female",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "accountId": 123456,
    "amount": 123456,
    "currencyCode": "USD",
    "recurringTransfer": false,
    "recurringTransferDescription": "Example description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create withdraw

Create withdraw payment request

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/create-withdraw |


#### Request

| Parameter                    |  M  | Type                                                                                                | Length | Description                       |
| ---------------------------- | --- | --------------------------------------------------------------------------------------------------- | ------ | --------------------------------- |
| requestType                  | Y   | string                                                                                              |        | execute, template, template_w_req |
| saveAsTemplate               | Y   | bool                                                                                                |        |                                   |
| saveWithAmount               | Y   | bool                                                                                                |        |                                   |
| templateName                 | N   | null &#124; string                                                                                  | 50     |                                   |
| templateNote                 | N   | null &#124; string                                                                                  | 255    |                                   |
| payerBusinessName            | N   | null &#124; string                                                                                  | 50     |                                   |
| receiver                     | Y   | [`PaymentRequestNewReceiver`](#appendix--type--paymentrequestnewreceiver)                           |        |                                   |
| bankDetails                  | Y   | [`PaymentRequestNewReceiverBankDetails`](#appendix--type--paymentrequestnewreceiverbankdetails)     |        |                                   |
| correspondentBankDetails     | Y   | [`PaymentRequestCorrespondentBankDetails`](#appendix--type--paymentrequestcorrespondentbankdetails) |        |                                   |
| accountId                    | Y   | int                                                                                                 |        |                                   |
| amount                       | N   | null &#124; int                                                                                     |        |                                   |
| currencyCode                 | Y   | string                                                                                              | 3      |                                   |
| recurringTransfer            | Y   | bool                                                                                                |        |                                   |
| recurringTransferDescription | N   | null &#124; string                                                                                  | 255    |                                   |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)                   |        |                                   |
| bankWithdrawalMethodId       | Y   | int                                                                                                 |        |                                   |
| bankWithdrawalPurposeId      | Y   | int                                                                                                 |        |                                   |
| messageToReceiver            | N   | null &#124; string                                                                                  |        |                                   |


```json
{
    "requestType": "template",
    "saveAsTemplate": true,
    "saveWithAmount": true,
    "templateName": "Example template",
    "templateNote": "Example note",
    "payerBusinessName": "John Joe",
    "receiver": {
        "title": "Big John",
        "firstName": "John Joe",
        "middleName": "John",
        "lastName": "John Joe",
        "gender": "female",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "correspondentBankDetails": {
        "name": "Bank name",
        "city": "Bank city",
        "swift": "XXXX1234",
        "currencyCode": "EUR"
    },
    "accountId": 123456,
    "amount": 123456,
    "currencyCode": "USD",
    "recurringTransfer": true,
    "recurringTransferDescription": "Example description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    },
    "bankWithdrawalMethodId": 123,
    "bankWithdrawalPurposeId": 123,
    "messageToReceiver": "For delicious food"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update withdraw

Update withdraw payment request template

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/update-withdraw |


#### Request

| Parameter                    |  M  | Type                                                                                                | Length | Description              |
| ---------------------------- | --- | --------------------------------------------------------------------------------------------------- | ------ | ------------------------ |
| templateId                   | Y   | int                                                                                                 |        |                          |
| requestType                  | Y   | string                                                                                              |        | template, template_w_req |
| saveAsTemplate               | Y   | bool                                                                                                |        |                          |
| saveWithAmount               | Y   | bool                                                                                                |        |                          |
| templateName                 | N   | null &#124; string                                                                                  | 50     |                          |
| templateNote                 | N   | null &#124; string                                                                                  | 255    |                          |
| payerBusinessName            | N   | null &#124; string                                                                                  | 50     |                          |
| receiver                     | Y   | [`PaymentRequestNewReceiver`](#appendix--type--paymentrequestnewreceiver)                           |        |                          |
| bankDetails                  | Y   | [`PaymentRequestNewReceiverBankDetails`](#appendix--type--paymentrequestnewreceiverbankdetails)     |        |                          |
| correspondentBankDetails     | Y   | [`PaymentRequestCorrespondentBankDetails`](#appendix--type--paymentrequestcorrespondentbankdetails) |        |                          |
| accountId                    | Y   | int                                                                                                 |        |                          |
| amount                       | N   | null &#124; int                                                                                     |        |                          |
| currencyCode                 | Y   | string                                                                                              | 3      |                          |
| recurringTransfer            | Y   | bool                                                                                                |        |                          |
| recurringTransferDescription | N   | null &#124; string                                                                                  | 255    |                          |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)                   |        |                          |
| bankWithdrawalMethodId       | Y   | int                                                                                                 |        |                          |
| bankWithdrawalPurposeId      | Y   | int                                                                                                 |        |                          |
| messageToReceiver            | N   | null &#124; string                                                                                  |        |                          |


```json
{
    "templateId": 123456,
    "requestType": "template",
    "saveAsTemplate": true,
    "saveWithAmount": true,
    "templateName": "Example template",
    "templateNote": "Example note",
    "payerBusinessName": "John Joe",
    "receiver": {
        "title": "Big John",
        "firstName": "John Joe",
        "middleName": "John",
        "lastName": "John Joe",
        "gender": "female",
        "email": "email@you.com",
        "mobile": "+55555477",
        "address": "Address",
        "state": "State",
        "postal": "Postal",
        "city": "City",
        "countryId": 123
    },
    "bankDetails": {
        "fullNameOnBankAccount": "Full name",
        "name": "Bank name",
        "address": "Bank Address",
        "city": "Bank city",
        "iban": "77787877775554",
        "swift": "XXXX1234",
        "countryId": 123
    },
    "correspondentBankDetails": {
        "name": "Bank name",
        "city": "Bank city",
        "swift": "XXXX1234",
        "currencyCode": "EUR"
    },
    "accountId": 123456,
    "amount": 123456,
    "currencyCode": "USD",
    "recurringTransfer": true,
    "recurringTransferDescription": "Example description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    },
    "bankWithdrawalMethodId": 123,
    "bankWithdrawalPurposeId": 123,
    "messageToReceiver": "For delicious food"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete

Delete payment request template

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/delete |


#### Request

| Parameter                |  M  | Type | Length | Description |
| ------------------------ | --- | ---- | ------ | ----------- |
| paymentRequestTemplateId | Y   | int  |        |             |


```json
{
    "paymentRequestTemplateId": 123456
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get data

Get payment Request data

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/get-data |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| referenceNumber | Y   | string |        |             |
| userIp          | Y   | string |        |             |


```json
{
    "referenceNumber": "012345-416703-003",
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter       |  M  | Type                              | Length | Description                                |
| --------------- | --- | --------------------------------- | ------ | ------------------------------------------ |
| referenceNumber | N   | string                            |        |                                            |
| statusName      | N   | string                            |        | created, confirmed, paid, canceled, failed |
| businessName    | N   | string                            |        |                                            |
| amount          | N   | [`Money`](#appendix--type--money) |        |                                            |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referenceNumber": "012345-416703-003",
        "statusName": "created",
        "businessName": "Amazon.com, Inc.",
        "amount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Confirm request

Confirm payment Request

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/confirm-request |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| referenceNumber | Y   | string |        |             |
| userIp          | Y   | string |        |             |


```json
{
    "referenceNumber": "012345-416703-003",
    "userIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get summary data

Get summary data

| URL                                                             |
| --------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/paymentrequest/get-summary-data |


#### Request

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| referenceNumber | Y   | string |        |             |
| userIp          | Y   | string |        |             |


```json
{
    "referenceNumber": "012345-416703-003",
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter     |  M  | Type               | Length | Description |
| ------------- | --- | ------------------ | ------ | ----------- |
| accountName   | N   | string             |        |             |
| bank          | N   | string             |        |             |
| branch        | N   | null &#124; string |        |             |
| accountNumber | N   | string             |        |             |
| iban          | N   | null &#124; string |        |             |
| swift         | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "accountName": "Account name",
        "bank": "Deutsche Bank",
        "branch": "1 Great Winchester Street, EC2N 2DB LONDON, GREAT BRITAIN",
        "accountNumber": "BE89633528601284",
        "iban": "BE89633528601284",
        "swift": "BBRUBEBB"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Pin

### Get status

| URL                                            |
| ---------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/pin/get-status |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| deviceId  | Y   | string |        |                      |
| uid       | Y   | string |        |                      |
| userIp    | Y   | string | 15     | Customer ip address. |


```json
{
    "deviceId": "",
    "uid": "",
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter |  M  | Type                                                | Length | Description |
| --------- | --- | --------------------------------------------------- | ------ | ----------- |
| pinStatus | N   | string                                              |        |             |
| updatedAt | N   | null &#124; [`DateTime`](#appendix--type--datetime) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "pinStatus": "",
        "updatedAt": []
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Set

| URL                                     |
| --------------------------------------- |
| https://%fapiDomain%/%fapiPath%/pin/set |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| deviceId  | Y   | string |        |             |
| newPin    | Y   | string | 100    |             |


```json
{
    "deviceId": "",
    "newPin": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Reset

| URL                                       |
| ----------------------------------------- |
| https://%fapiDomain%/%fapiPath%/pin/reset |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| email     | Y   | string |        |                      |
| userIp    | Y   | string | 15     | Customer ip address. |


```json
{
    "email": "",
    "userIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Login

| URL                                       |
| ----------------------------------------- |
| https://%fapiDomain%/%fapiPath%/pin/login |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| deviceId  | Y   | string |        |                      |
| uid       | Y   | string |        |                      |
| pin       | Y   | string |        |                      |
| userIp    | Y   | string | 15     | Customer ip address. |


```json
{
    "deviceId": "",
    "uid": "",
    "pin": "",
    "userIp": "127.0.0.1"
}
```

#### Response

Successful response

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| user      | N   | null &#124; [`User`](#appendix--type--user) |        |             |
| pinKey    | N   | null &#124; string                          |        |             |
| sentBySms | N   | bool                                        |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "user": {
            "token": "12321123asdffsdafsd",
            "userId": 123,
            "motherId": 123,
            "secret": "secret",
            "username": "testUsername",
            "firstName": "firstName",
            "lastName": "lastName",
            "profileCompleted": false,
            "phoneValidated": true,
            "type": 1,
            "business": {
                "approved": true
            },
            "status": "",
            "avatar": "",
            "permission": {
                "user": "",
                "card": "",
                "paymentOverride": ""
            },
            "active": false,
            "ccLoadDisabled": true,
            "selfRegistered": true,
            "createdByMerchant": false,
            "primaryCurrency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            },
            "sessionIdleTime": 315,
            "sessionPopupTime": 15,
            "shared": false,
            "gender": "",
            "hasReferralProgram": false,
            "mobile": "+370612345678",
            "loggedAsAdmin": false
        },
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Purchase

Validate purchase confirmation link

### Get purchase validation

Purchase link validation

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/purchase/get-purchase-validation |


#### Request

| Parameter    |  M  | Type   | Length | Description |
| ------------ | --- | ------ | ------ | ----------- |
| purchaseLink | Y   | string |        |             |


```json
{
    "purchaseLink": "ap-5eb120bb0ecf6"
}
```

#### Response

| Parameter    |  M  | Type                                    | Length | Description |
| ------------ | --- | --------------------------------------- | ------ | ----------- |
| purchaseData | N   | [`Purchase`](#appendix--type--purchase) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "purchaseData": {
            "amount": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                }
            },
            "id": "",
            "purchaseStatus": "",
            "url": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get url

Getting purchase url after confirmation

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/purchase/get-url |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | Y   | string |        |             |
| type      | Y   | string |        |             |


```json
{
    "id": "ap-5eb120bb0ecf6",
    "type": "Successful"
}
```

#### Response

| Parameter |  M  | Type               | Length | Description |
| --------- | --- | ------------------ | ------ | ----------- |
| url       | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "url": "https:\/\/link.com\/success"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Purchase action

Action where payment is being confirmed and transfer a2a is being made, or canceled bu the user

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/purchase/purchase-action |


#### Request

| Parameter |  M  | Type   | Length | Description    |
| --------- | --- | ------ | ------ | -------------- |
| id        | Y   | string |        |                |
| sending   | Y   | int    |        |                |
| action    | Y   | string |        | CONFIRM,CANCEL |


```json
{
    "id": "ap-5eb120bb0ecf6",
    "sending": "17648547",
    "action": "CONFIRM"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Recurring transfer

### Get all

Returns all user recurring transfers

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/recurringtransfer/get-all |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter         |  M  | Type                                                              | Length | Description |
| ----------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| recuringTransfers | N   | [`RecurringTransfer`](#appendix--type--recurringtransfer)[]       |        |             |
| paginatorResult   | N   | null &#124; [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "recuringTransfers": [
        {
            "id": "",
            "sendingAccountId": "",
            "receivingAccountId": "",
            "receiverUsername": "",
            "amount": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                }
            },
            "description": "",
            "period": {
                "dateFrom": "",
                "dateTo": "",
                "type": "",
                "weekday": "",
                "day": ""
            },
            "sendNotification": false
        }
    ],
    "paginatorResult": {
        "page": 1,
        "limit": 10,
        "pagesCount": 5,
        "totalCount": 5
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create

Creates new recurring transfer

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/recurringtransfer/create |


#### Request

| Parameter        |  M  | Type                                                                  | Length | Description |
| ---------------- | --- | --------------------------------------------------------------------- | ------ | ----------- |
| sendingAccountId | Y   | int                                                                   |        |             |
| receiver         | Y   | string &#124; int                                                     |        |             |
| amount           | Y   | int                                                                   |        |             |
| currencyCode     | Y   | string                                                                | 3      |             |
| description      | N   | null &#124; string                                                    | 255    |             |
| period           | Y   | [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod) |        |             |
| onlyValidate     | Y   | bool                                                                  |        |             |
| sendNotification | Y   | bool                                                                  |        |             |


```json
{
    "sendingAccountId": "",
    "receiver": "",
    "amount": "",
    "currencyCode": "USD",
    "description": "Description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    },
    "onlyValidate": true,
    "sendNotification": false
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update

Updates existing recurring transfer

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/recurringtransfer/update |


#### Request

| Parameter        |  M  | Type                                                                  | Length | Description |
| ---------------- | --- | --------------------------------------------------------------------- | ------ | ----------- |
| id               | Y   | int                                                                   |        |             |
| sendingAccountId | Y   | int                                                                   |        |             |
| receiver         | Y   | string &#124; int                                                     |        |             |
| amount           | Y   | int                                                                   |        |             |
| currencyCode     | Y   | string                                                                | 3      |             |
| description      | N   | null &#124; string                                                    | 255    |             |
| period           | Y   | [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod) |        |             |
| onlyValidate     | Y   | bool                                                                  |        |             |
| sendNotification | Y   | bool                                                                  |        |             |


```json
{
    "id": "",
    "sendingAccountId": "",
    "receiver": "",
    "amount": "",
    "currencyCode": "USD",
    "description": "Description",
    "period": {
        "dateFrom": "",
        "dateTo": "",
        "type": "",
        "weekday": "",
        "day": ""
    },
    "onlyValidate": false,
    "sendNotification": true
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete

Deletes existing recurring transfer

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/recurringtransfer/delete |


#### Request

| Parameter           |  M  | Type | Length | Description |
| ------------------- | --- | ---- | ------ | ----------- |
| recurringTransferId | Y   | int  |        |             |


```json
{
    "recurringTransferId": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Delete all

Deletes all existing recurring transfers

| URL                                                          |
| ------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/recurringtransfer/delete-all |


#### Request

No parameters need

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Referral

### Get data

Get referral data

| URL                                               |
| ------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/referral/get-data |


#### Request

No parameters need

#### Response

| Parameter      |  M  | Type                              | Length | Description |
| -------------- | --- | --------------------------------- | ------ | ----------- |
| earnings       | N   | [`Money`](#appendix--type--money) |        |             |
| referralId     | N   | int                               |        |             |
| referralsCount | N   | int                               |        |             |


```json
{
    "earnings": {
        "amount": 123,
        "currency": {
            "id": 144,
            "name": "United States Dollar",
            "code": "USD",
            "ison": 840,
            "multiplier": 100,
            "precision": 2,
            "cryptoCurrency": false
        }
    },
    "referralId": 1234567890,
    "referralsCount": 2
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get referred users

Get referred users with paginator data

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/referral/get-referred-users |


#### Request

| Parameter |  M  | Type                                      | Length | Description |
| --------- | --- | ----------------------------------------- | ------ | ----------- |
| paginator | Y   | [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| referredUsers   | N   | [`ReferredUser`](#appendix--type--referreduser)[]     |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referredUsers": [
            {
                "id": 123,
                "username": "testUsername",
                "dateCreated": "1581503668"
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get referred users last earnings

Get referred users last earnings with paginator data

| URL                                                                       |
| ------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/referral/get-referred-users-last-earnings |


#### Request

No parameters need

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| referredUsers   | N   | [`ReferredUser`](#appendix--type--referreduser)[]     |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referredUsers": [
            {
                "id": 123,
                "username": "testUsername",
                "dateCreated": "1581503668"
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Security

### Get security questions

| URL                                                             |
| --------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/security/get-security-questions |


#### Request

No parameters need

#### Response

| Parameter          |  M  | Type                                                      | Length | Description |
| ------------------ | --- | --------------------------------------------------------- | ------ | ----------- |
| tearOneQuestions   | N   | [`SecurityQuestion`](#appendix--type--securityquestion)[] |        |             |
| tearTwoQuestions   | N   | [`SecurityQuestion`](#appendix--type--securityquestion)[] |        |             |
| tearThreeQuestions | N   | [`SecurityQuestion`](#appendix--type--securityquestion)[] |        |             |


```json
{
    "tearOneQuestions": [
        {
            "id": "",
            "value": ""
        }
    ],
    "tearTwoQuestions": [
        {
            "id": "",
            "value": ""
        }
    ],
    "tearThreeQuestions": [
        {
            "id": "",
            "value": ""
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update security questions

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/security/update-security-questions |


#### Request

| Parameter |  M  | Type                                                            | Length | Description |
| --------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| tearOne   | Y   | [`SecurityQuestionTear`](#appendix--type--securityquestiontear) |        |             |
| tearTwo   | Y   | [`SecurityQuestionTear`](#appendix--type--securityquestiontear) |        |             |
| tearThree | Y   | [`SecurityQuestionTear`](#appendix--type--securityquestiontear) |        |             |


```json
{
    "tearOne": {
        "question": {
            "type": "",
            "value": ""
        },
        "answer": ""
    },
    "tearTwo": {
        "question": {
            "type": "",
            "value": ""
        },
        "answer": ""
    },
    "tearThree": {
        "question": {
            "type": "",
            "value": ""
        },
        "answer": ""
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Change password

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/security/change-password |


#### Request

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| oldPassword | Y   | string | 255    |             |
| newPassword | Y   | string | 255    |             |


```json
{
    "oldPassword": "",
    "newPassword": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Change password public

Requests a public password change

| URL                                                             |
| --------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/security/change-password-public |


#### Request

| Parameter      |  M  | Type   | Length | Description          |
| -------------- | --- | ------ | ------ | -------------------- |
| reminderKey    | Y   | string |        |                      |
| newPassword    | Y   | string | 255    |                      |
| repeatPassword | Y   | string | 255    |                      |
| userIp         | Y   | string |        | Customer ip address. |


```json
{
    "reminderKey": "4dsa654d84s6a54sd684wa6w1ww13asd",
    "newPassword": "",
    "repeatPassword": "",
    "userIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Change security

Changes password, allowed ip and receive key codes by sms

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/security/change-security |


#### Request

| Parameter            |  M  | Type               | Length | Description |
| -------------------- | --- | ------------------ | ------ | ----------- |
| oldPassword          | N   | null &#124; string | 255    |             |
| newPassword          | N   | null &#124; string | 255    |             |
| newPasswordRepeat    | N   | null &#124; string | 255    |             |
| receiveKeyCodesBySms | Y   | bool               |        |             |
| allowedIp            | N   | null &#124; string | 255    |             |


```json
{
    "oldPassword": "oldPassword123",
    "newPassword": "newPassword123",
    "newPasswordRepeat": "newPassword123",
    "receiveKeyCodesBySms": true,
    "allowedIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get security data

Get allowed ip and receive key codes by sms

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/security/get-security-data |


#### Request

No parameters need

#### Response

| Parameter            |  M  | Type               | Length | Description |
| -------------------- | --- | ------------------ | ------ | ----------- |
| receiveKeyCodesBySms | N   | bool               |        |             |
| allowedIp            | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "receiveKeyCodesBySms": true,
        "allowedIp": "127.0.0.1"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Settings

### Get api credentials

Returns merchant api keys and urls

| URL                                                          |
| ------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/settings/get-api-credentials |


#### Request

No parameters need

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| merchantKeys | N   | [`MerchantKey`](#appendix--type--merchantkey)[] |        |             |
| apiUrls      | N   | [`ApiUrls`](#appendix--type--apiurls)           |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "merchantKeys": [
            {
                "id": "1234567890",
                "key": "1a2b465a4sd84f3e",
                "secretKey": "1a2b465a4sd84f3e",
                "tripleDesKey": "1a2b465a4sd84f3e"
            }
        ],
        "apiUrls": {
            "urlOnSuccess": "http:\/\/successurl.com",
            "urlOnFailure": "http:\/\/failureurl.com"
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update api urls

Updates api success and failure urls

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/settings/update-api-urls |


#### Request

| Parameter    |  M  | Type   | Length | Description |
| ------------ | --- | ------ | ------ | ----------- |
| urlOnSuccess | N   | string | 255    |             |
| urlOnFailure | N   | string | 255    |             |


```json
{
    "urlOnSuccess": "http:\/\/successurl.com",
    "urlOnFailure": "http:\/\/failureurl.com"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Shared user

### Get shared users

Returns list of shared users

| URL                                                         |
| ----------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/shareduser/get-shared-users |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| sharedUsers     | N   | [`SharedUser`](#appendix--type--shareduser)[]         |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "sharedUsers": [
            {
                "userId": 123,
                "username": "testUsername",
                "firstName": "firstName",
                "lastName": "lastName",
                "accounts": [
                    {
                        "id": 123,
                        "currency": {
                            "id": 144,
                            "name": "United States Dollar",
                            "code": "USD",
                            "ison": 840,
                            "multiplier": 100,
                            "precision": 2,
                            "cryptoCurrency": false
                        },
                        "balance": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": false
                            }
                        },
                        "outstandingFees": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": false
                            }
                        },
                        "status": {
                            "id": 1,
                            "name": "Normal"
                        },
                        "primary": false,
                        "type": {
                            "id": 1,
                            "name": "Personal"
                        },
                        "accountGroup": {
                            "id": 123,
                            "name": "Default account group"
                        },
                        "accountProgram": {
                            "id": 123,
                            "name": "Default account program"
                        },
                        "cardAutoFund": {
                            "enabled": false,
                            "accountId": 123,
                            "cardId": 123
                        },
                        "name": "Account name",
                        "customName": false,
                        "enabled": false
                    }
                ],
                "cards": [
                    {
                        "id": "",
                        "scheme": "",
                        "number": "",
                        "referenceId": "",
                        "pinBlocked": false,
                        "status": {
                            "id": "",
                            "name": ""
                        },
                        "virtual": true,
                        "renewable": true,
                        "hidden": true,
                        "bulkCard": false,
                        "accounts": [
                            {
                                "id": 123,
                                "currency": {
                                    "id": 144,
                                    "name": "United States Dollar",
                                    "code": "USD",
                                    "ison": 840,
                                    "multiplier": 100,
                                    "precision": 2,
                                    "cryptoCurrency": true
                                },
                                "balance": {
                                    "amount": 123,
                                    "currency": {
                                        "id": 144,
                                        "name": "United States Dollar",
                                        "code": "USD",
                                        "ison": 840,
                                        "multiplier": 100,
                                        "precision": 2,
                                        "cryptoCurrency": false
                                    }
                                },
                                "outstandingFees": {
                                    "amount": 123,
                                    "currency": {
                                        "id": 144,
                                        "name": "United States Dollar",
                                        "code": "USD",
                                        "ison": 840,
                                        "multiplier": 100,
                                        "precision": 2,
                                        "cryptoCurrency": true
                                    }
                                },
                                "status": {
                                    "id": 1,
                                    "name": "Normal"
                                },
                                "primary": true,
                                "type": {
                                    "id": 1,
                                    "name": "Personal"
                                },
                                "accountGroup": {
                                    "id": 123,
                                    "name": "Default account group"
                                },
                                "accountProgram": {
                                    "id": 123,
                                    "name": "Default account program"
                                },
                                "cardAutoFund": {
                                    "enabled": false,
                                    "accountId": 123,
                                    "cardId": 123
                                },
                                "name": "Account name",
                                "customName": false,
                                "enabled": false
                            }
                        ],
                        "nameOnCard": "",
                        "nameOnCardLineTwo": "",
                        "expiryYear": "",
                        "expiryMonth": "",
                        "balances": [
                            {
                                "amount": 123,
                                "currency": {
                                    "id": 144,
                                    "name": "United States Dollar",
                                    "code": "USD",
                                    "ison": 840,
                                    "multiplier": 100,
                                    "precision": 2,
                                    "cryptoCurrency": true
                                }
                            }
                        ],
                        "outstandingFees": [
                            {
                                "amount": 123,
                                "currency": {
                                    "id": 144,
                                    "name": "United States Dollar",
                                    "code": "USD",
                                    "ison": 840,
                                    "multiplier": 100,
                                    "precision": 2,
                                    "cryptoCurrency": false
                                }
                            }
                        ],
                        "balancesSum": {
                            "amount": 123,
                            "currency": {
                                "id": 144,
                                "name": "United States Dollar",
                                "code": "USD",
                                "ison": 840,
                                "multiplier": 100,
                                "precision": 2,
                                "cryptoCurrency": true
                            }
                        },
                        "cardsDesign": {
                            "id": "",
                            "name": "",
                            "frontImgUrl": "",
                            "backImgUrl": "",
                            "styleProperties": ""
                        }
                    }
                ],
                "permissions": [
                    {
                        "id": 123,
                        "name": "Persmission name"
                    }
                ]
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get shared users permissions

Returns shared user permission roles

| URL                                                                     |
| ----------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/shareduser/get-shared-users-permissions |


#### Request

No parameters need

#### Response

| Parameter             |  M  | Type                                                              | Length | Description |
| --------------------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| sharedUserPermissions | N   | [`SharedUserPermission`](#appendix--type--shareduserpermission)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "sharedUserPermissions": [
            {
                "id": 123,
                "name": "Persmission name"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update shared user

Updates shared user

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/shareduser/update-shared-user |


#### Request

| Parameter   |  M  | Type       | Length | Description |
| ----------- | --- | ---------- | ------ | ----------- |
| userId      | Y   | int        |        |             |
| accounts    | Y   | Collection |        |             |
| cards       | Y   | Collection |        |             |
| permissions | Y   | Collection |        |             |


```json
{
    "userId": 123845,
    "accounts": "[1342, 223432, 234233]",
    "cards": "[1342, 223432, 234233]",
    "permissions": "[1342, 223432, 234233]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get government id types

Get government ID types for create form

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/shareduser/get-government-id-types |


#### Request

No parameters need

#### Response

| Parameter       |  M  | Type                                              | Length | Description |
| --------------- | --- | ------------------------------------------------- | ------ | ----------- |
| governmentTypes | N   | [`DocumentType`](#appendix--type--documenttype)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "governmentTypes": [
            {
                "id": 123,
                "name": "Passport",
                "nameTag": "PASSPORT"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create shared user

Creates shared user

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/shareduser/create-shared-user |


#### Request

| Parameter                           |  M  | Type                                              | Length | Description           |
| ----------------------------------- | --- | ------------------------------------------------- | ------ | --------------------- |
| username                            | Y   | string                                            | 100    |                       |
| password                            | Y   | string                                            | 256    |                       |
| currencyCode                        | Y   | string                                            | 3      |                       |
| email                               | Y   | string                                            |        |                       |
| title                               | N   | null &#124; string                                |        | Mr., Ms., Mrs.        |
| firstName                           | Y   | string                                            | 50     |                       |
| middleName                          | N   | null &#124; string                                | 50     |                       |
| lastName                            | Y   | string                                            | 50     |                       |
| dateOfBirth                         | Y   | string                                            |        |                       |
| gender                              | Y   | string                                            |        | UNKNOWN, MALE, FEMALE |
| mobileNumber                        | Y   | string                                            | 20     |                       |
| landlineNumber                      | N   | null &#124; string                                | 20     |                       |
| governmentIssuedIdType              | Y   | int                                               |        |                       |
| governmentIssuedId                  | Y   | string                                            | 100    |                       |
| governmentIssuedIdExpirationDate    | Y   | string                                            |        |                       |
| governmentIssuedIdCountryOfIssuance | Y   | int                                               |        |                       |
| address                             | Y   | [`AddressUpdate`](#appendix--type--addressupdate) |        |                       |
| accounts                            | Y   | Collection                                        |        |                       |
| cards                               | Y   | Collection                                        |        |                       |
| permissions                         | Y   | Collection                                        |        |                       |


```json
{
    "username": "testUsername",
    "password": "testPassword",
    "currencyCode": "USD",
    "email": "email@you.com",
    "title": "Mr.",
    "firstName": "John Joe",
    "middleName": "John",
    "lastName": "John Joe",
    "dateOfBirth": "1990-01-01",
    "gender": "MALE",
    "mobileNumber": "+1354896654235",
    "landlineNumber": "+1354896654235",
    "governmentIssuedIdType": 12,
    "governmentIssuedId": 12,
    "governmentIssuedIdExpirationDate": "1990-01-01",
    "governmentIssuedIdCountryOfIssuance": 123,
    "address": {
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "state": "",
        "postal": "",
        "countryId": ""
    },
    "accounts": "[1342, 223432, 234233]",
    "cards": "[1342, 223432, 234233]",
    "permissions": "[1342, 223432, 234233]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Sponsored accounts

### Get all

Returns my sponsored accounts

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/get-all |


#### Request

| Parameter       |  M  | Type                                      | Length | Description |
| --------------- | --- | ----------------------------------------- | ------ | ----------- |
| username        | N   | null &#124; string                        |        |             |
| dateCreatedFrom | N   | null &#124; string                        |        |             |
| dateCreatedTo   | N   | null &#124; string                        |        |             |
| registered      | N   | null &#124; bool                          |        |             |
| paginator       | Y   | [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "username": "James",
    "dateCreatedFrom": "2019-01-02",
    "dateCreatedTo": "2019-01-02",
    "registered": true,
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter         |  M  | Type                                                      | Length | Description |
| ----------------- | --- | --------------------------------------------------------- | ------ | ----------- |
| sponsoredAccounts | N   | [`SponsoredAccount`](#appendix--type--sponsoredaccount)[] |        |             |
| paginatorResult   | N   | [`PaginatorResult`](#appendix--type--paginatorresult)     |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "sponsoredAccounts": [
            {
                "id": 123,
                "username": "testUsername",
                "dateCreated": "2019-11-11",
                "dateCompleted": "2019-11-11",
                "tempPassword": "mytemppassword",
                "accountsIds": "['1111111', '2222222']",
                "cardsNumbers": "['111111****111111', '222222****222222']"
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Create

Creates sponsored account

| URL                                                      |
| -------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/create |


#### Request

| Parameter      |  M  | Type               | Length | Description           |
| -------------- | --- | ------------------ | ------ | --------------------- |
| username       | Y   | string             |        |                       |
| password       | Y   | string             |        |                       |
| email          | Y   | string             |        |                       |
| address        | N   | null &#124; string |        |                       |
| postal         | N   | null &#124; string | 10     |                       |
| city           | N   | null &#124; string | 45     |                       |
| state          | N   | null &#124; string | 40     |                       |
| firstName      | Y   | string             | 60     |                       |
| middleName     | N   | null &#124; string | 60     |                       |
| lastName       | Y   | string             | 60     |                       |
| dateOfBirth    | Y   | string             |        |                       |
| gender         | N   | null &#124; string |        | UNKNOWN, MALE, FEMALE |
| countryId      | Y   | int                |        |                       |
| mobileNumber   | Y   | string             | 20     |                       |
| landlineNumber | N   | null &#124; string | 20     |                       |
| currencyCode   | Y   | string             | 3      |                       |
| validationLink | Y   | string             |        |                       |


```json
{
    "username": "testUsername",
    "password": "mytemppassword",
    "email": "myemail@gmail.com",
    "address": "My address",
    "postal": "EAAA4444",
    "city": "London",
    "state": "Home state",
    "firstName": "John Joe",
    "middleName": "John",
    "lastName": "Joe",
    "dateOfBirth": "1990-01-01",
    "gender": "MALE",
    "countryId": 826,
    "mobileNumber": "+1354896654235",
    "landlineNumber": "+1354896654235",
    "currencyCode": "EUR",
    "validationLink": "http:\/\/localhost\/en\/validate-email\/[userId]\/[validationKey]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Import from file

Creates sponsored accounts from file (uploads file)

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/import-from-file |


#### Request

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| file      | Y   | [`Base64File`](#appendix--type--base64file) |        |             |


```json
{
    "file": {
        "name": "",
        "content": "",
        "contentType": ""
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Confirm create from file

Confirms Create sponsored accounts from file

| URL                                                                        |
| -------------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/confirm-create-from-file |


#### Request

| Parameter            |  M  | Type                                                      | Length | Description            |
| -------------------- | --- | --------------------------------------------------------- | ------ | ---------------------- |
| fileConfiguration    | Y   | [`FileConfiguration`](#appendix--type--fileconfiguration) |        |                        |
| cardsCreation        | Y   | [`CardsCreation`](#appendix--type--cardscreation)         |        |                        |
| accountsLoad         | Y   | [`AccountsLoad`](#appendix--type--accountsload)           |        |                        |
| usersDefaultCurrency | N   | null &#124; string                                        | 3      | Users default currency |


```json
{
    "fileConfiguration": {
        "headers": "['username','password','email']",
        "fileId": 123456789,
        "separator": ",",
        "delimiter": "\\'",
        "skipFirstLine": true
    },
    "cardsCreation": {
        "type": "v",
        "loadFromAccounts": null
    },
    "accountsLoad": {
        "amount": 10,
        "currency": "EUR"
    },
    "usersDefaultCurrency": "EUR"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get csv history

Gets uploaded csv files history

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/get-csv-history |


#### Request

| Parameter |  M  | Type                                      | Length | Description |
| --------- | --- | ----------------------------------------- | ------ | ----------- |
| paginator | N   | [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| csvHistory      | N   | [`CsvHistory`](#appendix--type--csvhistory)[]         |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "csvHistory": [
            {
                "id": "",
                "date": "",
                "accountId": "",
                "accountCurrency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                },
                "fileStatus": {
                    "id": "",
                    "name": ""
                },
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                },
                "cardsType": "v",
                "loadAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "autoLoadToCard": false,
                "price": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "linesCount": "",
                "usersCount": "",
                "balanceBefore": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "balanceAfter": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "filePath": ""
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get file

Returns csv file

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/sponsoredaccounts/get-file |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| fileId    | N   | int  |        |             |


```json
{
    "fileId": ""
}
```

#### Response

| Parameter |  M  | Type                                  | Length | Description |
| --------- | --- | ------------------------------------- | ------ | ----------- |
| csvFile   | N   | [`CsvFile`](#appendix--type--csvfile) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "csvFile": {
            "id": "",
            "filename": "",
            "contentType": "",
            "bodyBase64": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Transactions

### Accounts

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/accounts |


#### Request

| Parameter   |  M  | Type       | Length | Description |
| ----------- | --- | ---------- | ------ | ----------- |
| accountsIds | N   | Collection |        |             |


```json
{
    "accountsIds": "[2471019, 2767524]"
}
```

### Account

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/account |


#### Request

| Parameter   |  M  | Type       | Length | Description |
| ----------- | --- | ---------- | ------ | ----------- |
| accountsIds | N   | Collection |        |             |


```json
{
    "accountsIds": "[2471019, 2767524]"
}
```

### Card

Return user card transactions

| URL                                               |
| ------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/card |


#### Request

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| cardId       | Y   | int                |        |             |
| currencyCode | N   | null &#124; string | 3      |             |


```json
{
    "cardId": 123,
    "currencyCode": "USD"
}
```

#### Response

| Parameter    |  M  | Type                                            | Length | Description |
| ------------ | --- | ----------------------------------------------- | ------ | ----------- |
| transactions | N   | [`Transaction`](#appendix--type--transaction)[] |        |             |
| allLoaded    | N   | bool                                            |        |             |
| startBalance | N   | null &#124; [`Money`](#appendix--type--money)   |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactions": [
            {
                "id": "",
                "dateTime": "",
                "sender": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "recipient": {
                    "id": "",
                    "name": "",
                    "type": "",
                    "avatar": ""
                },
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "instructedAmount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "description": "",
                "fee": false,
                "pre": true,
                "pending": false,
                "rejected": true,
                "restricted": false,
                "reversal": true,
                "refund": false,
                "hasRefund": false,
                "errorCode": "",
                "microtime": "",
                "errorMessage": "",
                "reason": "",
                "receiver": ""
            }
        ],
        "allLoaded": true,
        "startBalance": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Report

Get User reports list

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/report |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                        | Length | Description |
| --------------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| list            | N   | [`TransactionReport`](#appendix--type--transactionreport)[] |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult)       |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "list": [
            {
                "id": 123,
                "status": 1,
                "dateCreated": 1581503668,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": false
                },
                "type": 1,
                "number": "122345664",
                "dateFrom": 1577829600,
                "dateTo": 1580594399,
                "fileType": "pdf",
                "file": {
                    "id": 123,
                    "name": "tx_list_en-1587110521038.pdf"
                }
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account report request

Requests user account transactions report

| URL                                                                 |
| ------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/account-report-request |


#### Request

| Parameter |  M  | Type   | Length | Description    |
| --------- | --- | ------ | ------ | -------------- |
| fileType  | Y   | string |        | pdf, xlsx, csv |


```json
{
    "fileType": "pdf"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Card report request

Requests user card transactions report

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transactions/card-report-request |


#### Request

| Parameter |  M  | Type   | Length | Description    |
| --------- | --- | ------ | ------ | -------------- |
| fileType  | Y   | string |        | pdf, xlsx, csv |


```json
{
    "fileType": "pdf"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get report file

Get User report file as FileResponse object

| URL                                                          |
| ------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/transactions/get-report-file |


#### Request

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| id        | Y   | int  |        |             |


```json
{
    "id": 123
}
```

#### Response

| Parameter   |  M  | Type               | Length | Description                           |
| ----------- | --- | ------------------ | ------ | ------------------------------------- |
| id          | N   | int                |        |                                       |
| filename    | N   | string             |        |                                       |
| contentType | N   | null &#124; string |        |                                       |
| bodyBase64  | N   | string             |        | File content encoded by base64_encode |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "id": 123,
        "filename": "tx_list_en-1587110521038.pdf",
        "contentType": "application\/pdf",
        "bodyBase64": ""
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Transfers history

### Get account to account

Return a2a transfers history

| URL                                                                     |
| ----------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transfershistory/get-account-to-account |


#### Request

| Parameter |  M  | Type                                                  | Length | Description          |
| --------- | --- | ----------------------------------------------------- | ------ | -------------------- |
| type      | N   | null &#124; string                                    |        | Type of the transfer |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |                      |


```json
{
    "type": "a2a",
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                                                      | Length | Description |
| --------------- | --- | ----------------------------------------------------------------------------------------- | ------ | ----------- |
| transfers       | N   | [`TransfersHistoryAccountToAccount`](#appendix--type--transfershistoryaccounttoaccount)[] |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult)                                     |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transfers": [
            {
                "sendingAccountId": 12345678,
                "receivingAccountId": 12345678,
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "type": "a2a",
                "status": 1,
                "date": []
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get account to bank

Return a2b transfers history

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/transfershistory/get-account-to-bank |


#### Request

| Parameter |  M  | Type                                                  | Length | Description          |
| --------- | --- | ----------------------------------------------------- | ------ | -------------------- |
| type      | N   | null &#124; string                                    |        | Type of the transfer |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |                      |


```json
{
    "type": "a2a",
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                                                | Length | Description |
| --------------- | --- | ----------------------------------------------------------------------------------- | ------ | ----------- |
| transfers       | N   | [`TransfersHistoryAccountToBank`](#appendix--type--transfershistoryaccounttobank)[] |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult)                               |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transfers": [
            {
                "bankName": "JPMorgan Chase",
                "iban": "a2a",
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                },
                "type": "a2a",
                "status": 1,
                "date": []
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get currency exchange history

Return a2a currency exchange history

| URL                                                                            |
| ------------------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/transfershistory/get-currency-exchange-history |


#### Request

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| paginator | N   | null &#124; [`Paginator`](#appendix--type--paginator) |        |             |


```json
{
    "paginator": {
        "page": 1,
        "limit": 10
    }
}
```

#### Response

| Parameter       |  M  | Type                                                          | Length | Description |
| --------------- | --- | ------------------------------------------------------------- | ------ | ----------- |
| transactions    | N   | [`TransactionHistory`](#appendix--type--transactionhistory)[] |        |             |
| paginatorResult | N   | [`PaginatorResult`](#appendix--type--paginatorresult)         |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "transactions": [
            {
                "transactionId": 1765645,
                "dateTime": 3218498,
                "senderAccountId": "",
                "receiverAccountId": "",
                "amount": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": true
                    }
                },
                "amountTo": {
                    "amount": 123,
                    "currency": {
                        "id": 144,
                        "name": "United States Dollar",
                        "code": "USD",
                        "ison": 840,
                        "multiplier": 100,
                        "precision": 2,
                        "cryptoCurrency": false
                    }
                }
            }
        ],
        "paginatorResult": {
            "page": 1,
            "limit": 10,
            "pagesCount": 5,
            "totalCount": 5
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## User

### Get personal info

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/user/get-personal-info |


#### Request

No parameters need

#### Response

| Parameter    |  M  | Type                                                    | Length | Description |
| ------------ | --- | ------------------------------------------------------- | ------ | ----------- |
| personalInfo | N   | [`UserPersonalInfo`](#appendix--type--userpersonalinfo) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "personalInfo": {
            "firstName": "",
            "middleName": "",
            "lastName": "",
            "businessName": "",
            "gender": "",
            "dateOfBirth": "",
            "email": "",
            "homePhone": "",
            "mobilePhone": "",
            "address": {
                "addressLineOne": "",
                "addressLineTwo": "",
                "city": "",
                "state": "",
                "postal": "",
                "country": {
                    "id": "",
                    "name": "",
                    "alphaTwoCode": "",
                    "alphaThreeCode": "",
                    "phoneCode": "",
                    "prohibited": true,
                    "highRisk": false,
                    "enabled": true,
                    "risk": "",
                    "regions": [
                        {
                            "id": "",
                            "name": "",
                            "shortName": ""
                        }
                    ]
                }
            },
            "billingAddress": {
                "addressLineOne": "",
                "addressLineTwo": "",
                "city": "",
                "state": "",
                "postal": "",
                "country": {
                    "id": "",
                    "name": "",
                    "alphaTwoCode": "",
                    "alphaThreeCode": "",
                    "phoneCode": "",
                    "prohibited": true,
                    "highRisk": false,
                    "enabled": true,
                    "risk": "",
                    "regions": [
                        {
                            "id": "",
                            "name": "",
                            "shortName": ""
                        }
                    ]
                }
            },
            "useAddressAsBilling": false,
            "subscribedNewsletters": false
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Update personal info

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/update-personal-info |


#### Request

| Parameter             |  M  | Type                                                          | Length | Description                                                                      |
| --------------------- | --- | ------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| email                 | Y   | string                                                        | 100    | Email will not be updated if masked value from getPersonalInfo will be provided  |
| homePhone             | N   | null &#124; string                                            | 20     |                                                                                  |
| mobilePhone           | Y   | string                                                        | 20     | Mobile will not be updated if masked value from getPersonalInfo will be provided |
| address               | Y   | [`AddressUpdate`](#appendix--type--addressupdate)             |        |                                                                                  |
| billingAddress        | N   | null &#124; [`AddressUpdate`](#appendix--type--addressupdate) |        |                                                                                  |
| useAddressAsBilling   | Y   | bool                                                          |        |                                                                                  |
| subscribedNewsletters | Y   | bool                                                          |        |                                                                                  |
| businessName          | Y   | null &#124; string                                            |        |                                                                                  |


```json
{
    "email": "",
    "homePhone": "",
    "mobilePhone": "",
    "address": {
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "state": "",
        "postal": "",
        "countryId": ""
    },
    "billingAddress": {
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "state": "",
        "postal": "",
        "countryId": ""
    },
    "useAddressAsBilling": false,
    "subscribedNewsletters": true,
    "businessName": ""
}
```

#### Response

| Parameter    |  M  | Type | Length | Description |
| ------------ | --- | ---- | ------ | ----------- |
| emailChanged | N   | bool |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "emailChanged": false
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Save mobile phone

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/user/save-mobile-phone |


#### Request

| Parameter   |  M  | Type   | Length | Description |
| ----------- | --- | ------ | ------ | ----------- |
| mobilePhone | Y   | string | 20     |             |


```json
{
    "mobilePhone": ""
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get permissions

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-permissions |


#### Request

No parameters need

#### Response

| Parameter   |  M  | Type                                        | Length | Description |
| ----------- | --- | ------------------------------------------- | ------ | ----------- |
| permissions | N   | [`Permission`](#appendix--type--permission) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "permissions": {
            "user": "",
            "card": "",
            "paymentOverride": ""
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get phone validation

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-phone-validation |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                                  | Length | Description |
| ---------- | --- | ----------------------------------------------------- | ------ | ----------- |
| validation | N   | [`PhoneValidation`](#appendix--type--phonevalidation) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "validation": {
            "sent": true,
            "dateSent": "",
            "preventResend": false,
            "nextResendAfter": "",
            "blockValidation": true,
            "mobileInvalid": false,
            "mobileValidated": true,
            "mobileCountryBlacklisted": false
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Complete registration

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/complete-registration |


#### Request

| Parameter           |  M  | Type                                              | Length | Description |
| ------------------- | --- | ------------------------------------------------- | ------ | ----------- |
| title               | N   | string                                            |        |             |
| firstName           | Y   | string                                            | 60     |             |
| lastName            | Y   | string                                            | 60     |             |
| middleName          | N   | null &#124; string                                | 60     |             |
| dateOfBirth         | Y   | string                                            |        |             |
| address             | Y   | [`AddressUpdate`](#appendix--type--addressupdate) |        |             |
| mobilePhone         | Y   | string                                            | 20     |             |
| landlinePhone       | N   | null &#124; string                                | 20     |             |
| primaryCurrencyCode | Y   | string                                            |        |             |


```json
{
    "title": "Ms.",
    "firstName": "First Name",
    "lastName": "Last Name",
    "middleName": "Middle Name",
    "dateOfBirth": "1991-01-01",
    "address": {
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "state": "",
        "postal": "",
        "countryId": ""
    },
    "mobilePhone": "307888666555",
    "landlinePhone": "307888666555",
    "primaryCurrencyCode": "EUR"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Send mobile validation code

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/send-mobile-validation-code |


#### Request

No parameters need

#### Response

| Parameter  |  M  | Type                                                  | Length | Description |
| ---------- | --- | ----------------------------------------------------- | ------ | ----------- |
| validation | N   | [`PhoneValidation`](#appendix--type--phonevalidation) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "validation": {
            "sent": false,
            "dateSent": "",
            "preventResend": false,
            "nextResendAfter": "",
            "blockValidation": true,
            "mobileInvalid": false,
            "mobileValidated": false,
            "mobileCountryBlacklisted": true
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Validate mobile validation code

| URL                                                                  |
| -------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/validate-mobile-validation-code |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| code      | Y   | string | 6      |             |


```json
{
    "code": ""
}
```

#### Response

| Parameter  |  M  | Type                                                  | Length | Description |
| ---------- | --- | ----------------------------------------------------- | ------ | ----------- |
| valid      | N   | bool                                                  |        |             |
| validation | N   | [`PhoneValidation`](#appendix--type--phonevalidation) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "valid": true,
        "validation": {
            "sent": false,
            "dateSent": "",
            "preventResend": false,
            "nextResendAfter": "",
            "blockValidation": false,
            "mobileInvalid": true,
            "mobileValidated": true,
            "mobileCountryBlacklisted": false
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Logout

| URL                                         |
| ------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/logout |


#### Request

No parameters need

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Login

login description

| URL                                        |
| ------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/user/login |


#### Request

Customer authentication request.

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| userIp    | Y   | string | 15     | Customer ip address. |
| username  | Y   | string | 100    |                      |
| password  | Y   | string | 256    |                      |


```json
{
    "userIp": "127.0.0.1",
    "username": "testUsername",
    "password": "testPassword"
}
```

#### Response

Successful response

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| user      | N   | null &#124; [`User`](#appendix--type--user) |        |             |
| pinKey    | N   | null &#124; string                          |        |             |
| sentBySms | N   | bool                                        |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "user": {
            "token": "12321123asdffsdafsd",
            "userId": 123,
            "motherId": 123,
            "secret": "secret",
            "username": "testUsername",
            "firstName": "firstName",
            "lastName": "lastName",
            "profileCompleted": true,
            "phoneValidated": false,
            "type": 1,
            "business": {
                "approved": true
            },
            "status": "",
            "avatar": "",
            "permission": {
                "user": "",
                "card": "",
                "paymentOverride": ""
            },
            "active": false,
            "ccLoadDisabled": false,
            "selfRegistered": false,
            "createdByMerchant": false,
            "primaryCurrency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            },
            "sessionIdleTime": 315,
            "sessionPopupTime": 15,
            "shared": true,
            "gender": "",
            "hasReferralProgram": false,
            "mobile": "+370612345678",
            "loggedAsAdmin": false
        },
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get user by token

login with token

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/user/get-user-by-token |


#### Request

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| userIp    | Y   | string |        | Customer ip address. |
| token     | Y   | string |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "token": "testSecret"
}
```

#### Response

Successful response

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| user      | N   | null &#124; [`User`](#appendix--type--user) |        |             |
| pinKey    | N   | null &#124; string                          |        |             |
| sentBySms | N   | bool                                        |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "user": {
            "token": "12321123asdffsdafsd",
            "userId": 123,
            "motherId": 123,
            "secret": "secret",
            "username": "testUsername",
            "firstName": "firstName",
            "lastName": "lastName",
            "profileCompleted": true,
            "phoneValidated": false,
            "type": 1,
            "business": {
                "approved": true
            },
            "status": "",
            "avatar": "",
            "permission": {
                "user": "",
                "card": "",
                "paymentOverride": ""
            },
            "active": true,
            "ccLoadDisabled": false,
            "selfRegistered": false,
            "createdByMerchant": true,
            "primaryCurrency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            },
            "sessionIdleTime": 315,
            "sessionPopupTime": 15,
            "shared": false,
            "gender": "",
            "hasReferralProgram": true,
            "mobile": "+370612345678",
            "loggedAsAdmin": false
        },
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Registration long

User long form registration request.

| URL                                                    |
| ------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/user/registration-long |


#### Request

Customer long form registration request.

| Parameter               |  M  | Type                                              | Length | Description          |
| ----------------------- | --- | ------------------------------------------------- | ------ | -------------------- |
| userIp                  | Y   | string                                            | 15     | Customer ip address. |
| username                | Y   | string                                            | 100    |                      |
| email                   | Y   | string                                            | 50     |                      |
| password                | Y   | string                                            |        |                      |
| agreeTermsAndConditions | Y   | bool                                              |        |                      |
| validationLink          | Y   | string                                            |        |                      |
| referralId              | N   | null &#124; string                                |        |                      |
| isShort                 | N   | bool                                              |        |                      |
| captchaResponse         | N   | null &#124; string                                |        |                      |
| title                   | N   | string                                            |        |                      |
| firstName               | Y   | string                                            | 60     |                      |
| lastName                | Y   | string                                            | 60     |                      |
| middleName              | N   | null &#124; string                                | 60     |                      |
| dateOfBirth             | Y   | string                                            |        |                      |
| address                 | Y   | [`AddressUpdate`](#appendix--type--addressupdate) |        |                      |
| mobilePhone             | Y   | string                                            | 20     |                      |
| landlinePhone           | N   | null &#124; string                                | 20     |                      |
| primaryCurrencyCode     | Y   | string                                            |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "username": "testUsername",
    "email": "test@mail.com",
    "password": "testPassword",
    "agreeTermsAndConditions": true,
    "validationLink": "http:\/\/mobile-front.upc.local\/en\/validate-email\/[userId]\/[validationKey]",
    "referralId": "79874654894648",
    "isShort": true,
    "captchaResponse": "35sa4d65a4sdsdscgeghr4d6v1adf34g",
    "title": "Ms.",
    "firstName": "First Name",
    "lastName": "Last Name",
    "middleName": "Middle Name",
    "dateOfBirth": "1991-01-01",
    "address": {
        "addressLineOne": "",
        "addressLineTwo": "",
        "city": "",
        "state": "",
        "postal": "",
        "countryId": ""
    },
    "mobilePhone": "307888666555",
    "landlinePhone": "307888666555",
    "primaryCurrencyCode": "EUR"
}
```

#### Response

Successful response

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| user      | N   | null &#124; [`User`](#appendix--type--user) |        |             |
| pinKey    | N   | null &#124; string                          |        |             |
| sentBySms | N   | bool                                        |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "user": {
            "token": "12321123asdffsdafsd",
            "userId": 123,
            "motherId": 123,
            "secret": "secret",
            "username": "testUsername",
            "firstName": "firstName",
            "lastName": "lastName",
            "profileCompleted": false,
            "phoneValidated": false,
            "type": 1,
            "business": {
                "approved": true
            },
            "status": "",
            "avatar": "",
            "permission": {
                "user": "",
                "card": "",
                "paymentOverride": ""
            },
            "active": false,
            "ccLoadDisabled": true,
            "selfRegistered": true,
            "createdByMerchant": true,
            "primaryCurrency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            },
            "sessionIdleTime": 315,
            "sessionPopupTime": 15,
            "shared": false,
            "gender": "",
            "hasReferralProgram": true,
            "mobile": "+370612345678",
            "loggedAsAdmin": false
        },
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Registration short

User short form registration request.

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/registration-short |


#### Request

Customer short registration form request.

| Parameter               |  M  | Type               | Length | Description          |
| ----------------------- | --- | ------------------ | ------ | -------------------- |
| userIp                  | Y   | string             | 15     | Customer ip address. |
| username                | Y   | string             | 100    |                      |
| email                   | Y   | string             | 50     |                      |
| password                | Y   | string             |        |                      |
| agreeTermsAndConditions | Y   | bool               |        |                      |
| validationLink          | Y   | string             |        |                      |
| referralId              | N   | null &#124; string |        |                      |
| isShort                 | N   | bool               |        |                      |
| captchaResponse         | N   | null &#124; string |        |                      |


```json
{
    "userIp": "127.0.0.1",
    "username": "testUsername",
    "email": "test@mail.com",
    "password": "testPassword",
    "agreeTermsAndConditions": true,
    "validationLink": "http:\/\/mobile-front.upc.local\/en\/validate-email\/[userId]\/[validationKey]",
    "referralId": "79874654894648",
    "isShort": true,
    "captchaResponse": "35sa4d65a4sdsdscgeghr4d6v1adf34g"
}
```

#### Response

Successful response

| Parameter |  M  | Type                                        | Length | Description |
| --------- | --- | ------------------------------------------- | ------ | ----------- |
| user      | N   | null &#124; [`User`](#appendix--type--user) |        |             |
| pinKey    | N   | null &#124; string                          |        |             |
| sentBySms | N   | bool                                        |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "user": {
            "token": "12321123asdffsdafsd",
            "userId": 123,
            "motherId": 123,
            "secret": "secret",
            "username": "testUsername",
            "firstName": "firstName",
            "lastName": "lastName",
            "profileCompleted": true,
            "phoneValidated": false,
            "type": 1,
            "business": {
                "approved": false
            },
            "status": "",
            "avatar": "",
            "permission": {
                "user": "",
                "card": "",
                "paymentOverride": ""
            },
            "active": true,
            "ccLoadDisabled": true,
            "selfRegistered": true,
            "createdByMerchant": true,
            "primaryCurrency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            },
            "sessionIdleTime": 315,
            "sessionPopupTime": 15,
            "shared": false,
            "gender": "",
            "hasReferralProgram": true,
            "mobile": "+370612345678",
            "loggedAsAdmin": false
        },
        "pinKey": "abc-123",
        "sentBySms": null
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get captcha data

Get captcha information for user registration.

| URL                                                   |
| ----------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-captcha-data |


#### Request

Get captha cofinguration parameters

| Parameter |  M  | Type   | Length | Description          |
| --------- | --- | ------ | ------ | -------------------- |
| userIp    | Y   | string | 15     | Customer ip address. |


```json
{
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter        |  M  | Type               | Length | Description |
| ---------------- | --- | ------------------ | ------ | ----------- |
| isCaptchaEnabled | N   | bool               |        |             |
| key              | N   | null &#124; string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "isCaptchaEnabled": true,
        "key": "fhfeh4d6h54d89h4654gfh4f846"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get geo data

Get default data by GeoIP.

| URL                                               |
| ------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-geo-data |


#### Request

Get default Geo data by user IP

| Parameter |  M  | Type   | Length | Description      |
| --------- | --- | ------ | ------ | ---------------- |
| userIp    | Y   | string | 15     | User ip address. |


```json
{
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter |  M  | Type                                                | Length | Description |
| --------- | --- | --------------------------------------------------- | ------ | ----------- |
| country   | N   | null &#124; [`Country`](#appendix--type--country)   |        |             |
| currency  | N   | null &#124; [`Currency`](#appendix--type--currency) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "country": null,
        "currency": null
    }
}
```

### Reset password

| URL                                                 |
| --------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/reset-password |


#### Request

| Parameter       |  M  | Type   | Length | Description                         |
| --------------- | --- | ------ | ------ | ----------------------------------- |
| emailOrUsername | Y   | string |        | Customer username or email address. |
| userIp          | Y   | string |        | Customer ip address.                |
| validationLink  | Y   | string |        |                                     |


```json
{
    "emailOrUsername": "test@mail.com",
    "userIp": "127.0.0.1",
    "validationLink": "http:\/\/mobile-front.local\/en\/user\/change-password\/[key]"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Remind username

| URL                                                  |
| ---------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/remind-username |


#### Request

| Parameter |  M  | Type   | Length | Description                         |
| --------- | --- | ------ | ------ | ----------------------------------- |
| email     | Y   | string |        | Customer username or email address. |
| userIp    | Y   | string |        | Customer ip address.                |


```json
{
    "email": "test@mail.com",
    "userIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get total balances

Get total user balances by primary currency.

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-total-balances |


#### Request

No parameters need

#### Response

| Parameter            |  M  | Type                              | Length | Description |
| -------------------- | --- | --------------------------------- | ------ | ----------- |
| totalAccountsBalance | N   | [`Money`](#appendix--type--money) |        |             |
| totalOutstandingFees | N   | [`Money`](#appendix--type--money) |        |             |
| totalCardsBalance    | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "totalAccountsBalance": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalOutstandingFees": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalCardsBalance": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get business sectors

Get business sector list for business registration

| URL                                                       |
| --------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-business-sectors |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter       |  M  | Type                                                  | Length | Description |
| --------------- | --- | ----------------------------------------------------- | ------ | ----------- |
| businessSectors | N   | [`BusinessSector`](#appendix--type--businesssector)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "businessSectors": [
            {
                "id": 1748754,
                "name": "Advertising"
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Business registration

Register business account

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/business-registration |


#### Request

| Parameter                     |  M  | Type               | Length | Description |
| ----------------------------- | --- | ------------------ | ------ | ----------- |
| userIp                        | N   | string             |        |             |
| username                      | Y   | string             | 100    |             |
| password                      | Y   | string             |        |             |
| passwordRepeat                | Y   | string             |        |             |
| companyName                   | Y   | string             |        |             |
| email                         | N   | null &#124; string | 50     |             |
| currencyCode                  | Y   | string             | 3      |             |
| contactPersonFirstName        | N   | string             | 60     |             |
| contactPersonLastName         | N   | string             | 60     |             |
| directorsNames                | N   | Collection         |        |             |
| shareholdersNames             | N   | Collection         |        |             |
| ultimateBeneficialOwnersNames | N   | Collection         |        |             |
| websitesUrls                  | N   | Collection         |        |             |
| landlineNumber                | N   | null &#124; string | 20     |             |
| mobileNumber                  | Y   | string             | 20     |             |
| countryId                     | N   | null &#124; int    |        |             |
| addressLineOne                | N   | null &#124; string |        |             |
| addressLineTwo                | N   | null &#124; string |        |             |
| city                          | N   | null &#124; string |        |             |
| postal                        | N   | null &#124; string |        |             |
| companyService                | N   | null &#124; int    |        |             |
| businessSectors               | N   | Collection         |        |             |
| companyType                   | N   | null &#124; string |        |             |
| other                         | N   | null &#124; string |        |             |
| agreeTermsAndConditions       | N   | bool               |        |             |
| emailValidateLink             | N   | null &#124; string |        |             |
| vatNumber                     | N   | null &#124; string |        |             |
| captchaResponse               | N   | null &#124; string |        |             |


```json
{
    "userIp": "",
    "username": "testUsername",
    "password": "testPassword",
    "passwordRepeat": "testPassword",
    "companyName": "Test Company",
    "email": "test@mail.com",
    "currencyCode": "USD",
    "contactPersonFirstName": "Joe",
    "contactPersonLastName": "Smith",
    "directorsNames": "",
    "shareholdersNames": "",
    "ultimateBeneficialOwnersNames": "",
    "websitesUrls": "",
    "landlineNumber": "",
    "mobileNumber": "",
    "countryId": "",
    "addressLineOne": "",
    "addressLineTwo": "",
    "city": "",
    "postal": "",
    "companyService": "",
    "businessSectors": "",
    "companyType": "",
    "other": "",
    "agreeTermsAndConditions": false,
    "emailValidateLink": "http:\/\/your-site.com\/validate-email\/[recipientId]\/[validateKey]",
    "vatNumber": "DE999999999",
    "captchaResponse": "35sa4d65a4sdsdscgeghr4d6v1adf34g"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Register demo user

Create demo user

| URL                                                     |
| ------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/register-demo-user |


#### Request

| Parameter |  M  | Type               | Length | Description          |
| --------- | --- | ------------------ | ------ | -------------------- |
| email     | N   | null &#124; string | 50     |                      |
| userIp    | Y   | string             |        | Customer ip address. |


```json
{
    "email": "test@mail.com",
    "userIp": "127.0.0.1"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get username by reminder

Get username by reminder key value

| URL                                                           |
| ------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/user/get-username-by-reminder |


#### Request

Get captha cofinguration parameters

| Parameter   |  M  | Type   | Length | Description          |
| ----------- | --- | ------ | ------ | -------------------- |
| reminderKey | N   | string |        | Reminder key         |
| userIp      | Y   | string | 15     | Customer ip address. |


```json
{
    "reminderKey": "9226d387bdd225be601baaa3a7b910214b0ae2ed",
    "userIp": "127.0.0.1"
}
```

#### Response

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| username  | N   | string |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "username": "user123"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Variable

### Get all

Returns all variables

| URL                                              |
| ------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/variable/get-all |


#### Request

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| userIp    | N   | string |        |             |


```json
{
    "userIp": ""
}
```

#### Response

| Parameter |  M  | Type                                      | Length | Description |
| --------- | --- | ----------------------------------------- | ------ | ----------- |
| variables | N   | [`Variable`](#appendix--type--variable)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "variables": [
            {
                "name": "variable_name",
                "type": null,
                "value": 1
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Widgets

### Get

Gets user widgets

| URL                                         |
| ------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/widgets/get |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type       | Length | Description |
| --------- | --- | ---------- | ------ | ----------- |
| widgets   | N   | Collection |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "widgets": "['QUICK_ACTIONS','EXCHANGE','LATEST_TRANSACTIONS']"
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Set

Sets user widgets

| URL                                         |
| ------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/widgets/set |


#### Request

| Parameter |  M  | Type       | Length | Description            |
| --------- | --- | ---------- | ------ | ---------------------- |
| widgets   | Y   | Collection |        | User dashboard widgets |


```json
{
    "widgets": "['QUICK_ACTIONS','EXCHANGE','LATEST_TRANSACTIONS']"
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

## Withdraw

### Get bank withdraw methods

| URL                                                                |
| ------------------------------------------------------------------ |
| https://%fapiDomain%/%fapiPath%/withdraw/get-bank-withdraw-methods |


#### Request

| Parameter          |  M  | Type            | Length | Description                      |
| ------------------ | --- | --------------- | ------ | -------------------------------- |
| withdrawMethodType | N   | null &#124; int |        | 1 - Default, 2 - Payment request |
| sendingAccountId   | Y   | int             |        |                                  |
| bankCountryId      | Y   | int             |        |                                  |
| currencyCode       | Y   | string          | 3      |                                  |
| amount             | N   | null &#124; int |        |                                  |


```json
{
    "withdrawMethodType": 1,
    "sendingAccountId": 123456,
    "bankCountryId": 123456,
    "currencyCode": "EUR",
    "amount": 500
}
```

#### Response

| Parameter |  M  | Type                                                  | Length | Description |
| --------- | --- | ----------------------------------------------------- | ------ | ----------- |
| methods   | N   | [`WithdrawMethod`](#appendix--type--withdrawmethod)[] |        |             |


```json
{
    "methods": [
        {
            "id": 123456,
            "name": "Express",
            "description": "Express method description",
            "fee": {
                "amount": 123,
                "currency": {
                    "id": 144,
                    "name": "United States Dollar",
                    "code": "USD",
                    "ison": 840,
                    "multiplier": 100,
                    "precision": 2,
                    "cryptoCurrency": true
                }
            }
        }
    ]
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get bank withdraw purposes

| URL                                                                 |
| ------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/get-bank-withdraw-purposes |


#### Request

No parameters need

#### Response

| Parameter |  M  | Type                                                              | Length | Description |
| --------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| purposes  | N   | [`BankWidthdrawPurpose`](#appendix--type--bankwidthdrawpurpose)[] |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "purposes": [
            {
                "id": "",
                "name": ""
            }
        ]
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to bank account

| URL                                                              |
| ---------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-bank-account |


#### Request

| Parameter               |  M  | Type               | Length | Description |
| ----------------------- | --- | ------------------ | ------ | ----------- |
| sendingAccountId        | Y   | int                |        |             |
| receivingBankAccountId  | Y   | int                |        |             |
| amount                  | Y   | int                |        |             |
| currencyCode            | Y   | string             | 3      |             |
| bankWithdrawalMethodId  | Y   | int                |        |             |
| bankWithdrawalPurposeId | Y   | int                |        |             |
| note                    | N   | null &#124; string |        |             |
| onlyValidate            | Y   | bool               |        |             |
| referenceNumber         | N   | null &#124; string |        |             |


```json
{
    "sendingAccountId": "",
    "receivingBankAccountId": "",
    "amount": 100,
    "currencyCode": "USD",
    "bankWithdrawalMethodId": "",
    "bankWithdrawalPurposeId": "",
    "note": "",
    "onlyValidate": false,
    "referenceNumber": ""
}
```

#### Validate response

| Parameter       |  M  | Type                              | Length | Description |
| --------------- | --- | --------------------------------- | ------ | ----------- |
| referenceNumber | N   | string                            |        |             |
| fee             | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount     | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "referenceNumber": "",
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to payeer

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-payeer |


#### Request

| Parameter        |  M  | Type   | Length | Description          |
| ---------------- | --- | ------ | ------ | -------------------- |
| payeerCustomerId | Y   | string |        |                      |
| sendingAccountId | Y   | int    |        |                      |
| amount           | Y   | int    |        |                      |
| userIp           | Y   | string |        | Customer ip address. |
| onlyValidate     | Y   | bool   |        |                      |


```json
{
    "payeerCustomerId": "",
    "sendingAccountId": "",
    "amount": 100,
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to western union

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-western-union |


#### Request

| Parameter         |  M  | Type   | Length | Description          |
| ----------------- | --- | ------ | ------ | -------------------- |
| countryOfPickupId | Y   | int    |        |                      |
| cityOfPickup      | Y   | string |        |                      |
| currencyCode      | Y   | string | 3      |                      |
| sendingAccountId  | Y   | int    |        |                      |
| amount            | Y   | int    |        |                      |
| userIp            | Y   | string |        | Customer ip address. |
| onlyValidate      | Y   | bool   |        |                      |


```json
{
    "countryOfPickupId": "",
    "cityOfPickup": "",
    "currencyCode": "",
    "sendingAccountId": "",
    "amount": 100,
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to remittance

| URL                                                            |
| -------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-remittance |


#### Request

| Parameter          |  M  | Type   | Length | Description          |
| ------------------ | --- | ------ | ------ | -------------------- |
| customerName       | Y   | string |        |                      |
| customerAccount    | Y   | string |        |                      |
| bankName           | Y   | string |        |                      |
| identityCardNumber | Y   | string |        |                      |
| sendingAccountId   | Y   | int    |        |                      |
| amount             | Y   | int    |        |                      |
| userIp             | Y   | string |        | Customer ip address. |
| onlyValidate       | Y   | bool   |        |                      |


```json
{
    "customerName": "",
    "customerAccount": "",
    "bankName": "",
    "identityCardNumber": "",
    "sendingAccountId": "",
    "amount": 100,
    "userIp": "127.0.0.1",
    "onlyValidate": true
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to paypal

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-paypal |


#### Request

| Parameter        |  M  | Type   | Length | Description          |
| ---------------- | --- | ------ | ------ | -------------------- |
| email            | Y   | string |        |                      |
| sendingAccountId | Y   | int    |        |                      |
| amount           | Y   | int    |        |                      |
| userIp           | Y   | string |        | Customer ip address. |
| onlyValidate     | Y   | bool   |        |                      |


```json
{
    "email": "",
    "sendingAccountId": "",
    "amount": 100,
    "userIp": "127.0.0.1",
    "onlyValidate": false
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to crypto

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-crypto |


#### Request

| Parameter          |  M  | Type               | Length | Description          |
| ------------------ | --- | ------------------ | ------ | -------------------- |
| sendingAccountId   | Y   | int                |        |                      |
| receiver           | Y   | string             | 20     |                      |
| amount             | Y   | int                |        |                      |
| destinationAddress | Y   | string             |        |                      |
| destinationTag     | N   | null &#124; string |        |                      |
| cryptoCurrencyCode | Y   | string             | 3      |                      |
| expressTransaction | Y   | bool               |        |                      |
| userIp             | Y   | string             |        | Customer ip address. |
| onlyValidate       | Y   | bool               |        |                      |


```json
{
    "sendingAccountId": "",
    "receiver": "",
    "amount": 100,
    "destinationAddress": "",
    "destinationTag": "",
    "cryptoCurrencyCode": "BTC",
    "expressTransaction": true,
    "userIp": "127.0.0.1",
    "onlyValidate": true
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": true
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Account to external card

| URL                                                               |
| ----------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/account-to-external-card |


#### Request

| Parameter               |  M  | Type   | Length | Description          |
| ----------------------- | --- | ------ | ------ | -------------------- |
| sendingAccountId        | Y   | int    |        |                      |
| amount                  | Y   | int    |        |                      |
| currencyCode            | Y   | string | 3      |                      |
| receivingExternalCardId | Y   | int    |        |                      |
| onlyValidate            | Y   | bool   |        |                      |
| userIp                  | Y   | string |        | Customer ip address. |


```json
{
    "sendingAccountId": "",
    "amount": 100,
    "currencyCode": "USD",
    "receivingExternalCardId": "",
    "onlyValidate": true,
    "userIp": "127.0.0.1"
}
```

#### Validate response

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |
| totalAmount | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "fee": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "totalAmount": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Response

```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": []
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get account to crypto fees

| URL                                                                 |
| ------------------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/get-account-to-crypto-fees |


#### Request

| Parameter          |  M  | Type   | Length | Description |
| ------------------ | --- | ------ | ------ | ----------- |
| sendingAccountId   | Y   | int    |        |             |
| amount             | Y   | int    |        |             |
| cryptoCurrencyCode | Y   | string | 3      |             |


```json
{
    "sendingAccountId": "",
    "amount": 100,
    "cryptoCurrencyCode": "BTC"
}
```

#### Response

| Parameter |  M  | Type                              | Length | Description |
| --------- | --- | --------------------------------- | ------ | ----------- |
| standard  | N   | [`Money`](#appendix--type--money) |        |             |
| express   | N   | [`Money`](#appendix--type--money) |        |             |


```json
{
    "status": "success",
    "messages": [
        "Operation completed"
    ],
    "messagesCodes": [
        "OPERATION_COMPLETED"
    ],
    "messagesParams": {
        "OPERATION_COMPLETED": []
    },
    "data": {
        "standard": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        },
        "express": {
            "amount": 123,
            "currency": {
                "id": 144,
                "name": "United States Dollar",
                "code": "USD",
                "ison": 840,
                "multiplier": 100,
                "precision": 2,
                "cryptoCurrency": false
            }
        }
    }
}
```

#### Error response

```json
{
    "status": "error",
    "messages": [
        "Invalid signature"
    ],
    "messagesCodes": [
        "INVALID_SIGNATURE"
    ],
    "messagesParams": {
        "INVALID_SIGNATURE": []
    },
    "data": []
}
```

### Get paypal limits

| URL                                                        |
| ---------------------------------------------------------- |
| https://%fapiDomain%/%fapiPath%/withdraw/get-paypal-limits |


#### Request

No parameters need

# Appendix

## Type

### Paginator

| Parameter |  M  | Type            | Length | Description |
| --------- | --- | --------------- | ------ | ----------- |
| page      | N   | null &#124; int |        |             |
| limit     | N   | null &#124; int |        |             |


### Currency

| Parameter      |  M  | Type   | Length | Description |
| -------------- | --- | ------ | ------ | ----------- |
| id             | N   | int    |        |             |
| name           | N   | string |        |             |
| code           | N   | string |        |             |
| ison           | N   | string |        |             |
| multiplier     | N   | int    |        |             |
| precision      | N   | int    |        |             |
| cryptoCurrency | N   | bool   |        |             |


### Money

| Parameter |  M  | Type                                    | Length | Description |
| --------- | --- | --------------------------------------- | ------ | ----------- |
| amount    | N   | int                                     |        |             |
| currency  | N   | [`Currency`](#appendix--type--currency) |        |             |


### AccountStatus

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### AccountType

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### AccountGroup

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### AccountProgram

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### CardAutoFund

| Parameter |  M  | Type            | Length | Description |
| --------- | --- | --------------- | ------ | ----------- |
| enabled   | N   | bool            |        |             |
| accountId | N   | null &#124; int |        |             |
| cardId    | N   | null &#124; int |        |             |


### Account

| Parameter       |  M  | Type                                                            | Length | Description |
| --------------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| id              | N   | int                                                             |        |             |
| currency        | N   | [`Currency`](#appendix--type--currency)                         |        |             |
| balance         | N   | [`Money`](#appendix--type--money)                               |        |             |
| outstandingFees | N   | [`Money`](#appendix--type--money)                               |        |             |
| status          | N   | [`AccountStatus`](#appendix--type--accountstatus)               |        |             |
| primary         | N   | bool                                                            |        |             |
| type            | N   | [`AccountType`](#appendix--type--accounttype)                   |        |             |
| accountGroup    | N   | null &#124; [`AccountGroup`](#appendix--type--accountgroup)     |        |             |
| accountProgram  | N   | null &#124; [`AccountProgram`](#appendix--type--accountprogram) |        |             |
| cardAutoFund    | N   | [`CardAutoFund`](#appendix--type--cardautofund)                 |        |             |
| name            | N   | null &#124; string                                              |        |             |
| customName      | N   | null &#124; bool                                                |        |             |
| enabled         | N   | bool                                                            |        |             |


### PaginatorResult

| Parameter  |  M  | Type | Length | Description |
| ---------- | --- | ---- | ------ | ----------- |
| page       | N   | int  |        |             |
| limit      | N   | int  |        |             |
| pagesCount | N   | int  |        |             |
| totalCount | N   | int  |        |             |


### TransactionSender

| Parameter |  M  | Type                   | Length | Description |
| --------- | --- | ---------------------- | ------ | ----------- |
| id        | N   | null &#124; int        |        |             |
| name      | N   | null &#124; string     |        |             |
| type      | N   | int                    |        |             |
| avatar    | N   | null &#124; Collection |        |             |


### TransactionRecipient

| Parameter |  M  | Type                   | Length | Description |
| --------- | --- | ---------------------- | ------ | ----------- |
| id        | N   | null &#124; int        |        |             |
| name      | N   | null &#124; string     |        |             |
| type      | N   | int                    |        |             |
| avatar    | N   | null &#124; Collection |        |             |


### Transaction

| Parameter        |  M  | Type                                                                        | Length | Description                                         |
| ---------------- | --- | --------------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| id               | N   | int                                                                         |        |                                                     |
| dateTime         | N   | int                                                                         |        |                                                     |
| sender           | N   | null &#124; [`TransactionSender`](#appendix--type--transactionsender)       |        |                                                     |
| recipient        | N   | null &#124; [`TransactionRecipient`](#appendix--type--transactionrecipient) |        |                                                     |
| amount           | N   | [`Money`](#appendix--type--money)                                           |        |                                                     |
| instructedAmount | N   | [`Money`](#appendix--type--money)                                           |        |                                                     |
| description      | N   | string                                                                      |        |                                                     |
| fee              | N   | bool                                                                        |        |                                                     |
| pre              | N   | bool                                                                        |        |                                                     |
| pending          | N   | bool                                                                        |        |                                                     |
| rejected         | N   | bool                                                                        |        |                                                     |
| restricted       | N   | bool                                                                        |        |                                                     |
| reversal         | N   | bool                                                                        |        |                                                     |
| refund           | N   | bool                                                                        |        |                                                     |
| hasRefund        | N   | bool                                                                        |        |                                                     |
| errorCode        | N   | string                                                                      |        |                                                     |
| microtime        | N   | int                                                                         |        |                                                     |
| errorMessage     | N   | string                                                                      |        |                                                     |
| reason           | N   | null &#124; string                                                          |        |                                                     |
| receiver         | N   | null &#124; string                                                          |        | User entered custom receiver name in 'send crypto'  |


### AccountBalanceByDate

| Parameter          |  M  | Type                              | Length | Description |
| ------------------ | --- | --------------------------------- | ------ | ----------- |
| date               | N   | string                            |        |             |
| balance            | N   | [`Money`](#appendix--type--money) |        |             |
| outstandingBalance | N   | [`Money`](#appendix--type--money) |        |             |


### Advertisement

| Parameter |  M  | Type   | Length | Description                                                         |
| --------- | --- | ------ | ------ | ------------------------------------------------------------------- |
| id        | N   | int    |        |                                                                     |
| header    | N   | string |        |                                                                     |
| body      | N   | string |        |                                                                     |
| display   | N   | int    |        | 0 - Append html and evaluate scripts , 1 - Append html inside modal |


### Region

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |
| shortName | N   | string |        |             |


### Country

| Parameter      |  M  | Type                                  | Length | Description |
| -------------- | --- | ------------------------------------- | ------ | ----------- |
| id             | N   | int                                   |        |             |
| name           | N   | string                                |        |             |
| alphaTwoCode   | N   | string                                |        |             |
| alphaThreeCode | N   | string                                |        |             |
| phoneCode      | N   | null &#124; string                    |        |             |
| prohibited     | N   | bool                                  |        |             |
| highRisk       | N   | bool                                  |        |             |
| enabled        | N   | bool                                  |        |             |
| risk           | N   | null &#124; string                    |        |             |
| regions        | N   | [`Region`](#appendix--type--region)[] |        |             |


### BankAccountStatus

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### BankAccount

| Parameter                     |  M  | Type                                                      | Length | Description |
| ----------------------------- | --- | --------------------------------------------------------- | ------ | ----------- |
| id                            | N   | int                                                       |        |             |
| fullNameOnBankAccount         | Y   | string                                                    | 35     |             |
| iban                          | Y   | string                                                    | 35     |             |
| swift                         | Y   | string                                                    | 11     |             |
| branchCode                    | N   | null &#124; string                                        | 20     |             |
| bankName                      | Y   | string                                                    | 35     |             |
| bankAddress                   | Y   | string                                                    | 35     |             |
| bankCity                      | Y   | string                                                    | 20     |             |
| bankState                     | N   | null &#124; string                                        | 20     |             |
| bankCountry                   | N   | [`Country`](#appendix--type--country)                     |        |             |
| bankContactPhone              | Y   | null &#124; string                                        | 30     |             |
| correspondingBankSwift        | N   | null &#124; string                                        | 11     |             |
| correspondingBankName         | N   | null &#124; string                                        | 35     |             |
| correspondingBankCity         | N   | null &#124; string                                        | 20     |             |
| correspondingBankCurrencyCode | N   | null &#124; string                                        | 3      |             |
| enabled                       | N   | bool                                                      |        |             |
| primary                       | N   | bool                                                      |        |             |
| status                        | N   | [`BankAccountStatus`](#appendix--type--bankaccountstatus) |        |             |


### CardStatus

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | string |        |             |
| name      | N   | string |        |             |


### CardsDesign

| Parameter       |  M  | Type   | Length | Description |
| --------------- | --- | ------ | ------ | ----------- |
| id              | N   | string |        |             |
| name            | N   | string |        |             |
| frontImgUrl     | N   | string |        |             |
| backImgUrl      | N   | string |        |             |
| styleProperties | N   | string |        |             |


### Card

| Parameter         |  M  | Type                                                      | Length | Description |
| ----------------- | --- | --------------------------------------------------------- | ------ | ----------- |
| id                | N   | int                                                       |        |             |
| scheme            | N   | null &#124; string                                        |        |             |
| number            | N   | string                                                    |        |             |
| referenceId       | N   | string                                                    |        |             |
| pinBlocked        | N   | bool                                                      |        |             |
| status            | N   | [`CardStatus`](#appendix--type--cardstatus)               |        |             |
| virtual           | N   | bool                                                      |        |             |
| renewable         | N   | bool                                                      |        |             |
| hidden            | N   | bool                                                      |        |             |
| bulkCard          | N   | bool                                                      |        |             |
| accounts          | N   | [`Account`](#appendix--type--account)[]                   |        |             |
| nameOnCard        | N   | null &#124; string                                        |        |             |
| nameOnCardLineTwo | N   | null &#124; string                                        |        |             |
| expiryYear        | N   | int                                                       |        |             |
| expiryMonth       | N   | int                                                       |        |             |
| balances          | N   | [`Money`](#appendix--type--money)[]                       |        |             |
| outstandingFees   | N   | [`Money`](#appendix--type--money)[]                       |        |             |
| balancesSum       | N   | [`Money`](#appendix--type--money)                         |        |             |
| cardsDesign       | N   | null &#124; [`CardsDesign`](#appendix--type--cardsdesign) |        |             |


### CardHolder

| Parameter      |  M  | Type               | Length | Description |
| -------------- | --- | ------------------ | ------ | ----------- |
| firstName      | Y   | string             | 60     |             |
| lastName       | Y   | string             | 60     |             |
| passportNo     | Y   | string             |        |             |
| dateOfBirth    | Y   | string             |        |             |
| addressLineOne | Y   | string             |        |             |
| addressLineTwo | N   | null &#124; string |        |             |
| city           | Y   | string             |        |             |
| postal         | Y   | string             |        |             |
| countryId      | Y   | int                |        |             |


### CardBrand

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        | 1,2,3       |
| name      | N   | string |        |             |
| key       | N   | string |        | MC,VISA,CUP |
| active    | N   | bool   |        |             |


### Restriction

| Parameter     |  M  | Type       | Length | Description |
| ------------- | --- | ---------- | ------ | ----------- |
| message       | N   | string     |        |             |
| messageCode   | N   | string     |        |             |
| messageParams | N   | Collection |        |             |


### NameOnCardByExternalProgramCardType

| Parameter               |  M  | Type   | Length | Description                 |
| ----------------------- | --- | ------ | ------ | --------------------------- |
| externalProgramCardType | N   | int    |        | 1 - Consumer, 2 - Corporate |
| nameOnCard              | N   | string |        |                             |


### ExternalCardProgram

| Parameter          |  M  | Type                                      | Length | Description                 |
| ------------------ | --- | ----------------------------------------- | ------ | --------------------------- |
| id                 | N   | int                                       |        |                             |
| title              | N   | string                                    |        |                             |
| cardProviderId     | N   | int                                       |        |                             |
| cardBrand          | N   | [`CardBrand`](#appendix--type--cardbrand) |        |                             |
| externalCardTypeId | N   | int                                       |        | 1 - Consumer, 2 - Corporate |
| cardOrderLimit     | N   | null &#124; int                           |        |                             |
| virtual            | N   | bool                                      |        |                             |


### ExternalCardProgramsByCurrency

| Parameter            |  M  | Type                                                            | Length | Description |
| -------------------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| currency             | N   | [`Currency`](#appendix--type--currency)                         |        |             |
| externalCardPrograms | N   | [`ExternalCardProgram`](#appendix--type--externalcardprogram)[] |        |             |


### ExternalCardProgramsByAccount

| Parameter            |  M  | Type                                                            | Length | Description |
| -------------------- | --- | --------------------------------------------------------------- | ------ | ----------- |
| account              | N   | [`Account`](#appendix--type--account)                           |        |             |
| externalCardPrograms | N   | [`ExternalCardProgram`](#appendix--type--externalcardprogram)[] |        |             |


### ExternalCardProgramsByRelations

| Parameter                        |  M  | Type                                                                                  | Length | Description |
| -------------------------------- | --- | ------------------------------------------------------------------------------------- | ------ | ----------- |
| externalCardProgramsByCurrencies | N   | [`ExternalCardProgramsByCurrency`](#appendix--type--externalcardprogramsbycurrency)[] |        |             |
| externalCardProgramsByAccounts   | N   | [`ExternalCardProgramsByAccount`](#appendix--type--externalcardprogramsbyaccount)[]   |        |             |


### CardShippingMethod

| Parameter        |  M  | Type                              | Length | Description          |
| ---------------- | --- | --------------------------------- | ------ | -------------------- |
| id               | N   | int                               |        |                      |
| cardProviderId   | N   | int                               |        |                      |
| deliveryTime     | N   | null &#124; string                |        |                      |
| deliveryTimeType | N   | null &#124; int                   |        | 0 - days, 1 - weeks. |
| description      | N   | string                            |        |                      |
| name             | N   | string                            |        |                      |
| price            | N   | [`Money`](#appendix--type--money) |        |                      |
| resource         | N   | string                            |        |                      |
| selectPriority   | N   | null &#124; int                   |        |                      |


### CardOrderHolderAddress

| Parameter  |  M  | Type               | Length | Description |
| ---------- | --- | ------------------ | ------ | ----------- |
| address    | Y   | string             | 30     |             |
| addressTwo | N   | null &#124; string | 30     |             |
| city       | Y   | string             | 45     |             |
| postal     | Y   | string             | 10     |             |
| state      | N   | null &#124; string | 40     |             |
| countryId  | Y   | int                |        |             |


### Fee

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| description | N   | string                            |        |             |
| amount      | N   | [`Money`](#appendix--type--money) |        |             |


### CardWithdrawalLimit

| Parameter     |  M  | Type                                                | Length | Description |
| ------------- | --- | --------------------------------------------------- | ------ | ----------- |
| limitName     | N   | string                                              |        |             |
| durationValue | N   | string                                              |        |             |
| durationName  | N   | string                                              |        |             |
| limitValue    | N   | int                                                 |        |             |
| currency      | N   | null &#124; [`Currency`](#appendix--type--currency) |        |             |
| limitTypeKey  | N   | string                                              |        |             |


### AccountCurrencies

| Parameter  |  M  | Type                                      | Length | Description |
| ---------- | --- | ----------------------------------------- | ------ | ----------- |
| accountId  | N   | int                                       |        |             |
| currencies | N   | [`Currency`](#appendix--type--currency)[] |        |             |


### BankPaymentRequestAccountCurrenciesByType

| Parameter                  |  M  | Type                                                        | Length | Description |
| -------------------------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| personalBankPaymentRequest | N   | [`AccountCurrencies`](#appendix--type--accountcurrencies)[] |        |             |
| businessBankPaymentRequest | N   | [`AccountCurrencies`](#appendix--type--accountcurrencies)[] |        |             |


### CryptoRateData

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| dateTime  | N   | string |        |             |
| rate      | N   | string |        |             |


### CryptoRate

| Parameter   |  M  | Type                                                  | Length | Description |
| ----------- | --- | ----------------------------------------------------- | ------ | ----------- |
| currency    | N   | [`Currency`](#appendix--type--currency)               |        |             |
| minRate     | N   | string                                                |        |             |
| maxRate     | N   | string                                                |        |             |
| currentRate | N   | string                                                |        |             |
| data        | N   | [`CryptoRateData`](#appendix--type--cryptoratedata)[] |        |             |


### DateTime

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |


### KycDocumentStatus

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### KycDocumentType

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |
| groupId   | N   | int    |        |             |


### File

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |
| extension | N   | string |        |             |
| size      | N   | int    |        |             |


### KycDocument

| Parameter      |  M  | Type                                                      | Length | Description |
| -------------- | --- | --------------------------------------------------------- | ------ | ----------- |
| id             | N   | int                                                       |        |             |
| status         | N   | [`KycDocumentStatus`](#appendix--type--kycdocumentstatus) |        |             |
| type           | N   | [`KycDocumentType`](#appendix--type--kycdocumenttype)     |        |             |
| dateUpdated    | N   | null &#124; int                                           |        |             |
| approvalDate   | N   | null &#124; int                                           |        |             |
| requestDate    | N   | null &#124; int                                           |        |             |
| requestComment | N   | string                                                    |        |             |
| file           | N   | null &#124; [`File`](#appendix--type--file)               |        |             |
| bankAccountId  | N   | null &#124; int                                           |        |             |


### Base64File

| Parameter   |  M  | Type               | Length | Description |
| ----------- | --- | ------------------ | ------ | ----------- |
| name        | Y   | string             |        |             |
| content     | Y   | string             |        |             |
| contentType | N   | null &#124; string |        |             |


### EmailTemplate

| Parameter    |  M  | Type               | Length | Description                     |
| ------------ | --- | ------------------ | ------ | ------------------------------- |
| id           | N   | int                |        |                                 |
| name         | N   | string             |        |                                 |
| title        | N   | null &#124; string |        |                                 |
| titleTag     | N   | null &#124; string |        |                                 |
| text         | N   | string             |        |                                 |
| textTag      | N   | string             |        |                                 |
| subject      | N   | string             |        |                                 |
| subjectTag   | N   | string             |        |                                 |
| category     | N   | null &#124; int    |        | 1 - validate_email, 2 - generic |
| placeholders | N   | Collection         |        |                                 |


### ExternalCardStatus

| Parameter           |  M  | Type   | Length | Description |
| ------------------- | --- | ------ | ------ | ----------- |
| id                  | N   | int    |        |             |
| name                | N   | string |        |             |
| canVerify           | N   | bool   |        |             |
| verificationExpired | N   | bool   |        |             |
| suspended           | N   | bool   |        |             |


### ExternalCard

| Parameter  |  M  | Type                                                        | Length | Description |
| ---------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| id         | N   | int                                                         |        |             |
| cardNumber | N   | string                                                      |        |             |
| nameOnCard | N   | string                                                      |        |             |
| status     | N   | [`ExternalCardStatus`](#appendix--type--externalcardstatus) |        |             |
| brand      | N   | string                                                      |        |             |


### ExternalCardHolderAddress

| Parameter      |  M  | Type   | Length | Description |
| -------------- | --- | ------ | ------ | ----------- |
| addressLineOne | Y   | string |        |             |
| city           | Y   | string |        |             |
| postal         | Y   | string |        |             |
| state          | Y   | string |        |             |
| countryId      | Y   | int    |        |             |


### ExternalCardS3d

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| md        | N   | string |        |             |
| paReq     | N   | string |        |             |
| action    | N   | string |        |             |


### FaqQuestion

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| title     | N   | string |        |             |
| answer    | N   | string |        |             |


### FaqQuestionsGroup

| Parameter |  M  | Type                                            | Length | Description |
| --------- | --- | ----------------------------------------------- | ------ | ----------- |
| title     | N   | string                                          |        |             |
| questions | N   | [`FaqQuestion`](#appendix--type--faqquestion)[] |        |             |


### FaqTopic

| Parameter       |  M  | Type                                                        | Length | Description |
| --------------- | --- | ----------------------------------------------------------- | ------ | ----------- |
| title           | N   | string                                                      |        |             |
| icon            | N   | string                                                      |        |             |
| questionsGroups | N   | [`FaqQuestionsGroup`](#appendix--type--faqquestionsgroup)[] |        |             |


### Faq

| Parameter |  M  | Type                                      | Length | Description |
| --------- | --- | ----------------------------------------- | ------ | ----------- |
| topics    | N   | [`FaqTopic`](#appendix--type--faqtopic)[] |        |             |


### UploadedAvatar

| Parameter  |  M  | Type   | Length | Description |
| ---------- | --- | ------ | ------ | ----------- |
| dimensions | N   | string |        |             |
| path       | N   | string |        |             |
| size       | N   | int    |        |             |


### IbanBankProvider

| Parameter    |  M  | Type               | Length | Description                   |
| ------------ | --- | ------------------ | ------ | ----------------------------- |
| id           | N   | int                |        | 1,2,3                         |
| providerCode | N   | null &#124; string |        | CENTROLINK,STARLING,CLEARBANK |


### Iban

| Parameter      |  M  | Type                                                                | Length | Description |
| -------------- | --- | ------------------------------------------------------------------- | ------ | ----------- |
| id             | N   | int                                                                 |        |             |
| internalName   | N   | null &#124; string                                                  |        |             |
| accountId      | N   | int                                                                 |        |             |
| accountName    | N   | string                                                              |        |             |
| accountAddress | N   | null &#124; string                                                  |        |             |
| accountNumber  | N   | null &#124; string                                                  |        |             |
| sortCode       | N   | null &#124; string                                                  |        |             |
| iban           | N   | string                                                              |        |             |
| bic            | N   | string                                                              |        |             |
| currencyCode   | N   | string                                                              |        |             |
| status         | N   | string                                                              |        |             |
| bankProvider   | N   | null &#124; [`IbanBankProvider`](#appendix--type--ibanbankprovider) |        |             |
| bankName       | N   | null &#124; string                                                  |        |             |
| bankAddress    | N   | null &#124; string                                                  |        |             |


### IbanAccount

| Parameter    |  M  | Type   | Length | Description |
| ------------ | --- | ------ | ------ | ----------- |
| id           | N   | int    |        |             |
| currencyCode | N   | string |        |             |


### CreateIbanRequest

| Parameter                  |  M  | Type                                                | Length | Description                                 |
| -------------------------- | --- | --------------------------------------------------- | ------ | ------------------------------------------- |
| internalName               | N   | null &#124; string                                  | 100    |                                             |
| accountId                  | Y   | int                                                 |        |                                             |
| dateOfCompanyIncorporation | N   | null &#124; [`DateTime`](#appendix--type--datetime) |        | Must be used only for business IBAN create. |
| industryId                 | N   | null &#124; int                                     |        | Must be used only for business IBAN create. |


### DirectDebitTransfer

| Parameter                      |  M  | Type                              | Length | Description |
| ------------------------------ | --- | --------------------------------- | ------ | ----------- |
| id                             | N   | int                               |        |             |
| mandateId                      | N   | int                               |        |             |
| iban                           | N   | null &#124; string                |        |             |
| accountId                      | N   | null &#124; int                   |        |             |
| money                          | N   | [`Money`](#appendix--type--money) |        |             |
| reference                      | N   | null &#124; string                |        |             |
| originatorAccName              | N   | null &#124; string                |        |             |
| originatorAccNumber            | N   | null &#124; string                |        |             |
| originatorAccSortCode          | N   | null &#124; string                |        |             |
| originatorAccServiceUserNumber | N   | null &#124; string                |        |             |
| status                         | N   | null &#124; string                |        |             |
| txIbansStatus                  | N   | null &#124; string                |        |             |


### IbanTransferAccount

| Parameter |  M  | Type                                              | Length | Description |
| --------- | --- | ------------------------------------------------- | ------ | ----------- |
| id        | N   | int                                               |        |             |
| currency  | N   | [`Currency`](#appendix--type--currency)           |        |             |
| balance   | N   | [`Money`](#appendix--type--money)                 |        |             |
| status    | N   | [`AccountStatus`](#appendix--type--accountstatus) |        |             |
| ibans     | N   | [`Iban`](#appendix--type--iban)[]                 |        |             |


### AcRequestWithdrawDetailsPurpose

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| purpose   | N   | string |        |             |


### Industry

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### LegalAgreementContentLine

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| number    | N   | int    |        |             |
| title     | N   | string |        |             |
| content   | N   | string |        |             |


### LegalAgreement

| Parameter |  M  | Type                                                                        | Length | Description |
| --------- | --- | --------------------------------------------------------------------------- | ------ | ----------- |
| header    | N   | string                                                                      |        |             |
| content   | N   | [`LegalAgreementContentLine`](#appendix--type--legalagreementcontentline)[] |        |             |


### LoadBankDetails

| Parameter        |  M  | Type   | Length | Description |
| ---------------- | --- | ------ | ------ | ----------- |
| accountName      | N   | string |        |             |
| bankName         | N   | string |        |             |
| branchAndAddress | N   | string |        |             |
| accountNumber    | N   | string |        |             |
| accountAddress   | N   | string |        |             |
| iban             | N   | string |        |             |
| swift            | N   | string |        |             |


### NewExternalCard

| Parameter         |  M  | Type                                                                      | Length | Description |
| ----------------- | --- | ------------------------------------------------------------------------- | ------ | ----------- |
| nameOnCard        | Y   | string                                                                    |        |             |
| cardNumber        | Y   | string                                                                    | 19     |             |
| csc               | Y   | string                                                                    | 4      |             |
| expirationMonth   | Y   | string                                                                    | 2      |             |
| expirationYear    | Y   | string                                                                    | 4      |             |
| cardHolderAddress | Y   | [`ExternalCardHolderAddress`](#appendix--type--externalcardholderaddress) |        |             |


### ExternalCardDepositCategory

| Parameter           |  M  | Type       | Length | Description |
| ------------------- | --- | ---------- | ------ | ----------- |
| type                | N   | int        |        |             |
| name                | N   | string     |        |             |
| assignedAccountsIds | N   | Collection |        |             |


### MessageSender

| Parameter |  M  | Type                   | Length | Description |
| --------- | --- | ---------------------- | ------ | ----------- |
| id        | N   | int                    |        |             |
| name      | N   | string                 |        |             |
| type      | N   | int                    |        |             |
| avatar    | N   | null &#124; Collection |        |             |


### MessageReceiver

| Parameter |  M  | Type                   | Length | Description |
| --------- | --- | ---------------------- | ------ | ----------- |
| id        | N   | int                    |        |             |
| name      | N   | string                 |        |             |
| type      | N   | int                    |        |             |
| avatar    | N   | null &#124; Collection |        |             |


### MessageAttachmentWhitoutContent

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| filename  | N   | string |        |             |
| sensitive | N   | bool   |        |             |


### Message

| Parameter   |  M  | Type                                                                                    | Length | Description |
| ----------- | --- | --------------------------------------------------------------------------------------- | ------ | ----------- |
| id          | N   | int                                                                                     |        |             |
| time        | N   | int                                                                                     |        |             |
| subject     | N   | string                                                                                  |        |             |
| content     | N   | string                                                                                  |        |             |
| sender      | N   | [`MessageSender`](#appendix--type--messagesender)                                       |        |             |
| receiver    | N   | [`MessageReceiver`](#appendix--type--messagereceiver)                                   |        |             |
| type        | N   | int                                                                                     |        |             |
| read        | N   | bool                                                                                    |        |             |
| permanent   | N   | bool                                                                                    |        |             |
| attachments | N   | [`MessageAttachmentWhitoutContent`](#appendix--type--messageattachmentwhitoutcontent)[] |        |             |


### MessageAttachment

| Parameter   |  M  | Type               | Length | Description |
| ----------- | --- | ------------------ | ------ | ----------- |
| id          | N   | int                |        |             |
| filename    | N   | string             |        |             |
| contentType | N   | null &#124; string |        |             |
| bodyBase64  | N   | string             |        |             |
| sensitive   | N   | bool               |        |             |


### Departament

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### DepartmentSubject

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |
| group     | N   | string |        |             |


### PaymentLink

| Parameter     |  M  | Type                                          | Length | Description |
| ------------- | --- | --------------------------------------------- | ------ | ----------- |
| id            | N   | int                                           |        |             |
| accountId     | N   | null &#124; string                            |        |             |
| amount        | N   | null &#124; [`Money`](#appendix--type--money) |        |             |
| link          | N   | string                                        |        |             |
| disabled      | N   | bool                                          |        |             |
| paymentMethod | N   | string                                        |        |             |
| dateCreated   | N   | string                                        |        |             |
| dateExpired   | N   | null &#124; string                            |        |             |
| oneTimeUse    | N   | bool                                          |        |             |
| status        | N   | string                                        |        |             |


### BusinessPayer

| Parameter                  |  M  | Type               | Length | Description |
| -------------------------- | --- | ------------------ | ------ | ----------- |
| businessName               | Y   | string             | 64     |             |
| businessRegistrationNumber | Y   | string             | 64     |             |
| email                      | Y   | string             |        |             |
| mobile                     | Y   | string             | 30     |             |
| address                    | Y   | string             |        |             |
| state                      | N   | null &#124; string | 50     |             |
| postal                     | Y   | string             |        |             |
| city                       | Y   | string             |        |             |
| countryId                  | Y   | int                |        |             |


### BankDetails

| Parameter             |  M  | Type               | Length | Description |
| --------------------- | --- | ------------------ | ------ | ----------- |
| fullNameOnBankAccount | N   | null &#124; string | 35     |             |
| name                  | N   | null &#124; string | 35     |             |
| address               | N   | null &#124; string | 35     |             |
| city                  | N   | null &#124; string | 20     |             |
| iban                  | N   | null &#124; string | 35     |             |
| swift                 | N   | null &#124; string | 11     |             |
| countryId             | N   | null &#124; int    |        |             |


### ReccuringTransferPeriod

| Parameter |  M  | Type               | Length | Description |
| --------- | --- | ------------------ | ------ | ----------- |
| dateFrom  | Y   | string             |        |             |
| dateTo    | N   | null &#124; string |        |             |
| type      | Y   | null &#124; string |        |             |
| weekday   | N   | null &#124; string |        |             |
| day       | N   | null &#124; int    |        |             |


### PersonalPayer

| Parameter  |  M  | Type               | Length | Description |
| ---------- | --- | ------------------ | ------ | ----------- |
| title      | N   | null &#124; string | 15     |             |
| firstName  | N   | null &#124; string |        |             |
| middleName | N   | null &#124; string | 50     |             |
| lastName   | N   | null &#124; string |        |             |
| gender     | N   | null &#124; string |        |             |
| email      | Y   | string             |        |             |
| mobile     | Y   | string             | 30     |             |
| address    | Y   | string             |        |             |
| state      | N   | null &#124; string | 50     |             |
| postal     | Y   | string             |        |             |
| city       | Y   | string             |        |             |
| countryId  | Y   | int                |        |             |


### PaymentMethodRestriction

| Parameter                     |  M  | Type       | Length | Description |
| ----------------------------- | --- | ---------- | ------ | ----------- |
| userCountryRestricted         | N   | bool       |        |             |
| phoneVerificationRequired     | N   | bool       |        |             |
| documentsVerificationRequired | N   | bool       |        |             |
| documentsVerificationPending  | N   | bool       |        |             |
| blockedByIovation             | N   | bool       |        |             |
| message                       | N   | string     |        |             |
| messageCode                   | N   | string     |        |             |
| messageParams                 | N   | Collection |        |             |


### PaymentMethod

| Parameter             |  M  | Type                                                                                | Length | Description |
| --------------------- | --- | ----------------------------------------------------------------------------------- | ------ | ----------- |
| name                  | N   | string                                                                              |        |             |
| restriction           | N   | null &#124; [`PaymentMethodRestriction`](#appendix--type--paymentmethodrestriction) |        |             |
| forCryptoAccountsOnly | N   | bool                                                                                |        |             |


### PaymentMethodGroup

| Parameter          |  M  | Type                                                | Length | Description |
| ------------------ | --- | --------------------------------------------------- | ------ | ----------- |
| universal          | N   | [`PaymentMethod`](#appendix--type--paymentmethod)[] |        |             |
| externalCreditCard | N   | [`PaymentMethod`](#appendix--type--paymentmethod)[] |        |             |
| crypto             | N   | [`PaymentMethod`](#appendix--type--paymentmethod)[] |        |             |


### PaymentRequestNewPayer

| Parameter                  |  M  | Type               | Length | Description |
| -------------------------- | --- | ------------------ | ------ | ----------- |
| type                       | N   | null &#124; int    |        |             |
| title                      | N   | null &#124; string | 15     |             |
| businessName               | N   | null &#124; string | 64     |             |
| businessRegistrationNumber | N   | null &#124; string | 64     |             |
| firstName                  | N   | null &#124; string |        |             |
| middleName                 | N   | null &#124; string | 50     |             |
| lastName                   | N   | null &#124; string |        |             |
| gender                     | N   | null &#124; string |        |             |
| email                      | Y   | string             |        |             |
| mobile                     | Y   | string             | 30     |             |
| address                    | Y   | string             |        |             |
| state                      | N   | null &#124; string | 50     |             |
| postal                     | Y   | string             |        |             |
| city                       | Y   | string             |        |             |
| countryId                  | Y   | int                |        |             |


### PaymentRequestPayer

| Parameter                  |  M  | Type                                                                | Length | Description |
| -------------------------- | --- | ------------------------------------------------------------------- | ------ | ----------- |
| type                       | N   | null &#124; int                                                     |        |             |
| title                      | N   | null &#124; string                                                  |        |             |
| businessName               | N   | null &#124; string                                                  |        |             |
| businessRegistrationNumber | N   | null &#124; string                                                  |        |             |
| firstName                  | N   | null &#124; string                                                  |        |             |
| middleName                 | N   | null &#124; string                                                  |        |             |
| lastName                   | N   | null &#124; string                                                  |        |             |
| gender                     | N   | null &#124; string                                                  |        |             |
| email                      | N   | string                                                              |        |             |
| mobile                     | N   | string                                                              |        |             |
| address                    | N   | string                                                              |        |             |
| state                      | N   | null &#124; string                                                  |        |             |
| postal                     | N   | string                                                              |        |             |
| city                       | N   | string                                                              |        |             |
| country                    | N   | [`Country`](#appendix--type--country)                               |        |             |
| formData                   | N   | [`PaymentRequestNewPayer`](#appendix--type--paymentrequestnewpayer) |        |             |


### PaymentRequestNewPayerBankDetails

| Parameter             |  M  | Type               | Length | Description |
| --------------------- | --- | ------------------ | ------ | ----------- |
| fullNameOnBankAccount | N   | null &#124; string | 35     |             |
| name                  | N   | null &#124; string | 35     |             |
| address               | N   | null &#124; string | 35     |             |
| city                  | N   | null &#124; string | 20     |             |
| iban                  | N   | null &#124; string | 35     |             |
| swift                 | N   | null &#124; string | 11     |             |
| countryId             | N   | null &#124; int    |        |             |


### PaymentRequestPayerBankDetails

| Parameter             |  M  | Type                                                                                      | Length | Description |
| --------------------- | --- | ----------------------------------------------------------------------------------------- | ------ | ----------- |
| fullNameOnBankAccount | N   | null &#124; string                                                                        |        |             |
| name                  | N   | null &#124; string                                                                        |        |             |
| address               | N   | null &#124; string                                                                        |        |             |
| city                  | N   | null &#124; string                                                                        |        |             |
| iban                  | N   | null &#124; string                                                                        |        |             |
| swift                 | N   | null &#124; string                                                                        |        |             |
| country               | N   | null &#124; [`Country`](#appendix--type--country)                                         |        |             |
| formData              | N   | [`PaymentRequestNewPayerBankDetails`](#appendix--type--paymentrequestnewpayerbankdetails) |        |             |


### PaymentRequestLoadTemplate

| Parameter                    |  M  | Type                                                                                | Length | Description                                                        |
| ---------------------------- | --- | ----------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| templateId                   | N   | int                                                                                 |        |                                                                    |
| templateName                 | N   | string                                                                              | 50     |                                                                    |
| templateNote                 | N   | null &#124; string                                                                  | 255    |                                                                    |
| receiverBusinessName         | N   | null &#124; string                                                                  | 50     |                                                                    |
| payer                        | N   | [`PaymentRequestPayer`](#appendix--type--paymentrequestpayer)                       |        |                                                                    |
| bankDetails                  | N   | [`PaymentRequestPayerBankDetails`](#appendix--type--paymentrequestpayerbankdetails) |        |                                                                    |
| account                      | N   | [`Account`](#appendix--type--account)                                               |        |                                                                    |
| amount                       | N   | [`Money`](#appendix--type--money)                                                   |        |                                                                    |
| recurringTransfer            | N   | bool                                                                                |        |                                                                    |
| recurringTransferDescription | N   | null &#124; string                                                                  | 255    |                                                                    |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)   |        |                                                                    |
| type                         | N   | null &#124; string                                                                  |        | uu2m, mu2m - load payment request, mm2u - withdraw payment request |
| dateCreated                  | N   | string                                                                              |        |                                                                    |


### PaymentRequestNewReceiver

| Parameter  |  M  | Type               | Length | Description  |
| ---------- | --- | ------------------ | ------ | ------------ |
| title      | N   | null &#124; string | 15     |              |
| firstName  | Y   | string             |        |              |
| middleName | N   | null &#124; string | 50     |              |
| lastName   | Y   | string             |        |              |
| gender     | Y   | string             |        | female, male |
| email      | Y   | string             |        |              |
| mobile     | Y   | string             | 30     |              |
| address    | Y   | string             |        |              |
| state      | N   | null &#124; string | 50     |              |
| postal     | Y   | string             |        |              |
| city       | Y   | string             |        |              |
| countryId  | Y   | int                |        |              |


### PaymentRequestReceiver

| Parameter  |  M  | Type                                                                      | Length | Description |
| ---------- | --- | ------------------------------------------------------------------------- | ------ | ----------- |
| title      | N   | null &#124; string                                                        |        |             |
| firstName  | N   | string                                                                    |        |             |
| middleName | N   | null &#124; string                                                        |        |             |
| lastName   | N   | string                                                                    |        |             |
| gender     | N   | string                                                                    |        |             |
| email      | N   | string                                                                    |        |             |
| mobile     | N   | string                                                                    |        |             |
| address    | N   | string                                                                    |        |             |
| state      | N   | null &#124; string                                                        |        |             |
| postal     | N   | string                                                                    |        |             |
| city       | N   | string                                                                    |        |             |
| country    | N   | [`Country`](#appendix--type--country)                                     |        |             |
| formData   | N   | [`PaymentRequestNewReceiver`](#appendix--type--paymentrequestnewreceiver) |        |             |


### PaymentRequestNewReceiverBankDetails

| Parameter             |  M  | Type   | Length | Description |
| --------------------- | --- | ------ | ------ | ----------- |
| fullNameOnBankAccount | Y   | string | 35     |             |
| name                  | Y   | string | 35     |             |
| address               | Y   | string | 35     |             |
| city                  | Y   | string | 20     |             |
| iban                  | Y   | string | 35     |             |
| swift                 | Y   | string | 11     |             |
| countryId             | Y   | int    |        |             |


### PaymentRequestReceiverBankDetails

| Parameter             |  M  | Type                                                                                            | Length | Description |
| --------------------- | --- | ----------------------------------------------------------------------------------------------- | ------ | ----------- |
| fullNameOnBankAccount | N   | string                                                                                          |        |             |
| name                  | N   | string                                                                                          |        |             |
| address               | N   | string                                                                                          |        |             |
| city                  | N   | string                                                                                          |        |             |
| iban                  | N   | string                                                                                          |        |             |
| swift                 | N   | string                                                                                          |        |             |
| country               | N   | [`Country`](#appendix--type--country)                                                           |        |             |
| formData              | N   | [`PaymentRequestNewReceiverBankDetails`](#appendix--type--paymentrequestnewreceiverbankdetails) |        |             |


### PaymentRequestCorrespondentBankDetails

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| name         | N   | null &#124; string | 35     |             |
| city         | N   | null &#124; string | 20     |             |
| swift        | N   | null &#124; string | 11     |             |
| currencyCode | N   | null &#124; string | 3      |             |


### WithdrawMethod

| Parameter   |  M  | Type                              | Length | Description |
| ----------- | --- | --------------------------------- | ------ | ----------- |
| id          | N   | int                               |        |             |
| name        | N   | string                            |        |             |
| description | N   | null &#124; string                |        |             |
| fee         | N   | [`Money`](#appendix--type--money) |        |             |


### BankWidthdrawPurpose

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### PaymentRequestWithdrawTemplate

| Parameter                    |  M  | Type                                                                                                | Length | Description                                                        |
| ---------------------------- | --- | --------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| templateId                   | N   | int                                                                                                 |        |                                                                    |
| templateName                 | N   | string                                                                                              |        |                                                                    |
| templateNote                 | N   | null &#124; string                                                                                  |        |                                                                    |
| messageToReceiver            | N   | null &#124; string                                                                                  |        |                                                                    |
| payerBusinessName            | N   | null &#124; string                                                                                  |        |                                                                    |
| receiver                     | N   | [`PaymentRequestReceiver`](#appendix--type--paymentrequestreceiver)                                 |        |                                                                    |
| bankDetails                  | N   | [`PaymentRequestReceiverBankDetails`](#appendix--type--paymentrequestreceiverbankdetails)           |        |                                                                    |
| correspondentBankDetails     | N   | [`PaymentRequestCorrespondentBankDetails`](#appendix--type--paymentrequestcorrespondentbankdetails) |        |                                                                    |
| account                      | N   | [`Account`](#appendix--type--account)                                                               |        |                                                                    |
| amount                       | N   | [`Money`](#appendix--type--money)                                                                   |        |                                                                    |
| recurringTransfer            | N   | bool                                                                                                |        |                                                                    |
| recurringTransferDescription | N   | null &#124; string                                                                                  |        |                                                                    |
| period                       | N   | null &#124; [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod)                   |        |                                                                    |
| type                         | N   | null &#124; string                                                                                  |        | uu2m, mu2m - load payment request, mm2u - withdraw payment request |
| dateCreated                  | N   | string                                                                                              |        |                                                                    |
| bankWithdrawalMethod         | N   | null &#124; [`WithdrawMethod`](#appendix--type--withdrawmethod)                                     |        |                                                                    |
| bankWithdrawPurpose          | N   | null &#124; [`BankWidthdrawPurpose`](#appendix--type--bankwidthdrawpurpose)                         |        |                                                                    |


### PaymentRequestTemplate

| Parameter    |  M  | Type                                                                                            | Length | Description |
| ------------ | --- | ----------------------------------------------------------------------------------------------- | ------ | ----------- |
| id           | N   | int                                                                                             |        |             |
| account      | N   | [`Account`](#appendix--type--account)                                                           |        |             |
| currency     | N   | null &#124; [`Currency`](#appendix--type--currency)                                             |        |             |
| amount       | N   | null &#124; [`Money`](#appendix--type--money)                                                   |        |             |
| businessName | N   | null &#124; string                                                                              |        |             |
| payerDetails | N   | null &#124; [`PaymentRequestPayer`](#appendix--type--paymentrequestpayer)                       |        |             |
| bankDetails  | N   | null &#124; [`PaymentRequestPayerBankDetails`](#appendix--type--paymentrequestpayerbankdetails) |        |             |


### PaymentRequest

| Parameter       |  M  | Type                                                                            | Length | Description |
| --------------- | --- | ------------------------------------------------------------------------------- | ------ | ----------- |
| id              | N   | int                                                                             |        |             |
| amount          | N   | null &#124; [`Money`](#appendix--type--money)                                   |        |             |
| template        | N   | null &#124; [`PaymentRequestTemplate`](#appendix--type--paymentrequesttemplate) |        |             |
| payerType       | N   | null &#124; string                                                              |        |             |
| status          | N   | null &#124; string                                                              |        |             |
| date            | N   | null &#124; int                                                                 |        |             |
| currency        | N   | null &#124; [`Currency`](#appendix--type--currency)                             |        |             |
| referenceNumber | N   | null &#124; string                                                              |        |             |
| creditedAmount  | N   | null &#124; [`Money`](#appendix--type--money)                                   |        |             |
| proofOfId       | N   | null &#124; string                                                              |        |             |
| proofOfAddress  | N   | null &#124; string                                                              |        |             |
| fullName        | N   | null &#124; string                                                              |        |             |
| requestedBy     | N   | null &#124; string                                                              |        |             |


### Business

| Parameter |  M  | Type | Length | Description |
| --------- | --- | ---- | ------ | ----------- |
| approved  | N   | bool |        |             |


### Permission

| Parameter       |  M  | Type       | Length | Description |
| --------------- | --- | ---------- | ------ | ----------- |
| user            | N   | Collection |        |             |
| card            | N   | Collection |        |             |
| paymentOverride | N   | Collection |        |             |


### User

| Parameter          |  M  | Type                                                | Length | Description |
| ------------------ | --- | --------------------------------------------------- | ------ | ----------- |
| token              | N   | string                                              |        |             |
| userId             | N   | int                                                 |        |             |
| motherId           | N   | null &#124; int                                     |        |             |
| secret             | N   | string                                              |        |             |
| username           | N   | string                                              |        |             |
| firstName          | N   | string                                              |        |             |
| lastName           | N   | string                                              |        |             |
| profileCompleted   | N   | bool                                                |        |             |
| phoneValidated     | N   | bool                                                |        |             |
| type               | N   | int                                                 |        |             |
| business           | N   | null &#124; [`Business`](#appendix--type--business) |        |             |
| status             | N   | string                                              |        |             |
| avatar             | N   | null &#124; Collection                              |        |             |
| permission         | N   | [`Permission`](#appendix--type--permission)         |        |             |
| active             | N   | bool                                                |        |             |
| ccLoadDisabled     | N   | bool                                                |        |             |
| selfRegistered     | N   | bool                                                |        |             |
| createdByMerchant  | N   | bool                                                |        |             |
| primaryCurrency    | N   | null &#124; [`Currency`](#appendix--type--currency) |        |             |
| sessionIdleTime    | N   | int                                                 |        |             |
| sessionPopupTime   | N   | int                                                 |        |             |
| shared             | N   | bool                                                |        |             |
| gender             | N   | string                                              |        |             |
| hasReferralProgram | N   | bool                                                |        |             |
| mobile             | N   | null &#124; string                                  |        |             |
| loggedAsAdmin      | N   | bool                                                |        |             |


### Purchase

| Parameter      |  M  | Type                              | Length | Description |
| -------------- | --- | --------------------------------- | ------ | ----------- |
| amount         | N   | [`Money`](#appendix--type--money) |        |             |
| id             | N   | string                            |        |             |
| purchaseStatus | N   | string                            |        |             |
| url            | N   | null &#124; string                |        |             |


### RecurringTransfer

| Parameter          |  M  | Type                                                                  | Length | Description |
| ------------------ | --- | --------------------------------------------------------------------- | ------ | ----------- |
| id                 | N   | int                                                                   |        |             |
| sendingAccountId   | Y   | int                                                                   |        |             |
| receivingAccountId | Y   | int                                                                   |        |             |
| receiverUsername   | Y   | string                                                                |        |             |
| amount             | Y   | [`Money`](#appendix--type--money)                                     |        |             |
| description        | N   | null &#124; string                                                    |        |             |
| period             | Y   | [`ReccuringTransferPeriod`](#appendix--type--reccuringtransferperiod) |        |             |
| sendNotification   | Y   | bool                                                                  |        |             |


### ReferredUser

| Parameter   |  M  | Type   | Length | Description       |
| ----------- | --- | ------ | ------ | ----------------- |
| id          | N   | int    |        |                   |
| username    | N   | string |        |                   |
| dateCreated | N   | int    |        | returns timestamp |


### SecurityQuestion

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| value     | N   | string |        |             |


### TearQuestion

| Parameter |  M  | Type              | Length | Description |
| --------- | --- | ----------------- | ------ | ----------- |
| type      | Y   | string            |        |             |
| value     | Y   | int &#124; string | 250    |             |


### SecurityQuestionTear

| Parameter |  M  | Type                                            | Length | Description |
| --------- | --- | ----------------------------------------------- | ------ | ----------- |
| question  | Y   | [`TearQuestion`](#appendix--type--tearquestion) |        |             |
| answer    | Y   | string                                          | 50     |             |


### MerchantKey

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| id           | N   | int                |        |             |
| key          | N   | string             |        |             |
| secretKey    | N   | string             |        |             |
| tripleDesKey | N   | null &#124; string |        |             |


### ApiUrls

| Parameter    |  M  | Type               | Length | Description |
| ------------ | --- | ------------------ | ------ | ----------- |
| urlOnSuccess | N   | null &#124; string |        |             |
| urlOnFailure | N   | null &#124; string |        |             |


### SharedUserPermission

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### SharedUser

| Parameter   |  M  | Type                                                              | Length | Description |
| ----------- | --- | ----------------------------------------------------------------- | ------ | ----------- |
| userId      | N   | int                                                               |        |             |
| username    | N   | string                                                            |        |             |
| firstName   | N   | string                                                            |        |             |
| lastName    | N   | string                                                            |        |             |
| accounts    | N   | [`Account`](#appendix--type--account)[]                           |        |             |
| cards       | N   | [`Card`](#appendix--type--card)[]                                 |        |             |
| permissions | N   | [`SharedUserPermission`](#appendix--type--shareduserpermission)[] |        |             |


### DocumentType

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |
| nameTag   | N   | string |        |             |


### AddressUpdate

| Parameter      |  M  | Type               | Length | Description |
| -------------- | --- | ------------------ | ------ | ----------- |
| addressLineOne | Y   | string             |        |             |
| addressLineTwo | N   | null &#124; string |        |             |
| city           | Y   | string             |        |             |
| state          | N   | null &#124; string |        |             |
| postal         | Y   | string             |        |             |
| countryId      | Y   | int                |        |             |


### SponsoredAccount

| Parameter     |  M  | Type               | Length | Description           |
| ------------- | --- | ------------------ | ------ | --------------------- |
| id            | N   | int                |        |                       |
| username      | N   | string             |        |                       |
| dateCreated   | N   | string             |        |                       |
| dateCompleted | N   | null &#124; string |        |                       |
| tempPassword  | N   | null &#124; string |        |                       |
| accountsIds   | N   | Collection         |        | Array of account ids  |
| cardsNumbers  | N   | Collection         |        | Array of card numbers |


### FileConfiguration

| Parameter     |  M  | Type               | Length | Description                                |
| ------------- | --- | ------------------ | ------ | ------------------------------------------ |
| headers       | Y   | Collection         |        | Headers array by order, from first to last |
| fileId        | Y   | int                |        |                                            |
| separator     | N   | null &#124; string |        |                                            |
| delimiter     | N   | null &#124; string |        |                                            |
| skipFirstLine | N   | bool               |        | Skips file first line                      |


### CardsCreation

| Parameter        |  M  | Type               | Length | Description                                                           |
| ---------------- | --- | ------------------ | ------ | --------------------------------------------------------------------- |
| type             | N   | null &#124; string |        | v - virtual, p - physical                                             |
| loadFromAccounts | N   | bool               |        | Automatically load money from account to the card attached to account |


### AccountsLoad

| Parameter |  M  | Type               | Length | Description                                  |
| --------- | --- | ------------------ | ------ | -------------------------------------------- |
| amount    | N   | null &#124; int    |        | Amount autoload to created accounts          |
| currency  | N   | null &#124; string | 3      | Amount autoload to created accounts currency |


### FileStatus

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### CsvHistory

| Parameter       |  M  | Type                                                | Length | Description               |
| --------------- | --- | --------------------------------------------------- | ------ | ------------------------- |
| id              | N   | int                                                 |        |                           |
| date            | N   | int                                                 |        | returns timestamp         |
| accountId       | N   | int                                                 |        |                           |
| accountCurrency | N   | [`Currency`](#appendix--type--currency)             |        |                           |
| fileStatus      | N   | [`FileStatus`](#appendix--type--filestatus)         |        |                           |
| currency        | N   | null &#124; [`Currency`](#appendix--type--currency) |        |                           |
| cardsType       | N   | null &#124; string                                  |        | v - virtual, p - physical |
| loadAmount      | N   | null &#124; [`Money`](#appendix--type--money)       |        |                           |
| autoLoadToCard  | N   | bool                                                |        |                           |
| price           | N   | null &#124; [`Money`](#appendix--type--money)       |        |                           |
| linesCount      | N   | int                                                 |        |                           |
| usersCount      | N   | int                                                 |        |                           |
| balanceBefore   | N   | [`Money`](#appendix--type--money)                   |        |                           |
| balanceAfter    | N   | [`Money`](#appendix--type--money)                   |        |                           |
| filePath        | N   | string                                              |        |                           |


### CsvFile

| Parameter   |  M  | Type               | Length | Description |
| ----------- | --- | ------------------ | ------ | ----------- |
| id          | N   | int                |        |             |
| filename    | N   | string             |        |             |
| contentType | N   | null &#124; string |        |             |
| bodyBase64  | N   | string             |        |             |


### ReportsFile

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### TransactionReport

| Parameter   |  M  | Type                                                      | Length | Description                                           |
| ----------- | --- | --------------------------------------------------------- | ------ | ----------------------------------------------------- |
| id          | N   | int                                                       |        |                                                       |
| status      | N   | int                                                       |        | 1 - Pending, 2 - Settled, 3 - Completed, 4 - Rejected |
| dateCreated | N   | int                                                       |        | returns timestamp                                     |
| currency    | N   | [`Currency`](#appendix--type--currency)                   |        |                                                       |
| type        | N   | int                                                       |        | 1 - Account movements, 2 - Card movements             |
| number      | N   | string                                                    |        | Depending by $type, returns account id or card number |
| dateFrom    | N   | int                                                       |        | returns timestamp                                     |
| dateTo      | N   | int                                                       |        | returns timestamp                                     |
| fileType    | N   | string                                                    |        | pdf, xlsx, csv                                        |
| file        | N   | null &#124; [`ReportsFile`](#appendix--type--reportsfile) |        |                                                       |


### TransfersHistoryAccountToAccount

| Parameter          |  M  | Type                                    | Length | Description                                                                       |
| ------------------ | --- | --------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| sendingAccountId   | N   | int                                     |        |                                                                                   |
| receivingAccountId | N   | int &#124; string                       |        | Account or username                                                               |
| amount             | N   | [`Money`](#appendix--type--money)       |        | Money that is sending from current account                                        |
| type               | N   | string                                  |        | Type of the transfer                                                              |
| status             | N   | int                                     |        | 1 - success; 2 - error; 3 - pending; 4 - processing; 5 - canceled; 6 - restricted |
| date               | N   | [`DateTime`](#appendix--type--datetime) |        |                                                                                   |


### TransfersHistoryAccountToBank

| Parameter |  M  | Type                                          | Length | Description                                                                       |
| --------- | --- | --------------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| bankName  | N   | string                                        |        |                                                                                   |
| iban      | N   | string                                        |        | Type of the transfer                                                              |
| amount    | N   | null &#124; [`Money`](#appendix--type--money) |        | Money that is sending from current account                                        |
| type      | N   | string                                        |        | Type of the transfer                                                              |
| status    | N   | int                                           |        | 1 - success; 2 - error; 3 - pending; 4 - processing; 5 - canceled; 6 - restricted |
| date      | N   | [`DateTime`](#appendix--type--datetime)       |        |                                                                                   |


### TransactionHistory

| Parameter         |  M  | Type                                    | Length | Description |
| ----------------- | --- | --------------------------------------- | ------ | ----------- |
| transactionId     | N   | int                                     |        |             |
| dateTime          | N   | [`DateTime`](#appendix--type--datetime) |        |             |
| senderAccountId   | N   | int                                     |        |             |
| receiverAccountId | N   | int                                     |        |             |
| amount            | N   | [`Money`](#appendix--type--money)       |        |             |
| amountTo          | N   | [`Money`](#appendix--type--money)       |        |             |


### Address

| Parameter      |  M  | Type                                  | Length | Description |
| -------------- | --- | ------------------------------------- | ------ | ----------- |
| addressLineOne | Y   | string                                |        |             |
| addressLineTwo | N   | null &#124; string                    |        |             |
| city           | Y   | string                                |        |             |
| state          | N   | null &#124; string                    |        |             |
| postal         | Y   | string                                |        |             |
| country        | Y   | [`Country`](#appendix--type--country) |        |             |


### UserPersonalInfo

| Parameter             |  M  | Type                                              | Length | Description |
| --------------------- | --- | ------------------------------------------------- | ------ | ----------- |
| firstName             | Y   | string                                            | 60     |             |
| middleName            | N   | null &#124; string                                | 60     |             |
| lastName              | Y   | string                                            | 60     |             |
| businessName          | Y   | null &#124; string                                |        |             |
| gender                | Y   | string                                            |        |             |
| dateOfBirth           | Y   | string                                            |        |             |
| email                 | Y   | string                                            | 100    |             |
| homePhone             | N   | null &#124; string                                | 20     |             |
| mobilePhone           | Y   | string                                            | 20     |             |
| address               | Y   | null &#124; [`Address`](#appendix--type--address) |        |             |
| billingAddress        | N   | null &#124; [`Address`](#appendix--type--address) |        |             |
| useAddressAsBilling   | Y   | bool                                              |        |             |
| subscribedNewsletters | Y   | bool                                              |        |             |


### PhoneValidation

| Parameter                |  M  | Type            | Length | Description |
| ------------------------ | --- | --------------- | ------ | ----------- |
| sent                     | N   | bool            |        |             |
| dateSent                 | N   | null &#124; int |        |             |
| preventResend            | N   | bool            |        |             |
| nextResendAfter          | N   | null &#124; int |        |             |
| blockValidation          | N   | bool            |        |             |
| mobileInvalid            | N   | bool            |        |             |
| mobileValidated          | N   | bool            |        |             |
| mobileCountryBlacklisted | N   | bool            |        |             |


### BusinessSector

| Parameter |  M  | Type   | Length | Description |
| --------- | --- | ------ | ------ | ----------- |
| id        | N   | int    |        |             |
| name      | N   | string |        |             |


### Variable

| Parameter |  M  | Type              | Length | Description               |
| --------- | --- | ----------------- | ------ | ------------------------- |
| name      | N   | string            |        |                           |
| type      | N   | int               |        | 0 - integer,1 - character |
| value     | N   | int &#124; string |        |                           |

## Example

### Login and get all accounts requests

```php
$loginResponse = request(
    'https://%fapiDomain%/%fapiPath%/user/login',
    [
        'username' => 'testUsername',
        'password' => 'testUserPassword',
        'userIp' => '127.0.0.1',
    ]
);

$token = $loginResponse['data']['user']['token'];

$getAccountsResponse = request(
    'https://%fapiDomain%/%fapiPath%/account/get-all',
    [],
    $token
);

function request(string $uri, array $params, $token = null): array
{
    $paramsJson = json_encode($params);
    $ch = curl_init($uri);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $paramsJson);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $headers = [
        'Content-Type: application/json',
        'Content-Length: '.strlen($paramsJson),
        'Api-Key: upaycard',
    ];
    if (!empty($token)) {
        $timestamp = time();
        $headers[] = 'Api-Token: '.$token;
        $headers[] = 'Timestamp: '.$timestamp;
        $headers[] = 'Signature: '.base64_encode(json_encode($params).$token.$timestamp);
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $responseArray = json_decode(curl_exec($ch), true);
    curl_close($ch);

    return $responseArray;
}
```

### Sign generation

Sign of request.

Example in PHP:

```php
function generateSignHeaderValue(array $params, string $apiToken, int $timestampFromHeader): string
{
    return base64_encode(json_encode($params).$apiToken.$timestampFromHeader);
}
```

### S3D submit form

```html
    <script type="text/javascript">
        window.onload = function(e){
            document.getElementById("myForm").submit();
        }
    </script>

    <div style="display: none;">
        <form id="myForm" action="http://bank-url" method="post">
            <input type="text" name="MD" value="15633665670206" />
            <input type="text" name="PaReq" value="dGJpbWhybWM1WXA3ZytXK3ZuR3BvTGgycXBxVXNkYmRwNXA2emJqQlluK0pjSzYzZHBoNXNKS0ZxcDYxbkhmU21IV3V6Y2ZXdnM2Um5uSHJtcEtzbDl6TWo5ckN4NU9mcXN5SFpNVEtqcWFaNEwyK3kzOThiY1BXdXRpM29xK3NrYXlJdmNHamdxN2FtSTJvZ2JXOXA2VzlwcmFaanBtVm1MVEVyTFNOb3RhL3lIT0dvN0c3MllsMzBNM1ltNWl1MG1hL25LM0V5cDZZaHArWnNhSmliSXhndTdxUXdxVEFyWWFkaGEvQ2Q5S1JjS0hLcmF5VHZuMmVhT2Via3IyVXlOeDV0N0cycEoyZ29vS1p0TFdCZEkvZ2lyTE1qM1c0eTlYYzJiZkdyblY0NVkzTHdiaUd5ZEtyblcrSnRKaHJqcExBZnBlbGk2eVMxck9kcEoyTnlhNjBmNzJnaUsvR2dIYnV4TmRoc3EyNGVwNmJyY1N6cDVhdmdkeTZuNHlx" />
            <input type="text" name="TermUrl" value="http://return-url" />
            <input type="submit" value="Submit S3D" />
        </form>
    </div>
```
