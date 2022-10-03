<!--
  @TODO
   
   # Introduction
  
   ## Using documentation
   
   TODO
   
   ## API
   
   TODO
   
   ### Overview        
   
   TODO
   
   ### Common workflows
   
   TODO
-->

# Introduction
## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

# Actions

[`Action request headers`](#appendix--security--authentication--action) are required to be sent as part of every request to the BankBox API, so please make sure to set up them correctly before doing API calls.

## Bank account

### Get balances

| URL                                                             | Method   |
|:----------------------------------------------------------------|:---------|
| /api/v1/bank-account/balances                                   | GET      |

#### Response

| Parameter                       | Type                                                        | Length | Required  | Description                           |
|:--------------------------------|:------------------------------------------------------------|:-------|:----------|:--------------------------------------|
| name                            | string                                                      | 100    | Yes       | Bank account name.                    |
| balances                        | [`BankAccountBalance`](#appendix--type--bankaccountbalance) |        | Yes       | List of account balances.             |

```json
{
  "status": "success",
  "requestId": "638793003612134741",
  "data": {
    "name": "John Joe bank account",
    "balances": [
      {
        "amount": 456789,
        "currency": "826"
      },
      {
        "amount": 133548,
        "currency": "978"
      }
    ]
  }
}
```

## Bank account address

### Create

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/create                             | POST        |

#### Request

| Parameter        | Type                                                      | Length | Required | Description                                                                                                                      |
|:-----------------|:----------------------------------------------------------|:-------|:---------|:---------------------------------------------------------------------------------------------------------------------------------|
| holder           | [`BankAccountHolder`](#appendix--type--bankaccountholder) |        | Yes      | Information about bank account holder.                                                                                           |
| type             | string &#124; null                                        | 255    | No       | [`BankAccountAddressType`](#appendix--enum--bank-account-address--types) (used for some bank providers)                          |
| currency         | string &#124; null                                        | 3      | No       | Currency ISO number. Depends on bank provider.                                                                                   |
| accountName      | string &#124; null                                        | 70     | No       | Account name.                                                                                                                    |
| requestReference | string &#124; null                                        | 255    | No       | Request reference.                                                                                                               |
| relationshipType | string &#124; null                                        | 255    | No       | [`BankAccountAddressRelationshipType`](#appendix--enum--bank-account-address--relationship-types) (used for some bank providers) |

```json
{
  "holder": {
    "title": "Mr",
    "firstName": "John",
    "lastName": "Smith",
    "addressLineOne": "Bridge St",
    "postalCode": "SW1A 2PW",
    "city": "Westminster",
    "state": "London",
    "country": "826",
    "phone": "142544544"
  },
  "currency": "826",
  "requestReference": "123456789",
  "relationshipType": "Single"
}
```

#### Response
##### Success

| Parameter | Type                                                        | Required  | Description                                                  |
|:----------|:------------------------------------------------------------|:----------|:-------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about successfully created bank account address. |

```json
{
  "status": "success",
  "requestId": "638793003612134741",
  "data": {
    "id": "639571884443647291",
    "accountNumber": "78572458",
    "accountName": "John Smith",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": true,
    "outboundEnabled": true,
    "providerName": "CENTROLINK",
    "requestReference": "123456789"
  }
}
```

##### Partial success

| Parameter | Type                                                        | Required | Description                                                                                                                                                                                            |
|:----------|:------------------------------------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes      | Information about the partially created bank account address. Full information will be provided via the [`Bank account address - created`](#api-webhooks--bank-account-address--created) notification. |

```json
{
  "status": "success",
  "requestId": "639571884443647291",
  "data": {
    "id": "638793003612134741",
    "accountNumber": null,
    "accountName": "John Smith",
    "iban": null,
    "sortCode": null,
    "bic": null,
    "country": null,
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": false,
    "outboundEnabled": false,
    "providerName": "CENTROLINK",
    "requestReference": "123456789"
  }
}
``` 

### Update

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/update                             | POST        |

#### Request

| Parameter            | Type                                                                              | Length | Required    | Description                                                                                                                      |
|:---------------------|:----------------------------------------------------------------------------------|:-------|:------------|:---------------------------------------------------------------------------------------------------------------------------------|
| bankAccountAddressId | string                                                                            | 20     | Yes         | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`.                                                             |
| type                 | string &#124; null                                                                | 255    | No          | [`BankAccountAddressType`](#appendix--enum--bank-account-address--types) (used for some bank providers)                          |
| holder               | [`BankAccountHolderUpdate`](#appendix--type--bankaccountholderupdate) &#124; null |        | Conditional | Information about bank account holder. Fill in only data which you want to update. Required if `accountName` is null.            |
| accountName          | string &#124; null                                                                | 70     | Conditional | Owner name that will be assigned to the account. Required if `holder` is null.                                                   |
| requestReference     | string &#124; null                                                                | 255    | No          |                                                                                                                                  |
| relationshipType     | string &#124; null                                                                | 255    | No          | [`BankAccountAddressRelationshipType`](#appendix--enum--bank-account-address--relationship-types) (used for some bank providers) |

```json
{
    "bankAccountAddressId": "639571884443647291",
    "accountName": "Johnathan Smith",
    "holder": {
      "firstName": "John",
      "lastName": "Smith",
      "addressLineOne": "Bridge St",
      "postalCode": "SW1A 2PW",
      "city": "Westminster",
      "state": "London",
      "country": "826",
      "phone": "142544544"
    },
    "requestReference": "REQ2201428987468",
    "relationshipType": "Single"
}
```

#### Response
##### Success

| Parameter | Type                                                        | Required  | Description                                                  |
|:----------|:------------------------------------------------------------|:----------|:-------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about successfully created bank account address. |

```json
{
  "status": "success",
  "requestId": "639571884443647291",
  "data": {
    "id": "638793003612134741",
    "ownerName": "Johnathan Smith",
    "accountName": "John Smith",  
    "accountNumber": "78572458",
    "iban": "GB36SRLG04000000000000",
    "bban": null,
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": true,
    "directDebitEnabled": true,
    "inboundEnabled": true,
    "outboundEnabled": true,
    "requestReference": "REQ2201428987468"
  }
}
```

### Create business

| URL                                                             | Method        |
|:----------------------------------------------------------------|:--------------|
| /api/v1/bank-account-address/create-business                    | POST          |

#### Request

| Parameter        | Type                                                        | Length | Required | Description                                                                                             |
|:-----------------|:------------------------------------------------------------|:-------|:---------|:--------------------------------------------------------------------------------------------------------|
| company          | [`BankAccountCompany`](#appendix--type--bankaccountcompany) |        | Yes      | Information about bank account company.                                                                 |
| type             | string &#124; null                                          | 255    | No       | [`BankAccountAddressType`](#appendix--enum--bank-account-address--types) (used for some bank providers) |
| currency         | string &#124; null                                          | 3      | No       | Currency ISO number. Depends on bank provider.                                                          |
| accountName      | string &#124; null                                          | 70     | No       | Account name.                                                                                           |
| requestReference | string &#124; null                                          | 255    | No       | Request reference.                                                                                      |

```json
{
  "company": {
    "name": "Company name",
    "addressLineOne": "Bridge St"
  },
  "currency": "826",
  "requestReference": "123456789"
}
```

#### Response
##### Success

| Parameter | Type                                                        | Required  | Description                                                  |
|:----------|:------------------------------------------------------------|:----------|:-------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about successfully created bank account address. |

```json
{
  "status": "success",
  "requestId": "638793003612134741",
  "data": {
    "id": "639571884443647291",
    "accountNumber": "78572458",
    "accountName": "John Smith",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": true,
    "outboundEnabled": true,
    "providerName": "CENTROLINK",
    "requestReference": "123456789"
  }
}
```

##### Partial success

| Parameter | Type                                                        | Required | Description                                                                                                                                                                                            |
|:----------|:------------------------------------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes      | Information about the partially created bank account address. Full information will be provided via the [`Bank account address - created`](#api-webhooks--bank-account-address--created) notification. |

```json
{
  "status": "success",
  "requestId": "639571884443647291",
  "data": {
    "id": "638793003612134741",
    "accountName": "John Smith",
    "accountNumber": null,
    "iban": null,
    "sortCode": null,
    "bic": null,
    "country": null,
    "inboundEnabled": false,
    "outboundEnabled": false,
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "providerName": "CENTROLINK",
    "requestReference": "123456789"
  }
}
``` 

### Update business

| URL                                                             | Method        |
|:----------------------------------------------------------------|:--------------|
| /api/v1/bank-account-address/update-business                    | POST          |

#### Request

| Parameter            | Type                                                                                | Length | Required     | Description                                                                                                           |
|:---------------------|:------------------------------------------------------------------------------------|:-------|:-------------|:----------------------------------------------------------------------------------------------------------------------|
| bankAccountAddressId | string                                                                              | 20     | Yes          | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`.                                                  |
| type                 | string &#124; null                                                                  | 255    | No           | [`BankAccountAddressType`](#appendix--enum--bank-account-address--types) (used for some bank providers)               |
| company              | [`BankAccountCompanyUpdate`](#appendix--type--bankaccountcompanyupdate) &#124; null |        | Conditional  | Information about bank account company. Fill in data only which you want to update. Required if `accountName` is null |
| accountName          | string &#124; null                                                                  | 70     | Conditional  | Owner name that will be assigned to the account. Required if `company` is null                                        |
| requestReference     | string &#124; null                                                                  | 255    | No           |                                                                                                                       |


```json
{
  "bankAccountAddressId": "638793003612134741",
  "accountName": "Company Name Inc.",
  "company": {
    "name": "Company name",
    "addressLineOne": "Bridge St"
  },
  "requestReference": "REQ125201471265"
}
```

#### Response
##### Success

| Parameter | Type                                                        | Required  | Description                                                  |
|:----------|:------------------------------------------------------------|:----------|:-------------------------------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about successfully created bank account address. |

```json
{
  "status": "success",
  "requestId": "639571884443647291",
  "data": {
    "id": "638793003612134741",
    "accountName": "Company Name Inc.",
    "accountNumber": "78572458",
    "iban": "GB36SRLG04000000000000",
    "bban": null,
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": true,
    "directDebitEnabled": true,
    "inboundEnabled": true,
    "outboundEnabled": true,
    "requestReference": "REQ125201471265"
  }
}
```


### Get details

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/get                                | POST        |

#### Request

| Parameter            | Type               | Length | Required    | Description                                                                                                        |
|:---------------------|:-------------------|:-------|:------------|:-------------------------------------------------------------------------------------------------------------------|
| bankAccountAddressId | string &#124; null | 20     | Conditional | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`. Required if RequestReference is not provided. |
| requestReference     | string &#124; null | 255    | Conditional | Required if BankAccountAddressId is not provided                                                                   |                                            

```json
{
  "bankAccountAddressId": "639571884443647291",
  "requestReference": "AZ123456789"
}
```

#### Response

| Parameter | Type                                                        | Required  | Description                            |
|:----------|:------------------------------------------------------------|:----------|:---------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about bank account address.|

```json
{
  "status": "success",
  "requestId": "639571884443647291",
  "data": {
    "id": "639568863582037961",
    "accountNumber": "80912570",
    "accountName": "John Smith",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": false,
    "outboundEnabled": false,
    "providerName": "CENTROLINK",
    "requestReference": "123456789"
  }
}
```

### Set automated payment status

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/automated-payment-status           | POST        |

#### Request

| Parameter                         | Type   | Length | Required  | Description                                                                           |
|:----------------------------------|:-------|:-------|:----------|:--------------------------------------------------------------------------------------|
| bankAccountAddressId              | string | 20     | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`.                  |
| directCreditEnabled               | bool   | 5      | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`directCreditEnabled`. |
| directDebitEnabled                | bool   | 5      | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`directDebitEnabled`.  |

```json
{
  "bankAccountAddressId": "639568863582037961",
  "directCreditEnabled": false,
  "directDebitEnabled": false
}
```

#### Response

| Parameter | Type                                                        | Required  | Description                            |
|:----------|:------------------------------------------------------------|:----------|:---------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about bank account address.|

```json
{
  "status": "success",
  "requestId": "639568863582037961",
  "data": {
    "id": "639569072513332701",
    "accountNumber": "80912570",
    "accountName": "John Smith",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": false,
    "outboundEnabled": false
  }
}
```

### Set payment status

This API call is valid only for specific providers.

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/payment-status                     | POST        |

#### Request

| Parameter                         | Type   | Length | Required  | Description                                                                      |
|:----------------------------------|:-------|:-------|:----------|:---------------------------------------------------------------------------------|
| bankAccountAddressId              | string | 20     | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`.             |
| inboundEnabled                    | bool   | 5      | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`inboundEnabled`. |
| outboundEnabled                   | bool   | 5      | Yes       | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`inboundEnabled`. |

```json
{
  "bankAccountAddressId": "639569072513332701",
  "inboundEnabled": false,
  "outboundEnabled": false
}
```

#### Response

| Parameter | Type                                                        | Required  | Description                            |
|:----------|:------------------------------------------------------------|:----------|:---------------------------------------|
| data      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) | Yes       | Information about bank account address.|

```json
{
  "status": "success",
  "requestId": "639569072513332701",
  "data": {
    "id": "639568863582037961",
    "accountNumber": "80912570",
    "accountName": "John Smith",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX",
    "country": "826",
    "directCreditEnabled": false,
    "directDebitEnabled": false,
    "inboundEnabled": false,
    "outboundEnabled": false
  }
}
```

### Verify the exact name registered with the payee’s account

| URL                                            | Method      |
|:-----------------------------------------------|:------------|
| /api/v1/bank-account-address/verify-payee-name | POST        |

#### Request

| Parameter        | Type               | Length | Required | Description                                                                                                                                |
|:-----------------|:-------------------|:-------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| sortCode         | string &#124; null | 6      | No       | Payee's sort code. Must be provided if iban is null.                                                                                       |
| accountNumber    | string &#124; null | 8      | No       | Payee's account number. Must be provided if iban is null.                                                                                  |
| iban             | string &#124; null | 34     | No       | Payee's iban. Must be provided if sortCode or accountNumber is null.                                                                       |
| legalOwnerType   | string             | 8      | Yes      | [`LegalOwnerType`](#appendix--enum--bank-account-address--legal-owner-types)                                                               |
| accountName      | string             | 140    | Yes      | Owner name of the bank account address.                                                                                                    |
| requestReference | string &#124; null | 140    | No       | A unique value which can be used to identify the request and then used in any subsequent payment initiations to link them to this request. |

```json
{
    "sortCode": "040404",
    "accountNumber": "12345678",
    "legalOwnerType": "PERSONAL",
    "accountName": "John Smith"
}
```

#### Response

| Parameter          | Type                                                                | Required  | Description              |
|:-------------------|:--------------------------------------------------------------------|:----------|:-------------------------|
| verificationReport | [`NameVerificationReport`](#appendix--type--nameverificationreport) | Yes       | Name verification report |

```json
{
  "status": "success",
  "requestId": 162,
  "data": {
      "verificationReport": {
          "matched": true,
          "matchedBank": "Barclays"
      }
  }
}
```

### Opt in/out of Confirmation of Payee service

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-account-address/confirmation-of-payee              | POST        |

#### Request

| Parameter            | Type               | Length | Required | Description                                                          |
|:---------------------|:-------------------|:-------|:---------|:---------------------------------------------------------------------|
| bankAccountAddressId | string             | 20     | Yes      | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`. |
| optOut               | bool               | 5      | Yes      | Whether to opt out or opt in to confirmation of payee service        |
| optOutReason         | string &#124; null | 200    | No       | Reason of the change. Mandatory when optOut = true                   |

```json
{
    "bankAccountAddressId": 2,
    "optOut": true,
    "optOutReason": "Irrelevant for this account"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": 162,
  "data": []
}
```

### Close account address

| URL                                     | Method      |
|:----------------------------------------|:------------|
| /api/v1/bank-account-address/{id}/close | POST        |

#### Request

| Parameter    | Type               | Length | Required | Description                                                          |
|:-------------|:-------------------|:-------|:---------|:---------------------------------------------------------------------|
| id           | string             | 20     | Yes      | [`BankAccountAddress`](#appendix--type--bankaccountaddress)*->*`id`. |

#### Response

```json
{
  "status": "success",
  "requestId": 162,
  "data": []
}
```

## Direct debit

### Bank account address

#### Create mandate

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/create-bank-account-address-mandate             | POST   |

##### Request

| Parameter                    | Type                                                                                                      | Length | Required | Description                                                               |
|:-----------------------------|:----------------------------------------------------------------------------------------------------------|:-------|:---------|:--------------------------------------------------------------------------|
| bankAccountAddressId         | string                                                                                                    | 20     | Yes      | Bank account address identifier to which the mandate will be assigned to. |
| serviceUserNumber            | string                                                                                                    | 6      | Yes      | Service user number of the mandate                                        |
| reference                    | string                                                                                                    | 255    | Yes      | Mandate reference                                                         |
| requestReference             | string &#124; null                                                                                        | 255    | No       | Request reference to track mandate creation                               |
| payerName                    | string &#124; null                                                                                        | 255    | No       | Name of the payer                                                         |
| originatorBankAccountAddress | [`CreateMandateOriginatorBankAccountAddress`](#appendix--type--createmandateoriginatorbankaccountaddress) |        | Yes      | Originator account                                                        |
| mandateType                  | string                                                                                                    | 255    | Yes      | [`MandateType`](#appendix--enum--mandate--types)                          |

```json
{
  "bankAccountAddressId": "639568863582037961",
  "serviceUserNumber": "111115",
  "reference": "REF312366123666",
  "payerName": "JRJONAS",
  "originatorBankAccountAddress": {
    "iban": null,
    "sortCode": "040000",
    "accountNumber": "00000001"
  },
  "mandateType": "PAPER"
}
```

##### Response
```json
{
  "status": "success",
  "requestId": "639392782598847621",
  "data": []
}
```

#### Amend mandate

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/amend-bank-account-address-mandate              | POST   |

##### Request

| Parameter                         | Type   | Length | Required  | Description                                                                    |
|:----------------------------------|:-------|:-------|:----------|:-------------------------------------------------------------------------------|
| mandateId                         | string | 20     | Yes       | Mandate identifier                                                             |
| reason                            | string | 255    | Yes       | [`Mandate amendment reason`](#appendix--enum--reason--mandateamendmentreasons) |
| payeeBankAccountAddress           | string | 34     | Yes       | IBAN of the payee                                                              |

```json
{
  "mandateId": "639568863582037961",
  "reason": "ACCOUNT_TRANSFERED",
  "payeeBankAccountAddress": "GB61CLRB04047212457831"
}
```

##### Response
```json
{
  "status": "success",
  "requestId": "639569072513332701",
  "data": []
}
```

#### Reject mandate

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/reject-bank-account-address-mandate             | POST   |

##### Request

| Parameter                         | Type   | Length | Required  | Description                                                                    |
|:----------------------------------|:-------|:-------|:----------|:-------------------------------------------------------------------------------|
| mandateId                         | string | 20     | Yes       | Mandate identifier                                                             |
| reason                            | string | 255    | Yes       | [`Mandate rejection reason`](#appendix--enum--reason--mandaterejectionreasons) |

```json
{
  "mandateId": "639485862169702251",
  "reason": "PAYER_DECEASED"
}
```

##### Response
```json
{
  "status": "success",
  "requestId": "639485862169702251",
  "data": []
}
```

#### Cancel mandate

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/cancel-bank-account-address-mandate             | POST   |

##### Request

| Parameter       | Type   | Length | Required  | Description                                                                           |
|:----------------|:-------|:-------|:----------|:--------------------------------------------------------------------------------------|
| mandateId       | string | 20     | Yes       | Mandate identifier                                                                    |
| reason          | string | 255    | Yes       | [`Mandate cancellation reasons`](#appendix--enum--reason--mandatecancellationreasons) |

```json
{
  "mandateId": "639485862169702251",
  "reason": "ACCOUNT_CLOSED"
}
```

##### Response
```json
{
  "status": "success",
  "requestId": "639572538309857621",
  "data": {}
}
```

#### Get mandates

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/get-bank-account-address-mandates               | POST   |

##### Request

| Parameter            | Type                                                  | Length | Required | Description                     |
|:---------------------|:------------------------------------------------------|:-------|:---------|:--------------------------------|
| bankAccountAddressId | string                                                | 20     | Yes      | Bank account address identifier |
| paginator            | [`Paginator`](#appendix--type--paginator) &#124; null |        | No       | Request page information.       |


```json
{
  "bankAccountAddressId": "639572575945337361",
  "paginator": {
    "page": 1,
    "limit": 10
  }
}
```

##### Response
| Parameter                         | Type                                          | Length | Required  | Description               |
|:----------------------------------|:----------------------------------------------|:-------|:----------|:--------------------------|
| paginator                         | [`Paginator`](#appendix--type--paginator)     |        | Yes       | Request page information. |
| mandates                          | [`Mandate[]`](#appendix--type--mandate)       |        | Yes       | Mandates array            |

```json
{
  "status": "success",
  "requestId": "639572597685944701",
  "data": {
    "paginator": {
      "limit": 1,
      "page": 1,
      "pagesCount": 15
    },
    "mandates": [
      {
        "id": "639572610801441151",
        "originator": {
          "id": "639572618975642171",
          "name": "Foo Bar Originator",
          "serviceUserNumber": "171915"
        },
        "status": "ACTIVE",
        "type": "PAPER",
        "reference": "1579012874"
      }
    ]
  }
}
```

### Set upcoming payment status

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/mandate/change-direct-debit-status                      | POST   |

#### Request

| Parameter                         | Type   | Length | Required | Description                                                                |
|:----------------------------------|:-------|:-------|:---------|:---------------------------------------------------------------------------|
| transactionId                     | string | 20     | Yes      |                                                                            |
| shouldPay                         | bool   | 5      | Yes      |                                                                            |
| reason                            | string | 255    | No       | [`ReturnReasons`](#appendix--enum--reason--returnreasons). Default: `OTHER` |

```json
{
  "transactionId": "639572653406139301",
  "shouldPay": false,
  "reason": "ACCOUNT_CLOSED"
}
```

#### Response
##### Success

```json
{
  "status": "success",
  "requestId": "639572669244460521",
  "data": {
    "success": true
  }
}
```

##### Error

```json
{
  "status": "error",
  "requestId": "639572684858681671",
  "errors": [
    {
      "code": 12,
      "message": "Only pending direct debit transaction status can be updated.",
      "propertyPath": null
    }
  ]
}
```

## Payment

### Create outbound

| URL                                                             | Method |
|:----------------------------------------------------------------|:-------|
| /api/v1/bank-transfer/outbound                                  | POST   |

#### Request

| Parameter                       | Type                                                                                                      | Length | Required    | Description                                                                                                                                                                |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------|:-------|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| scheme                          | string &#124; null                                                                                        | 255    | No          | [`Schemes`](#appendix--enum--banktransfer--schemes). Multiple schemes can be provided as fallback schemes (seperated by comma). Supported schemes depend on bank provider. |
| sourceBankAccountAddressId      | string                                                                                                    | 20     | Yes         | [`OutboundTransfer`](#appendix--type--outboundtransfer)*->*`sourceBankAccountAddressId`.                                                                                   |
| destinationBankAccountAddress   | [`BankAccountModel`](#appendix--type--bankaccountmodel)                                                   |        | Yes         |                                                                                                                                                                            |
| currencyAndAmount               | [`CurrencyAndAmount`](#appendix--type--currencyandamount)                                                 |        | Yes         | [`OutboundTransfer`](#appendix--type--outboundtransfer)*->*[`CurrencyAndAmount`](#appendix--type--currencyandamount)                                                       |
| reference                       | string &#124; null                                                                                        | 255    | Conditional | [`OutboundTransfer`](#appendix--type--outboundtransfer)*->*`reference`.   <br> In some cases, it may be required.                                                          |
| requestReference                | string &#124; null                                                                                        | 255    | No          | [`OutboundTransfer`](#appendix--type--outboundtransfer)*->*`requestReference`.                                                                                             |
| ultimateSourceDetails           | [`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata) &#124; null |        | No          |                                                                                                                                                                            |
| destinationDetails              | [`TransferDestinationDetails`](#appendix--type--transferdestinationdetails) &#124; null                   |        | Conditional | Required for some bank providers.                                                                                                                                          |
| ultimateDestinationDetails      | [`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata) &#124; null |        | No          |                                                                                                                                                                            |
| transferChargeCode              | string &#124; null                                                                                        | 3      | No          | Possible values `OUR`, `SHA`                                                                                                                                               |
| destinationFinancialInstitution | [`FinancialInstitutionDetails`](#appendix--type--financialinstitutiondetails)                             |        | Conditional | Required for some bank providers                                                                                                                                           |

```json
{
    "scheme": "SCTI,SCT",
    "sourceBankAccountAddressId": "51",
    "destinationBankAccountAddress": {
        "iban": "GB36SRLG04000000000001",
        "accountName": "John Doe"
    },
    "currencyAndAmount": {
        "currency": "978",
        "minorUnits": 1255
    },
    "reference": "AB78542",
    "destinationDetails": {
        "address": "2412 Hidden Valley Road",
        "postal": "17042",
        "city": "Lebanon",
        "country": null,
        "note": "message for receiver",
        "purpose": null
    },
    "ultimateDestinationDetails": {
        "name": "Money Sender Ultimate Comp.",
        "organizationCode": "MOSEN123456",
        "birthDate": null,
        "birthCity": null,
        "birthCountry": null,
        "privateIdentifier": null,
        "privateIssuer": null,
        "privateCode": null,
        "privateProprietary": null,
        "organization": true
    },
    "transferChargeCode": "OUR"
}
```

#### Response

| Parameter | Type                                            | Required  | Description                            |
|:----------|:------------------------------------------------|:----------|:---------------------------------------|
| data      | [`BankTransfer`](#appendix--type--banktransfer) | Yes       | Information about bank transfer.       |

```json
{
  "status": "success",
  "requestId": "639572813171076301",
  "data": {
    "id": "639572821734885961",
    "settlementAmount": 1255,
    "settlementCurrency": "978",
    "instructedAmount": 1255,
    "instructedCurrency": "978",
    "destinationMandate": null,
    "sourceBankAccountAddress": {
      "id": "639572829048248841",
      "accountName": "John Doe",
      "accountNumber": "98327306",
      "iban": "GB36SRLG04000000000000",
      "sortCode": "040059",
      "bic": "SRXXXXXX",
      "country": "826"
    },
    "destinationBankAccountAddress": {
      "id": "639572835214206571",
      "accountName": "Jane Doe",
      "accountNumber": "21762634",
      "iban": "GB36SRLG04000000000001",
      "sortCode": "040059",
      "bic": "SRXXXXXX",
      "country": "826"
    },
    "requestReference": "12345678",
    "createdAt": "2019-07-10T13:20:28+00:00",
    "type": "SINGLE_IMMEDIATE_PAYMENT",
    "scheme": "SCT"
  }
}
```

### Return inbound

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-transfer/return-inbound                            | POST        |

Endpoint `return-inbound` is an alias for `return-transfer`. For request and response parameters, please navigate to [`return-transfer`](#actions--payment--return-transfer)

### Return transfer

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-transfer/return-transfer                           | POST        |

#### Request

| Parameter                     | Type                                                                                    | Length | Required    | Description                                                                                                                                                                              |
|:------------------------------|:----------------------------------------------------------------------------------------|:-------|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId                 | string                                                                                  | 20     | Yes         | Identifier of the transfer.                                                                                                                                                              |
| requestReference              | string &#124; null                                                                      | 255    | No          |                                                                                                                                                                                          |
| reference                     | string &#124; null                                                                      | 255    | Conditional | Required for specific payment schemes. Some bank providers have specific requirements for this parameter. In case of failure, those requirements will be specified in the error message. |
| reason                        | string &#124; null                                                                      | 255    | Conditional | See [`ReturnReasons`](#appendix--enum--reason--returnreasons)                                                                                                                            |
| destinationBankAccountAddress | [`BankAccountModel`](#appendix--type--bankaccountmodel) &#124; null                     |        | Conditional | Required if transfer does not have sender information                                                                                                                                    |
| destinationDetails            | [`TransferDestinationDetails`](#appendix--type--transferdestinationdetails) &#124; null |        | Conditional | Required if transfer does not have sender information                                                                                                                                    |

```json
{
    "transactionId": "639573015373678711",
    "requestReference": "REQREF123456951F",
    "reference": "AB78542",
    "reason": null,
    "destinationBankAccountAddress": {
      "accountName": "Jane Doe",
      "accountNumber": "71395713",
      "iban": "GB36SRLG04000000000001",
      "sortCode": "555712",
      "bic": null,
      "country": "440"
    },
    "destinationDetails": {
      "address": "2412 Hidden Valley Road",       
      "postal": "17042",
      "city": "Lebanon",
      "country": null,
      "note": "message for receiver",
      "purpose": null
    }
}
```

#### Response

| Parameter | Type                                            | Required  | Description                                                                                                          |
|:----------|:------------------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------|
| data      | [`BankTransfer`](#appendix--type--banktransfer) | No        | Return transfer details (Returns nothing for Direct credit/debit transfers as transaction details are not known yet. |

```json
{
  "status": "success",
  "requestId": "639573050385345351",
  "data": {
    "id": "639573058132060751",
    "settlementAmount": 1255,
    "settlementCurrency": "826",
    "instructedAmount": 1255,
    "instructedCurrency": "826",
    "sourceBankAccountAddress": {
      "id": "639573064956971201",
      "accountNumber": "26304531",
      "iban": null,
      "sortCode": "040059",
      "country": "826",
      "bic": null
    },
    "destinationBankAccountAddress": {
      "id": "639573074491574301",
      "accountNumber": "00004588",
      "iban": null,
      "sortCode": "203002",
      "country": "826",
      "bic": null
    },
    "createdAt": "2019-02-22T13:07:01+00:00"
  }
}
```

### Outbound cancel

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-transfer/outbound-cancel                           | POST        |

##### Request

| Parameter             | Type               | Length | Required    | Description                                                                                               |
|:----------------------|:-------------------|:-------|:------------|:----------------------------------------------------------------------------------------------------------|
| transactionId         | string             | 20     | Yes         | Information about outbound transfer.                                                                      |
| reason                | string             | 255    | Yes         | See [`Outbound cancel reasons`](#appendix--enum--reason--outboundcancelreasons)                           |
| additionalInformation | string &#124; null | 105    | Conditional | See [`Outbound cancel reasons`](#appendix--enum--reason--outboundcancelreasons) which require this field. |
| reasonOriginatorName  | string &#124; null | 70     | Conditional | See [`Outbound cancel reasons`](#appendix--enum--reason--outboundcancelreasons) which require this field. |
| requestReference      | string &#124; null | 255    | No          |                                                                                                           |

```json
{
  "transactionId": "639573118019926591",
  "reason": "TECHNICAL_PROBLEM",
  "additionalInformation": null,
  "reasonOriginatorName": null,
  "requestReference": "123"
}
```

##### Response

```json
{
  "status": "success",
  "requestId": "639573132700457511",
  "data": {
    "requestReference": "123"
  }
}
```

## Transaction instruction

### Inbound cancel
#### Approve

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-transfer/inbound-cancel-approve                    | POST        |

##### Request

| Parameter        | Type               | Length | Required | Description                                             |
|:-----------------|:-------------------|:-------|:---------|:--------------------------------------------------------|
| cancelRequestId  | string             | 20     | Yes      | Information about inbound transfer.                     |
| requestReference | string &#124; null | 255    | No       |                                                         |
| reason           | string &#124; null | 255    | No       | For approve - send only `FOLLOWING_CANCELATION_REQUEST` |

```json
{
  "cancelRequestId": "639573186355924371",
  "reason": "FOLLOWING_CANCELATION_REQUEST"
}
```

##### Response

| Parameter | Type                                                  | Required  | Description                            |
|:----------|:------------------------------------------------------|:----------|:---------------------------------------|
| data      | [`BankTransfer`](#appendix--type--banktransfer)       | Yes       | Information about bank transfer.       |

```json
{
  "status": "success",
  "requestId": "639573260593533051",
  "data": {
    "id": "639573267479749591",
    "settlementAmount": 1255,
    "settlementCurrency": "826",
    "instructedAmount": 1255,
    "instructedCurrency": "826",
    "sourceBankAccountAddress": {
      "id": "639573275378626311",
      "accountNumber": "26304531",
      "iban": null,
      "sortCode": "040059",
      "country": "826",
      "bic": null
    },
    "destinationBankAccountAddress": {
      "id": "639573285998874081",
      "accountNumber": "00004588",
      "iban": null,
      "sortCode": "203002",
      "country": "826",
      "bic": null
    },
    "createdAt": "2019-02-22T13:07:01+00:00"
  }
}
```

#### Decline

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/bank-transfer/inbound-cancel-decline                    | POST        |

##### Request

| Parameter                         | Type   | Length | Required  | Description                                                                                                 |
|:----------------------------------|:-------|:-------|:----------|:------------------------------------------------------------------------------------------------------------|
|  cancelRequestId                  | string | 20     | Yes       | Information about inbound transfer.                                                                         |
|  requestReference                 | string | 18     | No        |                                                                                                             |
|  reason                           | string | 255    | Yes       | See [`Inbound Cancel request decline reasons`](#appendix--enum--reason--inboundcancelrequestdeclinereasons) |

```json
{
  "cancelRequestId": "639576700960755361",
  "reason": "ACCOUNT_CLOSED"
}
```

##### Response

| Parameter | Type                                                                | Required | Description                                |
|:----------|:--------------------------------------------------------------------|:---------|:-------------------------------------------|
| data      | [`TransactionInstruction`](#appendix--type--transactioninstruction) | Yes      | Information about transaction instruction. |

```json
{
  "status": "success",
  "requestId": "639576712547743171",
  "data": {
    "id": "639576720177025611",
    "type": "INBOUND_RESOLUTION_OF_INVESTIGATION",
    "status": "PENDING",
    "reasonCode": "ACCOUNT_CLOSED",
    "createdAt": "2019-10-10T15:11:48+00:00", 
    "requestReference": "A00000000026"
  }
}
```

### Get details

| URL                                                              | Method |
|:-----------------------------------------------------------------|:-------|
| /api/v1/bank-transfer/transaction-instruction/{requestReference} | GET    |

##### Request

| Parameter        | Type   | Length | Required | Description |
|:-----------------|:-------|:-------|:---------|:------------|
| requestReference | string | 255    | Yes      |             |

##### Response

| Parameter | Type                                                                | Required | Description                                |
|:----------|:--------------------------------------------------------------------|:---------|:-------------------------------------------|
| data      | [`TransactionInstruction`](#appendix--type--transactioninstruction) | Yes      | Information about transaction instruction. |

```json
{
  "status": "success",
  "requestId": 170,
  "data": {
    "id": 123,
    "type": "INBOUND_RESOLUTION_OF_INVESTIGATION",
    "status": "PENDING",
    "reasonCode": "ACCOUNT_CLOSED",
    "createdAt": "2019-10-10T15:11:48+00:00", 
    "requestReference": "A00000000026"
  }
}
```

## Transaction

### Bank account address

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/transaction/bank-account-address                        | POST        |

#### Request

| Parameter                   | Type                                                  | Length | Required | Description                                                                                |
|:----------------------------|:------------------------------------------------------|:-------|:---------|:-------------------------------------------------------------------------------------------|
| bankAccountAddressId        | string &#124; null                                    | 20     | No       | Bank account address id                                                                    |
| transactionId               | string &#124; null                                    | 20     | No       | Search for specific transaction by its unique id                                           |
| requestReference            | string &#124; null                                    | 255    | No       | Search tx by request reference of transaction                                              |
| instructionRequestReference | string &#124; null                                    | 255    | No       | Search tx by request reference of instruction                                              |
| direction                   | string &#124; null                                    | 255    | No       | See [`BankTransferDirections`](#appendix--enum--banktransfer--directions). Default: `ALL`. |
| type                        | string &#124; null                                    | 255    | No       | See [`BankTransferTypes`](#appendix--enum--banktransfer--types)                            |
| dateFrom                    | string &#124; null                                    | 19     | No       | From search date                                                                           |
| dateTo                      | string &#124; null                                    | 19     | No       | To search date                                                                             |
| paginator                   | [`Paginator`](#appendix--type--paginator) &#124; null |        | No       | Request page information.                                                                  |

```json
{
  "bankAccountAddressId": "639576765998882671",
  "direction": "ALL",
  "type": "DIRECT_CREDIT_PAYMENT",
  "dateFrom": "2019-04-18 13:34:30",
  "dateTo": "2019-07-11 08:27:19",
  "paginator": {
    "page": 1,
    "limit": 30
  }
}
```

#### Response

| Parameter                         | Type                                               | Required  | Description                            |
|:----------------------------------|:---------------------------------------------------|:----------|:---------------------------------------|
| paginator                         | [`Paginator`](#appendix--type--paginator)          | Yes       | Request page information.              |
| transactions                      | [`BankTransfer`](#appendix--type--banktransfer)    | Yes       | Current page of transfers.             |

```json
{
  "status": "success",
  "requestId": "639577122935473671",
  "data": {
    "paginator": {
      "limit": 30,
      "page": 1,
      "pagesCount": 1
    },
    "transactions": [
      {
        "id": "639577130272727431",
        "settlementAmount": 100,
        "settlementCurrency": "826",
        "instructedAmount": 100,
        "instructedCurrency": "826",
        "sourceMandateOriginator": {
          "id": "639577143219573851",
          "name": "SUSPENSE ",
          "serviceUserNumber": "402927"
        },
        "destinationMandate": null,
        "sourceBankAccountAddress": {
          "id": "639577156150330521",
          "accountName": "John Doe",
          "accountNumber": "62201870",
          "iban": "GB36SRLG04000000000000",
          "sortCode": "040059",
          "bic": "SRXXXXXX",
          "country": "826"
        },
        "destinationBankAccountAddress": {
          "id": "639577162548564791",
          "accountName": "Jane Doe",
          "accountNumber": "71395713",
          "iban": "GB36SRLG04000000000001",
          "sortCode": "555712",
          "bic": null,
          "country": "440"
        },
        "requestReference": 1234567899,
        "reference": "T45785687",
        "transactionIdentifier": "TX123456789",
        "endToEndIdentifier": "12345678910",
        "actualEndToEndIdentifier": "2000000008171482211078677",
        "createdAt": "2019-07-09T07:16:13+00:00",
        "updatedAt": "2019-07-09T07:21:07+00:00",
        "direction": "OUTBOUND",
        "status": "ACCEPTED",
        "returnDetails": null,
        "details": {
          "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04005932936187",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": "COMPANY"
          },
          "ultimateSenderData": {
            "name": "Money Sender Ultimate Comp.",
            "organizationCode": null,
            "birthDate": null,
            "birthCity": null,
            "birthCountry": null,
            "privateIdentifier": null,
            "privateIssuer": null,
            "privateCode": null,
            "privateProprietary": null,
            "organization": false
          },
          "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB79SRLG04005938089896",
            "country": null,
            "addressLineOne": null,
            "addressLineTwo": null,
            "type": null
          },
          "note": "Intern Company note",
          "purpose": "1234"
        },
        "type": "SINGLE_IMMEDIATE_PAYMENT"
      },
      {
        "id": "639577162548564791",
        "settlementAmount": 100,
        "settlementCurrency": "826",
        "instructedAmount": 100,
        "instructedCurrency": "826",
        "destinationMandate": null,
        "sourceBankAccountAddress": {
          "id": "639577156150330521",
          "accountName": "John Doe",
          "accountNumber": "62201870",
          "iban": "GB36SRLG04000000000000",
          "sortCode": "040059",
          "bic": "SRXXXXXX",
          "country": "826"
        },
        "destinationBankAccountAddress": {
          "id": "639577162548564791",
          "accountName": "Jane Doe",
          "accountNumber": "71395713",
          "iban": "GB36SRLG04000000000001",
          "sortCode": "555712",
          "bic": null,
          "country": "440"
        },
        "requestReference": 123456789,
        "transactionIdentifier": "TX123456789",
        "endToEndIdentifier": "12345678910",
        "actualEndToEndIdentifier": "2000000008171482211078687",
        "reference": "T45785687",
        "createdAt": "2019-07-09T07:21:07+00:00",
        "updatedAt": "2019-07-09T07:21:07+00:00",
        "direction": "OUTBOUND",
        "status": "ACCEPTED",
        "returnDetails": null,
        "type": "SINGLE_IMMEDIATE_PAYMENT"
      }
    ]
  }
}
```

## Exchange

### Quote

Returns an expected exchange rate and bought/sold currency amount for provided details.

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/quote                                          | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description                                                                              |
|:---------------------------|:-------|:-------|:-------------|:-----------------------------------------------------------------------------------------|
| sourceBankAccountAddressId | string | 20     | Yes          |                                                                                          |
| goal                       | int    | 20     | Yes          | Goal amount of currency to sell/buy.                                                     |
| goalType                   | string | 4      | Yes          | See [`ExchangeTypes`](#appendix--enum--exchange--types)                                  |
| sourceCurrencyIson         | string | 3      | Yes          |                                                                                          |
| targetCurrencyIson         | string | 3      | Yes          |                                                                                          |

```json
{
  "sourceBankAccountAddressId": "639577269386940961",
  "goal": 500,
  "goalType": "BUY",
  "sourceCurrencyIson": 978,
  "targetCurrencyIson": 826
}
```

#### Response

| Parameter               | Type                                                      | Length | Required     | Description                                                       |
|:------------------------|:----------------------------------------------------------|:-------|:-------------|:------------------------------------------------------------------|
| sourceAmount            | int                                                       | 20     | Yes          |                                                                   |
| targetAmount            | int                                                       | 20     | Yes          |                                                                   |
| sourceCurrencyIson      | string                                                    | 3      | Yes          |                                                                   |
| targetCurrencyIson      | string                                                    | 3      | Yes          |                                                                   |
| exchangeRate            | string                                                    | 255    | Yes          | Expected exchange rate.                                           |
| fees                    | [`ExchangeQuoteFee[]`](#appendix--type--exchangequotefee) |        | Yes          |                                                                   |
| timeStamp               | string                                                    | 19     | Yes          | Exchange rate checked at time.                                    |

```json
{
  "status": "success",
  "requestId": "618395913683063641",
  "data": {
    "sourceAmount": 578,
    "targetAmount": 500,
    "sourceCurrencyIson": "978",
    "targetCurrencyIson": "826",
    "exchangeRate": "0.86805556",
    "fees": [
      {
        "percentage": "0.0020040080160321",
        "amount": 2,
        "currencyIson": "978"
      }
    ],
    "timeStamp": "2021-04-14T10:25:13+00:00"
  }
}
```

### Create

Creates a new currency exchange.

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/create                                         | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description                                                                                |
|:---------------------------|:-------|:-------|:-------------|:-------------------------------------------------------------------------------------------|
| sourceBankAccountAddressId | string | 20     | Yes          |                                                                                            |
| goal                       | int    | 20     | Yes          | Goal amount of currency to sell/buy.                                                       |
| goalType                   | string | 4      | Yes          | See [`ExchangeTypes`](#appendix--enum--exchange--types)                                    |
| sourceCurrencyIson         | string | 3      | Yes          |                                                                                            |
| targetCurrencyIson         | string | 3      | Yes          |                                                                                            |
| requestReference           | string | 255    | Yes          | Required 10-255 symbols                                                                    |
| useAvailableFunds          | bool   | 5      | No           | Default: `true`. If false is provided, allocation has to be done via Allocate API call. |

```json
{
  "sourceBankAccountAddressId": "639577409215513911",
  "goal": 200,
  "goalType": "SELL",
  "sourceCurrencyIson": 978,
  "targetCurrencyIson": 826,
  "requestReference": "A00000000026",
  "useAvailableFunds": true
}
```

#### Response

| Parameter | Type                                    | Length | Required     | Description                                                                              |
|:----------|:----------------------------------------|:-------|:-------------|:-----------------------------------------------------------------------------------------|
| data      | [`Exchange`](#appendix--type--exchange) |        | Yes          |                                                                                          |

```json
{
  "status": "success",
  "requestId": "618559505293462401",
  "data": {
    "id": "639577433469406041",
    "sourceBankAccountAddress": {
      "id": "639577442989891131",
      "ownerName": "John Doe",
      "accountName": "John Doe",
      "accountNumber": "F36462860",
      "country": "826"
    },
    "goalAmount": 500,
    "boughtAmount": 423,
    "soldAmount": 499,
    "sourceCurrency": "978",
    "targetCurrency": "826",
    "requestReference": "A00000000032",
    "transactions": [],
    "goalType": "SELL",
    "status": "PENDING"
  }
}
```

### Allocate

Allocates money for currency exchange, if exchange was created with: `useAvailableFunds = false`

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/allocate                                       | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description  |
|:---------------------------|:-------|:-------|:-------------|:-------------|
| exchangeId                 | string | 20     | Yes          |              |

```json
{
  "exchangeId": "639577759698931901"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": "639577850928202641",
  "data": []
}
```

### Approve

Exchange 4 eye principle - in case exchange is created in GUI, it will need to be approved/rejected in API, or vice versa (if the principle is used).

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/approve                                        | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description  |
|:---------------------------|:-------|:-------|:-------------|:-------------|
| exchangeId                 | string | 20     | Yes          |              |

```json
{
  "exchangeId": "639577759698931901"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": "639577945197327721",
  "data": []
}
```

### Cancel

Straight up cancels the exchange.

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/cancel                                         | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description  |
|:---------------------------|:-------|:-------|:-------------|:-------------|
| exchangeId                 | string | 20     | Yes          |              |

```json
{
  "exchangeId": "639577759698931901"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": "639578078499772681",
  "data": []
}
```

### Reject

Exchange 4 eye principle - in case exchange is created in GUI, it will need to be approved/rejected in API, or vice versa (if the principle is used).

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/exchange/reject                                         | POST        |

#### Request

| Parameter                  | Type   | Length | Required     | Description  |
|:---------------------------|:-------|:-------|:-------------|:-------------|
| exchangeId                 | string | 20     | Yes          |              |

```json
{
  "exchangeId": "639577759698931901"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": "639578245027761621",
  "data": []
}
```

## Webhook

### Resend the latest transfer webhook

| URL                                                             | Method      |
|:----------------------------------------------------------------|:------------|
| /api/v1/webhook/resend-latest-transfer-webhook                  | POST        |

#### Request

| Parameter        | Type               | Length | Required    | Description                                     |
|:-----------------|:-------------------|:-------|:------------|:------------------------------------------------|
| transactionId    | string &#124; null | 20     | Conditional | Required if `requestReference` is not provided. |
| requestReference | string &#124; null | 255    | Conditional | Required if `transactionId` is not provided.    |


```json
{
  "transactionId": null,
  "requestReference": "MyRequestReference"
}
```

#### Response

```json
{
  "status": "success",
  "requestId": "639578317416271391",
  "data": []
}
```


# Webhooks

## Bank account address

### Created

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/bank-account-address-created     | POST        |

#### Request

| Parameter           | Type               | Length | Description                                          |
|:--------------------|:-------------------|:-------|:-----------------------------------------------------|
| id                  | string             | 20     |                                                      |
| accountNumber       | string &#124; null | 26     |                                                      |
| accountName         | string &#124; null | 255    |                                                      |
| iban                | string             | 34     |                                                      |
| sortCode            | string &#124; null | 6      |                                                      |
| bic                 | string             | 12     |                                                      |
| currency            | string &#124; null | 3      | Currency ISO number                                  |
| currencies          | array              |        | Array of supported currencies ISO numbers            |
| directCreditEnabled | bool               | 1      |                                                      |
| directDebitEnabled  | bool               | 1      |                                                      |
| inboundEnabled      | bool               | 1      |                                                      |
| outboundEnabled     | bool               | 1      |                                                      |
| providerName        | string             | 50     | See [`BankProviders`](#appendix--enum--bankprovider) |

##### Example

```json
{
  "id": "639569072513332701",
  "accountName": "John Doe",
  "accountNumber": "46330846",
  "iban": "GB36SRLG04000000000000",
  "sortCode": "040059",
  "bic": "SRXXXXXX",
  "currency": "826",
  "currencies": [],
  "directCreditEnabled": false,
  "directDebitEnabled": false,
  "inboundEnabled": false,
  "outboundEnabled": false,
  "providerName": "CENTROLINK"
}
```

### Status changed

| URL                                                                       | Method      |
|:--------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/bank-account-address-status-change     | POST        |

#### Request

| Parameter                         | Type   | Length | Description                            |
|:----------------------------------|:-------|:-------|:---------------------------------------|
| bankAccountAddressId              | string | 20     |                                        |
| inboundEnabled                    | bool   | 1      |                                        |
| outboundEnabled                   | bool   | 1      |                                        |
| closed                            | bool   | 1      |                                        |

##### Example

```json
{
  "bankAccountAddressId": "639578317416271391",
  "inboundEnabled": false,
  "outboundEnabled": true,
  "directCreditEnabled": true,
  "directDebitEnabled": true,
  "closed": false
}
```

### Details changed

| URL                                                                       | Method      |
|:--------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/bank-account-address-details-changed   | POST        |

#### Request

| Parameter            | Type                | Length | Description                                                                                       |
|:---------------------|:--------------------|:-------|:--------------------------------------------------------------------------------------------------|
| bankAccountAddressId | string              | 20     |                                                                                                   |
| accountName          | string              | 255    |                                                                                                   |
| requestReference     | string  &#124; null | 255    |                                                                                                   |
| relationshipType     | string  &#124; null | 255    | [`BankAccountAddressRelationshipType`](#appendix--enum--bank-account-address--relationship-types) |

##### Example

```json
{  
   "bankAccountAddressId": "639578317416271391",
   "accountName": "John Doe",
   "requestReference": "REQ52423699857"
}
```

## Direct credit

### Received

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-credit-received           | POST        |

#### Request

| Parameter                      | Type                                                                  | Length | Description                                                           |
|:-------------------------------|:----------------------------------------------------------------------|:-------|:----------------------------------------------------------------------|
| id                             | string                                                                | 20     |                                                                       |
| settlementAmount               | int                                                                   | 20     |                                                                       |
| settlementCurrency             | string                                                                | 3      | Currency ISO number.                                                        |
| status                         | string                                                                | 255    | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses) |
| scheme                         | string                                                                | 255    | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes)   |
| sourceMandateOriginator        | [`MandateOriginator`](#appendix--type--mandateoriginator) &#124; null | -      |                                                                       |
| destinationBankAccountAddress  | [`BankAccountAddress`](#appendix--type--bankaccountaddress)           | -      |                                                                       |
| reference                      | string                                                                | 255    | Optional                                                              |
| endToEndIdentifier             | string                                                                | 255    |                                                                       |
| actualEndToEndIdentifier       | string                                                                | 255    |                                                                       |
| transactionIdentifier          | string                                                                | 255    | Optional                                                              |

##### Example

```json
{
  "id": "639569072513332701",
  "settlementAmount": 131200,
  "settlementCurrency": "826",
  "sourceMandateOriginator": {
    "id": "639578317416271391",
    "name": "OEHWqHFRFMqvVkFGBf",
    "serviceUserNumber": "336722"
  },
  "destinationBankAccountAddress": {
    "id": "639578420577309181",
    "accountName": "John Doe",
    "accountNumber": "46330846",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "bic": "SRXXXXXX"
  },
  "reference": "REF2521451",
  "scheme": "FPS",
  "status": "ACCEPTED",
  "endToEndIdentifier": "12345678910",
  "actualEndToEndIdentifier": "2000000008171482211078687",
  "transactionIdentifier": "TX123456789"
}
```

### Paid

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-credit-paid               | POST        |

#### Request

| Parameter                     | Type                                            | Description |
|:------------------------------|:------------------------------------------------|:------------|
| updatedAt                     | datetime                                        |             |
| settledThroughSuspenseAccount | bool                                            |             |
| transaction                   | [`BankTransfer`](#appendix--type--banktransfer) |             |

##### Example

```json
{
  "updatedAt": "2020-07-03T08:10:04+00:00",
  "settledThroughSuspenseAccount": false,
  "transaction": {
    "id": "639578584567508031",
    "settlementAmount": 555,
    "settlementCurrency": "826",
    "instructedAmount": 555,
    "instructedCurrency": "826",
    "sourceMandateOriginator": {
      "id": "639578592375924261",
      "name": "JOHN DOE",
      "serviceUserNumber": "758170"
    },
    "sourceBankAccountAddress": {
      "id": "639578600357859181",
      "ownerName": "John Doe",
      "accountName": "John Doe",
      "iban": "GB36SRLG04000000000000",
      "bban": "SRLG04000000000000",
      "country": "826"
    },
    "destinationBankAccountAddress": {
      "id": "639578614027702301",
      "ownerName": "Jane Doe",
      "accountName": "Jane Doe",
      "accountNumber": "00003525",
      "iban": "GB36XXXX00000000000000",
      "sortCode": "000000",
      "bic": "XXXXGB22",
      "country": "826"
    },
    "details": {
      "note": "CRED RUN",
      "senderData": {
        "name": "COUNTRYSIDE ALLIAN",
        "iban": null,
        "bban": "SRLG04000000000000",
        "bic": null,
        "country": null,
        "addressLineOne": null,
        "addressLineTwo": null,
        "type": null
      },
      "ultimateSenderData": {
        "name": "Money Sender Ultimate Comp.",
        "organizationCode": null,
        "birthDate": null,
        "birthCity": null,
        "birthCountry": null,
        "privateIdentifier": null,
        "privateIssuer": null,
        "privateCode": null,
        "privateProprietary": null,
        "organization": false
      },
      "receiverData": {
        "name": "Jane Doe",
        "iban": "GB36XXXX00000000000000",
        "bban": "XXXX00000000000000",
        "bic": null,
        "country": null,
        "addressLineOne": null,
        "addressLineTwo": null,
        "type": "COMPANY"
      }
    },
    "createdAt": "2020-07-03T08:09:59+00:00",
    "direction": "INBOUND",
    "status": "ACCEPTED",
    "type": "DIRECT_CREDIT_PAYMENT",
    "scheme": "BACS"
  }
}
```

## Direct debit

### Due

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-due                 | POST        |

#### Request

| Parameter                         | Type                                                                | Length | Description                           |
|:----------------------------------|:--------------------------------------------------------------------|:-------|:--------------------------------------|
| dueAt                             | date                                                                | 10     |                                       |
| directDebitTx                     | [`DirectDebitTransaction`](#appendix--type--directdebittransaction) |        |                                       |

##### Example

```json
{
  "dueAt": "2019-03-27",
  "directDebitTx": {
    "id": "639578614027702301",
    "settlementAmount": 12300,
    "settlementCurrency": "826",
    "instructedAmount": 12300,
    "instructedCurrency": "826",
    "destinationMandate": {
      "id": "639578735698577991",
      "originator": {
        "id": "639398896375758151",
        "name": "ANTIQUARIES",
        "serviceUserNumber": "123456"
      },
      "reference": "R0VxdS9Xa1NDa0FSRGUydlVvSUxkQT09",
      "status": "ACTIVE",
      "type": "ORIGINATION"
    },
    "sourceBankAccountAddress": {
      "id": "639578644004318151",
      "accountName": "John Smith",
      "accountNumber": "46330846",
      "iban": "GB36SRLG04000000000000",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
    },
    "details": {
      "debitType": "FIRST"
    },
    "scheme": "SDD",
    "direction": "OUTBOUND",
    "status": "PENDING",
    "type": "DIRECT_DEBIT_PAYMENT",
    "createdAt": "2019-03-27T09:34:01+00:00"
  }
}
```

### Paid

| URL                                                                 | Method        |
|:--------------------------------------------------------------------|:--------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-paid                | POST          |

#### Request

| Parameter                     | Type                                                                | Description |
|:------------------------------|:--------------------------------------------------------------------|:------------|
| directDebitTx                 | [`DirectDebitTransaction`](#appendix--type--directdebittransaction) |             |
| settledThroughSuspenseAccount | bool                                                                |             |

##### Example

```json
{
  "directDebitTx": {
    "id": "639578644004318151",
    "settlementAmount": 12300,
    "settlementCurrency": "826",
    "instructedAmount": 12300,
    "instructedCurrency": "826",
    "destinationMandate": {
      "id": "639578735698577991",
      "originator": {
        "id": "639578751924760611",
        "name": "ANTIQUARIES",
        "serviceUserNumber": "123456"
      },
      "reference": "R0VxdS9Xa1NDa0FSRGUydlVvSUxkQT09",
      "status": "ACTIVE",
      "type": "ORIGINATION"
    },
    "sourceBankAccountAddress": {
      "id": "639578761874483161",
      "accountName": "John Smith",
      "accountNumber": "46330846",
      "iban": "GB36SRLG04000000000000",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
    },
    "details": {
      "debitType": "FIRST"
    },
    "scheme": "SDD",
    "direction": "OUTBOUND",
    "status": "ACCEPTED",
    "type": "DIRECT_DEBIT_PAYMENT",
    "createdAt": "2019-03-27T09:34:01+00:00"
  },
  "settledThroughSuspenseAccount": false
}
```

### Rejected

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-rejected            | POST        |

#### Request

| Parameter                         | Type                                                                      | Description                           |
|:----------------------------------|:--------------------------------------------------------------------------|:--------------------------------------|
| directDebitTx                     | [`DirectDebitTransaction`](#appendix--type--directdebittransaction)       |                                       |

##### Example

```json
{
  "directDebitTx": {
    "id": "639398876269932731",
    "settlementAmount": 12300,
    "settlementCurrency": "826",
    "instructedAmount": 12300,
    "instructedCurrency": "826",
    "destinationMandate": {
      "id": "639398819122273281",
      "originator": {
        "id": "639397667447231721",
        "name": "ANTIQUARIES",
        "serviceUserNumber": "123456"
      },
      "reference": "R0VxdS9Xa1NDa0FSRGUydlVvSUxkQT09",
      "status": "ACTIVE",
      "type": "ORIGINATION"
    },
    "sourceBankAccountAddress": {
      "id": "639393218503351411",
      "accountName": "John Smith",
      "accountNumber": "46330846",
      "iban": "GB36SRLG04000000000000",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
    },
    "details": {
      "debitType": "FIRST"
    },
    "scheme": "SDD",
    "direction": "OUTBOUND",
    "status": "REJECTED",
    "type": "DIRECT_DEBIT_PAYMENT",
    "createdAt": "2019-03-27T09:34:01+00:00"
  }
}
```

## Direct debit mandate

### Canceled

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-canceled    | POST        |

#### Request

| Parameter                         | Type                                  | Length | Description                                                     |
|:----------------------------------|:--------------------------------------|:-------|:----------------------------------------------------------------|
| mandateId                         | string                                | 20     | Mandate identifier that points to the mandate that got Canceled |
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                                    |
| requestReference                  | string                                | 255    | Request reference                                               |
| canceledAt                        | datetime                              | 25     | Date and time on when the mandate was Canceled                  |

##### Example

```json
{
  "mandateId": "639391383813558831",
  "mandate": {
    "id": "639387025170579941",
    "originator": {
      "id": "639049396437755001",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "CANCELED",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "canceledAt": "2019-03-27T08:53:53+00:00"
}
```

### Cancelation failed

| URL                                                                           | Method      |
|:------------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-cancelation-failed    | POST        |

#### Request

| Parameter                         | Type                                  | Length | Description                                  |
|:----------------------------------|:--------------------------------------|:-------|:---------------------------------------------|
| mandateId                         | string                                | 20     | Mandate identifier                           |
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                 |
| requestReference                  | string                                | 255    | Request reference                            |
| failedAt                          | datetime                              | 25     | Date and time on when the cancelation failed |

##### Example

```json
{
  "mandateId": "639049358293915371",
  "mandate": {
    "id": "639049253840599651",
    "originator": {
      "id": "639048714573904261",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "ACTIVE",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "failedAt": "2019-03-27T08:53:53+00:00"
}
```

### Return failed

| URL                                                                           | Method      |
|:------------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-return-failed         | POST        |

#### Request

| Parameter                         | Type                                  | Length | Description                             |
|:----------------------------------|:--------------------------------------|:-------|:----------------------------------------|
| mandateId                         | string                                | 20     | Mandate identifier                      |
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                            |
| requestReference                  | string                                | 255    | Request reference                       |
| failedAt                          | datetime                              | 25     | Date and time on when the return failed |

##### Example

```json
{
  "mandateId": "639048713417135071",
  "mandate": {
    "id": "638969636336976881",
    "originator": {
      "id": "638965987216552681",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "ACTIVE",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "failedAt": "2019-03-27T08:53:53+00:00"
}
```

### Activated

| URL                                                                 | Method   |
|:--------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-activated   | POST     |

#### Request

| Parameter                         | Type                                  | Length | Description                                                       |
|:----------------------------------|:--------------------------------------|:-------|:------------------------------------------------------------------|
| mandateId                         | string                                | 20     | Mandate identifier that points to the mandate that got Activated. | 
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                                      |
| requestReference                  | string                                | 255    | Request reference                                                 |
| activatedAt                       | datetime                              | 25     | Date and time on when the mandate was Activated.                  | 

##### Example

```json
{
  "mandateId": "638965757816681361",
  "mandate": {
    "id": "638965616225378271",
    "originator": {
      "id": "638965475672473811",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "ACTIVE",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "activatedAt": "2019-03-27T08:53:53+00:00"
}
```

### Activation failed

| URL                                                                       | Method   |
|:--------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-activation-failed | POST     |

#### Request

| Parameter                         | Type                                  | Length | Description                                                           |
|:----------------------------------|:--------------------------------------|:-------|:----------------------------------------------------------------------|
| mandateId                         | string                                | 20     | Mandate identifier that points to the mandate that Activation Failed. | 
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                                          |
| requestReference                  | string                                | 255    | Request reference                                                     |
| failedAt                          | datetime                              | 25     | Date and time on when the mandate was Activation Failed.              | 

##### Example

```json
{
  "mandateId": "638965453554237871",
  "mandate": {
    "id": "638958431115112921",
    "originator": {
      "id": "638957790702925341",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "PENDING",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "failedAt": "2019-03-27T08:53:53+00:00"
}
```

### Migrated

| URL                                                                 | Method    |
|:--------------------------------------------------------------------|:----------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-migrated    | POST      |

#### Request

| Parameter                         | Type                                  | Length | Description                                      |
|:----------------------------------|:--------------------------------------|:-------|:-------------------------------------------------|
| mandateId                         | string                                | 20     | Identifier to find the migrated mandate          |
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                     |
| requestReference                  | string                                | 255    | Request reference                                |
| oldType                           | string                                | 255    | [`MandateType`](#appendix--enum--mandate--types) |    
| newType                           | string                                | 255    | [`MandateType`](#appendix--enum--mandate--types) |
| migratedAt                        | datetime                              | 25     | Date and time of mandate migration               |

##### Example

```json
{
  "mandateId": "639646433848251020",
  "mandate": {
    "id": "639646433848253090",
    "originator": {
      "id": "639646433848232270",
      "name": "Originator",
      "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
    },
    "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
    "status": "ACTIVE",
    "type": "ORIGINATION"
  },
  "requestReference": "MDU123456789",
  "oldType": "PAPER",
  "newType": "MIGRATED",
  "migratedAt": "2019-03-27T08:53:53+00:00"
}
```
### Finished

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-finished    | POST        |

#### Request

| Parameter                         | Type                                  | Length | Description                                                     |
|:----------------------------------|:--------------------------------------|:-------|:----------------------------------------------------------------|
| mandateId                         | string                                | 11     | Mandate identifier that points to the mandate that got Finished |
| mandate                           | [`Mandate`](#appendix--type--mandate) |        | Mandate data                                                    |
| requestReference                  | string                                | 255    | Request reference                                               |
| finishedAt                        | datetime                              | 25     | Date and time on when the mandate was Finished                  |

##### Example

```json
{  
   "mandateId": "639646433848386850",
   "mandate": {
      "id": "639646433848499590",
      "originator": {
         "id": "639646433848426450",
         "name": "Originator",
         "serviceUserNumber": "423d1518-09cd-48cd-aeaa-fc532468b957"
      },
      "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
      "status": "FINISHED",
      "type": "ORIGINATION"
   },
   "requestReference": "MDU123456789",
   "finishedAt": "2019-03-27T08:53:53+00:00"
}
```

### Created

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-created     | POST        |

#### Request

| Parameter                    | Type                                                                                     | Length | Description                                                         |
|:-----------------------------|:-----------------------------------------------------------------------------------------|:-------|:--------------------------------------------------------------------|
| mandateId                    | string                                                                                   | 11     | Newly created mandate identifier                                    |
| type                         | [`MandateType`](#appendix--enum--mandate--types)                                         |        |                                                                     |           
| status                       | [`MandateStatus`](#appendix--enum--mandate--statuses)                                    |        |                                                                     |
| errorReason                  | [`MandateRejectionReason`](#appendix--enum--reason--mandaterejectionreasons) &#124; null |        | Provided when `MandateStatus` is `ERROR`                            |                                       
| bankAccountAddressId         | string                                                                                   | 11     | Bank account address identifier to which the mandate is assigned to |
| originator                   | [`MandateOriginator`](#appendix--type--mandateoriginator)                                |        | Mandate originator details                                          |
| originatorBankAccountAddress | [`MandateOriginatorBankAccountAddress`](#appendix--type--bankaccountaddress)             |        | Mandate originator account details                                  |
| reference                    | string                                                                                   | 35     | Mandate reference                                                   |
| requestReference             | string                                                                                   | 255    | Request reference                                                   |
| createdAt                    | datetime                                                                                 | 25     | Mandate creation date                                               |

##### Example

```json
{  
    "mandateId": "639646433848515440",
    "type": "PAPER",
    "status": "PENDING",
    "bankAccountAddressId": "639646433848640450",
    "originator": {
        "id": "639646433848678000",
        "name": "Jane Doe",
        "serviceUserNumber": "123456"
    },
    "originatorBankAccountAddress": {
        "id": "639646433848616300",
        "ownerName": "Jane Doe",
        "accountName": "Jane Doe",
        "accountNumber": "00001582",
        "sortCode": "041334",
        "country": "826"
    },
    "reference": "AB78542",
    "requestReference": "MDU123456789",
    "createdAt": "2019-03-27T08:53:53+00:00"
}
```

### Originator changed

| URL                                                                         | Method      |
|:----------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/direct-debit-mandate-originator-changed  | POST        |

#### Request

| Parameter                         | Type                                                      | Length | Description       |
|:----------------------------------|:----------------------------------------------------------|:-------|:------------------|
| mandateId                         | string                                                    | 20     |                   |
| mandate                           | [`Mandate`](#appendix--type--mandate)                     |        | Mandate data      |
| requestReference                  | string                                                    | 255    | Request reference |
| oldOriginator                     | [`MandateOriginator`](#appendix--type--mandateoriginator) |        |                   |
| newOriginator                     | [`MandateOriginator`](#appendix--type--mandateoriginator) |        |                   |

##### Example

```json
{  
   "mandateId": "639646433848719320",
   "mandate": {
      "id": "639646433848749550",
      "originator": {
         "id": "639646433848722980",
         "name": "Jane Doe",
         "serviceUserNumber": "123466"
      },
      "reference": "NFlndGR1R2pNOXlXSk1yL2NRajhnQT09",
      "status": "ACTIVE",
      "type": "ORIGINATION"
   },
   "requestReference": "MDU123456789",
   "oldOriginator": {  
      "id": "639646433848849340",
      "name": "ANTIQUARIES",
      "serviceUserNumber": "123456"
   },
   "newOriginator": {  
      "id": "639646433848860530",
      "name": "Jane Doe",
      "serviceUserNumber": "123466"
   }
}
```

## Payment
### Inbound
#### Held

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-inbound-held         | POST        |

##### Request

| Parameter                         | Type                                            | Length | Description |
|:----------------------------------|:------------------------------------------------|:-------|:------------|
| inboundTransactionId              | string                                          | 20     |             |
| updatedAt                         | datetime                                        | 25     |             |
| transaction                       | [`BankTransfer`](#appendix--type--banktransfer) |        |             |

###### Example

```json
{
    "inboundTransactionId": "639646433848940310",
    "updatedAt": "2019-03-08T08:45:07+00:00",
    "transaction": { 
        "id": "639646433848914090",
        "settlementAmount": 1255,
        "settlementCurrency": "826",
        "instructedAmount": 1255,
        "instructedCurrency": "826",
        "sourceBankAccountAddress": {  
            "id": "639646433848998010",
            "iban": "GB36SRLG04000000000000",
            "accountName": "Not provided",
            "accountNumber": "32936187",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "destinationBankAccountAddress": {  
            "id": "639646433849077860",
            "iban": "GB36SRLG04000000000001",
            "ownerName": "John Doe",
            "accountName": "John Doe",
            "accountNumber": "38089896",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "details": {
          "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04000000000000",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": null
          },
          "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB36SRLG04000000000001",
            "country": null,
            "addressLineOne": null,
            "addressLineTwo": null,
            "type": "COMPANY"
          },
          "note": "Intern Company note",
          "purpose": "1234"
        },
        "reference": "AB12345",
        "createdAt": "2019-03-08T08:43:07+00:00",
        "type": "SINGLE_IMMEDIATE_PAYMENT",
        "scheme": "SCT"
    }
}
```


#### Received

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-inbound-received     | POST        |

##### Request

| Parameter                     | Type                                                                    | Length | Description                                                                |
|:------------------------------|:------------------------------------------------------------------------|:-------|:---------------------------------------------------------------------------|
| id                            | string                                                                  | 20     |                                                                            |
| settlementAmount              | int                                                                     | 20     |                                                                            |
| settlementCurrency            | string                                                                  | 3      | Currency ISO number.                                                             |
| instructedAmount              | int                                                                     | 20     |                                                                            |
| instructedCurrency            | string                                                                  | 3      | Currency ISO number.                                                             |
| exchange                      | int &#124; null                                                         | 20     | Available for Exchange related transactions                                |
| status                        | string                                                                  | 8      | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses)      |
| scheme                        | string                                                                  | 255    | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes)        |
| type                          | string                                                                  | 255    | See [`BankTransferTypes`](#appendix--enum--banktransfer--types)            |
| createdAt                     | datetime                                                                | 25     |                                                                            |
| sourceBankAccountAddress      | [`BankAccountAddress`](#appendix--type--bankaccountaddress) &#124; null |        | Sometimes may be null for imported transactions (depends on bank provider) |
| destinationBankAccountAddress | [`BankAccountAddress`](#appendix--type--bankaccountaddress)             |        |                                                                            |
| reference                     | string&#124; null                                                       | 255    |                                                                            |
| transactionIdentifier         | string&#124; null                                                       | 100    |                                                                            |
| endToEndIdentifier            | string&#124; null                                                       | 100    |                                                                            |
| actualEndToEndIdentifier      | string&#124; null                                                       | 100    |                                                                            |
| details                       | [`TransactionDetails`](#appendix--type--transactiondetails)             |        |                                                                            |

###### Example

```json
{  
   "id": "639569072513332701",
   "settlementAmount": 1255,
   "settlementCurrency": "826",
   "instructedAmount": 1255,
   "instructedCurrency": "826",
   "sourceBankAccountAddress": {  
      "id": "639646433849352480",
      "accountNumber": "32936187",
      "iban": "GB36SRLG04000000000000",
      "bban": "SRLG04005932936187",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
   },
   "destinationBankAccountAddress": {  
      "id": "639646433849343250",
      "accountNumber": "38089896",
      "iban": "GB36SRLG04000000000001",
      "bban": "SRLG04005938089896",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
   },
   "status": "ACCEPTED",
   "scheme": "TRANSFER",
   "type": "SINGLE_IMMEDIATE_PAYMENT",
   "createdAt": "2019-03-08T08:43:07+00:00",
   "reference": "AB78542",
   "details": {
     "senderData": {
       "name": "Money Sender Comp.",
       "iban": "GB36SRLG04000000000000",
       "country": "826",
       "addressLineOne": "67889 ST MARY",
       "addressLineTwo": "London",
       "type": null
     },
     "receiverData": {
       "name": "Money Receiver Comp.",
       "iban": "GB36SRLG04000000000001",
       "country": null,
       "addressLineOne": null,
       "addressLineTwo": null,
       "type": "COMPANY"
     },
     "note": "Intern Company note",
     "purpose": "1234"
   }
}
```

#### Reversed

| URL                                                                 | Method      |
|:--------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-inbound-reversed     | POST        |

##### Request

| Parameter                         | Type   | Length | Description                            |
|:----------------------------------|:-------|:-------|:---------------------------------------|
| reversedTransactionId             | string | 20     |                                        |
| reasonDescription                 | string | 255    |                                        |

###### Example

```json
{  
   "reversedTransactionId": "639578761874483161",
   "reasonDescription": "Request Timed out"
}
```

#### Return created

| URL                                                                    | Method   |
|:-----------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-inbound-return-created  | POST     |

##### Request

| Parameter    | Type                                                                | Description                                |
|:-------------|:--------------------------------------------------------------------|:-------------------------------------------|
|              |[`InboundReturnTransfer`](#appendix--type--inboundreturntransfer)    | Information about inbound return transfer  |

###### Example

```json
{
  "id": "639646433849626180",
  "returnedTransactionId": "639646433849610060",
  "settlementAmount": 10000,
  "settlementCurrency": "978",
  "instructedAmount": 10000,
  "instructedCurrency": "978",
  "sourceBankAccountAddress": {
    "id": "639646433849724180",
    "accountNumber": "32936187",
    "iban": "GB36SRLG04000000000000",
    "sortCode": "040059",
    "country": "826",
    "bic": "SRXXXXXX"
  },
  "destinationBankAccountAddress": {
    "id": "639646433849778910",
    "accountNumber": "38089896",
    "iban": "GB36SRLG04000000000001",
    "sortCode": "040059",
    "country": "826",
    "bic": "SRXXXXXX"
  },
  "status": "PENDING",
  "type": "INBOUND_PAYMENT_RETURN",
  "scheme": "SCT",
  "reference": "REF2558789565421546",
  "reasonCode": "FOLLOWING_CANCELATION_REQUEST",
  "createdAt": "2019-12-09T11:45:41+00:00"
}
```

#### Return updated

| URL                                                                    | Method      |
|:-----------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-inbound-return-updated  | POST        |

##### Request

| Parameter                     | Type                                            | Length | Description                                                           |
|:------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------|
| transactionId                 | string                                          | 20     |                                                                       |
| returnedTransactionId         | string                                          | 20     |                                                                       |
| transaction                   | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                       |
| requestReference              | string &#124; null                              | 255    |                                                                       |
| type                          | string                                          | 255    | `INBOUND_PAYMENT_RETURN`                                              |
| status                        | string                                          | 8      | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses) |
| scheme                        | string                                          | 255    | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes)   |
| updatedAt                     | datetime                                        | 25     |                                                                       |
| settledThroughSuspenseAccount | bool                                            |        |                                                                       |

###### Example

```json
{
  "transactionId": "639646433849916890",
  "returnedTransactionId": "139",
  "transaction": {  
    "id": "639646433849910460",
    "requestReference": "MY-TX-REF-0000000002",
    "settlementAmount": 1255,
    "settlementCurrency": "826",
    "instructedAmount": 1255,
    "instructedCurrency": "826",
    "sourceBankAccountAddress": {  
       "id": "639646433849963850",
       "ownerName": "John Doe",
       "accountName": "John Doe",
       "accountNumber": "32936187",
       "iban": "GB36SRLG04000000000000",
       "sortCode": "040059",
       "country": "826",
       "bic": "SRXXXXXX"
    },
    "destinationBankAccountAddress": {  
       "id": "639646433849918700",
       "ownerName": "John Doe",
       "accountName": "John Doe",
       "accountNumber": "38089896",
       "iban": "GB36SRLG04000000000001",
       "sortCode": "040059",
       "country": "826",
       "bic": "SRXXXXXX"
    },
    "createdAt": "2019-03-08T08:43:07+00:00"
  },
  "type": "INBOUND_PAYMENT_RETURN",
  "status": "ACCEPTED",
  "scheme": "TRANSFER",
  "updatedAt": "2019-12-06T08:53:43+00:00",
  "settledThroughSuspenseAccount": false
}
```

### Outbound

#### Created

| URL                                                                    | Method      |
|:-----------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-created        | POST        |

##### Request

| Parameter                         | Type                        | Description                            |
|:----------------------------------|:----------------------------|:---------------------------------------|
| transaction                       | [`BankTransfer`](#appendix--type--banktransfer) |          |

###### Example

```json
{
    "transaction": {
        "id": "639646433850197190",
        "settlementAmount": 79212,
        "settlementCurrency": "826",
        "instructedAmount": 79212,
        "instructedCurrency": "826",
        "sourceBankAccountAddress": {
            "id": "639646433850181350",
            "accountName": "John Doe",
            "accountNumber": "00000009",
            "iban": "GB36SRLG04000000000000",
            "sortCode": "040059",
            "bic": "SRXXXXXX",
            "country": "826"
        },
        "destinationBankAccountAddress": {
            "id": "639646433850162700",
            "accountName": "Jane Doe",
            "iban": "GB36SRLG04000000000001",
            "bban": "DEUT40508129256000",
            "country": "826"
        },
        "details": {
          "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04000000000000",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": null
          },
          "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB36SRLG04000000000001",
            "country": "826",
            "addressLineOne": null,
            "addressLineTwo": null,
            "type": "COMPANY"
          },
          "note": "Payment for flat rent.",
          "purpose": null
        },
        "createdAt": "2020-01-03T14:36:18+00:00",
        "direction": "OUTBOUND",
        "status": "ACCEPTED",
        "type": "SINGLE_IMMEDIATE_PAYMENT",
        "scheme": "SCT",
        "requestReference": "REF141211014"
    }
}
```

#### Redirected

| URL                                                                    | Method      |
|:-----------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-redirected     | POST        |

##### Request

| Parameter                         | Type                                                        | Length | Description |
|:----------------------------------|:------------------------------------------------------------|:-------|:------------|
| transactionId                     | string                                                      | 20     |             |
| requestReference                  | string &#124; null                                          | 255    |             |
| originalAccount                   | [`BankAccountAddress`](#appendix--type--bankaccountaddress) |        |             |
| redirectedAccount                 | [`BankAccountAddress`](#appendix--type--bankaccountaddress) |        |             |

###### Example

```json
{  
   "transactionId": "639646433850434730",
   "requestReference": "12345678",
   "originalAccount": {  
      "id": "639646433850410190",
      "accountNumber": "32936187",
      "iban": "GB36SRLG04000000000000",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
   },
   "redirectedAccount": {  
      "id": "639646433850496210",
      "accountNumber": "38089896",
      "iban": "GB36SRLG04000000000001",
      "sortCode": "040059",
      "country": "826",
      "bic": "SRXXXXXX"
   }
}
```

#### Returned

| URL                                                                  | Method      |
|:---------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-returned     | POST        |

##### Request

| Parameter                           | Type                                            | Length | Description                                                                                   |
|:------------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------------------------------|
| returnedTransactionId               | string                                          | 20     |                                                                                               |
| returnedTransactionRequestReference | string &#124; null                              | 255    |                                                                                               |    
| returnTransaction                   | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                                               |
| reasonCode                          | string                                          | 255    | See [`OutboundTransferReturnReasons`](#appendix--enum--reason--outboundtransferreturnreasons) |  
| reasonDescription                   | string                                          | 255    |                                                                                               |
| settledThroughSuspenseAccount       | bool                                            |        |                                                                                               | 

###### Example

```json
{  
   "returnedTransactionId": "639646433850552740",
   "returnedTransactionRequestReference": "123456789",
   "returnTransaction": {  
      "id": "639646433850594540",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "sourceBankAccountAddress": {  
         "id": "639646433850638990",
         "accountNumber": "32936187",
         "iban": "GB36SRLG04000000000000",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433850637840",
         "accountNumber": "38089896",
         "iban": "GB36SRLG04000000000001",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "createdAt": "2019-03-08T08:43:07+00:00",
      "type": "SINGLE_IMMEDIATE_PAYMENT",
      "scheme": "SCT",
      "requestReference": "REQREF123456951F"
   },
   "reasonCode": "ACCOUNT_BLOCKED",
   "reasonDescription": "Account blocked",
   "settledThroughSuspenseAccount": false
}
```

#### Return created

| URL                                                                        | Method      |
|:---------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-return-created     | POST        |

##### Request

| Parameter                           | Type                                            | Length | Description                                                                                   |
|:------------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------------------------------|
| returnedTransactionId               | string                                          | 20     |                                                                                               |
| returnedTransactionRequestReference | string &#124; null                              | 255    |                                                                                               |    
| returnTransaction                   | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                                               |
| reasonCode                          | string                                          | 255    | See [`OutboundTransferReturnReasons`](#appendix--enum--reason--outboundtransferreturnreasons) |  
| reasonDescription                   | string                                          | 255    |                                                                                               |
| instructionId                       | string &#124; null                              | 20     |                                                                                               |
| instructionRequestReference         | string &#124; null                              | 18     |                                                                                               |

###### Example

```json
{  
   "returnedTransactionId": "639646433850817380",
   "returnedTransactionRequestReference": "123456789",
   "returnTransaction": {  
      "id": "639646433850856160",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "sourceBankAccountAddress": {  
         "id": "639646433850863100",
         "accountNumber": "32936187",
         "iban": "GB36SRLG04000000000000",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433850845830",
         "accountNumber": "38089896",
         "iban": "GB36SRLG04000000000001",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "createdAt": "2019-03-08T08:43:07+00:00",
      "type": "SINGLE_IMMEDIATE_PAYMENT",
      "scheme": "SCT",
      "requestReference": "REQREF123456951F"
   },
   "reasonCode": "ACCOUNT_BLOCKED",
   "reasonDescription": "Account blocked",
   "instructionId": "123",
   "instructionRequestReference": "123456"
}
```

#### Return rejected

| URL                                                                         | Method      |
|:----------------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-return-rejected     | POST        |

##### Request

| Parameter                          | Type                                            | Length | Description                                                                                   |
|:-----------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------------------------------|
| returnedTransactionId              | string                                          | 20     |                                                                                               |
| returnedTransactionRequestReference| string &#124; null                              | 255    |                                                                                               |    
| returnTransaction                  | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                                               |
| reasonCode                         | string                                          | 255    | See [`OutboundTransferReturnReasons`](#appendix--enum--reason--outboundtransferreturnreasons) |  
| reasonDescription                  | string                                          | 255    |                                                                                               |

###### Example

```json
{  
   "returnedTransactionId": "639646433851045410",
   "returnedTransactionRequestReference": "123456789",
   "returnTransaction": {  
      "id": "639646433851067720",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "bankProviderReasonCode": "MS01",
      "sourceMandateOriginator": {
          "id": "639577143219573851",
          "name": "SUSPENSE ",
          "serviceUserNumber": "402927"
      },
      "sourceBankAccountAddress": {  
         "id": "639646433851046350",
         "accountNumber": "32936187",
         "iban": "GB36SRLG04000000000000",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433851047770",
         "accountNumber": "38089896",
         "iban": "GB36SRLG04000000000001",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "details": {
         "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04000000000000",
            "country": "826",
            "addressLineOne": "67889 ST MARY", 
            "addressLineTwo": "London", 
            "type": "COMPANY"
         },
         "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB36SRLG04000000000001",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": "COMPANY"
         },
         "note": "Payment for flat rent.",
         "purpose": "1234"
      },
      "returnDetails": {
         "returnedTransactionId": "639646433851755709",
         "reason": "Account is closed",
         "reasonCode": "ACCOUNT_CLOSED"
      },
      "reference": "639646433851755709",
      "transactionIdentifier": "639646433851755710", 
      "endToEndIdentifier": "639646433851755710",
      "createdAt": "2019-03-08T08:43:07+00:00",
      "updatedAt": "2019-03-08T08:43:07+00:00",
      "direction": "OUTBOUND",
      "status": "REJECTED",
      "type": "SINGLE_IMMEDIATE_PAYMENT",
      "scheme": "SCT",
      "requestReference": "REQREF123456951F",
      "exchange": "1"
   },
   "reasonCode": "ACCOUNT_BLOCKED",
   "reasonDescription": "Account blocked"
}
```

#### Held

| URL                                                                  | Method      |
|:---------------------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-held         | POST        |

##### Request

| Parameter                         | Type                | Length | Description                            |
|:----------------------------------|:--------------------|:-------|:---------------------------------------|
| outboundTransactionId             | int(11)             | 20     |                                        |
| updatedAt                         | datetime            | 25     |                                        |    
| transaction                       | [`BankTransfer`](#appendix--type--banktransfer)       |      |        |

###### Example

```json
{  
   "outboundTransactionId": "639646433851236250",
   "updatedAt": "2019-03-08T08:45:07+00:00",
   "transaction": {  
      "id": "639646433851282070",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "sourceBankAccountAddress": {  
         "id": "639646433851213020",
         "iban": "GB36SRLG04000000000000",
         "accountName": "John Doe", 
         "accountNumber": "32936187",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433851352920",
         "iban": "GB36SRLG04000000000001",
         "accountName": "Not provided",
         "accountNumber": "38089896",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "requestReference": "123456789",
      "createdAt": "2019-03-08T08:43:07+00:00",
      "type": "SINGLE_IMMEDIATE_PAYMENT",
      "scheme": "SCT"
   }
}
```

#### Settled

| URL                                                              | Method     |
|:-----------------------------------------------------------------|:-----------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-settled  | POST       |

##### Request

| Parameter                     | Type                                            | Length | Description                                                      |
|:------------------------------|:------------------------------------------------|:-------|:-----------------------------------------------------------------|
| outboundTransactionId         | string                                          | 20     |                                                                  |
| transactionIdentifier         | string &#124; null                              | 100    | Unique external transaction identifier                           |
| endToEndIdentifier            | string &#124; null                              | 100    | Transaction end to end identifier. For now - only for ClearBank. |
| actualEndToEndIdentifier      | string &#124; null                              | 100    | Transaction actual end to end identifier.                        |
| transaction                   | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                  |
| updatedAt                     | datetime                                        | 25     |                                                                  |
| settledThroughSuspenseAccount | bool                                            | 1      |                                                                  |

###### Example

```json
{  
   "outboundTransactionId": "639646433851415640",
   "transactionIdentifier": "TX123456789",
   "endToEndIdentifier": "12345678910",
   "actualEndToEndIdentifier": "2000000008171482211078687",
   "transaction": {  
      "id": "639646433851482550",
      "requestReference": "MY-TX-REF-0000000002",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "sourceBankAccountAddress": {  
         "id": "639646433851529580",
         "accountName": "John Doe",
         "accountNumber": "32936187",
         "iban": "GB36SRLG04000000000000",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433851596130",
         "accountName": "Not provided",
         "accountNumber": "38089896",
         "iban": "GB36SRLG04000000000001",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "details": {
        "senderData": {
          "name": "Money Sender Comp.",
          "iban": "GB36SRLG04000000000000",
          "country": "826",
          "addressLineOne": "67889 ST MARY",
          "addressLineTwo": "London",
          "type": null
        },
        "receiverData": {
          "name": "Money Receiver Comp.",
          "iban": "GB36SRLG04000000000001",
          "country": "826",
          "addressLineOne": null,
          "addressLineTwo": null,
          "type": "COMPANY"
        },
        "note": "Payment for flat rent.",
        "purpose": null
      },
      "createdAt": "2019-03-08T08:43:07+00:00",
      "type": "SINGLE_IMMEDIATE_PAYMENT",
      "scheme": "SCT"
   },
   "updatedAt": "2019-03-08T08:43:07+00:00",
   "settledThroughSuspenseAccount": false
}
```

#### Rejected

| URL                                                              | Method     |
|:-----------------------------------------------------------------|:-----------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-rejected | POST       |

##### Request

| Parameter                         | Type                                            | Length | Description |
|:----------------------------------|:------------------------------------------------|:-------|:------------|
| outboundTransactionId             | string                                          | 20     |             |
| reasonDescription                 | string                                          | 255    |             |
| updatedAt                         | datetime                                        | 25     |             |
| transaction                       | [`BankTransfer`](#appendix--type--banktransfer) |        |             |

###### Example

```json
{  
    "outboundTransactionId": "639646433851731940",
    "reasonDescription": "Reasons not specified",
    "updatedAt": "2019-03-08T08:43:07+00:00",
    "transaction": {  
        "id": "639646433851755710",
        "requestReference": "MY-TX-REF-0000000002",
        "settlementAmount": 1255,
        "settlementCurrency": "826",
        "instructedAmount": 1255,
        "instructedCurrency": "826",
        "bankProviderReasonCode": "MS01",
        "sourceMandateOriginator": {
            "id": "639577143219573851",
            "name": "SUSPENSE ",
            "serviceUserNumber": "402927"
        },
        "sourceBankAccountAddress": {  
            "id": "639646433851715380",
            "accountName": "John Doe",
            "accountNumber": "32936187",
            "iban": "GB36SRLG04000000000000",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "destinationBankAccountAddress": {  
            "id": "639646433851873550",
            "accountName": "Not provided",
            "accountNumber": "38089896",
            "iban": "GB36SRLG04000000000001",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "details": {
          "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04000000000000",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": null
          },
          "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB36SRLG04000000000001",
            "country": "826",
            "addressLineOne": null,
            "addressLineTwo": null,
            "type": "COMPANY"
          },
          "note": "Payment for flat rent.",
          "purpose": null
        },
        "returnDetails": {
            "returnedTransactionId": "639646433851755709",
            "reason": "Account is closed",
            "reasonCode": "ACCOUNT_CLOSED"
        },
        "reference": "639646433851755709",
        "transactionIdentifier": "639646433851755710",
        "endToEndIdentifier": "639646433851755710",
        "createdAt": "2019-03-08T08:43:07+00:00",
        "updatedAt": "2019-03-08T08:43:07+00:00",
        "direction": "OUTBOUND",
        "status": "REJECTED",
        "type": "SINGLE_IMMEDIATE_PAYMENT",
        "scheme": "SCT",
        "exchange": "1"
    }
}
```

#### Cancel rejected

| URL                                                                      | Method     |
|:-------------------------------------------------------------------------|:-----------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-outbound-cancel-rejected  | POST       |

##### Request

| Parameter                           | Type               | Length | Description                                                                               |
|:------------------------------------|:-------------------|:-------|:------------------------------------------------------------------------------------------|
| canceledTransactionId               | string             | 20     |                                                                                           |
| canceledTransactionRequestReference | string &#124; null | 255    |                                                                                           |
| reason                              | string             | 255    | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons) |
| instructionId                       | string             | 20     |                                                                                           |
| instructionRequestReference         | string &#124; null | 18     |                                                                                           |

###### Example

```json
{  
   "canceledTransactionId": "639646433852046670",
   "canceledTransactionRequestReference": "123456789",
   "reason": "ACCOUNT_CLOSED",
   "instructionId": "639646433851755710",
   "instructionRequestReference": "123456"
}
```

### Transaction reversed

| URL                                                     | Method      |
|:--------------------------------------------------------|:------------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-reversed | POST        |

#### Request

| Parameter                           | Type                                            | Length | Description                                                                                   |
|:------------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------------------------------|
| reversedTransactionId               | string                                          | 20     |                                                                                               |
| reversedTransactionRequestReference | string &#124; null                              | 255    |                                                                                               |    
| reverseTransaction                  | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                                               |
| reasonCode                          | string                                          | 255    | See [`OutboundTransferReturnReasons`](#appendix--enum--reason--outboundtransferreturnreasons) |  
| reasonDescription                   | string                                          | 255    |                                                                                               |

##### Example

```json
{  
   "reversedTransactionId": "639646433850552740",
   "reversedTransactionRequestReference": "123456789",
   "reverseTransaction": {
      "id": "639646433850594540",
      "settlementAmount": 1255,
      "settlementCurrency": "826",
      "instructedAmount": 1255,
      "instructedCurrency": "826",
      "sourceBankAccountAddress": {  
         "id": "639646433850638990",
         "accountNumber": "32936187",
         "iban": "GB36SRLG04000000000000",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "destinationBankAccountAddress": {  
         "id": "639646433850637840",
         "accountNumber": "38089896",
         "iban": "GB36SRLG04000000000001",
         "sortCode": "040059",
         "country": "826",
         "bic": "SRXXXXXX"
      },
      "createdAt": "2019-03-08T08:43:07+00:00",
      "type": "PAYMENT_REVERSE",
      "scheme": "SCT",
      "requestReference": "REQREF123456951F"
   },
   "reasonCode": "ACCOUNT_BLOCKED",
   "reasonDescription": "Account blocked"
}
```

### Transaction status changed
| URL                                                                 | Method   |
|:--------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-status-changed       | POST     |

#### Request

| Parameter                         | Type                                            | Length | Description                                                           |
|:----------------------------------|:------------------------------------------------|:-------|:----------------------------------------------------------------------|
| transactionId                     | string                                          | 20     |                                                                       |
| updatedAt                         | datetime                                        | 25     |                                                                       |
| status                            | string                                          | 8      | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses) |
| reasonDescription                 | string                                          | 255    |                                                                       | 
| transaction                       | [`BankTransfer`](#appendix--type--banktransfer) |        |                                                                       |

##### Example

```json
{
    "transactionId": "639646433852168000",
    "updatedAt": "2019-03-08T08:45:07+00:00",
    "status": "ACCEPTED",
    "reasonDescription": "",
    "transaction": { 
        "id": "639646433852193610",
        "settlementAmount": 1255,
        "settlementCurrency": "826",
        "instructedAmount": 1255,
        "instructedCurrency": "826",
        "sourceBankAccountAddress": {  
            "id": "639646433852111600",
            "iban": "GB36SRLG04000000000000",
            "accountName": "John Doe",
            "accountNumber": "32936187",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "destinationBankAccountAddress": {  
            "id": "639646433852293210",
            "iban": "GB36SRLG04000000000001",
            "accountName": "Jane Doe",
            "accountNumber": "38089896",
            "sortCode": "040059",
            "country": "826",
            "bic": "SRXXXXXX"
        },
        "details": {
          "senderData": {
            "name": "Money Sender Comp.",
            "iban": "GB36SRLG04000000000000",
            "country": "826",
            "addressLineOne": "67889 ST MARY",
            "addressLineTwo": "London",
            "type": null
          },
          "receiverData": {
            "name": "Money Receiver Comp.",
            "iban": "GB36SRLG04000000000001",
            "country": null,
            "addressLineOne": null,
            "addressLineTwo": null,
            "type": "COMPANY"
          },
          "note": "Intern Company note",
          "purpose": "1234"
        },
        "reference": "AB12345",
        "createdAt": "2019-03-08T08:43:07+00:00",
        "direction": "INBOUND",
        "status": "ACCEPTED",
        "type": "SINGLE_IMMEDIATE_PAYMENT",
        "scheme": "SCT"
    }
}
```

## Transaction instruction
### Cancel instruction
#### Created

| URL                                                                        | Method   |
|:---------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-cancel-instruction-created  | POST     |

##### Request

| Parameter                 | Type               | Length | Description                                                                                   |
|:--------------------------|:-------------------|:-------|:----------------------------------------------------------------------------------------------|
| instructionId             | string             | 20     |                                                                                               |
| transactionId             | string             | 20     |                                                                                               |
| requestReference          | string &#124; null | 255    |                                                                                               |
| type                      | string             | 35     | See [`Transaction instruction types`](#appendix--enum--transactioninstruction--types)         |
| status                    | string             | 8      | See [`Transaction instruction statuses`](#appendix--enum--transactioninstruction--statuses)   |
| reasonCode                | string             | 255    | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons)     |
| createdAt                 | datetime           | 25     |                                                                                               |
| willFinishAt              | datetime           | 25     |                                                                                               |

###### Example

```json
{ 
   "instructionId": "639646433852485700",
   "transactionId": "639646433852489750",
   "type": "INBOUND_CANCEL",
   "status": "PENDING",
   "reasonCode": "DUPLICATE_PAYMENT",
   "createdAt": "2019-08-01T14:10:27+00:00",
   "willFinishAt": "2019-08-11T14:10:27+00:00"
}
```

#### Updated

| URL                                                                        | Method     |
|:---------------------------------------------------------------------------|:-----------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-cancel-instruction-updated  | POST       |

##### Request

| Parameter                 | Type                 | Length | Description                                                                                   |
|:--------------------------|:---------------------|:-------|:----------------------------------------------------------------------------------------------|
| instructionId             | string               | 20     |                                                                                               |
| transactionId             | string               | 20     |                                                                                               |
| requestReference          | string &#124; null   | 255    |                                                                                               |
| type                      | string               | 35     | See [`Transaction instruction types`](#appendix--enum--transactioninstruction--types)         |
| status                    | string               | 8      | See [`Transaction instruction statuses`](#appendix--enum--transactioninstruction--statuses)   |
| reasonCode                | string               | 255    | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons)     |
| createdAt                 | datetime             | 25     |                                                                                               |
| updatedAt                 | datetime &#124; null | 25     |                                                                                               |
| willFinishAt              | datetime             | 25     |                                                                                               |

###### Example

```json
{
  "instructionId": "639646433852596240",
  "transactionId": "639646433852674300",
  "type": "INBOUND_CANCEL",
  "status": "REJECTED",
  "reasonCode": "DUPLICATE_PAYMENT",
  "createdAt": "2019-08-01T14:10:27+00:00",
  "updatedAt": "2019-08-02T14:57:20+00:00",
  "willFinishAt": "2019-08-11T14:10:27+00:00"
}
```

### Resolution of investigation instruction
#### Created

| URL                                                                                             | Method   |
|:------------------------------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-resolution-of-investigation-instruction-created  | POST     |

##### Request

| Parameter                 | Type               | Length | Description                                                                                   |
|:--------------------------|:-------------------|:-------|:----------------------------------------------------------------------------------------------|
| originalInstructionId     | string             | 20     |                                                                                               |
| instructionId             | string             | 20     |                                                                                               |
| transactionId             | string             | 20     |                                                                                               |
| requestReference          | string &#124; null | 255    |                                                                                               |
| type                      | string             | 35     | See [`Transaction instruction types`](#appendix--enum--transactioninstruction--types)         |
| status                    | string             | 8      | See [`Transaction instruction statuses`](#appendix--enum--transactioninstruction--statuses)   |
| reasonCode                | string             | 255    | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons)     |
| createdAt                 | datetime           | 25     |                                                                                               |

###### Example

```json
{
  "originalInstructionId": "639646433852777460",
  "instructionId": "639646433852775950",
  "transactionId": "639646433852792220",
  "type": "INBOUND_RESOLUTION_OF_INVESTIGATION",
  "status": "PENDING",
  "reasonCode": "LEGAL_DECISION",
  "createdAt": "2019-08-02T14:58:53+00:00"
}
```

#### Updated

| URL                                                                                             | Method   |
|:------------------------------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/transaction-resolution-of-investigation-instruction-updated  | POST     |

##### Request

| Parameter                 | Type                 | Length | Description                                                                                   |
|:--------------------------|:---------------------|:-------|:----------------------------------------------------------------------------------------------|
| originalInstructionId     | string               | 20     | Parent cancel instruction ID                                                                  |
| instructionId             | string               | 20     |                                                                                               |
| transactionId             | string               | 20     |                                                                                               |
| requestReference          | string &#124; null   | 255    |                                                                                               |
| type                      | string               | 35     | See [`Transaction instruction types`](#appendix--enum--transactioninstruction--types)         |
| status                    | string               | 8      | See [`Transaction instruction statuses`](#appendix--enum--transactioninstruction--statuses)   |
| reasonCode                | string               | 255    | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons)     |
| createdAt                 | datetime             | 25     |                                                                                               |
| updatedAt                 | datetime &#124; null | 25     |                                                                                               |

###### Example

```json
{
  "originalInstructionId": "639646433852838320",
  "instructionId": "639646433852932310",
  "transactionId": "639646433852912100",
  "type": "INBOUND_RESOLUTION_OF_INVESTIGATION",
  "status": "ACCEPTED",
  "reasonCode": "LEGAL_DECISION",
  "createdAt": "2019-08-02T14:58:53+00:00",
  "updatedAt": "2019-08-02T14:59:20+00:00"
}
```

## Exchanges
### Exchange
#### Created

| URL                                                                        | Method   |
|:---------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/currency-exchange-created               | POST     |

##### Request

| Parameter         | Type                                    | Length | Description  |
|:------------------|:----------------------------------------|:-------|:-------------|
| exchange          | [`Exchange`](#appendix--type--exchange) |        |              |

###### Example

```json
{
    "exchange": {
        "id": "639646433853091860",
        "sourceBankAccountAddress": {
            "id": "639646433853070750",
            "ownerName": "John Doe",
            "accountName": "John Doe",
            "accountNumber": "F36462860",
            "country": "826"
        },
        "goalAmount": 500,
        "boughtAmount": 0,
        "soldAmount": 0,
        "sourceCurrency": "978",
        "targetCurrency": "826",
        "requestReference": "A00000000027",
        "transactions": [],
        "goalType": "SELL",
        "status": "ACTIVE"
    }
}
```

#### Updated

| URL                                                                        | Method   |
|:---------------------------------------------------------------------------|:---------|
| %YOUR_REGISTERED_NOTIFICATION_URL%/currency-exchange-updated               | POST     |

##### Request

| Parameter         | Type                                    | Length | Description  |
|:------------------|:----------------------------------------|:-------|:-------------|
| exchange          | [`Exchange`](#appendix--type--exchange) |        |              |

###### Example

```json
{
	"exchange": {
		"id": "639646433853141180",
		"sourceBankAccountAddress": {
			"id": "639646433853111970",
			"ownerName": "John Doe",
			"accountName": "John Doe",
			"accountNumber": "F36462860",
			"country": "826"
		},
		"goalAmount": 500,
		"boughtAmount": 423,
		"soldAmount": 499,
		"sourceCurrency": "978",
		"targetCurrency": "826",
		"requestReference": "A00000000027",
		"transactions": [{
			"id": "639646433853155500",
			"settlementAmount": 499,
			"settlementCurrency": "978",
			"instructedAmount": 499,
			"instructedCurrency": "978",
			"sourceBankAccountAddress": {
				"id": "639646433853128830",
				"ownerName": "John Doe",
				"accountName": "John Doe",
				"accountNumber": "F36462860",
				"country": "826"
			},
			"transactionIdentifier": "EXCHANGE-SELL-1618394718771",
			"createdAt": "2021-04-14T10:05:19+00:00",
			"exchange": "1",
			"direction": "OUTBOUND",
			"status": "ACCEPTED",
			"type": "SINGLE_IMMEDIATE_PAYMENT",
			"scheme": "EXCHANGE"
		}, {
			"id": "639646433853267800",
			"settlementAmount": 423,
			"settlementCurrency": "826",
			"instructedAmount": 423,
			"instructedCurrency": "826",
			"destinationBankAccountAddress": {
				"id": "639646433853236970",
				"ownerName": "Jane Doe",
				"accountName": "Jane Doe",
				"accountNumber": "F36462860",
				"country": "826"
			},
			"transactionIdentifier": "EXCHANGE-BUY-1618394718771",
			"createdAt": "2021-04-14T10:05:19+00:00",
			"exchange": "1",
			"direction": "INBOUND",
			"status": "ACCEPTED",
			"type": "SINGLE_IMMEDIATE_PAYMENT",
			"scheme": "EXCHANGE"
		}, {
			"id": "639646433853320600",
			"settlementAmount": 1,
			"settlementCurrency": "978",
			"instructedAmount": 1,
			"instructedCurrency": "978",
			"sourceBankAccountAddress": {
				"id": "639646433853364260",
				"ownerName": "Jane Doe",
				"accountName": "Jane Doe",
				"accountNumber": "F36462860",
				"country": "826"
			},
			"transactionIdentifier": "EXCHANGE-FEE-1618394718771",
			"createdAt": "2021-04-14T10:05:19+00:00",
			"exchange": "1",
			"direction": "OUTBOUND",
			"status": "ACCEPTED",
			"type": "DEBIT_FEE",
			"scheme": "EXCHANGE"
		}],
		"goalType": "SELL",
		"status": "COMPLETED"
	}
}
```

# Appendix
## Changelog

| Version | Date               | Updates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|:--------|:-------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0.60  | September 25, 2022 | Changed `currency` type to `string &#124; null` in [`Create bank account address`](#actions--bank-account-address--create) and [`Create business bank account address`](#actions--bank-account-address--create-business) requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.0.59  | September 19, 2022 | Added missing [`BankAccountAddress`](#appendix--type--bankaccountaddress) status fields to update endpoint responses and [`Bank account address status changed`](#webhooks--bank-account-address--status-changed) webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.58  | September 14, 2022 | Added [`Transaction reversed`](#webhooks--payment--transaction-reversed) webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.57  | September 02, 2022 | Added `settledThroughSuspenseAccount` to [`Direct credit paid`](#webhooks--direct-credit--paid), [`Payment Outbound Returned`](#webhooks--payment--outbound--returned), [`Inbound Return Updated`](#webhooks--payment--inbound--return-updated) webhooks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.0.56  | August 30, 2022    | Added `currencies` array, changed `currency` type to `string &#124; null` of [`bank-account-address-created`](#webhooks--bank-account-address--created) webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.0.55  | July 21, 2022      | Updated examples of [`PaymentOutboundReturnRejected`](#webhooks--payment--outbound--return-rejected) and [`PaymentOutboundRejected`](#webhooks--payment--outbound--rejected)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.0.54  | July 20, 2022      | Added `relationshipType` parameter to [`BankAccountAddressUpdate`](#actions--bank-account-address--update) and [`Bank account address details changed`](#webhooks--bank-account-address--details-changed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.53  | July 12, 2022      | Fixed `instructionId` type to `string` everywhere                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.0.52  | July 07, 2022      | Removed `FOLLOWING_CANCELATION_REQUEST` from [`ReturnReasons`](#appendix--enum--reason--returnreasons)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.0.51  | July 04, 2022      | Made `scheme` nullable in [`Create outbound`](#actions--payment--create-outbound)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.0.50  | June 30, 2022      | Updated descriptions in [`BankAccountAddress`](#appendix--type--bankaccountaddress) for case of partially created address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.49  | June 16, 2022      | Added a new API call [`Get instruction details`](#actions--transaction-instruction--get-details)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.48  | June 14, 2022      | Added `closed` to [`Bank account address status changed`](#webhooks--bank-account-address--status-changed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.47  | June 10, 2022      | Added new API call [`CloseAccountAddress`](#actions--bank-account-address--close-account-address)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.0.46  | June 07, 2022      | Added `actualEndToEndIdentifier` to transaction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.0.45  | May 17, 2022       | Added beneficiary `type` to [`TransactionDetailsPartyData`](#appendix--type--transactiondetailspartydata)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.44  | May 09, 2022       | Fixed API documentation inconsistencies:<br/>Increased `reference` fields length to 255 characters<br/>Specified nullable fields<br/>Specified default values where applicable<br/>`BankAccountAddress` now accepts `type` field as string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.43  | April 21, 2022     | Added new API call [`BankAccountAddressOptInOutOfConfirmationOfPayeeService`](#actions--bank-account-address--opt-in-out-of-confirmation-of-payee-service)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.42  | April 21, 2022     | Added `relationshipType` parameter to [`BankAccountAddressCreate`](#actions--bank-account-address--create) and a new enum [`BankAccountAddressRelationshipType`](#appendix--enum--bank-account-address--relationship-types)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.0.41  | April 21, 2022     | Added new API call [`Verify the exact name registered with the payee’s account`](#actions--bank-account-address--verify-the-exact-name-registered-with-the-payees-account), type [`NameVerificationReport`](#appendix--type--nameverificationreport) and enum [`Legal owner types`](#appendix--enum--bank-account-address--legal-owner-types)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.0.40  | April 20, 2022     | Added `ultimateSenderDetails` and `ultimateReceiverDetails` ([`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata)) to outbound request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.0.39  | April 20, 2022     | Added [`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.0.38  | April 06, 2022     | Added `settledThroughSuspenseAccount` to [`Direct debit paid`](#webhooks--payment--direct-debit--paid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.0.37  | April 01, 2022     | Changed descriptions of `reference` in [`Return transfer`](#actions--payment--return-tranfer), [`DestinationDetails`](#appendix--type--transferdestinationdetails)*->*`note` and [`OutboundTransfer`](#appendix--type--outboundtransfer)*->*`reference`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.0.36  | March 30, 2022     | Made `details` nullable in [`Direct credit received`](#webhooks--direct-credit--received)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.35  | March 30, 2022     | Added `requestReference` parameter to [`OutboundCancel`](#actions--payment--outbound-cancel) and fields `instructionId`, `instructionRequestReference` to webhooks [`Outbound return created`](#webhooks--payment--outbound--return-created) and [`Outbound cancel rejected`](#webhooks--payment--outbound--cancel-rejected)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.0.34  | March 01, 2022     | Added new types to [TransactionInstructionTypes](#appendix--enum--transactioninstruction--types)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.33  | January 25, 2022   | Added `accountName` and `requestReference` parameters to [`BankAccountAddressUpdate`](#actions--bank-account-address--update) and [`BankAccountAddressBusinessUpdate`](#actions--bank-account-address--update-business) requests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.32  | January 25, 2022   | Added reason PAYMENT_RETURN_REASON_REASON_NOT_SPECIFIED to [`Outbound transfer return reasons`](#appendix--enum--reason--outboundtransferreturnreasons)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.0.31  | December 09, 2021  | Added `errorReason` to [`Direct debit mandate created`](#webhooks--direct-debit-mandate--created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.0.30  | December 02, 2021  | Changed [`BankAccountHolder`](#appendix--type--bankaccountholder) field `email` to optional, `phone` to conditional and [`BankAccountCompany`](#appendix--type--bankaccountcompany) fields `email` and `phone` to optional                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.29  | October 13, 2021   | Added optional parameter `transferChargeCode` to [`Create outbound`](#actions--payment--create-outbound) request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.28  | June 21, 2021      | Added optional parameter `requestReference` to [`BankAccountAddress`](#appendix--type--bankaccountaddress) request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 
| 1.0.27  | April 28, 2021     | New bank provider and support for currency exchanges in some bank providers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.0.26  | April 22, 2021     | Added mandate object to mandate webhooks data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.0.25  | April 06, 2021     | Added [`Direct debit mandate finished`](#webhooks--direct-debit-mandate--finished) webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.24  | March 24, 2021     | Changed all identifiers from int to bigint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.0.23  | March 09, 2021     | Added new [`BankAccountAddressType`](#appendix--enum--bank-account-address--types) field to [`BankAccountAddressCreate`](#actions--bank-account-address--create), [`BankAccountAddressUpdate`](#actions--bank-account-address--update), [`BankAccountAddressBusinessCreate`](#actions--bank-account-address--create-business), [`BankAccountAddressBusinessUpdate`](#actions--bank-account-address--update-business).                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.0.22  | March 04, 2021     | Changed address from optional to conditional in [`BankAccountCompanyUpdate`](#appendix--type--bankaccountcompanyupdate) and [`BankAccountCompany`](#appendix--type--bankaccountcompany)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.0.22  | March 03, 2021     | Changed max accountNumber length of [`BankAccountAddress`](#appendix--type--bankaccountaddress) and all associated webhooks (from 34 to 26).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.0.21  | January 26, 2021   | Changed address length of [`BankAccountHolder`](#appendix--type--bankaccountholder), [`BankAccountHolderUpdate`](#appendix--type--bankaccountholderupdate), [`BankAccountCompany`](#appendix--type--bankaccountcompany), [`BankAccountCompanyUpdate`](#appendix--type--bankaccountcompanyupdate) from 100 chars to 70 chars.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.0.20  | January 12, 2021   | Removed transaction-outbound-cancel-created webhook on successful outbound transfer cancel and replaced it with [`OutboundReturned`](#webhooks--payment--outbound--returned) transaction type: OUTBOUND_CANCEL was removed and such transactions are now considered as returns.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.0.19  | December 08, 2020  | Added destinationMandate field to [`BankTransfer`](#appendix--type--banktransfer).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.0.18  | November 25, 2020  | Added new reference, transactionIdentifier and endToEndIdentifier fields to transaction webhooks, e.g.: [`DirectDebitPaid`](#webhooks--direct-debit--paid), [`DirectDebitDue`](#webhooks--direct-debit--due), [`DirectDebitRejected`](#webhooks--direct-debit--rejected).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.17  | November 24, 2020  | Added new error codes to [`Api errors`](#appendix--enum--api-errors) enum.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.16  | October 29, 2020   | Added new optional `transactionId` field in [`TransactionBankAccountAddressRequest`](#actions--transaction--bank-account-address--request) api call.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.0.15  | October 28, 2020   | Updated [`Create bank account address mandate`](#actions--direct-debit--create-bank-account-address-mandate) api call. [`CreateMandateOriginatorBankAccountAddress`](#appendix--type--createmandateoriginatorbankaccountaddress) accountName length changed from 40 to 18 symbols.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.0.14  | October 5, 2020    | Documented custom rules for bank-transfer/outbound endpoint for some providers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.0.13  | September 22, 2020 | Added bank provider reason code to [`BankTransfer`](#appendix--type--banktransfer). Added new webhooks: [`Outbound return created`](#webhooks--payment--outbound--return-created) and [`Outbound return rejected`](#webhooks--payment--outbound--return-rejected). Added new api call [`Return transfer`](#actions--payment--return-transfer) which can be used to return FPS/CHAPS/DD/DC transfers. Added reason field to [`ChangeDirectDebitStatus`](#actions--direct-debit--set-upcoming-payment-status) api call.                                                                                                                                                                                                                                                                                                                         |
| 1.0.12  | September 16, 2020 | Added new conditional fields to: [`BankAccountHolder`](#appendix--type--bankaccountholder), [`BankAccountHolderUpdate`](#appendix--type--bankaccountholderupdate), [`BankAccountCompany`](#appendix--type--bankaccountcompany), [`BankAccountCompanyUpdate`](#appendix--type--bankaccountcompanyupdate) definitions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.0.11  | July 16, 2020      | Updated and added new API calls: <br> [`Create bank account address mandate`](#actions--direct-debit--create-bank-account-address-mandate) <br> [`Amend bank account address mandate`](#actions--direct-debit--amend-bank-account-address-mandate) <br> [`Reject bank account address mandate`](#actions--direct-debit--reject-bank-account-address-mandate) <br> [`Cancel bank account address mandate`](#actions--direct-debit--cancel-bank-account-address-mandate) <br> [`Get bank account address mandates`](#actions--direct-debit--get-bank-account-address-mandates)  <br><br> Added new webhooks: <br> [`Mandate activated`](#webhooks--direct-debit-mandate--activated) <br> [`Mandate activation failed`](#webhooks--direct-debit-mandate--activation-failed) <br> [`Mandate migrated`](#webhooks--direct-debit-mandate--migrated) |
| 1.0.10  | June 29, 2020      | Added field length column                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.9   | June 29, 2020      | 'requestReference' field has been added in Bank account address [`Create action`](#actions--bank-account-address--create), [`Create business action`](#actions--bank-account-address--create-business), [`Get details action response`](#actions--bank-account-address--get-details--response), [`Appendix type`](#appendix--type--bankaccountaddress).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.0.8   | June 18, 2020      | Added missing field lengths                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.0.7   | June 11, 2020      | Added new API call [`Resend latest transfer webhook`](#actions--webhook--resend-latest-transfer-webhook)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.0.6   | May 19, 2020       | Added new fields in [`Transaction bank account address`](#actions--transaction--bank-account-address--response) action response ('`sourceMandateOriginator`', '`reference`', '`transactionIdentifier`', '`endToEndIdentifier`', '`details`', '`updatedAt`') <br> '`details`' parameter has been added to [`Outbound settled`](#webhooks--payment--outbound--settled) and [`Outbound rejected`](#webhooks--payment--outbound--rejected) <br> '`sourceMandateOriginator`', '`returnDetails`', '`reference`', '`transactionIdentifier`', '`endToEndIdentifier`', '`updatedAt`' fields have been added to [`BankTransfer`](#appendix--type--banktransfer) type.                                                                                                                                                                                   |
| 1.0.5   | May 08, 2020       | 'postalCode', 'city', 'state', 'country' fields have been added to [`BankAccountCompany`](#appendix--type--bankaccountcompany) and [`BankAccountCompanyUpdate`](#appendix--type--bankaccountcompanyupdate) types for [`Business bank account address create`](#actions--bank-account-address--create-business) and [`Business bank account address update`](#actions--bank-account-address--update-business) actions.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.0.4   | April 22, 2020     | 'providerName' field has been added to [`Bank account address Create`](#webhooks--bank-account-address--created) webhook. <br> 'scheme', 'requestReference' and 'type' fields have been added to [`Create outbound`](#actions--payment--create-outbound--response) response. <br> Updated 'scheme', 'type' fields in [`Direct credit received`](#webhooks--direct-credit--received), [`Direct debit`](#webhooks--direct-debit), [`Payment`](#webhooks--payment) webhooks. <br> New Bank account address actions have been added: [`Update`](#actions--bank-account-address--update), [`Update business`](#actions--bank-account-address--update-business) <br> New webhook has been added [`Bank account address details changed`](#webhooks--bank-account-address--details-changed)                                                          |
| 1.0.3   | April 10, 2020     | New Bank account [`Get balances`](#actions--bank-account--get-balances) action has been added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.0.2   | April 08, 2020     | New [`Security`](#appendix--security) appendix has been added. New [`request headers`](#appendix--security--authentication--action) are needed for API requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.0.1   | April 06, 2020     | New [`Transaction status changed`](#webhooks--payment--transaction-status-changed--request) webhook has been added. <br> `Details` and `reference` fields has been added to [`Inbound Held`](#webhooks--payment--inbound--held) webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.0.0   | March 25, 2020     | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## Security
### Authentication
#### Action
These headers are mandatory when making API requests.

##### Request header

| Parameter                  | Type                   | Length | Required | Description                            |
|:---------------------------|:-----------------------|:-------|:---------|:---------------------------------------|
| x-auth-token               | string                 | 100    | Yes      | Your `API token`                       |
| x-auth-signature           | string                 | 128    | Yes      | See [`Action signature hash generating`](#appendix--security--hash-generating--action-signature) |
| x-auth-signature-timestamp | string                 | 19     | Yes      | Unix timestamp                         |

#### Webhook
In order to encrypt request - encryption should be done in the endpoint configuration.

##### Request header

| Parameter                 | Type                    | Length | Required | Description                            |
|:--------------------------|:------------------------|:-------|:---------|:---------------------------------------|
| x-hook-signature          | string                  | 88     | Yes      | See [`Webhook signature hash generating`](#appendix--security--hash-generating--webhook-signature) |

### Hash generating
#### Action signature
To generate a '`x-auth-signature`' hash, SHA-512 algorithm must be used.

Data that is hashed should be taken from the request parameters in JSON format and your '`notification secret`' which is used as a prefix and '`x-auth-signature-timestamp`' which is used as a suffix (no special separators are used). Hash format - lowercase hexits.

Finally, set your '`x-auth-signature`' in request header data.

#### Webhook signature
To generate a hash that can be compared with '`x-hook-signature`', SHA-512 algorithm must be used.

Data that is hashed should be taken from the request (in this case it is in JSON format) and your '`notification secret`' which is used as a prefix (no special separators are used). Hash format - Binary.

Finally, use base64 encode and compare your data with '`x-hook-signature`' request header data. If it does not match - it is a problem, someone is participating in the middle.

## Type

### BankAccountBalance

| Parameter                       | Type       | Length | Required  | Description                            |
|:--------------------------------|:-----------|:-------|:----------|:---------------------------------------|
| amount                          | int        | 20     | Yes       |                                        |
| currency                        | string     | 3      | Yes       | Currency ISO number.                         |

### Paginator

| Parameter  | Type            | Length | Required | Description                              |
|:-----------|:----------------|:-------|:---------|:-----------------------------------------|
| limit      | int &#124; null | 20     | No       | Number of items per page (Default: `30`) |
| page       | int &#124; null | 20     | No       | Current page number (Default: `1`)       |
| pagesCount | int &#124; null | 20     | No       | Total number of pages                    |

### BankAccountAddress

| Parameter           | Type               | Length | Required | Description                                          |
|:--------------------|:-------------------|:-------|:---------|:-----------------------------------------------------|
| id                  | string             | 20     | Yes      |                                                      |
| ownerName           | string &#124; null | 255    | No       |                                                      |
| accountNumber       | string &#124; null | 26     | No       | Filled if received from provider                     |
| accountName         | string             | 255    | Yes      | Account/Owner name of the bank account address       |
| iban                | string &#124; null | 34     | No       | Filled if received from provider                     |
| bban                | string &#124; null | 30     | No       | Filled if received from provider                     |
| sortCode            | string &#124; null | 6      | No       | Filled if received from provider                     |
| bic                 | string &#124; null | 12     | No       | Filled if received from provider                     |
| country             | string &#124; null | 3      | No       |                                                      |
| inboundEnabled      | bool               | 1      | Yes      |                                                      |
| outboundEnabled     | bool               | 1      | Yes      |                                                      |
| directDebitEnabled  | bool               | 1      | Yes      |                                                      |
| directCreditEnabled | bool               | 1      | Yes      |                                                      |
| providerName        | string             | 50     | No       | See [`BankProviders`](#appendix--enum--bankprovider) |
| requestReference    | string             | 255    | No       |                                                      |

### BankAccountHolder

| Parameter        | Type               | Length | Required    | Description                      |
|:-----------------|:-------------------|:-------|:------------|:---------------------------------|
| title            | string &#124; null | 7      | No          |                                  |
| firstName        | string             | 50     | Yes         |                                  |
| lastName         | string             | 50     | Yes         |                                  |
| addressLineOne   | string             | 70     | Yes         |                                  |
| addressLineTwo   | string &#124; null | 70     | No          |                                  |
| addressLineThree | string &#124; null | 70     | No          |                                  |
| addressLineFour  | string &#124; null | 70     | No          |                                  |
| postalCode       | string             | 9      | Yes         |                                  |
| city             | string             | 50     | Yes         | Length depends on bank provider. |
| state            | string &#124; null | 50     | No          |                                  |
| country          | string             | 3      | Yes         |                                  |
| phone            | string &#124; null | 15     | Conditional | Depends on bank provider.        |
| email            | string &#124; null | 255    | No          |                                  |
| dateOfBirth      | string &#124; null | 10     | No          |                                  |

### BankAccountHolderUpdate

| Parameter        | Type               | Length | Required | Description                      |
|:-----------------|:-------------------|:-------|:---------|:---------------------------------|
| firstName        | string &#124; null | 50     | No       |                                  |
| lastName         | string &#124; null | 50     | No       |                                  |
| addressLineOne   | string &#124; null | 70     | No       |                                  |
| addressLineTwo   | string &#124; null | 70     | No       | Empty value is available.        |
| addressLineThree | string &#124; null | 70     | No       | Empty value is available.        |
| addressLineFour  | string &#124; null | 70     | No       | Empty value is available.        |
| postalCode       | string &#124; null | 9      | No       |                                  |
| city             | string &#124; null | 50     | No       | Length depends on bank provider. |
| state            | string &#124; null | 50     | No       | Empty value is available.        |
| country          | string &#124; null | 3      | No       |                                  |
| phone            | string &#124; null | 15     | No       |                                  |
| email            | string &#124; null | 255    | No       |                                  |

### BankAccountCompany

| Parameter          | Type               | Length | Required    | Description                                                |
|:-------------------|:-------------------|:-------|:------------|:-----------------------------------------------------------|
| name               | string             | 50     | Yes         |                                                            |
| type               | string &#124; null | 255    | Conditional | See [`CompanyTypes`](#appendix--enum--companytypes).       |
| registrationNumber | string &#124; null | 255    | Conditional | Depends on bank provider.                                  |
| addressLineOne     | string &#124; null | 70     | Conditional | Depends on bank provider.                                  |
| addressLineTwo     | string &#124; null | 70     | No          |                                                            |
| addressLineThree   | string &#124; null | 70     | No          |                                                            |
| addressLineFour    | string &#124; null | 70     | No          |                                                            |
| postalCode         | string &#124; null | 9      | Conditional | Depends on bank provider.                                  |
| city               | string &#124; null | 50     | Conditional | Depends on bank provider. Length depends on bank provider. |
| state              | string &#124; null | 50     | No          |                                                            |
| country            | string &#124; null | 3      | Conditional | Depends on bank provider.                                  |
| contactName        | string &#124; null | 255    | Conditional | Depends on bank provider.                                  |
| phone              | string &#124; null | 15     | No          |                                                            |
| email              | string &#124; null | 255    | No          |                                                            |

### BankAccountCompanyUpdate

| Parameter        | Type               | Length | Required | Description                      |
|:-----------------|:-------------------|:-------|:---------|:---------------------------------|
| name             | string &#124; null | 50     | No       |                                  |
| addressLineOne   | string &#124; null | 70     | No       |                                  |
| addressLineTwo   | string &#124; null | 70     | No       |                                  |
| addressLineThree | string &#124; null | 70     | No       |                                  |
| addressLineFour  | string &#124; null | 70     | No       |                                  |
| postalCode       | string &#124; null | 9      | No       |                                  |
| city             | string &#124; null | 50     | No       | Length depends on bank provider. |
| state            | string &#124; null | 50     | No       |                                  |
| country          | string &#124; null | 3      | No       |                                  |
| contactName      | string &#124; null | 50     | No       |                                  |
| email            | string &#124; null | 255    | No       |                                  |
| phone            | string &#124; null | 15     | No       |                                  |

### BankTransfer

| Parameter                     | Type                                                                    | Length | Required | Description                                                                                                  |
|:------------------------------|:------------------------------------------------------------------------|:-------|:---------|:-------------------------------------------------------------------------------------------------------------|
| id                            | string                                                                  | 20     | Yes      | Bank transfer ID.                                                                                            |
| settlementAmount              | int                                                                     | 20     | Yes      |                                                                                                              |
| settlementCurrency            | string                                                                  | 3      | Yes      | Currency ISO number.                                                                                               |
| instructedAmount              | int                                                                     | 20     | Yes      |                                                                                                              |
| instructedCurrency            | string                                                                  | 3      | Yes      | Currency ISO number.                                                                                               |
| exchange                      | string &#124; null                                                      | 20     | No       | Available for Exchange related transactions                                                                  |
| destinationMandate            | [`Mandate`](#appendix--type--mandate)                                   |        | No       | Available for DirectDebit transactions                                                                       |
| sourceMandateOriginator       | [`MandateOriginator`](#appendix--type--mandateoriginator) &#124; null   |        | No       |                                                                                                              |
| sourceBankAccountAddress      | [`BankAccountAddress`](#appendix--type--bankaccountaddress)             |        | Yes      |                                                                                                              |
| destinationBankAccountAddress | [`BankAccountAddress`](#appendix--type--bankaccountaddress)             |        | Yes      |                                                                                                              |
| details                       | [`TransactionDetails`](#appendix--type--transactiondetails)             |        | No       |                                                                                                              |      
| returnDetails                 | [`TransactionReturnDetails`](#appendix--type--transactionreturndetails) |        | No       | Can be available when transaction type is: INBOUND_PAYMENT_RETURN, OUTBOUND_PAYMENT_RETURN or PAYMENT_CANCEL |
| bankProviderReasonCode        | string &#124; null                                                      | 255    | No       | Reason code provided by bank provider.                                                                       |
| requestReference              | string &#124; null                                                      | 255    | No       | Request reference of transfer                                                                                |
| reference                     | string &#124; null                                                      | 255    | No       | Reference of transfer                                                                                        |
| transactionIdentifier         | string &#124; null                                                      | 100    | No       | Unique external transaction identifier                                                                       |
| endToEndIdentifier            | string &#124; null                                                      | 100    | No       | Transaction end to end identifier.                                                                           |
| actualEndToEndIdentifier      | string &#124; null                                                      | 100    | No       | Transaction actual end to end identifier.                                                                    |
| createdAt                     | string                                                                  | 19     | Yes      |                                                                                                              | 
| updatedAt                     | string                                                                  | 19     | No       |                                                                                                              | 
| direction                     | string                                                                  | 8      | No       | See [`BankTransferDirections`](#appendix--enum--banktransfer--directions)                                    |
| status                        | string                                                                  | 8      | No       | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses)                                        |
| scheme                        | string                                                                  | 255    | No       | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes)                                          |
| type                          | string                                                                  | 255    | No       | See [`BankTransferTypes`](#appendix--enum--banktransfer--types)                                              |

### CurrencyAndAmount

| Parameter                       | Type               | Length | Required  | Description                            |
|:--------------------------------|:-------------------|:-------|:----------|:---------------------------------------|
| currency                        | string             | 3      | Yes       |                                        |
| minorUnits                      | int                | 20     | Yes       |                                        |

### DirectDebitTransaction

| Parameter                     | Type                                                                    | Length | Required  | Description                                                         |
|:------------------------------|:------------------------------------------------------------------------|:-------|:----------|:--------------------------------------------------------------------|
| id                            | string                                                                  | 20     | Yes       | Bank transfer ID.                                                   |
| settlementAmount              | int                                                                     | 20     | Yes       |                                                                     |
| settlementCurrency            | string                                                                  | 3      | Yes       | Currency ISO number.                                                      |
| instructedAmount              | int                                                                     | 20     | Yes       |                                                                     |
| instructedCurrency            | string                                                                  | 3      | Yes       | Currency ISO number.                                                      |
| sourceBankAccountAddress      | [`BankAccountAddress`](#appendix--type--bankaccountaddress)             |        | Yes       |                                                                     |
| destinationBankAccountAddress | [`BankAccountAddress`](#appendix--type--bankaccountaddress) &#124; null |        | No        |                                                                     |
| destinationMandate            | [`Mandate`](#appendix--type--mandate)                                   |        | Yes       |                                                                     |
| reference                     | string &#124; null                                                      | 255    | No        | Reference of transfer                                               |
| transactionIdentifier         | string &#124; null                                                      | 100    | No        | Unique external transaction identifier                              |
| endToEndIdentifier            | string &#124; null                                                      | 100    | No        | Transaction end to end identifier.                                  |
| actualEndToEndIdentifier      | string &#124; null                                                      | 100    | No        | Transaction actual end to end identifier.                           |
| details                       | [`TransactionDetails`](#appendix--type--transactiondetails) &#124; null |        | No        | Additional details about transaction                                |
| scheme                        | string                                                                  | 255    | Yes       | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes) |
| type                          | string                                                                  | 255    | Yes       | See [`BankTransferTypes`](#appendix--enum--banktransfer--types)     |
| createdAt                     | string                                                                  | 19     | Yes       |                                                                     |

### InboundTransfer

| Parameter                       | Type             | Length | Required  | Description                            |
|:--------------------------------|:-----------------|:-------|:----------|:---------------------------------------|
| transactionId                   | int              | 11     | Yes       |                                        |
| reference                       | string           | 18     | Yes       |                                        |

### InboundReturnTransfer

| Parameter                      | Type                                                        | Length | Required  | Description                                                           |
|:-------------------------------|:------------------------------------------------------------|:-------|:----------|:----------------------------------------------------------------------|
| id                             | string                                                      | 20     | Yes       | Bank transfer ID.                                                     |
| returnTransactionId            | string                                                      | 20     | Yes       | Bank transfer ID.                                                     |
| settlementAmount               | int                                                         | 20     | Yes       |                                                                       |
| settlementCurrency             | string                                                      | 3      | Yes       | Currency ISO number.                                                        |
| instructedAmount               | int                                                         | 20     | Yes       |                                                                       |
| instructedCurrency             | string                                                      | 3      | Yes       | Currency ISO number.                                                        |
| sourceBankAccountAddress       | [`BankAccountAddress`](#appendix--type--bankaccountaddress) |        | Yes       |                                                                       |
| destinationBankAccountAddress  | [`BankAccountAddress`](#appendix--type--bankaccountaddress) |        | Yes       |                                                                       |
| status                         | string                                                      | 8      | Yes       | See [`BankTransferStatuses`](#appendix--enum--banktransfer--statuses) |
| scheme                         | string                                                      | 255    | No        | See [`BankTransferSchemes`](#appendix--enum--banktransfer--schemes)   |
| type                           | string                                                      | 255    | Yes       | `INBOUND_PAYMENT_RETURN`                                              |
| reference                      | string                                                      | 18     | No        |                                                                       |
| requestReference               | string                                                      | 255    | No        |                                                                       |  
| reasonCode                     | string                                                      | 255    | Yes       | See [`ReturnReasons`](#appendix--enum--reason--returnreasons)         |
| transactionIdentifier          | string &#124; null                                          | 100    | No        | Unique external transaction identifier                                |
| endToEndIdentifier             | string &#124; null                                          | 100    | No        | Transaction end to end identifier.                                    |
| actualEndToEndIdentifier       | string &#124; null                                          | 100    | No        | Transaction actual end to end identifier.                             |
| createdAt                      | string                                                      | 19     | Yes       |                                                                       |

### OutboundTransfer

| Parameter                       | Type                                                                | Length | Required | Description                                                                                                                                      |
|:--------------------------------|:--------------------------------------------------------------------|:-------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceBankAccountAddressId      | string                                                              | 20     | Yes      |                                                                                                                                                  |
| destinationBankAccountAddress   | [`BankAccountAddress`](#appendix--type--bankaccountaddress)         |        | Yes      |                                                                                                                                                  |
| currencyAndAmount               | [`CurrencyAndAmount`](#appendix--type--currencyandamount)           |        | Yes      |                                                                                                                                                  |
| reference                       | string                                                              | 18     | Yes      | Some bank providers have specific requirements for this parameter. In case of failure, those requirements will be specified in the error mesage. |
| requestReference                | string &#124; null                                                  | 255    | No       |                                                                                                                                                  |
| destinationDetails              | [`DestinationDetails`](#appendix--type--transferdestinationdetails) |        | No       |                                                                                                                                                  |

### TransferDestinationDetails

| Parameter                 | Type                    | Length | Required    | Description                                                                                                                                                                                                                   |
|:--------------------------|:------------------------|:-------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| address                   | string &#124; null      | 70     | Conditional | Required for some bank providers.                                                                                                                                                                                             |
| postal                    | string &#124; null      | 20     | Conditional | Required for some bank providers.                                                                                                                                                                                             |
| city                      | string &#124; null      | 20     | Conditional | Required for some bank providers.                                                                                                                                                                                             |
| country                   | string &#124; null      | 3      | Conditional | Required for some bank providers.                                                                                                                                                                                             |
| note                      | string &#124; null      | 140    | No          | This field is for remittance information. For ClearBank - max 35 characters. Some bank providers have specific requirements for this parameter. In case of failure, those requirements will be specified in the error mesage. |
| purpose                   | string &#124; null      | 4      | No          | `ISO 20022` external purpose code                                                                                                                                                                                             |

### Mandate

| Parameter        | Type   | Length | Required  | Description                                               |
|:-----------------|:-------|:-------|:----------|:----------------------------------------------------------|
| string           | string | 20     | Yes       |                                                           |
| originator       | string | 255    | Yes       | [`MandateOriginator`](#appendix--type--mandateoriginator) |
| type             | string | 255    | Yes       | [`MandateType`](#appendix--enum--mandate--types)          |
| status           | string | 255    | Yes       | [`MandateStatus`](#appendix--enum--mandate--statuses)     |
| reference        | string | 35     | Yes       | Reference                                                 |
| requestReference | string | 255    | No        | Unique reference to track mandate                         |

### MandateOriginator

| Parameter         | Type   | Length | Required  | Description                            |
|:------------------|:-------|:-------|:----------|:---------------------------------------|
| id                | string | 20     | Yes       |                                        |
| name              | string | 255    | Yes       |                                        |
| serviceUserNumber | string | 255    | Yes       |                                        |

### MandateOriginatorBankAccountAddress

| Parameter     | Type                      | Length | Required    | Description                                             |
|:--------------|:--------------------------|:-------|:------------|:--------------------------------------------------------|
| accountName   | string                    | 255    | Conditional | Name of the account.                                    |
| iban          | string                    | 34     | Conditional | IBAN, required if accountNumber and sortCode are empty. |
| accountNumber | string                    | 26     | Conditional | Required if IBAN is empty.                              |
| sortCode      | string                    | 6      | Conditional | Required if IBAN is empty.                              |

### CreateMandateOriginatorBankAccountAddress

| Parameter     | Type                      | Length | Required    | Description                                             |
|:--------------|:--------------------------|:-------|:------------|:--------------------------------------------------------|
| accountName   | string                    | 18     | Conditional | Name of the account.                                    |
| iban          | string                    | 34     | Conditional | IBAN, required if accountNumber and sortCode are empty. |
| accountNumber | string                    | 26     | Conditional | Required if IBAN is empty.                              |
| sortCode      | string                    | 6      | Conditional | Required if IBAN is empty.                              |

### TransactionReturnDetails

| Parameter                  | Type               | Length | Required  | Description                                     |
|:---------------------------|:-------------------|:-------|:----------|:------------------------------------------------|
| returnedTransactionId      | string             | 20     | Yes       |                                                 |
| reason                     | string             | 255    | Yes       | Reason description                              |
| reasonCode                 | string &#124; null | 255    | No        | Check [`Reason codes`](#appendix--enum--reason) |

### TransactionDetails

| Parameter            | Type                                                                                                      | Length | Required | Description                    |
|:---------------------|:----------------------------------------------------------------------------------------------------------|:-------|:---------|:-------------------------------|
| senderData           | [`TransactionDetailsPartyData`](#appendix--type--transactiondetailspartydata) &#124; null                 |        | No       |                                |
| ultimateSenderData   | [`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata) &#124; null |        | No       |                                |
| receiverData         | [`TransactionDetailsPartyData`](#appendix--type--transactiondetailspartydata) &#124; null                 |        | No       |                                |
| ultimateReceiverData | [`TransactionDetailsUltimatePartyData`](#appendix--type--transactiondetailsultimatepartydata) &#124; null |        | No       |                                |
| purpose              | string &#124; null                                                                                        | 255    | No       |                                |
| note                 | string &#124; null                                                                                        | 255    | No       |                                |
| debitType            | string &#124; null                                                                                        | 10     | No       | For debit transactions only    |
| supplementaryData    | array &#124; null                                                                                         |        | No       | Supplementary transaction data |


### TransactionDetailsPartyData

| Parameter      | Type                                                                  | Length | Required | Description |
|:---------------|:----------------------------------------------------------------------|:-------|:---------|:------------|
| name           | string &#124; null                                                    | 50     | No       |             |
| iban           | string &#124; null                                                    | 34     | No       |             |
| addressLineOne | string &#124; null                                                    | 100    | No       |             |
| addressLineTwo | string &#124; null                                                    | 100    | No       |             |
| country        | string &#124; null                                                    | 3      | No       |             |
| type           | [`BeneficiaryTypes`](#appendix--enum--beneficiary--types) &#124; null |        | No       |             |

### TransactionDetailsUltimatePartyData

| Parameter          | Type               | Length | Required | Description                                                               |
|:-------------------|:-------------------|:-------|:---------|:--------------------------------------------------------------------------|
| name               | string &#124; null | 70     | No       |                                                                           |
| country            | string &#124; null | 3      | No       |                                                                           |
| organizationCode   | string &#124; null | 11     | No       |                                                                           |
| birthDate          | string &#124; null | 10     | No       | YYY-MM-DD format                                                          |
| birthCity          | string &#124; null | 35     | No       |                                                                           |
| birthCountry       | string &#124; null | 3      | No       |                                                                           |
| privateIdentifier  | string &#124; null | 35     | No       |                                                                           |
| privateIssuer      | string &#124; null | 35     | No       |                                                                           |
| privateCode        | string &#124; null | 4      | No       |                                                                           |
| privateProprietary | string &#124; null | 35     | No       |                                                                           |
| organization       | bool &#124; null   | 5      | No       | Whether ultimate party is private individual or company. Default: `false` |

### Exchange

| Parameter                         | Type                                                        | Length | Required  | Description                                                   |
|:----------------------------------|:------------------------------------------------------------|:-------|:----------|:--------------------------------------------------------------|
| id                                | string                                                      | 20     | Yes       |                                                               |
| sourceBankAccountAddress          | [`BankAccountAddress`](#appendix--type--bankaccountaddress) |        | Yes       |                                                               |
| goalAmount                        | int                                                         | 20     | Yes       |                                                               |
| boughtAmount                      | int                                                         | 20     | Yes       |                                                               |
| soldAmount                        | int                                                         | 20     | Yes       |                                                               |
| sourceCurrency                    | string                                                      | 3      | Yes       | ISO number                                                          |
| targetCurrency                    | string                                                      | 3      | Yes       | ISO number                                                          |
| requestReference                  | string                                                      | 255    | Yes       |                                                               |
| goalType                          | string                                                      | 255    | Yes       | See [`ExchangeTypes`](#appendix--enum--exchange--types)       |
| status                            | string                                                      | 255    | Yes       | See [`ExchangeStatuses`](#appendix--enum--exchange--statuses) |
| transactions                      | [`BankTransfer[]`](#appendix--type--banktransfer)           |        | Yes       |                                                               |

### ExchangeQuoteFee

| Parameter                          | Type                           | Length | Required  | Description         |
|:-----------------------------------|:-------------------------------|:-------|:----------|:--------------------|
| percentage                         | float                          |        | Yes       |                     |
| amount                             | int                            | 20     | Yes       |                     |
| currencyIson                       | string                         | 3      | Yes       |                     |

### TransactionInstruction

| Parameter                          | Type   | Length | Required  | Description                                                                                    |
|:-----------------------------------|:-------|:-------|:----------|:-----------------------------------------------------------------------------------------------|
| id                                 | string | 20     | Yes       |                                                                                                |
| requestReference                   | string | 255    | No        |                                                                                                |
| type                               | string | 255    | Yes       | See [`Transaction instruction types`](#appendix--enum--transactioninstruction--types)          |
| status                             | string | 8      | Yes       | See [`Transaction instruction statuses`](#appendix--enum--transactioninstruction--statuses)    |
| reasonCode                         | string | 255    | Yes       | See [`Transaction instruction reasons`](#appendix--enum--transactioninstruction--reasons)      |
| createdAt                          | string | 19     | Yes       |                                                                                                |

### BankAccountModel

| Parameter     | Type               | Length | Required    | Description                                                                                     |
|:--------------|:-------------------|:-------|:------------|:------------------------------------------------------------------------------------------------|
| accountName   | string &#124; null | 40     | Conditional | Required for some bank providers.                                                               |
| accountNumber | string &#124; null | 26     | Conditional | Required if `iban` is missing.                                                                  |
| sortCode      | string &#124; null | 6      | Conditional | Required if `sortCode` is missing.                                                              |
| bic           | string &#124; null | 11     | Conditional |                                                                                                 |
| iban          | string &#124; null | 34     | Conditional | Required if `accountNumber` and `sortCode` is missing.                                          |
| type          | string &#124; null | 255    | Conditional | Required for some bank providers. See [`BeneficiaryTypes`](#appendix--enum--beneficiary--types) |

### NameVerificationReport

| Parameter             | Type   | Length | Required | Description                                                                                                                                                                               |
|:----------------------|:-------|:-------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| matched               | bool   | 1      | Yes      | True if there is a match or false when there is no match or a partial match.                                                                                                              |
| name                  | string | 255    | No       | The account holder name in case of a partial match. This will not be present if there is a true match.                                                                                    |
| reasonCode            | string | 255    | No       | Reason code for a more detailed description of the kind of match. Defined by Pay.UK. Provided if there is no match or a partial match. This will not be present if there is a true match. |
| reasonCodeDescription | string | 255    | No       | Detailed description of the reason code, as described by Pay.UK. Provided if there is no match or a partial match. This will not be present if there is a true match.                     |
| matchedBank           | string | 255    | Yes      | The name of the bank that the name verification was performed with.                                                                                                                       |

### FinancialInstitutionDetails
| Parameter | Type   | Length | Required | Description        |
|:----------|:-------|:-------|:---------|:-------------------|
| name      | string | 140    | Yes      |                    |
| bic       | string | 8      | Yes      |                    |
| country   | string | 3      | Yes      | Country ISO number |

## Enum

### Bank account address
#### Types
| Type              | Description                                 |
|:------------------|:--------------------------------------------|
| VIRTUAL_ACCOUNT   | Client funds account.                       |
| ACCOUNT           | Main funds account.                         |
| BANK_FUNDS        | Bank funds account.                         |

#### Legal owner types
| Type value | Description      |
|:-----------|:-----------------|
| PERSONAL   | Personal account |
| BUSINESS   | Business account |
    
#### Relationship types
| Type value | Description    |
|:-------    |:---------------|
| Single     | Single account |
| Joint      | Joint account  |

### Mandate
#### Types
| Type          | Description                                 |
|:--------------|:--------------------------------------------|
| PAPER         | Paper mandate.                              |
| ORIGINATION   | Origination mandate.                        |
| MIGRATED      | Mandate migrated from Paper to Origination. |

#### Statuses
| Type           | Description                                             |
|:---------------|:--------------------------------------------------------|
| ACTIVE         | Mandate is active.                                      |
| CANCELED       | Mandate got cancelled.                                  |
| ERROR          | Mandate creation failed.                                |
| PENDING        | Mandate is pending.                                     |
| FINISHED       | Mandate is finished. No more transactions will be made. |

### Exchange
#### Types
| Type          | Description                                 |
|:--------------|:--------------------------------------------|
| SELL          | Selling exchange.                           |
| BUY           | Buying exchange.                            |

#### Statuses

| Type          | Description                                 |
|:--------------|:--------------------------------------------|
| COMPLETED     | Exchange is completed.                      |
| PENDING       | Exchange is pending.                        |
| ACTIVE        | Exchange is active.                         |
| REJECTED      | Exchange is rejected.                       |

### BankTransfer
#### Schemes

| Status value | Description           |
|:-------------|:----------------------|
| TRANSFER     | Transfer.             |
| FPS          | Faster payments.      |
| CHAPS        | Chaps scheme.         |
| BACS         | Bacs scheme.          |
| SCT          | SEPA transfer         |
| SCTI         | SEPA instant transfer |
| SDD          | SEPA direct debit     |
| EXCHANGE     | Transfer of exchange  |

#### Statuses

| Status value  | Description    |
|:--------------|:---------------|
| ACCEPTED      | Accepted.      |
| PENDING       | Pending.       |
| REVERSED      | Reversed.      |
| REJECTED      | Rejected.      |
| HELD          | Held.          |

#### Types

| Type value                            | Description                          |
|:--------------------------------------|:-------------------------------------|
| SINGLE_IMMEDIATE_PAYMENT              | Single immediate payment             |
| FORWARD_DATE_PAYMENT                  | Forward date payment.                |
| STANDING_ORDER_PAYMENT                | Standing order payment.              |
| INBOUND_PAYMENT_RETURN                | Inbound payment return.              |
| OUTBOUND_PAYMENT_RETURN               | Outbound payment return.             |
| DIRECT_DEBIT_PAYMENT                  | Direct debit payment.                |
| DIRECT_CREDIT_PAYMENT                 | Direct credit payment.               |
| PAYMENT_REVERSE                       | Payment reverse.                     |
| PAYMENT_CANCEL                        | Payment cancel.                      |
| DEBIT_FEE                             | Debit fee.                           |

#### Directions

| Direction value | Description         |
|:----------------|:--------------------|
| ALL             | Inbound & Outbound. |
| INBOUND         | Inbound.            |
| OUTBOUND        | Outbound.           |

### TransactionInstruction
#### Types

| Type value                            | Description                           |
|:--------------------------------------|:--------------------------------------|
| INBOUND_STATUS_REPORT                 | Inbound status report.                |
| INBOUND_CANCEL                        | Inbound cancel request.               |
| INBOUND_RESOLUTION_OF_INVESTIGATION   | Inbound resolution of investigation.  |
| INBOUND_REQUEST_FOR_STATUS_UPDATE     | Inbound request for status update.    |
| OUTBOUND_STATUS_REPORT                | Outbound status report.               |
| OUTBOUND_CANCEL                       | Outbound cancel request.              |
| OUTBOUND_RESOLUTION_OF_INVESTIGATION  | Outbound resolution of investigation. |
| OUTBOUND_REQUEST_FOR_STATUS_UPDATE    | Outbound request for status update.   |

#### Statuses

| Status value  | Description    |
|:--------------|:---------------|
| ACCEPTED      | Accepted.      |
| PENDING       | Pending.       |
| REJECTED      | Rejected.      |

#### Reasons

| Reason code                               | Description                          |
|:------------------------------------------|:-------------------------------------|
| DUPLICATE_PAYMENT                         | Duplicate payment.                   |
| WRONG_IBAN                                | Wrong Bank account address.          |
| WRONG_AMOUNT                              | Wrong amount.                        |
| FRAUDULENT_ORIGINAL_CREDIT_TRANSFER       | Fraudulent original credit transfer. |
| TECHNICAL_PROBLEM                         | Technical problem.                   |
| FOLLOWING_CANCELATION_REQUEST             | Following cancelation request.       |
| REQUESTED_BY_CUSTOMER                     | Requested by customer.               |
| ACCOUNT_CLOSED                            | Account is closed.                   |
| INSUFFICIENT_FUNDS                        | Insufficient funds.                  |
| ALREADY_RETURNED_TRANSACTION              | Transaction is already returned.     |
| LEGAL_DECISION                            | Legal decision.                      |
| NO_ANSWER_FROM_CUSTOMER                   | No answer from customer.             |
| NO_ORIGINAL_TRANSACTION_RECEIVED          | No original transaction received.    |

### Reason
#### ReturnReasons

| Reason code                                                               | Description                                                             | Transfer   | Direct Debit | Direct Credit |
|:--------------------------------------------------------------------------|:------------------------------------------------------------------------|------------|--------------|---------------|
| INCORRECT_ACCOUNT_NUMBER                                                  | Incorrect account number.                                               | Yes        | Yes          | Yes           |
| ACCOUNT_CLOSED                                                            | Account is closed.                                                      | Yes        | Yes          | Yes           |
| ACCOUNT_BLOCKED                                                           | Account is blocked.                                                     | Yes        | Yes          | Yes           |
| ACCOUNT_HOLDER_DECEASED                                                   | Account holder deceased.                                                | Yes        | Yes          | Yes           |
| NOT_SPECIFIED_REASON_BY_CUSTOMER                                          | Reason not specified by customer.                                       | Yes        | Yes          | No            |
| NOT_SPECIFIED_REASON_BY_AGENT                                             | Reason not specified by agent.                                          | Yes        | No           | No            |
| TRANSACTION_FORBIDDEN                                                     | Forbidden transaction.                                                  | Yes        | No           | No            |
| INVALID_BANK_OPERATION_CODE                                               | Invalid bank operation code.                                            | Yes        | No           | No            |
| DUPLICATION                                                               | Duplication.                                                            | Yes        | No           | No            |
| MISSING_CREDITOR_ADDRESS                                                  | Missing creditor's address.                                             | Yes        | Yes          | Yes           |
| MISSING_DEBTOR_ACCOUNT_OR_IDENTIFICATION                                  | Missing debtor's account or identification.                             | Yes        | Yes          | Yes           |
| MISSING_DEBTOR_NAME_OR_ADDRESS                                            | Missing debtor's name or address.                                       | Yes        | Yes          | Yes           |
| MISSING_CREDITOR_NAME_OR_ADDRESS                                          | Missing creditor's name or address.                                     | Yes        | Yes          | Yes           |
| REGULATORY_REASON                                                         | Regulatory reason.                                                      | Yes        | No           | No            |
| OTHER                                                                     | Other reason.                                                           | Yes        | Yes          | No            |
| REFERENCE_REQUIRED_NOT_SUPPLIED                                           | Required reference not supplied.                                        | Yes        | No           | No            |
| ACCOUNT_NAME_MISSMATCH                                                    | Account name missmatch.                                                 | Yes        | Yes          | Yes           |
| TERMS_AND_CONDITIONS_OF_ACCOUNT_DO_NOT_PERMIT_CREDITING_OF_THESE_FUNDS    | Terms and conditions of account do not permit crediting of these funds. | Yes        | No           | No            |
| ACCOUNT_TRANSFERRED                                                       | Account transferred.                                                    | Yes        | Yes          | Yes           |
| SENDING_INSTITUTION_ACTION_REQUIRED                                       | Sending institution action required.                                    | Yes        | No           | No            |
| PAYMENT_RETURN_REASON_REASON_NOT_SPECIFIED                                | Not specified payment return reason.                                    | Yes        | No           | No            |

#### OutboundTransferReturnReasons

| Reason code                                                               | Description                                |
|:--------------------------------------------------------------------------|:-------------------------------------------|
| OTHER                                                                     | Other.                                     |
| INCORRECT_ACCOUNT_NUMBER                                                  | Incorrect account number.                  |
| ACCOUNT_CLOSED                                                            | Account is closed.                         |
| ACCOUNT_BLOCKED                                                           | Account is blocked.                        |
| ACCOUNT_NAME_MISSMATCH                                                    | Account name missmatch.                    |
| ACCOUNT_CANNOT_BE_IDENTIFIED                                              | Account can not be identified.             |
| INCORRECT_TRANSACTION_INORMATION                                          | Incorrect transaction information.         |
| ACCOUNT_HOLDER_DECEASED                                                   | Account holder deceased.                   |
| FRAUDULENT_PAYMENT_SUSPECTED                                              | Fraudulent payment suspected.              |
| PROVIDER_ISSUE                                                            | Provider issue.                            |
| TIME_OUT                                                                  | Time out.                                  |
| TECHNICAL_PROBLEM                                                         | Technical problems.                        |
| DUPLICATION                                                               | Duplication.                               |
| ERI_OPTION_NOT_SUPPORTED                                                  | ERI option not supported.                  |
| REGULATORY_REASON                                                         | Regulatory reason.                         |
| INVALID_BANK_OPERATION_CODE                                               | Invalid bank operation code.               |
| MISSING_CREDITOR_ADDRESS                                                  | Missing creditor address.                  |
| FOLLOWING_CANCELATION_REQUEST                                             | Following cancelation request.             |
| MISSING_DEBTOR_ACCOUNT_OR_IDENTIFICATION                                  | Missing debtor account or identification.  |
| MISSING_DEBTOR_NAME_OR_ADDRESS                                            | Missing debtor name or address.            |
| PAYMENT_RETURN_REASON_REASON_NOT_SPECIFIED                                | Not specified payment return reason.       |

#### InboundCancelRequestDeclineReasons

| Reason code                               | Description                             |
|:------------------------------------------|:----------------------------------------|
| REQUESTED_BY_CUSTOMER                     | Requested by customer.                  |
| ACCOUNT_CLOSED                            | Account is closed.                      |
| INSUFFICIENT_FUNDS                        | Insufficient funds.                     |
| ALREADY_RETURNED_TRANSACTION              | Transaction is already returned.        |
| LEGAL_DECISION                            | Legal decision.                         |
| NO_ANSWER_FROM_CUSTOMER                   | No answer from customer.                |
| NO_ORIGINAL_TRANSACTION_RECEIVED          | No original transaction received.       |

#### MandateRejectionReasons

| Reason code                                  | Description                                                                                                        |
|:---------------------------------------------|:-------------------------------------------------------------------------------------------------------------------|
| CANCELLED_BY_PAYER                           | Payer has instructed paying bank to cancel DDI                                                                     |
| PAYER_DECEASED                               | Payer deceased.                                                                                                    |
| ACCOUNT_TRANSFERED_TO_DIFFERENT_INSTITUTION  | Account transferred to another bank / building society.                                                            |
| ACCOUNT_NOT_FOUND                            | Account number is not recognised at the paying bank.                                                               |
| MANDATE_INSTRUCTION_NOT_FOUND                | Instruction does not exist on paying bank’s database (only applies to receipt of a 0C).                            |
| PAYER_ACCOUNT_CLOSED                         | Payer has closed his account for an unknown reason.                                                                |
| ACCOUNT_MOVED_TO_DIFFERENT_BRANCH            | New account details supplied to the service user by paying bank.                                                   |
| INVALID_PAYEE_ACCOUNT_TYPE                   | Paying bank does not allow Direct Debits on this type of account.                                                  |
| PAYEE_ACCOUNT_DIRECT_DEBIT_DISABLED          | Paying bank does not allow Direct Debits on this account.                                                          |
| INSTRUCTION_HAS_EXPIRED                      | Occurs when a service user attempts to convert a DDI which is shown as expired on the paying bank’s database.      |
| PAYER_REFERENCE_NOT_UNIQUE                   | Paying bank has matched the DDI to an existing DDI with a similar reference that has more or fewer characters.     |
| PAYER_CANCELLED_DDI                          | Paying bank has cancelled the DDI.                                                                                 |

#### MandateCancellationReasons

| Reason code              | Description                                                                                                           |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------|
| CANCELLED_BY_INSTITUTION | Institution cancelled - refer to payer. Paying bank has cancelled instruction.                                        |
| CANCELLED_BY_PAYER       | Instruction cancelled by payer. Payer has instructed the paying bank to cancel the DirectDebit Instruction (Mandate). |
| PAYER_DECEASED           | Payer deceased                                                                                                        |
| ACCOUNT_CLOSED           | Account closed. Payer has closed their account for an unknown reason.                                                 |

#### MandateAmendmentReasons

| Reason code              | Description                                                                                                           |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------|
| ACCOUNT_TRANSFERED       | Mandate amended due to account transfer.                                                                              |
| INSTRUCTION_AMENDED      | Mandate amended.                                                                                                      |  

#### OutboundCancelReasons

| Reason code                               | Additional information required | Reason originator name required | Description                             |
|:------------------------------------------|:--------------------------------|---------------------------------|-----------------------------------------|
| DUPLICATE_PAYMENT                         | No                              | No                              | Duplicate payment.                      |
| WRONG_IBAN                                | Yes                             | Yes                             | Wrong Bank account address.             |
| WRONG_AMOUNT                              | Yes                             | Yes                             | Wrong amount.                           |
| FRAUDULENT_ORIGINAL_CREDIT_TRANSFER       | Yes                             | No                              | Fraudulent original credit transfer.    |
| TECHNICAL_PROBLEM                         | No                              | No                              | Technical problem.                      |
| REQUESTED_BY_CUSTOMER                     | Yes                             | Yes                             | Requested by customer.                  |

### BankProvider

| Provider code         | Description  |
|:----------------------|:-------------|
| CENTROLINK            | CENTROlink.  |
| STARLING              | Starling.    |
| CLEARBANK             | ClearBank.   |
| OPENPAYD              | OpenPayd.    |
| FREEMARKET            | FreeMarket.  |
| CLEARBANK_MCCY  | ClearBank Multicurrency. |

### CompanyTypes

| Company type                | Description            |
|:----------------------------|:-----------------------|
| TYPE_LIMITED_LIABILITY      | Limited liability      |
| TYPE_PARTNERSHIP            | Partnership            |
| TYPE_PUBLIC_LIMITED_COMPANY | Public company         |
| TYPE_JOINT_STOCK_COMPANY    | Joint stock company    |
| TYPE_CHARITY                | Charity                |

### Beneficiary
#### Types
| Type              | Description                                 |
|:------------------|:--------------------------------------------|
| INDIVIDUAL        | Individual account.                         |
| COMPANY           | Company account.                            |

### API Errors

| Error code | Error message                                                                                  |
|:-----------|:-----------------------------------------------------------------------------------------------|
| 1          | Invalid request                                                                                |
| 2          | Client not found                                                                               |
| 3          | Integration account not found                                                                  |
| 4          | Amount limit exceeded                                                                          |
| 5          | Currency not supported                                                                         |
| 6          | Bank account address not found                                                                 |
| 7          | Outbound transfers disabled for bank account                                                   |
| 8          | Bank account is closed                                                                         |
| 9          | Cannot reverse inbound transaction                                                             |
| 10         | Transaction not found                                                                          |
| 11         | Invalid transaction status for return                                                          |
| 12         | Only pending direct debit transaction status can be updated.                                   |
| 13         | Internal system error.                                                                         |
| 14         | Currency not active.                                                                           |
| 15         | Currency not found.                                                                            |
| 16         | Client authentication required.                                                                |
| 17         | Mandate not found.                                                                             |
| 18         | Mandate already canceled.                                                                      |
| 19         | Iban or account number and sort code pair must be provided                                     |
| 20         | Only iban or only account number and sort code pair must be provided                           |
| 21         | Iban is required                                                                               |
| 22         | Scheme not supported                                                                           |
| 23         | Country not found                                                                              |
| 24         | Invalid account number                                                                         |
| 25         | Insufficient funds                                                                             |
| 28         | Functionality not supported                                                                    |
| 26         | Bic is required                                                                                |
| 27         | Cannot return outbound transaction                                                             |
| 29         | Not authorized                                                                                 |
| 30         | Return reason is not supported by bank provider.                                               |
| 31         | Invalid transaction's cancel request's type.                                                   |
| 32         | Invalid transaction's cancel request's status.                                                 |
| 33         | Transaction cancel not found.                                                                  |
| 34         | Cancel instruction's transaction's type is not inbound.                                        |
| 35         | Cancel instruction is already expired.                                                         |
| 36         | Failed to handle request due to not being able to acquire lock.                                |
| 37         | Reference field is missing                                                                     |
| 38         | Cancel instruction already exists.                                                             |
| 39         | Transaction is already returned.                                                               |
| 40         | Additional information is required, due to selected reason code.                               |
| 41         | Reason originator name is required, due to selected reason code.                               |
| 42         | Reason code is required                                                                        |
| 43         | You are not allowed to cancel local transfer.                                                  |
| 44         | Invalid account number or sort code.                                                           |
| 45         | Payment accepted                                                                               |
| 46         | Payment rejected                                                                               |
| 47         | Debit payment disabled                                                                         |
| 48         | Request reference already exists                                                               |
| 49         | Destination details note is invalid. Max 35 characters are allowed.                            |
| 50         | All details are empty, please fill in data that you want to update.                            |
| 51         | We were unable to get holder data.                                                             |
| 52         | Bank account address is not type of business.                                                  |
| 53         | Bank account address is type of business.                                                      |
| 54         | Provider not available at this time.                                                           |
| 55         | Request reference or transaction id must be provided.                                          |
| 56         | Notification not found                                                                         |
| 57         | Bank account is not valid client account                                                       |
| 58         | Mandate service user number and reference is already in use, please use a different reference. |
| 59         | Invalid mandate                                                                                |
| 60         | Reason is not supported by bank provider                                                       |
| 61         | Destination account name is required                                                           |
| 62         | Destination account last name is required                                                      |
| 63         | Destination details are required                                                               |
| 64         | Destination details country is required                                                        |
| 65         | Destination details city is required                                                           |
| 66         | Destination details address is required                                                        |
| 67         | Destination details postal code is required                                                    |
| 68         | Destination details note is required                                                           |
| 69         | Invalid beneficiary                                                                            |
| 70         | Email already used                                                                             |
| 71         | Email and mobile already used                                                                  |
| 72         | Mobile already used                                                                            |
| 73         | Validation error                                                                               |
| 74         | Account holder not found                                                                       |
| 75         | Company already registered                                                                     |
| 76         | Mandate originator name is too long                                                            |
| 77         | Destination bank account address does not support selected payment scheme                      |
| 78         | Invalid destination bank account address                                                       |
| 10001      | This value is not a valid datetime.                                                            |
| 10002      | This value is not a valid date.                                                                |
| 10003      | This collection should contain less elements.                                                  |
| 10004      | This collection should contain more elements.                                                  |
| 10005      | This field was not expected.                                                                   |
| 10006      | This field is missing.                                                                         |
| 10007      | You must select at most {{ limit }} choices.                                                   |
| 10008      | You must select at least {{ limit }} choices.                                                  |
| 10009      | One or more of the given values is invalid.                                                    |
| 10010      | This value should be blank.                                                                    |
| 10011      | This value should be a multiple of {{ compared_value }}.                                       |
| 10012      | This value is not a valid email address.                                                       |
| 10013      | This value should be equal to {{ compared_value }}.                                            |
| 10014      | This value is not valid.                                                                       |
| 10015      | This value should be greater.                                                                  |
| 10016      | This value should be greater than or equal to {{ compared_value }}.                            |
| 10017      | This is not a valid International Bank Account Number (IBAN).                                  |
| 10018      | This value should be identical to {{ compared_value_type }} {{ compared_value }}.              |
| 10019      | This value is too short.                                                                       |
| 10020      | This value is too long.                                                                        |
| 10021      | This value does not match the expected charset.                                                |
| 10022      | This value should be less.                                                                     |
| 10023      | This value should be less than or equal to {{ compared_value }}.                               |
| 10024      | This value should not be blank.                                                                |
| 10025      | This value should not be equal to {{ compared_value }}.                                        |
| 10026      | This value should not be identical to {{ compared_value_type }} {{ compared_value }}.          |
| 10027      | This value should not be null.                                                                 |
| 10028      | This value should be a valid number.                                                           |
| 10029      | This value should be smaller.                                                                  |
| 10030      | This value should be bigger.                                                                   |
| 10031      | This value is not a valid time.                                                                |
| 10032      | Invalid type.                                                                                  |
| 10033      | This is not a valid Business Identifier Code (BIC).                                            |
