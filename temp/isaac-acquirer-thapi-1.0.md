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
## Bins list

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                     | M  | Type | Length | Description                                                                |
|:------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                        | M  | AN   |        | Expected API method value: `bins_list`                                     |
| pos_host_id                   | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                         | M  | AN   | 20     | Terminal host token.                                                       |
| api_version                   | M  | ANS  |        | Fixed `1.0`.                                                               |
| sign                          | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                          | M  | ANS  |        | Data encrypted with secret.                                                |
| pure_json                     | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |
| data / date_updated_microtime | M  | N    | 16     | Date to filter bins by update date. Format: `Uu`.                          |


```json
{
    "method": "bins_list",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "api_version": "1.0",
    "sign": "%ENCRYPTED_SECRET%",
    "data": "%ENCRYPTED_DATA%",
    "pure_json": {
      "date_updated_microtime": "1565599962410002"
    }
}
```

### Response

| Parameter                     | M   | Type | Description                                                                                                                                                                                                                  |
|:------------------------------|:----|:-----|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                        | ME  | AN   | API method (echo from request).                                                                                                                                                                                              |
| pos_host_id                   | ME  | AN   | Terminal host ID (echo from request).                                                                                                                                                                                        |
| api_version                   | ME  | ANS  | Fixed `1.0` (echo from request).                                                                                                                                                                                             |
| data                          | M   | OBJ  | Raw data                                                                                                                                                                                                                     |
| data / id                     | M   | N    | Bin ID.                                                                                                                                                                                                                      |
| data / bin                    | M   | N    | Bin.                                                                                                                                                                                                                         |
| data / bin_from               | M   | N    | Bin range from.                                                                                                                                                                                                              |
| data / bin_to                 | M   | N    | Bin range to.                                                                                                                                                                                                                |
| data / card_brand             | M   | ANS  | Card brand.                                                                                                                                                                                                                  |
| data / country_code           | M   | A    | Country code. Format: `ISO 3166 ALPHA-3`.                                                                                                                                                                                    |
| data / country_name           | M   | ANS  | Country name.                                                                                                                                                                                                                |
| data / raw_card_type          | M   | AN   | Raw card type value.                                                                                                                                                                                                         |
| data / card_type              | M   | ANS  | [`Card Types`](#appendix--enum--card-types).                                                                                                                                                                                 |
| data / ica                    | O   | N    | Issuer ID.                                                                                                                                                                                                                   |
| data / date_updated           | M   | NS   | Date updated. Format: `Y-m-d h:i:s`.                                                                                                                                                                                         |
| data / date_updated_microtime | M   | N    | Date updated microtime. Format: `Uu`.                                                                                                                                                                                        |
| data / is_deleted             | M   | N    | Bin deletion flag. 1 - bin is deleted, 0 - bin is active.                                                                                                                                                                    |
| data / raw_product_type       | O   | ANS  | Raw values for product type, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could bet provided. **Note:** Returned only if card information processing was successful |
| data / product_type           | O   | ANS  | [`Card Product Types`](#appendix--enum--card-product-types) **Note:** Returned only if card information processing was successful                                                                                            |
| data / raw_product_level      | O   | AN   | Raw values for product level, format `{id}-{text_value}`. `{text_value}` could be empty depending on scheme, `Unknown` if no values could be provided. **Note:** Returned only if card information processing was successful |
| data / product_level          | O   | ANS  | [`Card Product Levels`](#appendix--enum--card-product-levels) **Note:** Returned only if card information processing was successful                                                                                          |
| data / issuer_name            | O   | ANS  | Name of the issuer                                                                                                                                                                                                           |

```json
{
    "method": "bins_list",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "api_version": "1.0",
    "data": [
        {
            "id": "15555882369481",
            "bin": "111111",
            "bin_from": "1111110000000000000",
            "bin_to": "1111199999999999999",
            "card_brand": "Mastercard",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "C",
            "card_type": "Credit",
            "date_updated": "2019-01-02 12:00:00",
            "date_updated_microtime": "1565599962410002",
            "is_deleted": "0",
            "raw_product_type": "1-Consumer",
            "product_type": "Consumer",
            "raw_product_level": "Unknown",
            "product_level": "Unknown",
            "issuer_name":  "The name of the issuer"
        },
        {
            "id": "15555882369490",
            "bin": "222222",
            "bin_from": "2222220000000000000",
            "bin_to": "2222229999999999999",
            "card_brand": "Visa",
            "country_code": "USA",
            "country_name": "United States",
            "raw_card_type": "D",
            "card_type": "Debit",
            "ica": "",
            "date_updated": "2019-01-03 12:00:00",
            "date_updated_microtime": "1565521962416304",
            "is_deleted": "1",
            "raw_product_type": "Unknown",
            "product_type": "Unknown",
            "raw_product_level": "Unknown",
            "product_level": "Unknown",
            "issuer_name":  "The name of the issuer"
        },
        ...
    ]
}
```

## Cancel batch

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter               | M  | Type | Length | Description                                   |
|:------------------------|:---|:-----|:-------|:----------------------------------------------|
| method                  | M  | AN   |        | Expected API method value: `cancel_batch`     |
| pos_host_id             | M  | AN   | 1-10   | Terminal host ID.                             |
| token                   | M  | AN   | 20     | Terminal host token.                          |
| api_version             | M  | ANS  |        | Fixed `1.0`.                                  |
| sign                    | M  | ANS  |        | Random secret encrypted with your public key. |
| data                    | M  | ANS  |        | Data encrypted with secret.                   |
| pure_json               | M  | LIST |        | List.                                         |
| pure_json / terminal_id | M  | ANS  | 1-8    | Terminal API ID.                              |
| pure_json / token       | M  | ANS  | 1-20   | Merchant token.                               |
| pure_json / api_id      | M  | ANS  |        | Merchant API ID.                              |
| pure_json / data        | M  | OBJ  |        | Data.                                         |
| pure_json / data / 2    | M  | ANS  | 12-19  | Card number.                                  |
| pure_json / data / 3    | M  | N    |        | Processing code.                              |
| pure_json / data / 4    | M  | N    | 1-12   | Transaction amount.                           |
| pure_json / data / 11   | M  | N    |        | Stan.                                         |
| pure_json / data / 14   | M  | N    | 4      | Card expiration year and month.               |
| pure_json / data / 37   | M  | N    | 1-15   | Retrieval reference number.                   |
| pure_json / data / 49   | M  | N    | 3      | ISO Numeric currency code.                    |

```json
{
    "method": "cancel_batch",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "api_version": "1.0",
    "sign": "%ENCRYPTED_SECRET%",
    "data": "%ENCRYPTED_DATA%",
    "pure_json": [
        {
            "terminal_id": "%YOUR_TERMINAL_API_ID%",
            "token": "%YOUR_MERCHANT_API_TOKEN%",
            "api_id": "%YOUR_MERCHANT_API_ID%",
            "data": {
                "2": "%YOUR_CARD_NUMBER%",
                "3": "000000",
                "4": "000000000300",
                "11": null,
                "14": "1111",
                "37": "915000660099",
                "49": "978"
            }
        }
    ]
}
```

### Response

| Parameter    | M   | Type | Description                                                               |
|:-------------|:----|:-----|:--------------------------------------------------------------------------|
| method       | ME  | AN   | API method (echo from request).                                           |
| pos_host_id  | ME  | AN   | Terminal host ID (echo from request).                                     |
| api_version  | ME  | ANS  | Fixed `1.0` (echo from request).                                          |
| sign         | M   | ANS  | Random secret encrypted with your public key.                             |
| data         | M   | ANS  | Data encrypted with secret.                                               |
| pure_json    | C   | OBJ  | Decrypted raw data - could only be sent during integration testing phase. |


```json
{
    "method": "cancel_batch",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "api_version": "1.0",
    "data": "EiUBYtaL2J14yk5BSD5fI/OKGr3nvmK9fjNoWrI9+Z4l70eCWQywdfUyIALrH2mAVIxk2lldX5VlcF8l",
    "pure_json": {
        "status": "received",
        "invalid": "0"
    }
}
```

## Check device configuration

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                     | M  | Type | Length | Description                                                                |
|:------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                        | M  | AN   |        | Expected API method value: `check_device_configuration`                    |
| pos_host_id                   | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                         | M  | AN   | 20     | Terminal host token.                                                       |
| api_version                   | M  | ANS  |        | Fixed `1.0`.                                                               |
| guid                          | M  | ANS  | 36     | Device GUID.                                                               |
| initial_guid                  | M  | ANS  | 36     | Device initial GUID.                                                       |
| serial_number                 | M  | ANS  | 64     | Device serial number.                                                      |
| sign                          | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                          | M  | ANS  |        | Data encrypted with secret.                                                |
| pure_json                     | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |


```json
{
    "method": "check_device_configuration",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "api_version": "1.0",
    "guid": "%YOUR_DEVICE_GUID%",
    "initial_guid": "%YOUR_DEVICE_INITIAL_GUID%",
    "serial_number": "%YOUR_DEVICE_SERIAL_NUMBER%",
    "sign": "%ENCRYPTED_SECRET%",
    "data": "%ENCRYPTED_DATA%",
    "pure_json": {}
}
```

### Response

| Parameter                     | M  | Type | Description                                                                           |
|:------------------------------|:---|:-----|:--------------------------------------------------------------------------------------|
| method                        | ME | AN   | API method.                                                                           |
| pos_host_id                   | ME | AN   | Terminal host ID.                                                                     |
| api_version                   | ME | ANS  | Fixed `1.0`.                                                                          |
| guid                          | ME | ANS  | Device GUID.                                                                          |
| initial_guid                  | ME | ANS  | Device initial GUID.                                                                  |
| serial_number                 | ME | ANS  | Device serial number.                                                                 |
| data                          | M  | OBJ  | Raw data                                                                              |
| data / status                 | M  | ANS  | Status: "configuration_verified" is returned on successful response.                  |

```json
{
    "method": "check_device_configuration",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "api_version": "1.0",
    "guid": "%YOUR_DEVICE_GUID%",
    "initial_guid": "%YOUR_DEVICE_INITIAL_GUID%",
    "serial_number": "%YOUR_DEVICE_SERIAL_NUMBER%",
    "data": {
      "status": "configuration_verified"
    }
}
```

## Get updated devices

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                         | M  | Type | Length | Description                                                                |
|:----------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                            | M  | AN   |        | Expected API method value: `get_updated_devices`                           |
| pos_host_id                       | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                             | M  | AN   | 20     | Terminal host token.                                                       |
| api_version                       | M  | ANS  |        | Fixed `1.0`.                                                               |
| sign                              | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                              | M  | ANS  |        | Data encrypted with secret.                                                |
| data / date_updated_microtime     | M  | N    | 14     | Date in microtime.                                                         |
| pure_json                         | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |


```json
{
   "method": "get_updated_devices",
   "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
   "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
   "api_version": "1.0",
   "data": {
      "date_updated_microtime": "15796143696933"
   }
}
```

### Response

| Parameter                                                         | M  | Type | Description                                                |
|:------------------------------------------------------------------|:---|:-----|:-----------------------------------------------------------|
| method                                                            | ME | AN   | API method.                                                |
| pos_host_id                                                       | ME | AN   | Terminal host ID.                                          |
| api_version                                                       | ME | ANS  | Fixed `1.0`.                                               |
| has_more_records                                                  | M  | A    | Informs if there are more records in next page. `Y` or `N` |
| data                                                              | M  | OBJ  | Raw data                                                   |
| data / date_updated_microtime                                     | ME | N    | Date in microtime.                                         |
| data / devices                                                    | M  | OBJ  | Devices object.                                            |
| data / devices / device_config_version                            | M  | N    | Device config version.                                     |
| data / devices / admin_pass                                       | M  | ANS  | Device admin password.                                     |
| data / devices / manager_pass                                     | M  | ANS  | Device manager password.                                   |
| data / devices / url                                              | M  | ANS  | Pos Host URL.                                              |
| data / devices / institution_api_id                               | M  | AN   | Automaticaly generated institution API ID.                 |
| data / devices / guid                                             | M  | ANS  | Device GUID.                                               |
| data / devices / initial_guid                                     | M  | ANS  | Device initial GUID.                                       |
| data / devices / serial_number                                    | M  | ANS  | Device serial number.                                      |
| data / devices / rsa_pub                                          | M  | ANS  | Device public key.                                         |
| data / devices / rsa_priv                                         | M  | ANS  | Device private key.                                        |
| data / devices / tek_under_thzmk                                  | O  | ANS  | TEK key under THZMK                                        |
| data / devices / tek_under_tmk                                    | O  | ANS  | TEK key under TMK                                          |
| data / devices / active                                           | M  | N    | Device active status.                                      |
| data / devices / multi_merchants                                  | M  | OBJ  | Multi merchants assigned to device.                        |
| data / devices / multi_merchants / token                          | M  | ANS  | Merchant token.                                            |
| data / devices / multi_merchants / m_id                           | M  | ANS  | Merchant api ID.                                           |
| data / devices / multi_merchants / t_id                           | M  | ANS  | Terminal api ID.                                           |
| data / devices / multi_merchants / sp_id                          | M  | ANS  | Sale point api ID.                                         |
| data / devices / multi_merchants / name                           | M  | ANS  | Merchant name.                                             |
| data / devices / multi_merchants / active                         | M  | N    | Terminal active status.                                    |
| data / devices / multi_merchants / terminal_config_version        | M  | N    | Terminal config version.                                   |

```json
{
    "method": "get_updated_devices",
    "pos_host_id": "0000000001",
    "api_version": "1.0",
    "has_more_records": "N",
    "data": {
        "date_updated_microtime": "15796143696933",
        "devices": [
            {
                "device_config_version": 1579615118,
                "date_updated_microtime": 15796151181681,
                "admin_pass": "pass123",
                "manager_pass": "pass321",
                "url": "http://host.isac-pos.local",
                "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
                "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
                "serial_number": "39267819219100025148zz43743730420750777216",  
                "rsa_pub": "--nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAv--",
                "rsa_priv": "--nMIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAv--",
                "tek_under_thzmk": null,
                "tek_under_tmk": null,
                "active": 1,
                "multi_merchants": [
                    {
                        "token": "cba",
                        "m_id": "abc54321",
                        "t_id": "termi321",
                        "sp_id": "abc54321",
                        "name": "test2",
                        "active": 1,
                        "terminal_config_version": 1579615120
                    },
                    {
                        "token": "posm",
                        "m_id": "posMer",
                        "t_id": "posTerm1",
                        "sp_id": "posMer",
                        "name": "posMerchant",
                        "active": 1,
                        "terminal_config_version": 1579615121
                    },
                    {
                        "token": "posm",
                        "m_id": "posMer",
                        "t_id": "posNa1",
                        "sp_id": "posMer",
                        "name": "posMerchant",
                        "active": 1,
                        "terminal_config_version": 1579615122
                    }
                ]
            }
        ]
    }
}
```

## Activate Device

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                     | M  | Type | Length | Description                                                                |
|:------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                        | M  | AN   |        | Expected API method value: `activate_device`                               |
| pos_host_id                   | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                         | M  | AN   | 20     | Terminal host token.                                                       |
| api_version                   | M  | ANS  |        | Fixed `1.0`.                                                               |
| guid                          | M  | ANS  | 36     | Device GUID.                                                               |
| initial_guid                  | M  | ANS  | 36     | Device initial GUID.                                                       |
| serial_number                 | M  | ANS  | 64     | Device serial number.                                                      |
| sign                          | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                          | M  | ANS  |        | Data encrypted with secret.                                                |
| data / apin                   | M  | AN   | 4      | Device activation pin.                                                     |
| pure_json                     | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |


```json
{
    "method": "activate_device",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "api_version": "1.0",
    "guid": "%YOUR_DEVICE_GUID%",
    "initial_guid": "%YOUR_DEVICE_INITIAL_GUID%",
    "serial_number": "%YOUR_DEVICE_SERIAL_NUMBER%",
    "sign": "%ENCRYPTED_SECRET%",
    "data": "%ENCRYPTED_DATA%",
    "pure_json": {
        "apin": "1529"
    }
}
```

### Response

| Parameter                     | M  | Type | Description                                                                                                                           |
|:------------------------------|:---|:-----|:--------------------------------------------------------------------------------------------------------------------------------------|
| method                        | ME | AN   | API method.                                                                                                                           |
| pos_host_id                   | ME | AN   | Terminal host ID.                                                                                                                     |
| api_version                   | ME | ANS  | Fixed `1.0`.                                                                                                                          |
| guid                          | ME | ANS  | Device GUID.                                                                                                                          |
| initial_guid                  | ME | ANS  | Device initial GUID.                                                                                                                  |
| serial_number                 | ME | ANS  | Device serial number.                                                                                                                 |
| data                          | M  | OBJ  | Raw data                                                                                                                              |
| data / status                 | M  | ANS  | Device configuration status (active). [`Available device configuration status`](#appendix--notation--device-configuration-status)     |

```json
{
    "method": "activate_device",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "api_version": "1.0",
    "guid": "%YOUR_DEVICE_GUID%",
    "initial_guid": "%YOUR_DEVICE_INITIAL_GUID%",
    "serial_number": "%YOUR_DEVICE_SERIAL_NUMBER%",
    "data": {
      "status": "active"
    }
}
```

## Device config

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                         | M  | Type | Length | Description                                                                |
|:----------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                            | M  | AN   |        | Expected API method value: `device_config`                                 |
| pos_host_id                       | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                             | M  | AN   | 20     | Terminal host token.                                                       |
| guid                              | M  | ANS  | 36     | Device GUID.                                                               |
| initial_guid                      | M  | ANS  | 36     | Device initial GUID.                                                       |
| serial_number                     | M  | ANS  | 64     | Device serial number.                                                      |
| api_version                       | M  | ANS  |        | Fixed `1.0`.                                                               |
| sign                              | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                              | M  | ANS  |        | Data encrypted with secret.                                                |
| pure_json                         | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |


```json
{
    "method": "device_config",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "guid": "%YOUR_DEVICE_GUID%",
    "initial_guid": "%YOUR_DEVICE_INITIAL_GUID%",
    "serial_number": "%YOUR_DEVICE_SERIAL_NUMBER%",
    "api_version": "1.0",
    "data": {}
}
```

### Response

| Parameter                                                      | M  | Type | Description                                                |
|:---------------------------------------------------------------|:---|:-----|:-----------------------------------------------------------|
| method                                                         | ME | AN   | API method.                                                |
| pos_host_id                                                    | ME | AN   | Terminal host ID.                                          |
| api_version                                                    | ME | ANS  | Fixed `1.0`.                                               |
| data                                                           | M  | OBJ  | Raw data                                                   |
| data / date_updated_microtime                                  | M  | N    | Device last update date in microtime.                      |
| data / device_config_version                                   | M  | N    | Device config version.                                     |
| data / admin_pass                                              | M  | ANS  | Device admin password.                                     |
| data / manager_pass                                            | M  | ANS  | Device manager password.                                   |
| data / url                                                     | M  | ANS  | Pos Host URL.                                              |
| data / rsa_pub                                                 | M  | ANS  | Device public key.                                         |
| data / rsa_priv                                                | M  | ANS  | Device private key.                                        |
| data / tek_under_thzmk                                         | O  | ANS  | TEK key under THZMK                                        |
| data / tek_under_tmk                                           | O  | ANS  | TEK key under TMK                                          |
| data / app_version                                             | M  | N    | Fixed `1.1`.                                               |
| data / active                                                  | M  | N    | Device active status.                                      |
| data / multi_merchants                                         | M  | OBJ  | Multi merchants assigned to device.                        |
| data / multi_merchants / token                                 | M  | ANS  | Merchant token.                                            |
| data / multi_merchants / m_id                                  | M  | ANS  | Merchant api ID.                                           |
| data / multi_merchants / t_id                                  | M  | ANS  | Terminal api ID.                                           |
| data / multi_merchants / sp_id                       | M  | ANS  | Sale point api ID.                                         |
| data / multi_merchants / name                                  | M  | ANS  | Merchant name.                                             |
| data / multi_merchants / active                                | M  | N    | Terminal active status.                                    |
| data / multi_merchants / terminal_config_version               | M  | N    | Terminal config version.                                   |

```json
{
    "method": "device_config",
    "pos_host_id": "0000000001",
    "api_version": "1.0",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
    "serial_number": "39267819219100025148zz43743730420750777216",
    "data": [
        {
            "date_updated_microtime": 15797839240362,
            "device_config_version": 1579783740,
            "admin_pass": null,
            "manager_pass": null,
            "url": "http://host.isac-pos.local",
            "rsa_pub": "--nncPCwWpe85oqTbzwHKux31eYqtViPk87KXa4di3xd2QF2y9TPP1uVHfPi--",
            "rsa_priv": "--nncPCwWpebzwHKux31eYqtViPk87KXa4di3xd2QF2y9TzwHKux31eYqtViPk87KXa4di3xd2QF2y9TPP1uVHfPi--",
            "tek_under_thzmk": null,
            "tek_under_tmk": null,
            "app_version": "1.1",
            "active": 1,
            "multi_merchants": [
                {
                    "token": "cba",
                    "m_id": "abc54321",
                    "t_id": "termi321",
                    "sp_id": "abc54321",
                    "name": "test2",
                    "active": 1,
                    "terminal_config_version": 1579783740
                },
                {
                    "token": "posm",
                    "m_id": "posMer",
                    "t_id": "posTerm1",
                    "sp_id": "posMer",
                    "name": "posMerchant",
                    "active": 1,
                    "terminal_config_version": 1579783745
                },
                {
                    "token": "posm",
                    "m_id": "posMer",
                    "t_id": "posNa1",
                    "sp_id": "posMer",
                    "name": "posMerchant",
                    "active": 1,
                    "terminal_config_version": 1579783749
                },
                {
                    "token": "posm",
                    "m_id": "posPayMer",
                    "t_id": "posPay",
                    "sp_id": "posPayMer",
                    "name": "posPayment",
                    "active": 1,
                    "terminal_config_version": 1579783754
                }
            ]
        }
    ]
}
```

## Ping

| URL              |  Method  |
|------------------|----------|
| /thapi/authorize |   POST   |

### Request

| Parameter                     | M  | Type | Length | Description                                                                |
|:------------------------------|:---|:-----|:-------|:---------------------------------------------------------------------------|
| method                        | M  | AN   |        | Expected API method value: `ping`                                          |
| pos_host_id                   | M  | AN   | 1-10   | Terminal host ID.                                                          |
| token                         | M  | AN   | 20     | Terminal host token.                                                       |
| api_version                   | M  | ANS  |        | Fixed `1.0`.                                                               |
| sign                          | M  | ANS  |        | Random secret encrypted with your public key.                              |
| data                          | M  | ANS  |        | Data encrypted with secret.                                                |
| data / message                | M  | AN   | 255    | Request message. Message must be static value "ping".                      |
| pure_json                     | C  | OBJ  |        | Decrypted raw data - should only be sent during integration testing phase. |


```json
{
    "method": "ping",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "token": "%YOUR_TERMINAL_HOST_API_TOKEN%",
    "api_version": "1.0",
    "sign": "%ENCRYPTED_SECRET%",
    "data": "%ENCRYPTED_DATA%",
    "pure_json": {
        "message": "ping"
    }
}
```

### Response

| Parameter                     | M  | Type | Description                                              |
|:------------------------------|:---|:-----|:---------------------------------------------------------|
| method                        | ME | AN   | API method.                                              |
| pos_host_id                   | ME | AN   | Terminal host ID.                                        |
| api_version                   | ME | ANS  | Fixed `1.0`.                                             |
| data                          | M  | OBJ  | Raw data                                                 |
| data / message                | M  | ANS  | Response message. Message will be static value "pong".   |

```json
{
    "method": "ping",
    "pos_host_id": "%YOUR_TERMINAL_HOST_API_ID%",
    "api_version": "1.0",
    "data": {
        "message": "pong"
    }
}
```

# Appendix
## Changelog

| Version | Date              | Updates                                                                                                                                                                           |
|:--------|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.5.5   | June 19, 2022     | <!-- nl --> Added field `institution_api_id` in response of request: [`Get updated devices`](#actions--get-updated-devices--request)                                              |
| 1.5.4   | January 28, 2022  | <!-- nl --> Added field `sp_id` in responses of requests: [`Get updated devices`](#actions--get-updated-devices--request) and [`Device config`](#actions--device-config--request) |
| 1.5.3   | July 22, 2021     | <!-- tj --> Removed `token` from responses.                                                                                                                                       |
| 1.1.6   | April 01, 2021    | <!-- dv --> Removed `keys_entered` and `core_config_loaded` from `Device configuration status`.                                                                                   |
| 1.1.5   | February 19, 2021 | <!-- nl --> Added new section- `Security`.                                                                                                                                        |
| 1.1.4   | February 08, 2021 | <!-- nj --> Updated `bins_list` response description with new field `ica`.                                                                                                        |
| 1.1.3   | October 02, 2020  | <!-- rik --> Updated `bins_list` response description with new field `issuer_name`.                                                                                               |
| 1.1.2   | July 29, 2020     | <!-- rik --> Updated `device_config` and `get_updated_devices` response descriptions with new fields `tek_under_thzmk` and `tek_under_tmk`.                                       |
| 1.1.1   | June 01, 2020     | <!-- rik --> Updated `bins_list` response description with new field `is_deleted`.                                                                                                |
| 1.1.0   | April 15, 2020    | <!-- ts --> Updated `bins_list` response description with `raw_card_type`, `raw_product_type`, `raw_product_level`, `product_type`, `product_level` fields.                       |
| 1.0.0   | March 25, 2020    | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->                                                          |

## Enum

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

## Security

### Cryptography
Request and response messages body should be encrypted. There are two ways to perform encryption: **Pattern A** and **Pattern B**. Which pattern will be used depends solely on agreement between Tribe and acquirer. Default configuration is based on Pattern A.

#### Pattern A

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


#### Pattern B

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

| Notation | Meaning                                                                                                                                                                                    |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| M        | Mandatory                                                                                                                                                                                  |
| O        | Optional                                                                                                                                                                                   |
| C        | Conditional                                                                                                                                                                                |
| ME       | Mandatory Echo. The data element will be present in a response message and will contain the same value from the request.                                                                   |
| CE       | Conditional Echo. The data element will be present in response message only if it was present in request message. If it was present it will contain the same value from the request.       |
| -        | Not applicable                                                                                                                                                                             |

### Value type

| Notation  | Meaning                                        |
|:----------|:-----------------------------------------------|
| Not blank | Not empty, not null, isset.                    |
| A         | Alphabetic chars only.                         |
| N         | Only numbers.                                  |
| NS        | Numeric with special symbols listed below      |
| AN        | Alphanumeric value.                            |
| ANS       | Alphanumeric with special symbols listed below |
| [1,2,3]   | Possible values: 1 or 2 or 3.                  |
| [1-3]     | Range from 1 to 3.                             |
| LIST      | List of values.                                |
| OBJ       | Object with properties.                        |
| -         | Not applicable.                                |

### Device configuration status

| Status                | Meaning                            |
|-----------------------|------------------------------------|
| blank                 | Blank.                             |
| ready                 | Ready.                             |
| active                | Active.                            |
| suspended             | Suspended.                         |
| returning             | Returning.                         |

|Special symbol|
|---------------|
|! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { } ~ &#124;|
