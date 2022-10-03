# Introduction
## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

%brandName% reserves the right to append Conditional 'C' and/or Optional 'O' fields without prior notice. The client's system/application should be prepared to accept the appended fields. All such changes will be Backward Compatible and shouldn't change the application logic.

All Backward Incompatible changes (related to the mandatory 'M' field) will be introduced ONLY with a new [`version release`](#appendix--version-guide).

# Report
## Account transaction
### Data elements

| Parameter                               | M   | Type | Length  | Description                                                                                                                                                |
|-----------------------------------------|-----|------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TransactionType                         | M   | N    | [1-11]  | [`Transaction type`](#appendix--enum--transaction-type).                                                                                                   |
| EntryModeType                           | M   | N    | [1-11]  | [`Entry mode type`](#appendix--enum--entry-mode-type).                                                                                                     |
| TransactionId                           | M   | N    | [1-20]  | Unique transaction ID in Platform’s database.                                                                                                              |
| TransLink                               | M   | ANS  | [1-100] |                                                                                                                                                            |
| TransactionLocalTime                    | C   | NS   | 19      | Transaction local date time.                                                                                                                               |
| ReconciliationDate                      | C   | NS   | 10      |                                                                                                                                                            |
| SettlementDate                          | C   | NS   | 10      |                                                                                                                                                            |
| DateTimeProcessed                       | C   | NS   | 19      |                                                                                                                                                            |
| CardProduct                             | C   | N    | [1-20]  | Product ID associated with transaction.                                                                                                                    |
| Program                                 | M   | N    | [1-20]  | Program ID associated with transaction.                                                                                                                    |
| CardId                                  | C   | N    | [1-20]  | Card ID associated with transaction.                                                                                                                       |
| AccountId                               | C   | N    | [1-20]  | Account ID associated with transaction.                                                                                                                    |
| TransactionAmount / currency            | M   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| TransactionAmount / value               | M   | NS   | [1-20]  |                                                                                                                                                            |
| BillingAmount / currency                | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| BillingAmount / value                   | C   | NS   | [1-20]  |                                                                                                                                                            |
| BillingAmount / rate                    | C   | NS   | 16;9    |                                                                                                                                                            |
| CardholderAmount / currency             | M   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| CardholderAmount / value                | M   | NS   | [1-20]  |                                                                                                                                                            |
| CardholderAmount / rate                 | M   | NS   | 16;9    | `base_conversion_rate`  with applied FX markup (if FX fee was applied).                                                                                    |
| SettlementAmount / currency             | C   | N    | 3       | Value received from card scheme or value selected during processing if settlement [`currency`](#appendix--enum--currency) selection configured in program. |
| SettlementAmount / value                | C   | NS   | [1-20]  | Value received from card scheme or value selected during processing if settlement currency selection configured in program.                                |
| SettlementAmount / rate                 | C   | NS   | 16;9    | Value received from card scheme or value selected during processing if settlement currency selection configured in program.                                |
| BaseConversionRate                      | M   | NS   | 16;9    | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                                |
| IsConversionFeeBlended                  | M   | N    | 1       | Possible values: `Yes`, `No`                                                                                                                               |
| AuthCode                                | C   | N    | [1-6]   | DE38. In clearing for offline purchases auth code will be omitted.                                                                                         |
| RetrievalReferenceNumber                | C   | N    | [1-20]  |                                                                                                                                                            |
| MerchantId                              | C   | AN   | [1-15]  |                                                                                                                                                            |
| MerchantName                            | C   | ANS  | [1-100] |                                                                                                                                                            |
| MerchantState                           | C   | ANS  | [1-3]   |                                                                                                                                                            |
| MerchantCountry                         | C   | A    | 3       |                                                                                                                                                            |
| MerchantTerminalId                      | C   | ANS  | [1-11]  |                                                                                                                                                            |
| SchemeId                                | M   | N    | [1-11]  | [`Scheme ID`](#appendix--enum--scheme-id).                                                                                                                 |
| TransactionFee / currency               | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| TransactionFee / value                  | C   | NS   | [1-20]  |                                                                                                                                                            |
| AcquirerId                              | C   | N    | [1-11]  |                                                                                                                                                            |
| ForwarderId                             | C   | N    | [1-11]  |                                                                                                                                                            |
| Mcc                                     | M   | N    | 4       | Merchant Category Code.                                                                                                                                    |
| ReasonCode                              | C   | NS   | 4       | Mastercard message reason code. DE 25 from clearing file.                                                                                                  |
| EpmMethodId                             | C   | N    | [1-20]  | Filled if payment transaction is external.                                                                                                                 |
| EpmTransactionId                        | C   | N    | [1-20]  | Filled if payment transaction is external.                                                                                                                 |
| TransactionExchangeFeeAmount / currency | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| TransactionExchangeFeeAmount / value    | C   | NS   | [1-20]  |                                                                                                                                                            |
| TransactionFeeAmount / currency         | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                 |
| TransactionFeeAmount / value            | C   | NS   | [1-20]  |                                                                                                                                                            |
| Suspicious                              | M   | N    | 1       | Possible values: `Yes` - is suspicious, `No` - not suspicious.                                                                                             |
| RiskRuleCodes                           | O   | ANS  | 1-65535 | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                           |
| RiskActions / RiskAction                | O   | LIST | \-      | [`Risk rule action`](#appendix--enum--risk-rule-action).                                                                                                   |
| SecurityChecks / SecurityCheck          | O   | LIST | \-      | [`Security check`](#appendix--enum--security-check).                                                                                                       |
| TransactionClass                        | C   | AS   | [1-30]  | [`Region type`](#appendix--enum--region-type).                                                                                                             |
| LoadType                                | C   | N    | [1-11]  | Filled if payment transaction is internal. Load type value in line with API spec values supported. [Load type](#appendix--enum--load-type)                 |
| LoadSource                              | C   | N    | [1-11]  | Filled if payment transaction is internal. Load source value in line with the API spec values supported. [Load source](#appendix--enum--load-source)       |
| ParentTransactionId                     | C   | N    | [1-20]  | Parent transaction ID. Provided if this transaction can be related with the previous transaction.                                                          |
| DisputeId                               | C   | N    | [1-20]  | Dispute ID. Provided if the dispute was created.                                                                                                           |
| ExternalDisputeId                       | O   | N    | [1-20]  | External system dispute ID if it was provided on dispute create.                                                                                           |

```xml
<?xml version="1.0" encoding="utf-8"?>
<AccountsTransactions>
	<AccountTransaction>
		<TransactionType>1</TransactionType>
		<EntryModeType>2</EntryModeType>
		<TransactionId>12345678901234</TransactionId>
		<TransLink>123456789010000000000000000000000000</TransLink>
		<TransactionLocalTime/>
		<ReconciliationDate/>
		<SettlementDate>2019-04-18</SettlementDate>
		<DateTimeProcessed>2019-04-18 13:59:49</DateTimeProcessed>
		<CardProduct>1</CardProduct>
		<Program>1</Program>
		<CardId>1</CardId>
		<AccountId>1</AccountId>
		<TransactionAmount currency="978" value="1.00"/>
		<BillingAmount currency="978" value="1.00" rate=""/>
		<CardholderAmount currency="978" value="1.00" rate=""/>
		<SettlementAmount currency="978" value="-8.27" rate="1"/>
		<BaseConversionRate/>
		<IsConversionFeeBlended>No</IsConversionFeeBlended>
		<AuthCode/>
		<RetrievalReferenceNumber/>
		<MerchantId/>
		<MerchantName>Test</MerchantName>
		<MerchantState/>
		<MerchantCountry/>
		<MerchantTerminalId/>
		<SchemeId>1</SchemeId>
		<TransactionFee currency="978" value="1.00"/>
		<AcquirerId/>
		<ForwarderId/>
		<Mcc/>
		<ReasonCode/>
		<EpmMethodId/>
		<EpmTransactionId/>
		<Suspicious>No</Suspicious>
		<RiskRuleCodes/>
		<RiskActions>
			<MarkTransactionAsSuspicious>0</MarkTransactionAsSuspicious>
			<NotifyCardholderBySendingTAIsNotification>0</NotifyCardholderBySendingTAIsNotification>
			<ChangeCardStatusToRisk>0</ChangeCardStatusToRisk>
			<ChangeAccountStatusToSuspended>0</ChangeAccountStatusToSuspended>
			<RejectTransaction>0</RejectTransaction>
		</RiskActions>
		<SecurityChecks>
			<CardExpirationDatePresent>0</CardExpirationDatePresent>
			<OnlinePIN>0</OnlinePIN>
			<OfflinePIN>0</OfflinePIN>
			<ThreeDomainSecure>0</ThreeDomainSecure>
			<Cvv2>0</Cvv2>
			<MagneticStripe>1</MagneticStripe>
			<ChipData>0</ChipData>
			<AVS>0</AVS>
			<PhoneNumber>0</PhoneNumber>
			<Signature>0</Signature>
		</SecurityChecks>
		<TransactionClass>International</TransactionClass>
        <LoadType/>
        <LoadSource/>
        <ParentTransactionId/>
        <DisputeId/>
        <ExternalDisputeId/>
	</AccountTransaction>
</AccountsTransactions>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
accounts-transactions-1-20-20200327.xml
```

## Transactions held in risk
### Data elements

|Field name                      | M   | Type | Length   | Description                                                                                                                                          |
|--------------------------------|-----|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| EpmTransactionId               | M   | N    | 1-20     | Unique external payment transaction ID                                                                                                               |
| TransactionType                | M   | N    | 1-3      | [`Transaction type`](#appendix--enum--transaction-type).                                                                                             |
| StatusCode                     | M   | N    | 1-3      | [`Transaction status code`](#appendix--enum--epm--transaction-status-code)                                                                           |
| ManualApprovalStatus           | O   | N    | 1-3      | [`Manual approval status`](#appendix--enum--epm--manual-approval-status)                                                                             |
| SettlementAmountValue          | M   | NS   | [1-20]   | Settlement amount expressed in Settlement Currency                                                                                                   |
| SettlementCurrencyAlpha        | M   | A    | 3        | Settlement alpha value (i.e. GBP)                                                                                                                    |
| SettlementCurrencyCode         | M   | N    | 3        | Settlement [`currency`](#appendix--enum--currency)                                                                                                   |
| CountryIson                    | M   | N    | 3        | Country ison code                                                                                                                                    |
| EpmAddressId                   | M   | N    | [1-20]   |                                                                                                                                                      |
| EpmSchemesId                   | M   | N    | [1-20]   | [`External payment scheme`](#appendix--enum--epm--scheme)                                                                                            |
| EpmMandateId                   | O   | N    | [1-20]   |                                                                                                                                                      |
| AccountId                      | M   | N    | [1-20]   | Account ID associated with transaction.                                                                                                              |
| AccountType                    | M   | N    | [1-3]    | [`Account type`](#appendix--enum--epm--account-type)                                                                                                 |
| CardHolderId                   | M   | N    | [1-20]   | Holder id associated with account                                                                                                                    |
| TransactionId                  | O   | N    | [1-20]   | Unique settlement transaction id                                                                                                                     |
| ReturnedEpmTransactionId       | O   | N    | [1-20]   |                                                                                                                                                      |
| DateCreated                    | M   | NS   | 19       | Format: Y-m-d H:i:s.                                                                                                                                 |
| DueAt                          | C   | NS   | 19       | Format: Y-m-d H:i:s. Provided if a due date is set                                                                                                   |
| ReferenceNumber                | C   | ANS  | [1-20]   | Field will be provided if received from payment originator                                                                                           |
| RequestReferenceId             | O   | ANS  | [1-20]   | Provided if the payment was initiated through the ISAC system and the client provided it                                                             |
| Note                           | O   | ANS  | [0-255]  | Field will be provided if received from payment originator                                                                                           |
| TransactionIdentifier          | O   | N    | [0-100]  | Provided if transaction is incoming                                                                                                                  |
| EndToEndIdentifier             | O   | ANS  | [0-100]  | Provided if transaction is incoming                                                                                                                  |
| IsSuspicious                   | M   | N    | 1        | Possible values: Yes - is suspicious, No - not suspicious.                                                                                           |
| RiskRulesIds                   | O   | ANS  | [0-65535]| Possible values are single ID or comma separated string of rule IDs.                                                                                 |

```xml
<?xml version="1.0" encoding="utf-8"?>
<TxnHeldInRisk>
    <Transaction>
        <EpmTransactionId>16249651529675</EpmTransactionId>
        <TransactionType>1</TransactionType>
        <StatusCode>13</StatusCode>
        <ManualApprovalStatus/>
        <SettlementAmountValue>0.01</SettlementAmountValue>
        <SettlementCurrencyAlpha>GBP</SettlementCurrencyAlpha>
        <SettlementCurrencyCode>826</SettlementCurrencyCode>
        <CountryIson>826</CountryIson>
        <EpmAddressId>15312</EpmAddressId>
        <EpmSchemesId>0</EpmSchemesId>
        <EpmMandateId/>
        <AccountId>52314</AccountId>
        <AccountType>1</AccountType>
        <CardholderId>33680</CardholderId>
        <TransactionId>16249651529587</TransactionId>
        <ReturnedEpmTransactionId/>
        <DateCreated>2021-06-29 11:12:29</DateCreated>
        <DueAt>2021-08-25 10:26:44</DueAt>
        <ReferenceNumber/>
        <RequestReferenceId/>
        <Note>justas-1</Note>
        <TransactionIdentifier/>
        <EndToEndIdentifier/>
        <IsSuspicious>No</IsSuspicious>
        <RiskRulesIds>57</RiskRulesIds>
    </Transaction>
</TxnHeldInRisk>
```

### File name structure

| Part                            | M | Description                                                                |
|---------------------------------|---|----------------------------------------------------------------------------|
| epm-transactions-held-in-risk   | M | Report type.                                                               |
| 1                               | M | Client ID.                                                                 |
| 20210804                        | M | Date (format `Ymd`).                                                       |
| xml                             | M | File extension.                                                            |

```
epm-transactions-held-in-risk-1-20210804.xml
```

## Transactions held in risk outcome
### Data elements

|Field name                      | M   | Type | Length   | Description                                                                                                                                          |
|--------------------------------|-----|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| EpmTransactionId               | M   | N    | 1-20     | Unique external payment transaction ID.                                                                                                              |
| TransactionType                | M   | N    | 1-3      | [`Transaction type`](#appendix--enum--transaction-type)                                                                                              |
| StatusCode                     | M   | N    | 1-3      | [`Transaction status code`](#appendix--enum--epm--transaction-status-code)                                                                           |
| ManualApprovalStatus           | O   | N    | 1-3      | [`Manual approval status`](#appendix--enum--epm--manual-approval-status)                                                                             |
| SettlementAmountValue          | M   | NS   | [1-20]   | Settlement amount expressed in Settlement Currency                                                                                                   |
| SettlementCurrencyAlpha        | M   | A    | 3        | Settlement alpha value (i.e. GBP)                                                                                                                    |
| SettlementCurrencyCode         | M   | N    | 3        | Settlement [`currency`](#appendix--enum--currency)                                                                                                   |
| CountryIson                    | M   | N    | 3        | Country ISO number.                                                                                                                                  |
| EpmAddressId                   | M   | N    | [1-20]   |                                                                                                                                                      |
| EpmSchemesId                   | M   | N    | [1-20]   | [`External payment scheme`](#appendix--enum--epm--scheme)                                                                                            |
| EpmMandateId                   | O   | N    | [1-20]   |                                                                                                                                                      |
| AccountId                      | M   | N    | [1-20]   | Account ID associated with the transaction.                                                                                                          |
| AccountType                    | M   | N    | [1-3]    | [`Account type`](#appendix--enum--epm--account-type)                                                                                                 |
| CardHolderId                   | M   | N    | [1-20]   | Holder ID associated with the account.                                                                                                               |
| TransactionId                  | O   | N    | [1-20]   | Unique settlement transaction ID.                                                                                                                    |
| ReturnedEpmTransactionId       | O   | N    | [1-20]   |                                                                                                                                                      |
| DateCreated                    | M   | NS   | 19       | Format: Y-m-d H:i:s.                                                                                                                                 |
| DueAt                          | C   | NS   | 19       | Format: Y-m-d H:i:s. Provided if a due date is set.                                                                                                  |
| ReferenceNumber                | C   | ANS  | [1-20]   | Provided if received from the payment originator.                                                                                                    |
| RequestReferenceId             | O   | ANS  | [1-20]   | Provided if the payment was initiated through the Tribe Payments system and the client provided it.                                                  |
| Note                           | O   | ANS  | [0-255]  | Provided if received from the payment originator.                                                                                                    |
| TransactionIdentifier          | O   | N    | [0-100]  | Provided if transaction is incoming.                                                                                                                 |
| EndToEndIdentifier             | O   | ANS  | [0-100]  | Provided if transaction is incoming.                                                                                                                 |
| IsSuspicious                   | M   | N    | 1        | Possible values: Yes - is suspicious, No - not suspicious.                                                                                           |
| RiskRulesIds                   | O   | ANS  | [0-65535]| Possible values: single ID or comma separated string of rule IDs.                                                                                    |
| Outcome                        | C   | N    | 1-3      | [`Outcome`](#appendix--enum--epm--outcome)                                                                                                           |
| OperatorId                     | C   | N    | [1-20]   | The Operator approving or rejecting transaction.                                                                                                     |
| Reason                         | C   | ANS  | [0-255]  | Set by the Operator when approving or rejecting transaction.                                                                                         |

```xml
<?xml version="1.0" encoding="utf-8"?>
<TxnHeldInRiskOutcome>
    <Transaction>
        <EpmTransactionId>16249651529675</EpmTransactionId>
        <TransactionType>1</TransactionType>
        <StatusCode>13</StatusCode>
        <ManualApprovalStatus/>
        <SettlementAmountValue>0.01</SettlementAmountValue>
        <SettlementCurrencyAlpha>GBP</SettlementCurrencyAlpha>
        <SettlementCurrencyCode>826</SettlementCurrencyCode>
        <CountryIson>826</CountryIson>
        <EpmAddressId>15312</EpmAddressId>
        <EpmSchemesId>0</EpmSchemesId>
        <EpmMandateId/>
        <AccountId>52314</AccountId>
        <AccountType>1</AccountType>
        <CardholderId>33680</CardholderId>
        <TransactionId>16249651529587</TransactionId>
        <ReturnedEpmTransactionId/>
        <DateCreated>2021-06-29 11:12:29</DateCreated>
        <DueAt>2021-08-25 10:26:44</DueAt>
        <ReferenceNumber/>
        <RequestReferenceId/>
        <Note>justas-1</Note>
        <TransactionIdentifier/>
        <EndToEndIdentifier/>
        <IsSuspicious>No</IsSuspicious>
        <RiskRulesIds>57</RiskRulesIds>
        <Outcome>1</Outcome>
        <OperatorId>1</OperatorId>
        <Reason>Genuine TX</Reason>
    </Transaction>
</TxnHeldInRiskOutcome>
```

### File name structure

| Part                                  | M | Description                                                |
|---------------------------------------|---|------------------------------------------------------------|
| epm-transactions-held-in-risk-outcome | M | Report type.                                               |
| 1                                     | M | Client ID.                                                 |
| 20210804                              | M | Date (format `Ymd`).                                       |
| regen                                 | C | Is regenerated (available only if the report was regenerated). |
| 1                                     | C | Regeneration count.                                        |
| xml                                   | M | File extension.                                            |

```
epm-transactions-held-in-risk-outcome-1-20210804.xml
```


## Authorise
### Data elements

| Parameter                                   | M   | Type   | Length    | Description                                                                                                                                                                                                    |
|-------------------------------------------- | --- | ------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TransactionType                             | M   | N      | [1-11]    | [`Transaction type`](#appendix--enum--transaction-type).                                                                                                                                                       |
| EntryModeType                               | M   | N      | [1-11]    | [`Entry mode type`](#appendix--enum--entry-mode-type).                                                                                                                                                         |
| AuthorizeId                                 | M   | N      | [1-20]    | Authorisation ID.                                                                                                                                                                                              |
| TransLink                                   | M   | ANS    | [1-100]   |                                                                                                                                                                                                                |
| TransactionDateTime                         | M   | NS     | 19        | Transaction date time.                                                                                                                                                                                         |
| SettlementDate                              | C   | NS     | 10        | Provided when received by Card Scheme.                                                                                                                                                                         |
| CardProduct                                 | M   | N      | [1-20]    | Product ID associated with authorisation.                                                                                                                                                                      |
| CardProgram                                 | M   | N      | [1-20]    | Program ID associated with authorisation.                                                                                                                                                                      |
| CardId                                      | M   | N      | [1-20]    | Card ID associated with authorisation.                                                                                                                                                                         |
| AccountId                                   | M   | N      | [1-20]    | Account ID associated with authorisation.                                                                                                                                                                      |
| HolderId                                    | M   | N      | [1-20]    | Holder ID  associated with authorisation.                                                                                                                                                                      |
| TransactionAmount / currency                | M   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value                                                                                                                                                                                     |
| TransactionAmount / value                   | M   | NS     | [1-20]    |                                                                                                                                                                                                                |
| BillingAmount / currency                    | M   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value                                                                                                                                                                                     |
| BillingAmount / value                       | M   | NS     | [1-20]    |                                                                                                                                                                                                                |
| BillingAmount / rate                        | M   | NS     | 16;9      |                                                                                                                                                                                                                |
| CardholderAmount / currency                 | M   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value                                                                                                                                                                                     |
| CardholderAmount / value                    | M   | NS     | [1-20]    |                                                                                                                                                                                                                |
| CardholderAmount / rate                     | M   | NS     | 16;9      |                                                                                                                                                                                                                |
| CashBackAmount / currency                   | C   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value. Provided when received by Card Scheme.                                                                                                                                              |
| CashBackAmount / value                      | M   | NS     | [1-20]    | Default value - 0, CashBack amount provided when authorization with cashback occurs.                                                                                                                           |
| AuthCode                                    | M   | N      | [1-6]     |                                                                                                                                                                                                                |
| RetrievalReferenceNumber                    | C   | N      | [1-20]    | Provided when received by Card Scheme.                                                                                                                                                                         |
| MerchantId                                  | M   | AN     | [1-15]    |                                                                                                                                                                                                                |
| MerchantName                                | M   | ANS    | [1-50]    |                                                                                                                                                                                                                |
| MerchantTerminalId                          | C   | ANS    | [1-11]    | Provided when received by Card Scheme.                                                                                                                                                                         |
| SchemeId                                    | M   | N      | [1-11]    | [`Scheme ID`](#appendix--enum--scheme-id).                                                                                                                                                                     |
| TransactionFee / currency                   | M   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value.                                                                                                                                                                                     |
| TransactionFee / value                      | M   | NS     | [1-20]    |                                                                                                                                                                                                                |
| SettlementAmount / currency                 | C   | N      | 3         | [`Currency ison`](#appendix--enum--currency) 3 digit numeric value. Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                                            |
| SettlementAmount / value                    | C   | NS     | [1-20]    | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                                                                       |
| SettlementAmount / rate                     | C   | NS     | 16;9      | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                                                                       |
| IssuerId                                    | M   | N      | [1-11]    |                                                                                                                                                                                                                |
| AcquirerId                                  | C   | N      | [1-11]    | Provided when received by Card Scheme.                                                                                                                                                                         |
| ForwarderId                                 | C   | N      | [1-11]    | Provided when received by Card Scheme.                                                                                                                                                                         |
| Mcc                                         | M   | N      | 4         | Merchant Category Code.                                                                                                                                                                                        |
| CountryIson                                 | C   | A      | 3         | Provided when received by Card Scheme. On Negative Acknowledgement this field is not required.                                                                                                                 |
| Suspicious                                  | M   | A      | 3         | Possible values: `Yes` - is suspicious, `No` - not suspicious.                                                                                                                                                 |
| Reversal                                    | M   | A      | 3         | Possible values: `Yes` - is reversal, `No` - not reversal.                                                                                                                                                     |
| AuthorisedViaTai                            | M   | A      | 3         | Possible values: `Yes` - is authorised via TAI, `No` - not authorised via TAI.                                                                                                                                 |
| RiskRuleCodes                               | O   | ANS    | [1-65535] | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                                                                               |
| RiskActions / RiskAction                    | O   | LIST   | \-        | [`Risk rule action`](#appendix--enum--risk-rule-action).                                                                                                                                                       |
| SecurityChecks / SecurityCheck              | O   | LIST   | \-        | [`Security check`](#appendix--enum--security-check).                                                                                                                                                           |
| AdviceDetailCode                            | C   | AN     | 4         | Provided when received by Card Scheme.                                                                                                                                                                         |
| AdviceReasonCode                            | C   | AN     | 5         | Provided when received by Card Scheme.                                                                                                                                                                         |
| AuthorisationType                           | M   | A      | 3         |                                                                                                                                                                                                                |
| CardPresent                                 | M   | A      | [1-16]    | Possible values: `Card present`, `Card not present`.                                                                                                                                                           |
| CumulativePaddingAmount                     | C   | NS     | [1-20]    | Calculated padding amount based on the existing padding config. It will be returned if padding is configured and was triggered with that particular transaction.                                               |
| AppliedPaddingAmount                        | C   | NS     | [1-20]    | Actually applied padding amount (if cumulativePaddingAmount was set and it was greater than initial holder amount, then here will be cumulativePaddingAmount - initial holder amount = appliedPaddingAmount).  |
| AvsResult                                   | C   | AN     | 1         | Address Verification Service Response. Will be returned only when address verification is performed. MasterCard: DE48 SF83, Visa: DE44 SF2.                                                                    |
| Cvc2Result                                  | C   | AN     | 1         | Card Validation Code Result. Will be returned only when CVC2 check is performed.                                                                                                                               |
| CvmResult                                   | C   | AN     | 6         | Provided when received by Card Scheme in Integrated Chip Card data (DE55).                                                                                                                                     |
| EciIndicator                                | C   | ANS    | [1-3]     | Present in e-commerce authorizations. MasterCard - DE48 SF42 (electronicCommerceIndicators). Visa - DE60 SF08 (electronicCommerceAndPaymentIndicator).                                                         |
| LimitError                                  | C   | ANS    | [1-255]   | Provided when limit has been reached.                                                                                                                                                                          |
| Mti                                         | M   | AN     | 4         | Message type identifier.                                                                                                                                                                                       |
| Note                                        | O   | ANS    | [0-65535] | Provided when card processing detects potential problem or stops processing because of the real occurred problem.                                                                                              |
| PosEntryMode                                | M   | ANS    | [3-4]     | Provided when received by Card Scheme.                                                                                                                                                                         |
| PosData                                     | C   | ANS    | 61        | Provided when received by Card Scheme. On Negative Acknowledgement and Reversal Advice this field is not required.                                                                                             |
| ProcessingCode                              | M   | AN     | 6         |                                                                                                                                                                                                                |
| ResponseCode                                | M   | AN     | 2         |                                                                                                                                                                                                                |
| ResponseCodeDescription                     | M   | ANS    | [1-255]   |                                                                                                                                                                                                                |
| Stan                                        | M   | N      | 6         | System trace audit number                                                                                                                                                                                      |
| TraceNumber                                 | C   | AN     | [1-255]   | Provided when received by Card Scheme.                                                                                                                                                                         |
| DateCreated                                 | M   | NS     | 18        |                                                                                                                                                                                                                |

```xml
<?xml version="1.0" encoding="utf-8"?>
<Authorizes>
  <Authorize>
    <TransactionType>2</TransactionType>
    <EntryModeType>3</EntryModeType>
    <AuthorizeId>15929084477684</AuthorizeId>
    <TransLink>697681000000MDS8D4A5S382683200612123456</TransLink>
    <TransactionDateTime>2020-06-12 08:02:43</TransactionDateTime>
    <SettlementDate/>
    <CardProductId>1</CardProductId>
    <CardProgramId>1</CardProgramId>
    <CardId>123456</CardId>
    <AccountId>1</AccountId>
    <HolderId>1</HolderId>
    <TransactionAmount currency="978" value="-7.50"/>
    <BillingAmount currency="978" value="-7.50" rate="1"/>
    <CardholderAmount currency="840" value="-8.27" rate="1"/>
    <CashBackAmount currency="" value="0"/>
    <AuthCode>697681</AuthCode>
    <RetrievalReferenceNumber>016408382683</RetrievalReferenceNumber>
    <MerchantId>526567000239488</MerchantId>
    <MerchantName>Wolt                   Athens        GRC</MerchantName>
    <MerchantTerminalId/>
    <SchemeId>1</SchemeId>
    <TransactionFee currency="978" value="0.00"/>
    <SettlementAmount currency="978" value="-8.27" rate="1"/>
    <IssuerId>15801077486281</IssuerId>
    <AcquirerId>013445</AcquirerId>
    <ForwarderId>200353</ForwarderId>
    <Mcc>5812</Mcc>
    <CountryIson>300</CountryIson>
    <Suspicious>No</Suspicious>
    <Reversal>No</Reversal>
    <AuthorisedViaTai>Yes</AuthorisedViaTai>
    <RiskRuleCodes/>
    <RiskActions>
      <MarkTransactionAsSuspicious>0</MarkTransactionAsSuspicious>
      <NotifyCardholderBySendingTAIsNotification>0</NotifyCardholderBySendingTAIsNotification>
      <ChangeCardStatusToRisk>0</ChangeCardStatusToRisk>
      <ChangeAccountStatusToSuspended>0</ChangeAccountStatusToSuspended>
      <RejectTransaction>0</RejectTransaction>
    </RiskActions>
    <SecurityChecks>
      <CardExpirationDatePresent>0</CardExpirationDatePresent>
      <OnlinePIN>0</OnlinePIN>
      <OfflinePIN>0</OfflinePIN>
      <ThreeDomainSecure>0</ThreeDomainSecure>
      <Cvv2>0</Cvv2>
      <MagneticStripe>0</MagneticStripe>
      <ChipData>0</ChipData>
      <AVS>0</AVS>
      <PhoneNumber>0</PhoneNumber>
      <Signature>0</Signature>
    </SecurityChecks>
    <AdviceDetailCode/>
    <AdviceReasonCode/>
    <AuthorisationType>AR</AuthorisationType>
    <CardPresent>Card not present</CardPresent>
    <CumulativePaddingAmount>0.00</CumulativePaddingAmount>
    <AppliedPaddingAmount>0.00</AppliedPaddingAmount>
    <AvsResult/>
    <Cvc2Result/>
    <CvmResult/>
    <EciIndicator>210</EciIndicator>
    <LimitError/>
    <Mti>0100</Mti>
    <Note/>
    <PosEntryMode>812</PosEntryMode>
    <PosData>102410000600030011251</PosData>
    <ProcessingCode>000000</ProcessingCode>
    <ResponseCode>00</ResponseCode>
    <ResponseCodeDescription>Approved or completed successfully</ResponseCodeDescription>
    <Stan>382683</Stan>
    <TraceNumber>MDS8D4A5S0612</TraceNumber>
    <DateCreated>2020-06-23 10:34:01</DateCreated>
  </Authorize>
</Authorizes>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
authorizes-1-20-20200327.xml
```

## Card account
### Data elements

| Parameter                    | M | Type | Length | Description                                                |
|------------------------------|---|------|--------|------------------------------------------------------------|
| AccountId                    | M | N    | [1-20] |                                                            |
| HolderId                     | M | N    | [1-20] |                                                            |
| ProgramId                    | M | N    | [1-20] |                                                            |
| CurrencyIson                 | M | N    | 3      | [`Currency ison`](#appendix--enum--currency)                   |
| AvailableBalance             | M | NS   | [1-20] |                                                            |
| SettledBalance               | M | NS   | [1-20] |                                                            |
| ReservedBalance              | M | NS   | [1-20] |                                                            |
| AccountStatus                | M | A    | [1-2]  | [`Account status`](#appendix--enum--account-status).       |
| AccountStatusDate                        | O | NS   | 19      |                                                                             |
| AccountStatusChangeSource                | O | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| AccountStatusChangeReasonCode            | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| AccountStatusChangeNote                  | O | ANS  | [1-255] | A short description which explains why account status has been changed.     |
| AccountStatusChangeOriginatorId          | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| DateUpdated                  | C | NS   | 19     |                                                            |
| Cards / Card / CardId        | C | N    | [1-20] |                                                            |
| Cards / Card / Virtual       | C | A    | [2-3]  | Is virtual card (`Yes` / `No`).                            |
| Cards / Card / Primary       | C | A    | [2-3]  | Is primary card (`Yes` / `No`).                            |
| Cards / Card / CardProductId | C | N    | [1-20] |                                                            |
| Cards / Card / CardProgramId | C | N    | [1-20] |                                                            |
| Cards / Card / ReferenceId   | C | N    | [1-20] |                                                            |
| Cards / Card / HolderId      | C | N    | [1-20] |                                                            |
| Cards / Card / CurrencyIson  | C | N    | 3      | [`Currency ison`](#appendix--enum--currency)                   |
| Cards / Card / Status        | C | A    | [1-2]  | [`Card status code`](##appendix--enum--card--status-code). |
| Cards / Card / StatusDate                | O | NS   | 19      |                                                                             |
| Cards / Card / StatusChangeSource        | O | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| Cards / Card / StatusChangeReasonCode    | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| Cards / Card / StatusChangeNote          | O | ANS  | [1-255] | A short description which explains why card status has been changed.        |
| Cards / Card / StatusChangeOriginatorId  | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| Cards / Card / ExpiryDate    | C | NS    | 7      |                                                            |

```xml
<?xml version="1.0" encoding="utf-8"?>
<Accounts>
    <Account>
        <AccountId>1</AccountId>
        <HolderId>1</HolderId>
        <ProgramId>1</ProgramId>
        <CurrencyIson>826</CurrencyIson>
        <AvailableBalance>10.00</AvailableBalance>
        <SettledBalance>10.00</SettledBalance>
        <ReservedBalance>0.00</ReservedBalance>
        <AccountStatus>A</AccountStatus>
        <AccountStatusDate/>
        <AccountStatusChangeSource/>
        <AccountStatusChangeReasonCode/>
        <AccountStatusChangeNote/>
        <AccountStatusChangeOriginatorId/>
        <DateUpdated>2019-05-09 14:48:28</DateUpdated>
        <Cards>
            <Card>
                <CardId>123457</CardId>
                <Virtual>No</Virtual>
                <Primary>Yes</Primary>
                <CardProductId>1</CardProductId>
                <CardProgramId>1</CardProgramId>
                <ReferenceId>123456</ReferenceId>
                <HolderId>1</HolderId>
                <CurrencyIson>826</CurrencyIson>
                <Status>A</Status>
                <StatusDate/>
                <StatusChangeSource/>
                <StatusChangeReasonCode/>
                <StatusChangeNote/>
                <StatusChangeOriginatorId/>
                <ExpiryDate>2022-01</ExpiryDate>
            </Card>
        </Cards>
    </Account>
</Accounts>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
accounts-1-20-20200327.xml
```

## Card event
### Data elements

| Parameter              | M | Type | Length | Description                                                 |
|------------------------|---|------|--------|-------------------------------------------------------------|
| CardId                 | M | N    | [1-20] |                                                             |
| CardProduct            | M | N    | [1-20] | Card product id.                                            |
| Event / Type           | M | AS   | [1-20] | [`Card event type`](#appendix--enum--card--event-type).     |
| Event / Date           | M | NS   | 19     |                                                             |
| Event / OldCardStatus  | C | A    | [1-2]  | [`Card status code`](#appendix--enum--card--status-code).   |
| Event / CardStatus     | C | A    | [1-2]  | [`Card status code`](#appendix--enum--card--status-code).   |
| Event / ActivationDate | C | NS   | 19     |                                                             |
| Event / Source         | M | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| Event / ReasonCode     | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| Event / Note           | O | ANS  | [1-255] | A short description which explains why card status has been changed.        |
| Event / OriginatorId   | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |

```xml
<?xml version="1.0" encoding="utf-8"?>
<CardsEvents>
    <CardEvent>
        <CardId>123456</CardId>
        <CardProduct>1</CardProduct>
        <Event Type="Activation" Date="2019-04-18 13:59:50" OldCardStatus="N" CardStatus="A" ActivationDate="2019-04-18 13:59:49" Source="0" ReasonCode="13" Note="Card has been suspended" OriginatorId="1"/>
    </CardEvent>
</CardsEvents>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
cards-events-1-20-20200327.xml
```

## Card generation
### Data elements

| Parameter                                    | M | Type | Length  | Description                                                                                                                                                                          |
|----------------------------------------------|---|------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DATA_FORMAT_VERSION                          | M | N    | [1-3]   | Currently set to '9'.                                                                                                                                                                |
| FILEDATE                                     | M | NS   | 10      | The date the file is produced by the %brandName% system in `DD-MM-YYYY` format.                                                                                                      |
| FILETIME                                     | M | NS   | 8       | The timestamp of when the file is produced in the %brandName% system, in `HH:MM:SS` format.                                                                                          |
| NO_OF_CARRIERS                               | M | N    | [1-8]   | Defines how many sets of packaged cards for delivery in the file.                                                                                                                    |
| NO_OF_CARDS                                  | M | N    | [1-8]   | Defines how many card records are present in the file.                                                                                                                               |
| NO_OF_PRODUCTS                               | M | N    | [1-8]   | Defines how many products are present in the file.                                                                                                                                   |
| TXREF                                        | M | N    | [1-20]  | Unique ID for the file generated by the %brandName% platform.                                                                                                                        |
| ORDER_REF                                    | O | AN   | 16      | Reserved for future use.                                                                                                                                                             |
| PRODUCT / PRODUCT_REF                        | M | ANS  | 12      | Pre defined Product code agreed with the client.                                                                                                                                     |
| PRODUCT / RECORD / REQUEST_TYPE              | M | A    | [1-8]   | [`Card generation request type`](#appendix--enum--card--generation-request-type).                                                                                                    |
| PRODUCT / RECORD / UID                       | M | N    | [1-20]  | Unique card ID (Token) generated by the %brandName% system.                                                                                                                          |
| PRODUCT / RECORD / CARRIER / TITLE           | O | AS   | [1-7]   | Title of the cardholder that should be added to the carrier, e.g. Mr, Miss, Mrs, etc.                                                                                                |
| PRODUCT / RECORD / CARRIER / FNAME           | M | AS   | [1-50]  | Forename of the cardholder details that should be added to the carrier.                                                                                                              |
| PRODUCT / RECORD / CARRIER / SNAME           | M | AS   | [1-50]  | Surname of the cardholder details that should be added to the carrier.                                                                                                               |
| PRODUCT / RECORD / CARRIER / ADD1            | M | ANS  | [1-100] | First line of the delivery address.                                                                                                                                                  |
| PRODUCT / RECORD / CARRIER / ADD2            | O | ANS  | [1-100] | Second line of the delivery address.                                                                                                                                                 |
| PRODUCT / RECORD / CARRIER / ADD3            | O | ANS  | [1-100] | Third line of the delivery address.                                                                                                                                                  |
| PRODUCT / RECORD / CARRIER / ADD4            | O | ANS  | [1-100] | Fourth line of the delivery address.                                                                                                                                                 |
| PRODUCT / RECORD / CARRIER / CITY            | M | ANS  | [1-50]  | City of the delivery address.                                                                                                                                                        |
| PRODUCT / RECORD / CARRIER / POSTCODE        | M | ANS  | [1-9]   | Postcode or Zipcode for the delivery address.                                                                                                                                        |
| PRODUCT / RECORD / CARRIER / COUNTRY         | M | N    | 3       | ISO 3 digit numeric value for the country.                                                                                                                                           |
| PRODUCT / RECORD / CARRIER / BULK_ADD1       | C | ANS  | [1-100] | First line of the bulk delivery address. If populated this supersedes the address destination above. All entries with the same Bulk delivery address will be grouped together.       |
| PRODUCT / RECORD / CARRIER / BULK_ADD2       | O | ANS  | [1-100] | Second line of the bulk delivery address. If populated this supersedes the address destination above. All entries with the same Bulk delivery address will be grouped together.      |
| PRODUCT / RECORD / CARRIER / BULK_ADD3       | O | ANS  | [1-100] | Third line of the bulk delivery address. If populated this supersedes the address destination above. All entries with the same Bulk delivery address will be grouped together.       |
| PRODUCT / RECORD / CARRIER / BULK_ADD4       | O | ANS  | [1-100] | Reserved for future use.                                                                                                                                                             |
| PRODUCT / RECORD / CARRIER / BULK_CITY       | C | ANS  | [1-50]  | City of the bulk delivery address. If populated this supersedes the address destination above. All entries with the same Bulk delivery address will be grouped together.             |
| PRODUCT / RECORD / CARRIER / BULK_POSTCODE   | C | ANS  | [1-9]   | Postcode/Zipcode of the bulk delivery address. If populated this supersedes the address destination above. All entries with the same Bulk delivery address will be grouped together. |
| PRODUCT / RECORD / CARRIER / BULK_COUNTRY    | C | N    | 3       | ISO 3 digit numeric value for the country.                                                                                                                                           |
| PRODUCT / RECORD / CARRIER / CARRIER_TYPE    | M | ANS  | [1-50]  | Predefined value agreed with the client to define the carrier set.                                                                                                                   |
| PRODUCT / RECORD / CARRIER / CARRIER_LOGO_ID | M | AN   | [1-12]  | Predefined value agreed with the client to define the company logo that should be added to the Carrier information.                                                                  |
| PRODUCT / RECORD / CARRIER / DELV_METHOD     | M | N    | [1-10]  | Predefined value agreed with the client to define the delivery method, e.g first class mail or courier.                                                                              |
| PRODUCT / RECORD / CARRIER / DELV_CODE       | C | AN   | [1-10]  | Identifies all cards that should be grouped together in the file for bulk delivery.                                                                                                  |
| PRODUCT / RECORD / CARRIER / FULFIL1         | O | AN   | [1-10]  | Additional fulfillment parameter, possible values must be agreed separately with the client.                                                                                         |
| PRODUCT / RECORD / CARRIER / FULFIL2         | O | AN   | [1-10]  | Additional fulfillment parameter, possible values must be agreed separately with the client.                                                                                         |
| PRODUCT / RECORD / CARRIER / LANG            | O | N    | 3       | Alpha character value for the language to print on the carrier information. Can also be used to define the CHIP language if not predefined with client codes supplied.               |
| PRODUCT / RECORD / CARD / TYPE               | M | AS   | 12      | Currently set to 'Chip&Mag'.                                                                                                                                                         |
| PRODUCT / RECORD / CARD / CURRENCY           | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                                                          |
| PRODUCT / RECORD / CARD / EMBOSS_PAN         | M | NS   | [1-24]  | Card Primary Account Number as printed on the card.                                                                                                                                  |
| PRODUCT / RECORD / CARD / PASSCODE           | O | NS   | [1-19]  | Reserved for future use.                                                                                                                                                             |
| PRODUCT / RECORD / CARD / EMBOSS_NAME        | M | ANS  | [3-26]  | Cardholder name as printed on the card.                                                                                                                                              |
| PRODUCT / RECORD / CARD / EMBOSS_START       | M | NS   | 5       | The month the card and CHIP application can be active in format `MM/YY`.                                                                                                             |
| PRODUCT / RECORD / CARD / EMBOSS_EXPIRY      | M | NS   | 5       | The month the card and CHIP application expire in format `MM/YY`.                                                                                                                    |
| PRODUCT / RECORD / CARD / EMBOSS_LINE4       | O | ANS  | [2-50]  | Freeform field as presented by the client at card creation to %brandName%, to be embossed on the card.                                                                               |
| PRODUCT / RECORD / CARD / IMAGE_ID           | M | ANS  | [1-12]  | Predefined Image ID agreed with the client.                                                                                                                                          |
| PRODUCT / RECORD / CARD / LOGO_FRONT_ID      | M | ANS  | [1-12]  | Predefined logo for the front of the card agreed with the client                                                                                                                     |
| PRODUCT / RECORD / CARD / LOGO_BACK_ID       | M | ANS  | [1-12]  | Predefined logo for the back of the card agreed with the client.                                                                                                                     |
| PRODUCT / RECORD / CARD / QRCODE             | O | ANS  | [1-200] | Reserved for future use.                                                                                                                                                             |

```xml
<?xml version="1.0" encoding="utf-8"?>
<CARDGEN>
	<DATA_FORMAT_VERSION>9</DATA_FORMAT_VERSION>
	<FILEDATE>10-07-2019</FILEDATE>
	<FILETIME>05:03:03</FILETIME>
	<NO_OF_CARRIERS>32</NO_OF_CARRIERS>
	<NO_OF_CARDS>32</NO_OF_CARDS>
	<NO_OF_PRODUCTS>0</NO_OF_PRODUCTS>
	<TXREF>20<TXREF/>
	<ORDER_REF/>
	<PRODUCT>
		<PRODUCT_REF>TST001</PRODUCT_REF>
		<RECORD>
			<REQUEST_TYPE>New</REQUEST_TYPE>
			<UID>12</UID>
			<CARRIER>
				<TITLE>Mr</TITLE>
				<FNAME>User</FNAME>
				<SNAME>Name</SNAME>
				<ADD1>Test St</ADD1>
				<ADD2/>
				<ADD3/>
				<ADD4/>
				<CITY>London</CITY>
				<POSTCODE>123456</POSTCODE>
				<COUNTRY>826</COUNTRY>
				<BULK_ADD1>Test St</BULK_ADD1>
				<BULK_ADD2/>
				<BULK_ADD3/>
				<BULK_ADD4/>
				<BULK_CITY>London</BULK_CITY>
				<BULK_POSTCODE>123456</BULK_POSTCODE>
				<BULK_COUNTRY>826</BULK_COUNTRY>
				<CARRIER_TYPE>TST001</CARRIER_TYPE>
				<CARRIER_LOGO_ID>TST001</CARRIER_LOGO_ID>
				<DELV_METHOD>2</DELV_METHOD>
				<DELV_CODE>14</DELV_CODE>
				<FULFIL1/>
				<FULFIL2/>
				<LANG>ENG</LANG>
			</CARRIER>
			<CARD>
				<TYPE>Chip&amp;amp;Mag</TYPE>
				<CURRENCY>826</CURRENCY>
				<EMBOSS_PAN>9999 9999 9999 9999</EMBOSS_PAN>
				<PASSCODE/>
				<EMBOSS_NAME>Test</EMBOSS_NAME>
				<EMBOSS_START>07/19</EMBOSS_START>
				<EMBOSS_EXPIRY>01/22</EMBOSS_EXPIRY>
				<EMBOSS_LINE4>Test</EMBOSS_LINE4>
				<IMAGE_ID>1</IMAGE_ID>
				<LOGO_FRONT_ID>1</LOGO_FRONT_ID>
				<LOGO_BACK_ID>1</LOGO_BACK_ID>
				</QRCODE>
			</CARD>
		</RECORD>
	</PRODUCT>
</CARDGEN>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
cards-generations-1-20-20200327.xml
```

## Card transaction
### Data elements

| Parameter                               | M   | Type | Length  | Description                                                                                                                                                                        |
|-----------------------------------------|-----|------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TransactionType                         | M   | N    | [1-11]  | [`Transaction type`](#appendix--enum--transaction-type).                                                                                                                           |
| EntryModeType                           | M   | N    | [1-11]  | [`Entry mode type`](#appendix--enum--entry-mode-type).                                                                                                                             |
| TransactionId                           | M   | N    | [1-20]  | Unique transaction ID in Platform’s database.                                                                                                                                      |
| TransLink                               | M   | ANS  | [1-100] |                                                                                                                                                                                    |
| TransactionLocalTime                    | C   | NS   | 19      | Transaction local date time.                                                                                                                                                       |
| ReconciliationDate                      | C   | NS   | 10      |                                                                                                                                                                                    |
| SettlementDate                          | C   | NS   | 10      |                                                                                                                                                                                    |
| DateTimeProcessed                       | C   | NS   | 19      |                                                                                                                                                                                    |
| CardProduct                             | C   | N    | [1-20]  | Product ID associated with transaction.                                                                                                                                            |
| Program                                 | M   | N    | [1-20]  | Program ID associated with transaction.                                                                                                                                            |
| CardId                                  | C   | N    | [1-20]  | Card ID associated with transaction.                                                                                                                                               |
| AccountId                               | C   | N    | [1-20]  | Account ID associated with transaction.                                                                                                                                            |
| TransactionAmount / currency            | M   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| TransactionAmount / value               | M   | NS   | [1-20]  |                                                                                                                                                                                    |
| BillingAmount / currency                | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| BillingAmount / value                   | C   | NS   | [1-20]  |                                                                                                                                                                                    |
| BillingAmount / rate                    | C   | NS   | 16;9    |                                                                                                                                                                                    |
| CardholderAmount / currency             | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| CardholderAmount / value                | C   | NS   | [1-20]  |                                                                                                                                                                                    |
| CardholderAmount / rate                 | M   | NS   | 16;9    | `base_conversion_rate`  with applied FX markup (if FX fee was applied).                                                                                                            |
| BaseConversionRate                      | M   | NS   | 16;9    | Base FX rate that was used to convert transaction / billing currency to account currency (FX markup value is not included).                                                        |
| IsConversionFeeBlended                  | M   | N    | 1       | Possible values: `Yes`, `No`                                                                                                                                                       |
| AuthCode                                | C   | N    | [1-6]   | `DE38`. In clearing for offline purchases auth code will be omitted.                                                                                                               |
| RetrievalReferenceNumber                | C   | N    | [1-20]  |                                                                                                                                                                                    |
| MerchantId                              | C   | AN   | [1-15]  |                                                                                                                                                                                    |
| MerchantName                            | C   | ANS  | [1-100] |                                                                                                                                                                                    |
| MerchantState                           | C   | ANS  | [1-3]   |                                                                                                                                                                                    |
| MerchantCountry                         | C   | A    | 3       | ISO 3 digit numeric value for the country.                                                                                                                                         |
| MerchantTerminalId                      | C   | ANS  | [1-11]  |                                                                                                                                                                                    |
| SchemeId                                | M   | N    | [1-11]  | [`Scheme ID`](#appendix--enum--scheme-id).                                                                                                                                         |
| TransactionFee / currency               | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| TransactionFee / value                  | C   | NS   | [1-20]  |                                                                                                                                                                                    |
| SettlementAmount / currency             | C   | N    | 3       | ISO 3 digit numeric value. Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program. |
| SettlementAmount / value                | C   | NS   | [1-20]  | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                                           |
| SettlementAmount / rate                 | C   | NS   | 16;9    | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                                           |
| AcquirerId                              | C   | N    | [1-11]  |                                                                                                                                                                                    |
| ForwarderId                             | C   | N    | [1-11]  |                                                                                                                                                                                    |
| Mcc                                     | M   | N    | 4       | Merchant Category Code.                                                                                                                                                            |
| ReasonCode                              | C   | NS   | 4       | Mastercard message reason code. DE 25 from clearing file.                                                                                                                          |
| EpmMethodId                             | C   | N    | [1-20]  | Filled if payment transaction is external.                                                                                                                                         |
| EpmTransactionId                        | C   | N    | [1-20]  | Filled if payment transaction is external.                                                                                                                                         |
| TransactionExchangeFeeAmount / currency | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| TransactionExchangeFeeAmount / value    | C   | NS   | [1-20]  |                                                                                                                                                                                    |
| TransactionFeeAmount / currency         | C   | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                                                                                                         |
| TransactionFeeAmount / value            | C   | NS   | [1-20]  |                                                                                                                                                                                    |
| Suspicious                              | M   | N    | 1       | Possible values: `Yes` - is suspicious, `No` - not suspicious.                                                                                                                     |
| RiskRuleCodes                           | O   | ANS  | 1-65535 | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                                                   |
| RiskActions / RiskAction                | O   | LIST | \-      | [`Risk rule action`](#appendix--enum--risk-rule-action).                                                                                                                           |
| FunctionCode                            | C   | N    | 3       | [`Function code`](#appendix--enum--function-code).                                                                                                                                 |
| SecurityChecks / SecurityCheck          | O   | LIST | \-      | [`Security check`](#appendix--enum--security-check).                                                                                                                               |
| TransactionClass                        | C   | AS   | [1-30]  | [`Region type`](#appendix--enum--region-type).                                                                                                                                     |
| ReferenceNumber                         | O   | AN   | [1-255] |                                                                                                                                                                                    |
| LoadType                                | C   | N    | [1-11]  | Filled if payment transaction is internal. Load type value in line with API spec values supported. [Load type](#appendix--enum--load-type)                                         |
| LoadSource                              | C   | N    | [1-11]  | Filled if payment transaction is internal. Load source value in line with the API spec values supported. [Load source](#appendix--enum--load-source)                               |
| ParentTransactionId                     | C   | N    | [1-20]  | Parent transaction ID. Provided if this transaction can be related with the previous transaction.                                                                                  |
| DisputeId                               | C   | N    | [1-20]  | Dispute ID. Provided if the dispute was created.                                                                                                                                   |
| ExternalDisputeId                       | O   | N    | [1-20]  | External system dispute ID if it was provided on dispute create.                                                                                                                   |

```xml
<?xml version="1.0" encoding="utf-8"?>
<CardsTransactions>
	<CardTransaction>
		<TransactionType>2</TransactionType>
		<EntryModeType>3</EntryModeType>
		<TransactionId>12345678901234</TransactionId>
		<TransLink>12345000000000006789000000</TransLink>
		<TransactionLocalTime>2019-08-22 00:41:09</TransactionLocalTime>
		<ReconciliationDate/>
		<SettlementDate>2019-08-25</SettlementDate>
		<DateTimeProcessed>2019-08-26 02:03:31</DateTimeProcessed>
		<CardProduct>1</CardProduct>
		<Program>1</Program>
		<CardId>123456</CardId>
		<AccountId>1</AccountId>
		<TransactionAmount currency="978" value="1.00"/>
		<BillingAmount currency="978" value="1.00" rate="1"/>
		<CardholderAmount currency="978" value="1.00" rate="1"/>
		<BaseConversionRate/>
		<IsConversionFeeBlended>No</IsConversionFeeBlended>
		<AuthCode>123456</AuthCode>
		<RetrievalReferenceNumber>00000000001</RetrievalReferenceNumber>
		<MerchantId>000000000000001</MerchantId>
		<MerchantName>MerchantName London GBR</MerchantName>
		<MerchantState/>
		<MerchantCountry>GBR</MerchantCountry>
		<MerchantTerminalId>abcd_123</MerchantTerminalId>
		<SchemeId>1</SchemeId>
		<TransactionFee currency="978" value="1.00"/>
		<SettlementAmount currency="978" value="1.00" rate="1"/>
		<AcquirerId>12345678</AcquirerId>
		<ForwarderId>12345678</ForwarderId>
		<Mcc>1234</Mcc>
		<ReasonCode/>
		<EpmMethodId/>
		<EpmTransactionId/>
		<Suspicious>No</Suspicious>
		<RiskRuleCodes/>
		<RiskActions>
			<MarkTransactionAsSuspicious>0</MarkTransactionAsSuspicious>
			<NotifyCardholderBySendingTAIsNotification>0</NotifyCardholderBySendingTAIsNotification>
			<ChangeCardStatusToRisk>0</ChangeCardStatusToRisk>
			<ChangeAccountStatusToSuspended>0</ChangeAccountStatusToSuspended>
			<RejectTransaction>0</RejectTransaction>
			<MarkTransactionAsSuspicious>0</MarkTransactionAsSuspicious>
			<NotifyCardholderBySendingTAIsNotification>0</NotifyCardholderBySendingTAIsNotification>
			<ChangeCardStatusToRisk>0</ChangeCardStatusToRisk>
			<ChangeAccountStatusToSuspended>0</ChangeAccountStatusToSuspended>
			<RejectTransaction>0</RejectTransaction>
		</RiskActions>
		<FunctionCode/>
		<SecurityChecks>
			<CardExpirationDatePresent>0</CardExpirationDatePresent>
			<OnlinePIN>0</OnlinePIN>
			<OfflinePIN>0</OfflinePIN>
			<ThreeDomainSecure>0</ThreeDomainSecure>
			<Cvv2>0</Cvv2>
			<MagneticStripe>1</MagneticStripe>
			<ChipData>0</ChipData>
			<AVS>0</AVS>
			<PhoneNumber>0</PhoneNumber>
			<Signature>0</Signature>
		</SecurityChecks>
		<TransactionClass>International</TransactionClass>
        <ReferenceNumber>Refnr123456</ReferenceNumber>
        <LoadType/>
        <LoadSource/>
        <ParentTransactionId/>
        <DisputeId/>
        <ExternalDisputeId/>
	</CardTransaction>
</CardsTransactions>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
cards-transactions-1-20-20200327.xml
```

## Financial authorise
### Data elements

| Parameter                               | M | Type | Length  | Description                                                          |
|-----------------------------------------|---|------|---------|----------------------------------------------------------------------|
| TransactionType                         | M | N    | [1-11]  | [`Transaction type`](#appendix--enum--transaction-type).             |
| EntryModeType                           | M | N    | [1-11]  | [`Entry mode type`](#appendix--enum--entry-mode-type).               |
| AuthorizeId                             | M | N    | [1-20]  | Actual authorise ID.                                                 |
| TransLink                               | M | ANS  | [1-100] |                                                                      |
| TransactionDateTime                     | M | NS   | 19      | Transaction date time.                                               |
| SettlementDate                          | C | NS   | 10      |                                                                      |
| CardProduct                             | C | N    | [1-20]  | Product ID associated with actual authorise.                         |
| CardProgram                             | M | N    | [1-20]  | Program ID associated with actual authorise.                         |
| CardId                                  | M | N    | [1-20]  | Card ID associated with actual authorise.                            |
| TransactionAmount / currency            | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| TransactionAmount / value               | M | NS   | [1-20]  |                                                                      |
| BillingAmount / currency                | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| BillingAmount / value                   | M | NS   | [1-20]  |                                                                      |
| BillingAmount / rate                    | M | NS   | 16;9    |                                                                      |
| CardholderAmount / currency             | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| CardholderAmount / value                | M | NS   | [1-20]  |                                                                      |
| CardholderAmount / rate                 | M | NS   | 16;9    |                                                                      |
| CashBackAmount / currency               | C | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| CashBackAmount / value                  | M | NS   | [1-20]  |                                                                      |
| AuthCode                                | M | N    | [1-6]   | `DE38`. In clearing for offline purchases auth code will be omitted. |
| RetrievalReferenceNumber                | C | N    | [1-20]  |                                                                      |
| MerchantId                              | M | AN   | [1-15]  |                                                                      |
| MerchantName                            | M | ANS  | [1-50]  |                                                                      |
| MerchantTerminalId                      | C | ANS  | [1-11]  |                                                                      |
| SchemeId                                | M | N    | [1-11]  | [`Scheme ID`](#appendix--enum--scheme-id).                           |
| TransactionFee / currency               | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| TransactionFee / value                  | M | NS   | [1-20]  |                                                                      |
| SettlementAmount / currency             | C | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| SettlementAmount / value                | C | NS   | [1-20]  |                                                                      |
| SettlementAmount / rate                 | C | NS   | 16;9    |                                                                      |
| AcquirerId                              | C | N    | [1-11]  |                                                                      |
| ForwarderId                             | C | N    | [1-11]  |                                                                      |
| Mcc                                     | M | N    | 4       | Merchant Category Code.                                              |
| CountryIson                             | C | A    | 3       |                                                                      |
| TransactionExchangeFeeAmount / currency | C | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| TransactionExchangeFeeAmount / value    | C | NS   | [1-20]  |                                                                      |
| TransactionFeeAmount / currency         | C | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).                          |
| TransactionFeeAmount / value            | C | NS   | [1-20]  |                                                                      |
| Suspicious                              | M | N    | 1       | Possible values: `Yes` - is suspicious, `No` - not suspicious.       |
| SecurityChecks / SecurityCheck          | O | LIST | \-      | [`Security check`](#appendix--enum--security-check).                 |
| TransactionClass                        | C | AS   | [1-30]  | [`Region type`](#appendix--enum--region-type).                       |

```xml
<?xml version="1.0" encoding="utf-8"?>
<FinancialAuthorizes>
	<CardFinancialAuthorization>
		<TransactionType>1</TransactionType>
		<EntryModeType>2</EntryModeType>
		<AuthorizeId>12345678901234</AuthorizeId>
		<TransLink>1234567890000000000000000000000</TransLink>
		<TransactionDateTime>2019-08-23 15:08:06</TransactionDateTime>
		<SettlementDate>2019-08-26</SettlementDate>
		<CardProduct>1</CardProduct>
		<CardProgram>1</CardProgram>
		<CardId>123456</CardId>
		<TransactionAmount currency="840" value="3.00"/>
		<BillingAmount currency="840" value="3.00" rate="1"/>
		<CardholderAmount currency="826" value="2.45" rate="0.8166666666"/>
		<CashBackAmount currency="" value="0"/>
		<AuthCode>123456</AuthCode>
		<RetrievalReferenceNumber>12345678900</RetrievalReferenceNumber>
		<MerchantId>CARD ACCEPTOR </MerchantId>
		<MerchantName>ACQUIRER NAME CITY NAME GB</MerchantName>
		<MerchantTerminalId>12345678</MerchantTerminalId>
		<SchemeId>1</SchemeId>
		<TransactionFee currency="840" value="8.40"/>
		<SettlementAmount currency="" value="" rate="1"/>
		<AcquirerId>000001</AcquirerId>
		<ForwarderId/>
		<Mcc>1234</Mcc>
		<CountryIson>826</CountryIson>
		<Suspicious>No</Suspicious>
		<SecurityChecks>
			<CardExpirationDatePresent>0</CardExpirationDatePresent>
			<OnlinePIN>0</OnlinePIN>
			<OfflinePIN>0</OfflinePIN>
			<ThreeDomainSecure>0</ThreeDomainSecure>
			<Cvv2>0</Cvv2>
			<MagneticStripe>1</MagneticStripe>
			<ChipData>0</ChipData>
			<AVS>0</AVS>
			<PhoneNumber>0</PhoneNumber>
			<Signature>0</Signature>
		</SecurityChecks>
		<TransactionClass>International</TransactionClass>
	</CardFinancialAuthorization>
</FinancialAuthorizes>
```

### File name structure

| Part     | M | Description                                                |
|----------|---|------------------------------------------------------------|
| accounts | M | Report type.                                               |
| 1        | M | Client ID.                                                 |
| 20       | M | Program ID.                                                |
| 20200327 | M | Date (format `Ymd`).                                       |
| regen    | C | Is regenerated (available only if report was regenerated). |
| 1        | C | Regeneration count.                                        |
| xml      | M | File extension.                                            |

```
fin-authorizes-1-20-20200327.xml
```

## Currency exchange
### Data elements

| Parameter                        | M | Type | Length  | Description                                                              |
|----------------------------------|---|------|---------|--------------------------------------------------------------------------|
| Id                               | M | N    | [1-20]  | Exchange batch ID.                                                       |
| ExternalTransactionId            | M | ANS  | [1-36]  | External source transaction id.                                          |
| ExternalShortReference           | M | ANS  | [1-36]  | External source transaction short reference.                             |
| CurrencyExchangeSourceId         | M | N    | [1-20]  | [`Currency exchange source`](#appendix--enum--currency-exchange-source). |
| CurrencyCodePair                 | M | A    | 6       |                                                                          |
| FixedSide                        | M | A    | 10      | "buy" or "sell".                                                         |
| BuyCurrencyIson                  | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).   |
| SellCurrencyIson                 | M | N    | 3       | ISO 3 digit numeric value for the [`currency`](#appendix--enum--currency).   |
| BuyAmount                        | M | NS   | [1-20]  |                                                                          |
| SellAmount                       | M | NS   | [1-20]  |                                                                          |
| AppliedConversionRate            | M | NS   | 16;9    |                                                                          |
| DateCreated                      | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| DateSettled                      | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| DateConversion                   | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| Items / Item / AuthorizeId       | C | N    | [1-20]  | Mandatory if exchange was applied for authorisation.                     |
| Items / Item / ActualAuthorizeId | C | N    | [1-20]  | Mandatory if exchange was applied for authorisation.                     |
| Items / Item / TransactionId     | C | N    | [1-20]  | Mandatory if exchange was applied for authorisation.                     |
| Items / Item / ClearingFileId    | C | N    | [1-20]  | Mandatory if exchange was applied for authorisation.                     |
| Items / Item / ProgramId         | M | N    | [1-20]  |                                                                          |
| Items / Item / ConversionRate    | M | NS   | 16;9    |                                                                          |
| Items / Item / FixedSide         | M | A    | 10      | "buy" or "sell".                                                         |
| Items / Item / Amount            | M | NS   | [1-20]  |                                                                          |
| Items / Item / TransLink         | C | ANS  | [1-255] |                                                                          |

```xml
<?xml version="1.0" encoding="utf-8"?>
<Fx>
  <Batch>
    <Id>12345678901234</Id>
    <ExternalTransactionId>12a3b456-ab00-78ab-a123-0ab1c23d45ab</ExternalTransactionId>
    <ExternalShortReference>20201113-ABCDEF</ExternalShortReference>
    <CurrencyExchangeSourceId>2</CurrencyExchangeSourceId>
    <CurrencyCodePair>USDGBP</CurrencyCodePair>
    <FixedSide>buy</FixedSide>
    <BuyCurrencyIson>840</BuyCurrencyIson>
    <SellCurrencyIson>826</SellCurrencyIson>
    <BuyAmount>250.00</BuyAmount>
    <SellAmount>177.32</SellAmount>
    <AppliedConversionRate>0.70927</AppliedConversionRate>
    <DateCreated>2020-11-01 07:59:52</DateCreated>
    <DateSettled>2020-11-03 16:30:00</DateSettled>
    <DateConversion>2020-11-03 00:00:00</DateConversion>
    <Items>
      <Item>
        <AuthorizeId>12345678901234</AuthorizeId>
        <ActualAuthorizeId>12341234123412</ActualAuthorizeId>
        <TransactionId/>
        <ClearingFileId/>
        <ProgramId>1</ProgramId>
        <ConversionRate>0.70927</ConversionRate>
        <FixedSide>buy</FixedSide>
        <Amount>250.00</Amount>
        <TransLink>1557813362300000EL0000TRANS5CDA587227F279.15537667</TransLink>
      </Item>
    </Items>
  </Batch>
</Fx>
```

### File name structure

| Part               | M | Description                                                |
|--------------------|---|------------------------------------------------------------|
| currency-exchanges | M | Report type.                                               |
| 1                  | M | Client ID.                                                 |
| 20201113           | M | Date (format `Ymd`).                                       |
| regen              | C | Is regenerated (available only if report was regenerated). |
| 1                  | C | Regeneration count.                                        |
| xml                | M | File extension.                                            |

```
currency-exchanges-1-20201113.xml
```

## Account snapshot
### Data elements

| Field name                                                     | M | Type | Length  | Description                                                                 |
|----------------------------------------------------------------|---|------|---------|-----------------------------------------------------------------------------|
| FileDate                                                       | M | NS   | 10      | Report generation date (format Y-m-d).                                      |
| WorkDate                                                       | M | NS   | 19      | Snapshot date (format Y-m-d H:i:s).                                         |
| AccountId                                                      | M | N    | [1-20]  |                                                                             |
| HolderId                                                       | M | N    | [1-20]  | Holder associated with account.                                             |
| ProgramId                                                      | M | N    | [1-20]  | Program associated with account.                                            |
| CurrencyIson                                                   | M | N    | 3       | [`currency`](#appendix--enum--currency) ISO 3 digit numeric value.              |
| AvailableBalance                                               | M | NS   | [1-20]  |                                                                             |
| SettledBalance                                                 | M | NS   | [1-20]  |                                                                             |
| AccountStatus                                                  | M | A    | 1       | [`Account status`](#appendix--enum--account-status).                        |
| AccountStatusDescription                                       | M | A    | [1-15]  | [`Account status`](#appendix--enum--account-status).                        |
| AccountStatusChangeDate                                        | O | NS   | 19      | Format Y-m-d H:i:s.                                                         |
| AccountStatusChangeSource                                      | O | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| AccountStatusChangeReasonCode                                  | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| AccountStatusChangeNote                                        | O | ANS  | [1-255] | A short description which explains why account status has been changed.     |
| AccountStatusChangeOriginatorId                                | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| BankAccounts / BankAccount / BankAccountId                     | C | N    | [1-20]  | ID in our system.                                                           |
| BankAccounts / BankAccount / BankAccountExternalId             | C | N    | [1-20]  | ID in provider system.                                                      |
| BankAccounts / BankAccount / BankAccountStatus                 | C | AN   | 1       | [`Bank account status`](#appendix--enum--epm--bank-account-status).         |
| BankAccounts / BankAccount / BankAccountAccountName            | C | ANS  | [1-255] |                                                                             |
| BankAccounts / BankAccount / BankAccountAccountNumber          | C | AN   | [1-26]  |                                                                             |
| BankAccounts / BankAccount / BankAccountSortCode               | C | AN   | [1-50]  |                                                                             |
| BankAccounts / BankAccount / BankAccountIban                   | C | AN   | [1-50]  |                                                                             |
| BankAccounts / BankAccount / BankAccountBic                    | C | AN   | [1-50]  |                                                                             |
| BankAccounts / BankAccount / BankAccountStatusChangeReasonCode | O | N    | [1-11]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| BankAccounts / BankAccount / BankAccountStatusChangeNote       | O | ANS  | [1-255] |                                                                             |
| BankAccounts / BankAccount / BankAccountStatusChangeSource     | O | N    | [1-3]   | [`Status change source`](#appendix--enum--status-change--source).           |
| DateUpdated                                                    | M | NS   | 19      | Format Y-m-d H:i:s.                                                         |
| DateCreated                                                    | M | NS   | 19      | Format Y-m-d H:i:s.                                                         |

```xml
<?xml version="1.0" encoding="utf-8"?>
<AccountsSnapshots>
    <AccountSnapshot>
        <FileDate>2021-11-10</FileDate>
        <WorkDate>2021-11-10 13:45:00</WorkDate>
        <AccountId>11</AccountId>
        <HolderId>11</HolderId>
        <ProgramId>1</ProgramId>
        <CurrencyIson>840</CurrencyIson>
        <AvailableBalance>10.00</AvailableBalance>
        <SettledBalance>10.00</SettledBalance>
        <AccountStatus>A</AccountStatus>
        <AccountStatusDescription>Active</AccountStatusDescription>
        <AccountStatusChangeDate>2021-11-10 16:00:12</AccountStatusChangeDate>
        <AccountStatusChangeSource>1</AccountStatusChangeSource>
        <AccountStatusChangeReasonCode>11</AccountStatusChangeReasonCode>
        <AccountStatusChangeNote>test</AccountStatusChangeNote>
        <AccountStatusChangeOriginatorId>1</AccountStatusChangeOriginatorId>
        <BankAccounts>
            <BankAccount>
                <BankAccountId>1</BankAccountId>
                <BankAccountExternalId>1234567890</BankAccountExternalId>
                <BankAccountStatus>A</BankAccountStatus>
                <BankAccountBankProviderId/>
                <BankAccountAccountName>test</BankAccountAccountName>
                <BankAccountAccountNumber>12300012</BankAccountAccountNumber>
                <BankAccountSortCode>012345</BankAccountSortCode>
                <BankAccountIban>GB013456ABCD9876543210</BankAccountIban>
                <BankAccountBic>ABCD1234</BankAccountBic>
                <BankAccountStatusChangeReasonCode>3</BankAccountStatusChangeReasonCode>
                <BankAccountStatusChangeNote>test</BankAccountStatusChangeNote>
                <BankAccountStatusChangeSource>1</BankAccountStatusChangeSource>
            </BankAccount>
        </BankAccounts>
        <DateUpdated>2021-11-10 13:28:51</DateUpdated>
        <DateCreated>2021-11-05 08:10:38</DateCreated>
    </AccountSnapshot>
</AccountsSnapshots>
```

### File name structure

| Part               | M | Description          |
|--------------------|---|----------------------|
| accounts-snapshots | M | Report type.         |
| 1                  | M | Client ID.           |
| 20                 | M | Program ID.          |
| 20211110           | M | Date (format `Ymd`). |
| xml                | M | File extension.      |

```
accounts-snapshots-1-20-20211110.xml
```

# Appendix

## Version guide

| Update type   | Notation | Compatibility                  | Description                                                                                                                                       |
|---------------|----------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Major version | X.1.1    | Breaking specification changes | A major update that will most likely affect the client's integration and therefore must be reviewed. Resets the minor and patch versions to zero. |
| Minor version | 1.X.1    | Non-backwards compatible       | Minor changes that might affect the client's integration and therefore must be reviewed.                                                          |
| Patch         | 1.1.X    | Backwards compatible           | Minor changes that will not affect the client's integration - reviewing is not necessary.                                                         |

## Changelog

| Version | Date                 | Updates                                                                                                                                                                                                                                                                                                                                                                            |
|---------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0.21  | June 06, 2022        | <!-- mak --> Added a new report for EPM transactions - Transactions held in risk outcome.                                                                                                                                                                                                                                                                                          |
| 1.0.20  | May 27, 2022         | <!-- dme --> Added new external payment transaction status codes `Should not pay` and `Settled through suspense account`.                                                                                                                                                                                                                                                          |
| 1.0.19  | May 12, 2022         | <!-- dme --> Added a new external payment transaction status code `Required data is missing`.                                                                                                                                                                                                                                                                                      |
| 1.0.18  | April 14, 2022       | <!-- dme --> Added new fields `ParentTransactionId`, `DisputeId`, and `ExternalDisputeId` to `Account transaction` and `Card transaction` reports.                                                                                                                                                                                                                                 |
| 1.0.17  | February 8, 2022     | <!-- ksa --> Added `TransLink` to `Currency exchange` report.                                                                                                                                                                                                                                                                                                                      |
| 1.0.16  | January 20, 2022     | <!-- dme --> Updated `Transaction code` list. Added new records: `Dispute credit adjustment` and `Dispute debit adjustment`.                                                                                                                                                                                                                                                       |
| 1.0.15  | January 3, 2022      | <!-- fba --> Added currency table.                                                                                                                                                                                                                                                                                                                                                 |
| 1.0.14  | November 10, 2021    | <!-- dme --> Added a new report `Account snapshot`.                                                                                                                                                                                                                                                                                                                                |
| 1.0.13  | October 8, 2021      | <!-- dme --> Updated `Transaction code` list. Added new records: `P2P debit funds transfer` and `P2P credit funds transfer`.                                                                                                                                                                                                                                                       |
| 1.0.12  | August 17, 2021      | <!-- fba --> Added a new report for EPM transactions - Transactions held in risk                                                                                                                                                                                                                                                                                                   |
| 1.0.12  | August 2, 2021       | <!-- mak --> Parameter `ReasonCode` type changed from N to NS in `Account transaction` and `Card transaction` reports.                                                                                                                                                                                                                                                             |
| 1.0.11  | April 27, 2021       | <!-- lis --> Added new fields `ReasonCode`, `Note`, `OriginatorId` to `Card event` report. Added new fields `AccountStatusDate`, `AccountStatusChangeSource`, `AccountStatusChangeReasonCode`, `AccountStatusChangeNote`, `AccountStatusChangeOriginatorId`, `Cards/Card/Status{Date,ChangeSource,ChangeReasonCode,ChangeNote,ChangeOriginatorId}` fields to `Card account` report |
| 1.0.10  | May 3th, 2021        | <!-- dme --> Updated `Transaction type` list. Added new records: `74`, `75` and `76`.                                                                                                                                                                                                                                                                                              |
| 1.0.9   | April 15, 2021       | <!-- eb --> Added a new transaction types "P2P credit cash deposit", "P2P debit cash deposit", "P2P credit merchant payment" and "P2P debit merchant payment".                                                                                                                                                                                                                     |
| 1.0.8   | April 2, 2021        | <!-- mka --> Added `Signature` to security check bitmap.                                                                                                                                                                                                                                                                                                                           |
| 1.0.7   | January 14, 2021     | <!-- mka --> Added SettlementAmount: currency, value, rate to `Account transaction` report.                                                                                                                                                                                                                                                                                        |
| 1.0.6   | January 13, 2021     | <!-- dme --> Added new report `Currency exchange`.                                                                                                                                                                                                                                                                                                                                 |
| 1.0.5   | January 8, 2021      | <!-- mla --> Added `BaseConversionRate` and `IsConversionFeeBlended` to `Account transaction`. <br> Added `BaseConversionRate` and `IsConversionFeeBlended` to `Card transaction`. <br> Changed `CardholderAmount` to mandatory for `Account transaction` <br> Changed `CardholderAmount` to mandatory for `Card transaction`.                                                     |
| 1.0.4   | December 29, 2020    | <!-- mka --> Added SettlementAmount: currency, value, rate in "authorize" and "card transactions" reports.                                                                                                                                                                                                                                                                         |
| 1.0.3   | October 18, 2020     | <!-- eb --> Added "Custom fee" transaction type.                                                                                                                                                                                                                                                                                                                                   |
| 1.0.2   | September 18th, 2020 | <!-- dme --> Updated `Transaction type` list. Updated ID `65`, added new records: `66`, `67` and `68`.                                                                                                                                                                                                                                                                             |
| 1.0.1   | April 29, 2020       | <!-- dme --> Added new transaction type "Return from external payment address".                                                                                                                                                                                                                                                                                                    |
| 1.0.0   | April 28, 2020       | <!-- jt --> Initial version of ISAAC PM report technical specification.                                                                                                                                                                                                                                                                                                            |

## Enum
### Account status

| Name | Description  |
|------|--------------|
| A    | Active       |
| R    | Receive only |
| P    | Spend only   |
| S    | Suspended    |
| B    | Blocked      |

### Status change
#### Source

| ID | Name              |
|----|-------------------|
| 0  | Program manager   |
| 1  | Admin             |
| 2  | System            |
| 3  | External provider |

#### Reason code

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

### Card
#### Event type

| Name              | Description |
|-------------------|-------------|
| Activation        |             |
| Mark as blocked   |             |
| Mark as suspended |             |
| Mark as risk      |             |
| Mark as stolen    |             |
| Mark as lost      |             |
| Card expired      |             |
| Mark as fraud     |             |
| Unknown           |             |

#### Generation request type

| Name    | Description |
|---------|-------------|
| New     |             |
| Reissue |             |

#### Status code

| Name | Description   |
|------|---------------|
| A    | Activated     |
| B    | Blocked       |
| T    | Suspended     |
| R    | Risk          |
| S    | Stolen        |
| L    | Lost          |
| E    | Expired       |
| N    | Not activated |
| F    | Fraud         |

### Entry mode type

| ID | Name               | Description                                             |
|----|--------------------|---------------------------------------------------------|
| 0  | Irrelevant         | This covers all entry mode types                        |
| 1  | Magstripe          | Card data was read from magnetic stripe.                |
| 2  | Contactless        | Card data was read via contactless interface.           |
| 3  | Ecomm              | Card data was sent via ecommerce/internet website.      |
| 4  | Reserved           | Reserved for future use.                                |
| 5  | Optical code       | Card data was read via optical interface.               |
| 6  | Icc                | Card data was read via chip.                            |
| 7  | Credential on file | Card data was loaded from merchant storage (recurring). |
| 8  | Moto               | Card data was entered manually by operator via phone.   |
| 9  | Manual             | Card data was entered manually.                         |
| 10 | Card present       |                                                         |
| 11 | Card not present   |                                                         |
| 12 | Unknown            | Can’t determine.                                        |

### Function code

| Code | Description                                |
|------|--------------------------------------------|
| 200  | First Presentment                          |
| 205  | Second Presentment (Full)                  |
| 282  | Second Presentment (Partial)               |
| 450  | First Chargeback (Full)                    |
| 451  | Arbitration Chargeback (Full)              |
| 453  | First Chargeback (Partial)                 |
| 454  | Arbitration Chargeback (Partial)           |
| 603  | Retrieval Request                          |
| 605  | Retrieval Request Acknowledgement          |
| 640  | Currency Update                            |
| 680  | File Currency Summary                      |
| 685  | Financial Position Detail                  |
| 688  | Settlement Position Detail                 |
| 691  | Message Exception                          |
| 693  | Text Message                               |
| 695  | File Trailer                               |
| 696  | Financial Detail Addendum                  |
| 697  | File Header                                |
| 699  | File Reject                                |
| 700  | Fee Collection (Customer-generated)        |
| 780  | Fee Collection Return                      |
| 781  | Fee Collection Resubmission                |
| 782  | Fee Collection Arbitration Return          |
| 783  | Fee Collection (Clearing System-generated) |
| 790  | Fee Collection (Funds Transfer)            |
| 791  | Fee Collection (Funds Transfer Backout)    |

### Region type

| Name                         | Description          |
|------------------------------|----------------------|
| Unknown                      |                      |
| Interregional                | For MasterCard only. |
| Intraregional                | For MasterCard only. |
| Intercountry                 | For MasterCard only. |
| Intracountry                 | For MasterCard only. |
| Member-to-member             | For MasterCard only. |
| Domestic                     | For VISA only.       |
| Regional                     | For VISA only.       |
| Interregional                | For VISA only.       |
| European Economic Area (EEA) | For UnionPay only.   |
| International                | For UnionPay only.   |

### Risk rule action

| Value                                     | Description                                    |
|-------------------------------------------|------------------------------------------------|
| MarkTransactionAsSuspicious               | Mark transaction as suspicious                 |
| NotifyCardholderBySendingTAIsNotification | Notify cardholder by sending TAIs notification |
| ChangeCardStatusToRisk                    | Change card status to risk                     |
| ChangeAccountStatusToSuspended            | Change account status to suspended             |
| RejectTransaction                         | Reject transaction                             |

### Scheme ID

| ID | Name             | Description |
|----|------------------|-------------|
| 1  | MasterCard       |             |
| 2  | Visa             |             |
| 3  | UnionPay         |             |
| 4  | External Payment |             |
| 5  | Internal Payment |             |

### Security check

| Value                     | Description                                                        |
|---------------------------|--------------------------------------------------------------------|
| CardExpirationDatePresent | Card expiration date present and validation performed              |
| OnlinePIN                 | Online PIN validation performed                                    |
| OfflinePIN                | Offline PIN validation performed                                   |
| ThreeDomainSecure         | Accountholder authentication value validation performed (3DSecure) |
| Cvv2                      | Card verification value validation performed                       |
| MagneticStripe            | Magnetic stripe validation performed                               |
| ChipData                  | Chip data validation performed                                     |
| AVS                       | Holder address validation performed                                |
| PhoneNumber               | Phone number validation performed (Only for UnionPay)              |
| Signature                 | Signature validation performed                                     |

### Transaction type

| ID  | Name                                              | Operation sign | Description                                                    | MC                                                                   | Visa                                                           | UPI                                                                | API/Internal | EPM |
|-----|---------------------------------------------------|----------------|----------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------------|--------------|-----|
| 0   | Unknown                                           | -              | Can’t determine transaction type.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 1   | Load                                              | Credit         | Card load via API.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    | +            |     |
| 2   | Pos                                               | Debit          | Purchase by card.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 3   | Atm                                               | Debit          | ATM withdrawal.                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 4   | Unload                                            | Debit          | Card unload/withdrawal via API.                                |                                                                      |                                                                |                                                                    | +            |     |
| 5   | Credit cheque                                     | Credit         | Credit cheque.                                                 |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 6   | Balance inquiry                                   | -              | Balance inquiry at ATM/POS.                                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 7   | Cashback                                          | Debit          | Cashback at sale point.                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 8   | Cash                                              | Debit          | Cash withdrawal.                                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 9   | Quasi cash                                        | Debit          | Quasi cash operation.                                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 10  | Credit                                            | Credit         | Original credit operation.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 11  | Credit adjustment                                 | Credit         | Credit adjustment via API.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 12  | Refund                                            | Credit         | Refund.                                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 13  | Debit adjustment                                  | Debit          | Debit adjustment via API.                                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 14  | Pin unblock                                       | -              | PIN unblock via ATM.                                           | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 15  | Pin change                                        | -              | PIN Change at ATM.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 16  | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 17  | Pos verification only                             | -              | Pos verification only.                                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 18  | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 19  | Reserved                                          |                |                                                                |                                                                      |                                                                |                                                                    |              |     |
| 20  | Money transfer                                    | Debit          | Money transfer operation (UnionPay).                           |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 21  | P2p debit                                         | Debit          | P2P transfer debit part.                                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 22  | P2p credit                                        | Credit         | P2P transfer credit part.                                      |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 23  | Debit cheque                                      | Debit          | Original debit operation.                                      |                                                                      |                                                                | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 24  | Card activate                                     | -              | Card activate.                                                 |                                                                      |                                                                |                                                                    | +            |     |
| 25  | Pin change API                                    | -              | PIN change via API.                                            |                                                                      |                                                                |                                                                    | +            |     |
| 26  | P2p Debit account to account                      | Debit          | Account funding debit account to account.                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 27  | P2p Credit account to account                     | Credit         | Account funding credit account to account.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 28  | P2p Debit person to person                        | Debit          | Account funding debit person to person.                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 29  | P2p Credit person to person                       | Credit         | Account funding credit person to person.                       | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 30  | P2p debit financial institution                   | Debit          | Account funding debit financial institution.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 31  | P2p credit financial institution                  | Credit         | Account funding credit financial institution.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 32  | P2p debit prepaid card load and top up            | Debit          | Account funding debit prepaid card load and top up.            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 33  | P2p credit prepaid card load and top up           | Credit         | Account funding credit prepaid card load and top up.           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 34  | P2p debit wallet transfer                         | Debit          | Account funding debit wallet transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 35  | P2p credit wallet transfer                        | Credit         | Account funding credit wallet transfer.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 36  | P2p debit card bill pay                           | Debit          | Account funding debit card bill.                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 37  | P2p credit card bill pay                          | Credit         | Account funding credit card bill.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 38  | P2p debit non card bill pay                       | Debit          | Account funding debit non card bill.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 39  | P2p credit non card bill pay                      | Credit         | Account funding credit non card bill.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 40  | P2p debit non online gambling/gaming              | Debit          | Account funding debit non online gambling/gaming.              |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 41  | P2p credit non online gambling/gaming             | Credit         | Account funding credit non online gambling/gaming.             |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 42  | P2p debit online gambling/gaming                  | Debit          | Account funding debit online gambling/gaming.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 43  | P2p credit online gambling/gaming                 | Credit         | Account funding credit online gambling/gaming.                 |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 44  | P2p debit government disbursement and tax refund  | Debit          | Account funding debit government disbursement and tax refund.  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 45  | P2p credit government disbursement and tax refund | Credit         | Account funding credit government disbursement and tax refund. | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 46  | P2p debit loyalty payments                        | Debit          | Account funding debit loyalty payments.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 47  | P2p credit loyalty payments                       | Credit         | Account funding credit loyalty payments.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 48  | P2p debit merchant settlement                     | Debit          | Account funding debit merchant settlement.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 49  | P2p credit merchant settlement                    | Credit         | Account funding credit merchant settlement.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 50  | P2p debit payroll and pensions                    | Debit          | Account funding debit.                                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 51  | P2p credit payroll and pensions                   | Credit         | Account funding credit.                                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 52  | P2p debit b2b supplier payments                   | Debit          | Account funding debit b2b supplier payments.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 53  | P2p credit b2b supplier payments                  | Credit         | Account funding credit b2b supplier payments.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 54  | P2p debit other disbursements                     | Debit          | Account funding debit other disbursements.                     |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 55  | P2p credit other disbursements                    | Credit         | Account funding credit other disbursements.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 56  | Outbound from external payment address            | Debit          | Outbound from external payment address via API.                |                                                                      |                                                                |                                                                    |              | +   |
| 57  | Inbound from external payment address             | Credit         | Inbound from external payment address via API.                 |                                                                      |                                                                |                                                                    |              | +   |
| 58  | Direct debit from external payment address        | Debit          | Direct debit from external payment address via API.            |                                                                      |                                                                |                                                                    |              | +   |
| 59  | Direct credit from external payment address       | Credit         | Direct credit from external payment address via API.           |                                                                      |                                                                |                                                                    |              | +   |
| 60  | P2p credit agent cash out                         | Credit         | Account funding credit agent cash out.                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 61  | P2p debit agent cash out                          | Debit          | Account funding debit agent cash out.                          | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 62  | P2p credit merchant presented qr                  | Credit         | Account funding credit merchant presented qr.                  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 63  | P2p debit merchant presented qr                   | Debit          | Account funding debit merchant presented qr.                   | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 64  | Pin unblock API                                   | -              | PIN unblock via API.                                           |                                                                      |                                                                |                                                                    |              | +   |
| 65  | Inbound return from external payment              | Debit          | Inbound return from external payment.                          |                                                                      |                                                                |                                                                    |              | +   |
| 66  | Outbound return from external payment             | Credit         | Outbound return from external payment.                         |                                                                      |                                                                |                                                                    |              | +   |
| 67  | Direct credit return                              | Debit          | Direct credit return.                                          |                                                                      |                                                                |                                                                    |              | +   |
| 68  | Direct debit return                               | Credit         | Direct debit return.                                           |                                                                      |                                                                |                                                                    |              | +   |
| 69  | Custom fee                                        | Debit          | Custom fee.                                                    |                                                                      |                                                                |                                                                    | +            |     |
| 70  | P2P credit cash deposit                           | Credit         | Account funding credit cash deposit.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 71  | P2P debit cash deposit                            | Debit          | Account funding debit cash deposit.                            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 72  | P2P debit merchant payment                        | Debit          | Account funding debit merchant payment.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 73  | P2P credit merchant payment                       | Credit         | Account funding credit merchant payment.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 74  | First chargeback                                  | \-             | First chargeback.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 75  | Second chargeback                                 | \-             | Second chargeback.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 76  | Retrieval request                                 | \-             | Retrieval request.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                |                                                                    |              |     |
| 77  | P2P credit funds transfer                         | Credit         | Account funding credit funds transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 78  | P2P debit funds transfer                          | Debit          | Account funding debit funds transfer.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    |              |     |
| 79  | Dispute credit adjustment                         | Credit         | Dispute credit adjustment via API.                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +            |     |
| 80  | Dispute debit adjustment                          | Debit          | Dispute debit adjustment via API.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;"> |                                                                    | +            |     |

### Currency exchange source

| ID | Description     |
|----|-----------------|
| 1  | Unprocessed.    |
| 2  | Trade settled.  |
| 3  | Closed.         |
| 4  | Awaiting funds. |
| 5  | Funds arrived.  |


### Load source

| ID | Name                        | Description                                                                     |
|----|-----------------------------|---------------------------------------------------------------------------------|
| 0  | Unknown                     | Partner system does not know the source of the funds                            |
| 1  | Internal Account            | Funds are transferred from Tribe held account                                   |
| 2  | Internal Card               | Funds are transferred from Tribe held card                                      |
| 3  | Debit Card                  | External Debit Card Load via partners Gateway                                   |
| 4  | Credit Card                 | External Credit Card Load via partners Gateway                                  |
| 5  | Bank Transfer               | External Bank Transfer to partners Bank Account                                 |
| 6  | Cash                        | External load of cash to the account                                            |
| 7  | Unload to repatriate        | Used to unload funds and return them to external customer account               |
| 8  | Unload to partner account   | Used to unload funds to cover costs not covered by fees held elsewhere          |
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
| 25 | Customer Account            | Internal load from Customer account to another account held at Tribe            |
| 26 | Payouts Account             | Internal load from Payouts account to another account held at Tribe             |
| 27 | Cashback Account            | Internal load from Cashback account to another account held at Tribe            |
| 28 | Office Account              | Internal load from Office account to another account held at Tribe              |
| 29 | Fees and Chargeback Account | Internal load from Fees and Chargeback account to another account held at Tribe |
| 30 | External client Wallet      | External load via client Wallet                                                 |
| 31 | Balance adjustment load from GUI    | Balance adjustment created via admin panel                              |
| 32 | Balance adjustment load from PM API | Balance adjustment created via PM API                                   |
| 33 | Balance adjustment load by system   | Balance adjustment created by system                                    |

### Load type

| ID | Name     |
|----|----------|
| 0  | Unknown  |
| 1  | e-Wallet |
| 2  | Internal |

### EPM

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

#### Transaction status

| ID | Description                |
|----|----------------------------|
| 1  | Accepted                   |
| 2  | Rejected                   |
| 3  | Pending                    |
| 4  | Error                      |
| 5  | On hold                    |
| 6  | Operator approval required |

#### Manual approval status

| ID | Description                |
|----|----------------------------|
| 1  | Pending                    |
| 2  | Returning                  |
| 3  | Completed                  |
| 4  | Return failed              |

#### Account type

| Type | Name            | Description |
|----- | ----------------| ------------|
| 1    | Account         |             |
| 2    | Special account |             |

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

#### Bank account status

| Type | Description  |
|------|--------------|
| A    | Active       |
| B    | Blocked      |
| S    | Suspended    |
| P    | Spend only   |
| R    | Receive only |

#### Outcome

| ID | Name     |
|----|----------|
| 1  | Approved |
| 2  | Rejected |

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
