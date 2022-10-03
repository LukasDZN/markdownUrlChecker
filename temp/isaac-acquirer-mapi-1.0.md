# Getting Started

## Audience

This API documentation is intended for gateways, payment facilitators, or merchant developers who aim to create an integration between the merchant and acquiring processor.

## Overview

The Merchant API (MAPI) documentation covers the communication between the merchant and acquiring processor for e-commerce (ECOM) transactions and information retrieval requests. MAPI is organized around REST.

## API samples

The *JSON* samples provided in this document are for illustrative purposes only. In case of discrepancies between the sample and specification, the specification should be considered the source of truth.

## Prerequisites

The merchant account must be registered on the acquiring side, and the following merchant credentials created:

* API ID.
* Token.
* Sale Point ID.
* Terminal ID.

The data mentioned above should be passed in all API requests so that the Tribe acquiring processor could return the requested data.

### Security

Please read [`Security`](#appendix--security) before proceeding with MAPI.

## Interaction

MAPI enables the communication between the client (merchant) and the acquiring processor:

*  **Tribe acquiring processor** - provides payment processing services.
*  **Client** - merchant/entity that uses the acquiring processor's service to acquire card transactions.

This interaction is based on actions - HTTP(s) requests - initiated by the merchant:

![API interaction](API_interaction.png)

All API requests described in this document must be passed using a correct **URL**, **request body**, and **request headers**.

The base URL for MAPI requests is always the same:

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

All request fields must be sent as a `string` despite the field type differences, as fields are parsed to proper types.

### Response

The response can be one of 2 types:

*  Success response.
*  Error response.

The success response indicates that the transaction was successfully processed on the Tribe acquiring processor side. In this case, the value of the `status_code` response parameter is `000`.

**Important** If the Tribe acquiring processor processed a transaction successfully, it does not necessarily mean that the whole process was successful. If an error occurs beyond the Tribe acquiring processor control (e.g., on the card scheme side), the response will still be the `status_code` parameter with the `000` value; however, the [<u>reason</u>](#appendix--enum--response-codes) for transaction decline will be indicated in the `response_code` parameter value.

The error response is the same for all the actions, and the format is as follows:

| Parameter     | M | Type | Length | Description                                                                                                                                                                                                  |
|---------------|---|------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status        | M | A    | 5-7    | If the error response is received, the value is `error`.                                                                                                                                                     |
| status_code   | M | N    | 3      | The code of the received error.                                                                                                                                                                              |
| message       | M | ANS  | 1-255  | The description of the received error status code.                                                                                                                                                           |
| tag           | C | ANS  | 1-255  | The error message tag from customizable entities, such as fees or limits. For example, when the specific limit is exceeded, this particular limit tag is shown if it is present for a specific limit or fee. |
| response_data | M |      |        |                                                                                                                                                                                                              |

```json
{
    "status": "error",
    "status_code": "001",
    "message": "Invalid credentials.",
    "tag": "",
    "response_data": null
}
```

## Pinging API endpoint

You can check if entered data is correct and your connection works properly by sending the [Ping](#actions--ping) request. If you receive the `success` response with the `pong` message, it means that HTTP(s) requests reach the API successfully.

# Actions

## Authenticate

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                                                             | M | Type | Length  | Description                                                                                                                                                                           |
|:--------------------------------------------------------------------------------------|:--|:-----|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                                                                | M | AN   | 1-100   | Expected API method value: `authenticate`                                                                                                                                             |
| token                                                                                 | M | AN   | 1-20    | Merchant token                                                                                                                                                                        |
| terminal_id                                                                           | M | AN   | 1-8     | Terminal API ID                                                                                                                                                                       |
| sale_point_id                                                                         | M | AN   | 1-255   | Sale Point API ID                                                                                                                                                                     |
| api_id                                                                                | M | AN   | 1-8     | Merchant API ID                                                                                                                                                                       |
| api_version                                                                           | M | ANS  | 1-10    | Fixed `1.0`                                                                                                                                                                           |
| data                                                                                  | M | OBJ  | -       | Transaction data                                                                                                                                                                      |
| data / card_token                                                                     | C | AN   | 32      | [`Card token`](#appendix--security--card-token). Required if card data not set.                                                                                                       |
| data / card_holder_name                                                               | C | A    | 2-26    | Card holder full name. Required if card token is not set.                                                                                                                             |
| data / card_number                                                                    | C | N    | 13-19   | Card number. Required if card token is not set.                                                                                                                                       |
| data / card_expiry_month                                                              | C | N    | 2       | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                                      |
| data / card_expiry_year                                                               | C | N    | 2       | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                                       |
| data / transaction_amount                                                             | M | N    | 1-12    | Transaction amount in cents                                                                                                                                                           |
| data / transaction_currency                                                           | M | N    | 3       | ISO Numeric currency code                                                                                                                                                             |
| data / transaction_descriptor                                                         | O | ANS  | 1-125   | Transaction descriptor. Could be shown to customer during 3DS authentication. Can contain `- * + .` special symbols.                                                                  |
| data / transaction_type                                                               | O | N    | 2       | [`Transaction types`](#appendix--enum--transaction-types).                                                                                                                            |
| data / cardholder_ip                                                                  | M | AN   | 39      | Card holder ip address                                                                                                                                                                |
| data / merchant_data                                                                  | M | AN   | 1-254   | Merchant state data that must be returned to the merchant. The content of this field is passed unchanged and without assumptions about its content to the return POST.                |
| data / merchant_id                                                                    | C | N    | 16      | MPI merchant id. Required for all card schemes except UnionPay                                                                                                                        |
| data / ok_url                                                                         | M | N    | 1-2048  | Success response callback url                                                                                                                                                         |
| data / fail_url                                                                       | M | N    | 1-2048  | Failure response callback url                                                                                                                                                         |
| data / callback_url                                                                   | O | N    | 1-2048  | Asynchronous MPI [`notification`](#actions--authenticate--authentication-results-notification) about authentication status sent to this callback url.                                 |
| data / merchant_reference                                                             | O | ANS  | 1-255   | Merchant's internal ID                                                                                                                                                                |
| data / recurring_end_date                                                             | C | N    | 8       | Recurring end date for PAReq format `YYYYMMDD`, If `recurring_frequency` is present then recurEnd is required                                                                         |
| data / recurring_frequency                                                            | O | N    | 1-4     | Recurring frequency for purchase provided as integer days, 28 means monthly                                                                                                           |
| data / installments                                                                   | O | N    | 3       | Number of installments for transaction. Installments and recurring parameters can not be present at the same time.                                                                    |
| data / message_category                                                               | O | N    | 2       | Message category. Values: `01` - payment authentication, `02` - non payment authentication, defaults to `01` if not sent.                                                             |
| data / account_information                                                            | O | OBJ  | -       | Cardholder Account Information                                                                                                                                                        |
| data / account_information / cardholder_account_age_indicator                         | O | N    | 2       | [`Cardholder account age values`](#appendix--enum--cardholder-account-age-values)                                                                                                     |
| data / account_information / cardholder_account_change                                | O | N    | 8       | Date that the cardholder’s account was last changed. Format - `YYYYMMDD`.                                                                                                             |
| data / account_information / cardholder_account_change_indicator                      | O | N    | 2       | [`Cardholder account change values`](#appendix--enum--cardholder-account-change-values)                                                                                               |
| data / account_information / cardholder_account_date                                  | O | N    | 8       | Date that the cardholder opened the account. Format - `YYYYMMDD`.                                                                                                                     |
| data / account_information / cardholder_account_password_change                       | O | N    | 8       | Date that cardholder’s account had a password change or account reset. Format - `YYYYMMDD`.                                                                                           |
| data / account_information / cardholder_account_password_change_indicator             | O | N    | 8       | [`Cardholder account password change values`](#appendix--enum--cardholder-account-password-change-values)                                                                             |
| data / account_information / cardholder_account_purchase_count                        | O | N    | 1-4     | Number of purchases with this cardholder account during the previous six months.                                                                                                      |
| data / account_information / provision_attempts_per_day                               | O | N    | 1-3     | Number of `Add Card` attempts in the last 24 hours.                                                                                                                                   |
| data / account_information / tx_activity_per_day                                      | O | N    | 1-3     | Number of transactions (successful and abandoned) for this cardholder account across all payment accounts in the previous 24 hours.                                                   |
| data / account_information / tx_activity_per_year                                     | O | N    | 1-3     | Number of transactions (successful and abandoned) for this cardholder account across all payment accounts in the previous year.                                                       |
| data / account_information / payment_account_age                                      | O | N    | 8       | Date that the payment account was enrolled in the cardholder’s account. Format - `YYYYMMDD`.                                                                                          |
| data / account_information / payment_account_age_indicator                            | O | N    | 2       | [`Payment account age values`](#appendix--enum--payment-account-age-values)                                                                                                           |
| data / account_information / shipping_address_usage                                   | O | N    | 8       | Date when the shipping address used for this transaction was first used. Format - `YYYYMMDD`.                                                                                         |
| data / account_information / shipping_address_usage_indicator                         | O | N    | 2       | [`Shipping address change values`](#appendix--enum--shipping-address-change-values)                                                                                                   |
| data / account_information / shipping_name_indicator                                  | O | N    | 1       | [`Shipping name values`](#appendix--enum--shipping-name-values)                                                                                                                       |
| data / account_information / suspicious_account_activity                              | O | N    | 1       | [`Suspicious account activity values`](#appendix--enum--suspicious-account-activity-values)                                                                                           |
| data / acquirer_bin                                                                   | O | N    | 5-9     | Acquirer BIN. **Note:** If provided will override merchant scheme configuration value.                                                                                                |
| data / acquirer_merchant_identifier                                                   | O | AN   | 1-35    | Acquirer-assigned merchant identifier.                                                                                                                                                |
| data / broadcast_info                                                                 | O | ANS  | 1-4096  | Broadcast information JSON as string.                                                                                                                                                 |
| data / cardholder_ip                                                                  | O | ANS  | 1-45    | IP address of the browser.                                                                                                                                                            |
| data / decoupled_authentication_indicator                                             | O | A    | 1       | Decoupled authentication indicator. Values: `Y` - request to utilize decoupled authentication if ACS supports it, `N` - do not use decoupled authentication.                          |
| data / decoupled_authentication_max_timeout                                           | O | N    | 5       | Maximum time to wait for decoupled authentication results. Values between 1 and 10080 accepted.                                                                                       |
| data / merchant_name                                                                  | O | ANS  | 1-40    | Merchant name assigned by the Acquirer or Payment System.                                                                                                                             |
| data / merchant_country_code                                                          | O | N    | 3       | Country Code of the Merchant. ISO 3166-1 numeric three-digit country code,                                                                                                            |
| data / mcc                                                                            | O | N    | 4       | Code describing the Merchant’s type of business, product or service.                                                                                                                  |
| data / cardholder_account_id                                                          | O | ANS  | 1-64    | Cardholder account identifier.                                                                                                                                                        |
| data / cardholder_account_type                                                        | O | N    | 2       | [`Cardholder account type values`](#appendix--enum--cardholder-account-type-values)                                                                                                   |
| data / email                                                                          | O | ANS  | 6-254   | The email address associated with the account that is either entered by the Cardholder.                                                                                               |
| data / address_match_indicator                                                        | O | A    | 1       | Indicates whether the Cardholder Shipping Address and Cardholder Billing Address are the same. Values: `Y` , `N`.                                                                     |
| data / billing_address_city                                                           | O | ANS  | 1-50    | Cardholder billing address city.                                                                                                                                                      |
| data / billing_address_country                                                        | O | N    | 3       | Cardholder billing address ISO 3166-1 numeric three-digit country code.                                                                                                               |
| data / billing_address_line1                                                          | O | ANS  | 1-50    | First line of the street address or equivalent local portion of the Cardholder billing address.                                                                                       |
| data / billing_address_line2                                                          | O | ANS  | 1-50    | Second line of the street address or equivalent local portion of the Cardholder billing address.                                                                                      |
| data / billing_address_line3                                                          | O | ANS  | 1-50    | Third line of the street address or equivalent local portion of the Cardholder billing address.                                                                                       |
| data / billing_address_post_code                                                      | O | ANS  | 1-9     | ZIP or other postal code of the Cardholder billing address.                                                                                                                           |
| data / billing_address_state                                                          | O | A    | 1-3     | The state or province (country subdivision code) of the Cardholder billing address as defined in ISO 3166-2.                                                                          |
| data / shipping_address_city                                                          | O | ANS  | 1-50    | Cardholder shipping address city.                                                                                                                                                     |
| data / shipping_address_country                                                       | O | N    | 3       | Cardholder shipping address ISO 3166-1 numeric three-digit country code.                                                                                                              |
| data / shipping_address_line1                                                         | O | ANS  | 1-50    | First line of the street address or equivalent local portion of the Cardholder shipping address.                                                                                      |
| data / shipping_address_line2                                                         | O | ANS  | 1-50    | Second line of the street address or equivalent local portion of the Cardholder shipping address.                                                                                     |
| data / shipping_address_line3                                                         | O | ANS  | 1-50    | Third line of the street address or equivalent local portion of the Cardholder shipping address.                                                                                      |
| data / shipping_address_post_code                                                     | O | ANS  | 1-16    | ZIP or other postal code of the Cardholder shipping address.                                                                                                                          |
| data / shipping_address_state                                                         | O | A    | 1-3     | The state or province (country subdivision code) of the Cardholder shipping address as defined in ISO 3166-2.                                                                         |
| data / home_phone                                                                     | O | OBJ  | -       | Cardholder home phone number.                                                                                                                                                         |
| data / home_phone / cc                                                                | M | N    | 1-3     | Country code for geographic area.                                                                                                                                                     |
| data / home_phone / subscriber                                                        | M | N    | 1-15    | National number.                                                                                                                                                                      |
| data / mobile_phone                                                                   | O | OBJ  | -       | Cardholder mobile phone number.                                                                                                                                                       |
| data / mobile_phone / cc                                                              | M | N    | 1-3     | Country code for geographic area.                                                                                                                                                     |
| data / mobile_phone / subscriber                                                      | M | N    | 1-15    | National number.                                                                                                                                                                      |
| data / work_phone                                                                     | O | OBJ  | -       | Cardholder work phone number.                                                                                                                                                         |
| data / work_phone / cc                                                                | M | N    | 1-3     | Country code for geographic area.                                                                                                                                                     |
| data / work_phone / subscriber                                                        | M | N    | 1-15    | National number.                                                                                                                                                                      |
| data / merchant_risk_indicator                                                        | O | OBJ  | -       | Merchant risk information.                                                                                                                                                            |
| data / merchant_risk_indicator / delivery_email_address                               | O | ANS  | 6-254   | For Electronic delivery, the email address to which the merchandise was delivered.                                                                                                    |
| data / merchant_risk_indicator / delivery_timeframe                                   | O | N    | 2       | [`Delivery timeframe values`](#appendix--enum--delivery-timeframe-values)                                                                                                             |
| data / merchant_risk_indicator / gift_card_amount                                     | O | N    | 1-15    | For prepaid or gift card purchase, the purchase amount total of prepaid or gift card(s) in major units (for example, USD 123.45 is 123).                                              |
| data / merchant_risk_indicator / gift_card_count                                      | O | N    | 2       | For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.                                                                                   |
| data / merchant_risk_indicator / gift_card_currency                                   | O | N    | 3       | For prepaid or gift card purchase, ISO 4217 three-digit currency code of the gift card.                                                                                               |
| data / merchant_risk_indicator / pre_order_date                                       | O | N    | 8       | For a pre-ordered purchase, the expected date that the merchandise will be available. Format - `YYYYMMDD`.                                                                            |
| data / merchant_risk_indicator / pre_order_purchase_indicator                         | O | N    | 2       | Indicates whether Cardholder is placing an order for merchandise with a future availability or release date. Values: `01` - Merchandise available, '02' - Future availability.        |
| data / merchant_risk_indicator / reorder_items_indicator                              | O | N    | 2       | Indicates whether the cardholder is reordering previously purchased merchandise. Values: `01` -  First time ordered, `02` - Reordered.                                                |
| data / merchant_risk_indicator / shipping_indicator                                   | O | N    | 2       | [`Shipping indicator values`](#appendix--enum--shipping-indicator-values)                                                                                                             |
| data / merchant_fraud_rate                                                            | O | N    | 1       | [`Merchant Fraud Rate`](#appendix--enum--merchant-fraud-rate)                                                                                                                         |
| data / acquirer_country_code                                                          | O | N    | 3       | Acquirer ISO 3166-1 numeric three-digit country code.                                                                                                                                 |
| data / secure_corporate_payment_exemption                                             | O | A    | 1       | Whether the electronic payment transaction uses dedicated payment processes or protocols under PSD2 RTS Article 17’s Secure Corporate Payment Exemption. Values: `Y` - yes, `N` - no. |
| data / message_extensions                                                             | O | LIST | -       | Message extensions list.                                                                                                                                                              |
| data / message_extensions / id                                                        | M | AN   | 1-64    | A unique identifier for the extension.                                                                                                                                                |
| data / message_extensions / criticality_indicator                                     | M | B    | -       | A Boolean value indicating whether the recipient must understand the contents of the extension to interpret the entire message.                                                       |
| data / message_extensions / data                                                      | M | ANS  | 1-8059  | The data carried in the extension.                                                                                                                                                    |
| data / message_extensions / name                                                      | M | ANS  | 1-64    | The name of the extension data set as defined by the extension owner.                                                                                                                 |
| data / requestor_id                                                                   | O | ANS  | 1-40    | Requestor ID. **Note:** If provided will override merchant scheme configuration value.                                                                                                |
| data / requestor_name                                                                 | O | ANS  | 1-35    | Requestor name. **Note:** If provided will override merchant scheme configuration value.                                                                                              |
| data / requestor_challenge_indicator                                                  | O | N    | 2       | [`Requestor challenge indicator values`](#appendix--enum--requestor-challenge-indicator-values)                                                                                       |
| data / requestor_url                                                                  | C | ANS  | 1-2048  | Fully qualified URL of requestor website or customer care site. Required if website is not present in corresponding MPI account configuration.                                        |
| data / requestor_authentication_indicator                                             | O | N    | 2       | [`Requestor authentication indicator values`](#appendix--enum--requestor-authentication-indicator-values)                                                                             |
| data / requestor_authentication_info                                                  | O | OBJ  | -       | Information about how the cardholder was authenticated before or during the transaction.                                                                                              |
| data / requestor_authentication_info / requestor_authentication_data                  | O | ANS  | 1-20000 | Data that documents and supports a specific authentication process.                                                                                                                   |
| data / requestor_authentication_info / requestor_authentication_method                | O | N    | 2       | [`Requestor authentication method values`](#appendix--enum--requestor-authentication-method-values)                                                                                   |
| data / requestor_authentication_info / requestor_authentication_timestamp             | O | N    | 12      | Date and time in UTC of the cardholder authentication. Format - `YYYYMMDDHHMM`.                                                                                                       |
| data / requestor_prior_authentication_info                                            | O | OBJ  | -       | Information about how the requestor authenticated the cardholder as part of a previous 3DS transaction.                                                                               |
| data / requestor_prior_authentication_info / requestor_prior_authentication_data      | O | ANS  | 1-2048  | Data that documents and supports a specific authentication process.                                                                                                                   |
| data / requestor_prior_authentication_info / requestor_prior_authentication_method    | O | N    | 2       | [`Requestor prior authentication method values`](#appendix--enum--requestor-prior-authentication-method-values)                                                                       |
| data / requestor_prior_authentication_info / requestor_prior_authentication_timestamp | O | N    | 12      | Date and time in UTC of the prior cardholder authentication. Format - `YYYYMMDDHHMM`.                                                                                                 |
| data / requestor_prior_authentication_info / requestor_prior_reference                | O | ANS  | 1-36    | This data element provides additional information to the ACS to determine the best approach for handing a request.                                                                    |
| data / requestor_initiated_indicator                                                  | C | N    | 2       | [`Requestor initiated indicator values`](#appendix--enum--requestor-initiated-indicator-values). Required if `device_channel` is `03`.                                                |
| data / device_channel                                                                 | O | N    | 2       | [`Device channel values`](#appendix--enum--device-channel-values). Default value is `02` if not sent.                                                                                 |
| data / local_date                                                                     | M | N    | 8       | Local date: `YYYYmmdd` format                                                                                                                                                         |
| data / local_time                                                                     | M | N    | 6       | Local time: `HHiiss`  format                                                                                                                                                          |
| data / merchant_var_1                                                                 | O | ANS  | 1-255   | If passed will be echoed back as response                                                                                                                                             |
| data / merchant_var_2                                                                 | O | ANS  | 1-255   | If passed will be echoed back as response                                                                                                                                             |
| data / merchant_var_3                                                                 | O | ANS  | 1-255   | If passed will be echoed back as response                                                                                                                                             |
| data / merchant_var_4                                                                 | O | ANS  | 1-255   | If passed will be echoed back as response                                                                                                                                             |
| data / independent_sales_organization_id                                              | O | N    | 11      | ID of merchant if merchant acts as independent sales organisation                                                                                                                     |

```json
{
    "method": "authenticate",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "local_time": "120112",
        "local_date": "20181212",
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_expiry_month": "06",
        "card_expiry_year": "33",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "transaction_descriptor": "Order Nr. 123456",
        "cardholder_ip": "127.0.0.1",
        "merchant_data": "lorem ipsum",
        "merchant_reference": "4005520000000129",
        "merchant_id": "100001",
        "ok_url": "http://localhost/ok/index.php",
        "fail_url": "http://localhost/fail/index.php",
        "recurring_frequency": "10",
        "recurring_end_date": "20190124",
        "installments": "100",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter              | M  | Type | Length | Description                                                                                                          |
|:-----------------------|:---|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|
| request_id             | M  | N    | 14     | Request identification number                                                                                        |
| merchant_var_1         | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                               |
| merchant_var_2         | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                               |
| merchant_var_3         | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                               |
| merchant_var_4         | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                               |
| merchant_reference     | ME | ANS  | 1-255  | Merchant's internal ID                                                                                               |
| response_code          | C  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes). Returned for successful requests, indicates transaction status. |
| transaction_amount     | ME | N    | 1-12   | Transaction amount in cents                                                                                          |
| status                 | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                  |
| status_code            | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                              |
| api_version            | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                          |
| type                   | M  | A    | 1-100  | `authenticate`. [`Response type`](#appendix--enum--response-type)                                                    |
| authentication_method  | C  | ANS  | 8      | [`Authentication method`](#appendix--enum--authentication-method)                                                    |
| card_token             | CE | AN   | 32     | [`Card token`](#appendix--security--card-token). Echoed back if submitted in request.                                |
| data                   | M  | OBJ  | -      | Authentication related data                                                                                          |
| data / enrolled_status | C  | A    | -      | [`Card enrolment status`](#appendix--enum--s3d-enrollment-statuses).                                                 |
| data / error           | C  | ANS  | 60     | If S3D failed, contains error description.                                                                           |
| data / submit_url      | C  | ANS  | 1-2048 | Url to redirect customer for authentication.                                                                         |
| data / s3d_version     | M  | NS   | 5-6    | S3D version, values - `1.0.2`, `2.1.0`, `2.2.0`                                                                               |

```json
{
    "request_id": "15598971077644",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": "4005520000000129",
    "response_code": null,
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "authenticate",
    "authentication_method": "init_s3d",
    "data": {
        "submit_url": "http://3ds-mpi.tribepayments.com/mpi/submit/MTYxNDU4NzI0NTIzNjQ4NTQ2MDE=/h603ca56cc5390384774522",
        "enrolled_status": "Y",
        "s3d_version": "2.1.0"
    },
    "card_token": "c5e5f9acf7f4a4e34f86f02985932428"
}
```

### Authentication status

When sending `enroll` request and customer finishes authentication he will be redirected back to provided `okUrl` or `failUrl` with these `POST` parameters:

| Parameter           | Notation | Type | Length | Description                                                                                                                   |
|:--------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------|
| cavv                | M        | ANS  | 1-40   | Cardholder Authentication Verification Value. Contains a 20-byte value that has been Base64 encoded, giving a 28 byte result. |
| eci                 | M        | N    | 2      | [`Available ECI values`](#appendix--enum--eci).                                                                               |
| merchantData        | M        | ANS  | 1-255  | Merchant data echoed back from authenticate request.                                                                          |
| PAResVerified       | M        | A    | 1      | Is PaRes valid, values: `Y` or `N`.                                                                                           |
| PAResSyntaxOK       | M        | A    | 1      | Is PaRes syntax valid, values: `Y` or `N`.                                                                                    |
| protocol            | M        | ANS  | 5-8    | 3DS version. Available values: `1.0.2` , `2.1.0`, `2.2.0`.                                                                    |
| xId                 | M        | ANS  | 1-255  | Transaction ID.                                                                                                               |
| status              | M        | N    | 1-2    | Authentication status code from MPI provider. [`Available status codes`](#appendix--enum--provider-status-code).              |
| statusMessage       | C        | ANS  | 1-1024 | Status message.                                                                                                               |
| merchantId          | M        | AN   | 1-16   | Merchant ID.                                                                                                                  |
| veresEnrolledStatus | M        | AS   | 1      | Value of VERes enrollement status. [`Available statuses`](#appendix--enum--veres-enrollment-status).                          |
| paresTxStatus       | M        | A    | 1      | [`Available statuses`](#appendix--enum--pares-transaction-status).                                                            |

### Authentication results notification

Request from mpi to provided `callbackUrl`. Request will be encrypted with client notifications public key. System expects response with HTTP status code - 200, otherwise retry mechanism will try to resend the notification 3 more times.

**Request Headers**

| Parameter | Notation | Type | Length | Description                                            |
|:----------|:---------|:-----|:-------|:-------------------------------------------------------|
| x-sign    | M        | ANS  | 1-255  | Secret encrypted with client notification public key.  |

**Request**

| Parameter           | Notation | Type | Length | Description                                                                                                                                                                                                  |
|:--------------------|:---------|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cavv                | C        | ANS  | 1-40   | Cardholder Authentication Verification Value. Contains a 20-byte value that has been Base64 encoded, giving a 28 byte result. Value is masked only leaving 8 first and last symbols visible.                 |
| eci                 | C        | N    | 2      | [`Available ECI values`](#appendix--enum--eci).                                                                                                                                                              |
| merchantData        | M        | ANS  | 1-255  | Merchant data echoed back from authenticate request.                                                                                                                                                         |
| PAResVerified       | C        | A    | 1      | Is PaRes valid, values: `Y` or `N`.                                                                                                                                                                          |
| PAResSyntaxOK       | C        | A    | 1      | Is PaRes syntax valid, values: `Y` or `N`.                                                                                                                                                                   |
| protocol            | M        | ANS  | 5-8    | 3DS version. Available values: `1.0.2` , `2.1.0`, `2.2.0`.                                                                                                                                                   |
| xId                 | M        | ANS  | 1-255  | Transaction ID.                                                                                                                                                                                              |
| status              | M        | N    | 1-2    | Authentication status code from MPI provider. [`Available status codes`](#appendix--enum--provider-status-code).                                                                                             |
| statusMessage       | C        | ANS  | 1-1024 | Status message.                                                                                                                                                                                              |
| merchantId          | M        | AN   | 1-16   | Merchant ID.                                                                                                                                                                                                 |
| veresEnrolledStatus | C        | AS   | 1      | Value of VERes enrollement status. [`Available statuses`](#appendix--enum--veres-enrollment-status).                                                                                                         |
| paresTxStatus       | C        | A    | 1      | [`Available statuses`](#appendix--enum--pares-transaction-status).                                                                                                                                           |
| statusReason        | C        | A    | 2      | [`Available status reasons`](#appendix--enum--status-reason-available-values). Only returned for failed authentications when directory server provides this field in RReq message to 3ds server.             |
| challengeCancel     | C        | N    | 2      | [`Available challenge cancel values`](#appendix--enum--challenge-cancel-available-values). Only returned for failed authentications when directory server provides this field in RReq message to 3ds server. |
| directoryServerTxId | C        | ANS  | 40     | Only returned for 2.x.x version authentications which has ARes response.                                                                                                                                     |

```json
{
  "xid": "MTY1NDA3MDAxNDk3ODExNDIwNTY=",
  "merchantId": "TEST999",
  "protocol": "2.1.0",
  "status": "9",
  "statusMessage": "Pending",
  "cavv": "",
  "eci": null,
  "merchantData": "ORDER123456789",
  "PAResVerified": null,
  "PAResSyntaxOK": null,
  "veresEnrolledStatus": null,
  "paresTxStatus": null,
  "directoryServerTxId": null
}
```

## Authorize

| URL          | Method |
|:-------------|:-------|
| /api/request | POST   |

### Request

| Parameter                                 | M | Type | Length | Description                                                                                                                                                                                                                                                                               |
|:------------------------------------------|:--|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                    | M | AN   | 1-100  | Expected API method value: `authorize`                                                                                                                                                                                                                                                    |
| token                                     | M | AN   | 1-20   | Merchant token                                                                                                                                                                                                                                                                            |
| terminal_id                               | M | AN   | 1-8    | Terminal API ID                                                                                                                                                                                                                                                                           |
| sale_point_id                             | M | AN   | 1-255  | Sale Point API ID                                                                                                                                                                                                                                                                         |
| api_id                                    | M | AN   | 1-8    | Merchant API ID                                                                                                                                                                                                                                                                           |
| api_version                               | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                                                                                                                               |
| data                                      | M | OBJ  | -      | Transaction data                                                                                                                                                                                                                                                                          |
| data / card_token                         | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.                                                                                                                                                                                                           |
| data / card_holder_name                   | C | A    | 2-26   | Card holder full name. Required if card token is not set.                                                                                                                                                                                                                                 |
| data / card_number                        | C | N    | 13-19  | Card number. Required if card token is not set.                                                                                                                                                                                                                                           |
| data / card_expiry_month                  | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                                                                                                                                          |
| data / card_expiry_year                   | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                                                                                                                                           |
| data / card_security_code                 | O | N    | 3      | Card security code (not included in `card_token`).                                                                                                                                                                                                                                        |
| data / parent_tx_id                       | C | N    | 30     | Required if `authorize_type` is `inc`. ID must be from the initial authorize request.                                                                                                                                                                                                     |
| data / local_date                         | M | N    | 8      | Local date: `YYYYmmdd` format                                                                                                                                                                                                                                                             |
| data / local_time                         | M | N    | 6      | Local time: `HHiiss`  format                                                                                                                                                                                                                                                              |
| data / transaction_amount                 | M | N    | 1-12   | Transaction amount in cents                                                                                                                                                                                                                                                               |
| data / transaction_currency               | M | N    | 3      | ISO Numeric currency code                                                                                                                                                                                                                                                                 |
| data / merchant_reference                 | M | ANS  | 1-255  | Merchant's internal ID                                                                                                                                                                                                                                                                    |
| data / transaction_descriptor             | O | ANS  | 22     | Transaction descriptor                                                                                                                                                                                                                                                                    |
| data / avs_check                          | C | N    | 1      | `0` or `1`. If value is `1` then Address Verification Service will be initiated.                                                                                                                                                                                                          |
| data / accept_partial_approval            | C | N    | 1      | `0` or `1`. If value is `1` then partial approvals will be accepted for this transactions.                                                                                                                                                                                                |
| data / card_verification                  | C | N    | 1      | `0` or `1`. If value is `1` then card verification is performed (and transaction_amount 0 is allowed).                                                                                                                                                                                    |
| data / mcc                                | O | AN   | 4      | If no MCC provided will be used the default MCC from Merchant account.                                                                                                                                                                                                                    |
| data / token_3ds                          | C | AN   | 1-50   | Required if authorization is initiated with 3DS.                                                                                                                                                                                                                                          |
| data / external_mpi                       | C | N    | 1      | Required if authorization is initiated with external MPI. Values - `1` or `0`.                                                                                                                                                                                                            |
| data / 3ds_version                        | C | ANS  | 1-8    | Required if authorization is initiated with 3DS and merchant uses external MPI. Example: `2.1.0`.                                                                                                                                                                                         |
| data / 3ds_authentication_status          | C | A    | 1      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available statuses`](#appendix--enum--pares-transaction-status)                                                                                                                                         |
| data / 3ds_eci                            | C | N    | 2      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available ECI`](#appendix--enum--eci)                                                                                                                                                                   |
| data / 3ds_ds_tx_id                       | C | ANS  | 36     | Required if authorization is initiated with 3DS and merchant uses external MPI, 3DS version is V2 or later.                                                                                                                                                                               |
| data / token_otp                          | C | AN   | 1-40   | Required if authorization is initiated with 3DS token for UnionPay scheme 3DS v1.                                                                                                                                                                                                         |
| data / authorize_type                     | O | A    | 1-40   | [`Authorize type`](#appendix--enum--authorize-type). Defaults to `final`                                                                                                                                                                                                                  |
| data / billing_address                    | C | ANS  | 1-20   | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / billing_city                       | C | ANS  | 1-20   | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / billing_country                    | C | ANS  | 3      | Country ISON code. Required if `avs_check` is `1`                                                                                                                                                                                                                                         |
| data / billing_post_code                  | C | ANS  | 1-9    | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / payment_transaction_type_indicator | O | ANS  | 3      | [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator)                                                                                                                                                                                                         |
| data / is_recurring_payment               | C | N    | 1      | `0` or `1`. If value is `1` then recurring payment for this PAN will be initiated. Any subsequent recurring authorize or sale payments should pass this parameter along with `parent_tx_id`, which corresponds to the original `transaction_id`, from the initial authorize/sale request. |
| data / member_defined_data                | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                                                                                                                                                                                                                           |
| data / pan_entry_mode                     | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                                                                                                                                       |
| data / merchant_var_1                     | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_2                     | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_3                     | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_4                     | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / customer_email                     | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_phone                     | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_id                        | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_ip                        | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / independent_sales_organization_id  | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                                                                                                                                                         |
| data / authenticate_request_id            | C | N    | 40     | S3D authentication request ID. Must be provided if `token_3ds` is sent and internal MPI is used. Not applicable for external MPI.                                                                                                                                                         |
| data / is_mit                             | O | N    | 1      | `0` or `1`. If value is `1` then this transaction will be considered to be a Merchant Initiated Transaction                                                                                                                                                                               |
| data / mit_parent_tx_id                   | C | N    | 30     | Required for MIT transactions. ID must be populated from the initial authorize request.                                                                                                                                                                                                   |
| data / mit_message_reason_code            | C | A    | 2-3    | Required only for VISA MIT transactions. [`MIT message reason code`](#appendix--enum--mit-message-reason-codes).                                                                                                                                                                          |
| data / promotion_code                     | C | AN   | 6      | [`Promotion code`](#appendix--enum--promotion-codes). Available only for `final` authorizes. Should be sent if merchant wants get available installment plans for this transaction.                                                                                                       |
| data / digital_wallet_identifier          | O | N    | 3      | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                                                                                                                                                                                                |
| data / account_type_from                  | O | N    | 2      | Default value 'NA' [`Account type from`](#appendix--enum--account-type-from).                                                                                                       |
| data / account_type_to                    | O | N    | 2      | Default value 'NA' [`Account type to`](#appendix--enum--account-type-to).                                                                                                           |
| data / reservation_duration               | C | N    | 2      | Duration of reservation in days. Required for Auto-Rental and Hotel reservations. Available range 01-99. VISA scheme only.                                                          |

```json
{
    "method": "authorize",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_security_code": "101",
        "card_expiry_month": "12",
        "card_expiry_year": "22",
        "local_date": "20190716",
        "local_time": "142312",
        "merchant_reference": "4005520000000129",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "transaction_descriptor": "test",
        "accept_partial_approval": "0",
        "authorize_type": "normal",
        "payment_transaction_type_indicator": "C06",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4",
        "authenticate_request_id": "15635308355047",
        "is_mit": "1"
    }
}
```

### Response

| Parameter                                          | M  | Type | Length | Description                                                                                                                                                                                                      |
|:---------------------------------------------------|:---|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                                         | M  | N    | 14     | Request identification number                                                                                                                                                                                    |
| merchant_var_1                                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                           |
| merchant_var_2                                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                           |
| merchant_var_3                                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                           |
| merchant_var_4                                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                           |
| merchant_reference                                 | ME | AN   | 1-255  | Merchant's internal ID                                                                                                                                                                                           |
| response_code                                      | C  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes). Returned for successful requests, indicates transaction status.                                                                                             |
| scheme_error_description                           | O  | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors.                                                                                                           |
| transaction_amount                                 | ME | N    | 1-12   | Transaction amount                                                                                                                                                                                               |
| status                                             | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                                                              |
| status_code                                        | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                                                                          |
| api_version                                        | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                                                      |
| tx_id                                              | M  | N    | 1-255  | Transaction ID                                                                                                                                                                                                   |
| authorization_id_response                          | O  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period                                                                                         |
| card_acceptor_data                                 | M  | ANS  | 1-40   | Card acceptor data                                                                                                                                                                                               |
| type                                               | M  | A    | 1-100  | `authorize`. [`Response type`](#appendix--enum--response-type)                                                                                                                                                   |
| card_token                                         | CE | AN   | 32     | [`Card token`](#appendix--security--card-token). Echoed back if submitted in request                                                                                                                             |
| avs_check_response                                 | O  | A    | 1      | [`Address verification response code`](#appendix--enum--address-verification-code). Will be returned if address verification service (AVS) was initiated in request                                              |
| expiration_date                                    | C  | NS   | 19     | Authorize expiration date in `Y-m-d H:i:s` format. Authorizes should be captured before this date.                                                                                                               |
| merchant_advice_code                               | O  | AN   | 2      | [`Merchant advice code`](#appendix--enum--merchant-advice-code).                                                                                                                                                 |
| card_security_code_result                          | O  | A    | 1      | [`Card security code result`](#appendix--enum--card-security-code-result).                                                                                                                                       |
| 3ds_verification_result_code                       | O  | A    | 1      | [`3DS verification result code`](#appendix--enum--3ds-verification-result-code).                                                                                                                                 |
| installments_plans                                 | O  | LIST | -      | List of available installment plans. Maximum of 12 plans could be available.                                                                                                                                     |
| installments_plans / installment_plan_id           | M  | N    | 1-2    | Installment plan ID.                                                                                                                                                                                             |
| installments_plans / number_of_installments        | M  | N    | 1-2    | Number of installments.                                                                                                                                                                                          |
| installments_plans / interest_rate                 | M  | N    | 5      | Interest rate.                                                                                                                                                                                                   |
| installments_plans / installment_fee               | M  | N    | 12     | Installment fee.                                                                                                                                                                                                 |
| installments_plans / annual_percentage_rate        | M  | N    | 5      | Annual percentage rate.                                                                                                                                                                                          |
| installments_plans / first_installment_amount      | M  | N    | 12     | First installment amount.                                                                                                                                                                                        |
| installments_plans / subsequent_installment_amount | M  | N    | 12     | Subsequent installment amount.                                                                                                                                                                                   |
| installments_plans / total_amount_due              | M  | N    | 12     | Total amount due.                                                                                                                                                                                                |
| settlement_currency                                | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                                                                                                                           |
| settlement_amount                                  | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                                                                                                                          |

```json
{
    "request_id": "15598932242606",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": "4005520000000129",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "000000300013000024190607074024",
    "authorization_id_response": "957510",
    "card_acceptor_data": "mer11*test London BR",
    "type": "authorize",
    "card_token": "a7c8c8a46b04f1f081010c08cd3cc2a3",
    "expiration_date": "2019-12-11 08:45:27",
    "merchant_advice_code": "02",
    "card_security_code_result": "M",
    "settlement_currency": "978",
    "settlement_amount": "8000",
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

## Cancel

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                                 |
|:-----------------------------------------|:--|:-----|:-------|:--------------------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `cancel`                                                         |
| token                                    | M | AN   | 1-20   | Merchant token                                                                              |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                             |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                           |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                             |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                                 |
| data                                     | M | OBJ  | -      | Transaction data                                                                            |
| data / card_token                        | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.             |
| data / card_holder_name                  | C | A    | 2-26   | Card holder full name. Required if card token is not set.                                   |
| data / card_number                       | C | N    | 13-19  | Card number. Required if card token is not set.                                             |
| data / card_expiry_month                 | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.            |
| data / card_expiry_year                  | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.             |
| data / card_security_code                | O | N    | 3      | Card security code (not included in `card_token`).                                          |
| data / local_date                        | M | N    | 8      | Local date: `YYYYmmdd` format. **Should be the same as value in cancelable authorize**      |
| data / local_time                        | M | N    | 6      | Local time: `HHiiss`  format. **Should be the same as value in cancelable authorize**       |
| data / transaction_amount                | M | N    | 1-12   | Transaction amount in cents. **Should be the same as value in cancelable authorize**        |
| data / transaction_currency              | M | N    | 3      | ISO Numeric currency code. **Should be the same as value in cancelable authorize**          |
| data / merchant_reference                | M | ANS  | 1-255  | Merchant's internal ID. **Should be the same as value in cancelable authorize**             |
| data / procedure                         | M | N    | -      | [`Procedure`](#appendix--enum--procedure) . **Should be cancelable authorize method value** |
| data / mcc                               | O | AN   | 4      | Merchant category code                                                                      |
| data / member_defined_data               | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                             |
| data / pan_entry_mode                    | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                         |
| data / customer_email                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                        |
| data / customer_phone                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                        |
| data / customer_id                       | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                        |
| data / customer_ip                       | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                        |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                   |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                   |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                   |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                   |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                           |

```json
{
    "method": "cancel",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_security_code": "101",
        "card_expiry_month": "12",
        "card_expiry_year": "22",
        "local_date": "20190716",
        "local_time": "142312",
        "merchant_reference": "4005520000000129",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "procedure": "authorize",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter                 | M  | Type | Length | Description                                                                                                              |
|:--------------------------|:---|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------|
| request_id                | M  | N    | 14     | Request identification number                                                                                            |
| merchant_var_1            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_2            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_3            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_4            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_reference        | ME | ANS  | 1-255  | Merchant's internal ID                                                                                                   |
| response_code             | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                      |
| scheme_error_description  | O  | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors.                   |
| transaction_amount        | ME | N    | 1-12   | Transaction amount in cents                                                                                              |
| status                    | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                      |
| status_code               | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                  |
| api_version               | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                              |
| tx_id                     | M  | N    | 1-255  | Cancel transaction ID                                                                                                    |
| parent_tx_id              | ME | N    | 1-255  | Echoed canceled transaction ID from first Authorize                                                                      |
| card_acceptor_data        | M  | ANS  | 1-40   | Card acceptor data                                                                                                       |
| authorization_id_response | O  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period |
| type                      | M  | A    | 1-100  | `cancel`. [`Response type`](#appendix--enum--response-type)                                                              |
| card_token                | M  | AN   | 32     | [`Card token`](#appendix--security--card-token).                                                                         |

```json
{
    "request_id": "15601528100833",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": "4005520000000129",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "040000300013000011190610074653",
    "parent_tx_id": "000000300013000010190610074555",
    "card_acceptor_data": "mer11 London BR",
    "type": "cancel",
    "card_token": "a7c8c8a46b04f1f081010c08cd3cc2a3"
}
```

## CancelRecurring

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter             | M | Type | Length | Description                                                                     |
|:----------------------|:--|:-----|:-------|:--------------------------------------------------------------------------------|
| method                | M | AN   | 1-100  | Expected API method value: `cancel_recurring_payment`                           |
| token                 | M | AN   | 1-20   | Merchant token                                                                  |
| terminal_id           | M | AN   | 1-8    | Terminal API ID                                                                 |
| sale_point_id         | M | AN   | 1-255  | Sale Point API ID                                                               |
| api_id                | M | AN   | 1-8    | Merchant API ID                                                                 |
| api_version           | M | ANS  | 1-10   | Fixed `1.0`                                                                     |
| data                  | M | OBJ  | -      | Transaction data                                                                |
| data / card_token     | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set. |
| data / card_number    | C | N    | 13-19  | Card number. Required if card token is not set.                                 |
| data / parent_tx_id   | M | N    | 30     | ID must be from the first (initial) recurring authorize request.                |
| data / merchant_var_1 | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_2 | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_3 | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_4 | O | ANS  | 1-255  | If passed will be echoed back as response                                       |

```json
{
    "method": "cancel_recurring_payment",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
      "card_number": "%YOUR_CARD_NUMBER%",
      "parent_tx_id": "000000300013000010190610074555",
      "merchant_var_1": "test data 1",
      "merchant_var_2": "test data 2",
      "merchant_var_3": "test data 3",
      "merchant_var_4": "test data 4"
    }
}
```

### Response

| Parameter      | M  | Type | Length | Description                                                                   |
|:---------------|:---|:-----|:-------|:------------------------------------------------------------------------------|
| request_id     | M  | N    | 14     | Request identification number                                                 |
| merchant_var_1 | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                        |
| merchant_var_2 | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                        |
| merchant_var_3 | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                        |
| merchant_var_4 | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                        |
| status         | M  | A    | -      | [`Status`](#appendix--enum--status)                                           |
| status_code    | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.       |
| api_version    | ME | ANS  | 1-10   | Fixed `1.0`                                                                   |
| type           | M  | A    | 1-100  | `cancel_recurring_payment`. [`Response type`](#appendix--enum--response-type) |

```json
{
    "request_id": "15599040375682",
    "merchant_var_1": "test data 1",
    "merchant_var_2": "test data 2",
    "merchant_var_3": "test data 3",
    "merchant_var_4": "test data 4",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "cancel_recurring_payment"
}
```

## Capture

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                       |
|:-----------------------------------------|:--|:-----|:-------|:------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `capture`                              |
| token                                    | M | AN   | 1-20   | Merchant token                                                    |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                   |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                 |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                   |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                       |
| data                                     | M | OBJ  | -      | Transaction data                                                  |
| data / parent_tx_id                      | M | N    | 30     | ID must be from the first (initial) authorize request.            |
| data / transaction_amount                | M | N    | 1-12   | Transaction amount in cents                                       |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                         |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                         |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                         |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                         |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation |

```json
{
  "method": "capture",
  "token": "mer11",
  "terminal_id": "pa1bra",
  "api_id": "mer11",
  "sale_point_id": "mer11",
  "api_version": "1.0",
  "data": {
      "parent_tx_id": "0018062510084300002919780200567",
      "transaction_amount": "8000",
      "merchant_var_1": "test1",
      "merchant_var_2": "test2",
      "merchant_var_3": "test3",
      "merchant_var_4": "test4"
  }
}
```

### Response

| Parameter                | M  | Type | Length | Description                                                                                            |
|:-------------------------|:---|:-----|:-------|:-------------------------------------------------------------------------------------------------------|
| request_id               | M  | N    | 14     | Request identification number                                                                          |
| merchant_var_1           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_2           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_3           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_4           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_reference       | ME | ANS  | 1-255  | Merchant's internal ID                                                                                 |
| response_code            | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                    |
| scheme_error_description | O  | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors. |
| transaction_amount       | ME | N    | 1-12   | Transaction amount                                                                                     |
| status                   | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                    |
| status_code              | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                |
| api_version              | ME | ANS  | 1-10   | Fixed `1.0`                                                                                            |
| type                     | M  | A    | 1-100  | `capture`. [`Response type`](#appendix--enum--response-type)                                           |
| tx_id                    | O  | N    | 1-255  | Only returned for UnionPay authorization capture                                                       |
| parent_tx_id             | ME | N    | 30     | Initial authorize transaction ID.                                                                      |
| settlement_currency      | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                 |
| settlement_amount        | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                |

```json
{
    "request_id": "15598932947238",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": "4005520000000129",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "capture",
    "parent_tx_id": "000001700081000003200205072016",
    "settlement_currency": "978",
    "settlement_amount": "8000"
}
```

## ChargebacksList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter             | M | Type | Length | Description                                   |
|:----------------------|:--|:-----|:-------|:----------------------------------------------|
| method                | M | AN   | 1-100  | Expected API method value: `chargebacks_list` |
| token                 | M | AN   | 1-20   | Merchant token                                |
| terminal_id           | M | AN   | 1-8    | Terminal API ID                               |
| sale_point_id         | M | AN   | 1-255  | Sale Point API ID                             |
| api_id                | M | AN   | 1-8    | Merchant API ID                               |
| api_version           | M | ANS  | 1-10   | Fixed `1.0`                                   |
| data                  | M | OBJ  | -      | Transaction data                              |
| data / date_from      | M | ANS  | 10     | From date `yyyy-mm-dd` format                 |
| data / date_to        | M | ANS  | 10     | To date `yyyy-mm-dd` format                   |
| data / page           | O | N    | 11     | Page number. Records per page: 100            |
| data / merchant_var_1 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_2 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_3 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_4 | O | ANS  | 1-255  | If passed will be echoed back as response     |

```json
{
    "method": "chargebacks_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "date_from": "2018-01-01",
        "date_to": "2019-12-01",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter                         | M   | Type | Length | Description                                                             |
|:----------------------------------|:----|:-----|:-------|:------------------------------------------------------------------------|
| request_id                        | M   | N    | 14     | Request identification number                                           |
| merchant_var_1                    | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_2                    | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_3                    | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_4                    | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| status                            | M   | A    | -      | [`Status`](#appendix--enum--status)                                     |
| status_code                       | M   | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status. |
| api_version                       | ME  | ANS  | 1-10   | Fixed `1.0`                                                             |
| type                              | M   | A    | 1-100  | `chargebacks_list`. [`Response type`](#appendix--enum--response-type)   |
| has_more_records                  | M   | A    | 1      | Informs if there are more records in next page. `Y` or `N`              |
| total_records                     | M   | N    | 11     | Total records count                                                     |
| data                              | M   | LIST | -      | Chargeback list data. May contain zero or more records.                 |
| data / id                         | M   | N    | 14-20  | Chargeback ID                                                           |
| data / tx_id                      | M   | N    | 1-255  | Transaction ID                                                          |
| data / mti                        | M   | N    | 4      | Message type identifier                                                 |
| data / function_code              | M   | N    | 3      | [`Function code`](#appendix--enum--function-code)                       |
| data / reason_code                | O   | N    | 4      | Provides the message receiver with the reason for sending the message   |
| data / masked_pan                 | M   | AN   | 13-19  | Masked account number                                                   |
| data / message                    | M   | AN   | -      | Chargeback description message                                          |
| data / amount                     | M   | N    | 1-13   | Amount in cents                                                         |
| data / currency                   | M   | N    | 3      | ISO numeric currency code                                               |
| data / settlement_amount          | O   | N    | 1-13   | Amount in cents                                                         |
| data / settlement_currency        | O   | N    | 3      | ISO numeric currency code                                               |
| data / date                       | M   | ANS  | 10     | Date when dispute record was received from the scheme.                  |
| data / accounts_id                | M   | N    | 14-20  | Account ID                                                              |
| data / mcc                        | M   | N    | 4      | Merchant category code                                                  |
| data / card_issuer_reference_data | M   | N    | 10     | Card issues reference data. Can be null                                 |
| data / pos_entry_mode             | M   | AN   | 22     | Pos entry mode                                                          |
| data / transaction_destination_id | M   | N    | 11     | Transaction destination ID                                              |
| data / transaction_originator_id  | M   | N    | 11     | Transaction originator ID                                               |
| data / transaction_receiving_id   | M   | N    | 11     | Transaction receiving ID                                                |
| data / trace_id                   | M   | ANS  | 15     | Trace ID                                                                |
| data / auth_code                  | O   | N    | 6      | Auth code                                                               |
| data / settlement_file_id         | ME  | N    | 1-20   | Transaction's settlement file ID.                                       |
| data / date_updated               | O   | NS   | 19     | Chargeback updated date                                                 |
| data / system_due_date            | O   | ANS  | 1-19   | Chargeback's system due date                                            |

```json
{
    "request_id": "15601564673856",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "chargebacks_list",
    "total_records": "4",
    "data": [
        {
            "id": "15597413980694",
            "tx_id": "000000200003000030200117100230",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "9186",
            "currency": "978",
            "settlement_amount": "9186",
            "settlement_currency": "978",
            "accounts_id": "15780545645004",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000010208",
            "auth_code": "877269",
            "settlement_file_id": "1111111114",
            "date_updated": "2019-06-10 13:56:27",
            "system_due_date": null
        },
        {
            "id": "15597413988231",
            "tx_id": "000000200018000003220214091905",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "5544",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": null,
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000020208",
            "auth_code": "255991",
            "settlement_file_id": "1111111114",
            "date_updated": "2019-06-10 13:56:27",
            "system_due_date": "2020-06-10 13:56:27"
        },
        {
            "id": "15597416282144",
            "tx_id": "000000200018000003220214091905",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "6299",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000030208",
            "auth_code": "989149",
            "settlement_file_id": "1111111114",
            "date_updated": "2019-06-10 13:56:27",
            "system_due_date": "2020-06-10 13:56:27"
        },
        {
            "id": "15597418803435",
            "tx_id": "000000200018000002220214210522",
            "mti": "1240",
            "function_code": "205",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "Second presentment full",
            "amount": "800",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000010208",
            "auth_code": "877269",
            "settlement_file_id": "1111111114",
            "date_updated": "2019-06-10 13:56:27",
            "system_due_date": "2020-06-10 13:56:27"
        },
        {
            "id": "15759009205539",
            "tx_id": "000000200018000003220214210534",
            "mti": "1644",
            "function_code": "603",
            "reason_code": "6341",
            "masked_pan": "533219******0695",
            "date": "2019-12-09",
            "message": "Retrieval request",
            "amount": "20",
            "currency": "946",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000020208",
            "auth_code": "255991",
            "settlement_file_id": "1111111114",
            "date_updated": "2019-12-09 13:56:27",
            "system_due_date": null
        }
    ],
    "has_more_records": "Y"
}
```

## Credit

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                              | M | Type | Length | Description                                                                                                                                                        |
|:-------------------------------------------------------|:--|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                                 | M | AN   | 1-100  | Expected API method value: `credit`                                                                                                                                |
| token                                                  | M | AN   | 1-20   | Merchant token                                                                                                                                                     |
| terminal_id                                            | M | AN   | 1-8    | Terminal API ID                                                                                                                                                    |
| sale_point_id                                          | M | AN   | 1-255  | Sale Point API ID                                                                                                                                                  |
| api_id                                                 | M | AN   | 1-8    | Merchant API ID                                                                                                                                                    |
| api_version                                            | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                        |
| data                                                   | M | OBJ  | -      | Transaction data                                                                                                                                                   |
| data / transaction_currency                            | M | N    | 3      | ISO Numeric currency code                                                                                                                                          |
| data / card_number                                     | C | N    | 13-19  | Card number. Required if card token is not set.                                                                                                                    |
| data / source_of_funds                                 | C | A    | 2      | Required for Visa. [`Source of funds code`](#appendix--enum--source-of-funds)                                                                                      |
| data / card_token                                      | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.                                                                                    |
| data / card_holder_name                                | C | A    | 2-26   | Card holder full name. Required if card token is not set.                                                                                                          |
| data / card_expiry_month                               | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                   |
| data / card_expiry_year                                | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                    |
| data / card_security_code                              | O | N    | 3      | Card security code (not included in `card_token`).                                                                                                                 |
| data / merchant_reference                              | M | ANS  | 1-255  | Merchant's internal ID                                                                                                                                             |
| data / transaction_amount                              | M | N    | 1-12   | Transaction amount in cents                                                                                                                                        |
| data / payment_transaction_type_indicator              | C | ANS  | 3      | [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator). Required for all schemes except JCB.                                            |
| data / transaction_descriptor                          | O | ANS  | 22     | Transaction descriptor                                                                                                                                             |
| data / mcc                                             | O | AN   | 4      | Merchant category code                                                                                                                                             |
| data / local_time                                      | M | N    | 6      | Local time: `HHiiss` format                                                                                                                                        |
| data / local_date                                      | M | N    | 8      | Local date: `YYYYmmdd`format                                                                                                                                       |
| data / sender_data                                     | O | OBJ  | -      | Money sending persons personal information                                                                                                                         |
| data / sender_data / first_name                        | C | ANS  | 1-35   | Money sending persons first name. Required if mcc is 6536 or 6537 (MoneySend Payment)                                                                              |
| data / sender_data / middle_name                       | O | ANS  | 1      | Money sending persons middle name                                                                                                                                  |
| data / sender_data / last_name                         | C | ANS  | 1-35   | Money sending persons last name. Required if mcc is 6536 or 6537 (MoneySend Payment)                                                                               |
| data / sender_data / street_address                    | C | ANS  | 1-50   | Money sending persons street address. Required if mcc is 6536 or 6537 (MoneySend Payment)                                                                          |
| data / sender_data / city                              | O | ANS  | 1-25   | Money sending persons city                                                                                                                                         |
| data / sender_data / state_code                        | C | N    | 3      | Money sending persons ISO 3166-2 state code. Required if country is USA or Canada                                                                                  |
| data / sender_data / country                           | C | N    | 3      | Money sending persons ISO 3166-1 numeric country code. Required if mcc is 6536 or 6537 (MoneySend Payment)                                                         |
| data / sender_data / postal_code                       | O | ANS  | 1-10   | Money sending persons postal code                                                                                                                                  |
| data / sender_data / date_of_birth                     | O | N    | 8      | Money sending persons date of birth                                                                                                                                |
| data / sender_data / account_number_type               | O | AN   | 2      | Sender [`Account number type`](#appendix--enum--account-number-type). If not provided will be defaulted to *03* (Card Account).                                    |
| data / sender_data / account_number                    | O | N    | 50     | Sender account number. If not provided value from field *card_number/card_token* will be filled.                                                                   |
| data / sender_data / identification_type               | O | N    | 2      | [`Identification type code`](#appendix--enum--identification-type)                                                                                                 |
| data / sender_data / identification_number             | O | ANS  | 25     | Valid identification number of the Receiver.                                                                                                                       |
| data / sender_data / identification_country_code       | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / sender_data / identification_expiration_date    | O | N    | 8      | format `yyyyMMdd`                                                                                                                                                  |
| data / sender_data / nationality                       | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / sender_data / country_of_birth                  | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / receiver_data                                   | O | OBJ  | -      | Money receiving persons personal information                                                                                                                       |
| data / receiver_data / first_name                      | C | ANS  | 1-35   | Money receiving persons first name. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                      |
| data / receiver_data / middle_name                     | O | ANS  | 1      | Money receiving persons middle name                                                                                                                                |
| data / receiver_data / last_name                       | C | ANS  | 1-35   | Money receiving persons last name. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                       |
| data / receiver_data / street_address                  | O | ANS  | 1-50   | Money receiving persons address                                                                                                                                    |
| data / receiver_data / city                            | O | ANS  | 1-25   | Money receiving persons city                                                                                                                                       |
| data / receiver_data / state_code                      | C | N    | 3      | Money receiving persons ISO 3166-2 state code. Required if country is USA or Canada                                                                                |
| data / receiver_data / country                         | O | N    | 3      | Money receiving persons ISO 3166-1 numeric country code                                                                                                            |
| data / receiver_data / postal_code                     | O | ANS  | 1-10   | Money receiving persons postal code                                                                                                                                |
| data / receiver_data / date_of_birth                   | O | N    | 8      | Money receiving persons date of birth                                                                                                                              |
| data / receiver_data / account_number_type             | O | AN   | 2      | Receiver [`Account number type`](#appendix--enum--account-number-type). If not provided will be defaulted to *03* (Card Account).                                  |
| data / receiver_data / account_number                  | O | N    | 50     | Receiver account number                                                                                                                                            |
| data / receiver_data / identification_type             | O | N    | 2      | [`Identification type code`](#appendix--enum--identification-type)                                                                                                 |
| data / receiver_data / identification_number           | O | ANS  | 25     | Valid identification number of the Receiver.                                                                                                                       |
| data / receiver_data / identification_country_code     | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / receiver_data / identification_expiration_date  | O | N    | 8      | format `yyyyMMdd`                                                                                                                                                  |
| data / receiver_data / nationality                     | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / receiver_data / country_of_birth                | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                    |
| data / transaction_data                                | C | OBJ  | -      | Transaction data. Required if mcc is 6536 or 6537 (MoneySend Payment)                                                                                              |
| data / transaction_data / unique_transaction_reference | O | ANS  | 1-19   | Unique transaction reference code                                                                                                                                  |
| data / transaction_data / additional_message           | O | ANS  | 1-65   | Additional message                                                                                                                                                 |
| data / transaction_data / funding_source               | O | N    | 2      | [`Funding source`](#appendix--enum--funding-source). If not provided value could be calculated from BIN of PAN which is provided in field *card_number/card_token* |
| data / transaction_data / participation_id             | O | AN   | 30     | Participation ID of sender                                                                                                                                         |
| data / transaction_data / transaction_purpose          | O | N    | 2      | Purpose details for Mastercard MoneySend transactions [`Transaction purposes`](#appendix--enum--transaction-purpose)                                               |
| data / language_description                            | O | OBJ  | -      | Language description.                                                                                                                                              |
| data / language_description / language_identification  | O | AN   | 3      | Language ISO 3166-1 numeric country code                                                                                                                           |
| data / language_description / language_data            | O | ANS  | 1-50   | Additional information in the language selected by the customer.                                                                                                   |
| data / member_defined_data                             | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                                                                                                    |
| data / pan_entry_mode                                  | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                |
| data / customer_email                                  | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                               |
| data / customer_phone                                  | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                               |
| data / customer_id                                     | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                               |
| data / customer_ip                                     | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                                                                                               |
| data / merchant_var_1                                  | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                          |
| data / merchant_var_2                                  | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                          |
| data / merchant_var_3                                  | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                          |
| data / merchant_var_4                                  | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                          |
| data / independent_sales_organization_id               | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                                  |
| data / digital_wallet_identifier                       | O | N    | 3      | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                                                                         |

```json
{
    "method": "credit",
    "token": "mer15",
    "terminal_id": "t_mer15p",
    "api_id": "mer15",
    "sale_point_id": "mer15",
    "api_version": "1.0",
    "data": {
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_holder_name": "John Smith",
        "card_security_code": "101",
        "card_expiry_month": "12",
        "card_expiry_year": "25",
        "merchant_reference": "070080100001",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "payment_transaction_type_indicator": "C07",
        "transaction_descriptor": "test",
        "mcc": "6538",
        "local_date": "20181212",
        "local_time": "120113",
        "pan_entry_mode": "E",
        "sender_data": {
            "first_name": "John",
            "middle_name": "A",
            "last_name": "Smith",
            "street_address": "Canada Place Canary Wharf",
            "city": "London",
            "state_code": "ENG",
            "country": "826",
            "postal_code": "555",
            "phone_number": "1234567890",
            "date_of_birth": "19990101",
            "account_number_type": "03",
            "account_number": "2223000048400011",
            "identification_type": "01",
            "identification_number": "33333333",
            "identification_country_code": "616",
            "identification_expiration_date": "11302019",
            "nationality": "428",
            "country_of_birth": "440"
        },
        "receiver_data": {
            "first_name": "Mick",
            "middle_name": "B",
            "last_name": "McCann",
            "street_address": "20 Lower Bridge St",
            "city": "Dublin",
            "state_code": "L",
            "country": "372",
            "postal_code": "D08 WC64",
            "phone_number": "2134567890",
            "date_of_birth": "19990202",
            "account_number_type": "03",
            "account_number": "2223000048400022",
            "identification_type": "02",
            "identification_number": "44444444",
            "identification_country_code": "752",
            "identification_expiration_date": "11302019",
            "nationality": "246",
            "country_of_birth": "578"
        },
        "transaction_data": {
            "unique_transaction_reference": "1234567890123465789",
            "additional_message": "222",
            "funding_source": "05",
            "participation_id": "44",
            "transaction_purpose": "00"
        },
        "language_description": {
            "language_identification": "372",
            "language_data": "7"
        },
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4",
        "authenticate_request_id": "15635308355047"
    }
}
```

### Response

| Parameter                 | M  | Type | Length | Description                                                                                                              |
|:--------------------------|:---|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------|
| request_id                | M  | N    | 14     | Request identification number                                                                                            |
| merchant_var_1            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_2            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_3            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_4            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_reference        | ME | ANS  | 1-255  | Merchant's internal ID                                                                                                   |
| response_code             | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                      |
| scheme_error_description  | O  | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors.                   |
| transaction_amount        | ME | N    | 1-12   | Transaction amount                                                                                                       |
| status                    | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                      |
| status_code               | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                  |
| api_version               | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                              |
| tx_id                     | M  | N    | 1-255  | Transaction ID                                                                                                           |
| authorization_id_response | O  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period |
| card_acceptor_data        | M  | ANS  | 1-40   | Card acceptor data                                                                                                       |
| type                      | M  | A    | 1-100  | `credit`. [`Response type`](#appendix--enum--response-type)                                                              |
| card_token                | M  | AN   | 32     | [`Card token`](#appendix--security--card-token).                                                                         |
| settlement_currency       | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                                   |
| settlement_amount         | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                                  |

```json
{
    "request_id": "15598887729429",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": "070080100001",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "000000200028000004190607062613",
    "authorization_id_response": "869849",
    "card_acceptor_data": "mer15*test London GBR",
    "type": "credit",
    "card_token": "9e4825f6814663974946a9e81fce2b77",
    "settlement_currency": "978",
    "settlement_amount": "8000"
}
```

## Confirm Installment

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                       | M | Type | Length | Description                                                       |
|:--------------------------------|:--|:-----|:-------|:------------------------------------------------------------------|
| method                          | M | AN   | 1-100  | Expected API method value: `confirm_installment`                  |
| token                           | M | AN   | 1-20   | Merchant token                                                    |
| terminal_id                     | M | AN   | 1-8    | Terminal API ID                                                   |
| sale_point_id                   | M | AN   | 1-255  | Sale Point API ID                                                 |
| api_id                          | M | AN   | 1-8    | Merchant API ID                                                   |
| api_version                     | M | ANS  | 1-10   | Fixed `1.0`                                                       |
| data                            | M | OBJ  | -      | Transaction data                                                  |
| data / installment_parent_tx_id | M | N    | 30     | ID must be from the first (initial) authorize request.            |
| data / installment_plan_id      | M | N    | 1-2    | Installment plan id from first (initial) authorize response data. |


```json
{
    "method": "confirm_installment",
    "token": "mer15",
    "terminal_id": "t_mer15p",
    "api_id": "mer15",
    "sale_point_id": "mer15",
    "api_version": "1.0",
    "data": {
        "installment_parent_tx_id": "010000200002000002211004074201",
        "installment_plan_id": "1"
    }
}
```

### Response

| Parameter          | M  | Type | Length | Description                                                 |
|:-------------------|:---|:-----|:-------|:------------------------------------------------------------|
| request_id         | M  | N    | 14     | Request identification number                               |
| merchant_var_1     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise      |
| merchant_var_2     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise      |
| merchant_var_3     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise      |
| merchant_var_4     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise      |
| merchant_reference | ME | ANS  | 1-255  | Merchant reference number                                   |
| response_code      | M  | AN   | 2      | [`Response Code`](#appendix--enum--response-code-de39)      |
| transaction_amount | ME | N    | 1-12   | Transaction amount                                          |
| status             | M  | A    | -      | [`Status`](#appendix--enum--status)                         |
| status_code        | M  | N    | 3      | [`Status code`](#appendix--enum--status-code)               |
| api_version        | ME | ANS  | 1-10   | Fixed `1.0`                                                 |
| tx_id              | M  | N    | 1-255  | Transaction ID                                              |
| parent_tx_id       | ME | N    | 30     | Initial authorize transaction ID.                           |
| card_acceptor_data | M  | ANS  | 1-40   | Card acceptor data                                          |
| type               | M  | A    | 1-100  | `credit`. [`Response type`](#appendix--enum--response-type) |
| card_token         | M  | AN   | 32     | [`Card token`](#appendix--security--card-token).            |


```json
{
    "request_id": "16333296725945",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "response_code": "00",
    "transaction_amount": "95300",
    "merchant_reference": "040041100004",
    "tx_id": "010000200002000002211004074201",
    "parent_tx_id": "000000200002000002211004074113",
    "card_acceptor_data": "Transaction descriptor London GBR",
    "type": "confirm_installment",
    "card_token": "ecc23c11c5da3a9ebfed774d563e7a1e"
}
```

## P2PTransaction

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

**Note: The MCC code is applied automatically for Mastercard MoneySend operations when doing P2P transaction request:**

* 6536 used for intra-country payment.
* 6537 used for inter-country payment.
* 6538 used for MoneySend funding.

### Request

| Parameter                                                                               | M | Type | Length | Description                                                                                                                                                         |
|:----------------------------------------------------------------------------------------|:--|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                                                                  | M | AN   | 1-100  | Expected API method value: `p2p_transaction`                                                                                                                        |
| token                                                                                   | M | AN   | 1-20   | Merchant token                                                                                                                                                      |
| terminal_id                                                                             | M | AN   | 1-8    | Terminal API ID                                                                                                                                                     |
| sale_point_id                                                                           | M | AN   | 1-255  | Sale Point API ID                                                                                                                                                   |
| api_id                                                                                  | M | AN   | 1-8    | Merchant API ID                                                                                                                                                     |
| api_version                                                                             | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                         |
| data                                                                                    | M | OBJ  | -      | Transaction data                                                                                                                                                    |
| data / card_token                                                                       | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set                                                                                      |
| data / card_holder_name                                                                 | C | A    | 2-26   | Card holder full name. Required if card token is not set                                                                                                            |
| data / card_number                                                                      | C | N    | 13-19  | Card number. Required if card token is not set                                                                                                                      |
| data / card_expiry_month                                                                | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                    |
| data / card_expiry_year                                                                 | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                     |
| data / card_security_code                                                               | O | N    | 3      | Card security code (not included in `card_token`)                                                                                                                   |
| data / merchant_reference                                                               | M | ANS  | 1-255  | Merchant's internal ID                                                                                                                                              |
| data / transaction_amount                                                               | M | N    | 1-13   | Transaction amount in cents                                                                                                                                         |
| data / transaction_currency                                                             | M | N    | 3      | ISO Numeric currency code                                                                                                                                           |
| data / credit_amount                                                                    | O | N    | 1-13   | Credit transaction amount in cents. Transaction amount is used if this field is empty                                                                               |
| data / credit_currency                                                                  | O | N    | 3      | Credit transaction ISO Numeric currency code. Transaction currency is used if this field is empty.                                                                  |
| data / token_3ds                                                                        | C | AN   | 1-50   | Required if authorization is initiated with 3DS.                                                                                                                    |
| data / external_mpi                                                                     | C | N    | 1      | Required if authorization is initiated with external MPI. Values - `1` or `0`.                                                                                      |
| data / 3ds_version                                                                      | C | ANS  | 1-8    | Required if authorization is initiated with 3DS and merchant uses external MPI. Example: `2.1.0`.                                                                   |
| data / 3ds_authentication_status                                                        | C | A    | 1      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available statuses`](#appendix--enum--pares-transaction-status)                   |
| data / 3ds_eci                                                                          | C | N    | 2      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available ECI`](#appendix--enum--eci)                                             |
| data / 3ds_ds_tx_id                                                                     | C | ANS  | 36     | Required if authorization is initiated with 3DS and merchant uses external MPI, 3DS version is V2 or later.                                                         |
| data / token_otp                                                                        | C | AN   | 1-40   | Required if authorization is initiated with 3DS token for UnionPay scheme 3DS v1.                                                                                   |
| data / payment_transaction_type_indicator                                               | M | ANS  | 3      | [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator)                                                                                   |
| data / p2p_transaction_reference_data                                                   | M | OBJ  | -      | Person to person transaction reference data                                                                                                                         |
| data / p2p_transaction_reference_data / receiver_data                                   | C | OBJ  | -      | Person to Person receiver data. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                           |
| data / p2p_transaction_reference_data / receiver_data / first_name                      | C | A    | 1-35   | Person receiver first name. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                               |
| data / p2p_transaction_reference_data / receiver_data / middle_name                     | O | A    | 1      | Valid value will consist of the middle name initial of the receiver.                                                                                                |
| data / p2p_transaction_reference_data / receiver_data / last_name                       | C | A    | 1-35   | Person receiver last name. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                                |
| data / p2p_transaction_reference_data / receiver_data / street_address                  | O | ANS  | 1-50   | Person receiver street address                                                                                                                                      |
| data / p2p_transaction_reference_data / receiver_data / city                            | O | AN   | 1-25   | Valid location city name of the Receiver/Recipient                                                                                                                  |
| data / p2p_transaction_reference_data / receiver_data / state_code                      | C | N    | 3      | ISO 3166-2 state code. Required if country is USA or Canada                                                                                                         |
| data / p2p_transaction_reference_data / receiver_data / country                         | M | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / receiver_data / postal_code                     | O | N    | 1-10   | Person receiver postal code                                                                                                                                         |
| data / p2p_transaction_reference_data / receiver_data / phone_number                    | O | AN   | 1-20   | Person receiver phone number                                                                                                                                        |
| data / p2p_transaction_reference_data / receiver_data / date_of_birth                   | O | N    | 8      | Format `YYYYmmdd`. Receiver date of birth                                                                                                                           |
| data / p2p_transaction_reference_data / receiver_data / account_number_type             | O | AN   | 2      | Receiver [`Account number type`](#appendix--enum--account-number-type). If not provided will be defaulted to *03* (Card Account).                                   |
| data / p2p_transaction_reference_data / receiver_data / account_number                  | O | AN   | 50     | Person receiver account number                                                                                                                                      |
| data / p2p_transaction_reference_data / receiver_data / identification_type             | O | N    | 2      | [`Identification type code`](#appendix--enum--identification-type)                                                                                                  |
| data / p2p_transaction_reference_data / receiver_data / identification_number           | O | AN   | 1-25   | Valid identification number of the Receiver                                                                                                                         |
| data / p2p_transaction_reference_data / receiver_data / identification_country_code     | O | AN   | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / receiver_data / identification_expiration_date  | O | N    | 8      | format `YYYYmmdd`                                                                                                                                                   |
| data / p2p_transaction_reference_data / receiver_data / nationality                     | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / receiver_data / country_of_birth                | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / sender_data                                     | M | OBJ  | -      | Person to Person sender data. Required if mcc is 6537 (MoneySend Payment inter-country)                                                                             |
| data / p2p_transaction_reference_data / sender_data / first_name                        | M | A    | 1-35   | Person sender first name                                                                                                                                            |
| data / p2p_transaction_reference_data / sender_data / middle_name                       | O | A    | 1      | Valid value will consist of the middle name initial of the sender                                                                                                   |
| data / p2p_transaction_reference_data / sender_data / last_name                         | M | A    | 1-35   | Person sender last name                                                                                                                                             |
| data / p2p_transaction_reference_data / sender_data / street_address                    | M | ANS  | 1-50   | Person sender street address                                                                                                                                        |
| data / p2p_transaction_reference_data / sender_data / city                              | O | AN   | 1-25   | Valid location city name of the Sender                                                                                                                              |
| data / p2p_transaction_reference_data / sender_data / state_code                        | C | N    | 3      | If present must be a valid ISO country code                                                                                                                         |
| data / p2p_transaction_reference_data / sender_data / country                           | M | N    | 3      | ISO numeric country code                                                                                                                                            |
| data / p2p_transaction_reference_data / sender_data / postal_code                       | O | N    | 1-10   | Person sender postal code                                                                                                                                           |
| data / p2p_transaction_reference_data / sender_data / phone_number                      | O | AN   | 1-20   | Person sender phone number                                                                                                                                          |
| data / p2p_transaction_reference_data / sender_data / date_of_birth                     | O | N    | 8      | Format `YYYYmmdd`                                                                                                                                                   |
| data / p2p_transaction_reference_data / sender_data / account_number_type               | O | AN   | 2      | Sender [`Account number type`](#appendix--enum--account-number-type). If not provided will be defaulted to *03* (Card Account).                                     |
| data / p2p_transaction_reference_data / sender_data / account_number                    | O | AN   | 50     | Sender account number. If not provided value from field *card_number/card_token* will be filled.                                                                    |
| data / p2p_transaction_reference_data / sender_data / identification_type               | O | N    | 2      | [`Identification type code`](#appendix--enum--identification-type)                                                                                                  |
| data / p2p_transaction_reference_data / sender_data / identification_number             | O | AN   | 25     | Valid identification number of the Sender                                                                                                                           |
| data / p2p_transaction_reference_data / sender_data / identification_country_code       | O | AN   | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / sender_data / identification_expiration_date    | O | N    | 8      | format `YYYYmmdd`                                                                                                                                                   |
| data / p2p_transaction_reference_data / sender_data / nationality                       | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / sender_data / country_of_birth                  | O | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                     |
| data / p2p_transaction_reference_data / transaction_data                                | M | OBJ  | -      | Transaction data                                                                                                                                                    |
| data / p2p_transaction_reference_data / transaction_data / unique_transaction_reference | O | AN   | 1-19   | Unique transaction reference code                                                                                                                                   |
| data / p2p_transaction_reference_data / transaction_data / additional_message           | O | ANS  | 1-65   | Additional message                                                                                                                                                  |
| data / p2p_transaction_reference_data / transaction_data / funding_source               | O | N    | 2      | [`Funding source`](#appendix--enum--funding-source). If not provided value could be calculated from BIN of PAN which is provided in field *card_number/card_token*. |
| data / p2p_transaction_reference_data / transaction_data / participation_id             | O | AN   | 30     | Participation ID of sender                                                                                                                                          |
| data / p2p_transaction_reference_data / transaction_data / transaction_purpose          | O | N    | 2      | Purpose details for Mastercard MoneySend transactions [`Transaction purposes`](#appendix--enum--transaction-purpose)                                                |
| data / p2p_transaction_reference_data / language_description                            | O | OBJ  | -      | Information about the language selected by the customer                                                                                                             |
| data / p2p_transaction_reference_data / language_description / language_identification  | O | AN   | 3      | Language ISO 3166-1 numeric country code                                                                                                                            |
| data / p2p_transaction_reference_data / language_description /language_data             | O | ANS  | 1-50   | Additional information in the language selected by the customer                                                                                                     |
| data / pan_entry_mode                                                                   | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                 |
| data / local_date                                                                       | M | N    | 8      | Local date: `YYYYmmdd` format                                                                                                                                       |
| data / local_time                                                                       | M | N    | 6      | Local time: `HHiiss`  format                                                                                                                                        |
| data / customer_email                                                                   | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                |
| data / customer_phone                                                                   | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                |
| data / customer_id                                                                      | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                |
| data / customer_ip                                                                      | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                                                                                                |
| data / merchant_var_1                                                                   | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                           |
| data / merchant_var_2                                                                   | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                           |
| data / merchant_var_3                                                                   | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                           |
| data / merchant_var_4                                                                   | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                           |
| data / independent_sales_organization_id                                                | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                                   |
| data / authenticate_request_id                                                          | C | N    | 40     | S3D authentication request ID. Must be provided if `token_3ds` is sent and internal MPI is used. Not applicable for external MPI.                                   |
| data / digital_wallet_identifier                                                        | O | N    | 3      | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                                                                          |

```json
{
    "method": "p2p_transaction",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_security_code": "201",
        "card_expiry_month": "12",
        "card_expiry_year": "25",
        "local_date": "20181212",
        "local_time": "120112",
        "merchant_reference": "070080100001",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "credit_amount": "9000",
        "credit_currency": "840",
        "token_3ds": "AAABAWaDIQAAAABEZYMhAAAAAAA",
        "p2p_transaction_reference_data": {
            "receiver_data": {
                "first_name": "RFnamename",
                "middle_name": "R",
                "last_name": "RLnamename",
                "street_address": "Park lane 222",
                "city": "London",
                "state_code": "555",
                "country": "440",
                "postal_code": "54465",
                "phone_number": "867505055",
                "date_of_birth": "11181987",
                "account_number_type": "03",
                "account_number": "2223000048400011",
                "identification_type": "01",
                "identification_number": "33333333",
                "identification_country_code": "GBR",
                "identification_expiration_date": "20191130",
                "nationality": "GBR",
                "country_of_birth": "GBR"
            },
            "sender_data": {
                "first_name": "SFname",
                "middle_name": "S",
                "last_name": "SLname",
                "street_address": "Park lane 444",
                "city": "London",
                "state_code": "555",
                "country": "440",
                "postal_code": "77777777",
                "phone_number": "8888888",
                "date_of_birth": "11181987",
                "account_number_type": "03",
                "account_number": "2223000048400011",
                "identification_type": "01",
                "identification_number": "33333333",
                "identification_country_code": "GBR",
                "identification_expiration_date": "20191130",
                "nationality": "GBR",
                "country_of_birth": "GBR"
            },
            "transaction_data": {
                "unique_transaction_reference": "1234567890123465789",
                "additional_message": "222",
                "funding_source": "05",
                "participation_id": "44",
                "transaction_purpose": "00"
            },
            "language_description": {
                "language_identification": "372",
                "language_data": "7"
            }
        },
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4",
        "authenticate_request_id": "15635308355047"
    }
}
```

### Response

| Parameter                               | M  | Type | Length | Description                                                                                                                                                                         |
|:----------------------------------------|:---|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                              | M  | N    | 14     | Request identification number                                                                                                                                                       |
| merchant_var_1                          | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                              |
| merchant_var_2                          | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                              |
| merchant_var_3                          | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                              |
| merchant_var_4                          | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                              |
| merchant_reference                      | ME | ANS  | 1-255  | Merchant's internal ID                                                                                                                                                              |
| status                                  | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                                 |
| status_code                             | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                                             |
| api_version                             | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                         |
| p2p_funding                             | M  | OBJ  | -      | Information about the funding transaction                                                                                                                                           |
| p2p_funding / response_code             | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                                                                                 |
| p2p_funding / transaction_amount        | ME | N    | 1-12   | Transaction amount                                                                                                                                                                  |
| p2p_funding / transaction_currency      | M  | N    | 3      | ISO Numeric currency code                                                                                                                                                           |
| p2p_funding / authorization_id_response | C  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. Returned only if transaction has been approved by issuer. |
| p2p_funding / tx_id                     | M  | N    | 30     | Transaction ID                                                                                                                                                                      |
| p2p_funding / card_acceptor_data        | O  | ANS  | 1-40   | Card acceptor data                                                                                                                                                                  |
| p2p_credit                              | C  | OBJ  | -      | Information about the credit transaction. Returned only if credit response is present.                                                                                              |
| p2p_credit / response_code              | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                                                                                 |
| p2p_credit / transaction_amount         | ME | N    | 1-12   | Transaction amount                                                                                                                                                                  |
| p2p_credit / transaction_currency       | M  | N    | 3      | ISO Numeric currency code                                                                                                                                                           |
| p2p_credit / authorization_id_response  | C  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. Returned only if transaction has been approved by issuer. |
| p2p_credit / tx_id                      | M  | N    | 30     | Transaction ID                                                                                                                                                                      |
| p2p_credit / card_acceptor_data         | O  | ANS  | 1-40   | Card acceptor data                                                                                                                                                                  |
| type                                    | M  | A    | 1-100  | `p2p_transaction`. [`Response type`](#appendix--enum--response-type)                                                                                                                |
| settlement_currency                     | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                                                                                              |
| settlement_amount                       | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                                                                                             |

```json
{
    "request_id": "15850597694624",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "merchant_reference": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "transaction_amount": "1000",
    "type": "p2p_transaction",
    "settlement_currency": "978",
    "settlement_amount": "8000",
    "p2p_funding": {
        "response_code": "00",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "tx_id": "000001300078000044200324142250",
        "authorization_id_response": "552991",
        "card_acceptor_data": "mer11 London GBR"
    },
    "p2p_credit": {
        "response_code": "00",
        "transaction_amount": "8000",
        "transaction_currency": "840",
        "tx_id": "000001300078000045200324142321",
        "authorization_id_response": "735097",
        "card_acceptor_data": "mer11 London GBR"
    }
}
```

## PEP Check

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                    | M | Type | Length | Description                                                                                                                                                  |
|:-----------------------------|:--|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                       | M | AN   | 1-100  | Expected API method value: `pep_check`                                                                                                                       |
| token                        | M | AN   | 1-20   | Merchant token                                                                                                                                               |
| api_id                       | M | AN   | 1-8    | Merchant API ID                                                                                                                                              |
| api_version                  | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                  |
| data                         | M | OBJ  | -      | Person data.                                                                                                                                                 |
| data / threshold             | M | AN   | 1-3    | Minimum score to filter matched profiles. Between 1 and 100.                                                                                                 |
| data / pep                   | O | ANS  | 1      | `0` or `1`. If value is `1` return PEP profiles. Default value is “false” and matched PEP profiles will not be returned.                                     |
| data / previous_sanctions    | O | ANS  | 1      | `0` or `1`. If value is `1` return previously sanctioned profiles. If not provided, then default value is “false” and matched profiles will not be returned. |
| data / current_sanctions     | O | ANS  | 1      | `0` or `1`. If value is `1` return currently sanctioned profiles. If not provided, then default value is “false” and matched profiles will not be returned.  |
| data / law_enforcement       | O | ANS  | 1      | `0` or `1`. If value is `1` return profiles from “Law Enforcement” dataset.                                                                                  |
| data / financial_regulator   | O | ANS  | 1      | `0` or `1`. If value is `1` return profiles from “Financial regulator” dataset.                                                                              |
| data / insolvency            | O | ANS  | 1      | `0` or `1`. If value is `1` return profiles from “Insolvency” dataset.                                                                                       |
| data / disqualified_director | O | ANS  | 1      | `0` or `1`. If value is `1` return profiles from "Disqualified Director" dataset.                                                                            |
| data / adverse_media         | O | ANS  | 1      | `0` or `1`. If value is `1` return profiles from “Adverse Media” dataset.                                                                                    |
| data / forename              | M | ANS  | 1-100  | Person forename.                                                                                                                                             |
| data / middle_name           | O | ANS  | 1-100  | Person middle name.                                                                                                                                          |
| data / surname               | M | ANS  | 1-100  | Person surname.                                                                                                                                              |
| data / date_of_birth         | O | AN   | 10     | Date of birth. `YYYY-mm-dd` format. Any value > 1753-01-01                                                                                                   |
| data / year_of_birth         | O | AN   | 4      | Year of birth. `YYYY` format. Value between 1753 and 9999                                                                                                    |
| data / address               | O | ANS  | 1-150  | Address.                                                                                                                                                     |
| data / city                  | O | ANS  | 1-50   | City.                                                                                                                                                        |
| data / county                | O | ANS  | 1-100  | County.                                                                                                                                                      |
| data / postcode              | O | ANS  | 1-20   | Post code.                                                                                                                                                   |
| data / country               | M | ANS  | 3      | Country in ISON format (ISO 3166 by the RIPE Network Coordination Centre).                                                                                   |

```json
{
   "method": "pep_check",
   "token": "mer11",
   "terminal_id": "pa1bra",
   "api_id": "mer11",
   "sale_point_id": "mer11",
   "api_version": "1.0",

   "data": {
        "threshold":"70",
        "pep":"1",
        "previous_sanctions":"0",
        "current_sanctions":"0",
        "law_enforcement":"0",
        "financial_regulator":"0",
        "insolvency":"0",
        "disqualified_director":"0",
        "adverse_media":"0",
        "forename":"John",
        "middle_name":null,
        "surname":"Doe",
        "date_of_birth":"1952-10-23",
        "year_of_birth":"1952",
        "address":"St. Jane av.",
        "city":"London",
        "county":null,
        "postcode":"103132",
        "country":"643"
    }
}
```

### Response

| Parameter                                    | M | Type | Length | Description                         |
|:---------------------------------------------|:--|:-----|:-------|:------------------------------------|
| records_found                                | M | N    | 1-10   | Count of records found.             |
| matches                                      | M | OBJ  | -      | List of matches.                    |
| matches / score                              | O | ANS  | 1-100  | Match score. Value [0, 100]         |
| matches / person                             | O | OBJ  | -      | Person data.                        |
| matches / person / id                        | O | N    | 1-10   | Person id.                          |
| matches / person / title                     | O | OBJ  | -      |                                     |
| matches / person / title / description       | O | N    | 1-100  | Title description.                  |
| matches / person / alternativeTitle          | O | N    | 1-100  | Alternative title.                  |
| matches / person / forename                  | O | N    | 1-100  | Person forename.                    |
| matches / person / middlename                | O | N    | 1-100  | Person middlename.                  |
| matches / person / dateOfBirth               | O | N    | 10     | Date of birth. `YYYY-mm-dd` format. |
| matches / person / yearOfBirth               | O | N    | 4      | Year of birth. `YYYY` format.       |
| matches / person / dateOfDeath               | O | ANS  | 10     | Date of death. `YYYY-mm-dd` format. |
| matches / person / isDeceased                | O | N    | 1      | is Deceased.                        |
| matches / person / gender                    | O | N    | 1-10   | Gender.                             |
| matches / person / nationality               | O | OBJ  | -      |                                     |
| matches / person / nationality / nationality | O | N    | 1-20   | Nationality.                        |
| matches / person / imageURL                  | O | N    | 1-255  | Image URL.                          |
| matches / person / telephoneNumber           | O | N    | 1-20   | Telephone Number.                   |
| matches / person / faxNumber                 | O | N    | 1-20   | Fax number.                         |
| matches / person / mobileNumber              | O | N    | 1-20   | Mobile number.                      |
| matches / person / email                     | O | N    | 1-40   | Email.                              |
| matches / person / pepLevel                  | O | N    | 1      | PEP level.                          |
| matches / person / isPEP                     | O | N    | 1      | is PEP.                             |
| matches / person / isSanctionsCurrent        | O | N    | 1      | Current sanctions is included.      |
| matches / person / isSanctionsPrevious       | O | N    | 1      | Previous sanctions is included.     |
| matches / person / isLawEnforcement          | O | N    | 1      | Law enforcement is included.        |
| matches / person / isFinancialregulator      | O | N    | 1      | Financial regulator is included.    |
| matches / person / isDisqualifiedDirector    | O | N    | 1      | Disqualified director is included.  |
| matches / person / isInsolvent               | O | N    | 1      | Insolvent is included.              |
| matches / person / isAdverseMedia            | O | N    | 1      | Adverse media is included.          |
| matches / person / addresses                 | O | OBJ  | -      | Address list.                       |
| matches / person / addresses / address1      | O | N    | 1-40   | Address #1.                         |
| matches / person / addresses / address2      | O | N    | 1-40   | Address #2.                         |
| matches / person / addresses / address3      | O | N    | 1-40   | Address #3.                         |
| matches / person / addresses / address4      | O | N    | 1-40   | Address #4.                         |
| matches / person / addresses / city          | O | N    | 1-50   | City.                               |
| matches / person / addresses / county        | O | N    | 1-100  | County.                             |
| matches / person / addresses / postcode      | O | N    | 1-20   | Post code.                          |
| matches / person / addresses / country       | O | OBJ  | -      | -                                   |
| matches / person / addresses / country /name | O | N    | 1-100  | Country name.                       |
| matches / person / aliases                   | O | OBJ  | -      | Array of aliases for profile.       |
| matches / person / articles                  | O | OBJ  | -      | Array of articles (documents).      |
| matches / person / sanctions                 | O | OBJ  | -      | Array of sanctions for profile.     |
| matches / person / notes                     | O | OBJ  | -      | Array of notes added to profile.    |
| matches / person / linkedBusinesses          | O | OBJ  | -      | Array of businesses profile.        |
| matches / person / politicalPositions        | O | OBJ  | -      | Array of political positions.       |
| matches / person / linkedBusinesses          | O | OBJ  | -      | Array of businesses                 |
| matches / person / business                  | O | OBJ  | -      | Object containing profile data.     |

```json
{
    "records_found": "2",
    "matches": [{
        "score": "100",
        "person": {
            "id": "116301",
            "title": {
                "description": "Mr"
            },
            "alternativeTitle": "",
            "forename": "John",
            "middlename": null,
            "surname": "Doe",
            "dateOfBirth": "1952-10-07",
            "yearOfBirth": "1952",
            "dateOfDeath": null,
            "yearOfDeath": null,
            "isDeceased": false,
            "gender": "Male",
            "nationality": {
                "nationality": "British"
            },
            "imageURL": "https:\/\/secure.c6-intelligence.com\/c6images\/0020715000\/002089412832.jpg",
            "telephoneNumber": "",
            "faxNumber": "",
            "mobileNumber": "",
            "email": "",
            "pepLevel": "1",
            "isPEP": true,
            "isSanctionsCurrent": false,
            "isSanctionsPrevious": false,
            "isLawEnforcement": false,
            "isFinancialregulator": false,
            "isDisqualifiedDirector": false,
            "isInsolvent": false,
            "isAdverseMedia": true,
            "addresses": [
                {
                    "address1": "",
                    "address2": "",
                    "address3": "",
                    "address4": "",
                    "city": "London",
                    "county": "",
                    "postcode": "",
                    "country": {
                        "name": "United Kingdom"
                    }
                },
                {
                    "address1": "23 George Street",
                    "address2": "",
                    "address3": "",
                    "address4": "",
                    "city": "London",
                    "county": "",
                    "postcode": "103132",
                    "country": {
                        "name": "United Kingdom"
                    }
                }
            ],
            "aliases": [
                {
                    "title": null,
                    "alternativeTitle": null,
                    "forename": "John",
                    "middlename": null,
                    "surname": "Doe"
                },
                {
                    "title": null,
                    "alternativeTitle": "",
                    "forename": "John",
                    "middlename": "null",
                    "surname": "Doe"
                }
            ]
        }
    }]
}
```

## Refund

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                                                                                                               |
|:-----------------------------------------|:--|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `refund`                                                                                                                                       |
| token                                    | M | AN   | 1-20   | Merchant token                                                                                                                                                            |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                                                                                                           |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                                                                                                         |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                                                                                                           |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                               |
| data                                     | M | OBJ  | -      | Transaction data                                                                                                                                                          |
| data / card_token                        | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.                                                                                           |
| data / card_holder_name                  | C | A    | 2-26   | Card holder full name. Required if card token is not set.                                                                                                                 |
| data / card_number                       | C | N    | 13-19  | Card number. Required if card token is not set.                                                                                                                           |
| data / card_expiry_month                 | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                          |
| data / card_expiry_year                  | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                           |
| data / card_security_code                | O | N    | 3      | Card security code (not included in `card_token`).                                                                                                                        |
| data / local_date                        | M | N    | 8      | Local date: `YYYYmmdd` format                                                                                                                                             |
| data / local_time                        | M | N    | 6      | Local time: `HHiiss`  format                                                                                                                                              |
| data / merchant_reference                | M | ANS  | 1-255  | Merchant's internal ID                                                                                                                                                    |
| data / transaction_amount                | M | N    | 1-12   | Transaction amount in cents                                                                                                                                               |
| data / transaction_currency              | M | N    | 3      | ISO Numeric currency code                                                                                                                                                 |
| data / parent_tx_id                      | M | N    | 30     | ID must be from the first authorize request.                                                                                                                              |
| data / mcc                               | O | AN   | 4      | Merchant category code                                                                                                                                                    |
| data / pan_entry_mode                    | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                       |
| data / transaction_descriptor            | O | ANS  | 22     | Transaction descriptor                                                                                                                                                    |
| data / member_defined_data               | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                                                                                                           |
| data / customer_email                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                      |
| data / customer_phone                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                      |
| data / customer_id                       | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                      |
| data / customer_ip                       | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                                                                                                      |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                 |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                 |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                 |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                 |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                                         |
| data / force_offline_only                | O | N    | 1      | Forces offline refund if 1 value is sent. Offline refund does not send authorization request to scheme but puts authorization directly to clearing file. Mastercard only. |

```json
{
    "method": "refund",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_expiry_month": "12",
        "card_expiry_year": "25",
        "card_security_code": "101",
        "local_date": "20181225",
        "local_time": "120012",
        "merchant_reference": "070080100001",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "parent_tx_id": "000000200013000014190611085828"
    }
}
```

### Response

| Parameter                 | M  | Type | Length | Description                                                                                                              |
|:--------------------------|:---|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------|
| request_id                | M  | N    | 14     | Request identification number                                                                                            |
| merchant_var_1            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_2            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_3            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_var_4            | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                   |
| merchant_reference        | ME | ANS  | 1-255  | Merchant's internal ID                                                                                                   |
| response_code             | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                      |
| scheme_error_description  | O  | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors.                   |
| transaction_amount        | ME | N    | 1-12   | Transaction amount in cents                                                                                              |
| status                    | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                      |
| status_code               | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                  |
| api_version               | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                              |
| tx_id                     | M  | N    | 1-255  | Transaction ID                                                                                                           |
| parent_tx_id              | ME | N    | 1-255  | Echoed refunded transaction ID                                                                                           |
| authorization_id_response | O  | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period |
| type                      | M  | A    | 1-100  | `refund`. [`Response type`](#appendix--enum--response-type)                                                              |
| card_token                | M  | AN   | 32     | [`Card token`](#appendix--security--card-token).                                                                         |
| settlement_currency       | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                                   |
| settlement_amount         | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                                  |

```json
{
    "request_id": "15602435938135",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": "070080100001",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "000000200013000015190611085956",
    "parent_tx_id": "000000200013000014190611085828",
    "authorization_id_response": "246190",
    "card_acceptor_data": "mer11 London BRA",
    "type": "refund",
    "card_token": "cde6287e719f7b71e178c3ab5b3054ff",
    "settlement_currency": "978",
    "settlement_amount": "8000"
}
```

## RequestCardsUpdate

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                   | M | Type | Length | Description                                                                     |
|:----------------------------|:--|:-----|:-------|:--------------------------------------------------------------------------------|
| method                      | M | AN   | 1-100  | Expected API method value: `request_cards_update`                               |
| token                       | M | AN   | 1-20   | Merchant token                                                                  |
| terminal_id                 | M | AN   | 1-8    | Terminal API ID                                                                 |
| sale_point_id               | M | AN   | 1-255  | Sale Point API ID                                                               |
| api_id                      | M | AN   | 1-8    | Merchant API ID                                                                 |
| api_version                 | M | ANS  | 1-10   | Fixed `1.0`                                                                     |
| data                        | M | OBJ  | -      | Transaction data                                                                |
| data / cards                | M | OJB  | LIST   | List of cards to update                                                         |
| data / cards / card_token   | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set. |
| data / cards / card_number  | C | N    | 12-19  | Card number. Required if card token is not set.                                 |
| data / cards / expiry_year  | C | ANS  | 2      | Card expiry year. Required if card token is not set.                            |
| data / cards / expiry_month | C | ANS  | 2      | Card expiry month. Required if card token is not set.                           |
| data / merchant_var_1       | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_2       | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_3       | O | ANS  | 1-255  | If passed will be echoed back as response                                       |
| data / merchant_var_4       | O | ANS  | 1-255  | If passed will be echoed back as response                                       |

```json
{
    "method": "request_cards_update",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "cards": [
            {
                "card_token": "6908f78ec8ebe575ab1b10215aad86c8"
            },
            {
                "card_number": "%YOUR_CARD_NUMBER%",
                "expiry_year": "20",
                "expiry_month": "03"
            }
        ]
    }
}
```

### Response

| Parameter          | M  | Type | Length | Description                                                               |
|:-------------------|:---|:-----|:-------|:--------------------------------------------------------------------------|
| request_id         | M  | N    | 14     | Request identification number                                             |
| merchant_var_1     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                    |
| merchant_var_2     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                    |
| merchant_var_3     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                    |
| merchant_var_4     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                    |
| merchant_reference | ME | ANS  | 1-255  | Merchant's internal ID                                                    |
| response_code      | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                       |
| transaction_amount | M  | N    | 1-12   | Empty string                                                              |
| status             | M  | A    | -      | [`Status`](#appendix--enum--status)                                       |
| status_code        | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.   |
| api_version        | ME | ANS  | 1-10   | Fixed `1.0`                                                               |
| type               | M  | A    | 1-100  | `request_cards_update`. [`Response type`](#appendix--enum--response-type) |

```json
{
    "request_id": "15599092439068",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": null,
    "response_code": null,
    "transaction_amount": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "request_cards_update"
}
```

### Notifications
Once Card updates are processed a notification will be sent to a URL provided during the set-up procedure.

| Parameter       | M | Type | Length | Description                                                                                                               |
|:----------------|:--|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------|
| method          | M | AN   | 1-100  | Expected API method value: `cards_update_notification`                                                                    |
| api_version     | M | ANS  | 1-10   | Fixed `1.0`                                                                                                               |
| update_batch_id | M | N    | 14     | Update batch ID. To be used during cards update result retrieval ([`RetrieveCardsUpdate`](#actions--retrievecardsupdate)) |
| request_ids     | M | LIST | -      | List of request identification numbers                                                                                    |
| request_ids /   | M | N    | 14     | Request identification number associated with card update request                                                         |
| type            | M | ANS  | 1-255  | Type. Possible values: "fulfillments", "failures"                                                                         |

```json
{
  "method": "cards_update_notification",
  "api_version": "1.0",
  "update_batch_id": 15635444466200,
  "request_ids":[
        15891804075530,
        15891807075334,
        15891808072231
  ],
  "type": "fulfillments"
}
```

## RetrieveCardsUpdate

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter              | M | Type | Length | Description                                        |
|:-----------------------|:--|:-----|:-------|:---------------------------------------------------|
| method                 | M | AN   | 1-100  | Expected API method value: `retrieve_cards_update` |
| token                  | M | AN   | 1-20   | Merchant token                                     |
| terminal_id            | M | AN   | 1-8    | Terminal API ID                                    |
| sale_point_id          | M | AN   | 1-255  | Sale Point API ID                                  |
| api_id                 | M | AN   | 1-8    | Merchant API ID                                    |
| api_version            | M | ANS  | 1-10   | Fixed `1.0`                                        |
| data                   | M | OBJ  | -      | Transaction data                                   |
| data / update_batch_id | M | AN   | 1-20   | Update batch ID                                    |
| data / merchant_var_1  | O | ANS  | 1-255  | If passed will be echoed back as response          |
| data / merchant_var_2  | O | ANS  | 1-255  | If passed will be echoed back as response          |
| data / merchant_var_3  | O | ANS  | 1-255  | If passed will be echoed back as response          |
| data / merchant_var_4  | O | ANS  | 1-255  | If passed will be echoed back as response          |

```json
{
    "method": "retrieve_cards_update",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "update_batch_id": "15640663033691"
    }
}
```

### Response

| Parameter                     | M   | Type | Length | Description                                                                                                                                              |
|:------------------------------|:----|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                    | M   | N    | 14     | Request identification number                                                                                                                            |
| merchant_var_1                | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                   |
| merchant_var_2                | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                   |
| merchant_var_3                | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                   |
| merchant_var_4                | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                   |
| merchant_reference            | ME  | ANS  | 1-255  | Merchant's internal ID                                                                                                                                   |
| response_code                 | M   | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                                                      |
| transaction_amount            | M   | N    | 1-12   | Empty string                                                                                                                                             |
| status                        | M   | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                      |
| status_code                   | M   | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                  |
| api_version                   | ME  | ANS  | 1-10   | Fixed `1.0`                                                                                                                                              |
| type                          | M   | A    | 1-100  | `retrieve_cards_update`. [`Response type`](#appendix--enum--response-type)                                                                               |
| data                          | M   | OJB  | LIST   | List of card updates                                                                                                                                     |
| data / requested_card_token   | C   | AN   | 32     | [`Card token`](#appendix--security--card-token). Only card token is returned if card token was used in request_cards_update request.                     |
| data / requested_card_number  | C   | N    | 12-19  | Requested Card number. Returned if card details were used in request_cards_update request.                                                               |
| data / requested_expiry_year  | C   | ANS  | 2      | Requested Card expiry year. Returned if card details were used in request_cards_update request.                                                          |
| data / requested_expiry_month | C   | ANS  | 2      | Requested Card expiry month. Returned if card details were used in request_cards_update request.                                                         |
| data / outcome                | M   | ANS  | 1-255  | [`Update outcome`](#appendix--enum--retrieve-cards-update-outcome)                                                                                       |
| data / updated_card_token     | O   | AN   | 32     | [`Card token`](#appendix--security--card-token). Updated card token. Only card token is returned if card token was used in request_cards_update request. |
| data / updated_card_number    | O   | N    | 12-19  | Updated Card number. Masked card number is returned if token was used in request.                                                                        |
| data / updated_expiry_year    | O   | ANS  | 2      | Updated Card expiry year                                                                                                                                 |
| data / updated_expiry_month   | O   | ANS  | 2      | Updated Card expiry month                                                                                                                                |

```json
{
    "request_id": "15599092439068",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": null,
    "response_code": null,
    "transaction_amount": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "retrieve_cards_update",
    "data": [
        {
            "requested_card_token": "6908f78ec8ebe575ab1b10215aad86c8",
            "outcome": "card_number_change",
            "updated_card_number": "476114***0153",
            "updated_card_token": "dc1deb10b2b1454640d6a1038ad7a96e"
        },
        {
            "requested_card_number": "%YOUR_CARD_NUMBER%",
            "requested_card_expiry_year": "20",
            "requested_card_expiry_month": "03",
            "outcome": "no_match",
            "updated_card_number": null,
            "updated_card_expiry_year": null,
            "updated_card_expiry_month": null
        }
    ]
}
```

## Reverse

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                                   |
|:-----------------------------------------|:--|:-----|:-------|:----------------------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `reverse`                                                          |
| token                                    | M | AN   | 1-20   | Merchant token                                                                                |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                               |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                             |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                               |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                                   |
| data                                     | M | OBJ  | -      | Transaction data                                                                              |
| data / card_token                        | O | AN   | 32     | [`Card token`](#appendix--security--card-token).                                              |
| data / card_holder_name                  | C | A    | 2-26   | Card holder full name. Required if card_number is set.                                        |
| data / card_number                       | O | N    | 13-19  | Card number.                                                                                  |
| data / card_expiry_month                 | C | N    | 2      | Card expiration month. Required if card_number is set. Optional for UnionPay.                 |
| data / card_expiry_year                  | C | N    | 2      | Card expiration year. Required if card_number is set. Optional for UnionPay.                  |
| data / card_security_code                | O | N    | 3      | Card security code (not included in `card_token`).                                            |
| data / parent_tx_id                      | M | N    | 30     | Initial authorize transaction ID.                                                             |
| data / local_date                        | M | N    | 8      | Local date: `YYYYmmdd` format. **Should be the same as value in reversible authorize**        |
| data / local_time                        | M | N    | 6      | Local time: `HHiiss`  format. **Should be the same as value in reversible authorize**         |
| data / transaction_amount                | M | N    | 1-12   | Transaction amount in cents                                                                   |
| data / transaction_currency              | M | N    | 3      | ISO Numeric currency code. **Should be the same as value in reversible authorize**            |
| data / merchant_reference                | M | ANS  | 1-255  | Merchant's internal ID                                                                        |
| data / cardholder_verification_method    | M | A    | 1      | `S` (offline PIN) or `P` (online PIN)                                                         |
| data / partial_reverse                   | C | N    | 1      | Required only if reverse is partial. Set to `1` to indicate partial reversal, defaults to `0` |
| data / reversal_reason_code              | O | N    | 2      | [`Reversal reason code`](#appendix--enum--reversal-reason-code)                               |
| data / transaction_descriptor            | O | ANS  | 22     | Transaction descriptor                                                                        |
| data / mcc                               | O | AN   | 4      | Merchant category code                                                                        |
| data / member_defined_data               | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                               |
| data / pan_entry_mode                    | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                           |
| data / customer_email                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                          |
| data / customer_phone                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                          |
| data / customer_id                       | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                          |
| data / customer_ip                       | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                          |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                     |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                     |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                     |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                     |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                             |
| data / track_1_data                      | O | ANS  | 1-37   | Card magnetic stripe information                                                              |
| data / track_2_data                      | O | ANS  | 1-37   | Card magnetic stripe information                                                              |

```json
{
    "method": "reverse",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_expiry_month": "12",
        "card_expiry_year": "25",
        "card_security_code": "101",
        "local_date": "20181225",
        "local_time": "120012",
        "merchant_reference": "070080100001",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "parent_tx_id": "000000200013000012190611083435",
        "cardholder_verification_method": "S"
    }
}
```

### Response

| Parameter                | M   | Type | Length | Description                                                                                            |
|:-------------------------|:----|:-----|:-------|:-------------------------------------------------------------------------------------------------------|
| request_id               | M   | N    | 14     | Request identification number                                                                          |
| merchant_var_1           | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_2           | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_3           | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_var_4           | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                 |
| merchant_reference       | ME  | ANS  | 1-255  | Merchant's internal ID                                                                                 |
| response_code            | M   | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                    |
| scheme_error_description | O   | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors. |
| transaction_amount       | ME  | N    | 1-12   | Transaction amount in cents                                                                            |
| status                   | M   | A    | -      | [`Status`](#appendix--enum--status)                                                                    |
| status_code              | M   | N    | -      | [`Status code`](#appendix--enum--status-code). Internal request status.                                |
| api_version              | ME  | ANS  | 1-10   | Fixed `1.0`                                                                                            |
| tx_id                    | M   | N    | 1-255  | Reversal Transaction ID                                                                                |
| parent_tx_id             | ME  | N    | 1-255  | Echoed reversed  transaction ID                                                                        |
| card_acceptor_data       | M   | ANS  | 1-40   | Card acceptor data                                                                                     |
| type                     | M   | A    | 1-100  | `reverse`. [`Response type`](#appendix--enum--response-type)                                           |
| card_token               | M   | AN   | 32     | [`Card token`](#appendix--security--card-token).                                                       |
| settlement_currency      | M   | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                 |
| settlement_amount        | M   | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                |

```json
{
    "request_id": "15602433551966",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": "070080100001",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "020000200013000013190611085610",
    "parent_tx_id": "000000200013000012190611083435",
    "card_acceptor_data": "mer11 London BRA",
    "type": "reverse",
    "card_token": "cde6287e719f7b71e178c3ab5b3054ff",
    "settlement_currency": "978",
    "settlement_amount": "8000"
}
```

## Sale

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                                                                                                                                                                                                                               |
|:-----------------------------------------|:--|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `sale`                                                                                                                                                                                                                                                         |
| token                                    | M | AN   | 1-20   | Merchant token                                                                                                                                                                                                                                                                            |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                                                                                                                                                                                                                           |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                                                                                                                                                                                                                         |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                                                                                                                                                                                                                           |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                                                                                                                               |
| data                                     | M | OBJ  | -      | Transaction data                                                                                                                                                                                                                                                                          |
| data / card_token                        | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.                                                                                                                                                                                                           |
| data / card_holder_name                  | C | A    | 2-26   | Card holder full name. Required if card token is not set.                                                                                                                                                                                                                                 |
| data / card_number                       | C | N    | 13-19  | Card number. Required if card token is not set.                                                                                                                                                                                                                                           |
| data / card_expiry_month                 | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay.                                                                                                                                                                                                          |
| data / card_expiry_year                  | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.                                                                                                                                                                                                           |
| data / card_security_code                | O | N    | 3      | Card security code (not included in `card_token`).                                                                                                                                                                                                                                        |
| data / parent_tx_id                      | C | N    | 30     | Required if a subsequent recurring transaction takes place and corresponds to the original `transaction_id` from the initial sale request.                                                                                                                                                |
| data / local_date                        | M | N    | 8      | Local date: `YYYYmmdd` format                                                                                                                                                                                                                                                             |
| data / local_time                        | M | N    | 6      | Local time: `HHiiss`  format                                                                                                                                                                                                                                                              |
| data / transaction_amount                | M | N    | 1-12   | Transaction amount in cents                                                                                                                                                                                                                                                               |
| data / transaction_currency              | M | N    | 3      | ISO Numeric currency code                                                                                                                                                                                                                                                                 |
| data / merchant_reference                | M | ANS  | 1-255  | Merchant's internal ID                                                                                                                                                                                                                                                                    |
| data / transaction_descriptor            | O | ANS  | 22     | Transaction descriptor                                                                                                                                                                                                                                                                    |
| data / avs_check                         | C | N    | 1      | `0` or `1`. If value is `1` then Address Verification Service will be initiated.                                                                                                                                                                                                          |
| data / accept_partial_approval           | C | N    | 1      | `0` or `1`. If value is `1` then partial approvals will be accepted for this transactions.                                                                                                                                                                                                |
| data / mcc                               | O | AN   | 4      | Merchant category code                                                                                                                                                                                                                                                                    |
| data / token_3ds                         | C | AN   | 1-50   | Required if authorization is initiated with 3DS.                                                                                                                                                                                                                                          |
| data / external_mpi                      | C | N    | 1      | Required if authorization is initiated with external MPI. Values - `1` or `0`.                                                                                                                                                                                                            |
| data / 3ds_version                       | C | ANS  | 1-8    | Required if authorization is initiated with 3DS and merchant uses external MPI. Example: `2.1.0`.                                                                                                                                                                                         |
| data / 3ds_authentication_status         | C | A    | 1      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available statuses`](#appendix--enum--pares-transaction-status)                                                                                                                                         |
| data / 3ds_eci                           | C | N    | 2      | Required if authorization is initiated with 3DS and merchant uses external MPI. [`Available ECI`](#appendix--enum--eci)                                                                                                                                                                   |
| data / 3ds_ds_tx_id                      | C | ANS  | 36     | Required if authorization is initiated with 3DS and merchant uses external MPI, 3DS version is V2 or later.                                                                                                                                                                               |
| data / token_otp                         | C | AN   | 1-40   | Required if authorization is initiated with 3DS token for UnionPay scheme3DS v1.                                                                                                                                                                                                          |
| data / authorize_type                    | O | A    | 1-40   | Only `final` or `normal` [`Authorize type`](#appendix--enum--authorize-type) can be passed. Defaults to final.                                                                                                                                                                            |
| data / billing_address                   | C | ANS  | 1-20   | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / billing_city                      | C | ANS  | 1-20   | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / billing_country                   | C | ANS  | 3      | Country ISON code. Required if `avs_check` is `1`                                                                                                                                                                                                                                         |
| data / billing_post_code                 | C | ANS  | 1-9    | Required if `avs_check` is `1`                                                                                                                                                                                                                                                            |
| data / is_recurring_payment              | C | N    | 1      | `0` or `1`. If value is `1` then recurring payment for this PAN will be initiated. Any subsequent recurring authorize or sale payments should pass this parameter along with `parent_tx_id`, which corresponds to the original `transaction_id`, from the initial authorize/sale request. |
| data / member_defined_data               | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                                                                                                                                                                                                                           |
| data / pan_entry_mode                    | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                                                                                                                                       |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                                                                                                                                                 |
| data / customer_email                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_phone                    | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_id                       | O | ANS  | 1-255  | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / customer_ip                       | O | ANS  | 1-39   | If passed could be used for risk scoring calculation                                                                                                                                                                                                                                      |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                                                                                                                                                         |
| data / authenticate_request_id           | C | N    | 40     | S3D authentication request ID. Must be provided if `token_3ds` is sent and internal MPI is used. Not applicable for external MPI.                                                                                                                                                         |
| data / is_mit                            | O | N    | 1      | `0` or `1`. If value is `1` then this transaction will be considered to be a Merchant Initiated Transaction                                                                                                                                                                               |
| data / mit_parent_tx_id                  | C | N    | 30     | Required for MIT transactions. ID must be populated from the initial authorize request.                                                                                                                                                                                                   |
| data / mit_message_reason_code           | C | A    | 2-3    | Required only for VISA MIT transactions. [`MIT message reason code`](#appendix--enum--mit-message-reason-codes).                                                                                                                                                                          |
| data / promotion_code                    | C | AN   | 6      | [`Promotion code`](#appendix--enum--promotion-codes). Should be sent if merchant wants get available installment plans for this transaction.                                                                                                                                              |
| data / digital_wallet_identifier         | O | N    | 3      | [`Digital wallet identifier`](#appendix--enum--digital-wallet-identifier).                                                                                                                                                                                                                |
| data / account_type_from                  | O | N    | 2      | Default value 'NA' [`Account type from`](#appendix--enum--account-type-from).                                                                          |
| data / account_type_to                    | O | N    | 2      | Default value 'NA' [`Account type to`](#appendix--enum--account-type-to).                                                                              |
| data / reservation_duration               | C | N    | 2      | Duration of reservation in days. Required for Auto-Rental and Hotel reservations. Available range 01-99. VISA scheme only.                             |

```json
{
    "method": "sale",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_expiry_month": "12",
        "card_expiry_year": "25",
        "merchant_reference": "4005520000000129",
        "transaction_amount": "8000",
        "transaction_currency": "978",
        "transaction_descriptor": "test",
        "card_security_code": "101",
        "avs_check": "1",
        "pan_entry_mode": "E",
        "local_time": "120112",
        "local_date": "20181212",
        "accept_partial_approval": "0",
        "token_3ds": "test",
        "billing_address": "test",
        "billing_city": "Glasgow",
        "billing_country": "826",
        "billing_post_code": "4125",
        "is_recurring_payment": "0",
        "authenticate_request_id": "15635308355047",
        "is_mit": "1"
    }
}
```

### Response

| Parameter                                          | M   | Type | Length | Description                                                                                                                                                         |
|:---------------------------------------------------|:----|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                                         | M   | N    | 14     | Request identification number                                                                                                                                       |
| merchant_var_1                                     | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_2                                     | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_3                                     | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_4                                     | ME  | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_reference                                 | ME  | ANS  | 1-255  | Merchant's internal ID                                                                                                                                              |
| response_code                                      | M   | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                                                                                                 |
| scheme_error_description                           | O   | ANS  | 1-1024 | Scheme error description if request fails scheme side validation. Returned only for JCB scheme errors.                                                              |
| transaction_amount                                 | ME  | N    | 1-12   | Transaction amount                                                                                                                                                  |
| status                                             | M   | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                 |
| status_code                                        | M   | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                             |
| api_version                                        | ME  | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                         |
| tx_id                                              | M   | N    | 1-255  | Transaction ID                                                                                                                                                      |
| avs_check_response                                 | O   | A    | 1      | [`Address verification response code`](#appendix--enum--address-verification-code). Will be returned if address verification service (AVS) was initiated in request |
| authorization_id_response                          | O   | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period                                            |
| card_acceptor_data                                 | M   | ANS  | 1-40   | Card acceptor data                                                                                                                                                  |
| type                                               | M   | A    | 1-100  | `sale`. [`Response type`](#appendix--enum--response-type)                                                                                                           |
| card_token                                         | M   | AN   | 32     | [`Card token`](#appendix--security--card-token).                                                                                                                    |
| merchant_advice_code                               | O   | AN   | 2      | [`Merchant advice code`](#appendix--enum--merchant-advice-code).                                                                                                    |
| installments_plans                                 | O   | LIST | -      | List of available installment plans. Maximum of 12 plans could be available.                                                                                        |
| installments_plans / installment_plan_id           | M   | N    | 1-2    | Installment plan ID.                                                                                                                                                |
| installments_plans / number_of_installments        | M   | N    | 1-2    | Number of installments.                                                                                                                                             |
| installments_plans / interest_rate                 | M   | N    | 5      | Interest rate.                                                                                                                                                      |
| installments_plans / installment_fee               | M   | N    | 12     | Installment fee.                                                                                                                                                    |
| installments_plans / annual_percentage_rate        | M   | N    | 5      | Annual percentage rate.                                                                                                                                             |
| installments_plans / first_installment_amount      | M   | N    | 12     | First installment amount.                                                                                                                                           |
| installments_plans / subsequent_installment_amount | M   | N    | 12     | Subsequent installment amount.                                                                                                                                      |
| installments_plans / total_amount_due              | M   | N    | 12     | Total amount due.                                                                                                                                                   |
| settlement_currency                                | M   | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                                                                                              |
| settlement_amount                                  | M   | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                                                                                             |

```json
{
    "request_id": "15601524094907",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": "4005520000000129",
    "response_code": "00",
    "transaction_amount": "8000",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "000000200013000007190610074009",
    "avs_check_response": "N",
    "authorization_id_response": "459594",
    "card_acceptor_data": "mer11*test London BRA",
    "type": "sale",
    "card_token": "cde6287e719f7b71e178c3ab5b3054ff",
    "merchant_advice_code": "02",
    "settlement_currency": "978",
    "settlement_amount": "8000",
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

## SecondPresentment

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                                                                                                     |
|:-----------------------------------------|:--|:-----|:-------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `create_sp`                                                                                                                          |
| token                                    | M | AN   | 1-20   | Merchant token                                                                                                                                                  |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                                                                                                 |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                                                                                               |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                                                                                                 |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                     |
| data                                     | M | OBJ  | -      | Transaction data                                                                                                                                                |
| data / transaction_id                    | M | N    | 14     | Transaction ID                                                                                                                                                  |
| data / clearing_file_id                  | C | N    | 25     | Clearing file ID is mandatory if field `already_sent` is present.                                                                                               |
| data / mti                               | O | N    | 4      | Message type identifier                                                                                                                                         |
| data / function_code                     | O | N    | 3      | [`Function code`](#appendix--enum--function-code)                                                                                                               |
| data / transaction_amount                | O | N    | 1-12   | Transaction amount in cents                                                                                                                                     |
| data / transaction_currency              | O | N    | 3      | ISO numeric currency code                                                                                                                                       |
| data / reason_code                       | O | N    | 4      | Provides the message receiver with the reason for sending the message (DE25 Message Reason Code). [`Message reason code`](#appendix--enum--message-reason-code) |
| data / already_sent                      | O | N    | 1      | Flag to mark second presentment as already sent. Values - `0` or `1`                                                                                            |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                       |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                       |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                       |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                                                                                                       |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                                                                                               |

```json
{
    "method": "create_sp",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
      "transaction_id": "123456789101112",
      "clearing_file_id": "0024109240005002368800004",
      "transaction_amount": "800",
      "transaction_currency": "978",
      "mti": "1240",
      "function_code": "205",
      "reason_code": "1500",
      "merchant_var_1": "test data 1",
      "merchant_var_2": "test data 2",
      "merchant_var_3": "test data 3",
      "merchant_var_4": "test data 4"
    }
}
```

### Response

| Parameter          | M  | Type | Length | Description                                                             |
|:-------------------|:---|:-----|:-------|:------------------------------------------------------------------------|
| request_id         | M  | N    | 14     | Request identification number                                           |
| merchant_var_1     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_2     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_3     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_4     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_reference | ME | ANS  | 1-255  | Merchant's internal ID                                                  |
| response_code      | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                     |
| transaction_amount | ME | N    | 1-12   | Transaction amount in cents                                             |
| status             | M  | A    | -      | [`Status`](#appendix--enum--status)                                     |
| status_code        | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status. |
| api_version        | ME | ANS  | 1-10   | Fixed `1.0`                                                             |
| type               | M  | A    | 1-100  | `create_sp`. [`Response type`](#appendix--enum--response-type)          |

```json
{
    "request_id": "15597416106007",
    "merchant_var_1": "test data 1",
    "merchant_var_2": "test data 2",
    "merchant_var_3": "test data 3",
    "merchant_var_4": "test data 4",
    "merchant_reference": null,
    "response_code": null,
    "transaction_amount": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "create_sp"
}
```

## Ping

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter      | M | Type | Length | Description                                           |
|:---------------|:--|:-----|:-------|:------------------------------------------------------|
| method         | M | AN   | 1-100  | Expected API method value: `ping`                     |
| token          | M | AN   | 1-20   | Merchant token                                        |
| terminal_id    | M | AN   | 1-8    | Terminal API ID                                       |
| sale_point_id  | M | AN   | 1-255  | Sale Point API ID                                     |
| api_id         | M | AN   | 1-8    | Merchant API ID                                       |
| api_version    | M | ANS  | 1-10   | Fixed `1.0`                                           |
| data           | M | OBJ  | -      | Transaction data                                      |
| data / message | M | ANS  | 1-255  | Request message. Message must be static value "ping". |

```json
{
    "method": "ping",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
      "message": "ping"
    }
}
```

### Response

| Parameter      | M  | Type | Length | Description                                                             |
|:---------------|:---|:-----|:-------|:------------------------------------------------------------------------|
| request_id     | M  | N    | 14     | Request identification number                                           |
| status         | M  | A    | -      | [`Status`](#appendix--enum--status)                                     |
| status_code    | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status. |
| api_version    | ME | ANS  | 1-10   | Fixed `1.0`                                                             |
| type           | M  | A    | 1-100  | `ping`. [`Response type`](#appendix--enum--response-type)               |
| data / message | M  | ANS  | 1-255  | Response message. Message will be static value "pong".                  |

```json
{
    "request_id": "15803761663096",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "ping",
    "data": {
        "message": "pong"
    }
}
```
# Information Retrieval

## ActualAuthorizesList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                     | M | Type | Length | Description                                                           |
|:------------------------------|:--|:-----|:-------|:----------------------------------------------------------------------|
| method                        | M | AN   | 1-100  | Expected API method value: `actual_authorizes_list`                   |
| token                         | M | AN   | 1-20   | Merchant token                                                        |
| terminal_id                   | M | AN   | 1-8    | Terminal API ID                                                       |
| sale_point_id                 | M | AN   | 1-255  | Sale Point API ID                                                     |
| api_id                        | M | AN   | 1-8    | Merchant API ID                                                       |
| api_version                   | M | ANS  | 1-10   | Fixed `1.0`                                                           |
| data                          | M | OBJ  | -      | Transaction data                                                      |
| data / date_from              | O | ANS  | 10     | From date `yyyy-mm-dd` format                                         |
| data / date_to                | O | ANS  | 10     | To date `yyyy-mm-dd` format                                           |
| data / date_updated_microtime | M | N    | 16     | Date updated from last received actual authorize entry. Format: `Uu`. |
| data / tx_id                  | O | N    | 1-255  | Actual authorize transaction ID filter.                               |
| data / merchant_reference     | O | ANS  | 1-255  | Merchant's internal ID                                                |
| data / rrn                    | O | ANS  | 1-15   | Retrieval reference number                                            |
| data / merchant_var_1         | O | ANS  | 1-255  | If passed will be echoed back as response                             |
| data / merchant_var_2         | O | ANS  | 1-255  | If passed will be echoed back as response                             |
| data / merchant_var_3         | O | ANS  | 1-255  | If passed will be echoed back as response                             |
| data / merchant_var_4         | O | ANS  | 1-255  | If passed will be echoed back as response                             |

```json
{
    "method": "actual_authorizes_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "date_from": "2018-01-01",
        "date_to": "2018-12-01",
        "date_updated_microtime": "1514757600000000",
        "merchant_reference": "20000000000001",
        "rrn": "072000000001",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter                     | M  | Type | Length | Description                                                                            |
|:------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------------------|
| request_id                    | M  | N    | 14     | Request identification number                                                          |
| merchant_var_1                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                 |
| merchant_var_2                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                 |
| merchant_var_3                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                 |
| merchant_var_4                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                 |
| status                        | M  | A    | -      | [`Status`](#appendix--enum--status)                                                    |
| status_code                   | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                |
| api_version                   | ME | ANS  | 1-10   | Fixed `1.0`                                                                            |
| type                          | M  | A    | 1-100  | `actual_authorizes_list`. [`Response type`](#appendix--enum--response-type)            |
| total_records                 | M  | N    | 11     | Total records count                                                                    |
| has_more_records              | M  | A    | 1      | Informs if there are more records in next page. `Y` or `N`                             |
| data                          | M  | LIST | -      | Authorizes list. May contain zero or more records.                                     |
| data / id                     | M  | N    | 20     | Authorize ID                                                                           |
| data / tx_id                  | M  | N    | 1-255  | Transaction ID                                                                         |
| data / amount                 | M  | N    | 1-13   | Amount in cents                                                                        |
| data / currency               | M  | N    | 3      | ISO numeric currency code                                                              |
| data / mcc                    | M  | AN   | 3-4    | Merchant category code                                                                 |
| data / captured_amount        | O  | N    | 1-13   | Captured amount in cents. Only returned if transaction is captured                     |
| data / date_captured          | O  | ANS  | 10     | Capture date in `yyyy-mm-dd hh:ii:ss` format. Only returned if transaction is captured |
| data / refunded_amount        | O  | N    | 1-13   | Refunded amount in cents. Only returned if transaction has refunds                     |
| data / date_created           | M  | ANS  | 10     | Create date in `yyyy-mm-dd hh:ii:ss` format                                            |
| data / date_updated           | M  | N    | 10     | Update date in `yyyy-mm-dd hh:ii:ss` format                                            |
| data / date_updated_microtime | M  | N    | 16     | Update date in `Uu` format                                                             |
| data / date_expiration        | M  | ANS  | 10     | Expiration date in `yyyy-mm-dd hh:ii:ss` format                                        |
| data / masked_pan             | M  | AN   | 13-19  | Masked account number                                                                  |
| data / accounts_id            | M  | AN   | 20     | Account ID                                                                             |
| data / state                  | M  | ANS  | 1-30   | [`Actual authorizes states`](#appendix--enum--actual-authorize-states)                 |
| data / procedure              | M  | ANS  | 1-30   | [`Actual authorize procedures`](#appendix--enum--actual-authorize-procedures)          |
| data / is_terminal_call       | M  | N    | 1      | Is terminal call - `0` or `1`                                                          |
| data / settlement_currency    | M  | N    | 3      | Expected settlement currency (depends on Acquiring Bin configuration).                 |
| data / settlement_amount      | M  | N    | 1-12   | Expected settlement amount (actual settlement amount may be different).                |

```json
{
    "request_id": "15893539431597",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "actual_authorize_list",
    "total_records": "3",
    "data": [
        {
            "id": "15893073817950",
            "tx_id": "000000200018000007200512181621",
            "amount": "8000",
            "currency": "978",
            "mcc": "1520",
            "captured_amount": "500",
            "date_created": "2020-05-12",
            "date_updated": "2020-05-12",
            "date_updated_microtime": "1589307439664800",
            "date_expiration": "2020-05-19",
            "masked_pan": "222300******0011",
            "accounts_id": "15874688914483",
            "state": "captured",
            "procedure": "authorize",
            "is_terminal_call": "0",
            "settlement_currency": "978",
            "settlement_amount": "8000",
        },
        {
            "id": "15893075531240",
            "tx_id": "000000200018000008200512181912",
            "amount": "8000",
            "currency": "978",
            "mcc": "1520",
            "captured_amount": "500",
            "date_created": "2020-05-12",
            "date_updated": "2020-05-12",
            "date_updated_microtime": "1589307586239400",
            "date_expiration": "2020-05-19",
            "masked_pan": "222300******0011",
            "accounts_id": "15874688914483",
            "state": "captured",
            "procedure": "authorize",
            "is_terminal_call": "0",
            "settlement_currency": "978",
            "settlement_amount": "8000",
        },
        {
            "id": "15893076212262",
            "tx_id": "000000200018000009200512182020",
            "amount": "8000",
            "currency": "978",
            "mcc": "1520",
            "captured_amount": "500",
            "date_captured": "2020-05-12",
            "date_created": "2020-05-12",
            "date_updated": "2020-05-12",
            "date_updated_microtime": "1589307640541200",
            "date_expiration": "2020-05-19",
            "masked_pan": "222300******0011",
            "accounts_id": "15874688914483",
            "state": "captured",
            "procedure": "authorize",
            "is_terminal_call": "0",
            "settlement_currency": "978",
            "settlement_amount": "8000",
        }
    ],
    "has_more_records": "N"
}
```

## AuthorizesList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                     | M | Type | Length | Description                                                    |
|:------------------------------|:--|:-----|:-------|:---------------------------------------------------------------|
| method                        | M | AN   | 1-100  | Expected API method value: `authorizes_list`                   |
| token                         | M | AN   | 1-20   | Merchant token                                                 |
| terminal_id                   | M | AN   | 1-8    | Terminal API ID                                                |
| sale_point_id                 | M | AN   | 1-255  | Sale Point API ID                                              |
| api_id                        | M | AN   | 1-8    | Merchant API ID                                                |
| api_version                   | M | ANS  | 1-10   | Fixed `1.0`                                                    |
| data                          | M | OBJ  | -      | Transaction data                                               |
| data / date_updated_microtime | M | N    | 16     | Date updated from last received authorize entry. Format: `Uu`. |
| data / tx_id                  | O | N    | 1-255  | Actual authorize transaction ID filter.                        |
| data / date_from              | O | ANS  | 10     | From date `yyyy-mm-dd` format                                  |
| data / date_to                | O | ANS  | 10     | To date `yyyy-mm-dd` format                                    |
| data / merchant_var_1         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_2         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_3         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_4         | O | ANS  | 1-255  | If passed will be echoed back as response                      |

```json
{
    "method": "authorizes_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "date_updated_microtime": "1565599962410002",
        "tx_id": "000000200018000005200525080011",
        "date_from": "2018-01-01",
        "date_to": "2018-12-01",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter                          | M  | Type | Length | Description                                                                                                                                                         |
|:-----------------------------------|:---|:-----|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                         | M  | N    | 14     | Request identification number                                                                                                                                       |
| merchant_var_1                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_2                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_3                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| merchant_var_4                     | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                              |
| status                             | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                 |
| status_code                        | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                             |
| api_version                        | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                         |
| type                               | M  | A    | 1-100  | `authorizes_list`. [`Response type`](#appendix--enum--response-type)                                                                                                |
| total_records                      | M  | N    | 11     | Total records count                                                                                                                                                 |
| has_more_records                   | M  | A    | 1      | Informs if there are more records in next page. `Y` or `N`                                                                                                          |
| data                               | M  | LIST | -      | Authorizes list. May contain zero or more records.                                                                                                                  |
| data / id                          | M  | N    | 20     | Authorize ID                                                                                                                                                        |
| data / tx_id                       | M  | N    | 1-255  | Transaction ID                                                                                                                                                      |
| data / parent_tx_id                | O  | N    | 1-255  | Parent transaction ID                                                                                                                                               |
| data / date_transmission           | M  | NS   | 19     | Transmission date `yyyy-mm-dd hh:mm:ss` format                                                                                                                      |
| data / stan                        | M  | AN   | 6      | STAN                                                                                                                                                                |
| data / transaction_amount          | M  | N    | 1-13   | Transaction amount in cents                                                                                                                                         |
| data / billing_amount              | O  | N    | 1-13   | Billing amount in cents                                                                                                                                             |
| data / transaction_currency        | M  | N    | 3      | ISO numeric transaction currency code                                                                                                                               |
| data / billing_currency            | O  | N    | 3      | ISO numeric billing transaction currency code                                                                                                                       |
| data / financial_network_code      | O  | ANS  | 1-10   | Financial network code                                                                                                                                              |
| data / bank_net_reference_number   | O  | ANS  | 1-20   | BankNet reference number                                                                                                                                            |
| data / rrn                         | M  | ANS  | 1-15   | Retrieval reference number                                                                                                                                          |
| data / avs_check_response          | O  | A    | 1      | [`Address verification response code`](#appendix--enum--address-verification-code). Will be returned if address verification service (AVS) was initiated in request |
| data / response_code               | M  | AN   | 1-3    | [`Response Codes`](#appendix--enum--response-codes)                                                                                                                 |
| data / cvc_validation_result       | O  | AN   | 1      | CVC validation result                                                                                                                                               |
| data / cash_back_amount            | O  | N    | 1-13   | Cash back amount in cents                                                                                                                                           |
| data / merchant_reference          | O  | ANS  | 1-255  | Merchant's internal ID                                                                                                                                              |
| data / is_partial_approval         | M  | N    | 1      | Is partial approval. Values - `1` or `0`                                                                                                                            |
| data / authorize_type              | M  | A    | 1-40   | [`Authorize type`](#appendix--enum--authorize-type). Defaults to `final`                                                                                            |
| data / merchant_advice_code        | O  | AN   | 2      | [`Merchant advice code`](#appendix--enum--merchant-advice-code)                                                                                                     |
| data / transaction_fee_amount      | O  | N    | 1-13   | Transaction fee amount in cents                                                                                                                                     |
| data / authorization_id_response   | O  | ANS  | 1-6    | Authorization ID response                                                                                                                                           |
| data / recurring_status            | O  | ANS  | 1-50   | Recurring status. Values - `start`, `bill`, `bill_with_security`                                                                                                    |
| data / masked_pan                  | M  | AN   | 13-19  | Masked account number                                                                                                                                               |
| data / trace_id                    | O  | ANS  | 15     | Trace ID                                                                                                                                                            |
| data / is_switched                 | M  | N    | 1      | Is switched. Values - `1` or `0`                                                                                                                                    |
| data / is_cancelled                | M  | N    | 1      | Is cancelled. Values - `1` or `0`                                                                                                                                   |
| data / is_rejected                 | M  | N    | 1      | Is rejected. Values - `1` or `0`                                                                                                                                    |
| data / pan_entry_mode              | O  | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                                                                                                                 |
| data / procedure                   | M  | AS   | 1-30   | [`Procedure`](#appendix--enum--procedure)                                                                                                                           |
| data / risk_score                  | O  | N    | 1-11   | Risk score                                                                                                                                                          |
| data / risk_status                 | O  | N    | 1-11   | Risk status                                                                                                                                                         |
| data / date_updated_microtime      | M  | N    | 16     | Authorize date updated. Format: `Uu`.                                                                                                                               |
| data / card_token                  | M  | ANS  | 32     | Card token                                                                                                                                                          |
| data / date_local_transaction_time | M  | NS   | 19     | Local transaction date in `yyyy-mm-dd hh-mm-ss` format                                                                                                              |
| data / card_acceptor_data          | O  | ANS  | 1-254  | Card acceptor data                                                                                                                                                  |
| data / is_terminal_call            | M  | N    | 1      | Is terminal call - `0` or `1`                                                                                                                                       |
| data / scheme_id                   | M  | N    | 1-10   | [`Available schemes`](#appendix--enum--scheme)                                                                                                                      |

```json
{
    "request_id": "15903938100514",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "authorizes_list",
    "total_records": "3",
    "data": [
        {
            "id": "15903936305651",
            "tx_id": "000000200018000005200525080011",
            "parent_tx_id": null,
            "date_transmission": "2020-05-25 08:00:11",
            "stan": "000005",
            "transaction_amount": "8000",
            "billing_amount": "8790",
            "transaction_currency": "978",
            "billing_currency": "840",
            "financial_network_code": "MCC",
            "bank_net_reference_number": "A00005",
            "rrn": "052500000001",
            "avs_check_response": null,
            "response_code": "00",
            "cvc_validation_result": "M",
            "cash_back_amount": null,
            "merchant_reference": "20000000000001",
            "is_partial_approval": "0",
            "authorize_type": "pre",
            "merchant_advice_code": null,
            "transaction_fee_amount": null,
            "authorization_id_response": "995187",
            "recurring_status": null,
            "masked_pan": "222300******0011",
            "trace_id": "MCCA00005200528",
            "is_switched": "1",
            "is_cancelled": "0",
            "is_rejected": "0",
            "pan_entry_mode": null,
            "procedure": "authorize",
            "risk_score": null,
            "risk_status": null,
            "date_updated_microtime": "1590393630557936",
            "card_token": "cdecfbaa5af1b55ac6acad622f9fe627",
            "date_local_transaction_time": "2018-07-16 13:20:14",
            "card_acceptor_data": "mer11 London GBR",
            "is_terminal_call": "0",
            "scheme_id": "1"
        },
        {
            "id": "15903937554523",
            "tx_id": "000000200018000006200525080228",
            "parent_tx_id": null,
            "date_transmission": "2020-05-25 08:02:28",
            "stan": "000006",
            "transaction_amount": "8000",
            "billing_amount": "8790",
            "transaction_currency": "978",
            "billing_currency": "840",
            "financial_network_code": "MCC",
            "bank_net_reference_number": "A00006",
            "rrn": "052500000002",
            "avs_check_response": null,
            "response_code": "00",
            "cvc_validation_result": "M",
            "cash_back_amount": null,
            "merchant_reference": "20000000000001",
            "is_partial_approval": "0",
            "authorize_type": "pre",
            "merchant_advice_code": null,
            "transaction_fee_amount": null,
            "authorization_id_response": "861456",
            "recurring_status": null,
            "masked_pan": "222300******0011",
            "trace_id": "MCCA00006200528",
            "is_switched": "1",
            "is_cancelled": "0",
            "is_rejected": "0",
            "pan_entry_mode": null,
            "procedure": "authorize",
            "risk_score": null,
            "risk_status": null,
            "date_updated_microtime": "1590393755445455",
            "card_token": "cdecfbaa5af1b55ac6acad622f9fe627",
            "date_local_transaction_time": "2018-07-16 13:20:14",
            "card_acceptor_data": "mer11 London GBR",
            "is_terminal_call": "0",
            "scheme_id": "1"
        }
    ],
    "has_more_records": "N"
}
```

## BalanceInquiry

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                                | M | Type | Length | Description                                                                      |
|:-----------------------------------------|:--|:-----|:-------|:---------------------------------------------------------------------------------|
| method                                   | M | AN   | 1-100  | Expected API method value: `balance_inquiry`                                     |
| token                                    | M | AN   | 1-20   | Merchant token                                                                   |
| terminal_id                              | M | AN   | 1-8    | Terminal API ID                                                                  |
| sale_point_id                            | M | AN   | 1-255  | Sale Point API ID                                                                |
| api_id                                   | M | AN   | 1-8    | Merchant API ID                                                                  |
| api_version                              | M | ANS  | 1-10   | Fixed `1.0`                                                                      |
| data                                     | M | OBJ  | -      | Transaction data                                                                 |
| data / card_token                        | C | AN   | 32     | [`Card token`](#appendix--security--card-token). Required if card data not set.  |
| data / card_holder_name                  | C | A    | 2-26   | Card holder full name. Required if card token is not set.                        |
| data / card_number                       | C | N    | 13-19  | Card number. Required if card token is not set.                                  |
| data / card_expiry_month                 | C | N    | 2      | Card expiration month. Required if card token is not set. Optional for UnionPay. |
| data / card_expiry_year                  | C | N    | 2      | Card expiration year. Required if card token is not set. Optional for UnionPay.  |
| data / card_security_code                | O | N    | 3      | Card security code (not included in `card_token`).                               |
| data / transaction_currency              | M | N    | 3      | ISO Numeric currency code                                                        |
| data / merchant_reference                | M | ANS  | 1-255  | Merchant's internal ID                                                           |
| data / pan_entry_mode                    | O | AN   | 1-10   | [`Pan entry mode`](#appendix--enum--pan-entry-mode)                              |
| data / track_2_data                      | O | ANS  | 1-37   | Card magnetic stripe information. Required if `pan_entry_mode` = 'SR'            |
| data / remote_program_type               | M | N    | 1      | `1` issuer domain or `2` acquirer. Required if `pan_entry_mode` = 'SR'           |
| data / member_defined_data               | O | ANS  | 1-255  | Reserved for transmitting data to cards network                                  |
| data / local_date                        | M | N    | 8      | Local date: `YYYYmmdd` format                                                    |
| data / local_time                        | M | N    | 6      | Local time: `HHiiss`  format                                                     |
| data / merchant_var_1                    | O | ANS  | 1-255  | If passed will be echoed back as response                                        |
| data / merchant_var_2                    | O | ANS  | 1-255  | If passed will be echoed back as response                                        |
| data / merchant_var_3                    | O | ANS  | 1-255  | If passed will be echoed back as response                                        |
| data / merchant_var_4                    | O | ANS  | 1-255  | If passed will be echoed back as response                                        |
| data / independent_sales_organization_id | O | N    | 11     | ID of merchant if merchant acts as independent sales organisation                |
| data / mcc                               | O | N    | 4      | Merchant category code                                                           |

```json
{
    "method": "balance_inquiry",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "card_holder_name": "John Smith",
        "card_number": "%YOUR_CARD_NUMBER%",
        "card_security_code": "101",
        "card_expiry_month": "12",
        "card_expiry_year": "22",
        "transaction_currency": "978",
        "merchant_reference": "070080100001",
        "pan_entry_mode": "SR",
        "track_2_data": "%YOUR_TRACK_2_DATA%",
        "remote_program_type": "1",
        "local_date": "20181212",
        "local_time": "120113"
    }
}
```

### Response

| Parameter                                   | M  | Type | Length | Description                                                                              |
|:--------------------------------------------|:---|:-----|:-------|:-----------------------------------------------------------------------------------------|
| request_id                                  | M  | N    | 14     | Request identification number                                                            |
| merchant_var_1                              | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                   |
| merchant_var_2                              | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                   |
| merchant_var_3                              | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                   |
| merchant_var_4                              | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                   |
| merchant_reference                          | ME | ANS  | 1-255  | Merchant's internal ID                                                                   |
| response_code                               | M  | AN   | 2      | [`Response Codes`](#appendix--enum--response-codes)                                      |
| transaction_amount                          | M  | N    | 1-12   | Transaction amount                                                                       |
| status                                      | M  | A    | -      | [`Status`](#appendix--enum--status)                                                      |
| status_code                                 | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                  |
| api_version                                 | ME | ANS  | 1-10   | Fixed `1.0`                                                                              |
| tx_id                                       | M  | N    | 1-255  | Transaction ID                                                                           |
| card_acceptor_data                          | M  | ANS  | 40     | Card acceptor data                                                                       |
| type                                        | M  | A    | 1-100  | `balance_inquiry`. [`Response type`](#appendix--enum--response-type)                     |
| card_token                                  | CE | AN   | 32     | [`Card token`](#appendix--security--card-token).                                         |
| additional_amounts                          | O  | LIST | -      | Additional balance amounts (DE54). Returned when no `track_2_data` is passed in request. |
| additional_amounts / account_type           | M  | AN   | 2      | [`Cardholder "From account" type`](#appendix--enum--cardholder-from-account-type)        |
| additional_amounts / amount_type            | M  | AN   | 2      | [`Amount type`](#appendix--enum--amount-type)                                            |
| additional_amounts / currency_code          | M  | N    | 3      | ISO numeric currency code                                                                |
| additional_amounts / credit_debit_indicator | O  | AN   | 2      | Credit (`C`) or Debit (`D`) indicator                                                    |
| additional_amounts / amount                 | M  | N    | 1-13   | Amount in cents                                                                          |

```json
{
    "request_id": "15598935756914",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": "070080100001",
    "response_code": "00",
    "transaction_amount": "0",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "tx_id": "000000300013000025190607074616",
    "card_acceptor_data": "mer11 London BR",
    "type": "balance_inquiry",
    "card_token": "a7c8c8a46b04f1f081010c08cd3cc2a3",
    "authorization_id_response": "574599",
    "additional_amounts": {
        "1": {
            "account_type": "00",
            "amount_type": "01",
            "currency_code": "826",
            "credit_debit_indicator": null,
            "amount": "99904015"
        }
    }
}
```

## BinsList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                     | M | Type | Length | Description                                                    |
|:------------------------------|:--|:-----|:-------|:---------------------------------------------------------------|
| method                        | M | AN   | 1-100  | Expected API method value: `bins_list`                         |
| token                         | M | AN   | 1-20   | Merchant token                                                 |
| terminal_id                   | M | AN   | 1-8    | Terminal API ID                                                |
| sale_point_id                 | M | AN   | 1-255  | Sale Point API ID                                              |
| api_id                        | M | AN   | 1-8    | Merchant API ID                                                |
| api_version                   | M | ANS  | 1-10   | Fixed `1.0`                                                    |
| data                          | M | OBJ  | -      | Transaction data                                               |
| data / date_updated_microtime | M | N    | 16     | Date updated from last received bin range entry. Format: `Uu`. |
| data / merchant_var_1         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_2         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_3         | O | ANS  | 1-255  | If passed will be echoed back as response                      |
| data / merchant_var_4         | O | ANS  | 1-255  | If passed will be echoed back as response                      |

```json
{
    "method": "bins_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "date_updated_microtime": "1565599962410002"
    }
}
```

### Response

| Parameter                     | M  | Type | Length | Description                                                                                                                                                                                                                  |
|:------------------------------|:---|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                    | M  | N    | 14     | Request identification number                                                                                                                                                                                                |
| merchant_var_1                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_2                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_3                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_4                | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| status                        | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                                                                          |
| status_code                   | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                                                                                      |
| api_version                   | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                                                                  |
| type                          | M  | A    | 1-100  | `bins_list`. [`Response type`](#appendix--enum--response-type)                                                                                                                                                               |
| has_more_records              | M  | A    | 1      | Informs if there are more records in next page. `Y` or `N`                                                                                                                                                                   |
| data                          | M  | LIST | -      | Bin data list                                                                                                                                                                                                                |
| data / id                     | M  | N    | 20     | Bin ID                                                                                                                                                                                                                       |
| data / bin                    | M  | N    | 6      | Bin code                                                                                                                                                                                                                     |
| data / bin_from               | M  | N    | 19     | Bin range from                                                                                                                                                                                                               |
| data / bin_to                 | M  | N    | 19     | Bin range to                                                                                                                                                                                                                 |
| data / card_brand             | M  | A    | -      | [`Card brand`](#appendix--enum--card-brand)                                                                                                                                                                                  |
| data / country_ison           | M  | N    | 3      | ISO 3166-1 numeric country code                                                                                                                                                                                              |
| data / country_code           | M  | A    | 3      | ISO 3166-1 alpha-3 country code                                                                                                                                                                                              |
| data / country_name           | M  | A    | 30     | Country name                                                                                                                                                                                                                 |
| data / raw_card_type          | M  | AN   | 1-4    | Raw card type value.                                                                                                                                                                                                         |
| data / card_type              | M  | AN   | 1-10   | [`Card Types`](#appendix--enum--card-types).                                                                                                                                                                                 |
| data / ica                    | O  | AN   | 0 - 11 | Unique issuer business id (only for MasterCard)                                                                                                                                                                              |
| data / date_updated           | M  | NS   | 19     | Bin updated date                                                                                                                                                                                                             |
| data / date_updated_microtime | M  | N    | 16     | Bin updated date microtime                                                                                                                                                                                                   |
| data / is_deleted             | M  | N    | 1      | Bin deletion flag. 1 - bin is deleted, 0 - bin is active                                                                                                                                                                     |
| data / raw_product_type       | O  | ANS  | 1-255  | Raw values for product type, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could bet provided. **Note:** Returned only if card information processing was successful |
| data / product_type           | O  | ANS  | 1-30   | [`Card Product Types`](#appendix--enum--card-product-types) **Note:** Returned only if card information processing was successful                                                                                            |
| data / raw_product_level      | O  | AN   | 1-255  | Raw values for product level, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could be provided. **Note:** Returned only if card information processing was successful |
| data / product_level          | O  | ANS  | 1-30   | [`Card Product Levels`](#appendix--enum--card-product-levels) **Note:** Returned only if card information processing was successful                                                                                          |
| data / issuer_name            | O  | ANS  | 1-50   | Issuer name                                                                                                                                                                                                                  |

```json
{
    "request_id": "15599092439068",
    "merchant_var_1": null,
    "merchant_var_2": null,
    "merchant_var_3": null,
    "merchant_var_4": null,
    "merchant_reference": null,
    "response_code": null,
    "transaction_amount": null,
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "bins_list",
    "data": [
        {
            "id": "15595614095176",
            "bin": "111111",
            "bin_from": "1111110000000000000",
            "bin_to": "1111199999999999999",
            "card_brand": "Mastercard",
            "country_ison": "840",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "C",
            "card_type": "Credit",
            "ica": "00112233445",
            "date_updated": "2019-06-03 11:30:09",
            "date_updated_microtime": "1565599962410002",
            "is_deleted": "0",
            "raw_product_type": "1-Consumer",
            "product_type": "Consumer",
            "raw_product_level": "Unknown",
            "product_level": "Unknown",
            "issuer_name":  "The name of the issuer"
        },
        {
            "id": "15595614095217",
            "bin": "400000",
            "bin_from": "4000000000000000000",
            "bin_to": "4000009999999999999",
            "card_brand": "Visa",
            "country_ison": "840",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "D",
            "card_type": "Debit",
            "ica": "",
            "date_updated": "2019-06-03 11:30:09",
            "date_updated_microtime": "1565599962410002",
            "is_deleted": "1",
            "raw_product_type": "Unknown",
            "product_type": "Unknown",
            "raw_product_level": "Unknown",
            "product_level": "Unknown",
            "issuer_name":  "The name of the issuer"
        },
        {
            "id": "15595614095234",
            "bin": "500000",
            "bin_from": "5000000000000000000",
            "bin_to": "5000009999999999999",
            "card_brand": "Mastercard",
            "country_ison": "840",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "C",
            "card_type": "Credit",
            "ica": "00112233446",
            "date_updated": "2019-06-03 11:30:09",
            "date_updated_microtime": "1565599962410002",
            "raw_product_type": "2-Commercial",
            "product_type": "Corporate",
            "raw_product_level": "Unknown",
            "product_level": "Unknown"
        },
        {
            "id": "15595614095256",
            "bin": "620000",
            "bin_from": "6200000000000000000",
            "bin_to": "6200009999999999999",
            "card_brand": "UnionPay",
            "country_ison": "840",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "C",
            "card_type": "Credit",
            "ica": "",
            "date_updated": "2019-06-03 11:30:09",
            "date_updated_microtime": "1565599962410002",
            "raw_product_type": "01-Official Card",
            "product_type": "Consumer",
            "raw_product_level": "1-UnionPay Classic",
            "product_level": "Classic",
            "issuer_name":  "The name of the issuer"
        },
        {
            "id": "15595614095271",
            "bin": "630000",
            "bin_from": "6300000000000000000",
            "bin_to": "6300009999999999999",
            "card_brand": "JCB",
            "country_ison": "840",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "C",
            "card_type": "Credit",
            "ica": "00112233447",
            "date_updated": "2019-06-03 11:30:09",
            "date_updated_microtime": "1565599962410002",
            "raw_product_type": "02-Debit (Personal)",
            "product_type": "Consumer",
            "raw_product_level": "R-Platinum (Precious)",
            "product_level": "Platinum"
        }
    ],
    "has_more_records": "Y"
}
```

## ChargebacksList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter             | M | Type | Length | Description                                   |
|:----------------------|:--|:-----|:-------|:----------------------------------------------|
| method                | M | AN   | 1-100  | Expected API method value: `chargebacks_list` |
| token                 | M | AN   | 1-20   | Merchant token                                |
| terminal_id           | M | AN   | 1-8    | Terminal API ID                               |
| sale_point_id         | M | AN   | 1-255  | Sale Point API ID                             |
| api_id                | M | AN   | 1-8    | Merchant API ID                               |
| api_version           | M | ANS  | 1-10   | Fixed `1.0`                                   |
| data                  | M | OBJ  | -      | Transaction data                              |
| data / date_from      | M | ANS  | 10     | From date `yyyy-mm-dd` format                 |
| data / date_to        | M | ANS  | 10     | To date `yyyy-mm-dd` format                   |
| data / page           | O | N    | 11     | Page number. Records per page: 100            |
| data / merchant_var_1 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_2 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_3 | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_4 | O | ANS  | 1-255  | If passed will be echoed back as response     |

```json
{
    "method": "chargebacks_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "date_from": "2018-01-01",
        "date_to": "2019-12-01",
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4"
    }
}
```

### Response

| Parameter                         | M  | Type | Length | Description                                                             |
|:----------------------------------|:---|:-----|:-------|:------------------------------------------------------------------------|
| request_id                        | M  | N    | 14     | Request identification number                                           |
| merchant_var_1                    | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_2                    | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_3                    | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| merchant_var_4                    | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                  |
| status                            | M  | A    | -      | [`Status`](#appendix--enum--status)                                     |
| status_code                       | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status. |
| api_version                       | ME | ANS  | 1-10   | Fixed `1.0`                                                             |
| type                              | M  | A    | 1-100  | `chargebacks_list`. [`Response type`](#appendix--enum--response-type)   |
| has_more_records                  | M  | A    | 1      | Informs if there are more records in next page. `Y` or `N`              |
| total_records                     | M  | N    | 11     | Total records count                                                     |
| data                              | M  | LIST | -      | Chargeback list data. May contain zero or more records.                 |
| data / id                         | M  | N    | 14-20  | Chargeback ID                                                           |
| data / tx_id                      | M  | N    | 1-255  | Transaction ID                                                          |
| data / mti                        | M  | N    | 4      | Message type identifier                                                 |
| data / function_code              | M  | N    | 3      | [`Function code`](#appendix--enum--function-code)                       |
| data / reason_code                | O  | N    | 4      | Provides the message receiver with the reason for sending the message   |
| data / masked_pan                 | M  | AN   | 13-19  | Masked account number                                                   |
| data / message                    | M  | AN   | -      | Chargeback description message                                          |
| data / amount                     | M  | N    | 1-13   | Amount in cents                                                         |
| data / currency                   | M  | N    | 3      | ISO numeric currency code                                               |
| data / settlement_amount          | O  | N    | 1-13   | Amount in cents                                                         |
| data / settlement_currency        | O  | N    | 3      | ISO numeric currency code                                               |
| data / date                       | M  | ANS  | 10     | Date when dispute record was received from the scheme.                  |
| data / accounts_id                | M  | N    | 14-20  | Account ID                                                              |
| data / mcc                        | M  | N    | 4      | Merchant category code                                                  |
| data / card_issuer_reference_data | M  | N    | 10     | Card issues reference data. Can be null                                 |
| data / pos_entry_mode             | M  | AN   | 22     | Pos entry mode                                                          |
| data / transaction_destination_id | M  | N    | 11     | Transaction destination ID                                              |
| data / transaction_originator_id  | M  | N    | 11     | Transaction originator ID                                               |
| data / transaction_receiving_id   | M  | N    | 11     | Transaction receiving ID                                                |
| data / trace_id                   | M  | ANS  | 15     | Trace ID                                                                |
| data / auth_code                  | O  | N    | 6      | Auth code                                                               |
| data / settlement_file_id         | ME | N    | 1-20   | Transaction's settlement file ID.                                       |

```json
{
    "request_id": "15601564673856",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "chargebacks_list",
    "total_records": "4",
    "data": [
        {
            "id": "15597413980694",
            "tx_id": "000000200003000030200117100230",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "9186",
            "currency": "978",
            "settlement_amount": "9186",
            "settlement_currency": "978",
            "accounts_id": "15780545645004",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000010208",
            "auth_code": "877269",
            "settlement_file_id": "1111111114"
        },
        {
            "id": "15597413988231",
            "tx_id": "000000200018000003220214091905",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "5544",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": null,
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000020208",
            "auth_code": "255991",
            "settlement_file_id": "1111111114"
        },
        {
            "id": "15597416282144",
            "tx_id": "000000200018000003220214091905",
            "mti": "1442",
            "function_code": "450",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "First chargeback full",
            "amount": "6299",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000030208",
            "auth_code": "989149",
            "settlement_file_id": "1111111114"
        },
        {
            "id": "15597418803435",
            "tx_id": "000000200018000002220214210522",
            "mti": "1240",
            "function_code": "205",
            "reason_code": null,
            "masked_pan": "5116***********0007",
            "date": "2019-06-10",
            "message": "Second presentment full",
            "amount": "800",
            "currency": "978",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000010208",
            "auth_code": "877269",
            "settlement_file_id": "1111111114"
        },
        {
            "id": "15759009205539",
            "tx_id": "000000200018000003220214210534",
            "mti": "1644",
            "function_code": "603",
            "reason_code": "6341",
            "masked_pan": "533219******0695",
            "date": "2019-12-09",
            "message": "Retrieval request",
            "amount": "20",
            "currency": "946",
            "settlement_amount": null,
            "settlement_currency": null,
            "accounts_id": "1",
            "mcc": "6538",
            "card_issuer_reference_data": null,
            "pos_entry_mode": "090051S99110",
            "transaction_destination_id": "00000019781",
            "transaction_originator_id": "00000019780",
            "transaction_receiving_id": "00000019782",
            "trace_id": "MCCA000020208",
            "auth_code": "255991",
            "settlement_file_id": "1111111114"
        }
    ],
    "has_more_records": "Y"
}
```

## SettlementsList

| URL          | Method |
|--------------|--------|
| /api/request | POST   |

### Request

| Parameter                     | M | Type | Length | Description                                   |
|:------------------------------|:--|:-----|:-------|:----------------------------------------------|
| method                        | M | AN   | 1-100  | Expected API method value: `settlements_list` |
| token                         | M | AN   | 1-20   | Merchant token                                |
| terminal_id                   | M | AN   | 1-8    | Terminal API ID                               |
| sale_point_id                 | M | AN   | 1-255  | Sale Point API ID                             |
| api_id                        | M | AN   | 1-8    | Merchant API ID                               |
| api_version                   | M | ANS  | 1-10   | Fixed `1.0`                                   |
| data                          | M | OBJ  | -      | Transaction data                              |
| data / date_updated_microtime | M | N    | 13-14  | Settlement date updated microtime             |
| data / date_from              | O | NS   | 10     | From date `yyyy-mm-dd` format                 |
| data / date_to                | O | NS   | 10     | To date `yyyy-mm-dd` format                   |
| data / merchant_var_1         | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_2         | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_3         | O | ANS  | 1-255  | If passed will be echoed back as response     |
| data / merchant_var_4         | O | ANS  | 1-255  | If passed will be echoed back as response     |

```json
{
    "method": "settlements_list",
    "token": "mer11",
    "terminal_id": "pa1bra",
    "api_id": "mer11",
    "sale_point_id": "mer11",
    "api_version": "1.0",
    "data": {
        "merchant_var_1": "test1",
        "merchant_var_2": "test2",
        "merchant_var_3": "test3",
        "merchant_var_4": "test4",
        "date_updated_microtime": "1565599962410002",
        "date_from": "2018-01-01",
        "date_to": "2019-12-31"
    }
}
```

### Response

| Parameter                                | M  | Type | Length | Description                                                                                                                                                                                                                  |
|:-----------------------------------------|:---|:-----|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request_id                               | M  | N    | 14     | Request identification number                                                                                                                                                                                                |
| merchant_var_1                           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_2                           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_3                           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| merchant_var_4                           | ME | ANS  | 1-255  | If passed will be echoed back, null returned otherwise                                                                                                                                                                       |
| status                                   | M  | A    | -      | [`Status`](#appendix--enum--status)                                                                                                                                                                                          |
| status_code                              | M  | N    | 3      | [`Status code`](#appendix--enum--status-code). Internal request status.                                                                                                                                                      |
| api_version                              | ME | ANS  | 1-10   | Fixed `1.0`                                                                                                                                                                                                                  |
| type                                     | M  | A    | 1-100  | `settlements_list`. [`Response type`](#appendix--enum--response-type)                                                                                                                                                        |
| total_records                            | M  | N    | 11     | Total records count                                                                                                                                                                                                          |
| has_more_records                         | M  | A    | 1      | Informs if there are more records in next page. `Y` or `N`                                                                                                                                                                   |
| data                                     | M  | LIST | -      | Settlement transaction data array                                                                                                                                                                                            |
| data / id                                | M  | N    | 14-20  | Settlement ID                                                                                                                                                                                                                |
| data / tx_id                             | M  | N    | 1-255  | Transaction ID                                                                                                                                                                                                               |
| data / amount                            | M  | N    | 1-13   | Amount in cents                                                                                                                                                                                                              |
| data / amount_direction                  | O  | A    | 1      | Available values: C - Credit / D - Debit. Only returned for UNIONPAY scheme and if field is present: "data / amount".                                                                                                        |
| data / currency                          | M  | N    | 3      | ISO numeric currency code                                                                                                                                                                                                    |
| data / masked_pan                        | M  | AN   | 13-19  | Masked account number                                                                                                                                                                                                        |
| data / accounts_id                       | M  | AN   | 20     | Settlement account ID                                                                                                                                                                                                        |
| data / card_country                      | M  | N    | 3      | ISO numeric currency code                                                                                                                                                                                                    |
| data / card_type                         | M  | AN   | 1-10   | [`Card Types`](#appendix--enum--card-types).                                                                                                                                                                                 |
| data / bin                               | M  | ANS  | 1-12   | Bin                                                                                                                                                                                                                          |
| data / region                            | M  | ANS  | 1      | Region - `Domestic`, `Interregion`, `Intraregion`, `null`                                                                                                                                                                    |
| data / transaction_arn                   | O  | ANS  | 23     | Acquirer reference number. Not present for schemes (UPI, JCB).                                                                                                                                                               |
| data / trace_id                          | M  | ANS  | 16     | Trace ID.                                                                                                                                                                                                                    |
| data / 3ds_secure_result                 | M  | ANS  | 10     | `Fully Authenticated`, `Attempt`, `Not Enrolled`, `Unknown`, `-`                                                                                                                                                             |
| data / recurring                         | M  | N    | 1      | Is recurring - `0`, `1`                                                                                                                                                                                                      |
| data / settlement_date                   | M  | ANS  | 10     | Settlement date `yyyy-mm-dd` format. Can be null.                                                                                                                                                                            |
| data / settlement_amount_gross           | M  | N    | 1-13   | Settlement amount (gross) in cents. Can be null.                                                                                                                                                                             |
| data / settlement_amount_gross_direction | O  | A    | 1      | Available values: C - Credit / D - Debit. Only returned for UNIONPAY scheme and if field is present: "data / settlement_amount_gross".                                                                                       |
| data / settlement_amount_net             | M  | N    | 1-13   | Settlement amount (net) in cents. Can be null.                                                                                                                                                                               |
| data / settlement_amount_net_direction   | O  | A    | 1      | Available values: C - Credit / D - Debit. Only returned for UNIONPAY scheme and if field is present: "data / settlement_amount_net".                                                                                         |
| data / settlement_currency               | M  | N    | 3      | ISO numeric currency code                                                                                                                                                                                                    |
| data / interchange_fee                   | M  | N    | 1-13   | Interchange fee amount in cents                                                                                                                                                                                              |
| data / interchange_fee_direction         | O  | A    | 1      | Available values: C - Credit / D - Debit. Only returned for UNIONPAY scheme and if field is present: "data / interchange_fee".                                                                                               |
| data / scheme_fee                        | M  | N    | 1-13   | Scheme fee amount (Dynamic + Static) with the precision of 6 digits after the decimal point. To get value in cents this value should be divided by 1000000 multiplier. (Example: value 1534568 would be 1.534568 cents)      |
| data / scheme_fee_dynamic                | M  | N    | 1-13   | Dynamic scheme fee amount with the precision of 6 digits after the decimal point. To get value in cents this value should be divided by 1000000 multiplier. (Example: value 1534568 would be 1.534568 cents)                 |
| data / scheme_fee_static                 | M  | N    | 1-13   | Static scheme fee amount with the precision of 6 digits after the decimal point. To get value in cents this value should be divided by 1000000 multiplier. (Example: value 1534568 would be 1.534568 cents)                  |
| data / scheme_fee_direction              | O  | A    | 1      | Available values: C - Credit / D - Debit. Only returned for UNIONPAY scheme and if field is present: "data / scheme_fee".                                                                                                    |
| data / merchant_surcharge_amount         | M  | N    | 1-13   | Merchant surcharge amount in cents                                                                                                                                                                                           |
| data / fraud_date                        | M  | ANS  | 10     | Fraud date `yyyy-mm-dd` format                                                                                                                                                                                               |
| data / date_updated                      | M  | AN   | 19     | Date updated in `yyyy-mm-dd hh:ii:ss` format                                                                                                                                                                                 |
| data / date_updated_microtime            | M  | N    | 16     | Settlement updated date microtime                                                                                                                                                                                            |
| data / settlement_file_id                | O  | AN   | 25     | Settlement file id. **Note:** Returned only if settlement has settlement file id.                                                                                                                                            |
| data / clearing_file_id                  | O  | AN   | 25     | Clearing file id. **Note:** Returned only if settlement has clearing file id.                                                                                                                                                |
| data / raw_product_type                  | O  | ANS  | 1-255  | Raw values for product type, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could bet provided. **Note:** Returned only if card information processing was successful |
| data / product_type                      | O  | ANS  | 1-30   | [`Card Product Types`](#appendix--enum--card-product-types) **Note:** Returned only if card information processing was successful                                                                                            |
| data / raw_product_level                 | O  | AN   | 1-255  | Raw values for product level, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could be provided. **Note:** Returned only if card information processing was successful |
| data / product_level                     | O  | ANS  | 1-30   | [`Card Product Levels`](#appendix--enum--card-product-levels) **Note:** Returned only if card information processing was successful                                                                                          |
| data / offline_refund_indicator          | O  | N    | 1      | Indicator for offline refund transaction. Only returned for offline refunds and Mastercard scheme.                                                                                                                           |

```json
{
    "request_id": "15601563704151",
    "merchant_var_1": "test1",
    "merchant_var_2": "test2",
    "merchant_var_3": "test3",
    "merchant_var_4": "test4",
    "status": "success",
    "status_code": "000",
    "api_version": "1.0",
    "type": "settlements_list",
    "total_records": "4",
    "data": [
        {
            "id": "15597413980694",
            "tx_id": "000000200018000003220214091905",
            "amount": "9186",
            "amount_direction": "C",
            "currency": "978",
            "masked_pan": "5116***********0007",
            "accounts_id": null,
            "card_country": "826",
            "card_type": "Credit",
            "bin": "2018-08-17",
            "region": "Domestic",
            "transaction_arn": "75116779184000000000059",
            "trace_id": "MCCA000010208",
            "3ds_secure_result": "",
            "recurring": "1",
            "settlement_date": "2018-08-17",
            "settlement_amount_gross": "1000",
            "settlement_amount_gross_direction": "C",
            "settlement_amount_net": "930",
            "settlement_amount_net_direction": "C",
            "settlement_currency": "826",
            "interchange_fee": "70000000",
            "interchange_fee_direction": "D",
            "scheme_fee": "1000",
            "scheme_fee_direction": "D",
            "scheme_fee_dynamic": "30",
            "scheme_fee_static": "970",
            "merchant_surcharge_amount": "50",
            "merchant_surcharge_amount_direction": "C",
            "fraud_date": "2018-08-17",
            "date_updated": "2019-10-11 11:47:41",
            "date_updated_microtime": "1570797414565800",
            "raw_product_type": "01-Credit (Personal)",
            "product_type": "Consumer",
            "raw_product_level": "G-Gold",
            "product_level": "Gold"
        },
        {
            "id": "15597413988231",
            "tx_id": "000000200018000001220214210501",
            "amount": "5544",
            "currency": "978",
            "masked_pan": "5116***********0007",
            "accounts_id": null,
            "card_country": "826",
            "card_type": "Credit",
            "bin": "2018-08-17",
            "region": "Domestic",
            "transaction_arn": "75116779184000000000059",
            "trace_id": "MCCA000010208",
            "3ds_secure_result": "",
            "recurring": "1",
            "settlement_date": "2018-08-17",
            "settlement_amount_gross": "1000",
            "settlement_amount_net": "830",
            "settlement_currency": "826",
            "interchange_fee": "170000000",
            "scheme_fee": "1000",
            "scheme_fee_dynamic": "30",
            "scheme_fee_static": "970",
            "merchant_surcharge_amount": "50",
            "fraud_date": "2018-08-17",
            "date_updated": "2019-08-11 11:47:41",
            "date_updated_microtime": "1570797414565800",
            "raw_product_type": "01-Credit (Personal)",
            "product_type": "Consumer",
            "raw_product_level": "G-Gold",
            "product_level": "Gold"
        },
        {
            "id": "15597416282144",
            "tx_id": "000000200018000002220214210522",
            "amount": "6299",
            "currency": "978",
            "masked_pan": "5116***********0007",
            "accounts_id": "1",
            "card_country": "826",
            "card_type": "Debit",
            "bin": "2018-08-17",
            "region": "Domestic",
            "transaction_arn": "75116779184000000000059",
            "trace_id": "MCCA000010208",
            "3ds_secure_result": "",
            "recurring": "0",
            "settlement_date": "2018-08-17",
            "settlement_amount_gross": "1000",
            "settlement_amount_net": "930",
            "settlement_currency": "826",
            "interchange_fee": "70000000",
            "scheme_fee": "1000",
            "scheme_fee_dynamic": "30",
            "scheme_fee_static": "970",
            "merchant_surcharge_amount": "0000000000050",
            "fraud_date": "2018-08-17",
            "date_updated": "2019-10-11 11:47:41",
            "date_updated_microtime": "1570797414565800",
            "raw_product_type": "02-Debit (Personal)",
            "product_type": "Consumer",
            "raw_product_level": "R-Platinum (Precious)",
            "product_level": "Platinum"
        },
        {
            "id": "15597418803435",
            "tx_id": "000000200018000003220214210534",
            "amount": "800",
            "currency": "978",
            "masked_pan": "5116***********0007",
            "accounts_id": "1",
            "card_country": "004",
            "card_type": "Prepaid",
            "bin": "2018-08-17",
            "region": "Intraregion",
            "transaction_arn": "75116779184000000000059",
            "trace_id": "MCCA000010208",
            "3ds_secure_result": "",
            "recurring": "1",
            "settlement_date": "2018-08-17",
            "settlement_amount_gross": "1000",
            "settlement_amount_net": "930",
            "settlement_currency": "826",
            "interchange_fee": "70000000",
            "scheme_fee": "1000",
            "scheme_fee_dynamic": "30",
            "scheme_fee_static": "970",
            "merchant_surcharge_amount": "50",
            "fraud_date": "2018-08-17",
            "date_updated": "2019-10-11 11:47:41",
            "date_updated_microtime": "1570797414565800",
            "raw_product_type": "03-Prepaid (Personal)",
            "product_type": "Consumer",
            "raw_product_level": "R-Platinum (Precious)",
            "product_level": "Platinum"
        }
    ],
     "has_more_records": "Y"
}
```

# Changelog

| Version | Date               | Updates                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|:--------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.5.2   | August 22, 2022    | <!-- del --> Updated `transaction_data / transaction_purpose` description from `Transaction purpose details` to `Purpose details for Mastercard MoneySend transactions ` and added possible [`Transaction purposes`](#appendix--enum--transaction-purpose)                                                                                                                                                                                      |
| 1.5.1   | July 21, 2022      | <!-- nl --> Added new fields: `date_updated` and `system_due_date` to the response of [`Chargeback list`](#actions--chargebackslist--response).                                                                                                                                                                                                                                                                                                 |
| 1.5.0   | July 19, 2022      | <!-- tb --> Added new fields `account_type_from`, `account_type_to`, `reservation_duration` for methods `authorize` and `sale`.                                                                                                                                                                                                                                                                                                                 |
| 1.4.28  | May 31, 2022       | <!-- ts --> Added new field `callbackUrl` to `authenticate` call and new section for notifications documentation. Callback section renamed to `Authentication status`.                                                                                                                                                                                                                                                                          |
| 1.4.27  | May 31, 2022       | <!-- nl --> Added `settlement_file_id` field to the response of [`Chargeback list`](#actions--chargebackslist--response).                                                                                                                                                                                                                                                                                                                       |
| 1.4.26  | April 19, 2022     | <!-- nl --> Changed `Incorrect acquiring routes configuration.` to `Processable currency is not active.` in [`Response Code`](#appendix--enum--response-codes).                                                                                                                                                                                                                                                                                 |
| 1.4.25  | April 14, 2022     | <!-- nl --> Added `payment_transaction_type_indicator` optional field to the request of [`Sale`](#actions--sale--request).                                                                                                                                                                                                                                                                                                                      |
| 1.4.24  | February 29, 2022  | <!-- tj --> Added optional parameter `reversal_reason_code` to [`Reverse`](#actions--reverse--request).                                                                                                                                                                                                                                                                                                                                         |
| 1.4.23  | February 28, 2022  | <!-- ts --> Added `force_offline_only` optional field to the request of [`Refund`](#actions--refund--request) and `offline_refund_indicator` optional field to the response of [`SettlementsList`](#actions--settlementslist--response).                                                                                                                                                                                                        |
| 1.4.22  | February 23, 2022  | <!-- tj --> Updated [`Response Codes`](#appendix--enum--response-codes) and added new column `Action`.                                                                                                                                                                                                                                                                                                                                          |
| 1.4.21  | February 22, 2022  | <!-- ts --> Added new `confirm_installment` call.                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.20  | February 17, 2021  | <!-- dv --> Added `scheme_fee_dynamic` and `scheme_fee_static` fields to the response of [`SettlementsList`](#actions--settlementslist--response).                                                                                                                                                                                                                                                                                              |
| 1.4.19  | February 9, 2022   | <!-- tb --> Added new response fields: `amount_direction`, `settlement_amount_gross_direction`, `settlement_amount_net_direction`, `merchant_surcharge_amount_direction`, `interchange_fee_direction`, `scheme_fee_direction` for method: `Settlement List`.                                                                                                                                                                                    |
| 1.4.18  | February 7, 2022   | <!-- nl --> Removed unnecessary fields: `merchant_reference`, `response_code`, `transaction_amount` from [`SettlementsList`](#actions--settlementslist--response).                                                                                                                                                                                                                                                                              |
| 1.4.17  | February 7, 2022   | <!-- nl --> Updated length of the field `trace_id` from 16 to 15 in response of [`AuthorizeList`](#actions--authorizeslist--response), [`ChargebackList`](#actions--chargebackslist--response), [`SettlementList`](#actions--settlementslist--response).                                                                                                                                                                                        |
| 1.4.16  | February 7, 2022   | <!-- nl --> Updated [`Reverse`](#actions--reverse--request) `card_number`, `card_token`, `card_expiry_month`, `card_expiry_year` field dependency on condition and optionality.                                                                                                                                                                                                                                                                 |
| 1.4.15  | February 4, 2022   | <!-- nl --> Removed `transaction_descriptor` parameter from [`Capture`](#actions--capture--request) request.                                                                                                                                                                                                                                                                                                                                    | 
| 1.4.14  | January 7, 2022    | <!-- nl --> Updated `card_expiry_year` and `card_expiry_month` for UnionPay scheme to be optional.                                                                                                                                                                                                                                                                                                                                              |
| 1.4.13  | December 7, 2021   | <!-- nl --> New optional fields added: `settlement_file_id`, `clearing_file_id` to the response of [`SettlementsList`](#actions--settlementslist--response).                                                                                                                                                                                                                                                                                    |
| 1.4.12  | December 2, 2021   | <!-- nl --> Updated descriptions for 79, 82, 83 values in [`Response Codes`](#appendix--enum--response-codes)                                                                                                                                                                                                                                                                                                                                   |
| 1.4.11  | November 30, 2021  | <!-- nl --> Removed field `date_expiration` from [`Authorizeslist`](#actions--authorizeslist--response) response.                                                                                                                                                                                                                                                                                                                               |
| 1.4.10  | November 30, 2021  | <!-- nl --> Removed field `raw_card_type` from [`SettlementList`](#actions--settlementslist--response) response.                                                                                                                                                                                                                                                                                                                                |
| 1.4.9   | November 25, 2021  | <!-- nl --> Updated [`sale`](#actions--sale--request) `parent_tx_id`, `is_recurring_payment`, `authorize_type` descriptions. [`authorize`](#actions--authorize--request) `is_recurring_payment` additional condition was set.                                                                                                                                                                                                                   |
| 1.4.8   | November 18, 2021  | <!-- nl --> Changed `billing_address_post_code`, `billing_post_code` and `billing_post_code` maximum length to 9 characters in calls [`authenticate`](#actions--authenticate--request), [`authorize`](#actions--authorize--request) and [`sale`](#actions--sale--request). `billing_post_code` and `billing_post_code` types were changed from `numeric` to `alpha numeric symbol`.                                                             |
| 1.4.7   | October 27, 2021   | <!-- tb --> Added new field: `clearing_file_id` for method: `Second Presentment`.                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.6   | October 26, 2021   | <!-- ts --> Updated [`Credit`](#actions--credit--request) `payment_transaction_type_indicator` field requirement conditions.                                                                                                                                                                                                                                                                                                                    |
| 1.4.5   | October 26, 2021   | <!-- ts --> Added optional `scheme_error_description` field to the financial methods response.                                                                                                                                                                                                                                                                                                                                                  |
| 1.4.4   | October 26, 2021   | <!-- ts --> Added additional values for [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator).                                                                                                                                                                                                                                                                                                                      |
| 1.4.3   | October 25, 2021   | <!-- tj --> Added `settlement_amount` and `settlement_currency` fields to the response of [`ChargebacksList`](#actions--chargebackslist--response).                                                                                                                                                                                                                                                                                             |
| 1.4.2   | October 19, 2021   | <!-- tb --> Added response fields: `settlement_amount`, `settlement_currency` for methods: `Authorize`, `Sale`, `Credit`, `P2P`, `Refund`, `Reverse`, `Cash Disbursement`, `Actual Authorize List`.                                                                                                                                                                                                                                             |
| 1.4.1   | October 6, 2021    | <!-- nl --> Added `trace_id` field to the response of [`SettlementsList`](#actions--settlementslist--response).                                                                                                                                                                                                                                                                                                                                 |
| 1.4.0   | September 27, 2021 | <!-- tb --> Added new field: `digital_wallet_identifier` for methods: `Authorize, Sale, Credit, P2P Transaction`.                                                                                                                                                                                                                                                                                                                               |
| 1.3.9   | June 16, 2021      | <!-- dv --> Renamed [`Funding source`](#appendix--enum--funding-source) item message                                                                                                                                                                                                                                                                                                                                                            |
| 1.3.8   | August 27, 2021    | <!-- ts --> Updated `authorize` and `sale` responses with *optional* response field `installments_plans`.                                                                                                                                                                                                                                                                                                                                       |
| 1.3.7   | August 27, 2021    | <!-- dv --> Updated `account_number_type`, `account_number` and `funding_source` requirement to *optional* and description for [`Credit Request`](#actions--credit--request) and [`P2P transaction Request`](#actions--p2ptransaction--request).                                                                                                                                                                                                |
| 1.3.6   | June 11, 2021      | <!-- dv --> Updated `account_number` length and added `account_number_type` for methods `credit`, `p2p_transaction`.                                                                                                                                                                                                                                                                                                                            |
| 1.3.5   | June 8, 2021       | <!-- nl --> Removed `card_security_code` field from [`Authenticate`](#acqtions--authenticate-request).                                                                                                                                                                                                                                                                                                                                          |
| 1.3.4   | June 07, 2021      | <!-- dv --> Marked deprecated by Mastercard [`Payment transaction type`](#appendix--enum--payment-transaction-type-indicator) values                                                                                                                                                                                                                                                                                                            |
| 1.3.3   | June 03, 2021      | <!-- ts --> Added `parent_tx_id` to [`CancelRecurring`](#actions--cancelrecurring--request).                                                                                                                                                                                                                                                                                                                                                    |
| 1.3.2   | June 01, 2021      | <!-- nl --> [`P2P transaction`](#actions--p2ptransaction--request) parameter requirements changed: `receiver_data/country` to optional, `sender_Data/country` to conditional, `sender_data/account_number` and `transaction_data/funding_source` fields to mandatory.                                                                                                                                                                           |
| 1.3.1   | May 12, 2021       | <!-- tb --> Updated `parent_tx_id` usage for method `Reverse` - Initial (pre-authorization) tx_id should be provided, when reversing incremental authorizations.                                                                                                                                                                                                                                                                                |
| 1.3.0   | April 30, 2021     | <!-- tb --> Added new fields `mit_parent_tx_id`, `mit_message_reason_code` for MIT (Merchant initiated transactions). Removed MIT compatibility for methods `credit`, `p2p_transaction`.                                                                                                                                                                                                                                                        |
| 1.2.3   | April 27, 2021     | <!-- nl --> Changed `merchant_reference` [`Authorize`](#actions--authenticate--request) request type to ANS and updated all `merchant_reference` response type from AN to ANS.                                                                                                                                                                                                                                                                  |
| 1.2.2   | April 22, 2021     | <!-- ts --> Removed `transaction_descriptor` field from `cancel` call.                                                                                                                                                                                                                                                                                                                                                                          |
| 1.2.1   | April 15, 2021     | <!-- ts --> Updated `authorize`, `p2p_transaction`, `sale` with additional field `3ds_eci` when external MPI is used.                                                                                                                                                                                                                                                                                                                           |
| 1.2.0   | March 19, 2021     | <!-- tb --> Removed `purge` action.                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.1.33  | March 18, 2021     | <!-- dv --> Added new optional field `3ds_verification_result_code` to [`Authorize`](#actions--authorize) [`Response`](#actions--authorize--response). Added [`3DS verification result code`](#appendix--enum--3ds-verification-result-code) to the [`Enum`](#appendix--enum) section                                                                                                                                                           |
| 1.1.32  | February 25, 2021  | <!-- dv --> Changed `balance_inquiry` request `local_date`, `local_time`, `track_2_data` and `remote_program_type` requirements. Added successful `balance_inquiry` response example. [`Cardholder "From account" type`](#appendix--enum--cardholder-from-account-type)                                                                                                                                                                         |
| 1.1.31  | February 25, 2021  | <!-- ts --> Updated `authorize`, `p2p_transaction`, `sale` with additional field `3ds_version`, `3ds_authentication_status`, `3ds_ds_tx_id`, `external_mpi` when external MPI is configurated. Removed 3ds fields from `credit` call.                                                                                                                                                                                                           |
| 1.1.30  | February 23, 2021  | <!-- dv --> Removed `expiration_date` field from `sale` response.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.1.29  | February 25, 2021  | <!-- dv --> Changed `balance_inquiry` request `local_date`, `local_time`, `track_2_data` and `remote_program_type` requirements. Added successful `balance_inquiry` response example. [`Cardholder "From account" type`](#appendix--enum--cardholder-from-account-type)                                                                                                                                                                         |
| 1.1.28  | February 25, 2021  | <!-- ts --> Updated `authorize`, `p2p_transaction`, `sale` with additional fields `3ds_version`, `3ds_authentication_status`, `3ds_ds_tx_id`, `external_mpi` when external MPI is configurated. Removed 3ds fields from `credit` call.                                                                                                                                                                                                          |
| 1.1.27  | February 23, 2021  | <!-- nl --> Updated [`Response type`](#appendix--enum--response-type) table. Added `actual_authorizes_list`, `capture`, `request_cards_update`, `p2p_transaction`, `purge`, `retrieve_cards_update` and `ping` values                                                                                                                                                                                                                           |
| 1.1.26  | February 23, 2021  | <!-- dv --> Removed `expiration_date` field from `sale` response.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.1.25  | February 19, 2021  | <!-- nl --> Updated [`Security`](#appendix--security--cryptography) encryption/decryption examples and descriptions.                                                                                                                                                                                                                                                                                                                            |
| 1.1.24  | January 26, 2021   | <!-- nl --> Added new section: [`Callback`](#actions--authenticate--callback) to [`Authenticate`](#actions--authenticate) action. Added [`Available ECI values`](#appendix--enum--eci), [`Available status codes`](#appendix--enum--provider-status-code), [`Available statuses`](#appendix--enum--veres-enrollment-status), [`Available statuses`](#appendix--enum--pares-transaction-status) tables to the  [`Enum`](#appendix--enum) section |
| 1.1.23  | December 08, 2020  | <!-- ts --> Updated `authorizes_list` response field `trace_id` description.                                                                                                                                                                                                                                                                                                                                                                    |
| 1.1.22  | December 02, 2020  | <!-- ts --> Updated `capture` response description with new field `tx_id`.                                                                                                                                                                                                                                                                                                                                                                      |
| 1.1.21  | November 30, 2020  | <!-- tb --> Added new fields `is_terminal_call`, `scheme_id` to `authorizes_list` response.                                                                                                                                                                                                                                                                                                                                                     |
| 1.1.20  | October 02, 2020   | <!-- rik --> Updated `bins_list` response description with new field `issuer_name`.                                                                                                                                                                                                                                                                                                                                                             |
| 1.1.19  | October 07, 2020   | <!-- tb --> Added field `card_security_code_result` on `authorize`, `sale`, `credit`, `p2p_transaction` response.                                                                                                                                                                                                                                                                                                                               |
| 1.1.18  | September 08, 2020 | <!-- ts --> Added `merchant_fraud_rate`, `acquirer_country_code`, `secure_corporate_payment_exemption` to authenticate call.                                                                                                                                                                                                                                                                                                                    |
| 1.1.17  | September 03, 2020 | <!-- rik --> Added request parameter `is_mit` to: Authorize [`Request`](#actions--authorize--request), Credit [`Request`](#actions--credit--request), P2P transaction [`Request`](#actions--p2ptransaction--request) and Sale [`Request`](#actions--sale--request).                                                                                                                                                                             |
| 1.1.16  | August 27, 2020    | <!-- tb --> Added field `transaction_currency` to P2P transaction response.                                                                                                                                                                                                                                                                                                                                                                     |
| 1.1.15  | August 12, 2020    | <!-- rik --> updating $rb value calculation in [`Cryptography`](#appendix--security--cryptography) encryptRequest example.                                                                                                                                                                                                                                                                                                                      |
| 1.1.14  | August 12, 2020    | <!-- rik --> Updated [`Request`](#actions--p2ptransaction--request) field descriptions of `method`, `account_number`, `identification_expiration_date`, `language_identification`, `middle_name`.                                                                                                                                                                                                                                               |
| 1.1.13  | August 04, 2020    | <!-- rik --> Updated [`Response`](#actions--chargebackslist--response) field descriptions of `data / message` and `data / auth_code`.                                                                                                                                                                                                                                                                                                           |
| 1.1.12  | August 04, 2020    | <!-- rik --> Added private key format requirement to [`Cryptography`](#appendix--security--cryptography) example.                                                                                                                                                                                                                                                                                                                               |
| 1.1.11  | July 22, 2020      | <!-- rik --> Added request parameters `merchant_reference` and `rrn` to `actual_authorizes_list` request.                                                                                                                                                                                                                                                                                                                                       |
| 1.1.10  | June 11, 2020      | <!-- ts --> Removed `page` field from `settlements_list` request.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.1.9   | June 05, 2020      | <!-- rik --> Updated `bins_list` response description with new field `is_deleted`.                                                                                                                                                                                                                                                                                                                                                              |
| 1.1.8   | June 02, 2020      | <!-- ts --> Added `already_sent` flag to `create_sp` method.                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.1.7   | May 29, 2020       | <!-- tb --> Added new field `tx_id` to `authorizes_list` request.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.1.6   | May 21, 2020       | <!-- rk --> Updated `request_cards_update` notification description. Corrected parameter name from update_id to update_batch_id.                                                                                                                                                                                                                                                                                                                |
| 1.1.5   | May 21, 2020       | <!-- ts --> Added new `actual_authorizes_list` method.                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.1.4   | May 08, 2020       | <!-- rik --> Updated `request_cards_update` notification description with new `request_ids` field. Updated `retrieve_cards_update` response description with new `updated_card_token` field.                                                                                                                                                                                                                                                    |
| 1.1.3   | April 15, 2020     | <!-- ts --> Updated `bins_list` and `settlements_list` response descriptions with `raw_card_type`, `raw_product_type`, `raw_product_level`, `product_type`, `product_level` fields.                                                                                                                                                                                                                                                             |
| 1.1.2   | April 14, 2020     | <!-- mla --> Removed `merchant_reference`, `response_code`, `transaction_amount` fields from `cancel_recurring_payment` response. <br> Removed `data / independent_sales_organization_id` field from `cancel_recurring_payment` request.                                                                                                                                                                                                        |
| 1.1.1   | April 07, 2020     | <!-- tb --> Added `merchant_advice_code` field to `authorize` and `sale` response.                                                                                                                                                                                                                                                                                                                                                              |
| 1.1.0   | April 07, 2020     | <!-- ts --> Added `transaction_descriptor` field to `authenticate` request.                                                                                                                                                                                                                                                                                                                                                                     |
| 1.0.0   | March 24, 2020     | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->                                                                                                                                                                                                                                                                                                                        |

# Appendix

## Enum

### Account number type

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

### Actual authorize states

| Actual authorize states |
|:------------------------|
| started                 |
| preauthorized           |
| incremented             |
| finalized               |
| normal                  |
| captured                |
| terminated              |
| ready_for_sending       |
| sent_to_clearing        |
| clearing_rejected       |
| ready_for_clearing      |
| cleared                 |

### Actual authorize procedures

| Actual authorize states |
|:------------------------|
| authorize               |
| capture                 |
| sale                    |
| credit                  |
| refund                  |
| advice                  |
| balance_inquiry         |
| p2p_transaction         |
| p2p_funding             |
| p2p_credit              |

### Address verification code

| Code | Message                                                                                                                                          | Scheme        |
|:-----|:-------------------------------------------------------------------------------------------------------------------------------------------------|:--------------|
| A    | Address matches, postal/zip code does not.                                                                                                       | Visa, JCB, MC |
| B    | Street address match. Postal code not verified because of incompatible formats. (Acquirer sent both street address and postal code.)             | Visa, MC      |
| C    | Street address and postal code not verified because of incompatible formats. (Acquirer sent both street address and postal code.)                | Visa, MC      |
| D    | Street address and postal code match.                                                                                                            | Visa, MC      |
| F    | Street address and postal code match. For Visa and Mastercard applies to U.K. only.                                                              | Visa, JCB, MC |
| G    | Non-AVS participant outside the U.S.; address not verified for international transaction.                                                        | Visa, MC      |
| I    | Address information not verified for international transaction.                                                                                  | Visa, MC      |
| M    | Street addresses and postal code match.                                                                                                          | Visa, MC      |
| N    | Neither address nor postal/zip code matches.                                                                                                     | Visa, JCB, MC |
| P    | Postal codes match. Street address not verified because of incompatible formats. (Acquirer sent both street address and postal code.)            | Visa, MC      |
| R    | Retry, system unable to process.                                                                                                                 | Visa, MC      |
| S    | AVS currently not supported. U.S. issuers will not be able to send through this response code.                                                   | Visa, MC      |
| U    | Technical or logical error. No data from issuer/Authorization Platform. For JCB AVS cannot be applied on card or address. (not UK or US issuer.) | Visa, JCB, MC |
| W    | For U.S. addresses, nine-digit postal code matches, address does not; for address outside the U.S., postal code matches, address does not.       | Visa, MC      |
| X    | For U.S. addresses, nine-digit postal code and address matches; for addresses outside the U.S., postal code and address match.                   | Visa, MC      |
| Y    | For U.S. addresses, five-digit postal code and address matches.                                                                                  | Visa, MC      |
| Z    | Five-digit postal\zip code matches, address does not. For Visa and Mastercard applies to U.S. addresses.                                         | Visa, JCB, MC |

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

### Authentication method

| Method   | Description                                                                                 |
|:---------|:--------------------------------------------------------------------------------------------|
| init_otp | One Time Password is initiated, merchant should pass OTP value entered by card holder.      |
| init_s3d | 3-D Secure authentication is used, required parameters returned to continue authentication. |

### Authorize type

| Authorize Type | Description               |
|:---------------|:--------------------------|
| pre            | Pre authorization         |
| inc            | Incremental authorization |
| final          | Final authorization       |
| normal         | Normal authorization      |

### Card brand

| Brand      |
|:-----------|
| Visa       |
| Mastercard |
| UnionPay   |
| JCB        |

### Cardholder account age values

| Value | Description                     | Versions |
|:------|:--------------------------------|:---------|
| 01    | No account (guest check-out)    | >= 2.1.0 |
| 02    | Created during this transaction | >= 2.1.0 |
| 03    | Less than 30 days               | >= 2.1.0 |
| 04    | 30−60 days                      | >= 2.1.0 |
| 05    | More than 60 days               | >= 2.1.0 |

### Cardholder account change values

| Value | Description                     | Versions |
|:------|:--------------------------------|:---------|
| 01    | Changed during this transaction | >= 2.1.0 |
| 02    | Less than 30 days               | >= 2.1.0 |
| 03    | 30−60 days                      | >= 2.1.0 |
| 04    | More than 60 days               | >= 2.1.0 |

### Cardholder account password change values

| Value | Description                     | Versions |
|:------|:--------------------------------|:---------|
| 01    | No change                       | >= 2.1.0 |
| 02    | Changed during this transaction | >= 2.1.0 |
| 03    | Less than 30 days               | >= 2.1.0 |
| 04    | 30−60 days                      | >= 2.1.0 |
| 05    | More than 60 days               | >= 2.1.0 |

### Cardholder account type values

| Value | Description    | Versions |
|:------|:---------------|:---------|
| 01    | Not Applicable | >= 2.1.0 |
| 02    | Credit         | >= 2.1.0 |
| 03    | Debit          | >= 2.1.0 |

### Cardholder "From account" type

| Value | Description                                       |
|:------|:--------------------------------------------------|
| 00    | Default Account (not specified or not applicable) |
| 10    | Savings Account                                   |
| 20    | Checking Account                                  |
| 30    | Credit Card Account                               |
| 38    | Credit Line Account                               |
| 39    | Corporate                                         |
| 40    | Universal Account (Customer ID number)            |
| 50    | Money Market Investment Account                   |
| 60    | Stored Value Account                              |
| 90    | Revolving Loan Account                            |

### Card types

| Value   | Description             |
|:--------|:------------------------|
| Credit  | Credit card             |
| Debit   | Debit card              |
| Prepaid | Prepaid card            |
| Unknown | Could not map the value |

### Card product types

| Value     | Description             |
|:----------|:------------------------|
| Corporate | Corporate card          |
| Consumer  | Consumer card           |
| Unknown   | Could not map the value |

### Card product levels

| Value    | Description             |
|:---------|:------------------------|
| Classic  | Classic card            |
| Gold     | Gold card               |
| Diamond  | Diamond card            |
| Platinum | Platinum card           |
| Unknown  | Could not map the value |

### Challenge cancel available values

| Value | Description                                                   |
|:------|:--------------------------------------------------------------|
| 01    | Cardholder selected “Cancel”                                  |
| 03    | Transaction timed out — decoupled authentication              |
| 04    | Transaction timed out at ACS — other timeouts                 |
| 05    | Transaction timed out at ACS — first CReq not received by ACS |
| 06    | Transaction error                                             |
| 07    | Unknown                                                       |
| 08    | Transaction timed out at SDK                                  |

### Delivery timeframe values

| Value | Description              | Versions |
|:------|:-------------------------|:---------|
| 01    | Electronic Delivery      | >= 2.1.0 |
| 02    | Same day shipping        | >= 2.1.0 |
| 03    | Overnight shipping       | >= 2.1.0 |
| 04    | Two-day or more shipping | >= 2.1.0 |

### Device channel values

| Value | Description                   | Versions |
|:------|:------------------------------|:---------|
| 01    | App-based (APP)               | >= 2.1.0 |
| 02    | Browser (BRW)                 | >= 2.1.0 |
| 03    | 3DS Requestor Initiated (3RI) | >= 2.1.0 |

### ECI

| Status   | Description                                                                                             |
|:---------|:--------------------------------------------------------------------------------------------------------|
| 02 or 05 | Fully authenticated transaction.                                                                        |
| 01 or 06 | Attempted authentication transaction.                                                                   |
| 00 or 07 | Non 3-D secure transaction.                                                                             |
| 10       | Used for customer not present authorizations when authentication was not used. UnionPay specific value. |

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

### Identification type

| Code  | Description                  |
|:------|:-----------------------------|
| 00    | Passport                     |
| 01    | National Identification Card |
| 02    | Driver’s License             |
| 03    | Government Issued            |
| 04    | Other                        |
| 05–10 | Reserved                     |

### Merchant advice code

| Value | Description                                          |
|:------|:-----------------------------------------------------|
| 01    | New Account Information Available                    |
| 02    | Try Again Later                                      |
| 03    | Do Not Try Again                                     |
| 04    | Token requirements not fulfilled for this token type |
| 21    | Payment Cancellation                                 |

### Merchant Fraud Rate

| Value | Description                   | Versions |
|:------|:------------------------------|:---------|
| 1     | fraud level <=1 bps           | >= 2.1.0 |
| 2     | fraud level >1 and <= 6 bps   | >= 2.1.0 |
| 3     | fraud level >6 and <= 13 bps  | >= 2.1.0 |
| 4     | fraud level >13 and >= 25 bps | >= 2.1.0 |
| 5     | fraud level >25 bps           | >= 2.1.0 |

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

### Pan entry mode

| PAN      | Description                             |
|:---------|-----------------------------------------|
| M        | Manual                                  |
| AG       | Via auto magnetic stripe                |
| AC       | Via auto chip                           |
| MC       | Contactless M chip                      |
| EEC_DSRP | Via electronic commerce containing DSRP |
| C        | Credential on file                      |
| OC       | Online connection failed chip           |
| FC       | Failed processing chip data             |
| E        | Ecommerce                               |
| SR       | Via server                              |
| G        | Via magnetic stripe                     |
| CG       | Via contactless magnetic stripe         |

### Payment account age values

| Value | Description                     | Versions |
|:------|:--------------------------------|:---------|
| 01    | No account (guest check-out)    | >= 2.1.0 |
| 02    | Created during this transaction | >= 2.1.0 |
| 03    | Less than 30 days               | >= 2.1.0 |
| 04    | 30−60 days                      | >= 2.1.0 |
| 05    | More than 60 days               | >= 2.1.0 |

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

### Procedure

| Type            |
|:----------------|
| pre             |
| inc             |
| final           |
| authorize       |
| credit          |
| sale            |
| refund          |
| reverse         |
| p2p_transaction |

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
| 79             | Decline               | Life cycle (Mastercard use only)	                                                                                                            |
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

### Response type

| Type                     |
|:-------------------------|
| actual_authorizes_list   |
| authenticate             |
| authorize                |
| authorizes_list          |
| balance_inquiry          |
| bins_list                |
| cancel_recurring_payment |
| capture                  |
| chargebacks_list         |
| create_sp                |
| credit                   |
| ping                     |
| p2p_transaction          |
| refund                   |
| reverse                  |
| request_cards_update     |
| retrieve_cards_update    |
| sale                     |
| settlements_list         |

### Retrieve cards update outcome

| Update outcome         |
|:-----------------------|
| no_change              |
| card_number_change     |
| expiry_date_change     |
| no_change              |
| contact_account_holder |
| no_match               |
| non_participating_bin  |
| unknown_card_scheme    |
| unknown                |

### Requestor authentication method values

| Value | Description                                                                                                       | Versions |
|:------|:------------------------------------------------------------------------------------------------------------------|:---------|
| 01    | No 3DS Requestor authentication occurred (i.e. cardholder “logged in” as guest)                                   | >= 2.1.0 |
| 02    | Login to the cardholder account at the 3DS Requestor system using 3DS Requestor’s own credentials                 | >= 2.1.0 |
| 03    | Login to the cardholder account at the 3DS Requestor system using federated ID                                    | >= 2.1.0 |
| 04    | Login to the cardholder account at the 3DS Requestor system using issuer credentials                              | >= 2.1.0 |
| 05    | Login to the cardholder account at the 3DS Requestor system using third-party authentication                      | >= 2.1.0 |
| 06    | Login to the cardholder account at the 3DS Requestor system using FIDO Authenticator                              | >= 2.1.0 |
| 07    | Login to the cardholder account at the 3DS Requestor system using FIDO Authenticator (FIDO assurance data signed) | >= 2.2.0 |
| 08    | SRC Assurance Data                                                                                                | >= 2.2.0 |


### Requestor authentication indicator values

| Value | Description                                       | Versions |
|:------|:--------------------------------------------------|:---------|
| 01    | Payment transaction                               | >= 2.1.0 |
| 02    | Recurring transaction                             | >= 2.1.0 |
| 03    | Instalment transaction                            | >= 2.1.0 |
| 04    | Add card                                          | >= 2.1.0 |
| 05    | Maintain card                                     | >= 2.1.0 |
| 06    | Cardholder verification as part of EMV token ID&V | >= 2.1.0 |

### Requestor challenge indicator values

| Value | Description                                                                   | Versions |
|:------|:------------------------------------------------------------------------------|:---------|
| 01    | No preference                                                                 | >= 2.1.0 |
| 02    | No challenge requested                                                        | >= 2.1.0 |
| 03    | Challenge requested (3DS Requestor preference)                                | >= 2.1.0 |
| 04    | Challenge requested (Mandate)                                                 | >= 2.1.0 |
| 05    | No challenge requested (transactional risk analysis is already performed)     | >= 2.2.0 |
| 06    | No challenge requested (Data share only)                                      | >= 2.2.0 |
| 07    | No challenge requested (strong consumer authentication is already performed)  | >= 2.2.0 |
| 08    | No challenge requested (utilize whitelist exemption if no challenge required) | >= 2.2.0 |
| 09    | Challenge requested (whitelist prompt requested if challenge required)        | >= 2.2.0 |

### Requestor initiated indicator values

| Value | Description               | Versions |
|:------|:--------------------------|:---------|
| 01    | Recurring transaction     | >= 2.1.0 |
| 02    | Instalment transaction    | >= 2.1.0 |
| 03    | Add card                  | >= 2.1.0 |
| 04    | Maintain card information | >= 2.1.0 |
| 05    | Account verification      | >= 2.1.0 |
| 06    | Split/delayed shipment    | >= 2.2.0 |
| 07    | Top-up                    | >= 2.2.0 |
| 08    | Mail Order                | >= 2.2.0 |
| 09    | Telephone Order           | >= 2.2.0 |
| 10    | Whitelist status check    | >= 2.2.0 |
| 11    | Other payment             | >= 2.2.0 |

### Requestor prior authentication method values

| Value | Description                                 | Versions |
|:------|:--------------------------------------------|:---------|
| 01    | Frictionless authentication occurred by ACS | >= 2.1.0 |
| 02    | Cardholder challenge occurred by ACS        | >= 2.1.0 |
| 03    | AVS verified                                | >= 2.1.0 |
| 04    | Other issuer methods                        | >= 2.1.0 |

### SDK interface values

| Value | Description | Versions |
|:------|:------------|:---------|
| 01    | Native      | >= 2.1.0 |
| 02    | HTML        | >= 2.1.0 |
| 03    | Both        | >= 2.1.0 |

### SDK UI type values

| Value | Description   | Versions |
|:------|:--------------|:---------|
| 01    | Text          | >= 2.1.0 |
| 02    | Single select | >= 2.1.0 |
| 03    | Multi select  | >= 2.1.0 |
| 04    | OOB           | >= 2.1.0 |
| 05    | HTML other    | >= 2.1.0 |

### Shipping address change values

| Value | Description       | Versions |
|:------|:------------------|:---------|
| 01    | This transaction  | >= 2.1.0 |
| 02    | Less than 30 days | >= 2.1.0 |
| 03    | 30−60 days        | >= 2.1.0 |
| 04    | More than 60 days | >= 2.1.0 |

### Shipping indicator values

| Value | Description                                                                                           | Versions |
|:------|:------------------------------------------------------------------------------------------------------|:---------|
| 01    | Ship to cardholder’s billing address                                                                  | >= 2.1.0 |
| 02    | Ship to another verified address on file with merchant                                                | >= 2.1.0 |
| 03    | Ship to address that is different than the cardholder’s billing address                               | >= 2.1.0 |
| 04    | “Ship to Store” / Pick-up at local store (Store address shall be populated in shipping address fields | >= 2.1.0 |
| 05    | Digital goods (includes online services, electronic gift cards and redemption codes)                  | >= 2.1.0 |
| 06    | Travel and Event tickets, not shipped                                                                 | >= 2.1.0 |
| 07    | Other (for example, Gaming, digital services not shipped, emedia subscriptions, etc.)                 | >= 2.1.0 |

### Shipping name values

| Value | Description                               | Versions |
|:------|:------------------------------------------|:---------|
| 01    | Account Name identical to shipping Name   | >= 2.1.0 |
| 02    | Account Name different than shipping Name | >= 2.1.0 |

### Source of funds

| Code | Description |
|:-----|:------------|
| CH   | Cash        |
| CK   | Check       |
| CD   | Card        |

### Suspicious account activity values

| Value | Description                              | Versions |
|:------|:-----------------------------------------|:---------|
| 01    | No suspicious activity has been observed | >= 2.1.0 |
| 02    | Suspicious activity has been observed    | >= 2.1.0 |

### S3D status

| Status | Description   |
|:-------|:--------------|
| 0      | Unknown       |
| 1      | Not enrolled  |
| 2      | Attempt       |
| 3      | Authenticated |

### Status

| Status  |
|:--------|
| success |
| error   |

### Status code

| Status Code | Description                                                                                               |
|:------------|:----------------------------------------------------------------------------------------------------------|
| 000         | Success                                                                                                   |
| 001         | Invalid credentials.                                                                                      |
| 002         | Invalid message type.                                                                                     |
| 003         | Unknown field submitted: __FIELD__.                                                                       |
| 004         | Invalid data: missing required field: __FIELD__.                                                          |
| 005         | Invalid transaction type.                                                                                 |
| 006         | Card holder billing address data is required when performing AVS check.                                   |
| 007         | Card PIN is required for online PIN verification.                                                         |
| 008         | Invalid method.                                                                                           |
| 009         | Transaction not found. Please send initial authorize transaction id.                                      |
| 010         | Amount to be captured is greater than authorized amount.                                                  |
| 011         | Terminal is not supporting partial approvals.                                                             |
| 012         | Capture amount must be greater than zero.                                                                 |
| 013         | Authorize is in state which could not be captured.                                                        |
| 014         | Credit type indicator is required.                                                                        |
| 015         | Wrong authorize type given.                                                                               |
| 016         | Method is not allowed.                                                                                    |
| 017         | Merchant category code is not enabled.                                                                    |
| 018         | Not all payment facilitator data is submitted.                                                            |
| 019         | Not all sub merchant data is submitted.                                                                   |
| 020         | Sub merchant country must be three-character alphabetic Country Code.                                     |
| 021         | Sub merchant must be two-character alphabetic State Code.                                                 |
| 022         | Local transaction time and date is required.                                                              |
| 023         | Amount is required.                                                                                       |
| 024         | Length of transaction descriptor is exceeded.                                                             |
| 025         | Unknown method.                                                                                           |
| 026         | Decryption failed.                                                                                        |
| 027         | Wrong parent transaction message type.                                                                    |
| 028         | Can not refund transaction which do not have captured or cleared state.                                   |
| 029         | Refund amount must be greater than zero.                                                                  |
| 030         | Amount to be refunded is greater than captured amount.                                                    |
| 031         | Wrong message type for refund.                                                                            |
| 032         | Can not capture because of bad response code on authorize.                                                |
| 033         | Can not refund because transaction is already refunded.                                                   |
| 034         | Card is being processed.                                                                                  |
| 035         | Authorize is already cancelled.                                                                           |
| 036         | Authorize expired.                                                                                        |
| 037         | Can not reverse captured transaction.                                                                     |
| 038         | Reverse amount must be greater than zero.                                                                 |
| 039         | Wrong message type for reverse.                                                                           |
| 040         | Amount for balance inquiry must be zero.                                                                  |
| 041         | Wrong PAN entry mode.                                                                                     |
| 042         | Wrong remote payments program.                                                                            |
| 043         | Parent transaction ID is not required.                                                                    |
| 044         | End date is greater than start date.                                                                      |
| 045         | Invalid value for field unique_transaction_reference                                                      |
| 046         | Invalid value for field additional_message                                                                |
| 047         | Invalid value for field funding_source                                                                    |
| 048         | Invalid value for field participation_id                                                                  |
| 049         | Invalid value for field transaction_purpose                                                               |
| 050         | Invalid value for field language_identification                                                           |
| 051         | Invalid value for field language_data                                                                     |
| 052         | Invalid value for field first_name                                                                        |
| 053         | Invalid value for field middle_name                                                                       |
| 054         | Invalid value for field last_name                                                                         |
| 055         | Invalid value for field street_address                                                                    |
| 056         | Invalid value for field city                                                                              |
| 057         | Invalid value for field state_code                                                                        |
| 058         | Invalid value for field country                                                                           |
| 059         | Invalid value for field postal_code                                                                       |
| 060         | Invalid value for field phone_number                                                                      |
| 061         | Invalid value for field date_of_birth                                                                     |
| 062         | Invalid value for field account_number                                                                    |
| 063         | Invalid value for field identification_type                                                               |
| 064         | Invalid value for field identification_number                                                             |
| 065         | Invalid value for field identification_country_code                                                       |
| 066         | Invalid value for field identification_expiration_date                                                    |
| 067         | Invalid value for field nationality                                                                       |
| 068         | Invalid value for field country_of_birth                                                                  |
| 069         | Card processing is forbidden                                                                              |
| 070         | Recurring payment is not allowed                                                                          |
| 071         | Time gap between recurring payment requests is too low                                                    |
| 072         | Invalid value for field p2p_transaction_reference_data                                                    |
| 073         | Transaction amount must be greater then zero                                                              |
| 074         | Sale Point account not found                                                                              |
| 075         | Limit validation failed                                                                                   |
| 076         | Merchant is not active                                                                                    |
| 077         | Terminal is not active                                                                                    |
| 078         | Sale point is not active                                                                                  |
| 079         | Reverse amount must be equal to authorize amount.                                                         |
| 080         | Reverse amount must be less or equal to authorize amount.                                                 |
| 081         | Reverse operation is allowed only for last transaction.                                                   |
| 082         | Reverse period has expired.                                                                               |
| 083         | Reverse authorize is not valid.                                                                           |
| 084         | Only last transaction can be reversed.                                                                    |
| 085         | Transaction has been already reversed.                                                                    |
| 086         | Recurring payment not found.                                                                              |
| 087         | PAN is invalid                                                                                            |
| 088         | Card expiry year is invalid                                                                               |
| 089         | Card expiry month is invalid                                                                              |
| 090         | Transaction currency is invalid                                                                           |
| 091         | Invalid request data.                                                                                     |
| 092         | Merchant api method (__METHOD__) is currently disabled.                                                   |
| 093         | Merchant api method (__METHOD__) not found.                                                               |
| 094         | Terminal (__TERMINAL__) does not have permission to access method (__METHOD__).                           |
| 095         | Transaction descriptor contains invalid characters.                                                       |
| 096         | Bad original request response code.                                                                       |
| 097         | Api version is invalid                                                                                    |
| 098         | Merchant mcc (__MCC__) not found.                                                                         |
| 099         | Bin range not found.                                                                                      |
| 100         | Request is received for processing.                                                                       |
| 101         | MCC value (__MCC__) is not valid.                                                                         |
| 102         | Invalid receiver account number.                                                                          |
| 103         | Refund currency is not the same as transactions currency                                                  |
| 104         | Cannot reverse sent for clearing transactions                                                             |
| 105         | Recurring payment was not initiated                                                                       |
| 106         | Funding source is not valid for account: (__ACCOUNT__).                                                   |
| 107         | There was an error in P2P transaction processing.                                                         |
| 108         | PRE authorize currency does not match                                                                     |
| 109         | This type of operation is not available for this type of card                                             |
| 110         | Reverse currency should match original authorize currency                                                 |
| 111         | Parent transaction not found.                                                                             |
| 112         | Cancelled transaction cannot be reversed.                                                                 |
| 113         | Both date_updated and id_from should be provided if one of them is not 0                                  |
| 114         | Only initial authorize can be captured                                                                    |
| 115         | Local transaction time and/or date format is incorrect.                                                   |
| 116         | Card has expired                                                                                          |
| 117         | Either card_token or card details should be provided. You cannot provide both.                            |
| 118         | Invalid date provided. The date format should be `Y-m-d H:i:s`.                                           |
| 119         | From id must be of type integer.                                                                          |
| 120         | Authorization not found.                                                                                  |
| 121         | Value is too long for field: (__FIELD__)                                                                  |
| 122         | Value is invalid for field: (__FIELD__)                                                                   |
| 123         | Error occurred, please try again later. If error persists please contact support.                         |
| 124         | Source_of_funds value (__VALUE__) is not allowed for this merchant                                        |
| 125         | Duplicated request is not allowed.                                                                        |
| 126         | Transaction is being processed.                                                                           |
| 127         | Parent transaction ID is required for this operation.                                                     |
| 128         | There was an error in INIT_S3D processing.                                                                |
| 129         | Transaction not found.                                                                                    |
| 130         | Second presentment has already been created for this transaction.                                         |
| 131         | Value is too short for field: (__FIELD__)                                                                 |
| 132         | Value is invalid for field: (__FIELD__). Valid values: (__VALID_VALUES__).                                |
| 133         | Field: (__FIELD__) length is invalid.                                                                     |
| 134         | Cancel is not allowed for this procedure.                                                                 |
| 135         | Wrong procedure for cancel                                                                                |
| 136         | Unknown field submitted: __FIELD__                                                                        |
| 137         | (__KEYTYPE__) key not found.                                                                              |
| 138         | Security related control information is required for online PIN verification                              |
| 139         | Terminal pan entry mode not found                                                                         |
| 140         | Terminal pan entry mode is not enabled                                                                    |
| 141         | Terminal guid is incorrect                                                                                |
| 142         | Field: (__FIELD__) can not be empty.                                                                      |
| 143         | Actual authorize not found.                                                                               |
| 144         | Terminal not found.                                                                                       |
| 145         | __ENTITY__ not found.                                                                                     |
| 146         | Terminal type must be physical.                                                                           |
| 147         | Field (__FIELD__) is required.                                                                            |
| 148         | Pin block length is not valid                                                                             |
| 149         | Encryption failed.                                                                                        |
| 150         | Unknown method.                                                                                           |
| 151         | Card data should match with parent transaction card data                                                  |
| 152         | S3D error: Issuer or cardholder not enrolled. S3D error status code: 2                                    |
| 153         | S3D error: Not in cache. S3D error status code: 3                                                         |
| 154         | S3D: Attempt. S3D status code: 4                                                                          |
| 155         | S3D error: Authentication unavailable. S3D error status code: 5                                           |
| 156         | S3D error: 3-D Secure Error. S3D error status code: 6                                                     |
| 157         | S3D error: Fraud Score blocked. S3D error status code: 8                                                  |
| 158         | S3D error: Pending transaction. S3D error status code: 9                                                  |
| 159         | S3D error: Skip device case. S3D error status code: 80                                                    |
| 160         | S3D error: Network error. S3D error status code: 91                                                       |
| 161         | S3D error: Directory error. S3D error status code: 92                                                     |
| 162         | S3D error: Configuration errors. S3D error status code: 93                                                |
| 163         | S3D error: Input error. S3D error status code: 94                                                         |
| 164         | S3D error: No directory found for PAN/cardtype. S3D error status code: 95                                 |
| 165         | S3D error: No version 2 directory found for PAN/cardtype. S3D error status code: 96                       |
| 166         | S3D error: System error. S3D error status code: 99                                                        |
| 167         | Key type (__KEY__) is not implemented                                                                     |
| 168         | Active key not found                                                                                      |
| 169         | Cancel batch not provided                                                                                 |
| 170         | 3ds authentication not found.                                                                             |
| 171         | An array of cards must be provided                                                                        |
| 172         | Invalid data. Invalid card details.                                                                       |
| 173         | Not registered in card update program.                                                                    |
| 174         | Card Update Batch was not found                                                                           |
| 175         | Invalid field (__FIELD__) value. Value must be unique.                                                    |
| 176         | Authentication request id must be provided.                                                               |
| 177         | Card or issuer is not enrolled in 3ds.                                                                    |
| 178         | Strong customer authentication required.                                                                  |
| 179         | Card data must be the same as in original transaction.                                                    |
| 180         | Authorize could not be incremented because of the current authorize state                                 |
| 181         | Authorize could not be finalize because of the current authorize state                                    |
| 182         | Could not proceed with your request because of bad response code on authorize                             |
| 183         | Mpi client configuration error                                                                            |
| 184         | First incoming authorize not found                                                                        |
| 185         | S3D error: Authentication failed. S3D error status code: 0                                                |
| 186         | BIN range is not available at the moment. Try again, or contact support.                                  |
| 187         | S3D error: Transaction not found. S3D error status code: 97                                               |
| 196         | Cancel period has expired                                                                                 |
| 197         | Original authorize is recurring, subsequent requests must also be sent as recurring.                      |
| 198         | Incorrect type passed for field __FIELD__. Expected: __TYPE__.                                            |
| 199         | Original authorize not found.                                                                             |
| 200         | Original authorize response not found.                                                                    |
| 201         | Original merchant request not found                                                                       |
| 202         | Value is invalid for field "__FIELD__". Valid values is in range __RANGE_VALUES__                         |
| 203         | Invalid date_from provided. The date format should be Y-m-d                                               |
| 204         | Invalid date_to provided. The date format should be Y-m-d                                                 |
| 205         | Invalid country ISON                                                                                      |
| 206         | Partial reverse not supported by schema.                                                                  |
| 207         | Merchant (__MERCHANT__) does not have permission to access method (__METHOD__).                           |
| 208         | Sale point (__SALEPOINT__) does not have permission to access method (__METHOD__).                        |
| 209         | Request decryption failed.                                                                                |
| 210         | Response encryption failed.                                                                               |
| 211         | Request message should have appropriate headers and be encrypted.                                         |
| 212         | Device not found                                                                                          |
| 213         | Bin range does not support this mcc (__MCC__)                                                             |
| 214         | Sign header not provided                                                                                  |
| 215         | Request should contain valid json                                                                         |
| 216         | Risk validation did not pass                                                                              |
| 217         | MAI transaction availability check declined transaction.                                                  |
| 218         | MAI processing error.                                                                                     |
| 219         | MAI not configurated.                                                                                     |
| 220         | Processable currency is not active.                                                                       |
| 221         | Device serial number is incorrect.                                                                        |
| 222         | Method "cancel" is not implemented for JCB scheme                                                         |
| 223         | Amount must be greater than zero                                                                          |
| 224         | Serial number is already in use.                                                                          |
| 225         | Invalid card token                                                                                        |
| 226         | Amount must be set to zero in card verification requests                                                  |
| 229         | Device GUID and serial_number is already registered.                                                      |
| 230         | Guid is already in use.                                                                                   |
| 231         | Incorrect device configuration_status.                                                                    |
| 232         | Incorrect apin.                                                                                           |
| 233         | Device is already activated.                                                                              |
| 234         | Merchant does not have access to selected device.                                                         |
| 235         | Incorrect message.                                                                                        |
| 236         | Terminal type must be virtual.                                                                            |
| 237         | Invalid field  '__FIELD__' type. All fields values should be sent as string.                              |
| 238         | MAI sending error.                                                                                        |
| 239         | Second instance for single-tap transaction already exists.                                                |
| 240         | PIN is required for second instance of single-tap transaction.                                            |
| 241         | parent_tx_id is required for second instance of single-tap transaction.                                   |
| 242         | Invalid card security code format.                                                                        |
| 243         | Sale reversal is not allowed for JCB scheme                                                               |
| 244         | Recurring frequency and recurring end date should be numeric.                                             |
| 245         | Provide both recurring frequency and recurring end date.                                                  |
| 246         | Partial reverse amount must be lower then original authorize amount.                                      |
| 247         | Authentication already used.                                                                              |
| 248         | Device is not active.                                                                                     |
| 249         | Credit refund is not allowed for JCB scheme                                                               |
| 250         | No access to resource '__RESOURCE__'.                                                                     |
| 251         | Merchant category code:'__VALUE__' is not allowed for credit operation.                                   |
| 253         | Refund is not allowed for credit transactions.                                                            |
| 256         | Terminal host device not found                                                                            |
| 223         | Amount must be greater than zero                                                                          |
| 225         | Invalid card token                                                                                        |
| 226         | Amount must be set to zero in card verification requests                                                  |
| 257         | Connection problems with the scheme occurred                                                              |
| 258         | Callback url not present                                                                                  |
| 273         | Authenticate is not available as merchant is configured to use external MPI.                              |
| 274         | Terminal operation not available for method: (__METHOD__) with parameters: (__PARAMETERS__).              |
| 275         | 3DS version is required when using external MPI.                                                          |
| 276         | 3DS directory server transaction ID is required when using external MPI and 3DS version is later than V1. |
| 277         | 3DS authentication status is required.                                                                    |
| 278         | External MPI flag is missing or value is invalid.                                                         |
| 282         | External MPI is not configured.                                                                           |
| 300         | Acquiring system configuration error. __ERROR__                                                           |
| 303         | Acquirer channel not found.                                                                               |
| 304         | Acquirer does not have channel assigned.                                                                  |
| 315         | Offline refund is not available for scheme.                                                               |
| 318         | Currency rate not available.                                                                              |
| 323         | Invalid symbol in field: __FIELD__.                                                                       |
| 400         | Error in processing.                                                                                      |
| 401         | Bad request.                                                                                              |
| 402         | Invalid token.                                                                                            |
| 403         | Worker API error.                                                                                         |
| 404         | Custom.                                                                                                   |
| 405         | Unknown response status.                                                                                  |
| 406         | Not Found Error.                                                                                          |
| 600         | Processor error.                                                                                          |
| 601         | Processor error unknown.                                                                                  |
| 800         | Callback error.                                                                                           |
| 994         | Gateway error (__ERROR_DESCRIPTION__)                                                                     |
| 995         | Api maintenance mode. Try again later.                                                                    |
| 996         | Your request has been canceled.                                                                           |
| 997         | There is a problem in your API configuration.                                                             |
| 998         | Exception                                                                                                 |
| 999         | Unknown error                                                                                             |

### Status reason available values

| Value | Description                                                                                                   |
|:------|:--------------------------------------------------------------------------------------------------------------|
| 01    | Card authentication failed                                                                                    |
| 02    | Unknown device                                                                                                |
| 03    | Unsupported device                                                                                            |
| 04    | Exceeds authentication frequency limit                                                                        |
| 05    | Expired card                                                                                                  |
| 06    | Invalid card number                                                                                           |
| 07    | Invalid transaction                                                                                           |
| 08    | No card record                                                                                                |
| 09    | Security failure                                                                                              |
| 10    | Stolen card                                                                                                   |
| 11    | Suspected fraud                                                                                               |
| 12    | Transaction not permitted to cardholder                                                                       |
| 13    | Cardholder not enrolled in service                                                                            |
| 14    | Transaction timed out at the ACS                                                                              |
| 15    | Low confidence                                                                                                |
| 16    | Medium confidence                                                                                             |
| 17    | High confidence                                                                                               |
| 18    | Very High confidence                                                                                          |
| 19    | Exceeds ACS maximum challenges                                                                                |
| 20    | Non-Payment transaction not supported                                                                         |
| 21    | 3RI transaction not supported                                                                                 |
| 22    | ACS technical issue                                                                                           |
| 23    | Decoupled authentication required by ACS but not requested by 3DS Requestor                                   |
| 24    | 3DS Requestor decoupled max expiry time exceeded                                                              |
| 25    | Decoupled authentication was provided insufficient time to authenticate cardholder. ACS will not make attempt |
| 26    | Authentication attempted but not performed by the cardholder                                                  |

### S3D enrollment statuses

| Status | Description                               |
|:-------|:------------------------------------------|
| Y      | Cardholder is enrolled                    |
| N      | Cardholder or card issuer is not enrolled |
| U      | Unable to authenticate                    |
| -      | Status is not available due to MPI error  |

### Transaction types

| Value | Description                 | Versions |
|:------|:----------------------------|:---------|
| 01    | Goods/ Service Purchase     | >= 2.1.0 |
| 03    | Check Acceptance            | >= 2.1.0 |
| 10    | Account Funding             | >= 2.1.0 |
| 11    | Quasi-Cash Transaction      | >= 2.1.0 |
| 28    | Prepaid Activation and Load | >= 2.1.0 |

### Card security code result

| Value | Description                                                                            |
|:------|:---------------------------------------------------------------------------------------|
| M     | CVV matches.                                                                           |
| N     | CVV does not match.                                                                    |
| P     | Not processed.                                                                         |
| S     | CVV2 is on the card, but the merchant has indicated that CVV2 is not present.          |
| U     | Issuer is not Visa-certified for CVV2, has not provided Visa encryption keys, or both. |

### 3DS verification result code

| Value | Description                                                       |
|:------|:------------------------------------------------------------------|
| A     | AAV and Amount Checked.                                           |
| B     | Balance to Verify.                                                |
| C     | Consider the Amount.                                              |
| D     | DS Transaction ID Failed.                                         |
| I     | Invalid AAV.                                                      |
| K     | Key Not on File - Issuer to perform SPA1 ACS AAV self-validation. |
| M     | Mismatch Currency.                                                |
| T     | Transaction ID Present – Consider the Amount.                     |
| U     | Service Unavailable.                                              |
| V     | Valid – All Data Passes.                                          |
| X     | Security Platform Timeout.                                        |
| Z     | Security Platform Processing Error.                               |

### Scheme

| ID | Scheme     |
|:---|:-----------|
| 1  | MasterCard |
| 2  | Visa       |
| 3  | UnionPay   |
| 6  | JCB        |

### ECI

| Status   | Description                           |
|:---------|:--------------------------------------|
| 02 or 05 | Fully authenticated transaction.      |
| 01 or 06 | Attempted authentication transaction. |
| 00 or 07 | Non 3-D secure transaction.           |

### Provider status code

| Status | Description                                   |
|:-------|:----------------------------------------------|
| 0      | Authentication failed                         |
| 1      | Fully authenticated transaction               |
| 2      | Issuer or cardholder not enrolled             |
| 3      | Not in cache                                  |
| 4      | Attempt receipt received and signature valid  |
| 5      | Authentication unavailable                    |
| 6      | 3-D Secure Error                              |
| 8      | Fraud Score blocked                           |
| 9      | Pending transaction                           |
| 80     | Skip device case                              |
| 91     | Network error                                 |
| 92     | Directory error                               |
| 93     | Configuration errors                          |
| 94     | Input error                                   |
| 95     | No directory found for PAN/cardtype           |
| 96     | No version 2 directory found for PAN/cardtype |
| 99     | System error                                  |

### Veres enrollment status

| Status | Description                        |
|:-------|:-----------------------------------|
| Y      | Authentication available.          |
| N      | Not enrolled.                      |
| U      | Authentication unavailable.        |
| -      | Value is not available due errors. |

### Pares transaction status

| Status | Description                        |
|:-------|:-----------------------------------|
| Y      | Successful authentication.         |
| N      | Failed authentication.             |
| U      | Unable to complete authentication. |
| A      | Authentication attempt.            |
| R      | Authentication rejected.           |
| -      | Value is not available due errors. |

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

### MIT message reason codes 

| Code | Description                           |
|:-----|:--------------------------------------|
| inc  | Incremental Authorization Transaction |
| res  | Resubmission Transaction              |
| del  | Delayed Charges Transaction           |
| rea  | Reauthorization Transaction           |
| ns   | No Show Transaction                   |

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

To use new version API you need to send your API credentials using header with every request you make. **Note** if headers are set then corresponding authentication values from JSON body will be overwritten with header values.

**Header**

| Parameter       | Notation | Type | Length | Description                                                                                         |
|:----------------|:---------|:-----|:-------|:----------------------------------------------------------------------------------------------------|
| content-type    | M        | ANS  | 1-50   | Request content type. text/plain for encrypted request, application/json for non encrypted request. |
| x-method        | M        | A    | 1-50   | [`Api methods`](#appendix--enum--api-methods).                                                      |
| x-api-id        | M        | AN   | 50     | Merchant API ID.                                                                                    |
| x-terminal-id   | M        | AN   | 50     | Terminal API ID.                                                                                    |
| x-sale-point-id | M        | AN   | 50     | Sale point API ID.                                                                                  |
| x-token         | M        | AN   | 30-60  | Merchant token.                                                                                     |
| x-api-version   | M        | AN   | 1-3    | Fixed `1.0`.                                                                                        |
| x-sign          | M        | ANS  | 1-255  | "Secret" encrypted with merchant private key.                                                       |

### Card token

Card token represents a credit card’s details which includes *card_holder_name*, *card_number*, *card_expiry_month*, *card_expiry_year* fields. After providing card information in first call you can use card token in subsequent transaction requests.

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
|:----------|:-----------------------------------------------|
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
