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

## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

# Actions
## Assign terminal to device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | assign_terminal_to_device     |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                     |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------|
| action                    | M        | ANS  | 1-64   | Available actions: assign/register.                                                             |
| guid                      | M        | ANS  | 36     | Device GUID.                                                                                    |
| initial_guid              | M        | ANS  | 36     | Device initial GUID.                                                                            |
| serial_number             | M        | ANS  | 1-64   | Device serial number.                                                                           |
| merchant_id               | C        | N    | 1-14   | Merchant ID. One of the fields is mandatory merchant_id/merchant_reference_number.              |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant reference number. One of the field is mandatory merchant_id/merchant_reference_number. |
| terminal_id               | C        | N    | 1-14   | Terminal ID. One of the fields is mandatory terminal_id/terminal_reference_number.              |
| terminal_reference_number | C        | ANS  | 1-16   | Terminal reference number. One of the field is mandatory terminal_id/terminal_reference_number. |

```json
{
	"action": "register",
	"guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b452",
	"initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b451",
	"serial_number": "39267819219100025148zz43743730420750777211",
	"merchant_id": "15791610089263",
	"merchant_reference_number": "ref-abc12345",
	"terminal_id": "15791611897649",
	"terminal_reference_number": "ref-acapi"
}
```

### Response

| Parameter                     | Notation | Type | Length | Description                                                                                                         |
|:------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------|
| status                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                    |
| status_code                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                       |
| message                       | M        | A    | -      | Response/error message                                                                                              |
| response_data                 | M        | OBJ  | -      |                                                                                                                     |
| response_data / action        | ME       | ANS  | 1-64   | Available actions: assign/register.                                                                                 |
| response_data / guid          | ME       | ANS  | 36     | Device GUID.                                                                                                        |
| response_data / initial_guid  | ME       | ANS  | 36     | Device initial GUID.                                                                                                |
| response_data / serial_number | ME       | ANS  | 1-64   | Device serial number.                                                                                               |
| response_data / status        | M        | ANS  | 1-32   | Device configuration status. Returns status: ready for action: register. Returns status: active for action: assign. |
| response_data / apin          | C        | ANS  | 4      | Device activation pin code. Apin is returned only on register action.                                               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "action": "register",
        "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b452",
        "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b451",
        "serial_number": "39267819219100025148zz43743730420750777211",
        "status": "ready",
        "apin": "1751"
    }
}
```

## Unassign terminal from device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | unassign_terminal_from_device |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                     |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------|
| guid                      | M        | ANS  | 36     | Device GUID.                                                                                    |
| initial_guid              | M        | ANS  | 36     | Device initial GUID.                                                                            |
| serial_number             | M        | ANS  | 64     | Device serial number.                                                                           |
| merchant_id               | C        | N    | 14     | Merchant ID. One of the fields is mandatory merchant_id/merchant_reference_number.              |
| merchant_reference_number | C        | ANS  | 16     | Merchant reference number. One of the field is mandatory merchant_id/merchant_reference_number. |
| terminal_id               | C        | N    | 14     | Terminal ID. One of the fields is mandatory terminal_id/terminal_reference_number.              |
| terminal_reference_number | C        | ANS  | 16     | Terminal reference number. One of the field is mandatory terminal_id/terminal_reference_number. |

```json
{
	"guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b452",
	"initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b451",
	"serial_number": "39267819219100025148zz43743730420750777211",
	"merchant_id": "15791610089263",
	"merchant_reference_number": "ref-abc12345",
	"terminal_id": "15791611897649",
	"terminal_reference_number": "ref-acapi"
}
```

### Response

| Parameter                     | Notation | Type | Length | Description                                                   |
|:------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                       | M        | A    | -      | Response/error message                                        |
| response_data                 | M        | OBJ  | -      |                                                               |
| response_data / guid          | ME       | ANS  | 36     | Device GUID.                                                  |
| response_data / initial_guid  | ME       | ANS  | 36     | Device initial GUID.                                          |
| response_data / serial_number | ME       | ANS  | 64     | Device serial number.                                         |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b452",
        "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b451",
        "serial_number": "39267819219100025148zz43743730420750777211"
    }
}
```

## Create Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_account                |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                                                                                               |
|:--------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| currency_ison             | M        | N    | 3      | ISO numeric currency code.                                                                                                                                                |
| unique_reference_number   | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| merchant_id               | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |

```json
{
  "currency_ison": "840",
  "unique_reference_number": "uniqueaccountnr1",
  "merchant_id": "16299850415872"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | ME       | ANS  | 1-16   | Echoed back from request.                                     |
| response_data / currency_ison           | ME       | N    | 3      | ISO numeric currency code.                                    |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "15728746952658",
    "unique_reference_number": "uniqueaccountnr1",
    "currency_ison": "840"
  }
}
```

## Update Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_account                |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                       |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify account (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify account (id / unique_reference_number). |
| currency_ison           | O        | N    | 3      | ISO numeric currency code.                                                                                        |

```json
{
	"unique_reference_number": "account-ref",
	"currency_ison": "840"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                      |
| response_data / currency_ison           | CE       | N    | 3      | ISO numeric currency code.                                    |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "account-ref",
        "currency_ison": "840"
    }
}
```

## Get Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_account                   |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                       |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify account (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify account (id / unique_reference_number). |

```json
{
	"unique_reference_number": "account-ref"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | M        | ANS  | 1-16   | Unique reference number.                                      |
| response_data / currency_ison           | M        | N    | 3      | ISO numeric currency code.                                    |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15816714625169",
        "unique_reference_number": "account-ref",
        "currency_ison": "840"
    }
}
```

## Delete Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_account                |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                       |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify account (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify account (id / unique_reference_number). |

```json
{
	"unique_reference_number": "account-ref"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "account-ref"
    }
}
```

## Create Merchant

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_merchant               |

### Request

| Parameter                                                        | Notation | Type | Length | Description                                                                                                                                                                                                                                        |
|:-----------------------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchant                                                         | M        | OBJ  | -      |                                                                                                                                                                                                                                                    |
| merchant / name                                                  | M        | ANS  | 1-50   | Merchant name. Can only contain letters, numbers, spaces and .-*&!?:+ symbols.                                                                                                                                                                     |
| merchant / unique_reference_number                               | M        | AN   | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / country_code                                          | M        | N    | 3      | ISO numeric country code.                                                                                                                                                                                                                          |
| merchant / city                                                  | M        | AN   | 1-13   | Merchant city.                                                                                                                                                                                                                                     |
| merchant / address                                               | M        | AN   | 1-120  | Merchant address.                                                                                                                                                                                                                                  |
| merchant / allow_recurring                                       | M        | N    | 1      | Enable or disable recurring transactions. Values: `0` - disabled, `1` - enabled.                                                                                                                                                                   |
| merchant / status                                                | O        | N    | 1      | Status. Values: `1` - activated, `2` - suspended. Defaults to `1`.                                                                                                                                                                                 |
| merchant / validate_risk_rules                                   | O        | N    | 1      | Enable or disable risk rules validation. Values: `0` - disabled, `1` - enabled. (default value `0`)                                                                                                                                                |
| merchant / processable_currencies                                | C        | OBJ  | -      | List of schemes and processable currencies per scheme. **Note:** Required if terminal entity data is provided in the same API call.                                                                                                                |
| merchant / processable_currencies / {{scheme}}                   | M        | LIST | -      | ISO numeric currency code list of processable currencies per scheme. [`Available schemes`](#appendix--enum--scheme).                                                                                                                               |
| merchant / mastercard_assigned_id                                | O        | N    | 6      | MasterCard assigned ID.                                                                                                                                                                                                                            |
| merchant / visa_verification_value                               | O        | AN   | 10     | Visa verification value.                                                                                                                                                                                                                           |
| merchant / parent_id                                             | O        | AN   | 14     | Merchant parent merchant ID.                                                                                                                                                                                                                       |
| merchant / parent_merchant_reference_number                      | O        | ANS  | 1-16   | Merchant parent merchant unique reference number.                                                                                                                                                                                                  |
| merchant / contract_number                                       | O        | ANS  | 1-20   | Contract number.                                                                                                                                                                                                                                   |
| merchant / phone_number                                          | M        | ANS  | 1-15   | Merchant phone number.                                                                                                                                                                                                                             |
| merchant / merchant_group                                        | O        | ANS  | 1-16   | Merchant group unique reference number. If merchant_group will be specified it will be assigned to merchant.                                                                                                                                       |
| merchant / merchant_client_public_key                            | O        | ANS  | -      | Merchant client public key. Base64 encoded value.                                                                                                                                                                                                  |
| merchant / clone_keys_from_merchant_id                           | O        | N    | 14     | Merchant id from which the MAPI ssh keys should be cloned.                                                                                                                                                                                         |
| merchant / clone_keys_from_merchant_unique_reference_number      | O        | AN   | 1-50   | Merchant unique reference number from which the MAPI ssh keys should be cloned.                                                                                                                                                                    |
| merchant / participating_in_card_update                          | O        | N    | 1      | Enable or disable participating in card update. Values: `0` - disabled, `1` - enabled.                                                                                                                                                             |
| merchant / card_update_notification_url                          | C        | ANS  | 1-255  | Card update notification URL. **Note:** Required if participating_in_card_update is enabled.                                                                                                                                                       |
| merchant / settlement_accounts                                   | C        | LIST | -      | Merchant settlement accounts. **Note:** Required if terminal entity data is provided is in the same API call.                                                                                                                                      |
| merchant / settlement_accounts / name                            | M        | AN   | 1-25   | Settlement account name.                                                                                                                                                                                                                           |
| merchant / settlement_accounts / account_number                  | O        | ANS  | 1-34   | Account number.                                                                                                                                                                                                                                    |
| merchant / settlement_accounts / iban                            | O        | ANS  | 1-34   | Account IBAN number.                                                                                                                                                                                                                               |
| merchant / settlement_accounts / account_name                    | O        | ANS  | 1-50   | Account name.                                                                                                                                                                                                                                      |
| merchant / settlement_accounts / swift_code                      | O        | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                                                                                                             |
| merchant / settlement_accounts / currency                        | O        | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                                                                                                                  |
| merchant / settlement_accounts / mapped_currencies               | M        | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account.                                                                                            |
| merchant / settlement_accounts / unique_reference_number         | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / persons                                               | O        | LIST | -      | Merchant responsible persons. **Note:** Required for credit transactions.                                                                                                                                                                          |
| merchant / persons / first_name                                  | M        | ANS  | 1-35   | Person first name.                                                                                                                                                                                                                                 |
| merchant / persons / last_name                                   | M        | ANS  | 1-35   | Person last name.                                                                                                                                                                                                                                  |
| merchant / persons / city                                        | M        | ANS  | 1-25   | City.                                                                                                                                                                                                                                              |
| merchant / persons / country                                     | M        | N    | 3      | ISO numeric country code.                                                                                                                                                                                                                          |
| merchant / persons / address                                     | M        | ANS  | 1-35   | Address.                                                                                                                                                                                                                                           |
| merchant / persons / date_of_birth                               | M        | N    | 8      | Date of birth.                                                                                                                                                                                                                                     |
| merchant / persons / type                                        | M        | A    | 6-8    | Type - `sender` or `receiver`. Only one entity per type should be provided.                                                                                                                                                                        |
| merchant / persons / unique_reference_number                     | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / accounts                                              | C        | LIST | -      | Merchant accounts. **Note:** Required if sale point entity data is provided on same API call and there is no previously created accounts.                                                                                                          |
| merchant / accounts / currency_ison                              | M        | N    | 3      | ISO numeric currency code.                                                                                                                                                                                                                         |
| merchant / accounts / unique_reference_number                    | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / sale_points                                           | C        | LIST | -      | Merchant sale points. **Note:** Required if terminal entity data is provided and there is no previously created sale points.                                                                                                                       |
| merchant / sale_points / default_account_reference_number        | M        | ANS  | 1-16   | Merchant account unique reference number. Should be same from previously mentioned account.                                                                                                                                                        |
| merchant / sale_points / card_acceptor_name                      | M        | AN   | 1-22   | Card acceptor name is used for transaction descriptor generation for ecommerce transactions.                                                                                                                                                       |
| merchant / sale_points / short_card_acceptor_name                | O        | AN   | 1-7    | If generated transaction descriptor is too long then short card acceptor will be used instead of full card acceptor name.                                                                                                                          |
| merchant / sale_points / location                                | M        | ANS  | 1-25   | Sale point location/address. Will be used as transaction descriptor in POS transactions.                                                                                                                                                           |
| merchant / sale_points / city                                    | M        | AN   | 1-12   | Sale point city.                                                                                                                                                                                                                                   |
| merchant / sale_points / country_ison                            | M        | N    | 3      | ISO numeric country code.                                                                                                                                                                                                                          |
| merchant / sale_points / description                             | O        | ANS  | 1-255  | Sale point description.                                                                                                                                                                                                                            |
| merchant / sale_points / address                                 | O        | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                                                                                                                                                                               |
| merchant / sale_points / additional_info_1                       | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                                                                                                            |
| merchant / sale_points / additional_info_2                       | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                                                                                                            |
| merchant / sale_points / unique_reference_number                 | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / sale_points / platform_type                           | M        | N    | 1      | [`Available platform types`](#appendix--enum--platform-type).                                                                                                                                                                                      |
| merchant / sale_points / mc_merchant_id                          | O        | N    | 10     | Mastercard merchant ID ([`Modulus 9 algorithm`](#appendix--enum--modulus-9-algorithm)). Auto generated if not provided. Both values (Visa and MasterCard merchant id) will be generated the same if only one or none of these values are provided. |
| merchant / sale_points / visa_merchant_id                        | O        | N    | 10     | Visa merchant ID. ([`Modulus 9 algorithm`](#appendix--enum--modulus-9-algorithm)) Auto generated if not provided. Both values (Visa and MasterCard merchant id) will be generated the same if only one or none of these values are provided.       |
| merchant / sale_points / upi_merchant_id                         | O        | N    | 15     | UnionPay merchant ID. Auto generated if not provided.                                                                                                                                                                                              |
| merchant / sale_points / jcb_merchant_id                         | O        | N    | 15     | JCB merchant ID. Auto generated if not provided.                                                                                                                                                                                                   |
| merchant / sale_points / website_url                             | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information.                                                                                                                                                   |
| merchant / sale_points / phone_number                            | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                                                                                                                                                                     |
| merchant / sale_points / activation_phone_number                 | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                                                                                                                                                                        |
| merchant / sale_points / use_transaction_risk_analysis_exemption | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).                                                                                                                                                         |
| merchant / sale_points / fraud_rate_bps                          | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.                                                                                                                                                     |
| merchant / sale_points / trid                                    | O        | N    | 11     | MDES Token Requestor ID.                                                                                                                                                                                                                           |
| merchant / sale_points / expected_tx_count                       | O        | N    | 1-20   | Excepted count of transactions per month.                                                                                                                                                                                                          |
| merchant / sale_points / expected_tx_volume                      | O        | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                                                                                                                                                                          |
| merchant / sale_points / mcc_codes                               | M        | LIST | -      | List of available Merchant category codes (MCC) for this sale point. Merchant category codes are defined by ISO 18245 standard.                                                                                                                      |
| merchant / sale_points / mcc_code                                | M        | N    | 4      | Default merchant category code. **Note:** Default merchant category code could only be set from values available in `mcc_codes` field.                                                                                                             |
| merchant / terminals                                             | O        | LIST | -      | Merchant terminals.                                                                                                                                                                                                                                |
| merchant / terminals / currencies                                | M        | LIST | -      | ISO numeric currency code list of terminal currencies.                                                                                                                                                                                             |
| merchant / terminals / callback_url                              | O        | ANS  | 1-255  | Callback url.                                                                                                                                                                                                                                      |
| merchant / terminals / pos_country_code                          | M        | N    | 3      | ISO numeric country code.                                                                                                                                                                                                                          |
| merchant / terminals / pos_postal_code                           | M        | ANS  | 1-10   | Postal code.                                                                                                                                                                                                                                       |
| merchant / terminals / password                                  | C        | ANS  | 1-255  | Terminal password. Depends if necessary on `password_mode` value.                                                                                                                                                                                  |
| merchant / terminals / password_mode                             | M        | N    | 1      | Terminal password. [`Available password modes`](#appendix--enum--password-mode).                                                                                                                                                                   |
| merchant / terminals / allow_recurring                           | M        | N    | 1      | Enable or disable recurring transactions. Values: `0` - disabled, `1` - enabled.                                                                                                                                                                   |
| merchant / terminals / sale_point_reference_number               | M        | ANS  | 1-16   | Sale point unique reference number. Should be same from previously mentioned sale point.                                                                                                                                                           |
| merchant / terminals / mai_reference_id                          | O        | AN   | 1-16   | MAI reference ID. Used when sending MAI requests to MAI endpoints if MAI configurated.                                                                                                                                                             |
| merchant / terminals / unique_reference_number                   | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant / terminals / permissions                               | O        | LIST | -      | List of enabled terminal methods. [`Available methods`](#appendix--enum--terminal-method).                                                                                                                                                         |
| merchant / terminals / terminal_configuration_id                 | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                                                                                                                                                   |
| merchant / terminals / terminal_profile_id                       | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                                                                                                                                                   |

```json
{
  "merchant": {
    "name": "Merchant name",
    "unique_reference_number": "merchant123",
    "country_code": "826",
    "city": "London",
    "address":"Royal palace 123",
    "allow_recurring": "1",
    "status": "1",
    "validate_risk_rules": "1",
    "processable_currencies": {
      "MC": [
        "840",
        "826"
      ],
      "VISA": [
        "840",
        "826"
      ]
    },
    "mastercard_assigned_id": "111111",
    "visa_verification_value": "1111111111",
    "parent_id": "uniquemernr1",
    "contract_number": "demo-contract",
    "phone_number": "+1234567890",
    "merchant_group": "ref-mcgroup",
    "merchant_client_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
    "settlement_accounts": [
      {
        "name": "Default account",
        "account_number": "GB55416511",
        "iban": "2512112121",
        "account_name": "Default account",
        "swift_code": "2512112121",
        "currency": "978",
        "mapped_currencies": [
          "840"
        ],
        "unique_reference_number": "uniquesetacnr1"
      },
      {
        "name": "Other account",
        "account_number": "GB55145f11",
        "iban": "25367941",
        "account_name": "Some other account",
        "swift_code": "2512112121",
        "currency": "840",
        "mapped_currencies": [
          "978"
        ],
        "unique_reference_number": "uniquesetacnr2"
      }
    ],
    "persons": [
      {
        "first_name": "Test",
        "last_name": "Sender",
        "city": "London",
        "country": "826",
        "address": "Royal road 123",
        "date_of_birth": "20001010",
        "type": "sender",
        "unique_reference_number": "uniquesendernr1"
      },
      {
        "first_name": "Test",
        "last_name": "Receiver",
        "city": "London",
        "country": "826",
        "address": "Royal palace 123",
        "date_of_birth": "20000101",
        "type": "receiver",
        "unique_reference_number": "uniquereceivenr1"
      }
    ],
    "accounts": [
      {
        "currency_ison": "840",
        "unique_reference_number": "uniqueaccountnr1"
      }
    ],
    "sale_points": [
      {
        "default_account_id": "uniqueaccountnr1",
        "card_acceptor_name": "Main sale point",
        "location": "Minimarket",
        "city": "London",
        "country_ison": "826",
        "description": "Main sale point",
        "address": "Canary Wharf 152",
        "additional_info_1": "info 1",
        "additional_info_2": "info 2",
        "unique_reference_number": "uniquesalepnr1",
        "platform_type": "1",
        "mc_merchant_id": "8361322542",
        "visa_merchant_id": "7819520723",
        "upi_merchant_id": "001082600000002",
        "jcb_merchant_id": "000000000000002",
        "mcc_codes": [
          "6532",
          "6533"
        ],
        "mcc_code": "6532"
      }
    ],
    "terminals": [
      {
        "currencies": [
          "840"
        ],
        "callback_url": "http://test.test/callback",
        "pos_country_code": "826",
        "pos_postal_code": "WC2N 5DU",
        "password": "test-password",
        "password_mode": "2",
        "allow_recurring": "1",
        "sale_point_id": "uniquesalepnr1",
        "mai_reference_id": "terminal123",
        "unique_reference_number": "uniquetermnr1",
        "permissions": [
          "authorize",
          "capture",
          "sale",
          "reverse",
          "cancel"
        ],
        "terminal_configuration_id": "321",
        "terminal_profile_id": "1234"
      }
    ]
  }
}
```

### Response

| Parameter                                                                        | Notation | Type | Length | Description                                                                                                                                             |
|:---------------------------------------------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                                                                           | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                                                        |
| status_code                                                                      | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                                                           |
| message                                                                          | M        | A    | -      | Response/error message.                                                                                                                                 |
| response_data                                                                    | M        | OBJ  | -      |                                                                                                                                                         |
| response_data / merchant                                                         | M        | OBJ  | -      |                                                                                                                                                         |
| response_data / merchant / id                                                    | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / api_id                                                | M        | AN   | 10     | Merchant api ID.                                                                                                                                        |
| response_data / merchant / token                                                 | M        | AN   | 32     | Merchant api token.                                                                                                                                     |
| response_data / merchant / name                                                  | ME       | ANS  | 1-50   | Merchant name.                                                                                                                                          |
| response_data / merchant / unique_reference_number                               | ME       | AN   | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / country_code                                          | ME       | N    | 3      | ISO numeric country code.                                                                                                                               |
| response_data / merchant / city                                                  | ME       | AN   | 1-13   | Merchant city.                                                                                                                                          |
| response_data / merchant / address                                               | ME       | AN   | 1-120  | Merchant address.                                                                                                                                       |
| response_data / merchant / allow_recurring                                       | ME       | N    | 1      | Allow recurring flag value.                                                                                                                             |
| response_data / merchant / status                                                | ME       | N    | 1      | Status, possible values `1` - activated, `2` - suspended.                                                                                               |
| response_data / merchant / validate_risk_rules                                   | CE       | N    | 1      | Risk rules validation flag value.                                                                                                                       |
| response_data / merchant / processable_currencies                                | CE       | OBJ  | -      | List of schemes and processable currencies per scheme.                                                                                                  |
| response_data / merchant / processable_currencies / {{scheme}}                   | ME       | LIST | -      | ISO numeric currency code list of processable currencies per scheme. [`Available schemes`](#appendix--enum--scheme).                                    |
| response_data / merchant / mastercard_assigned_id                                | CE       | N    | 6      | MasterCard assigned ID.                                                                                                                                 |
| response_data / merchant / visa_verification_value                               | CE       | AN   | 10     | Visa verification value.                                                                                                                                |
| response_data / merchant / parent_id                                             | CE       | AN   | 14     | Merchant parent merchant unique reference number.                                                                                                       |
| response_data / merchant / contract_number                                       | CE       | ANS  | 1-20   | Contract number.                                                                                                                                        |
| response_data / merchant / phone_number                                          | ME       | ANS  | 1-15   | Merchant phone number.                                                                                                                                  |
| response_data / merchant / merchant_group                                        | CE       | ANS  | 1-16   | Merchant group unique reference number.                                                                                                                 |
| response_data / merchant / merchant_public_key                                   | ME       | ANS  | -      | Merchant public key. Generated by the system. Base64 encoded value.                                                                                     |
| response_data / merchant / merchant_client_public_key                            | CE       | ANS  | -      | Merchant client public key. Base64 encoded value.                                                                                                       |
| response_data / merchant / participating_in_card_update                          | CE       | N    | 1      | Participating in card update flag value. Values: `0` - disabled, `1` - enabled.                                                                         |
| response_data / merchant / card_update_notification_url                          | CE       | ANS  | 1-255  | Card update notification URL.                                                                                                                           |
| response_data / merchant / settlement_accounts                                   | C        | LIST | -      | Merchant settlement accounts. **Note:** Only returned if entity was present in the request.                                                             |
| response_data / merchant / settlement_accounts / id                              | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / settlement_accounts / name                            | ME       | AN   | 1-25   | Settlement account name.                                                                                                                                |
| response_data / merchant / settlement_accounts / account_number                  | CE       | ANS  | 1-34   | Account number.                                                                                                                                         |
| response_data / merchant / settlement_accounts / iban                            | CE       | ANS  | 1-34   | Account IBAN number.                                                                                                                                    |
| response_data / merchant / settlement_accounts / account_name                    | CE       | ANS  | 1-50   | Account name.                                                                                                                                           |
| response_data / merchant / settlement_accounts / swift_code                      | CE       | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                  |
| response_data / merchant / settlement_accounts / currency                        | CE       | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                       |
| response_data / merchant / settlement_accounts / mapped_currencies               | ME       | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account. |
| response_data / merchant / settlement_accounts / unique_reference_number         | ME       | ANS  | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / persons                                               | C        | LIST | -      | Merchant responsible persons. **Note:** Only returned if entity was present in the request.                                                             |
| response_data / merchant / persons / id                                          | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / persons / first_name                                  | ME       | ANS  | 1-35   | Person first name.                                                                                                                                      |
| response_data / merchant / persons / last_name                                   | ME       | ANS  | 1-35   | Person last name.                                                                                                                                       |
| response_data / merchant / persons / city                                        | ME       | ANS  | 1-25   | City.                                                                                                                                                   |
| response_data / merchant / persons / country                                     | ME       | N    | 3      | ISO numeric country code.                                                                                                                               |
| response_data / merchant / persons / address                                     | ME       | ANS  | 1-35   | Address.                                                                                                                                                |
| response_data / merchant / persons / date_of_birth                               | ME       | N    | 8      | Date of birth.                                                                                                                                          |
| response_data / merchant / persons / unique_reference_number                     | ME       | ANS  | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / persons / type                                        | ME       | A    | 6-8    | Echoed back from request.                                                                                                                               |
| response_data / merchant / accounts                                              | C        | LIST | -      | Merchant accounts. **Note:** Only returned if entity was present in the request.                                                                        |
| response_data / merchant / accounts / id                                         | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / accounts / currency_ison                              | ME       | N    | 3      | ISO numeric currency code.                                                                                                                              |
| response_data / merchant / accounts / unique_reference_number                    | ME       | ANS  | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / sale_points                                           | C        | LIST | -      | Merchant sale points. **Note:** Only returned if entity was present in the request.                                                                     |
| response_data / merchant / sale_points / id                                      | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / sale_points / api_id                                  | M        | AN   | 8      | Sale point api ID.                                                                                                                                      |
| response_data / merchant / sale_points / default_account_reference_number        | ME       | ANS  | 1-16   | Merchant account unique reference number.                                                                                                               |
| response_data / merchant / sale_points / card_acceptor_name                      | ME       | AN   | 1-22   | Card acceptor name. Echoed back from request.                                                                                                           |
| response_data / merchant / sale_points / short_card_acceptor_name                | C        | AN   | 1-7    | Short card acceptor name. **Note:** Only returned if entity was present in the request.                                                                 |
| response_data / merchant / sale_points / location                                | ME       | ANS  | 1-25   | Sale point location.                                                                                                                                    |
| response_data / merchant / sale_points / city                                    | ME       | AN   | 1-12   | Sale point city.                                                                                                                                        |
| response_data / merchant / sale_points / country_ison                            | ME       | N    | 3      | ISO numeric country code.                                                                                                                               |
| response_data / merchant / sale_points / mcc_codes                               | ME       | LIST | -      | Merchant category codes.                                                                                                                                |
| response_data / merchant / sale_points / mcc_code                                | ME       | N    | 4      | Default merchant category code.                                                                                                                         |
| response_data / merchant / sale_points / description                             | CE       | ANS  | 1-255  | Description.                                                                                                                                            |
| response_data / merchant / sale_points / address                                 | CE       | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                                                                                    |
| response_data / merchant / sale_points / additional_info_1                       | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                 |
| response_data / merchant / sale_points / additional_info_2                       | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                 |
| response_data / merchant / sale_points / unique_reference_number                 | ME       | AN   | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / sale_points / platform_type                           | ME       | N    | 1      | Platform type.                                                                                                                                          |
| response_data / merchant / sale_points / mc_merchant_id                          | CE       | N    | 10     | Mastercard merchant ID.                                                                                                                                 |
| response_data / merchant / sale_points / visa_merchant_id                        | CE       | N    | 10     | Visa merchant ID.                                                                                                                                       |
| response_data / merchant / sale_points / upi_merchant_id                         | CE       | N    | 15     | UnionPay merchant ID.                                                                                                                                   |
| response_data / merchant / sale_points / jcb_merchant_id                         | CE       | N    | 15     | JCB merchant ID.                                                                                                                                        |
| response_data / merchant / sale_points / website_url                             | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information.                                                        |
| response_data / merchant / sale_points / phone_number                            | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                                                                          |
| response_data / merchant / sale_points / activation_phone_number                 | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                                                                             |
| response_data / merchant / sale_points / use_transaction_risk_analysis_exemption | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).                                                              |
| response_data / merchant / sale_points / fraud_rate_bps                          | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.                                                          |
| response_data / merchant / sale_points / trid                                    | O        | N    | 11     | MDES Token Requestor ID.                                                                                                                                |
| response_data / merchant / sale_points / expected_tx_count                       | CE       | N    | 1-20   | Excepted count of transactions per month.                                                                                                               |
| response_data / merchant / sale_points / expected_tx_volume                      | CE       | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                                                                               |
| response_data / merchant / terminals                                             | C        | LIST | -      | Merchant terminals. **Note:** Only returned if entity was present in the request.                                                                       |
| response_data / merchant / terminals / id                                        | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / merchant / terminals / api_id                                    | M        | AN   | 8      | Terminal api ID.                                                                                                                                        |
| response_data / merchant / terminals / currencies                                | ME       | LIST | -      | ISO numeric currency code list of terminal currencies.                                                                                                  |
| response_data / merchant / terminals / callback_url                              | CE       | ANS  | 1-255  | Callback url.                                                                                                                                           |
| response_data / merchant / terminals / pos_country_code                          | ME       | N    | 3      | ISO numeric country code.                                                                                                                               |
| response_data / merchant / terminals / pos_postal_code                           | ME       | ANS  | 1-10   | Postal code.                                                                                                                                            |
| response_data / merchant / terminals / password                                  | C        | ANS  | 1-255  | Terminal password.                                                                                                                                      |
| response_data / merchant / terminals / password_mode                             | ME       | N    | 1      | Terminal password. [`Available password modes`](#appendix--enum--password-mode).                                                                        |
| response_data / merchant / terminals / allow_recurring                           | ME       | N    | 1      | Allow recurring flag value.                                                                                                                             |
| response_data / merchant / terminals / sale_point_reference_number               | ME       | ANS  | 1-16   | Sale point unique reference number.                                                                                                                     |
| response_data / merchant / terminals / mai_refenrence_id                         | O        | AN   | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / terminals / unique_reference_number                   | ME       | ANS  | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / merchant / terminals / terminal_configuration_id                 | CE       | N    | 1-14   | Echoed back from request.                                                                                                                               |
| response_data / merchant / terminals / terminal_profile_id                       | CE       | N    | 1-14   | Echoed back from request.                                                                                                                               |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "merchant": {
      "id": "15728746917952",
      "unique_reference_number": "merchant123",
      "api_id": "M547770741",
      "token": "l73w1ouner5cda2luj6gm5zgs14xtv5b",
      "name": "Test merchant",
      "validate_risk_rules": "1",
      "country_code": "826",
      "city": "London",
      "address": "Royal palace 123",
      "allow_recurring": "1",
      "status": "1",
      "mastercard_assigned_id": "111111",
      "visa_verification_value": "1111111111",
      "contract_number": "DEMO-CONTRACT",
      "phone_number": "+1234567890",
      "merchant_group": "ref-mcgroup",
      "merchant_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
      "merchant_client_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
      "parent_id": "",
      "persons": [
        {
          "id": "15728746915459",
          "unique_reference_number": "uniquesendernr1",
          "first_name": "Test",
          "last_name": "Sender",
          "city": "London",
          "country": "826",
          "address": "Royal road 123",
          "date_of_birth": "20001010",
          "type": "sender"
        },
        {
          "id": "15728746917564",
          "unique_reference_number": "uniquereceivenr1",
          "first_name": "Test",
          "last_name": "Receiver",
          "city": "London",
          "country": "826",
          "address": "Royal palace 123",
          "date_of_birth": "20000101",
          "type": "receiver"
        }
      ],
      "settlement_accounts": [
        {
          "id": "15728746948310",
          "unique_reference_number": "uniquesetacnr1",
          "name": "Default account",
          "account_number": "GB55416511",
          "iban": "2512112121",
          "account_name": "Default account",
          "swift_code": "2512112121",
          "currency": "978",
          "mapped_currencies": [
            "840"
          ]
        },
        {
          "id": "15728746950782",
          "unique_reference_number": "uniquesetacnr2",
          "name": "Other account",
          "account_number": "GB55145f11",
          "iban": "25367941",
          "account_name": "Some other account",
          "swift_code": "2512112121",
          "currency": "840",
          "mapped_currencies": [
            "978"
          ]
        }
      ],
      "accounts": [
        {
          "id": "15728746952658",
          "unique_reference_number": "uniqueaccountnr1",
          "currency_ison": "840"
        }
      ],
      "sale_points": [
        {
          "id": "15728746953690",
          "unique_reference_number": "uniquesalepnr1",
          "api_id": "SP620172",
          "default_account_id": "uniqueaccountnr1",
          "card_acceptor_name": "Main sale point",
          "location": "Minimarket",
          "city": "London",
          "country_ison": "826",
          "description": "Main sale point",
          "address": "Canary Wharf 152",
          "additional_info_1": "info 1",
          "additional_info_2": "info 2",
          "platform_type": "1",
          "mc_merchant_id": "8361322542",
          "visa_merchant_id": "7819520723",
          "upi_merchant_id": "001082600000002",
          "jcb_merchant_id": "000000000000002",
          "mcc_codes": [
            "6532",
            "6533"
          ],
          "mcc_code": "6532"
        }
      ],
      "terminals": [
        {
          "id": "15728746955699",
          "unique_reference_number": "uniquetermnr1",
          "api_id": "T4151094",
          "currencies": [
            "840"
          ],
          "callback_url": "http://test.test/callback",
          "pos_country_code": "826",
          "pos_postal_code": "WC2N 5DU",
          "password": "test-password",
          "password_mode": "2",
          "allow_recurring": "1",
          "sale_point_id": "uniquesalepnr1",
          "mai_reference_id": "terminal123",
          "terminal_configuration_id": "321",
          "terminal_profile_id": "1234"
        }
      ]
    }
  }
}
```

## Update Merchant

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_merchant               |

### Request

| Parameter                                        | Notation | Type | Length | Description                                                                                                                                                          |
|:-------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                               | C        | N    | 14     | Internal entity ID. One of the fields is required to identify merchant (id / unique_reference_number).                                                               |
| unique_reference_number                          | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify merchant (id / unique_reference_number).                                                          |
| parent_merchant_id                               | O        | N    | 14     | Merchant parent merchant ID. One of the fields is required to identify parent merchant (parent_merchant_id / parent_merchant_reference_number).                      |
| parent_merchant_reference_number                 | O        | ANS  | 1-16   | Merchant parent merchant unique reference number. One of the fields is required to identify parent merchant (parent_merchant_id / parent_merchant_reference_number). |
| name                                             | O        | ANS  | 1-50   | Merchant name. Can only contain letters, numbers, spaces and .-*&!?:+ symbols.                                                                                       |
| city                                             | O        | AN   | 1-13   | Merchant city.                                                                                                                                                       |
| address                                          | O        | AN   | 1-120  | Merchant address.                                                                                                                                                    |
| allow_recurring                                  | O        | N    | 1      | Enable or disable recurring transactions. Values: `0` - disabled, `1` - enabled.                                                                                     |
| status                                           | O        | N    | 1      | Status. Values: `1` - activated, `2` - suspended.                                                                                                                    |
| validate_risk_rules                              | O        | N    | 1      | Enable or disable risk rules validation. Values: `0` - disabled, `1` - enabled. (default value `0`)                                                                  |
| use_default_sender_receiver                      | O        | N    | 1      | Enable or disable default sender/receiver data for payment transactions. Values: `0` - disabled, `1` - enabled. (default value `0`)                                  |
| mastercard_assigned_id                           | O        | N    | 6      | MasterCard assigned ID.                                                                                                                                              |
| visa_verification_value                          | O        | AN   | 10     | Visa verification value.                                                                                                                                             |
| contract_number                                  | O        | ANS  | 1-20   | Contract number.                                                                                                                                                     |
| phone_number                                     | O        | ANS  | 1-15   | Merchant phone number.                                                                                                                                               |
| country_code                                     | O        | N    | 3      | ISO numeric country code.                                                                                                                                            |
| merchant_group                                   | O        | ANS  | 1-16   | Merchant group unique reference number. If merchant_group will be specified it will be assigned to merchant.                                                         |
| regenerate_mapi_keys                             | O        | N    | 1      | Regenerates MAPI SSH key pair, used for merchant API encryption.                                                                                                     |
| merchant_client_public_key                       | O        | ANS  | -      | Update merchant client public key. Base64 encoded value.                                                                                                             |
| clone_keys_from_merchant_id                      | O        | N    | 14     | Merchant id from which the MAPI ssh keys should be cloned.                                                                                                           |
| clone_keys_from_merchant_unique_reference_number | O        | AN   | 1-50   | Merchant unique reference number from which the MAPI ssh keys should be cloned.                                                                                      |
| participating_in_card_update                     | O        | N    | 1      | Enable or disable participating in card update. Values: `0` - disabled, `1` - enabled.                                                                               |
| card_update_notification_url                     | C        | ANS  | 1-255  | Card update notification URL. **Note:** Required if participating_in_card_update is enabled.                                                                         |

```json
{
	"unique_reference_number": "ref-abc12345",
	"parent_merchant_reference_number": "ref-grant12345",
	"name": "Merchant Name",
	"city": "London",
    "address": "Royal palace 123",
	"allow_recurring": "1",
    "status": "1",
	"validate_risk_rules": "1",
	"use_default_sender_receiver": "0",
	"mastercard_assigned_id": "959599",
	"visa_verification_value": "9999966666",
	"contract_number": "DEMO-CONTRACT",
    "phone_number": "+12324567890",
	"country_code": "840",
	"merchant_group": "ref-mcgroup",
	"regenerate_mapi_keys": "1",
	"merchant_client_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="
}
```

### Response

| Parameter                                              | Notation | Type | Length | Description                                                                                                                       |
|:-------------------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------------------------------------|
| status                                                 | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                                  |
| status_code                                            | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                                     |
| message                                                | M        | A    | -      | Response/error message.                                                                                                           |
| response_data                                          | M        | OBJ  | -      |                                                                                                                                   |
| response_data / id                                     | CE       | N    | 14     | Internal entity ID.                                                                                                               |
| response_data / unique_reference_number                | CE       | AN   | 1-16   | Unique reference number.                                                                                                          |
| response_data / parent_id                              | CE       | N    | 14     | Merchant parent merchant ID.                                                                                                      |
| response_data / parent_merchant_reference_number       | CE       | AN   | 1-16   | Merchant parent merchant unique reference number.                                                                                 |
| response_data / name                                   | CE       | ANS  | 1-50   | Merchant name.                                                                                                                    |
| response_data / city                                   | CE       | AN   | 1-13   | Merchant city.                                                                                                                    |
| response_data / address                                | CE       | AN   | 1-120  | Merchant address.                                                                                                                 |
| response_data / allow_recurring                        | CE       | N    | 1      | Allow recurring flag value.                                                                                                       |
| response_data / status                                 | ME       | N    | 1      | Status flag value. Values: `1` - activated, `2` - suspended.                                                |
| response_data / validate_risk_rules                    | CE       | N    | 1      | Risk rules validation flag value.                                                                                                 |
| response_data / use_default_sender_receiver            | CE       | N    | 1      | Use default sender/receiver data for payment transactions flag value.                                                             |
| response_data / mastercard_assigned_id                 | CE       | N    | 6      | MasterCard assigned ID.                                                                                                           |
| response_data / visa_verification_value                | CE       | AN   | 10     | Visa verification value.                                                                                                          |
| response_data / contract_number                        | CE       | ANS  | 1-20   | Contract number.                                                                                                                  |
| response_data / phone_number                           | CE       | ANS  | 1-15   | Merchant phone number.                                                                                                            |
| response_data / country_code                           | CE       | N    | 3      | ISO numeric country code.                                                                                                         |
| response_data / merchant_group                         | CE       | ANS  | 1-16   | Merchant group unique reference number.                                                                                           |
| response_data / merchant_public_key                    | CE       | ANS  | -      | Merchant public key. Generated by the system. Will be returned if regenerate_mapi_keys field value was "1". Base64 encoded value. |
| response_data / merchant_client_public_key             | CE       | ANS  | -      | Merchant client public key. Base64 encoded value.                                                                                 |
| response_data / participating_in_card_update           | CE       | N    | 1      | Participating in card update flag value.                                                                    |
| response_data / card_update_notification_url           | CE       | ANS  | 1-255  | Card update notification URL.                                                                               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-abc12345",
        "parent_merchant_reference_number": "ref-grant12345",
        "name": "Merchant Name",
        "city": "London",
        "address": "Royal palace 123",
        "allow_recurring": "1",
        "status": "1",
        "validate_risk_rules": "1",
        "use_default_sender_receiver": "0",
        "mastercard_assigned_id": "959599",
        "visa_verification_value": "9999966666",
        "contract_number": "DEMO-CONTRACT",
        "phone_number": "+12324567890",
        "country_code": "840",
        "merchant_group": "ref-mcgroup",
        "merchant_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
        "merchant_client_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="
    }
}
```

## Get Merchant

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_merchant                  |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                 |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify merchant (id / unique_reference_number).      |
| unique_reference_number | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify merchant (id / unique_reference_number). |

```json
{
	"unique_reference_number": "ref-abc12345"
}
```

### Response

| Parameter                                                      | Notation | Type | Length | Description                                                                                                          |
|:---------------------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|
| status                                                         | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                     |
| status_code                                                    | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                        |
| message                                                        | M        | A    | -      | Response/error message.                                                                                              |
| response_data                                                  | M        | OBJ  | -      |                                                                                                                      |
| response_data / id                                             | M        | N    | 14     | Internal entity ID.                                                                                                  |
| response_data / unique_reference_number                        | M        | AN   | 16     | Unique reference number.                                                                                             |
| response_data / parent_merchant_id                             | M        | N    | 14     | Parent merchant ID.                                                                                                  |
| response_data / api_id                                         | M        | AN   | 10     | Merchant api ID.                                                                                                     |
| response_data / token                                          | M        | AN   | 32     | Merchant api token.                                                                                                  |
| response_data / name                                           | M        | ANS  | 1-50   | Merchant name.                                                                                                       |
| response_data / city                                           | M        | AN   | 1-13   | Merchant city.                                                                                                       |
| response_data / address                                        | ME       | AN   | 1-120  | Merchant address.                                                                                                    |
| response_data / allow_recurring                                | M        | N    | 1      | Allow recurring flag value.                                                                                          |
| response_data / status                                         | ME       | N    | 1      | Status flag value. Values: `1` - activated, `2` - suspended.                                                         |
| response_data / validate_risk_rules                            | M        | N    | 1      | Validate risk rules flag value.                                                                                      |
| response_data / use_default_sender_receiver                    | M        | N    | 1      | Use default sender/receiver data for payment transactions flag value.                                                |
| response_data / mastercard_assigned_id                         | M        | N    | 6      | MasterCard assigned ID.                                                                                              |
| response_data / visa_verification_value                        | M        | AN   | 10     | Visa verification value.                                                                                             |
| response_data / contract_number                                | M        | ANS  | 1-20   | Contract number.                                                                                                     |
| response_data / phone_number                                   | ME       | ANS  | 1-15   | Merchant phone number.                                                                                               |
| response_data / country_code                                   | M        | N    | 3      | ISO numeric country code.                                                                                            |
| response_data / merchant_client_public_key                     | O        | ANS  | -      | Merchant client public key. Base64 encoded value.                                                                    |
| response_data / merchant / processable_currencies / {{scheme}} | O        | LIST | -      | ISO numeric currency code list of processable currencies per scheme. [`Available schemes`](#appendix--enum--scheme). |
| response_data / merchant_public_key                            | M        | ANS  | -      | Merchant public key. Generated by the system. Base64 encoded value.                                                  |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15816796780943",
        "unique_reference_number": "ref-abc12345",
        "parent_merchant_id": "15816796756970",
        "api_id": "abc12345",
        "token": "abc",
        "name": "test1",
        "city": "London",
        "address": "Royal palace 123",
        "allow_recurring": "1",
        "status": "1",
        "validate_risk_rules": "1",
        "use_default_sender_receiver": "0",
        "mastercard_assigned_id": "123456",
        "visa_verification_value": "9999966666",
        "contract_number": "",
        "phone_number": "+12324567890",
        "country_code": "826",
        "merchant_client_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
        "processable_currencies": {
            "mc": [
                "208",
                "344",
                "826",
                "840",
                "978"
            ],
            "visa": [
                "156",
                "208",
                "344",
                "826",
                "840",
                "978"
            ]
        },
      "merchant_public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUFvYjc3aDZJMFNNcWdEL3FzeXJFNgpIY2wwVkR6dkpKRU93OUMzZWczT2N0NTVJbEhzRlZ1SmJaRWJtaVhKL2RGdmwrOEdEbjVWdnpjRnArTG1NSEVYCkxQSXBrc0hQZlprTWorS0V2b2pyYi9rYU1idi9wbnlrS08rVkRlbnk2SkFkT3BOc2Vxekowdm05NUg4MzI3RksKV3NMellmdGNMbkVIN0pJZ3M2eHJjVXRLb1NRenkrWjhaQUhjR2hOeDh0NXhiQXczVUpwbmkreE5xRTNINnczbApHQUU0MGF6UHhJQWlZbmw1QWxOZDN2UzN4VGFVQkluOFFBNGtkdmV3L2lyY2QzWno3VWZkTDhLd3VRMWhON3RlCmt3M08yb0htTXM4dENmWmhzeGVoRkdjUUhpTTUyOUJsQ2p6VHBVTndDREtRZkVQbHpIY1p4UmdjaXlWU3pmalUKY1dKeW9jOHlGdG1HUGh6Y0t3UStma3BhRjhOb2NHelFLakRvR09UK3piSm45S2ZGdnhWRndhYWw3dmZKbDF1egpzc3ZjV0o5V1BQelljSVZnVGFkRWNhOEh3b0tqRUk0ejJpUmFLTFRVdEF4dnA3dHVaK205RHZhU3Y1Mk8xN3hRCklwQ2FlMUUzY3RtN3FPaFJrWnZrS2FuTkVqYXdNeFM4YWJ4VDE0RklaaHdYQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="
    }
}
```

## Delete Merchant

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_merchant               |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                 |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify merchant (id / unique_reference_number).      |
| unique_reference_number | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify merchant (id / unique_reference_number). |

```json
{
  "unique_reference_number": "merchant-ref",
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | AN   | 1-16   | Unique reference number.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "merchant-ref"
    }
}
```

## Create merchant group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_merchant_group         |

### Request

| Parameter                 | Notation | Type | Length | Description                                               |
|:--------------------------|:---------|:-----|:-------|:----------------------------------------------------------|
| unique_reference_number   | M        | ANS  | 1-16   | Entity unique reference number.                           |
| merchant_reference_number | M        | ANS  | 1-16   | Merchant unique reference number.                         |
| name                      | M        | ANS  | 1-50   | Merchant group name.                                      |
| merchants                 | O        | LIST | -      | List of Merchant IDs assigned to this group.              |
| users                     | O        | LIST | -      | List of User IDs that can access merchants in this group. |

```json
{
    "unique_reference_number": "ref-mcgroup",
    "merchant_reference_number": "ref-grant12345",
    "name": "test merchant group",
    "merchants": ["1234567891", "4444567894"],
    "users": ["9994567333"]
}
```

### Response

| Parameter                                 | Notation | Type | Length | Description                                                   |
|:------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                    | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                               | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                   | M        | A    | -      | Response/error message.                                       |
| response_data                             | M        | OBJ  | -      |                                                               |
| response_data / id                        | M        | N    | 1-14   | Internal entity ID.                                           |
| response_data / unique_reference_number   | ME       | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / name                      | ME       | ANS  | 1-50   | Merchant group name.                                          |
| response_data / merchant_reference_number | ME       | ANS  | 1-16   | Merchant unique reference number.                             |
| response_data / merchants                 | CE       | LIST | -      | List of Merchant IDs assigned to this group.                  |
| response_data / users                     | CE       | LIST | -      | List of User IDs that can access merchants in this group.     |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "12345678912345",
        "unique_reference_number": "ref-mcgroup",
        "merchant_reference_number": "ref-grant12345",
        "name": "test merchant group",
        "merchants": ["1234567891", "4444567894"],
        "users": ["9994567333"]
    }
}
```

## Update merchant group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_merchant_group         |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                       |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 1-14   | Internal entity ID. One of the fields is required to identify account (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify account (id / unique_reference_number). |
| name                    | O        | ANS  | 1-50   | Merchant group name.                                                                                              |
| merchants               | O        | LIST | -      | Assigns the provided list of Merchant IDs to this group.                                                          |
| add_merchants           | O        | LIST | -      | List of Merchant IDs to be added to this group.                                                                   |
| remove_merchants        | O        | LIST | -      | List of Merchant IDs to be removed from this group.                                                               |
| users                   | O        | LIST | -      | Assigns the provided list of User IDs that can access merchants in this group.                                    |
| add_users               | O        | LIST | -      | List of User IDs to be added to this group.                                                                       |
| remove_users            | O        | LIST | -      | List of User IDs to be removed from this group.                                                                   |

```json
{
    "unique_reference_number": "ref-mcgroup",
    "name": "test merchant group",
    "merchants": ["1234567891", "4444567894"],
    "add_merchants": ["1234567891", "4444567894"],
    "remove_merchants": ["1234567891", "4444567894"],
    "users": ["9994567333"],
    "add_users": ["9994567333"],
    "remove_users": ["9994567333"]
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | ANS  | 1-14   | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / name                    | CE       | ANS  | 1-50   | Merchant group name.                                          |
| response_data / merchants               | CE       | LIST | -      | List of Merchant IDs assigned to this group.                  |
| response_data / add_merchants           | CE       | LIST | -      | List of Merchant IDs to be added to this group.               |
| response_data / remove_merchants        | CE       | LIST | -      | List of Merchant IDs to be removed from this group.           |
| response_data / users                   | CE       | LIST | -      | List of User IDs that can access merchants in this group.     |
| response_data / add_users               | CE       | LIST | -      | List of User IDs to be added to this group.                   |
| response_data / remove_users            | CE       | LIST | -      | List of User IDs to be removed from this group.               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-mcgroup",
        "name": "test merchant group",
        "merchants": ["1234567891", "4444567894"],
        "add_merchants": ["1234567891", "4444567894"],
        "remove_merchants": ["1234567891", "4444567894"],
        "users": ["9994567333"],
        "add_users": ["9994567333"],
        "remove_users": ["9994567333"]
    }
}
```

## Get merchant group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_merchant_group            |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                       |
|:------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 1-14   | Internal entity ID. One of the fields is required to identify account (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify account (id / unique_reference_number). |

```json
{
    "unique_reference_number": "ref-mcgroup"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | ME       | N    | 1-14   | Internal entity ID.                                           |
| response_data / name                    | ME       | ANS  | 1-50   | Merchant group name.                                          |
| response_data / unique_reference_number | ME       | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / merchants               | CE       | LIST | -      | List of Merchant IDs assigned to this group.                  |
| response_data / users                   | CE       | LIST | -      | List of User IDs that can access merchants in this group.     |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "12345678912345",
        "unique_reference_number": "ref-mcgroup",
        "name": "test merchant group",
        "merchants": ["1234567891", "4444567894"],
        "users": ["9994567333"]
    }
}
```

## Create Person

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_person                 |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                                                                                               |
|:--------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| first_name                | M        | ANS  | 1-35   | Person first name.                                                                                                                                                        |
| last_name                 | M        | ANS  | 1-35   | Person last name.                                                                                                                                                         |
| city                      | M        | ANS  | 1-25   | City.                                                                                                                                                                     |
| country                   | M        | N    | 3      | ISO numeric country code.                                                                                                                                                 |
| address                   | M        | ANS  | 1-35   | Address.                                                                                                                                                                  |
| date_of_birth             | M        | N    | 8      | Date of birth.                                                                                                                                                            |
| type                      | M        | A    | 6-8    | Type - `sender` or `receiver`. Only one entity per type should be provided.                                                                                               |
| unique_reference_number   | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| merchant_id               | C        | AN   | 16     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |

```json
{
    "first_name": "Test",
    "last_name": "Sender",
    "city": "London",
    "country": "826",
    "address": "Royal road 123",
    "date_of_birth": "20001010",
    "type": "sender",
    "unique_reference_number": "person123",
    "merchant_id": "merchant12"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | ME       | ANS  | 1-16   | Echoed back from request.                                     |
| response_data / first_name              | ME       | ANS  | 1-35   | Person first name.                                            |
| response_data / last_name               | ME       | ANS  | 1-35   | Person last name.                                             |
| response_data / city                    | ME       | ANS  | 1-25   | City.                                                         |
| response_data / country                 | ME       | N    | 3      | ISO numeric country code.                                     |
| response_data / address                 | ME       | ANS  | 1-35   | Address.                                                      |
| response_data / date_of_birth           | ME       | N    | 8      | Date of birth.                                                |
| response_data / type                    | ME       | A    | 6-8    | Echoed back from request.                                     |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "15770988726964",
    "unique_reference_number": "person123",
    "first_name": "Test",
    "last_name": "Sender",
    "city": "London",
    "country": "826",
    "address": "Royal road 123",
    "date_of_birth": "20001010",
    "type": "sender"
  }
}
```

## Update Person

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_person                 |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                      |
|:------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify person (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify person (id / unique_reference_number). |
| first_name              | O        | ANS  | 1-35   | Person first name.                                                                                               |
| last_name               | O        | ANS  | 1-35   | Person last name.                                                                                                |
| city                    | O        | ANS  | 1-25   | City.                                                                                                            |
| country                 | O        | N    | 3      | ISO numeric country code.                                                                                        |
| address                 | O        | ANS  | 1-35   | Address.                                                                                                         |
| date_of_birth           | O        | N    | 8      | Date of birth. Format: Ymd.                                                                                      |

```json
{
	"unique_reference_number": "person-ref",
	"first_name": "Full",
    "last_name": "Name",
	"city": "London",
	"country": "826",
	"address": "Royal road 99",
	"date_of_birth": "20001010"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                      |
| response_data / first_name              | CE       | ANS  | 1-35   | Person first name.                                            |
| response_data / last_name               | CE       | ANS  | 1-35   | Person last name.                                             |
| response_data / city                    | CE       | ANS  | 1-25   | City.                                                         |
| response_data / country                 | CE       | N    | 3      | ISO numeric country code.                                     |
| response_data / address                 | CE       | ANS  | 1-35   | Address.                                                      |
| response_data / date_of_birth           | CE       | N    | 8      | Date of birth.                                                |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "person-ref",
        "first_name": "Full",
        "last_name": "Name",
        "city": "London",
        "country": "826",
        "address": "Royal road 99",
        "date_of_birth": "20001010"
    }
}
```

## Get Person

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_person                    |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                      |
|:------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify person (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify person (id / unique_reference_number). |

```json
{
	"unique_reference_number": "person-ref"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | M        | ANS  | 1-16   | Unique reference number.                                      |
| response_data / first_name              | M        | ANS  | 1-35   | Person first name.                                            |
| response_data / last_name               | M        | ANS  | 1-35   | Person last name.                                             |
| response_data / city                    | M        | ANS  | 1-25   | City.                                                         |
| response_data / country                 | M        | N    | 3      | ISO numeric country code.                                     |
| response_data / address                 | M        | ANS  | 1-35   | Address.                                                      |
| response_data / date_of_birth           | M        | N    | 8      | Date of birth.                                                |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15816796775621",
        "first_name": "Full",
        "last_name": "Name",
        "city": "London",
        "country": "826",
        "date_of_birth": "19990101",
        "unique_reference_number": "person-ref",
        "address": "Canada Place Canary Wharf"
    }
}
```

## Create Sale Point

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_sale_point             |

### Request

| Parameter                                   | Notation | Type | Length | Description                                                                                                                                                                                                                                        |
|:--------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default_account_id                          | C        | AN   | 14     | Merchant account ID. This field or `default_account_reference_number` needs to be provided.                                                                                                                                                        |
| default_account_reference_number            | C        | ANS  | 1-16   | Merchant account unique reference number. This field or `default_account_id` needs to be provided.                                                                                                                                                 |
| card_acceptor_name                          | M        | AN   | 1-22   | Card acceptor name is used for transaction descriptor generation for ecommerce transactions.                                                                                                                                                       |
| short_card_acceptor_name                    | O        | AN   | 1-7    | If generated transaction descriptor is too long then short card acceptor will be used instead of full card acceptor name.                                                                                                                          |
| location                                    | M        | ANS  | 1-25   | Sale point location.                                                                                                                                                                                                                               |
| city                                        | M        | AN   | 1-12   | Sale point city.                                                                                                                                                                                                                                   |
| country_ison                                | M        | N    | 3      | ISO numeric country code.                                                                                                                                                                                                                          |
| description                                 | O        | ANS  | 1-255  | Description.                                                                                                                                                                                                                                       |
| address                                     | O        | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                                                                                                                                                                               |
| additional_info_1                           | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                                                                                                            |
| additional_info_2                           | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                                                                                                                            |
| active                                      | O        | N    | 1      | Activate or suspend sale point activity. Values: `1` - activated, `0` - suspended. Defaults to `1`.                                                                                                                                                |
| unique_reference_number                     | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response.                                                                          |
| merchant_id                                 | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                                                                                                       |
| merchant_reference_number                   | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                                                                                                |
| platform_type                               | M        | N    | 1      | [`Available platform types`](#appendix--enum--platform-type).                                                                                                                                                                                      |
| mc_merchant_id                              | O        | N    | 10     | Mastercard merchant ID ([`Modulus 9 algorithm`](#appendix--enum--modulus-9-algorithm)). Auto generated if not provided. Both values (Visa and MasterCard merchant id) will be generated the same if only one or none of these values are provided. |
| visa_merchant_id                            | O        | N    | 10     | Visa merchant ID. ([`Modulus 9 algorithm`](#appendix--enum--modulus-9-algorithm)) Auto generated if not provided. Both values (Visa and MasterCard merchant id) will be generated the same if only one or none of these values are provided.       |
| upi_merchant_id                             | O        | N    | 15     | UnionPay merchant ID. Auto generated if not provided.                                                                                                                                                                                              |
| jcb_merchant_id                             | O        | N    | 15     | JCB merchant ID. Auto generated if not provided.                                                                                                                                                                                                   |
| parent_id                                   | O        | AN   | 14     | Parent Sale Point ID.                                                                                                                                                                                                                              |
| parent_sale_point_reference_number          | O        | ANS  | 1-16   | Parent Sale Point unique reference number.                                                                                                                                                                                                         |
| allow_initial_recurring_payment_without_3ds | O        | N    | 1      | Allow initial recurring payment without 3DS. Default value: 0.                                                                                                                                                                                     |
| website_url                                 | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information.                                                                                                                                                   |
| phone_number                                | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                                                                                                                                                                     |
| activation_phone_number                     | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                                                                                                                                                                        |
| use_transaction_risk_analysis_exemption     | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).                                                                                                                                                         |
| fraud_rate_bps                              | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.                                                                                                                                                     |
| trid                                        | O        | N    | 11     | MDES Token Requestor ID.                                                                                                                                                                                                                           |
| expected_tx_count                           | O        | N    | 1-20   | Excepted count of transactions per month.                                                                                                                                                                                                          |
| expected_tx_volume                          | O        | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                                                                                                                                                                          |
| mcc_code                                    | O        | N    | 4      | Default merchant category code. **Note:** Default merchant category code could only be set from values available in `mcc_codes` field.                                                                                                             |
| mcc_codes                                   | O        | LIST | -      | List of available Merchant category codes (MCC) for this sale point. Merchant category codes are defined by ISO 18245 standard.                                                                                                                      |

```json
{
  "default_account_id": "16285999921115",
  "card_acceptor_name": "Main sale point",
  "location": "Minimarket",
  "city": "London",
  "country_ison": "826",
  "description": "Main sale point",
  "address": "Canary Wharf 152",
  "additional_info_1": "info 1",
  "additional_info_2": "info 2",
  "active": "1",
  "unique_reference_number": "salepoint123",
  "merchant_id": "merchant123",
  "platform_type": "1",
  "mc_merchant_id": "8361322542",
  "visa_merchant_id": "7819520723",
  "upi_merchant_id": "001082600000002",
  "jcb_merchant_id": "000000000000002",
  "parent_sale_point_reference_number": "salepoint321",
  "allow_initial_recurring_payment_without_3ds": "1",
  "trid": "98765432101",
  "expected_tx_count": "100",
  "expected_tx_volume": "100000",
  "mcc_code": "6532",
  "mcc_codes": ["6532","6533"]
}
```

### Response

| Parameter                                                   | Notation | Type | Length | Description                                                                                      |
|:------------------------------------------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------|
| status                                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                 |
| status_code                                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                    |
| message                                                     | M        | A    | -      | Response/error message.                                                                          |
| response_data                                               | M        | OBJ  | -      |                                                                                                  |
| response_data / id                                          | M        | N    | 14     | Internal entity ID.                                                                              |
| response_data / unique_reference_number                     | ME       | ANS  | 1-16   | Echoed back from request.                                                                        |
| response_data / api_id                                      | M        | AN   | 8      | Sale point api ID.                                                                               |
| response_data / default_account_id                          | CE       | AN   | 14     | Merchant account ID.                                                                             |
| response_data / default_account_reference_number            | CE       | ANS  | 1-16   | Merchant account reference number.                                                               |
| response_data / card_acceptor_name                          | ME       | AN   | 1-22   | Card acceptor name.                                                                              |
| response_data / short_card_acceptor_name                    | C        | AN   | 1-7    | Short card acceptor name.                                                                        |
| response_data / location                                    | ME       | ANS  | 1-25   | Sale point location.                                                                             |
| response_data / city                                        | ME       | AN   | 1-12   | Sale point city.                                                                                 |
| response_data / country_ison                                | ME       | N    | 3      | ISO numeric country code.                                                                        |
| response_data / description                                 | CE       | ANS  | 1-255  | Description.                                                                                     |
| response_data / address                                     | CE       | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                             |
| response_data / additional_info_1                           | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / additional_info_2                           | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / active                                      | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.                                     |
| response_data / platform_type                               | ME       | N    | 1      | Platform type.                                                                                   |
| response_data / mc_merchant_id                              | CE       | N    | 10     | Mastercard merchant ID.                                                                          |
| response_data / visa_merchant_id                            | CE       | N    | 10     | Visa merchant ID.                                                                                |
| response_data / upi_merchant_id                             | CE       | N    | 15     | UnionPay merchant ID.                                                                            |
| response_data / jcb_merchant_id                             | CE       | N    | 15     | JCB merchant ID.                                                                                 |
| response_data / parent_id                                   | O        | AN   | 14     | Parent Sale Point ID.                                                                            |
| response_data / parent_sale_point_reference_number          | O        | ANS  | 1-16   | Parent Sale Point unique reference number.                                                       |
| response_data / allow_initial_recurring_payment_without_3ds | O        | N    | 1      | Allow initial recurring payment without 3DS.                                                     |
| response_data / website_url                                 | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information. |
| response_data / phone_number                                | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                   |
| response_data / activation_phone_number                     | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                      |
| response_data / use_transaction_risk_analysis_exemption     | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).       |
| response_data / fraud_rate_bps                              | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.   |
| response_data / trid                                        | O        | N    | 11     | MDES Token Requestor ID.                                                                         |
| response_data / expected_tx_count                           | CE       | N    | 1-20   | Excepted count of transactions per month.                                                        |
| response_data / expected_tx_volume                          | CE       | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                        |
| response_data / mcc_code                                    | ME       | N    | 4      | Default merchant category code.                                                                  |
| response_data / mcc_codes                                   | ME       | LIST | -      | Merchant category codes.                                                                         |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "15764815176404",
    "unique_reference_number": "s1576481514578",
    "api_id": "SP824070",
    "default_account_id": "account123",
    "card_acceptor_name": "Main sale point",
    "location": "Minimarket",
    "city": "London",
    "country_ison": "826",
    "description": "Main sale point",
    "address": "Canary Wharf 152",
    "additional_info_1": "info 1",
    "additional_info_2": "info 2",
    "active": "1",
    "platform_type": "1",
    "mc_merchant_id": "8361322542",
    "visa_merchant_id": "7819520723",
    "upi_merchant_id": "001082600000002",
    "jcb_merchant_id": "000000000000002",
    "parent_sale_point_reference_number": "salepoint321",
    "allow_initial_recurring_payment_without_3ds": "1",
    "trid": "98765432101",
    "expected_tx_count": "100",
    "expected_tx_volume": "100000",
    "mcc_code": "6532",
    "mcc_codes": ["6532","6533"]
  }
}
```

## Update Sale Point

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_sale_point             |

### Request

| Parameter                                   | Notation | Type | Length | Description                                                                                                                            |
|:--------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------------|
| id                                          | C        | N    | 14     | Internal entity ID. One of the fields is required to identify Sale Point (id / unique_reference_number).                               |
| unique_reference_number                     | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify Sale Point (id / unique_reference_number).                   |
| default_account_id                          | O        | AN   | 14     | Merchant account ID. This field or `default_account_reference_number` needs to be provided.                                            |
| default_account_reference_number            | O        | ANS  | 1-16   | Merchant account unique reference number. This field or `default_account_id` needs to be provided.                                     |
| card_acceptor_name                          | O        | AN   | 1-22   | Card acceptor name is used for transaction descriptor generation for ecommerce transactions.                                           |
| short_card_acceptor_name                    | O        | AN   | 1-7    | If generated transaction descriptor is too long then short card acceptor will be used instead of full card acceptor name.              |
| location                                    | O        | ANS  | 1-25   | Sale point location.                                                                                                                   |
| city                                        | O        | AN   | 1-12   | Sale point city.                                                                                                                       |
| country_ison                                | O        | N    | 3      | ISO numeric country code.                                                                                                              |
| description                                 | O        | ANS  | 1-255  | Description.                                                                                                                           |
| address                                     | O        | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                                                                   |
| additional_info_1                           | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                |
| additional_info_2                           | O        | ANS  | 1-255  | Additional information for POS receipt.                                                                                                |
| active                                      | O        | N    | 1      | Activate or suspend sale point activity. Values: `1` - activated, `0` - suspended. Defaults to `1`.                                    |
| allow_initial_recurring_payment_without_3ds | O        | N    | 1      | Allow initial recurring payment without 3DS.                                                                                           |
| website_url                                 | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information.                                       |
| phone_number                                | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                                                         |
| activation_phone_number                     | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                                                            |
| use_transaction_risk_analysis_exemption     | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).                                             |
| fraud_rate_bps                              | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.                                         |
| trid                                        | O        | N    | 11     | MDES Token Requestor ID.                                                                                                               |
| expected_tx_count                           | O        | N    | 1-20   | Excepted count of transactions per month.                                                                                              |
| expected_tx_volume                          | O        | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                                                              |
| mcc_code                                    | O        | N    | 4      | Default merchant category code. **Note:** Default merchant category code could only be set from values available in `mcc_codes` field. |
| mcc_codes                                   | O        | LIST | -      | List of available Merchant category codes (MCC) for this sale point. Merchant category codes are defined by ISO 18245 standard.        |
| remove_parent_sale_point                    | O        | N    | 1      | If value 1 provided, then parent sale point will be removed.                                                                           |

```json
{
	"unique_reference_number": "salepoint-ref",
	"location": "The Shard SE1 9SG",
	"city": "London",
	"country_ison": "440",
    "description": "Main sale point",
    "address": "Canary Wharf 152",
    "additional_info_1": "info 1",
    "additional_info_2": "info 2",
    "active": "1",
	"default_account_reference_number": "account-ref",
	"allow_initial_recurring_payment_without_3ds": "1",
	"trid": "98765432101",
	"expected_tx_count": "100",
	"expected_tx_volume": "100000",
	"mcc_code": "6532",
	"mcc_codes": ["6532","6533"],
	"remove_parent_sale_point": "1"
}
```

### Response

| Parameter                                                   | Notation | Type | Length | Description                                                                                      |
|:------------------------------------------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------|
| status                                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                 |
| status_code                                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                    |
| message                                                     | M        | A    | -      | Response/error message.                                                                          |
| response_data                                               | M        | OBJ  | -      |                                                                                                  |
| response_data / id                                          | CE       | N    | 14     | SalePoint internal entity ID.                                                                    |
| response_data / unique_reference_number                     | CE       | ANS  | 1-16   | SalePoint unique reference number.                                                               |
| response_data / default_account_id                          | CE       | AN   | 14     | Merchant account ID.                                                                             |
| response_data / default_account_reference_number            | CE       | ANS  | 1-16   | Merchant account reference number.                                                               |
| response_data / card_acceptor_name                          | CE       | AN   | 1-22   | Card acceptor name.                                                                              |
| response_data / short_card_acceptor_name                    | CE       | AN   | 1-7    | Short card acceptor name.                                                                        |
| response_data / location                                    | CE       | ANS  | 1-25   | Sale point location.                                                                             |
| response_data / city                                        | CE       | AN   | 1-12   | Sale point city.                                                                                 |
| response_data / country_ison                                | CE       | N    | 3      | ISO numeric country code.                                                                        |
| response_data / description                                 | CE       | ANS  | 1-255  | Description.                                                                                     |
| response_data / address                                     | CE       | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                             |
| response_data / additional_info_1                           | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / additional_info_2                           | CE       | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / active                                      | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.                                     |
| response_data / allow_initial_recurring_payment_without_3ds | CE       | ANS  | 1-255  | Allow initial recurring payment without 3DS.                                                     |
| response_data / website_url                                 | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information. |
| response_data / phone_number                                | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                   |
| response_data / activation_phone_number                     | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                      |
| response_data / use_transaction_risk_analysis_exemption     | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).       |
| response_data / fraud_rate_bps                              | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.   |
| response_data / trid                                        | CE       | N    | 11     | MDES Token Requestor ID.                                                                         |
| response_data / expected_tx_count                           | CE       | N    | 1-20   | Excepted count of transactions per month.                                                        |
| response_data / expected_tx_volume                          | CE       | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                        |
| response_data / mcc_code                                    | M        | N    | 4      | Default merchant category code.                                                                  |
| response_data / mcc_codes                                   | M        | LIST | -      | Merchant category codes.                                                                         |
| response_data / remove_parent_sale_point                    | O        | N    | 1      | If value 1 provided, then parent sale point will be removed.                                     |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "salepoint-ref",
        "location": "The Shard SE1 9SG",
        "city": "London",
        "country_ison": "440",
        "description": "Main sale point",
        "address": "Canary Wharf 152",
        "additional_info_1": "info 1",
        "additional_info_2": "info 2",
        "active": "1",
        "default_account_reference_number": "account-ref",
        "allow_initial_recurring_payment_without_3ds": "1",
        "trid": "98765432101",
        "expected_tx_count": "100",
        "expected_tx_volume": "100000",
        "mcc_code": "6532",
        "mcc_codes": ["6532","6533"],
        "remove_parent_sale_point": "1"
    }
}
```

## Get Sale Point

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_sale_point                |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                          |
|:------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify Sale Point (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify Sale Point (id / unique_reference_number). |

```json
{
	"unique_reference_number": "salepoint-ref"
}
```

### Response

| Parameter                                                   | Notation | Type | Length | Description                                                                                      |
|:------------------------------------------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------|
| status                                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                 |
| status_code                                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                    |
| message                                                     | M        | A    | -      | Response/error message.                                                                          |
| response_data                                               | M        | OBJ  | -      |                                                                                                  |
| response_data / id                                          | M        | N    | 14     | SalePoint internal entity ID.                                                                    |
| response_data / unique_reference_number                     | M        | ANS  | 1-16   | SalePoint unique reference number.                                                               |
| response_data / api_id                                      | M        | AN   | 8      | Sale point api ID.                                                                               |
| response_data / default_account_id                          | M        | AN   | 14     | Merchant account ID.                                                                             |
| response_data / location                                    | M        | ANS  | 1-25   | Sale point location.                                                                             |
| response_data / card_acceptor_name                          | M        | AN   | 1-22   | Card acceptor name.                                                                              |
| response_data / short_card_acceptor_name                    | M        | AN   | 1-7    | Short card acceptor name.                                                                        |
| response_data / city                                        | M        | AN   | 1-12   | Sale point city.                                                                                 |
| response_data / country_ison                                | M        | N    | 3      | ISO numeric country code.                                                                        |
| response_data / description                                 | M        | ANS  | 1-255  | Description.                                                                                     |
| response_data / address                                     | M        | ANS  | 1-255  | Full sale point address, it will be used on receipt.                                             |
| response_data / additional_info_1                           | M        | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / additional_info_2                           | M        | ANS  | 1-255  | Additional information for POS receipt.                                                          |
| response_data / active                                      | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.                                     |
| response_data / platform_type                               | M        | N    | 1      | Platform type.                                                                                   |
| response_data / mc_merchant_id                              | M        | N    | 10     | Mastercard merchant ID.                                                                          |
| response_data / visa_merchant_id                            | M        | N    | 10     | Visa merchant ID.                                                                                |
| response_data / upi_merchant_id                             | M        | N    | 15     | UnionPay merchant ID.                                                                            |
| response_data / jcb_merchant_id                             | M        | N    | 15     | JCB merchant ID.                                                                                 |
| response_data / allow_initial_recurring_payment_without_3ds | M        | N    | 1      | Allow initial recurring payment without 3DS.                                                     |
| response_data / website_url                                 | O        | ANS  | 1-255  | Merchant website. Used for transaction descriptor generation or additional clearing information. |
| response_data / phone_number                                | O        | ANS  | 1-15   | Used for transaction descriptor generation or additional clearing information.                   |
| response_data / activation_phone_number                     | O        | ANS  | 1-15   | Used for sending POS device activation PIN.                                                      |
| response_data / use_transaction_risk_analysis_exemption     | O        | N    | 1      | Transaction risk analysis exemption. Values: 0 - disabled, 1 - enabled. (default value 0).       |
| response_data / fraud_rate_bps                              | C        | N    | 1-11   | Fraud rate basis points. Required if value for `use_transaction_risk_analysis_exemption` is 1.   |
| response_data / trid                                        | M        | N    | 11     | MDES Token Requestor ID                                                                          |
| response_data / expected_tx_count                           | M        | N    | 1-20   | Excepted count of transactions per month.                                                        |
| response_data / expected_tx_volume                          | M        | N    | 1-20   | Excepted volume in cents (EUR) of transactions per month.                                        |
| response_data / mcc_code                                    | M        | N    | 4      | Default merchant category code.                                                                  |
| response_data / mcc_codes                                   | M        | LIST | -      | Merchant category codes.                                                                         |
| response_data / parent_sale_point_reference_number          | O        | ANS  | 1-16   | Parent sale point unique reference number.                                                       |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15816796783614",
        "unique_reference_number": "salepoint-ref",
        "api_id": "abc12345",
        "default_account_id": "15816796783603",
        "card_acceptor_name": "Main sale point",
        "location": "The Shard SE1 9SG",
        "city": "London",
        "country_ison": "826",
        "description": "Main sale point",
        "address": "Canary Wharf 152",
        "additional_info_1": "info 1",
        "additional_info_2": "info 2",
        "active": "1",
        "mc_merchant_id": "8361322542",
        "visa_merchant_id": "7819520723",
        "upi_merchant_id": "001082600000002",
        "jcb_merchant_id": "000000000000002",
        "platform_type": "1",
        "allow_initial_recurring_payment_without_3ds": "1",
        "trid": "98765432101",
        "expected_tx_count": "0",
        "expected_tx_volume": "0",
        "mcc_code": "6532",
        "mcc_codes": ["6532","6533"],
        "parent_sale_point_reference_number": "p-salepoint-ref"
    }
}
```

## Delete Sale Point

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_sale_point             |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                          |
|:------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify Sale Point (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify Sale Point (id / unique_reference_number). |

```json
{
	"unique_reference_number": "salepoint-ref"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | SalePoint internal entity ID.                                 |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | SalePoint unique reference number.                            |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "salepoint-ref"
    }
}
```

## Create Settlement Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_settlement_account     |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                                                                                               |
|:--------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                      | M        | AN   | 1-25   | Settlement account name.                                                                                                                                                  |
| account_number            | O        | ANS  | 1-34   | Account number.                                                                                                                                                           |
| iban                      | O        | ANS  | 1-34   | Account IBAN number.                                                                                                                                                      |
| account_name              | O        | ANS  | 1-50   | Account name.                                                                                                                                                             |
| swift_code                | O        | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                                    |
| currency                  | O        | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                                         |
| mapped_currencies         | M        | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account.                   |
| unique_reference_number   | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| merchant_id               | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |

```json
{
  "name": "Default account",
  "account_number": "GB55416511",
  "iban" : "2512112121",
  "account_name" : "Default account",
  "swift_code" : "2512112121",
  "currency" : "978",
  "mapped_currencies" : ["826"],
  "unique_reference_number": "settlement123",
  "merchant_id": "15770999220684"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                                                                                                             |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                                                        |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                                                           |
| message                                 | M        | A    | -      | Response/error message.                                                                                                                                 |
| response_data                           | M        | OBJ  | -      |                                                                                                                                                         |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / unique_reference_number | ME       | ANS  | 1-16   | Echoed back from request.                                                                                                                               |
| response_data / name                    | ME       | AN   | 1-25   | Settlement account name.                                                                                                                                |
| response_data / account_number          | CE       | ANS  | 1-34   | Account number.                                                                                                                                         |
| response_data / iban                    | CE       | ANS  | 1-34   | Account IBAN number.                                                                                                                                    |
| response_data / account_name            | CE       | ANS  | 1-50   | Account name.                                                                                                                                           |
| response_data / swift_code              | CE       | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                  |
| response_data / currency                | CE       | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                       |
| response_data / mapped_currencies       | ME       | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account. |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "15770999220684",
    "unique_reference_number": "settlement123",
    "name": "Default account",
    "account_number": "GB55416511",
    "iban": "2512112121",
    "account_name": "Default account",
    "swift_code": "2512112121",
    "currency": "978",
    "mapped_currencies": [
      "826"
    ]
  }
}
```

## Update Settlement Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_settlement_account     |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                                                             |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify settlement account (id / unique_reference_number).                                        |
| unique_reference_number | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify settlement account (id / unique_reference_number).                                   |
| name                    | O        | AN   | 1-25   | Settlement account name.                                                                                                                                |
| account_number          | O        | ANS  | 1-34   | Account number.                                                                                                                                         |
| iban                    | O        | ANS  | 1-34   | Account IBAN number.                                                                                                                                    |
| swift_code              | O        | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                  |
| currency                | O        | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                       |
| mapped_currencies       | O        | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account. |

```json
{
    "unique_reference_number": "abc123450",
    "name": "Default account name",
    "account_number": "GB55416511",
    "iban" : "2512112121",
    "swift_code" : "2512112121",
    "currency" : "840",
    "mapped_currencies" : ["840", "826", "978"]
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                                                                                                             |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                                                        |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                                                           |
| message                                 | M        | A    | -      | Response/error message.                                                                                                                                 |
| response_data                           | M        | OBJ  | -      |                                                                                                                                                         |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                                                                                                                |
| response_data / name                    | CE       | AN   | 1-25   | Settlement account name.                                                                                                                                |
| response_data / iban                    | CE       | ANS  | 34     | Account IBAN number.                                                                                                                                    |
| response_data / account_name            | CE       | ANS  | 1-50   | Account name.                                                                                                                                           |
| response_data / swift_code              | CE       | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                  |
| response_data / currency                | CE       | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                       |
| response_data / mapped_currencies       | CE       | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account. |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "abc123450",
        "name": "Default account name",
        "account_number": "GB55416511",
        "iban": "2512112121",
        "swift_code": "2512112121",
        "currency": "840",
        "mapped_currencies": [
            "840",
            "826",
            "978"
        ]
    }
}
```

## Get Settlement Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_settlement_account        |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                           |
|:------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify settlement account (id / unique_reference_number).      |
| unique_reference_number | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify settlement account (id / unique_reference_number). |

```json
{
    "unique_reference_number": "abc123450"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                                                                                                             |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                                                                        |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                                                                           |
| message                                 | M        | A    | -      | Response/error message.                                                                                                                                 |
| response_data                           | M        | OBJ  | -      |                                                                                                                                                         |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                                                                                                                     |
| response_data / unique_reference_number | M        | ANS  | 1-16   | Unique reference number.                                                                                                                                |
| response_data / name                    | M        | AN   | 1-25   | Settlement account name.                                                                                                                                |
| response_data / iban                    | M        | ANS  | 1-34   | Account IBAN number.                                                                                                                                    |
| response_data / account_name            | M        | ANS  | 1-50   | Account name.                                                                                                                                           |
| response_data / account_number          | M        | ANS  | 1-34   | Account number.                                                                                                                                         |
| response_data / swift_code              | M        | ANS  | 11     | Standard format to identify banks and financial institutions globally.                                                                                  |
| response_data / currency                | M        | N    | 3      | ISO numeric currency code. Currency of settlement account itself.                                                                                       |
| response_data / mapped_currencies       | M        | LIST | -      | List of ISO numeric currency codes assigned to this settlement account. Transaction with mapped currencies will be assigned to this settlement account. |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15819255440345",
        "unique_reference_number": "abc123450",
        "name": "Account EUR",
        "iban": "1234567891234567891234567891234567",
        "account_name": "A Company Ltd",
        "account_number": "1234567891234567891234567891234567",
        "swift_code": "12345678910",
        "currency": "840",
        "mapped_currencies": [
            "840"
        ]
    }
}
```

## Delete Settlement Account

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_settlement_account     |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                           |
|:------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify settlement account (id / unique_reference_number).      |
| unique_reference_number | C        | ANS  | 1-16   | Unique reference number. One of the fields is required to identify settlement account (id / unique_reference_number). |

```json
{
    "unique_reference_number": "abc123450"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "abc123450"
    }
}
```

## Create Terminal

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_terminal               |

### Request

| Parameter                   | Notation | Type | Length | Description                                                                                                                                                               |
|:----------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| currencies                  | M        | LIST | -      | ISO numeric currency code list of terminal currencies.                                                                                                                    |
| callback_url                | O        | ANS  | 1-255  | Callback url.                                                                                                                                                             |
| pos_country_code            | M        | N    | 3      | ISO numeric country code.                                                                                                                                                 |
| pos_postal_code             | M        | ANS  | 1-10   | Postal code.                                                                                                                                                              |
| password                    | C        | ANS  | 1-255  | Terminal password. Depends if necessary on `password_mode` value.                                                                                                         |
| password_mode               | M        | N    | 1      | Terminal password mode. [`Available password modes`](#appendix--enum--password-mode).                                                                                     |
| allow_recurring             | M        | N    | 1      | Enable or disable recurring transactions. Values: `0` - disabled, `1` - enabled.                                                                                          |
| active                      | O        | N    | 1      | Activate or suspend sale point activity. Values: `1` - activated, `0` - suspended. Defaults to `1`.                                                                       |
| sale_point_id               | C        | AN   | 14     | Sale point ID. This field or `sale_point_reference_number` needs to be provided.                                                                                          |
| sale_point_reference_number | C        | ANS  | 1-16   | Sale point unique reference number. This field or `sale_point_id` needs to be provided.                                                                                   |
| unique_reference_number     | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| permissions                 | O        | LIST | -      | List of enabled terminal methods. [`Available methods`](#appendix--enum--terminal-method).                                                                                |
| merchant_id                 | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number   | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |
| mai_reference_id            | O        | AN   | 1-16   | MAI reference ID. Used when sending MAI requests to MAI endpoints if MAI is configurated.                                                                                 |
| terminal_configuration_id   | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                                                                          |
| terminal_profile_id         | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                                                                          |

```json
{
  "currencies": ["840"],
  "callback_url": "http://test.test/callback",
  "pos_country_code": "826",
  "pos_postal_code": "WC2N 5DU",
  "password": "test-password",
  "password_mode": "2",
  "allow_recurring": "1",
  "active": "1",
  "sale_point_id": "16286000439826",
  "unique_reference_number": "terminal123",
  "permissions": ["authorize", "capture", "sale", "reverse", "cancel"],
  "merchant_id": "merchant12",
  "mai_reference_id": "terminal123",
  "terminal_configuration_id": "321",
  "terminal_profile_id": "1234"
}
```

### Response

| Parameter                                   | Notation | Type | Length | Description                                                   |
|:--------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                     | M        | A    | -      | Response/error message.                                       |
| response_data                               | M        | OBJ  | -      |                                                               |
| response_data / id                          | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number     | ME       | ANS  | 1-16   | Echoed back from request.                                     |
| response_data / api_id                      | M        | AN   | 8      | Terminal api ID.                                              |
| response_data / currencies                  | ME       | LIST | -      | ISO numeric currency code list of terminal currencies.        |
| response_data / callback_url                | CE       | ANS  | 1-255  | Callback url.                                                 |
| response_data / pos_country_code            | ME       | N    | 3      | ISO numeric country code.                                     |
| response_data / pos_postal_code             | ME       | ANS  | 1-10   | Postal code.                                                  |
| response_data / password                    | CE       | ANS  | 1-255  | Terminal password.                                            |
| response_data / password_mode               | ME       | N    | 1      | Terminal password mode                                        |
| response_data / allow_recurring             | ME       | N    | 1      | Allow recurring flag value.                                   |
| response_data / active                      | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.  |
| response_data / sale_point_id               | CE       | AN   | 14     | Sale point ID.                                                |
| response_data / sale_point_reference_number | CE       | ANS  | 1-16   | Sale point unique reference number.                           |
| response_data / mai_refenrence_id           | CE       | AN   | 1-16   | Echoed back from request.                                     |
| response_data / terminal_configuration_id   | CE       | N    | 1-14   | Echoed back from request.                                     |
| response_data / terminal_profile_id         | CE       | N    | 1-14   | Echoed back from request.                                     |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15771002982393",
        "unique_reference_number": "terminal123",
        "api_id": "T9778379",
        "currencies": [
            "840"
        ],
        "callback_url": "http://test.test/callback",
        "pos_country_code": "826",
        "pos_postal_code": "WC2N 5DU",
        "password": "test-password",
        "password_mode": "2",
        "allow_recurring": "1",
        "active": "1",
        "sale_point_id": "16286000439826",
        "mai_reference_id": "terminal123",
        "terminal_configuration_id": "321",
        "terminal_profile_id": "1234"
    }
}
```

## Update Terminal

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_terminal               |

### Request

| Parameter                   | Notation | Type | Length | Description                                                                                                        |
|:----------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------|
| id                          | O        | N    | 14     | Internal entity ID. One of the fields is required to identify terminal (id / unique_reference_number).             |
| unique_reference_number     | O        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify terminal (id / unique_reference_number). |
| currencies                  | O        | LIST | -      | ISO numeric currency code list of terminal currencies.                                                             |
| callback_url                | O        | ANS  | 1-255  | Callback url.                                                                                                      |
| pos_country_code            | O        | N    | 3      | ISO numeric country code.                                                                                          |
| pos_postal_code             | O        | ANS  | 1-10   | Postal code.                                                                                                       |
| password                    | C        | ANS  | 1-255  | Terminal password. Depends if necessary on `password_mode` value.                                                  |
| password_mode               | O        | N    | 1      | Terminal password mode. [`Available password modes`](#appendix--enum--password-mode).                              |
| allow_recurring             | O        | N    | 1      | Enable or disable recurring transactions. Values: `0` - disabled, `1` - enabled.                                   |
| active                      | O        | N    | 1      | Activate or suspend sale point activity. Values: `1` - activated, `0` - suspended.                                 |
| sale_point_id               | O        | AN   | 14     | Sale point ID. This field or `sale_point_reference_number` needs to be provided.                                   |
| sale_point_reference_number | O        | ANS  | 1-16   | Sale point unique reference number. This field or `sale_point_id` needs to be provided.                            |
| permissions                 | O        | LIST | -      | List of enabled terminal methods. [`Available methods`](#appendix--enum--terminal-method).                         |
| mai_reference_id            | O        | AN   | 1-16   | MAI reference ID. Used when sending MAI requests to MAI endpoints if MAI is configurated.                          |
| terminal_configuration_id   | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                   |
| terminal_profile_id         | O        | N    | 1-14   | Agreed on and provided by Tribe.                                                                                   |

```json
{
    "currencies": ["978", "946", "840"],
    "callback_url": "http://test.test/callback",
    "pos_country_code": "440",
    "pos_postal_code": "abc-123",
    "password": "test-password-123",
    "password_mode": "2",
    "allow_recurring": "1",
    "active": "1",
    "sale_point_reference_number": "salepoint-ref",
    "unique_reference_number": "ref-acapi",
    "permissions": ["authorize", "capture", "sale", "reverse", "cancel"],
    "mai_reference_id": "mai1580914773999",
    "terminal_configuration_id": "321",
    "terminal_profile_id": "1234"
}
```

### Response

| Parameter                                   | Notation | Type | Length | Description                                                   |
|:--------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                     | M        | A    | -      | Response/error message.                                       |
| response_data                               | M        | OBJ  | -      |                                                               |
| response_data / id                          | CE       | ANS  | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number     | CE       | ANS  | 1-16   | Unique reference number.                                      |
| response_data / callback_url                | CE       | ANS  | 1-255  | Callback url.                                                 |
| response_data / pos_country_code            | CE       | N    | 3      | ISO numeric country code.                                     |
| response_data / pos_postal_code             | CE       | ANS  | 1-10   | Postal code.                                                  |
| response_data / password                    | CE       | ANS  | 1-255  | Terminal password.                                            |
| response_data / password_mode               | CE       | N    | 1      | Terminal password mode.                                       |
| response_data / allow_recurring             | CE       | N    | 1      | Allow recurring flag value.                                   |
| response_data / active                      | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.  |
| response_data / sale_point_id               | CE       | AN   | 14     | Sale point ID.                                                |
| response_data / sale_point_reference_number | CE       | ANS  | 1-16   | Sale point unique reference number.                           |
| response_data / mai_refenrence_id           | CE       | AN   | 1-16   | Echoed back from request.                                     |
| response_data / terminal_configuration_id   | CE       | N    | 1-14   | Echoed back from request.                                     |
| response_data / terminal_profile_id         | CE       | N    | 1-14   | Echoed back from request.                                     |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-acapi",
        "sale_point_reference_number": "salepoint-ref",
        "mai_reference_id": "mai1580914773999",
        "callback_url": "http://test.test/callback/",
        "permissions": [
            "authorize",
            "capture",
            "sale",
            "reverse",
            "cancel"
        ],
        "currencies": [
            "978",
            "946",
            "840"
        ],
        "pos_country_code": "440",
        "pos_postal_code": "abc-123",
        "allow_recurring": "1",
        "active": "1",
        "password": "test-password-123",
        "password_mode": "2",
        "terminal_configuration_id": "321",
        "terminal_profile_id": "1234"
    }
}
```

## Get Terminal

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_terminal                  |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                        |
|:------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify terminal (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify terminal (id / unique_reference_number). |

```json
{
    "unique_reference_number": "ref-acapi"
}
```

### Response

| Parameter                                 | Notation | Type | Length | Description                                                                                |
|:------------------------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------|
| status                                    | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                           |
| status_code                               | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                              |
| message                                   | M        | A    | -      | Response/error message.                                                                    |
| response_data                             | M        | OBJ  | -      |                                                                                            |
| response_data / id                        | M        | ANS  | 14     | Internal entity ID.                                                                        |
| response_data / unique_reference_number   | M        | ANS  | 1-16   | Unique reference number.                                                                   |
| response_data / api_id                    | M        | AN   | 8      | Terminal api ID.                                                                           |
| response_data / callback_url              | M        | ANS  | 1-255  | Callback url.                                                                              |
| response_data / pos_country_code          | M        | N    | 3      | ISO numeric country code.                                                                  |
| response_data / pos_postal_code           | M        | ANS  | 1-10   | Postal code.                                                                               |
| response_data / password                  | M        | ANS  | 1-255  | Terminal password.                                                                         |
| response_data / password_mode             | M        | N    | 1      | Terminal password mode. [`Available password modes`](#appendix--enum--password-mode).      |
| response_data / allow_recurring           | M        | N    | 1      | Allow recurring flag value.                                                                |
| response_data / active                    | ME       | N    | 1      | Active flag value. Values: `1` - activated, `0` - suspended.                               |
| response_data / sale_point_id             | M        | AN   | 14     | Sale point ID.                                                                             |
| response_data / mai_reference_id          | M        | AN   | 1-16   | MAI reference ID.                                                                          |
| response_data / currencies                | M        | LIST | -      | ISO numeric currency code list of terminal currencies.                                     |
| response_data / permissions               | M        | LIST | -      | List of enabled terminal methods. [`Available methods`](#appendix--enum--terminal-method). |
| response_data / terminal_configuration_id | M        | N    | 1-14   | Terminal configuration ID assigned to terminal.                                            |
| response_data / terminal_profile_id       | M        | N    | 1-14   | Terminal profile ID assigned to terminal.                                                  |


```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "15816647217910",
        "unique_reference_number": "ref-acapi",
        "api_id": "acapi",
        "callback_url": "http://test.test/callback/",
        "pos_country_code": "440",
        "pos_postal_code": "abc-123",
        "password": "test-password-123",
        "password_mode": "2",
        "allow_recurring": "0",
        "active": "1",
        "sale_point_id": "15816645830924",
        "mai_reference_id": "mai1580914773999",
        "currencies": [
            "840",
            "946",
            "978"
        ],
        "permissions": [
            "cancel",
            "reverse",
            "sale",
            "capture",
            "authorize"
        ],
        "terminal_configuration_id": "321",
        "terminal_profile_id": "1234"
    }
}
```

## Delete Terminal

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_terminal               |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                        |
|:------------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify terminal (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify terminal (id / unique_reference_number). |

```json
{
    "unique_reference_number": "terminal-ref"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | ANS  | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Unique reference number.                                      |


```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "terminal-ref"
    }
}
```

## Get device apin

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_device_apin               |

### Request

| Parameter     | Notation | Type | Length | Description    |
|:--------------|:---------|:-----|:-------|:---------------|
| guid          | M        | ANS  | 36     | GUID.          |
| initial_guid  | M        | ANS  | 36     | Initial GUID.  |
| serial_number | M        | ANS  | 1-64   | Serial number. |

```json
{
	"initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
	"guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
	"serial_number": "39267819219100025148zz43743730420750777216"
}
```

### Response

| Parameter                     | Notation | Type | Length | Description                                                   |
|:------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                       | M        | A    | -      | Response/error message.                                       |
| response_data                 | M        | OBJ  | -      |                                                               |
| response_data / guid          | ME       | ANS  | 36     | GUID.                                                         |
| response_data / initial_guid  | ME       | ANS  | 36     | Initial GUID.                                                 |
| response_data / serial_number | ME       | ANS  | 1-64   | Serial number.                                                |
| response_data / apin          | M        | ANS  | 4      | Device activation pin code.                                   |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
        "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
        "serial_number": "39267819219100025148zz43743730420750777216",
        "apin": "2983"
    }
}
```

## Create Fee Group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_fee_group              |

### Request

| Parameter                 | Notation | Type | Length | Description                     |
|:--------------------------|:---------|:-----|:-------|:--------------------------------|
| unique_reference_number   | M        | ANS  | 16     | Entity unique reference number. |
| name                      | M        | ANS  | 1-50   | Fee group name.                 |

```json
{
    "unique_reference_number": "ref-feegroup",
    "name": "test fee group"
}
```

### Response

| Parameter                                 | Notation | Type | Length | Description                                                   |
|:------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                    | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                               | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                   | M        | A    | -      | Response/error message.                                       |
| response_data                             | M        | OBJ  | -      |                                                               |
| response_data / id                        | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number   | M        | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / name                      | M        | ANS  | 1-50   | Fee group name.                                               |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "12345678912345",
    "unique_reference_number": "ref-feegroup",
    "name": "test fee group"
  }
}
```

## Update Fee Group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_fee_group              |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                         |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee group (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify fee group (id / unique_reference_number). |
| name                    | O        | ANS  | 1-50   | Fee group name.                                                                                                     |

```json
{
    "unique_reference_number": "ref-feegroup",
    "name": "New fee group"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | ANS  | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / name                    | CE       | ANS  | 1-50   | Fee group name.                                               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-feegroup",
        "name": "New fee group"
    }
}
```

## Get Fee Group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_fee_group                 |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                         |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee group (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify fee group (id / unique_reference_number). |

```json
{
    "unique_reference_number": "ref-feegroup"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | M        | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | M        | ANS  | 1-16   | Entity unique reference number.                               |
| response_data / name                    | M        | ANS  | 1-50   | Fee group name.                                               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "12345678912345",
        "unique_reference_number": "ref-feegroup",
        "name": "New fee group"
    }
}
```

## Delete Fee Group

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_fee_group              |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                         |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee group (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 16     | Entity unique reference number. One of the fields is required to identify fee group (id / unique_reference_number). |

```json
{
	"unique_reference_number": "ref-feegroup"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 16     | Unique reference number.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-feegroup"
    }
}
```

## Create Fee

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_fee                    |

### Request

| Parameter                   | Notation | Type | Length | Description                                                                                                |
|:----------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------|
| unique_reference_number     | M        | ANS  | 16     | Entity unique reference number.                                                                            |
| fee_groups_id               | C        | AN   | 14     | Fee Group ID. One of the fields is mandatory fee_groups_id/fee_groups_reference_number.                    |
| fee_groups_reference_number | C        | ANS  | 16     | Fee Group reference number. One of the field is mandatory fee_groups_id/fee_groups_reference_number.       |
| fixed_price                 | O        | N    | 1-12   | Fixed price in minor units                                                                                 |
| percent_price               | O        | N    | 1-12   | Percent price in minor units                                                                               |
| min_amount                  | O        | N    | 1-12   | Min amount in minor units                                                                                  |
| max_amount                  | O        | N    | 1-12   | Max amount in minor units                                                                                  |
| currencies_ison             | M        | N    | 3      | ISO numeric currency code                                                                                  |
| low_mccs_id                 | O        | N    | 4      | Low MCC                                                                                                    |
| high_mccs_id                | O        | N    | 4      | High MCC                                                                                                   |
| regions_id                  | O        | N    | 10     | Regions ID [`Country Regions`](#appendix--enum--country-regions).                                          |
| merchant_id                 | O        | AN   | 16     | Merchant ID. One of the fields can be provided merchant_id/merchant_reference_number.                      |
| merchant_reference_number   | O        | ANS  | 16     | Merchant unique reference number. One of the fields can be provided merchant_id/merchant_reference_number. |
| description                 | O        | A    | 1-50   | Fee description.                                                                                           |

```json
{
    "unique_reference_number": "ref-fee",
    "fee_groups_reference_number": "ref-feegroup",
    "fixed_price": "1",
    "percent_price": "1",
    "min_amount": "2",
    "max_amount": "10",
    "currencies_ison": "978",
    "low_mccs_id": "1000",
    "high_mccs_id": "9999",
    "regions_id": "1",
    "merchant_reference_number": "ref-1",
    "description": "New fee"
}
```

### Response

| Parameter                                   | Notation | Type | Length | Description                                                       |
|:--------------------------------------------|:---------|:-----|:-------|:------------------------------------------------------------------|
| status                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                  |
| status_code                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).     |
| message                                     | M        | A    | -      | Response/error message.                                           |
| response_data                               | M        | OBJ  | -      |                                                                   |
| response_data / id                          | M        | ANS  | 14     | Internal entity ID                                                |
| response_data / unique_reference_number     | M        | ANS  | 1-16   | Entity unique reference number                                    |
| response_data / fee_groups_id               | CE       | AN   | 14     | Fee Group ID                                                      |
| response_data / fee_groups_reference_number | CE       | ANS  | 16     | Fee Group reference number                                        |
| response_data / fixed_price                 | CE       | N    | 1-12   | Fixed price in minor units                                        |
| response_data / percent_price               | CE       | N    | 1-12   | Percent price in minor units                                      |
| response_data / min_amount                  | CE       | N    | 1-12   | Min amount in minor units                                         |
| response_data / max_amount                  | CE       | N    | 1-12   | Max amount in minor units                                         |
| response_data / currencies_ison             | CE       | N    | 3      | ISO numeric currency code                                         |
| response_data / low_mccs_id                 | CE       | N    | 4      | Low MCC                                                           |
| response_data / high_mccs_id                | CE       | N    | 4      | High MCC                                                          |
| response_data / regions_id                  | CE       | N    | 10     | Regions ID [`Country Regions`](#appendix--enum--country-regions). |
| response_data / merchant_id                 | CE       | AN   | 16     | Merchant ID                                                       |
| response_data / merchant_reference_number   | CE       | ANS  | 16     | Merchant unique reference number                                  |
| response_data / description                 | CE       | A    | 1-50   | Fee description                                                   |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "id": "12345678912345",
    "unique_reference_number": "ref-fee",
    "fee_groups_reference_number": "ref-feegroup",
    "fixed_price": "1",
    "percent_price": "1",
    "min_amount": "2",
    "max_amount": "10",
    "currencies_ison": "978",
    "low_mccs_id": "1000",
    "high_mccs_id": "9999",
    "regions_id": "1",
    "merchant_reference_number": "ref-1",
    "description": "New fee"
  }
}
```

## Update Fee

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_fee                    |

### Request

| Parameter                   | Notation | Type | Length | Description                                                                                                    |
|:----------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------|
| id                          | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee (id / unique_reference_number).              |
| unique_reference_number     | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify fee (id / unique_reference_number).  |
| fixed_price                 | O        | N    | 1-12   | Fixed price in minor units                                                                                     |
| percent_price               | O        | N    | 1-12   | Percent price in minor units                                                                                   |
| min_amount                  | O        | N    | 1-12   | Min amount in minor units                                                                                      |
| max_amount                  | O        | N    | 1-12   | Max amount in minor units                                                                                      |
| currencies_ison             | O        | N    | 3      | ISO numeric currency code                                                                                      |
| low_mccs_id                 | O        | N    | 4      | Low MCC                                                                                                        |
| high_mccs_id                | O        | N    | 4      | High MCC                                                                                                       |
| regions_id                  | O        | N    | 10     | Regions ID [`Country Regions`](#appendix--enum--country-regions).                                              |
| description                 | O        | ANS  | 1-50   | Fee description.                                                                                               |

```json
{
    "unique_reference_number": "ref-fee",
    "fixed_price": "11",
    "percent_price": "21",
    "min_amount": "12",
    "max_amount": "11",
    "currencies_ison": "978",
    "low_mccs_id": "1001",
    "high_mccs_id": "9998",
    "regions_id": "1",
    "description": "Updated fee"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                       |
|:----------------------------------------|:---------|:-----|:-------|:------------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                  |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).     |
| message                                 | M        | A    | -      | Response/error message.                                           |
| response_data                           | M        | OBJ  | -      |                                                                   |
| response_data / id                      | CE       | ANS  | 14     | Internal entity ID.                                               |
| response_data / unique_reference_number | CE       | ANS  | 1-16   | Entity unique reference number.                                   |
| response_data / fixed_price             | CE       | N    | 1-12   | Fixed price in minor units                                        |
| response_data / percent_price           | CE       | N    | 1-12   | Percent price in minor units                                      |
| response_data / min_amount              | CE       | N    | 1-12   | Min amount in minor units                                         |
| response_data / max_amount              | CE       | N    | 1-12   | Max amount in minor units                                         |
| response_data / currencies_ison         | CE       | N    | 3      | ISO numeric currency code                                         |
| response_data / low_mccs_id             | CE       | N    | 4      | Low MCC                                                           |
| response_data / high_mccs_id            | CE       | N    | 4      | High MCC                                                          |
| response_data / regions_id              | CE       | N    | 10     | Regions ID [`Country Regions`](#appendix--enum--country-regions). |
| response_data / description             | CE       | A    | 1-50   | Fee description                                                   |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-feegroup",
        "fixed_price": "11",
        "percent_price": "21",
        "min_amount": "12",
        "max_amount": "11",
        "currencies_ison": "977",
        "low_mccs_id": "1001",
        "high_mccs_id": "9998",
        "regions_id": "1",
        "description": "Updated fee"
    }
}
```

## Get Fee

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_fee                       |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                   |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify fee (id / unique_reference_number). |

```json
{
    "unique_reference_number": "ref-fee"
}
```

### Response

| Parameter                                   | Notation | Type | Length | Description                                                                                                |
|:--------------------------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------|
| status                                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                           |
| status_code                                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                              |
| message                                     | M        | A    | -      | Response/error message.                                                                                    |
| response_data                               | M        | OBJ  | -      |                                                                                                            |
| response_data / id                          | M        | N    | 14     | Internal entity ID.                                                                                        |
| response_data / unique_reference_number     | M        | ANS  | 1-16   | Entity unique reference number.                                                                            |
| response_data / fee_groups_id               | CE       | AN   | 14     | Fee Group ID. One of the fields is mandatory fee_groups_id/fee_groups_reference_number.                    |
| response_data / fee_groups_reference_number | CE       | ANS  | 16     | Fee Group reference number. One of the field is mandatory fee_groups_id/fee_groups_reference_number.       |
| response_data / fixed_price                 | M        | N    | 1-12   | Fixed price in minor units                                                                                 |
| response_data / percent_price               | M        | N    | 1-12   | Percent price in minor units                                                                               |
| response_data / min_amount                  | M        | N    | 1-12   | Min amount in minor units                                                                                  |
| response_data / max_amount                  | M        | N    | 1-12   | Max amount in minor units                                                                                  |
| response_data / currencies_ison             | M        | N    | 3      | ISO numeric currency code                                                                                  |
| response_data / low_mccs_id                 | M        | N    | 4      | Low MCC                                                                                                    |
| response_data / high_mccs_id                | M        | N    | 4      | High MCC                                                                                                   |
| response_data / regions_id                  | M        | N    | 10     | Regions ID [`Country Regions`](#appendix--enum--country-regions).                                          |
| response_data / merchant_id                 | CE       | AN   | 16     | Merchant ID. One of the fields can be provided merchant_id/merchant_reference_number.                      |
| response_data / merchant_reference_number   | CE       | ANS  | 16     | Merchant unique reference number. One of the fields can be provided merchant_id/merchant_reference_number. |
| response_data / description                 | M        | A    | 1-50   | Fee description.                                                                                           |

## Get Fee Collections

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_fee_collections           |

### Request

| Parameter               | Notation | Type | Length | Description                                                         |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------|
| date_updated_microtime  | M        | N    | 1-14   | Date updated from last received fee collection entry. Format: `Uu`. |

```json
{
    "date_updated_microtime": "16553910839797"
}
```

### Response

| Parameter                                       | Notation | Type | Length | Description                                                    |
|:------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------|
| status                                          | M        | A    | -      | [`Available statuses`](#appendix--enum--status).               |
| status_code                                     | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).  |
| message                                         | M        | A    | -      | Response/error message.                                        |
| response_data                                   | M        | OBJ  | -      |                                                                |
| response_data / id                              | M        | N    | 14     | Internal entity ID.                                            |
| response_data / masked_pan                      | M        | NS   | 13-19  | Masked account number.                                         |
| response_data / amount                          | M        | N    | 1-13   | Amount in cents.                                               |
| response_data / currency                        | M        | N    | 3      | Amount ISO numeric currency code.                              |
| response_data / amount_direction                | M        | A    | 1      | Available values: C - Credit / D - Debit.                      |
| response_data / reconciliation_amount           | M        | N    | 13-19  | Reconciliation amount in cents.                                |
| response_data / reconciliation_currency         | M        | N    | 3      | Reconciliation amount ISO numeric currency code.               |
| response_data / reconciliation_amount_direction | M        | A    | 1      | Available values: C - Credit / D - Debit.                      |
| response_data / conversion_rate_reconciliation  | M        | N    | 3      | Conversion rate reconciliation.                                |
| response_data / function_code                   | M        | N    | 3      | [`Function code`](#appendix--enum--function-code).             |
| response_data / message_reason_code             | M        | N    | 4      | [`Message reason code`](#appendix--enum--message-reason-code). |
| response_data / trace_id                        | M        | ANS  | 15     | Trace ID.                                                      |
| response_data / message_number                  | M        | AN   | 8      | Message number.                                                |
| response_data / data_record                     | M        | ANS  | 1-255  | Data record.                                                   |
| response_data / transaction_destination_id      | M        | N    | 11     | Transaction destination ID.                                    |
| response_data / transaction_originator_id       | M        | N    | 11     | Transaction originator ID.                                     |
| response_data / transaction_receiving_id        | M        | N    | 11     | Transaction receiving ID.                                      |
| response_data / scheme_id                       | M        | M    | 1-10   | [`Available schemes`](#appendix--enum--scheme).                |
| response_data / date_updated_microtime          | M        | N    | 14     | Fee collection date updated. Format: `Uu`.                     |
| response_data / date_imported                   | M        | N    | 10-11  | Fee collection date imported.                                  |
| response_data / direction                       | M        | N    | 1      | Fee collection direction.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16568710644195",
        "masked_pan": "222300******0011",
        "amount": "500",
        "currency": "978",
        "amount_direction": "C",
        "reconciliation_amount": "50000",
        "reconciliation_currency": "978",
        "reconciliation_amount_direction": "C",
        "conversion_rate_reconciliation": "",
        "function_code": "700",
        "message_reason_code": "7600",
        "trace_id": "MCCA000020706",
        "message_number": "00000002",
        "data_record": "",
        "transaction_destination_id": "200100",
        "transaction_originator_id": "00000014382",
        "transaction_receiving_id": "",
        "scheme_id": "1",
        "date_updated_microtime": "16568710643927",
        "date_imported": "1656871064",
        "direction": "1"
    }
}
```

## Delete Fee

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | delete_fee                    |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                   |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify fee (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 16     | Entity unique reference number. One of the fields is required to identify fee (id / unique_reference_number). |

```json
{
	"unique_reference_number": "ref-fee"
}
```

### Response

| Parameter                               | Notation | Type | Length | Description                                                   |
|:----------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                 | M        | A    | -      | Response/error message.                                       |
| response_data                           | M        | OBJ  | -      |                                                               |
| response_data / id                      | CE       | N    | 14     | Internal entity ID.                                           |
| response_data / unique_reference_number | CE       | ANS  | 16     | Unique reference number.                                      |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "ref-fee"
    }
}
```

## Get order info

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_order_info                |

### Request

| Parameter | Notation | Type | Length | Description      |
|:----------|:---------|:-----|:-------|:-----------------|
| order_uid | M        | ANS  | 32     | Unique order ID. |

```json
{
    "order_uid": "UOI55485783517321610599689547346"
}
```

### Response

| Parameter                                        | Notation | Type | Length | Description                                                   |
|:-------------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                           | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                      | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                          | M        | A    | -      | Response/error message.                                       |
| response_data                                    | M        | OBJ  | -      |                                                               |
| response_data / order_uid                        | M        | ANS  | 32     | Unique order ID.                                              |
| response_data / order_type                       | M        | AN   | 1-32   | [`Order types`](#appendix--enum--order-type).                 |
| response_data / order_state                      | M        | AN   | 1-32   | [`Order states`](#appendix--enum--order-state).               |
| response_data / merchant_api_id                  | M        | ANS  | 255    | Merchant API ID.                                              |
| response_data / merchant_unique_reference_number | O        | ANS  | 1-16   | Merchant unique reference number.                             |
| response_data / quantity                         | M        | ANS  | 1-4    | Quantity of ordered devices.                                  |
| response_data / devices_list                     | O        | OBJ  | -      | List of ordered devices.                                      |
| response_data / devices_list / initial_guid      | M        | ANS  | 36     | Device initial GUID.                                          |
| response_data / devices_list / serial_number     | M        | ANS  | 1-64   | Device serial number.                                         |
| response_data / shipping_address                 | M        | ANS  | 1-255  | Shipping address.                                             |
| response_data / shipping_city                    | M        | ANS  | 1-50   | Shipping city.                                                |
| response_data / shipping_country                 | M        | ANS  | 1-50   | Shipping country.                                             |
| response_data / shipping_postcode                | M        | AN   | 1-20   | Shipping postcode.                                            |
| response_data / timestamp_created                | M        | N    | 1-20   | Create order timestamp.                                       |
| response_data / timestamp_updated                | M        | N    | 1-20   | Update order timestamp.                                       |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "order_uid": "UOI55485783517321610599689547346",
        "order_type": "new",
        "order_state": "new",
        "merchant_api_id": "abc54321",
        "merchant_unique_reference_number": "1234567989101112",
        "quantity": 4,
        "devices_list": [
            {
                "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
                "serial_number": "3926**********************************7216"
            },
            {
                "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b484",
                "serial_number": "9566**********************************5050"
            }
        ],
        "shipping_address": "Kestucio g. 24",
        "shipping_city": "Kaunas",
        "shipping_country": "Lithuania",
        "shipping_postcode": "44311",
        "timestamp_created": 15753604874738,
        "timestamp_updated": 15753604874738
    }
}
```

## Order devices

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | order_devices                 |

### Request

| Parameter         | Notation | Type | Length | Description        |
|:------------------|:---------|:-----|:-------|:-------------------|
| merchant_id       | M        | ANS  | 255    | Merchant API ID.   |
| quantity          | M        | N    | 1-4    | Quantity.          |
| shipping_address  | M        | ANS  | 1-255  | Shipping address.  |
| shipping_city     | M        | ANS  | 1-50   | Shipping city.     |
| shipping_country  | M        | ANS  | 1-50   | Shipping country.  |
| shipping_postcode | M        | AN   | 1-20   | Shipping postcode. |

```json
{
  "merchant_id": "abc54321",
  "quantity": "1",
  "shipping_address": "Royal ave. 24",
  "shipping_city": "London",
  "shipping_country": "United Kingdom",
  "shipping_postcode": "443111"
}
```

### Response

| Parameter                   | Notation | Type | Length | Description                                                   |
|:----------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                     | M        | A    | -      | Response/error message.                                       |
| response_data               | M        | OBJ  | -      |                                                               |
| response_data / order_uid   | M        | ANS  | 32     | Unique order ID.                                              |
| response_data / order_type  | M        | AN   | 32     | [`Order types`](#appendix--enum--order-type).                 |
| response_data / order_state | M        | AN   | 32     | [`Order states`](#appendix--enum--order-state).               |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "order_uid": "UOI15540401643731883527881101353",
    "order_type": "new",
    "order_state": "new"
  }
}
```

## Return devices

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | return_devices                |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                         |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------|
| merchant_id               | C        | N    | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.        |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided. |
| collection_address        | M        | ANS  | 1-255  | Collection address.                                                                 |
| collection_city           | M        | ANS  | 1-50   | Collection city.                                                                    |
| collection_country        | M        | ANS  | 1-50   | Collection country.                                                                 |
| collection_postcode       | M        | AN   | 1-20   | Collection postcode.                                                                |
| device_initial_guids      | M        | LIST | -      | List of devices initial_guid.                                                       |

```json
{
    "merchant_id": "",
    "merchant_reference_number": "ref-abc12345",
    "device_initial_guids": [
      "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461"
    ],
    "collection_address": "Royal ave. 24",
    "collection_city": "London",
    "collection_country": "United Kingdom",
    "collection_postcode": "44311"
}
```

### Response

| Parameter                   | Notation | Type | Length | Description                                                   |
|:----------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                     | M        | A    | -      | Response/error message.                                       |
| response_data               | M        | OBJ  | -      |                                                               |
| response_data / order_uid   | M        | ANS  | 32     | Unique order ID.                                              |
| response_data / order_type  | M        | AN   | 1-32   | [`Order types`](#appendix--enum--order-type).                 |
| response_data / order_state | M        | AN   | 1-32   | [`Order states`](#appendix--enum--order-state).               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "order_uid": "UOI60303015883059895803823256711",
        "order_type": "return",
        "order_state": "new"
    }
}
```

## Create Device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_device                 |

### Request

| Parameter                      | Notation | Type | Length | Description                                                                                                                                                               |
|:-------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| unique_reference_number        | M        | ANS  | 1-16   | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| merchant_id                    | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number      | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |
| terminal_host_id               | C        | AN   | 14     | Terminal host entity ID. This field or `terminal_host_reference_number` needs to be provided. Provided by Tribe.                                                          |
| terminal_host_reference_number | C        | ANS  | 1-16   | Terminal host unique reference number. This field or `terminal_host_id` needs to be provided. Provided by Tribe.                                                          |
| name                           | M        | ANS  | 1-255  | Device name.                                                                                                                                                              |
| serial_number                  | M        | AN   | 1-64   | Device serial number.                                                                                                                                                     |
| device_model_id                | M        | N    | 14     | Device model number provided by Tribe.                                                                                                                                    |
| pin_pad_currently_inoperative  | O        | N    | 1      | Pin pad currently inoperative. Values: `0` - disabled, `1` - enabled.                                                                                                     |
| stock_status                   | O        | ANS  | 10     | [`Stock statuses`](#appendix--enum--stock-status). If not provided, default is set: `on_site`.                                                                            |

```json
{
    "unique_reference_number": "acapi-device",
    "merchant_reference_number": "abc543211",
    "terminal_host_reference_number": "terminal-host-5",
    "name": "acapi-device",
    "serial_number": "SRNTEST4645002",
    "stock_status": "on_site",
    "device_model_id": "15904733850111",
    "pin_pad_currently_inoperative": "0"
}
```

### Response

| Parameter                                     | Notation | Type | Length | Description                                                                                              |
|:----------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------|
| status                                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                         |
| status_code                                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                            |
| message                                       | M        | A    | -      | Response/error message.                                                                                  |
| response_data                                 | M        | OBJ  | -      |                                                                                                          |
| response_data / id                            | M        | N    | 14     | Internal device ID.                                                                                      |
| response_data / unique_reference_number       | ME       | ANS  | 1-16   | Device unique reference number.                                                                          |
| response_data / name                          | ME       | AN   | 1-255  | Device name.                                                                                             |
| response_data / serial_number                 | ME       | AN   | 1-64   | Device serial number.                                                                                    |
| response_data / stock_status                  | CE       | ANS  | 10     | [`Stock statuses`](#appendix--enum--stock-status). Only returned if `stock_status` was given in request. |
| response_data / pin_pad_currently_inoperative | M        | N    | 1      | Pin pad currently inoperative. Values: `0` - disabled, `1` - enabled.                                    |
| response_data / merchant_id                   | M        | N    | 14     | Internal merchant ID.                                                                                    |
| response_data / device_model_id               | ME       | N    | 14     | Internal device model ID.                                                                                |
| response_data / terminal_host_id              | M        | N    | 14     | Internal terminal host ID.                                                                               |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16146027754448",
        "unique_reference_number": "acapi-device",
        "merchant_id": "16142554261014",
        "name": "acapi-device",
        "serial_number": "SRNTEST4645002",
        "stock_status": "on_site",
        "device_model_id": "15904733850111",
        "terminal_host_id": "16142555924901",
        "pin_pad_currently_inoperative": "0"
    }
}
```

## Update Device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | update_device                 |

### Request

| Parameter                      | Notation | Type | Length | Description                                                                                                      |
|:-------------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------|
| id                             | C        | N    | 14     | Internal entity ID. One of the fields is required to identify device (id / unique_reference_number).             |
| unique_reference_number        | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify device (id / unique_reference_number). |
| merchant_id                    | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                     |
| merchant_reference_number      | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                              |
| terminal_host_id               | C        | AN   | 14     | Terminal host entity ID. This field or `terminal_host_reference_number` needs to be provided. Provided by Tribe. |
| terminal_host_reference_number | C        | ANS  | 1-16   | Terminal host unique reference number. This field or `terminal_host_id` needs to be provided. Provided by Tribe. |
| name                           | O        | ANS  | 1-255  | Device name.                                                                                                     |
| device_model_id                | O        | N    | 14     | Device model number provided by Tribe.                                                                           |
| pin_pad_currently_inoperative  | O        | N    | 1      | Pin pad currently inoperative. Values: `0` - disabled, `1` - enabled.                                            |
| stock_status                   | O        | ANS  | 1-32   | [`Stock statuses`](#appendix--enum--stock-status).                                                               |
| configuration_status           | O        | ANS  | 1-32   | [`Configuration statuses`](#appendix--enum--configuration-status).                                               |

```json
{
    "unique_reference_number": "acapi-device",
    "merchant_reference_number": "abc543211",
    "terminal_host_reference_number": "terminal-host-5",
    "name": "acapi-device",
    "device_model_id": "15904733850119",
    "stock_status": "in_stock",
    "configuration_status": "blank"
}
```

### Response

| Parameter                                     | Notation | Type | Length | Description                                                           |
|:----------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------|
| status                                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                      |
| status_code                                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).         |
| message                                       | M        | A    | -      | Response/error message.                                               |
| response_data                                 | M        | OBJ  | -      |                                                                       |
| response_data / id                            | ME       | N    | 14     | Internal device ID.                                                   |
| response_data / unique_reference_number       | ME       | ANS  | 1-16   | Device unique reference number.                                       |
| response_data / name                          | ME       | AN   | 1-255  | Device name.                                                          |
| response_data / pin_pad_currently_inoperative | ME       | N    | 1      | Pin pad currently inoperative. Values: `0` - disabled, `1` - enabled. |
| response_data / stock_status                  | M        | ANS  | 1-32   | [`Stock statuses`](#appendix--enum--stock-status).                    |
| response_data / configuration_status          | M        | ANS  | 1-32   | [`Configuration statuses`](#appendix--enum--configuration-status).    |
| response_data / merchant_id                   | ME       | N    | 14     | Internal merchant ID.                                                 |
| response_data / device_model_id               | ME       | N    | 14     | Internal device model ID.                                             |
| response_data / terminal_host_id              | ME       | N    | 14     | Internal terminal host ID.                                            |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "unique_reference_number": "acapi-device",
        "merchant_reference_number": "abc543211",
        "terminal_host_reference_number": "terminal-host-5",
        "name": "acapi-device",
        "device_model_id": "15904733850119",
        "stock_status": "in_stock",
        "configuration_status": "blank"
    }
}
```

## Get Device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_device                    |

### Request

| Parameter               | Notation | Type | Length | Description                                                                                                      |
|:------------------------|:---------|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------|
| id                      | C        | N    | 14     | Internal entity ID. One of the fields is required to identify device (id / unique_reference_number).             |
| unique_reference_number | C        | ANS  | 1-16   | Entity unique reference number. One of the fields is required to identify device (id / unique_reference_number). |

```json
{
    "unique_reference_number": "acapi-device"
}
```

### Response

| Parameter                                     | Notation | Type | Length | Description                                                           |
|:----------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------|
| status                                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                      |
| status_code                                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).         |
| message                                       | M        | A    | -      | Response/error message.                                               |
| response_data                                 | M        | OBJ  | -      |                                                                       |
| response_data / id                            | M        | N    | 14     | Internal device ID.                                                   |
| response_data / unique_reference_number       | M        | ANS  | 1-16   | Device unique reference number.                                       |
| response_data / name                          | M        | AN   | 1-255  | Device name.                                                          |
| response_data / serial_number                 | M        | AN   | 1-64   | Device serial number.                                                 |
| response_data / pin_pad_currently_inoperative | M        | N    | 1      | Pin pad currently inoperative. Values: `0` - disabled, `1` - enabled. |
| response_data / initial_guid                  | M        | AN   | 36     | Device initial GUID.                                                  |
| response_data / guid                          | C        | AN   | 36     | Device GUID. Returned if present.                                     |
| response_data / stock_status                  | M        | ANS  | 1-32   | [`Stock statuses`](#appendix--enum--stock-status).                    |
| response_data / configuration_status          | M        | ANS  | 1-32   | [`Configuration statuses`](#appendix--enum--configuration-status).    |
| response_data / terminal_host_id              | M        | N    | 14     | Internal terminal host ID.                                            |
| response_data / device_model_id               | M        | N    | 14     | Internal device model ID.                                             |
| response_data / merchant_id                   | M        | N    | 14     | Internal merchant ID.                                                 |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16146039083055",
        "unique_reference_number": "acapi-device",
        "name": "acapi-device",
        "serial_number": "SRNTEST4645001",
        "pin_pad_currently_inoperative": "0",
        "initial_guid": "3a1ddece-32e7-4c53-bc97-3be31c861183",
        "guid": "3a1ddece-32e7-4c53-bc97-3be31c861166",
        "stock_status": "in_stock",
        "configuration_status": "blank",
        "merchant_id": "16142554261014",
        "terminal_host_id": "16142555924901",
        "device_model_id": "15904733850119"
    }
}
```

## Processable currencies

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | processable_currencies        |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                                                                                             |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchant_id               | C        | AN   | 14     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                            |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                     |
| add                       | C        | OBJ  | -      | List of currencies per scheme to add to processable currencies list. If entry already exists error will be thrown. Either `add` or `remove` data should be present.     |
| add / {{scheme}}          | M        | LIST | -      | ISO numeric currency code list of processable currencies per scheme. [`Available schemes`](#appendix--enum--scheme).                                                    |
| remove                    | C        | OBJ  | -      | List of currencies per scheme to remove from processable currencies list. If entry do not exists error will be thrown. Either `add` or `remove` data should be present. |
| remove / {{scheme}}       | M        | LIST | -      | ISO numeric currency code list. [`Available schemes`](#appendix--enum--scheme).                                                                                         |

```json
{
  "merchant_id": "merchant123",
  "add" : {
    "MC": ["826"],
    "VISA": ["840", "826"]
  },
  "remove": {
    "MC": ["840"]
  }
}
```

### Response

| Parameter                            | Notation | Type | Length | Description                                                                                         |
|:-------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------|
| status                               | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                                                    |
| status_code                          | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).                                       |
| message                              | M        | A    | -      | Response/error message.                                                                             |
| response_data                        | M        | OBJ  | -      |                                                                                                     |
| response_data / added                | C        | OBJ  | -      | List of processable currencies added per scheme. Only returned if there was any currency added.     |
| response_data / added / {{scheme}}   | CE       | LIST | -      | ISO numeric currency code list. [`Available schemes`](#appendix--enum--scheme).                     |
| response_data / removed              | C        | OBJ  | -      | List of processable currencies removed per scheme. Only returned if there was any currency removed. |
| response_data / removed / {{scheme}} | CE       | LIST | -      | ISO numeric currency code list. [`Available schemes`](#appendix--enum--scheme).                     |

```json
{
  "status": "success",
  "status_code": "000",
  "message": "Success",
  "response_data": {
    "added": {
      "MC": [
        "826"
      ]
    },
    "removed": {
      "MC": [
        "840"
      ]
    }
  }
}
```

## Grant access to device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | grant_access_to_device        |

### Request

| Parameter                                 | Notation | Type | Length | Description                                                                                                                                                             |
|:------------------------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| guid                                      | M        | ANS  | 36     | Device GUID.                                                                                                                                                            |
| initial_guid                              | M        | ANS  | 36     | Device initial GUID.                                                                                                                                                    |
| serial_number                             | M        | ANS  | 1-64   | Device serial number.                                                                                                                                                   |
| merchant_id                               | C        | N    | 14     | Merchant ID/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number.                                       |
| merchant_reference_number                 | C        | ANS  | 1-16   | Merchant reference number/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number.                         |
| grant_access_to_merchant_id               | C        | N    | 14     | Merchant ID to which device access will be granted. One of the fields is mandatory grant_access_to_merchant_id/grant_access_to_merchant_reference_number.               |
| grant_access_to_merchant_reference_number | C        | ANS  | 1-16   | Merchant reference number to which device access will be granted. One of the fields is mandatory grant_access_to_merchant_id/grant_access_to_merchant_reference_number. |

```json
{
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
    "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
    "serial_number": "39267819219100025148zz43743730420750777222",
    "merchant_id": "",
    "merchant_reference_number": "ref-abc12345",
    "grant_access_to_merchant_id": "",
    "grant_access_to_merchant_reference_number": "ref-grant12345"
}
```

### Response

| Parameter                                                 | Notation | Type | Length | Description                                                   |
|:----------------------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                                    | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                               | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                                   | M        | A    | -      | Response/error message                                        |
| response_data                                             | M        | OBJ  | -      |                                                               |
| response_data / guid                                      | ME       | ANS  | 36     | Device GUID.                                                  |
| response_data / initial_guid                              | ME       | ANS  | 36     | Device initial GUID.                                          |
| response_data / serial_number                             | ME       | ANS  | 1-64   | Device serial number.                                         |
| response_data / merchant_id                               | ME       | ANS  | 14     | Merchant ID.                                                  |
| response_data / merchant_reference                        | CE       | ANS  | 1-16   | Merchant reference number. Returned if present.               |
| response_data / grant_access_to_merchant_id               | ME       | ANS  | 14     | Grant access merchant ID.                                     |
| response_data / grant_access_to_merchant_reference_number | CE       | ANS  | 1-16   | Grant access merchant reference number. Returned if present.  |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
        "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
        "serial_number": "39267819219100025148zz43743730420750777222",
        "merchant_id": 15801331286706,
        "merchant_reference": "ref-abc12345",
        "grant_access_to_merchant_id": 15801331301294,
        "grant_access_to_merchant_reference_number ": "ref-grant12345"
    }
}
```

## Get granted permissions

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_granted_permissions       |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                                                                                     |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| guid                      | M        | ANS  | 36     | Device GUID.                                                                                                                                    |
| initial_guid              | M        | ANS  | 36     | Device initial GUID.                                                                                                                            |
| serial_number             | M        | ANS  | 1-64   | Device serial number.                                                                                                                           |
| merchant_id               | C        | N    | 14     | Merchant ID/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number.               |
| merchant_reference_number | C        | ANS  | 1-16   | Merchant reference number/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number. |

```json
{
	"guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
	"initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
	"serial_number": "39267819219100025148zz43743730420750777222",
	"merchant_id": "",
	"merchant_reference_number": "ref-abc12345"
}
```

### Response

| Parameter                                                 | Notation | Type | Length | Description                                                   |
|:----------------------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                                    | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                               | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                                   | M        | A    | -      | Response/error message                                        |
| guid                                                      | ME       | ANS  | 36     | Device GUID.                                                  |
| initial_guid                                              | ME       | ANS  | 36     | Device initial GUID.                                          |
| serial_number                                             | ME       | ANS  | 1-64   | Device serial number.                                         |
| merchant_id                                               | ME       | N    | 14     | Merchant ID.                                                  |
| merchant_reference_number                                 | CE       | ANS  | 1-16   | Merchant reference number. Returned if present.               |
| response_data                                             | M        | OBJ  | -      |                                                               |
| response_data / grant_access_to_merchant_id               | M        | N    | 14     | Grant access merchant ID.                                     |
| response_data / grant_access_to_merchant_reference_number | C        | ANS  | 1-16   | Grant access merchant reference number. Returned if present.  |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
    "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
    "serial_number": "39267819219100025148zz43743730420750777222",
    "merchant_id": 15801970715175,
    "merchant_reference": "ref-abc12345",
    "response_data": [
        {
            "grant_access_to_merchant_id": 15801970729819,
            "grant_access_to_merchant_reference_number ": "ref-grant12345"
        },
        {
            "grant_access_to_merchant_id": 15801970744449,
            "grant_access_to_merchant_reference_number ": "ref-grant54321"
        }
    ]
}
```

## Revoke access to device

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | revoke_access_to_device       |

### Request

| Parameter                                  | Notation | Type | Length | Description                                                                                                                                                                 |
|:-------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| guid                                       | M        | ANS  | 36     | Device GUID.                                                                                                                                                                |
| initial_guid                               | M        | ANS  | 36     | Device initial GUID.                                                                                                                                                        |
| serial_number                              | M        | ANS  | 1-64   | Device serial number.                                                                                                                                                       |
| merchant_id                                | C        | N    | 14     | Merchant ID/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number.                                           |
| merchant_reference_number                  | C        | ANS  | 1-16   | Merchant reference number/reference of owner merchant assigned to device. One of the fields is mandatory merchant_id/merchant_reference_number.                             |
| revoke_access_to_merchant_id               | C        | N    | 14     | Merchant ID from which device access will be revoked. One of the fields is mandatory revoke_access_to_merchant_id/revoke_access_to_merchant_reference_number.               |
| revoke_access_to_merchant_reference_number | C        | ANS  | 1-16   | Merchant reference number from which device access with be revoked. One of the fields is mandatory revoke_access_to_merchant_id/revoke_access_to_merchant_reference_number. |

```json
{
	"guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
	"initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
	"serial_number": "39267819219100025148zz43743730420750777222",
	"merchant_id": "",
	"merchant_reference_number": "ref-abc12345",
	"revoke_access_to_merchant_id": "",
	"revoke_access_to_merchant_reference_number": "ref-grant12345"
}
```

### Response

| Parameter                                                  | Notation | Type | Length | Description                                                   |
|:-----------------------------------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                                                     | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                                                | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                                                    | M        | A    | -      | Response/error message                                        |
| response_data                                              | M        | OBJ  | -      |                                                               |
| response_data / guid                                       | ME       | ANS  | 36     | Device GUID.                                                  |
| response_data / initial_guid                               | ME       | ANS  | 36     | Device initial GUID.                                          |
| response_data / serial_number                              | ME       | ANS  | 1-64   | Device serial number.                                         |
| response_data / merchant_id                                | ME       | ANS  | 14     | Merchant ID.                                                  |
| response_data / merchant_reference                         | CE       | ANS  | 1-16   | Merchant reference number. Returned if present.               |
| response_data / revoke_access_to_merchant_id               | ME       | ANS  | 14     | Revoke access merchant ID.                                    |
| response_data / revoke_access_to_merchant_reference_number | CE       | ANS  | 1-16   | Revoke access merchant reference number. Returned if present. |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b462",
        "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b461",
        "serial_number": "39267819219100025148zz43743730420750777222",
        "merchant_id": 15802886149006,
        "merchant_reference": "ref-abc12345",
        "revoke_access_to_merchant_id": 15802886163752,
        "revoke_access_to_merchant_reference_number ": "ref-grant12345"
    }
}
```

## Ping

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | ping                          |

### Request

| Parameter | Notation | Type | Length | Description                                           |
|:----------|:---------|:-----|:-------|:------------------------------------------------------|
| message   | M        | ANS  | 1-255  | Request message. Message must be static value "ping". |

```json
{
	"message": "ping"
}
```

### Response

| Parameter               | Notation | Type | Length | Description                                                   |
|:------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                  | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code             | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                 | M        | A    | -      | Response/error message.                                       |
| response_data           | M        | OBJ  | -      |                                                               |
| response_data / message | M        | ANS  | 1-255  | Response message. Message will be static value "pong".        |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "message": "pong"
    }
}
```

## Create TRID

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | create_trid                   |

### Request

| Parameter                 | Notation | Type | Length | Description                                                                         |
|:--------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------|
| merchant_id               | C        | AN   | 16     | Merchant ID. This field or `merchant_reference_number` needs to be provided.        |
| merchant_reference_number | C        | ANS  | 16     | Merchant unique reference number. This field or `merchant_id` needs to be provided. |

```json
{
    "merchant_reference_number": "abc543211"
}
```

### Response

| Parameter                   | Notation | Type | Length | Description                                                   |
|:----------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                     | M        | A    | -      | Response/error message.                                       |
| response_data               | M        | OBJ  | -      |                                                               |
| response_data / id          | M        | N    | 14     | Internal entity ID.                                           |
| response_data / merchant_id | M        | N    | 14     | Merchant ID.                                                  |
| response_data / entity_name | M        | ANS  | 14     | TRID entity name.                                             |
| response_data / status      | M        | A    | -      | [`TRID statuses`](#appendix--TRID--status).                   |
| response_data / trid        | O        | N    | 11     | TRID.                                                         |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16335233875475",
        "merchant_id": "16318741155879",
        "entity_name": "test 16318741155879",
        "status": "pending"
    }
}
```

## Get TRID

| URL    | Method | Header parameter - `x-method` |
|:-------|:-------|:------------------------------|
| /acapi | POST   | get_trid                      |

### Request

| Parameter | Notation | Type | Length | Description                                                |
|:----------|:---------|:-----|:-------|:-----------------------------------------------------------|
| id        | M        | N    | 14     | Internal entity ID received from `create_trid` method call |

```json
{
    "id": "16335233875475"
}
```

### Response

| Parameter                   | Notation | Type | Length | Description                                                   |
|:----------------------------|:---------|:-----|:-------|:--------------------------------------------------------------|
| status                      | M        | A    | -      | [`Available statuses`](#appendix--enum--status).              |
| status_code                 | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code). |
| message                     | M        | A    | -      | Response/error message.                                       |
| response_data               | M        | OBJ  | -      |                                                               |
| response_data / id          | M        | N    | 14     | Internal entity ID.                                           |
| response_data / merchant_id | M        | N    | 14     | Merchant ID.                                                  |
| response_data / entity_name | M        | ANS  | 14     | TRID entity name.                                             |
| response_data / status      | M        | A    | -      | [`TRID statuses`](#appendix--TRID--status).                   |
| response_data / trid        | O        | N    | 11     | TRID.                                                         |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16335233875475",
        "merchant_id": "16318741155879",
        "entity_name": "test 16318741155879",
        "status": "active",
        "trid": "98765432101"
    }
}
```

## Create Card Update Registration

| URL    | Method | Header parameter - `x-method`   |
|:-------|:-------|:--------------------------------|
| /acapi | POST   | create_card_update_registration |

### Request

| Parameter                      | Notation | Type | Length | Description                                                                                                                                                               |
|:-------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| unique_reference_number        | M        | ANS  | 16     | Entity unique reference number. Can only contain letters, numbers and `-` symbol. Unique value should be provided, this value will be echoed back on successful response. |
| merchant_id                    | C        | AN   | 16     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number      | C        | ANS  | 16     | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |
| sale_point_id                  | C        | AN   | 16     | Sale point entity ID. This field or `sale_point_reference_number` needs to be provided.                                                                                   |
| sale_point_reference_number    | C        | ANS  | 16     | Sale point unique reference number. This field or `sale_point_id` needs to be provided.                                                                                   |
| scheme                         | M        | ANS  | 1-16   | Scheme. [`Available schemes`](#appendix--enum--scheme).                                                                                                                   |
| active                         | M        | N    | 1      | Is active. Values: 0 - disabled, 1 - enabled.                                                                                                                             |

```json
{
    "unique_reference_number": "acapi-cur",
    "merchant_reference_number": "abc543211",
    "sale_point_reference_number": "sale-point-5",
    "scheme": "MC",
    "active": "1"
}
```

### Response

| Parameter                                     | Notation | Type | Length | Description                                                           |
|:----------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------|
| status                                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                      |
| status_code                                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).         |
| message                                       | M        | A    | -      | Response/error message.                                               |
| response_data                                 | M        | OBJ  | -      |                                                                       |
| response_data / id                            | M        | N    | 14     | Internal ID.                                                          |
| response_data / unique_reference_number       | M        | ANS  | 16     | Unique reference number.                                              |
| response_data / scheme                        | M        | ANS  | 1-16   | Scheme. [`Available schemes`](#appendix--enum--scheme).               |
| response_data / merchant_id                   | M        | N    | 14     | Internal merchant ID.                                                 |
| response_data / sale_point_id                 | M        | N    | 14     | Internal sale point ID.                                               |
| response_data / active                        | M        | N    | 1      | Is active. Values: 0 - disabled, 1 - enabled.                         |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16146027754448",
        "unique_reference_number": "acapi-cur",
        "scheme": "MC",
        "merchant_id": "16142554261014",
        "sale_point_id": "15904733850111",
        "active": "1"
    }
}
```

## Update Card Update Registration

| URL    | Method | Header parameter - `x-method`   |
|:-------|:-------|:--------------------------------|
| /acapi | POST   | update_card_update_registration |

### Request

| Parameter                      | Notation | Type | Length | Description                                                                                                                                                               |
|:-------------------------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                             | C        | N    | 14     | Internal entity ID. One of the fields is required to identify the setting (id / unique_reference_number).                                                                 |
| unique_reference_number        | C        | ANS  | 16     | Entity unique reference number. One of the fields is required to identify the setting (id / unique_reference_number).                                                     |
| merchant_id                    | C        | AN   | 16     | Merchant ID. This field or `merchant_reference_number` needs to be provided.                                                                                              |
| merchant_reference_number      | C        | ANS  | 16     | Merchant unique reference number. This field or `merchant_id` needs to be provided.                                                                                       |
| sale_point_id                  | C        | AN   | 16     | Sale point entity ID. This field or `sale_point_reference_number` needs to be provided.                                                                                   |
| sale_point_reference_number    | C        | ANS  | 16     | Sale point unique reference number. This field or `sale_point_id` needs to be provided.                                                                                   |
| scheme                         | M        | ANS  | 1-16   | Scheme. [`Available schemes`](#appendix--enum--scheme).                                                                                                                   |
| active                         | M        | N    | 1      | Is active. Values: 0 - disabled, 1 - enabled.                                                                                                                             |

```json
{
    "id": "16146027754448",
    "unique_reference_number": "acapi-cur",
    "merchant_reference_number": "abc543211",
    "sale_point_reference_number": "sale-point-5",
    "scheme": "MC",
    "active": "1"
}
```

### Response

| Parameter                                     | Notation | Type | Length | Description                                                           |
|:----------------------------------------------|:---------|:-----|:-------|:----------------------------------------------------------------------|
| status                                        | M        | A    | -      | [`Available statuses`](#appendix--enum--status).                      |
| status_code                                   | M        | N    | 3      | [`Available response codes`](#appendix--enum--response-code).         |
| message                                       | M        | A    | -      | Response/error message.                                               |
| response_data                                 | M        | OBJ  | -      |                                                                       |
| response_data / id                            | M        | N    | 14     | Internal ID.                                                          |
| response_data / unique_reference_number       | M        | ANS  | 16     | Unique reference number.                                              |
| response_data / scheme                        | M        | ANS  | 1-16   | Scheme. [`Available schemes`](#appendix--enum--scheme).               |
| response_data / merchant_id                   | M        | N    | 14     | Internal merchant ID.                                                 |
| response_data / sale_point_id                 | M        | N    | 14     | Internal sale point ID.                                               |
| response_data / active                        | M        | N    | 1      | Is active. Values: 0 - disabled, 1 - enabled.                         |

```json
{
    "status": "success",
    "status_code": "000",
    "message": "Success",
    "response_data": {
        "id": "16146027754448",
        "unique_reference_number": "acapi-cur",
        "scheme": "MC",
        "merchant_id": "16142554261014",
        "sale_point_id": "15904733850111",
        "active": "1"
    }
}
```

# Appendix
## Changelog

| Version | Date               | Updates                                                                                                                                                                                                                                                                                                                                                   |
|---------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.4.12  | July 22, 2022      | <!-- tj --> Added new field `remove_parent_sale_point` to [`Update Sale Point`](#actions--update-sale-point) and `parent_sale_point_reference_number` to [`Get Sale Point`](#actions--get-sale-point)                                                                                                                                                     |
| 1.4.11  | July 07, 2022      | <!-- nl --> Added new method: [`Get fee collections`](#actions--get-fee-collections) and new enum: [`Message reason code`](#appendix--enum--message-reason-code), [`Function code`](#appendix--enum--function-code)                                                                                                                                       |
| 1.4.10  | June 20, 2022      | <!-- tj --> Moved [`mcc_code`, `mcc_codes`] fields from merchant to to sale_point.                                                                                                                                                                                                                                                                        |
| 1.4.9   | March 31, 2022     | <!-- tj --> Removed conditional field: `risk_score_groups` from [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant)                                                                                                                                                                                            |
| 1.4.8   | March 26, 2021     | <!-- tj --> Added new fields [`participating_in_card_update`, `card_update_notification_url`] to [`Create Merchant`](#actions--create_merchant) and [`Update Merchant`](#actions--update_merchant). Added new actions: `create_card_update_registration`, `update_card_update_registration`.                                                              |
| 1.4.7   | March 1, 2022      | <!-- ts --> Added new fields [`clone_keys_from_merchant_id`, `clone_keys_from_merchant_unique_reference_number`] to [`Create Merchant`](#actions--create-merchant) and [`Update Merchant`](#actions--update-merchant).                                                                                                                                    |
| 1.4.6   | February 01, 2022  | <!-- nl --> Updated [`Create Device`](#actions--create-device--request), added new field [`stock_status`]                                                                                                                                                                                                                                                 |
| 1.4.5   | December 29, 2021  | <!-- tj --> Added new action [`Unassign terminal from device`](#actions--unassign-terminal-from-device).                                                                                                                                                                                                                                                  |
| 1.4.4   | December 21, 2021  | <!-- nl --> Increased max length of `name` in request and response of [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant) and [`Get Merchant`](#actions--get-merchant).                                                                                                                                        |
| 1.4.3   | November 16, 2021  | <!-- nl --> All fields related to H2H Solar are deprecated and removed from the documentation.                                                                                                                                                                                                                                                            |
| 1.4.2   | November 15, 2021  | <!-- ts --> Updated [`merchant_public_key`, `merchant_client_public_key`] value encoding with Base64 in [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant), [`Get Merchant`](#actions--get-merchant)                                                                                                          |
| 1.4.1   | November 11, 2021  | <!-- dv --> Added new fields: [`expected_tx_count`, `expected_tx_volume`] to [`Create Merchant`](#actions--create-merchant), [`Create Sale Point`](#actions--create-sale-point), [`Update Sale Point`](#actions--update-sale-point), [`Get Sale Point`](#actions--get-sale-point).                                                                        |
| 1.4.0   | October 28, 2021   | <!-- dv --> Added new actions: `create_fee_group`, `update_fee_group`, `get_fee_group`, `delete_fee_group`, `create_fee`, `update_fee`, `get_fee`, `delete_fee`.                                                                                                                                                                                          |
| 1.3.20  | September 13, 2021 | <!-- nl --> Fixed `password` and `password_mode` dependency in requests and response for calls [`create_merchant`](#actions--create-merchant), [`create_terminal`](#actions--create-terminal) and [`update_terminal`](#actions--update-terminal).                                                                                                         |
| 1.3.19  | September 08, 2021 | <!-- tj --> Added new actions: `create_trid` and `get_trid`.                                                                                                                                                                                                                                                                                              |
| 1.3.18  | August 31, 2021    | <!-- nl --> Various field lengths speficied in requests and responses.                                                                                                                                                                                                                                                                                    |
| 1.3.17  | August 18, 2021    | <!-- nl --> Updated [`public_key`, `merchant_public_key`] names to [`merchant_public_key`, `merchant_client_public_key`] in [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant), [`Get Merchant`](#actions--get-merchant)                                                                                      |
| 1.3.16  | August 06, 2021    | <!-- nl --> Changed notations from mandatory/mandatory echo to optional/conditional echo for parameters: `callback_url`, `risk_score_groups` in [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant) and [`Create Terminal`](#actions--create-terminal).                                                        |
| 1.3.15  | August 02, 2021    | <!-- tj --> Added optional SalePoint field `trid`.                                                                                                                                                                                                                                                                                                        |
| 1.3.14  | July 19, 2021      | <!-- tj --> Added new optional fields [`add_merchants`, `remove_merchants`, `add_users`, `remove_users`] to [`Update merchant group`](#actions--update-merchant-group).                                                                                                                                                                                   |
| 1.3.13  | July 02, 2021      | <!-- tj --> New fields added [`website_url`,`phone_number`,`activation_phone_number`,`use_transaction_risk_analysis_exemption`,`fraud_rate_bps`] to [`Create Merchant`](#actions--create-merchant), [`Create Sale Point`](#actions--create-sale-point), [`Update Sale Point`](#actions--update-sale-point), [`Get Sale Point`](#actions--get-sale-point). |
| 1.3.12  | June 14, 2021      | <!-- nl --> Changed `mastercard_assigned_id` type from alphanumeric to numeric in all calls.                                                                                                                                                                                                                                                              |
| 1.3.11  | June 08, 2021      | <!-- nl --> Added fields: `processable_currencies` object and list to [`Get Merchant`](#actions--get-merchant).                                                                                                                                                                                                                                           |
| 1.3.10  | June 02, 2021      | <!-- tj --> Added new optional fields `merchant_public_key` and `public_key`. Added optional field `regenerate_mapi_keys` to regenerate merchant keys.                                                                                                                                                                                                    |
| 1.3.9   | June 01, 2021      | <!-- dv --> Added response codes                                                                                                                                                                                                                                                                                                                          |
| 1.3.8   | April 27, 2021     | <!-- dv --> Added conditional field: `risk_score_groups` to [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant)                                                                                                                                                                                                |
| 1.3.7   | April 15, 2021     | <!-- tb --> Update description for fields: [`mc_merchant_id`, `visa_merchant_id`].                                                                                                                                                                                                                                                                        |
| 1.3.6   | March 26, 2021     | <!-- ts --> Added mandatory `card_acceptor_name ` and optional `short_card_acceptor_name ` SalePoint fields to `create_merchant`, `create_sale_point`, `update_sale_point`, `get_sale_point`                                                                                                                                                              |
| 1.3.5   | March 15, 2021     | <!-- tb --> Added new actions: `create_device`, `update_device`, `get_device`.                                                                                                                                                                                                                                                                            |
| 1.3.4   | March 01, 2020     | <!-- nj --> Added mandatory fields: `address` and `phone_number` to [`Create Merchant`](#actions--create-merchant), [`Update Merchant`](#actions--update-merchant) and [`Get Merchant`](#actions--get-merchant)                                                                                                                                           |
| 1.3.3   | February 19, 2021  | <!-- nj --> Updated `Security`. Deleted `Authentication` section from [`Enum`](#appendix--enum).                                                                                                                                                                                                                                                          |
| 1.3.2   | December 08, 2020  | <!-- ts --> Added optional SalePoint field 'description' to `create_merchant`, `create_sale_point`, `update_sale_point`, `get_sale_point`                                                                                                                                                                                                                 |
| 1.3.1   | September 14, 2020 | <!-- tb --> Added optional SalePoint field 'allow_initial_recurring_payment_without_3ds'                                                                                                                                                                                                                                                                  |
| 1.3.0   | August 14, 2020    | Added new SalePoint fields 'platform_type', 'mc_merchant_id', 'visa_merchant_id', 'upi_merchant_id', 'jcb_merchant_id', 'solar_merchant_id'.                                                                                                                                                                                                              |
| 1.2.2   | August 12, 2020    | <!-- rik --> updating $rb value calculation in [`Cryptography`](#appendix--security--cryptography) encryptRequest example.                                                                                                                                                                                                                                |
| 1.2.1   | August 04, 2020    | <!-- rik --> Added private key format requirement to [`Cryptography`](#appendix--security--cryptography) example.                                                                                                                                                                                                                                         |
| 1.2.0   | June 02, 2020      | Added new merchant field 'use_default_sender_receiver'.                                                                                                                                                                                                                                                                                                   |
|         |                    | Added new person fields 'first_name', 'last_name', removed 'full_name'.                                                                                                                                                                                                                                                                                   |
| 1.1.1   | Jun 16, 2020       | Rename new merchant field from 'parent_merchant_id' to 'parent_id'.                                                                                                                                                                                                                                                                                       |
| 1.1.0   | May 14, 2020       | Added new terminal field 'password_mode'.                                                                                                                                                                                                                                                                                                                 |
|         |                    | Added new sale point fields 'address', 'additional_info_1', 'additional_info_2'.                                                                                                                                                                                                                                                                          |
| 1.0.6   | May 12, 2020       | Added new action "delete_settlement_account".                                                                                                                                                                                                                                                                                                             |
| 1.0.5   | April 30, 2020     | Added new action "delete_merchant".                                                                                                                                                                                                                                                                                                                       |
| 1.0.4   | April 29, 2020     | Added new action "delete_terminal".                                                                                                                                                                                                                                                                                                                       |
| 1.0.3   | April 15, 2020     | Added new action "delete_account".                                                                                                                                                                                                                                                                                                                        |
| 1.0.2   | April 14, 2020     | Added new action "delete_sale_point".                                                                                                                                                                                                                                                                                                                     |
| 1.0.1   | April 07, 2020     | Added new merchant field 'validate_risk_rules'.                                                                                                                                                                                                                                                                                                           |
| 1.0.0   | March 24, 2020     | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->                                                                                                                                                                                                                                  |

## Enum
### Order status

| Order status          | Description            |
|:----------------------|:-----------------------|
| new                   | New.                   |
| accepted              | Accepted.              |
| collecting            | Collecting.            |
| waiting_for_transport | Waiting for transport. |
| shipped               | Shipped.               |
| completed             | Completed.             |
| canceled              | Canceled.              |

### Order type

| Order type | Description |
|:-----------|:------------|
| new        | New.        |
| return     | Return.     |
| rma        | RMA.        |

### TRID status

| TRID status | Description |
|:------------|:------------|
| pending     | Pending.    |
| active      | Active.     |
| error       | Error.      |

### Response code

| Response Code | Description                                                                                               |
|:--------------|:----------------------------------------------------------------------------------------------------------|
| 000           | Success.                                                                                                  |
| 001           | Invalid credentials.                                                                                      |
| 002           | Credentials not active.                                                                                   |
| 003           | Invalid method.                                                                                           |
| 004           | Invalid signature provided.                                                                               |
| 005           | Invalid data provided. \__ERROR__                                                                         |
| 006           | Invalid \__DATA_ENTITY__ data: \__ERROR__.                                                                |
| 007           | Missing required \__ENTITY__ entity data.                                                                 |
| 008           | Entity \__ENTITY__ contains unsupported field: \__FIELD__                                                 |
| 009           | Could not save \__ENTITY__ data. All other changes were rolled back.                                      |
| 010           | Response encryption failed.                                                                               |
| 011           | Request decryption failed.                                                                                |
| 012           | Unique reference number is required for every entity.                                                     |
| 013           | Sale point default account could not be found by provided unique reference number.                        |
| 014           | Could not find any acquirer for processing scheme \__SCHEME__.                                            |
| 015           | Could not find any acquirer bin for processing scheme \__SCHEME__ and currency \__CURRENCY__.             |
| 016           | Could not find sale point for terminal by provided ID.                                                    |
| 017           | Could not find scheme \__SCHEME__.                                                                        |
| 018           | Parent merchant by provided id not found.                                                                 |
| 019           | Unknown methods \__METHODS__ provided so terminal permissions could not be created.                       |
| 020           | Multiple \__TYPE__ entity data provided. Only one entry per type is allowed.                              |
| 021           | Duplicate unique reference number provided in entity \__ENTITY__ .                                        |
| 022           | Missing required field: merchant_id.                                                                      |
| 023           | Merchant does not exist.                                                                                  |
| 024           | Missing required field: quantity.                                                                         |
| 025           | Missing required field: shipping_address.                                                                 |
| 026           | Missing required field: shipping_city.                                                                    |
| 027           | Missing required field: shipping_country.                                                                 |
| 028           | Missing required field: shipping_postcode.                                                                |
| 029           | shipping_address max field length 255 characters.                                                         |
| 030           | shipping_city max field length 50 characters.                                                             |
| 031           | shipping_country max field length 50 characters.                                                          |
| 032           | shipping_postcode max field length 20 characters.                                                         |
| 033           | Unable to create order.                                                                                   |
| 036           | Missing required field: ID.                                                                               |
| 037           | Device not found.                                                                                         |
| 038           | Device does not have serial number assigned.                                                              |
| 039           | quantity max field length 4 characters.                                                                   |
| 040           | quantity field type must be numeric.                                                                      |
| 041           | Processable currency '__CURRENCY__' for scheme '__SCHEME__' already exists.                               |
| 042           | Processable currency '__CURRENCY__' for scheme '__SCHEME__' could not be found.                           |
| 044           | Missing required field: initial_guid.                                                                     |
| 045           | Device has not been assigned to terminal yet.                                                             |
| 046           | One of the fields are required: merchant_id, merchant_reference_number.                                   |
| 047           | One of the fields are required: terminal_id, terminal_reference_number.                                   |
| 048           | Terminal not found.                                                                                       |
| 049           | Merchant not found.                                                                                       |
| 050           | Incorrect device configuration status.                                                                    |
| 051           | Incorrect device stock status.                                                                            |
| 052           | Merchant does not have access to selected device.                                                         |
| 053           | Grant access merchant not found.                                                                          |
| 054           | One of the fields are required: grant_access_to_merchant_id, grant_access_to_merchant_reference_number.   |
| 055           | Merchant already has grant access to selected device.                                                     |
| 056           | Missing required field: Message.                                                                          |
| 057           | Incorrect message.                                                                                        |
| 058           | One of the fields are required: revoke_access_to_merchant_id, revoke_access_to_merchant_reference_number. |
| 059           | Revoke access merchant not found.                                                                         |
| 060           | Missing required field: collection_address.                                                               |
| 061           | Missing required field: collection_city.                                                                  |
| 062           | Missing required field: collection_country.                                                               |
| 063           | Missing required field: collection_postcode.                                                              |
| 064           | collection_address max field length 255 characters.                                                       |
| 065           | collection_city max field length 50 characters.                                                           |
| 066           | collection_country max field length 50 characters.                                                        |
| 067           | collection_postcode max field length 20 characters.                                                       |
| 068           | mai_reference_id value is already in use.                                                                 |
| 069           | Person not found.                                                                                         |
| 070           | Missing required field: device_initial_guids.                                                             |
| 071           | Device not found by initial_guid ('__INITIAL_GUID__').                                                    |
| 072           | Merchant already has person assigned. You are only allowed to update it.                                  |
| 073           | Terminal permissions invalid format.                                                                      |
| 074           | Merchant processable currencies invalid format.                                                           |
| 091           | name can not be longer than 22 symbols.                                                                   |
| 092           | city can not be longer than 13 symbols.                                                                   |
| 093           | visa_verification_value can not be longer than 10 symbols.                                                |
| 094           | contract_number can not be longer than 20 symbols.                                                        |
| 095           | mastercard_assigned_id can not be longer than 6 symbols.                                                  |
| 096           | One of the fields is required id / unique_reference_number.                                               |
| 097           | '__ENTITY__' not found.                                                                                   |
| 098           | No access to resource '__RESOURCE__'.                                                                     |
| 099           | SalePoint can not be deleted, because it is assigned to terminal.                                         |
| 100           | Field platform_type is required.                                                                          |
| 101           | Terminal type must be physical                                                                            |
| 102           | Merchant group not found.                                                                                 |
| 103           | Device serial number already exists.                                                                      |
| 104           | Terminal host not found.                                                                                  |
| 105           | Incorrect stock status.                                                                                   |
| 106           | Incorrect configuration status.                                                                           |
| 109           | TDD failure.                                                                                              |
| 111           | One of the fields are required: sale_point_id, sale_point_reference_number.                               |
| 112           | Provided merchant_id and merchant_reference_number do not match                                           |
| 113           | Provided sale_poind_id and sale_point_reference_number do not match                                       |
| 128           | TRID request is already pending or active.                                                                |

### Message reason code

| Code | Description                                                                                             |
|:-----|:--------------------------------------------------------------------------------------------------------|
| 1400 | Not previously authorized                                                                               |
| 1401 | Previously approved authorization - amount same                                                         |
| 1402 | Previously approved authorization - amount differs                                                      |
| 1403 | Previously approved authorization - partial amount, multi-clearing                                      |
| 1404 | Previously approved authorization - partial amount, final clearing                                      |
| 1500 | Identifies a syntax error return                                                                        |
| 2001 | Invalid Acquirer Reference Data on chargeback no documentation required or provided                     |
| 2002 | Non-receipt of required documentation to support chargeback within maximum time frame                   |
| 2003 | Correct transaction date provided                                                                       |
| 2004 | Invalid Acquirer Reference Data on chargeback; documentation was received                               |
| 2005 | Correct card acceptor location/description provided                                                     |
| 2008 | Issuer authorized transaction                                                                           |
| 2011 | Credit previously issued                                                                                |
| 2700 | Chargeback remedied - see corresponding documentation                                                   |
| 2701 | Duplicate chargeback                                                                                    |
| 2702 | Past chargeback time limit                                                                              |
| 2703 | Requested transaction document provided (required hardship variance)                                    |
| 2704 | Invalid member message text                                                                             |
| 2705 | Correct MCC provided                                                                                    |
| 2706 | Authorization advised suspicious                                                                        |
| 2707 | No authorization request required nor attempted                                                         |
| 2708 | Account was not listed on the applicable warning bulletin as of the transaction date                    |
| 2709 | Documentation received was illegible                                                                    |
| 2710 | Scanning error - unrelated documents or partial scan                                                    |
| 2713 | Invalid chargeback                                                                                      |
| 2870 | Chip liability shift                                                                                    |
| 2871 | Chip/PIN liability shift. Reserved for intra-Europe and intra-Canada                                    |
| 4515 | Cardholder Denied transaction finalized                                                                 |
| 4804 | Multiple processing, duplicate (used only by the Mastercard Network for European acquired transactions) |
| 4807 | Warning bulletin                                                                                        |
| 4808 | Requested/required authorization not obtained                                                           |
| 4809 | Transaction not reconciled (used only by the Mastercard Network for European acquired transactions)     |
| 4811 | Stale transaction (used only by the Mastercard Network only for European acquired transactions)         |
| 4812 | Account number was not on file                                                                          |
| 4831 | Transaction amount differs                                                                              |
| 4834 | Duplicate processing                                                                                    |
| 4837 | Fraudulent transaction; no cardholder authorization                                                     |
| 4840 | Fraudulent processing of transaction                                                                    |
| 4841 | Canceled recurring transaction                                                                          |
| 4842 | Late presentment                                                                                        |
| 4846 | Correct transaction currency code was not provided                                                      |
| 4849 | Questionable card acceptor activity                                                                     |
| 4850 | Installment transaction dispute                                                                         |
| 4853 | Cardholder dispute defective/Not as described                                                           |
| 4854 | Cardholder dispute not elsewhere classified (U.S. only)                                                 |
| 4855 | Non-receipt of merchandise                                                                              |
| 4859 | Services not rendered                                                                                   |
| 4860 | Credit not processed                                                                                    |
| 4863 | Cardholder does not recognize - potential fraud                                                         |
| 4870 | Chip liability shift                                                                                    |
| 4871 | Chip/PIN liability shift. Reserved for intra-Europe and intra-Canada                                    |
| 4880 | Maestro late presentment                                                                                |
| 4890 | Identified a syntax error return                                                                        |
| 4901 | Required documentation not received to support prior Second Presentment/1240                            |
| 4902 | Documentation received was illegible                                                                    |
| 4903 | Scanning error - unrelated documents or partial scan                                                    |
| 4905 | Invalid acquirer reference data in Second Presentment/1240; no documentation required or provided       |
| 4908 | Invalid acquirer reference data in Second Presentment.1240; documentation was received                  |
| 4999 | Domestic chargeback dispute. Reserved for intra-Europe and inter-European use                           |

### Function code

| Code | Message                    |
|:-----|:---------------------------|
| 695  | File trailer               |
| 200  | First presentment          |
| 603  | Retrieval Request          |
| 605  | Non fulfillment            |
| 450  | First chargeback full      |
| 453  | First chargeback partial   |
| 205  | Second presentment full    |
| 282  | Second presentment partial |
| 451  | Second chargeback full     |
| 454  | Second chargeback partial  |

### Scheme

| ID   | Scheme     |
|:-----|:-----------|
| MC   | MasterCard |
| VISA | Visa       |
| UPI  | UnionPay   |
| JCB  | JCB        |

### Status

| Status  |
|:--------|
| success |
| error   |

### Terminal method

| Method                           | Terminal type |
|:---------------------------------|---------------|
| authorize                        | ECOM/POS      |
| installment                      | ECOM          |
| pre_authorize                    | ECOM/POS      |
| inc_authorize                    | ECOM/POS      |
| final_authorize                  | ECOM/POS      |
| authorize_with_otp               | ECOM          |
| authorize_with_3ds               | ECOM          |
| authorize_recurring              | ECOM          |
| authorize_with_cashback          | POS           |
| authorize_with_avs_check         | ECOM          |
| authorize_with_partial_approval  | ECOM          |
| authorize_with_card_verification | POS           |
| sale                             | ECOM/POS      |
| sale_with_otp                    | ECOM          |
| sale_with_3ds                    | ECOM          |
| sale_recurring                   | ECOM          |
| sale_with_cashback               | POS           |
| sale_with_avs_check              | ECOM          |
| sale_with_partial_approval       | ECOM          |
| credit                           | ECOM/POS      |
| credit_moneysend                 | ECOM/POS      |
| credit_payment_transaction       | ECOM/POS      |
| reverse                          | ECOM/POS      |
| partial_reverse                  | ECOM/POS      |
| cancel                           | ECOM/POS      |
| cancel_recurring                 | ECOM          |
| refund                           | ECOM/POS      |
| partial_refund                   | ECOM/POS      |
| p2p                              | ECOM/POS      |
| ping                             | ECOM/POS      |
| capture                          | ECOM          |
| authentication                   | ECOM          |
| balance_inquiry                  | ECOM/POS      |
| cash_disbursement                | ECOM/POS      |
| terminal_config                  | POS           |
| pep_check                        | ECOM          |
| advice                           | ECOM/POS      |
| init_s3d                         | ECOM          |
| create_sp                        | ECOM          |
| request_cards_update             | ECOM          |
| retrieve_cards_update            | ECOM          |
| bins_list                        | ECOM          |
| chargebacks_list                 | ECOM          |
| settlements_list                 | ECOM          |
| authorizes_list                  | ECOM          |
| actual_authorizes_list           | ECOM          |
| delete_token                     | ECOM          |
| get_token                        | ECOM          |
| tokenize                         | ECOM          |
| transact                         | ECOM          |
| refund_offline                   | ECOM/POS      |

### Password mode

| Password mode | Meaning                                          |
|:--------------|--------------------------------------------------|
| 0             | No password.                                     |
| 1             | Password should be entered on every transaction. |
| 2             | Password should be entered once per day.         |

### Platform type

| Platform type | Meaning    |
|:--------------|------------|
| 1             | E-commerce |
| 2             | POS        |

### Risk rule type

| Risk rule type | Meaning    |
|:---------------|------------|
| pos            | POS        |
| ecom           | E-commerce |

### Stock status

| Status     | Value      |
|:-----------|:-----------|
| In stock   | in_stock   |
| On site    | on_site    |
| Collecting | collecting |
| Reserved   | reserved   |
| Sent       | sent       |
| On sale    | on_sale    |

#### Stock status workflow

![Stock status workflow](device_stock_statuses.png)

### Configuration status

| Status    | Value     |
|:----------|:----------|
| Blank     | blank     |
| Ready     | ready     |
| Active    | active    |
| Suspended | suspended |
| Returning | returning |

#### Configuration status workflow

![Configuration status workflow](device_configuration_statuses.png)

#### Country Regions

| Region ID | Meaning            |
|:----------|:-------------------|
| 1         | SEPA, Intra Region |
| 2         | EEA                |
| 3         | NON-SEPA           |
| 4         | Europe             |
| 5         | Western Europe     |
| 6         | Eastern Europe     |

### Modulus 9 algorithm

Type: numeric </br>
Length: 10 </br>
</br>
First digit for (Point of service) - any number from 0 to 4</br>
First digit for (Ecommerce) - any digit from 5 to 9</br>
Middle digits: random 8 digits</br>
Last digit: checksum</br>
</br>
Modulus 9 PHP Example:</br>

```php
/**
 * @param string $id
 *
 * @return int
 */
private function getCheckDigit(): int
{
    $id = 743065938; // first digit represents ECOM + 8 random digits
    $step1 = $this->checkSumStep1($id);
    $step2 = $this->checkSumStep2($step1);
    $step3 = $this->checkSumStep3($step1);
    $step4 = $this->checkSumStep4($step3);
    $checkDigit = $this->checkSumStep5($step2, $step4);

    return $checkDigit; // add last digit to $id
}

/**
 * Replace first digit to 0 if first three digits value < 930 or > 939
 *
 * @param string $id
 *
 * @return string
 */
private function checkSumStep1(string $id): string
{
    $first3Digits = substr($id, 0, 3);
    if ($first3Digits < 930 || $first3Digits > 939) {
        $id = substr($id, 1);
        $id = sprintf('%s%s', 0, $id);
    }

    return $id;
}

/**
 * Add every second digit starting from position 2
 *
 * @param string $id
 *
 * @return int
 */
private function checkSumStep2(string $id): int
{
    $sum = 0;
    $idLength = strlen($id);
    for ($i = 0; $i < $idLength; $i++) {
        if (0 !== $i % 2) {
            $sum += (int) $id[$i];
        }
    }

    return $sum;
}

/**
 * Multiply every second digit by 2 startin from position 1
 *
 * @param string $id
 *
 * @return array
 */
private function checkSumStep3(string $id): array
{
    $result = [];
    $idLength = strlen($id);
    for ($i = 0; $i < $idLength; $i++) {
        if (0 === $i % 2) {
            $result[] = (int) $id[$i]*2;
        }
    }

    return $result;
}

/**
 * Add together two digit numbers & add all numbers together
 *
 * @param array $step3Values
 *
 * @return int
 */
private function checkSumStep4(array $step3Values): int
{
    $result = 0;
    $valuesCount = count($step3Values);
    for ($i = 0; $i < $valuesCount; $i++) {
        if (strlen($step3Values[$i]) > 1) {
            $arrayValues = str_split($step3Values[$i]);
            $step3Values[$i] = (int) $arrayValues[0] + (int) $arrayValues[1];
        }

        $result += $step3Values[$i];
    }

    return $result;
}

/**
 * Calculate check digit
 *
 * @param int $step2
 * @param int $step4
 *
 * @return int
 */
private function checkSumStep5(int $step2, int $step4): int
{
    $checkSum = $step2 + $step4;
    if (1 === strlen($checkSum)) {
        return 0;
    }

    if (2 === strlen($checkSum)) {
        return substr($checkSum, 1);
    }

    return $checkSum;
}
```

## Security
### Authentication

To use new version API you need to send your API credentials using header with every request you make.

**Request Headers**

| Parameter     | Notation | Type | Length | Description                                     |
|:--------------|:---------|:-----|:-------|:------------------------------------------------|
| x-method      | M        | A    | 1-50   | Expected API method value: `create_merchant`.   |
| x-api-id      | M        | AN   | 50     | Acquirer credentials api ID.                    |
| x-token       | M        | AN   | 30-60  | Acquirer credentials api token.                 |
| x-api-version | M        | AN   | 1-3    | Fixed `1.0`.                                    |
| x-sign        | M        | AN   | 1-255  | "Secret" encrypted with merchant private key.   |

**Response Headers**

| Parameter     | Notation | Type | Length | Description                                                 |
|:--------------|:---------|:-----|:-------|:------------------------------------------------------------|
| x-status-code | M        | AN   | 1-3    | [`Available status codes`](#appendix--enum--response-code). |
| x-sign        | M        | AN   | 1-255  | "Secret" encrypted with Tribe private key from acquirer credentials.   |

### Cryptography
Request and response messages body should be encrypted.

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

| Notation | Meaning                                                                                                                                                                              |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| M        | Mandatory                                                                                                                                                                            |
| O        | Optional                                                                                                                                                                             |
| C        | Conditional                                                                                                                                                                          |
| ME       | Mandatory Echo. The data element will be present in a response message and will contain the same value from the request.                                                             |
| CE       | Conditional Echo. The data element will be present in response message only if it was present in request message. If it was present it will contain the same value from the request. |
| -        | Not applicable                                                                                                                                                                       |

### Value type

| Notation  | Meaning                                        |
|-----------|------------------------------------------------|
| Not blank | Not empty, not null, isset                     |
| A         | Alphabetic chars only                          |
| N         | Only numbers                                   |
| NS        | Numeric with special symbols listed below      |
| AN        | Alphanumeric value                             |
| ANS       | Alphanumeric with special symbols listed below |
| [1,2,3]   | Possible values: 1 or 2 or 3                   |
| [1-3]     | Range from 1 to 3                              |
| LIST      | List of values                                 |
| OBJ       | Object with properties                         |
| -         | Not applicable                                 |

| Special symbol                                                       |
|----------------------------------------------------------------------|
| ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { } ~ &#124; |
