# Introduction

## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

# Endpoints

[`Action request headers`](#appendix--security--authentication--action) are required to be sent as part of every request to the Risk Monitor API, so please make sure to set up them correctly before doing API calls.

## Event data create

| URL                               | Method | Parameters                      |
| :-------------------------------- | :----- | :------------------------------ |
| /api/client/events/{eventId}/data | POST   | {eventId} - Event identifier.   |

### Request

| Parameter        | Type   | Length | Required | Description                                                                        |
|:-----------------|:-------|:-------|:---------|:-----------------------------------------------------------------------------------|
| identifier       | string | 100    | Yes      | Unique event data identifier.                                                      |
| actionGroupCode  | string | 100    | No       | Code of action group event data should be triggered.                               |
| data             | obj    |        | Yes      | Object with event data fields(as configured in the event) names(as keys) => values |
| parentIdentifier | string | 100    | No       | Parent event data identifier.                                                      |

*Example:*

```
{
     "identifier":"5935e38a-2e01-407d-b6b1-be074a07257e",
     "actionGroupCode":null,
     "parentIdentifier":null,
     "data":{
        "username":"test",
        "amount":50
     }
}
```

*Curl example:*

```
curl -X POST "http://{apiUrl}/api/client/events/1/data" -H  "accept: application/json" -H  "Content-Type: application/json" -H "x-auth-token: testToken" -H "x-auth-signature: a0ac973d4b1d9bdbe845ca3b9a5718c70a64a5f87382122221b392e51f10df4cc1b587633cd9cbb7365bfad23b86818bc001fc7717eff798bfa24f7bd401554b" -H "x-auth-signature-timestamp: 1632228193" -d "{\"identifier\":\"5935e38a-2e01-407d-b6b1-be074a07257e\",\"data\":{\"username\":\"test\",\"amount\":50}}"
```

### Response
#### Success

HTTP status codes:

- `204` - No content

#### Error

HTTP status codes:

- `401` - Unauthorized

*Example:*

```
{
    "message": "Forbidden."
}
```

- `404` - Not found

*Example:*

```
{
    "type": "https://tools.ietf.org/html/rfc2616#section-10",
    "title": "An error occurred",
    "detail": "event not found"
}
```

- `422` - Unprocessable entity

*Example:*

```
{
    "type": "https://tools.ietf.org/html/rfc2616#section-10",
    "title": "An error occurred",
    "detail": "[id]: This value should not be null.\n[recipientIban]: This value should not be null.\n[senderIban]: This value should not be null.",
    "violations": [
        {
            "propertyPath": null,
            "message": "Invalid data.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        },
        {
            "propertyPath": "[recipientIban]",
            "message": "This value should not be null.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        },
        {
            "propertyPath": "[senderIban]",
            "message": "This value should not be null.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        }
    ]
}
```

## Event data update

| URL                                                     | Method | Parameters                                                                    |
| :------------------------------------------------------ | :----- | :---------------------------------------------------------------------------- |
| /api/client/events/{eventId}/data/{eventDataIdentifier} | PATCH  | {eventId} - Event identifier. {eventDataIdentifier} - Event data identifier.  |

### Request

| Parameter       | Type       | Length | Required | Description                                                                         |
| :-------------- | :--------- | :----- | :------- | :---------------------------------------------------------------------------------- |
| data            | obj        |        | Yes      | Object with event data fields(as configured in the event) names(as keys) => values  |

*Example:*

```
{
    "data":{
        "username":"test",
        "amount":50
    }
}
```

*Curl example:*

```
curl -X PATCH "http://{apiUrl}/api/client/events/1/data/5935e38a-2e01-407d-b6b1-be074a07257e -H  "accept: application/json" -H  "Content-Type: application/merge-patch+json" -H "x-auth-token: testToken" -H "x-auth-signature: a0ac973d4b1d9bdbe845ca3b9a5718c70a64a5f87382122221b392e51f10df4cc1b587633cd9cbb7365bfad23b86818bc001fc7717eff798bfa24f7bd401554b" -H "x-auth-signature-timestamp: 1632228193" -d "{\"data\":{\"username\":\"test\",\"amount\":50}}"
```

### Response
#### Success

HTTP status codes:

- `204` - No content

#### Error

HTTP status codes:

- `401` - Unauthorized

*Example:*

```
{
    "message": "Forbidden."
}
```

- `404` - Not found

*Example:*

```
{
    "type": "https://tools.ietf.org/html/rfc2616#section-10",
    "title": "An error occurred",
    "detail": "event not found"
}
```

- `422` - Unprocessable entity

*Example:*

```
{
    "type": "https://tools.ietf.org/html/rfc2616#section-10",
    "title": "An error occurred",
    "detail": "[id]: This value should not be null.\n[recipientIban]: This value should not be null.\n[senderIban]: This value should not be null.",
    "violations": [
        {
            "propertyPath": null,
            "message": "Invalid data.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        },
        {
            "propertyPath": "[recipientIban]",
            "message": "This value should not be null.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        },
        {
            "propertyPath": "[senderIban]",
            "message": "This value should not be null.",
            "code": "ad32d13f-c3d4-423b-909a-857b961eb720"
        }
    ]
}
```

## Get event data

| URL                                                     | Method | Parameters                                                                    |
| :------------------------------------------------------ | :----- | :---------------------------------------------------------------------------- |
| /api/client/events/{eventId}/data/{eventDataIdentifier} | GET    | {eventId} - Event identifier. {eventDataIdentifier} - Event data identifier.  |

*Curl example:*

```
curl -X GET "http://{apiUrl}/api/client/events/1/data/5935e38a-2e01-407d-b6b1-be074a07257e" -H  "accept: application/json" -H "x-auth-token: testToken" -H "x-auth-signature: a0ac973d4b1d9bdbe845ca3b9a5718c70a64a5f87382122221b392e51f10df4cc1b587633cd9cbb7365bfad23b86818bc001fc7717eff798bfa24f7bd401554b" -H "x-auth-signature-timestamp: 1632228193" -d ""
```

### Response
#### Success

HTTP status code `200`

| Parameter        | Type                                       | Length | Required | Description                                                                        |
|:-----------------|:-------------------------------------------|:-------|:---------|:-----------------------------------------------------------------------------------|
| id               | string                                     | 100    | Yes      | Unique identifier                                                                  |
| eventId          | integer                                    |        | Yes      | Unique event identifier                                                            |
| identifier       | string                                     | 100    | Yes      | Unique event data identifier.                                                      |
| state            | string                                     | 100    | Yes      | Event data state. Possible values "PROCESSING", "COMPLETED".                       |
| data             | obj                                        |        | Yes      | Object with event data fields(as configured in the event) names(as keys) => values |
| createdAt        | dateTime                                   |        | Yes      |                                                                                    |
| updatedAt        | dateTime                                   |        | No       |                                                                                    |
| eventTags        | [`EventTag[]`](#appendix--type--event-tag) |        |          | List of event Tags that were assigned after action was hit                         |
| actions          | [`Action[]`](#appendix--type--action)      |        |          | List of actions hit. Empty if no actions hit.                                      |
| actionGroupCode  | string                                     | 100    | No       | Action group                                                                       |
| parentIdentifier | string                                     | 100    | No       | Parent event data identifier.                                                      |

*Example:*

```
{
  "id": "string",
  "eventId": 0,
  "identifier": "string",
  "state": "string",
  "data": [
    "string"
  ],
  "createdAt": "2021-08-23T13:24:55.199Z",
  "updatedAt": "2021-08-23T13:24:55.199Z",
  "eventTags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "actions": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "actionGroupCode": "string",
  "parentIdentifier" "string"
}
```

#### Error

HTTP status codes:

- `401` - Unauthorized

*Example:*

```
{
    "message": "Forbidden."
}
```

- `404` - Not found

*Example:*

```
{
    "type": "https://tools.ietf.org/html/rfc2616#section-10",
    "title": "An error occurred",
    "detail": "event not found"
}
```
## Health check

| URL                                                     | Method | Parameters      |
| :------------------------------------------------------ | :----- | :-------------- |
| /api/client/health-check                                | POST   |                 |

### Request

Request has to be valid json.

| Parameter       | Type       | Length | Required | Description                           |
| :-------------- | :--------- | :----- | :------- | :------------------------------------ |
| anyKey          | mixed      |        | No       | Request has to be valid json.         |

*Curl example:*

```
curl -X POST "http://{apiUrl}/api/client/health-check   " -H  "accept: application/json" -H  "Content-Type: application/json" -H "x-auth-token: testToken" -H "x-auth-signature: a0ac973d4b1d9bdbe845ca3b9a5718c70a64a5f87382122221b392e51f10df4cc1b587633cd9cbb7365bfad23b86818bc001fc7717eff798bfa24f7bd401554b" -H "x-auth-signature-timestamp: 1632228193" -d "{\"anyKey\":\"anyValue\"}"
```

### Response
#### Success

HTTP status code `200`

*Example:*

```
ok
```

#### Error

HTTP status codes:

- `401` - Unauthorized

*Example:*

```
{
    "message": "Forbidden."
}
```

# Webhooks

[`Webhook headers`](#appendix--security--authentication--webhook) will be sent with webhook.

## Event data summary webhook

"Event data summary webhook" is sent after all system actions are checked.

| Endpoint                       | Method | Parameters    |
| :----------------------------- | :----- | :------------ |
| [clientUrl]/event-data-summary | POST   |               |

### Request

| Parameter                     | Type                                               | Length | Required | Description                                                                                      |
| :---------------------------- | :------------------------------------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------- |
| identifier                    | string                                             | 100    | Yes      | Unique event data identifier.                                                                    |
| state                         | string                                             | 100    | Yes      | Event data state. Possible values "PROCESSING", "COMPLETED".                                     |
| event                         | [`Event`](#appendix--type--event)                  |        | Yes      |                                                                                                  |
| actions                       | [`ActionHit[]`](#appendix--type--action-hit)       |        | No       | List of actions hit. Empty if no actions hit.                                                    |

*Example:*

```
{
  "identifier": "4c90fe98-820e-4e36-9129-fdf5779fc615",
  "state": "COMPLETED",
  "event": {
    "id": 51,
    "type": "bank transfers"
  },
  "actions": [
    {
      "action": {
        "id": 118,
        "code": null,
        "name": "Sanction Suspicious Outbound",
        "type": "SYSTEM-ACTION",
        "groupCode": null
      },
      "data": {
        "changeSet": {
          "alertStatus": "NEW"
        },
        "custom": [
        ]
      },
      "eventTags": [
        {
          "id": 82,
          "name": "Sanction Suspicious Outbound"
        }
      ]
    }
  ]
}
```

### Response

Client application must respond with HTTP status code 200. If another status code will be returned Risk Monitor will retry webhook, please see [`Webhook retry strategy`](#appendix--webhook-retry-strategy).

## System action webhook

"System action webhook" is sent if event action conditions were hit and action type is "System action".

| Endpoint                  | Method | Parameters    |
| :------------------------ | :----- | :------------ |
| [clientUrl]/system-action | POST   |               |

### Request

| Parameter           | Type                                                       | Length | Required | Description                                                                                                                        |
| :------------------ | :--------------------------------------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| identifier          | string                                                     | 100    | Yes      | Unique event data identifier.                                                                                                      |
| event               | [`Event`](#appendix--type--event)                          |        | Yes      | The main event data                                                                                                                |
| action              | [`ActionHitAction`](#appendix--type--action-hit-action)    |        | Yes      |                                                                                                                                    |
| data                | [`ActionHitData`](#appendix--type--action-hit-data)        |        | No       |                                                                                                                                    |
| eventTags           | [`EventTag[]`](#appendix--type--event-tag)                 |        | No       | List of event Tags that were assigned after action was hit.                                                                        |

*Example:*

```
{
  "identifier": "16297194212744",
  "event": {
    "id": 14,
    "type": "BANK_TRANSFER"
  },
  "action": {
    "id": 221,
    "code": null,
    "name": "System action",
    "type": "SYSTEM-ACTION",
    "groupCode": null
  },
  "data": {
    "changeSet": {
      "riskStatus": "APPROVED"
    },
    "custom": {
      "riskScore": 1
    }
  },
  "eventTags": [
    {
      "id": 82,
      "name": "Sanction Suspicious Outbound"
    }
  ]
}
```

### Response

Client application must respond with HTTP status code 200. If another status code will be returned Risk Monitor will retry webhook, please see [`Webhook retry strategy`](#appendix--webhook-retry-strategy).

## Operator action webhook

"Operator action webhook" is sent if event action conditions were hit and action type is  "Operator action".

| Endpoint                    | Method | Parameters    |
| :-------------------------- | :----- | :------------ |
| [clientUrl]/operator-action | POST   |               |

### Request

| Parameter           | Type                                                         | Length | Required | Description                                                                                                                        |
| :------------------ | :----------------------------------------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| identifier          | string                                                       | 100    | Yes      | Unique event data identifier.                                                                                                      |
| event               | [`Event`](#appendix--type--event)                            |        | Yes      | The main event data                                                                                                                |
| action              | [`ActionHitAction`](#appendix--type--action-hit-action)      |        | Yes      |                                                                                                                                    |
| data                | [`ActionHitData`](#appendix--type--action-hit-data)          |        | No       |                                                                                                                                    |
| eventTags           | [`EventTag[]`](#appendix--type--event-tag)                   |        | No       | List of event Tags that were assigned after action was hit.                                                                        |

*Example:*

```
{
  "identifier": "16297194212744",
  "event": {
    "id": 15,
    "type": "BANK_TRANSFER"
  },
  "action": {
    "id": 203,
    "code": null,
    "name": "APPROVE",
    "type": "OPERATOR-ACTION",
    "groupCode": null
  },
  "data": {
    "changeSet": {
      "reason": "Other",
      "riskStatus": "APPROVED"
    },
    "custom": {
      "riskScore": 2
    }
  },
  "eventTags": [
    {
      "id": 82,
      "name": "Sanction Suspicious Outbound"
    }
  ]
}
```

### Response

Client application must respond with HTTP status code 200. If another status code will be returned Risk Monitor will retry webhook, please see [`Webhook retry strategy`](#appendix--webhook-retry-strategy).

# Appendix
## Changelog

| Version | Date                  | Updates                                                                                                                                                           |
|:--------|:----------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0.1   | November 17, 2021     | <!-- tz --> Added parentIdentifier to event data.                                                                                                                 |
| 1.0.0   | September 21, 2021    | <!-- ind --> Initial version. <!-- Next version should be 1.0.1, then 1.0.1 etc., order descending, newest to oldest -->                                          |

## Security
### Authentication
#### Api

These headers are required for all API requests.

##### Request header

| Parameter                  | Type                   | Length | Required | Description                                                                                      |
|:---------------------------|:-----------------------|:-------|:---------|:-------------------------------------------------------------------------------------------------|
| x-auth-token               | string                 | 100    | Yes      | Your `API token`                                                                                 |
| x-auth-signature           | string                 | 128    | Yes      | See [`Api signature generating`](#appendix--security--signature-generating--api-signature) |
| x-auth-signature-timestamp | string                 | 10     | Yes      | Unix timestamp                                                                                   |

#### Webhook
##### Request header

| Parameter                 | Type                    | Length | Required | Description                            |
|:--------------------------|:------------------------|:-------|:---------|:---------------------------------------|
| x-hook-signature          | string                  | 88     | Yes      | See [`Webhook signature generating`](#appendix--security--signature-generating--webhook-signature) |

### Signature generating
#### Api signature
To generate a '`x-auth-signature`' hash, SHA-512 algorithm must be used.

Data that is hashed should be taken from the request parameters in JSON format and your '`access key`' which is used as a prefix and '`x-auth-signature-timestamp`' which is used as a suffix (no special separators are used). Hash format - lowercase hexits.

Finally, set your '`x-auth-signature`' in request header data.

*Example:*
```php
    $requestContent = '{"data": "data"}'; // Json request
    $accessKey = 'accessKey'; // accessKey provided by RiskMonitor
    $signatureTimestamp = time();
    $signatureHash = hash(
        'sha512',
        $accessKey.$requestContent.$signatureTimestamp
    );
```

#### Webhook signature
To generate a hash that can be compared with '`x-hook-signature`', SHA-512 algorithm must be used.

Data that is hashed should be taken from the request (in this case it is in JSON format) and your '`notification secret`' which is used as a prefix (no special separators are used). Hash format - Binary.

Finally, use base64 encode and compare your data with '`x-hook-signature`' request header data. If it does not match - it is a problem, someone is participating in the middle.

*Example:*
```php
    $requestContent = '{"data": "request"}';
    $notificationSecret = 'notificationSecret';
    $signature = base64_encode(
        hash('sha512', $notificationSecret.$requestContent, true)
    );
```

## Type
### Action

| Parameter    | Type         | Length | Required | Description                             |
| :----------- | :----------- | :----- | :------- | :-------------------------------------- |
| id           | int          |        | Yes      | Action identifier                       |
| name         | string       | 100    | Yes      | Action name                             |

### Action hit

| Parameter           | Type                                                           | Length | Required | Description                                                                                      |
| :------------------ | :------------------------------------------------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------- |
| action              | [`ActionHitAction`](#appendix--type--action-hit-action)        |        | Yes      |                                                                                                  |
| data                | [`ActionHitData`](#appendix--type--action-hit-data)            |        | No       |                                                                                                  |
| eventTags           | [`EventTag[]`](#appendix--type--event-tag)                     |        | No       | List of event Tags that were assigned after action was hit                                       |

### Action hit action

| Parameter        | Type       | Length | Required | Description                                                                                      |
| :--------------- | :--------- | :----- | :------- | :----------------------------------------------------------------------------------------------- |
| id               | int        |        | Yes      | Action identifier                                                                                |
| code             | string     | 100    | No       | Action code                                                                                      |
| name             | string     | 100    | Yes      | Action name                                                                                      |
| type             | string     | 100    | Yes      | Action type. Possible values "SYSTEM-ACTION", "OPERATOR-ACTION"                                  |
| groupCode        | string     | 100    | No       | Action group                                                                                     |

### Action hit data

| Parameter    | Type       | Length | Required | Description                                                                                      |
| :----------- | :--------- | :----- | :------- | :----------------------------------------------------------------------------------------------- |
| changeSet    | obj        |        | No       | List of what was changed after action was hit. Result depends on action set up.                  |
| custom       | obj        |        | No       | List of additional parameters that should be sent with webhook. Result depends on action set up. |

### Event

| Parameter  | Type       | Length | Required | Description                          |
| :--------- | :--------- | :----- | :------- | :----------------------------------- |
| id         | integer    |        | Yes      | Unique event identifier              |
| type       | string     | 100    | Yes      | Event type                           |

### Event tag

| Parameter  | Type       | Length | Required | Description                          |
| :--------- | :--------- | :----- | :------- | :----------------------------------- |
| id         | integer    |        | Yes      |  Event tag identifier                |
| name       | string     | 100    | Yes      |  Event tag name                      |

## Webhook retry strategy

| Retry  | Delay             |
| :----- | :---------------- |
| 1      | 5 seconds         |
| 2      | 10 seconds        |
| 3      | 30 seconds        |
| 4      | 1 minute          |
| 5      | 5 minutes         |
| 6      | 30 minutes        |
| 7      | 1 hour            |
| 8      | 3 hours           |
| 9      | 6 hours           |
| 10     | 12 hours          |
| 11     | 24 hours          |
