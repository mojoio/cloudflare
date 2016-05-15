export declare class CflareAccount {
    private authEmail;
    private authKey;
    private authCheck();
    constructor();
    auth(optionsArg: {
        email: string;
        key: string;
    }): void;
    createRecord(): any;
    removeRecord(): any;
    listRecords(domainName: string): any;
    listDomains(): any;
    request(methodArg: string, routeArg: string): any;
}
