export interface BetterPayment
{
    cardCCV?        : string;
    cardMonth?      : string;
    cardYear?       : string;
    creditCardNo?   : string;
    phoneNo         : string;
    orderTotalAmount?: number;
    paymentService  : string;
    paymentType     : string;
    transactionId   : string;
    customerName    : string;
    email           : string;
}

export interface PaymentRequestBody
{
    browser             : string;
    channel             : string;
    orderId             : string;
    paymentAmount       : number;
    paymentDescription  : string;
    regionCountryId     : string;
    storeId             : string;
    storeName           : string;
    storeVerticalCode   : string;
}

export interface PaymentRequestResp
{
    clientTransactionId : string;
    id                  : string;
    paymentAmount       : number;
    spId                : string;
    status              : string;
    systemTransactionId : string;
}

export interface BNPLList
{
    logoUrl       : string;
    providerName  : string;
    providerValue : string;
    type          : string;
}