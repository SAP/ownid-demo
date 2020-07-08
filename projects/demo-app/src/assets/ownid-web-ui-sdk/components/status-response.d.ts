export default interface StatusResponse {
    status: ContextStatus;
    context: string;
    payload: any;
}
export declare enum ContextStatus {
    Started = 1,
    Processing = 2,
    Finished = 3
}
