import { LogLevel, ILogger } from '../interfaces/i-logger.interfaces';
export default class LoggerDecorator implements ILogger {
    private externalLogger;
    private logLevel;
    constructor(externalLogger: ILogger, logLevel: LogLevel);
    logDebug(message: string): void;
    logInfo(message: string): void;
    logError(message: string): void;
}
