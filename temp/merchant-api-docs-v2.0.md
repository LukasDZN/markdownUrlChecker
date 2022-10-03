# Introduction

## Overview

Before making any API call, please check
either [`Authentication (Non encrypted)`](#appendix--security--authentication-non-encrypted)
or [`Authentication (Encrypted)`](#appendix--security--authentication-encrypted) section depending on your
configuration.
</br></br>
For failed API request response structure,
check the [`Failed API response`](#appendix--type--example--failedapiresponse)
example.

## Version

To see the current version and details of recent changes, please refer to [`Changelog`](#appendix--changelog).

# Endpoints

## Bank Transfer

### Withdrawal

#### Bulk

| URL                                    | Method |
|:---------------------------------------|:-------|
| /api/v2/bank-transfers/bulk-withdrawal | POST   |

##### Request

| Parameter     | Type                                                                                 | M   | Description             |
|:--------------|:-------------------------------------------------------------------------------------|:----|:------------------------|
| bankTransfers | [`BankTransfer`](#appendix--type--action--bank-transfer--withdrawal--banktransfer)[] | Y   | List of bank transfers. |

```json
{
  "bankTransfers": [
    {
      "money": {
        "minorUnits": "1200",
        "currencyCode": "GBP"
      },
      "debtor": {
        "accountId": "7220887",
        "iban": "GB77777777777777777",
        "accountNumber": "77777777",
        "sortCode": "777777"
      },
      "creditor": {
        "name": "Anthony Jones",
        "iban": null,
        "accountNumber": "88888888",
        "sortCode": "777777",
        "type": 2,
        "industryId": "1",
        "address": "American street 31",
        "city": "London",
        "countryAlphaThreeCode": "GBR",
        "postal": "45687"
      },
      "messageForCreditor": "For lunch.",
      "withdrawPurposeCode": "ATS",
      "reference": "123456789123456789",
      "schemes": [
        "FPS",
        "CHAPS"
      ],
      "requestReference": "0386ea34-5f63-4f56-a06f-25fa",
      "clientTag": null
    },
    {
      "money": {
        "minorUnits": "65422",
        "currencyCode": "GBP"
      },
      "debtor": {
        "accountId": "7220887",
        "iban": null,
        "accountNumber": "77777777",
        "sortCode": "777777"
      },
      "creditor": {
        "name": "Anthony Jones",
        "iban": "GB888888888888888",
        "accountNumber": null,
        "sortCode": null,
        "type": 2,
        "industryId": "1",
        "address": "American street 31",
        "city": "London",
        "countryAlphaThreeCode": "GBR",
        "postal": "45687"
      },
      "messageForCreditor": "Salary",
      "withdrawPurposeCode": "ATS",
      "reference": "12345678912345541",
      "schemes": null,
      "requestReference": "1486ea34-5f53-4f59-a06f-2fad",
      "clientTag": null
    }
  ]
}
```

##### Response

###### Success

| HTTP status |
|-------------|
| 201         |

| Parameter | Type   | Length  | M   | Description                                                                                                                                                                                                                                                                  |
|:----------|:-------|---------|:----|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| requestId | string | 1 - 255 | Y   | Your request header's 'X-REQUEST-ID' value. You will be able to see it in [`Bulk Withdrawal ('requestId' param)`](#webhooks--bank-transfer--bulk-withdrawal) or [`Bank Transfer Withdrawal ('bulkWithdrawRequestId' param)`](#webhooks--bank-transfer--withdrawal) webhooks. |

```json
{
  "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466"
}
```

# Webhooks

Abstract format for all webhooks.

| Parameter | Type   | Length  | M   | Description                   |
|:----------|:-------|:--------|:----|:------------------------------|
| type      | string | 1 - 255 | Y   | Name of the webhook type.     |
| version   | string | 1 - 255 | Y   | Version of webhook.           |
| data      | Object | -       | Y   | Data object for webhook type. |

```json
{
  "type": "ExampleWebhook",
  "version": "V2",
  "data": {
    "webhookName": "Example webhook",
    "isWebhook": true
  }
}
```

## Bank Transfer

### Withdrawal

#### Settled

| Parameter | Type                                                                                                                      | Length | Description |
|:----------|:--------------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                                    | 255    |             |
| version   | string                                                                                                                    | 255    |             |
| data      | See [`BankTransferWithdrawalSettled`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferwithdrawalsettled) | -      |             |

```json
{
  "type": "BankTransferWithdrawalSettled",
  "version": "V2",
  "data": {
    "transactionId": "16414959813782",
    "money": {
      "minorUnits": "1200",
      "currencyCode": "GBP"
    },
    "debtor": {
      "accountId": "7220887",
      "name": "John Joe",
      "iban": "GB77777777777777777",
      "accountNumber": "77777777",
      "sortCode": "777777",
      "address": "Address 1, Address 2",
      "city": "Test City",
      "countryIsoCode": "826",
      "postal": "Test Postal"
    },
    "creditor": {
      "name": "Anthony Jones",
      "iban": null,
      "accountNumber": "88888888",
      "sortCode": "777777",
      "address": "American street 31",
      "city": "London",
      "countryIsoCode": "826",
      "postal": "45687"
    },
    "transactionStatus": 5,
    "transactionType": 1,
    "transactionScheme": "FPS",
    "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
    "note": "For lunch.",
    "purpose": {
      "code": "ATS",
      "description": "Air transport"
    },
    "transactionIdentifier": null,
    "endToEndIdentifier": null,
    "reference": "123456789123456789",
    "dateInitiated": "2022-01-06 19:06:21",
    "dateSettled": "2022-01-06 19:06:27",
    "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
    "requestReference": "0386ea34-5f63-4f56-a06f-25fa"
  }
}
```

#### Held

| Parameter | Type                                                                                                                | Length | Description |
|:----------|:--------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                              | 255    |             |
| version   | string                                                                                                              | 255    |             |
| data      | See [`BankTransferWithdrawalHeld`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferwithdrawalheld) | -      |             |

```json
{
  "type": "BankTransferWithdrawalHeld",
  "version": "V2",
  "data": {
    "transactionId": "16414959813782",
    "money": {
      "minorUnits": "65422",
      "currencyCode": "GBP"
    },
    "debtor": {
      "accountId": "7220887",
      "name": "John Joe",
      "iban": "GB77777777777777777",
      "accountNumber": "77777777",
      "sortCode": "777777",
      "address": "Address 1, Address 2",
      "city": "Test City",
      "countryIsoCode": "826",
      "postal": "Test Postal"
    },
    "creditor": {
      "name": "Anthony Jones",
      "iban": null,
      "accountNumber": "8888888",
      "sortCode": "777777",
      "address": "American street 31",
      "city": "London",
      "countryIsoCode": "826",
      "postal": "45687"
    },
    "transactionStatus": 10,
    "transactionType": 1,
    "transactionScheme": "CHAPS",
    "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
    "note": "Salary",
    "purpose": {
      "code": "ATS",
      "description": "Air transport"
    },
    "transactionIdentifier": null,
    "endToEndIdentifier": null,
    "reference": "12345678912345541",
    "dateInitiated": "2022-01-06 19:06:21",
    "dateHeld": "2022-01-06 19:06:27",
    "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
    "requestReference": "1486ea34-5f53-4f59-a06f-2fad"
  }
}
```

#### Rejected

| Parameter | Type                                                                                                                        | Length | Description |
|:----------|:----------------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                                      | 255    |             |
| version   | string                                                                                                                      | 255    |             |
| data      | See [`BankTransferWithdrawalRejected`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferwithdrawalrejected) | -      |             |

```json
{
  "type": "BankTransferWithdrawalRejected",
  "version": "V2",
  "data": {
    "transactionId": "16414959813782",
    "money": {
      "minorUnits": "1200",
      "currencyCode": "GBP"
    },
    "debtor": {
      "accountId": "7220887",
      "name": "John Joe",
      "iban": "GB77777777777777777",
      "accountNumber": "77777777",
      "sortCode": "777777",
      "address": "Address 1, Address 2",
      "city": "Test City",
      "countryIsoCode": "826",
      "postal": "Test Postal"
    },
    "creditor": {
      "name": "Anthony Jones",
      "iban": null,
      "accountNumber": "8888888",
      "sortCode": "777777",
      "address": "American street 31",
      "city": "London",
      "countryIsoCode": "826",
      "postal": "45687"
    },
    "transactionStatus": 6,
    "transactionType": 1,
    "transactionScheme": "FPS",
    "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
    "note": "For lunch.",
    "purpose": {
      "code": "ATS",
      "description": "Air transport"
    },
    "transactionIdentifier": null,
    "endToEndIdentifier": null,
    "reference": "123456789123456789",
    "reasonCode":"536",
    "reasonDescription":"Legal decision",
    "bankProviderReasonCode":"MA01",
    "dateInitiated": "2022-01-06 19:06:21",
    "dateRejected": "2022-01-06 19:06:27",
    "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
    "requestReference": "0386ea34-5f63-4f56-a06f-25fxz"
  }
}
```

### Bulk Withdrawal

#### Created

| Parameter | Type                                                                                                                                   | Length | Description |
|:----------|:---------------------------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                                                 | 255    |             |
| version   | string                                                                                                                                 | 255    |             |
| data      | See [`BankTransferBulkWithdrawalCreated`](#appendix--type--webhook--bank-transfer--bulk-withdrawal--banktransferbulkwithdrawalcreated) | -      |             |

```json
{
  "type": "BankTransferBulkWithdrawalCreated",
  "version": "V2",
  "data": {
    "bulkWithdrawalId": "16400016120109",
    "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466"
  }
}
```

#### Processed

| Parameter | Type                                                                                                                                       | Length | Description |
|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                                                     | 255    |             |
| version   | string                                                                                                                                     | 255    |             |
| data      | See [`BankTransferBulkWithdrawalProcessed`](#appendix--type--webhook--bank-transfer--bulk-withdrawal--banktransferbulkwithdrawalprocessed) | -      |             |

```json
{
  "type": "BankTransferBulkWithdrawalProcessed",
  "version": "V2",
  "data": {
    "bulkWithdrawalId": "16400016120109",
    "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466"
  }
}
```

#### Failed

| Parameter | Type                                                                                                                                 | Length | Description |
|:----------|:-------------------------------------------------------------------------------------------------------------------------------------|--------|-------------|
| type      | string                                                                                                                               | 255    |             |
| version   | string                                                                                                                               | 255    |             |
| data      | See [`BankTransferBulkWithdrawalFailed`](#appendix--type--webhook--bank-transfer--bulk-withdrawal--banktransferbulkwithdrawalfailed) | -      |             |

```json
{
  "type": "BankTransferBulkWithdrawalFailed",
  "version": "V2",
  "data": {
    "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
    "errorCode": 11003,
    "errorMessage": "Some transfers didn`t pass validation.",
    "failedBankTransfers": [
      {
        "bulkWithdrawRequestId": null,
        "requestReference": "0386ea34-5f63-4f56-a06f-2f",
        "errorCode": 11006,
        "errorMessage": "Request reference already exists."
      }
    ]
  }
}
```

# Appendix

## Changelog

| Version | Date             | Updates          |
|:--------|:-----------------|:-----------------|
| 2.0.0   | January 06, 2022 | Initial version. |

## Security

### Authentication (Non-encrypted)

#### Action

These headers are mandatory when making API requests.

##### Request header

| Parameter                  | Type    | Length  | M   | Regex pattern               | Description                                                                                                                       |
|:---------------------------|:--------|:--------|:----|-----------------------------|:----------------------------------------------------------------------------------------------------------------------------------|
| X-AUTH-MERCHANT-KEY        | string  | 16      | Y   |                             | Your API key.                                                                                                                     |
| X-AUTH-SIGNATURE           | string  | 128     | Y   |                             | See [`Signature signature hash generating`](#appendix--security--authentication-non-encrypted--action--signature-hash-generating) |
| X-AUTH-SIGNATURE-TIMESTAMP | integer | 10      | Y   |                             | Unix timestamp.                                                                                                                   |
| X-REQUEST-ID               | string  | 1 - 255 | Y   | `/^[0-9a-zA-Z\-]{1,255}+$/` | Unique request ID for each call.                                                                                                  |

##### Signature hash generating

To generate a '`X-AUTH-SIGNATURE`' hash, SHA-512 algorithm must be used.

Data that is hashed should consist of parameters from the request body (in JSON), your '`API secret`', which is used as a prefix, and '`X-AUTH-SIGNATURE-TIMESTAMP`', which is used as a suffix.
</br>
Special separator '`_`' is used to separate these 3 values.
</br>
Hash format - lowercase hexits.

Finally, set your '`X-AUTH-SIGNATURE`' in the request header data.

PHP code example:

```php
    private function generateSignature(string $secretKey, string $jsonData, int $timestamp): string
    {
        return hash('sha512', $secretKey.'_'.$jsonData.'_'.$timestamp);
    }
```

#### Webhook

##### Request header

| Parameter                  | Type    | Length | M   | Description                                                                                                                      |
|:---------------------------|:--------|:-------|:----|:---------------------------------------------------------------------------------------------------------------------------------|
| X-HOOK-SIGNATURE           | string  | 88     | Y   | See [`Webhook signature hash generating`](#appendix--security--authentication-non-encrypted--webhook--signature-hash-generating) |
| X-HOOK-SIGNATURE-TIMESTAMP | integer | 10     | Y   | Unix timestamp.                                                                                                                  |

##### Signature hash generating

To generate a hash that can be compared with the '`X-HOOK-SIGNATURE`', SHA-512 algorithm must be used.

Data that is hashed should consist of parameters from the request body (in JSON), your '`API secret`', which is used as a prefix, and '`X-HOOK-SIGNATURE-TIMESTAMP`', which is used as a suffix.
</br>
Special separator '`_`' is used to separate these 3 values.
</br>
Hash format - binary.

Finally, use base64 encode and compare your data with the '`X-HOOK-SIGNATURE`' request header data. If it does not match,
it is possible that someone is participating in the middle.

PHP code example:

```php
    private function generateWebhookSignature(string $secretKey, string $jsonData, int $timestamp): string
    {
        return base64_encode(
            hash('sha512', $secretKey.'_'.$jsonData.'_'.$timestamp, true)
        );
    }
```

### Authentication (Encrypted)

#### Action

These headers are mandatory when making API requests.

##### Request header

| Parameter                  | Type    | Length  | M   | Regex pattern               | Description                                                                                                                                                                   |
|:---------------------------|:--------|:--------|:----|-----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| X-AUTH-MERCHANT-KEY        | string  | 16      | Y   |                             | Your API key.                                                                                                                                                                 |
| X-AUTH-SIGNATURE           | string  | 684     | Y   |                             | See [`Cryptography for client request`](#appendix--security--authentication-encrypted--cryptography--example--client-api-request) for encrypted signature generation by mode. |
| X-REQUEST-ID               | string  | 1 - 255 | Y   | `/^[0-9a-zA-Z\-]{1,255}+$/` | Unique request ID for each call.                                                                                                                                              |

##### Response header

| Parameter                  | Type    | Length | M   | Description                                                                                                                                                                         |
|:---------------------------|:--------|:-------|:----|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| X-AUTH-SIGNATURE           | string  | 684    | Y   | See [`Cryptography for client request`](#appendix--security--authentication-encrypted--cryptography--example--client-api-request) how to decrypt from signature by encryption mode. |

#### Webhook

##### Request header

| Parameter                  | Type    | Length | M   | Description                                                                                                                                                                       |
|:---------------------------|:--------|:-------|:----|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| X-HOOK-SIGNATURE           | string  | 684    | Y   | See [`Cryptography for webhook request`](#appendix--security--authentication-encrypted--cryptography--example--webhook-request) how to decrypt from signature by encryption mode. |
| X-HOOK-SIGNATURE-TIMESTAMP | integer | 10     | Y   | Unix timestamp.                                                                                                                                                                   |

#### Cryptography

If encryption is enabled, the request and response will be encrypted.
</br>
Some clients do not have a possibility to encrypt by using [`Encryption mode 1 - encrypt with RSA private key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-1--encrypt-with-rsa-private-key). 
To cover these cases, [`Encryption mode 2 - encrypt with RSA public key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-2--encrypt-with-rsa-public-key) configuration has been implemented.
</br>

##### Example - Client API request

<img src="mapi_encryption.png" alt="MAPI encryption scheme" style="max-width:800px; height:auto;">

Request data must be encrypted with the client's private key
(see [`Encryption mode 1 - encrypt with RSA private key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-1--encrypt-with-rsa-private-key))
or the %brandName% public key if MODE 2 is configured (see [`Encryption mode 2 - encrypt with RSA public key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-2--encrypt-with-rsa-public-key)).
</br>
Response data will be encrypted with the %brandName% private key 
(see [`Encryption mode 1 - encrypt with RSA private key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-1--encrypt-with-rsa-private-key)) 
or the client's public key if MODE 2 is configured (see [`Encryption mode 2 - encrypt with RSA public key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-2--encrypt-with-rsa-public-key)).
</br>
Encrypted request/response body should be plain text.


##### Example - Webhook request

<img src="mapi_webhook_encryption.png" alt="MAPI webhook encryption scheme" style="max-width:800px; height:auto;">

Request data will be encrypted with the %brandName% private key
(see [`Encryption mode 1 - encrypt with RSA private key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-1--encrypt-with-rsa-private-key))
or the client's public key if MODE 2 is configured (see [`Encryption mode 2 - encrypt with RSA public key`](#appendix--security--authentication-encrypted--cryptography--encryption-mode-2--encrypt-with-rsa-public-key)).
</br>
On response, 200 HTTP code should be returned. Otherwise, if 4XX-5XX HTTP code is returned - the webhook resend will be initiated.
</br>
Encrypted request body will be plain text.


##### Encryption Mode 1 - encrypt with RSA private key

###### Encryption algorithm

```php
   function encrypt(string $privateKey, array $requestData): array
    {
        $secret = 'RandomString32CharactersLength12'; // must be 32 characters
        openssl_private_encrypt($secret, $temp, $privateKey);
        $sign = base64_encode($temp);

        $rb = bin2hex(random_bytes(8));
        $encryptedRequest = $rb.base64_encode(openssl_encrypt(json_encode($requestData), 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $rb));

        return [
            'sign' => $sign,
            'encryptedRequest' => $encryptedRequest,
        ];
    }

    // usage
    $encrypted = encrypt($privateKey, $requestData);
    // add $encrypted['sign'] to the request header as 'X-AUTH-SIGNATURE'
    // set $encrypted['encryptedRequest'] to the request body.
```

###### Decryption algorithm

```php
   function decryptSecret(string $sign, string $publicKey): string
    {
        openssl_public_decrypt(base64_decode($sign), $secret, $publicKey);

        return $secret;
    }

    function decryptContent(string $secret, string $content): string
    {
        $iv = substr($content, 0, 16);
        $originalData = base64_decode(substr($content, 16));

        return openssl_decrypt($originalData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
    }

    //usage
    $secret = decryptSecret($sign, $publicKey);
    $decryptedResponse = decryptContent($secret, $encryptedResponse);
```

##### Encryption Mode 2 - encrypt with RSA public key

###### Encryption algorithm

```php
    function encrypt(string $publicKey, array $requestData): array
    {
        $secret = 'RandomString32CharactersLength12'; // must be 32 characters
        openssl_public_encrypt($secret, $temp, $publicKey);
        $sign = base64_encode($temp);

        $rb = bin2hex(random_bytes(8));
        $encryptedRequest = $rb.base64_encode(openssl_encrypt(json_encode($requestData), 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $rb));

        return [
            'sign' => $sign,
            'encryptedRequest' => $encryptedRequest,
        ];
    }

    // usage
    $encrypted = encrypt($publicKey, $requestData);
    // add $encrypted['sign'] to the request header as 'X-AUTH-SIGNATURE'
    // set $encrypted['encryptedRequest'] to the request body.
```

###### Decryption algorithm

```php
    function decryptSecret(string $sign, string $privateKey): string
    {
        openssl_private_decrypt(base64_decode($sign), $secret, $privateKey);

        return $secret;
    }

    function decryptContent(string $secret, string $content): string
    {
        $iv = substr($content, 0, 16);
        $originalData = base64_decode(substr($content, 16));

        return openssl_decrypt($originalData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
    }

    //usage
    $secret = decryptSecret($sign, $privateKey);
    $decryptedResponse = decryptContent($secret, $encryptedResponse);
```

## Type

### Action

#### Bank transfer

##### Withdrawal

###### BankTransfer

| Parameter           | Type                                                                                               | Length  | M   | Regex pattern        | Description                                                                                                                     |
|:--------------------|:---------------------------------------------------------------------------------------------------|---------|:----|----------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| money               | [`Money`](#appendix--type--action--money)                                                          | -       | Y   |                      |                                                                                                                                 |
| debtor              | [`BankTransferDebtor`](#appendix--type--action--bank-transfer--withdrawal--banktransferdebtor)     | -       | Y   |                      |                                                                                                                                 |
| creditor            | [`BankTransferCreditor`](#appendix--type--action--bank-transfer--withdrawal--banktransfercreditor) | -       | Y   |                      |                                                                                                                                 |
| messageForCreditor  | string &#124; null                                                                                 | 0 - 140 | N   |                      | For some providers can contain a maximum of 35 characters.                                                                      |
| withdrawPurposeCode | string &#124; null                                                                                 | 1 - 4   | N   |                      | Check [`Withdraw purpose codes`](#appendix--enum--bank-transfer--withdrawal-purpose-code) list.                                 |
| reference           | string &#124; null                                                                                 | 0 - 18  | N   |                      | Bank reference.                                                                                                                 |
| schemes             | string[] &#124; null                                                                               | -       | N   |                      | Check [`Bank transfer available schemes`](#appendix--type--action--bank-transfer--withdrawal--availablewithdrawalschemes) list. |
| requestReference    | string                                                                                             | 1 - 255 | Y   | /^[0-9a-zA-Z\-\ ]+$/ |                                                                                                                                 |
| clientTag           | string &#124; null                                                                                 | 0 - 50  | N   | /^[0-9a-zA-Z\-]+$/   | Use it only if you contacted business for its purpose.                                                                          |

Example:

```json
{
  "money": {
    "minorUnits": "1200",
    "currencyCode": "GBP"
  },
  "debtor": {
    "accountId": "7220887",
    "iban": "GB77777777777777777",
    "accountNumber": "77777777",
    "sortCode": "777777"
  },
  "creditor": {
    "name": "Anthony Jones",
    "iban": null,
    "accountNumber": "88888888",
    "sortCode": "777777",
    "type": 2,
    "industryId": "1",
    "address": "American street 31",
    "city": "London",
    "countryAlphaThreeCode": "GBR",
    "postal": "45687"
  },
  "messageForCreditor": "For lunch.",
  "withdrawPurposeCode": "ATS",
  "reference": "123456789123456789",
  "schemes": [
    "FPS",
    "CHAPS"
  ],
  "requestReference": "0386ea34-5f63-4f56-a06f-25f",
  "clientTag": null
}
```

###### BankTransferDebtor

| Parameter     | Type               | Length | M   | Description                                                  |
|:--------------|:-------------------|:-------|-----|:-------------------------------------------------------------|
| accountId     | string &#124; null | 1 - 20 | N   |                                                              |
| iban          | string &#124; null | 1 - 34 | C   | Must be provided if 'accountNumber' and 'sortCode' are null. |
| accountNumber | string &#124; null | 6 - 26 | C   | Must be provided if 'iban' is null.                          |
| sortCode      | string &#124; null | 6 - 6  | C   | Must be provided if 'iban' is null.                          |

Example:

```json
{
  "accountId": "7220887",
  "iban": "GB77777777777777777",
  "accountNumber": "77777777",
  "sortCode": "777777"
}
```

###### BankTransferCreditor

| Parameter             | Type                | Length | M   | Description                                                                                      |
|:----------------------|:--------------------|:-------|-----|:-------------------------------------------------------------------------------------------------|
| name                  | integer             | 1 - 40 | Y   |                                                                                                  |
| iban                  | string &#124; null  | 1 - 34 | C   | Must be provided if 'accountNumber' and 'sortCode' are null.                                     |
| accountNumber         | string &#124; null  | 6 - 26 | C   | Must be provided if 'iban' is null.                                                              |
| sortCode              | string &#124; null  | 6 - 6  | C   | Must be provided if 'iban' is null.                                                              |
| type                  | integer &#124; null | 1 - 1  | N   | Party type. 1 - individual. 2 - business.                                                        |
| industryId            | string &#124; null  | 1 - 20 | C   | Can be passed only for business type. Next, API endpoint for retrieving industries will be done. |
| address               | string &#124; null  | 0 - 70 | N   |                                                                                                  |
| city                  | string &#124; null  | 0 - 20 | N   |                                                                                                  |
| countryAlphaThreeCode | string &#124; null  | 3 - 3  | N   | 'ISO 3166-1' country code.                                                                       |
| postal                | string &#124; null  | 0 - 20 | N   |                                                                                                  |

Example:

```json
{
  "name": "Anthony Jones",
  "iban": null,
  "accountNumber": "88888888",
  "sortCode": "777777",
  "type": 2,
  "industryId": "1",
  "address": "American street 31",
  "city": "London",
  "countryAlphaThreeCode": "GBR",
  "postal": "45687"
}
```

###### AvailableWithdrawalSchemes

| Value | Description                   |
|:------|:------------------------------|
| FPS   | Faster payments.              |
| CHAPS | Chaps.                        |
| BACS  | Bacs.                         |
| SCT   | SEPA credit transfer.         |
| SCTI  | SEPA instant credit transfer. |

#### Money

| Parameter    | Type   | Length | M   | Description                                   |
|:-------------|:-------|--------|:----|-----------------------------------------------|
| minorUnits   | string | 1 - 20 | Y   | Value of money in minor units.                |
| currencyCode | string | 3 - 11 | Y   | 'ISO 4217' currency code for FIAT currencies. |

Example:

```json
{
  "minorUnits": "1200",
  "currencyCode": "GBP"
}
```

### Webhook

#### Bank transfer

##### Withdrawal

###### BankTransferWithdrawalSettled

| Parameter             | Type                                                                                                | Length  | M   | Description                                                                                                                                                    |
|:----------------------|:----------------------------------------------------------------------------------------------------|---------|:----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId         | string                                                                                              | 1 - 20  | Y   |                                                                                                                                                                |
| money                 | [`Money`](#appendix--type--webhook--money)                                                          | -       | Y   |                                                                                                                                                                |
| debtor                | [`BankTransferDebtor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferdebtor)     | -       | Y   |                                                                                                                                                                |
| creditor              | [`BankTransferCreditor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransfercreditor) | -       | Y   |                                                                                                                                                                |
| transactionStatus     | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer statuses`](#appendix--enum--bank-transfer--status)                                                                                         |
| transactionType       | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer types`](#appendix--enum--bank-transfer--type)                                                                                              |
| transactionScheme     | string &#124; null                                                                                  | 1 - 100 | N   | See [`Bank transfer schemes`](#appendix--enum--bank-transfer--scheme)                                                                                          |
| description           | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |
| note                  | string &#124; null                                                                                  | 0 - 140 | N   | Note for a creditor.                                                                                                                                           |
| purpose               | [`Purpose`](#appendix--type--webhook--bank-transfer--withdrawal--purpose)                           | 1 - 4   | N   |                                                                                                                                                                |
| transactionIdentifier | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction identifier.                                                                                                                                   |
| endToEndIdentifier    | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction end to end identifier.                                                                                                                        |
| reference             | string &#124; null                                                                                  | 0 - 18  | N   | Bank reference.                                                                                                                                                |
| dateInitiated         | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| dateSettled           | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| bulkWithdrawRequestId | string &#124; null                                                                                  | 1 - 255 | N   | Your request header's 'X-REQUEST-ID' value. If bank transfer has been created via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |
| requestReference      | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |

Example:

```json
{
  "transactionId": "16414959813782",
  "money": {
    "minorUnits": "1200",
    "currencyCode": "GBP"
  },
  "debtor": {
    "accountId": "7220887",
    "name": "John Joe",
    "iban": "GB77777777777777777",
    "accountNumber": "77777777",
    "sortCode": "777777",
    "address": "Address 1, Address 2",
    "city": "Test City",
    "countryIsoCode": "826",
    "postal": "Test Postal"
  },
  "creditor": {
    "name": "Anthony Jones",
    "iban": null,
    "accountNumber": "88888888",
    "sortCode": "777777",
    "address": "American street 31",
    "city": "London",
    "countryIsoCode": "826",
    "postal": "45687"
  },
  "transactionStatus": 5,
  "transactionType": 1,
  "transactionScheme": "FPS",
  "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
  "note": "For lunch.",
  "purpose": {
    "code": "ATS",
    "description": "Air transport"
  },
  "transactionIdentifier": null,
  "endToEndIdentifier": null,
  "reference": "123456789123456789",
  "dateInitiated": "2022-01-06 19:06:21",
  "dateSettled": "2022-01-06 19:06:27",
  "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
  "requestReference": "0386ea34-5f63-4f56-a06f-25fxz"
}
```

###### BankTransferWithdrawalHeld

| Parameter             | Type                                                                                                | Length  | M   | Description                                                                                                                                                    |
|:----------------------|:----------------------------------------------------------------------------------------------------|---------|:----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId         | string                                                                                              | 1 - 20  | Y   |                                                                                                                                                                |
| money                 | [`Money`](#appendix--type--webhook--money)                                                          | -       | Y   |                                                                                                                                                                |
| debtor                | [`BankTransferDebtor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferdebtor)     | -       | Y   |                                                                                                                                                                |
| creditor              | [`BankTransferCreditor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransfercreditor) | -       | Y   |                                                                                                                                                                |
| transactionStatus     | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer statuses`](#appendix--enum--bank-transfer--status)                                                                                         |
| transactionType       | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer types`](#appendix--enum--bank-transfer--type)                                                                                              |
| transactionScheme     | string &#124; null                                                                                  | 1 - 100 | N   | See [`Bank transfer schemes`](#appendix--enum--bank-transfer--scheme)                                                                                          |
| description           | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |
| note                  | string &#124; null                                                                                  | 0 - 140 | N   | Note for a creditor.                                                                                                                                           |
| purpose               | [`Purpose`](#appendix--type--webhook--bank-transfer--withdrawal--purpose)                           | 1 - 4   | N   |                                                                                                                                                                |
| transactionIdentifier | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction identifier.                                                                                                                                   |
| endToEndIdentifier    | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction end to end identifier.                                                                                                                        |
| reference             | string &#124; null                                                                                  | 0 - 18  | N   | Bank reference.                                                                                                                                                |
| dateInitiated         | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| dateHeld              | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| bulkWithdrawRequestId | string &#124; null                                                                                  | 1 - 255 | N   | Your request header's 'X-REQUEST-ID' value. If bank transfer has been created via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |
| requestReference      | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |

Example:

```json
{
  "transactionId": "16414959813782",
  "money": {
    "minorUnits": "1200",
    "currencyCode": "GBP"
  },
  "debtor": {
    "accountId": "7220887",
    "name": "John Joe",
    "iban": "GB77777777777777777",
    "accountNumber": "77777777",
    "sortCode": "777777",
    "address": "Address 1, Address 2",
    "city": "Test City",
    "countryIsoCode": "826",
    "postal": "Test Postal"
  },
  "creditor": {
    "name": "Anthony Jones",
    "iban": null,
    "accountNumber": "88888888",
    "sortCode": "777777",
    "address": "American street 31",
    "city": "London",
    "countryIsoCode": "826",
    "postal": "45687"
  },
  "transactionStatus": 10,
  "transactionType": 1,
  "transactionScheme": "FPS",
  "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
  "note": "For lunch.",
  "purpose": {
    "code": "ATS",
    "description": "Air transport"
  },
  "transactionIdentifier": null,
  "endToEndIdentifier": null,
  "reference": "123456789123456789",
  "dateInitiated": "2022-01-06 19:06:21",
  "dateHeld": "2022-01-06 19:06:27",
  "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
  "requestReference": "0386ea34-5f63-4f56-a06f-25fxz"
}
```

###### BankTransferWithdrawalRejected

| Parameter              | Type                                                                                                | Length  | M   | Description                                                                                                                                                    |
|:-----------------------|:----------------------------------------------------------------------------------------------------|---------|:----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId          | string                                                                                              | 1 - 20  | Y   |                                                                                                                                                                |
| money                  | [`Money`](#appendix--type--webhook--money)                                                          | -       | Y   |                                                                                                                                                                |
| debtor                 | [`BankTransferDebtor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferdebtor)     | -       | Y   |                                                                                                                                                                |
| creditor               | [`BankTransferCreditor`](#appendix--type--webhook--bank-transfer--withdrawal--banktransfercreditor) | -       | Y   |                                                                                                                                                                |
| transactionStatus      | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer statuses`](#appendix--enum--bank-transfer--status)                                                                                         |
| transactionType        | integer                                                                                             | 1 - 6   | Y   | See [`Bank transfer types`](#appendix--enum--bank-transfer--type)                                                                                              |
| transactionScheme      | string &#124; null                                                                                  | 1 - 100 | N   | See [`Bank transfer schemes`](#appendix--enum--bank-transfer--scheme)                                                                                          |
| description            | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |
| note                   | string &#124; null                                                                                  | 0 - 140 | N   | Note for a creditor.                                                                                                                                           |
| purpose                | [`Purpose`](#appendix--type--webhook--bank-transfer--withdrawal--purpose)                           | 1 - 4   | N   |                                                                                                                                                                |
| transactionIdentifier  | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction identifier.                                                                                                                                   |
| endToEndIdentifier     | string &#124; null                                                                                  | 0 - 100 | N   | Bank transaction end to end identifier.                                                                                                                        |
| reference              | string &#124; null                                                                                  | 0 - 18  | N   | Bank reference.                                                                                                                                                |
| reasonCode             | string &#124; null                                                                                  | 0 - 3   | N   | Check [`Reason codes list`](#appendix--enum--reason-code).                                                                                                     |
| reasonDescription      | string &#124; null                                                                                  | 0 - 255 | N   | Description of reason. In bank error cases, the reason might be different from what you see next to the reason code.                                           |
| bankProviderReasonCode | string &#124; null                                                                                  | 0 - 255 | N   | Reason code provided by bank provider.                                                                                                                         |
| dateInitiated          | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| dateRejected           | string                                                                                              | 25 - 25 | Y   | 'ISO 8601' datetime format.                                                                                                                                    |
| bulkWithdrawRequestId  | string &#124; null                                                                                  | 1 - 255 | N   | Your request header's 'X-REQUEST-ID' value. If bank transfer has been created via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |
| requestReference       | string                                                                                              | 1 - 255 | Y   |                                                                                                                                                                |

Example:

```json
{
  "transactionId": "16414959813782",
  "money": {
    "minorUnits": "1200",
    "currencyCode": "GBP"
  },
  "debtor": {
    "accountId": "7220887",
    "name": "John Joe",
    "iban": "GB77777777777777777",
    "accountNumber": "77777777",
    "sortCode": "777777",
    "address": "Address 1, Address 2",
    "city": "Test City",
    "countryIsoCode": "826",
    "postal": "Test Postal"
  },
  "creditor": {
    "name": "Anthony Jones",
    "iban": null,
    "accountNumber": "88888888",
    "sortCode": "777777",
    "address": "American street 31",
    "city": "London",
    "countryIsoCode": "826",
    "postal": "45687"
  },
  "transactionStatus": 6,
  "transactionType": 1,
  "transactionScheme": "FPS",
  "description": "Transfer from Account (7220887) to Bank Account (account number - 88888888, sort code - 777777)",
  "note": "For lunch.",
  "purpose": {
    "code": "ATS",
    "description": "Air transport"
  },
  "transactionIdentifier": null,
  "endToEndIdentifier": null,
  "reference": "123456789123456789",
  "reasonCode":"536",
  "reasonDescription":"Legal decision",
  "bankProviderReasonCode":"MA01",
  "dateInitiated": "2022-01-06 19:06:21",
  "dateRejected": "2022-01-06 19:06:27",
  "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
  "requestReference": "0386ea34-5f63-4f56-a06f-25fxz"
}
```

###### BankTransferWithdrawalFailedValidation

| Parameter             | Type               | Length  | M   | Description                                                                                                                                                    |
|:----------------------|:-------------------|:--------|-----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| bulkWithdrawRequestId | string &#124; null | 1 - 255 | N   | Your request header's 'X-REQUEST-ID' value. If bank transfer has been created via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |
| requestReference      | string             | 1 - 255 | Y   |                                                                                                                                                                |
| errorCode             | integer            | 1 - 20  | Y   | Check [`Error codes list`](#appendix--enum--error-code).                                                                                                       |
| errorMessage          | string             | 1 - *   | Y   |                                                                                                                                                                |

Example:

```json
{
  "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
  "requestReference": "0386ea34-5f63-4f56-a06f-2f",
  "errorCode": 11006,
  "errorMessage": "Request reference already exists."
}
```

###### BankTransferDebtor

| Parameter      | Type               | Length  | M   | Description                        |
|:---------------|:-------------------|:--------|-----|:-----------------------------------|
| accountId      | string             | 1 - 20  | Y   |                                    |
| name           | string             | 1 - 255 | Y   |                                    |
| iban           | string &#124; null | 1 - 34  | C   |                                    |
| accountNumber  | string &#124; null | 6 - 26  | C   |                                    |
| sortCode       | string &#124; null | 6 - 6   | C   |                                    |
| address        | string &#124; null | 0 - 280 | C   |                                    |
| city           | string &#124; null | 0 - 20  | C   |                                    |
| countryIsoCode | string &#124; null | 3 - 3   | C   | 'ISO 3166-1' numeric country code. |
| postal         | string &#124; null | 0 - 20  | C   |                                    |

Example:

```json
{
  "accountId": "7220887",
  "name": "John Joe",
  "iban": "GB77777777777777777",
  "accountNumber": "77777777",
  "sortCode": "777777",
  "address": "Address 1, Address 2",
  "city": "Test City",
  "countryIsoCode": "826",
  "postal": "Test Postal"
}
```

###### BankTransferCreditor

| Parameter      | Type               | Length  | M   | Description                        |
|:---------------|:-------------------|:--------|-----|:-----------------------------------|
| name           | string             | 1 - 255 | Y   |                                    |
| iban           | string &#124; null | 1 - 34  | C   |                                    |
| accountNumber  | string &#124; null | 6 - 26  | C   |                                    |
| sortCode       | string &#124; null | 6 - 6   | C   |                                    |
| address        | string &#124; null | 0 - 70  | N   |                                    |
| city           | string &#124; null | 0 - 20  | N   |                                    |
| countryIsoCode | string &#124; null | 3 - 3   | N   | 'ISO 3166-1' numeric country code. |
| postal         | string &#124; null | 0 - 20  | N   |                                    |

Example:

```json
{
  "name": "Anthony Jones",
  "iban": null,
  "accountNumber": "8888888",
  "sortCode": "777777",
  "address": "American street 31",
  "city": "London",
  "countryIsoCode": "826",
  "postal": "45687"
}
```

###### Purpose

| Parameter   | Type   | Length | M   | Description                                                                                     |
|:------------|:-------|:-------|-----|:------------------------------------------------------------------------------------------------|
| code        | string | 1 - 4  | Y   | Check [`Withdraw purpose codes`](#appendix--enum--bank-transfer--withdrawal-purpose-code) list. |
| description | string | 1 - *  | Y   |                                                                                                 |

Example:

```json
{
  "code": "ATS",
  "description": "Air transport"
}
```

##### Bulk withdrawal

###### BankTransferBulkWithdrawalCreated

| Parameter        | Type   | Length  | M   | Description                                                                                                                                    |
|:-----------------|:-------|:--------|:----|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| bulkWithdrawalId | string | 1 - 20  | Y   |                                                                                                                                                |
| requestId        | string | 1 - 255 | Y   | Your request header's 'X-REQUEST-ID' value that has been sent via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |

Example:

```json
{
  "bulkWithdrawalId": "16400016120109",
  "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466"
}
```

###### BankTransferBulkWithdrawalProcessed

| Parameter        | Type   | Length  | M   | Description                                                                                                                                    |
|:-----------------|:-------|:--------|:----|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| bulkWithdrawalId | string | 1 - 20  | Y   |                                                                                                                                                |
| requestId        | string | 1 - 255 | Y   | Your request header's 'X-REQUEST-ID' value that has been sent via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |

Example:

```json
{
  "bulkWithdrawalId": "16400016120109",
  "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466"
}
```

###### BankTransferBulkWithdrawalFailed

| Parameter           | Type                                                                                                                                      | Length  | M   | Description                                                                                                                                    |
|:--------------------|:------------------------------------------------------------------------------------------------------------------------------------------|:--------|-----|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| requestId           | string                                                                                                                                    | 1 - 255 | Y   | Your request header's 'X-REQUEST-ID' value that has been sent via the [`Bulk withdrawal`](#actions--bank-transfer--withdrawal--bulk) API call. |
| errorCode           | integer                                                                                                                                   | 1 - 20  | Y   | Check [`Error codes list`](#appendix--enum--error-code).                                                                                       |
| errorMessage        | string                                                                                                                                    | 1 - *   | Y   |                                                                                                                                                |
| failedBankTransfers | [`BankTransferWithdrawalFailedValidation`](#appendix--type--webhook--bank-transfer--withdrawal--banktransferwithdrawalfailedvalidation)[] | -       | N   |                                                                                                                                                |

Example:

```json
{
  "requestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
  "errorCode": 11003,
  "errorMessage": "Some transfers didn`t pass validation.",
  "failedBankTransfers": [
    {
      "bulkWithdrawRequestId": "0386ea34-5f63-4f56-a06f-2f57877-545477a-5466",
      "requestReference": "0386ea34-5f63-4f56-a06f-2f",
      "errorCode": 11006,
      "errorMessage": "Request reference already exists."
    }
  ]
}
```

#### Money

| Parameter    | Type   | Length | M   | Description                    |
|:-------------|:-------|--------|:----|--------------------------------|
| minorUnits   | string | 1 - 20 | Y   | Value of money in minor units. |
| currencyCode | string | 3 - 11 | Y   | 'ISO 4217' currency code.      |

Example:

```json
{
  "minorUnits": "1200",
  "currencyCode": "GBP"
}
```

### Example

#### FailedApiResponse

Response will be either encrypted or normal depending on your configuration and in which place your request has ended.

| Parameter         | Type                                                                                   | Length | M   | Description                                              |
|:------------------|:---------------------------------------------------------------------------------------|--------|:----|----------------------------------------------------------|
| errorCode         | integer                                                                                | 1 - 20 | Y   | Check [`Error codes list`](#appendix--enum--error-code). |
| message           | string                                                                                 | 3 - 11 | Y   |                                                          |
| additionalDetails | string &#124; null                                                                     | 1 - *  | N   | Additional details to understand the issue.              |
| violations        | [`FailedApiResponseViolation`](#appendix--type--example--failedapiresponseviolation)[] | -      | N   |                                                          |

Example:

```json
{
  "errorCode": 4022,
  "message": "Unprocessable request.",
  "additionalDetails": null,
  "violations": [
    {
      "errorCode": 11035,
      "message": "Minor units must be type of string, must be positive and cannot have more than 20 characters.",
      "propertyPath": "bankTransfers[1].money.minorUnits"
    }
  ]
}
```

#### FailedApiResponseViolation

| Parameter    | Type    | Length | M   | Description                                              |
|:-------------|:--------|--------|:----|----------------------------------------------------------|
| errorCode    | integer | 1 - 20 | Y   | Check [`Error codes list`](#appendix--enum--error-code). |
| message      | string  | 1 - *  | Y   |                                                          |
| propertyPath | string  | 1 - *  | Y   | Property from the request data.                          |

Example:

```json
{
  "errorCode": 11035,
  "message": "Minor units must be type of string, must be positive and cannot have more than 20 characters.",
  "propertyPath": "bankTransfers[1].money.minorUnits"
}
```

## Enum

### Bank transfer

#### Withdrawal purpose code

| Code | Description                                                                                                                                                                                            |
|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ACM  | Agency Commission                                                                                                                                                                                      | 
| AFA  | Receipts or payments from personal residents bank account or deposits abroad                                                                                                                           | 
| ALW  | Allowances                                                                                                                                                                                             | 
| ATS  | Air transport                                                                                                                                                                                          | 
| CCP  | Corporate Card Payment                                                                                                                                                                                 | 
| CEA  | Equity for the establishment of new company from residents abroad equity of merger or acquisition of companies abroad from residents and participation to capital increase of related company abroad   | 
| CEL  | Equity for the establishment of new company in the UAE from residents equity of merger or acquisition of companies in the UAE from n-residents participation to capital increase of  related companies | 
| CHC  | Charitable Contributions                                                                                                                                                                               | 
| COM  | Commission                                                                                                                                                                                             | 
| COP  | Compensation                                                                                                                                                                                           | 
| CRP  | Credit Card Payments                                                                                                                                                                                   | 
| DCP  | Pre-Paid Reloadable and Personalized Debit Card Payments                                                                                                                                               | 
| DIV  | Dividend Payouts                                                                                                                                                                                       | 
| DOE  | Dividends on equity not intra group                                                                                                                                                                    | 
| EDU  | Educational Support                                                                                                                                                                                    | 
| EMI  | Equated Monthly Instalments                                                                                                                                                                            | 
| EOS  | End of Service                                                                                                                                                                                         | 
| FAM  | Family Support                                                                                                                                                                                         | 
| FIS  | Financial services                                                                                                                                                                                     | 
| FSA  | Equity other than investment fund shares in  the related companies abroad                                                                                                                              | 
| FSL  | Equity other than investment fund shares in related companies in the UAE                                                                                                                               | 
| GDS  | Goods Bought or Sold                                                                                                                                                                                   | 
| GMS  | Processing repair and maintenance services on goods                                                                                                                                                    | 
| GOS  | Government goods and services embassies etc                                                                                                                                                            | 
| GRI  | Government related income taxes tariffs capital transfers etc                                                                                                                                          | 
| IFS  | Information services                                                                                                                                                                                   | 
| IGD  | Intra group dividends                                                                                                                                                                                  | 
| IGT  | INTER GROUP TRANSFER                                                                                                                                                                                   | 
| INS  | Insurance services                                                                                                                                                                                     | 
| IPC  | Charges for the use of intellectual property royalties                                                                                                                                                 | 
| ITS  | Computer services                                                                                                                                                                                      | 
| LAS  | Leave Salary                                                                                                                                                                                           | 
| MCR  | Monetary Claim Reimbursements Medical Insurance or Auto Insurance etc.                                                                                                                                 | 
| MWI  | MOBILE WALLET CASH IN                                                                                                                                                                                  | 
| MWO  | MOBILE WALLET CASH OUT                                                                                                                                                                                 | 
| MWP  | MOBILE WALLET PAYMENTS                                                                                                                                                                                 | 
| OAT  | OWN ACCOUNT TRANSFER                                                                                                                                                                                   | 
| OTH  | Other                                                                                                                                                                                                  | 
| OTS  | Other modes of transport                                                                                                                                                                               | 
| OVT  | Overtime                                                                                                                                                                                               | 
| PEN  | Pension                                                                                                                                                                                                | 
| PMS  | Professional and management consulting services                                                                                                                                                        | 
| POS  | POS Merchant Settlement                                                                                                                                                                                | 
| PRS  | Personal cultural audio visual and recreational services                                                                                                                                               | 
| RDS  | Research and development services                                                                                                                                                                      | 
| RNT  | Rent Payments                                                                                                                                                                                          | 
| SAA  | Salary Advance                                                                                                                                                                                         | 
| SAL  | Salary                                                                                                                                                                                                 | 
| SCO  | Construction                                                                                                                                                                                           | 
| STR  | Travel                                                                                                                                                                                                 | 
| STS  | Sea transport                                                                                                                                                                                          | 
| SVI  | STORED VALUE CARD CASH-IN                                                                                                                                                                              | 
| SVO  | STORED VALUE CARD CASH-OUT                                                                                                                                                                             | 
| SVP  | STORED VALUE CARD PAYMENTS                                                                                                                                                                             | 
| TCS  | Telecommunication services                                                                                                                                                                             | 
| TKT  | Tickets                                                                                                                                                                                                | 
| TOF  | Transfer of funds between persons Normal and Juridical                                                                                                                                                 | 
| UTL  | Utility Bill Payments                                                                                                                                                                                  | 

#### Type

| ID  | Description                |
|:----|:---------------------------|
| 1   | Single immediate payment   |
| 2   | Forward date payment.      |
| 3   | Standing order payment.    |
| 4   | Inbound payment return.    |
| 5   | Outbound payment return.   |
| 6   | Direct debit payment.      |
| 7   | Direct credit payment.     |
| 8   | Payment reverse.           |
| 9   | Payment cancelled.         |
| 10  | Debit fee.                 |
| 11  | Outbound payment canceled. |

#### Status

| ID  | Description |
|-----|-------------|
| 1   | Pending     |
| 2   | Sent        |
| 3   | Received    |
| 4   | Accepted    |
| 5   | Settled     |
| 6   | Rejected    |
| 7   | Returned    |
| 8   | Reversed    |
| 9   | Canceled    |
| 10  | Held        |

#### Scheme

| Value    | Description            |
|:---------|:-----------------------|
| TRANSFER | Transfer.              |
| FPS      | Faster payments.       |
| CHAPS    | Chaps scheme.          |
| BACS     | Bacs scheme.           |
| SCT      | SEPA transfer.         |
| SCTI     | SEPA instant transfer. |
| SDD      | SEPA direct debit.     |
| EXCHANGE | Transfer of exchange.  |

### Error code

| Code  | Description                                                                                                                            |
|:------|:---------------------------------------------------------------------------------------------------------------------------------------|
| 1001  | Invalid signature provided.                                                                                                            | 
| 1002  | You are not approved. Please contact our support.                                                                                      | 
| 1003  | Request ID header is missing.                                                                                                          | 
| 1004  | Request ID header is not unique.                                                                                                       | 
| 1005  | Request ID header is invalid. Only latin letters, numbers and chars (-) are allowed. Maximum 255 symbols.                              | 
| 1006  | Failed to decrypt request content.                                                                                                     | 
| 1007  | Request content has invalid JSON format.                                                                                               | 
| 1008  | Encryption needs to be enabled.                                                                                                        | 
| 4000  | Invalid request.                                                                                                                       | 
| 4001  | Unauthorized.                                                                                                                          | 
| 4003  | Forbidden.                                                                                                                             | 
| 4004  | Not found.                                                                                                                             | 
| 4008  | Request timeout.                                                                                                                       | 
| 4022  | Unprocessable request.                                                                                                                 | 
| 5000  | Internal system error.                                                                                                                 | 
| 5001  | Something went wrong.                                                                                                                  | 
| 10000 | Validation rule is not mapped.                                                                                                         | 
| 10001 | This is not a valid Business Identifier Code (BIC).                                                                                    | 
| 10002 | This value should be blank.                                                                                                            | 
| 10003 | Unsupported card type or invalid card number.                                                                                          | 
| 10004 | You must select at most {{ limit }} choices.                                                                                           | 
| 10005 | You must select at least {{ limit }} choices.                                                                                          | 
| 10006 | One or more of the given values is invalid.                                                                                            | 
| 10007 | This field was not expected.                                                                                                           | 
| 10008 | This field is missing.                                                                                                                 | 
| 10009 | This collection should contain less elements.                                                                                          | 
| 10010 | This collection should contain more elements.                                                                                          | 
| 10011 | This value is not a valid date.                                                                                                        | 
| 10012 | This value is not a valid datetime.                                                                                                    | 
| 10013 | This value should be a multiple of {{ compared_value }}.                                                                               | 
| 10014 | This value is not a valid email address.                                                                                               | 
| 10015 | This value should be equal to {{ compared_value }}.                                                                                    | 
| 10016 | This value is not valid.                                                                                                               | 
| 10017 | This value should be greater than {{ compared_value }}.                                                                                | 
| 10018 | This value should be greater than or equal to {{ compared_value }}.                                                                    | 
| 10019 | This is not a valid International Bank Account Number (IBAN).                                                                          | 
| 10020 | This value should be identical to {{ compared_value_type }} {{ compared_value }}.                                                      | 
| 10021 | This is not a valid IP address.                                                                                                        | 
| 10022 | This value should be false.                                                                                                            | 
| 10023 | This value should be null.                                                                                                             | 
| 10024 | This value should be true.                                                                                                             | 
| 10025 | This value should be valid JSON.                                                                                                       | 
| 10026 | This value is too short.                                                                                                               | 
| 10027 | This value is too long.                                                                                                                | 
| 10028 | This value does not match the expected {{ charset }} charset.                                                                          | 
| 10029 | This value should be less than {{ compared_value }}.                                                                                   | 
| 10030 | This value should be less than or equal to {{ compared_value }}.                                                                       | 
| 10031 | This value should not be blank.                                                                                                        | 
| 10032 | This value should not be equal to {{ compared_value }}.                                                                                | 
| 10033 | This value should not be identical to {{ compared_value_type }} {{ compared_value }}.                                                  | 
| 10034 | This value should not be null.                                                                                                         | 
| 10035 | This value should be a valid number.                                                                                                   | 
| 10036 | This value should be between {{ min }} and {{ max }}.                                                                                  | 
| 10037 | This value should be {{ limit }} or less.                                                                                              | 
| 10038 | This value should be {{ limit }} or more.                                                                                              | 
| 10039 | This value is not valid.                                                                                                               | 
| 10040 | This value is not a valid time.                                                                                                        | 
| 10041 | This value should be of type {{ type }}.                                                                                               | 
| 10042 | This is not a valid UUID.                                                                                                              | 
| 11000 | Failed to lock request ID, please try again later.                                                                                     | 
| 11001 | Failed to lock request ID, please try again later.                                                                                     | 
| 11002 | Request ID is already used.                                                                                                            | 
| 11003 | Some transfers didn't pass validation.                                                                                                 | 
| 11004 | Not all request references are unique in bulk.                                                                                         | 
| 11005 | Brand not found for bank transfer. Please contact support.                                                                             | 
| 11006 | Request reference already exists.                                                                                                      | 
| 11007 | Transfer currency is invalid.                                                                                                          | 
| 11008 | Debtor's IBAN is invalid.                                                                                                              | 
| 11009 | Debtor's account is invalid.                                                                                                           | 
| 11010 | Debtor's account and transfer currencies are different.                                                                                | 
| 11011 | Purpose is invalid.                                                                                                                    | 
| 11012 | Creditor type is invalid.                                                                                                              | 
| 11013 | Industry is invalid.                                                                                                                   | 
| 11014 | Industry can be passed only for business type.                                                                                         | 
| 11015 | Insufficient funds to pay.                                                                                                             | 
| 11016 | Creditor's IBAN is required.                                                                                                           | 
| 11017 | Creditor's IBAN is invalid.                                                                                                            | 
| 11018 | Creditor's sort code is invalid.                                                                                                       | 
| 11019 | Creditor's sort code is required.                                                                                                      | 
| 11020 | Creditor's account number is required.                                                                                                 | 
| 11021 | Creditor's account number must contain only numbers.                                                                                   | 
| 11022 | Creditor's account number must contain 6 or more characters.                                                                           | 
| 11023 | Creditor's account number must contain less than 26 characters.                                                                        | 
| 11024 | Only the creditor's  IBAN should be provided. Account number and sort code is not available for this currency.                         | 
| 11025 | Only the creditor's account number and sort code must be provided. IBAN is not available for this currency.                            | 
| 11026 | Only the creditor's IBAN or only sort code and account number must be provided.                                                        | 
| 11027 | Failed to lock bank transfer.                                                                                                          | 
| 11028 | Failed to unlock bank transfer.                                                                                                        | 
| 11029 | Provided currency code is invalid.                                                                                                     | 
| 11030 | Currency code is required.                                                                                                             | 
| 11031 | {{ propertyPath }} must be required.                                                                                                   | 
| 11032 | {{ propertyPath }} must be a type of {{ type }}, and it should have {{ limit }} characters or less.                                    | 
| 11033 | Country ISO code is invalid.                                                                                                           | 
| 11034 | Country alpha three code is required.                                                                                                  | 
| 11035 | Minor units must be a type of string, must be positive and cannot have more than 20 characters.                                        | 
| 11036 | Only latin symbols, spaces and chars (- , . /) are allowed.                                                                            | 
| 11037 | Only latin symbols, numbers, spaces and chars (- , . /) are allowed.                                                                   | 
| 11038 | Only latin symbols, spaces, numbers and chars (- . ( ) ) are allowed.                                                                  | 
| 11039 | Only latin symbols, spaces, numbers and dashes are allowed.                                                                            | 
| 11040 | Only latin symbols, numbers and dash char (-) are allowed.                                                                             | 
| 11041 | Message for creditor can contain maximum {{ limit }} characters.                                                                       | 
| 11042 | Creditor's name is invalid.                                                                                                            | 
| 11043 | Creditor's address is invalid.                                                                                                         | 
| 11044 | Creditor's postal is invalid.                                                                                                          | 
| 11045 | Creditor's city is invalid.                                                                                                            | 
| 11046 | Message for creditor is invalid.                                                                                                       | 
| 11047 | Reference is invalid.                                                                                                                  | 
| 11048 | Debtor's account number and sort code must be provided as pair.                                                                        | 
| 11049 | Debtor's IBAN or sort code and account number must be provided.                                                                        | 
| 11050 | Service is not available at the moment due to not being able to find available scheme. Please contact support.                         | 
| 11051 | Account program error occurred. Please contact support.                                                                                | 
| 11052 | Debtor's IBAN is unavailable.                                                                                                          | 
| 11053 | Insufficient Funds! %fees% fee is %fee_amount% %fee_currency%. Maximum amount which you can transfer is %max_amount% %max_currency%.   | 
| 11054 | Insufficient Funds! %fees% fees is %fee_amount% %fee_currency%. Maximum amount which you can transfer is %max_amount% %max_currency%.  | 
| 11055 | Insufficient funds available to cover the transfer and %fee% fee.                                                                      | 
| 11056 | Insufficient funds available to cover the transfer.                                                                                    | 
| 11057 | Fee for %res% is not set; %users_id% ; %accounts_id%                                                                                   | 
| 11058 | Insufficient funds available to cover the transfer and %fee% %currencyCode% fee.                                                       | 
| 11059 | Insufficient funds available to cover %fee% %currencyCode% fee.                                                                        | 
| 11060 | Fee for %res% is not set; %users_id% ; %accounts_id%.                                                                                  | 
| 11061 | Insufficient funds.                                                                                                                    |

### Reason code

| Code | Description                                                                                                                          |
|:-----|:-------------------------------------------------------------------------------------------------------------------------------------|
| 011  | Invalid data                                                                                                                         |
| 022  | Confirmation is required                                                                                                             |
| 033  | Declined by card issuer                                                                                                              |
| 044  | Incorrect amount                                                                                                                     |
| 100  | Load limit exceeded (value of transactions)                                                                                          |
| 101  | Load limit exceeded (number of transactions)                                                                                         |
| 102  | Transfer limit exceeded (maximum transaction amount allowed)                                                                         |
| 103  | Transfer limit exceeded (value of transactions)                                                                                      |
| 104  | Transfer limit exceeded (number of transactions)                                                                                     |
| 105  | Withdrawal limit exceeded (value of transactions)                                                                                    |
| 106  | Withdrawal limit exceeded (number of transactions)                                                                                   |
| 107  | Withdrawal limit exceeded (maximum transaction amount allowed)                                                                       |
| 108  | Card throughput limit exceeded (must provide KYC documents)                                                                          |
| 109  | Card balance exceeded                                                                                                                |
| 110  | Transfer restricted                                                                                                                  |
| 111  | Load restricted                                                                                                                      |
| 112  | Recipient can not accept transfers                                                                                                   |
| 113  | Account balance exceeded                                                                                                             |
| 114  | Operation is not allowed                                                                                                             |
| 115  | Wrong receiving account provided                                                                                                     |
| 116  | Wrong sending account provided                                                                                                       |
| 117  | Sending and receiving accounts cannot be the same                                                                                    |
| 200  | Insufficient funds                                                                                                                   |
| 202  | Fees is not set up                                                                                                                   |
| 300  | Card is inactive                                                                                                                     |
| 400  | Could not find currency rate.                                                                                                        |
| 500  | Invalid signature                                                                                                                    |
| 501  | Error creating session                                                                                                               |
| 502  | Operation is not allowed                                                                                                             |
| 503  | Missing field                                                                                                                        |
| 504  | Field format error                                                                                                                   |
| 505  | Invalid receiver account                                                                                                             |
| 506  | User not found                                                                                                                       |
| 507  | Invalid currency code                                                                                                                |
| 508  | Invalid sender account                                                                                                               |
| 509  | Define sender account                                                                                                                |
| 510  | Duplicate order_id                                                                                                                   |
| 511  | Initialized transaction not found                                                                                                    |
| 512  | Two factor authorization error                                                                                                       |
| 513  | Transfer request already confirmed                                                                                                   |
| 514  | Transaction not found                                                                                                                |
| 515  | Transaction cannot be refunded                                                                                                       |
| 516  | Cannot refund this amount                                                                                                            |
| 517  | Customer request                                                                                                                     |
| 518  | Not enough balance left in the account for the bank fees.                                                                            |
| 519  | Tranfer request deleted by customer                                                                                                  |
| 520  | Invalid username provided                                                                                                            |
| 521  | Invalid account provided                                                                                                             |
| 522  | Invalid data provided                                                                                                                |
| 523  | Invalid external card id provided                                                                                                    |
| 524  | Wrong verification amount                                                                                                            |
| 525  | Verification attempts limit reached                                                                                                  |
| 526  | Verification failed                                                                                                                  |
| 527  | Invalid card status                                                                                                                  |
| 528  | S3D cards not supported                                                                                                              |
| 529  | Configuration error                                                                                                                  |
| 530  | Your login has been blocked. Please contact Customer Support for assistance.                                                         |
| 531  | Format error                                                                                                                         |
| 532  | Internal policy                                                                                                                      |
| 533  | Internal Policy of Beneficiary Bank                                                                                                  |
| 534  | Compliance reasons                                                                                                                   |
| 535  | Unable to apply                                                                                                                      |
| 536  | Bank error                                                                                                                           |
| 537  | Currency is not available                                                                                                            |
| 538  | Invalid currency provided                                                                                                            |
| 539  | Your IBAN is unavailable                                                                                                             |
| 540  | This action is temporarily disabled. Please contact Customer Support for further assistance.                                         |
| 543  | This method with no expiration is not available.                                                                                     |
| 544  | You are not allowed to make links with no expiration. Please contact Customer Support for further assistance.                        |
| 600  | Limitation reached                                                                                                                   |
| 650  | Account closed                                                                                                                       |
| 651  | Account blocked                                                                                                                      |
| 652  | Account holder deceased                                                                                                              |
| 653  | Not specified reason by customer                                                                                                     |
| 654  | Not specified reason by agent                                                                                                        |
| 655  | Transaction is forbidden                                                                                                             |
| 656  | Invalid bank operation code                                                                                                          |
| 657  | Duplication                                                                                                                          |
| 658  | Missing creditor address                                                                                                             |
| 659  | Following cancelation request                                                                                                        |
| 660  | Missing debtor account or identification                                                                                             |
| 661  | Missing debtor name or address                                                                                                       |
| 662  | Missing creditor name or address                                                                                                     |
| 663  | Regulatory reason                                                                                                                    |
| 664  | Account transferred                                                                                                                  |
| 665  | Reference required not supplied                                                                                                      |
| 666  | Account name mismatch                                                                                                                |
| 667  | Terms and conditions of account do not permit crediting of these funds                                                               |
| 668  | Sending institution action required                                                                                                  |
| 669  | Payment return reason is not specified                                                                                               |
| 670  | Other reasons                                                                                                                        |
| 671  | Do not honor (Refused)                                                                                                               |
| 672  | Wrong IBAN.                                                                                                                          |
| 673  | Wrong amount.                                                                                                                        |
| 674  | Fraudulent original credit transfer.                                                                                                 |
| 675  | Technical problems.                                                                                                                  |
| 676  | Following cancelation request.                                                                                                       |
| 677  | Requested by customer.                                                                                                               |
| 678  | Already returned transaction.                                                                                                        |
| 679  | Legal decision.                                                                                                                      |
| 680  | No answer from customer.                                                                                                             |
| 681  | No original transaction received.                                                                                                    |
| 682  | Duplicate payment                                                                                                                    |
| 683  | ERI option not supported.                                                                                                            |
| 684  | Fraudulent payment suspected.                                                                                                        |
| 685  | Incorrect transaction information.                                                                                                   |
| 686  | Provider issue.                                                                                                                      |
| 687  | Time out.                                                                                                                            |
| 688  | Account can not be identified.                                                                                                       |
| 689  | Method not supported.                                                                                                                |
| 999  | Unknown error.                                                                                                                       |

## Notation

### Parameter requirement

| Notation | Description |
|:---------|:------------|
| Y        | Yes         |
| N        | No          |
| C        | Conditional |
