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
    getRecord(domainNameArg: string, typeArg: string): any;
    createRecord(): any;
    removeRecord(): any;
    updateRecord(domainNameArg: string, typeArg: string, valueArg: any): any;
    listRecords(domainName: string): any;
    listZones(domainName?: string): any;
    request(methodArg: string, routeArg: string, jsonArg?: any): any;
}
