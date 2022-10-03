<!--
 # Introduction
 ## Using documentation
 ## API
 ### Overview
 ### Common workflows
-->

# Introduction
All API request examples provided in this document are for illustrative purposes only and request specifications for each method must be followed.

**Note: All request fields must be sent as string despite the field type differences, as fields are parsed to proper types.**

## Security

Please make sure to read appendix [`Security`](#appendix--security) before proceeding with using this API.

## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

# Actions
## Authorize

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | authorize                     |

### Request

| Parameter                          | Notation | Type | Length   | Description                                                                                                      | Condition                                                                                                                     |
|:-----------------------------------|:---------|:-----|:---------|:-----------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| card_number                        | M        | N    | 13 - 19  | Card number.                                                                                                     |                                                                                                                               |
| transaction_amount                 | M        | N    | 1 - 12   | Transaction amount in cents.                                                                                     |                                                                                                                               |
| transmission_date_time             | M        | N    | 14       | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                                                                                               |
| expiration_date                    | M        | N    | 4        | Card expiration date (YYMM).                                                                                     |                                                                                                                               |
| mcc                                | O        | N    | 4        | Merchant type or merchant category code.                                                                         |                                                                                                                               |
| pos_entry_mode                     | M        | AN   | 12       | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                                                                                               |
| pan_sequence_number                | C        | N    | 3        | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions                                                                       |
| function_code                      | M        | N    | 3        | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                     |                                                                                                                               |
| pos_condition_code                 | M        | N    | 4        | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                           |                                                                                                                               |
| track_2_data                       | O        | AN   | 1 - 37   | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                                                                                               |
| rrn                                | M        | AN   | 12       | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                                                                                               |
| currency_code                      | M        | N    | 3        | ISO numeric currency code.                                                                                       |                                                                                                                               |
| pin_data                           | C        | HEX  | 16 - 32  | Personal identification number data.                                                                             | Required for online PIN transactions                                                                                          |
| security_control_info              | C        | N    | 16       | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                                                                                          |
| additional_amounts                 | C        | AN   | 1 - 255  | [`Additional amounts`](#appendix--enum--additional-amounts).                                                     | Required for Cashback transaction                                                                                             |
| icc_data                           | C        | AN   | 1 - 510  | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip and Single Tap transactions                                                                                 |
| card_verification                  | O        | N    | 1        | Card verification.                                                                                               | `0` or `1`. If value is `1` then card verification is performed (and transaction_amount 0 is allowed).                        |
| country_code                       | O        | N    | 3        | ISO 3166-1 numeric three-digit country code.                                                                     |                                                                                                                               |
| payment_transaction_type_indicator | O        | ANS  | 3        | [`Payment transaction type indicator`](#appendix--enum--payment-transaction-type-indicator).                     |                                                                                                                               |
| transaction_description            | O        | ANS  | 1 - 22   | Transaction description.                                                                                         |                                                                                                                               |
| parent_tx_id                       | C        | N    | 30       | Parent transaction ID.                                                                                           | Required for Single Tap second instance transactions and incremental authorizations.                                          |
| promotion_code                     | C        | AN   | 6        | [`Promotion code`](#appendix--enum--promotion-codes).                                                            | Available only for `final` authorizes. Should be sent if merchant wants get available installment plans for this transaction. |
| digital_wallet_identifier          | O        | N    | 3        | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                       |                                                                                                                               |
| account_type_from                  | O        | N    | 2        | Default value 'NA' [`Account type from`](#appendix--enum--account-type-from).                                    |                                                                                                                               |
| account_type_to                    | O        | N    | 2        | Default value 'NA' [`Account type to`](#appendix--enum--account-type-to).                                        |                                                                                                                               |
| reservation_duration               | C        | N    | 2        | Duration of reservation in days. Available range 01-99.                                                          | Required for Auto-Rental and Hotel reservations. VISA scheme only.                                                            |
| accept_partial_approval            | C        | N    | 1        | Available values [0, 1].                                                                                         | If value is `1` then partial approvals will be accepted for this transactions.                                                |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "additional_amounts": "0040978D000000000088",
    "icc_data ": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
    "country_code": "840"
}
```

### Response

| Parameter                                          | Notation | Type | Length  | Description                                                                  | Condition                            |
|:---------------------------------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------|:-------------------------------------|
| tx_id                                              | M        | AN   | 30      | Transaction ID.                                                              |                                      |
| reject_reason_code                                 | M        | AN   | 6       | Reject reason codes according to Scheme specification.                       |                                      |
| card_number                                        | M        | N    | 13 - 19 | Card number.                                                                 |                                      |
| transaction_amount                                 | M        | N    | 1 - 12  | Transaction amount in cents.                                                 |                                      |
| transmission_date_time                             | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                   |                                      |
| stan                                               | M        | AN   | 6       | System Trace Audit Number (STAN).                                            |                                      |
| rrn                                                | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                            |                                      |
| response_code                                      | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                         |                                      |
| currency_code                                      | M        | N    | 3       | ISO numeric currency code.                                                   |                                      |
| additional_amounts                                 | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts).                 | Required for Cashback transaction    |
| authorization_id_response                          | O        | N    | 6       | Authorization identification response.                                       |                                      |
| installments_plans                                 | O        | LIST | -       | List of available installment plans. Maximum of 12 plans could be available. |                                      |
| installments_plans / installment_plan_id           | M        | N    | 1-2     | Installment plan ID.                                                         |                                      |
| installments_plans / number_of_installments        | M        | N    | 1-2     | Number of installments.                                                      |                                      |
| installments_plans / interest_rate                 | M        | N    | 5       | Interest rate.                                                               |                                      |
| installments_plans / installment_fee               | M        | N    | 12      | Installment fee.                                                             |                                      |
| installments_plans / annual_percentage_rate        | M        | N    | 5       | Annual percentage rate.                                                      |                                      |
| installments_plans / first_installment_amount      | M        | N    | 12      | First installment amount.                                                    |                                      |
| installments_plans / subsequent_installment_amount | M        | N    | 12      | Subsequent installment amount.                                               |                                      |
| installments_plans / total_amount_due              | M        | N    | 12      | Total amount due.                                                            |                                      |
| settlement_currency                                | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).       |                                      |
| settlement_amount                                  | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different).      |                                      |
| scheme_error_description                           | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.            | Returned only for JCB scheme errors. |

```json
{
    "tx_id": "030001300117000005190531121252",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "terminal_id": "termi321",
    "currency_code": "978",
    "authorization_id_response": "373727",
    "reject_reason_code": "00000",
    "settlement_currency": "978",
    "settlement_amount": "5000",
    "installments_plans": [
        {
            "installment_plan_id": "1",
            "number_of_installments": "12",
            "interest_rate": "01000",
            "installment_fee": "000000020000",
            "annual_percentage_rate": "02000",
            "first_installment_amount": "000000020000",
            "subsequent_installment_amount": "000000020000",
            "total_amount_due": "000000200000"
        },
        ...
        {
            "installment_plan_id": "12",
            "number_of_installments": "12",
            "interest_rate": "02010",
            "installment_fee": "000000020000",
            "annual_percentage_rate": "02000",
            "first_installment_amount": "000000020000",
            "subsequent_installment_amount": "000000020000",
            "total_amount_due": "000000200000"
        }
    ]
}
```

## Balance inquiry

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | balance_inquiry               |

### Request

| Parameter               | Notation | Type | Length  | Description                                                                                                      | Condition                                               |
|:------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| card_number             | M        | N    | 13 - 19 | Card number.                                                                                                     |                                                         |
| transaction_amount      | M        | N    | 1 - 12  | Transaction amount in cents. Must be zero for `balance_inquiry` request.                                         |                                                         |
| transmission_date_time  | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                         |
| expiration_date         | M        | N    | 4       | Card expiration date (YYMM).                                                                                     |                                                         |
| mcc                     | O        | N    | 4       | Merchant type or merchant category code.                                                                         |                                                         |
| pos_entry_mode          | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                         |
| pan_sequence_number     | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions |
| track_2_data            | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                         |
| rrn                     | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                         |
| currency_code           | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                         |
| pin_data                | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                    |
| security_control_info   | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                    |
| icc_data                | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip transactions                          |
| transaction_description | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                         |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "0",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "icc_data ": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
    "country_code": "840"
}
```

### Response

| Parameter                 | Notation | Type | Length  | Description                                                  | Condition                         |
|:--------------------------|:---------|:-----|:--------|:-------------------------------------------------------------|:----------------------------------|
| reject_reason_code        | M        | AN   | 6       | Reject reason codes according to Scheme specification.       |                                   |
| card_number               | M        | N    | 13 - 19 | Card number.                                                 |                                   |
| transaction_amount        | M        | N    | 1 - 12  | Transaction amount in cents.                                 |                                   |
| transmission_date_time    | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                   |                                   |
| stan                      | M        | AN   | 6       | System Trace Audit Number (STAN).                            |                                   |
| rrn                       | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).            |                                   |
| response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).         |                                   |
| currency_code             | M        | N    | 3       | ISO numeric currency code.                                   |                                   |
| additional_amounts        | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts). | Required for Cashback transaction |
| authorization_id_response | O        | N    | 6       | Authorization identification response.                       |                                   |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "additional_amounts": "0002840C000099496841",
    "reject_reason_code": "00000",
    "tx_id": "030001300117000005190531121252"
}
```

## Cancel

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | cancel                        |

### Request

| Parameter                | Notation | Type | Length  | Description                                                                                                      | Condition                                               |
|:-------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| card_number              | M        | N    | 13 - 19 | Card number.                                                                                                     |                                                         |
| transaction_amount       | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                     |                                                         |
| transmission_date_time   | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                         |
| expiration_date          | M        | N    | 4       | Card expiration date (YYMM).                                                                                     |                                                         |
| mcc                      | O        | N    | 4       | Merchant type or merchant category code.                                                                         |                                                         |
| pos_entry_mode           | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                         |
| pan_sequence_number      | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions |
| function_code            | O        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                     |                                                         |
| pos_condition_code       | O        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                           |                                                         |
| rrn                      | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                         |
| currency_code            | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                         |
| pin_data                 | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                    |
| security_control_info    | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                    |
| transaction_description  | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                         |
| scheme_error_description | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.                                                | Returned only for JCB scheme errors.                    |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "rrn": "915000000099",
    "currency_code": "978"
}
```

### Response

| Parameter              | Notation | Type | Length  | Description                                            |
|:-----------------------|:---------|:-----|:--------|:-------------------------------------------------------|
| tx_id                  | M        | AN   | 30      | Transaction ID.                                        |
| reject_reason_code     | M        | AN   | 6       | Reject reason codes according to Scheme specification. |
| card_number            | M        | N    | 13 - 19 | Card number.                                           |
| transaction_amount     | M        | N    | 1 - 12  | Transaction amount in cents.                           |
| transmission_date_time | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).             |
| stan                   | M        | AN   | 6       | System Trace Audit Number (STAN).                      |
| rrn                    | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).      |
| response_code          | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).   |
| currency_code          | M        | N    | 3       | ISO numeric currency code.                             |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978"
}
```

## Capture

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | capture                       |

### Request

| Parameter          | Notation | Type | Length | Description                  | Condition |
|:-------------------|:---------|:-----|:-------|:-----------------------------|:----------|
| parent_tx_id       | M        | AN   | 30     | Parent transaction ID.       |           |
| transaction_amount | M        | N    | 1 - 12 | Transaction amount in cents. |           |

```json
{
    "parent_tx_id": "030001300117000005190531121252",
    "transaction_amount": "300"
}
```

### Response

| Parameter                | Notation | Type | Length | Description                                                             | Condition                            |
|:-------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------|:-------------------------------------|
| tx_id                    | M        | AN   | 30     | Transaction ID.                                                         |                                      |
| reject_reason_code       | M        | AN   | 6      | Reject reason codes according to Scheme specification.                  |                                      |
| transaction_amount       | M        | N    | 1 - 12 | Transaction amount in cents.                                            |                                      |
| response_code            | M        | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes).                    |                                      |
| currency_code            | M        | N    | 3      | ISO numeric currency code.                                              |                                      |
| rrn                      | ME       | AN   | 12     | Unique Retrieval Reference Number (YDDDIDNNNNNN).                       |                                      |
| settlement_currency      | M        | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).  |                                      |
| settlement_amount        | M        | N    | 1-12   | Expected settlement amount (actual settlement amount may be different). |                                      |
| scheme_error_description | O        | ANS  | 1-1024 | Scheme error description if request fails scheme side validation.       | Returned only for JCB scheme errors. |

```json
{
    "tx_id": "000000200003000003191002074941",
    "transaction_amount": "300",
    "response_code": "00",
    "currency_code": "978",
    "rrn": "915000000011",
    "settlement_currency": "978",
    "settlement_amount": "300"
}
```

## Cash disbursement

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | cash_disbursement             |

### Request

| Parameter               | Notation | Type | Length  | Description                                                                                                      | Condition                                               |
|:------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| card_number             | M        | N    | 13 - 19 | Card number.                                                                                                     |                                                         |
| transaction_amount      | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                     |                                                         |
| transmission_date_time  | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                         |
| expiration_date         | M        | N    | 4       | Card expiration date (YYMM).                                                                                     |                                                         |
| pos_entry_mode          | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                         |
| pan_sequence_number     | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions |
| function_code           | O        | N    | 3       | [`Function code`](#appendix--enum-function-code) or network international identifier (NII).                      |                                                         |
| pos_condition_code      | O        | N    | 4       | [`Point of service condition code`](#appendix--enum-point-of-service-condition-code).                            |                                                         |
| track_2_data            | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                         |
| rrn                     | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                         |
| currency_code           | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                         |
| pin_data                | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                    |
| security_control_info   | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                    |
| icc_data                | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip transactions                          |
| transaction_description | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                         |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "icc_data ": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001"
}
```

### Response

| Parameter                 | Notation | Type | Length  | Description                                                             | Condition                            |
|:--------------------------|:---------|:-----|:--------|:------------------------------------------------------------------------|:-------------------------------------|
| tx_id                     | M        | AN   | 30      | Transaction ID.                                                         |                                      |
| reject_reason_code        | M        | AN   | 6       | Reject reason codes according to Scheme specification.                  |                                      |
| card_number               | M        | N    | 13 - 19 | Card number.                                                            |                                      |
| transaction_amount        | M        | N    | 1 - 12  | Transaction amount in cents.                                            |                                      |
| transmission_date_time    | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                              |                                      |
| stan                      | M        | AN   | 6       | System Trace Audit Number (STAN).                                       |                                      |
| rrn                       | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                       |                                      |
| response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                    |                                      |
| currency_code             | M        | N    | 3       | ISO numeric currency code.                                              |                                      |
| additional_amounts        | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts).            | Required for Cashback transaction    |
| authorization_id_response | O        | N    | 6       | Authorization identification response.                                  |                                      |
| settlement_currency       | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).  |                                      |
| settlement_amount         | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different). |                                      |
| scheme_error_description  | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.       | Returned only for JCB scheme errors. |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "settlement_currency": "978",
    "settlement_amount": "5000",
}
```

## Credit

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | credit                        |

### Request
| Parameter                                       | Notation | Type | Length  | Description                                                                                                           | Condition                                                                                               |
|:------------------------------------------------|:---------|:-----|:--------|:----------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|
| card_number                                     | M        | N    | 13 - 19 | Card number.                                                                                                          |                                                                                                         |
| transaction_amount                              | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                          |                                                                                                         |
| transmission_date_time                          | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                            |                                                                                                         |
| expiration_date                                 | M        | N    | 4       | Card expiration date (YYMM).                                                                                          |                                                                                                         |
| mcc                                             | O        | N    | 4       | Merchant type or merchant category code.                                                                              |                                                                                                         |
| pos_entry_mode                                  | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                        |                                                                                                         |
| pan_sequence_number                             | C        | N    | 3       | Application PAN sequence number.                                                                                      | Always required except for magnetic stripe transactions                                                 |
| function_code                                   | O        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                          |                                                                                                         |
| pos_condition_code                              | O        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                                |                                                                                                         |
| track_2_data                                    | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                      |                                                                                                         |
| rrn                                             | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                     |                                                                                                         |
| currency_code                                   | M        | N    | 3       | ISO numeric currency code.                                                                                            |                                                                                                         |
| pin_data                                        | C        | HEX  | 16 - 32 | Personal identification number data.                                                                                  | Required for online PIN transactions                                                                    |
| security_control_info                           | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information).      | Required for online PIN transactions                                                                    |
| icc_data                                        | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                             | Required for Chip transactions                                                                          |
| transaction_description                         | O        | ANS  | 1 - 22  | Transaction description.                                                                                              |                                                                                                         |
| payment_transaction_type_indicator              | M        | ANS  | 3       | [`Payment transaction type indicator`](#appendix--enum--payment-transaction-type-indicator).                          | Required for all schemes except JCB.                                                                    |
| digital_wallet_identifier                       | O        | N    | 3       | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                            |                                                                                                         |
| sender_data                                     | O        | OBJ  | -       | Money sending persons personal information                                                                            |                                                                                                         |
| sender_data / first_name                        | C        | ANS  | 1-35    | Money sending persons first name.                                                                                     | Required MoneySend Payment transaction                                                                  |
| sender_data / middle_name                       | O        | ANS  | 1       | Money sending persons middle name                                                                                     |                                                                                                         |
| sender_data / last_name                         | C        | ANS  | 1-35    | Money sending persons last name.                                                                                      | Required MoneySend Payment transaction                                                                  |
| sender_data / street_address                    | C        | ANS  | 1-50    | Money sending persons street address. Required if mcc is 6536 or 6537 (MoneySend Payment)                             | Required MoneySend Payment transaction                                                                  |
| sender_data / city                              | O        | ANS  | 1-25    | Money sending persons city                                                                                            |                                                                                                         |
| sender_data / state_code                        | C        | N    | 3       | Money sending persons ISO 3166-2 state code.                                                                          | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| sender_data / country                           | C        | N    | 3       | Money sending persons ISO 3166-1 numeric country code.                                                                | Required MoneySend Payment transaction                                                                  |
| sender_data / postal_code                       | O        | ANS  | 1-10    | Money sending persons postal code                                                                                     |                                                                                                         |
| sender_data / date_of_birth                     | O        | N    | 8       | Money sending persons date of birth                                                                                   |                                                                                                         |
| sender_data / account_number_type               | O        | AN   | 2       | Sender [`Account number type`](#appendix--enum--account-number-type).                                                 | If not provided will be defaulted to *03* (Card Account).                                               |
| sender_data / account_number                    | O        | N    | 50      | Sender account number.                                                                                                | If not provided value from field *card_number/card_token* will be filled.                               |
| sender_data / identification_type               | O        | N    | 2       | [`Identification type code`](#appendix--enum--identification-type).                                                   |                                                                                                         |
| sender_data / identification_number             | O        | ANS  | 25      | Valid identification number of the Receiver.                                                                          |                                                                                                         |
| sender_data / identification_country_code       | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| sender_data / identification_expiration_date    | O        | N    | 8       | format `yyyyMMdd`                                                                                                     |                                                                                                         |
| sender_data / nationality                       | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| sender_data / country_of_birth                  | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| receiver_data                                   | O        | OBJ  | -       | Money receiving persons personal information                                                                          |                                                                                                         |
| receiver_data / first_name                      | C        | ANS  | 1-35    | Money receiving persons first name.                                                                                   | Required MoneySend Payment transaction                                                                  |
| receiver_data / middle_name                     | O        | ANS  | 1       | Money receiving persons middle name                                                                                   |                                                                                                         |
| receiver_data / last_name                       | C        | ANS  | 1-35    | Money receiving persons last name.                                                                                    | Required MoneySend Payment transaction                                                                  |
| receiver_data / street_address                  | O        | ANS  | 1-50    | Money receiving persons address                                                                                       |                                                                                                         |
| receiver_data / city                            | O        | ANS  | 1-25    | Money receiving persons city                                                                                          |                                                                                                         |
| receiver_data / state_code                      | C        | N    | 3       | Money receiving persons ISO 3166-2 state code.                                                                        | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| receiver_data / country                         | O        | N    | 3       | Money receiving persons ISO 3166-1 numeric country code                                                               |                                                                                                         |
| receiver_data / postal_code                     | O        | ANS  | 1-10    | Money receiving persons postal code                                                                                   |                                                                                                         |
| receiver_data / date_of_birth                   | O        | N    | 8       | Money receiving persons date of birth                                                                                 |                                                                                                         |
| receiver_data / account_number_type             | O        | AN   | 2       | Receiver [`Account number type`](#appendix--enum--account-number-type).                                               | If not provided will be defaulted to *03* (Card Account).                                               |
| receiver_data / account_number                  | O        | N    | 50      | Receiver account number                                                                                               |                                                                                                         |
| receiver_data / identification_type             | O        | N    | 2       | [`Identification type code`](#appendix--enum--identification-type).                                                   |                                                                                                         |
| receiver_data / identification_number           | O        | ANS  | 25      | Valid identification number of the Receiver.                                                                          |                                                                                                         |
| receiver_data / identification_country_code     | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| receiver_data / identification_expiration_date  | O        | N    | 8       | format `yyyyMMdd`                                                                                                     |                                                                                                         |
| receiver_data / nationality                     | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| receiver_data / country_of_birth                | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                       |                                                                                                         |
| transaction_data                                | C        | OBJ  | -       | Transaction data.                                                                                                     |                                                                                                         |
| transaction_data / unique_transaction_reference | O        | ANS  | 1-19    | Unique transaction reference code                                                                                     |                                                                                                         |
| transaction_data / additional_message           | O        | ANS  | 1-65    | Additional message                                                                                                    |                                                                                                         |
| transaction_data / funding_source               | O        | N    | 2       | [`Funding source`](#appendix--enum--funding-source).                                                                  | If not provided will be calculated from BIN of PAN which is provided in field *card_number/card_token*. |
| transaction_data / participation_id             | O        | AN   | 30      | Participation ID of sender                                                                                            |                                                                                                         |
| transaction_data / transaction_purpose          | O        | N    | 2       | Purpose details for Mastercard MoneySend transactions [`Transaction purposes`](#appendix--enum--transaction-purpose). |                                                                                                         |
| scheme_error_description                        | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.                                                     | Returned only for JCB scheme errors.                                                                    |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "country_code": "840",
    "icc_data": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
    "payment_transaction_type_indicator": "C07",
    "receiver_data": {
        "first_name": "Mick",
        "middle_name": "B",
        "last_name": "McCann",
        "street_address": "20 Lower Bridge St",
        "state_code": "L",
        "country": "372",
        "account_number": "%RECEIVER_CARD_NUMBER%"
    },
    "sender_data": {
        "first_name": "Mick",
        "middle_name": "B",
        "last_name": "McCann",
        "street_address": "20 Lower Bridge St",
        "state_code": "L",
        "country": "372",
        "account_number": "%SENDER_CARD_NUMBER%"
    },
    "transaction_data": {
        "additional_message": "222",
        "funding_source": "05",
        "participation_id": "44",
        "transaction_purpose": "00"
    }
}
```

### Response

| Parameter                 | Notation | Type | Length  | Description                                                             | Condition |
|:--------------------------|:---------|:-----|:--------|:------------------------------------------------------------------------|:----------|
| tx_id                     | M        | AN   | 30      | Transaction ID.                                                         |           |
| reject_reason_code        | M        | AN   | 6       | Reject reason codes according to Scheme specification.                  |           |
| card_number               | M        | N    | 13 - 19 | Card number.                                                            |           |
| transaction_amount        | M        | N    | 1 - 12  | Transaction amount in cents.                                            |           |
| transmission_date_time    | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                              |           |
| stan                      | M        | AN   | 6       | System Trace Audit Number (STAN).                                       |           |
| rrn                       | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                       |           |
| response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                    |           |
| currency_code             | M        | N    | 3       | ISO numeric currency code.                                              |           |
| authorization_id_response | O        | N    | 6       | Authorization identification response.                                  |           |
| settlement_currency       | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).  |           |
| settlement_amount         | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different). |           |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210204073950",
    "stan": "000003",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "settlement_currency": "978",
    "settlement_amount": "5000"
}
```

## Confirm Installment

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | confirm_installment           |

### Request

| Parameter                | M | Type | Length | Description                                                       | Condition |
|:-------------------------|:--|:-----|:-------|:------------------------------------------------------------------|:----------|
| installment_parent_tx_id | M | N    | 30     | ID must be from the first (initial) authorize request.            |           |
| installment_plan_id      | M | N    | 1-2    | Installment plan id from first (initial) authorize response data. |           |


```json
{
    "installment_parent_tx_id": "0018062510084300002919780200567",
    "installment_plan_id": "1",
}
```

### Response

| Parameter                 | Notation | Type | Length  | Description                                                  | Condition                         |
|:--------------------------|:---------|:-----|:--------|:-------------------------------------------------------------|:----------------------------------|
| tx_id                     | M        | AN   | 30      | Transaction ID.                                              |                                   |
| reject_reason_code        | O        | AN   | 6       | Reject reason codes according to Scheme specification.       |                                   |
| card_number               | M        | N    | 13 - 19 | Card number.                                                 |                                   |
| transaction_amount        | M        | N    | 1 - 12  | Transaction amount in cents.                                 |                                   |
| transmission_date_time    | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                   |                                   |
| stan                      | M        | AN   | 6       | System Trace Audit Number (STAN).                            |                                   |
| rrn                       | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).            |                                   |
| response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).         |                                   |
| currency_code             | M        | N    | 3       | ISO numeric currency code.                                   |                                   |
| additional_amounts        | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts). | Required for Cashback transaction |
| authorization_id_response | O        | N    | 6       | Authorization identification response.                       |                                   |
| processing_code           | M        | AN   | 6       | Reject reason codes according to Scheme specification.       |                                   |

```json
{
    "card_number": "2222420180000018",
    "processing_code": "000000",
    "transaction_amount": "95300",
    "transmission_date_time": "20210802114634",
    "stan": "000034",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "tx_id": "010000900004000034210802114634",
    "reject_reason_code": "0000"
}
```

## Ping

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | ping                          |

### Request

| Parameter | Notation | Type | Length  | Description                                           |
|:----------|:---------|:-----|:--------|:------------------------------------------------------|
| message   | M        | ANS  | 1 - 255 | Request message. Message must be static value "ping". |

```json
{
    "message": "ping"
}
```

### Response

| Parameter | Notation | Type | Length  | Description                                            |
|:----------|:---------|:-----|:--------|:-------------------------------------------------------|
| message   | M        | ANS  | 1 - 255 | Response message. Message will be static value "pong". |

```json
{
    "message": "pong"
}
```

## P2P transaction

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | p2p_transaction               |

**Note: The MCC code is applied automatically for Mastercard MoneySend operations when doing P2P transaction request:**

* 6536 used for intra-country payment.
* 6537 used for inter-country payment.
* 6538 used for MoneySend funding.

### Request
| Parameter                                       | Notation | Type | Length  | Description                                                                                                      | Condition                                                                                               |
|:------------------------------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|
| card_number                                     | M        | N    | 13 - 19 | Card number.                                                                                                     |                                                                                                         |
| transaction_amount                              | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                     |                                                                                                         |
| transmission_date_time                          | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                                                                         |
| expiration_date                                 | M        | N    | 4       | Card expiration date (YYMM).                                                                                     |                                                                                                         |
| pos_entry_mode                                  | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                                                                         |
| pan_sequence_number                             | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions                                                 |
| function_code                                   | M        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                     |                                                                                                         |
| pos_condition_code                              | M        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                           |                                                                                                         |
| track_2_data                                    | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                                                                         |
| rrn                                             | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                                                                         |
| currency_code                                   | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                                                                         |
| pin_data                                        | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                                                                    |
| security_control_info                           | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                                                                    |
| icc_data                                        | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip transactions                                                                          |
| transaction_description                         | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                                                                         |
| payment_transaction_type_indicator              | M        | ANS  | 3       | [`Payment transaction type indicator`](#appendix--enum--payment-transaction-type-indicator).                     |                                                                                                         |
| digital_wallet_identifier                       | O        | N    | 3       | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                       |                                                                                                         |
| credit_amount                                   | O        | N    | 1 - 12  | Credit transaction amount in cents. Transaction amount is used if this field is empty.                           |                                                                                                         |
| credit_currency                                 | O        | N    | 3       | Credit transaction ISO Numeric currency code. Transaction currency is used if this field is empty                |                                                                                                         |
| sender_data                                     | C        | OBJ  | -       | Money sending persons personal information                                                                       | Required if mcc is 6537 (MoneySend Payment inter-country).                                              |
| sender_data / first_name                        | C        | ANS  | 1-35    | Money sending persons first name.                                                                                | Required MoneySend Payment transaction                                                                  |
| sender_data / middle_name                       | O        | ANS  | 1       | Money sending persons middle name                                                                                |                                                                                                         |
| sender_data / last_name                         | C        | ANS  | 1-35    | Money sending persons last name.                                                                                 | Required MoneySend Payment transaction                                                                  |
| sender_data / street_address                    | C        | ANS  | 1-50    | Money sending persons street address. Required if mcc is 6536 or 6537 (MoneySend Payment)                        | Required MoneySend Payment transaction                                                                  |
| sender_data / city                              | M        | ANS  | 1-25    | Money sending persons city                                                                                       |                                                                                                         |
| sender_data / state_code                        | C        | N    | 3       | Money sending persons ISO 3166-2 state code.                                                                     | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| sender_data / country                           | C        | N    | 3       | Money sending persons ISO 3166-1 numeric country code.                                                           | Required MoneySend Payment transaction                                                                  |
| sender_data / postal_code                       | O        | ANS  | 1-10    | Money sending persons postal code                                                                                |                                                                                                         |
| sender_data / date_of_birth                     | O        | N    | 8       | Money sending persons date of birth                                                                              |                                                                                                         |
| sender_data / account_number_type               | O        | AN   | 2       | Sender [`Account number type`](#appendix--enum--account-number-type).                                            | If not provided will be defaulted to *03* (Card Account).                                               |
| sender_data / account_number                    | O        | N    | 50      | Sender account number.                                                                                           | If not provided value from field *card_number/card_token* will be filled.                               |
| sender_data / identification_type               | O        | N    | 2       | [`Identification type code`](#appendix--enum--identification-type).                                              |                                                                                                         |
| sender_data / identification_number             | O        | ANS  | 25      | Valid identification number of the Receiver.                                                                     |                                                                                                         |
| sender_data / identification_country_code       | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| sender_data / identification_expiration_date    | O        | N    | 8       | format `yyyyMMdd`                                                                                                |                                                                                                         |
| sender_data / nationality                       | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| sender_data / country_of_birth                  | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| receiver_data                                   | O        | OBJ  | -       | Money receiving persons personal information                                                                     | Required if mcc is 6537 (MoneySend Payment inter-country).                                              |
| receiver_data / first_name                      | C        | ANS  | 1-35    | Money receiving persons first name.                                                                              | Required MoneySend Payment transaction                                                                  |
| receiver_data / middle_name                     | O        | ANS  | 1       | Money receiving persons middle name                                                                              |                                                                                                         |
| receiver_data / last_name                       | C        | ANS  | 1-35    | Money receiving persons last name.                                                                               | Required MoneySend Payment transaction                                                                  |
| receiver_data / street_address                  | O        | ANS  | 1-50    | Money receiving persons address                                                                                  |                                                                                                         |
| receiver_data / city                            | O        | ANS  | 1-25    | Money receiving persons city                                                                                     |                                                                                                         |
| receiver_data / state_code                      | C        | N    | 3       | Money receiving persons ISO 3166-2 state code.                                                                   | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| receiver_data / country                         | O        | N    | 3       | Money receiving persons ISO 3166-1 numeric country code                                                          |                                                                                                         |
| receiver_data / postal_code                     | O        | ANS  | 1-10    | Money receiving persons postal code                                                                              |                                                                                                         |
| receiver_data / date_of_birth                   | O        | N    | 8       | Money receiving persons date of birth                                                                            |                                                                                                         |
| receiver_data / account_number_type             | O        | AN   | 2       | Receiver [`Account number type`](#appendix--enum--account-number-type).                                          | If not provided will be defaulted to *03* (Card Account).                                               |
| receiver_data / account_number                  | O        | N    | 50      | Receiver account number or card number                                                                           |                                                                                                         |
| receiver_data / identification_type             | O        | N    | 2       | [`Identification type code`](#appendix--enum--identification-type).                                              |                                                                                                         |
| receiver_data / identification_number           | O        | ANS  | 25      | Valid identification number of the Receiver.                                                                     |                                                                                                         |
| receiver_data / identification_country_code     | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| receiver_data / identification_expiration_date  | O        | N    | 8       | format `yyyyMMdd`                                                                                                |                                                                                                         |
| receiver_data / nationality                     | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| receiver_data / country_of_birth                | O        | N    | 3       | ISO 3166-1 numeric country code                                                                                  |                                                                                                         |
| transaction_data                                | C        | OBJ  | -       | Transaction data.                                                                                                |                                                                                                         |
| transaction_data / unique_transaction_reference | O        | ANS  | 1-19    | Unique transaction reference code                                                                                |                                                                                                         |
| transaction_data / additional_message           | O        | ANS  | 1-65    | Additional message                                                                                               |                                                                                                         |
| transaction_data / funding_source               | O        | N    | 2       | [`Funding source`](#appendix--enum--funding-source).                                                             | If not provided will be calculated from BIN of PAN which is provided in field *card_number/card_token*. |
| transaction_data / participation_id             | O        | AN   | 30      | Participation ID of sender                                                                                       |                                                                                                         |
| transaction_data / transaction_purpose          | O        | N    | 2       | Purpose details for Mastercard MoneySend transactions [`Transaction purposes`](#appendix--enum--transaction-purpose)                                                                            |                                                                                                         |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "country_code": "840",
    "icc_data": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
    "payment_transaction_type_indicator": "C07",
    "credit_amount" : "2000",
    "credit_currency": "840",
    "receiver_data": {
        "first_name": "Mick",
        "middle_name": "B",
        "last_name": "McCann",
        "street_address": "20 Lower Bridge St",
        "state_code": "L",
        "country": "372",
        "account_number": "%RECEIVER_CARD_NUMBER%"
    },
    "sender_data": {
        "first_name": "Mick",
        "middle_name": "B",
        "last_name": "McCann",
        "street_address": "20 Lower Bridge St",
        "state_code": "L",
        "country": "372",
        "account_number": "%SENDER_CARD_NUMBER%"
    },
    "transaction_data": {
        "additional_message": "222",
        "funding_source": "05",
        "participation_id": "44",
        "transaction_purpose": "00"
    }
}
```

### Response

| Parameter                               | Notation | Type | Length  | Description                                                                                                               | Condition                                                 |
|:----------------------------------------|:---------|:-----|:--------|:--------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------|
| tx_id                                   | M        | AN   | 30      | Transaction ID.                                                                                                           |                                                           |
| processing_code                         | M        | AN   | 6       | Reject reason codes according to Scheme specification.                                                                    |                                                           |
| reject_reason_code                      | M        | AN   | 6       | Reject reason codes according to Scheme specification.                                                                    |                                                           |
| card_number                             | M        | N    | 13 - 19 | Card number.                                                                                                              |                                                           |
| transaction_amount                      | M        | N    | 12      | Transaction amount in cents.                                                                                              |                                                           |
| transmission_date_time                  | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                                |                                                           |
| stan                                    | M        | AN   | 6       | System Trace Audit Number (STAN).                                                                                         |                                                           |
| rrn                                     | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                         |                                                           |
| response_code                           | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                                                                      |                                                           |
| currency_code                           | M        | N    | 3       | ISO numeric currency code.                                                                                                |                                                           |
| authorization_id_response               | O        | N    | 6       | Authorization identification response.                                                                                    |                                                           |
| p2p_funding                             | M        | OBJ  | -       | Information about the funding transaction                                                                                 |                                                           |
| p2p_funding / response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes)                                                                       |                                                           |
| p2p_funding / transaction_amount        | ME       | N    | 1-12    | Transaction amount                                                                                                        |                                                           |
| p2p_funding / transaction_currency      | M        | N    | 3       | ISO Numeric currency code                                                                                                 |                                                           |
| p2p_funding / authorization_id_response | C        | AN   | 6       | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. | Returned only if transaction has been approved by issuer.  |
| p2p_funding / tx_id                     | M        | N    | 30      | Transaction ID                                                                                                            |                                                           |
| p2p_funding / card_acceptor_data        | O        | ANS  | 1-40    | Card acceptor data                                                                                                        |                                                           |
| p2p_credit                              | C        | OBJ  | -       | Information about the credit transaction.                                                                                 | Returned only if credit response is present.              |
| p2p_credit / response_code              | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes)                                                                       |                                                           |
| p2p_credit / transaction_amount         | ME       | N    | 1-12    | Transaction amount                                                                                                        |                                                           |
| p2p_credit / transaction_currency       | M        | N    | 3       | ISO Numeric currency code                                                                                                 |                                                           |
| p2p_credit / authorization_id_response  | C        | AN   | 6       | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. | Returned only if transaction has been approved by issuer.  |
| p2p_credit / tx_id                      | M        | N    | 30      | Transaction ID                                                                                                            |                                                           |
| p2p_credit / card_acceptor_data         | O        | ANS  | 1-40    | Card acceptor data                                                                                                        |                                                           |
| settlement_currency                     | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).                                                    |                                                           |
| settlement_amount                       | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different).                                                   |                                                           |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "processing_code": "280000",
    "transaction_amount": "000000002000",
    "transmission_date_time": "20210419061736",
    "stan": "000006",
    "rrn": "041900000006",
    "response_code": "00",
    "currency_code": "840",
    "settlement_currency": "840",
    "settlement_amount": "2000",
    "p2p_funding": {
        "response_code":"00",
        "transaction_amount":"5000",
        "transaction_currency":"978",
        "tx_id":"000000700057000005210419061731",
        "authorization_id_response":"399731",
        "card_acceptor_data":"The Shard SE1 9SG London GBR"
    },
    "p2p_credit": {
        "response_code":"00",
        "transaction_amount":"2000",
        "transaction_currency":"840",
        "tx_id":"000000700057000006210419061736",
        "authorization_id_response":"939865",
        "card_acceptor_data":"The Shard SE1 9SG London GBR"
    }
}
```

## Refund

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | refund                        |

### Request

| Parameter              | Notation | Type | Length  | Description                                                                                                                           | Condition                                               |
|:-----------------------|:---------|:-----|:--------|:--------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| parent_tx_id           | M        | AN   | 30      | Initial authorize transaction ID.                                                                                                     |                                                         |
| card_number            | M        | N    | 13 - 19 | Card number.                                                                                                                          |                                                         |
| transaction_amount     | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                                          |                                                         |
| transmission_date_time | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                                            |                                                         |
| expiration_date        | M        | N    | 4       | Card expiration date (YYMM).                                                                                                          |                                                         |
| mcc                    | O        | N    | 4       | Merchant type or merchant category code.                                                                                              |                                                         |
| pos_entry_mode         | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                                        |                                                         |
| pan_sequence_number    | C        | N    | 3       | Application PAN sequence number.                                                                                                      | Always required except for magnetic stripe transactions |
| function_code          | M        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                                          |                                                         |
| pos_condition_code     | M        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                                                |                                                         |
| track_2_data           | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                                      |                                                         |
| rrn                    | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                                     |                                                         |
| currency_code          | M        | N    | 3       | ISO numeric currency code.                                                                                                            |                                                         |
| pin_data               | C        | HEX  | 16 - 32 | Personal identification number data.                                                                                                  | Required for online PIN transactions                    |
| security_control_info  | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information).                      | Required for online PIN transactions                    |
| icc_data               | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                                             | Required for Chip transactions                          |
| force_offline_only     | O        | N    | 1       | Forces offline refund. Offline refund does not send authorization request to scheme but puts authorization directly to clearing file. |                                                         |

```json
{
    "parent_tx_id": "030000400018000004200915055221",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "201",
    "pos_condition_code": "2000",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978"
}
```

### Response

| Parameter                 | Notation | Type | Length  | Description                                                                                                               |
|:--------------------------|:---------|:-----|:--------|:--------------------------------------------------------------------------------------------------------------------------|
| tx_id                     | M        | AN   | 30      | Transaction ID.                                                                                                           |
| reject_reason_code        | M        | AN   | 6       | Reject reason codes according to Scheme specification.                                                                    |
| card_number               | M        | N    | 13 - 19 | Card number.                                                                                                              |
| transaction_amount        | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                              |
| transmission_date_time    | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                                |
| stan                      | M        | AN   | 6       | System Trace Audit Number (STAN).                                                                                         |
| rrn                       | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                         |
| response_code             | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                                                                      |
| currency_code             | M        | N    | 3       | ISO numeric currency code.                                                                                                |
| authorization_id_response | O        | AN   | 6       | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. |
| settlement_currency       | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).                                                    |
| settlement_amount         | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different).                                                   |
| scheme_error_description  | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.                                                         |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "authorization_id_response": "957510",
    "settlement_currency": "978",
    "settlement_amount": "5000"
}
```

## Reverse

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | reverse                       |

### Request

| Parameter                          | Notation | Type | Length  | Description                                                                                                      | Condition                                               |
|:-----------------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| parent_tx_id                       | M        | AN   | 30      | Initial authorize transaction ID.                                                                                |                                                         |
| card_number                        | O        | N    | 13 - 19 | Card number.                                                                                                     |                                                         |
| transaction_amount                 | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                     |                                                         |
| transmission_date_time             | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                         |
| expiration_date                    | C        | N    | 4       | Card expiration date (YYMM).                                                                                     | Required if `card_number` is provided.                  |
| mcc                                | O        | N    | 4       | Merchant type or merchant category code.                                                                         |                                                         |
| pos_entry_mode                     | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                         |
| pan_sequence_number                | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions |
| function_code                      | M        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                     |                                                         |
| pos_condition_code                 | M        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                           |                                                         |
| track_2_data                       | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                         |
| rrn                                | M        | AN   | 12      | Parent authorize Retrieval Reference Number (YDDDIDNNNNNN).                                                      |                                                         |
| currency_code                      | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                         |
| pin_data                           | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                    |
| security_control_info              | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                    |
| icc_data                           | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip transactions                          |
| payment_transaction_type_indicator | M        | ANS  | 3       | [`Payment transaction type indicator`](#appendix--enum--payment-transaction-type-indicator).                     |                                                         |
| transaction_description            | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                         |
| reversal_reason_code               | O        | N    | 2       | [`Reversal reason code`](#appendix--enum--reversal-reason-code)                                                  |                                                         |
| partial_reverse                    | C        | N    | 1       | Partial reverse indicator. Available values [0, 1].                                                              | Required if reverse is partial. Default value `0`       |

```json
{
    "parent_tx_id": "030001300117000005190531121252",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "400",
    "pos_condition_code": "4000",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "country_code": "840"
}
```

### Response

| Parameter                | Notation | Type | Length  | Description                                                             |
|:-------------------------|:---------|:-----|:--------|:------------------------------------------------------------------------|
| tx_id                    | M        | AN   | 30      | Transaction ID.                                                         |
| reject_reason_code       | M        | AN   | 6       | Reject reason codes according to Scheme specification.                  |
| card_number              | M        | N    | 13 - 19 | Card number.                                                            |
| transaction_amount       | M        | N    | 1 - 12  | Transaction amount in cents.                                            |
| transmission_date_time   | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                              |
| stan                     | M        | AN   | 6       | System Trace Audit Number (STAN).                                       |
| rrn                      | ME       | AN   | 12      | Parent authorize Retrieval Reference Number (YDDDIDNNNNNN).             |
| response_code            | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                    |
| currency_code            | M        | N    | 3       | ISO numeric currency code.                                              |
| settlement_currency      | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).  |
| settlement_amount        | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different). |
| scheme_error_description | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.       |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "settlement_currency": "978",
    "settlement_amount": "5000"
}
```

## Sale

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | sale                          |

### Request

| Parameter                          | Notation | Type | Length  | Description                                                                                                      | Condition                                                                                              |
|:-----------------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| card_number                        | M        | N    | 13 - 19 | Card number.                                                                                                     |                                                                                                        |
| transaction_amount                 | M        | N    | 1 - 12  | Transaction amount in cents.                                                                                     |                                                                                                        |
| transmission_date_time             | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                       |                                                                                                        |
| expiration_date                    | M        | N    | 4       | Card expiration date (YYMM).                                                                                     |                                                                                                        |
| mcc                                | O        | N    | 4       | Merchant type or merchant category code.                                                                         |                                                                                                        |
| pos_entry_mode                     | M        | AN   | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                   |                                                                                                        |
| pan_sequence_number                | C        | N    | 3       | Application PAN sequence number.                                                                                 | Always required except for magnetic stripe transactions                                                |
| function_code                      | M        | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                     |                                                                                                        |
| pos_condition_code                 | M        | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                           |                                                                                                        |
| track_2_data                       | O        | AN   | 1 - 37  | [`Track 2 data`](#appendix--enum--track-2-data).                                                                 |                                                                                                        |
| rrn                                | M        | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                                                                |                                                                                                        |
| currency_code                      | M        | N    | 3       | ISO numeric currency code.                                                                                       |                                                                                                        |
| pin_data                           | C        | HEX  | 16 - 32 | Personal identification number data.                                                                             | Required for online PIN transactions                                                                   |
| security_control_info              | C        | N    | 16      | [`Security related control information (ISO 8583 DE53)`](#appendix--enum--security-related-control-information). | Required for online PIN transactions                                                                   |
| additional_amounts                 | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts).                                                     | Required for Cashback transaction                                                                      |
| icc_data                           | C        | AN   | 1 - 510 | Field contains chip data formatted in accordance with EMV specifications. (ISO 8583 DE55)                        | Required for Chip and Single Tap transactions                                                          |
| card_verification                  | O        | N    | 1       | Card verification.                                                                                               | `0` or `1`. If value is `1` then card verification is performed (and transaction_amount 0 is allowed). |
| country_code                       | O        | N    | 3       | ISO 3166-1 numeric three-digit country code.                                                                     |                                                                                                        |
| transaction_description            | O        | ANS  | 1 - 22  | Transaction description.                                                                                         |                                                                                                        |
| payment_transaction_type_indicator | O        | ANS  | 3       | [`Payment transaction type indicator`](#appendix--enum--payment-transaction-type-indicator).                     |                                                                                                        |
| parent_tx_id                       | C        | N    | 30      | Parent transaction ID.                                                                                           | Required for single tap second instance transactions.                                                  |
| promotion_code                     | C        | AN   | 6       | [`Promotion code`](#appendix--enum--promotion-codes).                                                            | Should be sent if merchant wants get available installment plans for this transaction.                 |
| digital_wallet_identifier          | O        | N    | 3       | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                       |                                                                                                        |
| account_type_from                  | O        | N    | 2       | Default value 'NA' [`Account type from`](#appendix--enum--account-type-from).                                    |                                                                                                        |
| account_type_to                    | O        | N    | 2       | Default value 'NA' [`Account type to`](#appendix--enum--account-type-to).                                        |                                                                                                        |
| reservation_duration               | C        | N    | 2       | Duration of reservation in days. Available range 01-99.                                                          | Required for Auto-Rental and Hotel reservations. VISA scheme only.                                     |
| accept_partial_approval            | C        | N    | 1       | Available values [0, 1].                                                                                         | If value is `1` then partial approvals will be accepted for this transactions.                         |

```json
{
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "300",
    "transmission_date_time": "20190522161748",
    "expiration_date": "3010",
    "mcc": "1001",
    "pos_entry_mode": "510101M03346",
    "pan_sequence_number": "005",
    "function_code": "100",
    "pos_condition_code": "1503",
    "track_2_data": "%YOUR_TRACK_2_DATA%",
    "rrn": "915000000099",
    "currency_code": "978",
    "additional_amounts": "0040978D000000000088",
    "icc_data ": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
    "country_code": "840"
}
```

### Response

| Parameter                                          | Notation | Type | Length  | Description                                                                  | Condition                            |
|:---------------------------------------------------|:---------|:-----|:--------|:-----------------------------------------------------------------------------|:-------------------------------------|
| tx_id                                              | M        | AN   | 30      | Transaction ID.                                                              |                                      |
| reject_reason_code                                 | M        | AN   | 6       | Reject reason codes according to Scheme specification.                       |                                      |
| card_number                                        | M        | N    | 13 - 19 | Card number.                                                                 |                                      |
| transaction_amount                                 | M        | N    | 1 - 12  | Transaction amount in cents.                                                 |                                      |
| transmission_date_time                             | M        | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                   |                                      |
| stan                                               | M        | AN   | 6       | System Trace Audit Number (STAN).                                            |                                      |
| rrn                                                | ME       | AN   | 12      | Unique Retrieval Reference Number (YDDDIDNNNNNN).                            |                                      |
| response_code                                      | M        | AN   | 2       | [`Response Codes`](#appendix--enum--response-codes).                         |                                      |
| currency_code                                      | M        | N    | 3       | ISO numeric currency code.                                                   |                                      |
| additional_amounts                                 | C        | AN   | 1 - 255 | [`Additional amounts`](#appendix--enum--additional-amounts).                 | Required for Cashback transaction    |
| authorization_id_response                          | O        | N    | 6       | Authorization identification response.                                       |                                      |
| installments_plans                                 | O        | LIST | -       | List of available installment plans. Maximum of 12 plans could be available. |                                      |
| installments_plans / installment_plan_id           | M        | N    | 1-2     | Installment plan ID.                                                         |                                      |
| installments_plans / number_of_installments        | M        | N    | 1-2     | Number of installments.                                                      |                                      |
| installments_plans / interest_rate                 | M        | N    | 5       | Interest rate.                                                               |                                      |
| installments_plans / installment_fee               | M        | N    | 12      | Installment fee.                                                             |                                      |
| installments_plans / annual_percentage_rate        | M        | N    | 5       | Annual percentage rate.                                                      |                                      |
| installments_plans / first_installment_amount      | M        | N    | 12      | First installment amount.                                                    |                                      |
| installments_plans / subsequent_installment_amount | M        | N    | 12      | Subsequent installment amount.                                               |                                      |
| installments_plans / total_amount_due              | M        | N    | 12      | Total amount due.                                                            |                                      |
| settlement_currency                                | M        | N    | 3       | Expected settlement currency (depends on Acquiring Bin configuration).       |                                      |
| settlement_amount                                  | M        | N    | 1-12    | Expected settlement amount (actual settlement amount may be different).      |                                      |
| scheme_error_description                           | O        | ANS  | 1-1024  | Scheme error description if request fails scheme side validation.            | Returned only for JCB scheme errors. |

```json
{
    "tx_id": "030001300117000005190531121252",
    "reject_reason_code": "00000",
    "card_number": "%YOUR_CARD_NUMBER%",
    "transaction_amount": "5000",
    "transmission_date_time": "20210122085432",
    "stan": "000062",
    "rrn": "000000000001",
    "response_code": "00",
    "currency_code": "978",
    "authorization_id_response": "373727",
    "settlement_currency": "978",
    "settlement_amount": "5000",
    "installments_plans": [
        {
            "installment_plan_id": "1",
            "number_of_installments": "12",
            "interest_rate": "01000",
            "installment_fee": "000000020000",
            "annual_percentage_rate": "02000",
            "first_installment_amount": "000000020000",
            "subsequent_installment_amount": "000000020000",
            "total_amount_due": "000000200000"
        },
        ...
        {
            "installment_plan_id": "12",
            "number_of_installments": "12",
            "interest_rate": "02010",
            "installment_fee": "000000020000",
            "annual_percentage_rate": "02000",
            "first_installment_amount": "000000020000",
            "subsequent_installment_amount": "000000020000",
            "total_amount_due": "000000200000"
        }
    ]
}
```

## Terminal config

| URL           | Method | Header parameter - `x-method` |
|:--------------|:-------|:------------------------------|
| /tapi/request | POST   | terminal_config               |

### Request

| Parameter              | Notation | Type | Length | Description                                |
|:-----------------------|:---------|:-----|:-------|:-------------------------------------------|
| transmission_date_time | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss). |

```json
{
    "transmission_date_time": "20190724102011"
}
```

### Response

| Parameter                                                                    | Type | Length  | Description                                                                                                                  |
|:-----------------------------------------------------------------------------|:-----|:--------|:-----------------------------------------------------------------------------------------------------------------------------|
| terminal_config_version                                                      | N    | 10      | Terminal config version                                                                                                      |
| device_config_version                                                        | N    | 10      | Device config version                                                                                                        |
| transmission_date_time                                                       | N    | 14      | Transmission date & time (YYYYMMDDhhmmss).                                                                                   |
| mcc                                                                          | ANS  | -       | Returned as array of all available merchant category codes for this terminal.                                                |
| pos_entry_mode                                                               | N    | 12      | [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode). Used as default device configuration values.  |
| function_code                                                                | N    | 3       | [`Function code`](#appendix--enum--function-code) or network international identifier (NII).                                 |
| pos_condition_code                                                           | N    | 4       | [`Point of service condition code`](#appendix--enum--point-of-service-condition-code).                                       |
| response_code                                                                | N    | 2       | [`Response Codes`](#appendix--enum--response-codes).                                                                         |
| card_acceptor_name_location                                                  | ANS  | 40      | [`Card acceptor name and location`](#appendix--enum--card-acceptor-name-and-location).                                       |
| currency_code                                                                | ANS  | -       | ISO numeric currency codes. Returned as array of all available currencies for this terminal.                                 |
| mac_tmk                                                                      | ANS  | 33      | MAC key under TMK.                                                                                                           |
| tpk_tmk                                                                      | ANS  | 33      | TPK key under TMK.                                                                                                           |
| tek_tmk                                                                      | ANS  | 33      | TEK key under TMK.                                                                                                           |
| tmk_klk                                                                      | ANS  | 33      | TMK key under KLK.                                                                                                           |
| terminal_password                                                            | ANS  | 1 - 255 | Terminal password.                                                                                                           |
| user_pass_mode                                                               | N    | 1       | [`Password mode`](#appendix--enum--password-mode)                                                                            |
| country_code                                                                 | N    | 3       | ISO 3166-1 numeric three-digit country code.                                                                                 |
| active                                                                       | N    | 1       | Terminal status. Available values '0', '1'.                                                                                  |
| device_config_data                                                           | OBJ  | -       | Additional terminal configuration fields.                                                                                    |
| device_config_data / terminal_type                                           | AN   | 3       | [`Terminal type`](#appendix--enum--terminal-type)                                                                            |
| device_config_data / receipt                                                 | OBJ  | -       | Salepoint information which will appear on receipt.                                                                          |
| device_config_data / receipt / logo                                          | ANS  | -       | Terminal base64 image (PNG format). Returns NULL if not present.                                                             |
| device_config_data / receipt / address                                       | ANS  | 1 - 255 | Full sale point address, it will be used on receipt.                                                                         |
| device_config_data / receipt / website                                       | ANS  | 1 - 255 | Sale point website url.                                                                                                      |
| device_config_data / receipt / phone                                         | ANS  | 1 - 255 | Sale point phone number.                                                                                                     |
| device_config_data / receipt / additional_info1                              | ANS  | 1 - 255 | Additional information for POS receipt.                                                                                      |
| device_config_data / receipt / additional_info2                              | ANS  | 1 - 255 | Additional information for POS receipt.                                                                                      |
| device_config_data / available_operations                                    | OBJ  | -       | Available operation object. Type and limits.                                                                                 |
| device_config_data / available_operations / type                             | AN   | 1 - 50  | [`Available operations`](#appendix--enum--available-operations).                                                             |
| device_config_data / available_operations / limits                           | OBJ  | -       | Terminal limits object.                                                                                                      |
| device_config_data / available_operations / limits / amount                  | OBJ  | -       | Amount object. Limits amount in cents.                                                                                       |
| device_config_data / available_operations / limits / amount / per_tx         | N    | 1 - 20  | Limit per transaction.                                                                                                       |
| device_config_data / available_operations / limits / amount / daily          | N    | 1 - 20  | Limit per day.                                                                                                               |
| device_config_data / available_operations / limits / amount / weekly         | N    | 1 - 20  | Limit per week.                                                                                                              |
| device_config_data / available_operations / limits / amount / monthly        | N    | 1 - 20  | Limit per month.                                                                                                             |
| device_config_data / available_operations / limits / count                   | OBJ  | -       | Count object. Transactions count per day.                                                                                    |
| device_config_data / available_operations / limits / count  / daily          | N    | 1 - 10  | Count per day.                                                                                                               |
| device_config_data / available_operations / limits / count  / weekly         | N    | 1 - 10  | Count per week.                                                                                                              |
| device_config_data / available_operations / limits / count  / monthly        | N    | 1 - 10  | Count per month.                                                                                                             |
| device_config_data / available_operations / limits / pin_floor_limits        | OBJ  | -       | Pin floor limits object. Transaction limits without pin per scheme in cents. [`Available schemes`](#appendix--enum--schemes) |
| device_config_data / available_operations / limits / pin_floor_limits / MC   | N    | 1 - 20  | Limit for scheme MC.                                                                                                         |
| device_config_data / available_operations / limits / pin_floor_limits / VISA | N    | 1 - 20  | Limit for scheme VISA.                                                                                                       |
| device_config_data / available_operations / limits / pin_floor_limits / UPI  | N    | 1 - 20  | Limit for scheme UPI.                                                                                                        |
| device_config_data / available_operations / limits / pin_floor_limits / JCB  | N    | 1 - 20  | Limit for scheme JCB.                                                                                                        |

```json
{
    "terminal_config_version": "1610694948",
    "device_config_version": "1610694947",
    "transmission_date_time": "20190724102011",
    "mcc": "[\"5999\",\"4829\",\"6532\",\"6533\",\"6536\",\"6537\",\"6538\"]",
    "pos_entry_mode": "700000S00110",
    "function_code": "100",
    "pos_condition_code": "1503",
    "response_code": "00",
    "card_acceptor_name_location": "The Shard SE1 9SG      London         GB",
    "currency_code": "[\"156\",\"208\",\"344\",\"826\",\"840\",\"946\",\"978\"]",
    "mac_tmk": "M7C52AF3A4EEAC89F68E189358089DE04",
    "tpk_tmk": "M7C52AF3A4EEAC89F68E189358089DE04",
    "tek_tmk": "M7C52AF3A4EEAC89F68E189358089DE04",
    "tmk_klk": "M7C52AF3A4EEAC89F68E189358089DE04",
    "terminal_password": "newPass123",
    "user_pass_mode": "0",
    "country_code": "826",
    "active": "1",
    "device_config_data": "{\"terminal_type\":null,\"receipt\":{\"logo\":null,\"address\":null,\"website\":null,\"phone\":null,\"additional_info1\":null,\"additional_info2\":null},\"available_operations\":[{\"type\":\"authorize\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"authorize_with_card_verification\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"authorize_with_cashback\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"authorize_with_partial_approval\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"balance_inquiry\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"cancel\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"capture\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"cash_disbursement\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"credit\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"credit_moneysend\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"credit_payment_transaction\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"final_authorize\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"inc_authorize\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"installment\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"p2p\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"partial_refund\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"partial_reverse\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"ping\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"pre_authorize\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"refund\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"reverse\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"sale\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"sale_with_cashback\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"sale_with_partial_approval\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}},{\"type\":\"terminal_config\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}}]}"
}
```

# Appendix
## Changelog


| Version | Date               | Updates                                                                                                                                                                                                                                                     |
|:--------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2.6.1   | August 22, 2022    | <!-- del --> Updated `transaction_data / transaction_purpose` description from `Transaction purpose details` to `Purpose details for Mastercard MoneySend transactions ` and added possible [`Transaction purposes`](#appendix--enum--transaction-purpose). |
| 2.6.0   | July 19, 2022      | <!-- tb --> Added new fields `account_type_from`, `account_type_to`, `reservation_duration`, `accept_partial_approval` for methods `authorize` and `sale`. Added new field `partial_reverse` for method `reverse`.                                          |
| 2.5.12  | April 19, 2022     | <!-- nl --> Changed `Incorrect acquiring routes configuration.` to `Processable currency is not active.` in [`Response Code`](#appendix--enum--response-codes).                                                                                             |
| 2.5.11  | February 24, 2022  | <!-- tj --> Added optional parameter `reversal_reason_code` to [`Reverse`](#actions--reverse--request).                                                                                                                                                     |
| 2.5.10  | February 18, 2022  | <!-- ts --> Added `force_offline_only` optional field to the request of [`Refund`](#actions--refund--request).                                                                                                                                              |
| 2.5.9   | February 7, 2022   | <!-- nl --> Changed naming from `additional_info_1` and `additional_info_2` to `additional_info1` and `additional_info2` in [`Terminal config`](#actions--terminal-config--request).                                                                        |
| 2.5.8   | February 7, 2022   | <!-- nl --> Updated `card_number` and `expiration_date` fields notations from mandatory to optional in [`Reverse`](#actions--reverse--request).                                                                                                             |
| 2.5.7   | January 27, 2022   | <!-- tj --> Updated [`Response Codes`](#appendix--enum--response-codes) and added new column `Action`.                                                                                                                                                      |
| 2.5.6   | January 27, 2022   | <!-- tj --> Updated [`Response Codes`](#appendix--notation--response-codes) and added new column `Action`.                                                                                                                                                  |
| 2.5.5   | January 26, 2022   | <!-- ts --> Added new `confirm_installment` call.                                                                                                                                                                                                           |
| 2.5.4   | December 21, 2021  | <!-- ts --> Added optional `scheme_error_description` field to the financial methods response.                                                                                                                                                              |
| 2.5.3   | December 13, 2021  | <!-- tb --> Updated available length for field `pin_data`.                                                                                                                                                                                                  |
| 2.5.2   | December 2, 2021   | <!-- nl --> Updated descriptions for 79, 82, 83 values in [`Response Codes`](#appendix--notation--response-codes)                                                                                                                                           |
| 2.5.1   | December 2, 2021   | <!-- tb --> Updated description for field `security_control_info`.                                                                                                                                                                                          |
| 2.5.0   | November 18, 2021  | <!-- tb --> Updated `rrn` field requirements for `reverse` action.                                                                                                                                                                                          |
| 2.4.1   | October 19, 2021   | <!-- ts --> Added additional values for [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator).                                                                                                                                  |
| 2.4.0   | October 19, 2021   | <!-- tb --> Added response fields: `settlement_amount`, `settlement_currency` for methods: `Authorize`, `Sale`, `Credit`, `P2P`, `Refund`, `Reverse`, `Cash Disbursement`.                                                                                  |
| 2.3.9   | September 27, 2021 | <!-- tb --> Added new field: `digital_wallet_identifier` for methods: `Authorize, Sale, Credit, P2P Transaction`.                                                                                                                                           |
| 2.3.8   | August 5, 2021     | <!-- ts --> Added `promotion_code` field to [`Authorize`](#actions--authorize--request) and [`Sale`](#actions--sale--request) request and additional installment fields to responses.                                                                       |
| 2.3.7   | August 27, 2021    | <!-- dv --> Updated `account_number_type`, `account_number` and `funding_source` requirement to *optional* and description for [`Credit Request`](#actions--credit--request) and [`P2P transaction Request`](#actions--p2p-transaction--request).           |
| 2.3.6   | June 18, 2021      | <!-- dv --> Removed `mcc` from [`P2P Transaction`](#actions--p2p-transaction--request).                                                                                                                                                                     |
| 2.3.5   | June 16, 2021      | <!-- dv --> Renamed [`Funding source`](#appendix--enum--funding-source) item message                                                                                                                                                                        |
| 2.3.4   | June 14, 2021      | <!-- dv --> Updated `account_number` length and added `account_number_type` for methods `credit`, `p2p_transaction`.                                                                                                                                        |
| 2.3.3   | June 07, 2021      | <!-- dv --> Marked deprecated by Mastercard [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator) values.                                                                                                                       |
| 2.3.2   | May 12, 2021       | <!-- tb --> Added new method `P2P transaction`.                                                                                                                                                                                                             |
| 2.3.1   | May 12, 2021       | <!-- tb --> Updated `parent_tx_id` usage for method `Reverse` - Initial (pre-authorization) tx_id should be provided, when reversing incremental authorizations.                                                                                            |
| 2.3.0   | April 22, 2021     | <!-- nl --> Transaction amount values changed from 12 digits to 1 - 12 digits to show standard amounts in cents.                                                                                                                                            |
| 2.2.1   | April 14, 2021     | <!-- tb --> Added new values to [`Point of service entry mode`](#appendix--enum--point-of-service-entry-mode).                                                                                                                                              |
| 2.2.0   | March 23, 2021     | <!-- nl --> Updated [`Security`](#appendix--security--cryptography) encryption/decryption examples and descriptions.                                                                                                                                        |
| 2.1.0   | March 12, 2020     | <!-- tb --> Authentication fields has been removed from request body.                                                                                                                                                                                       |
| 2.0.0   | January 20, 2020   | <!-- tb --> Initial version.                                                                                                                                                                                                                                |

## Notation
### Parameter requirement

| Notation | Meaning                                                                                                                                                                              |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| M        | Mandatory                                                                                                                                                                            |
| O        | Optional                                                                                                                                                                             |
| C        | Conditional                                                                                                                                                                          |
| ME       | Mandatory Echo. The data element will be present in a response message and will contain the same value from the request.                                                             |
| CE       | Conditional Echo. The data element will be present in response message only if it was present in request message. If it was present it will contain the same value from the request. |

## Enum
### Status value

| Parameter | Value               |
|:----------|:--------------------|
| Status    | `success` / `error` |

### Function code

| Parameter | Value                                                                                                                                                                     |
|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 100       | The code which should be assigned for sale, balance, cash advance, cashback, installment, statement, PIN setup, PIN change, eligibility check, and quasi cash operations. |
| 101       | Preauthorization                                                                                                                                                          |
| 107       | Incremental authorize                                                                                                                                                     |
| 202       | Final authorize                                                                                                                                                           |
| 201       | Full refund                                                                                                                                                               |
| 202       | Partial refund                                                                                                                                                            |
| 400       | Full reverse                                                                                                                                                              |
| 401       | Partial reverse                                                                                                                                                           |

### Point of service condition code

| Parameter | Value                                                                                                                                                                                                   |
|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1503      | The code should be assigned for sale, balance, cash advance, cash advance, cashback, statement, PIN setup, PIN change, A2C, C2A, C2C payment, fee calculation eligibility check, quasi cash operations. |
| 1777      | Incremental authorize                                                                                                                                                                                   |
| 1806      | Preauthorization                                                                                                                                                                                        |
| 2000      | Refund                                                                                                                                                                                                  |
| 4000      | Reverse                                                                                                                                                                                                 |

### Password mode

| Password mode | Meaning                                          |
|:--------------|--------------------------------------------------|
| 0             | No password.                                     |
| 1             | Password should be entered on every transaction. |
| 2             | Password should be entered once per day.         |

### Terminal type

| Terminal type | Meaning                                              |
|:--------------|------------------------------------------------------|
| 21h           | Attended Terminal(Online Only).                      |
| 22h           | Attended Terminal(Offline with online capabilities). |

### Schemes

| Scheme     | Short name |
|:-----------|------------|
| Mastercard | MC         |
| Visa       | VISA       |
| JCB        | JCB        |
| UnionPay   | UPI        |

### Funding source

| Code | Message              |
|:-----|:---------------------|
| 01   | Credit               |
| 02   | Debit                |
| 03   | Prepaid              |
| 04   | Deposit Account      |
| 05   | Mobile Money Account |
| 06   | Cash                 |
| 07   | Other                |


### Transaction purpose

| Code  | Message                               |
|:------|:--------------------------------------|
| 00    | Family support                        |
| 01    | Regular Labor Transfers (expatriates) |
| 02    | Travel & Tourism                      |
| 03    | Education                             |
| 04    | Hospitalization & Medical Treatment   |
| 05    | Emergency Need                        |
| 06    | Savings                               |
| 07    | Gifts                                 |
| 08    | Other                                 |
| 09    | Salary                                |
| 10    | Crowd lending                         |
| 11    | Crypto currency                       |
| 12-15 | Reserved                              |

### Account number Type
| Value | Description                                                |
|:------|:-----------------------------------------------------------|
| 00    | Other                                                      |
| 01    | RTN + Bank Account                                         |
| 02    | IBAN                                                       |
| 03    | Card Account                                               |
| 04    | Email                                                      |
| 05    | Phone Number                                               |
| 06    | Bank account number (BAN) + Bank Identification Сode (BIC) |
| 07    | Wallet ID                                                  |
| 08    | Social Network ID                                          |

### Available operations

| Name                             | Tag                              |
|:---------------------------------|:---------------------------------|
| Authorize                        | authorize                        |
| Pre authorize                    | pre_authorize                    |
| Inc authorize                    | inc_authorize                    |
| Final authorize                  | final_authorize                  |
| Refund                           | refund                           |
| Partial refund                   | partial_refund                   |
| Reverse                          | reverse                          |
| Partial reverse                  | partial_reverse                  |
| Cancel                           | cancel                           |
| Sale                             | sale                             |
| Capture                          | capture                          |
| Credit (payment transaction)     | credit_payment_transaction       |
| Credit (moneysend)               | credit_moneysend                 |
| P2P                              | p2p                              |
| Authorize with partial approval  | authorize_with_partial_approval  |
| Sale with partial approval       | sale_with_partial_approval       |
| Authorize with card verification | authorize_with_card_verification |
| Ping                             | ping                             |
| Authorize with OTP               | authorize_with_otp               |
| Authorize with 3DS               | authorize_with_3ds               |
| Sale with OTP                    | sale_with_otp                    |
| Sale with 3DS                    | sale_with_3ds                    |
| Authorize with AVS check         | authorize_with_avs_check         |
| Sale with AVS check              | sale_with_avs_check              |
| Authorize recurring              | authorize_recurring              |
| Sale recurring                   | sale_recurring                   |
| Cancel recurring                 | cancel_recurring                 |
| Authentication                   | authentication                   |
| Authorize with cashback          | authorize_with_cashback          |
| Sale with cashback               | sale_with_cashback               |
| Balance inquiry                  | balance_inquiry                  |
| Cash disbursement                | cash_disbursement                |
| Terminal config                  | terminal_config                  |
| Authorize with installments      | authorize_with_installments      |
| Sale with installments           | sale_with_installments           |
| Confirm installment              | confirm_installment              |

### Digital wallet identifier

| Value | Description                    |
|:------|:-------------------------------|
| 101   | Masterpass by Mastercard       |
| 103   | Apple pay                      |
| 216   | Google pay                     |
| 217   | Samsung pay                    |
| 327   | Merchant tokenization platform |

### Account type from

| Value | Description       |
|:------|:------------------|
| NA    | Not specified     |
| SA    | Savings account   |
| CA    | Checking account  |
| CR    | Credit account    |
| UN    | Universal account |

### Account type to

| Value | Description       |
|:------|:------------------|
| NA    | Not specified     |
| SA    | Savings account   |
| CA    | Checking account  |
| CR    | Credit account    |
| UN    | Universal account |

### Response codes

| Response Codes | Action                | Description                                                                                                                                  |
|:---------------|:----------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| 00             | Approve               | Approved or completed successfully                                                                                                           |
| 01             | Decline               | Refer to card issuer                                                                                                                         |
| 02             | Decline               | Refer to card issuer, special condition                                                                                                      |
| 03             | Decline               | Invalid merchant                                                                                                                             |
| 04             | Decline, pick up card | Capture card                                                                                                                                 |
| 05             | Decline               | Do not honor                                                                                                                                 |
| 06             | Decline               | Error                                                                                                                                        |
| 07             | Decline, pick up card | Pick up card, special condition (fraud account)                                                                                              |
| 08             | Approve               | Honor with ID                                                                                                                                |
| 10             | Approve               | Partial Approval                                                                                                                             |
| 11             | Approve               | Approved (V.I.P)                                                                                                                             |
| 12             | Decline               | Invalid transaction                                                                                                                          |
| 13             | Decline               | Invalid amount                                                                                                                               |
| 14             | Decline               | Invalid card number                                                                                                                          |
| 15             | Decline               | Invalid issuer                                                                                                                               |
| 16             | Approve               | Approved to update track 3                                                                                                                   |
| 17             | Decline               | Decline. Customer cancellation                                                                                                               |
| 19             | Decline               | Re-enter transaction                                                                                                                         |
| 20             | Decline               | Update the QRC                                                                                                                               |
| 21             | Decline               | Card not initialized                                                                                                                         |
| 22             | Decline               | Suspected malfunction; related transaction error                                                                                             |
| 25             | Decline               | Unable to locate original transaction                                                                                                        |
| 28             | Decline               | File is temporarily unavailable for update or inquiry                                                                                        |
| 30             | Decline               | Format error                                                                                                                                 |
| 32             | Decline               | Decline. Partial reversal                                                                                                                    |
| 33             | Decline               | Expired Card - Pick Up                                                                                                                       |
| 34             | Decline, pick up card | Fraud                                                                                                                                        |
| 38             | Decline               | PIN try limit exceeded                                                                                                                       |
| 39             | Decline               | No credit account                                                                                                                            |
| 40             | Decline               | Function requested is not supported                                                                                                          |
| 41             | Decline, pick up card | Lost card                                                                                                                                    |
| 43             | Decline, pick up card | Stolen card                                                                                                                                  |
| 45             | Decline               | Fallback transaction is not allowed                                                                                                          |
| 51             | Decline               | Insufficient funds/over credit limit                                                                                                         |
| 52             | Decline               | No Cheque Account                                                                                                                            |
| 53             | Decline               | No Savings Account                                                                                                                           |
| 54             | Decline               | Expired card                                                                                                                                 |
| 55             | Decline               | Invalid PIN                                                                                                                                  |
| 57             | Decline               | Transaction not permitted to issuer/cardholder                                                                                               |
| 58             | Decline               | Transaction not permitted to acquirer/terminal                                                                                               |
| 59             | Decline               | Suspected Fraud                                                                                                                              |
| 61             | Decline               | Exceeds withdrawal amount limit                                                                                                              |
| 62             | Decline               | Restricted card                                                                                                                              |
| 63             | Decline               | Security violation                                                                                                                           |
| 64             | Decline               | Original transaction amount error                                                                                                            |
| 65             | Decline               | Exceeds withdrawal count limit OR Identity Check Soft-Decline of EMV 3DS Authentication (merchant should resubmit authentication with 3DSv1) |
| 68             | Decline               | Response Received Too Late                                                                                                                   |
| 70             | Decline               | Contact Card Issuer                                                                                                                          |
| 71             | Decline               | PIN Not Changed                                                                                                                              |
| 74             | Decline               | Different value than that used for PIN encryption errors                                                                                     |
| 75             | Decline               | Allowable number of PIN tries exceeded                                                                                                       |
| 76             | Decline               | Invalid/nonexistent “To Account” specified                                                                                                   |
| 77             | Decline               | Invalid/nonexistent “From Account” specified                                                                                                 |
| 78             | Decline               | Invalid/nonexistent account specified (general)                                                                                              |
| 79             | Decline               | Life cyle (Mastercard use only)	                                                                                                            |
| 80             | Decline               | Visa transactions: credit issuer unavailable. Private label: invalid date                                                                    |
| 81             | Decline               | Domestic Debit Transaction Not Allowed (Regional use only)                                                                                   |
| 82             | Decline               | Policy (Mastercard use only)                                                                                                                 |
| 83             | Decline               | Fraud/Security (Mastercard use only)                                                                                                         |
| 84             | Decline               | Invalid Authorization Life Cycle                                                                                                             |
| 85             | Approve               | Not declined                                                                                                                                 |
| 86             | Decline               | PIN Validation not possible                                                                                                                  |
| 87             | Approve               | Purchase Amount Only, No Cash Back Allowed                                                                                                   |
| 88             | Decline               | Cryptographic failure                                                                                                                        |
| 89             | Decline               | Unacceptable PIN - Transaction Declined - Retry                                                                                              |
| 90             | Decline               | Cutoff is in process                                                                                                                         |
| 91             | Decline               | Authorization System or issuer system inoperative                                                                                            |
| 92             | Decline               | Unable to route transaction                                                                                                                  |
| 93             | Decline               | Transaction cannot be completed; Violation of law                                                                                            |
| 94             | Decline               | Duplicate transmission detected                                                                                                              |
| 96             | Decline               | System error                                                                                                                                 |
| 97             | Decline               | ATM/POS terminal number can not be located                                                                                                   |
| 98             | Decline               | Issuer response not received by CUPS                                                                                                         |
| 99             | Decline               | PIN block error                                                                                                                              |
| A0             | Decline               | MAC failed                                                                                                                                   |
| A2             | Approve               | Successful transaction with fault                                                                                                            |
| A3             | Decline               | Account not found in Transfer-in side                                                                                                        |
| A4             | Approve               | Successful transaction with fault                                                                                                            |
| A5             | Approve               | Successful transaction with fault                                                                                                            |
| A6             | Approve               | Successful transaction with fault                                                                                                            |
| A7             | Decline               | Security processing failure                                                                                                                  |
| B1             | Decline               | No arrears (transaction receipt not printed)                                                                                                 |
| C1             | Decline               | Illegal status of Acquirer                                                                                                                   |
| D1             | Decline               | Incorrect IIN                                                                                                                                |
| D2             | Decline               | Date error                                                                                                                                   |
| D3             | Decline               | Invalid file type                                                                                                                            |
| D4             | Decline               | File processed                                                                                                                               |
| D5             | Decline               | No such file                                                                                                                                 |
| D6             | Decline               | Not supported by receiver                                                                                                                    |
| D7             | Decline               | File locked                                                                                                                                  |
| D8             | Decline               | Unsuccessful                                                                                                                                 |
| D9             | Decline               | Incorrect file length                                                                                                                        |
| DA             | Decline               | File compression error                                                                                                                       |
| DB             | Decline               | File name error                                                                                                                              |
| DC             | Decline               | File cannot be received                                                                                                                      |
| F1             | Decline               | File record format error                                                                                                                     |
| F2             | Decline               | File record repeat                                                                                                                           |
| F3             | Decline               | File record not existing                                                                                                                     |
| F4             | Decline               | File record error                                                                                                                            |
| 0A             | Decline               | Approval with load                                                                                                                           |
| 1A             | Decline               | Strong Customer Authentication (SCA) required (VISA specific)                                                                                |
| N0             | Decline               | Force STIP                                                                                                                                   |
| N1             | Decline               | Items not on Bankbook beyond limit, declined                                                                                                 |
| N3             | Decline               | Cash service not available                                                                                                                   |
| N4             | Decline               | Cashback request exceeds issuer limit                                                                                                        |
| N7             | Decline               | Decline for CVV2 failure                                                                                                                     |
| N8             | Decline               | Transaction amount exceeds pre-authorized approval amount                                                                                    |
| P1             | Decline               | Contact number cannot be found in issuer's system                                                                                            |
| P2             | Decline               | Invalid billing information                                                                                                                  |
| P5             | Decline               | PIN change/unblock request declined                                                                                                          |
| P6             | Decline               | Unsafe PIN                                                                                                                                   |
| Q1             | Decline               | Card authentication failed                                                                                                                   |
| R0             | Decline               | Stop payment order                                                                                                                           |
| R1             | Decline               | Revocation of authorization order                                                                                                            |
| R2             | Decline               | Transaction does not qualify for Visa PIN                                                                                                    |
| R3             | Decline               | Revocation of all authorizations order                                                                                                       |
| Y1             | Approve               | Offline transaction is successful                                                                                                            |
| Y3             | Approve               | Unable to go online. Offline transaction is successful                                                                                       |
| Z1             | Decline               | Offline transaction fails                                                                                                                    |
| Z3             | Decline               | Unable to go online; Declined                                                                                                                |

### Status code

| Status Code | Description                                                                              |
|:------------|:-----------------------------------------------------------------------------------------|
| 000         | Success                                                                                  |
| 001         | Invalid credentials.                                                                     |
| 002         | Invalid message type.                                                                    |
| 003         | Unknown field submitted: __FIELD__.                                                      |
| 004         | Invalid data: missing required field: __FIELD__.                                         |
| 005         | Invalid transaction type.                                                                |
| 006         | Card holder billing address data is required when performing AVS check.                  |
| 007         | Card PIN is required for online PIN verification.                                        |
| 008         | Invalid method.                                                                          |
| 009         | Transaction not found. Please send initial authorize transaction id.                     |
| 010         | Amount to be captured is greater than authorized amount.                                 |
| 011         | Terminal is not supporting partial approvals.                                            |
| 012         | Capture amount must be greater than zero.                                                |
| 013         | Authorize is in state which could not be captured.                                       |
| 014         | Credit type indicator is required.                                                       |
| 015         | Wrong authorize type given.                                                              |
| 016         | Method is not allowed.                                                                   |
| 017         | Merchant category code is not enabled.                                                   |
| 018         | Not all payment facilitator data is submitted.                                           |
| 019         | Not all sub merchant data is submitted.                                                  |
| 020         | Sub merchant country must be three-character alphabetic Country Code.                    |
| 021         | Sub merchant must be two-character alphabetic State Code.                                |
| 022         | Local transaction time and date is required.                                             |
| 023         | Amount is required.                                                                      |
| 024         | Length of transaction descriptor is exceeded.                                            |
| 025         | Unknown method.                                                                          |
| 026         | Decryption failed.                                                                       |
| 027         | Wrong parent transaction message type.                                                   |
| 028         | Can not refund transaction which do not have captured or cleared state.                  |
| 029         | Refund amount must be greater than zero.                                                 |
| 030         | Amount to be refunded is greater than captured amount.                                   |
| 031         | Wrong message type for refund.                                                           |
| 032         | Can not capture because of bad response code on authorize.                               |
| 033         | Can not refund because transaction is already refunded.                                  |
| 034         | Card is being processed.                                                                 |
| 035         | Authorize is already cancelled.                                                          |
| 036         | Authorize expired.                                                                       |
| 037         | Can not reverse captured transaction.                                                    |
| 038         | Reverse amount must be greater than zero.                                                |
| 039         | Wrong message type for reverse.                                                          |
| 040         | Amount for balance inquiry must be zero.                                                 |
| 041         | Wrong PAN entry mode.                                                                    |
| 042         | Wrong remote payments program.                                                           |
| 043         | Parent transaction ID is not required.                                                   |
| 044         | End date is greater than start date.                                                     |
| 045         | Invalid value for field unique_transaction_reference                                     |
| 046         | Invalid value for field additional_message                                               |
| 047         | Invalid value for field funding_source                                                   |
| 048         | Invalid value for field participation_id                                                 |
| 049         | Invalid value for field transaction_purpose                                              |
| 050         | Invalid value for field language_identification                                          |
| 051         | Invalid value for field language_data                                                    |
| 052         | Invalid value for field first_name                                                       |
| 053         | Invalid value for field middle_name                                                      |
| 054         | Invalid value for field last_name                                                        |
| 055         | Invalid value for field street_address                                                   |
| 056         | Invalid value for field city                                                             |
| 057         | Invalid value for field state_code                                                       |
| 058         | Invalid value for field country                                                          |
| 059         | Invalid value for field postal_code                                                      |
| 060         | Invalid value for field phone_number                                                     |
| 061         | Invalid value for field date_of_birth                                                    |
| 062         | Invalid value for field account_number                                                   |
| 063         | Invalid value for field identification_type                                              |
| 064         | Invalid value for field identification_number                                            |
| 065         | Invalid value for field identification_country_code                                      |
| 066         | Invalid value for field identification_expiration_date                                   |
| 067         | Invalid value for field nationality                                                      |
| 068         | Invalid value for field country_of_birth                                                 |
| 069         | Card processing is forbidden                                                             |
| 070         | Recurring payment is not allowed                                                         |
| 071         | Time gap between recurring payment requests is too low                                   |
| 072         | Invalid value for field p2p_transaction_reference_data                                   |
| 073         | Transaction amount must be greater then zero                                             |
| 074         | Sale Point account not found                                                             |
| 075         | Limit validation failed                                                                  |
| 076         | Merchant is not active                                                                   |
| 077         | Terminal is not active                                                                   |
| 078         | Sale point is not active                                                                 |
| 079         | Reverse amount must be equal to authorize amount.                                        |
| 080         | Reverse amount must be less or equal to authorize amount.                                |
| 081         | Reverse operation is allowed only for last transaction.                                  |
| 082         | Reverse period has expired.                                                              |
| 083         | Reverse authorize is not valid.                                                          |
| 084         | Only last transaction can be reversed.                                                   |
| 085         | Transaction has been already reversed.                                                   |
| 086         | Recurring payment not found.                                                             |
| 087         | PAN is invalid                                                                           |
| 088         | Card expiry year is invalid                                                              |
| 089         | Card expiry month is invalid                                                             |
| 090         | Transaction currency is invalid                                                          |
| 091         | Invalid request data.                                                                    |
| 092         | Merchant api method (__METHOD__) is currently disabled.                                  |
| 093         | Merchant api method (__METHOD__) not found.                                              |
| 094         | Terminal (__TERMINAL__) does not have permission to access method (__METHOD__).          |
| 095         | Transaction descriptor contains invalid characters.                                      |
| 096         | Bad original request response code.                                                      |
| 097         | Api version is invalid                                                                   |
| 098         | Merchant mcc (__MCC__) not found.                                                        |
| 099         | Bin range not found.                                                                     |
| 100         | Request is received for processing.                                                      |
| 101         | MCC value (__MCC__) is not valid.                                                        |
| 102         | Invalid receiver account number.                                                         |
| 103         | Refund currency is not the same as transactions currency                                 |
| 104         | Cannot reverse sent for clearing transactions                                            |
| 105         | Recurring payment was not initiated                                                      |
| 106         | Funding source is not valid for account: (__ACCOUNT__).                                  |
| 107         | There was an error in P2P transaction processing.                                        |
| 108         | PRE authorize currency does not match                                                    |
| 109         | This type of operation is not available for this type of card                            |
| 110         | Reverse currency should match original authorize currency                                |
| 111         | Parent transaction not found.                                                            |
| 112         | Cancelled transaction cannot be reversed.                                                |
| 113         | Both date_updated and id_from should be provided if one of them is not 0                 |
| 114         | Only initial authorize can be captured                                                   |
| 115         | Local transaction time and/or date format is incorrect.                                  |
| 116         | Card has expired                                                                         |
| 117         | Either card_token or card details should be provided. You cannot provide both.           |
| 118         | Invalid date provided. The date format should be `Y-m-d H:i:s`.                          |
| 119         | From id must be of type integer.                                                         |
| 120         | Authorization not found.                                                                 |
| 121         | Value is too long for field: (__FIELD__)                                                 |
| 122         | Value is invalid for field: (__FIELD__)                                                  |
| 123         | Error occurred, please try again later. If error persists please contact support.        |
| 124         | Source_of_funds value (__VALUE__) is not allowed for this merchant                       |
| 125         | Duplicated request is not allowed.                                                       |
| 126         | Transaction is being processed.                                                          |
| 127         | Parent transaction ID is required for this operation.                                    |
| 128         | There was an error in INIT_S3D processing.                                               |
| 129         | Transaction not found.                                                                   |
| 130         | Second presentment has already been created for this transaction.                        |
| 131         | Value is too short for field: (__FIELD__)                                                |
| 132         | Value is invalid for field: (__FIELD__). Valid values: (__VALID_VALUES__).               |
| 133         | Field: (__FIELD__) length is invalid.                                                    |
| 134         | Cancel is not allowed for this procedure.                                                |
| 135         | Wrong procedure for cancel                                                               |
| 136         | Unknown field submitted: __FIELD__                                                       |
| 137         | (__KEYTYPE__) key not found.                                                             |
| 138         | Security related control information is required for online PIN verification             |
| 139         | Terminal pan entry mode not found                                                        |
| 140         | Terminal pan entry mode is not enabled                                                   |
| 141         | Terminal guid is incorrect                                                               |
| 142         | Field: (__FIELD__) can not be empty.                                                     |
| 143         | Actual authorize not found.                                                              |
| 144         | Terminal not found.                                                                      |
| 145         | __ENTITY__ not found.                                                                    |
| 146         | Terminal type must be physical.                                                          |
| 147         | Field (__FIELD__) is required.                                                           |
| 148         | Pin block length is not valid                                                            |
| 149         | Encryption failed.                                                                       |
| 150         | Unknown method.                                                                          |
| 151         | Card data should match with parent transaction card data                                 |
| 152         | S3D error: Issuer or cardholder not enrolled. S3D error status code: 2                   |
| 153         | S3D error: Not in cache. S3D error status code: 3                                        |
| 154         | S3D: Attempt. S3D status code: 4                                                         |
| 155         | S3D error: Authentication unavailable. S3D error status code: 5                          |
| 156         | S3D error: 3-D Secure Error. S3D error status code: 6                                    |
| 157         | S3D error: Fraud Score blocked. S3D error status code: 8                                 |
| 158         | S3D error: Pending transaction. S3D error status code: 9                                 |
| 159         | S3D error: Skip device case. S3D error status code: 80                                   |
| 160         | S3D error: Network error. S3D error status code: 91                                      |
| 161         | S3D error: Directory error. S3D error status code: 92                                    |
| 162         | S3D error: Configuration errors. S3D error status code: 93                               |
| 163         | S3D error: Input error. S3D error status code: 94                                        |
| 164         | S3D error: No directory found for PAN/cardtype. S3D error status code: 95                |
| 165         | S3D error: No version 2 directory found for PAN/cardtype. S3D error status code: 96      |
| 166         | S3D error: System error. S3D error status code: 99                                       |
| 167         | Key type (__KEY__) is not implemented                                                    |
| 168         | Active key not found                                                                     |
| 169         | Cancel batch not provided                                                                |
| 170         | 3ds authentication not found.                                                            |
| 171         | An array of cards must be provided                                                       |
| 172         | Invalid data. Invalid card details.                                                      |
| 173         | Not registered in card update program.                                                   |
| 174         | Card Update Batch was not found                                                          |
| 175         | Invalid field (__FIELD__) value. Value must be unique.                                   |
| 176         | Authentication request id must be provided.                                              |
| 177         | Card or issuer is not enrolled in 3ds.                                                   |
| 178         | Strong customer authentication required.                                                 |
| 179         | Card data must be the same as in original transaction.                                   |
| 180         | Authorize could not be incremented because of the current authorize state                |
| 181         | Authorize could not be finalize because of the current authorize state                   |
| 182         | Could not proceed with your request because of bad response code on authorize            |
| 183         | Mpi client configuration error                                                           |
| 184         | First incoming authorize not found                                                       |
| 185         | S3D error: Authentication failed. S3D error status code: 0                               |
| 186         | BIN range is not available at the moment. Try again, or contact support.                 |
| 187         | S3D error: Transaction not found. S3D error status code: 97                              |
| 196         | Cancel period has expired                                                                |
| 197         | Original authorization is recurring, subsequent requests must also be sent as recurring. |
| 198         | Incorrect type passed for field __FIELD__. Expected: __TYPE__.                           |
| 199         | Original authorize not found.                                                            |
| 200         | Original authorize response not found.                                                   |
| 201         | Original merchant request not found                                                      |
| 202         | Value is invalid for field "__FIELD__". Valid values is in range __RANGE_VALUES__        |
| 203         | Invalid date_from provided. The date format should be Y-m-d                              |
| 204         | Invalid date_to provided. The date format should be Y-m-d                                |
| 205         | Invalid country ISON                                                                     |
| 206         | Partial reverse not supported by schema.                                                 |
| 207         | Merchant (__MERCHANT__) does not have permission to access method (__METHOD__).          |
| 208         | Sale point (__SALEPOINT__) does not have permission to access method (__METHOD__).       |
| 209         | Request decryption failed.                                                               |
| 210         | Response encryption failed.                                                              |
| 211         | Request message should have appropriate headers and be encrypted.                        |
| 212         | Device not found                                                                         |
| 213         | Bin range does not support this mcc (__MCC__)                                            |
| 214         | Sign header not provided                                                                 |
| 215         | Request should contain valid json                                                        |
| 216         | Risk validation did not pass                                                             |
| 217         | MAI transaction availability check declined transaction.                                 |
| 218         | MAI processing error.                                                                    |
| 219         | MAI not configurated.                                                                    |
| 220         | Processable currency is not active.                                                      |
| 221         | Device serial number is incorrect.                                                       |
| 222         | Method "cancel" is not implemented for JCB scheme                                        |
| 223         | Amount must be greater than zero                                                         |
| 224         | Serial number is already in use.                                                         |
| 225         | Invalid card token                                                                       |
| 226         | Amount must be set to zero in card verification requests                                 |
| 229         | Device GUID and serial_number is already registered.                                     |
| 230         | Guid is already in use.                                                                  |
| 231         | Incorrect device configuration_status.                                                   |
| 232         | Incorrect apin.                                                                          |
| 233         | Device is already activated.                                                             |
| 234         | Merchant does not have access to selected device.                                        |
| 235         | Incorrect message.                                                                       |
| 236         | Terminal type must be virtual.                                                           |
| 237         | Invalid field  '__FIELD__' type. All fields values should be sent as string.             |
| 238         | MAI sending error.                                                                       |
| 239         | Second instance for single-tap transaction already exists.                               |
| 240         | PIN is required for second instance of single-tap transaction.                           |
| 241         | parent_tx_id is required for second instance of single-tap transaction.                  |
| 242         | Invalid card security code format.                                                       |
| 243         | Sale reversal is not allowed for JCB scheme                                              |
| 244         | Recurring frequency and recurring end date should be numeric.                            |
| 245         | Provide both recurring frequency and recurring end date.                                 |
| 246         | Partial reverse amount must be lower then original authorize amount.                     |
| 247         | Authentication already used.                                                             |
| 248         | Device is not active.                                                                    |
| 249         | Credit refund is not allowed for JCB scheme                                              |
| 250         | No access to resource '__RESOURCE__'.                                                    |
| 251         | Merchant category code:'__VALUE__' is not allowed for credit operation.                  |
| 252         | Transaction already added to queue for purge                                             |
| 253         | Refund is not allowed for credit transactions.                                           |
| 254         | Can not purge captured transaction.                                                      |
| 255         | Can not purge reversed transaction.                                                      |
| 256         | Terminal host device not found                                                           |
| 223         | Amount must be greater than zero                                                         |
| 225         | Invalid card token                                                                       |
| 226         | Amount must be set to zero in card verification requests                                 |
| 257         | Connection problems with the scheme occurred                                             |
| 258         | Callback url not present                                                                 |
| 303         | Acquirer channel not found.                                                              |
| 304         | Acquirer does not have channel assigned.                                                 |
| 315         | Offline refund is not available for scheme.                                              |
| 318         | Currency rate not available.                                                             |
| 400         | Error in processing.                                                                     |
| 401         | Bad request.                                                                             |
| 402         | Invalid token.                                                                           |
| 403         | Worker API error.                                                                        |
| 404         | Custom.                                                                                  |
| 405         | Unknown response status.                                                                 |
| 406         | Not Found Error.                                                                         |
| 600         | Processor error.                                                                         |
| 601         | Processor error unknown.                                                                 |
| 800         | Callback error.                                                                          |
| 994         | Gateway error (__ERROR_DESCRIPTION__)                                                    |
| 996         | Your request has been canceled.                                                          |
| 997         | There is a problem in your API configuration.                                            |
| 998         | Exception                                                                                |
| 999         | Unknown error                                                                            |

### Additional amounts

Field format: ISO 8583 (DE54)

| Supported amount type | Description      |
|:----------------------|:-----------------|
| 40                    | Amount Cash Back |


### Track 2 data

Track 2 data field is the information encoded on track 2 of the card magnetic stripe as defined in the ISO 7813
specification, including data element separators but excluding beginning and ending sentinels and longitudinal
redundancy check (LRC) characters as defined therein.

### Card acceptor name and location.

| Position | Field   |
|:---------|:--------|
| 1-23     | Street  |
| 24-36    | City    |
| 37-38    | State   |
| 39-40    | Country |

### Point of service entry mode

| Position | Field                                | Description                                                                          | Available values                                                                            |
|:---------|:-------------------------------------|:-------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------|
| 1        | Card data input capability           | Indicates the primary means of getting the information on the card into the terminal | 0 - unknown                                                                                 |
|          |                                      |                                                                                      | 2 - magnetic stripe                                                                         |
|          |                                      |                                                                                      | 3 - bar code                                                                                |
|          |                                      |                                                                                      | 4 - OCR (Optical Character Recognition) coding reader                                       |
|          |                                      |                                                                                      | 5 - smart card read (with or without magnetic stripe read capability)                       |
|          |                                      |                                                                                      | 6 - key entry only (no smart card read and no magnetic stripe read capability)              |
|          |                                      |                                                                                      | A - contactless magnetic-stripe read                                                        |
|          |                                      |                                                                                      | M - contactless smart card read                                                             |
| 2        | Cardholder authentication capability | Indicates the primary means of verifying the cardholder at the terminal              | 0 - no electronic authentication (signature based transactions or no authentication at all) |
|          |                                      |                                                                                      | 1 - PIN verification (off-line and/or on-line)                                              |
|          |                                      |                                                                                      | 2 - electronic signature analysis                                                           |
|          |                                      |                                                                                      | 5 - electronic authentication inoperative (i.e. PIN pad damaged)                            |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 3        | Card capture capability              | Indicates whether or not the terminal has the ability to capture a card              | 0 - none                                                                                    |
|          |                                      |                                                                                      | 1 - capture                                                                                 |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 4        | Operating environment                | Indicates if the terminal is attended by the card acceptor and its location          | 1 - on premises of card acceptor, attended                                                  |
|          |                                      |                                                                                      | 2 - on premises of card acceptor, unattended                                                |
|          |                                      |                                                                                      | 3 - off premises of card acceptor, attended                                                 |
|          |                                      |                                                                                      | 4 - off premises of card acceptor, unattended                                               |
|          |                                      |                                                                                      | 5 - on premises of card holder, unattended                                                  |
|          |                                      |                                                                                      | 6 - off premises of cardholder, unattended                                                  |
|          |                                      |                                                                                      | 9 - unknown (not suggested)                                                                 |
|          |                                      |                                                                                      | S - CAT (Cardholder Activated Terminal) level 1, unattended                                 |
|          |                                      |                                                                                      | T - CAT level 2, unattended                                                                 |
|          |                                      |                                                                                      | U - CAT level 3, unattended                                                                 |
|          |                                      |                                                                                      | V - CAT level 4, unattended                                                                 |
|          |                                      |                                                                                      | W - electronic delivery of product (AmEx transactions transmission only)                    |
|          |                                      |                                                                                      | Y - physical delivery of product (AmEx transactions transmission only)                      |
|          |                                      |                                                                                      | Z - transit Access Terminal – TAT                                                           |
|          |                                      |                                                                                      | M - mobile acceptance solution                                                              |
| 5        | Cardholder present                   | Indicates if the cardholder is present at the point of service and if not – why not  | 0 - cardholder present                                                                      |
|          |                                      |                                                                                      | 1 - cardholder not present, unspecified                                                     |
|          |                                      |                                                                                      | 2 - cardholder not present, mail order                                                      |
|          |                                      |                                                                                      | 3 - cardholder not present, telephone                                                       |
|          |                                      |                                                                                      | 4 - cardholder not present, stand-in authorization or recurring payment                     |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 6        | Card present                         | Indicates if the card is present at the point of service                             | 0 - card not present                                                                        |
|          |                                      |                                                                                      | 1 - card present                                                                            |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 7        | Card data input mode                 | Indicates method used to input the information from the card to the terminal         | 0 - unknown                                                                                 |
|          |                                      |                                                                                      | 2 - magnetic stripe read                                                                    |
|          |                                      |                                                                                      | 3 - bar code                                                                                |
|          |                                      |                                                                                      | 4 - OCR coding read                                                                         |
|          |                                      |                                                                                      | 5 - smart card read                                                                         |
|          |                                      |                                                                                      | 6 - key entered                                                                             |
|          |                                      |                                                                                      | 8 - magnetic stripe read in fallback to smart card read                                     |
|          |                                      |                                                                                      | 9 - full magnetic stripe read                                                               |
|          |                                      |                                                                                      | A - contactless magnetic-stripe                                                             |
|          |                                      |                                                                                      | M - contactless smart card read                                                             |
|          |                                      |                                                                                      | N - PayPass mapping service                                                                 |
|          |                                      |                                                                                      | R - PAN entry via electronic commerce, including remote chip                                |
|          |                                      |                                                                                      | S - electronic commerce, SET without cardholder certificate                                 |
|          |                                      |                                                                                      | T - electronic commerce, SET with cardholder certificate                                    |
|          |                                      |                                                                                      | U - electronic commerce, no security                                                        |
|          |                                      |                                                                                      | V - electronic commerce, channel encryption                                                 |
|          |                                      |                                                                                      | W - PAN Auto Entry via Server                                                               |
| 8        | Cardholder authentication method     | Indicates the method for verifying the cardholder identity                           | 0 - not authenticated                                                                       |
|          |                                      |                                                                                      | 1 - PIN verified on-line or off-line                                                        |
|          |                                      |                                                                                      | 2 - electronic signature analysis                                                           |
|          |                                      |                                                                                      | 5 - manual signature verification                                                           |
|          |                                      |                                                                                      | 6 - other manual verification                                                               |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 9        | Cardholder authentication entity     | Indicates the entity verifying the cardholder identity                               | 0 - not authenticated (through telephone)                                                   |
|          |                                      |                                                                                      | 1 - smart card (off-line PIN verification using smart card data)                            |
|          |                                      |                                                                                      | 3 - authorization agent (e.g. performing on-line PIN verification)                          |
|          |                                      |                                                                                      | 4 - by merchant (e.g. performing signature comparison)                                      |
|          |                                      |                                                                                      | 5 - other (e.g. non-smart card off-line PIN verification)                                   |
|          |                                      |                                                                                      | 9 - unknown                                                                                 |
| 10       | Card data output capability          | Indicates the ability of the terminal to update the card                             | 0 - unknown                                                                                 |
|          |                                      |                                                                                      | 1 - none                                                                                    |
|          |                                      |                                                                                      | 2 - magnetic stripe write                                                                   |
|          |                                      |                                                                                      | 3 - smart card write                                                                        |
| 11       | Terminal output capability           | Indicates the ability of the terminal to print/display messages                      | 0 - unknown                                                                                 |
|          |                                      |                                                                                      | 1 - none                                                                                    |
|          |                                      |                                                                                      | 2 - printing                                                                                |
|          |                                      |                                                                                      | 3 - display                                                                                 |
|          |                                      |                                                                                      | 4 - printing and display                                                                    |
| 12       | PIN capture capability               | Indicates the length of PIN which the terminal is capable to capture                 | 0 - no PIN capture capability                                                               |
|          |                                      |                                                                                      | 1 - unknown                                                                                 |
|          |                                      |                                                                                      | 4 - four characters                                                                         |
|          |                                      |                                                                                      | 5 - five characters                                                                         |
|          |                                      |                                                                                      | 6 - six characters                                                                          |
|          |                                      |                                                                                      | 7 - seven characters                                                                        |
|          |                                      |                                                                                      | 8 - eight characters                                                                        |
|          |                                      |                                                                                      | 9 - nine characters                                                                         |
|          |                                      |                                                                                      | A - ten characters                                                                          |
|          |                                      |                                                                                      | B - eleven digits                                                                           |
|          |                                      |                                                                                      | C - twelve digits                                                                           |

### Security related control information

| Position | Field                    | Description                                                                                     | Available values                                                            |
|:---------|:-------------------------|:------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|
| 1-2      | PIN Security Type Code   | Indicates the type of security processing used for the PIN data.                                | 97 - Multiple (indexed) keys                                                |
| 3-4      | PIN Encryption Type Code | Indicates the type of security processing used for the PIN data.                                | 01 - DES encryption                                                         |
|          |                          |                                                                                                 | 99 - AES/DES encryption                                                     |
| 5-6      | PIN Block Format Code    | Indicates the type of PIN block format used.                                                    | 01 - ANSI 1                                                                 |
|          |                          |                                                                                                 | 04 - ISO Format 4 (only available with AES/DES - pin block encryption type) |
|          |                          |                                                                                                 | 10 - ISO Format 0                                                           |
| 7-10     | PIN Key Index Number     | Indicates the specific PIN key to be used when more than one key is available in a PIN key set. | 0001–0099                                                                   |
| 11-12    | Reserved for Future Use  | Reserved for future use.                                                                        | 00 - Default value                                                          |
| 13-16    | Reserved for Future Use  | Reserved for future use.                                                                        | 0000 - Default value                                                        |

### Payment transaction type indicator

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
| F08       | MasterCard | Person-to-Person Transfer to Card Account           |
| F52       | MasterCard | Account-to-Account Transfer                         |
| F53       | MasterCard | Agent Cash Out                                      |
| F54       | MasterCard | Credit Account Bill Payment                         |
| F55       | MasterCard | Business Disbursement                               |
| F61       | MasterCard | Staged Wallet Load                                  |
| F64       | MasterCard | Prepaid/Debit Card Account Load                     |
| F65       | MasterCard | General Business-to-Business Transfer               |
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

### Promotion codes

| Promotion Code | Description                                                  |
|:---------------|:-------------------------------------------------------------|
| ARGCTA         | Installment payment transaction within Argentina             |
| AGROF1         | Mastercard Agro Card                                         |
| BNDES1         | Brazil intracountry transactions using the Mastercard BNDES  |
| CHLCTA         | Installment payment transaction within Chile                 |
| COLCTA         | Installment payment transaction within Colombia              |
| GREECE         | Installment payment transaction within Greece                |
| HGMINS         | Installment payment transaction for Georgia                  |
| MCGARS         | Identifies Global Automated Service (GARS) Stand-In activity |
| MCINST         | Installment payment transaction                              |
| MEXCTA         | Installment payment transaction within Mexico                |
| PARCEL         | Installment payment transaction within Brazil                |
| PERCTA         | Installment payment transaction within Peru                  |
| PHINST         | Installment payment transaction within Philippines           |
| PRYCTA         | Installment payment transaction within Paraguay              |
| URYCTA         | Installment payment transaction within Uruguay               |

### Api methods

| Method            | Value             |
|:------------------|:------------------|
| Authorize         | authorize         |
| Advice            | advice            |
| Balance inquiry   | balance_inquiry   |
| Capture           | capture           |
| Cancel            | cancel            |
| Credit            | credit            |
| Cash disbursement | cash_disbursement |
| P2P transaction   | p2p_transaction   |
| Ping              | ping              |
| Reverse           | reverse           |
| Refund            | refund            |
| Sale              | sale              |
| Terminal config   | terminal_config   |

### Identification type

| Code  | Description                  |
|:------|:-----------------------------|
| 00    | Passport                     |
| 01    | National Identification Card |
| 02    | Driver’s License             |
| 03    | Government Issued            |
| 04    | Other                        |
| 05–10 | Reserved                     |

### Reversal reason code

| Code | Description                                       |
|:-----|:--------------------------------------------------|
| 00   | Approved or completed successfully                |
| 01   | Refer to card issuer                              |
| 03   | Invalid merchant                                  |
| 04   | Capture card                                      |
| 05   | Do not honor                                      |
| 06   | Error (/0400 only)                                |
| 08   | Honor with ID                                     |
| 10   | Partial Approval                                  |
| 12   | Invalid transaction                               |
| 13   | Invalid amount                                    |
| 14   | Invalid card number                               |
| 15   | Invalid issuer                                    |
| 17   | Customer cancellation (/0400 only)                |
| 30   | Format error                                      |
| 32   | Partial reversal (/0400 only)                     |
| 34   | Suspect Fraud (/0400 only)                        |
| 41   | Lost card                                         |
| 43   | Stolen card                                       |
| 51   | Insufficient funds/over credit limit              |
| 54   | Expired card                                      |
| 55   | Invalid PIN                                       |
| 57   | Transaction not permitted to issuer/cardholder    |
| 58   | Transaction not permitted to acquirer/terminal    |
| 61   | Exceeds withdrawal amount limit                   |
| 62   | Restricted card                                   |
| 63   | Security violation                                |
| 65   | Exceeds withdrawal count limit                    |
| 68   | Response received late (/0400 only)               |
| 70   | Contact Card Issuer                               |
| 71   | PIN Not Changed                                   |
| 75   | Allowable number of PIN tries exceeded            |
| 76   | Invalid/nonexistent "To Account" specified        |
| 77   | Invalid/nonexistent "From Account" specified      |
| 78   | Invalid/nonexistent account specified (general)   |
| 84   | Invalid Authorization Life Cycle                  |
| 85   | Not declined                                      |
| 86   | PIN Validation not possible                       |
| 87   | Purchase Amount Only, No Cash Back Allowed        |
| 88   | Cryptographic failure                             |
| 89   | Unacceptable PIN—Transaction Declined—Retry       |
| 91   | Authorization System or issuer system inoperative |
| 92   | Unable to route transaction                       |
| 94   | Duplicate transmission detected                   |
| 96   | System error                                      |

## Security
### Authentication

To use new version API you need to send your API credentials using header with every request you make. **Note** If headers are set then appropriate values from JSON body will not be used.

**Header**

| Parameter       | Notation | Type | Length | Description                                                                                         |
|:----------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------|
| content-type    | M        | ANS  | 1-50   | Request content type. text/plain for encrypted request, application/json for non encrypted request. |
| x-method        | M        | A    | 1-50   | [`Api methods`](#appendix--enum--api-methods).                                                      |
| x-api-id        | M        | AN   | 50     | Merchant API ID.                                                                                    |
| x-terminal-id   | M        | AN   | 50     | Terminal API ID.                                                                                    |
| x-sale-point-id | M        | AN   | 50     | Sale point API ID.                                                                                  |
| x-token         | M        | AN   | 30-60  | Merchant token.                                                                                     |
| x-api-version   | M        | AN   | 1-3    | Fixed `2.0`.                                                                                        |
| x-sign          | M        | ANS  | 1-255  | Secret" encrypted with public key provided by Tribe.                                                |
| x-request-id    | M        | N    | 14     | Request identification number returned on response.                                                 |
| x-status-code   | M        | N    | 3      | Status code returned on response. [`Status code`](#appendix--enum--status-code).                    |
| x-status        | M        | AN   | 1-255  | Status returned on response. [`Status value`](#appendix--enum--status-value).                       |

### Cryptography
Request and response messages body should be encrypted.

**Request message data (from Client to API) encryption**

* Random secret of 32 characters length should be generated.
* Request message data should be encrypted with the random secret.
* Random secret should be encrypted using Tribe provided public key and must be provided in request message as (`sign`).
* Request message sign will be decrypted using the Tribe private key.
* The decrypted sign will be used as a _secret_ to decrypt the request message data.

**Response message data (from API to Client) encryption**

* Random secret of 32 characters length will be generated.
* Response message data will be encrypted with the random secret.
* Random secret will be encrypted using Client public key and it will be provided in response message as (`sign`).
* Response message sign should be decrypted using the Client private key.
* The decrypted sign should be used as a _secret_ to decrypt response message data.

Encrypted request/response body should be plain text. Private key must be in a PKCS #8 format. Public key can be extracted from private key using command `openssl rsa -in private.pem -pubout > public.pub` and should be provided to Tribe. **Examples for method request/response are provided in decrypted format**

**Encryption algorithm:**

```php
/**
 * @param array  $data
 * @param string $publicKey
 *
 * @return string
 */
public function encryptRequest(array $data, string $publicKey): string
{
    $secret = 'T3A7Ug7DbVN88qtsQ3jqdr3EfvVwbTif'; // randomly generated 32 characters string, which should be different on each request
    openssl_public_encrypt($secret, $bin, $publicKey);
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
 * @param string $privateKey
 *
 * @return array
 */
public function decryptResponse(string $data, string $sign, string $privateKey): string
{
    openssl_private_decrypt(base64_decode($sign), $secret, $privateKey);
    $iv = substr($data, 0, 16);
    $originalData = base64_decode(substr($data, 16));
    
    return openssl_decrypt($originalData, 'aes-256-cbc', $secret, OPENSSL_RAW_DATA, $iv);
}
```
