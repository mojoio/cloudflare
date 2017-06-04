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
    getZoneId(domainName: string): Promise<string>;
    getRecord(domainNameArg: string, typeArg: string): Promise<interfaces.ICflareRecord>;
    createRecord(domainNameArg: string, typeArg: string, contentArg: string): Promise<{}>;
    removeRecord(domainNameArg: string, typeArg: string): Promise<{}>;
    updateRecord(domainNameArg: string, typeArg: string, valueArg: any): Promise<{}>;
    /**
     * list all records of a specified domain name
     * @param domainNameArg - the domain name that you want to get the records from
     */
    listRecords(domainNameArg: string): Promise<interfaces.ICflareRecord[]>;
    /**
     * list all zones in the associated authenticated account
     * @param domainName
     */
    listZones(domainName?: string): Promise<interfaces.ICflareZone[]>;
    request(methodArg: string, routeArg: string, dataArg?: {}): Promise<{}>;
    private authCheck();
}
