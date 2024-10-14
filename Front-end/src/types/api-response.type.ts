export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    content: T;
    responseException: any;
    version: string;
}