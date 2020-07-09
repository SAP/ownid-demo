export default interface StatusResponse {
    status: ContextStatus;
    context: string;
    payload: any;
}
export declare enum ContextStatus {
    Initiated = 1,
    Started = 2,
    WaitingForApproval = 3,
    Approved = 4,
    Declined = 5,
    Finished = 99
}
