import { ILogger } from '../interfaces/i-logger.interfaces';
import 'whatwg-fetch';
export default class RequestService {
    private logger?;
    constructor(logger?: ILogger | undefined);
    post(url: string, data?: {}): Promise<any>;
}
