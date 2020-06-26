import { ILogger } from '../interfaces/i-logger.interfaces';
export default class RequestService {
    private logger?;
    constructor(logger?: ILogger | undefined);
    post(url: string, data?: {}): Promise<any>;
}
