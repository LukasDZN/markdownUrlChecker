# Introduction
All API request examples provided in this document are for illustrative purposes only and request specifications for each method must be followed.

## Overview

The %brandName% webhook system, Merchant Activity Interface (MAI) is designed to provide real time messages to the partner system to either engage in the transaction or to simply update your platform and customers of any messages received.

The request data the %brandName% platform can send will cover:

- Confirm credit transaction
- Cancel credit transaction
- Terminal notification
- Token update notification

## Setup Process

**Step 1** – Complete the basic requirements sheet supplied by the %brandName% team which defines high level detail about the programme we should setup in our Sandbox platform.

**Step 2** – Supply the test URL end point for your system that %brandName% will configure in the Sandbox. This will be the destination that request messages will be sent to, and from where the Response messages will be sent.

If you need to whitelist the %brandName% Sandbox IP address on your host. Please contact administrator to get IP address.   

**Step 3** – Configure the webhook security details supplied by %brandName%:

`Endpoint client public key` - System will try to decrypt response messages from client using this key.

`Endpoint public key` - Request messages will be encrypted using our private key and should be decrypted using this key.

## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

# Webhooks
## Request

As webhook messages originate from the %brandName% platform, the request message shows the format of the webhook the %brandName% platform will send to you as the Partner platform. It is therefore important the partner platform is designed to recognise these fields as inbound messages and make use of the fields sent.

| Parameter                | Notation | Length | Type                                                                             | Description                                                                                                                            |
|:-------------------------|:---------|:-------|:---------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------|
| requestType              | M        | \-     | LIST                                                                             | [`Request type`](#appendix--enum--request-type)                                                                                        |
| confirmCreditTransaction | C        | \-     | [`confirmCreditTransaction`](#appendix--type--confirmcredittransaction--request) | If `requestType` contains `confirmCreditTransaction`.                                                                                  |
| cancelCreditTransaction  | C        | \-     | [`cancelCreditTransaction`](#appendix--type--cancelcredittransaction--request)   | If `requestType` contains `cancelCreditTransaction`.                                                                                   |
| terminalNotification     | C        | \-     | [`terminalNotification`](#appendix--type--terminalnotification--request)         | If `requestType` contains `terminalNotification`.                                                                                      |
| tokenUpdateNotification  | C        | \-     | [`tokenUpdateNotification`](#appendix--type--token-update-notification--request) | If `requestType` contains `tokenUpdateNotification`. *Note:* in test mode the notification type `tokenUpdateNotification` is not sent. |

```json
{
    "requestType": [
        "confirmCreditTransaction"
    ],
    "confirmCreditTransaction": {
        "merchantId": "15780545724680",
        "merchantUniqueReferenceNumber": "merchant123",
        "terminalId": "15780546169968",
        "terminalUniqueReferenceNumber": null,
        "salePointId": "15780545725766",
        "salePointUniqueReferenceNumber": null,
        "txId": "000000200013000009200108080122",
        "txDescriptor": "descr",
        "transactionAmount": "-400",
        "currency": "978",
        "merchantReference": "20000000000008",
        "mcc": "1520",
        "procedure": "refund",
        "scheme": "Mastercard",
        "maskedPan": "222300******0011",
        "cardToken": "3b0305be8740e4b649734fee8ca4f346",
        "parentTx": {
            "txId": "000000200013000008200108075953",
            "transactionAmount": "8000",
            "currency": "978",
            "txDescriptor": "descr",
            "merchantReference": "20000000000007",
            "mcc": "1520"
        }
    }
}
```

## Response

This defines the content of the response the %brandName% platform expects to receive from the Partner platform. If no response is received to acknowledge the message, the %brandName% system will attempt to re-send notification four times after 2 min, 10 min, 60 min, 12 hours.

| Parameter                | Notation | Description                                                                       |                                                 |
|:-------------------------|:---------|:----------------------------------------------------------------------------------|:------------------------------------------------|
| status                   | M        | `success / error`                                                                 |                                                 |
| confirmCreditTransaction | C        | [`confirmCreditTransaction`](#appendix--type--confirmcredittransaction--response) | If request contains `confirmCreditTransaction`. |
| message                  | O        | Error message in client system if request data processing failed.                 |                                                 |

Response example when `status` equal to `success`:

```json
{
    "status": "success",
    "confirmCreditTransaction": {
        "approved": "Y"
    }
}
```

Response example when `status` equal to `error`:

```json
{
    "status": "error",
    "message": "Could not decrypt request"
}
```

# Appendix
## Changelog

| Version | Date               | Updates                                                                                                                               |
|:--------|:-------------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| 1.1.8   | August 02, 2021    | <!-- tkm --> Added Token update notification.                                                                                         |
| 1.1.7   | June 07, 2021      | <!-- dv --> Marked deprecated by Mastercard [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator) values. |
| 1.1.6   | February 19, 2021  | <!-- nl --> Updated [`Security`](#appendix--security--cryptography) encryption/decryption examples and descriptions.                  |
| 1.1.5   | September 29, 2020 | <!-- rik --> Fixes to request example of `terminalNotification` response. Marked `merchantReference` as a nullable type.              |
| 1.1.4   | September 08, 2020 | <!-- tb --> Added field `rrn` field to `terminalNotification` request type.                                                           |
| 1.1.3   | August 12, 2020    | <!-- rik --> updating $rb value calculation in [`Cryptography`](#appendix--security--cryptography) encryptRequest example.            |
| 1.1.2   | August 08, 2020    | <!-- rik --> Added `authorizeType` field to `terminalNotification` request type.                                                      |
| 1.1.1   | August 04, 2020    | <!-- rik --> Added private key format requirement to [`Cryptography`](#appendix--security--cryptography) example.                     |
| 1.1.0   | May 18, 2020       | <!-- ts --> Added `dateTransmission` field to `terminalNotification` request type. <!-- ts -->                                        |
| 1.0.0   | March 24, 2020     | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->              |

## Type

### CancelCreditTransaction

#### Request

| Parameter                       | Notation | Length | Type      | Description                                                                                                                                                                                                                                                                                          |
|:--------------------------------|:---------|:-------|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantId                      | M        | 14-20  | N         | Merchant ID.                                                                                                                                                                                                                                                                                         |
| merchantUniqueReferenceNumber   | M        | 16     | NULL / AN | Merchant unique reference number provided when creating merchant. If no value assigned null value will be sent.                                                                                                                                                                                      |
| terminalId                      | M        | 14-20  | N         | Terminal ID.                                                                                                                                                                                                                                                                                         |
| terminalUniqueReferenceNumber   | M        | 16     | NULL / AN | Terminal unique reference number provided when creating terminal. If no value assigned null value will be sent.                                                                                                                                                                                      |
| salePointId                     | M        | 14-20  | N         | Sale point ID.                                                                                                                                                                                                                                                                                       |
| salePointUniqueReferenceNumber  | M        | 16     | NULL / AN | Sale point unique reference number provided when creating sale point. If no value assigned null value will be sent.                                                                                                                                                                                  |
| txId                            | M        | 1-255  | N         | Transaction ID.                                                                                                                                                                                                                                                                                      |
| txDescriptor                    | O        | 22     | ANS       | Transaction descriptor.                                                                                                                                                                                                                                                                              |
| transactionAmount               | M        | 1-13   | NS        | Transaction amount in cents. If transaction is credit/refund/p2p type then amount is negative.                                                                                                                                                                                                       |
| currency                        | M        | 3      | N         | ISO numeric currency code.                                                                                                                                                                                                                                                                           |
| merchantReference               | M        | 1-255  | ANS       | Merchant internal reference ID.                                                                                                                                                                                                                                                                      |
| mcc                             | O        | 4      | AN        | Merchant category code.                                                                                                                                                                                                                                                                              |
| procedure                       | M        | 1-20   | ANS       | [`Available procedures`](#appendix--enum--procedure)                                                                                                                                                                                                                                                 |
| scheme                          | M        | 1-10   | A         | [`Available schemes`](#appendix--enum--scheme)                                                                                                                                                                                                                                                       |
| maskedPan                       | M        | 13-19  | ANS       | Masked account number.                                                                                                                                                                                                                                                                               |
| cardToken                       | M        | 32     | AN        | Card token.                                                                                                                                                                                                                                                                                          |
| paymentTransactionTypeIndicator | O        | 3      | ANS       | [`Payment transaction type`](#appendix--enum--payment-transaction-type). Only available for P2P transactions.                                                                                                                                                                                        |
| responseCode                    | M        | 2      | NULL / AN | [`Response Code`](#appendix--enum--response-code)                                                                                                                                                                                                                                                    |
| parentTx                        | C        | -      | OBJ       | If current transaction has parent transaction then this field contains parent transaction information. Example: Refund request is called to refund part of original transaction then parentTx field will contain original transaction information while main fields will contain refund information. |
| parentTx / txId                 | M        | 1-255  | N         | Transaction id                                                                                                                                                                                                                                                                                       |
| parentTx / transactionAmount    | M        | 1-12   | N         | Transaction amount in cents.                                                                                                                                                                                                                                                                         |
| parentTx / currency             | M        | 3      | N         | ISO numeric currency code.                                                                                                                                                                                                                                                                           |
| parentTx / txDescriptor         | O        | 22     | ANS       | Transaction descriptor.                                                                                                                                                                                                                                                                              |
| parentTx / merchantReference    | M        | 1-255  | ANS       | Merchant internal reference ID.                                                                                                                                                                                                                                                                      |
| parentTx / mcc                  | O        | 4      | AN        | Merchant category code.                                                                                                                                                                                                                                                                              |

```json
{
    "requestType": [
        "cancelCreditTransaction"
    ],
    "cancelCreditTransaction": {
        "merchantId": "15780545724680",
        "merchantUniqueReferenceNumber": "merchant123",
        "terminalId": "15780546169968",
        "terminalUniqueReferenceNumber": null,
        "salePointId": "15780545725766",
        "salePointUniqueReferenceNumber": null,
        "txId": "000000200013000009200108080122",
        "txDescriptor": "descr",
        "transactionAmount": "-400",
        "currency": "978",
        "merchantReference": "20000000000008",
        "mcc": "1520",
        "procedure": "refund",
        "scheme": "Mastercard",
        "maskedPan": "222300******0011",
        "cardToken": "3b0305be8740e4b649734fee8ca4f346",
        "responseCode": "05",
        "parentTx": {
            "txId": "000000200013000008200108075953",
            "transactionAmount": "8000",
            "currency": "978",
            "txDescriptor": "descr",
            "merchantReference": "20000000000007",
            "mcc": "1520"
        }
    }
}
```

#### Response

This request type does not require response from client.

### ConfirmCreditTransaction

#### Request

| Parameter                       | Notation | Length | Type      | Description                                                                                                                                                                                                                                                                                          |
|:--------------------------------|:---------|:-------|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantId                      | M        | 14-20  | N         | Merchant ID.                                                                                                                                                                                                                                                                                         |
| merchantUniqueReferenceNumber   | M        | 16     | NULL / AN | Merchant unique reference number provided when creating merchant. If no value assigned null value will be sent.                                                                                                                                                                                      |
| terminalId                      | M        | 14-20  | N         | Terminal ID.                                                                                                                                                                                                                                                                                         |
| terminalUniqueReferenceNumber   | M        | 16     | NULL / AN | Terminal unique reference number provided when creating terminal. If no value assigned null value will be sent.                                                                                                                                                                                      |
| salePointId                     | M        | 14-20  | N         | Sale point ID.                                                                                                                                                                                                                                                                                       |
| salePointUniqueReferenceNumber  | M        | 16     | NULL / AN | Sale point unique reference number provided when creating sale point. If no value assigned null value will be sent.                                                                                                                                                                                  |
| txId                            | M        | 1-255  | N         | Transaction ID.                                                                                                                                                                                                                                                                                      |
| txDescriptor                    | O        | 22     | ANS       | Transaction descriptor.                                                                                                                                                                                                                                                                              |
| transactionAmount               | M        | 1-13   | NS        | Transaction amount in cents. If transaction is credit/refund/p2p type then amount is negative.                                                                                                                                                                                                       |
| currency                        | M        | 3      | N         | ISO numeric currency code.                                                                                                                                                                                                                                                                           |
| merchantReference               | M        | 1-255  | ANS       | Merchant internal reference ID.                                                                                                                                                                                                                                                                      |
| mcc                             | O        | 4      | AN        | Merchant category code.                                                                                                                                                                                                                                                                              |
| procedure                       | M        | 1-20   | ANS       | [`Available procedures`](#appendix--enum--procedure)                                                                                                                                                                                                                                                 |
| scheme                          | M        | 1-10   | A         | [`Available schemes`](#appendix--enum--scheme)                                                                                                                                                                                                                                                       |
| maskedPan                       | M        | 13-19  | ANS       | Masked account number.                                                                                                                                                                                                                                                                               |
| cardToken                       | M        | 32     | AN        | Card token.                                                                                                                                                                                                                                                                                          |
| paymentTransactionTypeIndicator | O        | 3      | ANS       | [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator). Only available for P2P transactions.                                                                                                                                                                              |
| parentTx                        | C        | -      | OBJ       | If current transaction has parent transaction then this field contains parent transaction information. Example: Refund request is called to refund part of original transaction then parentTx field will contain original transaction information while main fields will contain refund information. |
| parentTx / txId                 | M        | 1-255  | N         | Transaction ID                                                                                                                                                                                                                                                                                       |
| parentTx / transactionAmount    | M        | 1-12   | N         | Transaction amount in cents.                                                                                                                                                                                                                                                                         |
| parentTx / currency             | M        | 3      | N         | ISO numeric currency code.                                                                                                                                                                                                                                                                           |
| parentTx / txDescriptor         | O        | 22     | ANS       | Transaction descriptor.                                                                                                                                                                                                                                                                              |
| parentTx / merchantReference    | M        | 1-255  | ANS       | Merchant internal reference ID.                                                                                                                                                                                                                                                                      |
| parentTx / mcc                  | O        | 4      | AN        | Merchant category code.                                                                                                                                                                                                                                                                              |

```json
{
    "requestType": [
        "confirmCreditTransaction"
    ],
    "confirmCreditTransaction": {
        "merchantId": "15780545724680",
        "merchantUniqueReferenceNumber": "merchant123",
        "terminalId": "15780546169968",
        "terminalUniqueReferenceNumber": null,
        "salePointId": "15780545725766",
        "salePointUniqueReferenceNumber": null,
        "txId": "000000200013000009200108080122",
        "txDescriptor": "descr",
        "transactionAmount": "-400",
        "currency": "978",
        "merchantReference": "20000000000008",
        "mcc": "1520",
        "procedure": "refund",
        "scheme": "Mastercard",
        "maskedPan": "222300******0011",
        "cardToken": "3b0305be8740e4b649734fee8ca4f346",
        "parentTx": {
            "txId": "000000200013000008200108075953",
            "transactionAmount": "8000",
            "currency": "978",
            "txDescriptor": "descr",
            "merchantReference": "20000000000007",
            "mcc": "1520"
        }
    }
}
```

#### Response

| Parameter                           | Notation | Length | Type | Description                                |
|:------------------------------------|:---------|:-------|:-----|:-------------------------------------------|
| status                              | M        | 1-8    | A    | `success`                                  |
| confirmCreditTransaction            | M        | -      | OBJ  |                                            |
| confirmCreditTransaction / approved | M        | 1      | A    | Is transaction approved. `Y` or `N`        |
| confirmCreditTransaction / reason   | O        | 1-255  | AN   | Optional field to provide rejection reason |

Response example:

```json
{
    "status": "success",
    "checkTransactionAvailability": {
        "approved": "Y"
    }
}
```

### TerminalNotification

#### Request

| Parameter                                | Notation | Length | Type       | Description                                                                                                                                                          |
|:-----------------------------------------|:---------|:-------|:-----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiVersion                               | M        | 1-10   | ANS        | Merchant API version - fixed `1.0`.                                                                                                                                  |
| requestId                                | M        | 14     | N          | Request identification number.                                                                                                                                       |
| merchantVar1                             | M        | 1-255  | NULL / ANS | Merchant variable 1 value from request.                                                                                                                              |
| merchantVar2                             | M        | 1-255  | NULL / ANS | Merchant variable 2 value from request.                                                                                                                              |
| merchantVar3                             | M        | 1-255  | NULL / ANS | Merchant variable 3 value from request.                                                                                                                              |
| merchantVar4                             | M        | 1-255  | NULL / ANS | Merchant variable 4 value from request.                                                                                                                              |
| merchantReference                        | O        | 1-255  | NULL / AN  | Merchant reference number.                                                                                                                                           |
| responseCode                             | M        | 2      | AN         | [`Response Code`](#appendix--enum--response-code).                                                                                                                   |
| status                                   | M        | -      | A          | [`Status`](#appendix--enum--status).                                                                                                                                 |
| statusCode                               | M        | 3      | N          | [`Status code`](#appendix--enum--status-code).                                                                                                                       |
| schemesId                                | M        | 1-2    | N          | [`Available schemes`](#appendix--enum--scheme).                                                                                                                      |
| maskedPan                                | M        | 13-19  | ANS        | Masked account number.                                                                                                                                               |
| cardToken                                | M        | 32     | AN         | Card token represents a credit card’s details.                                                                                                                       |
| transactionAmount                        | M        | 1-12   | N          | Transaction amount in cents. If transaction is credit/refund/p2p type then amount is negative.                                                                       |
| currencyIson                             | M        | 3      | N          | ISO Numeric currency code.                                                                                                                                           |
| txId                                     | C        | 1-255  | N          | Transaction ID is returned for all terminal notifications except 'capture'.                                                                                          |
| dateTransmission                         | M        | 10     | N          | Transmission date timestamp.                                                                                                                                         |
| parentTxId                               | O        | 1-255  | N          | If current transaction has parent transaction then this field contains parent transaction ID.                                                                        |
| avsCheckResponse                         | O        | 1      | A          | [`Address verification response code`](#appendix--enum--address-verification-code). Will be returned if address verification service (AVS) was initiated in request. |
| merchantAdviceCode                       | O        | 2      | N          | Issuer reason for approving or declining a transaction.                                                                                                              |
| authorizationIdResponse                  | O        | 6      | AN         | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period.                                            |
| additionalAmounts                        | O        | -      | OBJ        | Additional balance amounts (DE54).                                                                                                                                   |
| additionalAmounts / accountType          | M        | 2      | AN         | User "From account" type.                                                                                                                                            |
| additionalAmounts / amountType           | M        | 2      | AN         | [`Amount type`](#appendix--enum--amount-type).                                                                                                                       |
| additionalAmounts / currencyCode         | M        | 3      | N          | ISO numeric currency code.                                                                                                                                           |
| additionalAmounts / creditDebitIndicator | O        | 2      | AN         | Credit (`C`) or Debit (`D`) indicator.                                                                                                                               |
| additionalAmounts / amount               | M        | 1-13   | N          | Amount in cents.                                                                                                                                                     |
| cardAcceptorData                         | O        | ANS    | 40         | Card acceptor data.                                                                                                                                                  |
| type                                     | M        | A      | 1-100      | [`Response type`](#appendix--enum--response-type).                                                                                                                   |
| authorizeType                            | O        | A      | 1-100      | [`Authorize type`](#appendix--enum--authorize-type).                                                                                                                 |
| rrn                                      | M        | 12     | AN         | Transaction retrieval reference number.                                                                                                                              |

```json
{
    "requestType": [
        "terminalNotification"
    ],
    "terminalNotification": {
        "apiVersion": "1.0",
        "requestId": "15798772736374",
        "merchantVar1": null,
        "merchantVar2": null,
        "merchantVar3": null,
        "merchantVar4": null,
        "merchantReference": null,
        "responseCode": "success",
        "statusCode": "00",
        "status": "000",
        "schemesId": "1",
        "maskedPan": "222300******0011",
        "transactionAmount": "5000",
        "currencyIson": "978",
        "txId": "000000200003000022200124144754",
        "dateTransmission": "1589466299",
        "parentTxId": "000000200003000022200124144752",
        "avsCheckResponse": "000000200003000022200124144752",
        "merchantAdviceCode": "000000200003000022200124144752",
        "authorizationIdResponse": "362056",
        "additionalAmounts": "362056",
        "cardAcceptorData": "The Shard SE1 9SG London GBR",
        "type": "authorize",
        "cardToken": "e68212c206f2257b41fc9356090f28b5"
        "rrn": "000000000001"
    }
}
```

#### Response

| Parameter | Notation | Length | Type | Description |
|:----------|:---------|:-------|:-----|:------------|
| status    | M        | 1-8    | A    | `success`   |

Response example:

```json
{
    "status": "success"
}
```

### Token update notification

#### Request

| Parameter            | Notation | Length | Type | Description                                                                  |
|:---------------------|:---------|:-------|:-----|:-----------------------------------------------------------------------------|
| tokenUniqueReference | M        | 1-64   | ANS  | The unique reference allocated to the Token.                                 |
| tokenStatus          | M        | 1-32   | AS   | The current status of Token. [`Token Status`](#appendix--enum--token-status) |

```json
{
    "requestType": [
        "tokenUpdatedNotification"
    ],
    "tokenUpdatedNotification": {
        "tokenUniqueReference": "DWSPMC000000000132d72d4fcb2f4136a0532d3093ff1a45",
        "tokenStatus": "ACTIVE"
    }
}
```

#### Response

| Parameter | Notation | Length | Type | Description |
|:----------|:---------|:-------|:-----|:------------|
| status    | M        | 1-8    | A    | `success`   |

Response example:

```json
{
    "status": "success"
}
```

## Enum

### Address verification code

| Code | Message                                                                                                                                          |
|:-----|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| A    | Address matches, postal code does not                                                                                                            |
| B    | Visa only. Street address match. Postal code not verified because of incompatible formats. (Acquirer sent both street address and postal code.)  |
| C    | Visa only. Street address and postal code not verified because of incompatible formats. (Acquirer sent both street address and postal code.)     |
| D    | Visa only. Street address and postal code match                                                                                                  |
| F    | Visa only. Street address and postal code match. Applies to U.K. only                                                                            |
| G    | Visa only. Non-AVS participant outside the U.S.; address not verified for international transaction                                              |
| I    | Visa only. Address information not verified for international transaction.                                                                       |
| M    | Visa only. Street addresses and postal code match                                                                                                |
| N    | Neither address nor postal code matches                                                                                                          |
| P    | Visa only. Postal codes match. Street address not verified because of incompatible formats. (Acquirer sent both street address and postal code.) |
| R    | Retry, system unable to process.                                                                                                                 |
| S    | AVS currently not supported.                                                                                                                     |
| U    | No data from issuer/Authorization Platform                                                                                                       |
| W    | For U.S. addresses, nine-digit postal code matches, address does not; for address outside the U.S., postal code matches, address does not.       |
| X    | For U.S. addresses, nine-digit postal code and address matches; for addresses outside the U.S., postal code and address match.                   |
| Y    | For U.S. addresses, five-digit postal code and address matches.                                                                                  |
| Z    | For U.S. addresses, five-digit postal code matches, address does not.                                                                            |

### Amount type

| Type | Description                                               |
|:-----|:----------------------------------------------------------|
| 01   | Ledger Balance                                            |
| 02   | Available Balance                                         |
| 03   | Amount Owing                                              |
| 04   | Amount Due                                                |
| 10   | Health care Eligibility Amount                            |
| 11   | Prescription Eligibility Amount                           |
| 12   | Reserved for future use                                   |
| 13   | Reserved for future use                                   |
| 14   | Reserved for future use                                   |
| 17   | Mastercard Prepaid Online Bill Pay Transaction Fee Amount |
| 40   | Amount Cash Back                                          |
| 44   | Amount Gratuity                                           |
| 57   | Original Amount                                           |
| 59   | Limit/Balance available amount from Mastercard In Control |

### Payment transaction type

| Indicator | Scheme     | Description                                         |
|:----------|:-----------|:----------------------------------------------------|
| C01       | MasterCard | Person to Person (depreciated)                      |
| C02       | MasterCard | Mastercard rebate                                   |
| C03       | MasterCard | Re-power load value                                 |
| C04       | MasterCard | Gaming repay                                        |
| C05       | MasterCard | Other reason (depreciated)                          |
| C06       | MasterCard | Payment of a credit card balance with cash or check |
| C07       | MasterCard | MoneySend person to person                          |
| C09       | MasterCard | Card activation (depreciated)                       |
| C51       | MasterCard | Reserved. MoneySend additional indicator            |
| C52       | MasterCard | Reserved. MoneySend account to account transfers    |
| C53       | MasterCard | MoneySend agent cash out                            |
| C54       | MasterCard | MoneySend credit card bill payment                  |
| C55       | MasterCard | MoneySend business disbursement                     |
| C56       | MasterCard | MoneySend government non profit disbursement        |
| C57       | MasterCard | MoneySend acquirer merchant settlement              |
| C58       | MasterCard | Reserved. MoneySend additional indicator            |
| C59       | MasterCard | Reserved. MoneySend additional indicator            |
| C60       | MasterCard | Reserved. MoneySend additional indicator            |
| C61       | MasterCard | Reserved. MoneySend additional indicator            |
| C62       | MasterCard | Reserved. MoneySend additional indicator            |
| C63       | MasterCard | Reserved. MoneySend additional indicator            |
| C64       | MasterCard | Reserved. MoneySend additional indicator            |
| C65       | MasterCard | Reserved. MoneySend additional indicator            |
| C66       | MasterCard | Reserved. MoneySend additional indicator            |
| C67       | MasterCard | Inter platform person to person                     |
| C91       | MasterCard | Utility payments Brazil domestic transactions       |
| C92       | MasterCard | Government services Brazil domestic transactions    |
| C93       | MasterCard | Mobile phone top ups Brazil domestic transactions   |
| C94       | MasterCard | Coupon booklet payments domestic transactions       |
| F07       | MasterCard | P2P Transfer                                        |
| F52       | MasterCard | Account-to-Account Transfer                         |
| F53       | MasterCard | Agent Cash Out                                      |
| F54       | MasterCard | Credit Account Bill Payment                         |
| F61       | MasterCard | Staged Wallet Load                                  |
| F64       | MasterCard | Prepaid/Debit Card Account Load                     |
| AA        | Visa       | Account to account                                  |
| AL        | Visa       | AFT or OCT eligibility                              |
| BB        | Visa       | Business to business                                |
| BI        | Visa       | Money transfer-bank-initiated                       |
| BP        | Visa       | Non-card bill payment                               |
| CB        | Visa       | Consumer bill payment                               |
| CI        | Visa       | Cash in                                             |
| CO        | Visa       | Cash out                                            |
| CP        | Visa       | Card bill payment                                   |
| FD        | Visa       | Funds disbursement (general)                        |
| FT        | Visa       | Funds transfer                                      |
| GD        | Visa       | Government disbursement                             |
| GP        | Visa       | Gambling payout (other than online gambling)        |
| LO        | Visa       | Loyalty and offers                                  |
| MD        | Visa       | Merchant disbursement                               |
| MI        | Visa       | Money transfer-merchant-initiated                   |
| MP        | Visa       | Merchant payment                                    |
| OG        | Visa       | Online gambling payout                              |
| PD        | Visa       | Payroll/pension disbursement                        |
| PG        | Visa       | Payment to government                               |
| PP        | Visa       | Person to person                                    |
| PS        | Visa       | Payment for goods and services (general)            |
| TU        | Visa       | Top-up for enhanced prepaid loads                   |
| WT        | Visa       | Wallet transfer                                     |

### Procedure

| Method          |
|:----------------|
| credit          |
| refund          |
| p2p_transaction |

### Request type

| Type                     | Description                                                                                                                                            |
|:-------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| confirmCreditTransaction | Sends transaction data to partner system. Primary endpoint needs to approve transaction in order to continue processing.                               |
| cancelCreditTransaction  | Sends transaction data to partner system if credit / refund / p2p transaction failed (transaction was not approved by the scheme or invalid response). |
| terminalNotification     | Sends transaction data to partner system for credit / refund / p2p transactions.                                                                       |
| tokenUpdateNotification  | Sends token status data to partner system.                                                                                                             |

### Response code

| Response Code | Description                                                                                                                                  |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| 00            | Approved or completed successfully                                                                                                           |
| 01            | Refer to card issuer                                                                                                                         |
| 02            | Refer to card issuer, special condition                                                                                                      |
| 03            | Invalid merchant                                                                                                                             |
| 04            | Capture card                                                                                                                                 |
| 05            | Do not honor                                                                                                                                 |
| 06            | Error                                                                                                                                        |
| 07            | Pick up card, special condition (fraud account)                                                                                              |
| 08            | Honor with ID                                                                                                                                |
| 10            | Partial Approval                                                                                                                             |
| 11            | Approved (V.I.P)                                                                                                                             |
| 12            | Invalid transaction                                                                                                                          |
| 13            | Invalid amount                                                                                                                               |
| 14            | Invalid card number                                                                                                                          |
| 15            | Invalid issuer                                                                                                                               |
| 16            | Approved to update track 3                                                                                                                   |
| 17            | Decline. Customer cancellation                                                                                                               |
| 19            | Re-enter transaction                                                                                                                         |
| 21            | Card not initialized                                                                                                                         |
| 22            | Suspected malfunction; related transaction error                                                                                             |
| 25            | Unable to locate original transaction                                                                                                        |
| 30            | Format error                                                                                                                                 |
| 32            | Decline. Partial reversal                                                                                                                    |
| 33            | Expired Card - Pick Up                                                                                                                       |
| 34            | Fraud                                                                                                                                        |
| 38            | PIN try limit exceeded                                                                                                                       |
| 39            | No credit account                                                                                                                            |
| 40            | Function requested is not supported                                                                                                          |
| 41            | Lost card                                                                                                                                    |
| 43            | Stolen card                                                                                                                                  |
| 45            | Fallback transaction is not allowed                                                                                                          |
| 51            | Insufficient funds/over credit limit                                                                                                         |
| 52            | No Cheque Account                                                                                                                            |
| 53            | No Savings Account                                                                                                                           |
| 54            | Expired card                                                                                                                                 |
| 55            | Invalid PIN                                                                                                                                  |
| 57            | Transaction not permitted to issuer/cardholder                                                                                               |
| 58            | Transaction not permitted to acquirer/terminal                                                                                               |
| 59            | Suspected Fraud                                                                                                                              |
| 61            | Exceeds withdrawal amount limit                                                                                                              |
| 62            | Restricted card                                                                                                                              |
| 63            | Security violation                                                                                                                           |
| 64            | Original transaction amount error                                                                                                            |
| 65            | Exceeds withdrawal count limit OR Identity Check Soft-Decline of EMV 3DS Authentication (merchant should resubmit authentication with 3DSv1) |
| 68            | Response Received Too Late                                                                                                                   |
| 70            | Contact Card Issuer                                                                                                                          |
| 71            | PIN Not Changed                                                                                                                              |
| 75            | Allowable number of PIN tries exceeded                                                                                                       |
| 76            | Invalid/nonexistent “To Account” specified                                                                                                   |
| 77            | Invalid/nonexistent “From Account” specified                                                                                                 |
| 78            | Invalid/nonexistent account specified (general)                                                                                              |
| 80            | Visa transactions: credit issuer unavailable. Private label: invalid date                                                                    |
| 81            | Domestic Debit Transaction Not Allowed (Regional use only)                                                                                   |
| 82            | Negative Online CAM, dCVV, iCVV, or CVV result Or Ofﬂine PIN authentication interrupted                                                      |
| 84            | Invalid Authorization Life Cycle                                                                                                             |
| 85            | Not declined                                                                                                                                 |
| 86            | PIN Validation not possible                                                                                                                  |
| 87            | Purchase Amount Only, No Cash Back Allowed                                                                                                   |
| 88            | Cryptographic failure                                                                                                                        |
| 89            | Unacceptable PIN - Transaction Declined - Retry                                                                                              |
| 90            | Cutoff is in process                                                                                                                         |
| 91            | Authorization System or issuer system inoperative                                                                                            |
| 92            | Unable to route transaction                                                                                                                  |
| 93            | Transaction cannot be completed; Violation of law                                                                                            |
| 94            | Duplicate transmission detected                                                                                                              |
| 96            | System error                                                                                                                                 |
| 97            | ATM/POS terminal number can not be located                                                                                                   |
| 98            | Issuer response not received by CUPS                                                                                                         |
| 99            | PIN block error                                                                                                                              |
| A0            | MAC failed                                                                                                                                   |
| A2            | Successful transaction with fault                                                                                                            |
| A3            | Account not found in Transfer-in side                                                                                                        |
| A4            | Successful transaction with fault                                                                                                            |
| A5            | Successful transaction with fault                                                                                                            |
| A6            | Successful transaction with fault                                                                                                            |
| A7            | Security processing failure                                                                                                                  |
| B1            | No arrears (transaction receipt not printed)                                                                                                 |
| C1            | Illegal status of Acquirer                                                                                                                   |
| D1            | Incorrect IIN                                                                                                                                |
| D2            | Date error                                                                                                                                   |
| D3            | Invalid file type                                                                                                                            |
| D4            | File processed                                                                                                                               |
| D5            | No such file                                                                                                                                 |
| D6            | Not supported by receiver                                                                                                                    |
| D7            | File locked                                                                                                                                  |
| D8            | Unsuccessful                                                                                                                                 |
| D9            | Incorrect file length                                                                                                                        |
| DA            | File compression error                                                                                                                       |
| DB            | File name error                                                                                                                              |
| DC            | File cannot be received                                                                                                                      |
| F1            | File record format error                                                                                                                     |
| F2            | File record repeat                                                                                                                           |
| F3            | File record not existing                                                                                                                     |
| F4            | File record error                                                                                                                            |
| 0A            | Approval with load                                                                                                                           |
| 1A            | Strong Customer Authentication (SCA) required (VISA specific)                                                                                |
| N0            | Force STIP                                                                                                                                   |
| N1            | Items not on Bankbook beyond limit, declined                                                                                                 |
| N3            | Cash service not available                                                                                                                   |
| N4            | Cashback request exceeds issuer limit                                                                                                        |
| N7            | Decline for CVV2 failure                                                                                                                     |
| P1            | Contact number cannot be found in issuer's system                                                                                            |
| P2            | Invalid billing information                                                                                                                  |
| P5            | PIN change/unblock request declined                                                                                                          |
| P6            | Unsafe PIN                                                                                                                                   |
| R0            | Stop payment order                                                                                                                           |
| R1            | Revocation of authorization order                                                                                                            |
| R3            | Revocation of all authorizations order                                                                                                       |
| Y1            | Offline transaction is successful                                                                                                            |
| Y3            | Unable to go online. Offline transaction is successful                                                                                       |
| Z1            | Offline transaction fails                                                                                                                    |
| Z3            | Unable to go online; Declined                                                                                                                |

### Response type

| Type              |
|:------------------|
| authorize         |
| credit            |
| sale              |
| refund            |
| balance_inquiry   |
| cancel            |
| reverse           |
| capture           |
| cash_disbursement |

### Authorize type

| Authorize Type | Description               |
|:---------------|:--------------------------|
| pre            | Pre authorization         |
| inc            | Incremental authorization |
| final          | Final authorization       |
| normal         | Normal authorization      |

### Scheme

| ID | Scheme     |
|:---|:-----------|
| 1  | MasterCard |
| 2  | Visa       |
| 3  | UnionPay   |
| 6  | JCB        |

### Status

| Status  |
|:--------|
| success |
| error   |

### Status code

| Status Code | Description                                                                         |
|:------------|:------------------------------------------------------------------------------------|
| 000         | Success                                                                             |
| 001         | Invalid credentials.                                                                |
| 002         | Invalid message type.                                                               |
| 003         | Unknown field submitted: __FIELD__.                                                 |
| 004         | Invalid data: missing required field: __FIELD__.                                    |
| 005         | Invalid transaction type.                                                           |
| 006         | Card holder billing address data is required when performing AVS check.             |
| 007         | Card PIN is required for online PIN verification.                                   |
| 008         | Invalid method.                                                                     |
| 009         | Transaction not found. Please send initial authorize transaction id.                |
| 010         | Amount to be captured is greater than authorized amount.                            |
| 011         | Terminal is not supporting partial approvals.                                       |
| 012         | Capture amount must be greater than zero.                                           |
| 013         | Authorize is in state which could not be captured.                                  |
| 014         | Credit type indicator is required.                                                  |
| 015         | Wrong authorize type given.                                                         |
| 017         | Merchant category code is not enabled.                                              |
| 018         | Not all payment facilitator data is submitted.                                      |
| 019         | Not all sub merchant data is submitted.                                             |
| 020         | Sub merchant country must be three-character alphabetic Country Code.               |
| 021         | Sub merchant must be two-character alphabetic State Code.                           |
| 022         | Local transaction time and date is required.                                        |
| 023         | Amount is required.                                                                 |
| 024         | Length of transaction descriptor is exceeded.                                       |
| 025         | Unknown method.                                                                     |
| 027         | Wrong parent transaction message type.                                              |
| 028         | Can not refund transaction which do not have captured or cleared state.             |
| 029         | Refund amount must be greater than zero.                                            |
| 030         | Amount to be refunded is greater than captured amount.                              |
| 031         | Wrong message type for refund.                                                      |
| 032         | Can not capture because of bad response code on authorize.                          |
| 033         | Can not refund because transaction is already refunded.                             |
| 036         | Authorize expired.                                                                  |
| 037         | Can not reverse captured transaction.                                               |
| 038         | Reverse amount must be greater than zero.                                           |
| 039         | Wrong message type for reverse.                                                     |
| 040         | Amount for balance inquiry must be zero.                                            |
| 041         | Wrong PAN entry mode.                                                               |
| 042         | Wrong remote payments program.                                                      |
| 043         | Parent transaction ID is not required.                                              |
| 044         | End date is greater than start date.                                                |
| 045         | Invalid value for field unique_transaction_reference                                |
| 046         | Invalid value for field additional_message                                          |
| 047         | Invalid value for field funding_source                                              |
| 048         | Invalid value for field participation_id                                            |
| 049         | Invalid value for field transaction_purpose                                         |
| 050         | Invalid value for field language_identification                                     |
| 051         | Invalid value for field language_data                                               |
| 052         | Invalid value for field first_name                                                  |
| 053         | Invalid value for field middle_name                                                 |
| 054         | Invalid value for field last_name                                                   |
| 055         | Invalid value for field street_address                                              |
| 056         | Invalid value for field city                                                        |
| 057         | Invalid value for field state_code                                                  |
| 058         | Invalid value for field country                                                     |
| 059         | Invalid value for field postal_code                                                 |
| 060         | Invalid value for field phone_number                                                |
| 061         | Invalid value for field date_of_birth                                               |
| 062         | Invalid value for field account_number                                              |
| 063         | Invalid value for field identification_type                                         |
| 064         | Invalid value for field identification_number                                       |
| 065         | Invalid value for field identification_country_code                                 |
| 066         | Invalid value for field identification_expiration_date                              |
| 067         | Invalid value for field nationality                                                 |
| 068         | Invalid value for field country_of_birth                                            |
| 072         | Invalid value for field p2p_transaction_reference_data                              |
| 069         | Card processing is forbidden                                                        |
| 070         | Recurring payment is not allowed                                                    |
| 071         | Time gap between recurring payment requests is too low                              |
| 073         | Transaction amount must be greater then zero                                        |
| 074         | Sale Point account not found                                                        |
| 075         | Limit validation failed                                                             |
| 076         | Merchant is not active                                                              |
| 077         | Terminal is not active                                                              |
| 078         | Sale point is not active                                                            |
| 079         | Reverse amount must be equal to authorize amount.                                   |
| 080         | Reverse amount must be less or equal to authorize amount.                           |
| 081         | Reverse operation is allowed only for last transaction.                             |
| 082         | Reverse period has expired.                                                         |
| 083         | Reverse authorize is not valid.                                                     |
| 085         | Transaction has been already reversed.                                              |
| 084         | Only last transaction can be reversed.                                              |
| 086         | Recurring payment not found.                                                        |
| 087         | PAN is invalid                                                                      |
| 088         | Card expiry year is invalid                                                         |
| 089         | Card expiry month is invalid                                                        |
| 090         | Transaction currency is invalid                                                     |
| 091         | Invalid request data.                                                               |
| 092         | Merchant api method (__METHOD__) is currently disabled.                             |
| 093         | Merchant api method (__METHOD__) not found.                                         |
| 094         | Terminal (__TERMINAL__) does not have permission to access method (__METHOD__).     |
| 095         | Transaction descriptor contains invalid characters.                                 |
| 096         | Bad original request response code.                                                 |
| 097         | Api version is invalid                                                              |
| 098         | Merchant mcc (__MCC__) not found.                                                   |
| 099         | Bin range not found.                                                                |
| 100         | Request is received for processing.                                                 |
| 101         | MCC value (__MCC__) is not valid.                                                   |
| 102         | Invalid receiver account number.                                                    |
| 103         | Refund currency is not the same as transactions currency                            |
| 104         | Cannot reverse sent for clearing transactions                                       |
| 105         | Recurring payment was not initiated                                                 |
| 106         | Funding source is not valid for account: (__ACCOUNT__).                             |
| 107         | There was an error in P2P transaction processing.                                   |
| 108         | PRE authorize currency does not match                                               |
| 109         | This type of operation is not available for this type of card                       |
| 110         | Reverse currency should match original authorize currency                           |
| 111         | Parent transaction not found.                                                       |
| 112         | Cancelled transaction cannot be reversed.                                           |
| 113         | Both date_updated and id_from should be provided if one of them is not 0            |
| 115         | Local transaction time and/or date format is incorrect.                             |
| 116         | Card has expired                                                                    |
| 117         | Either card_token or card details should be provided. You cannot provide both.      |
| 118         | Invalid date provided. The date format should be `Y-m-d H:i:s`.                     |
| 119         | From id must be of type integer.                                                    |
| 120         | Authorization not found.                                                            |
| 121         | Value is too long for field: (__FIELD__)                                            |
| 122         | Value is invalid for field: (__FIELD__)                                             |
| 124         | Source_of_funds value (__VALUE__) is not allowed for this merchant                  |
| 123         | Error occurred, please try again later. If error persists please contact support.   |
| 125         | Duplicated request is not allowed.                                                  |
| 034         | Card is being processed.                                                            |
| 035         | Authorize is already cancelled.                                                     |
| 126         | Transaction is being processed.                                                     |
| 127         | Parent transaction ID is required for this operation.                               |
| 128         | There was an error in INIT_S3D processing.                                          |
| 129         | Transaction not found.                                                              |
| 130         | Second presentment has already been created for this transaction.                   |
| 131         | Value is too short for field: (__FIELD__)                                           |
| 132         | Value is invalid for field: (__FIELD__). Valid values: (__VALID_VALUES__).          |
| 133         | Field: (__FIELD__) length is invalid.                                               |
| 134         | Cancel is not allowed for this procedure.                                           |
| 135         | Wrong procedure for cancel                                                          |
| 016         | Method is not allowed                                                               |
| 026         | Decryption failed                                                                   |
| 136         | Unknown field submitted: __FIELD__                                                  |
| 137         | (__KEYTYPE__) key not found.                                                        |
| 138         | Security related control information is required for online PIN verification        |
| 140         | Terminal pan entry mode is not enabled                                              |
| 141         | Terminal guid is incorrect                                                          |
| 142         | Field: (__FIELD__) can not be empty.                                                |
| 139         | Terminal pan entry mode not found                                                   |
| 143         | Actual authorize not found.                                                         |
| 144         | Terminal not found.                                                                 |
| 145         | __ENTITY__ not found.                                                               |
| 146         | Terminal type must be physical.                                                     |
| 147         | Field (__FIELD__) is required.                                                      |
| 148         | Pin block length is not valid                                                       |
| 149         | Encryption failed.                                                                  |
| 150         | Unknown method.                                                                     |
| 151         | Card data should match with parent transaction card data                            |
| 152         | S3D error: Issuer or cardholder not enrolled. S3D error status code: 2              |
| 153         | S3D error: Not in cache. S3D error status code: 3                                   |
| 154         | S3D: Attempt. S3D status code: 4                                                    |
| 155         | S3D error: Authentication unavailable. S3D error status code: 5                     |
| 156         | S3D error: 3-D Secure Error. S3D error status code: 6                               |
| 157         | S3D error: Fraud Score blocked. S3D error status code: 8                            |
| 158         | S3D error: Pending transaction. S3D error status code: 9                            |
| 159         | S3D error: Skip device case. S3D error status code: 80                              |
| 160         | S3D error: Network error. S3D error status code: 91                                 |
| 161         | S3D error: Directory error. S3D error status code: 92                               |
| 162         | S3D error: Configuration errors. S3D error status code: 93                          |
| 163         | S3D error: Input error. S3D error status code: 94                                   |
| 164         | S3D error: No directory found for PAN/cardtype. S3D error status code: 95           |
| 165         | S3D error: No version 2 directory found for PAN/cardtype. S3D error status code: 96 |
| 166         | S3D error: System error. S3D error status code: 99                                  |
| 167         | Key type (__KEY__) is not implemented                                               |
| 168         | Active key not found                                                                |
| 169         | Cancel batch not provided                                                           |
| 170         | 3ds authentication not found.                                                       |
| 171         | An array of cards must be provided                                                  |
| 172         | Invalid data. Invalid card details.                                                 |
| 173         | Not registered in card update program.                                              |
| 174         | Card Update Batch was not found                                                     |
| 175         | Invalid field (__FIELD__) value. Value must be unique.                              |
| 180         | Authorize could not be incremented because of the current authorize state           |
| 181         | Authorize could not be finalize because of the current authorize state              |
| 182         | Could not proceed with your request because of bad response code on authorize       |
| 183         | Mpi client configuration error                                                      |
| 185         | S3D error: Authentication failed. S3D error status code: 0                          |
| 187         | S3D error: Transaction not found. S3D error status code: 97                         |
| 196         | Cancel period has expired                                                           |
| 223         | Amount must be greater than zero                                                    |
| 225         | Invalid card token                                                                  |
| 226         | Amount must be set to zero in card verification requests                            |
| 400         | Error in processing.                                                                |
| 401         | Bad request.                                                                        |
| 402         | Invalid token.                                                                      |
| 403         | Worker API error.                                                                   |
| 404         | Custom.                                                                             |
| 405         | Unknown response status.                                                            |
| 406         | Not Found Error.                                                                    |
| 600         | Processor error.                                                                    |
| 601         | Processor error unknown.                                                            |
| 800         | Callback error.                                                                     |
| 996         | Your request has been canceled.                                                     |
| 997         | There is a problem in your API configuration.                                       |
| 998         | Exception                                                                           |
| 999         | Unknown error                                                                       |

### Token Status

| Value       | Meaning                                   |
|:------------|:------------------------------------------|
| INACTIVE    | Token has not yet been activated          |
| ACTIVE      | Token is active and ready to transact     |
| SUSPENDED   | Token is suspended and unable to transact |
| DEACTIVATED | Token has been permanently deactivated    |

## Security
### Authentication

MAI interface will send encrypted requests with headers to identify MAI config and MAI endpoint and sign to decrypt message.

**Request Headers**

| Parameter          | Notation | Type      | Length | Description                                                              |
|:-------------------|:---------|:----------|:-------|:-------------------------------------------------------------------------|
| x-version          | M        | ANS       | 1-8    | MAI API request version - `1.0`                                          |
| x-source-id        | M        | N         | 1-20   | MAI configuration ID.                                                    |
| x-endpoint-id      | M        | N         | 1-20   | MAI endpoint ID.                                                         |
| x-mai-reference-id | C        | AN / NULL | 1-16   | MAI reference ID configurated in terminal. NULL if no value configurated |
| x-sign             | M        | AN        | 1-255  | "Secret" encrypted with merchant private key.                            |

**Response Headers**

| Parameter     | Notation | Type | Length | Description                                               |
|:--------------|:---------|:-----|:-------|:----------------------------------------------------------|
| x-status-code | M        | AN   | 1-3    | [`Available status codes`](#appendix--enum--status)       |
| x-sign        | M        | AN   | 1-255  | "Secret" encrypted with Tribe private key from acquirer credentials. |

### Cryptography

All request and response messages body should be encrypted. 

**Request message data (from Client to API) encryption**

* Random secret of 32 characters length should be generated.
* Request message data should be encrypted with the random secret. 
* Random secret should be encrypted using Client private key and must be provided in request message as (`sign`). 
* Request message sign will be decrypted using the Client provided public key.
* The decrypted sign will be used as a _secret_ to decrypt the request message data.

**Response message data (from API to Client) encryption**

* Random secret of 32 characters length will be generated.
* Response message data will be encrypted with the random secret. 
* Random secret will be encrypted using Tribe private key and it will be provided in response message as (`sign`). 
* Response message sign should be decrypted using the Tribe provided public key.
* The decrypted sign should be used as a _secret_ to decrypt response message data.

Encrypted request/response body should be plain text. Private key must be in a PKCS #8 format. Public key can be extracted from private key using command `openssl rsa -in private.pem -pubout > public.pub` and should be provided to Tribe. **Examples for method request/response are provided in decrypted format**

**Encryption algorithm:**

```php
/**
 * @param array  $data
 * @param string $privateKey
 *
 * @return string
 */
public function encryptRequest(array $data, string $privateKey): string
{
    $secret = 'T3A7Ug7DbVN88qtsQ3jqdr3EfvVwbTif'; // randomly generated 32 characters string, which should be different on each request
    openssl_private_encrypt($secret, $bin, $privateKey);
    $sign = base64_encode($bin); // this sign will be used in header `x-sign`
    $iv = bin2hex(openssl_random_pseudo_bytes(8)); 
    $encrypted = openssl_encrypt(json_encode($data), 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);

    return $iv.base64_encode($encrypted);
}
```

**Decryption algorithm:**

```php
/**
 * @param string $data
 * @param string $sign
 * @param string $publicKey
 *
 * @return string
 */
public function decryptResponse(string $data, string $sign, string $publicKey): string
{
    openssl_public_decrypt(base64_decode($sign), $secret, $publicKey);
    $iv = substr($data, 0, 16);
    $originalData = base64_decode(substr($data, 16));

    return openssl_decrypt($originalData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
}
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

| Notation  | Meaning                         |
|:----------|:--------------------------------|
| Not blank | Not empty, not null, isset      |
| NULL      | null                            |
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
