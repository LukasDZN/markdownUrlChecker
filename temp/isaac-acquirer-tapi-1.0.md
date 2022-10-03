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
## Authorize

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                                                                              |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `authorize`                                                                               |                                                                                                        |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                                                                        |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                                                                        |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                                                                        |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                                                                        |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                                                                        |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                                                                        |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                                                                        |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                                                                        |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                                                                        |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                                                                        |
| 3             | O        | N    | 6      | Processing code.                                                                                                     |                                                                                                        |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                                                                        |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                                                                        |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                                                                        |
| 18            | O        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                                                                        |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                                                                        |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions                                                |
| 24            | M        | N    | 3      | Function code or network international identifier (NII).                                                             | [`Function codes`](#appendix--notation--function-codes)                                                |
| 25            | M        | N    | 4      | Point of service condition code.                                                                                     |                                                                                                        |
| 35            | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                                                                        |
| 37            | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                                                                        |
| 41            | M        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                                                                        |
| 43            | M        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                                                                        |
| 45            | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                                                                        |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                                                                        |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                                                                   |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                                                                   |
| 54            | C        | AN   | 120    | Additional amounts.                                                                                                  | Required for Cashback transaction                                                                      |
| 55            | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                                                                         |
| 71            | O        | N    | 1      | Card verification.                                                                                                   | `0` or `1`. If value is `1` then card verification is performed (and transaction_amount 0 is allowed). |
| 124           | O        | ANS  | 299    | Member defined data.                                                                                                 |                                                                                                        |
| 127           | O        | ANS  | 999    | Private data.                                                                                                        |                                                                                                        |

```json
{
    "method": "authorize",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "100",
        "25": "1503",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "54": "0040978D000000000088",
        "55": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
        "124": "test message",
        "127": "test message"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Notation | Type | Length | Description                                         |
|:-------------------|:---------|:-----|:-------|:----------------------------------------------------|
| method             | ME       | AN   | 255    | API action (echo from request).                     |
| api_id             | ME       | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id      | M        | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id        | ME       | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id              | M        | AN   | 30     | Transaction ID.                                     |
| request_id         | M        | N    | 14     | Unique request ID.                                  |
| status             | M        | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| reject_reason_code | M        | AN   | 6      | Reject reason code.                                 |
| sign               | M        | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data               | M        | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
    "api_id": "abc54321",
    "method": "authorize",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "210"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Sale

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                               |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `sale`                                                                                    |                                                         |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                         |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                         |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                         |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                         |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                         |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                         |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                         |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                         |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                         |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                         |
| 3             | O        | N    | 6      | Processing code.                                                                                                     |                                                         |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                         |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                         |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                         |
| 18            | O        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                         |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                         |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions |
| 24            | M        | N    | 3      | Function code or network international identifier (NII).                                                             |                                                         |
| 25            | M        | N    | 4      | Point of service condition code.                                                                                     |                                                         |
| 35            | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                         |
| 37            | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                         |
| 41            | M        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                         |
| 43            | M        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                         |
| 45            | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                         |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                         |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                    |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                    |
| 54            | C        | AN   | 120    | Additional amounts.                                                                                                  | Required for Cashback transaction                       |
| 55            | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                          |
| 124           | O        | ANS  | 299    | Member defined data.                                                                                                 |                                                         |
| 127           | O        | ANS  | 999    | Private data.                                                                                                        |                                                         |

```json
{
    "method": "sale",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "100",
        "25": "1503",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "54": "0040978D000000000088",
        "55": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
        "124": "test message",
        "127": "test message"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                         |
|:-------------------|:-----|:-------|:----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                     |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id              | AN   | 30     | Transaction ID.                                     |
| request_id         | N    | 14     | Unique request ID.                                  |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| reject_reason_code | AN   | 6      | Reject reason code.                                 |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
    "api_id": "abc54321",
    "method": "sale",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "210"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Cancel

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                               |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `cancel`                                                                                  |                                                         |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                         |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                         |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                         |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                         |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                         |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                         |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                         |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                         |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                         |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                         |
| 3             | O        | N    | 6      | Processing code.                                                                                                     |                                                         |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                         |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                         |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                         |
| 18            | O        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                         |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                         |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions |
| 24            | M        | N    | 3      | Function code or network international identifier (NII).                                                             |                                                         |
| 25            | M        | N    | 4      | Point of service condition code.                                                                                     |                                                         |
| 37            | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                         |
| 41            | M        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                         |
| 43            | M        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                         |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                         |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                    |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                    |

```json
{
    "method": "cancel",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "100",
        "25": "1503",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                          |
|:-------------------|:-----|:-------|:-----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                      |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                 |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                    |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                 |
| tx_id              | AN   | 30     | Transaction ID.                                      |
| request_id         | N    | 14     | Unique request ID.                                   |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value). |
| reject_reason_code | AN   | 6      | Reject reason code.                                  |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.        |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.          |

```json
{
    "api_id": "abc54321",
    "method": "cancel",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "410"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Refund

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                               |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `refund`                                                                                  |                                                         |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                         |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                         |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                         |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                         |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                         |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                         |
| parent_tx_id  | M        | AN   | 30     | Initial authorize transaction ID.                                                                                    |                                                         |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                         |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                         |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                         |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                         |
| 3             | O        | N    | 6      | Processing code.                                                                                                     |                                                         |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                         |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                         |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                         |
| 18            | O        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                         |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                         |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions |
| 24            | M        | N    | 3      | Function code or network international identifier (NII).                                                             |                                                         |
| 25            | M        | N    | 4      | Point of service condition code.                                                                                     |                                                         |
| 30            | O        | N    | 19     | Original amount.                                                                                                     |                                                         |
| 35            | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                         |
| 37            | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                         |
| 41            | M        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                         |
| 43            | M        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                         |
| 45            | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                         |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                         |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                    |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                    |
| 55            | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                          |
| 56            | O        | AN   | 255    | MTI;STAN;Datetime;Tx_ID;RRNoriginal                                                                                  |                                                         |

```json
{
    "method": "refund",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "parent_tx_id": "030000400018000004200915055221",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "100",
        "25": "1503",
        "30": "000000000300",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "56": "1100;06006606;20190522161748;030001300117000005190531121252;915000000099"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                          |
|:-------------------|:-----|:-------|:-----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                      |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                 |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                    |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                 |
| tx_id              | AN   | 30     | Transaction ID.                                      |
| request_id         | N    | 14     | Unique request ID.                                   |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value). |
| reject_reason_code | AN   | 6      | Reject reason code.                                  |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.        |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.          |

```json
{
    "api_id": "abc54321",
    "method": "refund",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "410"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Reverse

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                                |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `reverse`                                                                                 |                                                          |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                          |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                          |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                          |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                          |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                          |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                          |
| parent_tx_id  | M        | AN   | 30     | Initial authorize transaction ID.                                                                                    |                                                          |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                          |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                          |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                          |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                          |
| 3             | O        | N    | 6      | Processing code.                                                                                                     |                                                          |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                          |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                          |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                          |
| 18            | O        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                          |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                          |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions  |
| 24            | M        | N    | 3      | Function code or network international identifier (NII) : 400 - full reversal, 401 - partial reverse.                |                                                          |
| 25            | M        | N    | 4      | Point of service condition code.                                                                                     |                                                          |
| 30            | O        | N    | 19     | Original amount.                                                                                                     |                                                          |
| 37            | M        | AN   | 37     | Parent authorize Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                          |
| 35            | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                          |
| 41            | M        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                          |
| 43            | M        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                          |
| 45            | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                          |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                          |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                     |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                     |
| 56            | O        | AN   | 255    | MTI;STAN;Datetime;Tx_ID;RRNoriginal.                                                                                 |                                                          |
| 104           | M        | ANS  | 100    | Transaction desciption.                                                                                              | First three symbols (Payment transaction type indicator) |

```json
{
    "method": "reverse",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "parent_tx_id": "030001300117000005190531121252",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "400",
        "25": "4000",
        "30": "000000000300",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "45": "%YOUR_TRACK_1_DATA%",
        "49": "978",
        "56": "1100;06006606;20190522161748;030001300117000005190531121252;915000000099",
        "104": "C01"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                          |
|:-------------------|:-----|:-------|:-----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                      |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                 |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                    |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                 |
| tx_id              | AN   | 30     | Transaction ID.                                      |
| request_id         | N    | 14     | Unique request ID.                                   |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value). |
| reject_reason_code | AN   | 6      | Reject reason code.                                  |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.        |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.          |

```json
{
    "api_id": "abc54321",
    "method": "reverse",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "410"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Cash disbursement

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                          | Condition                                               |
|:--------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `cash_disbursement`                                                                       |                                                         |
| token         | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                         |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                         |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                         |
| guid          | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                         |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                         |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                                |                                                         |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                         |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                         |
| MTI           | M        | N    | 4      | Message type indicator.                                                                                              |                                                         |
| 2             | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                         |
| 4             | M        | N    | 12     | Transaction amount.                                                                                                  |                                                         |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                         |
| 14            | M        | N    | 4      | Expiration date.                                                                                                     |                                                         |
| 22            | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                         |
| 23            | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions |
| 35            | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                         |
| 37            | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                         |
| 41            | O        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                         |
| 43            | O        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                         |
| 45            | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                         |
| 49            | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                         |
| 52            | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                    |
| 53            | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                    |
| 55            | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                          |

```json
{
    "method": "cash_disbursement",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "22": "510101M03346",
        "23": "005",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "55": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                         |
|:-------------------|:-----|:-------|:----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                     |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id              | AN   | 30     | Transaction ID.                                     |
| request_id         | N    | 14     | Unique request ID.                                  |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| reject_reason_code | AN   | 6      | Reject reason code.                                 |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
    "api_id": "abc54321",
    "method": "cash_disbursement",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "210"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Balance inquiry

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Max length | Description                                                                                                          | Condition                                               |
|:--------------|:---------|:-----|:-----------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| method        | M        | AN   | 255        | Expected API method value: `balance_inquiry`                                                                         |                                                         |
| token         | M        | ANS  | 255        | Merchant token.                                                                                                      |                                                         |
| api_id        | M        | ANS  | 255        | Merchant API ID.                                                                                                     |                                                         |
| terminal_id   | M        | ANS  | 8          | Terminal API ID.                                                                                                     |                                                         |
| guid          | M        | ANS  |            | Terminal GUID.                                                                                                       |                                                         |
| initial_guid  | O        | ANS  | 36         | Initial GUID read from terminal configuration sheet.                                                                 |                                                         |
| serial_number | O        | ANS  | 64         | Device serial number.                                                                                                |                                                         |
| sign          | M        | ANS  |            | "Secret" encrypted with terminal public key.                                                                         |                                                         |
| data          | M        | ANS  |            | "Data" encrypted with terminal public key.                                                                           |                                                         |
| MTI           | M        | N    | 4          | Message type indicator.                                                                                              |                                                         |
| 2             | M        | N    | 19         | Primary account number (PAN).                                                                                        |                                                         |
| 7             | M        | N    | 14         | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                         |
| 14            | M        | N    | 4          | Expiration date.                                                                                                     |                                                         |
| 18            | O        | N    | 4          | Merchant type or merchant category code.                                                                             |                                                         |
| 22            | M        | AN   | 12         | Point of service entry mode.                                                                                         |                                                         |
| 23            | C        | N    | 3          | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions |
| 35            | O        | AN   | 37         | Track 2 data.                                                                                                        |                                                         |
| 37            | M        | AN   | 37         | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                         |
| 41            | O        | ANS  | 8          | Card acceptor terminal identification.                                                                               |                                                         |
| 43            | O        | ANS  | 40         | Card acceptor name/location.                                                                                         |                                                         |
| 45            | O        | AN   | 37         | Track 1 data.                                                                                                        |                                                         |
| 49            | M        | N    | 3          | Currency code, transaction.                                                                                          |                                                         |
| 52            | C        | HEX  | 16-32      | Personal identification number data.                                                                                 | Required for online PIN transactions                    |
| 53            | C        | N    | 16         | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                    |
| 55            | C        | AN   | 510        | ICC data.                                                                                                            | Required for Chip transactions                          |

```json
{
    "method": "balance_inquiry ",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "22": "510101M03346",
        "23": "005",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "55": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001"
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                         |
|:-------------------|:-----|:-------|:----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                     |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id              | AN   | 30     | Transaction ID.                                     |
| request_id         | N    | 14     | Unique request ID.                                  |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| reject_reason_code | AN   | 6      | Reject reason code.                                 |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
    "api_id": "abc54321",
    "method": "balance_inquiry",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000000",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "34",
        "41": "termi321",
        "49": "978",
        "MTI": "210"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## Credit

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter                                              | Notation | Type | Length | Description                                                                                                          | Condition                                                                                               |
|:-------------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|
| method                                                 | M        | AN   | 255    | Expected API method value: `credit`                                                                                  |                                                                                                         |
| token                                                  | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                                                                         |
| api_id                                                 | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                                                                         |
| terminal_id                                            | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                                                                         |
| guid                                                   | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                                                                         |
| initial_guid                                           | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                                                                         |
| serial_number                                          | O        | ANS  | 64     | Device serial number.                                                                                                |                                                                                                         |
| sign                                                   | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                                                                         |
| data                                                   | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                                                                         |
| MTI                                                    | M        | N    | 4      | Message type indicator.                                                                                              |                                                                                                         |
| data / 2                                               | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                                                                         |
| data / 3                                               | O        | N    | 6      | Processing code.                                                                                                     |                                                                                                         |
| data / 4                                               | M        | N    | 12     | Transaction amount.                                                                                                  |                                                                                                         |
| data / 7                                               | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                                                                         |
| data / 14                                              | M        | N    | 4      | Expiration date.                                                                                                     |                                                                                                         |
| data / 18                                              | M        | N    | 4      | Merchant type or merchant category code.                                                                             |                                                                                                         |
| data / 22                                              | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                                                                         |
| data / 23                                              | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions                                                 |
| data / 24                                              | O        | N    | 3      | Function code or network international identifier (NII).                                                             |                                                                                                         |
| data / 25                                              | O        | N    | 4      | Point of service condition code.                                                                                     |                                                                                                         |
| data / 35                                              | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                                                                         |
| data / 37                                              | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                                                                         |
| data / 41                                              | O        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                                                                         |
| data / 43                                              | O        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                                                                         |
| data / 45                                              | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                                                                         |
| data / 49                                              | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                                                                         |
| data / 52                                              | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                                                                    |
| data / 53                                              | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                                                                    |
| data / 55                                              | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                                                                          |
| data / 104                                             | M        | ANS  | 100    | Transaction desciption.                                                                                              | First three symbols (Payment transaction type indicator)                                                |
| data / sender_data                                     | O        | OBJ  | -      | Money sending persons personal information                                                                           |                                                                                                         |
| data / sender_data / first_name                        | C        | ANS  | 1-35   | Money sending persons first name.                                                                                    | Required MoneySend Payment transaction                                                                  |
| data / sender_data / middle_name                       | O        | ANS  | 1      | Money sending persons middle name                                                                                    |                                                                                                         |
| data / sender_data / last_name                         | C        | ANS  | 1-35   | Money sending persons last name.                                                                                     | Required MoneySend Payment transaction                                                                  |
| data / sender_data / street_address                    | C        | ANS  | 1-50   | Money sending persons street address. Required if mcc is 6536 or 6537 (MoneySend Payment)                            | Required MoneySend Payment transaction                                                                  |
| data / sender_data / city                              | O        | ANS  | 1-25   | Money sending persons city                                                                                           |                                                                                                         |
| data / sender_data / state_code                        | C        | N    | 3      | Money sending persons ISO 3166-2 state code.                                                                         | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| data / sender_data / country                           | C        | N    | 3      | Money sending persons ISO 3166-1 numeric country code.                                                               | Required MoneySend Payment transaction                                                                  |
| data / sender_data / postal_code                       | O        | ANS  | 1-10   | Money sending persons postal code                                                                                    |                                                                                                         |
| data / sender_data / date_of_birth                     | O        | N    | 8      | Money sending persons date of birth                                                                                  |                                                                                                         |
| data / sender_data / account_number_type               | O        | AN   | 2      | Sender [`Account number type`](#appendix--enum--account-number-type).                                                | If not provided will be defaulted to *03* (Card Account).                                               |
| data / sender_data / account_number                    | O        | N    | 50     | Sender account number.                                                                                               | If not provided value from field *card_number/card_token* will be filled.                               |
| data / sender_data / identification_type               | O        | N    | 2      | [`Identification type code`](#appendix--notation--identification-type)                                               |                                                                                                         |
| data / sender_data / identification_number             | O        | ANS  | 25     | Valid identification number of the Receiver.                                                                         |                                                                                                         |
| data / sender_data / identification_country_code       | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / sender_data / identification_expiration_date    | O        | N    | 8      | format `yyyyMMdd`                                                                                                    |                                                                                                         |
| data / sender_data / nationality                       | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / sender_data / country_of_birth                  | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data                                   | O        | OBJ  | -      | Money receiving persons personal information                                                                         |                                                                                                         |
| data / receiver_data / first_name                      | C        | ANS  | 1-35   | Money receiving persons first name.                                                                                  | Required MoneySend Payment transaction                                                                  |
| data / receiver_data / middle_name                     | O        | ANS  | 1      | Money receiving persons middle name                                                                                  |                                                                                                         |
| data / receiver_data / last_name                       | C        | ANS  | 1-35   | Money receiving persons last name.                                                                                   | Required MoneySend Payment transaction                                                                  |
| data / receiver_data / street_address                  | O        | ANS  | 1-50   | Money receiving persons address                                                                                      |                                                                                                         |
| data / receiver_data / city                            | O        | ANS  | 1-25   | Money receiving persons city                                                                                         |                                                                                                         |
| data / receiver_data / state_code                      | C        | N    | 3      | Money receiving persons ISO 3166-2 state code.                                                                       | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| data / receiver_data / country                         | O        | N    | 3      | Money receiving persons ISO 3166-1 numeric country code                                                              |                                                                                                         |
| data / receiver_data / postal_code                     | O        | ANS  | 1-10   | Money receiving persons postal code                                                                                  |                                                                                                         |
| data / receiver_data / date_of_birth                   | O        | N    | 8      | Money receiving persons date of birth                                                                                |                                                                                                         |
| data / receiver_data / account_number_type             | O        | AN   | 2      | Receiver [`Account number type`](#appendix--enum--account-number-type).                                              | If not provided will be defaulted to *03* (Card Account).                                               |
| data / receiver_data / account_number                  | O        | N    | 50     | Receiver account number                                                                                              |                                                                                                         |
| data / receiver_data / identification_type             | O        | N    | 2      | [`Identification type code`](#appendix--notation--identification-type)                                               |                                                                                                         |
| data / receiver_data / identification_number           | O        | ANS  | 25     | Valid identification number of the Receiver.                                                                         |                                                                                                         |
| data / receiver_data / identification_country_code     | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data / identification_expiration_date  | O        | N    | 8      | format `yyyyMMdd`                                                                                                    |                                                                                                         |
| data / receiver_data / nationality                     | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data / country_of_birth                | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / transaction_data                                | C        | OBJ  | -      | Transaction data.                                                                                                    |                                                                                                         |
| data / transaction_data / unique_transaction_reference | O        | ANS  | 1-19   | Unique transaction reference code                                                                                    |                                                                                                         |
| data / transaction_data / additional_message           | O        | ANS  | 1-65   | Additional message                                                                                                   |                                                                                                         |
| data / transaction_data / funding_source               | O        | N    | 2      | [`Funding source`](#appendix--notation--funding-source).                                                             | If not provided will be calculated from BIN of PAN which is provided in field *card_number/card_token*. |
| data / transaction_data / participation_id             | O        | AN   | 30     | Participation ID of sender                                                                                           |                                                                                                         |
| data / transaction_data / transaction_purpose          | O        | N    | 2      | Transaction purpose details                                                                                          |                                                                                                         |

```json
{
    "method": "credit",
    "token": "cba",
    "api_id": "abc54321",
    "terminal_id": "termi321",
    "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
    "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
    "serial_number": "00001504100A0042302",
    "api_version": "1.0",
    "data": {
        "MTI": "1100",
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "12": "190522",
        "13": "1617",
        "14": "3010",
        "18": "1001",
        "22": "510101M03346",
        "23": "005",
        "24": "100",
        "25": "1503",
        "35": "%YOUR_TRACK_2_DATA%",
        "37": "915000000099",
        "41": "t_pos111",
        "43": "Test Bank London GBRTest Bank London GBR",
        "49": "978",
        "55": "9F2608CC6C7A61E21445769F100807000103A0B800019F2701809F370466E4C3D19F36020010950508880488009A031905219C01009F02060000000100005F2A02056682027C009F1A0205669F03060000000000009F3303E0E9C89F34034203009F3501229F1E0830303030303132338408A0000003330101019F090200309F410400000001",
        "104": "C07",
        "receiver_data": {
            "first_name": "Mick",
            "middle_name": "B",
            "last_name": "McCann",
            "street_address": "20 Lower Bridge St",
            "state_code": "L",
            "country": "372",
            "account_number_type": "03",
            "account_number": "%RECEIVER_CARD_NUMBER%"
        },
        "sender_data": {
            "first_name": "Mick",
            "middle_name": "B",
            "last_name": "McCann",
            "street_address": "20 Lower Bridge St",
            "state_code": "L",
            "country": "372",
            "account_number_type": "03",
            "account_number": "%SENDER_CARD_NUMBER%"
        },
        "transaction_data": {
            "additional_message": "222",
            "funding_source": "05",
            "participation_id": "44",
            "transaction_purpose": "00"
        }
    },
    "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter          | Type | Length | Description                                         |
|:-------------------|:-----|:-------|:----------------------------------------------------|
| method             | AN   | 255    | API action (echo from request).                     |
| api_id             | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id      | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id        | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id              | AN   | 30     | Transaction ID.                                     |
| request_id         | N    | 14     | Unique request ID.                                  |
| status             | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| reject_reason_code | AN   | 6      | Reject reason code.                                 |
| sign               | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data               | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
    "api_id": "abc54321",
    "method": "credit",
    "api_version": "1.0",
    "terminal_id": "termi321",
    "tx_id": "030001300117000005190531121252",
    "sale_point_id": "abc54321",
    "request_id": "15593047722999",
    "status": "success",
    "reject_reason_code": "00000",
    "data": {
        "2": "%YOUR_CARD_NUMBER%",
        "3": "000000",
        "4": "000000000300",
        "7": "20190522161748",
        "11": "000005",
        "37": "915000000099",
        "39": "00",
        "41": "termi321",
        "49": "978",
        "MTI": "0110"
    },
    "sign": "EjBktMqOVj1hLEkfFV1rrByGXp6m5ANnuojQjIj2o6K9XTx5AuNCb4kEeMKrzq66UMmwcWvxm0rSEPr5yNVIf8CrYluQfTUBBm/GVSgHA5+s+bbt/LarXnlVLJ+ITFs6JHdPkb/Fv7aEyb9sB7+pA7k8Mu9Xvyb+ZoKgYZR2EfMHyBLPJ0nNhWO5msZnGR8Rus1GUDh+YjXU2CetvgO5VGLrDfsmQGCMxBDpAPuE53sLzek+d7t7nnn6qlgg2OZ4y9kiceKWZLO5D+ywRSdh+sKLiGwwIBFZ1FXpJtFZXNDDWq3OSt2Bqna7ykgpjFDVr+BsRgptLqopQ1K+CArfeT/JXSoghbwMAt5lvTsh1fdiSxCE3Kl0h7LEUeaaOZ2xz4VphGCM9YMXh06dKtdqqZGa2PjQAhx0OxBt9GrFyjs8UWHEh9wX3+RWr7yzIbpFGRffYi6JTz0nE3/yy+JK4JaTadZr7/L4iYsZRZrrfGuqnRD3Y28tpTxt/rQL7DHb"
}
```

## P2P transaction

| URL           |
|---------------|
| /tapi/request |

**Note: The MCC code is applied automatically for Mastercard MoneySend operations when doing P2P transaction request:**

* 6536 used for intra-country payment.
* 6537 used for inter-country payment.
* 6538 used for MoneySend funding.

### Request

| Parameter                                              | Notation | Type | Length | Description                                                                                                          | Condition                                                                                               |
|:-------------------------------------------------------|:---------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|
| method                                                 | M        | AN   | 255    | Expected API method value: `p2p_transaction`                                                                         |                                                                                                         |
| token                                                  | M        | ANS  | 255    | Merchant token.                                                                                                      |                                                                                                         |
| api_id                                                 | M        | ANS  | 255    | Merchant API ID.                                                                                                     |                                                                                                         |
| terminal_id                                            | M        | ANS  | 8      | Terminal API ID.                                                                                                     |                                                                                                         |
| guid                                                   | M        | ANS  |        | Terminal GUID.                                                                                                       |                                                                                                         |
| initial_guid                                           | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.                                                                 |                                                                                                         |
| serial_number                                          | O        | ANS  | 64     | Device serial number.                                                                                                |                                                                                                         |
| sign                                                   | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                         |                                                                                                         |
| data                                                   | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                           |                                                                                                         |
| MTI                                                    | M        | N    | 4      | Message type indicator.                                                                                              |                                                                                                         |
| data / 2                                               | M        | N    | 19     | Primary account number (PAN).                                                                                        |                                                                                                         |
| data / 3                                               | O        | N    | 6      | Processing code.                                                                                                     |                                                                                                         |
| data / 4                                               | M        | N    | 12     | Transaction amount.                                                                                                  |                                                                                                         |
| data / 7                                               | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                           |                                                                                                         |
| data / 14                                              | M        | N    | 4      | Expiration date.                                                                                                     |                                                                                                         |
| data / 22                                              | M        | AN   | 12     | Point of service entry mode.                                                                                         |                                                                                                         |
| data / 23                                              | C        | N    | 3      | Application PAN sequence number.                                                                                     | Always required except for magnetic stripe transactions                                                 |
| data / 24                                              | O        | N    | 3      | Function code or network international identifier (NII).                                                             |                                                                                                         |
| data / 25                                              | O        | N    | 4      | Point of service condition code.                                                                                     |                                                                                                         |
| data / 35                                              | O        | AN   | 37     | Track 2 data.                                                                                                        |                                                                                                         |
| data / 37                                              | M        | AN   | 37     | Retrieval Reference Number (YDDDIDNNNNNN).                                                                           |                                                                                                         |
| data / 41                                              | O        | ANS  | 8      | Card acceptor terminal identification.                                                                               |                                                                                                         |
| data / 43                                              | O        | ANS  | 40     | Card acceptor name/location.                                                                                         |                                                                                                         |
| data / 45                                              | O        | AN   | 37     | Track 1 data.                                                                                                        |                                                                                                         |
| data / 49                                              | M        | N    | 3      | Currency code, transaction.                                                                                          |                                                                                                         |
| data / 52                                              | C        | HEX  | 16-32  | Personal identification number data.                                                                                 | Required for online PIN transactions                                                                    |
| data / 53                                              | C        | N    | 16     | [`Security related control information (ISO 8583 DE53)`](#appendix--notation--security-related-control-information). | Required for online PIN transactions                                                                    |
| data / 55                                              | C        | AN   | 510    | ICC data.                                                                                                            | Required for Chip transactions                                                                          |
| data / 104                                             | M        | ANS  | 100    | Transaction desciption.                                                                                              | First three symbols (Payment transaction type indicator)                                                |
| data / credit_amount                                   | O        | N    | 1-20   | Credit transaction amount in cents. Transaction amount is used if this field is empty                                |                                                                                                         |
| data / credit_currency                                 | O        | N    | 3      | Credit transaction ISO Numeric currency code. Transaction currency is used if this field is empty                    |                                                                                                         |
| data / sender_data                                     | O        | OBJ  | -      | Money sending persons personal information                                                                           |                                                                                                         |
| data / sender_data / first_name                        | M        | ANS  | 1-35   | Money sending persons first name.                                                                                    | Required MoneySend Payment transaction                                                                  |
| data / sender_data / middle_name                       | O        | ANS  | 1      | Money sending persons middle name                                                                                    |                                                                                                         |
| data / sender_data / last_name                         | M        | ANS  | 1-35   | Money sending persons last name.                                                                                     | Required MoneySend Payment transaction                                                                  |
| data / sender_data / street_address                    | M        | ANS  | 1-50   | Money sending persons street address. Required if mcc is 6536 or 6537 (MoneySend Payment)                            | Required MoneySend Payment transaction                                                                  |
| data / sender_data / city                              | M        | ANS  | 1-25   | Money sending persons city                                                                                           |                                                                                                         |
| data / sender_data / state_code                        | C        | N    | 3      | Money sending persons ISO 3166-2 state code.                                                                         | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| data / sender_data / country                           | M        | N    | 3      | Money sending persons ISO 3166-1 numeric country code.                                                               | Required MoneySend Payment transaction                                                                  |
| data / sender_data / postal_code                       | O        | ANS  | 1-10   | Money sending persons postal code                                                                                    |                                                                                                         |
| data / sender_data / date_of_birth                     | O        | N    | 8      | Money sending persons date of birth                                                                                  |                                                                                                         |
| data / sender_data / account_number_type               | O        | AN   | 2      | Sender [`Account number type`](#appendix--enum--account-number-type).                                                | If not provided will be defaulted to *03* (Card Account).                                               |
| data / sender_data / account_number                    | O        | N    | 50     | Sender account number.                                                                                               | If not provided value from field *card_number/card_token* will be filled.                               |
| data / sender_data / identification_type               | O        | N    | 2      | [`Identification type code`](#appendix--notation--identification-type)                                               |                                                                                                         |
| data / sender_data / identification_number             | O        | ANS  | 25     | Valid identification number of the Receiver.                                                                         |                                                                                                         |
| data / sender_data / identification_country_code       | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / sender_data / identification_expiration_date    | O        | N    | 8      | format `yyyyMMdd`                                                                                                    |                                                                                                         |
| data / sender_data / nationality                       | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / sender_data / country_of_birth                  | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data                                   | O        | OBJ  | -      | Money receiving persons personal information                                                                         |                                                                                                         |
| data / receiver_data / first_name                      | M        | ANS  | 1-35   | Money receiving persons first name.                                                                                  | Required MoneySend Payment transaction                                                                  |
| data / receiver_data / middle_name                     | O        | ANS  | 1      | Money receiving persons middle name                                                                                  |                                                                                                         |
| data / receiver_data / last_name                       | M        | ANS  | 1-35   | Money receiving persons last name.                                                                                   | Required MoneySend Payment transaction                                                                  |
| data / receiver_data / street_address                  | O        | ANS  | 1-50   | Money receiving persons address                                                                                      |                                                                                                         |
| data / receiver_data / city                            | O        | ANS  | 1-25   | Money receiving persons city                                                                                         |                                                                                                         |
| data / receiver_data / state_code                      | C        | N    | 3      | Money receiving persons ISO 3166-2 state code.                                                                       | Required MoneySend Payment transaction if country is USA or Canada.                                     |
| data / receiver_data / country                         | M        | N    | 3      | Money receiving persons ISO 3166-1 numeric country code                                                              |                                                                                                         |
| data / receiver_data / postal_code                     | O        | ANS  | 1-10   | Money receiving persons postal code                                                                                  |                                                                                                         |
| data / receiver_data / date_of_birth                   | O        | N    | 8      | Money receiving persons date of birth                                                                                |                                                                                                         |
| data / receiver_data / account_number_type             | O        | AN   | 2      | Receiver [`Account number type`](#appendix--enum--account-number-type).                                              | If not provided will be defaulted to *03* (Card Account).                                               |
| data / receiver_data / account_number                  | M        | N    | 50     | Receiver account number                                                                                              |                                                                                                         |
| data / receiver_data / identification_type             | O        | N    | 2      | [`Identification type code`](#appendix--notation--identification-type)                                               |                                                                                                         |
| data / receiver_data / identification_number           | O        | ANS  | 25     | Valid identification number of the Receiver.                                                                         |                                                                                                         |
| data / receiver_data / identification_country_code     | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data / identification_expiration_date  | O        | N    | 8      | format `yyyyMMdd`                                                                                                    |                                                                                                         |
| data / receiver_data / nationality                     | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / receiver_data / country_of_birth                | O        | N    | 3      | ISO 3166-1 numeric country code                                                                                      |                                                                                                         |
| data / transaction_data                                | C        | OBJ  | -      | Transaction data.                                                                                                    |                                                                                                         |
| data / transaction_data / unique_transaction_reference | O        | ANS  | 1-19   | Unique transaction reference code                                                                                    |                                                                                                         |
| data / transaction_data / additional_message           | O        | ANS  | 1-65   | Additional message                                                                                                   |                                                                                                         |
| data / transaction_data / funding_source               | O        | N    | 2      | [`Funding source`](#appendix--notation--funding-source).                                                             | If not provided will be calculated from BIN of PAN which is provided in field *card_number/card_token*. |
| data / transaction_data / participation_id             | O        | AN   | 30     | Participation ID of sender                                                                                           |                                                                                                         |
| data / transaction_data / transaction_purpose          | O        | N    | 2      | Transaction purpose details                                                                                          |                                                                                                         |

```json
{
  "api_version": "1.0",
  "method": "p2p_transaction",
  "token": "cba",
  "api_id": "abc54321",
  "sale_point_id": "abc54321",
  "terminal_id": "termi321",
  "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
  "pure_json": {
    "2": "%YOUR_CARD_NUMBER%",
    "4": "00005000",
    "7": "20190927160955",
    "14": "2512",
    "22": "510101654340",
    "37": "000000000001",
    "49": "978",
    "104": "C07",
    "credit_amount" : "2000",
    "credit_currency": "840",
    "receiver_data": {
      "first_name": "John",
      "last_name": "Smith",
      "country": "372",
      "account_number_type": "03",
      "account_number": "%RECEIVER_CARD_NUMBER%"
    },
    "sender_data": {
      "first_name": "Mick",
      "last_name": "McCann",
      "street_address": "20 Lower Bridge St",
      "country": "372",
      "city": "London",
      "account_number": "%RECEIVER_CARD_NUMBER%"
    },
    "transaction_data": {
      "additional_message": "222",
      "funding_source": "05",
      "participation_id": "44",
      "transaction_purpose": "00"
    }
  }
}
```

### Response

| Parameter                                      | Notation | Type | Length | Description                                                                                                                                                                         |
|:-----------------------------------------------|:---------|:-----|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| method                                         | M        | AN   | 255    | API action (echo from request).                                                                                                                                                     |
| api_id                                         | M        | ANS  | 255    | Merchant API ID (echo from request).                                                                                                                                                |
| sale_point_id                                  | M        | ANS  | 255    | SalePoint API ID.                                                                                                                                                                   |
| terminal_id                                    | M        | ANS  | 8      | Terminal API ID (echo from request).                                                                                                                                                |
| tx_id                                          | M        | AN   | 30     | Transaction ID.                                                                                                                                                                     |
| request_id                                     | M        | N    | 14     | Unique request ID.                                                                                                                                                                  |
| status                                         | M        | AN   | 255    | [`Status value`](#appendix--notation--status-value)                                                                                                                                 |
| reject_reason_code                             | M        | AN   | 6      | Reject reason code.                                                                                                                                                                 |
| sign                                           | M        | ANS  | 255    | "Secret" encrypted with terminal private key.                                                                                                                                       |
| data                                           | M        | ANS  | 255    | "Data" encrypted with terminal private key.                                                                                                                                         |
| data / p2p_funding                             | M        | OBJ  | -      | Information about the funding transaction                                                                                                                                           |
| data / p2p_funding / response_code             | M        | AN   | 2      | [`Response Codes`](#appendix--notation--response-codes)                                                                                                                             |
| data / p2p_funding / transaction_amount        | ME       | N    | 12     | Transaction amount                                                                                                                                                                  |
| data / p2p_funding / transaction_currency      | M        | N    | 3      | ISO Numeric currency code                                                                                                                                                           |
| data / p2p_funding / authorization_id_response | C        | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. Returned only if transaction has been aprooved by issuer. |
| data / p2p_funding / tx_id                     | M        | N    | 30     | Transaction ID                                                                                                                                                                      |
| data / p2p_funding / card_acceptor_data        | O        | ANS  | 1-40   | Card acceptor data                                                                                                                                                                  |
| data / p2p_credit                              | C        | OBJ  | -      | Information about the credit transaction. Returned only if credit response is present.                                                                                              |
| data / p2p_credit / response_code              | M        | AN   | 2      | [`Response Codes`](#appendix--notation--response-codes)                                                                                                                             |
| data / p2p_credit / transaction_amount         | ME       | N    | 1-12   | Transaction amount                                                                                                                                                                  |
| data / p2p_credit / transaction_currency       | M        | N    | 3      | ISO Numeric currency code                                                                                                                                                           |
| data / p2p_credit / authorization_id_response  | C        | AN   | 6      | Schemas unique number that identifies the transaction with a specific POS terminal within a specific 24 hour time period. Returned only if transaction has been aprooved by issuer. |
| data / p2p_credit / tx_id                      | M        | N    | 30     | Transaction ID                                                                                                                                                                      |
| data / p2p_credit / card_acceptor_data         | O        | ANS  | 1-40   | Card acceptor data                                                                                                                                                                  |

```json
{
  "api_id": "abc54321",
  "method": "p2p_transaction",
  "api_version": "1.0",
  "terminal_id": "termi321",
  "sale_point_id": "abc54321",
  "request_id": "16105303713419",
  "status": "success",
  "data": "0pPVSbQvwVouIi2D/Xyhb4TZqsaSOr6AaHHN68ObLul38dj745+UmxJwGqLNg1ObJOneLIJ7rlYXxmRg4ZvsVbdQiJjO69KgWKhcC2gXF8onQGAbOysG343ywc+LIqO4GL1IpCZlMwXoxWqoM09KGyR6l3UN27k8ikjUDV/XkXUMz/gQteusF0eDxa9tyeuIengy3rogb7cUpXyjop44gwsaRKGHcTkVFZCy4lzKxaKt6D2Y5LwYxvMzzIs0/V38RoPdwgrr4QBhtS2lHd9TF7zuqCdS4vRhOuhODzt5mbG+WdyyprEn/QgcbiVNixUsI+7PHQSEkcaBmmdbgNCBflqIJC7Xpq7HZPc8D2Rn0TKJ6B21vsfcNZftKSMJhhTuZgxi76Xtbn9ZU9o/i+3CUUAMbIGm3uyIwvyJDiNrjYlVX3JW1bAhmCf6XC3laHhwl8Nk2E8MOL1PeGt7YgVKoxXB7pwbyHAZKv/zfj+FJJZPbYcOdNp1n2wvn7dVLJhwrvz8zjk/17/jra1zdXUIe5pt4rl5leW9vstRGg3zPVy9zjSaVx38mSBA7tnM7fb2IqadXityfVufK3TjXzYPW5baeKKRmKgKUqU/j/3Oyw1qMTxL9Krf6fzHMduTkKFZZPjspeM2aIEmsszyvUWwzT6k9hlX+9HL3cfrYGh/Ko9b824RztigaLd8eY/63bOe8ff6Dz6QCF5aVUYk8OavQGlls5/gJxJdR5OB1OuPv6erltY2GSL/J4mA4FiWql8mNip0HrfeMs9450B7QyS3WM4KF/BliM7yzeSqI2WvyHABtdExV8xaNbVkNYf0FYLBWMqiqQWyTpB75laFou4V/B4QWxkFWM4agSkPd9YzUZ/e9u/u/jDR5J6SHhDaxhgdgu2mR7NT5xZYwqpkGb9ixerHSfIXBT420JvqBQ==",
  "tx_id": "000000200004000015210113093257",
  "reject_reason_code": "0000",
  "pure_json": {
    "2": "%YOUR_CARD_NUMBER%",
    "3": "280000",
    "4": "000000002000",
    "7": "20210113093257",
    "11": "000015",
    "37": "011300000015",
    "38": "976448",
    "39": "00",
    "41": "termi321",
    "49": "840",
    "MTI": "0110",
    "p2p_funding": "{\"response_code\":\"00\",\"transaction_amount\":\"5000\",\"transaction_currency\":\"978\",\"tx_id\":\"000000200004000014210113093251\",\"authorization_id_response\":\"961908\",\"card_acceptor_data\":\"The Shard SE1 9SG London GBR\"}",
    "p2p_credit": "{\"response_code\":\"00\",\"transaction_amount\":\"2000\",\"transaction_currency\":\"840\",\"tx_id\":\"000000200004000015210113093257\",\"authorization_id_response\":\"976448\",\"card_acceptor_data\":\"The Shard SE1 9SG London GBR\"}"
  },
  "sign": "KVRxAsTHhQxQXD8S1jT4rjOBeJK949Xny4gRNpVjBaLNHYVQNToKGbQ1e1kaLQpZIl281hzZbxrp9eT5nkdGr/B0exsPcu+iTeBz/jlv930OIqtFoItwsHIX42dPwu14WJQHPeIkTdGTwLbrRfhWg5YFXiAD93UAPRKyQcT/a7C228/0WRyyqxp+MbqJ55jHgjYu5lcfeYKXhi8cSVoG+/DtT9COmXmYZaYUeTaa3PAC+ouBnI/jco+eKYvW/ITcF73PRvK9jnaI853nD9Txbp01jBTclpBtBXDTQ+/k8y+FMs+CgEYC5q7GAtnVduwIdb8ImTj/Z5GKJnwf0DDkGYgtZ6QQjSqAKHs/MjWY9bRm8aktExd+aaOyQVIb5VoAJVln605rZ6PJTNAi3owx/VGAh+TVEACyodAchZruhepLV2u4iW7HDlPjkICrPearXA1NgndxhEfeg+PIOlr93lZVJ+Ewy2jsLXyYCNHKmeE+FXNG5BfiYO5U3V1puBLV"
}
```

## Capture

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                          | Condition |
|:--------------|:---------|:-----|:-------|:-----------------------------------------------------|:----------|
| method        | M        | AN   | 255    | Expected API method value: `capture`                 |           |
| token         | M        | ANS  | 255    | Merchant token.                                      |           |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                     |           |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                     |           |
| guid          | M        | ANS  |        | Terminal GUID.                                       |           |
| initial_guid  | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet. |           |
| serial_number | O        | ANS  | 64     | Device serial number.                                |           |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.         |           |
| parent_tx_id  | M        | N    | 255    | Initial authorize transaction ID.                    |           |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.           |           |
| MTI           | M        | N    | 4      | Message type indicator.                              |           |
| 4             | M        | N    | 12     | Transaction amount.                                  |           |

```json
{
  "method": "capture",
  "token": "cba",
  "api_id": "abc54321",
  "terminal_id": "termi321",
  "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
  "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
  "serial_number": "00001504100A0042302",
  "api_version": "1.0",
  "parent_tx_id": "030001300117000005190531121252",
  "data": {
    "4": "000000000300"
  },
  "sign": "EzR2$5OG0QqqbGZxQPXbWH0c6+zbB9YTMUbaP0jhni45c9uzT+tHMj1MdJ+p/ovwEORSsWA7AaDiO1+/ZWpF5mi/R7OApXzzdvqNrXxolCDRuZG0Tn0//2M3W9JWKM3iAlyxFlsp7uX3CKQ4rOTZ+nl/aL6AO+27Qsj58z/VCRyuUpu73TueTK1+IblVIXF9Cx9RsenaKwmskW6qLAdyV+Zb/RQdQL+Aug7HdQSeOQ5aujb0BzGzGpRLVTI8zw7dGoVcCkkhI/zYb3PdRCQY5RYlcIo+T3oiiRGmGKK3oSepfBlAH/9NQmtbYaTSrYMuH/ZuhR9tDQ4Oy5Xq6tdPZ6yO2W/lqrtN7qLQ+p0m0RQWM/OR68Dwt01QdG5RrtajgLXpaIHw532X6aIQiZqVgYa/WTCBe1hYM6dzqUVcLTWinvhRLGGUehSV6rtf4vOzxj3lxfKXucswddBjXOBmg8gfhBWH3Hc5o+C4VnUIBL2dQMc0V0YNH8Xo2fqMSxzWfngQ/$3vUCAHXykXFrKBi96rOYnddmLeEzyMjob0wCtmnBZg1wRqpGx0dItnvEsqdOfZKt2iYMotWPe0v3YhN1d89Z/xLNwXke5N0rYZs+UO0n3bUECLitbD1X/zg6wanM3Q==$59d688739008dba5"
}
```

### Response

| Parameter     | Type | Length | Description                                         |
|:--------------|:-----|:-------|:----------------------------------------------------|
| method        | AN   | 255    | API action (echo from request).                     |
| api_id        | ANS  | 255    | Merchant API ID (echo from request).                |
| sale_point_id | ANS  | 255    | SalePoint API ID.                                   |
| terminal_id   | ANS  | 8      | Terminal API ID (echo from request).                |
| tx_id         | AN   | 30     | Transaction ID.                                     |
| request_id    | N    | 14     | Unique request ID.                                  |
| status        | AN   | 255    | [`Status value`](#appendix--notation--status-value) |
| sign          | ANS  | 255    | "Secret" encrypted with terminal private key.       |
| data          | ANS  | 255    | "Data" encrypted with terminal private key.         |

```json
{
  "api_id": "abc54321",
  "method": "capture",
  "api_version": "1.0",
  "terminal_id": "termi321",
  "sale_point_id": "abc54321",
  "request_id": "15700026990536",
  "status": "success",
  "tx_id": "000000200003000003191002074941",
  "data": {
    "4": "000000000300",
    "15": "000000200003000003191002074941",
    "39": "00",
    "49": "978",
    "57": "915000000011"
  },
  "sign": "VFsyhpahngcRH3kCn2kT5gcBawj8tZ7MLpBTSK0WPiC9F2HlXeJ8s+AKt6S4UY3KNTH/ISA4nuoxDYaQrjcIlBFgnKXobTYe6REgYg4QGa9QzBRjmiE3TPthKEYTHCpqkU48oZ4OewXicFfGRZSPEGME+1Pj8cgoHRBAPbuN7oYmx5J81eFvSsLOR/Yjj0X6sn6/g+pwTILPOSyEfAfXpQ7Gh6s72ovzw/Et2Fq2zgOqktPOKOmDt7Tabd1BSTk4uTKVc2YKPSim7J9K6ctvIvRYB/INpA15zoivpVNHxjyzA6Ou3MRjWyZkEa0TNJQa0A7BF3dYHGXh1yy532muG1aLRrCo0v0BvcDy6fJ+12Qig1WE3VSplSfWDxDOm6O3hEvytQPhsYwmAq3tGCd+00O9z8uD/URk7EOFOSCHuc+RyHOiUuFXfamwLUsZaw1j6ogVCQH8Uc/dJ9wNthz6+ywZKP/tlROfMhiXAIbiDKWaOSjkwQmWzekshtb9J28N"
}
```

## Terminal config

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter     | Notation | Type | Length | Description                                                                                                   |
|:--------------|:---------|:-----|:-------|:--------------------------------------------------------------------------------------------------------------|
| method        | M        | AN   | 255    | Expected API method value: `terminal_config`                                                                  |
| token         | M        | ANS  | 255    | Merchant token.                                                                                               |
| api_id        | M        | ANS  | 255    | Merchant API ID.                                                                                              |
| terminal_id   | M        | ANS  | 8      | Terminal API ID.                                                                                              |
| guid          | M        | ANS  | 36     | Terminal GUID.                                                                                                |
| initial_guid  | C        | ANS  | 36     | Initial GUID read from terminal configuration sheet. Must be sent only on first/initial terminal config call. |
| serial_number | O        | ANS  | 64     | Device serial number.                                                                                         |
| sign          | M        | ANS  |        | "Secret" encrypted with terminal public key.                                                                  |
| data          | M        | ANS  |        | "Data" encrypted with terminal public key.                                                                    |
| 7             | M        | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                    |

```json
{
  "method": "terminal_config",
  "token": "cba",
  "terminal_id": "termi321",
  "api_id": "abc54321",
  "api_version": "1.0",
  "initial_guid": "18a3ad4d-252d-41b5-b641-07a7caf20a66",
  "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
  "serial_number": "00001504100A0042302",
  "data": {
    "7": "20190724102011"
  },
  "sign": "aJeRlqzWZAS3Z7LyOLZNrg/6MzRjp1UDhwhnQyff9QVC0BIspUDzt80pRc/IJ62Fa31VHBu9Le2fx8qp3AfIAQ3CUx/HVdsoVxoFNXo6EsNID92rAWZtsGn3IEUmwAbhL3jgsEiF+r1/jGOGsFo5IdV0zAIiF8df/ehj1DDvtgigf6sXWw+4JMVLtmhPMygaPNG+7gP6nGty5O4Fya+WhxTD3TEgLQmOO98ZWj0mrpw4/wCTo/TQCIRyQtkRTV5OMjLs+UyBrqK1U2ffapKh7trB9e9X7ofnGtbUnUHOWDO11JmwpKq8ZvuaHzp5xiVadkX9gSwJLOFHRQiX0JamV2kadefCj2Fn0SGBi1LQh+BG9enMhb37k267EdVyhxO/wCUA6+uQRfoKBgf57tYgSPIwCUQrd4iCK3Mz4vgVlpc4Tgxc5qNhox2qSJWhC/YUiUVwztcvi3bbywUpE3GcZ7+7/Uv/acw/1JJdWxxCu4zy7DQl7EFHcx+5C2AcnrbZ"
}
```

### Response

| Parameter                                                            | Type | Length | Description                                                                                                                      |
|:---------------------------------------------------------------------|:-----|:-------|:---------------------------------------------------------------------------------------------------------------------------------|
| method                                                               | AN   | 255    | Expected API method value: `terminal_config`                                                                                     |
| api_id                                                               | ANS  | 255    | Merchant API ID (echo from request).                                                                                             |
| sale_point_id                                                        | ANS  | 255    | SalePoint API ID.                                                                                                                |
| terminal_id                                                          | ANS  | 8      | Terminal API ID (echo from request).                                                                                             |
| request_id                                                           | N    | 14     | Unique request ID.                                                                                                               |
| status                                                               | AN   | 255    | `Success` / `Error`.                                                                                                             |
| sign                                                                 | ANS  | 255    | "Secret" encrypted with terminal private key.                                                                                    |
| terminal_config_version                                              | N    | 10     | Terminal config version                                                                                                          |
| device_config_version                                                | N    | 10     | Device config version                                                                                                            |
| data                                                                 | ANS  | 255    | "Data" encrypted with terminal private key.                                                                                      |
| data / MTI                                                           | N    | 4      | Message type indicator.                                                                                                          |
| data / 7                                                             | N    | 14     | Transmission date & time (YYYYMMDDhhmmss).                                                                                       |
| data / 18                                                            | N    | 255    | Merchant category codes.                                                                                                         |
| data / 22                                                            | N    | 12     | Terminal POS data.                                                                                                               |
| data / 24                                                            | N    | 3      | Function code.                                                                                                                   |
| data / 25                                                            | N    | 4      | Message reason code.                                                                                                             |
| data / 39                                                            | N    | 3      | Action code.                                                                                                                     |
| data / 41                                                            | ANS  | 8      | Card acceptor terminal identifier.                                                                                               |
| data / 43                                                            | ANS  | 40     | Card acceptor name/location.                                                                                                     |
| data / 49                                                            | N    | 3      | Currency code, transaction.                                                                                                      |
| data / 120                                                           | ANS  | 33     | MAC key.                                                                                                                         |
| data / 121                                                           | ANS  | 33     | TPK key.                                                                                                                         |
| data / 122                                                           | ANS  | 33     | TEK key.                                                                                                                         |
| data / 123                                                           | ANS  | 255    | TMK under KLK key.                                                                                                               |
| data / 125                                                           | ANS  | 255    | Terminal password.                                                                                                               |
| data / 127                                                           | N    | 3      | Country code.                                                                                                                    |
| data / 804                                                           | OBJ  | -      | Additional terminal configuration fields.                                                                                        |
| data / 804 / active                                                  | N    | 1      | Terminal status. Available values '0', '1'.                                                                                      |
| data / 804 / user_pass_mode                                          | N    | 1      | [`Password modes`](#appendix--notation--password-mode)                                                                           |
| data / 804 / terminal_type                                           | AN   | 3      | [`Terminal types`](#appendix--notation--terminal-type)                                                                           |
| data / 804 / receipt                                                 | OBJ  | -      | Salepoint information which will apear on receipt.                                                                               |
| data / 804 / receipt / logo                                          | ANS  | -      | Terminal base64 image (PNG format). Returns NULL if not present.                                                                 |
| data / 804 / receipt / address                                       | ANS  | 255    | Full sale point address, it will be used on receipt.                                                                             |
| data / 804 / receipt / website                                       | ANS  | 255    | Sale point website url.                                                                                                          |
| data / 804 / receipt / phone                                         | ANS  | 255    | Sale point phone number.                                                                                                         |
| data / 804 / receipt / additional_info_1                             | ANS  | 255    | Additional information for POS receipt.                                                                                          |
| data / 804 / receipt / additional_info_2                             | ANS  | 255    | Additional information for POS receipt.                                                                                          |
| data / 804 / available_operations                                    | OBJ  | -      | Available operation object. Type and limits.                                                                                     |
| data / 804 / available_operations / type                             | AN   | 50     | [`Available operations`](#appendix--notation--available-operations).                                                             |
| data / 804 / available_operations / limits                           | OBJ  | -      | Terminal limits object.                                                                                                          |
| data / 804 / available_operations / limits / amount                  | OBJ  | -      | Amount object. Limits amount in cents.                                                                                           |
| data / 804 / available_operations / limits / amount / per_tx         | N    | -      | Limit per transaction.                                                                                                           |
| data / 804 / available_operations / limits / amount / daily          | N    | -      | Limit per day.                                                                                                                   |
| data / 804 / available_operations / limits / amount / weekly         | N    | -      | Limit per week.                                                                                                                  |
| data / 804 / available_operations / limits / amount / monthly        | N    | -      | Limit per month.                                                                                                                 |
| data / 804 / available_operations / limits / count                   | OBJ  | -      | Count object. Transactions count per day.                                                                                        |
| data / 804 / available_operations / limits / count  / daily          | N    | 10     | Count per day.                                                                                                                   |
| data / 804 / available_operations / limits / count  / weekly         | N    | 10     | Count per week.                                                                                                                  |
| data / 804 / available_operations / limits / count  / monthly        | N    | 10     | Count per month.                                                                                                                 |
| data / 804 / available_operations / limits / pin_floor_limits        | OBJ  | -      | Pin floor limits object. Transaction limits without pin per scheme in cents. [`Available schemes`](#appendix--notation--schemes) |
| data / 804 / available_operations / limits / pin_floor_limits / MC   | N    | -      | Limit for scheme MC.                                                                                                             |
| data / 804 / available_operations / limits / pin_floor_limits / VISA | N    | -      | Limit for scheme VISA.                                                                                                           |
| data / 804 / available_operations / limits / pin_floor_limits / UPI  | N    | -      | Limit for scheme UPI.                                                                                                            |
| data / 804 / available_operations / limits / pin_floor_limits / JCB  | N    | -      | Limit for scheme JCB.                                                                                                            |

```json
{
  "api_id": "abc54321",
  "method": "terminal_config",
  "api_version": "1.0",
  "terminal_id": "termi321",
  "sale_point_id": "abc54321",
  "request_id": "15605174266115",
  "status": "success",
  "terminal_config_version": "1567433452",
  "device_config_version": "1567433453",
  "data": {
    "MTI": "1810",
    "7": "20190724102011",
    "18": "[\"5999\",\"6538\",\"6536\",\"6537\"]",
    "22": "000050S00110",
    "24": "100",
    "25": "1503",
    "39": "00",
    "41": "termi321",
    "43": "The Shard SE1 9SG      London         GB",
    "49": "[\"156\",\"344\",\"826\",\"840\",\"978\"]",
    "120": "M7C52AF3A4EEAC89F68E189358089DE04",
    "121": "U7C52AF3A4EEAC89F68E189358089DE04",
    "122": "T7C52AF3A4EEAC89F68E189358089DE04",
    "123": "U7C52AF3A4EEAC89F68E189358089DE05",
    "125": "newPass123",
    "127": "440",
    "804": "{\"active\":\"1\",\"user_pass_mode\":\"0\",\"terminal_type\":\"21h\",\"receipt\":{\"logo\":null,\"address\":null,\"website\":null,\"phone\":null,\"additional_info1\":null,\"additional_info2\":null},\"available_operations\":{\"type\":\"sale\",\"limits\":{\"amount\":{\"per_tx\":null,\"daily\":null,\"weekly\":null,\"monthly\":null},\"count\":{\"daily\":null,\"weekly\":null,\"monthly\":null},\"pin_floor_limits\":{\"MC\":null,\"VISA\":null,\"UPI\":null,\"JCB\":null}}}}"
  },
  "sign": "E9AQHq7Uuu8k0Ucrb2W6MzZ9Btzcp39FXBMHPyd8Htt4ZQuJQlrkfKLyD2hkt5SDZ/yWjtn++URjqnPPPvJOPgn+zXCGvlqG/mFKRqImWYuvQ5+ohCIDCCk6YMZv0QKrvdSVaEFP8c8DzV0G3eZvMw0T+QaPR6JxRarbf1bUZukdQsY/G7e6DO9YM47PutJ4c3zgMlvMcxPfy7FZZl/HXDQTFx3CKfweRMr+6LYnLO3JNYo4/KYwljUBxqGfXInVsJlsDkJD+RlzPsMPzHarbyQqLnk8iKeN/QVRxENkc2tVbUvJHUZgLGNvXLnEyctIhh3WphYKh6bIikQE7f9WebxhcE+5YXLyOsQTq7+lJZHM/8pca7+U+iDPGi0SbZP8PuIjtf2Sdl6bK7XdKKsw1sOfaFuzVSG35SRhmRpqf3EKknGWWhh8AF1kenGpzMyJMeD2duKhX+zkFcPq+9F6UTiS1Arb1CS7CuKAFLlARLn+fjPYjQaSwRhDdqOtL/ER"
}
```

## Ping

| URL           |
|---------------|
| /tapi/request |

### Request

| Parameter      | Notation | Type | Length | Description                                           |
|:---------------|:---------|:-----|:-------|:------------------------------------------------------|
| method         | M        | AN   | 255    | Expected API method value: `ping`                     |
| token          | M        | ANS  | 255    | Merchant token.                                       |
| api_id         | M        | ANS  | 255    | Merchant API ID.                                      |
| terminal_id    | M        | ANS  | 8      | Terminal API ID.                                      |
| guid           | M        | ANS  | 36     | Terminal GUID.                                        |
| initial_guid   | O        | ANS  | 36     | Initial GUID read from terminal configuration sheet.  |
| serial_number  | O        | ANS  | 64     | Device serial number.                                 |
| sign           | M        | ANS  |        | "Secret" encrypted with terminal public key.          |
| data           | M        | ANS  |        | "Data" encrypted with terminal public key.            |
| data / message | M        | ANS  | 255    | Request message. Message must be static value "ping". |

```json
{
  "method": "ping",
  "token": "cba",
  "terminal_id": "termi321",
  "api_id": "abc54321",
  "api_version": "1.0",
  "initial_guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b481",
  "guid": "8c2dd8e9-3a09-48e1-b216-91a8bbe2b482",
  "serial_number": "39267819219100025148zz43743730420750777216",
  "pure_json": {
    "message": "ping"
  }
}
```

### Response

| Parameter      | Type | Length | Description                                            |
|:---------------|:-----|:-------|:-------------------------------------------------------|
| method         | AN   | 255    | Method: 'ping'                                         |
| api_id         | ANS  | 255    | Merchant API ID (echo from request).                   |
| sale_point_id  | ANS  | 255    | SalePoint API ID.                                      |
| terminal_id    | ANS  | 8      | Terminal API ID (echo from request).                   |
| request_id     | N    | 14     | Unique request ID.                                     |
| status         | AN   | 255    | `Success` / `Error`.                                   |
| sign           | ANS  | 255    | "Secret" encrypted with terminal private key.          |
| data           | ANS  | 255    | "Data" encrypted with terminal private key.            |
| data / message | ANS  | 255    | Response message. Message will be static value "pong". |

```json
{
  "api_id": "abc54321",
  "method": "ping",
  "api_version": "1.0",
  "terminal_id": "termi321",
  "sale_point_id": "abc54321",
  "request_id": "15803729338570",
  "status": "success",
  "data": "h5HDle5TVgYBLOITbRFFdLR3ROmrztlpxxlUknxMVmitL0mn2R+w7h66rbc=",
  "sign": "jMo/4uNKyDeHs/2tCNbpMj7WTBDnHgXSe0RRwb/tLHg5kIdy/NOtZ4O0P+2IUY7LRW/+BgBABJEI5ZV9dg0u6wQ4eL82DGE1l9JW1oR9",
  "pure_json": {
    "message": "pong"
  }
}
```

# Appendix
## Changelog

| Version | Date              | Updates                                                                                                                                                                                                                                           |
|---------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.7.2   | December 19, 2021 | <!-- tj --> Updated [`Response Codes`](#appendix--enum--response-codes) and added new column `Action`.                                                                                                                                            |
| 1.7.1   | December 13, 2021 | <!-- tb --> Updated available length for field `52`.                                                                                                                                                                                              |
| 1.7.0   | December 2, 2021  | <!-- tb --> Updated `37` field requirements for `reverse` action. Removed `57` field from `reverse` response. Renamed `57` field to `37` on `capture` action response.                                                                            |
| 1.6.6   | December 2, 2021  | <!-- nl --> Updated descriptions for 79, 82, 83 values in [`Response Codes`](#appendix--enum--response-codes)                                                                                                                                     |
| 1.6.5   | November 10, 2021 | <!-- tb --> Updated description for field `security_control_info`.                                                                                                                                                                                |
| 1.6.4   | August 27, 2021   | <!-- dv --> Updated `account_number_type`, `account_number` and `funding_source` requirement to *optional* and description for [`Credit Request`](#actions--credit--request) and [`P2P transaction Request`](#actions--p2p-transaction--request). |
| 1.6.3   | July 22, 2021     | <!-- tj --> Removed `token` from responses.                                                                                                                                                                                                       |
| 1.6.2   | June 18, 2021     | <!-- dv --> Removed `mcc` from [`P2P Transaction`](#actions--p2p-transaction--request).                                                                                                                                                           |
| 1.6.1   | June 16, 2021     | <!-- dv --> Renamed [`Funding source`](#appendix--enum--funding-source) item message                                                                                                                                                              |
| 1.6.0   | June 14, 2021     | <!-- dv --> Updated `account_number` length and added `account_number_type` for methods `credit`, `p2p_transaction`.                                                                                                                              |
| 1.5.1   | May 12, 2021      | <!-- tb --> Updated `parent_tx_id` usage for method `Reverse` - Initial (pre-authorization) tx_id should be provided, when reversing incremental authorizations.                                                                                  |
| 1.5.0   | March 23, 2021    | <!-- tb --> removed `purge` action.                                                                                                                                                                                                               |
| 1.4.1   | April 22, 2021    | <!-- nl --> Added new notation - [`Response codes`](#appendix--notation--response-codes).                                                                                                                                                         |
| 1.4.0   | February 19, 2021 | <!-- nl --> Added new section- `Security`.                                                                                                                                                                                                        |
| 1.3.0   | January 18, 2020  | <!-- tb --> added new method 'p2p_transaction'.                                                                                                                                                                                                   |
| 1.2.0   | June 05, 2020     | <!-- tb --> added fields 'sender_data', 'receiver_data', 'transaction_data' to 'credit' api method.                                                                                                                                               |
| 1.1.0   | May 14, 2020      | <!-- tb --> removed field 'logo' from 'terminal_config' api method response.                                                                                                                                                                      |
|         |                   | removed field '126' from 'terminal_config' api method response.                                                                                                                                                                                   |
|         |                   | changed field '123' value for 'terminal_config' api method response.                                                                                                                                                                              |
|         |                   | added new field '804' to 'terminal_config' api method response.                                                                                                                                                                                   |
| 1.0.0   | March 25, 2020    | <!-- ind --> Initial version. <!-- Next version should be 1.1.0, then 1.1.1 etc., order descending, newest to oldest -->                                                                                                                          |

## Security
### Authentication

To use new version API you need to send your API credentials using header with every request you make. **Note:** If headers are set then corresponding values from JSON body will not be used.

**Header**

| Parameter       | Notation | Type | Length | Description                                  |
|:----------------|:---------|:-----|:-------|:---------------------------------------------|
| x-method        | M        | A    | 1-50   | Expected API method value: `authenticate`.   |
| x-api-id        | M        | AN   | 50     | Merchant API ID.                             |
| x-terminal-id   | M        | AN   | 50     | Terminal API ID.                             |
| x-sale-point-id | M        | AN   | 50     | Sale point API ID.                           |
| x-token         | M        | AN   | 30-60  | Merchant token.                              |
| x-api-version   | M        | AN   | 1-3    | Fixed `1.0`.                                 |
| x-sign          | M        | ANS  | 1-255  | "Secret" encrypted with merchant public key. |

### Card token

Card token represents a credit card’s details which includes *card_holder_name*, *card_number*, *card_expiry_month*, *card_expiry_year* fields. After providing card information in the first call you can use card token in subsequent transaction requests.

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

## Notation
### Parameter requirement

| Notation | Meaning                                                                                                                                                                              |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| M        | Mandatory                                                                                                                                                                            |
| O        | Optional                                                                                                                                                                             |
| C        | Conditional                                                                                                                                                                          |
| ME       | Mandatory Echo. The data element will be present in a response message and will contain the same value from the request.                                                             |
| CE       | Conditional Echo. The data element will be present in response message only if it was present in request message. If it was present it will contain the same value from the request. |

### Status value

| Parameter | Value               |
|-----------|---------------------|
| Status    | `Success` / `Error` |

### Function codes

| Parameter | Value                 |
|-----------|-----------------------|
| 101       | Preauthorization      |
| 107       | Incremental authorize |
| 202       | Final authorize       |
| 201       | Full refund           |
| 202       | Partial refund        |
| 400       | Full reverse          |
| 401       | Partial reverse       |

### Security related control information

| Position | Field                    | Description                                                                                     | Available values                                                              |
|:---------|:-------------------------|:------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|
| 1-2      | PIN Security Type Code   | Indicates the type of security processing used for the PIN data.                                | 97 - Multiple (indexed) keys                                                  |
| 3-4      | PIN Encryption Type Code | Indicates the type of security processing used for the PIN data.                                | 01 - DES encryption                                                           |
|          |                          |                                                                                                 | 99 - AES/DES encryption                                                       |
| 5-6      | PIN Block Format Code    | Indicates the type of PIN block format used.                                                    | 01 - ANSI 1                                                                   |
|          |                          |                                                                                                 | 04 - ISO Format 4 (only available with AES/DES - pin block encryption type)   |
|          |                          |                                                                                                 | 10 - ISO Format 0                                                             |
| 7-10     | PIN Key Index Number     | Indicates the specific PIN key to be used when more than one key is available in a PIN key set. | 0001–0099                                                                     |
| 11-12    | Reserved for Future Use  | Reserved for future use.                                                                        | 00 - Default value                                                            |
| 13-16    | Reserved for Future Use  | Reserved for future use.                                                                        | 0000 - Default value                                                          |

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
| Installment                      | installment                      |
| Cash disbursement                | cash_disbursement                |
| Terminal config                  | terminal_config                  |

### Identification type

| Code  | Description                  |
|:------|:-----------------------------|
| 00    | Passport                     |
| 01    | National Identification Card |
| 02    | Driver’s License             |
| 03    | Government Issued            |
| 04    | Other                        |
| 05–10 | Reserved                     |

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
