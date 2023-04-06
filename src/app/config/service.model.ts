export interface IAppConfig {
    env: {
        name                : string;
    };
    apiServer: {
        productService      : string,
        orderService        : string,
    };
    marketplaceDomain       : string,
    dineInDomain            : string,
    logging                 : number;
}