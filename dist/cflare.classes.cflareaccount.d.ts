export declare class CflareAccount {
    private authEmail;
    private authKey;
    private authCheck();
    constructor();
    auth(optionsArg: {
        email: string;
        key: string;
    }): void;
    getZoneId(domainName: string): any;
    createRecord(): any;
    removeRecord(): any;
    updateRecord(): void;
    listRecords(domainName: string): any;
    listZones(domainName?: string): any;
    request(methodArg: string, routeArg: string, bodyArg?: any): any;
}
