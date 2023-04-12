export interface IAppConfig {
    env: {
        name                : string;
    };
    apiServer: {
        productService      : string,
        orderService        : string,
        paymentService      : string
    };
    marketplaceDomain       : string,
    dineInDomain            : string,
    logging                 : number;
    paymentMiddleware       : string;
}