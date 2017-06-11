export interface ICflareZone {
    'id': string;
    'name': string;
    'development_mode': number;
    'original_name_servers': string[];
    'original_registrar': string;
    'original_dnshost': string;
    'created_on': string;
    'modified_on': string;
    'name_servers': string[];
    'owner': {
        'id': string;
        'email': string;
        'owner_type': string;
    };
    'permissions': string[];
    'plan': {
        'id': string;
        'name': string;
        'price': number;
        'currency': string;
        'frequency': string;
        'legacy_id': string;
        'is_subscribed': boolean;
        'can_subscribe': boolean;
    };
    'plan_pending': {
        'id': string;
        'name': string;
        'price': number;
        'currency': string;
        'frequency': string;
        'legacy_id': string;
        'is_subscribed': string;
        'can_subscribe': string;
    };
    'status': string;
    'paused': boolean;
    'type': string;
    'checked_on': string;
}
export interface ICflareRecord {
    'id': string;
    'type': string;
    'name': string;
    'content': string;
    'proxiable': boolean;
    'proxied': boolean;
    'ttl': number;
    'locked': boolean;
    'zone_id': string;
    'zone_name': string;
    'created_on': string;
    'modified_on': string;
    'data': any;
}
