<!--
 # Introduction
 ## Using documentation
 ## API
 ## Overview
 Learn about the ISAAC Transaction Authorization Interface API webhooks and objects.

 Scheme - payment network (Mastercard, VISA, UPI, External Payment, Internal
 Payment, etc);
 Platform - any of ISAC processor’s parts, modules, operations;
 Merchant - part which sells goods and/or provides service for holder and
 initiates financial transactions;
 Acquirer - part which processes scheme’s cards on behalf of merchant;
 Client - service, External Host API user.
 TAI - Transaction Authorization Interface
 ## Common workflows
 -->
# Introduction
## Overview

The %brandName% webhook system, Transaction Authorisation Interface (TAI) is designed to provide real time messages to the partner system to either engage in the transaction or to simply update your platform and customers of any messages received.

The information the %brandName% platform can send will cover:

- Card transaction authorizations
- Card transaction presentments
- Card status changes
- Instant bank payments
- Direct debit bank payments
- External loading payments
- Negative acknowledgements
- Fraud notifications

## Security

**Please make sure to read appendix [`Security`](#appendix--security) before proceeding with using this API.**

## Setup Process

**Step 1** – Complete the basic requirements sheet supplied by the %brandName% team which defines high level detail about the programme we should setup in our Sandbox platform.

**Step 2** – Supply the test URL end point for your system that %brandName% will configure in the Sandbox. This will be the destination that request messages will be sent to, and from where the Response messages will be sent.

If you need to whitelist the %brandName% Sandbox IP address on your host, the IP address you need is: `%sandboxIp%`

**Step 3** – Configure the webhook security details supplied by %brandName%. As part of the configuration on the %brandName% side:

`API ID` - To use the TAI API you must have an API ID. The API ID is a unique identifier that is used to authenticate requests associated with your company for usage purposes.
`API key` - Unique key for request raw data encrypting and decrypting.
`API secret` - A secret shared between %brandName% and your system, used for request data integrity validation.

**Step 4** – Determine the TAI settings. Alongside the URL configuration there are a number of elements %brandName% can configure that will alter the way in which you use the TAI interface. The elements we can configure are listed below and will be discussed as part of the programme implantation to identify the right settings for your installation.

|           Element            |                                    Impact                                    |                                                                                                                                                                          Description                                                                                                                                                                           |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Stand In                     | Card transaction authorizations.                                                                                                | If this setting is selected, %brandName% will be involved in the decision making process for the transaction. If "Stand in" is not selected, only limits and risk will be checked, however, balances won't be managed.                                                                                                                                         |
| Internal Balance Check       | Card transaction authorizations where %brandName% is the primary source for the balance only (only if `Stand In` setting is enabled). | If this setting is selected, before sending notification %brandName% system initiates internal balance checking procedure.                                                                                                                                                                                                                               |
| Authorisation Notification   | Card transaction authorizations. Real time Partner system response expected. | This setting defines whether the %brandName% system will send card transaction authorization to the partner system.                                                                                                                                                                                                                                            |
| Transaction Notification     | Card transaction presentments.                                                                                                  | This setting defines whether %brandName% will send Transaction / Clearing notifications to the partner platform.                                                                                                                                                                                                                                               |
| Raw Message send             | Card transaction authorizations and presentments.                            | If this setting is selected, %brandName% will send the messages to the partner platform in raw scheme defined ISO8583 format. If this setting is selected, the partner system should engage with the schemes to ensure the correct formatting is used.                                                                                                         |
| Primary                      | Card transaction authorizations. Real time Partner system response expected. | %brandName% can configure multiple endpoints for one program. If the Primary setting is selected and the Partner system is involved in the transaction flow, it is this endpoint %brandName% are expecting the decision on the Authorisation from. All other endpoints without this setting will just be expected to receive notification of the transactions. |
| Fees Merge                   | Card transaction presentments.                                                                                                  | If this setting is selected, then authorize amount and authorize fee values will be sent within the same transaction message (fee value will be provided with `transactionFee` parameter), but if not selected they will be sent as a separate messages.                                                                                                       |
| Blend in fx                  | Card transaction authorizations/ presentments.                                                                                  | If this setting is selected, then fx fees will be combined within the transaction message in single parameter `holderAmount`, but if not selected they will be sent as a separate parameter `currencyConvertionFee`.                                                                                                                                           |
| Bypass instant notifications | Card transaction authorizations.                                                                                                | This setting is used when the partner platform is just looking to receive transaction notifications but not be involved in the transaction decision making flow.                                                                                                                                                                                               |

## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

%brandName% reserves the right to append Conditional 'C' and/or Optional 'O' fields without prior notice. The client's system/application should be prepared to accept the appended fields. All such changes will be Backward Compatible and shouldn't change the application logic.

All Backward Incompatible changes (related to the mandatory 'M' field) will be introduced ONLY with a new TAI API [`version release`](#appendix--version-guide).

# Webhooks
## Request

As webhook messages originate from the %brandName% platform, the request message shows the format of the webhook the %brandName% platform will send to you as the Partner platform. It is therefore important the partner platform is designed to recognise these fields as inbound messages and make use of the fields sent.

| Parameter                   | M  | Length | Type                                                                          | Description                                              |
|:-----------------------------|:--|:-------|:--------------------------------------------------------------------------------|:----------------------------------------------------------|
| sourceId                    | M  | 1-11   | N                                                                             | TAI configuration id.                                    |
| version                     | M  | 1-11   | N                                                                             | Fixed `1.2`.                                             |
| apiId                       | M  | 1-32   | AN                                                                            | API ID.                                                  |
| requestType                 | M  | \-     | LIST                                                                          | [`Request type`](#appendix--enum--request-type)          |
| notificationSequence        | M  | 1-11   | N                                                                             | The higher value, the later part of processing has made decision. Priority is on the higher value          |
| sendingRetriesCount         | M  | 1      | N                                                                             | Retry counter value.                                     |
| timestamp                   | M  | 1-12   | N                                                                             | Unix timestamp when request was created.                 |
| cardAuthorization           | C  | \-     | [`CardAuthorization`](#appendix--type--cardauthorization)                     | If `requestType` contains `cardAuthorization`.           |
| cardSettlement              | C  | \-     | [`CardSettlement`](#appendix--type--cardsettlement)                           | If `requestType` contains `cardSettlement`.              |
| cardStatusChange            | C  | \-     | [`CardStatusChange`](#appendix--type--cardstatuschange)                       | If `requestType` contains `cardStatusChange`.            |
| externalPaymentSettlement   | C  | \-     | [`ExternalPaymentSettlement`](#appendix--type--externalpaymentsettlement)     | If `requestType` contains `externalPaymentSettlement`.   |
| directDebitMandate          | C  | \-     | [`DirectDebitMandate`](#appendix--type--directdebitmandate)                   | If `requestType` contains `directDebitMandate`.          |
| directDebitDue              | C  | \-     | [`DirectDebitDue`](#appendix--type--directdebitdue)                           | If `requestType` contains `directDebitDue`.              |
| directCreditReceived        | C  | \-     | [`DirectCreditReceived`](#appendix--type--directcreditreceived)               | If `requestType` contains `directCreditReceived`.        |
| negativeAcknowledgement     | C  | \-     | [`NegativeAcknowledgement`](#appendix--type--negativeacknowledgement)         | If `requestType` contains `negativeAcknowledgement`.     |
| cardTokenization            | C  | \-     | [`CardTokenization`](#appendix--type--cardtokenization)                       | If `requestType` contains `cardTokenization`.            |
| financialDetailAddendum     | C  | \-     | [`FinancialDetailAddendum`](#appendix--type--financialdetailaddendum)         | If `requestType` contains `financialDetailAddendum`.     |
| epmAddressAssignCompleted   | C  | \-     | [`EpmAddressAssignCompleted`](#appendix--type--epmaddressassigncompleted)     | If `requestType` contains `epmAddressAssignCompleted`.   |
| epmAddressAssignFailed      | C  | \-     | [`EpmAddressAssignFailed`](#appendix--type--epmaddressassignfailed)           | If `requestType` contains `epmAddressAssignFailed`.      |
| customNotification          | C  | \-     | [`CustomNotification`](#appendix--type--customnotification)                   | If `requestType` contains `customNotification`.          |
| externalPaymentNotification | C  | \-     | [`ExternalPaymentNotification`](#appendix--type--externalpaymentnotification) | If `requestType` contains `externalPaymentNotification`. |
| accountStatusChange         | C  | \-     | [`AccountStatusChange`](#appendix--type--accountstatuschange)                 | If `requestType` contains `accountStatusChange`.         |
| epmAddressStatusChange      | C  | \-     | [`EpmAddressStatusChange`](#appendix--type--epmaddressstatuschange)           | If `requestType` contains `epmAddressStatusChange`.      |
| currencyExchangeNotification  | C  | \-     | [`CurrencyExchangeNotification`](#appendix--type--currencyexchangenotification) | If `requestType` contains `currencyExchangeNotification`.  |
| cardAuthorizationExpired      | C  | \-     | [`CardAuthorizationExpired`](#appendix--type--cardauthorizationexpired)         | If `requestType` contains `cardAuthorizationExpired`.      |
| balanceAdjustment             | C  | \-     | [`balanceAdjustment`](#appendix--type--balanceadjustment)                       | If `requestType` contains `balanceAdjustment`.             |
| holderAuthentication          | C  | \-     | [`holderAuthentication`](#appendix--type--holderauthentication)                 | If `requestType` contains `holderAuthentication`.          |
| holderAuthenticationNotification | C  | \-  | [`holderAuthenticationNotification`](#appendix--type--holderauthenticationnotification) | If `requestType` contains `holderAuthenticationNotification`. |
| updateEpmAddressNotification     | C  | \-  | [`updateEpmAddressNotification`](#appendix--type--updateepmaddressnotification) | If `requestType` contains `updateEpmAddressNotification`.             |
| disputeStatusChange              | C  | \-  | [`disputeStatusChange`](#appendix--type--disputestatuschange)                           | If `requestType` contains `disputeStatusChange`.              |


```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "cardAuthorization"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": {},
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

**Security note**

For security reasons all users of this API can check if received request is the same as it was sent out.
To check this, client needs to retrieve `x-hook-signature` parameter from request headers.
Client has to generate a hash from the data sent to them and compare that hash with what we sent in `x-hook-signature`. [`How to generate security hash`](#appendix--security--hash-generating)

## Response

This defines the content of the response the %brandName% platform expects to receive from the Partner platform. If no response is received to acknowledge the message, the %brandName% system will attempt to re-send this until the partner system responds.

If the Partner platform has settings configured for card transaction Authorisations to respond as part of the transaction flow, then it is important the partner system build any logic to be efficient so that real time responses are possible, given the very short window %brandName% have to respond the card scheme before the transaction times out.

To prevent scheme timeouts from occurring, %brandName% will configure a timeout threshold, after which %brandName% will make a final decision on whether to approve or decline the transaction. The setting applied will be defined during your implementation process to define the optimum timeout.

| Parameter | M  | Description                                                                                                                                                     |
|:----------|:--|:---------------------------------------------------------------|
| status    | M  | `success / error`                                                                                                                                               |
| data      | C  | [`Response data`](#appendix--enum--response-data)  |
| message   | C  | Error message in client system. Mandatory if status = `error`.                                                                                                  |
| errorCode | C  | Error code in client system. Mandatory if status = `error`.                                                                                                     |

Response example when `status` equal to `success`:

```json
{
    "status": "success",
    "data": {
        "responseCode": "00",
        "billingAmount": "11186",
        "holderAmount": "11186",
        "availableBalance": 100008814,
        "settledBalance": 100020000
    }
}
```

Response example when `status` equal to `error`:

```json
{
    "status": "error",
    "message": "Card ID is not provided",
    "errorCode": "50"
}
```

# Appendix

## Version guide

| Update type   | Notation | Compatibility            | Description                                                                                                                                       |
|---------------|----------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Major version | X.1.1    | Breaking API changes     | A major update that will most likely affect the client's integration and therefore must be reviewed. Resets the minor and patch versions to zero. |
| Minor version | 1.X.1    | Non-backwards compatible | Minor changes that might affect the client's integration and therefore must be reviewed.                                                          |
| Patch         | 1.1.X    | Backwards compatible     | Minor changes that will not affect the client's integration - reviewing is not necessary.                                                         |

## Changelog

| Version | Date               | Updates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.2.109 | July 21, 2022      | <!-- lis --> Updated `externalPaymentSettlement` request. Added new field `actualEndToEndIdentifier`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.108 | July 20, 2022      | <!-- ksa --> Added `schemeId` to `CardAuthorization` and `CardSettlement` tai message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.107 | June 10, 2022      | <!-- dme --> Added a new external payment transaction type `Transaction outbound cancelation created`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.106 | June 8, 2022       | <!-- dme --> Added a new external payment transaction type `Transaction outbound cancelation rejected`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.105 | May 27, 2022       | <!-- dme --> Added new external payment transaction status codes `Should not pay` and `Settled through suspense account`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.104 | May 25, 2022       | <!-- dme --> Added a new external payment transaction status code `Required data is missing`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.103 | May 25, 2022       | <!-- fba --> Updated `CardAuthorizationExpired` json example.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.102 | April 25, 2022     | <!-- mka --> Added new field `supplementaryData` in `ExternalPaymentSettlement`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.101 | April 20, 2022     | <!-- dme --> Added a new request type `disputeStatusChange`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.99  | April 19, 2022     | <!-- dme --> Added a new field `returnedEpmTransactionId` in `ExternalPaymentSettlement`. Updated `returnedEpmTransactionId` field description in `ExternalPaymentNotification` request.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.98  | March 25, 2022     | <!-- mak --> Added a new field `additionalNote` to `externalPaymentSettlement` and `externalPaymentNotification` request webhooks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.97  | March 14, 2022     | <!-- mka --> Added `reversalIndicator` to `cardSettlement`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.96  | February 24, 2022  | <!-- dme --> Added new fields `disputeId` and `externalDisputeId` in `cardSettlement` request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.95  | February 18, 2022  | <!-- dme --> Changed `originatorServiceUserNumber` length from 10 to 255 and added new parameters `status` and `errorReason` to the `mandate` field of `DirectDebitDue` and `DirectDebitMandate` webhooks.                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.94  | January 28, 2022   | <!-- sas --> Added `updateEpmAddressNotification` request type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.2.93  | December 16, 2021  | <!-- lis --> Added new request type `cardTokenization`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.92  | January 20, 2022   | <!-- dme --> Updated `Transaction code` list. Added new records: `Dispute credit adjustment` and `Dispute debit adjustment`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                     |
| 1.2.91  | January 5, 2022    | <!-- lis --> Added `holderAuthenticationNotification` request type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.90  | January 3, 2022    | <!-- fba --> Added currency table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.89  | December 17, 2021  | <!-- ksa --> Added `adviceReason` to `CardAuthorization` webhook as well as reason codes list to `Enum` section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.88  | December 10, 2021  | <!-- ksa --> Added `epmMandateId` to `directDebitDue`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.87  | November 8, 2021   | <!-- dme --> Added a new field `bankProviderReasonCode` to `externalPaymentSettlement`, `externalPaymentNotification` and `directCreditReceived` request webhooks. Added a new field `reasonDescription` to `directCreditReceived` request webhook.                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.86  | October 27, 2021   | <!-- mka --> CardAuthorization type fields `transactionFee` and `currencyConvertionFee` changed to display amount diff, or replacement amount depending on authorize type.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.85  | October 8, 2021    | <!-- dme --> Updated `Transaction code` list. Added new records: `P2P debit funds transfer` and `P2P credit funds transfer`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.84  | August 26, 2021    | <!-- sas --> Added new fields `cardProgramId` and/or `accountProgramId` to `CardAuthorization`, `CardSettlement`, `CardStatusChange`, `DirectCreditReceived`, `DirectDebitDue`, `DirectDebitMandate`, `EpmAddressAssignCompleted`, `EpmAddressAssignFailed`, `ExternalPaymentSettlement`, `FinancialDetailAddendum`, `NegativeAcknowledgement`, `ExternalPaymentNotification`, `AccountStatusChange`, `EpmAddressStatusChange`, `CurrencyExchangeNotification`, `CardAuthorizationExpired`, `BalanceAdjustment`, `HolderAuthentication`.                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.84  | August 10, 2021    | <!-- fba --> Added `acquirerReferenceNumber` to the `CardSettlement`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.83  | June 28, 2021      | <!-- vr --> Added new external payment transaction status codes "Hold by risk processor".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.82  | June 11th, 2021    | <!-- mak --> Added new field `interchangeRateDesignator` in `cardSettlement` request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.81  | June 06, 2021      | <!-- sas --> Added new field `triggeredLimitId` to `CardAuthorization`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.80  | April 22, 2021     | <!-- lis --> Added new fields `reasonCode` and `note` to `CardStatusChange`, `AccountStatusChange`, `EpmAddressStatusChange`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.79  | April 27th, 2021   | <!-- mka --> Added new field `notificationSequence`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.78  | May 20th, 2021     | <!-- mla --> Added `cardRequestId` in `CardAuthorization`, `CardSettlement`, `CardStatusChange`, `CustomNotification`, `DirectCreditReceived`, `DirectDebitDue`, `ExternalPaymentSettlement`, `NegativeAcknowledgement`, `CardAuthorizationExpired`, `BalanceAdjustment`, `HolderAuthentication`.                                                                                                                                                                                                                                                                                                             |
| 1.2.77  | May 17th, 2021     | <!-- eb --> Added new field `txCurrencyFee` in `cardSettlement` request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.76  | May 3th, 2021      | <!-- dme --> Updated `Transaction type` list. Added new records: `74`, `75` and `76`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.75  | April 20th, 2021   | <!-- vr --> Added new external payment transaction status code "Rejected by risk processor".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.74  | April 15, 2021     | <!-- eb --> Added a new transaction types "P2P credit cash deposit", "P2P debit cash deposit", "P2P credit merchant payment" and "P2P debit merchant payment".                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.73  | April 2, 2021      | <!-- mka --> Added `Signature` to security check bitmap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.72  | March 24, 2020     | <!-- lis --> Updated `holderAuthentication` request. Added new fields `authRequestId` and `requestReference`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.71  | March 19, 2021     | <!-- sas --> Added new field `triggeredLimitId` to `ExternalPaymentNotification`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.70  | February 8, 2021   | <!-- lis --> Added `holderAuthentication` request type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.69  | March 10, 2021     | <!-- eb --> Moved `transactionStatusCode` values to appendix with added description for codes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.68  | March 8, 2021      | <!-- mla --> Added new fields `loadSource` and `loadType` to `BalanceAdjustment`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.67  | February 20, 2021  | <!-- mla --> Added new load sources "Balance adjustment load from GUI", "Balance adjustment load from PM API" and "Balance adjustment load by system"                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.66  | February 17, 2021  | <!-- dme --> Added new external payment transaction status codes: `8`, `9`, `10` and `11`. <br> Renamed external payment notification action "Inbound held webhook" to "Inbound held by bank". Added new actions: `10`, `11`, `12` and `13`. <br> Added new records in `External payment Transaction type` list: `23`, `24`, `25`, `26`, `27`, `28` and `29`. <br> Added new field `reasonCode` in `externalPaymentNotification` requests.                                                                                                                                                                    |
| 1.2.65  | January 27, 2021   | <!-- dme --> Updated `accountNumber` length in `External payment address` and request type `epmAddressAssignCompleted`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.64  | January 21, 2021   | <!-- eb --> Added "transactionCounters" parameter in "cardAuthorization", "directCreditReceived", "ExternalPaymentSettlement" and "cardSettlement" methods.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.63  | January 21, 2021   | <!-- dme --> Updated `directCreditReceived` request. Changed `epmAddressFrom` type from mandatory to conditional. <br> Updated `directDebitDue` request. Added a new field `epmAddressTo`. <br> Updated `externalPaymentNotification` request. Changed `epmAddressFrom` and `epmAddressTo` types from mandatory to conditional.                                                                                                                                                                                                                                                                               |
| 1.2.62  | January 18, 2021   | <!-- mla --> Added new fields `baseConversionRate` and `isConversionFeeBlended` to `DirectCreditReceived`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.61  | January 8, 2021    | <!-- mla --> Added new fields `baseConversionRate` and `isConversionFeeBlended` to `ExternalPaymentSettlement`. <br> Added new fields `baseConversionRate` and `isConversionFeeBlended` to `CardSettlement`. <br> Added new fields `baseConversionRate` and `isConversionFeeBlended` to `CardAuthorization`.                                                                                                                                                                                                                                                                                                  |
| 1.2.60  | December 22, 2020  | <!-- dme --> Updated `directCreditReceived` and `externalPaymentSettlement` requests. Added new fields `notifyHolder`, `riskRuleCodes` and `riskActions`.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.59  | December 29, 2020  | <!-- eb --> Updated `externalPaymentNotification` request. Added `transLink` parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.58  | December 22, 2020  | <!-- eb --> Added `balanceAdjustment` request type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.57  | December 14, 2020  | <!-- dme --> Updated `directCreditReceived`, `directDebitDue`, `externalPaymentSettlement` and `externalPaymentNotification` requests. Added new fields `transactionIdentifier` and `endToEndIdentifier`.                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.56  | December 8, 2020   | <!-- dme --> Added new external payment notification actions: `Outbound return created` and `Outbound return rejected`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.2.55  | Novermber 20, 2020 | <!-- dme --> Updated `accountName` length in `External payment address` and request type `epmAddressAssignCompleted`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.54  | Novermber 6, 2020  | <!-- dme --> Updated `directDebitDue` request. Added new field `action`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.53  | October 29, 2020   | <!-- dme --> Updated `directDebitDue` request. Removed fields: `transactionId`, `transLink`, `transactionFee`, `currencyConvertionFee`, `transactionStatusCode`, `entryModeType`, `transactionType`, `mti`, `productId`, `loadSource`, `loadType`, `procCode` and `cardUsageGroup`. Renamed field `merchantName` to `description` and `posTime` to `transactionTime`. Added new fields: `scheme`, `should_pay`, `transaction_status_code` and `due_at`.                                                                                                                                                       |
| 1.2.52  | October 28, 2020   | <!-- dme --> Added new external payment notification actions: `Direct debit return created`, `Direct debit return rejected`, `Direct debit return settled` and `Direct debit paid created`.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.51  | October 27, 2020   | <!-- dme --> Added new external payment notification action `Direct debit rejected webhook`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.50  | October 27, 2020   | <!-- dme --> Updated `External payment Transaction type` list. Added new records: `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21` and `22`.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.49  | October 23, 2020   | <!-- mka --> Added `billingConversionRate`, `reconciliationConversionRate`, `holderConversionRate` fields to `cardSettlement`. <br> Added `billingConversionRate`, `settlementConversionRate`, `holderConversionRate` fields to `cardAuthorization`.                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.48  | October 21, 2020   | <!-- mla --> Added `transactionsId` field to `currencyExchangeNotification` request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.47  | October 20, 2020   | <!-- mg --> Added new request type `cardAuthorizationExpired`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.46  | October 20, 2020   | <!-- mla --> Added new request type `currencyExchangeNotification`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.45  | October 18, 2020   | <!-- eb --> Added "Custom fee" transaction type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.44  | October 7, 2020    | <!-- dme --> Updated `External payment mandate action type` list. Added new type `4`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.43  | October 5, 2020    | <!-- dme --> Updated `Transaction type` list. Updated ID `65`, added new records: `66`, `67` and `68`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.42  | September 29, 2020 | <!-- dme --> Removed deprecated field `initiatedBy` and added new field `source` in request type "cardStatusChange".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.41  | September 24, 2020 | <!-- dme --> Updated `accountName` length in request type "epmAddressAssignCompleted".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.40  | September 01, 2020 | <!-- dme --> Added new external payment notification action `Inbound held webhook`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.39  | August 31, 2020    | <!-- dme --> Added new parameter `epmAddressFrom` to `directCreditReceived` request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.2.38  | August 31, 2020    | <!-- dme --> Removed deprecated fields: `mccPad`, `statusCode`, `authorizeType`, `additionalAmount` and `posDataCode`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.2.37  | August 24, 2020    | <!-- dme --> Added new request types `accountStatusChange` and `epmAddressStatusChange`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.36  | August 11, 2020    | <!-- dme --> Added new request type `externalPaymentNotification`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.35  | August 10, 2020    | <!-- eb --> Updated `settledBalance` parameter in `Response data`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.34  | July 31, 2020      | <!-- dme --> Updated `availableBalance` parameter in `Response data`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.33  | June 10, 2020      | <!-- lis --> Added new parameter "institutionCode" to "negativeAcknowledgement" request webhook. Added new parameter "posEntryMode" to "CardAuthorization" and "CardSettlement" request webhooks. Parameter "posDataCode" become deprecated and after 2020 August 31 will be removed.                                                                                                                                                                                                                                                                                                                         |
| 1.2.32  | June 10, 2020      | <!-- lis --> Added new parameter "timestamp" to request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.31  | June 10, 2020      | <!-- mg --> Updated fields descriptions, mandatory/optional/conditional flags and request examples. <br><br> **CardAuthorization**: <br> * Adjustments: `cardTokenId`, `settlementAmount`, `settlementCurrencyIson`, `additionalAmount`, `txAmountFee`, `avsResult`, `recordData`. <br> * Deprecations: `statusCode`, `mcc_pad` <br><br> **CardSettlement**: <br> * Adjustments: `responseCode`, `acquirerId`, `authCode`, `merchantId`, `posTerminalId`, `retrievalReferenceNumber`, `additionalData1`, `logsTransactionId` <br> * Deprecations: `statusCode`, `authorizeType`, `additionalAmount`, `mccPad` |
| 1.2.30  | June 04, 2020      | <!-- dme --> Added new parameters "cumulativePaddingAmount" and "appliedPaddingAmount" to "CardAuthorization" request webhook. Parameter "mccPad" become deprecated and after 2020 August 31 will be removed.                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.29  | May 7, 2020        | <!-- lis --> Added new parameter "description" to "cardSettlement" request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.28  | May 6, 2020        | <!-- lis --> Added new external payment transaction status code "Unable to deliver transaction to external service".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.27  | April 29, 2020     | <!-- dme --> Added new transaction type "Return from external payment address"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.26  | April 24, 2020     | <!-- lis --> Added external payment transaction types Transaction inbound pending, on hold, rejected and returned                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.25  | April 23, 2020     | <!-- lis --> Added external payment transaction type "Transaction inbound on hold".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.24  | April 21, 2020     | <!-- lis --> Added new parameter "epmSchemeId" to "ExternalPaymentSettlement" request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.23  | March 26, 2020     | <!-- air --> Changed "merchantId" parameter requirement type in "CardSettlement" webhook request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.2.22  | March 26, 2020     | <!-- lis --> Added new parameters "requestReferenceId" and "description" to "ExternalPaymentSettlement" request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.21  | March 17, 2020     | <!-- lis --> Added new load source "External client Wallet"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.20  | March 17, 2020     | <!-- lis --> Added external payment transaction type "Transaction outbound on hold"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.2.19  | March 16, 2020     | <!-- lis --> Added new transaction type "PIN unblock API"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.18  | March 9, 2020      | <!-- lis --> Added new request type "customNotification".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.2.17  | March 5, 2020      | <!-- dam --> Added encryption/decryption examples for "MODE 2 - encrypt with RSA public key" configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.16  | February 12, 2020  | <!-- dme --> Updated request type "epmAddressAssignFailed".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.2.15  | January 30, 2020   | <!-- lis --> Added external payment transaction type "Transaction outbound settled".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.14  | January 2, 2020    | <!-- lis --> Added "reasonDescription" data into "ExternalPaymentSettlement" webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.2.13  | December 9, 2019   | <!-- dme --> Added "securityChecks" data into "CardAuthorization" and "CardSettlement" webhooks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.12  | December 16, 2019  | <!-- dme --> Added new request type "epmAddressAssignCompleted".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.11  | November 26, 2019  | <!-- dam --> Added encryption/decryption examples.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.2.10  | November 20, 2019  | <!-- dme --> Added new parameter "valid_date_to" in "CardAuthorization" request webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1.2.9   | November 11, 2019  | <!-- mg -->  Added new parameter "cardTokenId" for tokenized transactions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.8   | November 7, 2019   | <!-- eb -->  Added new request type "financialDetailAddendum".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.7   | October 16, 2019   | <!-- lis --> Added new request type "negativeAcknowledgement".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.6   | October 9, 2019    | <!-- eb -->  Updated parameters "posTerminalId" and "posData" requirements in "CardAuthorization" webhook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.5   | October 4, 2019    | <!-- dme --> Added "riskActions" data into "CardAuthorization" and "CardSettlement" webhooks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.2.4   | July 3, 2019       | <!-- vr -->  Notify cardholder and risk rule codes fields added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.2.3   | June 27, 2019      | <!-- mg -->  Security hash checks explanation added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.2   | June 20, 2019      | <!-- mg -->  API ID added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.2.1   | June 20, 2019      | <!-- mg -->  Added request/ response examples.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.2.0   | April 26, 2019     | <!-- air --> Change file structure.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Enum
### Account type

| Type | Name            | Description |
|:-----|:----------------|:------------|
| 1    | Account         |             |
| 2    | Special account |             |

### Authorization type

| Type | Description         |
|:-----|:--------------------|
| AN   | Normal authorize.   |
| AP   | Pre authorize.      |
| AF   | Final authorize.    |
| AI   | Incremental.        |
| AIM  | Instalment.         |
| APC  | Preferred customer. |
| AR   | Recurring.          |
| ADC  | Delayed charges.    |
| ANS  | No show.            |
| AD   | Authorize advice.   |
| ARF  | Refund.             |
| R0   | Reversal 400.       |
| R2   | Reversal 420.       |
| AFT  | Account Funding.    |

### Currency exchange notification

| Type | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 1    | The purchased amount during the conversion has been credited to the corresponding balance.  |
| 2    | The conversion procedure is cancelled.                                                      |
| 3    | Conversion created and FX rate secured.                                                     |
| 4    | The sold amount during the conversion has been debited from the corresponding balance.      |

### Card status

| Type | Description    |
|:-----|:---------------|
| A    | Activated.     |
| B    | Blocked.       |
| T    | Suspended.     |
| R    | Risk.          |
| S    | Stolen.        |
| L    | Lost.          |
| E    | Expired.       |
| N    | Not Activated. |
| F    | Fraud.         |

### Account status

| Type | Description  |
|------|--------------|
| A    | Active       |
| R    | Receive only |
| P    | Spend only   |
| S    | Suspended    |
| B    | Blocked      |

### Dispute status

| Type | Description |
|------|-------------|
| N    | New         |
| A    | Active      |
| I    | Waiting     |
| U    | Urgent      |
| E    | Expiring    |
| W    | Won         |
| L    | Lost        |
| C    | Closed      |
| R    | Arbitrage   |

### Card token status

| Type | Description |
|------|-------------|
| A    | Active      |
| N    | Not active  |
| I    | Deactivated |
| S    | Suspended   |
| D    | Deleted     |
| R    | Replacement |

### Card token type

| Type  | Description          |
|-------|----------------------|
| 1     | Secure element       |
| 2     | Host card emulation  |
| 3     | Card on file         |
| 4     | E-commerce           |
| 5     | QR code              |
| 6     | Cloud-based payments |

### Card token event type

| Type  | Description   |
|-------|---------------|
| 1     | Create        |
| 2     | Status update |

### Scheme ID

| ID | Name             | Description |
|----|------------------|-------------|
| 1  | MasterCard       |             |
| 2  | Visa             |             |
| 3  | UnionPay         |             |
| 4  | External Payment |             |
| 5  | Internal Payment |             |

### Source type

| ID | Name              | Description                                                                                                |
|----|-------------------|-------------------------------------------------------------------------------------------------------------|
| 0  | Program manager   | Program manager API.                                                                                        |
| 1  | %brandName% Hub   | %brandName% admin portal.                                                                                   |
| 2  | System            | Internal processing system (Risk rules validation, etc.).                                                   |
| 3  | External provider | External provider like bank provider (Clearbank, CENTROlink, etc.) or card scheme (Mastercard, Visa, etc.). |

### Status change reason code

| ID | Meaning                             |
|----|-------------------------------------|
| 1  | Positive review                     |
| 2  | Negative review                     |
| 3  | Customer request                    |
| 4  | Death of an account holder          |
| 5  | Risk check – suspected fraud        |
| 6  | Risk check – compromised account    |
| 7  | Risk check – compromised card       |
| 8  | Risk check – investigation          |
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

| ID  | Source     | Description |
|-----|------------|-------------|
| 1   | Card frame |             |

### Entry mode type

| Type | Name               | Description                                             |
|:-----|:-------------------|:--------------------------------------------------------|
| 0    | Irrelevant         | This covers all entry mode types.                        |
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

### Transaction status code

| Type | Name               | Description                                                                                                                                                                        |
|:-----|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A    | Authorized         | Successful authorization                                                                                                                                                           |
| I    | Failed             | Failed authorization. I status sent with not successful `responseCode` and `authorizedByStandIn` = `Y` means that it overrides previously sent TAi message for the same authorize. |
| S    | Settled            | Settled authorization                                                                                                                                                              |
| R    | Redirected         | Redirected outbound payment                                                                                                                                                        |

### External payment

#### Address

| Parameter     | M  | Length | Type | Description                              |
|:--------------|:---|:-------|:-----|:-----------------------------------------|
| id            | C  | 1-20   | N    | External payment address ID.             |
| accountNumber | C  | 1-26   | AN   | External payment address account number. |
| accountName   | C  | 1-255  | A    | External payment address account name.   |
| iban          | C  | 1-50   | AN   | External payment address iban.           |
| bban          | C  | 1-50   | AN   | External payment address bban.           |
| sortCode      | C  | 1-50   | AN   | External payment address sort code.      |
| bic           | C  | 1-50   | AN   | External payment address bic.            |

#### Address status

| Type | Description  |
|------|--------------|
| A    | Active       |
| B    | Blocked      |
| S    | Suspended    |
| P    | Spend only   |
| R    | Receive only |

#### Mandate

| Parameter                   | M  | Length | Type | Description                                                                                        |
|:----------------------------|:---|:-------|:-----|:---------------------------------------------------------------------------------------------------|
| id                          | C  | 1-20   | N    | External payment mandate ID.                                                                       |
| status                      | C  | 1      | N    | [`External payment mandate status`](#appendix--enum--external-payment--mandate-status)             |
| reference                   | C  | 1-20   | AN   | External payment mandate referece.                                                                 |
| originatorId                | C  | 1-20   | N    | External payment mandate originator ID.                                                            |
| originatorName              | C  | 1-50   | A    | External payment mandate originator name.                                                          |
| originatorServiceUserNumber | C  | 1-255  | AN   | External payment mandate originator service user number.                                           |
| errorReason                 | C  | 1-2    | N    | [`External payment mandate error reason`](#appendix--enum--external-payment--mandate-error-reason) |

#### Mandate action type

| Type | Name                       | Description                 |
|:-----|:---------------------------|:----------------------------|
| 1    | Mandate create             | Mandate create.             |
| 2    | Mandate cancel             | Mandate cancel.             |
| 3    | Mandate originator changed | Mandate originator changed. |
| 4    | Mandate cancelation failed | Mandate cancelation failed. |

#### Mandate status

| ID | Description  |
|----|--------------|
| 1  | Active       |
| 2  | Pending      |
| 3  | Canceled     |
| 4  | Error        |
| 5  | Canceling    |

#### Mandate error reason

| ID  | Description                                                                                                   |
|-----|---------------------------------------------------------------------------------------------------------------|
| 1   | Unknown                                                                                                       |
| 2   | Payer has instructed paying bank to cancel DDI                                                                |
| 3   | Payer deceased                                                                                                |
| 4   | Account transferred to another bank/building society                                                          |
| 5   | Account number is not recognised at the paying bank                                                           |
| 6   | Instruction does not exist on paying bank’s database (only applies to receipt of a 0C)                        |
| 7   | Payer has closed his account for an unknown reason                                                            |
| 8   | New account details supplied to the service user by paying bank                                               |
| 9   | Paying bank does not allow Direct Debits on this type of account                                              |
| 10  | Paying bank does not allow Direct Debits on this account                                                      |
| 11  | Occurs when a service user attempts to convert a DDI which is shown as expired on the paying bank’s database  |
| 12  | Paying bank has matched the DDI to an existing DDI with a similar reference that has more or fewer characters |
| 13  | Paying bank has cancelled the DDI                                                                             |

#### Notification action

| ID | Description                         |
|----|-------------------------------------|
| 0  | Unknown                             |
| 1  | Inbound settled with return webhook |
| 2  | Inbound held by bank                |
| 3  | Direct debit rejected webhook       |
| 4  | Direct debit return created         |
| 5  | Direct debit return rejected        |
| 6  | Direct debit return settled         |
| 7  | Direct debit paid created           |
| 8  | Outbound return created             |
| 9  | Outbound return rejected            |
| 10 | Held for manual approval            |
| 11 | Transaction created                 |
| 12 | Transaction settled                 |
| 13 | Transaction rejected                |

#### Address update notification action

| ID | Description                         |
|----|-------------------------------------|
| 1  | EPM address update success          |
| 2  | EPM address update failure          |


#### Direct debit due action

| ID | Description                                     |
|----|-------------------------------------------------|
| 1  | Direct debit due created                        |
| 2  | Direct debit due change external payment status |

#### Scheme

| ID | Scheme         | Description            |
|----|----------------|------------------------|
| 0  | UNKNOWN        | Unknown scheme         |
| 1  | TRANSFER       | Transfer               |
| 2  | FPS            | Faster payments        |
| 3  | CHAPS          | Chaps scheme           |
| 4  | BACS           | Bacs scheme            |
| 5  | SCT            | SEPA transfer          |
| 6  | SCTI           | SEPA instant transfer  |
| 7  | SDD            | SEPA direct debit      |

#### Transaction status

| ID | Description                |
|----|----------------------------|
| 1  | Accepted                   |
| 2  | Rejected                   |
| 3  | Pending                    |
| 4  | Error                      |
| 5  | On hold                    |
| 6  | Operator approval required |

#### Transaction status code

| ID  | Status code                                       |
|-----|---------------------------------------------------|
| 0   | Success                                           |
| 1   | Unknown                                           |
| 2   | Balance validation failed                         |
| 3   | Card limit validation failed                      |
| 4   | Account limit validation failed                   |
| 5   | Holder limit validation failed                    |
| 6   | External server validation failed                 |
| 7   | Unable to deliver transaction to external service |
| 8   | External payment address status validation failed |
| 9   | Account status validation failed                  |
| 10  | External payment mandate status validation failed |
| 11  | Risk check failed                                 |
| 12  | Rejected by risk processor                        |
| 13  | Hold by risk processor                            |
| 14  | Required data is missing                          |
| 15  | Should not pay                                    |
| 16  | Settled through suspense account                  |

#### Transaction type

| Type | Name                                      | Description                                                                                                         |
|:-----|:------------------------------------------|:--------------------------------------------------------------------------------------------------------------------|
| 1    | Transaction inbound received              | Information about source and destination external payment addresses when transaction inbound received.              |
| 2    | Transaction inbound reversed              | Information about source and destination external payment addresses when transaction inbound reversed.              |
| 3    | Transaction outbound returned             | Information about source and destination external payment addresses when transaction outbound returned.             |
| 4    | Transaction outbound redirected           | Information about source and destination external payment addresses when transaction outbound was redirected.       |
| 5    | Transaction outbound rejected             | Information about source and destination external payment addresses when transaction outbound was rejected.         |
| 6    | Transaction outbound settled              | Information about source and destination external payment addresses when transaction outbound was settled.          |
| 7    | Transaction outbound on hold              | Information about source and destination external payment addresses when transaction outbound was on hold.          |
| 8    | Transaction inbound debit                 | Information about source and destination external payment addresses when transaction inbound debit.                 |
| 9    | Transaction inbound pending               | Information about source and destination external payment addresses when transaction inbound pending.               |
| 10   | Transaction inbound on hold               | Information about source and destination external payment addresses when transaction inbound was on hold.           |
| 11   | Transaction inbound rejected              | Information about source and destination external payment addresses when transaction inbound was rejected.          |
| 12   | Transaction inbound returned              | Information about source and destination external payment addresses when transaction inbound returned.              |
| 13   | Transaction direct debit due received     | Information about source and destination external payment addresses when transaction direct debit due received.     |
| 14   | Transaction direct debit payment settled  | Information about source and destination external payment addresses when transaction direct debit payment settled.  |
| 15   | Transaction direct debit payment rejected | Information about source and destination external payment addresses when transaction direct debit payment rejected. |
| 16   | Transaction direct debit return settled   | Information about source and destination external payment addresses when transaction direct debit return settled.   |
| 17   | Transaction direct debit return reject    | Information about source and destination external payment addresses when transaction direct debit return reject.    |
| 18   | Transaction direct credit received        | Information about source and destination external payment addresses when transaction direct credit received.        |
| 19   | Transaction direct credit settled         | Information about source and destination external payment addresses when transaction direct credit settled.         |
| 20   | Transaction direct credit return settled  | Information about source and destination external payment addresses when transaction direct credit return settled.  |
| 21   | Transaction direct credit return rejected | Information about source and destination external payment addresses when transaction direct credit return rejected. |
| 22   | Transaction direct debit return created   | Information about source and destination external payment addresses when transaction direct debit return created.   |
| 23   | Transaction outbound return created       | Information about source and destination external payment addresses when transaction outbound return created.       |
| 24   | Transaction outbound return reject        | Information about source and destination external payment addresses when transaction outbound return reject.        |
| 25   | Transaction direct credit return created  | Information about source and destination external payment addresses when transaction direct credit return created.  |
| 26   | Transaction inbound return created        | Information about source and destination external payment addresses when transaction inbound return created.        |
| 27   | Transaction inbound created               | Information about source and destination external payment addresses when transaction inbound created.               |
| 28   | Transaction inbound return rejected       | Information about source and destination external payment addresses when transaction inbound return rejected.       |
| 29   | Transaction inbound return settled        | Information about source and destination external payment addresses when transaction inbound return settled.        |
| 30   | Transaction outbound cancelation rejected | Information about source and destination external payment addresses when transaction outbound cancelation rejected. |
| 31   | Transaction outbound cancelation created  | Information about source and destination external payment addresses when transaction outbound cancelation created.  |

### Key

Keys are unique identifiers that are used to authenticate and authorize requests, encrypt or decrypt messages.

| Parameter           | Description                                                                                                                 |
|------------|----------------------------------|
| API ID              | User identification (ID).                                                                        |
| API secret          | A key for user authentification.                                                                 |

### Load source

| ID | Source                      | Description                                                                     |
|:---|:----------------------------|:--------------------------------------------------------------------------------------|
| 0  | Unknown                     | Partner system does not know the source of the funds                            |
| 1  | Internal Account            | Funds are transferred from %brandName% held account                                   |
| 2  | Internal Card               | Funds are transferred from %brandName% held card                                      |
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
| 25 | Customer Account            | Internal load from Customer account to another account held at %brandName%            |
| 26 | Payouts Account             | Internal load from Payouts account to another account held at %brandName%             |
| 27 | Cashback Account            | Internal load from Cashback account to another account held at %brandName%            |
| 28 | Office Account              | Internal load from Office account to another account held at %brandName%              |
| 29 | Fees and Chargeback Account | Internal load from Fees and Chargeback account to another account held at %brandName% |
| 30 | External client Wallet      | External load via client Wallet                                                       |
| 31 | Balance adjustment load from GUI    | Balance adjustment created via admin panel                              |
| 32 | Balance adjustment load from PM API | Balance adjustment created via PM API                                   |
| 33 | Balance adjustment load by system   | Balance adjustment created by system                                    |

### Load type

| ID | Type     | Description |
|:---|:---------|:------------|
| 0  | Unknown  |             |
| 1  | e-Wallet |             |
| 2  | Internal |             |

### Holder authentication

#### Method

| ID | Method         | Description                      |
|----|----------------|----------------------------------|
| 1  | otp            | One time password                |

#### Requestor

| ID | Requestor      | Description                      |
|----|----------------|----------------------------------|
| 1  | acs            | Access control server            |

#### Validation entity

| ID | Validation Entity   | Description                    |
|----|---------------------|--------------------------------|
| 1  | card                |                                |

#### Confirmation status

| ID  | Meaning       |
|-----|---------------|
| Y   | Verified      |
| N   | Not verified  |
| E   | Expired       |
| L   | Limit reached |
| C   | Canceled      |

### Request type

| Type                              | Description |
|:----------------------------------|:------------|
| cardAuthorization                 |             |
| cardSettlement                    |             |
| externalPaymentSettlement         |             |
| directDebitMandate                |             |
| directDebitDue                    |             |
| directCreditReceived              |             |
| cardStatusChange                  |             |
| negativeAcknowledgement           |             |
| financialDetailAddendum           |             |
| cardTokenization                  |             |
| tokenUpdates                      |             |
| epmAddressAssignCompleted         |             |
| epmAddressAssignFailed            |             |
| customNotification                |             |
| externalPaymentNotification       |             |
| accountStatusChange               |             |
| epmAddressStatusChange            |             |
| currencyExchangeNotification      |             |
| cardAuthorizationExpired          |             |
| balanceAdjustment                 |             |
| holderAuthentication              |             |
| cardTokenizationViaAuthorize      |             |
| holderAuthenticationNotification  |             |
| updateEpmAddressNotification      |             |
| disputeStatusChange               |             |

### Response code

#### Summary

A list of all possible response codes that can be returned by the available schemes.
It is also indicated, which response code can be returned from either one of the schemes - through the TAI - and which of those responses can be used for the PM's decision making.

| Response code | V                                                              | M                                                                    | U                                                                  | PM by TAI | Action              | Description                                                                                                                                                          |
|---------------|----------------------------------------------------------------|----------------------------------------------------------------------|--------------------------------------------------------------------|-----------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 00            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Approve             | Approved or completed successfully                                                                                                                                   |
| 01            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Call Issuer/Decline | Refer to card issuer                                                                                                                                                 |
| 02            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Call Issuer/Decline | Refer to card issuer, special condition                                                                                                                              |
| 03            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Invalid merchant                                                                                                                                                     |
| 04            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Capture             | Capture card                                                                                                                                                         |
| 05            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Do not honor                                                                                                                                                         |
| 06            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | Error                                                                                                                                                                |
| 07            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Capture             | Pick up card, special condition (fraud account)                                                                                                                      |
| 08            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Approve             | Honor with ID                                                                                                                                                        |
| 0A            |                                                                |                                                                      |                                                                    |           |                     | Approval with load                                                                                                                                                   |
| 10            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Approve             | Partial approval                                                                                                                                                     |
| 11            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Approve             | Approved (V.I.P)                                                                                                                                                     |
| 12            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Invalid transaction                                                                                                                                                  |
| 13            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Invalid amount                                                                                                                                                       |
| 14            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Track data check failed only applies to Mastercard; Invalid card number only applies to Mastercard and Visa; Card Expiration Date is invalid applies to all schemes. |
| 15            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Invalid issuer                                                                                                                                                       |
| 16            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Approve             | Approve update of track 3                                                                                                                                            |
| 17            |                                                                |                                                                      |                                                                    |           | ---                 | Customer cancellation                                                                                                                                                |
| 19            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Re-enter transaction                                                                                                                                                 |
| 1A            |                                                                |                                                                      |                                                                    |           |                     | Additional customer authentication required                                                                                                                          |
| 20            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Update the QRC                                                                                                                                                       |
| 21            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | ---                 | No action taken, unable to back out prior transaction                                                                                                                |
| 22            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Suspected malfunction, related transaction error                                                                                                                     |
| 25            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | ---                 | Unable to locate original transaction                                                                                                                                |
| 26            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | ---                 | Record already in active status                                                                                                                                      |
| 27            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | ---                 | Issuer File Update field edit error                                                                                                                                  |
| 28            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | ---                 | Record permanently deleted                                                                                                                                           |
| 29            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | ---                 | Delete request less than 540 days                                                                                                                                    |
| 30            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Format error                                                                                                                                                         |
| 32            |                                                                |                                                                      |                                                                    |           |                     | Partial reversal                                                                                                                                                     |
| 33            |                                                                |                                                                      |                                                                    |           |                     | Expired card - pick up                                                                                                                                               |
| 34            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Capture             | Suspect Fraud                                                                                                                                                        |
| 38            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | PIN try limit exceeded                                                                                                                                               |
| 39            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | No credit account                                                                                                                                                    |
| 40            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Requested function not supported                                                                                                                                     |
| 41            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Capture             | Lost card                                                                                                                                                            |
| 43            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Capture             | Stolen card                                                                                                                                                          |
| 45            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Fallback transaction is not allowed                                                                                                                                  |
| 51            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Insufficient funds/over credit limit                                                                                                                                 |
| 52            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | No cheque account                                                                                                                                                    |
| 53            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | No savings account                                                                                                                                                   |
| 54            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Expired card                                                                                                                                                         |
| 55            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Invalid PIN                                                                                                                                                          |
| 57            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Transaction not permitted to issuer/cardholder                                                                                                                       |
| 58            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Transaction not permitted to acquirer/terminal                                                                                                                       |
| 59            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Suspected fraud                                                                                                                                                      |
| 61            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Exceeds withdrawal amount limit                                                                                                                                      |
| 62            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Restricted card                                                                                                                                                      |
| 63            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Decline             | Security violation                                                                                                                                                   |
| 64            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Transaction does not fulfil AML requirement                                                                                                                          |
| 65            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +         | Decline             | Exceeds withdrawal count limit OR Identity Check Soft-Decline of EMV 3DS Authentication (merchant should resubmit authentication with 3DSv1)                         |
| 68            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           |                     | Response received too late                                                                                                                                           |
| 70            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Call Issuer/Decline | Contact card issuer                                                                                                                                                  |
| 71            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | PIN not changed                                                                                                                                                      |
| 75            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Allowable number of PIN tries exceeded                                                                                                                               |
| 76            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | Invalid/nonexistent To account specified                                                                                                                             |
| 77            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | Invalid/nonexistent From account specified                                                                                                                           |
| 78            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Decline             | Invalid/nonexistent account specified (general)                                                                                                                      |
| 79            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | ---                 | Key Exchange Validation failed / Transaction already reversed                                                                                                        |
| 80            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | Visa transactions - credit issuer unavailable. Private label - invalid date                                                                                          |
| 81            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Decline             | Domestic debit transaction not allowed (regional use only)                                                                                                           |
| 82            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | Negative online CAM, dCVV, iCVV, or CVV result or offline PIN authentication interrupted                                                                             |
| 84            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | Invalid authorization life cycle                                                                                                                                     |
| 85            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Approve             | Not declined                                                                                                                                                         |
| 86            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | PIN validation not possible                                                                                                                                          |
| 87            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +         | Approve             | Purchase amount only, no cash back allowed                                                                                                                           |
| 88            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | Cryptographic failure                                                                                                                                                |
| 89            |                                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                    |           | Decline             | Unacceptable PIN - transaction declined - retry                                                                                                                      |
| 90            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Cutoff is in progress                                                                                                                                                |
| 91            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Authorization system or issuer system inoperative                                                                                                                    |
| 92            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Unable to route transaction                                                                                                                                          |
| 93            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Transaction cannot be completed; Violation of law                                                                                                                    |
| 94            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Duplicate transmission detected                                                                                                                                      |
| 96            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | System error                                                                                                                                                         |
| 97            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | ATM/POS terminal number cannot be located                                                                                                                            |
| 98            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Issuer response not received                                                                                                                                         |
| 99            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | PIN Block Error                                                                                                                                                      |
| N0            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Force STIP                                                                                                                                                           |
| N3            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Cash service not available                                                                                                                                           |
| N4            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Cashback request exceeds issuer limit                                                                                                                                |
| N7            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Decline for CVV2 failure                                                                                                                                             |
| P2            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           |                     | Invalid biller information                                                                                                                                           |
| P5            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | PIN change/unblock request declined                                                                                                                                  |
| P6            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Unsafe PIN                                                                                                                                                           |
| R0            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Stop payment order                                                                                                                                                   |
| R1            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Revocation of authorization order                                                                                                                                    |
| R3            | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                      |                                                                    |           | Decline             | Revocation of all authorizations order                                                                                                                               |
| Y1            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Approve             | Offline approval                                                                                                                                                     |
| Z1            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Offline decline                                                                                                                                                      |
| Y3            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Approve             | Unable to go online, approval                                                                                                                                        |
| Z3            |                                                                |                                                                      | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |           | Decline             | Unable to go online, declined                                                                                                                                        |

### Response data

| Parameter        | M | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
|:-----------------|:--|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| billingAmount    | C | Billing amount, If partial approval. `DE6`.                                                                                                                                                                                                                                                                                                                                                                        |
| responseCode     | C | `DE39`, Mandatory only if Request `authorizedByStandIn` = `N` and Request `responseCode` = `00`, otherwise will be ignored.                                                                                                                                                                                                                                                                                        |
| holderAmount     | O | If partial approval.                                                                                                                                                                                                                                                                                                                                                                                               |
| availableBalance | C | Mandatory for Balance Inquiry authorizations, when %brandName% is not controlling balance, otherwise authorization will be declined. Available balance should be provided in Billing currency for Balance inquiry operations, for other operations - in Holder currency. When provided, amount will be added to the %brandName% authorization platform response and sent to Scheme.                                |
| settledBalance   | O | Settled balance of the account. For balance inquiry operations, Settled balance should be provided in the same currency as Billing, and for any other operations - in the Holder's currency. If provided, the amount will be added to the %brandName%'s authorization platform's response and sent to the Scheme as the Ledger Balance (if the Transaction and the Issuer are both located in the United Kingdom). |

### Risk rule action

| Value                                     | Description                                    |
|:------------------------------------------|:-----------------------------------------------|
| markTransactionAsSuspicious               | Mark transaction as suspicious                 |
| notifyCardholderBySendingTaisNotification | Notify cardholder by sending TAIs notification |
| changeCardStatusToRisk                    | Change card status to risk                     |
| changeAccountStatusToSuspended            | Change account status to suspended             |
| rejectTransaction                         | Reject transaction                             |

### Security check

Possible values are *0* or *1*. If the value is *1*, it means that the validation was performed **and** resulted in success.

| Value                     | Description                                    |
|:--------------------------|:-----------------------------------------------|
| cardExpirationDatePresent | Card expiration date present.                  |
| onlinePin                 | Online PIN.                                    |
| offlinePin                | Offline PIN.                                   |
| 3DSecure                  | Accountholder authentication value (3DSecure). |
| cvv2                      | Card verification value.                       |
| magneticStripe            | Magnetic stripe.                               |
| chipData                  | Chip data.                                     |
| avs                       | Holder address.                                |
| phoneNumber               | Phone number (only for UnionPay scheme).       |
| signature                 | Signature.                                     |

### Transaction counter

| Value                      | Description                                 |
|:---------------------------|:--------------------------------------------|
| feeId                      | Fees ID the counter is applied for          |
| amount                     | Total amount for the counter                |
| count                      | Total count for the counter                 |
| validFrom                  | Unix timestamp                              |
| validTo                    | Unix timestamp                              |
| currencyIson               | [`Currency`](#appendix--enum--currency) ISON in which amount is calculated |
| transactionCounterConfigId | Transaction counter config ID               |

### Transaction type

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

### Advice reasons

#### Mastercard

| Value | Description                                                                                                         |
|-------|---------------------------------------------------------------------------------------------------------------------|
| 100   | Alternate Issuer Route: Issuer selected option.                                                                     |
| 101   | Alternate Issuer Route: IPS signed out.                                                                             |
| 102   | Alternate Issuer Route: IPS timed out.                                                                              |
| 103   | Alternate Issuer Route: IPS unavailable.                                                                            |
| 105   | Transaction processed via X-Code.                                                                                   |
| 107   | PIN processing error.                                                                                               |
| 108   | Alternate Issuer Route: MIP Error.                                                                                  |
| 109   | Alternate Issuer Route: Issuer Edit Response Error.                                                                 |
| 111   | Alternate Issuer Route: Issuer Host System Error.                                                                   |
| 112   | Alternate Route: Network Not Dispatched Error.                                                                      |
| 113   | Alternate Route: Issuer Undelivered.                                                                                |
| 114   | Alternate Route: Direct Down Option.                                                                                |
| 115   | Transaction Processed via On-behalf Service Decision.                                                               |
| 116   | Invalid Merchant.                                                                                                   |
| 120   | Transaction blocking.                                                                                               |
| 121   | Account Lookup Service.                                                                                             |
| 126   | Pay with Rewards Processing Advice to Issuer.                                                                       |
| 140   | Unable to convert contactless or virtual account number.                                                            |
| 141   | Mastercard Digital Enablement Service Advice to Issuer.                                                             |
| 151   | In Control Processing Advice to Issuer (Mastercard Merchant Presented QR).                                          |
| 160   | Authentication Advice to Issuer.                                                                                    |
| 180   | CAT Risk Level 3.                                                                                                   |
| 190   | Acquirer Processing System (APS) approved.                                                                          |
| 191   | Acquirer Processing System (APS) completed Authorization transaction.                                               |
| 192   | M/Chip Offline Advice to Issuer.                                                                                    |
| 200   | In Control Processing Advice to Issuer.                                                                             |
| 400   | Banknet advice: APS error; unable to deliver response.                                                              |
| 401   | Banknet advice: APS error; no APS Authorization Acknowledgement/0180 or Financial Transaction Acknowledgement/0280. |
| 402   | Issuer Time-out.                                                                                                    |
| 403   | Issuer Sign-out.                                                                                                    |
| 409   | Issuer Response Error.                                                                                              |
| 410   | Reversal message provided by a system other than Banknet.                                                           |
| 413   | Issuer Undelivered.                                                                                                 |

#### Visa

| Value | Description                                                                                                                                                                   |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 9001  | The issuer is signed off.                                                                                                                                                     |
| 9002  | The issuer was signed off by the switch.                                                                                                                                      |
| 9011  | The line to issuer is down.                                                                                                                                                   |
| 9012  | Forced STIP because of N0 (Force STIP) original response from issuer.                                                                                                         |
| 9020  | The response from issuer timed out.                                                                                                                                           |
| 9022  | PACM-diverted.                                                                                                                                                                |
| 9023  | PCAS diverted.                                                                                                                                                                |
| 9024  | Transaction declined due to Visa Payment Controls (VPC) rule.                                                                                                                 |
| 9025  | Declined by Selective Acceptance Service.                                                                                                                                     |
| 9026  | Transaction reviewed by the Visa Transaction Advisor Service: additional authentication required.                                                                             |
| 9027  | Declined by token provisioning service.                                                                                                                                       |
| 9030  | This transaction is auto-CDB; there is a pickup response from the issuer.                                                                                                     |
| 9031  | Original processed in stand-in.                                                                                                                                               |
| 9033  | Declined due to exceeded active account management threshold.                                                                                                                 |
| 9034  | Unable to deliver response to originator.                                                                                                                                     |
| 9035  | Process recurring payment in STIP.                                                                                                                                            |
| 9037  | Declined by Visa CTC (Consumer Transaction Controls) service.                                                                                                                 |
| 9038  | Merchandise return authorization processed in STIP.                                                                                                                           |
| 9041  | There was a PIN verification error.                                                                                                                                           |
| 9042  | Offline PIN authentication was interrupted.                                                                                                                                   |
| 9045  | Switch was unable to translate the PIN.                                                                                                                                       |
| 9047  | Declined by Real-Time Decisioning (RTD) processing.                                                                                                                           |
| 9048  | There is an invalid CVV with the All Respond Option.                                                                                                                          |
| 9050  | Source or destination does not participate in this service.                                                                                                                   |
| 9054  | There is an invalid CAM.                                                                                                                                                      |
| 9061  | There is an internal system error or other switch-detected error condition.                                                                                                   |
| 9064  | Transaction declined, invalid card-type payment channel.                                                                                                                      |
| 9091  | Dispute financial.                                                                                                                                                            |
| 9095  | Issuer notification of token vault provisioned or status change.                                                                                                              |
| 9102  | Switch generated this 0420 reversal advice because an approval response could not be delivered to the acquirer. VE only.                                                      |
| 9103  | An approval response could not be delivered to the acquirer because the issuer timed out.                                                                                     |
| 9201  | Decline due to PPCS (stop recurring payment service).                                                                                                                         |
| 9202  | Declined due to issuer country exclusion list.                                                                                                                                |
| 9203  | Declined due to Office of Foreign Assets Control (OFAC) embargo.                                                                                                              |
| 9204  | Cashback processing error.                                                                                                                                                    |
| 9205  | Invalid CAVV with Visa Verify and decline options (V and W).                                                                                                                  |
| 9206  | Mod-10 check failure.                                                                                                                                                         |
| 9207  | Issuer does not support gambling transactions.                                                                                                                                |
| 9208  | Declined because issuing identifier and/or routing identifier is blocked.                                                                                                     |
| 9209  | Declined because issuer does not support transaction type.                                                                                                                    |
| 9210  | Declined because of issuer participation options.                                                                                                                             |
| 9211  | Declined because acquirer does not support the service requested.                                                                                                             |
| 9212  | Declined due to fraud condition.                                                                                                                                              |
| 9213  | Declined because call-out to an external service timed out.                                                                                                                   |
| 9214  | Declined because of error return from call-out to external service.                                                                                                           |
| 9218  | Product subtype is MB (interoperable mobile branchless) and business application identifier is not MP, or business application identifier is MP and product subtype is not MB.|
| 9302  | Exceeds issuer settlement risk exposure cap.                                                                                                                                  |

### Currency

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

In order to encrypt request and response encryption should be enabled in the endpoint configuration.

**Request header**

| Parameter        | M          | Type   | Length   | Description                                                                                                 |
| :-------------   | :--------- | :----- | :------- | :-------------------------------------------------------                                                    |
| x-hook-signature | M          | AN     | 1-255    | [`Hash generating`](#appendix--security--hash-generating)                                                   |
| x-source-id      | C          | AN     | 1-255    | TAI configuration id, mandatory if encryption is enabled                                                    |
| x-api-id         | C          | AN     | 1-255    | API ID, mandatory if encryption is enabled                                                                  |
| x-version        | C          | AN     | 1-255    | Fixed `1.2`., mandatory if encryption is enabled                                                            |
| x-sign           | C          | AN     | 1-65,535 | "secret" encrypted with %brandName% private key, mandatory if encryption is enabled                         |

If MODE 2 (encrypt with RSA public key) is configured, client's public key is used for encryption

**Response header**

| Parameter      | M          | Type   | Length   | Description                                                                                                |
| :------------- | :--------- | :----- | :------- | :-------------------------------------------------------                                                   |
| x-sign         | C          | AN     | 1-65,535 | "secret" encrypted with client's private key, mandatory if request was encrypted                           |

If MODE 2 (encrypt with RSA public key) is configured, %brandName% public key should be used for encryption

### Cryptography

When encryption is enabled, the request and response will be encrypted.

Some clients do not have a possibility to encrypt by using private keys. For these cases MODE 2 (encrypt with RSA public key) configuration is implemented.

Request message will be encrypted by using a random secret (x-sign in header) which is then encrypted with client's private key (or %brandName% public key if MODE 2 is configured).

Response message should be encrypted with a newly generated secret (x-sign in header), which is then encrypted with %brandName% private key (or client's public key if MODE 2 is configured).

Encrypted request/response body should be plain text.

RSA Private/Public key generation example:

- Key type: RSA
- Key length: 4096
- Algorithm: sha512

```
    // Generate Private Key
    $ openssl req -nodes -newkey rsa:4096 -keyout private.key -out private.csr -sha512

    // Extract Public Key from previously generated Private Key
    $ openssl rsa -in private.key -pubout > public.key
```

![Encryption scheme](tai_api_encryption.png){.w100 .my}

**Encryption algorithm in PHP (MODE 1 - encrypt with RSA private key):**

```php
    function encrypt(string $privateKey, array $requestData): array
    {
        $secret = 'RandomString32CharactersLength12'; // 32 characters
        openssl_private_encrypt($secret, $temp, $privateKey);
        $sign = base64_encode($temp);

        $rb = bin2hex(random_bytes(8));
        $encryptedRequest = $rb.base64_encode(openssl_encrypt(json_encode($requestData), 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $rb));

        return [
            'sign' => $sign,
            'encryptedRequest' => $encryptedRequest
        ];
    }

    // usage
    $encrypted = encrypt($privateKey, $requestData);
    // add $encrypted['sign'] to the request header as 'x-sign'
    // set $encrypted['encryptedRequest'] to the request body.
```

**Decryption algorithm in PHP (MODE 1 - encrypt with RSA private key):**

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

**Encryption algorithm in PHP (MODE 2 - encrypt with RSA public key):**

```php
    function encrypt(string $publicKey, array $requestData): array
    {
        $secret = 'RandomString32CharactersLength12'; // 32 characters
        openssl_public_encrypt($secret, $temp, $publicKey);
        $sign = base64_encode($temp);

        $rb = bin2hex(random_bytes(8));
        $encryptedRequest = $rb.base64_encode(openssl_encrypt(json_encode($requestData), 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $rb));

        return [
            'sign' => $sign,
            'encryptedRequest' => $encryptedRequest
        ];
    }

    // usage
    $encrypted = encrypt($publicKey, $requestData);
    // add $encrypted['sign'] to the request header as 'x-sign'
    // set $encrypted['encryptedRequest'] to the request body.
```

**Decryption algorithm in PHP (MODE 2 - encrypt with RSA public key):**

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
### Hash generating

To generate a hash that can be compared with `x-hook-signature`,  `SHA-512` algorithm must be used.

Data that is hashed should be taken from the request (in this case it is in `JSON` format) and API Secret ID which is used as a prefix (no special separators are used). Hash format - Binary.

Finally, use `base64` encode and compare your data with `x-hook-signature` request header data. If it does not match - it is a problem, someone is participating in the middle.

## Type
### CardAuthorization

| Parameter                | M   | Length   | Type     | Description                                                                                                                                                                                                                                                                                                                                             |
|--------------------------|-----|----------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardId                   | M   | 1-20     | N        | Card `cardId`. Identifies card, issued by Platform.                                                                                                                                                                                                                                                                                                     |
| cardRequestId            | M   | 1-20     | N        | Card number identifier. Identifies card number, issued by Platform.                                                                                                                                                                                                                                                                                     |
| cardTokenId              | C   | 1-20     | N        | Internal card token identifier.                                                                                                                                                                                                                                                                                                                         |
| accountId                | M   | 1-20     | N        |                                                                                                                                                                                                                                                                                                                                                         |
| availableBalance         | M   | 1-20     | N        |                                                                                                                                                                                                                                                                                                                                                         |
| settledBalance           | M   | 1-20     | N        |                                                                                                                                                                                                                                                                                                                                                         |
| transLink                | M   | 1-255    | ANS      |                                                                                                                                                                                                                                                                                                                                                         |
| transactionStatusCode    | M   | 1        | A        | [`Transaction status code`](#appendix--enum--transaction-status-code) Possible values: `A`, `I`, `S`.                                                                                                                                                                                                                                                   |
| responseCode             | M   | 2        | AN       | `DE39`. For authorization platform’s decided response, external host can change it, if `authorizedByStandIn` is equal to `N`. For clearing and information - reflect authorization response.                                                                                                                                                            |
| entryModeType            | M   | 1-20     | N        | [`Entry mode type`](#appendix--enum--entry-mode-type)                                                                                                                                                                                                                                                                                                   |
| transactionType          | M   | 1-11     | N        | [`Transaction type`](#appendix--enum--transaction-type)                                                                                                                                                                                                                                                                                                 |
| authorizeType            | M   | 1-3      | AN       | [`Authorization type`](#appendix--enum--authorization-type)                                                                                                                                                                                                                                                                                             |
| transactionAmount        | M   | 1-20     | N        | `DE4`.                                                                                                                                                                                                                                                                                                                                                  |
| transactionCurrencyIson  | M   | 3        | N        | `DE49`. Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                                                                                                                                 |
| billingAmount            | M   | 1-20     | N        | `DE6`.                                                                                                                                                                                                                                                                                                                                                  |
| billingCurrencyIson      | M   | 3        | N        | `DE51`. Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                                                                                                                                     |
| holderAmount             | M   | 1-20     | N        | Transaction amount in holder’s currency.                                                                                                                                                                                                                                                                                                                |
| holderCurrencyIson       | M   | 3        | N        | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                                                                                                                                              |
| totalHolderAmount        | M   | 1-20     | N        | Total authorized amount in holder’s currency. Actual only for pre-authorizations with incrementals.                                                                                                                                                                                                                                                     |
| billingConversionRate    | C   | 1-16     | NS       | DE10 provided when received by Scheme.                                                                                                                                                                                                                                                                                                                  |
| settlementConversionRate | C   | 1-16     | NS       | If settlement currency selecting enabled on program, value will be from it. Otherwise DE9 provided when received by Scheme.                                                                                                                                                                                                                             |
| baseConversionRate       | M   | 1-16     | NS       | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                                                                                                                                                                                                                             |
| holderConversionRate     | M   | 1-16     | NS       | `baseConversionRate`  with applied FX markup (if FX fee was applied).                                                                                                                                                                                                                                                                                   |
| transactionFee           | O   | 1-20     | N        | Transaction fee for the <u>current authorize</u> that was calculated according to the program settings. For a subsequent authorization (incremental, reversal, etc.) the fee amount for that current message will be returned. In case of Advices ([AD](#appendix--enum--authorization-type)), the field is populated with the <u>total fee amount</u>. |
| currencyConvertionFee    | O   | 1-20     | N        | Currency conversion fee that was calculated according to the program settings. For a subsequent authorization (incremental, reversal, etc.) the currency conversion fee amount for that current message will be returned. In case of Advices ([AD](#appendix--enum--authorization-type)), the field is populated with the <u>total fee amount</u>.      |
| transactionCounters      | O   | \-       | OBJ-LIST | [`Transaction counter`](#appendix--enum--transaction-counter) Provided when a fee with counter was applied.                                                                                                                                                                                                                                             |
| isConversionFeeBlended   | M   | 1        | N        | `1` - yes (blended to holderAmount), `0` - no.                                                                                                                                                                                                                                                                                                          |
| mti                      | M   | 4        | N        | MTI code from scheme’s message.                                                                                                                                                                                                                                                                                                                         |
| productId                | M   | 1-20     | N        | Card’s product id.                                                                                                                                                                                                                                                                                                                                      |
| transactionCountryIson   | M   | 3        | N        | Transaction country code ISO numeric.                                                                                                                                                                                                                                                                                                                   |
| acquirerId               | M   | 1-11     | N        | `DE32`. Acquirer `ICA` or `BIN`.                                                                                                                                                                                                                                                                                                                        |
| additionalAmount         | C   | \-       | OBJ      | `DE54` provided when received by Scheme.                                                                                                                                                                                                                                                                                                                |
| txAmountFee              | C   | 1-20     | N        | `DE28` provided when received by Scheme.                                                                                                                                                                                                                                                                                                                |
| authCode                 | M   | 6        | AN       | `DE38`. In clearing for offline purchases auth code will be omitted.                                                                                                                                                                                                                                                                                    |
| note                     | O   | 1-65,535 | ANS      | ISAC.                                                                                                                                                                                                                                                                                                                                                   |
| mccCode                  | M   | 1-4      | N        | `DE18`. Merchant category code.                                                                                                                                                                                                                                                                                                                         |
| cumulativePaddingAmount  | C   | 1-20     | N        | Calculated padding amount based on the existing padding config. It will be returned if padding is configured and was triggered with that particular transaction.                                                                                                                                                                                        |
| appliedPaddingAmount     | C   | 1-20     | N        | Actually applied padding amount (if cumulativePaddingAmount was set and it was greater than initial holder amount, then here will be cumulativePaddingAmount - initial holder amount = appliedPaddingAmount).                                                                                                                                           |
| merchantId               | M   | 1-20     | ANS      | `DE42`. Merchant ID.                                                                                                                                                                                                                                                                                                                                    |
| merchantName             | M   | 1-50     | ANS      | `DE43`.                                                                                                                                                                                                                                                                                                                                                 |
| posEntryMode             | M   | 1-4      | N        | `DE22`. POS entry mode from scheme.                                                                                                                                                                                                                                                                                                                     |
| posData                  | C   | 1-61     | ANS      | `DE61` - mastercard, `DE60` - visa. On reversal MTI 420 this field will be omitted.                                                                                                                                                                                                                                                                     |
| posTerminalId            | C   | 1-50     | ANS      | `DE41`. On reversal MTI 420 this field can be omitted.                                                                                                                                                                                                                                                                                                  |
| posTime                  | M   | 14       | N        | Local merchant’s time.                                                                                                                                                                                                                                                                                                                                  |
| procCode                 | M   | 6        | N        | `DE3`.                                                                                                                                                                                                                                                                                                                                                  |
| retrievalReferenceNumber | M   | 1-20     | AN       | `DE37`.                                                                                                                                                                                                                                                                                                                                                 |
| settlementAmount         | C   | 1-20     | N        | If settlement currency selecting enabled on program, value will be from it. Otherwise `DE5` provided when received by Scheme.                                                                                                                                                                                                                           |
| settlementCurrencyIson   | C   | 3        | N        | If settlement currency selecting enabled on program, value will be from it. Otherwise `DE50`. Settlement [`currency`](#appendix--enum--currency) code ISO numeric. Provided when DE5 (settlementAmount) received by Scheme.                                                                                                                                   |
| traceLogId               | M   | 1-20     | N        | Unique authorization ID in Platform’s database.                                                                                                                                                                                                                                                                                                         |
| transactionTime          | M   | 1-12     | N        | Unix timestamp (converted from `DE7` value).                                                                                                                                                                                                                                                                                                            |
| additionalData1          | M   | 1-999    | AN       | `DE48`. Original, if not present - `null`.                                                                                                                                                                                                                                                                                                              |
| additionalData2          | O   | 1-999    | ANS      | `DE124`.                                                                                                                                                                                                                                                                                                                                                |
| authorizedByStandIn      | M   | 1        | A        | Possible values: `Y` - Decision is made by platform, change is not allowed; `N` - External host allowed to change platforms decision and give it’s response code.                                                                                                                                                                                       |
| avsResult                | C   | 1        | A        | Address Verification Service Response. Will be returned only when address verification is performed. MasterCard: `DE48 SF83`, Visa: `DE44 SF2`.                                                                                                                                                                                                         |
| cardUsageGroup           | M   | 1-20     | N        |                                                                                                                                                                                                                                                                                                                                                         |
| institutionCode          | C   | 1-20     | N        | Issuer Identification Number (IIN) and Interbank Card Association Number (ICA). Can be `null` if external payment transaction are performed.                                                                                                                                                                                                            |
| recordData               | C   | 1-999    | ANS      | Original field returned if provided by scheme. MasterCard: `DE120`, Visa: `DE123`.                                                                                                                                                                                                                                                                      |
| partialApproval          | M   | 1        | N        | Possible values: `1` - if partial approve allowed, `0` - if not.                                                                                                                                                                                                                                                                                        |
| suspicious               | M   | 1        | N        | Possible values: `1` - is suspicious, `0` - not suspicious.                                                                                                                                                                                                                                                                                             |
| notifyHolder             | M   | 1        | N        | Possible values: `1` - the holder has to be notified, `0` - no further action required.                                                                                                                                                                                                                                                                 |
| riskRuleCodes            | O   | 1-65,535 | ANS      | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                                                                                                                                                                                                                        |
| rawMessage               | O   | 1-65,535 | ANS      | Raw scheme’s message in `ISO8583` format.                                                                                                                                                                                                                                                                                                               |
| riskActions              | M   | \-       | OBJ      | [`Risk rule action`](#appendix--enum--risk-rule-action)                                                                                                                                                                                                                                                                                                 |
| securityChecks           | M   | \-       | OBJ      | [`Security check`](#appendix--enum--security-check)                                                                                                                                                                                                                                                                                                     |
| validDateTo              | M   | 10       | NS       | Example: 2019-01-01.                                                                                                                                                                                                                                                                                                                                    |
| triggeredLimitId         | O   | 1-20     | N        | ID of limit that was triggered                                                                                                                                                                                                                                                                                                                          |
| cardProgramId            | M   | 1-20     | N        | Card program ID.                                                                                                                                                                                                                                                                                                                                        |
| accountProgramId         | M   | 1-20     | N        | Account program ID.                                                                                                                                                                                                                                                                                                                                     |
| adviceReason             | O   | 1-5      | N        | [`Advice reason code`](#appendix--enum--advice-reasons)                                                                                                                                                                                                                                                                                                 |
| schemeId                 | M   | 1        | N        | [`Scheme ID`](#appendix--enum--scheme-id).                                                                                                                                                                                                                                                                                                              |
```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "cardAuthorization"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": {
        "cardId": 123456,
        "cardTokenId": null,
        "accountId": 1,
        "availableBalance": 100008814,
        "settledBalance": 100020000,
        "transLink": "102433000000MCCA00001000002190529123456",
        "transactionStatusCode": "A",
        "responseCode": "00",
        "entryModeType": 0,
        "transactionType": 2,
        "authorizeType": "AP",
        "transactionAmount": -10000,
        "transactionCurrencyIson": "978",
        "billingAmount": -11186,
        "billingCurrencyIson": "840",
        "holderAmount": -11186,
        "holderCurrencyIson": "840",
        "totalHolderAmount": -11186,
        "billingConversionRate": 1.328417,
        "settlementConversionRate": 1,
        "baseConversionRate": 1,
        "holderConversionRate": 1,
        "transactionFee": 0,
        "currencyConvertionFee": null,
        "transactionCounters": [
            {
                "feeId": 2,
                "amount": 11186,
                "count": 1,
                "validFrom": 1601499600,
                "validTo": 1604181599,
                "currencyIson": "840",
                "transactionCounterConfigId": 1
            }
        ],
        "isConversionFeeBlended": 0,
        "mti": "0100",
        "productId": 1,
        "transactionCountryIson": "076",
        "acquirerId": "019780",
        "additionalAmount": {
            "accountType1": "00",
            "amountType1": "40",
            "currencyCode1": "826",
            "creditDebitIndicator1": "D",
            "amount1": "000000001000",
            "accountType2": "00",
            "amountType2": "40",
            "currencyCode2": "826",
            "creditDebitIndicator2": "D",
            "amount2": "000000001000",
            "original": "*****",
            "raw": "*****"
        },
        "txAmountFee": 0,
        "authCode": "102433",
        "note": null,
        "mccCode": "1520",
        "cumulativePaddingAmount": null,
        "appliedPaddingAmount": null,
        "merchantId": "SHP000000000057",
        "merchantName": "Transaction des        Kaunas        BRA",
        "posEntryMode": "810",
        "posData": "1025104006000076902101234",
        "posTerminalId": "pa1bra  ",
        "posTime": "190529094739",
        "procCode": "000000",
        "retrievalReferenceNumber": "121100000002",
        "settlementAmount": null,
        "settlementCurrencyIson": null,
        "traceLogId": 15591124619138,
        "transactionTime": 1559123259,
        "additionalData1": null,
        "additionalData2": null,
        "authorizedByStandIn": "N",
        "avsResult": null,
        "cardUsageGroup": 1,
        "institutionCode": 1,
        "recordData": null,
        "partialApproval": 0,
        "suspicious": 0,
        "notifyHolder": 1,
        "riskRuleCodes": "RRC-01;RRC-02;",
        "rawMessage": null,
        "riskActions": {
            "markTransactionAsSuspicious": 1,
            "notifyCardholderBySendingTaisNotification": 1,
            "changeCardStatusToRisk": 0,
            "changeAccountStatusToSuspended": 0,
            "rejectTransaction": 0
        },
        "securityChecks": {
            "cardExpirationDatePresent": 0,
            "onlinePin": 0,
            "offlinePin": 0,
            "3DSecure": 0,
            "cvv2": 0,
            "magneticStripe": 1,
            "chipData": 0,
            "avs": 0,
            "phoneNumber": 0,
            "signature": 0
        },
        "validDateTo": "2019-01-01",
        "triggeredLimitId": 1,
        "cardProgramId": 1,
        "accountProgramId": 2,
        "adviceReason": 192,
        "schemeId": 1
    },
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CardSettlement

| Parameter                    | M   |  Length  | Type | Description                                                                                                                                          |
|------------------------------|-----|----------|------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardId                       | M   | 1-20     | N    | Card `cardId`.                                                                                                                                       |
| cardRequestId                | M   | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                                                                                  |
| accountId                    | M   | 1-20     | N    |                                                                                                                                                      |
| availableBalance             | M   | 1-20     | N    |                                                                                                                                                      |
| settledBalance               | M   | 1-20     | N    |                                                                                                                                                      |
| transactionId                | M   | 1-20     | N    | Unique transaction ID in Platform’s database.                                                                                                        |
| transLink                    | M   | 1-255    | ANS  |                                                                                                                                                      |
| transactionStatusCode        | M   | 1        | A    | [`Transaction status code`](#appendix--enum--transaction-status-code) Possible values: `I`, `S`.                                                     |
| responseCode                 | C   | 2        | AN   | `DE 39`. For clearing and information - this field is reflection of authorization response.                                                          |
| entryModeType                | M   | 1-20     | N    | [`Entry mode type`](#appendix--enum--entry-mode-type)                                                                                                |
| transactionType              | M   | 1-11     | N    | [`Transaction type`](#appendix--enum--transaction-type)                                                                                              |
| transactionAmount            | M   | 1-20     | N    | `DE4`.                                                                                                                                               |
| transactionCurrencyIson      | M   | 3        | N    | `DE49`. Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                              |
| billingAmount                | M   | 1-20     | N    | `DE6`.                                                                                                                                               |
| billingCurrencyIson          | M   | 3        | N    | `DE51`. Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                  |
| holderAmount                 | M   | 1-20     | N    | Transaction amount in holder’s currency.                                                                                                             |
| holderCurrencyIson           | M   | 3        | N    | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                           |
| billingConversionRate        | C   | 1-16     | NS   | DE10 provided when received by Scheme.                                                                                                               |
| reconciliationConversionRate | C   | 1-16     | NS   | DE9 provided when received by Scheme.                                                                                                                |
| interchangeRateDesignator    | C   | 2        | N    |                                                                                                                                                      |
| transactionCounters          | O   | \-       | OBJ-LIST | [`Transaction counter`](#appendix--enum--transaction-counter) Provided when a fee with counter was applied.                                          |
| baseConversionRate           | M   | 1-16     | NS   | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                          |
| holderConversionRate         | M   | 1-16     | NS   | `baseConversionRate`  with applied FX markup (if FX fee was applied).                                                                                |
| transactionFee               | O   | 1-20     | N    | Calculated fee for transaction according to program settings.                                                                                        |
| currencyConvertionFee        | O   | 1-20     | N    |                                                                                                                                                      |
| isConversionFeeBlended       | M   | 1        | N    | `1` - yes (blended to holderAmount), `0` - no.                                                                                                       |
| mti                          | M   | 4        | N    | MTI code from scheme’s message.                                                                                                                      |
| productId                    | M   | 1-20     | N    | Card’s product id.                                                                                                                                   |
| transactionCountryIson       | M   | 3        | N    | Transaction country code ISO numeric.                                                                                                                |
| acquirerId                   | C   | 1-11     | N    | `DE32`. Acquirer `ICA` or `BIN`. Provided when received by Scheme.                                                                                   |
| acquirerReferenceNumber      | C   | 1-23     | ANS  | Acquirer Reference Number                                                                                                                            |
| txAmountFee                  | C   | 1-20     | N    | Interchange fee amount in cents.                                                                                                                     |
| txCurrencyFee                | C   | 1-20     | N    | [`Currency`](#appendix--enum--currency) in which interchange fee is provided.                                                                              |
| authCode                     | C   | 6        | AN   | `DE38` provided when received by Scheme.                                                                                                             |
| note                         | O   | 1-65,535 | ANS  | ISAC.                                                                                                                                                |
| loadSource                   | O   | 1-20     | N    | Load source, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load source`](#appendix--enum--load-source) |
| loadType                     | O   | 1-20     | N    | Load type, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load type`](#appendix--enum--load-type)       |
| mccCode                      | M   | 1-4      | N    | `DE18`. Merchant category code.                                                                                                                      |
| merchantId                   | C   | 1-20     | ANS  | `DE42` provided when received by Scheme.                                                                                                             |
| merchantName                 | M   | 1-255    | ANS  | `DE43`.                                                                                                                                              |
| posEntryMode                 | M   | 1-22     | N    | `DE22`. POS entry mode from scheme.                                                                                                                  |
| posTerminalId                | C   | 1-50     | ANS  | `DE41` provided when received by Scheme.                                                                                                             |
| posTime                      | C   | 14       | N    | Provided when MTI is not LOCL or EPMT.                                                                                                               |
| procCode                     | M   | 6        | N    | `DE3`.                                                                                                                                               |
| retrievalReferenceNumber     | C   | 1-20     | AN   | `DE37` provided when received by Scheme.                                                                                                             |
| settlementAmount             | M   | 1-20     | N    | `DE5`.                                                                                                                                               |
| settlementCurrencyIson       | M   | 3        | N    | `DE50`. Settlement [`currency`](#appendix--enum--currency) code ISO numeric.                                                                               |
| transactionImportedDateGmt   | M   | 11       | N    | Date when clearing transaction was imported by Platform.                                                                                             |
| additionalData1              | M   | 1-999    | AN   | Provided when received by Scheme. MasterCard: `DE48`.                                                                                                |
| additionalData2              | O   | 1-999    | AN   | `DE124`.                                                                                                                                             |
| cardUsageGroup               | M   | 1-20     | N    |                                                                                                                                                      |
| institutionCode              | C   | 1-20     | N    | Issuer Identification Number (IIN) and Interbank Card Association Number (ICA). Can be `null` if external payment transaction are performed.         |
| logsTransactionId            | C   | 1-20     | N    | Unique ID for the transaction in the Platform’s database. Provided if transaction created when importing settlement.                                 |
| suspicious                   | M   | 1        | N    | Possible values: `1` - is suspicious , `0` - not suspicious.                                                                                         |
| rawMessage                   | O   | 1-65,535 | ANS  | Raw scheme’s message in `ISO8583` format.                                                                                                            |
| referenceNumber              | O   | 1-255    | AN   |                                                                                                                                                      |
| description                  | O   | 1-255    | ANS  |                                                                                                                                                      |
| notifyHolder                 | M   | 1        | N    | Possible values: `1` - the holder has to be notified, `0` - no further action required.                                                              |
| riskRuleCodes                | O   | 1-65,535 | ANS  | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                     |
| riskActions                  | M   | \-       | OBJ  | [`Risk rule action`](#appendix--enum--risk-rule-action)                                                                                              |
| securityChecks               | M   | \-       | OBJ  | [`Security check`](#appendix--enum--security-check)                                                                                                  |
| cardProgramId                | M   | 1-20     | N    | Card program ID.                                                                                                                                     |
| accountProgramId             | M   | 1-20     | N    | Account program ID.                                                                                                                                  |
| disputeId                    | C   | 1-20     | N    | Dispute ID. Provided if the dispute was created.                                                                                                     |
| externalDisputeId            | O   | 1-20     | N    | External system dispute ID if it was provided on dispute create.                                                                                     |
| reversalIndicator            | C   | 1        | A    | This field will be provided on settlement reversals. Possible values: `R` - reversal , `S` - reversal of reversal (only for Mastercard).             |
| schemeId                     | M   | 1        | N    | [`Scheme ID`](#appendix--enum--scheme-id).                                                                                                           |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "cardSettlement"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": {
        "cardId": 123482,
        "accountId": 27,
        "availableBalance": 99893092,
        "settledBalance": 99893092,
        "transactionId": 15591134675880,
        "transLink": "1559113468181003024451123482000000TRANS5CEE2EFC140A7",
        "transactionStatusCode": "S",
        "responseCode": null,
        "entryModeType": 2,
        "transactionType": 2,
        "transactionAmount": -9568,
        "transactionCurrencyIson": "978",
        "billingAmount": -8493,
        "billingCurrencyIson": "826",
        "holderAmount": -10703,
        "holderCurrencyIson": "840",
        "billingConversionRate": 1.328417,
        "reconciliationConversionRate": 1,
        "baseConversionRate": 1,
        "holderConversionRate": 1,
        "transactionFee": 0,
        "currencyConvertionFee": null,
        "transactionCounters": [
            {
                "feeId": 2,
                "amount": 11186,
                "count": 1,
                "validFrom": 1601499600,
                "validTo": 1604181599,
                "currencyIson": "840",
                "transactionCounterConfigId": 1
            }
        ],
        "isConversionFeeBlended": 0,
        "mti": "1240",
        "productId": 1,
        "transactionCountryIson": "056",
        "acquirerId": "00000999901",
        "txAmountFee": 19,
        "txCurrencyFee": "826",
        "authCode": null,
        "note": "",
        "loadSource": null,
        "loadType": null,
        "mccCode": "5662",
        "merchantId": "Merchant termin",
        "merchantName": "Merchant1\\UNKNOWN\\Waterloo\\B1410     ",
        "posEntryMode": "A11101A54000",
        "posTerminalId": "12345678",
        "posTime": "181003024451",
        "procCode": "000000",
        "retrievalReferenceNumber": null,
        "settlementAmount": -8493,
        "settlementCurrencyIson": "826",
        "transactionImportedDateGmt": "2019-05-29 07:04:27.000",
        "additionalData1": "0002003MRG0003003MRG0023003POI014603600290197800000000001982600000000001601470480029019780000000000001913608260000000000001698510148008978282620158030MCC30500127518100501 MRGNNNNNN01590671483       2002004406861259            1EU00000012N18100501181005010165001M0177002YY019100121000051Debit MasterCard Contactless MSR purchase signature",
        "additionalData2": null,
        "cardUsageGroup": 1,
        "institutionCode": 1,
        "logsTransactionId": 15591134669048,
        "suspicious": 0,
        "rawMessage": null,
        "referenceNumber": null,
        "description": null,
        "notifyHolder": 0,
        "riskRuleCodes": null,
        "riskActions": {
            "markTransactionAsSuspicious": 0,
            "notifyCardholderBySendingTaisNotification": 0,
            "changeCardStatusToRisk": 0,
            "changeAccountStatusToSuspended": 0,
            "rejectTransaction": 0
        },
        "securityChecks": {
            "cardExpirationDatePresent": 0,
            "onlinePin": 0,
            "offlinePin": 0,
            "3DSecure": 0,
            "cvv2": 0,
            "magneticStripe": 1,
            "chipData": 0,
            "avs": 0,
            "phoneNumber": 0,
            "signature": 0
        },
        "cardProgramId": 1,
        "accountProgramId": 2,
        "disputeId": null,
        "externalDisputeId": null,
        "reversalIndicator": null,
        "schemeId": 1
    },
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CardStatusChange

| Parameter      | M  | Length | Type | Description                                                                             |
|:---------------|:---|:-------|:-----|:----------------------------------------------------------------------------------------|
| cardId         | M  | 1-20   | N    | Card `cardId`. Identifies card, issued by Platform.                                     |
| cardRequestId  | M  | 1-20   | N    | Card number identifier. Identifies card number, issued by Platform.                     |
| newStatus      | M  | 1      | A    | New [`card status`](#appendix--enum--card-status) identifier                            |
| previousStatus | M  | 1      | A    | Previous [`card status`](#appendix--enum--card-status) identifier                       |
| source         | M  | 1      | N    | Identifies card status change initiator. [`Source type`](#appendix--enum--source-type). |
| reasonCode     | O  | 1-20   | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)               |
| note           | O  | 1-255  | ANS  | A short description which explains why card status has been changed.                    |
| cardProgramId  | M  | 1-20   | N    | Card program ID.                                                                        |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "requestType": [
        "cardStatusChange"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": {
        "cardId": 123457,
        "newStatus": "B",
        "previousStatus": "A",
        "source": 1,
        "reasonCode": 13,
        "note": "Card has been blocked",
        "cardProgramId": 1
    },
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CustomNotification

| Parameter              | M  | Length   | Type | Description                                                                                       |
|:-----------------------|:---|:---------|:-----|:--------------------------------------------------------------------------------------------------|
| cardId                 | C  | 1-20     | N    | Mandatory if `accountId` not specified. Fields `cardId` and `accountId` can be specified both.    |
| cardRequestId          | C  | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                               |
| accountId              | C  | 1-20     | N    | Mandatory if `cardId` not specified. Fields `cardId` and `accountId` can be specified both.       |
| source                 | M  | 1-11     | N    | [`Custom notification source`](#appendix--enum--custom-notification-source)                       |
| invokedEvent           | M  | 1-50     | AN   |                                                                                                   |
| payload                | O  | OBJ      |      |                                                                                                   |
| cardProgramId          | M  | 1-20     | N    | Card program ID.                                                                                  |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "customNotification"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": {
        "cardId": 123456,
        "accountId": 1,
        "source": 1,
        "invokedEvent": "dublicatedSession",
        "payload": {
            "reference": "1aff56ef"
        },
        "cardProgramId": 1
    },
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### DirectCreditReceived

|        Parameter        | M |  Length  | Type |                                                                     Description                                                                       |
|-------------------------|---|----------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardId                  | C | 1-20     | N    |                                                                                                                                                       |
| cardRequestId           | C | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                                                                                  |
| accountId               | M | 1-20     | N    |                                                                                                                                                       |
| epmAddressId            | M | 1-20     | N    |                                                                                                                                                       |
| epmTransactionId        | M | 1-20     | N    |                                                                                                                                                       |
| availableBalance        | M | 1-20     | N    |                                                                                                                                                       |
| settledBalance          | M | 1-20     | N    |                                                                                                                                                       |
| transactionId           | C | 1-20     | N    | Unique transaction ID in Platform’s database.                                                                                                         |
| transLink               | C | 1-255    | ANS  |                                                                                                                                                       |
| transactionStatusCode   | M | 1        | A    | [`Transaction status code`](#appendix--enum--transaction-status-code) Possible values: `I`, `S`.                                                                                                                          |
| entryModeType           | C | 1-20     | N    | [`Entry mode type`](#appendix--enum--entry-mode-type)                                                                                                 |
| transactionType         | C | 1-11     | N    | [`Transaction type`](#appendix--enum--transaction-type)                                                                                               |
| transactionAmount       | C | 1-20     | N    |                                                                                                                                                       |
| transactionCurrencyIson | C | 3        | N    | Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                |
| billingAmount           | C | 1-20     | N    |                                                                                                                                                       |
| billingCurrencyIson     | C | 3        | N    | Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                    |
| holderAmount            | C | 1-20     | N    | Transaction amount in holder’s currency.                                                                                                              |
| holderCurrencyIson      | C | 3        | N    | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                     |
| baseConversionRate      | M | 1-16     | NS   | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                                                           |
| holderConversionRate    | M | 1-16     | NS   | `baseConversionRate`  with applied FX markup (if FX fee was applied).                                                                    |
| transactionFee          | C | 1-20     | N    | Calculated fee for transaction according to program settings.                                                                                         |
| currencyConvertionFee   | O | 1-20     | N    |                                                                                                                                                       |
| isConversionFeeBlended  | M | 1        | N    | `1` - yes (blended to holderAmount), `0` - no.                                                                                                                                                                                                                             |
| transactionCounters     | O | \-       | OBJ-LIST | [`Transaction counter`](#appendix--enum--transaction-counter) Provided when fees with counter applied.                                                                                                                                                                                                              |
| mti                     | M | 4        | N    | `LOCL`.                                                                                                                                               |
| productId               | M | 1-20     | N    | Card’s product id.                                                                                                                                    |
| transactionCountryIson  | M | 3        | N    | Transaction country code ISO numeric.                                                                                                                 |
| note                    | O | 1-65,535 | ANS  | ISAC.                                                                                                                                                 |
| loadSource              | O | 1-20     | N    | Load source, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load source`](#appendix--enum--load-source)  |
| loadType                | O | 1-20     | N    | Load type, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load type`](#appendix--enum--load-type)        |
| merchantName            | C | 1-255    | ANS  |                                                                                                                                                       |
| posTime                 | M | 14       | N    | Local merchant’s time.                                                                                                                                |
| procCode                | C | 6        | N    |                                                                                                                                                       |
| cardUsageGroup          | C | 1-20     | N    | Can be `null` if external payment transaction are performed.                                                                                          |
| referenceNumber         | O | 1-255    | ANS  |                                                                                                                                                       |
| transactionIdentifier   | O | 1-100    | ANS  | ID generated by external payment bank provider.                                                                                                       |
| endToEndIdentifier      | O | 1-100    | ANS  | ID generated by Bank Connect.                                                                                                                         |
| epmTransactionType      | M | 1-20     | N    | [`External payment transaction type`](#appendix--enum--external-payment--transaction-type)                                                            |
| reasonDescription       | O | 1-255    | ANS  |                                                                                                                                                       |
| bankProviderReasonCode  | O | 1-255    | ANS  |                                                                                                                                                       |
| epmAddressTo            | M | \-       | OBJ  | [`External payment address`](#appendix--enum--external-payment--address)                                                                              |
| epmAddressFrom          | C | \-       | OBJ  | If value will be provided depends on the external provider. [`External payment address`](#appendix--enum--external-payment--address)                  |
| notifyHolder            | M | 1        | N    | Possible values: `1` - the holder has to be notified, `0` - no further action required.                                                               |
| riskRuleCodes           | O | 1-65,535 | ANS  | Risk rules codes which were triggered creating transaction. Codes separated by a semicolon.                                                           |
| riskActions             | M | \-       | OBJ  | [`Risk rule action`](#appendix--enum--risk-rule-action)                                                                                               |
| cardProgramId           | O | 1-20     | N    | Card program ID.                                                                                                                                      |
| accountProgramId        | M | 1-20     | N    | Account program ID.                                                                                                                                   |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "directCreditReceived"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": {
        "cardId": 123456,
        "accountId": 1,
        "epmAddressId": 1,
        "epmTransactionId": 15608371135001,
        "availableBalance": 99998000,
        "settledBalance": 99998000,
        "transactionId": 15608371161039,
        "transLink": "15608371151EC0000TRANS5D087BFBAB2D92.93742240",
        "transactionStatusCode": "S",
        "entryModeType": 12,
        "transactionType": 59,
        "transactionAmount": 2000,
        "transactionCurrencyIson": "840",
        "billingAmount": 2000,
        "billingCurrencyIson": "840",
        "holderAmount": 2000,
        "holderCurrencyIson": "840",
        "baseConversionRate": 1,
        "holderConversionRate": 1,
        "transactionFee": null,
        "currencyConvertionFee": 0,
        "isConversionFeeBlended": 0,
        "mti": "EPMT",
        "productId": 1,
        "transactionCountryIson": "826",
        "note": null,
        "loadSource": null,
        "loadType": null,
        "merchantName": "59",
        "posTime": "190618055155",
        "procCode": "EC0000",
        "cardUsageGroup": 1,
        "referenceNumber": null,
        "transactionIdentifier": null,
        "endToEndIdentifier": null,
        "reasonDescription": null,
        "bankProviderReasonCode": "MS01",
        "epmTransactionType": 18,
        "epmAddressTo": {
            "id": 7,
            "accountNumber": "26692356",
            "accountName": "Test Tester",
            "iban": "GB92SRLG04005926692356",
            "sortCode": "040059",
            "bic": "SRLGGB2L"
        },
        "epmAddressFrom": {
            "id": null,
            "accountNumber": "38089896",
            "accountName": "test b",
            "iban": "GB79SRLG04005938089896",
            "bban": null,
            "sortCode": "040059",
            "bic": null
        },
        "notifyHolder": 0,
        "riskRuleCodes": null,
        "riskActions": {
            "markTransactionAsSuspicious": 0,
            "notifyCardholderBySendingTaisNotification": 0,
            "changeCardStatusToRisk": 0,
            "changeAccountStatusToSuspended": 0,
            "rejectTransaction": 0
        },
        "transactionCounters": [
            {
                "feeId": 2,
                "amount": 11186,
                "count": 1,
                "validFrom": 1601499600,
                "validTo": 1604181599,
                "currencyIson": "840",
                "transactionCounterConfigId": 1
            }
        ],
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### DirectDebitDue

| Parameter               | M   | Length   | Type | Description                                                                                                                          |
|-------------------------|-----|----------|------|--------------------------------------------------------------------------------------------------------------------------------------|
| action                  | C   | 1-2      | N    | [`External payment direct debit due action`](#appendix--enum--external-payment--direct-debit-due-action)                             |
| cardId                  | C   | 1-20     | N    |                                                                                                                                      |
| cardRequestId           | C   | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                                                                  |
| accountId               | M   | 1-20     | N    |                                                                                                                                      |
| epmAddressId            | M   | 1-20     | N    |                                                                                                                                      |
| epmTransactionId        | M   | 1-20     | N    |                                                                                                                                      |
| availableBalance        | M   | 1-20     | N    |                                                                                                                                      |
| settledBalance          | M   | 1-20     | N    |                                                                                                                                      |
| transactionAmount       | M   | 1-20     | N    |                                                                                                                                      |
| transactionCurrencyIson | M   | 3        | N    | Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                      |
| billingAmount           | M   | 1-20     | N    |                                                                                                                                      |
| billingCurrencyIson     | M   | 3        | N    | Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                          |
| holderAmount            | M   | 1-20     | N    | Transaction amount in holder’s currency.                                                                                             |
| holderCurrencyIson      | M   | 3        | N    | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                           |
| transactionCountryIson  | M   | 3        | N    | Transaction country code ISO numeric.                                                                                                |
| note                    | O   | 1-65,535 | ANS  | ISAC.                                                                                                                                |
| description             | C   | 1-50     | ANS  |                                                                                                                                      |
| transactionTime         | M   | 11       | N    | Unix timestamp when record was created.                                                                                              |
| referenceNumber         | O   | 1-255    | ANS  |                                                                                                                                      |
| transactionIdentifier   | O   | 1-100    | ANS  | ID generated by external payment bank provider.                                                                                      |
| endToEndIdentifier      | O   | 1-100    | ANS  | ID generated by Bank Connect.                                                                                                        |
| scheme                  | M   | 1-20     | N    | [`External payment scheme`](#appendix--enum--external-payment--scheme)                                                               |
| should_pay              | M   | 1        | N    | `1` - yes, `0` - no.                                                                                                                 |
| transaction_status_code | M   | 1        | N    | [`External payment transaction status code`](#appendix--enum--external-payment--transaction-status-code)                             |
| due_at                  | C   | 11       | N    | Unix timestamp.                                                                                                                      |
| epmTransactionType      | M   | 1-20     | N    | [`External payment transaction type`](#appendix--enum--external-payment--transaction-type)                                           |
| epmAddressFrom          | M   | \-       | OBJ  | [`External payment address`](#appendix--enum--external-payment--address)                                                             |
| epmAddressTo            | C   | \-       | OBJ  | If value will be provided depends on the external provider. [`External payment address`](#appendix--enum--external-payment--address) |
| mandate                 | M   | \-       | OBJ  | [`External payment mandate`](#appendix--enum--external-payment--mandate)                                                             |
| epmMandateId            | M   | 1-20     | N    | Internal mandate ID.                                                                                                                 |
| cardProgramId           | O   | 1-20     | N    | Card program ID.                                                                                                                     |
| accountProgramId        | M   | 1-20     | N    | Account program ID.                                                                                                                  |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "directDebitDue"
    ],
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": {
        "action": 1,
        "cardId": 123456,
        "cardRequestId": 213,
        "accountId": 1,
        "epmAddressId": 1,
        "epmTransactionId": 15608366046092,
        "availableBalance": 99994000,
        "settledBalance": 99994000,
        "transactionAmount": -3000,
        "transactionCurrencyIson": "840",
        "billingAmount": -3000,
        "billingCurrencyIson": "840",
        "holderAmount": -3000,
        "holderCurrencyIson": "840",
        "transactionCountryIson": "826",
        "note": null,
        "description": "58",
        "transactionTime": "190618054327",
        "referenceNumber": null,
        "transactionIdentifier": null,
        "endToEndIdentifier": null,
        "scheme": 1,
        "should_pay": 0,
        "transaction_status_code": 0,
        "due_at": null,
        "epmTransactionType": 13,
        "epmAddressFrom": {
            "id": 7,
            "accountNumber": "26692356",
            "accountName": "Test Tester",
            "iban": "GB92SRLG04005926692356",
            "bban": "GB92SRLG04005926692356",
            "sortCode": "040059",
            "bic": "SRLGGB2L"
        },
        "epmAddressTo": {
            "id": null,
            "accountNumber": "38089896",
            "accountName": "test b",
            "iban": "GB79SRLG04005938089896",
            "bban": null,
            "sortCode": "040059",
            "bic": null
        },
        "mandate": {
            "id": 2,
            "status": 1,
            "reference": "ADADAD",
            "originatorId": 1,
            "originatorName": "Tester",
            "originatorServiceUserNumber": "1546825",
            "errorReason": null
        },
        "epmMandateId": 10002,
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### DirectDebitMandate

| Parameter         | M  | Length | Type | Description                                                                                             |
|:------------------|:---|:-------|:-----|:--------------------------------------------------------------------------------------------------------|
| mandateActionType | M  | 11     | N    | [`External payment mandate action type`](#appendix--enum--external-payment--mandate-action-type)        |
| epmMandateId      | M  | 1-20     | N    | Internal mandate ID.                                                                                    |
| epmAddressId      | M  | 1-20     | N    | Internal address ID.                                                                                    |
| accountId         | M  | 1-20   | N    |                                                                                                         |
| mandate           | M  | \-     | OBJ  | [`External payment mandate`](#appendix--enum--external-payment--mandate)                                |
| cardProgramId     | O  | 1-20   | N    | Card program ID.                                                                                        |
| accountProgramId  | M  | 1-20   | N    | Account program ID.                                                                                     |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "directDebitMandate"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": {
        "mandateActionType": 1,
        "epmMandateId": 1,
        "epmAddressId": 1,
        "accountId": 1,
        "mandate": {
            "id": 2,
            "status": 1,
            "reference": "ADADAD",
            "originatorId": 1,
            "originatorName": "Tester",
            "originatorServiceUserNumber": "1546825",
            "errorReason": null
        },
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### EpmAddressAssignCompleted

| Parameter           | M  | Length | Type | Description                                     |
|:--------------------|:---|:-------|:-----|:------------------------------------------------|
| id                  | M  | 1-20   | N    | EPM address ID                                  |
| accountId           | M  | 1-20   | N    |                                                 |
| externalId          | M  | 1-20   | N    |                                                 |
| active              | M  | 1      | N    | `1` - yes, `0` - no.                            |
| accountType         | M  | 1-3    | N    | [`Account type`](#appendix--enum--account-type) |
| accountNumber       | C  | 1-26   | ANS  |                                                 |
| accountName         | M  | 1-255  | ANS  |                                                 |
| iban                | C  | 1-50   | ANS  |                                                 |
| sortCode            | C  | 1-50   | ANS  |                                                 |
| bic                 | C  | 1-50   | ANS  |                                                 |
| directCreditEnabled | M  | 1      | N    | `1` - enabled, `0` - disabled.                  |
| directDebitEnabled  | M  | 1      | N    | `1` - enabled, `0` - disabled.                  |
| inboundEnabled      | M  | 1      | N    | `1` - enabled, `0` - disabled.                  |
| outboundEnabled     | M  | 1      | N    | `1` - enabled, `0` - disabled.                  |
| epmMethodId         | M  | 1-20   | N    | EPM method ID                                   |
| currencyIson        | M  | 3      | N    | EPM address [`currency`](#appendix--enum--currency) code ISO numeric.          |
| countryIson         | M  | 3      | N    | EPM address country code ISO numeric.           |
| cardProgramId       | O  | 1-20   | N    | Card program ID.                                |
| accountProgramId    | M  | 1-20   | N    | Account program ID.                             |

```json
{
    "sourceId": 3,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "epmAddressAssignCompleted"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": {
        "id": 1,
        "accountId": 1,
        "externalId": 1,
        "active": 1,
        "accountType": 1,
        "accountNumber": "38089896",
        "accountName": "Test Test",
        "iban": "GB36SRLG04005932936187",
        "sortCode": "040059",
        "bic": "SRLGGB2L",
        "directCreditEnabled": 1,
        "directDebitEnabled": 1,
        "inboundEnabled": 1,
        "outboundEnabled": 1,
        "epmMethodId": 1,
        "currencyIson": "826",
        "countryIson": "826",
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### EpmAddressAssignFailed

| Parameter         | M  | Length | Type | Description                                     |
|:------------------|:---|:-------|:-----|:------------------------------------------------|
| id                | M  | 1-20   | N    | EPM address ID                                  |
| accountId         | M  | 1-20   | N    |                                                 |
| holderId          | C  | 1-20   | N    | Mandatory if `account type` is `account`.       |
| externalId        | M  | 1-20   | N    |                                                 |
| active            | M  | 1      | N    | `1` - yes, `0` - no.                            |
| accountType       | M  | 1-3    | N    | [`Account type`](#appendix--enum--account-type) |
| epmMethodId       | M  | 1-20   | N    | EPM method ID                                   |
| currencyIson      | M  | 3      | N    | EPM address [`currency`](#appendix--enum--currency) code ISO numeric.          |
| cardProgramId     | O  | 1-20   | N    | Card program ID.                                |
| accountProgramId  | M  | 1-20   | N    | Account program ID.                             |

```json
{
    "sourceId": 3,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "epmAddressAssignFailed"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": {
        "id": 1,
        "accountId": 1,
        "holderId": 1,
        "externalId": 1,
        "active": 1,
        "accountType": 1,
        "epmMethodId": 2,
        "currencyIson": "826",
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### ExternalPaymentSettlement

| Parameter                 | M   | Length   | Type     | Description                                                                                                                                          |
|---------------------------|-----|----------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardId                    | C   | 1-20     | N        | Card `cardId`. Identifies card, issued by Platform. Can be `null` if external payment transaction are performed.                                     |
| cardRequestId             | C   | 1-20     | N        | Card number identifier. Identifies card number, issued by Platform.                                                                                  |
| accountId                 | M   | 1-20     | N        |                                                                                                                                                      |
| epmAddressId              | M   | 1-20     | N        |                                                                                                                                                      |
| epmSchemeId               | M   | 1-20     | N        | [`External payment scheme`](#appendix--enum--external-payment--scheme)                                                                               |
| epmTransactionId          | M   | 1-20     | N        |                                                                                                                                                      |
| returnedEpmTransactionId  | C   | 1-20     | N        | Mandatory if primary EPM transaction exists.                                                                                                         |
| availableBalance          | M   | 1-20     | N        |                                                                                                                                                      |
| settledBalance            | M   | 1-20     | N        |                                                                                                                                                      |
| transactionId             | M   | 1-20     | N        | Unique transaction ID in Platform’s database.                                                                                                        |
| transLink                 | M   | 1-255    | ANS      |                                                                                                                                                      |
| transactionStatusCode     | M   | 1        | A        | [`Transaction status code`](#appendix--enum--transaction-status-code) Possible values: `I`, `S`, `R`.                                                |
| entryModeType             | M   | 1-20     | N        | [`Entry mode type`](#appendix--enum--entry-mode-type)                                                                                                |
| transactionType           | M   | 1-11     | N        | [`Transaction type`](#appendix--enum--transaction-type)                                                                                              |
| transactionAmount         | M   | 1-20     | N        |                                                                                                                                                      |
| transactionCurrencyIson   | M   | 3        | N        | Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                |
| billingAmount             | M   | 1-20     | N        |                                                                                                                                                      |
| billingCurrencyIson       | M   | 3        | N        | Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                    |
| holderAmount              | M   | 1-20     | N        | Transaction amount in holder’s currency.                                                                                                             |
| holderCurrencyIson        | M   | 3        | N        | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                     |
| baseConversionRate        | M   | 1-16     | NS       | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                          |
| holderConversionRate      | M   | 1-16     | NS       | `baseConversionRate`  with applied FX markup (if FX fee was applied).                                                                                |
| transactionFee            | O   | 1-20     | N        | Calculated fee for transaction according to program settings.                                                                                        |
| currencyConvertionFee     | O   | 1-20     | N        |                                                                                                                                                     |
| transactionCounters       | O   | \-       | OBJ-LIST | [`Transaction counter`](#appendix--enum--transaction-counter) Provided when a fee with counter was applied.                                          |
| isConversionFeeBlended    | M   | 1        | N        | `1` - yes (blended to holderAmount), `0` - no.                                                                                                       |
| mti                       | M   | 4        | N        | `LOCL`.                                                                                                                                              |
| productId                 | M   | 1-20     | N        | Card’s product id.                                                                                                                                   |
| transactionCountryIson    | M   | 3        | N        | Transaction country code ISO numeric.                                                                                                                |
| loadSource                | O   | 1-20     | N        | Load source, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load source`](#appendix--enum--load-source) |
| loadType                  | O   | 1-20     | N        | Load type, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load type`](#appendix--enum--load-type)       |
| merchantName              | M   | 1-255    | ANS      |                                                                                                                                                      |
| posTime                   | M   | 14       | N        | Local merchant’s time.                                                                                                                               |
| procCode                  | M   | 6        | N        |                                                                                                                                                      |
| cardUsageGroup            | C   | 1-20     | N        | Can be `null` if external payment transaction are performed.                                                                                         |
| referenceNumber           | O   | 1-255    | ANS      |                                                                                                                                                      |
| requestReferenceId        | O   | 1-255    | ANS      |                                                                                                                                                      |
| transactionIdentifier     | O   | 1-100    | ANS      | ID generated by external payment bank provider.                                                                                                      |
| endToEndIdentifier        | O   | 1-100    | ANS      | ID generated by Bank Connect.                                                                                                                        |
| actualEndToEndIdentifier  | O   | 1-100    | ANS      | ID generated by Bank Connect.                                                                                                                        |
| description               | O   | 1-255    | ANS      |                                                                                                                                                      |
| reasonDescription         | O   | 1-255    | ANS      |                                                                                                                                                      |
| bankProviderReasonCode    | O   | 1-255    | ANS      |                                                                                                                                                      |
| note                      | O   | 1-255    | ANS      |                                                                                                                                                      |
| additionalNote            | O   | 1-255    | ANS      |                                                                                                                                                      |
| epmTransactionType        | M   | 1-20     | N        | [`External payment transaction type`](#appendix--enum--external-payment--transaction-type)                                                           |
| epmAddressFrom            | M   | \-       | OBJ      | [`External payment address`](#appendix--enum--external-payment--address)                                                                             |
| epmAddressTo              | M   | \-       | OBJ      | [`External payment address`](#appendix--enum--external-payment--address)                                                                             |
| notifyHolder              | M   | 1        | N        | Possible values: `1` - the holder has to be notified, `0` - no further action required.                                                              |
| riskRuleCodes             | O   | 1-65,535 | ANS      | Risk rules codes which were triggered creating transaction. Codes separated by a semicolon.                                                          |
| riskActions               | M   | \-       | OBJ      | [`Risk rule action`](#appendix--enum--risk-rule-action)                                                                                              |
| cardProgramId             | O   | 1-20     | N        | Card program ID.                                                                                                                                     |
| accountProgramId          | M   | 1-20     | N        | Account program ID.                                                                                                                                  |
| supplementaryData         | O | 1-65,535 | ANS      | Bank provided supplementary data in JSON.                                                                                                            |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "externalPaymentSettlement"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": {
        "cardId": 123456,
        "accountId": 1,
        "epmAddressId": 1,
        "epmSchemeId": 2,
        "epmTransactionId": 15608373064666,
        "returnedEpmTransactionId": null,
        "availableBalance": 100000000,
        "settledBalance": 100000000,
        "transactionId": 15608373064615,
        "transLink": "15608373061EL0000TRANS5D087CBA6FE442.69449593",
        "transactionStatusCode": "S",
        "entryModeType": 12,
        "transactionType": 57,
        "transactionAmount": 2000,
        "transactionCurrencyIson": "840",
        "billingAmount": 2000,
        "billingCurrencyIson": "840",
        "holderAmount": 2000,
        "holderCurrencyIson": "840",
        "transactionFee": null,
        "currencyConvertionFee": 0,
        "transactionCounters": [
            {
                "feeId": 2,
                "amount": 11186,
                "count": 1,
                "validFrom": 1601499600,
                "validTo": 1604181599,
                "currencyIson": "840",
                "transactionCounterConfigId": 1
            }
        ],
        "mti": "EPMT",
        "productId": 1,
        "transactionCountryIson": "826",
        "loadSource": null,
        "loadType": null,
        "merchantName": "57",
        "posTime": "190618055506",
        "procCode": "EL0000",
        "cardUsageGroup": 1,
        "referenceNumber": "8b07f30537944896",
        "requestReferenceId": "a54sdfdsFSDf87cvzxcv323",
        "transactionIdentifier": null,
        "endToEndIdentifier": null,
        "actualEndToEndIdentifier": "2000000008171482211078687",
        "description": "ID:27,account number:81391558,account name:bbbb,iban:GB85SRLG04005981391558,sort code:040059",
        "reasonDescription": "Timeout",
        "bankProviderReasonCode": "MS01",
        "note": "Intern Company note",
        "additionalNote": "Additional note",
        "epmTransactionType": 1,
        "epmAddressFrom": {
            "id": 20,
            "accountNumber": "32936187",
            "accountName": "test a",
            "iban": "GB36SRLG04005932936187",
            "bban": "GB36SRLG04005932936187",
            "sortCode": "040059",
            "bic": "SRLGGB2L"
        },
        "epmAddressTo": {
            "id": 7,
            "accountNumber": "38089896",
            "accountName": "test b",
            "iban": "GB79SRLG04005938089896",
            "sortCode": "040059",
            "bic": "SRLGGB2L"
        },
        "notifyHolder": 0,
        "riskRuleCodes": null,
        "riskActions": {
            "markTransactionAsSuspicious": 0,
            "notifyCardholderBySendingTaisNotification": 0,
            "changeCardStatusToRisk": 0,
            "changeAccountStatusToSuspended": 0,
            "rejectTransaction": 0
        },
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### FinancialDetailAddendum

|                                                Parameter                                                | M | Length | Type |                                                                          Description                                                                          |
|---------------------------------------------------------------------------------------------------------|---|--------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId                                                                                           | M | 1-20   | N    | Unique transaction ID in Platform’s database.                                                                                                                 |
| transactionTransLink                                                                                    | M | 1-255  | ANS  |                                                                                                                                                               |
| mti                                                                                                     | M | 4      | N    |                                                                                                                                                               |
| additionalData                                                                                          | M |        | OBJ  |                                                                                                                                                               |
| additional_data / originatingMessageFormat                                                              | M | 1      | N    |                                                                                                                                                               |
| additional_data / transactionDescription                                                                | M |        | OBJ  |                                                                                                                                                               |
| additional_data / transactionDescription / usageCode                                                    | M | 2      | N    |                                                                                                                                                               |
| additional_data / transactionDescription / industryRecordNumber                                         | M | 3      | N    |                                                                                                                                                               |
| additional_data / transactionDescription / occurrenceIndicator                                          | M | 3      | N    |                                                                                                                                                               |
| additional_data / transactionDescription / associatedFirstPresentmentNumber                             | M | 8      | N    |                                                                                                                                                               |
| additional_data / customIdentifier                                                                      | M |        | OBJ  | Applicable for Lodging Summary, Travel Agency Detailc, Lodged Account Detail                                                                                  |
| additional_data / customIdentifier / type                                                               | M | 1-6    | ANS  |                                                                                                                                                               |
| additional_data / customIdentifier / detail                                                             | M | 1-76   | ANS  |                                                                                                                                                               |
| additional_data / travelAgencySequenceNumber                                                            | M | 4      | ANS  | Applicable for Travel Agency Detail                                                                                                                           |
| additional_data / travelAgencyFee                                                                       | M |        | OBJ  | Applicable for Travel Agency Detail                                                                                                                           |
| additional_data / travelAgencyFee / amount                                                              | M | 12     | N    |                                                                                                                                                               |
| additional_data / travelAgencyFee / amountExponent                                                      | M | 1      | N    |                                                                                                                                                               |
| additional_data / travelAgencyFee / amountSign                                                          | M | 1      | A    |                                                                                                                                                               |
| additional_data / travelAgencyFee / amountRate                                                          | M | 12     | N    |                                                                                                                                                               |
| additional_data / travelAgencyFee / description                                                         | M | 16     | ANS  |                                                                                                                                                               |
| additional_data / passengerName                                                                         | C | 1-29   | ANS  | Applicable for Passenger Transport Detail—General Ticket Information, Passenger Transport Detail—Rail Data                                                    |
| additional_data / ticketNumber                                                                          | C | 15     | ANS  | Applicable for Passenger Transport Detail—General Ticket Information, Passenger Transport Detail—Rail Data                                                    |
| additional_data / issuingCarrier                                                                        | C | 4      | ANS  | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / customerCode                                                                          | C | 1-25   | ANS  | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / issueDate                                                                             | C | 6      | N    | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / travelAgencyCode                                                                      | C | 8      | ANS  | Applicable for Passenger Transport Detail—General Ticket Information, Passenger Transport Detail—Rail Data                                                    |
| additional_data / travelAgencyName                                                                      | C | 1-25   | ANS  | Applicable for Passenger Transport Detail—General Ticket Information, Passenger Transport Detail—Rail Data                                                    |
| additional_data / totalFare                                                                             | C | 12     | N    | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / totalFees                                                                             | C | 12     | N    | Not applicable for Passenger Transport Detail—Rail Dataa                                                                                                      |
| additional_data / totalTaxes                                                                            | C | 12     | N    | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / additionalCardAcceptorInformation                                                     | C | 1-40   | ANS  | Applicable for Private Label Common Data, Corporate Card Common Data Requirements                                                                             |
| additional_data / austinTetraNumber                                                                     | C | 15     | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / naicsCode                                                                             | C | 6      | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / lineItemDate                                                                          | C | 14     | N    | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / additionalFuelLocationInformation                                                     | C |        | OBJ  | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / additionalFuelLocationInformation / hoursOfOperational24HoursAvailable                | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / 18WheelerAccessAvailable                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / dieselSitesAvailable                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / interstateAccessExitNumberWithDirectionsAvailable | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / convenienceStoreAvailable                         | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / truckStopRestaurantAvailable                      | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / truckStopHotelAvailable                           | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / truckStopWithShowersAvailable                     | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / vehicleMaintenanceRepairBaysAvailable             | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / carWashAvailable                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / aviationLocationsAvailable                        | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / marinaLocationsAvailable                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / alternativeFuelLocationsAvailable                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / additionalFuelLocationInformation / payAtPumpAvailable                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / travelDate                                                                            | C | 6      | N    | Applicable for Passenger Transport Detail—Rail Data, Passenger Transport Detail—Trip Leg Data                                                                 |
| additional_data / carrierCode                                                                           | C | 2      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data, Lodging Summary                                                                                      |
| additional_data / serviceClassCode                                                                      | C | 2      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / cityOfOriginAirportCode                                                               | C | 5      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / cityOfDestinationAirportCode                                                          | C | 5      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / stopOverCode                                                                          | C | 1      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / conjuctionTicket                                                                      | C | 15     | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / exchangeTicket                                                                        | C | 15     | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / couponNumber                                                                          | C | 1      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / fareBasisCode                                                                         | C | 1-15   | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / flightNumber                                                                          | C | 5      | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data, Lodging Summary                                                                                      |
| additional_data / departureTime                                                                         | C |        | OBJ  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / departureTime / departureTime                                                         | C | 4      | N    |                                                                                                                                                               |
| additional_data / departureTime / departureTimeSegment                                                  | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / totalCharges                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalCharges / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalCharges / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalCharges / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / arrivalTime                                                                           | C |        | OBJ  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / arrivalTime / arrivalTime                                                             | C | 4      | N    |                                                                                                                                                               |
| additional_data / arrivalTime / arrivalTimeSegment                                                      | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / totalRoomCharges                                                                      | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalRoomCharges / amount                                                             | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalRoomCharges / exponent                                                           | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalRoomCharges / sign                                                               | C | 1      | A    |                                                                                                                                                               |
| additional_data / Fare                                                                                  | C | 12     | N    | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / Fee                                                                                   | C | 12     | N    | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / Taxes                                                                                 | C | 12     | N    | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / endorsementsRestrictions                                                              | C | 1-20   | ANS  | Applicable for Passenger Transport Detail—Trip Leg Data                                                                                                       |
| additional_data / totalAmountChargedonCreditCard                                                        | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalAmountChargedonCreditCard / amount                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalAmountChargedonCreditCard / exponent                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalAmountChargedonCreditCard / sign                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / roomServiceCharges                                                                    | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / roomServiceCharges / amount                                                           | C | 12     | N    |                                                                                                                                                               |
| additional_data / roomServiceCharges / exponent                                                         | C | 1      | N    |                                                                                                                                                               |
| additional_data / roomServiceCharges / sign                                                             | C | 1      | A    |                                                                                                                                                               |
| additional_data / loungeBarCharges                                                                      | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / loungeBarCharges / amount                                                             | C | 12     | N    |                                                                                                                                                               |
| additional_data / loungeBarCharges / exponent                                                           | C | 1      | N    |                                                                                                                                                               |
| additional_data / loungeBarCharges / sign                                                               | C | 1      | A    |                                                                                                                                                               |
| additional_data / transportationCharges                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / transportationCharges / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / transportationCharges / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / transportationCharges / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / gratuityCharges                                                                       | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / gratuityCharges / amount                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / gratuityCharges / exponent                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / gratuityCharges / sign                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / rentalAgreementNumber                                                                 | C | 9      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / renterName                                                                            | C | 1-40   | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnCity                                                                      | C | 1-25   | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnStateProvince                                                             | C | 3      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnCountry                                                                   | C | 3      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnLocationId                                                                | C | 10     | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnDate                                                                      | C | 6      | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalReturnCheckoutDate                                                              | C | 6      | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / customerServiceTollFreeNumber                                                         | C | 17     | ANS  | Applicable for Vehicle Rental Detail, Lodging Summary                                                                                                         |
| additional_data / rentalRate                                                                            | C |        | OBJ  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalRate / rentalRateIndicator                                                      | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / rentalRate / rentalRate                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / conferenceRoomCharges                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / conferenceRoomCharges / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / conferenceRoomCharges / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / conferenceRoomCharges / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / ratePerMileOrKilometer                                                                | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / totalMilesOrKilometers                                                                | C | 4      | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / maximumFreeMilesOrKilometers                                                          | C | 4      | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / milesKilometersIndicator                                                              | C | 1      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / vehicleInsurance                                                                      | C |        | OBJ  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / audioVisualCharges                                                                    | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / audioVisualCharges / amount                                                           | C | 12     | N    |                                                                                                                                                               |
| additional_data / audioVisualCharges / exponent                                                         | C | 1      | N    |                                                                                                                                                               |
| additional_data / audioVisualCharges / sign                                                             | C | 1      | A    |                                                                                                                                                               |
| additional_data / adjustedAmount                                                                        | C |        | OBJ  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / adjustedAmount / adjustedAmountIndicator                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / adjustedAmount / adjustedAmount                                                       | C | 12     | N    |                                                                                                                                                               |
| additional_data / banquetCharges                                                                        | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / banquetCharges / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / banquetCharges / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / banquetCharges / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / programCode                                                                           | C | 2      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalLocationCity                                                                    | C | 1-25   | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalLocationStateProvince                                                           | C | 3      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalLocationCountry                                                                 | C | 3      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalLocationId                                                                      | C | 10     | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / rentalClassId                                                                         | C | 4      | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / internetAccessCharges                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / internetAccessCharges / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / internetAccessCharges / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / internetAccessCharges / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / earlyDepartureCharges                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / earlyDepartureCharges / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / earlyDepartureCharges / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / earlyDepartureCharges / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / guestName                                                                             | C | 1-40   | ANS  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / guestNumber                                                                           | C | 25     | ANS  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / invoiceNumber                                                                         | C | 1-25   | ANS  | Applicable for Electronic Invoice—Transaction Data                                                                                                            |
| additional_data / arrivalDate                                                                           | C | 6      | N    | Applicable for Lodging Summary                                                                                                                                |
| additional_data / departureDate                                                                         | C | 6      | N    | Applicable for Lodging Summary                                                                                                                                |
| additional_data / folioNumber                                                                           | C | 1-25   | ANS  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / propertyPhoneNumber                                                                   | C | 17     | ANS  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / billingAdjustment                                                                     | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / billingAdjustment / indicator                                                         | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / billingAdjustment / amount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingAdjustment / exponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingAdjustment / sign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / invoiceDate                                                                           | C | 6      | N    | Applicable for Electronic Invoice—Transaction Data                                                                                                            |
| additional_data / roomRate                                                                              | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / roomRate / amount                                                                     | C | 12     | N    |                                                                                                                                                               |
| additional_data / roomRate / exponent                                                                   | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalRoomTax                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalRoomTax / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalRoomTax / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalRoomTax / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / programCode                                                                           | C | 2      | ANS  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / phoneCharges                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / phoneCharges / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / phoneCharges / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / phoneCharges / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / restaurantCharges                                                                     | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / restaurantCharges / amount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / restaurantCharges / exponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / restaurantCharges / sign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / miniBarCharges                                                                        | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / miniBarCharges / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / miniBarCharges / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / miniBarCharges / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / giftShopCharges                                                                       | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / giftShopCharges / amount                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / giftShopCharges / exponent                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / giftShopCharges / sign                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / laundryAndDryCleaningCharges                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / laundryAndDryCleaningCharges / amount                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / laundryAndDryCleaningCharges / exponent                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / laundryAndDryCleaningCharges / sign                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / otherServices                                                                         | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / otherServices / code                                                                  | C | 13     | ANS  |                                                                                                                                                               |
| additional_data / otherServices / amount                                                                | C | 12     | N    |                                                                                                                                                               |
| additional_data / otherServices / exponent                                                              | C | 1      | N    |                                                                                                                                                               |
| additional_data / otherServices / sign                                                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / invoiceCreationDateAndTime                                                            | C |        | OBJ  | Applicable for Electronic Invoice—Transaction Data                                                                                                            |
| additional_data / invoiceCreationDateAndTime / date                                                     | C | 6      | N    | YYMMDD                                                                                                                                                        |
| additional_data / invoiceCreationDateAndTime / time                                                     | C | 6      | N    | HHMMSS                                                                                                                                                        |
| additional_data / partyIdentification                                                                   | C | 2      | AN   | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partyName                                                                             | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partyName / partyName                                                                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyName / partyName2                                                                | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyName / partyName3                                                                | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress                                                                          | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partyAddress / partyAddressLine                                                       | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress / partyAddressLine2                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress / partyAddressLine3                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress / partyAddressLine4                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress / partyAddressLine5                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyAddress / partyAddressLine6                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partyPostalInformation                                                                | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partyPostalInformation / city                                                         | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / partyPostalInformation / stateProvinceCode                                            | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / partyPostalInformation / countryCode                                                  | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / partyPostalInformation / postalCode                                                   | C | 15     | ANS  |                                                                                                                                                               |
| additional_data / partyContact                                                                          | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partyContact / partyContactDescriptor                                                 | C | 1      | N    |                                                                                                                                                               |
| additional_data / partyContact / partyContactInformation                                                | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / partyContact / partyContactDescriptor2                                                | C | 1      | N    |                                                                                                                                                               |
| additional_data / partyContact / partyContactInformation2                                               | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / partyContact / partyContactDescriptor3                                                | C | 1      | N    |                                                                                                                                                               |
| additional_data / partyContact / partyContactInformation3                                               | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / partyContact / partyContactDescriptor4                                                | C | 1      | N    |                                                                                                                                                               |
| additional_data / partyContact / partyContactInformation4                                               | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / partyContact / partyContactDescriptor5                                                | C | 1      | N    |                                                                                                                                                               |
| additional_data / partyContact / partyContactInformation5                                               | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType                                                                      | C |        | OBJ  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / cardAcceptorType / businessType                                                       | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessOwnerType                                                  | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessCertificationType                                          | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessRacialEthnicType                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessTypeProvidedCode                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessOwnerTypeProvidedCode                                      | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessCertificationTypeProvidedCode                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorType / businessRacialEthnicTypeProvidedCode                               | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorTaxId                                                                     | C |        | OBJ  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / cardAcceptorTaxId / taxId                                                             | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / cardAcceptorTaxId / taxIdProvidedCode                                                 | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / totalTaxAmount                                                                        | C |        | OBJ  | Not applicable -forPassenger Transport Detail—Rail Data                                                                                                       |
| additional_data / totalTaxAmount / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalTaxAmount / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalTaxAmount / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / totalTaxCollectedIndicator                                                            | C | 1      | ANS  | Not applicable for Passenger Transport Detail—Rail Data                                                                                                       |
| additional_data / corporateVatNumber                                                                    | C | 1-20   | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / cardAcceptorReferenceNumber                                                           | C | 1-25   | ANS  | Applicable for Private Label Common Data, Corporate Card Common Data Requirements                                                                             |
| additional_data / partyNatureOfFilling                                                                  | C | 1      | A    | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partySuplementalData1                                                                 | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partySuplementalData1 / partySupplementalDataDescription                              | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData                                         | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode                                     | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription2                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData2                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode2                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription3                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData3                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode3                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription4                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData4                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode4                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription5                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData5                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode5                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription6                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData6                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode6                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription7                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData7                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode7                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataDescription8                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalData8                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData1 / partySupplementalDataCode8                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2                                                                 | C |        | OBJ  | Applicable for Electronic Invoice—Party Information                                                                                                           |
| additional_data / partySuplementalData2 / partySupplementalDataDescription                              | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData                                         | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode                                     | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription2                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData2                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode2                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription3                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData3                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode3                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription4                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData4                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode4                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription5                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData5                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode5                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription6                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData6                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode6                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription7                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData7                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode7                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataDescription8                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalData8                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / partySuplementalData2 / partySupplementalDataCode8                                    | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1                                                           | C |        | OBJ  | Applicable for Electronic Invoice—Transaction Data                                                                                                            |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription                  | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode                         | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription2                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData2                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode2                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription3                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData3                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode3                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription4                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData4                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode4                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription5                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData5                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode5                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription6                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData6                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode6                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription7                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData7                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode7                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataDescription8                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalData8                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData1 / transactionSupplementalDataCode8                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2                                                           | C |        | OBJ  | Applicable for Electronic Invoice—Transaction Data                                                                                                            |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription                  | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData                             | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode                         | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription2                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData2                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode2                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription3                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData3                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode3                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription4                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData4                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode4                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription5                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData5                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode5                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription6                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData6                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode6                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription7                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData7                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode7                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataDescription8                 | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalData8                            | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / transactionSuplementalData2 / transactionSupplementalDataCode8                        | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / freightAmount                                                                         | C |        | OBJ  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / freightAmount / amount                                                                | C | 12     | N    |                                                                                                                                                               |
| additional_data / freightAmount / exponent                                                              | C | 1      | N    |                                                                                                                                                               |
| additional_data / freightAmount / sign                                                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / dutyAmount                                                                            | C |        | OBJ  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / dutyAmount / amount                                                                   | C | 12     | N    |                                                                                                                                                               |
| additional_data / dutyAmount / exponent                                                                 | C | 1      | N    |                                                                                                                                                               |
| additional_data / dutyAmount / sign                                                                     | C | 1      | A    |                                                                                                                                                               |
| additional_data / destinationPostalCode                                                                 | C | 10     | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / destinationStateProvinceCode                                                          | C | 3      | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / destinationCountryCode                                                                | C | 3      | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / sequenceNumber                                                                        | C | 3      | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / shipDate                                                                              | C | 6      | N    | Applicable for Private Label Line Item Detail, Corporate Line Item Detail, format: YYMMDD                                                                     |
| additional_data / shipFromPostalCode                                                                    | C | 10     | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / orderDate                                                                             | C | 6      | N    | Applicable for Private Label Common Data, Private Label Line Item Detail, Corporate Card Common Data Requirements, Corporate Line Item Detail, format: YYMMDD |
| additional_data / medicalServicesShipToHealthIndustry                                                   | C | 1-40   | ANS  | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / contractNumber                                                                        | C | 1-40   | ANS  | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / medicalServicesPriceAdjustment                                                        | C | 1      | A    | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / medicalServicesProductNumberQualifier                                                 | C | 2      | AN   | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / userName                                                                              | C | 1-40   | ANS  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / oilCompanyBrandName                                                                   | C | 4      | N    | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / purchaseTime                                                                          | C | 4      | N    | Applicable for Corporate Fleet Transaction Information, format: HHMM                                                                                          |
| additional_data / motorFuelServiceType                                                                  | C | 1      | ANS  | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / motorFuelInformation                                                                  | C |        | OBJ  | Applicable for Private Label Common Data, Corporate Fleet Transaction Information                                                                             |
| additional_data / motorFuelInformation / productCode                                                    | C | 3      | N    |                                                                                                                                                               |
| additional_data / motorFuelInformation / unitPrice                                                      | C | 12     | N    |                                                                                                                                                               |
| additional_data / motorFuelInformation / unitOfMeasure                                                  | C | 1      | NS   |                                                                                                                                                               |
| additional_data / motorFuelInformation / quantity                                                       | C | 6      | N    |                                                                                                                                                               |
| additional_data / motorFuelInformation / quantityExponent                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / motorFuelInformation / saleAmount                                                     | C | 12     | N    |                                                                                                                                                               |
| additional_data / userAccountNumber                                                                     | C | 1-40   | ANS  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / userTelephoneNumber                                                                   | C | 1-25   | ANS  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / billingStatementPeriod                                                                | C |        | OBJ  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / billingStatementPeriod / statementStartDate                                           | C | 6      | N    | format: YYMMDD                                                                                                                                                |
| additional_data / billingStatementPeriod / statementEndDate                                             | C | 6      | N    | format: YYMMDD                                                                                                                                                |
| additional_data / billingEvent1                                                                         | C |        | OBJ  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / billingEvent1 / amount                                                                | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent                                                              | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign                                                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description                                                           | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount2                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent2                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign2                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description2                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount3                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent3                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign3                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description3                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount4                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent4                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign4                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description4                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount5                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent5                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign5                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description5                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount6                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent6                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign6                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description6                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount7                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent7                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign7                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description7                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount8                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent8                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign8                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description8                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount9                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent9                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign9                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description9                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent1 / amount10                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / exponent10                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent1 / sign10                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent1 / description10                                                         | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2                                                                         | C |        | OBJ  | Applicable for Telephony Billing—Summary                                                                                                                      |
| additional_data / billingEvent2 / amount                                                                | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent                                                              | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign                                                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description                                                           | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount2                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent2                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign2                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description2                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount3                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent3                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign3                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description3                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount4                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent4                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign4                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description4                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount5                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent5                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign5                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description5                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount6                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent6                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign6                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description6                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount7                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent7                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign7                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description7                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount8                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent8                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign8                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description8                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount9                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent9                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign9                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description9                                                          | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / billingEvent2 / amount10                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / exponent10                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / billingEvent2 / sign10                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / billingEvent2 / description10                                                         | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / odometerReading                                                                       | C | 1-7    | ANS  | Applicable for Private Label Common Data, Corporate Fleet Transaction Information                                                                             |
| additional_data / vehicleNumber                                                                         | C | 1-17   | ANS  | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / driverNumberIdNumber                                                                  | C | 1-17   | ANS  | Applicable for Private Label Common Data, Corporate Fleet Transaction Information                                                                             |
| additional_data / productTypeCode                                                                       | C | 1      | N    | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / couponDiscountAmount                                                                  | C | 12     | N    | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / taxAmount1                                                                            | C | 6      | N    | Applicable for Private Label Common Data, Corporate Fleet Transaction Information                                                                             |
| additional_data / taxAmount2                                                                            | C | 6      | N    | Applicable for Private Label Common Data, Corporate Fleet Transaction Information                                                                             |
| additional_data / callDate                                                                              | C | 6      | N    | Applicable for Telephony Billing—Detail, format YYMMDD                                                                                                        |
| additional_data / callTime                                                                              | C | 6      | N    | Applicable for Telephony Billing—Detail, format HHMMSS                                                                                                        |
| additional_data / callToInformation                                                                     | C |        | OBJ  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / callToInformation / callToCity                                                        | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callToState                                                       | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callToCountry                                                     | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callToNumber                                                      | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callToType                                                        | C | 1      | AN   |                                                                                                                                                               |
| additional_data / callDuration                                                                          | C | 6      | N    | Applicable for Telephony Billing—Detail, format: HHMMSS                                                                                                       |
| additional_data / callTimePeriod                                                                        | C | 2      | AN   | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / productCode                                                                           | C | 1-15   | ANS  | Applicable for Private Label Line Item Detail, Corporate Line Item Detail                                                                                     |
| additional_data / itemDescription                                                                       | C | 1-35   | ANS  | Applicable for Private Label Line Item Detail, Healthcare, Corporate Line Item Detail                                                                         |
| additional_data / itemQuantity                                                                          | C |        | OBJ  | Applicable for Private Label Line Item Detail, Healthcare, Corporate Line Item Detail                                                                         |
| additional_data / itemQuantity / itemQuantity                                                           | C | 12     | N    |                                                                                                                                                               |
| additional_data / itemQuantity / itemQuantityExponent                                                   | C | 1      | N    |                                                                                                                                                               |
| additional_data / callFromInformation                                                                   | C |        | OBJ  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / callToInformation / callFromCity                                                      | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callFromState                                                     | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callFromCountry                                                   | C | 40     | ANS  |                                                                                                                                                               |
| additional_data / callToInformation / callFromNumber                                                    | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / itemUnitOfMeasure                                                                     | C | 1-12   | ANS  | Applicable for Private Label Line Item Detail, Corporate Line Item Detail                                                                                     |
| additional_data / unitPrice                                                                             | C |        | OBJ  | Applicable for Private Label Line Item Detail, Healthcare, Corporate Line Item Detail                                                                         |
| additional_data / unitPrice /unitPrice                                                                  | C | 12     | N    |                                                                                                                                                               |
| additional_data / unitPrice /unitPriceExponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / extendedItemAmount                                                                    | C |        | OBJ  | Applicable for Private Label Line Item Detail, Corporate Line Item Detail                                                                                     |
| additional_data / extendedItemAmount / amount                                                           | C | 12     | N    |                                                                                                                                                               |
| additional_data / extendedItemAmount / exponent                                                         | C | 1      | N    |                                                                                                                                                               |
| additional_data / extendedItemAmount / sign                                                             | C | 1      | A    |                                                                                                                                                               |
| additional_data / itemDiscount                                                                          | C |        | OBJ  | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / itemDiscount / discountIndicator                                                      | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / itemDiscount / discountAmount                                                         | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / itemDiscount / itemDiscountRate                                                       | C | 5      | N    |                                                                                                                                                               |
| additional_data / itemDiscount / itemDiscountRateExponent                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / itemDiscount / itemDiscountAmountSign                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / callUsageAmount                                                                       | C |        | OBJ  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / callUsageAmount / amount                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / callUsageAmount / exponent                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / callUsageAmount / sign                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / zeroCostToCustomerIndicator                                                           | C | 1      | A    | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / procedureId                                                                           | C | 9      | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / serviceType                                                                           | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / serviceType / serviceType                                                             | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / serviceType / serviceNature                                                           | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / serviceAmount                                                                         | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / serviceAmount / amount                                                                | C | 12     | N    |                                                                                                                                                               |
| additional_data / serviceAmount / exponent                                                              | C | 1      | N    |                                                                                                                                                               |
| additional_data / serviceAmount / sign                                                                  | C | 1      | A    |                                                                                                                                                               |
| additional_data / debitOrCreditIndicator                                                                | C | 1      | AN   | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / callLongDistanceAmount                                                                | C |        | OBJ  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / callLongDistanceAmount / amount                                                       | C | 12     | N    |                                                                                                                                                               |
| additional_data / callLongDistanceAmount / exponent                                                     | C | 1      | N    |                                                                                                                                                               |
| additional_data / callLongDistanceAmount / sign                                                         | C | 1      | A    |                                                                                                                                                               |
| additional_data / fullVatAmounts                                                                        | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / fullVatAmounts / grossAmount                                                          | C | 12     | N    |                                                                                                                                                               |
| additional_data / fullVatAmounts / grossExponent                                                        | C | 1      | N    |                                                                                                                                                               |
| additional_data / fullVatAmounts / grossSign                                                            | C | 1      | A    |                                                                                                                                                               |
| additional_data / fullVatAmounts / taxAmount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / fullVatAmounts / taxExponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / fullVatAmounts / taxSign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / halfVatAmounts                                                                        | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / halfVatAmounts / grossAmount                                                          | C | 12     | N    |                                                                                                                                                               |
| additional_data / halfVatAmounts / grossExponent                                                        | C | 1      | N    |                                                                                                                                                               |
| additional_data / halfVatAmounts / grossSign                                                            | C | 1      | A    |                                                                                                                                                               |
| additional_data / halfVatAmounts / taxAmount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / halfVatAmounts / taxExponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / halfVatAmounts / taxSign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / callConnectAmount                                                                     | C |        | OBJ  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / callConnectAmount / amount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / callConnectAmount / exponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / callConnectAmount / sign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / otherDescription                                                                      | C | 1-60   | ANS  | Applicable for Telephony Billing—Detail                                                                                                                       |
| additional_data / customerReference                                                                     | C |        | OBJ  | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / customerReference / valueId                                                           | C | 2      | N    |                                                                                                                                                               |
| additional_data / customerReference / valueDetail                                                       | C | 17     | ANS  |                                                                                                                                                               |
| additional_data / trafficCode                                                                           | C | 3      | N    | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / sampleNumber                                                                          | C | 4      | N    | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / freeFormDescription                                                                   | C | 1-992  | ANS  | Applicable for Generic Detail                                                                                                                                 |
| additional_data / startStation                                                                          | C | 1-30   | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / destinationStation                                                                    | C | 1-30   | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / genericData                                                                           | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / genericData / code                                                                    | C | 3      | N    |                                                                                                                                                               |
| additional_data / genericData / number                                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / genericData / otherCode                                                               | C | 3      | N    |                                                                                                                                                               |
| additional_data / genericData / otherNumber                                                             | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / reductionData                                                                         | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / reductionData / code                                                                  | C | 3      | N    |                                                                                                                                                               |
| additional_data / reductionData / number                                                                | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / reductionData / otherCode                                                             | C | 3      | N    |                                                                                                                                                               |
| additional_data / reductionData / otherNumber                                                           | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / transportationOtherCode                                                               | C | 3      | N    | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / payerNameOrUserId                                                                     | C |        | OBJ  | Applicable for Payment Transaction Detail                                                                                                                     |
| additional_data / payerNameOrUserId / payerNameUserId                                                   | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerAddress                                                      | C | 30     | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerCity                                                         | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerStateCode                                                    | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerCountryCode                                                  | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerPostalCode                                                   | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / payerNameOrUserId / payerDateOfBirth                                                  | C | 8      | N    | format: MMDDYYYY                                                                                                                                              |
| additional_data / dateOfFundsRequested                                                                  | C | 6      | N    | Applicable for Payment Transaction Detail, format: YYMMDD                                                                                                     |
| additional_data / dateOfAnticipatedReceiptOfFunds                                                       | C | 6      | ANS  | Applicable for Payment Transaction Detail                                                                                                                     |
| additional_data / additionalTraceReferenceNumberUsedByCardAcceptor                                      | C | 1-19   | ANS  | Applicable for Payment Transaction Detail, Private Label Common Data                                                                                          |
| additional_data / additionalTransactionDescriptionData                                                  | C | 1-15   | ANS  | Applicable for Payment Transaction Detail                                                                                                                     |
| additional_data / cardAcceptorVatNumber                                                                 | C | 1-20   | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / customerVatNumber                                                                     | C | 1-20   | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / uniqueInvoiceNumber                                                                   | C | 1-17   | ANS  | Applicable for Private Label Common Data, Corporate Card Common Data Requirements                                                                             |
| additional_data / CommodityCode                                                                         | C | 1-15   | ANS  |                                                                                                                                                               |
| additional_data / authorizedContactName                                                                 | C | 1-36   | ANS  | Applicable for Private Label Common Data, Corporate Card Common Data Requirements                                                                             |
| additional_data / authorizedContactPhone                                                                | C | 1-17   | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / detailTaxAmount1                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount1 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount2 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount3 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / typeOfSupply                                                                          | C | 2      | AN   | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / taxExemptIndicator                                                                    | C | 1      | AN   |                                                                                                                                                               |
| additional_data / uniqueVatInvoiceRefenreceNumber                                                       | C | 1-17   | ANS  | Applicable for Corporate Line Item Detail                                                                                                                     |
| additional_data / cardAcceptorContactEmailAddress                                                       | C | 1-60   | ANS  | Applicable for Corporate Card Common Data Requirements                                                                                                        |
| additional_data / corporateIdentifier                                                                   | C | 1-12   | ANS  | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / noShowIndicator                                                                       | C | 1      | AN   | Applicable for Vehicle Rental Detail, Lodging Summary                                                                                                         |
| additional_data / daysRented                                                                            | C | 4      | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / weeklyRentalAmount                                                                    | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / totalAuthorizedAmount                                                                 | C |        | OBJ  | Applicable for Vehicle Rental Detail, Lodging Summary                                                                                                         |
| additional_data / totalAuthorizedAmount / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalAuthorizedAmount / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalAuthorizedAmount / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / oneWayDropOffCharge                                                                   | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / regularMileageCharge                                                                  | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / extraMileageCharge                                                                    | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / lateCharge                                                                            | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / fuelCharge                                                                            | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / totalTaxAmount                                                                        | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalTaxAmount / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalTaxAmount / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalTaxAmount / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / towingCharges                                                                         | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / extraCharges                                                                          | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / otherCharges                                                                          | C | 12     | N    | Applicable for Vehicle Rental Detail                                                                                                                          |
| additional_data / totalRoomNights                                                                       | C | 4      | N    | Applicable for Lodging Summary                                                                                                                                |
| additional_data / prepaidExpenses                                                                       | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / prepaidExpenses / amount                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / prepaidExpenses / exponent                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / prepaidExpenses / sign                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / totalNonRoomTaxAmount                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / totalNonRoomTaxAmount / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / totalNonRoomTaxAmount / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / totalNonRoomTaxAmount / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / cashAdvances                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / cashAdvances / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / cashAdvances / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / cashAdvances / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / cashAdvances                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / cashAdvances / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / cashAdvances / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / cashAdvances / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / valetCharges                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / valetCharges / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / valetCharges / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / valetCharges / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / movieCharges                                                                          | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / movieCharges / amount                                                                 | C | 12     | N    |                                                                                                                                                               |
| additional_data / movieCharges / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / movieCharges / sign                                                                   | C | 1      | A    |                                                                                                                                                               |
| additional_data / businessCenterCharges                                                                 | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / businessCenterCharges / amount                                                        | C | 12     | N    |                                                                                                                                                               |
| additional_data / businessCenterCharges / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / businessCenterCharges / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / healthClubCharges                                                                     | C |        | OBJ  | Applicable for Lodging Summary                                                                                                                                |
| additional_data / healthClubCharges / amount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / healthClubCharges / exponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / healthClubCharges / sign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / fireSafetyActIndicator                                                                | C | 1      | AN   | Applicable for Lodging Summary                                                                                                                                |
| additional_data / netFuelPrice                                                                          | C |        | OBJ  | Applicable for Corporate Fleet Transaction Information                                                                                                        |
| additional_data / netFuelPrice / price                                                                  | C | 12     | N    |                                                                                                                                                               |
| additional_data / netFuelPrice / exponent                                                               | C | 1      | N    |                                                                                                                                                               |
| additional_data / restrictedTicketIndicator                                                             | C | 1      | AN   |                                                                                                                                                               |
| additional_data / exchangeTickedAmount                                                                  | C | 12     | N    |                                                                                                                                                               |
| additional_data / ancillaryServiceCharges                                                               | C |        | OBJ  |                                                                                                                                                               |
| additional_data / ancillaryServiceCharges / ancillaryFeeCode                                            | C | 2      | A    |                                                                                                                                                               |
| additional_data / ancillaryServiceCharges / ancillaryFeeAmount                                          | C | 12     | N    |                                                                                                                                                               |
| additional_data / travelAuthorizationCode                                                               | C | 1-64   | ANS  |                                                                                                                                                               |
| additional_data / iataClientCode                                                                        | C | 1-17   | ANS  |                                                                                                                                                               |
| additional_data / employeeTempNameId                                                                    | C | 1-40   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / employeeSocialSecurityNumberOrId                                                      | C | 1-30   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / jobDescription                                                                        | C | 1-40   | ANS  | Applicable for Temporary Services, Private Label Common Data                                                                                                  |
| additional_data / jobCode                                                                               | C | 1-20   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / flatRateIndicator                                                                     | C | 1      | AN   | Applicable for Temporary Services                                                                                                                             |
| additional_data / regularHoursWorked                                                                    | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / regularHoursWorked / regularHoursWorked                                               | C | 6      | N    |                                                                                                                                                               |
| additional_data / regularHoursWorked / regularHoursWorkedExponent                                       | C | 1      | N    |                                                                                                                                                               |
| additional_data / regularHoursRate                                                                      | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / regularHoursRate / regularHoursRate                                                   | C | 6      | N    |                                                                                                                                                               |
| additional_data / regularHoursRate / regularHoursRateExponent                                           | C | 1      | N    |                                                                                                                                                               |
| additional_data / overtimeHoursWorked                                                                   | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / overtimeHoursWorked / overtimeHoursWorked                                             | C | 6      | N    |                                                                                                                                                               |
| additional_data / overtimeHoursWorked / overtimeHoursWorkedExponent                                     | C | 1      | N    |                                                                                                                                                               |
| additional_data / overtimeHoursRate                                                                     | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / overtimeHoursRate / overtimeHoursRate                                                 | C | 6      | N    |                                                                                                                                                               |
| additional_data / overtimeHoursRate / overtimeHoursRateExponent                                         | C | 1      | N    |                                                                                                                                                               |
| additional_data / tempStartDate                                                                         | C | 6      | N    | Applicable for Temporary Services, format: YYMMDD                                                                                                             |
| additional_data / tempWeekEnding                                                                        | C | 6      | N    | Applicable for Temporary Services, format: YYMMDD                                                                                                             |
| additional_data / requestorNameOrId                                                                     | C | 1-40   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / supervisorReportsTo                                                                   | C | 1-40   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / timeSheetNumber                                                                       | C | 1-20   | ANS  | Applicable for Temporary Services                                                                                                                             |
| additional_data / discountAmount                                                                        | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / discountAmount / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / discountAmount / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / discountAmount / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / discountAmount / type                                                                 | C | 4      | A    |                                                                                                                                                               |
| additional_data / subtotalAmount                                                                        | C |        | OBJ  | Applicable for Temporary Services                                                                                                                             |
| additional_data / subtotalAmount / amount                                                               | C | 12     | N    |                                                                                                                                                               |
| additional_data / subtotalAmount / exponent                                                             | C | 1      | N    |                                                                                                                                                               |
| additional_data / subtotalAmount / sign                                                                 | C | 1      | A    |                                                                                                                                                               |
| additional_data / miscellaneousExpenses                                                                 | C |        | OBJ  | Applicable for Temporary Services, Shipping/Courier Services, Telephony Billing—Detail                                                                        |
| additional_data / miscellaneousExpenses / description                                                   | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / miscellaneousExpenses / amount                                                        | C | 1      | N    |                                                                                                                                                               |
| additional_data / miscellaneousExpenses / exponent                                                      | C | 1      | N    |                                                                                                                                                               |
| additional_data / miscellaneousExpenses / sign                                                          | C | 1      | A    |                                                                                                                                                               |
| additional_data / serviceDescriptorCode                                                                 | C | 1-40   | ANS  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / trackingNumberOrPickupNumber                                                          | C | 1-40   | ANS  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / shippingNetAmount                                                                     | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / shippingNetAmount / amount                                                            | C | 12     | N    |                                                                                                                                                               |
| additional_data / shippingNetAmount / exponent                                                          | C | 1      | N    |                                                                                                                                                               |
| additional_data / shippingNetAmount / sign                                                              | C | 1      | A    |                                                                                                                                                               |
| additional_data / incentiveAmount                                                                       | C |        | OBJ  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / incentiveAmount / amount                                                              | C | 12     | N    |                                                                                                                                                               |
| additional_data / incentiveAmount / exponent                                                            | C | 1      | N    |                                                                                                                                                               |
| additional_data / incentiveAmount / sign                                                                | C | 1      | A    |                                                                                                                                                               |
| additional_data / pickupDate                                                                            | C | 6      | N    | Applicable for Shipping/Courier Services, format: YYMMDD                                                                                                      |
| additional_data / deliveryDate                                                                          | C | 6      | N    | Applicable for Shipping/Courier Services, YYMMDD                                                                                                              |
| additional_data / numberOfPackages                                                                      | C | 6      | N    | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / packageWeight                                                                         | C | 12     | N    | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / unitOfMeasure                                                                         | C | 1-3    | ANS  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / shippingPartyInformation                                                              | C |        | OBJ  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / shippingPartyInformation / name                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyInformation / name2                                                      | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyInformation / name3                                                      | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress                                                                  | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / shippingPartyAddress / address                                                        | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress / address2                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress / address3                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress / address4                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress / address5                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyAddress / address6                                                       | C | 1-50   | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyPostalInformation                                                        | C |        | OBJ  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / shippingPartyPostalInformation / city                                                 | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyPostalInformation / stateCode                                            | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyPostalInformation / countryCode                                          | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyPostalInformation / postalCode                                           | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyContact                                                                  | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / shippingPartyContact / shippingPartyDescriptor                                        | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / shippingPartyContact / shippingPartyContactInformation                                | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyInformation                                                              | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / deliveryPartyInformation / name                                                       | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyInformation / name2                                                      | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyInformation / name3                                                      | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation                                                       | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / deliveryPartyAddressInformation / address                                             | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation / address2                                            | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation / address3                                            | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation / address4                                            | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation / address5                                            | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyAddressInformation / address6                                            | C | 50     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyPostalInformation                                                        | C |        | OBJ  | Applicable for Shipping/Courier Services, Private Label Line Item Detail                                                                                      |
| additional_data / deliveryPartyPostalInformation / city                                                 | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyPostalInformation / stateCode                                            | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyPostalInformation / countryCode                                          | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyPostalInformation / postalCode                                           | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount4 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount5 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6                                                                      | C |        | OBJ  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxAmountIndicator                                           | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxAmount                                                    | C | 12     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxRate                                                      | C | 5      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxRateExponent                                              | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxTypeApplied                                               | C | 4      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxTypeIdentifier                                            | C | 2      | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / cardAcceptorTaxId                                                  | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / detailTaxAmount6 / detailTaxAmountSign                                                | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyContact                                                                  | C |        | OBJ  | Applicable for Shipping/Courier Services                                                                                                                      |
| additional_data / deliveryPartyContact / deliveryPartyDescriptor                                        | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / deliveryPartyContact / deliveryPartyContactInformation                                | C | 60     | ANS  |                                                                                                                                                               |
| additional_data / lineItemTotalAmount                                                                   | C |        | OBJ  | Applicable for Telephony Billing—Summary, Telephony Billing—Detail, C- Corporate Line Item Detail                                                             |
| additional_data / lineItemTotalAmount / amount                                                          | C | 12     | N    |                                                                                                                                                               |
| additional_data / lineItemTotalAmount / exponent                                                        | C | 1      | N    |                                                                                                                                                               |
| additional_data / lineItemTotalAmount / sign                                                            | C | 1      | A    |                                                                                                                                                               |
| additional_data / passengerDescription                                                                  | C |        | OBJ  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / passengerDescription / numberOfAdults                                                 | C | 2      | N    |                                                                                                                                                               |
| additional_data / passengerDescription / numberOfChildren                                               | C | 2      | N    |                                                                                                                                                               |
| additional_data / passengerDescription / class                                                          | C | 1      | ANS  |                                                                                                                                                               |
| additional_data / transportationServiceProvider                                                         | C | 1-40   | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / transportationServicesOffered                                                         | C | 1-40   | ANS  | Applicable for Passenger Transport Detail—Rail Data                                                                                                           |
| additional_data / deliveryOrderNumber                                                                   | C | 1-15   | ANS  | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / creditCardSlipNumber                                                                  | C | 1-8    | ANS  | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / travelAgencyId                                                                        | C | 1-15   | ANS  | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / dataSource                                                                            | C | 2      | N    | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / vatSuppressionIndicator                                                               | C | 2      | ANS  | Applicable for Lodged Account Detail                                                                                                                          |
| additional_data / healtcareEligibleStatusIndicator                                                      | C | 1      | N    | Applicable for Healthcare                                                                                                                                     |
| additional_data / moneySendReceiverData                                                                 | C |        | OBJ  | Applicable for Payment Transaction Detail                                                                                                                     |
| additional_data / moneySendReceiverData / payeeFirstName                                                | C | 35     | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeLastName                                                 | C | 35     | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeAddress                                                  | C | 30     | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeCity                                                     | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeStateCode                                                | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeCountryCode                                              | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeePostalCode                                               | C | 10     | ANS  |                                                                                                                                                               |
| additional_data / moneySendReceiverData / payeeDateOfBirth                                              | C | 8      | N    | format MMDDYYYY                                                                                                                                               |
| additional_data / moneySendReceiverData / payeePhoneNumber                                              | C | 20     | ANS  |                                                                                                                                                               |
| additional_data / additionalCardAcceptorInquiryInformation                                              | C |        | OBJ  | Applicable for Private Label Common Data                                                                                                                      |
| additional_data / additionalCardAcceptorInquiryInformation / salesRepName                               | C | 25     | ANS  |                                                                                                                                                               |
| additional_data / additionalCardAcceptorInquiryInformation / salesRepPhoneNumber                        | C | 16     | ANS  |                                                                                                                                                               |
| additional_data / additionalCardAcceptorInquiryInformation / salesRepFaxNumber                          | C | 16     | ANS  |                                                                                                                                                               |
| additional_data / additionalCardAcceptorInquiryInformation / technicalSupportPhoneNumber                | C | 16     | ANS  |                                                                                                                                                               |
| additional_data / costCenterInformation                                                                 | C |        | OBJ  | Applicable for Private Label Common Data, Private Label Line Item Detail                                                                                      |
| additional_data / costCenterInformation / number                                                        | C | 18     | ANS  |                                                                                                                                                               |
| additional_data / costCenterInformation / description                                                   | C | 18     | ANS  |                                                                                                                                                               |
| additional_data / driverLicenseStateIssuedIdInformation                                                 | C |        | OBJ  | Applicable for Private Label Common Data                                                                                                                      |
| additional_data / driverLicenseStateIssuedIdInformation / number                                        | C | 15     | ANS  |                                                                                                                                                               |
| additional_data / driverLicenseStateIssuedIdInformation / stateIdProvinceOrRegion                       | C | 3      | ANS  |                                                                                                                                                               |
| additional_data / paymentMethodInformation                                                              | C |        | OBJ  | Applicable for Private Label Common Data                                                                                                                      |
| additional_data / paymentMethodInformation / paymentMethod                                              | C | 2      | AN   |                                                                                                                                                               |
| additional_data / paymentMethodInformation / amount                                                     | C | 12     | N    |                                                                                                                                                               |
| additional_data / stockKeepingUnitDescription                                                           | C | 1-200  | ANS  | Applicable for Private Label Line Item Detail                                                                                                                 |
| additional_data / departmentCode                                                                        | C | 1-8    | ANS  | Applicable for Private Label Common Data, Private Label Line Item Detail                                                                                      |
| additional_data / alternateCustomIndetifier                                                             | C |        | OBJ  | Applicable for Private Label Common Data, Private Label Line Item Detail                                                                                      |
| additional_data / alternateCustomIndetifier / type                                                      | C | 6      | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / detail                                                    | C | 76     | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / type2                                                     | C | 6      | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / detail2                                                   | C | 76     | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / type3                                                     | C | 6      | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / detail3                                                   | C | 76     | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / type4                                                     | C | 6      | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / detail4                                                   | C | 76     | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / type5                                                     | C | 6      | ANS  |                                                                                                                                                               |
| additional_data / alternateCustomIndetifier / detail5                                                   | C | 76     | ANS  |                                                                                                                                                               |
| additional_data / promationCode                                                                         | C | 1-6    | ANS  | Applicable for Private Label Line Item Detail                                                                                                                 |
| functionCode                                                                                            | M | 3      | N    |                                                                                                                                                               |
| acquirerId                                                                                              | M | 1-11   | N    |                                                                                                                                                               |
| traceId                                                                                                 | M | 1-16   | N    |                                                                                                                                                               |
| cardProgramId                                                                                           | O | 1-20   | N    | Card program ID.                                                                                                                                              |
| accountProgramId                                                                                        | M | 1-20   | N    | Account program ID.                                                                                                                                           |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "financialDetailAddendum"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": {
        "transactionId": 15730488818293,
        "transactionTransLink": "1573048884181003024451123482000000TRANS5DC2D234E5D62",
        "finnancialDetailAddendumId": 15705146864454,
        "mti": "1644",
        "function_code": "696",
        "acquirer_id": "00000999901",
        "additional_data": {
            "originalMessageFormat": "2",
            "transactionDescription": {
                "usageCode": "01",
                "industryRecordNumber": "000",
                "occuranceIndicator": "001",
                "associatedFirstPresentmentNumber": "00000053"
            },
            "passenderName": "Name Surname",
            "ticketNumber": "1234567890     ",
            "issuingCarrier": "1234",
            "issueDate": "190522",
            "travelAgencyCode": "12345678",
            "travelAgencyName": "Travel Agency Name",
            "travelDate": "190522"
        },
        "trace_id": "DMCAB12340101  ",
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### NegativeAcknowledgement

|       Parameter        | M |  Length  | Type |                                                                            Description                                                                            |
|------------------------|---|----------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cardId                 | M | 1-20     | N    | Card ID. Identifies card, issued by Platform.                                                                                                                     |
| cardRequestId          | M | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                                                                                               |
| transLink              | M | 1-255    | ANS  |                                                                                                                                                                   |
| responseCode           | M | 2        | AN   | `DE39`.                                                                                                                                                           |
| transactionTime        | M | 1-12     | N    | Unix timestamp (converted from `DE7` value).                                                                                                                      |
| stan                   | M | 6        | N    | `DE11` (Systems Trace Audit Number - STAN) is a number a message initiator assigns to uniquely identify a transaction.                                            |
| traceLogId             | M | 1-20     | N    | Unique authorization ID in Platform's database.                                                                                                                   |
| additionalResponseData | O | 1-25     | ANS  | `DE44`. The first three bytes of `DE44` (if present) will contain a three-digit numeric value indicating the data element number where the format error occurred. |
| rawMessage             | O | 1-65,535 | ANS  | Raw scheme's message in `ISO8583` format.                                                                                                                         |
| institutionCode        | C | 1-20     | N    | Issuer Identification Number (IIN) and Interbank Card Association Number (ICA). Can be `null` if external payment transaction are performed.                      |
| cardProgramId          | M | 1-20     | N    | Card program ID.                                                                                                                                                  |
| accountProgramId       | M | 1-20     | N    | Account program ID.                                                                                                                                               |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "negativeAcknowledgement"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": {
        "cardId": 123456,
        "transLink": "102433000000MCCA00001000002190529123456",
        "responseCode": "68",
        "transactionTime": 1571148878,
        "stan": "000008",
        "traceLogId": 15712099249953,
        "additionalResponseData": "120",
        "rawMessage": null,
        "institutionCode": 1,
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CardTokenization

| Parameter            | M   | Length | Type | Description                                                                |
|----------------------|-----|--------|------|----------------------------------------------------------------------------|
| cardTokenId          | M   | 1-20   | N    | Internal card token identifier.                                            |
| cardId               | M   | 1-20   | N    | Identifies the card issued by the Platform.                                |
| cardRequestId        | M   | 1-20   | N    | Card number identifier. Identifies the card number issued by the Platform. |
| token                | M   | 1-255  | ANS  |                                                                            |
| expiryYear           | M   | 4      | N    | Token expiry year.                                                         |
| expiryMonth          | M   | 2      | N    | Token expiry month.                                                        |
| tokenStatus          | M   | 1      | A    | [`Card Token Status`](#appendix--enum--card-token-status).                 |
| tokenType            | M   | 1      | N    | [`Card Token Type`](#appendix--enum--card-token-type).                     |
| tokenRequestorId     | M   | 1-20   | ANS  | Unique ID assigned to the initiator of the token request.                  |
| tokenUniqueReference | O   | 1-32   | ANS  | Unique ID assigned to the token associated with the PAN.                   |
| panUniqueReference   | O   | 1-32   | ANS  | Unique ID assigned to the PAN.                                             |
| cardProgramId        | M   | 1-20   | N    | Card program ID.                                                           |
| tokenEventType       | M   | 1      | N    | [`Card Token Event Type`](#appendix--enum--card-token-event-type).         |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
       "cardTokenization"
    ],
    "notificationSequence": 10,
    "sendingRetriesCount": 0,
    "timestamp": 1639657464,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": {
        "cardTokenId": 16396574641257,
        "cardId": 123494,
        "cardRequestId": 39,
        "token": "4800737890000392",
        "expiryYear": "2024",
        "expiryMonth": "09",
        "tokenStatus": "A",
        "tokenType": 1,
        "tokenRequestorId": "40010075001",
        "tokenUniqueReference": "DNITHE381809965131001190",
        "panUniqueReference": "V-3016005110685298663970",
        "cardProgramId": 4,
        "tokenEventType": 1
    },
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### ExternalPaymentNotification

| Parameter                | M   | Length | Type | Description                                                                                                                          |
|--------------------------|-----|--------|------|--------------------------------------------------------------------------------------------------------------------------------------|
| action                   | M   | 1-255  | ANS  | [`External payment notification action`](#appendix--enum--external-payment--notification-action)                                     |
| accountId                | M   | 1-20   | N    |                                                                                                                                      |
| epmSchemeId              | M   | 1-20   | N    | [`External payment scheme`](#appendix--enum--external-payment--scheme)                                                               |
| epmTransactionId         | M   | 1-20   | N    |                                                                                                                                      |
| epmTransactionStatus     | M   | 1-20   | N    | [`External payment transaction status`](#appendix--enum--external-payment--transaction-status)                                       |
| transactionAmount        | M   | 1-20   | N    |                                                                                                                                      |
| transactionCurrencyIson  | M   | 3      | N    | Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                      |
| mti                      | M   | 4      | N    | `EPMT`.                                                                                                                              |
| transactionTime          | M   | 10     | N    | Date and time when transaction has been created. Provided in Unix time stamp.                                                        |
| epmTransactionType       | M   | 1-20   | N    | [`External payment transaction type`](#appendix--enum--external-payment--transaction-type)                                           |
| epmAddressFrom           | C   | \-     | OBJ  | If value will be provided depends on the external provider. [`External payment address`](#appendix--enum--external-payment--address) |
| epmAddressTo             | C   | \-     | OBJ  | If value will be provided depends on the external provider. [`External payment address`](#appendix--enum--external-payment--address) |
| transactionIdentifier    | O   | 1-100  | ANS  | ID generated by external payment bank provider.                                                                                      |
| transLink                | C   | 1-100  | ANS  | Mandatory if transaction created.                                                                                                    |
| endToEndIdentifier       | O   | 1-100  | ANS  | ID generated by Bank Connect.                                                                                                        |
| cardId                   | C   | 1-20   | N    | Mandatory if assigned with EPM address.                                                                                              |
| returnedEpmTransactionId | C   | 1-20   | N    | Mandatory if primary EPM transaction exists.                                                                                         |
| requestReferenceId       | O   | 1-255  | ANS  |                                                                                                                                      |
| description              | O   | 1-255  | ANS  |                                                                                                                                      |
| reasonCode               | O   | 1-3    | N    | [`External payment transaction status code`](#appendix--enum--external-payment--transaction-status-code)                             |
| reasonDescription        | O   | 1-255  | ANS  |                                                                                                                                      |
| bankProviderReasonCode   | O   | 1-255  | ANS  |                                                                                                                                      |
| note                     | O   | 1-255  | ANS  |                                                                                                                                      |
| additionalNote           | O   | 1-255  | ANS  |                                                                                                                                      |
| triggeredLimitId         | O   | 1-20   | N    |                                                                                                                                      |
| cardProgramId            | O   | 1-20   | N    | Card program ID.                                                                                                                     |
| accountProgramId         | M   | 1-20   | N    | Account program ID.                                                                                                                  |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "externalPaymentNotification"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": {
       "action": "Inbound settled with return webhook",
       "accountId": 1,
       "epmSchemeId": 1,
       "epmTransactionId": 15971374875409,
       "epmTransactionStatus": 1,
       "transactionAmount": 2000,
       "transactionCurrencyIson": "826",
       "mti": "EPMT",
       "transactionTime": 1597137487,
       "epmTransactionType": 1,
       "epmAddressFrom": {
           "id": null,
           "accountNumber": "32936187",
           "accountName": "Test A",
           "iban": "GB36SRLG04005932936187",
           "bban": null,
           "sortCode": "040059",
           "bic": null
       },
       "epmAddressTo": {
           "id": 20,
           "accountNumber": "38089896",
           "accountName": "John Smith",
           "iban": "GB79SRLG04005938089896",
           "bban": null,
           "sortCode": "040059",
           "bic": "SRLGGB2L"
       },
       "transactionIdentifier": null,
       "transLink": null,
       "endToEndIdentifier": null,
       "cardId": 123456,
       "returnedEpmTransactionId": null,
       "requestReferenceId": null,
       "description": "account_number:32936187,account_name:Test A,iban:GB36SRLG04005932936187,sort_code:040059",
       "reasonCode": null,
       "reasonDescription": null,
       "bankProviderReasonCode": "MS01",
       "note": "Load from IBAN (GB36SRLG04005932936187) to Account (38089896). Reference - test",
       "additionalNote": "Additional note",
       "triggeredLimitId": 1,
       "cardProgramId": 1,
       "accountProgramId": 2
    },
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### AccountStatusChange

| Parameter         | M  | Length | Type | Description                                                                                 |
|-------------------|----|--------|------|---------------------------------------------------------------------------------------------|
| accountId         | M  | 1-20   | N    | Account ID.                                                                                 |
| newStatus         | M  | 1      | A    | New [`account status`](#appendix--enum--account-status) identifier.                         |
| previousStatus    | M  | 1      | A    | Previous [`account status`](#appendix--enum--account-status) identifier.                    |
| source            | M  | 1      | N    | Identifies account status change initiator. [`Source type`](#appendix--enum--source-type).  |
| reasonCode        | O  | 1-20   | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)                   |
| note              | O  | 1-255  | ANS  | A short description which explains why account status has been changed.                     |
| accountProgramId  | M  | 1-20   | N    | Account program id.                                                                         |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "requestType": [
        "accountStatusChange"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": {
        "accountId": 123457,
        "newStatus": "B",
        "previousStatus": "A",
        "source": 2,
        "reasonCode": 13,
        "note": "Account has been blocked",
        "accountProgramId": 2
    },
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### EpmAddressStatusChange

| Parameter         | M  | Length | Type | Description                                                                                                 |
|-------------------|----|--------|------|-------------------------------------------------------------------------------------------------------------|
| epmAddressId      | M  | 1-20   | N    | EPM address ID.                                                                                             |
| newStatus         | M  | 1      | A    | New [`external payment address status`](#appendix--enum--external-payment--address-status) identifier.      |
| previousStatus    | M  | 1      | A    | Previous [`External payment address status`](#appendix--enum--external-payment--address-status) identifier. |
| source            | M  | 1      | N    | Identifies EPM address status change initiator. [`Source type`](#appendix--enum--source-type).              |
| reasonCode        | O  | 1-20   | N    | [`Status change reason code`](#appendix--enum--status-change-reason-code)                                   |
| note              | O  | 1-255  | ANS  | A short description which explains why external payment address status has been changed.                    |
| cardProgramId     | O  | 1-20   | N    | Card program ID.                                                                                            |
| accountProgramId  | M  | 1-20   | N    | Account program ID.                                                                                         |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "requestType": [
        "epmAddressStatusChange"
    ],
    "sendingRetriesCount": 0,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": {
        "epmAddressId": 123457,
        "newStatus": "B",
        "previousStatus": "A",
        "source": 2,
        "reasonCode": 13,
        "note": "External payment address has been blocked",
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CurrencyExchangeNotification

| Parameter               | M  | Length | Type | Description                                                                                                                |
|-------------------------|----|--------|------|----------------------------------------------------------------------------------------------------------------------------|
| statusCode              | M  | 1      | N    | New [`currency exchange notification`](#appendix--enum--currency-exchange-notification) identifier.                        |
| authorizesId            | C  | -      | LIST | Authorizes id's  list.                                                                                                     |
| transactionsId          | C  | -      | LIST | Transactions id's  list.                                                                                                   |
| currencyRateSourcesId   | M  | 20     | N    | Currency rate source configuration id.                                                                                     |
| externalTransactionId   | M  | 36     | ANS  | External source transaction id.                                                                                            |
| externalShortReference  | M  | 1-36   | ANS  | External source transaction short reference.                                                                               |
| exchangeBatchId         | M  | 20     | N    | External exchange batch id.                                                                                                |
| attemptCount            | M  | 1      | N    | Attempts of external exchange creating count.                                                                              |
| duration                | M  | 1-13   | NS   | Duration in seconds of request to external source.                                                                         |
| fixedSide               | M  | 1-16   | ANS  | Fix the buy or sell currency.                                                                                              |
| appliedConversionRate   | M  | 1-16   | NS   | Actual rate used by external system.                                                                                       |
| buyCurrencyIson         | M  | 3      | N    | Buying [`currency`](#appendix--enum--currency) ison.                                                                           |
| sellCurrencyIson        | M  | 3      | N    | Selling [`currency`](#appendix--enum--currency) ison.                                                                          |
| buyAmount               | M  | 1-20   | N    | Amount purchased.                                                                                                          |
| sellAmount              | M  | 1-20   | N    | Amount spent.                                                                                                              |
| dateCreated             | M  | 10     | N    | Date of exchange created.                                                                                                  |
| cardProgramId           | O  | 1-20   | N    | Card program ID.                                                                                                           |
| accountProgramId        | O  | 1-20   | N    | Account program ID.                                                                                                        |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "currencyExchangeNotification"
    ],
    "sendingRetriesCount": 0,
    "timestamp": 1601383099,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": {
        "statusCode": 3,
        "authorizesId": [
            "1601280682",
            "1601290364"
        ],
        "transactionsId": [
            "1601492545",
            "1601493444"
        ],
        "currencyRateSourcesId": 16007738447334,
        "externalTransactionId": "a0d9034e-bc9f-45e7-a1e4-6485735794c0",
        "externalShortReference": "201014-TSLCQJ001",
        "exchangeBatchId": 16007748447446,
        "attemptCount": 0,
        "duration": 2.904252,
        "fixedSide": "buy",
        "appliedConversionRate": 4.747100000,
        "buyCurrencyIson": "985",
        "sellCurrencyIson": "826",
        "buyAmount": 10000,
        "sellAmount": 2107,
        "dateCreated": 1602704576,
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### CardAuthorizationExpired

| Parameter          | M    | Length   | Type   | Description                                                                                                                   |
|------------------- | ---- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------|
| actualAuthorizeId  | M    | 1-20     | N      | Actual authorization ID.                                                                                                      |
| cardId             | M    | 1-20     | N      | Card ID.                                                                                                                      |
| cardRequestId      | M    | 1-20     | N      | Card number identifier. Identifies card number, issued by Platform.                                                           |
| transLink          | M    | 1-255    | ANS    |                                                                                                                               |
| programId          | M    | 1-20     | N      | Program ID of the card, which performed authorization.                                                                        |
| productId          | M    | 1-20     | N      | Product ID of the card, which performed authorization.                                                                        |
| cardProgramId      | O    | 1-20     | N      | Card program ID.                                                                                                              |
| accountProgramId   | M    | 1-20     | N      | Account program ID.                                                                                                           |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "cardAuthorizationExpired"
    ],
    "sendingRetriesCount": 0,
    "timestamp": 1603282806,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": {
        "actualAuthorizeId": 15958580485942,
        "cardId": 123456,
        "cardRequestId": 123456,
        "transLink": "313579000000IVMKAHKRJ028482200727123456",
        "programId": 1,
        "productId": 1,
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### BalanceAdjustment

|         Parameter               | M |  Length  | Type |                                                                                          Description                                                                                                                     |
|---------------------------------|---|----------|------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| accountId                       | M | 1-20     | N    |                                                                                                                                                                                                                         |
| cardId                          | C | 1-20     | N    | Provided when used in adjustment                                                                                                                                                                                                           |
| cardRequestId                   | C | 1-20     | N    | Card number identifier. Identifies card number, issued by Platform.                                                                                                                                                           |
| holderId                        | M | 1-20     | N    |                                                                                                                                                                                                            |
| settledBalance                  | M | 1-20     | N    |                                                                                                                                                                                                                          |
| availableBalance                | M | 1-20     | N    |                                                                                                                                                                                                                          |
| transactionId                   | M | 1-20     | N    | Unique transaction ID in Platform’s database.                                                                                                                                                                            |
| transLink                       | M | 1-255    | ANS  |                                                                                                                                                                                                                          |
| entryModeType                   | M | 1-20     | N    | [`Entry mode type`](#appendix--enum--entry-mode-type)                                                                                                                                                                    |
| transactionType                 | M | 1-11     | N    | [`Transaction type`](#appendix--enum--transaction-type)                                                                                                                                                                  |
| transactionAmount               | M | 1-20     | N    |                                                                                                                                                                                                                   |
| transactionCurrencyIson         | M | 3        | N    | Transaction [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                           |
| billingAmount                   | M | 1-20     | N    |                                                                                                                                                                                                                    |
| billingCurrencyIson             | M | 3        | N    | Billing [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                               |
| holderAmount                    | M | 1-20     | N    | Transaction amount in holder’s currency.                                                                                                                                                                                 |
| holderCurrencyIson              | M | 3        | N    | Holder [`currency`](#appendix--enum--currency) code ISO numeric.                                                                                                                                                                                        |
| mti                             | M | 4        | N    | MTI code                                                                                                                                                                                          |
| transactionTime                 | M | 14       | N    |                                                                                                                                                                             |
| procCode                        | M | 6        | N    |                                                                                                                                                                                                                   |
| referenceNumber                 | O | 1-255    | AN   |                                                                                                                                                                                                                          |
| description                     | O | 1-255    | ANS  |                                                                                                                                                                                                                          |
| settlementDate                  | M | 6        | N    |                                                                                                                                                                                                                          |
| transactionCountryIson          | M | 3        | N    | Transaction country code ISO numeric.                                                                                                                                                                                    |
| loadSource                      | O | 1-20     | N    | Load source, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load source`](#appendix--enum--load-source)                                                                     |
| loadType                        | O | 1-20     | N    | Load type, if balance managed by Platform and client passes this parameter with `cardLoad` API call. [`Load type`](#appendix--enum--load-type)                                                                           |
| cardProgramId                   | O | 1-20     | N    | Card program ID.                                                                                                                                                                                                         |
| accountProgramId                | M | 1-20     | N    | Account program ID.                                                                                                                                                                                                      |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "balanceAdjustment"
    ],
    "sendingRetriesCount": 0,
    "timestamp": 1608703778,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": {
        "accountId": 4,
        "cardId": 123456,
        "holderId": 4,
        "availableBalance": 88675510,
        "settledBalance": 88675510,
        "transactionId": 16087037783579,
        "transLink": "1608703778123456IC0000TRANS5FE2DF22549839.36666499",
        "entryModeType": 12,
        "transactionType": 11,
        "transactionAmount": 500,
        "transactionCurrencyIson": "840",
        "billingAmount": 500,
        "billingCurrencyIson": "840",
        "holderAmount": 500,
        "holderCurrencyIson": "840",
        "mti": "LOCL",
        "transactionTime": "201223080938",
        "procCode": "IC0000",
        "referenceNumber": "123528",
        "description": "Credit Adjustment",
        "settlementDate": "201223",
        "transactionCountryIson": "826",
        "loadSource": null,
        "loadType": null,
        "cardProgramId": 1,
        "accountProgramId": 2
    },
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### HolderAuthentication

| Parameter                        | M   | Length | Type | Description                                                                                                                                                                     |
|----------------------------------|-----|--------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| authRequestId                    | M   | 1-20   | N    | Unique authentication request ID in the Platform's database.                                                                                                                    |
| requestReference                 | M   | 1-36   | ANS  | Request identifier generated by the authentication requestor.                                                                                                                   |
| holderId                         | M   | 1-20   | N    |                                                                                                                                                                                 |
| authMethod                       | M   | 1-11   | N    | [`Holder authentication method`](#appendix--enum--holder-authentication--method)                                                                                                |
| requestor                        | M   | 1-11   | N    | [`Holder authentication requestor`](#appendix--enum--holder-authentication--requestor)                                                                                          |
| validationEntity                 | M   | 1-11   | N    | [`Holder authentication validation entity`](#appendix--enum--holder-authentication--validation-entity)                                                                          |
| validationValue                  | M   | 1-8    | ANS  |                                                                                                                                                                                 |
| requestExpiresAt                 | M   | 10     | N    | Unix timestamp which specifies when authentication request is going to expire.                                                                                                  |
| cardId                           | C   | 1-20   | N    | Required if `validationEntity` is `1` (`card`).                                                                                                                                 |
| cardRequestId                    | C   | 1-20   | N    | Card number identifier. Identifies card number, issued by Platform.                                                                                                             |
| additionalData                   | O   | \-     | OBJ  | Additional data provided by authentication requestor.                                                                                                                           |
| additionalData / maskedPan       | O   | 13-19  | ANS  |                                                                                                                                                                                 |
| additionalData / maskedPhone     | O   | 1-15   | ANS  |                                                                                                                                                                                 |
| additionalData / merchantName    | O   | 1-40   | ANS  |                                                                                                                                                                                 |
| additionalData / amount          | O   | 1-20   | N    |                                                                                                                                                                                 |
| additionalData / currencyIson    | O   | 3      | N    | [`Currency ison`](#appendix--enum--currency).                                                                                                                                   |
| additionalData / createdAt       | O   | 10     | N    | Unix timestamp.                                                                                                                                                                 |
| additionalData / requestorAppUrl | O   | 256    | ANS  | URL that enables the authentication app to call the merchant app without any cardholder action (e.g., "merchantScheme://appName?transID=b2385523-a66c-4907-ac3c-91848e8c0067"). |
| cardProgramId                    | O   | 1-20   | N    | Card program ID.                                                                                                                                                                |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "holderAuthentication"
    ],
    "notificationSequence": 10,
    "sendingRetriesCount": 0,
    "timestamp": 1603282806,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": {
        "authRequestId": 16147738970184,
        "requestReference": "41a47ae5-4f4f-41d6-86a6-2977bfe78b4e",
        "holderId": 1,
        "authMethod": 1,
        "requestor": 1,
        "validationEntity": 1,
        "validationValue": "71629565",
        "requestExpiresAt": 1612789119,
        "cardId": 123456,
        "cardRequestId": 1,
        "cardProgramId": 1,
        "additionalData": {
            "maskedPan": "XXXXXXXXXXXX0013",
            "maskedPhone": "XXXXXXX22",
            "merchantName": "Ticket Service",
            "amount": 2000,
            "currencyIson": "840",
            "createdAt": 1612788519,
            "requestorAppUrl": null
        }
    },
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### HolderAuthenticationNotification

| Parameter          | M   | Length | Type | Description                                                                                            |
|--------------------|-----|--------|------|--------------------------------------------------------------------------------------------------------|
| authRequestId      | M   | 1-20   | N    | Unique authentication request ID in the Platform's database.                                           |
| requestReference   | M   | 1-36   | ANS  | Request identifier generated by the authentication requestor.                                          |
| holderId           | M   | 1-20   | N    |                                                                                                        |
| confirmationStatus | M   | 1      | A    | [`Authentication confirmation status`](#appendix--enum--holder-authentication--confirmation-status)    |
| validationEntity   | M   | 1-11   | N    | [`Holder authentication validation entity`](#appendix--enum--holder-authentication--validation-entity) |
| cardId             | C   | 1-20   | N    | Required if `validationEntity` is `1` (`card`).                                                        |
| cardProgramId      | O   | 1-20   | N    | Card program ID.                                                                                       |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "holderAuthenticationNotification"
    ],
    "notificationSequence": 10,
    "sendingRetriesCount": 0,
    "timestamp": 1641387083,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": {
        "authRequestId": 16147738970184,
        "requestReference": "41a47ae5-4f4f-41d6-86a6-2977bfe78b4e",
        "holderId": 1,
        "confirmationStatus": "Y",
        "validationEntity": 1,
        "cardId": 123456,
        "cardProgramId": 1
    },
    "updateEpmAddressNotification": null,
    "disputeStatusChange": null
}
```

### UpdateEpmAddressNotification

| Parameter          | M  | Length | Type | Description                                                                                                                    |
|--------------------|----|--------|------|--------------------------------------------------------------------------------------------------------------------------------|
| epmAddressId       | M  | 1-20   | N    | EPM address ID.                                                                                                                |
| accountName        | M  | 1-255  | ANS  |                                                                                                                                |
| action             | M  | 1-255  | ANS  | [`External payment address update notification action`](#appendix--enum--external-payment--address-update-notification-action) |
| requestReferenceId | M  | 1-255  | N    |                                                                                                                                |
| errorReason        | M  | 1-255  | O    |                                                                                                                                |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "updateEpmAddressNotification"
    ],
    "notificationSequence": 10,
    "sendingRetriesCount": 0,
    "timestamp": 1641387083,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": {
      "epmAddressId": 123457,
      "accountName": "John Smith",
      "action": 1,
      "requestReferenceId": 15608373064666,
      "errorReason": "Incorrect card provided"
 },
    "disputeStatusChange": null
}
```

### DisputeStatusChange

| Parameter      | M  | Length | Type | Description                                                                                 |
|----------------|----|--------|------|---------------------------------------------------------------------------------------------|
| disputeId      | M  | 1-20   | N    | Dispute ID.                                                                                 |
| newStatus      | M  | 1      | A    | New [`dispute status`](#appendix--enum--dispute-status) identifier.                         |
| previousStatus | M  | 1      | A    | Previous [`dispute status`](#appendix--enum--dispute-status) identifier.                    |
| source         | M  | 1      | N    | Identifies dispute status change initiator. [`Source type`](#appendix--enum--source-type).  |

```json
{
    "sourceId": 1,
    "version": "1.2",
    "apiId": "1",
    "requestType": [
        "disputeStatusChange"
    ],
    "notificationSequence": 10,
    "sendingRetriesCount": 0,
    "timestamp": 1649334560,
    "cardAuthorization": null,
    "cardSettlement": null,
    "externalPaymentSettlement": null,
    "directDebitMandate": null,
    "directDebitDue": null,
    "directCreditReceived": null,
    "cardStatusChange": null,
    "negativeAcknowledgement": null,
    "financialDetailAddendum": null,
    "cardTokenization": null,
    "tokenUpdates": null,
    "epmAddressAssignCompleted": null,
    "epmAddressAssignFailed": null,
    "customNotification": null,
    "externalPaymentNotification": null,
    "accountStatusChange": null,
    "epmAddressStatusChange": null,
    "currencyExchangeNotification": null,
    "cardAuthorizationExpired": null,
    "balanceAdjustment": null,
    "holderAuthentication": null,
    "cardTokenizationViaAuthorize": null,
    "holderAuthenticationNotification": null,
    "updateEpmAddressNotification": null,
    "disputeStatusChange": {
        "disputeId": 123457,
        "newStatus": "U",
        "previousStatus": "A",
        "source": 2
    }
}
```

## Notation
### Parameter requirement

| Notation | Meaning         |
|:---------|:----------------|
| M        | Mandatory.      |
| O        | Optional.       |
| C        | Conditional.    |
| -        | Not applicable. |

### Value type

| Notation  | Meaning                          |
|:----------|:---------------------------------|
| Not blank | Not empty, not null, isset.      |
| A         | Alphabetic chars only.           |
| N         | Only numbers.                    |
| NS        | Numeric with symbols value.      |
| AN        | Alphanumeric value.              |
| ANS       | Alphanumeric with symbols value. |
| [1,2,3]   | Possible values: 1 or 2 or 3.    |
| [1-3]     | Range from 1 to 3.               |
| LIST      | List of values.                  |
| OBJ       | Object with properties.          |
| OBJ-LIST  | List of objects with properties. |
| -         | Not applicable.                  |
