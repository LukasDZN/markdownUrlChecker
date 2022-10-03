# Introduction
## Version

To see current version and details of recent changes, please see [`Changelog`](#appendix--changelog).

%brandName% reserves the right to append Conditional 'C' and/or Optional 'O' fields without prior notice. The client's system/application should be prepared to accept the appended fields. All such changes will be Backward Compatible and shouldn't change the application logic.

All Backward Incompatible changes (related to the mandatory 'M' field) will be introduced ONLY with a new [`version release`](#appendix--version-guide).

# Reports
## Account activity
### Data elements

| Field name                           | M | Type | Length  | Description                                                                                                                                         |
|--------------------------------------|---|------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| FileDate                             | M | NS   | 10      | Report generation date                                                                                                                              |
| WorkDate                             | M | NS   | 19      | Transaction date imported                                                                                                                           |
| IssuerIdentificationNumber           | M | N    | 20      | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.)                                                                                    |
| ProgramName                          | M | ANS  | [1-255] | Program name associated with card or account                                                                                                        |
| ProgramId                            | M | N    | [1-20]  | Program associated with card or account                                                                                                             |
| ProductName                          | C | ANS  | [1-50]  | Filled if card present. Product name associated with card                                                                                           |
| ProductId                            | C | N    | [1-20]  | Filled if card present. Product associated with card                                                                                                |
| SubProductId                         | C | N    | [1-20]  | Filled if card present. Sub-product name associated with card                                                                                       |
| HolderId                             | M | N    | [1-20]  |                                                                                                                                                     |
| AccountId                            | M | N    | [1-20]  |                                                                                                                                                     |
| BankAccountId                        | C | N    | [1-20]  | Filled if payment transaction is external                                                                                                           |
| ExternalBankAccountId                | C | N    | [1-20]  | Filled if payment transaction is external                                                                                                           |
| BankAccountNumber                    | C | ANS  | [1-26]  | Filled if payment transaction is external                                                                                                           |
| BankAccountSortCode                  | C | ANS  | [1-50]  | Filled if payment transaction is external                                                                                                           |
| BankAccountIban                      | C | ANS  | [1-50]  | Filled if payment transaction is external                                                                                                           |
| BankAccountBic                       | C | ANS  | [1-50]  | Filled if payment transaction is external                                                                                                           |
| CardNumber                           | C | N    | [16-19] | Card primary account number. Filled if card present                                                                                                 |
| CardNumberId                         | C | N    | [1-20]  | Card ID. Filled if card present                                                                                                                     |
| CardRequestId                        | C | N    | [1-20]  | Card number ID                                                                                                                                      |
| Bin                                  | C | N    | [6-12]  | Filled if card present                                                                                                                              |
| TransactionCode                      | M | N    | [1-11]  | [Transaction code](#appendix--enum--transaction-code)                                                                                               |
| TransactionCodeDescription           | M | ANS  | 100     | Transaction code name                                                                                                                               |
| TransactionDateTime                  | M | NS   | 19      | Transaction local date time                                                                                                                         |
| TransactionAmount                    | M | NS   | [1-20]  |                                                                                                                                                     |
| TransactionCurrencyCode              | M | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| TransactionCurrencyAlpha             | M | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| TransLink                            | M | ANS  | [1-100] |                                                                                                                                                     |
| TraceId                              | C | ANS  | [1-16]  | Provided when received by Scheme.                                                                                                                   |
| TransactionCodeIdentifier            | C | N    | [1-2]   | For VISA only.                                                                                                                                      |
| HolderAmount                         | M | NS   | [1-20]  |                                                                                                                                                     |
| HolderCurrencyCode                   | M | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| HolderCurrencyAlpha                  | M | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| FxRate                               | M | NS   | 16;9    | Holder conversion rate                                                                                                                              |
| FeeGroupId                           | C | N    | [1-20]  |                                                                                                                                                     |
| FeeGroupName                         | C | ANS  | [1-50]  |                                                                                                                                                     |
| FxFeeName                            | C | ANS  | [1-37]  |                                                                                                                                                     |
| FxFeeAmount                          | C | NS   | [1-20]  |                                                                                                                                                     |
| FxFeeCurrency                        | C | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| FxFeeReason                          | C | N    | 4       |                                                                                                                                                     |
| F0FeeName                            | C | ANS  | [1-37]  |                                                                                                                                                     |
| F0FeeAmount                          | C | NS   | [1-20]  |                                                                                                                                                     |
| F0FeeCurrency                        | C | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| F0FeeReason                          | C | N    | 4       |                                                                                                                                                     |
| BillRateAmount                       | C | NS   | 16;9    |                                                                                                                                                     |
| BillingDate                          | C | NS   | 19      | Transaction date imported                                                                                                                           |
| BillingAmount                        | C | NS   | [1-20]  |                                                                                                                                                     |
| BillingCurrencyCode                  | C | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| BillingCurrencyAlpha                 | C | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                             |
| SettlementAmount                     | C | NS   | [1-20]  | Value received from card scheme or value selected during processing if settlement [`currency`](#appendix--enum--currency) selection configured in program. |
| SettlementCurrencyCode               | C | N    | 3       | Value received from card scheme or value selected during processing if settlement [`currency`](#appendix--enum--currency) selection configured in program. |
| SettlementCurrencyAlpha              | C | A    | 3       | Value received from card scheme or value selected during processing if settlement [`currency`](#appendix--enum--currency) selection configured in program. |
| SettlementConversionRate             | C | NS   | 16;9    | Value received from card scheme or value selected during processing if settlement [`currency`](#appendix--enum--currency) selection configured in program. |
| CardPresent                          | M | A    | [1-16]  | Possible values: Card present, Card not present.                                                                                                    |
| TransactionId                        | M | N    | [1-20]  |                                                                                                                                                     |
| TransactionClass                     | M | AS   | [1-30]  | [Region type](#appendix--enum--region-type)                                                                                                         |
| Action                               | M | A    | [1-6]   | [Action type](#appendix--enum--action-type)                                                                                                         |
| Network                              | M | ANS  | [1-255] | [Network](#appendix--enum--network)                                                                                                                 |
| TransactionDescription               | C | ANS  | [0-255] |                                                                                                                                                     |
| EntryModeCode                        | M | N    | [1-11]  | [Entry mode code](#appendix--enum--entry-mode-code)                                                                                                 |
| EntryModeCodeDescription             | M | ANS  | 100     | Entry mode code name                                                                                                                                |
| ReferenceNumber                      | O | AN   | [1-255] |                                                                                                                                                     |
| BalanceAdjustmentType                | O | N    | [1-2]   | [Balance adjustment type](#appendix--enum--balance-adjustment-type)                                                                                 |
| CountryIson                          | M | N    | 3       |                                                                                                                                                     |
| LoadType                             | C | N    | [1-11]  | Filled if payment transaction is internal. Load type value in line with API spec values supported. [Load type](#appendix--enum--load-type)          |
| LoadSource                           | C | N    | [1-11]  | Filled if payment transaction is internal. Load source value in line with the API spec values supported. [Load source](#appendix--enum--load-source) |
| EpmMethodId                          | C | N    | [1-20]  | Filled if payment transaction is external                                                                                                           |
| EpmTransactionId                     | C | N    | [1-20]  | Filled if payment transaction is external                                                                                                           |
| ExternalEpmTransactionId             | C | N    | [1-20]  | Filled if payment transaction is external                                                                                                           |
| EpmTransactionType                   | C | N    | [1-11]  | Filled if payment transaction is external. [External payment transaction type](#appendix--enum--external-payment-transaction-type)                  |
| EpmTransactionStatusCode             | C | N    | [1-3]   | Filled if payment transaction is external. [External payment transaction status code](#appendix--enum--external-payment-transaction-status-code)    |
| EpmTransactionStatus                 | C | N    | [1-3]   | Filled if payment transaction is external. [External payment transaction status](#appendix--enum--external-payment-transaction-status)              |
| EpmTransactionReasonDescription      | O | ANS  | [1-255] |                                                                                                                                                     |
| EpmTransactionBankProviderReasonCode | O | ANS  | [1-255] |                                                                                                                                                     |
| EpmMandateId                         | C | N    | [1-20]  | Filled if payment transaction is external and epm transaction type = 5 (Direct debit)                                                               |
| Reference                            | C | N    | [1-255] | Filled if payment transaction is external and value provided.                                                                                       |
| TransactionIdentifier                | C | N    | [1-100] | Filled if payment transaction is external and value provided. ID generated by external payment bank provider.                                       |
| TransactionReferenceNumber           | C | N    | [1-255] | Filled if payment transaction is external and value provided. ID generated by external payment bank provider.                                       |
| EndToEndIdentifier                   | C | N    | [1-100] | Filled if payment transaction is external and value provided. ID generated by Bank Connect.                                                         |
| ActualEndToEndIdentifier             | C | N    | [1-100] | Filled if payment transaction is external and value provided. ID generated by Bank Connect.                                                         |
| Suspicious                           | M | N    | 1       | Possible values: Yes - is suspicious, No - not suspicious.                                                                                          |
| RiskRuleCodes                        | O | ANS  | 1-65535 | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                    |
| RiskActions / RiskAction             | O | LIST | \-      | [Risk rule action](#appendix--enum--risk-rule-action)                                                                                               |
| SecurityChecks / SecurityCheck       | O | LIST | \-      | [Security check](#appendix--enum--security-check)                                                                                                   |
| ParentTransactionId                  | C | N    | [1-20]  | Parent transaction ID. Provided if this transaction can be related with the previous transaction.                                                          |
| DisputeId                            | C | N    | [1-20]  | Dispute ID. Provided if the dispute was created.                                                                                                           |
| ExternalDisputeId                    | O | N    | [1-20]  | External system dispute ID if it was provided on dispute create.                                                                                           |
| ExternalPaymentScheme                | O | N    | [1-20]  | External payment scheme ID. [`External payment scheme`](#appendix--enum--external-payment-scheme)                                                   |
| ExternalIbanCountry                  | O | AN   | 3       | External payment address IBAN country.                                                                                                              |
| InternalIbanCountry                  | O | AN   | 3       | Internal payment address IBAN country.                                                                                                              |
| ExternalIban                         | O | AN   | [1-50]  | External payment address IBAN.                                                                                                                      |
| ExternalBban                         | O | AN   | [1-50]  | External payment address BBAN.                                                                                                                      |
| ExternalAccountName                  | M | ANS  | [1-255] | External payment address account name.                                                                                                              |
| ExternalAccountNumber                | O | ANS  | [16-19] | External payment address account number.                                                                                                            |
| ExternalSortCode                     | O | ANS  | [1-50]  | External payment address sort code.                                                                                                                 |
| ExternalBIC                          | O | ANS  | [1-50]  | External payment address BIC.                                                                                                                       |
| OriginatorId                         | O | ANS  | [1-20]  |                                                                                                                                                     |
| OriginatorName                       | O | ANS  | [1-255] |                                                                                                                                                     |
| OriginatorServiceUserNumber          | O | ANS  | [1-255] |                                                                                                                                                     |

```xml
<?xml version="1.0" encoding="utf-8"?>
<AccountsActivities>
    <AccountActivity>
        <FileDate>2019-07-30</FileDate>
        <WorkDate>2019-07-29</WorkDate>
        <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
        <ProgramName>test program</ProgramName>
        <ProgramId>1</ProgramId>
        <ProductName>Test physical product</ProductName>
        <ProductId>1</ProductId>
        <SubProductId>1</SubProductId>
        <HolderId>1</HolderId>
        <AccountId>1</AccountId>
        <BankAccountId/>
        <ExternalBankAccountId/>
        <BankAccountNumber/>
        <BankAccountSortCode/>
        <BankAccountIban/>
        <BankAccountBic/>
        <CardNumber>5000********0000</CardNumber>
        <CardNumberId>123456</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <Bin>500000</Bin>
        <TransactionCode>2</TransactionCode>
        <TransactionCodeDescription>POS</TransactionCodeDescription>
        <TransactionDateTime>2019-07-30 13:39:22</TransactionDateTime>
        <TransactionAmount>-10.00</TransactionAmount>
        <TransactionCurrencyCode>826</TransactionCurrencyCode>
        <TransactionCurrencyAlpha>GBP</TransactionCurrencyAlpha>
        <TransLink>697681000000MDS8D4A5S382683200612123456</TransLink>
        <TraceId>DMCAB12340101  </TraceId>
        <TransactionCodeIdentifier/>
        <HolderAmount>-10.00</HolderAmount>
        <HolderCurrencyCode>826</HolderCurrencyCode>
        <HolderCurrencyAlpha>GBP</HolderCurrencyAlpha>
        <FxRate>1.247456</FxRate>
        <FeeGroupId>1</FeeGroupId>
        <FeeGroupName>Test fee group</FeeGroupName>
        <FxFeeName>2</FxFeeName>
        <FxFeeAmount>-1.60</FxFeeAmount>
        <FxFeeCurrency>826</FxFeeCurrency>
        <FxFeeReason/>
        <F0FeeName/>
        <F0FeeAmount/>
        <F0FeeCurrency/>
        <F0FeeReason/>
        <BillRateAmount>1</BillRateAmount>
        <BillingDate>2019-07-30 13:39:22</BillingDate>
        <BillingAmount>-10.00</BillingAmount>
        <BillingCurrencyCode>840</BillingCurrencyCode>
        <BillingCurrencyAlpha>USD</BillingCurrencyAlpha>
        <SettlementAmount>-10.00</SettlementAmount>
        <SettlementCurrencyCode>840</SettlementCurrencyCode>
        <SettlementCurrencyAlpha>USD</SettlementCurrencyAlpha>
        <SettlementConversionRate>1.0</SettlementConversionRate>
        <CardPresent>Card present</CardPresent>
        <TransactionId>15644832004629</TransactionId>
        <TransactionClass>International</TransactionClass>
        <Action>Debit</Action>
        <Network>MasterCard</Network>
        <TransactionDescription/>
        <EntryModeCode>1</EntryModeCode>
        <EntryModeCodeDescription>MAGNETIC-STRIPE</EntryModeCodeDescription>
        <ReferenceNumber/>
        <BalanceAdjustmentType/>
        <CountryIson>840</CountryIson>
        <LoadType/>
        <LoadSource/>
        <EpmMethodId/>
        <EpmTransactionId/>
        <ExternalEpmTransactionId/>
        <EpmTransactionType/>
        <EpmTransactionStatusCode/>
        <EpmTransactionStatus/>
        <EpmTransactionReasonDescription/>
        <EpmTransactionBankProviderReasonCode/>
        <EpmMandateId/>
        <Reference/>
        <TransactionIdentifier/>
        <TransactionReferenceNumber/>
        <EndToEndIdentifier/>
        <ActualEndToEndIdentifier/>
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
        <ParentTransactionId/>
        <DisputeId/>
        <ExternalDisputeId/>
        <ExternalPaymentScheme>1</ExternalPaymentScheme>
        <ExternalIbanCountry>840</ExternalIbanCountry>
        <InternalIbanCountry>826</InternalIbanCountry>
        <ExternalIban>GB85SRLG04005981391558</ExternalIban>
        <ExternalBbanExternalBban/>
        <ExternalAccountName>John Smith</ExternalAccountName>
        <ExternalAccountNumber>81391558</ExternalAccountNumber>
        <ExternalSortCode>040058</ExternalSortCode>
        <ExternalBIC/>
        <OriginatorId>1</OriginatorId>
        <OriginatorName>ANTIQUARIES</OriginatorName>
        <OriginatorServiceUserNumber>ANTIQUARIES user name</OriginatorServiceUserNumber>
    </AccountActivity>
</AccountsActivities>
```

### File name structure

| Part                | M | Description                                                                |
|---------------------|---|----------------------------------------------------------------------------|
| accounts-activities | M | Report type.                                                               |
| 1                   | M | Client ID.                                                                 |
| 20                  | M | Issuer ID.                                                                 |
| 123456              | M | Issuer identification number.                                              |
| 20200327            | M | Date (format `Ymd`).                                                       |
| 085412              | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271      | C | Unique ID. Available if report generates more than once per day.           |
| regen               | C | Is regenerated (available only if report was regenerated).                 |
| 1                   | C | Regeneration count.                                                        |
| xml                 | M | File extension.                                                            |

```
accounts-activities-1-20-12345-20200327.xml
```

## Authorize
### Data elements

| Field name                     | M | Type | Length    | Description                                                                                                                                                                                                   |
|--------------------------------|---|------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| FileDate                       | M | NS   | 10        | Report generation date                                                                                                                                                                                        |
| WorkDate                       | M | NS   | 19        | Authorize date created                                                                                                                                                                                        |
| IssuerIdentificationNumber     | M | N    | 20        | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.)                                                                                                                                              |
| ProgramName                    | M | ANS  | [1-255]   | Program name associated with card or account                                                                                                                                                                  |
| ProgramId                      | M | N    | [1-20]    | Program associated with card or account                                                                                                                                                                       |
| ProductName                    | M | ANS  | [1-50]    | Product name associated with card                                                                                                                                                                             |
| ProductId                      | M | N    | [1-20]    | Product associated with card                                                                                                                                                                                  |
| SubProductId                   | C | N    | [1-20]    | Sub-product name associated with card                                                                                                                                                                         |
| HolderId                       | M | N    | [1-20]    |                                                                                                                                                                                                               |
| AccountId                      | M | N    | [1-20]    |                                                                                                                                                                                                               |
| CardLimitsGroupName            | C | ANS  | [1-50]    |                                                                                                                                                                                                               |
| CardLimitsGroupId              | C | N    | [1-20]    |                                                                                                                                                                                                               |
| AccountLimitsGroupName         | C | ANS  | [1-50]    |                                                                                                                                                                                                               |
| AccountLimitsGroupId           | C | N    | [1-20]    |                                                                                                                                                                                                               |
| HolderLimitsGroupName          | C | ANS  | [1-50]    |                                                                                                                                                                                                               |
| HolderLimitsGroupId            | C | N    | [1-20]    |                                                                                                                                                                                                               |
| FeeGroupName                   | C | ANS  | [1-50]    |                                                                                                                                                                                                               |
| FeeGroupId                     | C | N    | [1-20]    |                                                                                                                                                                                                               |
| CardNumber                     | C | N    | [16-19]   | Card primary account number                                                                                                                                                                                   |
| CardNumberId                   | C | N    | [1-20]    | Card ID                                                                                                                                                                                                       |
| CardRequestId                  | C | N    | [1-20]    | Card number ID                                                    |
| MtiCode                        | M | AN   | 4         | Message type iIdentifier from scheme                                                                                                                                                                          |
| ResponseCode                   | M | N    | 2         |                                                                                                                                                                                                               |
| ResponseCodeDescription        | C | ANS  | [1-255]   |                                                                                                                                                                                                               |
| ResponseDeclineDescription     | C | ANS  | [0-65535] | Authorize note                                                                                                                                                                                                |
| TransactionCode                | M | N    | [1-11]    | [Transaction code](#appendix--enum--transaction-code)                                                                                                                                                         |
| TransactionCodeDescription     | M | ANS  | [1-100]   |                                                                                                                                                                                                               |
| Bin                            | C | N    | [6-12]    |                                                                                                                                                                                                               |
| AuthorizationCode              | M | N    | 6         | [Authorization Code](#appendix--enum--authorization-code)                                                                                                                                                     |
| TransactionDateTime            | M | NS   | 19        |                                                                                                                                                                                                               |
| TransactionAmount              | M | NS   | [1-20]    |                                                                                                                                                                                                               |
| TransactionCurrencyCode        | M | N    | 3         | [`Currency`](#appendix--enum--currency)                                                                                                                                                                         |
| TransactionCurrencyAlpha       | M | A    | 3         | [`Currency`](#appendix--enum--currency)                                                                                                                                                                         |
| TransactionCountryCode         | M | N    | 3         |                                                                                                                                                                                                               |
| TransLink                      | M | ANS  | [1-100]   |                                                                                                                                                                                                               |
| Stan                           | M | N    | 6         | System trace audit number                                                                                                                                                                                     |
| TribeTransactionReference      | M | N    | 20        | Authorize ID                                                                                                                                                                                                  |
| FxRate                         | M | NS   | 16;9      | Holder conversion rate                                                                                                                                                                                        |
| MccPadding                     | C | N    | [1-20]    | The same as cumulativePaddingAmount (deprecated, after 2020 August 31 will be removed).                                                                                                                       |
| CumulativePaddingAmount        | C | NS   | [1-20]    | Calculated padding amount based on the existing padding config. It will be returned if padding is configured and was triggered with that particular transaction.                                              |
| AppliedPaddingAmount           | C | NS   | [1-20]    | Actually applied padding amount (if cumulativePaddingAmount was set and it was greater than initial holder amount, then here will be cumulativePaddingAmount - initial holder amount = appliedPaddingAmount). |
| MccPaddingReason               | C | AN   | [1-255]   | Padding name                                                                                                                                                                                                  |
| BillRateAmount                 | C | NS   | 16;9      |                                                                                                                                                                                                               |
| BillingDate                    | C | NS   | 19        | Authorize date created                                                                                                                                                                                        |
| BillingAmount                  | C | NS   | [1-20]    |                                                                                                                                                                                                               |
| BillingCurrencyCode            | C | N    | 3         | [`Currency`](#appendix--enum--currency)                                                                                                                                                                         |
| BillingCurrencyAlpha           | C | A    | 3         | [`Currency`](#appendix--enum--currency)                                                                                                                                                                         |
| SettlementAmount               | C | NS   | [1-20]    | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program.                                                           |
| SettlementCurrencyCode         | C | N    | 3         | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program.                                                                                      |
| SettlementCurrencyAlpha        | C | A    | 3         | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program.                                                                                      |
| SettlementConversionRate       | C | NS   | 16;9      | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program.                                                                                      |
| MerchantNumber                 | M | AN   | [1-15]    |                                                                                                                                                                                                               |
| MerchantName                   | M | ANS  | [1-50]    |                                                                                                                                                                                                               |
| MerchantCountryCodeAlpha       | M | A    | 3         |                                                                                                                                                                                                               |
| MerchantCountryName            | M | AN   | 255       |                                                                                                                                                                                                               |
| Mcc                            | M | N    | 4         | Merchant Category Code                                                                                                                                                                                        |
| CardPresent                    | M | A    | [1-16]    | Possible values: Card present, Card not present.                                                                                                                                                              |
| PosDataDe22                    | M | N    | 22        |                                                                                                                                                                                                               |
| PosDatDe61                     | C | ANS  | 61        |                                                                                                                                                                                                               |
| AcquirerId                     | M | N    | [1-20]    |                                                                                                                                                                                                               |
| ReferenceNumber                | M | N    | [1-50]    | Retrieval reference number                                                                                                                                                                                    |
| TraceNumber                    | C | AN   | [1-255]   |                                                                                                                                                                                                               |
| Action                         | M | A    | [1-6]     | [Action type](#appendix--enum--action-type)                                                                                                                                                                   |
| Network                        | M | ANS  | [1-255]   | [Network](#appendix--enum--network)                                                                                                                                                                           |
| EntryModeCode                  | M | N    | [1-11]    | [Entry mode code](#appendix--enum--entry-mode-code)                                                                                                                                                           |
| EntryModeCodeDescription       | M | ANS  | 100       | Entry mode code name                                                                                                                                                                                          |
| ECIIndicator                   | M | ANS  | 1         | MasterCard - DE48 SF42 (electronicCommerceIndicators) Visa - DE60 SF08 (electronicCommerceAndPaymentIndicator)                                                                                                |
| Suspicious                     | M | N    | 1         | Possible values: Yes - is suspicious, No - not suspicious.                                                                                                                                                    |
| RiskRuleCodes                  | O | ANS  | 1-65535   | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                                                                              |
| RiskActions / RiskAction       | O | LIST | \-        | [Risk rule action](#appendix--enum--risk-rule-action)                                                                                                                                                         |
| SecurityChecks / SecurityCheck | O | LIST | \-        | [Security check](#appendix--enum--security-check)                                                                                                                                                             |

```xml
<?xml version="1.0" encoding="utf-8"?>
<Authorizes>
    <Authorize>
        <FileDate>2019-07-30</FileDate>
        <WorkDate>2019-07-29</WorkDate>
        <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
        <ProgramName>test program</ProgramName>
        <ProgramId>1</ProgramId>
        <ProductName>Test physical product</ProductName>
        <ProductId>1</ProductId>
        <SubProductId>1</SubProductId>
        <HolderId>1</HolderId>
        <AccountId>1</AccountId>
        <CardLimitsGroupName>Test card limit group</CardLimitsGroupName>
        <CardLimitsGroupId>1</CardLimitsGroupId>
        <AccountLimitsGroupName>Test card account group</AccountLimitsGroupName>
        <AccountLimitsGroupId>7</AccountLimitsGroupId>
        <HolderLimitsGroupName>Test card holder group</HolderLimitsGroupName>
        <HolderLimitsGroupId>1</HolderLimitsGroupId>
        <FeeGroupName>Test fee group</FeeGroupName>
        <FeeGroupId>1</FeeGroupId>
        <CardNumber>5004********0000</CardNumber>
        <CardNumberId>123456</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <MtiCode>0100</MtiCode>
        <ResponseCode>00</ResponseCode>
        <ResponseCodeDescription>Approved or completed successfully</ResponseCodeDescription>
        <ResponseDeclineDescription/>
        <TransactionCode>2</TransactionCode>
        <TransactionCodeDescription>POS</TransactionCodeDescription>
        <Bin>520473</Bin>
        <AuthorizationCode>191727</AuthorizationCode>
        <TransactionDateTime>2019-07-30 13:39:22</TransactionDateTime>
        <TransactionAmount>-10.00</TransactionAmount>
        <TransactionCurrencyCode>826</TransactionCurrencyCode>
        <TransactionCurrencyAlpha>GBP</TransactionCurrencyAlpha>
        <TransactionCountryCode>840</TransactionCountryCode>
        <TransLink>697681000000MDS8D4A5S382683200612123456</TransLink>
        <Stan>622689</Stan>
        <TribeTransactionReference>12345678900000</TribeTransactionReference>
        <FxRate>1</FxRate>
        <MccPadding/>
        <MccPaddingReason/>
        <BillRateAmount>1</BillRateAmount>
        <BillingDate>2019-07-30 13:39:22</BillingDate>
        <BillingAmount>-10.00</BillingAmount>
        <BillingCurrencyCode>840</BillingCurrencyCode>
        <BillingCurrencyAlpha>USD</BillingCurrencyAlpha>
        <SettlementAmount>-10.00</SettlementAmount>
        <SettlementCurrencyCode>840</SettlementCurrencyCode>
        <SettlementCurrencyAlpha>USD</SettlementCurrencyAlpha>
        <SettlementConversionRate>1.0</SettlementConversionRate>
        <MerchantNumber>111111111111111</MerchantNumber>
        <MerchantName>MEMBER TEST CASE             SOMEWHERE         MO </MerchantName>
        <MerchantCountryCodeAlpha>USA</MerchantCountryCodeAlpha>
        <MerchantCountryName>United States</MerchantCountryName>
        <Mcc>6011</Mcc>
        <CardPresent>Card present</CardPresent>
        <PosDataDe22>021</PosDataDe22>
        <PosDatDe61>00000000000008403129-1234</PosDatDe61>
        <AcquirerId>999901</AcquirerId>
        <ReferenceNumber>90730622689</ReferenceNumber>
        <TraceNumber>MRGJOBJI00000</TraceNumber>
        <Action>Debit</Action>
        <Network>MasterCard</Network>
        <EntryModeCode>1</EntryModeCode>
        <EntryModeCodeDescription>MAGNETIC-STRIPE</EntryModeCodeDescription>
        <ECIIndicator/>
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
    </Authorize>
</Authorizes>
```

### File name structure

| Part           | M | Description                                                                |
|----------------|---|----------------------------------------------------------------------------|
| authorizes     | M | Report type.                                                               |
| 1              | M | Client ID.                                                                 |
| 20             | M | Issuer ID.                                                                 |
| 123456         | M | Issuer identification number.                                              |
| 20200327       | M | Date (format `Ymd`).                                                       |
| 085412         | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271 | C | Unique ID. Available if report generates more than once per day.           |
| regen          | C | Is regenerated (available only if report was regenerated).                 |
| 1              | C | Regeneration count.                                                        |
| xml            | M | File extension.                                                            |

```
authorizes-1-20-12345-20200327.xml
```

## Card
### Data elements

| Field name                                                                     | M | Type | Length  | Description                                                      |
|--------------------------------------------------------------------------------|---|------|---------|------------------------------------------------------------------|
| FileDate                                                                       | M | NS   | 10      | Report generation date                                           |
| WorkDate                                                                       | M | NS   | 19      | Card date updated                                                |
| IssuerIdentificationNumber                                                     | M | N    | 20      | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.) |
| ProgramName                                                                    | M | ANS  | [1-255] | Program name associated with card or account                     |
| ProgramId                                                                      | M | N    | [1-20]  | Program associated with card or account                          |
| ProductName                                                                    | M | ANS  | [1-50]  | Product name associated with card                                |
| ProductId                                                                      | M | N    | [1-20]  | Product associated with card                                     |
| SubProductId                                                                   | M | N    | [1-20]  | Sub-product name associated with card                            |
| HolderId                                                                       | M | N    | [1-20]  |                                                                  |
| Accounts / Account/ AccountId                                                  | M | N    | [1-20]  |                                                                  |
| Accounts / Account/ AccountStatus                                              | M | A    | [1-2]   | [Account status](#appendix--enum--account-status)                |
| Accounts / Account/ AccountStatusDate                                          | O | NS   | 10      | Date when account status has been changed.                                  |
| Accounts / Account/ AccountStatusChangeSource                                  | O | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| Accounts / Account/ AccountStatusChangeReasonCode                              | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| Accounts / Account/ AccountStatusChangeNote                                    | O | ANS  | [1-255] | A short description which explains why account status has been changed.     |
| Accounts / Account/ AccountStatusChangeOriginatorId                            | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| Accounts / Account/ AccountLimitsGroupName                                     | M | ANS  | [1-50]  |                                                                  |
| Accounts / Account/ AccountLimitsGroupId                                       | M | N    | [1-20]  |                                                                  |
| Accounts / Account/ AccountFeeGroupName                                        | M | ANS  | [1-50]  |                                                                  |
| Accounts / Account/ AccountFeeGroupId                                          | M | N    | [1-20]  |                                                                  |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountNumber             | C | AN   | [1-26]  |                                                                  |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountSortCode           | C | AN   | 50      |                                                                  |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountIban               | C | AN   | 50      |                                                                  |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountBic                | C | AN   | 50      |                                                                  |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountStatus             | C | A    | [2-3]   | Is active (Yes/No)                                               |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountDirectDebitsIn     | C | A    | [2-3]   | Bank Account Direct Credit Enabled (Yes/No)                      |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountDirectDebitsOut    | C | A    | [2-3]   | Bank Account Direct Debit Enabled (Yes/No)                       |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountInstantPaymentsIn  | C | A    | [2-3]   | Bank Account Inbound Enabled (Yes/No)                            |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountInstantPaymentsOut | C | A    | [2-3]   | Bank Account Outbound Enabled (Yes/No)                           |
| Accounts / Account/ AvailableBalance                                           | M | NS   | [1-20]  |                                                                  |
| Accounts / Account/ BlockedAmount                                              | M | NS   | [1-20]  | Settled balance - available balance - reserved balance           |
| Accounts / Account/ CurrentBalance                                             | M | NS   | [1-20]  | Settled balance                                                  |
| Accounts / Account/ AccountCurrency                                            | M | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                 |
| CardNumber                                                                     | M | N    | [16-19] | Card primary account number                                      |
| CardNumberId                                                                   | M | N    | [1-20]  | Card ID                                                          |
| CardRequestId                                                                  | M | N    | [1-20]  | Card number ID                                                    |
| IsVirtual                                                                      | M | A    | [2-3]   | Is virtual card (Yes/No)                                         |
| CardExpirationDate                                                             | M | NS   | 7       |                                                                  |
| CardCreationDate                                                               | M | NS   | 10      |                                                                  |
| CardActivationDate                                                             | C | NS   | 10      |                                                                  |
| CardStatusDate                                                                 | C | NS   | 10      |                                                                  |
| CardStatusCode                                                                 | M | A    | [1-2]   | [Card status code](#appendix--enum--card-status-code)            |
| CardStatusCodeDescription                                                      | M | AS   | 20      | Explains status code meaning.                                               |
| CardStatusChangeSource                                                         | O | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| CardStatusChangeReasonCode                                                     | O | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| CardStatusChangeNote                                                           | O | ANS  | [1-255] | A short description which explains why card status has been changed.        |
| CardStatusChangeOriginatorId                                                   | O | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| LimitsGroupName                                                                | M | ANS  | [1-50]  |                                                                  |
| LimitsGroupId                                                                  | M | N    | [1-20]  |                                                                  |
| FeeGroupName                                                                   | M | ANS  | [1-50]  |                                                                  |
| FeeGroupId                                                                     | M | N    | [1-20]  |                                                                  |
| UsageGroupName                                                                 | M | ANS  | [1-50]  |                                                                  |
| UsageGroupId                                                                   | M | N    | [1-20]  |                                                                  |
| FirstName                                                                      | M | ANS  | [1-50]  |                                                                  |
| LastName                                                                       | M | ANS  | [1-50]  |                                                                  |
| Address                                                                        | M | ANS  | [1-400] |                                                                  |
| City                                                                           | M | AN   | [1-50]  |                                                                  |
| State                                                                          | O | ANS  | [1-50]  |                                                                  |
| ZipCode                                                                        | M | ANS  | [1-9]   |                                                                  |
| CountryCode                                                                    | M | N    | 3       |                                                                  |
| CountryCodeAlpha                                                               | M | A    | 3       |                                                                  |
| CountryName                                                                    | M | AN   | 255     |                                                                  |
| Dob                                                                            | C | NS   | 10      | Holder birthday date                                             |
| EmailAddress                                                                   | C | ANS  | 100     | Holder email address                                             |
| PhoneNumber                                                                    | M | N    | 15      | Holder phone number                                              |
| PhoneNumberCountryCode                                                         | M | NS   | 6       | Holder phone number country code                                 |
| ApplicationIpAddress                                                           | C | NS   | 15      | Holder IP address                                                |
| KycVerification                                                                | M | N    | 1       | Indicates the level of kyc verification conducted                |
| CardEvents / Event                                                             | M | LIST | \-      | Card update event name. [Card event](#appendix--card-events)     |
| DefaultCardCurrency                                                            | M | A    | 3       | [`Currency`](#appendix--enum--currency) ISON                                                    |
| Network                                                                        | M | ANS  | [1-255] | [Network](#appendix--enum--network)                              |
| DeliveryTitle                                                                  | C | AS   | [1-7]   | Mandatory for physical cards                                     |
| DeliveryFirstName                                                              | C | AS   | [1-50]  | Mandatory for physical cards                                     |
| DeliveryLastName                                                               | C | AS   | [1-50]  | Mandatory for physical cards                                     |
| DeliveryAddress                                                                | C | ANS  | [1-400] | Mandatory for physical cards                                     |
| DeliveryCity                                                                   | C | ANS  | [1-50]  | Mandatory for physical cards                                     |
| DeliveryState                                                                  | O | ANS  | [1-50]  |                                                                  |
| DeliveryZipCode                                                                | C | ANS  | [1-9]   | Mandatory for physical cards                                     |
| DeliveryCountryCode                                                            | C | N    | 3       | Mandatory for physical cards                                     |
| DeliveryCountryName                                                            | C | AN   | [1-255] | Mandatory for physical cards                                     |

```xml
<?xml version="1.0" encoding="utf-8"?>
<Cards>
    <Card>
        <FileDate>2019-07-30</FileDate>
        <WorkDate>2019-07-25</WorkDate>
        <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
        <ProgramName>test program</ProgramName>
        <ProgramId>1</ProgramId>
        <ProductName>Test physical product</ProductName>
        <ProductId>1</ProductId>
        <SubProductId>1</SubProductId>
        <HolderId>2</HolderId>
        <Accounts>
            <Account>
                <AccountId>2</AccountId>
                <AccountStatus>A</AccountStatus>
                <AccountStatusDate/>
                <AccountStatusChangeSource/>
                <AccountStatusChangeReasonCode/>
                <AccountStatusChangeNote/>
                <AccountStatusChangeOriginatorId/>
                <AccountLimitsGroupName>Test card account group</AccountLimitsGroupName>
                <AccountLimitsGroupId>7</AccountLimitsGroupId>
                <AccountFeeGroupName>Test fee group</AccountFeeGroupName>
                <AccountFeeGroupId>1</AccountFeeGroupId>
                <BankAccounts/>
                <AvailableBalance>1000000.00</AvailableBalance>
                <BlockedAmount>0.00</BlockedAmount>
                <CurrentBalance>1000000.00</CurrentBalance>
                <AccountCurrency>USD</AccountCurrency>
            </Account>
        </Accounts>
        <CardNumber>6000*********0000</CardNumber>
        <CardNumberId>123457</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <IsVirtual>No</IsVirtual>
        <CardExpirationDate>2025-12</CardExpirationDate>
        <CardCreationDate>2019-07-25</CardCreationDate>
        <CardActivationDate/>
        <CardStatusDate/>
        <CardStatusCode>A</CardStatusCode>
        <CardStatusCodeDescription>Activated</CardStatusCodeDescription>
        <CardStatusChangeSource/>
        <CardStatusChangeReasonCode/>
        <CardStatusChangeNote/>
        <CardStatusChangeOriginatorId/>
        <LimitsGroupName>Test card limit group</LimitsGroupName>
        <LimitsGroupId>1</LimitsGroupId>
        <FeeGroupName>Test fee group</FeeGroupName>
        <FeeGroupId>1</FeeGroupId>
        <UsageGroupName>Group name 1</UsageGroupName>
        <UsageGroupId>1</UsageGroupId>
        <FirstName>A</FirstName>
        <LastName>B</LastName>
        <Address>1520 Main; London; ; </Address>
        <City>London</City>
        <State>London</State>
        <ZipCode>63110</ZipCode>
        <CountryCode>826</CountryCode>
        <CountryCodeAlpha>GBR</CountryCodeAlpha>
        <CountryName>United Kingdom</CountryName>
        <Dob/>
        <EmailAddress/>
        <PhoneNumber>12345678</PhoneNumber>
        <PhoneNumberCountryCode>44</PhoneNumberCountryCode>
        <ApplicationIpAddress/>
        <KycVerification>0</KycVerification>
        <CardEvents>
            <Event>New Card</Event>
        </CardEvents>
        <DefaultCardCurrency>USD</DefaultCardCurrency>
        <Network>MasterCard</Network>
        <DeliveryTitle>Mr</DeliveryTitle>
        <DeliveryFirstName>A</DeliveryFirstName>
        <DeliveryLastName>B</DeliveryLastName>
        <DeliveryAddress>1520 Main; London; ; </DeliveryAddress>
        <DeliveryCity>London</DeliveryCity>
        <DeliveryState>London</DeliveryState>
        <DeliveryZipCode>63110</DeliveryZipCode>
        <DeliveryCountryCode>826</DeliveryCountryCode>
        <DeliveryCountryName>United Kingdom</DeliveryCountryName>
    </Card>
</Cards>
```

### File name structure

| Part           | M | Description                                                                |
|----------------|---|----------------------------------------------------------------------------|
| cards          | M | Report type.                                                               |
| 1              | M | Client ID.                                                                 |
| 20             | M | Issuer ID.                                                                 |
| 123456         | M | Issuer identification number.                                              |
| 20200327       | M | Date (format `Ymd`).                                                       |
| 085412         | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271 | C | Unique ID. Available if report generates more than once per day.           |
| xml            | M | File extension.                                                            |

```
cards-1-20-12345-20200327.xml
```

## Card snapshot
### Data elements

| Field name                                                                     | M  | Type | Length  | Description                                                       |
|--------------------------------------------------------------------------------|----|------|---------|-------------------------------------------------------------------|
| FileDate                                                                       | M  | NS   | 10      | Report generation date                                            |
| WorkDate                                                                       | M  | NS   | 19      | Snapshot date                                                     |
| IssuerIdentificationNumber                                                     | M  | N    | 20      | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.)  |
| ProgramName                                                                    | M  | ANS  | [1-255] | Program name associated with card or account                      |
| ProgramId                                                                      | M  | N    | [1-20]  | Program associated with card or account                           |
| ProductName                                                                    | M  | ANS  | [1-50]  | Product name associated with card                                 |
| ProductId                                                                      | M  | N    | [1-20]  | Product associated with card                                      |
| SubProductId                                                                   | M  | N    | [1-20]  | Sub-product name associated with card                             |
| HolderId                                                                       | M  | N    | [1-20]  |                                                                   |
| Accounts / Account/ AccountId                                                  | M  | N    | [1-20]  |                                                                   |
| Accounts / Account/ AccountStatus                                              | M  | A    | [1-2]   | [Account status](#appendix--enum--account-status)                 |
| Accounts / Account/ AccountStatusDate                                          | O | NS    | 10      | Date when account status has been changed.                                  |
| Accounts / Account/ AccountStatusChangeSource                                  | O | N     | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| Accounts / Account/ AccountStatusChangeReasonCode                              | O | N     | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| Accounts / Account/ AccountStatusChangeNote                                    | O | ANS   | [1-255] | A short description which explains why account status has been changed.     |
| Accounts / Account/ AccountStatusChangeOriginatorId                            | O | N     | [1-20]  | User ID or Program Manager API credential ID.                               |
| Accounts / Account/ AccountLimitsGroupName                                     | M  | ANS  | [1-50]  |                                                                   |
| Accounts / Account/ AccountLimitsGroupId                                       | M  | N    | [1-20]  |                                                                   |
| Accounts / Account/ AccountFeeGroupName                                        | M  | ANS  | [1-50]  |                                                                   |
| Accounts / Account/ AccountFeeGroupId                                          | M  | N    | [1-20]  |                                                                   |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountNumber             | C  | AN   | [1-26]  |                                                                   |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountSortCode           | C  | AN   | 50      |                                                                   |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountIban               | C  | AN   | 50      |                                                                   |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountBic                | C  | AN   | 50      |                                                                   |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountStatus             | C  | A    | [2-3]   | Is active (Yes/No)                                                |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountDirectDebitsIn     | C  | A    | [2-3]   | Bank Account Direct Credit Enabled (Yes/No)                       |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountDirectDebitsOut    | C  | A    | [2-3]   | Bank Account Direct Debit Enabled (Yes/No)                        |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountInstantPaymentsIn  | C  | A    | [2-3]   | Bank Account Inbound Enabled (Yes/No)                             |
| Accounts / Account/ BankAccounts / BankAccount / BankAccountInstantPaymentsOut | C  | A    | [2-3]   | Bank Account Outbound Enabled (Yes/No)                            |
| Accounts / Account/ AvailableBalance                                           | M  | NS   | [1-20]  |                                                                   |
| Accounts / Account/ BlockedAmount                                              | M  | NS   | [1-20]  | Settled balance - available balance - reserved balance            |
| Accounts / Account/ CurrentBalance                                             | M  | NS   | [1-20]  | Settled balance                                                   |
| Accounts / Account/ AccountCurrency                                            | M  | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                  |
| CardNumber                                                                     | M  | N    | [16-19] | Card primary account number                                       |
| CardNumberId                                                                   | M  | N    | [1-20]  | Card ID                                                           |
| CardRequestId                                                                  | M  | N    | [1-20]  | Card number ID                                                    |
| IsVirtual                                                                      | M  | A    | [2-3]   | Is virtual card (Yes/No)                                          |
| CardExpirationDate                                                             | M  | NS   | 7       |                                                                   |
| CardCreationDate                                                               | M  | NS   | 10      |                                                                   |
| CardActivationDate                                                             | C  | NS   | 10      |                                                                   |
| CardStatusDate                                                                 | C  | NS   | 10      |                                                                   |
| CardStatusCode                                                                 | M  | A    | [1-2]   | [Card status code](#appendix--enum--card-status-code)             |
| CardStatusCodeDescription                                                      | M  | AS   | 20      |                                                                   |
| CardStatusChangeSource                                                         | O  | N    | 1       | [`Status change source`](#appendix--enum--status-change--source).           |
| CardStatusChangeReasonCode                                                     | O  | N    | [1-20]  | [`Status change reason code`](#appendix--enum--status-change--reason-code). |
| CardStatusChangeNote                                                           | O  | ANS  | [1-255] | A short description which explains why card status has been changed.        |
| CardStatusChangeOriginatorId                                                   | O  | N    | [1-20]  | User ID or Program Manager API credential ID.                               |
| LimitsGroupName                                                                | M  | ANS  | [1-50]  |                                                                   |
| LimitsGroupId                                                                  | M  | N    | [1-20]  |                                                                   |
| FeeGroupName                                                                   | M  | ANS  | [1-50]  |                                                                   |
| FeeGroupId                                                                     | M  | N    | [1-20]  |                                                                   |
| UsageGroupName                                                                 | M  | ANS  | [1-50]  |                                                                   |
| UsageGroupId                                                                   | M  | N    | [1-20]  |                                                                   |
| FirstName                                                                      | M  | ANS  | [1-50]  |                                                                   |
| LastName                                                                       | M  | ANS  | [1-50]  |                                                                   |
| Address                                                                        | M  | ANS  | [1-400] |                                                                   |
| City                                                                           | M  | AN   | [1-50]  |                                                                   |
| State                                                                          | O  | ANS  | [1-50]  |                                                                   |
| ZipCode                                                                        | M  | ANS  | [1-9]   |                                                                   |
| CountryCode                                                                    | M  | N    | 3       |                                                                   |
| CountryCodeAlpha                                                               | M  | A    | 3       |                                                                   |
| CountryName                                                                    | M  | AN   | 255     |                                                                   |
| Dob                                                                            | C  | NS   | 10      | Holder birthday date                                              |
| EmailAddress                                                                   | C  | ANS  | 100     | Holder email address                                              |
| PhoneNumber                                                                    | M  | N    | 15      | Holder phone number                                               |
| PhoneNumberCountryCode                                                         | M  | NS   | 6       | Holder phone number country code                                  |
| ApplicationIpAddress                                                           | C  | NS   | 15      | Holder IP address                                                 |
| KycVerification                                                                | M  | N    | 1       | Indicates the level of kyc verification conducted                 |
| CardEvent                                                                      | C  | AS   | [1-255] | Card update event name. [Card event](#appendix--enum--card-event) |
| DefaultCardCurrency                                                            | M  | A    | 3       | [`Currency`](#appendix--enum--currency) ISON                                                     |
| Network                                                                        | M  | ANS  | [1-255] | [Network](#appendix--enum--network)                               |
| DeliveryTitle                                                                  | C  | AS   | [1-7]   | Mandatory for physical cards                                      |
| DeliveryFirstName                                                              | C  | AS   | [1-50]  | Mandatory for physical cards                                      |
| DeliveryLastName                                                               | C  | AS   | [1-50]  | Mandatory for physical cards                                      |
| DeliveryAddress                                                                | C  | ANS  | [1-400] | Mandatory for physical cards                                      |
| DeliveryCity                                                                   | C  | ANS  | [1-50]  | Mandatory for physical cards                                      |
| DeliveryState                                                                  | O  | ANS  | [1-50]  |                                                                   |
| DeliveryZipCode                                                                | C  | ANS  | [1-9]   | Mandatory for physical cards                                      |
| DeliveryCountryCode                                                            | C  | N    | 3       | Mandatory for physical cards                                      |
| DeliveryCountryName                                                            | C  | AN   | [1-255] | Mandatory for physical cards                                      |
| ActiveWallet                                                                   | \- | \-   | \-      | null                                                              |

```xml
<?xml version="1.0" encoding="utf-8"?>
<CardsSnapshots>
    <CardSnapshot>
        <FileDate>2020-08-03</FileDate>
        <WorkDate>2020-08-02 01:02:03</WorkDate>
        <IssuerIdentificationNumber>123456</IssuerIdentificationNumber>
        <ProgramName>Program name</ProgramName>
        <ProgramId>181</ProgramId>
        <ProductName>Product name</ProductName>
        <ProductId>151</ProductId>
        <SubProductId>293</SubProductId>
        <HolderId>14682</HolderId>
        <Accounts>
            <Account>
                <AccountId>14681</AccountId>
                <AccountStatus>A</AccountStatus>
                <AccountStatusDate/>
                <AccountStatusChangeSource/>
                <AccountStatusChangeReasonCode/>
                <AccountStatusChangeNote/>
                <AccountStatusChangeOriginatorId/>
                <AccountLimitsGroupName>Account limit group</AccountLimitsGroupName>
                <AccountLimitsGroupId>91</AccountLimitsGroupId>
                <AccountFeeGroupName>Fee group name</AccountFeeGroupName>
                <AccountFeeGroupId>41</AccountFeeGroupId>
                <BankAccounts/>
                <AvailableBalance>0.00</AvailableBalance>
                <BlockedAmount>0.00</BlockedAmount>
                <CurrentBalance>0.00</CurrentBalance>
                <AccountCurrency>EUR</AccountCurrency>
            </Account>
        </Accounts>
        <CardNumber>555555******5555</CardNumber>
        <CardNumberId>117996</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <IsVirtual>No</CardType>
        <CardExpirationDate>2024-12</CardExpirationDate>
        <CardCreationDate>2019-12-23</CardCreationDate>
        <CardActivationDate>2020-01-07</CardActivationDate>
        <CardStatusDate>2020-01-07</CardStatusDate>
        <CardStatusCode>A</CardStatusCode>
        <CardStatusCodeDescription>Activated</CardStatusCodeDescription>
        <CardStatusChangeSource/>
        <CardStatusChangeReasonCode/>
        <CardStatusChangeNote/>
        <CardStatusChangeOriginatorId/>
        <LimitsGroupName>Limit group name</LimitsGroupName>
        <LimitsGroupId>71</LimitsGroupId>
        <FeeGroupName>Fee group name</FeeGroupName>
        <FeeGroupId>41</FeeGroupId>
        <UsageGroupName>Usage group name</UsageGroupName>
        <UsageGroupId>81</UsageGroupId>
        <FirstName>John</FirstName>
        <LastName>Smith</LastName>
        <Address>address 1 2; ; ; </Address>
        <City>London</City>
        <State>Uk</State>
        <ZipCode>SW 666</ZipCode>
        <CountryCode>826</CountryCode>
        <CountryCodeAlpha>GBR</CountryCodeAlpha>
        <CountryName>United Kingdom</CountryName>
        <Dob/>
        <EmailAddress/>
        <PhoneNumber>306999992222</PhoneNumber>
        <PhoneNumberCountryCode>44</PhoneNumberCountryCode>
        <ApplicationIpAddress/>
        <KycVerification>0</KycVerification>
        <CardEvent>Card Status Change</CardEvent>
        <DefaultCardCurrency>EUR</DefaultCardCurrency>
        <Network>Mastercard</Network>
        <DeliveryTitle/>
        <DeliveryFirstName>John</DeliveryFirstName>
        <DeliveryLastName>Smith</DeliveryLastName>
        <DeliveryAddress>address 1 2; ; ; </DeliveryAddress>
        <DeliveryCity>London</DeliveryCity>
        <DeliveryState>Uk</DeliveryState>
        <DeliveryZipCode>SW 666</DeliveryZipCode>
        <DeliveryCountryCode>826</DeliveryCountryCode>
        <DeliveryCountryName>United Kingdom</DeliveryCountryName>
        <ActiveWallet/>
    </CardSnapshot>
</CardsSnapshots>
```

### File name structure

| Part            | M | Description                                                                |
|-----------------|---|----------------------------------------------------------------------------|
| cards-snapshots | M | Report type.                                                               |
| 1               | M | Client ID.                                                                 |
| 20              | M | Issuer ID.                                                                 |
| 123456          | M | Issuer identification number.                                              |
| 20200327        | M | Date (format `Ymd`).                                                       |
| 085412          | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271  | C | Unique ID. Available if report generates more than once per day.           |
| xml             | M | File extension.                                                            |

```
cards-snapshots-1-20-12345-20200327.xml
```

## Fee collection
### Data elements

| Field name                  | M | Type | Length  | Description                                                                                                                  |
|-----------------------------|---|------|---------|------------------------------------------------------------------------------------------------------------------------------|
| FileDate                    | M | NS   | 10      | Report generation date                                                                                                       |
| WorkDate                    | M | NS   | 19      | Card date updated                                                                                                            |
| IssuerIdentificationNumber  | M | N    | 20      | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.)                                                             |
| FeeID                       | M | N    | [1-20]  | Fee collection ID                                                                                                            |
| ProgramName                 | C | ANS  | [1-255] | Program name that is associated with the card, provided that fee collection is also associated with the card.                |
| ProgramId                   | C | N    | [1-20]  | Program ID that is associated with the card, provided that fee collection is also associated with the card.                  |
| ProductName                 | C | ANS  | [1-50]  | Product name that is associated with the card, provided that fee collection is also associated with the card.                |
| ProductId                   | C | N    | [1-20]  | Product ID that is associated with the card, provided that fee collection is also associated with the card.                  |
| SubProductId                | C | N    | [1-20]  | Sub-product ID that is associated with the card, provided that fee collection is also associated with the card.              |
| HolderId                    | C | N    | [1-20]  | Provided that fee collection is associated with the card.                                                                    |
| AccountId                   | C | N    | [1-20]  | Account ID that is associated with transaction, authorise or card. Provided that fee collection is associated with the card. |
| CardNumberId                | C | N    | [1-20]  | Card ID                                                                                                                      |
| CardRequestId               | C | N    | [1-20]  | Card number ID                                                                                                               |
| TransactionAmount           | M | NS   | [1-20]  |                                                                                                                              |
| TransactionCurrencyCode     | M | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                      |
| TransactionCurrencyAlpha    | M | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                      |
| ReconciliationAmount        | M | NS   | [1-20]  |                                                                                                                              |
| ReconciliationCurrencyCode  | M | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                      |
| ReconciliationCurrencyAlpha | M | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                      |
| ReconciliationRate          | M | NS   | 16;9    |                                                                                                                              |
| TransLink                   | M | ANS  | [1-100] |                                                                                                                              |
| CycleFileId                 | M | N    | [1-20]  | Clearing file ID.                                                                                                            |
| FunctionCode                | M | N    | 3       | [Function code](#appendix--enum--function-code)                                                                              |
| MessageReasonCode           | M | N    | 4       | Mastercard message reason code. DE 25 from clearing file.                                                                    |
| ForwarderId                 | M | N    | [1-11]  |                                                                                                                              |
| MerchantTerminalId          | C | ANS  | [1-11]  |                                                                                                                              |
| SettlementDate              | C | NS   | 10      |                                                                                                                              |
| TransactionId               | C | N    | [1-20]  |                                                                                                                              |
| AuthorizeId                 | C | N    | [1-20]  |                                                                                                                              |
| FeeDescription              | M | ANS  | [1-500] |                                                                                                                              |
| InternalReasonCode          | C | N    | [1-3]   | [Internal reason code](#appendix--enum--internal-reason-code)                                                                |

```xml
<?xml version="1.0" encoding="utf-8"?>
<FeesCollection>
    <Fee>
        <FileDate>2020-03-12</FileDate>
        <WorkDate>2019-09-06 12:41:00</WorkDate>
        <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
        <FeeID>16310860010464</FeeID>
        <ProgramName>test program</ProgramName>
        <ProgramId>1</ProgramId>
        <ProductName>Test physical product</ProductName>
        <ProductId>1</ProductId>
        <SubProductId>1</SubProductId>
        <HolderId>1</HolderId>
        <AccountId>1</AccountId>
        <CardNumberId>123456</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <TransactionAmount>0.16</TransactionAmount>
        <TransactionCurrencyCode>826</TransactionCurrencyCode>
        <TransactionCurrencyAlpha>GBP</TransactionCurrencyAlpha>
        <ReconciliationAmount>0.18</ReconciliationAmount>
        <ReconciliationCurrencyCode>978</ReconciliationCurrencyCode>
        <ReconciliationCurrencyAlpha>EUR</ReconciliationCurrencyAlpha>
        <ReconciliationRate>1.125</ReconciliationRate>
        <TransLink>697681000000MDS8D4A5S382683200612123456</TransLink>
        <CycleFileId>123</CycleFileId>
        <FunctionCode>783</FunctionCode>
        <MessageReasonCode>7621</MessageReasonCode>
        <ForwarderId>012345</ForwarderId>
        <MerchantTerminalId>00000999</MerchantTerminalId>
        <SettlementDate>2019-09-02</SettlementDate>
        <TransactionId/>
        <AuthorizeId/>
        <FeeDescription>ATM Balance Inquiry Fee</FeeDescription>
        <InternalReasonCode>1</InternalReasonCode>
    </Fee>
</FeesCollection>
```

### File name structure

| Part            | M | Description                                                                |
|-----------------|---|----------------------------------------------------------------------------|
| fees-collection | M | Report type.                                                               |
| 1               | M | Client ID.                                                                 |
| 20              | M | Issuer ID.                                                                 |
| 123456          | M | Issuer identification number.                                              |
| 20200327        | M | Date (format `Ymd`).                                                       |
| 085412          | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271  | C | Unique ID. Available if report generates more than once per day.           |
| regen           | C | Is regenerated (available only if report was regenerated).                 |
| 1               | C | Regeneration count.                                                        |
| xml             | M | File extension.                                                            |

```
fees-collection-1-20-12345-20200327.xml
```

## Lookup
```xml
<?xml version="1.0" encoding="utf-8"?>
<Lookups>
    <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
    <CardEvents>
        <CardEvent cc="New Card"/>
    </CardEvents>
    <RegionTypes>
        <RegionType cc="Interregional"/>
    </RegionTypes>
    <ActionTypes>
        <ActionType cc="Credit"/>
    </ActionTypes>
    <AuthorizationCodes>
        <AuthorizationCode cc="AN">Normal authorize</AuthorizationCode>
    </AuthorizationCodes>
    <TransactionCodes>
        <TransactionCode cc="0" name="IRRELEVANT">Can&#x2019;t determine transaction type</TransactionCode>
    </TransactionCodes>
    <Networks>
        <Network cc="MasterCard"/>
    </Networks>
    <EntryModeCodes>
        <EntryModeCode cc="0" name="IRRELEVANT">This covers all entry mode types</EntryModeCode>
    </EntryModeCodes>
    <LoadTypes>
        <LoadTypes cc="0">Unknown</LoadTypes>
    </LoadTypes>
    <LoadSources>
        <LoadSource cc="0">Partner system does not know the source of the funds</LoadSource>
    </LoadSources>
    <ExternalPaymentTransactionTypes>
        <ExternalPaymentTransactionType cc="1">Unload</ExternalPaymentTransactionType>
    </ExternalPaymentTransactionTypes>
    <ExternalPaymentTransactionStatusCodes>
        <ExternalPaymentTransactionStatusCode cc="0">Success</ExternalPaymentTransactionStatusCode>
    </ExternalPaymentTransactionStatusCodes>
    <AccountStatusCodes>
        <AccountStatusCode cc="A">Active</AccountStatusCode>
    </AccountStatusCodes>
    <CardStatusCodes>
        <CardStatusCode cc="A">Activated</CardStatusCode>
    </CardStatusCodes>
    <RiskActions>
        <RiskAction cc="Mark transaction as suspicious"/>
    </RiskActions>
    <FunctionCodes>
        <FunctionCode cc="200">First Presentment</FunctionCode>
    </FunctionCodes>
    <SecurityChecks>
        <SecurityCheck cc="Card expiration date present"/>
    </SecurityChecks>
</Lookups>
```

### File name structure

| Part           | M | Description                                                                |
|----------------|---|----------------------------------------------------------------------------|
| lookups        | M | Report type.                                                               |
| 1              | M | Client ID.                                                                 |
| 20             | M | Issuer ID.                                                                 |
| 123456         | M | Issuer identification number.                                              |
| 20200327       | M | Date (format `Ymd`).                                                       |
| 085412         | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271 | C | Unique ID. Available if report generates more than once per day.           |
| regen          | C | Is regenerated (available only if report was regenerated).                 |
| 1              | C | Regeneration count.                                                        |
| xml            | M | File extension.                                                            |

```
lookups-1-20-12345-20200327.xml
```

## Settlement
### Data elements

| Field name                     | M   | Type | Length  | Description                                                                                                                                             |
|--------------------------------|-----|------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| FileDate                       | M   | NS   | 10      | Report generation date                                                                                                                                  |
| WorkDate                       | M   | NS   | 19      | Transaction date imported                                                                                                                               |
| IssuerIdentificationNumber     | M   | N    | 20      | Issuer Institution ID at scheme (ICA for MC, IIN for Visa, etc.)                                                                                        |
| ProgramName                    | M   | ANS  | [1-255] | Program name associated with card or account                                                                                                            |
| ProgramId                      | M   | N    | [1-20]  | Program associated with card or account                                                                                                                 |
| ProductName                    | M   | ANS  | [1-50]  | Product name associated with card                                                                                                                       |
| ProductId                      | M   | N    | [1-20]  | Product associated with card                                                                                                                            |
| SubProductId                   | C   | N    | [1-20]  | Sub-product name associated with card                                                                                                                   |
| HolderId                       | M   | N    | [1-20]  |                                                                                                                                                         |
| AccountId                      | M   | N    | [1-20]  |                                                                                                                                                         |
| BankAccountId                  | C   | N    | [1-20]  | Filled if payment transaction is external                                                                                                               |
| CardNumber                     | C   | N    | [16-19] | Card primary account number                                                                                                                             |
| CardNumberId                   | C   | N    | [1-20]  | Card ID                                                                                                                                                 |
| CardRequestId                  | C   | N    | [1-20]  | Card number ID                                                                                                                                          |
| MtiCode                        | M   | AN   | 4       | Message type identifier from scheme                                                                                                                     |
| MessageReasonCode              | C   | N    | 4       | Mastercard message reason code. DE 25 from clearing file.                                                                                               |
| Bin                            | C   | N    | [6-12]  |                                                                                                                                                         |
| TransactionCode                | M   | N    | [1-11]  | [Transaction code](#appendix--enum--transaction-code)                                                                                                   |
| TransactionCodeDescription     | M   | ANS  | 100     | Transaction code name                                                                                                                                   |
| AuthorizationCode              | M   | AN   | 6       | [Authorization Code](#appendix--enum--authorization-code)                                                                                               |
| TransactionDateTime            | M   | NS   | 19      | Transaction local date time                                                                                                                             |
| TransactionAmount              | M   | NS   | [1-20]  |                                                                                                                                                         |
| TransactionCurrencyCode        | M   | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| TransactionCurrencyAlpha       | M   | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| TransLink                      | M   | ANS  | [1-100] |                                                                                                                                                         |
| TraceId                        | C   | ANS  | [1-16]  | Provided when received by Scheme.                                                                                                                       |
| TransactionCodeIdentifier      | C   | N    | [1-2]   | For VISA only.                                                                                                                                          |
| HolderAmount                   | M   | NS   | [1-20]  |                                                                                                                                                         |
| HolderCurrencyCode             | M   | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| HolderCurrencyAlpha            | M   | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| FxRate                         | M   | NS   | 16;9    | Holder conversion rate                                                                                                                                  |
| FeeGroupId                     | C   | N    | [1-20]  |                                                                                                                                                         |
| FeeGroupName                   | C   | ANS  | [1-50]  |                                                                                                                                                         |
| FxFeeName                      | C   | ANS  | [1-37]  |                                                                                                                                                         |
| FxFeeCode                      | C   | AN   | [1-8]   |                                                                                                                                                         |
| FxFeeAmount                    | C   | NS   | [1-20]  |                                                                                                                                                         |
| FxFeeCurrency                  | C   | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| FxFeeReason                    | C   | N    | 4       |                                                                                                                                                         |
| F0FeeName                      | C   | ANS  | [1-37]  |                                                                                                                                                         |
| F0FeeCode                      | C   | AN   | [1-8]   |                                                                                                                                                         |
| F0FeeAmount                    | C   | NS   | [1-20]  |                                                                                                                                                         |
| F0FeeCurrency                  | C   | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| F0FeeReason                    | C   | N    | 4       |                                                                                                                                                         |
| BillRateAmount                 | C   | NS   | 16;9    |                                                                                                                                                         |
| BillingDate                    | C   | NS   | 19      | Transaction date imported                                                                                                                               |
| BillingAmount                  | C   | NS   | [1-20]  |                                                                                                                                                         |
| BillingCurrencyCode            | C   | N    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| BillingCurrencyAlpha           | C   | A    | 3       | [`Currency`](#appendix--enum--currency)                                                                                                                 |
| ReconciliationDate             | C   | NS   | 10      |                                                                                                                                                         |
| SettlementDate                 | C   | NS   | 10      |                                                                                                                                                         |
| SettlementAmount               | C   | NS   | [1-20]  | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                |
| SettlementCurrencyCode         | C   | N    | 3       | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program. |
| SettlementCurrencyAlpha        | C   | A    | 3       | Value responded from scheme, otherwise value seleted in proccessing if settlement [`currency`](#appendix--enum--currency) selection enabled in program. |
| SettlementConversionRate       | C   | NS   | 16;9    | Value responded from scheme, otherwise value seleted in proccessing if settlement currency selection enabled in program.                                |
| SettlementFlag                 | C   | N    | 1       | This field will contain a value that indicates the service used for settlement. [Settlement flag](#appendix--enum--settlement-flag)                     |
| MerchantNumber                 | M   | AN   | [1-15]  |                                                                                                                                                         |
| Merchant                       | C   | ANS  | [1-100] |                                                                                                                                                         |
| MerchantName                   | C   | ANS  | [1-100] |                                                                                                                                                         |
| MerchantAddress                | C   | ANS  | [1-100] |                                                                                                                                                         |
| MerchantCity                   | C   | ANS  | [1-100] |                                                                                                                                                         |
| MerchantPostcode               | C   | ANS  | [1-100] |                                                                                                                                                         |
| MerchantCountryCodeAlpha       | M   | A    | 3       |                                                                                                                                                         |
| MerchantCountryName            | M   | AN   | 255     |                                                                                                                                                         |
| Mcc                            | M   | N    | 4       | Merchant Category Code                                                                                                                                  |
| CardPresent                    | M   | A    | [1-16]  | Possible values: Card present, Card not present.                                                                                                        |
| CardInputMode                  | M   | N    | 1       | [Card input mode](#appendix--enum--card-input-mode-mastercard-only)                                                                                     |
| CardholderAuthenticationMethod | M   | N    | 1       | [Cardholder authentication method](#appendix--enum--cardholder-authentication-method-mastercard-only)                                                   |
| PosDataDe22                    | M   | N    | 22      |                                                                                                                                                         |
| PosDataDe61                    | C   | ANS  | 61      |                                                                                                                                                         |
| AcquirerId                     | M   | AN   | [1-11]  |                                                                                                                                                         |
| AcquirerReferenceNumber        | M   | AN   | 23      |                                                                                                                                                         |
| TransactionId                  | M   | N    | [1-20]  |                                                                                                                                                         |
| InterchangeFeeAmount           | C   | NS   | [1-20]  |                                                                                                                                                         |
| InterchangeFeeCurrency         | C   | N    | 3       |                                                                                                                                                         |
| InterchangeFeeAmountRounded    | C | NS   | [1-20]  |                                                                                                                                                           |
| InterchangeFeeDirection        | M   | A    | [1-6]   | [Action type](#appendix--enum--action-type)                                                                                                             |
| InterchangeRateDesignator      | C   | N    | 2       |                                                                                                                                                         |
| CycleNumber                    | M   | N    | 4       | Cycle Number from clearing file                                                                                                                         |
| TransactionClass               | M   | AS   | [1-30]  | [Region type](#appendix--enum--region-type)                                                                                                             |
| Action                         | M   | A    | [1-6]   | [Action type](#appendix--enum--action-type)                                                                                                             |
| Network                        | M   | ANS  | [1-255] | [Network](#appendix--enum--network)                                                                                                                     |
| TransactionDescription         | C   | ANS  | [0-255] |                                                                                                                                                         |
| EntryModeCode                  | M   | N    | [1-11]  | [Entry mode code](#appendix--enum--entry-mode-code)                                                                                                     |
| EntryModeCodeDescription       | M   | ANS  | 100     | Entry mode code name                                                                                                                                    |
| ECIIndicator                   | M   | ANS  | 1       | MasterCard - pds0052 Visa - tcr1 Mail/Phone/Electronic Commerce and Payment Indicator                                                                   |
| Suspicious                     | M   | N    | 1       | Possible values: Yes - is suspicious, No - not suspicious.                                                                                              |
| RiskRuleCodes                  | O   | ANS  | 1-65535 | Risk rules codes which were triggered during card authorization. Codes separated by a semicolon.                                                        |
| RiskActions / RiskAction       | O   | LIST | \-      | [Risk rule action](#appendix--enum--risk-rule-action)                                                                                                   |
| FunctionCode                   | C   | N    | [1-3]   | [Function code (Mastercard)](#appendix--enum--function-code) / [Function Code (Visa)](#appendix--enum--visa-function-code)                              |
| SecurityChecks / SecurityCheck | O   | LIST | \-      | [Security check](#appendix--enum--security-check)                                                                                                       |
| LoadType                       | C   | N    | [1-11]  | Filled if payment transaction is internal. Load type value in line with API spec values supported. [Load type](#appendix--enum--load-type)              |
| LoadSource                     | C   | N    | [1-11]  | Filled if payment transaction is internal. Load source value in line with the API spec values supported. [Load source](#appendix--enum--load-source)    |
| TransactionCodeQualifier       | C   | N    | 1       | Visa specific codes [Visa Transaction Code Qualifier](#appendix--enum--visa-transaction-code-qualifier)                                                 |
| BusinessFormatCode             | C   | ANS  | 0-20    | Comma separated values for Visa only [Visa Business Format Code](#appendix--enum--visa-business-format-code)                                            |
| CardType                       | M   | N    | 1       | [Card Types](#appendix--enum--card-type)                                                                                                                |
| ParentTransactionId            | C   | N    | [1-20]  | Parent transaction ID. Provided if this transaction can be related with the previous transaction.                                                       |
| DisputeId                      | C   | N    | [1-20]  | Dispute ID. Provided if the dispute was created.                                                                                                        |
| ExternalDisputeId              | O   | N    | [1-20]  | External system dispute ID if it was provided on dispute create.                                                                                        |
| ActualAuthorizationId          | O   | N    | [1-20]  |                                                                                                                                                         |
| FirstAuthorizationDate         | O   | NS   | 19      | Converted from `DE7` value. Format: Y-m-d H:i:s.                                                                                                        |
| ReferenceNumber                | O   | AN   | [1-255] |                                                                                                                                                         |

```xml
<?xml version="1.0" encoding="utf-8"?>
<SettlementsTransactions>
    <SettlementTransaction>
        <FileDate>2019-07-30</FileDate>
        <WorkDate>2019-07-29</WorkDate>
        <IssuerIdentificationNumber>12345</IssuerIdentificationNumber>
        <ProgramName>test program</ProgramName>
        <ProgramId>1</ProgramId>
        <ProductName>Test physical product</ProductName>
        <ProductId>1</ProductId>
        <SubProductId>1</SubProductId>
        <HolderId>1</HolderId>
        <AccountId>1</AccountId>
        <BankAccountId/>
        <CardNumber>5000********0000</CardNumber>
        <CardNumberId>123456</CardNumberId>
        <CardRequestId>1</CardRequestId>
        <MtiCode>1240</MtiCode>
        <MessageReasonCode/>
        <Bin>500000</Bin>
        <TransactionCode>2</TransactionCode>
        <TransactionCodeDescription>POS</TransactionCodeDescription>
        <AuthorizationCode>123456</AuthorizationCode>
        <TransactionDateTime>2019-07-30 13:39:22</TransactionDateTime>
        <TransactionAmount>-10.00</TransactionAmount>
        <TransactionCurrencyCode>826</TransactionCurrencyCode>
        <TransactionCurrencyAlpha>GBP</TransactionCurrencyAlpha>
        <TransLink>697681000000MDS8D4A5S382683200612123456</TransLink>
        <TraceId>DMCAB12340101  </TraceId>
        <TransactionCodeIdentifier/>
        <HolderAmount>-10.00</HolderAmount>
        <HolderCurrencyCode>826</HolderCurrencyCode>
        <HolderCurrencyAlpha>GBP</HolderCurrencyAlpha>
        <FxRate>1.247456</FxRate>
        <FeeGroupId>1</FeeGroupId>
        <FeeGroupName>Test fee group</FeeGroupName>
        <FxFeeName>2</FxFeeName>
        <FxFeeCode>F0000001</FxFeeCode>
        <FxFeeAmount>-1.60</FxFeeAmount>
        <FxFeeCurrency>826</FxFeeCurrency>
        <FxFeeReason/>
        <F0FeeName/>
        <F0FeeCode/>
        <F0FeeAmount/>
        <F0FeeCurrency/>
        <F0FeeReason/>
        <BillRateAmount>1</BillRateAmount>
        <BillingDate>2019-07-30 13:39:22</BillingDate>
        <BillingAmount>-10.00</BillingAmount>
        <BillingCurrencyCode>840</BillingCurrencyCode>
        <BillingCurrencyAlpha>USD</BillingCurrencyAlpha>
        <ReconciliationDate>2019-08-02</ReconciliationDate>
        <SettlementDate>2019-08-02</SettlementDate>
        <SettlementAmount>-10.00</SettlementAmount>
        <SettlementCurrencyCode>840</SettlementCurrencyCode>
        <SettlementCurrencyAlpha>USD</SettlementCurrencyAlpha>
        <SettlementConversionRate>1.0</SettlementConversionRate>
        <SettlementFlag>0</SettlementFlag>
        <MerchantNumber>111111111111111</MerchantNumber>
        <Merchant>MEMBER TEST</MerchantName>
        <MerchantName/>
        <MerchantAddress/>
        <MerchantCity/>
        <MerchantPostcode/>
        <MerchantCountryCodeAlpha>USA</MerchantCountryCodeAlpha>
        <MerchantCountryName>United States</MerchantCountryName>
        <Mcc>6011</Mcc>
        <CardPresent>Card present</CardPresent>
        <CardInputMode/>
        <CardholderAuthenticationMethod/>
        <PosDataDe22>021</PosDataDe22>
        <PosDataDe61>00000000000008403129-1234</PosDataDe61>
        <AcquirerId>999901</AcquirerId>
        <AcquirerReferenceNumber/>
        <TransactionId>15644832004629</TransactionId>
        <InterchangeFeeAmount>0.000000</InterchangeFeeAmount>
        <InterchangeFeeAmountRounded>2.34</InterchangeFeeAmountRounded>
        <InterchangeFeeCurrency>840</InterchangeFeeCurrency>
        <InterchangeFeeDirection>Debit</InterchangeFeeDirection>
        <InterchangeRateDesignator>75</InterchangeRateDesignator>
        <CycleNumber/>
        <CycleFileId/>
        <TransactionClass>International</TransactionClass>
        <Action>Debit</Action>
        <Network>MasterCard</Network>
        <TransactionDescription/>
        <EntryModeCode>1</EntryModeCode>
        <EntryModeCodeDescription>MAGNETIC-STRIPE</EntryModeCodeDescription>
        <ECIIndicator/>
        <Suspicious>No</Suspicious>
        <RiskRuleCodes/>
        <RiskActions>
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
        <LoadType/>
        <LoadSource/>
        <TransactionCodeQualifier>1</TransactionCodeQualifier>
        <BusinessFormatCode>CR,SD</BusinessFormatCode>
        <CardType>1</CardType>
        <ParentTransactionId/>
        <DisputeId/>
        <ExternalDisputeId/>
        <ActualAuthorizationId>80001</ActualAuthorizationId>
        <FirstAuthorizationDate>2021-11-15 12:08:14</FirstAuthorizationDate>
        <ReferenceNumber>Refnr123456</ReferenceNumber>
    </SettlementTransaction>
</SettlementsTransactions>
```

### File name structure

| Part                     | M | Description                                                                |
|--------------------------|---|----------------------------------------------------------------------------|
| settlements-transactions | M | Report type.                                                               |
| 1                        | M | Client ID.                                                                 |
| 20                       | M | Issuer ID.                                                                 |
| 123456                   | M | Issuer identification number.                                              |
| 20200327                 | M | Date (format `Ymd`).                                                       |
| 085412                   | C | Time (format `His`). Available if report generates more than once per day. |
| 16122551409271           | C | Unique ID. Available if report generates more than once per day.           |
| regen                    | C | Is regenerated (available only if report was regenerated).                 |
| 1                        | C | Regeneration count.                                                        |
| xml                      | M | File extension.                                                            |

```
settlements-transactions-1-20-12345-20200327.xml
```

## Currency exchange
### Data elements

| Parameter                        | M | Type | Length  | Description                                                              |
|----------------------------------|---|------|---------|--------------------------------------------------------------------------|
| ID                               | M | N    | [1-20]  | Exchange batch ID.                                                       |
| ExternalTransactionId            | M | ANS  | [1-36]  | External source transaction ID.                                          |
| ExternalShortReference           | M | ANS  | [1-36]  | External source transaction short reference.                             |
| CurrencyExchangeSourceId         | M | N    | [1-20]  | [`Currency exchange source`](#appendix--enum--currency-exchange-source). |
| CurrencyCodePair                 | M | A    | 6       |                                                                          |
| FixedSide                        | M | A    | 10      | "buy" or "sell".                                                         |
| BuyCurrencyIson                  | M | N    | 3       | ISO 3 digit numeric value for the currency.                              |
| SellCurrencyIson                 | M | N    | 3       | ISO 3 digit numeric value for the currency.                              |
| BuyAmount                        | O | NS   | [1-20]  |                                                                          |
| SellAmount                       | O | NS   | [1-20]  |                                                                          |
| AppliedConversionRate            | M | NS   | 16;9    |                                                                          |
| DateCreated                      | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| DateSettled                      | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| DateConversion                   | M | NS   | 19      | Format: Y-m-d H:i:s.                                                     |
| Items / Item / AuthorizeId       | C | N    | [1-20]  | Mandatory if exchange was applied for authorization.                     |
| Items / Item / ActualAuthorizeId | C | N    | [1-20]  | Mandatory if exchange was applied for authorization.                     |
| Items / Item / TransactionId     | C | N    | [1-20]  | Mandatory if exchange was applied for settlement.                   |
| Items / Item / ClearingFileId    | C | N    | [1-20]  | Mandatory if exchange was applied for settlement.                    |
| Items / Item / ProgramId         | M | N    | [1-20]  |                                                                          |
| Items / Item / ConversionRate    | M | NS   | 1-16    |                                                                          |
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
| 16339531884690     | M | Issuer ID.                                                 |
| 19781              | M | Issuer identification number.                              |
| 20211109           | M | Date (format `Ymd` or `Ymd-His`, depends on report config).                                       |
| regen              | C | Is regenerated (available only if report was regenerated). |
| 1                  | C | Regeneration count.                                        |
| xml                | M | File extension.                                            |

```
currency-exchanges-1-16339531884690-19781-20211109.xml
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
| CurrencyIson                                                   | M | N    | 3       | [`Currency`](#appendix--enum--currency) ISO 3 digit numeric value.              |
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
| BankAccounts / BankAccount / BankAccountStatus                 | C | AN   | 1       | [`Bank account status`](#appendix--enum--bank-account-status).              |
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

| Part               | M | Description                                                 |
|--------------------|---|-------------------------------------------------------------|
| accounts-snapshots | M | Report type.                                                |
| 1                  | M | Client ID.                                                  |
| 20                 | M | Issuer ID.                                                  |
| 20211110           | M | Date (format `Ymd` or `Ymd-His`, depends on report config). |
| xml                | M | File extension.                                             |

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

| Version | Date                 | Updates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.4.37  | May 30, 2022         | <!-- dme --> Added a new `External payment transaction type` type `Outbound cancelation`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.4.36  | May 27, 2022         | <!-- dme --> Added new external payment transaction status codes `Should not pay` and `Settled through suspense account`.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.4.35  | May 12, 2022         | <!-- dme --> Added a new external payment transaction status code `Required data is missing`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.4.34  | May 2, 2022          | <!-- dme --> Added new fields `ActualAuthorizationId` and `FirstAuthorizationDate` to `Settlement transaction` report.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.33  | April 20, 2022       | <!-- ksa --> Added `InterchangeFeeAmountRounded` field to `Settlement transaction` report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.4.33  | April 14, 2022       | <!-- dme --> Added new fields `ParentTransactionId`, `DisputeId`, and `ExternalDisputeId` to `Account activity` and `Settlement transaction` reports.                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.4.32  | March 15, 2022       | <!-- mak --> Added `InternalReasonCode` field to `Fee collection` report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.4.31  | March 01, 2022       | <!-- fba --> Added `TransactionCodeQualifier`, `BusinessFormatCode`, and `CardType` fields into the `Settlement report` as well as modified the `FunctionCode` length and description.                                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.30  | February 8, 2022     | <!-- ksa --> Added `TransLink` to `Currency exchange` report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.4.29  | January 27, 2022     | <!-- mak --> Added fields `EpmTransactionStatus`, `EpmTransactionReasonDescription`, `EpmTransactionBankProviderReasonCode` in `Account activity` report.                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1.4.28  | January 20, 2022     | <!-- dme --> Updated `Transaction code` list. Added new records: `Dispute credit adjustment` and `Dispute debit adjustment`.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.4.27  | January 3, 2022      | <!-- fba --> Added currency table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.4.26  | November 22, 2021    | <!-- dme --> Added a new report `Account snapshot`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1.4.25  | October 8th, 2021    | <!-- dme --> Updated `Transaction code` list. Added new records: `P2P debit funds transfer` and `P2P credit funds transfer`.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.4.24  | September 9th, 2021  | <!-- sas --> Added field `FeeID` in `Fee collection` reports.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.4.23  | August 16th, 2021    | <!-- dme --> Removed "Message reason code" `4863`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.4.22  | August 3th, 2021     | <!-- mak --> Added field `SettlementFlag` in `Settlement` reports.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 1.4.21  | July 31th, 2021      | <!-- dme --> Added a new field `BalanceAdjustmentType` in `Account activity` report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1.4.20  | June 28th, 2021      | <!-- vr --> Added new external payment transaction status code "Hold by risk processor".                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.4.19  | June 11th, 2021      | <!-- mak --> Added field `InterchangeRateDesignator` in `Settlement` reports.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1.4.18  | May 20th, 2021       | <!-- mla --> Added field `CardRequestId` in `Fee collection`, `Settlement`, `Account activity`, `Authorize`, `Card` ,`Card snapshot` reports                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.4.17  | April 27th, 2021     | <!-- lis --> Added new fields `CardStatusChangeSource`, `CardStatusChangeReasonCode`, `CardStatusChangeNote`, `CardStatusChangeOriginatorId`, `AccountStatusDate`, `AccountStatusChangeSource`, `AccountStatusChangeReasonCode`, `AccountStatusChangeNote`, `AccountStatusChangeOriginatorId` to `Card` and `Card snapshot` reports                                                                                                                                                                                                                                  |
| 1.4.16  | May 3th, 2021        | <!-- dme --> Updated `Transaction code` list. Added new records: `74`, `75` and `76`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.4.15  | April 20th, 2021     | <!-- vr --> Added new external payment transaction status code "Rejected by risk processor".                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.4.14  | April 15, 2021       | <!-- eb --> Added a new transaction types "P2P credit cash deposit", "P2P debit cash deposit", "P2P credit merchant payment" and "P2P debit merchant payment".                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.4.13  | April 2nd, 2021      | <!-- mka --> Added `Signature` to security check bitmap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 1.4.12  | March 5th, 2021      | <!-- dme --> Added new fields to `Account activity` report: `TransLink`, `TraceId`, `TransactionCodeIdentifier`, `HolderAmount`, `HolderCurrencyCode` and `HolderCurrencyAlpha`. <br> Added new field to `Authorize` report: `TransLink`. <br> Added new fields to `Fee collection` report: `TransactionCurrencyAlpha`, `ReconciliationCurrencyAlpha`, `TransLink` and `CycleFileId`. <br> Added new fields to `Settlement transaction` report: `TransLink`, `TraceId`, `TransactionCodeIdentifier`, `HolderAmount`, `HolderCurrencyCode` and `HolderCurrencyAlpha`. |
| 1.4.11  | February 20th, 2021  | <!-- mla --> Added new load sources "Balance adjustment load from GUI", "Balance adjustment load from PM API" and "Balance adjustment load by system"                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1.4.10  | February 17th, 2021  | <!-- dme --> Added new external payment transaction status codes: "External payment mandate status validation failed" and "Risk check failed".                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.4.9   | February 9th, 2021   | <!-- dme --> Updated `BankAccountNumber` length in `Account activity`, `Card` and `Card snapshot` reports.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 1.4.8   | February 3th, 2021   | <!-- dme --> Updated all reports file names structure. Added conditional `time` and `unique id` parts.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.7   | January 21th, 2021   | <!-- dme --> Updated `Account activity` report. Added new fields: `Reference`, `TransactionIdentifier` and `EndToEndIdentifier`.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.4.6   | January 14th, 2021   | <!-- mka --> Added fields: 'SettlementAmount', 'SettlementCurrencyCode', 'SettlementCurrencyAlpha', 'SettlementConversionRate' to "Account activity" report.                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1.4.5   | December 29th, 2020  | <!-- mka --> Added fields: 'SettlementAmount', 'SettlementCurrencyCode', 'SettlementCurrencyAlpha', 'SettlementConversionRate' to "Authorize" and "Settlement" reports.                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.4.4   | December 7th, 2020   | <!-- dme --> Updated `External payment transaction type` list. Updated ID `3`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1.4.3   | October 19th, 2020   | <!-- dme --> Updated `External payment transaction type` list. Updated ID `1` and `2`, added new records: `7`, `8`, `9` and `10`.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.4.2   | October 18th, 2020   | <!-- eb --> Added "Custom fee" transaction type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 1.4.1   | September 18th, 2020 | <!-- dme --> Updated `Transaction code` list. Updated ID `65`, added new records: `66`, `67` and `68`.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1.4.0   | August 5th, 2020     | <!-- dme --> Added a new report: "Card snapshot".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.3.0   | July 24th, 2020      | <!-- dme --> Added new fields to the "Fee collection" report: 'ProgramName', 'ProgramId', 'ProductName', 'ProductId', 'SubProductId', 'HolderId', 'AccountId'.<br><br>'MccPadding' value replaced with the new 'CumulativePaddingAmount'.<br><br>New Mastercard fields added to the "Settlement" report: 'CardInputMode' and 'CardholderAuthenticationMethod'.                                                                                                                                                                                                       |
| 1.2.0   | April 27th, 2020     | <!-- dme --> Added a new 'Issuer identification Number' field for the reports.<br><br>3D Secure element renamed to ‘ThreeDomainSecure’.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1.1.1   | March 26th, 2020     | <!-- dme --> Clarified descriptions of the  "Fees and collections " report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1.1.0   | March 13th, 2020     | <!-- dme --> Added a reference to Chargeback transactions.<br><br>Added a new report: "Fees and collections" to show scheme fee data.                                                                                                                                                                                                                                                                                                                                                                                                                                |

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

### Action type

| Name            | Description |
|-----------------|-------------|
| Credit          |             |
| Debit           |             |
| Balance inquiry |             |
| Unknown         |             |

### Authorization code

| Code | Description        |
|------|--------------------|
| AN   | Normal authorize   |
| AP   | Pre authorize      |
| AF   | Final authorize    |
| AI   | Incremental        |
| AIM  | Instalment         |
| APC  | Preferred customer |
| AR   | Recurring          |
| ADC  | Delayed charges    |
| ANS  | No show            |
| AD   | Authorize advice   |
| ARF  | Refund             |
| R0   | Reversal 400       |
| R2   | Reversal 420       |
| AFT  | Account Funding    |

### Card event

| ID | Name                        |
|----|-----------------------------|
| 1  | New Card                    |
| 2  | Renewed Card                |
| 3  | Replacement Card            |
| 4  | Card Status Change          |
| 5  | Holder info update          |
| 6  | Account/Bank address change |
| 7  | Balance update              |
| 8  | Card entity update          |

### Card input mode (MasterCard only)

| ID  | Description                                                                                                                                         |
|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 0   | PAN entry mode unknown                                                                                                                              |
| 1   | PAN manual entry; no terminal used                                                                                                                  |
| 2   | PAN auto-entry via magnetic strip: track data is not required within transaction                                                                    |
| 6   | PAN manual entry using a terminal, or through voice transaction after chip card read error or chip fallback transaction failure                     |
| 7   | Credential on File (effective June 12, 2018)                                                                                                        |
| A   | PAN auto-entry via contactless magnetic stripe: track data provided unaltered within transaction                                                    |
| B   | PAN auto-entry via magnetic stripe: track data provided unaltered within transaction (magnetic stripe entry may also be chip fallback transaction). |
| C   | PAN auto-entry via chip (online authorized transaction)                                                                                             |
| F   | PAN auto-entry via chip (offline chip-approved transaction)                                                                                         |
| M   | PAN auto-entry via contactless M/Chip                                                                                                               |
| R   | PAN entry via electronic commerce containing Digital Secure Remote Payment (DSRP) cryptogram within DE 55 (Integrated Circuit Card [ICC])           |
| S   | PAN entry via electronic commerce                                                                                                                   |
| T   | PAN auto-entry via server (issuer, acquirer, or third party vendor system)                                                                          |

### Settlement flag

| Value | Description                                                                                                                                         |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 0     | International settlement service                                                                                                                    |
| 3     | Clearing-only (valid only for countries with defined service)                                                                                       |
| 8     | National Net settlement service (valid only for countries with defined service)                                                                     |
| 9     | BASE II selects the appropriate settlement service based on routing and country-defined default                                                     |

### Card status code

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

### Cardholder authentication method (MasterCard only)

| ID | Description                                                   |
|----|---------------------------------------------------------------|
| 0  | Not authenticated                                             |
| 1  | PIN                                                           |
| 2  | Electronic signature analysis                                 |
| 5  | Manual signature verification                                 |
| 6  | Other manual verification (such as a driver’s license number) |
| 9  | Unknown; data unavailable                                     |
| S  | Other systematic verification                                 |

### Entry mode code

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

### External payment transaction status code

| Name | Description                                       |
|------|---------------------------------------------------|
| 0    | Success                                           |
| 1    | Unknown                                           |
| 2    | Balance validation failed                         |
| 3    | Card limit validation failed                      |
| 4    | Account limit validation failed                   |
| 5    | Holder limit validation failed                    |
| 6    | External server validation failed                 |
| 7    | Unable to deliver transaction to external service |
| 8    | External payment address status validation failed |
| 9    | Account status validation failed                  |
| 10   | External payment mandate status validation failed |
| 11   | Risk check failed                                 |
| 12   | Rejected by risk processor                        |
| 13   | Hold by risk processor                            |
| 14   | Required data is missing                          |
| 15   | Should not pay                                    |
| 16   | Settled through suspense account                  |

### External payment transaction type

| ID  | Description          |
|-----|----------------------|
| 1   | Outbound             |
| 2   | Inbound              |
| 3   | Outbound return      |
| 4   | Reverse              |
| 5   | Direct debit         |
| 6   | Direct credit        |
| 7   | Inbound debit        |
| 8   | Inbound return       |
| 9   | Direct debit return  |
| 10  | Direct credit return |
| 11  | Outbound cancelation |

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

### Balance adjustment type

| ID | Type                   |
|----|------------------------|
| 1  | Compensation credit    |
| 2  | Debit authority        |
| 3  | Beyond 7 days debit    |
| 4  | Indemnity debit        |
| 5  | Indemnity credit       |
| 6  | Goodwill credit        |
| 7  | Return to source debit |
| 8  | System failure debit   |
| 9  | System failure credit  |
| 10 | Chargeback debit       |
| 11 | Chargeback credit      |

### External payment transaction status

| ID | Status                     | Description |
|----|----------------------------|-------------|
| 1  | Accepted                   |             |
| 2  | Rejected                   |             |
| 3  | Pending                    |             |
| 4  | Error                      |             |
| 5  | On hold                    |             |
| 6  | Operator approval required |             |
| 7  | Pending in risk            |             |
| 8  | Hold in risk               |             |

### Internal reason code

| ID | Description           |
|----|-----------------------|
| 1  | Card number not found |
| 2  | Card not found        |

### Message reason code

| Function code | Code | Description                                                                                                                                                                                                                                                                                                                                         |
|---------------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200           | 1400 | Not previously authorized                                                                                                                                                                                                                                                                                                                           |
| 200           | 1401 | Previously approved authorization - amount same                                                                                                                                                                                                                                                                                                     |
| 200           | 1402 | Previously approved authorization - amount differs                                                                                                                                                                                                                                                                                                  |
| 200           | 1403 | Previously approved authorization - partial amount, multi-clearing                                                                                                                                                                                                                                                                                  |
| 200           | 1404 | Previously approved authorization - partial amount, final clearing                                                                                                                                                                                                                                                                                  |
| 200           | 1500 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 205           | 1500 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 205           | 2001 | Invalid Acquirer Reference Data on chargeback; no documentation required or provided                                                                                                                                                                                                                                                                |
| 205           | 2002 | Non-receipt of required documentation to support chargeback within maximum time frame                                                                                                                                                                                                                                                               |
| 205           | 2003 | Correct transaction date provided                                                                                                                                                                                                                                                                                                                   |
| 205           | 2004 | Invalid Acquirer Reference Data on chargeback; documentation was received                                                                                                                                                                                                                                                                           |
| 205           | 2005 | Correct card acceptor location/description provided                                                                                                                                                                                                                                                                                                 |
| 205           | 2008 | Issuer authorized transaction                                                                                                                                                                                                                                                                                                                       |
| 205           | 2011 | Credit previously issued                                                                                                                                                                                                                                                                                                                            |
| 205           | 2700 | Chargeback remedied - see corresponding documentation                                                                                                                                                                                                                                                                                               |
| 205           | 2701 | Duplicate chargeback                                                                                                                                                                                                                                                                                                                                |
| 205           | 2702 | Past chargeback time limit                                                                                                                                                                                                                                                                                                                          |
| 205           | 2703 | Requested transaction document provided (requires hardship variance)                                                                                                                                                                                                                                                                                |
| 205           | 2704 | Invalid member message text                                                                                                                                                                                                                                                                                                                         |
| 205           | 2705 | Correct MCC provided                                                                                                                                                                                                                                                                                                                                |
| 205           | 2706 | Authorization advised suspicious                                                                                                                                                                                                                                                                                                                    |
| 205           | 2707 | No authorization request required nor attempted                                                                                                                                                                                                                                                                                                     |
| 205           | 2708 | Account was not listed on the applicable warning bulletin as of the transaction date                                                                                                                                                                                                                                                                |
| 205           | 2709 | Documentation received was illegible                                                                                                                                                                                                                                                                                                                |
| 205           | 2710 | Scanning error - unrelated documents or partial scan                                                                                                                                                                                                                                                                                                |
| 205           | 2713 | Invalid Chargeback                                                                                                                                                                                                                                                                                                                                  |
| 205           | 2870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 205           | 2871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 282           | 1500 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 282           | 2001 | Invalid Acquirer Reference Data on chargeback; no documentation required or provided                                                                                                                                                                                                                                                                |
| 282           | 2002 | Non-receipt of required documentation to support chargeback within maximum time frame                                                                                                                                                                                                                                                               |
| 282           | 2003 | Correct transaction date provided                                                                                                                                                                                                                                                                                                                   |
| 282           | 2004 | Invalid Acquirer Reference Data on chargeback; documentation was received                                                                                                                                                                                                                                                                           |
| 282           | 2005 | Correct card acceptor location/description provided                                                                                                                                                                                                                                                                                                 |
| 282           | 2008 | Issuer authorized transaction                                                                                                                                                                                                                                                                                                                       |
| 282           | 2011 | Credit previously issued                                                                                                                                                                                                                                                                                                                            |
| 282           | 2700 | Chargeback remedied - see corresponding documentation                                                                                                                                                                                                                                                                                               |
| 282           | 2701 | Duplicate chargeback                                                                                                                                                                                                                                                                                                                                |
| 282           | 2702 | Past chargeback time limit                                                                                                                                                                                                                                                                                                                          |
| 282           | 2703 | Requested transaction document provided (requires hardship variance)                                                                                                                                                                                                                                                                                |
| 282           | 2704 | Invalid member message text                                                                                                                                                                                                                                                                                                                         |
| 282           | 2705 | Correct MCC provided                                                                                                                                                                                                                                                                                                                                |
| 282           | 2706 | Authorization advised suspicious                                                                                                                                                                                                                                                                                                                    |
| 282           | 2707 | No authorization request required nor attempted                                                                                                                                                                                                                                                                                                     |
| 282           | 2708 | Account was not listed on the applicable warning bulletin as of the transaction date                                                                                                                                                                                                                                                                |
| 282           | 2709 | Documentation received was illegible                                                                                                                                                                                                                                                                                                                |
| 282           | 2710 | Scanning error - unrelated documents or partial scan                                                                                                                                                                                                                                                                                                |
| 282           | 2713 | Invalid Chargeback                                                                                                                                                                                                                                                                                                                                  |
| 282           | 2870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 282           | 2871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 450           | 4515 | Cardholder Denies Transaction Finalized                                                                                                                                                                                                                                                                                                             |
| 450           | 4804 | Multiple Processing, Duplicate (used only by the Mastercard Network for European acquired transactions)                                                                                                                                                                                                                                             |
| 450           | 4807 | Warning bulletin                                                                                                                                                                                                                                                                                                                                    |
| 450           | 4808 | Requested/required authorization not obtained                                                                                                                                                                                                                                                                                                       |
| 450           | 4809 | Transaction Not Reconciled (Used only by the Mastercard Network for European-acquired transactions)                                                                                                                                                                                                                                                 |
| 450           | 4811 | Stale Transaction (Used by the Mastercard Network only for European-acquired transactions)                                                                                                                                                                                                                                                          |
| 450           | 4812 | Account number was not on file                                                                                                                                                                                                                                                                                                                      |
| 450           | 4831 | Transaction amount differs                                                                                                                                                                                                                                                                                                                          |
| 450           | 4834 | Duplicate processing                                                                                                                                                                                                                                                                                                                                |
| 450           | 4837 | Fraudulent transaction; no cardholder authorization                                                                                                                                                                                                                                                                                                 |
| 450           | 4840 | Fraudulent processing of transaction                                                                                                                                                                                                                                                                                                                |
| 450           | 4841 | Canceled recurring transaction                                                                                                                                                                                                                                                                                                                      |
| 450           | 4842 | Late presentment                                                                                                                                                                                                                                                                                                                                    |
| 450           | 4846 | Correct transaction currency code was not provided                                                                                                                                                                                                                                                                                                  |
| 450           | 4849 | Questionable card acceptor activity                                                                                                                                                                                                                                                                                                                 |
| 450           | 4850 | Installment Transaction Dispute                                                                                                                                                                                                                                                                                                                     |
| 450           | 4853 | Cardholder Dispute Defective/Not as Described                                                                                                                                                                                                                                                                                                       |
| 450           | 4854 | Cardholder dispute not elsewhere classified (U.S. only)                                                                                                                                                                                                                                                                                             |
| 450           | 4855 | Non-receipt of merchandise                                                                                                                                                                                                                                                                                                                          |
| 450           | 4859 | Services not rendered                                                                                                                                                                                                                                                                                                                               |
| 450           | 4860 | Credit not processed                                                                                                                                                                                                                                                                                                                                |
| 450           | 4870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 450           | 4871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 450           | 4880 | Maestro Late Presentment (Applies only to non-intra-European and non-inter-European Maestro chip-read and PIN-based POS transactions; Applies only to Maestro transactions)                                                                                                                                                                         |
| 450           | 4890 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 450           | 4999 | Domestic Chargeback Dispute (Reserved for intra-European and inter-European use)                                                                                                                                                                                                                                                                    |
| 451           | 4807 | Warning bulletin                                                                                                                                                                                                                                                                                                                                    |
| 451           | 4808 | Requested/required authorization not obtained                                                                                                                                                                                                                                                                                                       |
| 451           | 4812 | Account number was not on file                                                                                                                                                                                                                                                                                                                      |
| 451           | 4831 | Transaction amount differs                                                                                                                                                                                                                                                                                                                          |
| 451           | 4834 | Duplicate processing                                                                                                                                                                                                                                                                                                                                |
| 451           | 4837 | Fraudulent transaction; no cardholder authorization                                                                                                                                                                                                                                                                                                 |
| 451           | 4840 | Fraudulent processing of transaction                                                                                                                                                                                                                                                                                                                |
| 451           | 4841 | Canceled recurring transaction                                                                                                                                                                                                                                                                                                                      |
| 451           | 4842 | Late presentment                                                                                                                                                                                                                                                                                                                                    |
| 451           | 4846 | Correct transaction currency code was not provided                                                                                                                                                                                                                                                                                                  |
| 451           | 4849 | Questionable card acceptor activity                                                                                                                                                                                                                                                                                                                 |
| 451           | 4850 | Installment Transaction Dispute                                                                                                                                                                                                                                                                                                                     |
| 451           | 4853 | Cardholder Dispute Defective/Not as Described                                                                                                                                                                                                                                                                                                       |
| 451           | 4854 | Cardholder dispute not elsewhere classified (U.S. only)                                                                                                                                                                                                                                                                                             |
| 451           | 4855 | Non-receipt of merchandise                                                                                                                                                                                                                                                                                                                          |
| 451           | 4859 | Services not rendered                                                                                                                                                                                                                                                                                                                               |
| 451           | 4860 | Credit not processed                                                                                                                                                                                                                                                                                                                                |
| 451           | 4870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 451           | 4871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 451           | 4890 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 451           | 4900 | General; invalid Second Presentment/1240; Second Presentment/1240 did not remedy First Chargeback/1442; this message reason code cannot be submitted in IPM format                                                                                                                                                                                  |
| 451           | 4901 | Required documentation not received to support prior Second Presentment/1240                                                                                                                                                                                                                                                                        |
| 451           | 4902 | Documentation received was illegible                                                                                                                                                                                                                                                                                                                |
| 451           | 4903 | Scanning error–unrelated documents or partial scan                                                                                                                                                                                                                                                                                                  |
| 451           | 4905 | Invalid Acquirer Reference Data in Second Presentment/1240; no documentation required or provided                                                                                                                                                                                                                                                   |
| 451           | 4908 | Invalid Acquirer Reference Data in Second Presentment/1240; documentation was received                                                                                                                                                                                                                                                              |
| 451           | 4999 | Domestic Chargeback Dispute Reserved for intra-European and inter-European use                                                                                                                                                                                                                                                                      |
| 453           | 4515 | Cardholder Denies Transaction Finalized                                                                                                                                                                                                                                                                                                             |
| 453           | 4804 | Multiple Processing, Duplicate (used only by the Mastercard Network for European acquired transactions)                                                                                                                                                                                                                                             |
| 453           | 4807 | Warning bulletin                                                                                                                                                                                                                                                                                                                                    |
| 453           | 4808 | Requested/required authorization not obtained                                                                                                                                                                                                                                                                                                       |
| 453           | 4809 | Transaction Not Reconciled (Used only by the Mastercard Network for European-acquired transactions)                                                                                                                                                                                                                                                 |
| 453           | 4811 | Stale Transaction (Used by the Mastercard Network only for European-acquired transactions)                                                                                                                                                                                                                                                          |
| 453           | 4812 | Account number was not on file                                                                                                                                                                                                                                                                                                                      |
| 453           | 4831 | Transaction amount differs                                                                                                                                                                                                                                                                                                                          |
| 453           | 4834 | Duplicate processing                                                                                                                                                                                                                                                                                                                                |
| 453           | 4837 | Fraudulent transaction; no cardholder authorization                                                                                                                                                                                                                                                                                                 |
| 453           | 4840 | Fraudulent processing of transaction                                                                                                                                                                                                                                                                                                                |
| 453           | 4841 | Canceled recurring transaction                                                                                                                                                                                                                                                                                                                      |
| 453           | 4842 | Late presentment                                                                                                                                                                                                                                                                                                                                    |
| 453           | 4846 | Correct transaction currency code was not provided                                                                                                                                                                                                                                                                                                  |
| 453           | 4849 | Questionable card acceptor activity                                                                                                                                                                                                                                                                                                                 |
| 453           | 4850 | Installment Transaction Dispute                                                                                                                                                                                                                                                                                                                     |
| 453           | 4853 | Cardholder Dispute Defective/Not as Described                                                                                                                                                                                                                                                                                                       |
| 453           | 4854 | Cardholder dispute not elsewhere classified (U.S. only)                                                                                                                                                                                                                                                                                             |
| 453           | 4855 | Non-receipt of merchandise                                                                                                                                                                                                                                                                                                                          |
| 453           | 4859 | Services not rendered                                                                                                                                                                                                                                                                                                                               |
| 453           | 4860 | Credit not processed                                                                                                                                                                                                                                                                                                                                |
| 453           | 4870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 453           | 4871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 453           | 4880 | Maestro Late Presentment (Applies only to non-intra-European and non-inter-European Maestro chip-read and PIN-based POS transactions; Applies only to Maestro transactions)                                                                                                                                                                         |
| 453           | 4890 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 453           | 4999 | Domestic Chargeback Dispute (Reserved for intra-European and inter-European use)                                                                                                                                                                                                                                                                    |
| 454           | 4807 | Warning bulletin                                                                                                                                                                                                                                                                                                                                    |
| 454           | 4808 | Requested/required authorization not obtained                                                                                                                                                                                                                                                                                                       |
| 454           | 4812 | Account number was not on file                                                                                                                                                                                                                                                                                                                      |
| 454           | 4831 | Transaction amount differs                                                                                                                                                                                                                                                                                                                          |
| 454           | 4834 | Duplicate processing                                                                                                                                                                                                                                                                                                                                |
| 454           | 4837 | Fraudulent transaction; no cardholder authorization                                                                                                                                                                                                                                                                                                 |
| 454           | 4840 | Fraudulent processing of transaction                                                                                                                                                                                                                                                                                                                |
| 454           | 4841 | Canceled recurring transaction                                                                                                                                                                                                                                                                                                                      |
| 454           | 4842 | Late presentment                                                                                                                                                                                                                                                                                                                                    |
| 454           | 4846 | Correct transaction currency code was not provided                                                                                                                                                                                                                                                                                                  |
| 454           | 4849 | Questionable card acceptor activity                                                                                                                                                                                                                                                                                                                 |
| 454           | 4850 | Installment Transaction Dispute                                                                                                                                                                                                                                                                                                                     |
| 454           | 4853 | Cardholder Dispute Defective/Not as Described                                                                                                                                                                                                                                                                                                       |
| 454           | 4854 | Cardholder dispute not elsewhere classified (U.S. only)                                                                                                                                                                                                                                                                                             |
| 454           | 4855 | Non-receipt of merchandise                                                                                                                                                                                                                                                                                                                          |
| 454           | 4859 | Services not rendered                                                                                                                                                                                                                                                                                                                               |
| 454           | 4860 | Credit not processed                                                                                                                                                                                                                                                                                                                                |
| 454           | 4870 | Chip Liability Shift (Valid for all intraregional transactions except those involving U.S. region and all interregional transactions between the following: AP region and MEA region; Europe region and participating countries in MEA region; Europe region and participating countries in AP region)                                              |
| 454           | 4871 | Chip/PIN Liability Shift (Reserved for intra-Europe and intra-Canada)                                                                                                                                                                                                                                                                               |
| 454           | 4890 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 454           | 4900 | General; invalid Second Presentment/1240; Second Presentment/1240 did not remedy First Chargeback/1442; this message reason code cannot be submitted in IPM format                                                                                                                                                                                  |
| 454           | 4901 | Required documentation not received to support prior Second Presentment/1240                                                                                                                                                                                                                                                                        |
| 454           | 4902 | Documentation received was illegible                                                                                                                                                                                                                                                                                                                |
| 454           | 4903 | Scanning error–unrelated documents or partial scan                                                                                                                                                                                                                                                                                                  |
| 454           | 4905 | Invalid Acquirer Reference Data in Second Presentment/1240; no documentation required or provided                                                                                                                                                                                                                                                   |
| 454           | 4908 | Invalid Acquirer Reference Data in Second Presentment/1240; documentation was received                                                                                                                                                                                                                                                              |
| 454           | 4999 | Domestic Chargeback Dispute Reserved for intra-European and inter-European use                                                                                                                                                                                                                                                                      |
| 603           | 6305 | Cardholder does not agree with amount billed                                                                                                                                                                                                                                                                                                        |
| 603           | 6321 | Cardholder does not recognize transaction (for example, does not recognize card acceptor name, city, state, or date)                                                                                                                                                                                                                                |
| 603           | 6322 | Request Transaction Certificate for a chip transaction                                                                                                                                                                                                                                                                                              |
| 603           | 6323 | Cardholder needs information for personal records (such as tax records or business expense records)                                                                                                                                                                                                                                                 |
| 603           | 6341 | Fraud investigation                                                                                                                                                                                                                                                                                                                                 |
| 603           | 6342 | Potential chargeback or compliance documentation is required                                                                                                                                                                                                                                                                                        |
| 603           | 6343 | Real-time Substantiation Audit Request                                                                                                                                                                                                                                                                                                              |
| 603           | 6390 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 605           | 6305 | Cardholder does not agree with amount billed                                                                                                                                                                                                                                                                                                        |
| 605           | 6321 | Cardholder does not recognize transaction (for example, does not recognize card acceptor name, city, state, or date)                                                                                                                                                                                                                                |
| 605           | 6322 | Request Transaction Certificate for a chip transaction                                                                                                                                                                                                                                                                                              |
| 605           | 6323 | Cardholder needs information for personal records (such as tax records or business expense records)                                                                                                                                                                                                                                                 |
| 605           | 6341 | Fraud investigation                                                                                                                                                                                                                                                                                                                                 |
| 605           | 6342 | Potential chargeback or compliance documentation is required                                                                                                                                                                                                                                                                                        |
| 605           | 6343 | Real-time Substantiation Audit Request                                                                                                                                                                                                                                                                                                              |
| 605           | 6390 | Identifies a syntax error return                                                                                                                                                                                                                                                                                                                    |
| 680           | 6861 | File Acknowledgement - The clearing system generates after processing member outbound activity                                                                                                                                                                                                                                                      |
| 680           | 6862 | File Notification - The clearing system generates to reconcile a member’s incoming activity                                                                                                                                                                                                                                                         |
| 685           | 6861 | File Acknowledgement - The clearing system generates after processing member outbound activity                                                                                                                                                                                                                                                      |
| 685           | 6862 | File Notification - The clearing system generates to reconcile a member’s incoming activity                                                                                                                                                                                                                                                         |
| 685           | 6863 | Reserved for Mastercard internal use                                                                                                                                                                                                                                                                                                                |
| 685           | 6864 | Reserved for Mastercard internal use                                                                                                                                                                                                                                                                                                                |
| 688           | 6861 | File Acknowledgement - The clearing system acknowledges settlement activity sent by the member                                                                                                                                                                                                                                                      |
| 688           | 6862 | File Notification - The clearing system notifies the member of settlement activity bound for the member                                                                                                                                                                                                                                             |
| 693           | 6801 | Official message from Mastercard to member                                                                                                                                                                                                                                                                                                          |
| 693           | 6802 | No data for this member and/or endpoint for this delivery cycle                                                                                                                                                                                                                                                                                     |
| 700           | 7600 | Lost/stolen telex/phone fee; for collection of lost/stolen report fee and phone or telex costs incurred for taking a lost or stolen card report                                                                                                                                                                                                     |
| 700           | 7601 | Recovered card award fee; for collection of reward for a card acceptor or financial institution employee when a card has been recovered                                                                                                                                                                                                             |
| 700           | 7602 | Emergency cash disbursement fee; for collection of fees associated with the handling of emergency cash disbursements to cardholders                                                                                                                                                                                                                 |
| 700           | 7603 | Compliance ruling settlement; for collection of a compliance ruling settlement amount                                                                                                                                                                                                                                                               |
| 700           | 7604 | Emergency card replacement fee; for collection of fees associated with the Emergency Card Replacement Service (ECR Service)                                                                                                                                                                                                                         |
| 700           | 7605 | Warning bulletin handling fee - issuer originated; for settlement of warning bulletin handling fees in accordance with Mastercard operating rules                                                                                                                                                                                                   |
| 700           | 7606 | Good faith acceptance settlement; for settlement of the amount of a good faith acceptance                                                                                                                                                                                                                                                           |
| 700           | 7607 | Collection letter handling fee; for settlement of the amount of a collection letter acceptance                                                                                                                                                                                                                                                      |
| 700           | 7608 | Telex authorization fee; for collection of fees associated with an international telex authorization                                                                                                                                                                                                                                                |
| 700           | 7610 | Investigation fee; for fee collection when an investigation report has been completed by an investigating member on behalf of the requesting member                                                                                                                                                                                                 |
| 700           | 7611 | Retrieval fee reversal; issuer originated; used to reverse a retrieval request fulfillment fee for documents never received or for invalid documents                                                                                                                                                                                                |
| 700           | 7612 | Retrieval handling fee; issueroriginator; used to penalize an acquirer for incorrect information verified by the retrieval request document                                                                                                                                                                                                         |
| 700           | 7613 | IIAS Nonfulfillment                                                                                                                                                                                                                                                                                                                                 |
| 700           | 7614 | Settlement of fulfillment fees other than MasterCom; for settlement of retrieval request fulfillments not processed through the MasterCom system; credit to message originator (acquirer)                                                                                                                                                           |
| 700           | 7616 | Handling fee (acquirer-originated) for second presentment of reason codes 4812 and 4835 for chip transactions where transaction certificate and DE 55 are present in the clearing message OR Handling fee (issuer-originated) for First Presentment chip transactions where DE 55 is either not present or is non-compliant in the clearing message |
| 700           | 7617 | Adjustment for promotional transactions                                                                                                                                                                                                                                                                                                             |
| 700           | 7618 | Reversal of previously reimbursed State Fuel Tax                                                                                                                                                                                                                                                                                                    |
| 700           | 7619 | Emergency card replacement center, cash advance lockbox fee                                                                                                                                                                                                                                                                                         |
| 700           | 7621 | ATM Balance Inquiry Fee                                                                                                                                                                                                                                                                                                                             |
| 700           | 7622 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending First Chargeback/1442 for one of the specified authorization related chargebacks                                                                                                                 |
| 700           | 7623 | Handling Fee for Authorization-Related Chargebacks (4807, 4808, and 4847); for acquirer use in a Fee Collection (Handling Fee) message after sending Second Presentment/1240, which indicates that the transaction was authorized                                                                                                                   |
| 700           | 7624 | Handling Fee for Authorization- Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending Arbitration Chargeback/1442 for one of the specified authorization related chargebacks                                                                                                          |
| 700           | 7625 | PIN Management Service at ATM                                                                                                                                                                                                                                                                                                                       |
| 700           | 7626 | Private Label Merchant Fee                                                                                                                                                                                                                                                                                                                          |
| 700           | 7627 | Failure to provide a merchant advice code in a Fee Collection (Handling Fee) message                                                                                                                                                                                                                                                                |
| 700           | 7628 | Reclaim surcharge (This is restricted to intra-European and European transaction-related services)                                                                                                                                                                                                                                                  |
| 700           | 7700 | Intracurrency agreement settlement; for settlement of amounts in accordance with an intracurrency agreement between transaction originator and transaction destination parties                                                                                                                                                                      |
| 700           | 7701 | Mastercard member settlement of fulfillment fees processed by MasterCom                                                                                                                                                                                                                                                                             |
| 700           | 7702 | Domestic ATM VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 700           | 7703 | Domestic POS VAT Fees/Services, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                           |
| 700           | 7704 | Bank Card Interchange fee, reverse interchange for ATM transactions                                                                                                                                                                                                                                                                                 |
| 700           | 7705 | Transactions below to threshold published, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                |
| 700           | 7706 | Difference in interchange amount between member calculated and Mastercard calculated, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                     |
| 700           | 7707 | Interest for late settlements, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                            |
| 700           | 7708 | Non fulfilled documentation penalties, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                    |
| 700           | 7709 | Penalties on code 102 miscellaneous, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                      |
| 700           | 7710 | Miscellaneous                                                                                                                                                                                                                                                                                                                                       |
| 700           | 7711 | Pre-fund amount, offset for others                                                                                                                                                                                                                                                                                                                  |
| 700           | 7712 | Bank Card Interchange fee, balance inquiry interchange, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                   |
| 700           | 7750 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7751 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7752 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7753 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7754 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7755 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7756 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7757 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7758 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7759 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7760 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7761 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7762 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7763 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7764 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7765 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7766 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7767 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7768 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7769 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7770 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7771 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7772 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7773 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7774 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7775 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7776 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7778 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7779 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7780 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7781 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7782 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7783 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7784 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7785 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7786 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7787 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7788 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7789 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7790 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7791 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7792 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7793 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7794 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7795 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7796 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7797 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7798 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7799 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 700           | 7800 | Mastercard member settlement; for collection or payment of such things as member assessments, processed through the Mastercard Consolidated Billing System (MCBS) or case dispute amount or retrieval request fulfillment fees, processed by MasterCom                                                                                              |
| 700           | 7813 | Bank Card Interchange fee, Mexico interchange fee for arbitration                                                                                                                                                                                                                                                                                   |
| 780           | 7600 | Lost/stolen telex/phone fee; for collection of lost stolen report fee and phone or telex costs incurred for taking a lost or stolen card report                                                                                                                                                                                                     |
| 780           | 7601 | Recovered card award fee; for collection of reward for a card acceptor or financial institution employee when a card has been recovered                                                                                                                                                                                                             |
| 780           | 7602 | Emergency cash disbursement fee; for collection of fees associated with the handling of emergency cash disbursements to cardholders                                                                                                                                                                                                                 |
| 780           | 7603 | Compliance ruling settlement; for collection of a compliance ruling settlement amount                                                                                                                                                                                                                                                               |
| 780           | 7604 | Emergency card replacement fee; for collection of fees associated with the Emergency Card Replacement Service (ECR Service)                                                                                                                                                                                                                         |
| 780           | 7605 | Warning bulletin handling fee-issuer-originated; for settlement of warning bulletin handling fees in accordance with Mastercard operating rules                                                                                                                                                                                                     |
| 780           | 7606 | Good faith acceptance settlement; for settlement of the amount of a good faith acceptance                                                                                                                                                                                                                                                           |
| 780           | 7607 | Collection letter handling fee; for settlement of the amount of a collection letter acceptance                                                                                                                                                                                                                                                      |
| 780           | 7608 | Telex authorization fee; for collection of fees associated with an international telex authorization                                                                                                                                                                                                                                                |
| 780           | 7610 | Investigation fee; for fee collection when an investigation report has been completed by an investigating member on behalf of the requesting member                                                                                                                                                                                                 |
| 780           | 7611 | Retrieval fee reversal; issuer originated; acquirers may return; used to reverse a retrieval request fulfillment fee for documents never received or for invalid documents                                                                                                                                                                          |
| 780           | 7612 | Retrieval handling fee; issuer originated; acquirers may return; used to penalize an acquirer for incorrect information verified by the retrieval request document                                                                                                                                                                                  |
| 780           | 7613 | IIAS Nonfulfillment                                                                                                                                                                                                                                                                                                                                 |
| 780           | 7616 | Handling fee for second presentment of reason codes 4812 and 4835 for chip transactions where transaction certificate and DE 55 are present in the clearing message. Acquireroriginated OR Handling fee for First Presentment chip transactions where DE 55 is either not present or is noncompliant in the clearing message. Issuer-originated     |
| 780           | 7617 | Adjustment for promotional transactions                                                                                                                                                                                                                                                                                                             |
| 780           | 7618 | Reversal of previously reimbursed State Fuel Tax                                                                                                                                                                                                                                                                                                    |
| 780           | 7619 | Emergency card replacement center, cash advance lockbox fee                                                                                                                                                                                                                                                                                         |
| 780           | 7621 | ATM Balance Inquiry Fee                                                                                                                                                                                                                                                                                                                             |
| 780           | 7622 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847), for issuer use in a Fee Collection (Handling Fee) message after sending First Chargeback/1442 for one of the specified authorization-related chargebacks                                                                                                                 |
| 780           | 7623 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for acquirer use in a Fee Collection (Handling Fee) message after sending Second Presentment/1240, which indicates that the transaction was authorized                                                                                                                   |
| 780           | 7624 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending Arbitration Chargeback/1442 for one of the specified authorization-related chargebacks                                                                                                           |
| 780           | 7625 | PIN Management Service at ATM                                                                                                                                                                                                                                                                                                                       |
| 780           | 7626 | Private Label Merchant Fee                                                                                                                                                                                                                                                                                                                          |
| 780           | 7627 | Failure to provide a merchant advice code in a Fee Collection (Handling Fee) message                                                                                                                                                                                                                                                                |
| 780           | 7628 | Reclaim surcharge                                                                                                                                                                                                                                                                                                                                   |
| 780           | 7700 | Intracurrency agreement settlement; for settlement of amounts in accordance with an intracurrency agreement between transaction originator and transaction destination parties                                                                                                                                                                      |
| 780           | 7701 | Mastercard member settlement of fulfillment fees processed by MasterCom                                                                                                                                                                                                                                                                             |
| 780           | 7702 | Domestic ATM VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 780           | 7703 | Domestic POS VAT Fees/Services, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                           |
| 780           | 7704 | Bank Card Interchange fee, reverse interchange for ATM transactions                                                                                                                                                                                                                                                                                 |
| 780           | 7705 | Transactions below to threshold published, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                |
| 780           | 7706 | Difference in interchange amount between member calculated and Mastercard calculated, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                     |
| 780           | 7707 | Interest for late settlements, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                            |
| 780           | 7708 | Non fulfilled documentation penalties, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                    |
| 780           | 7709 | Penalties on code 102 miscellaneous, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                      |
| 780           | 7710 | Miscellaneous                                                                                                                                                                                                                                                                                                                                       |
| 780           | 7711 | Pre-fund amount, offset for others                                                                                                                                                                                                                                                                                                                  |
| 780           | 7712 | Bank Card Interchange fee, balance inquiry interchange, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                   |
| 780           | 7750 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7751 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7752 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7753 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7754 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7755 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7756 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7757 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7758 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7759 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7760 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7761 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7762 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7763 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7764 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7765 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7766 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7767 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7768 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7769 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7770 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7771 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7772 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7773 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7774 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7775 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7776 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7778 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7779 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7780 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7781 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7782 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7783 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7784 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7785 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7786 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7787 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7788 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7789 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7790 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7791 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7792 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7793 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7794 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7795 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7796 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7797 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7798 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7799 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 780           | 7800 | Mastercard member settlement; for collection or payment of such things as member assessments, processed through the Mastercard Consolidated Billing System (MCBS) or case dispute amount or retrieval request fulfillment fees, processed by MasterCom                                                                                              |
| 780           | 7813 | Bank Card Interchange fee, Mexico interchange fee for arbitration                                                                                                                                                                                                                                                                                   |
| 781           | 7600 | Lost/stolen telex/phone fee; for collection of lost/stolen report fee and phone or telex costs incurred for taking a lost or stolen card report                                                                                                                                                                                                     |
| 781           | 7601 | Recovered card award fee; for collection of reward for a card acceptor or financial institution employee when a card has been recovered                                                                                                                                                                                                             |
| 781           | 7602 | Emergency cash disbursement fee; for collection of fees associated with the handling of emergency cash disbursements to cardholders                                                                                                                                                                                                                 |
| 781           | 7603 | Compliance ruling settlement; for collection of a compliance ruling settlement amount                                                                                                                                                                                                                                                               |
| 781           | 7604 | Emergency card replacement fee; for collection of fees associated with the Emergency Card Replacement Service (ECR Service)                                                                                                                                                                                                                         |
| 781           | 7605 | Warning bulletin handling fee - issuer originated; for settlement of warning bulletin handling fees in accordance with Mastercard operating rules                                                                                                                                                                                                   |
| 781           | 7606 | Good faith acceptance settlement; for settlement of the amount of a good faith acceptance                                                                                                                                                                                                                                                           |
| 781           | 7607 | Collection letter handling fee; for settlement of the amount of a collection letter acceptance                                                                                                                                                                                                                                                      |
| 781           | 7608 | Telex authorization fee; for collection of fees associated with an international telex authorization                                                                                                                                                                                                                                                |
| 781           | 7610 | Investigation fee; for fee collection when an investigation report has been completed by an investigating member on behalf of the requesting member                                                                                                                                                                                                 |
| 781           | 7611 | Retrieval fee reversal; issuer originated; used to reverse a retrieval request fulfillment fee for documents never received or for invalid documents                                                                                                                                                                                                |
| 781           | 7612 | Retrieval handling fee; issueroriginator; used to penalize an acquirer for incorrect information verified by the retrieval request document                                                                                                                                                                                                         |
| 781           | 7613 | IIAS Nonfulfillment                                                                                                                                                                                                                                                                                                                                 |
| 781           | 7614 | Settlement of fulfillment fees other than MasterCom; for settlement of retrieval request fulfillments not processed through the MasterCom system; credit to message originator (acquirer)                                                                                                                                                           |
| 781           | 7616 | Handling fee (acquirer-originated) for second presentment of reason codes 4812 and 4835 for chip transactions where transaction certificate and DE 55 are present in the clearing message OR Handling fee (issuer-originated) for First Presentment chip transactions where DE 55 is either not present or is non-compliant in the clearing message |
| 781           | 7617 | Adjustment for promotional transactions                                                                                                                                                                                                                                                                                                             |
| 781           | 7618 | Reversal of previously reimbursed State Fuel Tax                                                                                                                                                                                                                                                                                                    |
| 781           | 7619 | Emergency card replacement center, cash advance lockbox fee                                                                                                                                                                                                                                                                                         |
| 781           | 7621 | ATM Balance Inquiry Fee                                                                                                                                                                                                                                                                                                                             |
| 781           | 7622 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending First Chargeback/1442 for one of the specified authorization related chargebacks                                                                                                                 |
| 781           | 7623 | Handling Fee for Authorization-Related Chargebacks (4807, 4808, and 4847); for acquirer use in a Fee Collection (Handling Fee) message after sending Second Presentment/1240, which indicates that the transaction was authorized                                                                                                                   |
| 781           | 7624 | Handling Fee for Authorization- Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending Arbitration Chargeback/1442 for one of the specified authorization related chargebacks                                                                                                          |
| 781           | 7625 | PIN Management Service at ATM                                                                                                                                                                                                                                                                                                                       |
| 781           | 7626 | Private Label Merchant Fee                                                                                                                                                                                                                                                                                                                          |
| 781           | 7627 | Failure to provide a merchant advice code in a Fee Collection (Handling Fee) message                                                                                                                                                                                                                                                                |
| 781           | 7628 | Reclaim surcharge (This is restricted to intra-European and European transaction-related services)                                                                                                                                                                                                                                                  |
| 781           | 7700 | Intracurrency agreement settlement; for settlement of amounts in accordance with an intracurrency agreement between transaction originator and transaction destination parties                                                                                                                                                                      |
| 781           | 7701 | Mastercard member settlement of fulfillment fees processed by MasterCom                                                                                                                                                                                                                                                                             |
| 781           | 7702 | Domestic ATM VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 781           | 7703 | Domestic POS VAT Fees/Services, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                           |
| 781           | 7704 | Bank Card Interchange fee, reverse interchange for ATM transactions                                                                                                                                                                                                                                                                                 |
| 781           | 7705 | Transactions below to threshold published, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                |
| 781           | 7706 | Difference in interchange amount between member calculated and Mastercard calculated, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                     |
| 781           | 7707 | Interest for late settlements, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                            |
| 781           | 7708 | Non fulfilled documentation penalties, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                    |
| 781           | 7709 | Penalties on code 102 miscellaneous, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                      |
| 781           | 7710 | Miscellaneous                                                                                                                                                                                                                                                                                                                                       |
| 781           | 7711 | Pre-fund amount, offset for others                                                                                                                                                                                                                                                                                                                  |
| 781           | 7712 | Bank Card Interchange fee, balance inquiry interchange, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                   |
| 781           | 7750 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7751 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7752 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7753 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7754 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7755 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7756 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7757 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7758 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7759 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7760 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7761 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7762 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7763 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7764 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7765 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7766 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7767 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7768 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7769 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7770 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7771 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7772 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7773 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7774 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7775 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7776 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7778 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7779 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7780 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7781 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7782 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7783 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7784 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7785 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7786 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7787 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7788 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7789 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7790 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7791 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7792 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7793 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7794 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7795 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7796 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7797 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7798 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7799 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 781           | 7800 | Mastercard member settlement; for collection or payment of such things as member assessments, processed through the Mastercard Consolidated Billing System (MCBS) or case dispute amount or retrieval request fulfillment fees, processed by MasterCom                                                                                              |
| 781           | 7813 | Bank Card Interchange fee, Mexico interchange fee for arbitration                                                                                                                                                                                                                                                                                   |
| 782           | 7600 | Lost/stolen telex/phone fee; for collection of lost stolen report fee and phone or telex costs incurred for taking a lost or stolen card report                                                                                                                                                                                                     |
| 782           | 7601 | Recovered card award fee; for collection of reward for a card acceptor or financial institution employee when a card has been recovered                                                                                                                                                                                                             |
| 782           | 7602 | Emergency cash disbursement fee; for collection of fees associated with the handling of emergency cash disbursements to cardholders                                                                                                                                                                                                                 |
| 782           | 7603 | Compliance ruling settlement; for collection of a compliance ruling settlement amount                                                                                                                                                                                                                                                               |
| 782           | 7604 | Emergency card replacement fee; for collection of fees associated with the Emergency Card Replacement Service (ECR Service)                                                                                                                                                                                                                         |
| 782           | 7605 | Warning bulletin handling fee-issuer-originated; for settlement of warning bulletin handling fees in accordance with Mastercard operating rules                                                                                                                                                                                                     |
| 782           | 7606 | Good faith acceptance settlement; for settlement of the amount of a good faith acceptance                                                                                                                                                                                                                                                           |
| 782           | 7607 | Collection letter handling fee; for settlement of the amount of a collection letter acceptance                                                                                                                                                                                                                                                      |
| 782           | 7608 | Telex authorization fee; for collection of fees associated with an international telex authorization                                                                                                                                                                                                                                                |
| 782           | 7610 | Investigation fee; for fee collection when an investigation report has been completed by an investigating member on behalf of the requesting member                                                                                                                                                                                                 |
| 782           | 7611 | Retrieval fee reversal; issuer originated; acquirers may return; used to reverse a retrieval request fulfillment fee for documents never received or for invalid documents                                                                                                                                                                          |
| 782           | 7612 | Retrieval handling fee; issuer originated; acquirers may return; used to penalize an acquirer for incorrect information verified by the retrieval request document                                                                                                                                                                                  |
| 782           | 7613 | IIAS Nonfulfillment                                                                                                                                                                                                                                                                                                                                 |
| 782           | 7616 | Handling fee for second presentment of reason codes 4812 and 4835 for chip transactions where transaction certificate and DE 55 are present in the clearing message. Acquireroriginated OR Handling fee for First Presentment chip transactions where DE 55 is either not present or is noncompliant in the clearing message. Issuer-originated     |
| 782           | 7617 | Adjustment for promotional transactions                                                                                                                                                                                                                                                                                                             |
| 782           | 7618 | Reversal of previously reimbursed State Fuel Tax                                                                                                                                                                                                                                                                                                    |
| 782           | 7619 | Emergency card replacement center, cash advance lockbox fee                                                                                                                                                                                                                                                                                         |
| 782           | 7621 | ATM Balance Inquiry Fee                                                                                                                                                                                                                                                                                                                             |
| 782           | 7622 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847), for issuer use in a Fee Collection (Handling Fee) message after sending First Chargeback/1442 for one of the specified authorization-related chargebacks                                                                                                                 |
| 782           | 7623 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for acquirer use in a Fee Collection (Handling Fee) message after sending Second Presentment/1240, which indicates that the transaction was authorized                                                                                                                   |
| 782           | 7624 | Handling Fee for Authorization Related Chargebacks (4807, 4808, and 4847); for issuer use in a Fee Collection (Handling Fee) message after sending Arbitration Chargeback/1442 for one of the specified authorization-related chargebacks                                                                                                           |
| 782           | 7625 | PIN Management Service at ATM                                                                                                                                                                                                                                                                                                                       |
| 782           | 7626 | Private Label Merchant Fee                                                                                                                                                                                                                                                                                                                          |
| 782           | 7627 | Failure to provide a merchant advice code in a Fee Collection (Handling Fee) message                                                                                                                                                                                                                                                                |
| 782           | 7628 | Reclaim surcharge                                                                                                                                                                                                                                                                                                                                   |
| 782           | 7700 | Intracurrency agreement settlement; for settlement of amounts in accordance with an intracurrency agreement between transaction originator and transaction destination parties                                                                                                                                                                      |
| 782           | 7701 | Mastercard member settlement of fulfillment fees processed by MasterCom                                                                                                                                                                                                                                                                             |
| 782           | 7702 | Domestic ATM VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 782           | 7703 | Domestic POS VAT Fees/Services, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                           |
| 782           | 7704 | Bank Card Interchange fee, reverse interchange for ATM transactions                                                                                                                                                                                                                                                                                 |
| 782           | 7705 | Transactions below to threshold published, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                |
| 782           | 7706 | Difference in interchange amount between member calculated and Mastercard calculated, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                     |
| 782           | 7707 | Interest for late settlements, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                            |
| 782           | 7708 | Non fulfilled documentation penalties, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                    |
| 782           | 7709 | Penalties on code 102 miscellaneous, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                                      |
| 782           | 7710 | Miscellaneous                                                                                                                                                                                                                                                                                                                                       |
| 782           | 7711 | Pre-fund amount, offset for others                                                                                                                                                                                                                                                                                                                  |
| 782           | 7712 | Bank Card Interchange fee, balance inquiry interchange, Customer calculates VAT (Value Added Tax)                                                                                                                                                                                                                                                   |
| 782           | 7750 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7751 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7752 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7753 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7754 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7755 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7756 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7757 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7758 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7759 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7760 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7761 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7762 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7763 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7764 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7765 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7766 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7767 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7768 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7769 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7770 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7771 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7772 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7773 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7774 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7775 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7776 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7778 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7779 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7780 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7781 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7782 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7783 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7784 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7785 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7786 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7787 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7788 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7789 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7790 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7791 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7792 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7793 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7794 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7795 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7796 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7797 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7798 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7799 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 782           | 7800 | Mastercard member settlement; for collection or payment of such things as member assessments, processed through the Mastercard Consolidated Billing System (MCBS) or case dispute amount or retrieval request fulfillment fees, processed by MasterCom                                                                                              |
| 782           | 7813 | Bank Card Interchange fee, Mexico interchange fee for arbitration                                                                                                                                                                                                                                                                                   |
| 783           | 7621 | ATM Balance Inquiry Fee                                                                                                                                                                                                                                                                                                                             |
| 783           | 7625 | PIN Management Service at ATM                                                                                                                                                                                                                                                                                                                       |
| 783           | 7629 | Non-financial ATM Service fee (declined transactions)                                                                                                                                                                                                                                                                                               |
| 783           | 7702 | Domestic ATM VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 783           | 7703 | Domestic POS VAT Fees/Services                                                                                                                                                                                                                                                                                                                      |
| 783           | 7800 | Mastercard member settlement; for collection or payment of such things as member assessments, processed through the Mastercard Consolidated Billing System (MCBS) or case dispute amount or retrieval request fulfillment fees, processed by MasterCom                                                                                              |
| 783           | 7802 | Interchange compliance adjustment; for settlement of financial amounts related to interchange compliance                                                                                                                                                                                                                                            |
| 783           | 7803 | Interchange compliance adjustment reversal; for settlement of financial amounts related to the reversal of a previous interchange compliance adjustment                                                                                                                                                                                             |
| 783           | 7804 | ATM transaction settlement; for settlement of daily ATM transaction amounts                                                                                                                                                                                                                                                                         |
| 783           | 7805 | ATM intracountry switch fee settlement; for settlement of daily ATM transaction intracountry switch fees                                                                                                                                                                                                                                            |
| 783           | 7806 | ATM NICS switch fee settlement; for settlement of Single Message System NICS Switch Fees                                                                                                                                                                                                                                                            |
| 783           | 7807 | ATM intracountry first chargeback settlement; for settlement of daily ATM transaction intracountry first chargeback amounts                                                                                                                                                                                                                         |
| 783           | 7808 | Miscellaneous Override Financial Adjustment                                                                                                                                                                                                                                                                                                         |
| 783           | 7811 | Reimbursement of State Fuel Tax                                                                                                                                                                                                                                                                                                                     |
| 783           | 7812 | Collection or return of collateral for security arrangement                                                                                                                                                                                                                                                                                         |
| 783           | 7813 | Mexico IVA fees                                                                                                                                                                                                                                                                                                                                     |
| 783           | 7820 | Disaster Relief Fund                                                                                                                                                                                                                                                                                                                                |
| 783           | 7821 | MCBS Emergency Borrowing Collection                                                                                                                                                                                                                                                                                                                 |
| 783           | 7822 | Settlement Adjustment                                                                                                                                                                                                                                                                                                                               |
| 783           | 7823 | Single Message System Offline Debit Settlement                                                                                                                                                                                                                                                                                                      |
| 783           | 7824 | Collection of reward amount as agreed upon between the customers                                                                                                                                                                                                                                                                                    |
| 783           | 7825 | Argentina Finance Fee                                                                                                                                                                                                                                                                                                                               |
| 783           | 7826 | Argentina Finance Fee VAT                                                                                                                                                                                                                                                                                                                           |
| 783           | 7827 | EDP Adjustment Amount (Used only by the Mastercard Network for the EDP Service)                                                                                                                                                                                                                                                                     |
| 790           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |
| 791           | 7777 | Bilateral agreement settlement; for settlement of amounts in accordance with a bilateral agreement between transaction originator and transaction destination parties                                                                                                                                                                               |

### Network

| ID | Name             | Description                                                                   |
|----|------------------|-------------------------------------------------------------------------------|
| 1  | MasterCard       | Scheme transaction                                                            |
| 2  | Visa             | Scheme transaction                                                            |
| 3  | UnionPay         | Scheme transaction                                                            |
| 4  | External Payment | Bank transaction                                                              |
| 5  | Internal Payment | Internal load/unload through API. Example: load from e-wallet to card/account |

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

### Transaction code

| ID  | Name                                              | Operation sign | Description                                                    | MC                                                                   | Visa                                                            | UPI                                                                | API/Internal | EPM |
|-----|---------------------------------------------------|----------------|----------------------------------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------|--------------|-----|
| 0   | Unknown                                           | -              | Can’t determine transaction type.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 1   | Load                                              | Credit         | Card load via API.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    | +            |     |
| 2   | Pos                                               | Debit          | Purchase by card.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 3   | Atm                                               | Debit          | ATM withdrawal.                                                | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 4   | Unload                                            | Debit          | Card unload/withdrawal via API.                                |                                                                      |                                                                 |                                                                    | +            |     |
| 5   | Credit cheque                                     | Credit         | Credit cheque.                                                 |                                                                      |                                                                 | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 6   | Balance inquiry                                   | -              | Balance inquiry at ATM/POS.                                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 7   | Cashback                                          | Debit          | Cashback at sale point.                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 8   | Cash                                              | Debit          | Cash withdrawal.                                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 9   | Quasi cash                                        | Debit          | Quasi cash operation.                                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 10  | Credit                                            | Credit         | Original credit operation.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 11  | Credit adjustment                                 | Credit         | Credit adjustment via API.                                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 12  | Refund                                            | Credit         | Refund.                                                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 13  | Debit adjustment                                  | Debit          | Debit adjustment via API.                                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> | +            | +   |
| 14  | Pin unblock                                       | -              | PIN unblock via ATM.                                           | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 15  | Pin change                                        | -              | PIN Change at ATM.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 16  | Reserved                                          |                |                                                                |                                                                      |                                                                 |                                                                    |              |     |
| 17  | Pos verification only                             | -              | Pos verification only.                                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 18  | Reserved                                          |                |                                                                |                                                                      |                                                                 |                                                                    |              |     |
| 19  | Reserved                                          |                |                                                                |                                                                      |                                                                 |                                                                    |              |     |
| 20  | Money transfer                                    | Debit          | Money transfer operation (UnionPay).                           |                                                                      |                                                                 | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 21  | P2p debit                                         | Debit          | P2P transfer debit part.                                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 22  | P2p credit                                        | Credit         | P2P transfer credit part.                                      |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 23  | Debit cheque                                      | Debit          | Original debit operation.                                      |                                                                      |                                                                 | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 24  | Card activate                                     | -              | Card activate.                                                 |                                                                      |                                                                 |                                                                    | +            |     |
| 25  | Pin change API                                    | -              | PIN change via API.                                            |                                                                      |                                                                 |                                                                    | +            |     |
| 26  | P2p Debit account to account                      | Debit          | Account funding debit account to account.                      | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 27  | P2p Credit account to account                     | Credit         | Account funding credit account to account.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 28  | P2p Debit person to person                        | Debit          | Account funding debit person to person.                        | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 29  | P2p Credit person to person                       | Credit         | Account funding credit person to person.                       | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 30  | P2p debit financial institution                   | Debit          | Account funding debit financial institution.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 31  | P2p credit financial institution                  | Credit         | Account funding credit financial institution.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 32  | P2p debit prepaid card load and top up            | Debit          | Account funding debit prepaid card load and top up.            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 33  | P2p credit prepaid card load and top up           | Credit         | Account funding credit prepaid card load and top up.           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 34  | P2p debit wallet transfer                         | Debit          | Account funding debit wallet transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 35  | P2p credit wallet transfer                        | Credit         | Account funding credit wallet transfer.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 36  | P2p debit card bill pay                           | Debit          | Account funding debit card bill.                               | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 37  | P2p credit card bill pay                          | Credit         | Account funding credit card bill.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 38  | P2p debit non card bill pay                       | Debit          | Account funding debit non card bill.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 39  | P2p credit non card bill pay                      | Credit         | Account funding credit non card bill.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 40  | P2p debit non online gambling/gaming              | Debit          | Account funding debit non online gambling/gaming.              |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 41  | P2p credit non online gambling/gaming             | Credit         | Account funding credit non online gambling/gaming.             |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 42  | P2p debit online gambling/gaming                  | Debit          | Account funding debit online gambling/gaming.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 43  | P2p credit online gambling/gaming                 | Credit         | Account funding credit online gambling/gaming.                 |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 44  | P2p debit government disbursement and tax refund  | Debit          | Account funding debit government disbursement and tax refund.  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 45  | P2p credit government disbursement and tax refund | Credit         | Account funding credit government disbursement and tax refund. | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 46  | P2p debit loyalty payments                        | Debit          | Account funding debit loyalty payments.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 47  | P2p credit loyalty payments                       | Credit         | Account funding credit loyalty payments.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 48  | P2p debit merchant settlement                     | Debit          | Account funding debit merchant settlement.                     | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  | <img src="unionpay_logo.png" style="max-width:28px; height:auto;"> |              |     |
| 49  | P2p credit merchant settlement                    | Credit         | Account funding credit merchant settlement.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 50  | P2p debit payroll and pensions                    | Debit          | Account funding debit.                                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 51  | P2p credit payroll and pensions                   | Credit         | Account funding credit.                                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 52  | P2p debit b2b supplier payments                   | Debit          | Account funding debit b2b supplier payments.                   |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 53  | P2p credit b2b supplier payments                  | Credit         | Account funding credit b2b supplier payments.                  |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 54  | P2p debit other disbursements                     | Debit          | Account funding debit other disbursements.                     |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 55  | P2p credit other disbursements                    | Credit         | Account funding credit other disbursements.                    | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 56  | Outbound from external payment address            | Debit          | Outbound from external payment address via API.                |                                                                      |                                                                 |                                                                    |              | +   |
| 57  | Inbound from external payment address             | Credit         | Inbound from external payment address via API.                 |                                                                      |                                                                 |                                                                    |              | +   |
| 58  | Direct debit from external payment address        | Debit          | Direct debit from external payment address via API.            |                                                                      |                                                                 |                                                                    |              | +   |
| 59  | Direct credit from external payment address       | Credit         | Direct credit from external payment address via API.           |                                                                      |                                                                 |                                                                    |              | +   |
| 60  | P2p credit agent cash out                         | Credit         | Account funding credit agent cash out.                         | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 61  | P2p debit agent cash out                          | Debit          | Account funding debit agent cash out.                          | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 62  | P2p credit merchant presented qr                  | Credit         | Account funding credit merchant presented qr.                  | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 63  | P2p debit merchant presented qr                   | Debit          | Account funding debit merchant presented qr.                   | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 64  | Pin unblock API                                   | -              | PIN unblock via API.                                           |                                                                      |                                                                 |                                                                    |              | +   |
| 65  | Inbound return from external payment              | Debit          | Inbound return from external payment.                          |                                                                      |                                                                 |                                                                    |              | +   |
| 66  | Outbound return from external payment             | Credit         | Outbound return from external payment.                         |                                                                      |                                                                 |                                                                    |              | +   |
| 67  | Direct credit return                              | Debit          | Direct credit return.                                          |                                                                      |                                                                 |                                                                    |              | +   |
| 68  | Direct debit return                               | Credit         | Direct debit return.                                           |                                                                      |                                                                 |                                                                    |              | +   |
| 69  | Custom fee                                        | Debit          | Custom fee.                                                    |                                                                      |                                                                 |                                                                    | +            |     |
| 70  | P2P credit cash deposit                           | Credit         | Account funding credit cash deposit.                           |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 71  | P2P debit cash deposit                            | Debit          | Account funding debit cash deposit.                            |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 72  | P2P debit merchant payment                        | Debit          | Account funding debit merchant payment.                        |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 73  | P2P credit merchant payment                       | Credit         | Account funding credit merchant payment.                       |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 74  | First chargeback                                  | \-             | First chargeback.                                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 75  | Second chargeback                                 | \-             | Second chargeback.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 76  | Retrieval request                                 | \-             | Retrieval request.                                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> |                                                                 |                                                                    |              |     |
| 77  | P2P credit funds transfer                         | Credit         | Account funding credit funds transfer.                         |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 78  | P2P debit funds transfer                          | Debit          | Account funding debit funds transfer.                          |                                                                      | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    |              |     |
| 79  | Dispute credit adjustment                         | Credit         | Dispute credit adjustment via API.                             | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    | +            |     |
| 80  | Dispute debit adjustment                          | Debit          | Dispute debit adjustment via API.                              | <img src="mastercard_logo.png" style="max-width:28px; height:auto;"> | <img src="visa_logo.png" style="max-width:28px; height:auto;">  |                                                                    | +            |     |

### Bank account status

| Type | Description  |
|------|--------------|
| A    | Active       |
| B    | Blocked      |
| S    | Suspended    |
| P    | Spend only   |
| R    | Receive only |

### Visa Function Code

| Type | Description        |
|------|--------------------|
| 1    | First presentment  |
| 2    | Second presentment |
| 9    | Dispute Financial  |

### Visa Transaction Code Qualifier

| Type| Description (Special Case)                                                                                      |
|---- |-----------------------------------------------------------------------------------------------------------------|
| 0   | Default                                                                                                         |
| 1   | Account Funding                                                                                                 |
| 1   | (TC33 V.I.P. Full Service Dispute Financial) Status Advice V.I.P. Full Service Dispute Financial Status Advice  |
| 1   | (TC20/TC10) Sweepstakes                                                                                         |
| 1   | (TC10 Visa Award (Loyalty)) Visa Award, Reversals and offsets.                                                  |
| 2   | Original Credit                                                                                                 |

### Visa Business Format Code

| Value | Description (TCR code)                 |
|-------|----------------------------------------|
| AI    | Passenger Itinerary (3)                |
| AN    | Passenger Transport Ancillary Data (3) |
| LG    | Lodging (3)                            |
| CA    | Car Rental (3)                         |
| FT    | Fleet EMV service (3)                  |
| FL    | Fleet service (3)                      |
| LD    | Loan Detail (3)                        |
| CR    | Business Application Data (3)          |
| SD    | SMS Data (4)                           |
| SP    | SMS Data (4)                           |
| PD    | Promotion Data (4)                     |
| DF    | Dispute financial (4)                  |
| IP    | Installment payment transactions (D)   |
| OC    | Original Credit (D)                    |
| JA    | Europe V.me transactions only (E)      |
| PD    | Promotion data (4)                     |
| LD    | BRAZIL COUNTRY DATA - BNDES (2)        |
| OC    | Original credit (1)                    |

### Card Type

| Value | Description                         |
|-------|-------------------------------------|
| 1     | Customer                            |
| 2     | Corporate                           |

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

### External payment scheme

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
