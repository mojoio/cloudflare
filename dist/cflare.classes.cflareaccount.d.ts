import "typings-global";
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
    createRecord(domainNameArg: string, typeArg: string, contentArg: string): any;
    removeRecord(): any;
    updateRecord(domainNameArg: string, typeArg: string, valueArg: any): any;
    listRecords(domainNameArg: string): any;
    listZones(domainName?: string): any;
    request(methodArg: string, routeArg: string, dataArg?: {}): any;
}
