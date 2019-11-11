export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    disk_quota: number;
    api_key: string;
    email: string;
    enabled: boolean;
    organization: string;
    password?: string;
    phone?: number;
    roles?: any;
}
