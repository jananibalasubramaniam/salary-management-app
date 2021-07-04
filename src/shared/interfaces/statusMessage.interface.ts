export interface StatusMessage {
    status?: number;
    title: 'Success' | 'Error';
    message: string;
}