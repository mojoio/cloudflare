import 'typings-global';
import * as interfaces from './cflare.interfaces';
export declare class CflareAccount {
    private authEmail;
    private authKey;
    constructor();
    auth(optionsArg: {
        email: string;
        key: string;
    }): void;
    getZoneId(domainName: string): Promise<{}>;
    getRecord(domainNameArg: string, typeArg: string): Promise<interfaces.ICflareRecord>;
    createRecord(domainNameArg: string, typeArg: string, contentArg: string): Promise<{}>;
    removeRecord(domainNameArg: string, typeArg: string): Promise<{}>;
    updateRecord(domainNameArg: string, typeArg: string, valueArg: any): Promise<{}>;
    listRecords(domainNameArg: string): Promise<interfaces.ICflareRecord[]>;
    listZones(domainName?: string): Promise<interfaces.ICflareZone[]>;
    request(methodArg: string, routeArg: string, dataArg?: {}): Promise<{}>;
    private authCheck();
}
